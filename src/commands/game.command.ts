import { GameState } from "../models/game-state.model";
import { CommandValidation } from "./command-result";
import { GameEvents } from "../events/game-events";

export abstract class GameCommand {
  protected readonly events = GameEvents.getInstance();

  constructor() {}

  abstract execute(state: GameState): void;
  abstract validate(state: GameState): CommandValidation;
}
