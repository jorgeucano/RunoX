import { Component, Input, OnInit } from "@angular/core";
import { ICard } from "@runox-game/game-engine/lib/models/card.model";

@Component({
  selector: "rnx-deck-card",
  templateUrl: "./deck-card.component.html",
  styleUrls: ["./deck-card.component.css"],
})
export class DeckCardComponent implements OnInit {
  @Input() card: ICard;
  @Input() styleRotation = '';

  constructor() {}

  ngOnInit(): void {}

  rotate(): void {
    var rotation = Math.floor(Math.random() * 20) + 10;
    rotation *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.styleRotation = `rotate(${rotation}deg)`;
  }
}
