import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PropertyModel } from '../models/property.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class PropertyService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(public authService: AuthParseService,) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getProperties(page:number = 0, search:string = null){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("Properties");
      var query = new Parse.Query(parseObj);
      // Query
      query.include("currency");
      if(search !== null){
        query.matches("name", search, 'i');
      }
      query.limit(environment.listItemsPerPage);
      query.skip(page * environment.listItemsPerPage);
      query.descending('createdAt');
      // Find
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          name: r.get("name"),
          currency: {
              id: r.has("currency") ? r.get("currency").id : null,
              name: r.has("currency") ? r.get("currency").get("name") : null,
          },
          link: r.get("link")
        })))
      },(error) => {
        reject(error);
      });
    });
  }

  public getPropertyById(id:string){
    console.log("[service]id: "+id);
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("Properties")
      var query = new Parse.Query(parseObj)
      // Query
      query.include("currency");
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve({
          id: r.id,
          name: r.get("name"),
          currency: {
              id: r.has("currency") ? r.get("currency").id : null,
              name: r.has("currency") ? r.get("currency").get("name") : null,
          },
          link: r.get("link"),
        });

      },(error) => {
        reject(error);
      });
    });
  }

  public getAllCurrencies(){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("Currencies");
      var query = new Parse.Query(parseObj);
      // Query
      query.ascending('name');
      // Find
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          name: r.get("name")
        })))
      },(error) => {
        reject(error);
      });
    });
  }
  
  createProperty(property: any){
    return new Promise((resolve, reject) => {
      // Create Parse Object
      const parseObj = Parse.Object.extend('Properties');
      const myNewObject = new parseObj();
      
      // Set pointers
      var pointerCurrency = Parse.Object.extend("Currencies");
      const currencyObj = new pointerCurrency();
      currencyObj.set('objectId', property.currency);

      // Set ACL (Current User)
      var acl = new Parse.ACL();
      acl.setPublicReadAccess(false);
      acl.setWriteAccess(Parse.User.current(), true);
      acl.setReadAccess(Parse.User.current(), true);
      myNewObject.setACL(acl);

      // Set Fields
      myNewObject.set('name', property.name);
      myNewObject.set('currency', currencyObj);
      myNewObject.set('link', property.link);

      myNewObject.save().then((result) => {
        console.log('Properties created', result);
        resolve(result);
      },(error) => {
        reject(error);
      });
    });
  }

  updateProperty(property){
    return new Promise((resolve, reject) => {
      const parseObj = Parse.Object.extend('Properties');
      const query = new Parse.Query(parseObj);

      // Set pointers
      var pointerCurrency = Parse.Object.extend("Currencies");
      const currencyObj = new pointerCurrency();
      currencyObj.set('objectId', property.currency);

      // here you put the objectId that you want to update
      query.get(property.id).then((object) => {
        object.set('name', property.name);
        object.set('currency', currencyObj);
        object.set('link', property.link);
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

  deleteProperty(id: string){
    return new Promise((resolve, reject) => {
      const parseObj = Parse.Object.extend('Properties');
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

  getPropertyACLUsers(id: string){
    return new Promise((resolve, reject) => {
      const parseObj = Parse.Object.extend('Properties');
      const query = new Parse.Query(parseObj);
      // Query
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log(r);
        let aclList=[];
        let aclObj = r.has("ACL") ? r.get("ACL").permissionsById : [];
        Object.keys(aclObj).forEach(
          key => aclList.push(
            {
              id: key,
              read: aclObj[key].read,
              write: aclObj[key].write
            }
          )
        );
        
        resolve(aclList);
      }
      ,(error) => {
        reject(error);
      });
    });
  }

  getPropertyCount(){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("Properties");
      var query = new Parse.Query(parseObj);
      // Query
      query.count().then((numberOfProperties) => {
        console.log("Property Count: " + JSON.stringify(numberOfProperties));
        resolve(numberOfProperties)
      },(error) => {
        reject(error);
      });
    });
  }
}