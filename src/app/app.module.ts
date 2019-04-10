import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { TemplateComponent, DialogContentComponent } from './templates/templates.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavlistComponent } from './navigation/sidenavlist/sidenavlist.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent, 
    DialogContentComponent,
    HeaderComponent,
    SidenavistComponent],
  entryComponents: [DialogContentComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
