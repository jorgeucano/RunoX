import { Player } from "../models/player.model";

/**
 * Event that fires when the next player has skiped
 */
export class SkipEvent {
  /**
   * Event that fires when the next player has skiped
   *
   * @param player Next player
   */
  constructor(public readonly player: Player) {}
}
