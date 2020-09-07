import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ICard } from '@runox-game/game-engine/lib/models/card.model';

@Component({
  selector: 'rnx-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.css'],
})
export class DeckCardComponent {
  @Input() card: ICard;
  @Input() styleRotation = '';
  @Output() selected = new EventEmitter<ICard>();

  rotate(): void {
    var rotation = Math.floor(Math.random() * 20) + 10;
    rotation *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.styleRotation = `rotate(${rotation}deg)`;
  }

  select() {
    this.selected.emit(this.card);
  }
}
