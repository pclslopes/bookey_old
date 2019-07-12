import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Validators } from "@angular/forms";
import { AuthParseService } from '../../services/auth.parse.service'
import { CustomerModel } from '../../models/customer.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-new-nested-customer',
  templateUrl: './new-nested-customer.component.html',
  styleUrls: ['./new-nested-customer.component.scss'],
  template: '<dynamic-form [fields]="regConfig" (ngSubmit)="submit($event)"></dynamic-form>'
})
export class NewNestedCustomerComponent implements OnInit {
  @Input() id:string;
  @Output() notifyLoadComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

  countries;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Customer Name",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Customer Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z0-9_ ]*$"),
          message: "Accept only text",
        }
      ]
    },
    {
      type: "select",
      label: "Coutry",
      name: "country",
      options: [],
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Country Required"
        }
      ]
    },
    {
      type: "input",
      label: "Email",
      inputType: "text",
      name: "email",
      validations: [
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
          message: "Accept only email"
        }
      ]
    },
    {
      type: "input",
      label: "Phone",
      inputType: "text",
      name: "phone",
      validations: [
        {
          name: "pattern",
          validator: Validators.pattern("(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})"),
          message: "Accept only phone number"
        }
      ]
    }
  ];

  constructor(
    public authService: AuthParseService,
    private countryService: CountryService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.countryService.getAllCountries().then(dataCountries => {
      this.countries = dataCountries;
      // Set combo options
      this.form.setFormPropertyField("country", "options", this.countries);

      this.notifyLoadComplete.emit(true);
    });
  }

  public getForm():DynamicFormComponent{
    return this.form;
  }
}