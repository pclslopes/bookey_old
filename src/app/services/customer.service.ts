import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerModel } from '../models/customer.model';
import { AuthParseService } from '../services/auth.parse.service';
import { PropertyService } from '../services/property.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class CustomerService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(
      public authService: AuthParseService,
      public propertyService: PropertyService,
    ) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getCustomers(page:number = 0, search:string = null){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("Customers");
      var query = new Parse.Query(parseObj);
      // Query
      query.include("property");
      query.include("country");
      if(search !== null){
        query.matches("name", search, 'i');
      }
      query.limit(environment.listItemsPerPage);
      query.skip(page * environment.listItemsPerPage);
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          name: r.get("name"),
          property: {
              id: r.has("property") ? r.get("property").id : null,
              name: r.has("property") ? r.get("property").get("name") : null,
          },
          country: {
            id: r.has("country") ? r.get("country").id : null,
            name: r.has("country") ? r.get("country").get("name") : null,
          },
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
      query.include("property");
      query.include("country");
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve({
          id: r.id,
          name: r.get("name"),
          property: {
            id: r.has("property") ? r.get("property").id : null,
            name: r.has("property") ? r.get("property").get("name") : null,
          },
          country: {
            id: r.has("country") ? r.get("country").id : null,
            name: r.has("country") ? r.get("country").get("name") : null,
          },
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

      // Set pointers
      var pointerProperty = Parse.Object.extend("Properties");
      const propertyObj = new pointerProperty();
      propertyObj.set('objectId', customer.property);

      var pointerCountry = Parse.Object.extend("Countries");
      const countryObj = new pointerCountry();
      countryObj.set('objectId', customer.country);

      // Get Property ACL
      this.propertyService.getPropertyACLUsers(customer.property).then(data => {
        console.log("getPropertyACLUsers: "+ JSON.stringify(data));

        // Set ACL Users
        var acl = new Parse.ACL();
        acl.setPublicReadAccess(false);
        Object.keys(data).forEach(key => {
          acl.setWriteAccess(data[key].id, true);
          acl.setReadAccess(data[key].id, true);
        });
        myNewObject.setACL(acl);

        // Set Fields
        myNewObject.set('name', customer.name);
        myNewObject.set('country', countryObj);
        myNewObject.set('email', customer.email);
        myNewObject.set('phone', customer.phone);
        myNewObject.set('property', propertyObj);

        // Save
        myNewObject.save().then((result) => {
          console.log('Customer created', result);
          resolve(result);
      });
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

        // Set pointers
        var pointerProperty = Parse.Object.extend("Properties");
        const propertyObj = new pointerProperty();
        propertyObj.set('objectId', customer.property);

        var pointerCountry = Parse.Object.extend("Countries");
        const countryObj = new pointerCountry();
        countryObj.set('objectId', customer.country);

        // Update Fields
        object.set('property', propertyObj);
        object.set('name', customer.name);
        object.set('country', countryObj);
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