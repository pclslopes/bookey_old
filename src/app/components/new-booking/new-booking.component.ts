import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Validators } from "@angular/forms";
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";
import { MatSnackBar } from '@angular/material';
import { Router, RouterModule, Params, ActivatedRoute } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service'
import { BookingsService } from '../../services/bookings.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {
  
  id;
  booking;
  properties;

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
      type: "select",
      label: "Property",
      name: "property",
      options: [],
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Property Required"
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
    private snackbar: MatSnackBar,
    private location: Location,
    private propertyService: PropertyService,
    private bookingService: BookingsService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {  
      console.log("Params: "+ JSON.stringify(params));
      if (params['id']) {

        this.propertyService.getProperties().then(data => {
          this.properties = data;
          console.log("this.property result: "+JSON.stringify(this.properties));
          //console.log("form: "+ JSON.stringify(this.form.form));
          if(this.properties){
            // this.id = this.property.objectId;
            this.form.form.controls['property'].options = (this.properties);
            this.regConfig["property"].options = this.properties;

            this.bookingService.getBookingById(params['id']).then(data => {
              console.log("getBookingById result: "+JSON.stringify(data));
              this.booking = data;
              console.log("this.booking result: "+JSON.stringify(this.booking));
              //console.log("form: "+ JSON.stringify(this.form.form));
              if(this.booking){
                this.id = this.booking.objectId;
                this.form.form.controls['checkInDate'].setValue(this.booking.checkInDate);
                this.form.form.controls['checkOutDate'].setValue(this.booking.checkOutDate);
              }

            });      
          }
        });

        
      }
    });
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
  
  onCancel(){
    this.location.back();
  }
}