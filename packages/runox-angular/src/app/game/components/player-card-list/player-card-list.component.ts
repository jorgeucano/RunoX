import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICard } from '@runox-game/game-engine/lib/models/card.model';

@Component({
  selector: 'rnx-player-card-list',
  templateUrl: './player-card-list.component.html',
  styleUrls: ['./player-card-list.component.css'],
})
export class PlayerCardListComponent {
  @Input() cards: ICard[] = [];
  @Output() cardSelected = new EventEmitter<ICard>();

  onCardSelected(card: ICard) {
    this.cardSelected.emit(card);
  }
}
