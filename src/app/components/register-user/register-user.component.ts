import { Component } from '@angular/core';
import { AuthParseService } from '../../services/auth.parse.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  env = environment;
  registerForm: FormGroup;

  constructor(
    public authService: AuthParseService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required],
       repeat_password: ['',Validators.required]
     });
   }

   tryFacebookLogin(){
     //this.authService.doFacebookLogin()
     //.then(res =>{
     //  this.router.navigate(['/user']);
     //}, err => console.log(err)
     //)
   }

   tryTwitterLogin(){
     //this.authService.doTwitterLogin()
     //.then(res =>{
     //  this.router.navigate(['/user']);
     //}, err => console.log(err)
     //)
   }

   tryGoogleLogin(){
     //this.authService.doGoogleLogin()
     //.then(res =>{
     //  this.router.navigate(['/user']);
     //}, err => console.log(err)
     //)
   }

    tryRegister(value){
      if(value.password != value.repeat_password){
        this.snackbar.open("Passwords differ", 'OK', { duration: 3000 });
      }

      this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.snackbar.open("User registered successfully", 'OK', { duration: 3000 });
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.snackbar.open(err.message, 'OK', { duration: 3000 });
      })
    }

}