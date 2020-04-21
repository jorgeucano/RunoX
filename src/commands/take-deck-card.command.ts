import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandResult } from "./command-result";

export class TakeDeckCardCommand extends GameCommand {
  execute(state: GameState) {
    if (!state.deck.cards.length) {
      console.error("No hay cartas disponibles en el mazo");

      return new CommandResult(false, "No hay cartas disponibles en el mazo");
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
      `El jugador ${state.turn.player?.id} ha agregado a su mano la carta ${card.id}`
    );

    return new CommandResult(true);
  }
}
