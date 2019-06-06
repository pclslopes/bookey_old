import { Injectable } from '@angular/core';
import { PropertyModel } from '../models/property.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class PropertyService {

  constructor(public authService: AuthParseService,) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getProperties(){
    return new Promise((resolve, reject) => {
      var item = Parse.Object.extend("Properties");

      var query = new Parse.Query(item);

      query.limit = 10;
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          name: r.get('name'),
          link: r.get('link')
        })))
      },(error) => {
        reject(error);
      });
    });
  }

  public getPropertyById(id:string){
    console.log("[service]id: "+id);
    return new Promise((resolve, reject) => {

      var property = Parse.Object.extend("Properties")
      var query = new Parse.Query(property)
      query.equalTo("objectId",id)
      query.first().then((results) => {
        console.log("[service response]: "+JSON.stringify(results));
        //resolve(JSON.parse(JSON.stringify(results)));
        const propertyResult: PropertyModel = {
            id: results.id,
            name: results.get("name"),
            link: results.get("link")
        };

        resolve(propertyResult);
      },(error) => {
        reject(error);
      });
    });
  }
  
  createProperty(property: any){
    return new Promise((resolve, reject) => {
      const properties = Parse.Object.extend('Properties');
      const myNewObject = new properties();

      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
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
      const properties = Parse.Object.extend('Properties');
      const query = new Parse.Query(properties);
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
}