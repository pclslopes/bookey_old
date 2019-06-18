import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Validators } from "@angular/forms";
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";
import { MatSnackBar } from '@angular/material';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service'
import { CustomerModel } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  id;
  customer;
  properties;

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
      type: "input",
      label: "Coutry",
      inputType: "text",
      name: "country",
      validations: [
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z0-9_ ]*$"),
          message: "Accept only text"
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
    private router: Router,
    private snackbar: MatSnackBar,
    private location: Location,
    private customerService: CustomerService,
    private propertyService: PropertyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {  
      console.log("Params: "+ JSON.stringify(params));

      this.propertyService.getProperties().then(data => {
        // set properties
        this.properties = data;

        if(this.properties){

          // Set combo options
          this.form.setFormPropertyField("property", "options", this.properties);

          if (params['id']) {
            this.customerService.getCustomerById(params['id']).then(data => {
              console.log("getCustomerById result: "+JSON.stringify(data));
              this.customer = data;
              console.log("this.property result: "+JSON.stringify(this.customer));
              //console.log("form: "+ JSON.stringify(this.form.form));
              if(this.customer){
                this.id = this.customer.id;
                this.form.form.controls['name'].setValue(this.customer.name);
                this.form.form.controls['country'].setValue(this.customer.country);
                this.form.form.controls['email'].setValue(this.customer.email);
                this.form.form.controls['phone'].setValue(this.customer.phone);
                this.form.form.controls["property"].setValue(this.customer.property.id);
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
          this.customerService.updateCustomer(value).then(data => {
            this.location.back();
          });
        }else{
          this.customerService.createCustomer(value).then(data => {
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