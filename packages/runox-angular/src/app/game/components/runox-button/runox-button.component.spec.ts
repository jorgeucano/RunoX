import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunoxButtonComponent } from './runox-button.component';

describe('RunoxButtonComponent', () => {
  let component: RunoxButtonComponent;
  let fixture: ComponentFixture<RunoxButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RunoxButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunoxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
