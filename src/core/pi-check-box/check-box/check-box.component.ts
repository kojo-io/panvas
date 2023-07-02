import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseService} from "../../base.service";

@Component({
  selector: 'pi-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CheckBoxComponent)
    }
  ]
})
export class CheckBoxComponent implements OnInit, ControlValueAccessor {
  @Input() value: boolean = false;
  id = BaseService.uuid();
  onChange = (_: any) => {};
  onTouched = () => {};
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
}
