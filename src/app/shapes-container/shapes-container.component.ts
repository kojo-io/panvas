import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShapesEnum} from "../shapes-enum";

@Component({
  selector: 'app-shapes-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shapes-container.component.html',
  styleUrls: ['./shapes-container.component.css']
})
export class ShapesContainerComponent {

  @Output() onCreateShape = new EventEmitter();

  createCircle = () => {
    this.onCreateShape.emit(ShapesEnum.CIRCLE)
  }

}
