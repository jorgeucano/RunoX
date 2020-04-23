import { GameState } from "../models/game-state.model";
import { CommandResult } from "./command-result";
import { GameEvents } from "../events/game-events";

export abstract class GameCommand {
  protected readonly events = GameEvents.getInstance();

  constructor() {}

  abstract execute(state: GameState): CommandResult;
}
