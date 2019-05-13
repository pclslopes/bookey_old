import { Component } from '@angular/core';
import { AuthParseService } from '../../services/auth.parse.service'
import { Router, RouterModule, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  
  env = environment;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthParseService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required ]
    });
  }

  tryFacebookLogin(){
    //this.authService.doFacebookLogin()
    //.then(res => {
    //  this.router.navigate(['/user']);
    //})
  }

  tryTwitterLogin(){
    //this.authService.doTwitterLogin()
    //.then(res => {
    //  this.router.navigate(['/user']);
    //})
  }

  tryGoogleLogin(){
    //this.authService.doGoogleLogin()
    //.then(res => {
    //  this.router.navigate(['/user']);
    //})
  }

  tryLogin(value){
    // Validations
    if(!value.email || !value.password){
      this.snackbar.open('Invalid email or password', 'OK', { duration: 3000 });
      return;
    }

    this.authService.doLogin(value).then((results) => {
      if(results){
        this.snackbar.open(results, 'OK', { duration: 3000 });
      }
    });

    //this.authService.doLogi(value)
    //.then(res => {
    //  this.router.navigate(['/user']);
    //}, err => {
    //  console.log(err);
    //  this.errorMessage = err.message;
    //})
  }
}