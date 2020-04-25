import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandValidation } from "./command-result";
import { Player } from "../models/player.model";

export class TakeDeckCardCommand extends GameCommand {
  execute(state: GameState) {
    const currentPlayer = state.turn.player as Player;

    state.giveCards(1, currentPlayer);

    state.unoYellers[currentPlayer.id] = false;
    state.checkForPlayersWhoShouldHaveYelledUno();
  }

  validate(state: GameState) {
    if (!state.turn.player) {
      return new CommandValidation(false, "No se le asigno turno a un jugador");
    }

    return new CommandValidation(true);
  }
}
