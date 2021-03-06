import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthParseService } from './auth.parse.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthParseService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
      if(this.authService.isLoggedIn){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
    }
}