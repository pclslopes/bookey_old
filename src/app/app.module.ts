import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Modules
import { RoutingModule } from './routing/routing.module';
import { AppMaterialModule } from './app.material.module';

// Components
import { AppComponent } from './app.component';
import { TemplateComponent, DialogContentComponent } from './templates/templates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommandBarComponent } from './components/command-bar/command-bar.component';
import { NavComponent } from './nav/nav/nav.component';
import { NavigationBarComponent } from './nav/navigation-bar/navigation-bar.component';
import { PlaceholderComponent } from './nav/placeholder/placeholder.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule
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
