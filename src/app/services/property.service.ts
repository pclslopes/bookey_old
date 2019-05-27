import { Injectable } from '@angular/core';
import { PropertyModel } from '../models/property.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class PropertyService {

  public properties: Observable<PropertyModel[]>
  private _properties: BehaviorSubject<PropertyModel[]>;
  private dataStore: {
    properties: PropertyModel[]
  };

  constructor(public authService: AuthParseService,) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getProperties(){
    return new Promise(resolve => {
      var item = Parse.Object.extend("Properties");

      var query = new Parse.Query(item);

      query.limit = 10;
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("Results -- >"+ JSON.stringify(results));
        resolve(JSON.parse(JSON.stringify(results)));
      });
    });
  }

  public getPropertyById(id:string){
    return new Promise(resolve => {
      var item = Parse.Object.extend("Properties");

      var query = new Parse.Query(item);

      query.limit = 10;
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("Results -- >"+ JSON.stringify(results));
        resolve(JSON.parse(JSON.stringify(results)));
      });
    });
  }
  
  createProperty(value: any){
   
    //Extend the native Parse.Object class.
    var itemProperty = Parse.Object.extend("Customers");

    //Instantiate an object of the ListItem class
    var listItem = new itemProperty();

    //listItem is now the object that we want to save, so we assign the properties that we want on it.
    listItem.set("PropertyName", text);
    listItem.set("PropertyLink", false);

    //We call the save method, and pass in success and failure callback functions.
    listItem.save(null, {       
        success: function(item) {
        //Success Callback 
    },
    error: function(gameScore, error) {
        //Failure Callback
    }
    });
  }

  updateProperty(property: PropertyModel){
    //delete booking.id;
    //this.firestore.doc('bookings/' + booking.id).update(booking);
  }

  deleteProperty(propertyId: string){
   // this.firestore.doc('bookings/' + bookingId).delete();
  }
}