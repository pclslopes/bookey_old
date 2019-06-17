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
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve({
          id: r.id,
          name: r.get("name"),
          link: r.get("link"),
        });

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
      // Set ACL
      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
      // Set Fields
      myNewObject.set('name', property.name);
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

      // here you put the objectId that you want to update
      query.get(property.id).then((object) => {
        object.set('name', property.name);
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
      const Properties = Parse.Object.extend('Properties');
      const query = new Parse.Query(Properties);
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
      const Properties = Parse.Object.extend('Properties');
      const query = new Parse.Query(Properties);
      // Query
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve(r.get("ACL").map(x => ({
          id: x.id
        })))
      }
      ,(error) => {
        reject(error);
      });
    });
  }
}