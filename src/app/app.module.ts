import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';

// Modules
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { AppMaterialModule } from './app.material.module';
import { rootRouterConfig } from './routing/routing.module';
import { CustomReuseStrategy } from './services/customreusestrategy';

// Components
import { AppComponent } from './app.component';
import { TemplateComponent, DialogContentComponent } from './templates_old/templates.component';
import { CommandBarComponent } from './navigation/command-bar/command-bar.component';
import { FooterBarComponent } from './navigation/footer-bar/footer-bar.component';
import { NavComponent } from './navigation/nav/nav.component';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { PlaceholderComponent } from './navigation/placeholder/placeholder.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { NewPropertyComponent } from './components/new-property/new-property.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { NewExpenseComponent } from './components/new-expense/new-expense.component';
import { CustomersComponent } from './components/customers/customers.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { CalendarComponent } from './components/calendar/calendar.component';

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
import { DynamicAutoCompleteComponent } from "./dynamic-forms/components/dynamic-autocomplete/dynamic-autocomplete.component";

// Environment
import { environment } from '../environments/environment';

//Services
import { AuthParseService } from './services/auth.parse.service';
import { AuthGuard } from './services/auth.guard';
import { AnonymousGuard } from './services/anonymous.guard';
import { UserService } from './services/user.service';
import { BookingsService } from './services/bookings.service';
import { PropertyService } from './services/property.service';
import { CustomerService } from './services/customer.service';
import { ExpensesService } from './services/expenses.service';
import { ExpenseTypesService } from './services/expensetypes.service';
import { CountryService } from './services/country.service';
import { DataService } from './services/data.service';

// Store / Redux
//import { appStoreProviders } from './store/store';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  declarations: [
    AppComponent, 
    DialogContentComponent,
    DashboardComponent,
    FormTemplateComponent,
    LoginComponent,
    RegisterUserComponent,
    UserComponent,
    HomeComponent,
    BookingsComponent,
    NewBookingComponent,
    PropertiesComponent,
    NewPropertyComponent,
    ExpensesComponent,
    NewExpenseComponent,
    CustomersComponent,
    NewCustomerComponent,
    TemplateComponent,
    CalendarComponent,
    CommandBarComponent,
    FooterBarComponent,
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
    DynamicFormComponent,
    DynamicAutoCompleteComponent
  ],
  entryComponents: [
    DialogContentComponent,
    DynamicInputComponent,
    DynamicTextAreaComponent,
    DynamicButtonComponent,
    DynamicSelectComponent,
    DynamicDateComponent,
    DynamicRadiobuttonComponent,
    DynamicCheckboxComponent,
    DynamicAutoCompleteComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthParseService, 
    AuthGuard, 
    AnonymousGuard, 
    UserService, 
    BookingsService, 
    PropertyService, 
    CustomerService,
    ExpensesService,
    ExpenseTypesService,
    CountryService,
    DataService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
    //appStoreProviders
  ],
})
export class AppModule { }
