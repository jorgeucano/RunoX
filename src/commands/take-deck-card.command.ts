import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandValidation } from "./command-result";
import { AfterTakeCardEvent } from "../events/after-take-card.event";
import { Card } from "../models/card.model";
import { Player } from "../models/player.model";

export class TakeDeckCardCommand extends GameCommand {
  execute(state: GameState) {
    const card = state.deck.takeCard() as Card;

    const currentPlayer = state.turn.player as Player;

    currentPlayer.hand.addCard(card);

    console.log(
      `El jugador ${currentPlayer.id} ha agregado a su mano la carta ${card.id}`
    );

    this.events.dispatchAfterTakeCard(
      new AfterTakeCardEvent(card, currentPlayer)
    );

    state.unoYellers[currentPlayer.id] = false;
  }

  validate(state: GameState) {
    if (!state.deck.cards.length) {
      return new CommandValidation(
        false,
        "No hay cartas disponibles en el mazo"
      );
    }

    if (!state.turn.player) {
      return new CommandValidation(false, "No se le asigno turno a un jugador");
    }

    return new CommandValidation(true);
  }
}
