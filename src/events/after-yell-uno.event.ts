import { Player } from "../models/player.model";

export class AfterYellUnoEvent {
  constructor(public readonly yeller: Player) {}
}
