import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandValidation } from "./command-result";
import { Player } from "../models/player.model";
import { AfterTakeCardsEvent } from "../events/after-take-cards.event";

export class TakeDeckCardCommand extends GameCommand {
  execute(state: GameState) {
    const currentPlayer = state.turn.player as Player;

    const newCard = state.giveCards(1, currentPlayer);

    this.events.dispatchAfterTakeCards(
      new AfterTakeCardsEvent(newCard, currentPlayer)
    );

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
