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
              id: r.get("property").get(name,
          },
          checkinDate: this.pipe.transform(r.get("checkInDate"), "dd-MM-yyyy"),
          checkoutDate: this.pipe.transform(r.get("checkOutDate"), "dd-MM-yyyy"),
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
      query.equalTo("objectId",id)
      query.first().then((results) => {
        console.log("[service response]: "+JSON.stringify(results));
        const propertyResult: BookingModel = {
          id: results.id,
          property: results.get("property") !== null ? results.get("property").get("name"): null,
          checkInDate: results.get("checkInDate"),
          checkOutDate: results.get("checkOutDate"),
          customer: results.get("customerName"),
          checkInTime: results.get("checkInTime")
        };

        resolve(propertyResult);

      },(error) => {
        reject(error);
      });
    });
  }
  
  createBooking(booking: any){
    return new Promise((resolve, reject) => {
      const parseObj = Parse.Object.extend('Bookings');
      const myNewObject = new parseObj();
      // pointer
      var pointerProperty = Parse.Object.extend("properties");
      //var property = new Parse.Object("Properties");
      pointerProperty.id = booking.property;

      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
      //myNewObject.set('property', property);
      myNewObject.set('checkInDate', booking.checkInDate);
      myNewObject.set('checkOutDate', booking.checkOutDate);
      myNewObject.set('customerName', booking.customer);
      myNewObject.set('checkInTime', booking.checkInTime);
      myNewObject.set('property', pointerProperty);

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
        var relation = object.relation("property");
        var property = new Parse.Object("Properties");
        property.id = booking.property.id;

        object.set('property', property);
        object.set('checkInDate', booking.checkInDate);
        object.set('checkOutDate', booking.checkOutDate);
        object.set('customer', booking.customer);
        object.set('checkInTime', booking.checkInTime);
        object.set('propertyId', booking.propertyId);
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