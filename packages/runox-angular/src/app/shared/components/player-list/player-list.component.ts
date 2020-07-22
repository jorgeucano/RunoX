import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';

@Component({
  selector: 'rnx-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit {
  @Input() players: IPlayer[] = [];
  @Input() activePlayer?: IPlayer = null;

  constructor() {}

  ngOnInit(): void {}
}
