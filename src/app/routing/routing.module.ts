// routing.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { Routes, RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TemplateComponent, DialogContentComponent } from '../templates_old/templates.component';

// Components
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FormTemplateComponent } from '../components/form-template/form-template.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterUserComponent } from '../components/register-user/register-user.component';
import { UserComponent } from '../components/user/user.component';
import { HomeComponent } from '../components/home/home.component';
import { BookingsComponent } from '../components/bookings/bookings.component';
import { NewBookingComponent } from '../components/new-booking/new-booking.component';
import { PropertiesComponent } from '../components/properties/properties.component';
import { NewPropertyComponent } from '../components/new-property/new-property.component';
import { ExpensesComponent } from '../components/expenses/expenses.component';
import { NewExpenseComponent } from '../components/new-expense/new-expense.component';
import { CustomersComponent } from '../components/customers/customers.component';

// Authentication
//import { UserResolver } from '../components/user/user.resolver';
import { AuthGuard } from  '../services/auth.guard';
import { AnonymousGuard } from  '../services/anonymous.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
  { path: '404',  redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [AnonymousGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard]},
  { path: 'register', component: RegisterUserComponent, canActivate: [AnonymousGuard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard]},
  { path: 'new-booking', component: NewBookingComponent, canActivate: [AuthGuard]},
  { path: 'properties', component: PropertiesComponent, canActivate: [AuthGuard]},
  { path: 'new-property', component: NewPropertyComponent, canActivate: [AuthGuard]},
  { path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard]},
  { path: 'new-expense', component: NewExpenseComponent, canActivate: [AuthGuard]},
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'template', component: FormTemplateComponent, canActivate: [AuthGuard] },
  { path: 'template_old', component: TemplateComponent, canActivate: [AuthGuard] },
];
