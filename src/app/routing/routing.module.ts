// routing.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FormTemplateComponent } from '../components/form-template/form-template.component';
import { TemplateComponent, DialogContentComponent } from '../templates_old/templates.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'template', component: FormTemplateComponent },
  { path: 'template_old', component: TemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }