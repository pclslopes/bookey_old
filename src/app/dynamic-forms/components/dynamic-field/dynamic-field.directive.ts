import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../interfaces/dynamic-field.interface";
import { DynamicInputComponent } from "../dynamic-input/dynamic-input.component";
import { DynamicButtonComponent } from "../dynamic-button/dynamic-button.component";
import { DynamicSelectComponent } from "../dynamic-select/dynamic-select.component";
import { DynamicDateComponent } from "../dynamic-date/dynamic-date.component";
import { DynamicRadiobuttonComponent } from "../dynamic-radiobutton/dynamic-radiobutton.component";
import { DynamicCheckboxComponent } from "../dynamic-checkbox/dynamic-checkbox.component";

const componentMapper = {
  input: DynamicInputComponent,
  button: DynamicButtonComponent,
  select: DynamicSelectComponent,
  date: DynamicDateComponent,
  radiobutton: DynamicRadiobuttonComponent,
  checkbox: DynamicCheckboxComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}