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
      query.limit = 10;
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          property: r.get('property'),
          checkinDate: this.pipe.transform(r.get('checkInDate'), 'dd-MM-yyyy'),
          checkoutDate: this.pipe.transform(r.get('checkOutDate'), 'dd-MM-yyyy'),
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
      var relation = parseObj.relation("property");
      var property = new Parse.Object("Property");
      property.id = booking.property;

      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
      myNewObject.set('property', property);
      myNewObject.set('checkInDate', booking.checkInDate);
      myNewObject.set('checkOutDate', booking.checkOutDate);
      myNewObject.set('customer', booking.customer);
      myNewObject.set('checkInTime', booking.checkInTime);

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
      query.get(booking.id).then((object) => {
        object.set('property', booking.property);
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