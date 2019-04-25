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
      route: 'sales/accounts',
      title: 'Accounts',
    }, {
      icon: 'people',
      route: 'sales/contacts',
      title: 'Contacts',
    }, {
      icon: 'settings_phone',
      route: 'sales/leads',
      title: 'Leads',
    }, {
      icon: 'account_box',
      route: 'sales/opportunities',
      title: 'Opportunities',
    }
  ];

  constructor() {}

  public isAuthenticated() {
    return true;
  }

}

