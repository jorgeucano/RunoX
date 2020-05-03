import { Player } from "../models/player.model";

/**
 * Event that fires when the game ends
 */
export class GameEndEvent {
  /**
   * Event that fires when the game ends
   *
   * @param winner - game winner
   * @param score - game winner score
   */
  constructor(public readonly winner: Player, public readonly score: number) {}
}
