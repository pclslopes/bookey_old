import { Component, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../dynamic-forms/interfaces/dynamic-field.interface";
import { DynamicFormComponent } from "../../dynamic-forms/components/dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}