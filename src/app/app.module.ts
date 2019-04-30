import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatTableModule } from '@angular/material';

// Modules
//import { RoutingModule } from './routing/routing.module';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from './app.material.module';
import { rootRouterConfig } from './routing/routing.module';

// Components
import { AppComponent } from './app.component';
import { TemplateComponent, DialogContentComponent } from './templates_old/templates.component';
import { CommandBarComponent } from './navigation/command-bar/command-bar.component';
import { NavComponent } from './navigation/nav/nav.component';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { PlaceholderComponent } from './navigation/placeholder/placeholder.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserComponent } from './components/user/user.component';

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

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

//Services
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserResolver } from './components/user/user.resolver';

import { Auth2Service } from './services/auth2.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    MatTableModule,
    
  ],
  declarations: [
    AppComponent, 
    DialogContentComponent,
    DashboardComponent,
    FormTemplateComponent,
    LoginComponent,
    RegisterUserComponent,
    UserComponent,
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
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }, AuthService, UserService, UserResolver, AuthGuard, Auth2Service],
})
export class AppModule { }
