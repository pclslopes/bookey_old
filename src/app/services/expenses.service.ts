import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExpenseModel } from '../models/expense.model';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class ExpensesService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(public authService: AuthParseService,) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getExpenses(page:number = 0){
    return new Promise((resolve, reject) => {
      var parseObj = Parse.Object.extend("Expenses");
      var query = new Parse.Query(parseObj);
      query.include("property");
      query.limit(environment.listItemsPerPage);
      query.skip(page * environment.listItemsPerPage);
      query.descending('createdAt');
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          property: {
              id: r.has("property") ? r.get("property").id : null,
              name: r.has("property") ? r.get("property").get("name") : null,
          },
          expenseDate: this.pipe.transform(r.get("expenseDate"), "dd-MM-yyyy"),
          description: r.get("description"),
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
      query.equalTo("objectId",id)
      query.first().then((r) => {
        console.log("[service response]: "+JSON.stringify(r));
        resolve({
          id: r.id,
          property: {
            id: r.has("property") ? r.get("property").id : null,
            name: r.has("property") ? r.get("property").get("name") : null,
          },
          expenseDate: this.pipe.transform(r.get("expenseDate"), "dd-MM-yyyy"),
          description: r.get("description"),
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

      // Set pointer
      var pointerProperty = Parse.Object.extend("Properties");
      const propertyObj = new pointerProperty();
      propertyObj.set('objectId', expense.property);

      // Set ACL
      myNewObject.setACL(Parse.User.current()); // Set ACL access with current user
      // Set Fields
      myNewObject.set('expenseDate', expense.expenseDate);
      myNewObject.set('description', expense.description);
      myNewObject.set('value', expense.value);
      myNewObject.set('property', propertyObj);

      myNewObject.save().then((result) => {
        console.log('Expense created', result);
        resolve(result);
      },(error) => {
        reject(error);
      });
    });
  }

  updateExpense(expense){
    return new Promise((resolve, reject) => {
      const expenses = Parse.Object.extend('Expenses');
      const query = new Parse.Query(expenses);

      // here you put the objectId that you want to update
      query.get(expense.id).then((object) => {

        // Set pointer
        var pointerProperty = Parse.Object.extend("Properties");
        const propertyObj = new pointerProperty();
        propertyObj.set('objectId', expense.property);
        
        object.set('property', propertyObj);
        object.set('expenseDate', expense.expenseDate);
        object.set('description', expense.description);
        object.set('value', expense.value);
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

  deleteExpense(id: string){
    return new Promise((resolve, reject) => {
      const expenses = Parse.Object.extend('Expenses');
      const query = new Parse.Query(expenses);
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