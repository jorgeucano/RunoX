import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";

export class CommandsInvoker {
  private readonly commands: GameCommand[];

  constructor(commands: GameCommand[]) {
    this.commands = commands;
  }

  invoke(currentState: GameState) {
    this.commands.every((command) => {
      const commandResult = command.execute(currentState);

      if (!commandResult.success) {
        alert(commandResult.error);
      }

      return commandResult.success;
    });
  }
}
