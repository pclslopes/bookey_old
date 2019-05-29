import { Injectable } from '@angular/core';
import { BookingModel } from '../models/booking.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class ExpensesService {

  constructor(public authService: AuthParseService,) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getExpenses(){
    return new Promise((resolve, reject) => {
      var parseObj = Parse.Object.extend("Expenses");
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

  public getExpenseById(id:string){
    console.log("[service]id: "+id);
    return new Promise((resolve, reject) => {

      var parseObj = Parse.Object.extend("Expenses")
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
  
  createExpense(expense: any){
    return new Promise((resolve, reject) => {
      const parseObj = Parse.Object.extend('Expenses');
      const myNewObject = new parseObj();

      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
      myNewObject.set('propertyId', expense.propertyId);
      myNewObject.set('propertyName', expense.propertyName);
      myNewObject.set('checkinDate', expense.checkinDate);
      myNewObject.set('checkoutDate', expense.checkoutDate);
      myNewObject.set('customerId', expense.customerId);
      myNewObject.set('customerName', expense.customerName);

      myNewObject.save().then((result) => {
        console.log('Properties created', result);
        resolve(result);
      },(error) => {
        reject(error);
      });
    });
  }

  updateExpense(expense){
    return new Promise((resolve, reject) => {
      const properties = Parse.Object.extend('Expenses');
      const query = new Parse.Query(properties);
      // here you put the objectId that you want to update
      query.get(expense.objectId).then((object) => {
        object.set('propertyId', expense.propertyId);
        object.set('propertyName', expense.propertyName);
        object.set('checkinDate', expense.checkinDate);
        object.set('checkoutDate', expense.checkoutDate);
        object.set('customerId', expense.customerId);
        object.set('customerName', expense.customerName);
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

  deleteEx(id: string){
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