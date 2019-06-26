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
export class ExpenseTypesService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(
    public authService: AuthParseService,
    public propertyService: PropertyService,
    ) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

   public getExpenseTypes(page:number = 0, search:string = null){
    return new Promise((resolve, reject) => {
      console.log("Get Expense Types");
      // Setup Parse
      var parseObj = Parse.Object.extend("ExpenseTypes");
      var query = new Parse.Query(parseObj);
      // Query
      query.include("property");
      if(search !== null){
        query.matches("name", search, 'i');
      }
      query.limit(environment.listItemsPerPage);
      query.skip(page * environment.listItemsPerPage);
      query.descending('name');
      // Find
      query.find().then((results) => {
        resolve(results.map(r => ({
          id: r.id,
          name: r.get("name")
        })))
      },(error) => {
        reject(error);
      });
    });
  }

  public getAllExpenseTypes(){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("ExpenseTypes");
      var query = new Parse.Query(parseObj);
      // Query
      query.include("property");
      query.descending('name');
      // Find
      query.find().then((results) => {
        resolve(results.map(r => ({
          id: r.id,
          name: r.get("name")
        })))
      },(error) => {
        reject(error);
      });
    });
  }

  public getExpenseTypeById(id:string){
    console.log("[service]id: "+id);
    return new Promise((resolve, reject) => {

      var parseObj = Parse.Object.extend("ExpenseTypes")
      var query = new Parse.Query(parseObj)
      query.equalTo("objectId",id)
      query.first().then((r) => {
        resolve({
          id: r.id,
          name: r.get("name")
        });

      },(error) => {
        reject(error);
      });
    });
  }

  public getExpenseTypeByName(name:string){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("ExpenseTypes");
      var query = new Parse.Query(parseObj);
      // Query
      query.include("property");
      query.matches("name", name, 'i');
      // Find
      query.find().then((results) => {
        resolve(results.map(r => ({
          id: r.id,
          name: r.get("name")
        })))
      },(error) => {
        reject(error);
      });
    });
  }

  public createExpenseType(expenseType){
    return new Promise((resolve, reject) => {
      // Create Parse Object
      const parseObj = Parse.Object.extend('ExpenseTypes');
      const myNewObject = new parseObj();

      // Set pointers
      var pointerProperty = Parse.Object.extend("Properties");
      const propertyObj = new pointerProperty();
      propertyObj.set('objectId', expenseType.property);

      this.propertyService.getPropertyACLUsers(expenseType.property).then((aclResults) => {

        // Set ACL Users
        var acl = new Parse.ACL();
        acl.setPublicReadAccess(false);
        Object.keys(aclResults).forEach(key => {
          acl.setWriteAccess(aclResults[key].id, true);
          acl.setReadAccess(aclResults[key].id, true);
        });
        myNewObject.setACL(acl);

        // Set Fields
        myNewObject.set('name', expenseType.name);

        myNewObject.save().then((result) => {
          console.log('Expense type created', result);
          resolve(result);
        },(error) => {
          reject(error);
        });
      });
    });
  }

  public validateInsertExpenseType(expenseType){
    return new Promise((resolve, reject) => {
      // Search for the expense type
      this.getExpenseTypeByName(expenseType.name).then((results) => {
        if(results){
          resolve(results);
        }else{
          this.createExpenseType(expenseType).then((resultCreate) => {
            resolve(resultCreate);
          });
        }
      });
    });
  }
}