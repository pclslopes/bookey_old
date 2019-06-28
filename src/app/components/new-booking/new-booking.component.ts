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
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {
  
  id;
  booking;
  properties;
  bookingStatus;
  countries;
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
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [],
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Status Required"
        }
      ]
    },
    {
      type: "select",
      label: "Platform",
      name: "platform",
      options: [{id:"1", name:"Airbnb"}, {id:"2", name:"Booking"}],
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
      label: "Commissionable Amount",
      inputType: "number",
      name: "commissionableAmount",
      validations: [
        {
          name: "pattern",
          validator: Validators.required,
          message: "Commissionable Amount is mandatory"
        }
      ]
    },
    {
      type: "input",
      label: "Commission",
      inputType: "number",
      name: "commission",
      validations: [
        {
          name: "pattern",
          validator: Validators.required,
          message: "Commission is mandatory"
        }
      ]
    },
    {
      type: "input",
      label: "Cleaning Fee",
      inputType: "number",
      name: "cleaningFee",
      validations: [
        {
          name: "pattern",
          validator: Validators.required,
          message: "Cleaning Fee is mandatory"
        }
      ]
    },
    {
      type: "input",
      label: "City Tax",
      inputType: "number",
      name: "cityTax",
      validations: [
        {
          name: "pattern",
          validator: Validators.required,
          message: "City Tax is mandatory"
        }
      ]
    },
    {
      type: "input",
      label: "Received Total",
      inputType: "number",
      name: "receivedTotal",
      validations: [
        {
          name: "pattern",
          validator: Validators.required,
          message: "Received Total is mandatory"
        }
      ]
    },
    {
      type: "input",
      label: "Adults",
      inputType: "number",
      name: "adultGuests",
      validations: [
        {
          name: "pattern",
          validator: Validators.required,
          message: "Mandatory"
        }
      ]
    },
    {
      type: "input",
      label: "Childs",
      inputType: "number",
      name: "childGuests",
      validations: [
        {
          name: "pattern",
          validator: Validators.required,
          message: "Received Total is manatory"
        }
      ]
    },
    {
      type: "checkbox",
      label: "Received?",
      name: "isReceived",
    }
  ];

  constructor(
    public authService: AuthParseService,
    private router: Router,
    private snackbar: MatSnackBar,
    private location: Location,
    private propertyService: PropertyService,
    private bookingService: BookingsService,
    private countryService: CountryService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {  
      console.log("Params: "+ JSON.stringify(params));

      this.propertyService.getProperties().then(data => {
        // set properties
        this.properties = data;

        if(this.properties){

          // Set combo options
          this.form.setFormPropertyField("property", "options", this.properties);

          this.bookingService.getAllBookingStatus().then(dataStatus => {
            
            this.bookingStatus = dataStatus;

            // Set combo options
            this.form.setFormPropertyField("status", "options", this.bookingStatus);

            this.countryService.getAllCountries().then(dataCountries => {
            
              this.countries = dataCountries;

              // Set combo options
              this.form.setFormPropertyField("country", "options", this.countries);

              if (params['id']) {
                this.bookingService.getBookingById(params['id']).then(data => {
                  console.log("getBookingById result: "+JSON.stringify(data));
                  this.booking = data;

                  if(this.booking){
                    this.id = this.booking.id;
                    this.form.form.controls['checkInDate'].setValue(this.booking.checkInDate);
                    this.form.form.controls['checkOutDate'].setValue(this.booking.checkOutDate);
                    this.form.form.controls["customer"].setValue(this.booking.customer);
                    this.form.form.controls["checkInTime"].setValue(this.booking.checkInTime);
                    this.form.form.controls["property"].setValue(this.booking.property.id);
                    this.form.form.controls["status"].setValue(this.booking.status.id);
                  }
                });      
              }
            });
          });
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