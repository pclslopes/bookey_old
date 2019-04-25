import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router) {}

  public profile() {
    //this.authService.logout();
    this.router.navigate(['/']);
  }

  public logout() {
    //this.authService.logout();
    this.router.navigate(['/']);
  }

}
