import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerModel } from '../models/customer.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class CustomerService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(public authService: AuthParseService,) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getCustomers(page:number = 0){
    return new Promise((resolve, reject) => {
      var parseObj = Parse.Object.extend("Customers");
      var query = new Parse.Query(parseObj);
      query.limit(environment.listItemsPerPage);
      query.skip(page * environment.listItemsPerPage);
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          name: r.get("name"),
          country: r.get("country"),
          email: r.get("email"),
          phone: r.get("phone")
        })))
      },(error) => {
        reject(error);
      });
    });
  }

  public getCustomerById(id:string){
    console.log("[service]id: "+id);
    return new Promise((resolve, reject) => {
      // Create Parse Object
      var parseObj = Parse.Object.extend("Customers")
      var query = new Parse.Query(parseObj)
      // Query
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve({
          id: r.id,
          name: r.get("name"),
          country: r.get("country"),
          email: r.get("email"),
          phone: r.get("phone")
        });

      },(error) => {
        reject(error);
      });
    });
  }
  
  createCustomer(customer: any){
    return new Promise((resolve, reject) => {
      // Create Parse Object
      const parseObj = Parse.Object.extend('Customers');
      const myNewObject = new parseObj();
      // Set ACL
      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
      // Set Fields
      myNewObject.set('name', customer.name);
      myNewObject.set('country', customer.country);
      myNewObject.set('email', customer.email);
      myNewObject.set('phone', customer.phone);
      // Save
      myNewObject.save().then((result) => {
        console.log('Properties created', result);
        resolve(result);
      },(error) => {
        reject(error);
      });
    });
  }

  updateCustomer(customer){
    return new Promise((resolve, reject) => {
      // Create Parse Object
      const parseObj = Parse.Object.extend('Customers');
      const query = new Parse.Query(parseObj);
      // Query
      query.get(customer.id).then((object) => {
        // Update Fields
        object.set('name', customer.name);
        object.set('country', customer.country);
        object.set('email', customer.email);
        object.set('phone', customer.phone);
        // Save
        object.save().then((response) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          resolve(response);
        }, (error) => {
          reject(error);
        });
      });
    });
  }

  deleteCustomer(id: string){
    return new Promise((resolve, reject) => {
      const parseObj = Parse.Object.extend('Customers');
      const query = new Parse.Query(parseObj);

      // here you put the objectId that you want to delete
      query.get(id).then((object) => {
        object.destroy().then((response) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
      });
    });
  }
}