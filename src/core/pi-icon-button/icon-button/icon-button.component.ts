import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'pi-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit, OnChanges {
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  @Input() type: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
  @Input() rounded: '' | 'full' = '';
  @Input() piStyle: any;

  @Input() piClass: any;
  small = 'p-2.5 text-sm font-medium text-center inline-flex';
  normal = 'p-3 text-sm font-medium text-center inline-flex';
  large = 'p-3.5 text-base font-medium text-center inline-flex';
  primary = '';
  success = '';
  danger = '';
  warning = '';

  primary_outline = '';
  success_outline = '';
  danger_outline = '';
  warning_outline = '';
  @Input() icon = '';
  @Input() disabled: '' | true | false = false;
  @Input() outline: '' | undefined = undefined;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.button_state();
  }

  ngOnInit(): void {
    this.button_state();
  }

  button_color(): any {
    if (this.type === 'warning' && this.outline === '') {
      return this.warning_outline
    }

    if (this.type === 'warning' && this.outline === undefined) {
      return this.warning
    }

    if (this.type === 'danger' && this.outline === '') {
      return this.danger_outline
    }

    if (this.type === 'danger' && this.outline === undefined) {
      return this.danger
    }

    if (this.type === 'primary' && this.outline === '') {
      return this.primary_outline
    }

    if (this.type === 'primary' && this.outline === undefined) {
      return this.primary
    }

    if (this.type === 'success' && this.outline === '') {
      return this.success_outline
    }

    if (this.type === 'success' && this.outline === undefined) {
      return this.success
    }
  }

  button_state() {
    this.primary = `text-white ${(this.disabled || this.disabled === '') ? 'bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}  focus:ring-4 focus:outline-none focus:ring-blue-300`;
    this.success = `text-white ${(this.disabled || this.disabled === '') ? 'bg-green-400 hover:bg-green-400 cursor-not-allowed':'bg-green-700 hover:bg-green-800'} focus:ring-4 focus:outline-none focus:ring-green-300`;
    this.danger = `text-white ${(this.disabled || this.disabled === '') ? 'bg-red-400 hover:bg-red-400 cursor-not-allowed':'bg-red-600 hover:bg-red-700'} focus:ring-4 focus:outline-none focus:ring-red-200`;
    this.warning = `text-white ${(this.disabled || this.disabled === '') ? 'bg-yellow-400 hover:bg-yellow-400 cursor-not-allowed':'bg-yellow-500 hover:bg-yellow-600'}  focus:ring-4 focus:outline-none focus:ring-yellow-300`;

    this.primary_outline = `${(this.disabled || this.disabled === '') ? 'text-blue-400 border-blue-400 cursor-not-allowed':'text-blue-700 border-blue-700 hover:bg-blue-800 hover:text-white'} border focus:ring-4 focus:outline-none focus:ring-blue-300`;
    this.success_outline = `${(this.disabled || this.disabled === '') ? 'text-green-400 border-green-400 cursor-not-allowed':'text-green-700 hover:text-white border-green-700 hover:bg-green-800'} border focus:ring-4 focus:outline-none focus:ring-green-300`;
    this.danger_outline = `${(this.disabled || this.disabled === '') ? 'text-red-400 border-red-400 cursor-not-allowed':'text-red-600 hover:text-white border-red-600 hover:bg-red-700'} border focus:ring-4 focus:outline-none focus:ring-red-200`;
    this.warning_outline = `${(this.disabled || this.disabled === '') ? 'text-yellow-400 border-yellow-400 cursor-not-allowed':'text-yellow-500 hover:text-white border-yellow-500 hover:bg-yellow-600'} border focus:ring-4 focus:outline-none focus:ring-yellow-300`;
  }
}
