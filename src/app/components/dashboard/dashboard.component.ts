import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute } from '@angular/router';
//import * as firebase from "firebase";
// Dynamic Forms
//import { TestModel } from "../models/test-model.model";
//import { DynamicFormModel, DynamicFormService } from "@ng-dynamic-forms/core";

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface Contact {

  id?: string;
  displayName?: string;
  title?: string;
  givenName?: string;
  middleName?: string;     // otherNames
  familyName?: string;
  honorific?: string;
  salutation?: string;     // formalSalutation
  preferredName?: string;  // informalSalutation
  initials?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  photoUrl?: string;

  'organisation': {
    id?: string;
    name?: string;
    phoneNumber?: string;
  };

  'address': {
    id?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    // country?: string;
  };
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  // providers: [ { provide: LoggerService, useClass: ConsoleLoggerService } ]
})
export class DashboardComponent implements OnInit {

  //formModel: DynamicFormModel = TestModel;
  //formGroup: FormGroup;

  protected subscription: Subscription;

  public items: Array<Contact>;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  //constructor(private formService: DynamicFormService) {
  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute
    ) {

  }

  public ngOnInit() {
    //this.formGroup = this.formService.createFormGroup(this.formModel);
    //console.log(firebase.auth().currentUser);
  }
}
