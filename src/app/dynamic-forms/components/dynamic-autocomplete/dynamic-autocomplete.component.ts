import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../interfaces/dynamic-field.interface";
@Component({
  selector: "app-autocomplete",
  template: `
<mat-form-field class="demo-full-width margin-top" [formGroup]="group"  appearance="outline" floatLabel="always" hideRequiredMarker="false">
  <mat-label>{{field.label}}</mat-label>
  <input type="text" [placeholder]="field.label" aria-label="Number" matInput [formControlName]="field.name" [matAutocomplete]="auto">
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let item of field.options" [value]="item.id">
        {{item.name}}
      </mat-option>
    </mat-autocomplete>
</mat-form-field>
`,
  styles: []
})
export class DynamicAutoCompleteComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}