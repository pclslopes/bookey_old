import { Component } from '@angular/core';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  myWorkRoutes: ROUTE[] = [
    {
      icon: 'dashboard',
      route: 'dashboard',
      title: 'Dashboard',
    },
    {
      icon: 'assignment',
      route: 'template',
      title: 'Form Template',
    }
  ];

  customerRoutes: ROUTE[] = [
    {
      icon: 'contacts',
      route: 'template_old',
      title: 'Old Template',
    }, {
      icon: 'people',
      route: '/',
      title: 'Contacts',
    }, {
      icon: 'settings_phone',
      route: '/',
      title: 'Leads',
    }, {
      icon: 'account_box',
      route: '/',
      title: 'Opportunities',
    }
  ];

  constructor() {}

  public isAuthenticated() {
    return true;
  }

}

