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

// Authentication
import { UserResolver } from '../components/user/user.resolver';
import { AuthGuard } from  '../services/auth.guard';
import { AnonymousGuard } from  '../services/anonymous.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AnonymousGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard]},
  { path: 'register', component: RegisterUserComponent, canActivate: [AnonymousGuard]},
  { path: 'user', component: UserComponent, resolve: { data: UserResolver}, canActivate: [AuthGuard]},
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard]},
  { path: 'new-booking', component: NewBookingComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'template', component: FormTemplateComponent, canActivate: [AuthGuard] },
  { path: 'template_old', component: TemplateComponent, canActivate: [AuthGuard] },
];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})
//export class RoutingModule { }