import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CheckBoxComponent} from "./check-box/check-box.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [CheckBoxComponent],
  exports: [CheckBoxComponent],
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule
  ]
})
export class PiCheckBoxModule { }
