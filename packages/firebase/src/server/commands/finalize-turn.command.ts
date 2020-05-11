import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandValidation } from "./command-result";
import { BeforeTurnEvent } from "../events/before-turn.event";

/**
 * Class that allows the end of the current player's turn and select the next one
 */
export class FinalizeTurnCommand extends GameCommand {
  /**
   * Class that allows the end of the current player's turn and select the next one
   */
  constructor() {
    super();
  }

  execute(state: GameState) {
    const nextPlayer = state.nextPlayerToPlay;

    state.turn.setPlayerTurn(nextPlayer);

    this.events.dispatchBeforeTurn(new BeforeTurnEvent(nextPlayer));

    console.log(`Es el turno del jugador: ${nextPlayer.name}`);
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
