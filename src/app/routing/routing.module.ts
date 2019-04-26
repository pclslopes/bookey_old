// routing.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent, DialogContentComponent } from '../templates_old/templates.component';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FormTemplateComponent } from '../components/form-template/form-template.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterUserComponent } from '../components/register-user/register-user.component';
import { UserComponent } from '../components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterUserComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
  { path: 'dashboard', component: DashboardComponent },
  { path: 'template', component: FormTemplateComponent },
  { path: 'template_old', component: TemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }