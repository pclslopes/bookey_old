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

   public getExpenseTypes(page:number = 0, search:string = null){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("ExpenseTypes");
      var query = new Parse.Query(parseObj);
      // Query
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

  public getExpenseTypeByName(name:string){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("ExpenseTypes");
      var query = new Parse.Query(parseObj);
      // Query
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

  public validateInsertExpenseType(expenseTypeName){
    return new Promise((resolve, reject) => {
      // Search for the expense type
      this.getExpenseTypeByName(expenseTypeName).then((results) => {
        if(results){
          resolve(results.map(r => ({
            id: r.id,
            name: r.get("name")
          })))
        }els
      });
    });
  }
}