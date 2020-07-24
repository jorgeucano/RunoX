import { Component, OnInit } from '@angular/core';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';

@Component({
  selector: 'rnx-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.css'],
})
export class TurnComponent implements OnInit {
  players: IPlayer[] = [];
  constructor() {}

  ngOnInit(): void {}
}
