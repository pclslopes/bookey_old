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

// Dynamic-Forms
import { InputComponent } from "./dynamic-forms/components/dynamic-input/dynamic-input.component";
import { ButtonComponent } from "./dynamic-forms/components/dynamic-button/dynamic-button.component";
import { SelectComponent } from "./dynamic-forms/components/dynamic-select/dynamic-select.component";
import { DateComponent } from "./dynamic-forms/components/dynamic-date/dynamic-date.component";
import { RadiobuttonComponent } from "./dynamic-forms/components/dynamic-radiobutton/dynamic-radiobutton.component";
import { CheckboxComponent } from "./dynamic-forms/components/dynamic-checkbox/dynamic-checkbox.component";
import { DynamicFieldDirective } from "./dynamic-forms/components/dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./dynamic-forms/components/dynamic-form/dynamic-form.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent
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
  entryComponents: [
    DialogContentComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
