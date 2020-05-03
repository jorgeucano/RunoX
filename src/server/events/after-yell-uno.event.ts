import { Player } from "../models/player.model";

/**
 * Event that fires after a player yells one
 */
export class AfterYellUnoEvent {
  /**
   * Event that fires after a player yells one
   *
   * @param yeller - player who yelled one
   */
  constructor(public readonly yeller: Player) {}
}
