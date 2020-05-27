import { Player } from "../models/player.model";

/**
 * Event that fires when the color of card has changed
 */
export class ChangeColorEvent {
  /**
   * Event that fires when the color of card has changed
   *
   * @param color - new color
   */
  constructor(public readonly color: string) {}
}
