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
import { InputComponent } from "../dynamic-input/dynamic-input.component";
import { ButtonComponent } from "../dynamic-button/dynamic-button.component";
import { SelectComponent } from "../dynamic-select/dynamic-select.component";
import { DateComponent } from "../dynamic-date/dynamic-date.component";
import { RadiobuttonComponent } from "../dynamic-radiobutton/dynamic-radiobutton.component";
import { CheckboxComponent } from "../dynamic-checkbox/dynamic-checkbox.component";

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent
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