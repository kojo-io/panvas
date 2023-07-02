import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input/input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [InputComponent],
    exports: [InputComponent],
  imports: [
      FormsModule,
      ReactiveFormsModule,
    CommonModule
  ]
})
export class PiInputModule { }
