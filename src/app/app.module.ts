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
import { TemplateComponent, DialogContentComponent } from './templates_old/templates.component';
import { CommandBarComponent } from './navigation/command-bar/command-bar.component';
import { NavComponent } from './navigation/nav/nav.component';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { PlaceholderComponent } from './navigation/placeholder/placeholder.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';

// Dynamic-Forms
import { DynamicInputComponent } from "./dynamic-forms/components/dynamic-input/dynamic-input.component";
import { DynamicTextAreaComponent } from "./dynamic-forms/components/dynamic-textarea/dynamic-textarea.component";
import { DynamicButtonComponent } from "./dynamic-forms/components/dynamic-button/dynamic-button.component";
import { DynamicSelectComponent } from "./dynamic-forms/components/dynamic-select/dynamic-select.component";
import { DynamicDateComponent } from "./dynamic-forms/components/dynamic-date/dynamic-date.component";
import { DynamicRadiobuttonComponent } from "./dynamic-forms/components/dynamic-radiobutton/dynamic-radiobutton.component";
import { DynamicCheckboxComponent } from "./dynamic-forms/components/dynamic-checkbox/dynamic-checkbox.component";
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
  ],
  declarations: [
    AppComponent, 
    DialogContentComponent,
    DashboardComponent,
    FormTemplateComponent,
    TemplateComponent,
    CommandBarComponent,
    NavComponent,
    NavigationBarComponent,
    PlaceholderComponent,
    DynamicInputComponent,
    DynamicTextAreaComponent,
    DynamicButtonComponent,
    DynamicSelectComponent,
    DynamicDateComponent,
    DynamicRadiobuttonComponent,
    DynamicCheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent
  ],
  entryComponents: [
    DialogContentComponent,
    DynamicInputComponent,
    DynamicTextAreaComponent,
    DynamicButtonComponent,
    DynamicSelectComponent,
    DynamicDateComponent,
    DynamicRadiobuttonComponent,
    DynamicCheckboxComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
