import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExpenseModel } from '../models/expense.model';
import { AuthParseService } from '../services/auth.parse.service';
import { PropertyService } from '../services/property.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class ExpensesService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(
    public authService: AuthParseService,
    public propertyService: PropertyService,
    ) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getExpenses(page:number = 0, search:string = null){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("Expenses");
      var query = new Parse.Query(parseObj);
      // Query
      query.include("property");
      query.include("propertyType");
      if(search !== null){
        query.matches("description", search, 'i');
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
          expenseType: {
              id: r.has("expenseType") ? r.get("expenseType").id : null,
              name: r.has("expenseType") ? r.get("expenseType").get("expenseType") : null,
          },
          description: r.get("description"),
          dateOfExpense: this.pipe.transform(r.get("dateOfExpense"), "dd-MM-yyyy"),
          value: r.get("value")
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
      query.include("property");
      query.include("propertyType");
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve({
          id: r.id,
          property: {
              id: r.has("property") ? r.get("property").id : null,
              name: r.has("property") ? r.get("property").get("name") : null,
          },
          expenseType: {
              id: r.has("expenseType") ? r.get("expenseType").id : null,
              name: r.has("expenseType") ? r.get("expenseType").get("expenseType") : null,
          },
          description: r.get("description"),
          dateOfExpense: this.pipe.transform(r.get("dateOfExpense"), "dd-MM-yyyy"),
          value: r.get("value")
        });

      },(error) => {
        reject(error);
      });
    });
  }
  
  createExpense(expense: any){
    return new Promise((resolve, reject) => {
      // Create Parse Object
      const parseObj = Parse.Object.extend('Expenses');
      const myNewObject = new parseObj();

      // Set pointers
      var pointerProperty = Parse.Object.extend("Properties");
      const propertyObj = new pointerProperty();
      propertyObj.set('objectId', expense.property);

      var pointerExpenseType = Parse.Object.extend("ExpenseTypes");
      const expenseTypeObj = new pointerExpenseType();
      expenseTypeObj.set('objectId', expense.expenseType);

      // Get Property ACL
      this.propertyService.getPropertyACLUsers(expense.property).then(data => {
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
        myNewObject.set('description', expense.description);
        myNewObject.set('value', expense.value);
        myNewObject.set('dateOfExpense', expense.dateOfExpense);
        myNewObject.set('property', propertyObj);
        myNewObject.set('expenseType', expenseTypeObj);

        myNewObject.save().then((result) => {
          console.log('Expense created', result);
          resolve(result);
        },(error) => {
          reject(error);
        });
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
        object.set('customerName', booking.customer);
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