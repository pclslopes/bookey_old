import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookingModel } from '../models/booking.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class BookingsService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(public authService: AuthParseService,) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getBookings(){
    return new Promise((resolve, reject) => {
      var parseObj = Parse.Object.extend("Bookings");
      var query = new Parse.Query(parseObj);
      query.include("property");
      query.limit = 10;
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          property: {
              id: r.has("property") ? r.get("property").id : null,
              name: r.has("property") ? r.get("property").get("name") : null,
          },
          checkInDate: this.pipe.transform(r.get("checkInDate"), "dd-MM-yyyy"),
          checkOutDate: this.pipe.transform(r.get("checkOutDate"), "dd-MM-yyyy"),
          customer: r.get("customerName"),
          checkInTime: r.get("checkInTime")
        })))
      },(error) => {
        reject(error);
      });
    });
  }

  public getBookingById(id:string){
    console.log("[service]id: "+id);
    return new Promise((resolve, reject) => {

      var parseObj = Parse.Object.extend("Bookings")
      var query = new Parse.Query(parseObj)
      query.include("property");
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve({
          id: r.id,
          property: {
            id: r.has("property") ? r.get("property").id : null,
            name: r.has("property") ? r.get("property").get("name") : null,
          },
          checkInDate: r.get("checkInDate"),
          checkOutDate: r.get("checkOutDate"),
          customer: r.get("customerName"),
          checkInTime: r.get("checkInTime")
        });

      },(error) => {
        reject(error);
      });
    });
  }
  
  createBooking(booking: any){
    return new Promise((resolve, reject) => {
      // Create Parse Object
      const parseObj = Parse.Object.extend('Bookings');
      const myNewObject = new parseObj();

      // Set pointer
      var pointerProperty = Parse.Object.extend("Properties");
      const propertyObj = new pointerProperty();
      propertyObj.set('objectId', booking.property);

      // Set ACL
      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
      // Set Fields
      myNewObject.set('checkInDate', booking.checkInDate);
      myNewObject.set('checkOutDate', booking.checkOutDate);
      myNewObject.set('customerName', booking.customer);
      myNewObject.set('checkInTime', booking.checkInTime);
      myNewObject.set('property', propertyObj);

      myNewObject.save().then((result) => {
        console.log('Properties created', result);
        resolve(result);
      },(error) => {
        reject(error);
      });
    });
  }

  updateBooking(booking){
    return new Promise((resolve, reject) => {
      const bookings = Parse.Object.extend('Bookings');
      const query = new Parse.Query(bookings);

      // here you put the objectId that you want to update
      query.get(booking.id).then((object) => {

        // Set pointer
        var pointerProperty = Parse.Object.extend("Properties");
        const propertyObj = new pointerProperty();
        propertyObj.set('objectId', booking.property);
        
        object.set('property', propertyObj);
        object.set('checkInDate', booking.checkInDate);
        object.set('checkOutDate', booking.checkOutDate);
        object.set('customer', booking.customer);
        object.set('checkInTime', booking.checkInTime);
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