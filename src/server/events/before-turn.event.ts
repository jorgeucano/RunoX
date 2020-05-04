import { Player } from "../models/player.model";

/**
 * Event that fires after a player yells one
 */
export class BeforeTurnEvent {
  /**
   * Event that fires after a player yells one
   *
   * @param player - player who has the turn
   */
  constructor(public readonly player: Player) {}
}
