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
  //isEdit = (this.property !== undefined);

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Property Name",
      inputType: "text",
      name: "propertyName",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Property Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z ]+$"),
          message: "Accept only text",
          
        }
      ]
    },
    {
      type: "input",
      label: "Link",
      inputType: "text",
      name: "propertyLink",
      validations: [
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z ]+$"),
          message: "Accept only text"
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
      if (params['id']) {
        this.propertyService.getPropertyById(params['id']).then(data => {
          console.log("getPropertyById result: "+JSON.stringify(data));
          this.property = data;
          console.log("this.property result: "+JSON.stringify(this.property));
          //console.log("form: "+ JSON.stringify(this.form.form));
          if(this.property){
            this.id = this.property.objectId;
            this.form.form.controls['propertyName'].setValue(this.property.propertyName);
            this.form.form.controls['propertyLink'].setValue(this.property.propertyLink);
          }

        });
      }
    });   
  }

  onSubmit(value: any) {
      
      if(this.form.form.valid){
        
        if(this.id){
          value["objectId"] = this.id;
        }
        console.log("Form: "+JSON.stringify(value));

        this.propertyService.updateProperty(value).then(data => {
          this.location.back();
        });
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