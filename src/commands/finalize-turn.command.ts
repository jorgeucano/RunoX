import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandResult } from "./command-result";

export class FinalizeTurnCommand extends GameCommand {
  execute(state: GameState) {
    if (!state.playersGroup.players.length) {
      return new CommandResult(
        false,
        "No se puede finalizar el turno si no hay jugadores"
      );
    }

    state.turn.setPlayerTurn(state.nextPlayerToPlay);

    console.log(`Es el turno del jugador: ${state.turn.player?.name}`);

    return new CommandResult(true);
  }
}
