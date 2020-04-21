import { GameState } from "../models/game-state.model";
import { CommandResult } from "./command-result";

export abstract class GameCommand {
  constructor() {}

  abstract execute(state: GameState): CommandResult;
}
