import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";

export class CommandsInvoker {
  private readonly commands: GameCommand[];

  constructor(commands: GameCommand[]) {
    this.commands = commands;
  }

  invoke(currentState: GameState) {
    this.commands.every((command) => {
      const commandValidation = command.validate(currentState);

      if (!commandValidation.isValid) {
        console.error(commandValidation.error);

        // TODO: esto solo funcionaria en entornos web
        alert(commandValidation.error);

        return false;
      }

      command.execute(currentState);

      return true;
    });
  }
}
