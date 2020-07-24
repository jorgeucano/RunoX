import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '@runox-game/game-engine/lib/models/card.model';

@Component({
  selector: 'rnx-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class DeckCardListComponent implements OnInit {
  @Input() cards: ICard[] = [];

  constructor() {}

  ngOnInit(): void {}
}
