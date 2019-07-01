import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Validators } from "@angular/forms";
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";
import { MatSnackBar } from '@angular/material';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service'
import { PropertyModel } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss']
})
export class NewPropertyComponent implements OnInit {
  
  id;
  property;
  currencies;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Property Name",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Property Name Required"
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
      label: "Currency",
      name: "currency",
      options: []
    },
    {
      type: "input",
      label: "Link",
      inputType: "text",
      name: "link",
      validations: [
        {
          name: "pattern",
          validator: Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"),
          message: "Accept only url"
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
    private route: ActivatedRoute) { 
      
  }

  ngOnInit() {
    this.route.params.subscribe(params => {  

      console.log("Params: "+ JSON.stringify(params));

      this.propertyService.getAllCurrencies().then(dataCurrencies => {
            
        this.currencies = dataCurrencies;

        // Set combo options
        this.form.setFormPropertyField("currency", "options", this.currencies);

        if (params['id']) {
          this.propertyService.getPropertyById(params['id']).then(data => {
            console.log("getPropertyById result: "+JSON.stringify(data));
            this.property = data;
            //console.log("form: "+ JSON.stringify(this.form.form));
            if(this.property){
              this.id = this.property.id;
              this.form.form.controls['name'].setValue(this.property.name);
              this.form.form.controls['currency'].setValue(this.property.currency.id);
              this.form.form.controls['link'].setValue(this.property.link);
            }

          });
        }
      });
    });   
  }

  onSubmit(value: any) {
      
      if(this.form.form.valid){
        
        if(this.id){
          value["id"] = this.id;
          this.propertyService.updateProperty(value).then(data => {
            this.location.back();
          });
        }else{
          this.propertyService.createProperty(value).then(data => {
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