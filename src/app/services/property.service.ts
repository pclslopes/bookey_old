import { Injectable } from '@angular/core';
import { PropertyModel } from '../models/property.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';

declare const Parse: any;

@Injectable()
export class PropertyService {

  constructor(
      public authService: AuthParseService,) { 
        Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
        Parse.serverURL = environment.parseServer.serverURL;
      }

  async getProperties() {
    //Once again, we extend the Parse.Object class to make the ListItem class
    var item = Parse.Object.extend("Properties");

    //This time, we use Parse.Query to generate a new query, specifically querying the ListItem table.
    var query = new Parse.Query(item);

    //We set constraints on the query.
    //query.equalTo('isComplete', false)
    query.limit = 10;
    query.descending('createdAt');

    await query.find().then((results) => {
        // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
      if (typeof document !== 'undefined'){
        
      } //alert(`ParseObjects found: ${JSON.stringify(results)}`);
      console.log('ParseObjects found:', results);
      return results;
    }, (error) => {
      if (typeof document !== 'undefined') alert(`Error while fetching ParseObjects: ${JSON.stringify(error)}`);
      console.error('Error while fetching ParseObjects', error);
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