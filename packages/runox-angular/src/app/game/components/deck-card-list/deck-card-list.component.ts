import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '@runox-game/game-engine/lib/models/card.model';

@Component({
  selector: 'rnx-deck-card-list',
  templateUrl: './deck-card-list.component.html',
  styleUrls: ['./deck-card-list.component.css'],
})
export class DeckCardListComponent implements OnInit {
  @Input() cards: ICard[] = [];

  constructor() {}

  ngOnInit(): void {}
}
