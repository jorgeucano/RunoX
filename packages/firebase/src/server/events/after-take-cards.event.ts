import { Card } from "../models/card.model";
import { Player } from "../models/player.model";

/**
 * Event that fires after taking a card
 */
export class AfterTakeCardsEvent {
  /**
   * Event that fires after taking a card
   *
   * @param cards - cards that were taken
   * @param player - player who took the cards
   */
  constructor(public readonly cards: Card[], public readonly player: Player) {}
}
