import { Player } from "../models/player.model";

export class BeforeTurnEvent {
  constructor(public readonly player: Player) {}
}
