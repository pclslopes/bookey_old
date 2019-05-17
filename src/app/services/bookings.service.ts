import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { BookingModel } from '../models/booking.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';

declare const Parse: any;

@Injectable()
export class BookingsService {

  constructor(
      //private firestore: AngularFirestore,
      public authService: AuthParseService,) { 
        Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
        Parse.serverURL = environment.parseServer.serverURL;
      }

  getBookings() {
    //Once again, we extend the Parse.Object class to make the ListItem class
    var item = Parse.Object.extend("Bookings");

    //This time, we use Parse.Query to generate a new query, specifically querying the ListItem table.
    var query = new Parse.Query(item);

    //We set constraints on the query.
    //query.equalTo('isComplete', false)
    query.limit = 10;
    query.descending('createdAt');

    //We submit the query and pass in callback functions.
    query.find({
      success: function(results) {
        //Success callback
        alert("Success");
      },
      error: function(error) {
        //Error Callback
        alert("Error");
      }
    });
    
  }

  createBooking(value: any){
   
    //Extend the native Parse.Object class.
    var itemCustomers = Parse.Object.extend("Customers");
    var itemBooking = Parse.Object.extend("Bookings");

    //Instantiate an object of the ListItem class
    var listItem = new itemCustomers();

    //listItem is now the object that we want to save, so we assign the properties that we want on it.
    listItem.set("content", text);
    listItem.set("isComplete", false);

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

  updateBooking(booking: BookingModel){
    //delete booking.id;
    //this.firestore.doc('bookings/' + booking.id).update(booking);
  }

  deleteBooking(bookingId: string){
   // this.firestore.doc('bookings/' + bookingId).delete();
  }
}