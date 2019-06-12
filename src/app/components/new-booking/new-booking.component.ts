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
  times: any = [
    
    {id:"1500", name:"15:00"},
    {id:"1530", name:"15:30"},
    {id:"1600", name:"16:00"},
    {id:"1630", name:"16:30"},
    {id:"1700", name:"17:00"},
    {id:"1730", name:"17:30"},
    {id:"1800", name:"18:00"},
    {id:"1830", name:"18:30"},
    {id:"1900", name:"19:00"},
    {id:"1930", name:"19:30"},
    {id:"2000", name:"20:00"},
    {id:"2030", name:"20:30"},
    {id:"2100", name:"21:00"},
    {id:"2130", name:"21:30"},
    {id:"2200", name:"22:00"},
    {id:"2230", name:"22:30"},
    {id:"2300", name:"23:00"},
    {id:"2330", name:"23:30"},
    {id:"0000", name:"00:00"},
    {id:"0030", name:"00:30"},
    {id:"0100", name:"01:00"},
    {id:"0130", name:"01:30"},
    {id:"0200", name:"02:00"},
    {id:"0230", name:"02:30"},
    {id:"0300", name:"03:00"},
    {id:"0330", name:"03:30"},
    {id:"0400", name:"04:00"},
    {id:"0430", name:"04:30"},
    {id:"0500", name:"05:00"},
    {id:"0530", name:"05:30"},
    {id:"0600", name:"06:00"},
    {id:"0630", name:"06:30"},
    {id:"0700", name:"07:00"},
    {id:"0730", name:"07:30"},
    {id:"0800", name:"08:00"},
    {id:"0830", name:"08:30"},
    {id:"0900", name:"09:00"},
    {id:"0930", name:"09:30"},
    {id:"1000", name:"10:00"},
    {id:"1030", name:"10:30"},
    {id:"1100", name:"11:00"},
    {id:"1130", name:"11:30"},
    {id:"1200", name:"12:00"},
    {id:"1230", name:"12:30"},
    {id:"1300", name:"13:00"},
    {id:"1330", name:"13:30"},
    {id:"1400", name:"14:00"},
    {id:"1430", name:"14:30"}
  ];

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Customer Name",
      inputType: "text",
      name: "customer",
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
    },
    {
      type: "select",
      label: "Check-In Time",
      name: "checkInTime",
      options: this.times
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

      this.propertyService.getProperties().then(data => {
        this.properties = data;
        console.log("this.property result: "+JSON.stringify(this.properties));
        //console.log("form: "+ JSON.stringify(this.form.form));
        if(this.properties){
          // this.id = this.property.objectId;
          //this.form.fields.options = this.properties;
          this.form.setFormPropertyField("property", "options", this.properties);
          //this.form.setFormPropertyField("checkInTime", "options", this.times);
          //this.regConfig["property"].options = this.properties;

          if (params['id']) {
            this.bookingService.getBookingById(params['id']).then(data => {
              console.log("getBookingById result: "+JSON.stringify(data));
              this.booking = data;
              console.log("this.booking result: "+JSON.stringify(this.booking));
              //console.log("form: "+ JSON.stringify(this.form.form));
              if(this.booking){
                this.id = this.booking.id;
                this.form.form.controls['checkInDate'].setValue(this.booking.checkInDate);
                this.form.form.controls['checkOutDate'].setValue(this.booking.checkOutDate);
                this.form.form.controls["customer"].setValue(this.booking.customer);
                this.form.form.controls["checkInTime"].setValue(this.booking.checkInTime);
                this.form.form.controls["property"].setValue(this.booking.property.id);
              }
            });      
          }
        }
      });
        
    });
  }


  onSubmit(value: any) {
    
    if(this.form.form.valid){
        
        console.log("Is this update? id:"+this.id);

        if(this.id){
          value["id"] = this.id;
          this.bookingService.updateBooking(value).then(data => {
            this.location.back();
          });
        }else{
          this.bookingService.createBooking(value).then(data => {
            this.location.back();
          });
        }
        console.log("Form: "+JSON.stringify(value));

        
      }else{
        //form.form.validations
        this.snackbar.open('Please fill all mandatory fields', 'OK', { duration: 3000 });
        return;
      }
  }
  
  onCancel(){
    this.location.back();
  }
}