import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDrag, CdkDragEnd} from "@angular/cdk/drag-drop";
import {ElementInfo} from "../app.component";
declare var require: any;

const Resizable = require('resizable/index.js');
@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements AfterViewInit{
  @Input() text = '';
  @Input() fontSize = 10;
  @Input() fontWeight = 'normal';
  @Input() fontStyle = 'normal';
  @Input() id = crypto.randomUUID();
  @Input() elementId = document.getElementById(this.id);
  dragDisabled = false;

  @Output() element = new EventEmitter<ElementInfo>();

  ngAfterViewInit() {
    this.attachEvent(this.id);
  }

  attachEvent = (ele: any) => {
    const p = document.getElementById(ele);
    let resize = new Resizable(p, {
      within: 'parent',
      handles: 's, se, ne, e, w, sw, nw',
      threshold: 10,
      draggable: false,
      css3: true
    })

    p?.addEventListener('drag', (event) => {
      console.log('drag', p.getBoundingClientRect());
    }, false)

    resize.on('resize', (e: any) => {
      const ele = (p as HTMLElement);
      const child = (ele.children.item(0) as HTMLElement);
      child.style.fontSize = ele.style.height;
      // const findElement = this.elements.find(u => u.id === ele.id);
      //
      // if (findElement) {
      //   findElement.ele = ele;
      //   findElement.posY = ele.getBoundingClientRect().y;
      //   findElement.posX = ele.getBoundingClientRect().x;
      // }

      console.log(ele.style.height, ele.style.width, ele.getBoundingClientRect().x, ele.getBoundingClientRect().y);
    })
  }

  dragStart() {
    this.dragDisabled = false;
  }

  dragComplete(event: CdkDragEnd): void {
    event.source.getFreeDragPosition();
    this.dragDisabled = true;
  }
}
