import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Observable } from "rxjs";

export class CommandsInvoker {
  private readonly commands: GameCommand[];

  constructor(commands: GameCommand[]) {
    this.commands = commands;
  }

  invoke(currentState: GameState) {
    const observable = new Observable<void>((subscriber) => {
      try {
        this.commands.forEach((command) => {
          const commandValidation = command.validate(currentState);

          if (!commandValidation.isValid) {
            console.error(commandValidation.error);

            throw new Error(commandValidation.error);
          }

          command.execute(currentState);
        });

        subscriber.next();
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    });

    return observable;
  }
}
