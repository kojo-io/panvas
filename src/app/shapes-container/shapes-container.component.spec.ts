import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapesContainerComponent } from './shapes-container.component';

describe('ShapesContainerComponent', () => {
  let component: ShapesContainerComponent;
  let fixture: ComponentFixture<ShapesContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShapesContainerComponent]
    });
    fixture = TestBed.createComponent(ShapesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
