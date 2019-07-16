import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookingModel } from '../models/booking.model';
import { AuthParseService } from '../services/auth.parse.service';
import { PropertyService } from '../services/property.service';
import { CustomerService } from '../services/customer.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class BookingsService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(
    public authService: AuthParseService,
    public propertyService: PropertyService,
    public customerService: CustomerService,
    ) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getBookings(page:number = 0, search:string = null){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("Bookings");
      var query = new Parse.Query(parseObj);
      // Query
      query.include("property");
      query.include("customer");
      query.include("status");
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
          property: {
              id: r.has("property") ? r.get("property").id : null,
              name: r.has("property") ? r.get("property").get("name") : null,
          },
          customer: {
            id: r.has("customer") ? r.get("customer").id : null,
            name: r.has("customer") ? r.get("customer").get("name") : null,
            email: r.has("customer") ? r.get("customer").get("email") : null,
            phone: r.has("customer") ? r.get("customer").get("phone") : null,
          },
          status: {
            id: r.has("status") ? r.get("status").id : null,
            name: r.has("status") ? r.get("status").get("name") : null,
          },
          checkInDate: this.pipe.transform(r.get("checkInDate"), "dd-MM-yyyy"),
          checkOutDate: this.pipe.transform(r.get("checkOutDate"), "dd-MM-yyyy"),
          checkInTime: r.get("checkInTime"),
          platform: r.get("platform"),
          commissionableAmount: r.get("commissionableAmount"),
          commission: r.get("commission"),
          cleaningFee: r.get("cleaningFee"),
          cityTax: r.get("cityTax"),
          receivedTotal: r.get("receivedTotal"),
          adultGuests: r.get("adultGuests"),
          childGuests: r.get("childGuests"),
          isReceived: r.get("isReceived"),
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
      query.include("customer");
      query.include("status");
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve({
          id: r.id,
          property: {
              id: r.has("property") ? r.get("property").id : null,
              name: r.has("property") ? r.get("property").get("name") : null,
          },
          customer: {
            id: r.has("customer") ? r.get("customer").id : null,
            country: r.has("customer") ? r.get("customer").get("country : null,
            name: r.has("customer") ? r.get("customer").get("name") : null,
            email: r.has("customer") ? r.get("customer").get("email") : null,
            phone: r.has("customer") ? r.get("customer").get("phone") : null,
          },
          status: {
            id: r.has("status") ? r.get("status").id : null,
            name: r.has("status") ? r.get("status").get("name") : null,
          },
          //checkInDate: this.pipe.transform(r.get("checkInDate"), "dd-MM-yyyy"),
          //checkOutDate: this.pipe.transform(r.get("checkOutDate"), "dd-MM-yyyy"),
          checkInDate: r.get("checkInDate"),
          checkOutDate: r.get("checkOutDate"),
          checkInTime: r.get("checkInTime"),
          platform: r.get("platform"),
          commissionableAmount: r.get("commissionableAmount"),
          commission: r.get("commission"),
          cleaningFee: r.get("cleaningFee"),
          cityTax: r.get("cityTax"),
          receivedTotal: r.get("receivedTotal"),
          adultGuests: r.get("adultGuests"),
          childGuests: r.get("childGuests"),
          isReceived: r.get("isReceived"),
        });

      },(error) => {
        reject(error);
      });
    });
  }

  public getAllBookingStatus(){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("BookingStatus");
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
  
  createBooking(booking: any, customer: any){
    return new Promise((resolve, reject) => {
      // Create Parse Object
      const parseObj = Parse.Object.extend('Bookings');
      const myNewObject = new parseObj();

      // Set pointers
      var pointerProperty = Parse.Object.extend("Properties");
      const propertyObj = new pointerProperty();
      propertyObj.set('objectId', booking.property);

      var pointerStatus = Parse.Object.extend("BookingStatus");
      const statusObj = new pointerStatus();
      statusObj.set('objectId', booking.status);

      // Create Customer
      this.customerService.createCustomer({id: null,name: customer.name, country: customer.country, email: customer.email, phone: customer.phone, property: booking.property}).then(dataCustomer => {

        var pointerCustomer = Parse.Object.extend("Customers");
        const customerObj = new pointerCustomer();
        customerObj.set('objectId', dataCustomer.id);

        // Get Property ACL
        this.propertyService.getPropertyACLUsers(booking.property).then(data => {
          console.log("getPropertyACLUsers: "+ JSON.stringify(data));
          
          // Set ACL Users
          var acl = new Parse.ACL();
          acl.setPublicReadAccess(false);
          Object.keys(data).forEach(key => {
            acl.setWriteAccess(data[key].id, true);
            acl.setReadAccess(data[key].id, true);
          });
          myNewObject.setACL(acl);

          // Set Fields
          myNewObject.set('property', propertyObj);
          myNewObject.set('status', statusObj);
          myNewObject.set('customer', customerObj);
          myNewObject.set('checkInDate', booking.checkInDate);
          myNewObject.set('checkOutDate', booking.checkOutDate);
          myNewObject.set('customerName', booking.customer);
          myNewObject.set('checkInTime', booking.checkInTime);
          myNewObject.set('platform', booking.platform);
          myNewObject.set('commissionableAmount', Number(booking.commissionableAmount));
          myNewObject.set('commission', Number(booking.commission));
          myNewObject.set('cleaningFee', Number(booking.cleaningFee));
          myNewObject.set('cityTax', Number(booking.cityTax));
          myNewObject.set('receivedTotal', Number(booking.receivedTotal));
          myNewObject.set('adultGuests', Number(booking.adultGuests));
          myNewObject.set('childGuests', Number(booking.childGuests));
          myNewObject.set('isReceived', booking.isReceived);


          myNewObject.save().then((result) => {
            console.log('Properties created', result);
            resolve(result);
          },(error) => {
            reject(error);
          });
        });
      });
    });
  }

  updateBooking(booking: any, customer: any){
    return new Promise((resolve, reject) => {

      const bookings = Parse.Object.extend('Bookings');
      const query = new Parse.Query(bookings);

      //const customers = Parse.Object.extend('Customers');
      //const queryCustomer = new Parse.Query(customers);

      // Get and update Customer
      this.customerService.updateCustomer({id: customer.id, name: customer.name, country: customer.country, email: customer.email, phone: customer.phone, property: booking.property}).then((dataCustomer) => {

        var pointerCustomer = Parse.Object.extend("Customers");
        const customerObj = new pointerCustomer();
        customerObj.set('objectId', dataCustomer.id);

        // here you put the objectId that you want to update
        query.get(booking.id).then((object) => {

          // Set pointer
          var pointerProperty = Parse.Object.extend("Properties");
          const propertyObj = new pointerProperty();
          propertyObj.set('objectId', booking.property);
          
          var pointerStatus = Parse.Object.extend("BookingStatus");
          const statusObj = new pointerStatus();
          statusObj.set('objectId', booking.status);

          object.set('property', propertyObj);
          object.set('status', statusObj);
          object.set('customer', customerObj);
          object.set('checkInDate', booking.checkInDate);
          object.set('checkOutDate', booking.checkOutDate);
          object.set('customerName', booking.customer);
          object.set('checkInTime', booking.checkInTime);
          object.set('platform', booking.platform);
          object.set('commissionableAmount', booking.commissionableAmount);
          object.set('commission', booking.commission);
          object.set('cleaningFee', booking.cleaningFee);
          object.set('cityTax', booking.cityTax);
          object.set('receivedTotal', booking.receivedTotal);
          object.set('adultGuests', booking.adultGuests);
          object.set('childGuests', booking.childGuests);
          object.set('isReceived', booking.isReceived);


          object.save().then((response) => {
            // You can use the "get" method to get the value of an attribute
            // Ex: response.get("<ATTRIBUTE_NAME>")
            resolve(response);
          }, (error) => {
            reject(error);
          });
        });
      });
    });
  }

  deleteBooking(id: string){
    return new Promise((resolve, reject) => {
      const parseObj = Parse.Object.extend('Bookings');
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
}