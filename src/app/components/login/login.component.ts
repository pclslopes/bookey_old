import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router, RouterModule, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      hideRequired: false,
      floatLabel: 'never',
    });
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
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
    this.authService.doLogin(value);
    //this.authService.doLogi(value)
    //.then(res => {
    //  this.router.navigate(['/user']);
    //}, err => {
    //  console.log(err);
    //  this.errorMessage = err.message;
    //})
  }
}