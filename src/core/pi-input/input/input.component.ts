import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseService} from "../../base.service";

@Component({
  selector: 'pi-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() floatingLabel: 'inline' | 'outline' | undefined;
  @Input() model: string = '';
  @Input() required: boolean = false;
  @Input() invalid: boolean = false;
  @Input() name: string | undefined = '';
  @Input() readOnly: boolean = false;
  @Input() size: 'small' | 'normal' | 'large' | undefined = 'normal'
  defaultClass = 'bg-gray-50 focus:outline-none text-gray-900 rounded-lg block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white';
  defaultSize = 'p-2.5 text-sm';
  smallSize = 'p-2 sm:text-xs';
  largeSize = 'p-4 sm:text-md';
  inputValidClass = 'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-400 dark:border-gray-500';
  invalidClass = 'focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 border border-red-500 dark:border-red-600'
  onChange = (_: any) => {};
  onTouched = (_: any) => {};
  @Input() disabled = false;
  id = BaseService.uuid();
  constructor() { }

  ngOnInit(): void {

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.model = obj;
  }
}
