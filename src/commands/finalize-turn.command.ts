import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandValidation } from "./command-result";
import { BeforeTurnEvent } from "../events/before-turn.event";
import { firebaseUpdateState } from "../db/firebase";

export class FinalizeTurnCommand extends GameCommand {
  execute(state: GameState) {
    const nextPlayer = state.nextPlayerToPlay;

    state.turn.setPlayerTurn(nextPlayer);

    this.events.dispatchBeforeTurn(new BeforeTurnEvent(nextPlayer));

    console.log(`Es el turno del jugador: ${nextPlayer.name}`);

    firebaseUpdateState(state);
  }

  validate(state: GameState) {
    if (!state.playersGroup.players.length) {
      return new CommandValidation(
        false,
        "No se puede finalizar el turno si no hay jugadores"
      );
    }

    return new CommandValidation(true);
  }
}
