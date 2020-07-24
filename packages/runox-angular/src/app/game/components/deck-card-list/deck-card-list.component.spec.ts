import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckCardListComponent } from './deck-card-list.component';

describe('DeckCardListComponent', () => {
  let component: DeckCardListComponent;
  let fixture: ComponentFixture<DeckCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckCardListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
