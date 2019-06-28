import { Injectable } from '@angular/core';
import { AuthParseService } from '../services/auth.parse.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

declare const Parse: any;

@Injectable()
export class CountryService {

  constructor(
      public authService: AuthParseService,
    ) { 
    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;
  }

  public getAllCountries(){
    return new Promise((resolve, reject) => {
      // Setup Parse
      var parseObj = Parse.Object.extend("Countries");
      var query = new Parse.Query(parseObj);
      // Query
      query.ascending('name');
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
}