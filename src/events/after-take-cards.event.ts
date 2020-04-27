import { Card } from "../models/card.model";
import { Player } from "../models/player.model";

export class AfterTakeCardsEvent {
  constructor(public readonly cards: Card[], public readonly player: Player) {}
}
