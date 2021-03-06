import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../interfaces/dynamic-field.interface";
@Component({
  selector: "app-textarea",
  template: `
    <mat-form-field class="demo-full-width" [formGroup]="group" appearance="outline" floatLabel="always" hideRequiredMarker="false">
      <mat-label>{{field.label}}</mat-label>
      <textarea matInput [formControlName]="field.name" [placeholder]="field.label"></textarea>
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
`,
  styles: []
})
export class DynamicTextAreaComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {}
  
  ngOnInit() {}
}