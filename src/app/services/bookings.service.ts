import { Injectable } from '@angular/core';
import { BookingModel } from '../models/booking.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class BookingsService {

  constructor(public authService: AuthParseService,) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getBookings(){
    return new Promise((resolve, reject) => {
      var parseObj = Parse.Object.extend("Bookings");
      var query = new Parse.Query(parseObj);
      query.limit = 10;
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          objectId: r.id,
          property: r.get('property'),
          checkinDate: r.get('checkInDate'),
          checkoutDate: r.get('checkOutDate'),
          customer: r.get('customer')
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
        resolve(JSON.parse(JSON.stringify(results)));
      },(error) => {
        reject(error);
      });
    });
  }
  
  createBooking(booking: any){
    return new Promise((resolve, reject) => {
      const parseObj = Parse.Object.extend('Bookings');
      const myNewObject = new parseObj();

      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
      myNewObject.set('propertyId', booking.propertyId);
      myNewObject.set('propertyName', booking.propertyName);
      myNewObject.set('checkinDate', booking.checkinDate);
      myNewObject.set('checkoutDate', booking.checkoutDate);
      myNewObject.set('customerId', booking.customerId);
      myNewObject.set('customerName', booking.customerName);

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
      const properties = Parse.Object.extend('Bookings');
      const query = new Parse.Query(properties);
      // here you put the objectId that you want to update
      query.get(booking.objectId).then((object) => {
        object.set('propertyId', booking.propertyId);
        object.set('propertyName', booking.propertyName);
        object.set('checkinDate', booking.checkinDate);
        object.set('checkoutDate', booking.checkoutDate);
        object.set('customerId', booking.customerId);
        object.set('customerName', booking.customerName);
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