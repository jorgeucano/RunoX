import { Component, Input, OnInit } from "@angular/core";
import { ICard } from "@runox-game/game-engine/lib/models/card.model";

@Component({
  selector: "rnx-deck-card",
  templateUrl: "./deck-card.component.html",
  styleUrls: ["./deck-card.component.css"],
})
export class DeckCardComponent implements OnInit {
  @Input() card: ICard;

  constructor() {}

  ngOnInit(): void {}
}
