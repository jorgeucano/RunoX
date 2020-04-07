import { GameState } from "../models/game-state.model";

export abstract class GameCommand {
  constructor() {}

  abstract execute(state: GameState): void;
}
