import { Player } from "../models/player.model";

export class GameEndEvent {
  constructor(public readonly winner: Player, public readonly score: number) {}
}
