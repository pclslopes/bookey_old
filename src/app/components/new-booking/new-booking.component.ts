import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { NewNestedCustomerComponent } from '../new-nested-customer/new-nested-customer.component';
import { NewNestedBookingComponent } from '../new-nested-booking/new-nested-booking.component';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
  //directives: [NewNestedCustomerComponent, NewNestedBookingComponent]
})
export class NewBookingComponent implements OnInit {

  id;
  booking;
  isBookingLoading = true;
  isCustomerLoading = true;
  isLoading = true;
    
  @ViewChild(NewNestedCustomerComponent) customerComponent : NewNestedCustomerComponent;
  @ViewChild(NewNestedBookingComponent) bookingComponent : NewNestedBookingComponent;
  
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
      this.id = params["id"];
console.log("Master ID: "+ JSON.stringify(this.id));

        
    });
  }


  onSubmit() {
    let bookingForm = this.bookingComponent.getForm();
    let customerForm = this.customerComponent.getForm();
    alert(JSON.stringify(bookingForm));
    alert(JSON.stringify(customerForm));

    if(this.bookingComponent.isFormValid() && this.customerComponent.isFormValid()){
        
        console.log("Is this update? id:"+this.id);

        if(this.id){
          //value["id"] = this.id;
          this.bookingService.updateBooking(bookingForm, customerForm).then(data => {
            this.location.back();
          });
        }else{
          this.bookingService.createBooking(bookingForm, customerForm).then(data => {
            this.location.back();
          });
        }
      }else{
        //form.form.validations
        this.snackbar.open('Please fill all mandatory fields', 'OK', { duration: 3000 });
        return;
      }
  }
  
  onCancel(){
    this.location.back();
  }
  onNewCustomer(){
    
  }

  onNotifyLoadComplete($event, componentName){
    if(componentName === 'booking'){
      this.isBookingLoading = false;
    }
    if(componentName === 'customer'){
      this.isCustomerLoading = false;
    }
    if(!this.isBookingLoading && !this.isCustomerLoading){
      this.isLoading = false;
    }
  }
}