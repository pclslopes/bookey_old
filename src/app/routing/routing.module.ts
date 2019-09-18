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
import { NewCustomerComponent } from '../components/new-customer/new-customer.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { ComissionsComponent } from '../components/comissions/comissions.component';

// Authentication
//import { UserResolver } from '../components/user/user.resolver';
import { AuthGuard } from  '../services/auth.guard';
import { AnonymousGuard } from  '../services/anonymous.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
  { path: '404',  redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [AnonymousGuard], data: {animation: 'isRight'}},
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard], data: {animation: 'isRight'}},
  { path: 'register', component: RegisterUserComponent, canActivate: [AnonymousGuard], data: {animation: 'isRight'}},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'new-booking', component: NewBookingComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'properties', component: PropertiesComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'new-property', component: NewPropertyComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'new-expense', component: NewExpenseComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'new-customer', component: NewCustomerComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'template', component: FormTemplateComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'template_old', component: TemplateComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
  { path: 'comissions', component: CalendarComponent, canActivate: [AuthGuard], data: {animation: 'isRight'}},
];
