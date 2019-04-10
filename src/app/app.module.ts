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
import { HeaderComponent } from './navigation/header/header.component';
import { NavtabsComponent } from './navigation/navtabs/navtabs.component'
import { SidenavlistComponent } from './navigation/sidenavlist/sidenavlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommandBarComponent } from './components/command-bar/command-bar.component';

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
    HeaderComponent,
    NavtabsComponent,
    SidenavlistComponent,
    DashboardComponent,
    CommandBarComponent
  ],
  entryComponents: [DialogContentComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
