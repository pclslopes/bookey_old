import { Injectable } from  '@angular/core';
import { Router } from  "@angular/router";
import { environment } from '../../environments/environment';

declare const Parse: any;

@Injectable({
    providedIn:  'root'
})
export class AuthParseService {
  
  constructor(
        public router: Router) {

    Parse.initialize(environment.parseServer.PARSE_APP_ID, environment.parseServer.PARSE_JS_KEY);
    Parse.serverURL = environment.parseServer.serverURL;

    this.validateLoggedInUser();
  }

  async doLogin(value):Promise<string> {

    try {
        await Parse.User.logIn(value.email, value.password).then(() => {
          this.router.navigate(['dashboard']);
        });
    } catch (e) {
      return new Promise<string>((error) => {
        error(e.code + ' ' + e.message);
      });
    }
  }

  async doLogout(){
    await Parse.User.logOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  async doRegister(value):Promise<any>{
    var user = new Parse.User();
    user.set("username", value.email);
    user.set("password", value.password);
    user.set("email", value.email);

    try {
      await user.signUp();
    } catch (e) {
      return new Promise<string>((error) => {
        error(e.code + ' ' + e.message);
      });
    }
  }

  get isLoggedIn(): boolean {
    
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  validateLoggedInUser(){
    var currentUser = Parse.User.current();
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        localStorage.setItem('user', null);
      }
  }
}