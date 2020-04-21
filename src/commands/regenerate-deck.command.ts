import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandResult } from "./command-result";

export class RegenerateDeckCommand extends GameCommand {
  execute(state: GameState) {
    if (state.deck.cards.length) {
      console.error("El mazo aun tiene cartas");

      return new CommandResult(false, "El mazo aun tiene cartas");
    }

    const newDeckCards = state.stack.cards.filter(
      (card) => card.id === state.stack.cardOnTop?.id
    );

    state.deck.addCards(newDeckCards);

    const currentCard = state.stack.cardOnTop;

    if (!currentCard) {
      console.error("No se pudo obtener la carta de la cima del stack");

      return new CommandResult(
        false,
        "No se pudo obtener la carta de la cima del stack"
      );
    }

    state.stack.empty();

    state.stack.addCard(currentCard);

    state.deck.shuffle();

    console.log("Se ha regenerado el deck");

    return new CommandResult(true);
  }
}
