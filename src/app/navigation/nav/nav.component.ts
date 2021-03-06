import { Component } from '@angular/core';
import { AuthParseService } from '../../services/auth.parse.service'
import { RouterOutlet } from '@angular/router';
import { slider, transformer, fader, stepper } from '../../routing/router.animations';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    fader,
    //slider,
    //transformer,
    //stepper
  ]
})
export class NavComponent {

anonymousRoutes: ROUTE[] = [
    {
      icon: 'dashboard',
      route: 'home',
      title: 'Home',
    },
    {
      icon: 'fingerprint',
      route: 'login',
      title: 'Login',
    }
  ];

  mainRoutes: ROUTE[] = [
    {
      icon: 'dashboard',
      route: 'dashboard',
      title: 'Dashboard',
    }
  ];

  bookingRoutes: ROUTE[] = [
    {
      icon: 'location_city',
      route: 'properties',
      title: 'Properties',
    }, {
      icon: 'bookmarks',
      route: 'bookings',
      title: 'Bookings',
    }, {
      icon: 'date_range',
      route: 'calendar',
      title: 'Calendar',
    }, {
      icon: 'trending_up',
      route: 'prices',
      title: 'Prices',
    }, {
      icon: 'contacts',
      route: 'customers',
      title: 'Guest CRM',
    }
  ];

  expensesRoutes: ROUTE[] = [
    {
      icon: 'add_shopping_cart',
      route: 'expenses',
      title: 'Expenses',
    }, {
      icon: 'assignment',
      route: 'comissions',
      title: 'Comissions',
    }, {
      icon: 'attach_money',
      route: 'payments',
      title: 'Payments',
    }
  ];

  otherRoutes: ROUTE[] = [
    {
      icon: 'assignment',
      route: 'template',
      title: 'Form Template',
    }, {
      icon: 'contacts',
      route: 'template_old',
      title: 'Old Template',
    }
  ];

  constructor(public authService: AuthParseService) {}

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"];
  }
}

