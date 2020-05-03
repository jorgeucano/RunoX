import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Observable } from "rxjs";

/**
 *  Class in charge of grouping the execution of commands that alter the game state
 */
export class CommandsInvoker {
  private readonly commands: GameCommand[];

  /**
   *  Class in charge of grouping the execution of commands that alter the game state
   *
   * @param commands - commands to execute
   */
  constructor(commands: GameCommand[]) {
    this.commands = commands;
  }

  /**
   * Loops through the list of commands validating that they can be executed
   * and executing if there are no errors during validation
   *
   * @param currentState - current game state
   * @returns observable with the intention of being able to track the success or failure
   * of the command group invocation
   */
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
