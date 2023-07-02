import {
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output, SimpleChanges
} from '@angular/core';
import {TableHeader} from "../table-header";
import {TableActions} from "../table-actions";

@Component({
  selector: 'pi-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']

})
export class TableComponent implements OnInit, OnChanges{
  @Input() data: any[] = []
  @Input() imageFields: string[] = [];
  @Input() headers: TableHeader[] = [];
  @Input() emptyMessage: string = 'You have no data to display.';
  @Input() actions: TableActions[] = [];
  @Output() OnActionPerformed = new EventEmitter();
  constructor() {
  }
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
