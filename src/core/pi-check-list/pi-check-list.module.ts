import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckListComponent } from './check-list/check-list.component';
import {PiButtonModule} from "../pi-button/pi-button.module";
import {PiCheckBoxModule} from "../pi-check-box/pi-check-box.module";
import {PiInputModule} from "../pi-input/pi-input.module";
import {PiTableModule} from "../pi-table/pi-table.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewCheckItemComponent } from './new-check-item/new-check-item.component';
import {PiSelectListModule} from "../pi-select-list/pi-select-list.module";



@NgModule({
  declarations: [
    CheckListComponent,
    NewCheckItemComponent
  ],
  exports: [
    CheckListComponent
  ],
  imports: [
    CommonModule,
    PiButtonModule,
    PiCheckBoxModule,
    PiInputModule,
    PiTableModule,
    ReactiveFormsModule,
    PiSelectListModule,
    FormsModule
  ]
})
export class PiCheckListModule { }
