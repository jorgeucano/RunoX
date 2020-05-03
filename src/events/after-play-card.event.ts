import { Card } from "../models/card.model";
import { Player } from "../models/player.model";

/**
 * Event that fires after playing a card
 */
export class AfterPlayCardEvent {
  /**
   * Event that fires after playing a card
   *
   * @param card - card that was played
   * @param player - player that played the card
   */
  constructor(public readonly card: Card, public readonly player: Player) {}
}
