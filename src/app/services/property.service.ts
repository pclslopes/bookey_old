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
          objectId: r.id,
          propertyName: r.get('propertyName'),
          propertyLink: r.get('propertyLink')
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
        resolve(JSON.parse(JSON.stringify(results)));
      },(error) => {
        reject(error);
      });
    });
  }
  
  createProperty(property: any){
    return new Promise((resolve, reject) => {
      const properties = Parse.Object.extend('Properties');
      const myNewObject = new properties();

      myNewObject.setACL(Parse.User.current());
      myNewObject.set('propertyName', property.propertyName);
      myNewObject.set('propertyLink', property.propertyLink);

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
      query.get(property.objectId).then((object) => {
        object.set('propertyName', property.propertyName);
        object.set('propertyLink', property.propertyLink);
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