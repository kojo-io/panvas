import { Injectable } from '@angular/core';

export interface Tools {
  image: string;
  title: string;
  selected: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ToolsMenuService {

  constructor() { }
}
