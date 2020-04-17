import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";

export class FinalizeTurnCommand extends GameCommand {
  execute(state: GameState) {
    if (!state.playersGroup.players.length) {
      console.error("No se puede finalizar el turno si no hay jugadores");
    }

    state.turn.setPlayerTurn(state.nextPlayerToPlay);

    console.log(`Es el turno del jugador: ${state.turn.player?.name}`);
  }
}
