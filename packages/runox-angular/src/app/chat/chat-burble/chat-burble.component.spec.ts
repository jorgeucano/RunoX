import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBurbleComponent } from './chat-burble.component';

describe('ChatBurbleComponent', () => {
  let component: ChatBurbleComponent;
  let fixture: ComponentFixture<ChatBurbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBurbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBurbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
