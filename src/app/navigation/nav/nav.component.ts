import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
  showAnonymous?: boolean;
  showAuth?: boolean;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  mainRoutes: ROUTE[] = [
    {
      icon: 'dashboard',
      route: 'dashboard',
      title: 'Dashboard',
      showAnonymous: false,
      showAuth: true
    },
    {
      icon: 'dashboard',
      route: 'home',
      title: 'Home',
      showAnonymous: true,
      showAuth: false
    },
    {
      icon: 'fingerprint',
      route: 'login',
      title: 'Login',
      showAnonymous: true,
      showAuth: false
    },
  ];

  bookingRoutes: ROUTE[] = [
    {
      icon: 'bookmarks',
      route: 'booking',
      title: 'Bookings',
      showAnonymous: false,
      showAuth: true
    }, {
      icon: 'date_range',
      route: 'calendar',
      title: 'Calendar',
      showAnonymous: false,
      showAuth: true
    }, {
      icon: 'trending_up',
      route: 'prices',
      title: 'Prices',
      showAnonymous: false,
      showAuth: true
    }, {
      icon: 'contacts',
      route: 'guest-crm',
      title: 'Guest CRM',
      showAnonymous: false,
      showAuth: true
    }
  ];

  expensesRoutes: ROUTE[] = [
    {
      icon: 'add_shopping_cart',
      route: 'expenses',
      title: 'Expenses',
      showAnonymous: false,
      showAuth: true
    }, {
      icon: 'assignment',
      route: 'comissions',
      title: 'Comissions',
      showAnonymous: false,
      showAuth: true
    }, {
      icon: 'attach_money',
      route: 'payments',
      title: 'Payments',
      showAnonymous: false,
      showAuth: true
    }
  ];

  otherRoutes: ROUTE[] = [
    {
      icon: 'assignment',
      route: 'template',
      title: 'Form Template',
      showAnonymous: true,
      showAuth: true
    }, {
      icon: 'contacts',
      route: 'template_old',
      title: 'Old Template',
      showAnonymous: true,
      showAuth: true
    }
  ];

  constructor(public authService: AuthService) {}

}

