import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/models/room';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICard } from '@runox-game/game-engine/lib/models/card.model';
import { ILog } from '@runox-game/game-engine/lib/log/log.factory';

@Component({
  selector: 'rnx-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent {
  @Output() cardPlayed = new EventEmitter<ICard>();
  @Output() unoYelled = new EventEmitter<boolean>();
  @Input() player: IPlayer;
  @Input() logs$: Observable<ILog>;
  @Input() set room$(room$: Observable<Room>) {
    if (room$) {
      room$.subscribe((room) => (this.room = room));
    }
  }
  @Input() set currentCard$(currentCard$: Observable<ICard>) {
    if (currentCard$) {
      this.hasToSelectColor$ = currentCard$.pipe(
        map((card: ICard) => card.isSpecialCard())
      );
    }
  }
  room: Room;
  hasToSelectColor$: Observable<boolean>;

  playCard(card: ICard) {
    this.cardPlayed.emit(card);
  }

  yellUno(){
    this.unoYelled.emit();
  }
}
