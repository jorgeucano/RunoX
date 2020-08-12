import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenChatButtonComponent } from './open-chat-button.component';

describe('OpenChatButtonComponent', () => {
  let component: OpenChatButtonComponent;
  let fixture: ComponentFixture<OpenChatButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenChatButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenChatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
