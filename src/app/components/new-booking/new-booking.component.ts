import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {
  
  isEdit = false;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Customer Name",
      inputType: "text",
      name: "customerName",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Customer Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z ]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "input",
      label: "Property",
      inputType: "text",
      name: "property",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Property Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z ]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "date",
      label: "Check-in",
      name: "checkInDate",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Check-In Date Required"
        }
      ]
    },
    {
      type: "date",
      label: "Check-out",
      name: "checkOutDate",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Check-Out Date Required"
        }
      ]
    }
  ];

  submit(value: any) {
    alert('test');
  }

  ngOnInit() {
  }

}