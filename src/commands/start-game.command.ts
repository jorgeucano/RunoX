import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Card } from "../models/card.model";
import { CommandResult } from "./command-result";
import { BeforeTurnEvent } from "../events/before-turn.event";

export class StartGameCommand extends GameCommand {
  execute(state: GameState) {
    const handsLength = 7;

    if (!state.playersGroup.players.length) {
      console.error("No hay jugadores en la partida");

      return new CommandResult(false, "No hay jugadores en la partida");
    }

    state.playersGroup.players.forEach((player, index) => {
      player.hand.addCards(
        state.deck.cards.splice(index * handsLength, handsLength)
      );
    });

    let firstStackCard = state.deck.takeCard() as Card;

    // si la carta tiene efectos entonces busca otra
    // TODO: esto simplifica la logica por el momento pero deberia ser solo para +4 y elegir color
    while (firstStackCard.hasEffects()) {
      state.deck.addCards([firstStackCard]);

      state.deck.shuffle();

      firstStackCard = state.deck.takeCard() as Card;
    }

    state.stack.addCard(firstStackCard);

    const playerTurn = state.playersGroup.players[0];

    state.turn.setPlayerTurn(playerTurn);

    this.events.dispatchAfterGameStart();
    this.events.dispatchBeforeTurn(new BeforeTurnEvent(playerTurn));

    return new CommandResult(true);
  }
}
