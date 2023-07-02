import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalRef} from "../../pi-modal/modal-ref";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseService} from "../../base.service";

@Component({
  selector: 'app-new-check-item',
  templateUrl: './new-check-item.component.html',
  styleUrls: ['./new-check-item.component.css']
})
export class NewCheckItemComponent implements OnInit, AfterViewInit{
  categories: any[] = [];
  useCategories = false;
  newCategory: any;
  form!: FormGroup;

  constructor(private ref: ModalRef, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.categories = this.ref.modal.data['categories'];
    this.useCategories = this.ref.modal.data['useCategories'];

    this.form = this.fb.group({
      id: [BaseService.uuid()],
      item: ['', Validators.required]
    })
  }

  setNewItem = (item: any) => {
    console.log(item);
    this.newCategory = item;
  }

  close = () => {
    this.ref.close();
  }

  save = () => {
    const data = this.form.getRawValue();
    if (this.newCategory) {
      data.category = this.newCategory;
    }

    this.ref.close(data);
  }

  ngAfterViewInit() {
    this.focusOnElement();
  }

  focusOnElement = () => {
    const element = document.getElementById('closeNewCheckListItem') as HTMLDivElement;
    element.focus();
  }
}
