import { TestBed } from '@angular/core/testing';

import { ToolsMenuService } from './tools-menu.service';

describe('ToolsMenuService', () => {
  let service: ToolsMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
