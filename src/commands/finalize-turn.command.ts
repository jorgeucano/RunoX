import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandResult } from "./command-result";
import { BeforeTurnEvent } from "../events/before-turn.event";

export class FinalizeTurnCommand extends GameCommand {
  execute(state: GameState) {
    if (!state.playersGroup.players.length) {
      return new CommandResult(
        false,
        "No se puede finalizar el turno si no hay jugadores"
      );
    }

    const nextPlayer = state.nextPlayerToPlay;

    state.turn.setPlayerTurn(nextPlayer);

    this.events.dispatchBeforeTurn(new BeforeTurnEvent(nextPlayer));

    console.log(`Es el turno del jugador: ${nextPlayer.name}`);

    return new CommandResult(true);
  }
}
