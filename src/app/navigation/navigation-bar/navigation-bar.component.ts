import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth2Service } from '../../services/auth2.service';

@Component({
  selector: 'crm-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
      public authService: Auth2Service,
      private router: Router
    ) {}

  public navProfile() {
    this.router.navigate(['user']);
  }

  public logout() {
    this.authService.doLogout();
    this.router.navigate(['/']);
  }

  public login() {
    this.router.navigate(['login']);
  }

}
