import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColorComponent } from './select-color.component';

describe('SelectColorComponent', () => {
  let component: SelectColorComponent;
  let fixture: ComponentFixture<SelectColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectColorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
