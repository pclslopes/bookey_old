import { Injectable } from  '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
    providedIn:  'root'
})
export  class  AuthService {
  
    user: User;

    constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.setItem('user', null);
        }
      })

    }

  async doLogin(value) {
    try {
        await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
        this.router.navigate(['dashboard']);
    } catch (e) {
        alert("Error!" + e.message);
    }
  }

  async doLogout(){
      await this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['login']);
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
}