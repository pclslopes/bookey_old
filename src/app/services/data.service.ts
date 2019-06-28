import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerModel } from '../models/customer.model';
import { AuthParseService } from '../services/auth.parse.service';
import { PropertyService } from '../services/property.service';
import { BookingsService } from '../services/bookings.service';
import { ExpensesService } from '../services/expenses.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class DataService {

  pipe = new DatePipe(environment.defaultLanguage);

  constructor(
      public authService: AuthParseService,
      public propertyService: PropertyService,
      public bookingsService: BookingsService,
    ) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public calculatePropertyDataMonth(property, month, year){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("PropertyData");
      var query = new Parse.Query(parseObj);

      //"property": { "__type": "Pointer", "className": "Properties", "objectId": "<THE_REFERENCED_OBJECT_ID>" },
      //"year": 1,
      //"month": 1,
      //"profitabilityTotal": 1,
      //"cleaningCostTotal": 1,
      //"comissionTotal": 1,
      //"expensesTotal": 1,
      //"averageReservationDays": 1,
      //"averageGuestNumber": 1

      // Query
      query.include("property");
      query.matches("property", property, 'i');
      query.matches("month", month, 'i');
      query.matches("year", year, 'i');
      query.find().then((results) => {
        console.log("results: " + JSON.stringify(results));
        resolve(results.map(r => ({
          id: r.id,
          name: r.get("name"),
          property: {
              id: r.has("property") ? r.get("property").id : null,
              name: r.has("property") ? r.get("property").get("name") : null,
          },
          country: {
            id: r.has("country") ? r.get("country").id : null,
            name: r.has("country") ? r.get("country").get("name") : null,
          },
          email: r.get("email"),
          phone: r.get("phone")
        })))
      },(error) => {
        reject(error);
      });
    });
  }

  public getPropertyData(property, month, year){
    return new Promise((resolve, reject) => {
      // Average cost per rental
      // Average days per rental
      // Average people per rental
      // Total Profit
      // 
    });
  }
}