import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';

@Component({
  selector: 'rnx-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class DeckComponent {
  @Output() takenCard = new EventEmitter<void>();

  takeCard(): void {
    this.takenCard.emit();
  }
}
