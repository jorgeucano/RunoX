import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandResult } from "./command-result";
import { AfterTakeCardEvent } from "../events/after-take-card.event";

export class TakeDeckCardCommand extends GameCommand {
  execute(state: GameState) {
    if (!state.deck.cards.length) {
      console.error("No hay cartas disponibles en el mazo");

      return new CommandResult(false, "No hay cartas disponibles en el mazo");
    }

    if (!state.turn.player) {
      console.error("No se le asigno turno a un jugador");

      return new CommandResult(false, "No se le asigno turno a un jugador");
    }

    if (state.cardsToGive > 0) {
      state.giveCards(state.cardsToGive, state.turn.player)
      state.cardsToGive = 0;
      return ;
    } 

    const card = state.deck.takeCard();

    if (!card) {
      console.error("No ha sido posible tomar una carta del mazo");

      return new CommandResult(
        false,
        "No ha sido posible tomar una carta del mazo"
      );
    }

    state.turn.player?.hand.addCard(card);
    console.log(
      `El jugador ${state.turn.player.id} ha agregado a su mano la carta ${card.id}`
    );

    this.events.dispatchAfterTakeCard(
      new AfterTakeCardEvent(card, state.turn.player)
    );

    return new CommandResult(true);
  }
}
