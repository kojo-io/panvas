import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableHeader} from "../../pi-table/table-header";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CheckList, CheckListItems} from "../../../app/test-comp/test-comp.component";
import {ModalService} from "../../pi-modal/modal.service";
import {NewCheckItemComponent} from "../new-check-item/new-check-item.component";
import {ModalRef} from "../../pi-modal/modal-ref";
import {TableActions} from "../../pi-table/table-actions";
import {BaseService} from "../../base.service";

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit, AfterViewInit{
  @Output() OnSave = new EventEmitter();
  @Output() OnClose = new EventEmitter();

  headers: TableHeader[] = [
    {
      name: 'item',
      alias: 'Item',
      type: "string"
    },
    {
      name: 'id'
    }
  ]

  categoryObj: TableHeader = {
    name: 'category',
    alias: 'Category',
    type: 'string'
  };

  form!: FormGroup;

  items: CheckListItems[] = [];

  tableActions: TableActions[] = [
    { actionType: 'delete', buttonTypeContent: 'pi pi-times', buttonColor: "danger", buttonType: "icon-button", buttonSize: "small" }
  ]
  constructor(private fb: FormBuilder, private modal: ModalService, private ref: ModalRef) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [BaseService.uuid()],
      name: ['', Validators.required],
      useCategory: [false]
    });

    this.form.get('useCategory')?.valueChanges.subscribe({
      next: value => {
        if (value) {
          this.headers.push(this.categoryObj);
          this.headers.reverse();
        } else {
          this.headers.splice(this.headers.findIndex(u => u === this.categoryObj), 1);
        }
      }
    })

    if (this.ref.modal.data) {
      const item = this.ref.modal.data;
      this.form.patchValue({
        id: item.id,
        name: item.name,
        useCategory: item.useCategory
      });

      this.items = [...item.items];
    }
  }

  save = () => {
    const data = this.form.getRawValue() as CheckList;
    data.items = this.items;
    this.ref.close(data);
  }

  createNewItem = () => {
    // @ts-ignore
    const categories = this.items.filter(u => u.category !== null || '').map((u) => {
      return {
        name: u.category
      }
    });

    const data = this.category(categories);

    console.log(data);
    const myModal = this.modal.open({
      content: NewCheckItemComponent,
      size: "normal",
      backdropClose: true,
      data: {
        categories: data,
        useCategories: this.form.get('useCategory')?.value
      }
    })

    myModal.afterClosed$.subscribe({
      next: value => {
        this.focusOnElement()
        if (value.data) {
          console.log(value.data);
          value.data.checkListId = this.form.get('id')?.value;
          this.items.push(value.data);
        }
      }
    })
  }

  category = (list: any[]) => {
    const unique: any[] = [];
    list.forEach((elem) => {
      const find = unique.find(u => u.name === elem.name);
      if (!find) {
        unique.push(elem)
      }
    })

    return unique;
  }

  close = (data?: any) => {
    this.ref.close(data);
  }

  getActionPerformed = (event: any) => {
    console.log(event);
    if (event.type === 'delete') {
      this.items.splice(this.items.findIndex(u => u.id === event.data.id), 1);
    }
  }

  ngAfterViewInit() {
    this.focusOnElement();
  }

  focusOnElement = () => {
    const element = document.getElementById('closeCheckListButton') as HTMLDivElement;
    element.focus();
  }
}
