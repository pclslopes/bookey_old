import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";
import { MatSnackBar } from '@angular/material';
import { Router, RouterModule, Params } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service'

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

  constructor(
    public authService: AuthParseService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    
  }

  onSubmit(value: any) {
    
    if(this.form.form.valid){
      //const formValue = this.questionsForm.value;
      alert(JSON.stringify(value));
    }else{
      //form.form.validations
      this.snackbar.open('Please fill all mandatory fields', 'OK', { duration: 3000 });
      return;
    }
    //Extend the native Parse.Object class.
    //var ListItem = Parse.Object.extend("ListItem");

    //Instantiate an object of the ListItem class
    //var listItem = new ListItem();

    //listItem is now the object that we want to save, so we assign the properties that we want on it.
    //listItem.set("content", text);
    //listItem.set("isComplete", false);

    //We call the save method, and pass in success and failure callback functions.
    //listItem.save(null, {       
    //    success: function(item) {
        //Success Callback 
    //},
    //error: function(gameScore, error) {
        //Failure Callback
    //}
    //});
  }

  ngOnInit() {
  }

}