import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Validators } from "@angular/forms";
import { AuthParseService } from '../../services/auth.parse.service'
import { CustomerModel } from '../../models/customer.model';
import { BookingsService } from '../../services/bookings.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-new-nested-booking',
  //templateUrl: './new-nested-booking.component.html',
  styleUrls: ['./new-nested-booking.component.scss'],
  template: '<dynamic-form [fields]="regConfig" (ngSubmit)="submit($event)"></dynamic-form>',
  //inputs: ['id']
})
export class NewNestedBookingComponent implements OnInit {
  @Input() id:string;
  @Output() notifyLoadComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

  booking;
  properties;
  bookingStatus;
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
    private propertyService: PropertyService,
    private bookingService: BookingsService,
  ) { }

  ngOnInit() {
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

          console.log("BOOKING ID: " + this.id);
          if (this.id) {
            this.bookingService.getBookingById(this.id).then(data => {
              console.log("getBookingById result: "+JSON.stringify(data));
              this.booking = data;

              if(this.booking){
                //this.id = this.booking.id;
                this.form.form.controls['checkInDate'].setValue(this.booking.checkInDate);
                this.form.form.controls['checkOutDate'].setValue(this.booking.checkOutDate);
                this.form.form.controls["checkInTime"].setValue(this.booking.checkInTime);
                this.form.form.controls["property"].setValue(this.booking.property.id);
                this.form.form.controls["status"].setValue(this.booking.status.id);
                this.form.form.controls["platform"].setValue(this.booking.platform);
                this.form.form.controls["commissionableAmount"].setValue(this.booking.commissionableAmount);
                this.form.form.controls["commission"].setValue(this.booking.commission);
                this.form.form.controls["cleaningFee"].setValue(this.booking.cleaningFee);
                this.form.form.controls["cityTax"].setValue(this.booking.cityTax);
                this.form.form.controls["receivedTotal"].setValue(this.booking.receivedTotal);
                this.form.form.controls["adultGuests"].setValue(this.booking.adultGuests);
                this.form.form.controls["childGuests"].setValue(this.booking.childGuests);
                this.form.form.controls["isReceived"].setValue(this.booking.isReceived);
              }
              this.notifyLoadComplete.emit(true);
            });      
          }else{
            this.notifyLoadComplete.emit(true);
          }

        });
      }
    });
  }

  public getForm():DynamicFormComponent{
    return this.form;
  }
}