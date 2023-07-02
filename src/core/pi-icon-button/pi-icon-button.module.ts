import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './icon-button/icon-button.component';



@NgModule({
    declarations: [
        IconButtonComponent
    ],
    exports: [
        IconButtonComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PiIconButtonModule { }
