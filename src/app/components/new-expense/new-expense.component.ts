import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Validators } from "@angular/forms";
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";
import { MatSnackBar } from '@angular/material';
import { Router, RouterModule, Params, ActivatedRoute } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service'
import { ExpensesService } from '../../services/expenses.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {
  
  id;
  expense;
  properties;
  expenseTypes;

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
      type: "autocomplete",
      label: "Type",
      name: "expenseType",
      options: [],
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Type Required"
        }
      ]
    },
    {
      type: "input",
      label: "Description",
      inputType: "text",
      name: "description",
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
      type: "date",
      label: "Date",
      name: "dateOfExpense",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date Required"
        }
      ]
    },
    {
      type: "input",
      label: "value",
      name: "checkOutvalueDate",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Value Required"
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
    private expensesService: ExpensesService,
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

          this.expensesService.getExpenseTypes().then(dataExpenseTypes => {
            // set properties
            this.expenseTypes = dataExpenseTypes;

            if(this.expenseTypes){

              // Set combo options
              this.form.setFormPropertyField("expenseType", "options", this.expenseTypes);

              if (params['id']) {
                this.expensesService.getExpenseById(params['id']).then(data => {
                  console.log("getExpenseById result: "+JSON.stringify(data));
                  this.expense = data;

                  if(this.expense){
                    this.id = this.expense.id;
                    this.form.form.controls['description'].setValue(this.expense.description);
                    this.form.form.controls["dateOfExpense"].setValue(this.expense.dateOfExpense);
                    this.form.form.controls["value"].setValue(this.expense.value);
                    this.form.form.controls["expenseType"].setValue(this.expense.expenseType.id);
                    this.form.form.controls["property"].setValue(this.expense.property.id);
                  }
                });      
              }
            }
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
          this.expensesService.updateExpense(value).then(data => {
            this.location.back();
          });
        }else{
          this.expensesService.createExpense(value).then(data => {
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

  displayFn(value: any): string {
    alert("yay");
    return value && typeof value === 'object' ? value.name : value;
  }

}