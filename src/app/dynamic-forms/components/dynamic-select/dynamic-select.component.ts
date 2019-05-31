import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../interfaces/dynamic-field.interface";
@Component({
  selector: "app-select",
  template: `
<mat-form-field class="demo-full-width margin-top" [formGroup]="group"  appearance="outline" floatLabel="always" hideRequiredMarker="false">
<mat-label>{{field.label}}</mat-label>
<mat-select [placeholder]="field.label" [formControlName]="field.name">
<mat-option *ngFor="let item of field.options" [value]="item">{{item.propertyname}}</mat-option>
</mat-select>
</mat-form-field>
`,
  styles: []
})
export class DynamicSelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}