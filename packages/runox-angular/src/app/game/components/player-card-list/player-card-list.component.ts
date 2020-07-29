import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '@runox-game/game-engine/lib/models/card.model';

@Component({
  selector: 'rnx-player-card-list',
  templateUrl: './player-card-list.component.html',
  styleUrls: ['./player-card-list.component.css'],
})
export class PlayerCardListComponent implements OnInit {
  @Input() cards: ICard[] = [];

  constructor() {}

  ngOnInit(): void {}
}
