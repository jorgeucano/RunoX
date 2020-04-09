import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";

export class RegenerateDeckCommand extends GameCommand {
  execute(state: GameState) {
    if (state.deck.cards.length) {
      console.error("El mazo aun tiene cartas");

      return;
    }

    const newDeckCards = state.stack.cards.filter(
      (card) => card.id === state.stack.cardOnTop?.id
    );

    state.deck.addCards(newDeckCards);

    const currentCard = state.stack.cardOnTop;

    if (!currentCard) {
      console.error("No se pudo obtener la carta de la cima del stack");

      return;
    }

    state.stack.empty();

    state.stack.addCard(currentCard);

    state.deck.shuffle();

    console.log(`Se ha regenerado el deck: ${JSON.stringify(state.deck.cards)}`);
  }
}
