import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Card } from "../models/card.model";

export class StartGameCommand extends GameCommand {
  execute(state: GameState) {
    const handsLength = 7; // randomDeck.length / 4; // 4 jugadores

    if (!state.playersGroup.players.length) {
      console.error("No hay jugadores en la partida");
      return;
    }

    state.playersGroup.players.forEach((player, index) => {
      player.hand.addCards(
        state.deck.cards.splice(index * handsLength, handsLength)
      );
    });

    let firstStackCard = state.deck.takeCard() as Card;

    while(firstStackCard.isSpecialCard()) {
      state.deck.addCards([firstStackCard]);

      state.deck.shuffle();

      firstStackCard = state.deck.takeCard() as Card;
    }

    state.stack.addCard(firstStackCard);

    state.turn.setPlayerTurn(state.playersGroup.players[0]);
  }
}
