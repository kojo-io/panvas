import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {TextFieldComponent} from "./text-field/text-field.component";
import {FormsModule} from "@angular/forms";
import Compressor from 'compressorjs';
import {PortalModule} from "@angular/cdk/portal";
import {ShapesContainerComponent} from "./shapes-container/shapes-container.component";
import {ShapesEnum} from "./shapes-enum";
import {PiButtonModule} from "toll-ui";
import {TestCompComponent} from "./test-comp/test-comp.component";
import {BaseService} from "../core/base.service";

declare var require: any;

const Resizable = require('resizable/index.js');
export interface ElementInfo
{
  id: string;
  posX: number;
  posY: number;
  ele: HTMLElement;
  content: string;
  width: any;
  height: any;
  resize?: any;
  type: 'text' | 'shape' | 'image'
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    TextFieldComponent,
    NgIf,
    FormsModule,
    PortalModule,
    ShapesContainerComponent,
    PiButtonModule,
    TestCompComponent]
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'tedit';
  @ViewChild('textcontainer', { read: ViewContainerRef }) entry!: ViewContainerRef;
  elements: Array<ElementInfo> = [];
  selectedElement: any;
  body!: HTMLDivElement;
  resizeEast !: HTMLDivElement;
  resizeWest !: HTMLDivElement;
  resizeSouthEast!: HTMLDivElement;
  resizeSouthWest!: HTMLDivElement;
  resizeNorthEast!: HTMLDivElement;
  resizeNorthWest!: HTMLDivElement;
  container = document.createElement('div');

  showPortal = false;
  showTextEdit = false;
  showShapeEditor = false;

  resizableMenu = false;
  draggableMenu = false;

  constructor(private _viewContainerRef: ViewContainerRef) {
  }
  ngOnInit(): void {
    this.body = document.querySelector('.drag-box') as HTMLDivElement;
    this.resizeEast = document.querySelector('.resize-node-e') as HTMLDivElement;
    this.resizeWest = document.querySelector('.resize-node-w') as HTMLDivElement;
    this.resizeSouthEast = document.querySelector('.resize-node-se') as HTMLDivElement;
    this.resizeSouthWest = document.querySelector('.resize-node-sw') as HTMLDivElement;
    this.resizeNorthEast = document.querySelector('.resize-node-ne') as HTMLDivElement;
    this.resizeNorthWest = document.querySelector('.resize-node-nw') as HTMLDivElement;
  }

  createText = () => {
    const container = document.createElement('div');
    const h1 = document.createElement('h1');

    this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);
    container.classList.add('resizable', 'border', 'border-dashed', 'border-black', 'absolute', 'flex', 'items-center', 'p-2');
    container.id = BaseService.uuid();

    h1.innerHTML = 'Text goes here ...';
    h1.style.fontSize = '50px'
    h1.classList.add('pointer-events-none');
    container.appendChild(h1);
    this.body?.appendChild(container);

    if (this.resizeEast) {
      container.appendChild(this.resizeEast)
    }

    if (this.resizeWest) {
      container.appendChild(this.resizeWest);
    }

    this.elements.push({
      id: container.id, ele: container, content: h1.innerText,
      posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y,
      height: container.clientHeight, width: container.clientWidth,
      resize: this.attachShapeEvent(container.id),
      type: "text"
    });

    this.selectedElement = {
      id: container.id, ele: container,
      content: h1.innerText, posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y ,
      height: container.clientHeight, width: container.clientWidth,
      resize: this.elements.find(u => u.id === container.id)?.resize,
      type: this.elements.find(u => u.id === container.id)?.type
    };

    this.makeElementResizable();
    this.showPortal = false;
    this.showTextEdit = true;
    this.showShapeEditor = false;

    container.addEventListener('click', (event) => {
      event.preventDefault();
      this.showPortal = false;
      this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);

      if (this.resizeEast) {
        container.appendChild(this.resizeEast)
      }

      if (this.resizeWest) {
        container.appendChild(this.resizeWest);
      }

      this.showPortal = false;
      this.showTextEdit = true;
      this.showShapeEditor = false;

      container.classList.add('border', 'border-dashed', 'border-black')
      this.selectedElement = {
        id: container.id, ele: container,
        content: h1.innerText, posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y ,
        height: container.clientHeight, width: container.clientWidth,
        resize: this.elements.find(u => u.id === container.id)?.resize,
        type: this.elements.find(u => u.id === container.id)?.type
      };
    }, false)
  }

  createCircle = () => {
    const container = document.createElement('div');
    const circle = document.createElement('div');

    this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);
    container.classList.add('resizable', 'border', 'border-dashed', 'border-black', 'cursor-move', 'absolute', 'flex', 'items-center', 'p-2');
    container.id = BaseService.uuid();

    circle.classList.add('rounded-full', 'outline', 'outline-black', 'outline-2');
    circle.style.width = '50px';
    circle.style.height = '50px';
    circle.classList.add('pointer-events-none');
    container.appendChild(circle);
    this.body?.appendChild(container);

    this.appendAllHandles(container);

    this.elements.push({
      id: container.id, ele: container, content: '',
      posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y,
      height: container.clientHeight, width: container.clientWidth,
      type: "shape"
    });

    this.selectedElement = {
      id: container.id, ele: container,
      content: '', posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y ,
      height: container.clientHeight, width: container.clientWidth,
      resize: this.elements.find(u => u.id === container.id)?.resize,
      type: this.elements.find(u => u.id === container.id)?.type
    };

    this.makeShapeResizable();
    this.showPortal = false;
    this.showTextEdit = false;
    this.showShapeEditor = true;

    container.onclick = (event) => {
      event.preventDefault();
      this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);

      this.appendAllHandles(container);

      this.showPortal = false;
      this.showTextEdit = false;
      this.showShapeEditor = true;

      container.classList.add('border', 'border-dashed', 'border-black')
      this.selectedElement = {
        id: container.id, ele: container,
        content: '', posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y ,
        height: container.clientHeight, width: container.clientWidth,
        resize: this.elements.find(u => u.id === container.id)?.resize,
        type: this.elements.find(u => u.id === container.id)?.type
      };
    }
  }

  createSquare = () => {
    const square = document.createElement('div');

    this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);
    this.container.classList.add('resizable', 'border', 'border-dashed', 'border-black', 'cursor-move', 'absolute', 'flex', 'items-center', 'p-2');
    this.container.id = BaseService.uuid();

    square.classList.add('outline', 'outline-black', 'outline-2');
    square.style.width = '50px';
    square.style.height = '50px';
    square.classList.add('pointer-events-none');
    this.container.appendChild(square);
    this.body?.appendChild(this.container);

    this.appendAllHandles(this.container);

    this.elements.push({
      id: this.container.id, ele: this.container, content: '',
      posX: this.container.getBoundingClientRect().x, posY: this.container.getBoundingClientRect().y,
      height: this.container.clientHeight, width: this.container.clientWidth,
      type: "shape"
    });

    this.selectedElement = {
      id: this.container.id, ele: this.container,
      content: '', posX: this.container.getBoundingClientRect().x, posY: this.container.getBoundingClientRect().y ,
      height: this.container.clientHeight, width: this.container.clientWidth,
      resize: this.elements.find(u => u.id === this.container.id)?.resize,
      type: this.elements.find(u => u.id === this.container.id)?.type
    };

    this.makeShapeResizable();
    this.showPortal = false;
    this.showTextEdit = false;
    this.showShapeEditor = true;

    this.container.addEventListener('click', (event) => {
        event.preventDefault();
        this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);

        if (this.resizeSouthEast) {
          this.container.appendChild(this.resizeSouthEast)
        }

        this.container.classList.add('border', 'border-dashed', 'border-black')
        this.selectedElement = {
          id: this.container.id, ele: this.container,
          content: '', posX: this.container.getBoundingClientRect().x, posY: this.container.getBoundingClientRect().y,
          height: this.container.clientHeight, width: this.container.clientWidth,
          resize: this.elements.find(u => u.id === this.container.id)?.resize,
          type: this.elements.find(u => u.id === this.container.id)?.type
        };
      }
    )
  }

  onImageChange(file: any): void {
    this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);

    const container = document.createElement('div');
    container.classList.add('resizable', 'border', 'border-dashed', 'border-black', 'cursor-move', 'absolute', 'flex', 'items-center');
    container.id = BaseService.uuid();


    const image = document.createElement('img');
    image.width = 100;
    image.classList.add('pointer-events-none');
    container.appendChild(image);
    this.body?.appendChild(container);

    this.appendAllHandles(container);

    this.elements.push({
      id: container.id, ele: container, content: image.src,
      posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y,
      height: container.clientHeight, width: container.clientWidth,
      type: "image"
    });

    this.selectedElement = {
      id: container.id, ele: container,
      content: image.src, posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y ,
      height: container.clientHeight, width: container.clientWidth,
      resize: this.elements.find(u => u.id === container.id)?.resize,
      type: this.elements.find(u => u.id === container.id)?.type
    };

    this.makeImageResizable();
    this.showPortal = false;

    container.addEventListener('click', (event) => {
      event.preventDefault();
      this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);
      this.unSelectItems(this.resizeEast, this.resizeWest, this.resizeSouthEast);

      this.appendAllHandles(container);

      container.classList.add('border', 'border-dashed', 'border-black')
      this.selectedElement = {
        id: container.id, ele: container,
        content: image.src, posX: container.getBoundingClientRect().x, posY: container.getBoundingClientRect().y ,
        height: container.clientHeight, width: container.clientWidth,
        resize: this.elements.find(u => u.id === container.id)?.resize,
        type: this.elements.find(u => u.id === container.id)?.type
      };

    }, false)

    if (file.target.files && file.target.files[0]) {
      new Compressor(file.target.files[0], {
        quality: 0.6,
        success(result: File | Blob) {
          image.src = URL.createObjectURL(result);
        }
      });
    }
  }

  ngAfterViewInit() {
  }

  attachTextEvent = (ele: any) :any => {
    const p = document.getElementById(ele);
    let resize = new Resizable(p, {
      handles: 'e, w',
      threshold: 10,
      draggable: false
    })

    p?.addEventListener('drag', (event) => {
    }, false)

    resize.on('resize', (e: any) => {
      const ele = (p as HTMLElement);
      const child = (ele.children.item(0) as HTMLElement);
      const findElement = this.elements.find(u => u.id === ele.id);

      if (findElement) {
        findElement.ele = ele;
        findElement.posY = ele.getBoundingClientRect().y;
        findElement.posX = ele.getBoundingClientRect().x;
      }
    })

    return resize;
  }

  attachImageEvent = (ele: any): any => {
    const p = document.getElementById(ele);
    let resize = new Resizable(p, {
      handles: 'se, ne, sw, nw',
      threshold: 10,
      draggable: false
    })

    p?.addEventListener('drag', (event) => {
    }, false)

    resize.on('resize', (e: any) => {
      const ele = (p as HTMLElement);
      const child = (ele.children.item(0) as HTMLImageElement);
      const findElement = this.elements.find(u => u.id === ele.id);
      child.width = ele.clientWidth;
      ele.style.height = `${child.clientHeight}px`
      if (findElement) {
        findElement.ele = ele;
        findElement.posY = ele.getBoundingClientRect().y;
        findElement.posX = ele.getBoundingClientRect().x;
      }
    })

    return resize;
  }

  attachShapeEvent = (ele: any): any => {
    const p = document.getElementById(ele);
    let resize = new Resizable(p, {
      handles: 'se, ne, sw, nw',
      threshold: 10,
      draggable: false
    })

    p?.addEventListener('drag', (event) => {
    }, false)

    resize.on('resize', (e: any) => {
      const ele = (p as HTMLElement);
      const child = (ele.children.item(0) as HTMLImageElement);
      const findElement = this.elements.find(u => u.id === ele.id);
      child.style.width = `${ele.clientWidth}px`;
      child.style.height = `${ele.clientHeight}px`
      if (findElement) {
        findElement.ele = ele;
        findElement.posY = ele.getBoundingClientRect().y;
        findElement.posX = ele.getBoundingClientRect().x;
      }
    })

    return resize;
  }

  updateSelectedItem = () => {
    const p = document.getElementById(this.selectedElement.id);

    if (p) {
      const ori = this.elements.find(u => u.id == this.selectedElement.id);
      if (ori) {
        console.log('ori', ori.ele.clientWidth, ori.ele.clientHeight, ori.width, ori.height);
      }
      const element = (p.children.item(0) as HTMLElement);
      element.innerText = this.selectedElement.content;
      p.style.width = this.selectedElement.ele.style.width;
      p.style.height = this.selectedElement.ele.style.height;
    }
  }

  selectBackground = () => {}

  unSelectItems = (resizeEast: any, resizeWest: any, resizeSouthEast: any) => {
    console.log(this.elements.length);
    this.elements.forEach((ele) => {
      for (let i = 0; i < ele.ele.children.length; i++) {
        const child = ele.ele.children.item(i);

        if (child === resizeEast) {
          ele.ele.removeChild(resizeEast);
        }

        if (child === resizeWest) {
          ele.ele.removeChild(resizeWest);
        }

        if (child === resizeSouthEast) {
          ele.ele.removeChild(resizeSouthEast);
        }
      }

      ele.ele.classList.remove('border', 'border-dashed', 'border-dashed', 'border-black');
    });

  }

  dragElement(elmnt: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e:any) {
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  makeElementResizable = () => {
    if (this.selectedElement?.id) {
      this.resizableMenu = true;
      this.draggableMenu = false;
      const findElement = this.elements.find(u => u.id === this.selectedElement.id);

      if (findElement) {
        const ele = (findElement as ElementInfo);
        ele.ele.classList.remove('cursor-move');

        ele.ele.onmousedown = null;

        this.selectedElement.resize = this.attachTextEvent(this.selectedElement.id);

        (findElement as ElementInfo).resize = this.selectedElement.resize;
      }
    }
  }

  makeShapeResizable = () => {
    if (this.selectedElement?.id) {
      this.resizableMenu = true;
      this.draggableMenu = false;
      const findElement = this.elements.find(u => u.id === this.selectedElement.id);

      if (findElement) {
        const ele = (findElement as ElementInfo);
        ele.ele.classList.remove('cursor-move');

        ele.ele.onmousedown = null;

        this.selectedElement.resize = this.attachShapeEvent(this.selectedElement.id);

        (findElement as ElementInfo).resize = this.selectedElement.resize;
      }
    }
  }

  makeImageResizable = () => {
    if (this.selectedElement?.id) {
      this.resizableMenu = true;
      this.draggableMenu = false;
      const findElement = this.elements.find(u => u.id === this.selectedElement.id);

      if (findElement) {
        const ele = (findElement as ElementInfo);
        ele.ele.classList.remove('cursor-move');

        ele.ele.onmousedown = null;

        this.selectedElement.resize = this.attachImageEvent(this.selectedElement.id);

        (findElement as ElementInfo).resize = this.selectedElement.resize;
      }
    }
  }

  makeElementDraggable = () => {
    if (this.selectedElement) {
      this.resizableMenu = false;
      this.draggableMenu = true;
      const findElement = this.elements.find(u => u.id === this.selectedElement.id);

      if (findElement) {
        this.selectedElement.resize.destroy();
        console.log(this.selectedElement.resize);
        const ele = (findElement as ElementInfo);
        ele.ele.classList.add('cursor-move');

        ele.resize = null;
        this.dragElement(ele.ele);
      }
    }
  }

  openShapesMenu = () => {
    this.showPortal = true;
  }

  createShape = (shapes: ShapesEnum) => {
    if (shapes === ShapesEnum.CIRCLE) {
      this.createCircle();
    }
  }

  resizeElement = () => {
    if (this.selectedElement) {
      if (this.selectedElement.type === 'text') {
        this.makeElementResizable();
      }
      if (this.selectedElement.type === 'shape') {
        this.makeShapeResizable();
      }
      if (this.selectedElement.type === 'image') {
        this.makeImageResizable();
      }
    }
  }

  appendAllHandles = (container: HTMLDivElement) => {
    if (this.resizeSouthEast) {
      container.appendChild(this.resizeSouthEast)
    }

    if (this.resizeNorthWest) {
      container.appendChild(this.resizeNorthWest)
    }

    if (this.resizeSouthWest) {
      container.appendChild(this.resizeSouthWest)
    }

    if (this.resizeNorthEast) {
      container.appendChild(this.resizeNorthEast)
    }
  }
}
