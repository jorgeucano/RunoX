import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Value } from '@runox-game/game-engine/lib/models/values.model';

@Component({
  selector: 'rnx-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  @Input() room: Room;
  @Input() player: IPlayer;
  constructor() {}

  ngOnInit(): void {}

  get hasToSelectColor(): Observable<boolean> {
    return this.room
      .onCardPlayed()
      .pipe(
        map((x) => x?.value === Value.WILDCARD || x?.value === Value.PLUS_FOUR)
      );
  }
}
