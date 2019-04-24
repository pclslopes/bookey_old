import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatTableModule } from '@angular/material';

// Modules
import { RoutingModule } from './routing/routing.module';
import { AppMaterialModule } from './app.material.module';

// Components
import { AppComponent } from './app.component';
import { TemplateComponent, DialogContentComponent } from './templates/templates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommandBarComponent } from './navigation/command-bar/command-bar.component';
import { NavComponent } from './navigation/nav/nav.component';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { PlaceholderComponent } from './navigation/placeholder/placeholder.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule 
  ],
  declarations: [
    AppComponent, 
    DialogContentComponent,
    DashboardComponent,
    CommandBarComponent,
    NavComponent,
    NavigationBarComponent,
    PlaceholderComponent
  ],
  entryComponents: [DialogContentComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
