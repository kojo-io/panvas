import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableHeader} from "../../core/pi-table/table-header";
import {PiTableModule} from "../../core/pi-table/pi-table.module";
import {PiButtonModule} from "../../core/pi-button/pi-button.module";
import {ModalService} from "../../core/pi-modal/modal.service";
import {PiTollModule} from "../../core/pi-toll/pi-toll.module";
import {PiModalModule} from "../../core/pi-modal/pi-modal.module";
import {TableActions} from "../../core/pi-table/table-actions";
import {CheckListComponent} from "../../core/pi-check-list/check-list/check-list.component";
import {PiCheckListModule} from "../../core/pi-check-list/pi-check-list.module";

export interface CheckList {
  name: string;
  useCategories: boolean;
  id: any;
  items: CheckListItems[]
}

export interface CheckListItems {
  checkListId: string;
  category: string;
  item: string;
  id: any;
}

@Component({
  selector: 'app-test-comp',
  standalone: true,
  imports: [CommonModule, PiTableModule, PiButtonModule, PiTollModule, PiModalModule, PiCheckListModule],
  providers: [ModalService],
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent {

  checkList: CheckList[] = [];
  tableHeaders: TableHeader[] = [
    {
      name: 'id'
    },
    {
      name: 'name',
      alias: 'name',
      type: 'string'
    },
    {
      name: 'useCategory',
      alias: 'Use Categories',
      type: 'boolean'
    }
  ]
  tableActions: TableActions[] = [
    { actionType: 'edit', buttonTypeContent: 'pi pi-pencil', buttonColor: "success", buttonType: "icon-button", buttonSize: "small" },
    { actionType: 'delete', buttonTypeContent: 'DELETE', buttonColor: "danger", buttonType: "button", buttonSize: "small" }
  ]

  constructor(private modal: ModalService) {
  }

  openCheckListModal = (data?: any) => {
    const myModal = this.modal.open({
      content: CheckListComponent,
      size: "normal",
      backdropClose: false,
      data
    });

    myModal.afterClosed$.subscribe({
      next: result => {
        if (result.data) {
          const find = this.checkList.find(u => u.id === result.data.id);
          if (!find) {
            this.checkList.push(result.data);
          } else {
            find.name = result.data.name;
            find.items = result.data.items;
            find.useCategories = result.data.useCategories
          }
        }
      }
    })
  }

  getActionPerformed = (event: any) => {
    console.log(event);
    if (event.type === 'edit') {
      this.openCheckListModal(event.data);
    }
  }
}
