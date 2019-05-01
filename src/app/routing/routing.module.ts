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

// Authentication
import { UserResolver } from '../components/user/user.resolver';

import { AuthGuard } from  '../services/auth.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'template', component: FormTemplateComponent, canActivate: [AuthGuard] },
  { path: 'template_old', component: TemplateComponent, canActivate: [AuthGuard] },
];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})
//export class RoutingModule { }