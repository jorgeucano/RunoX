import { GameCommand } from "./game.command";import { GameState } from "../models/game-state.model";

export class StartGameCommand extends GameCommand {
  execute(state: GameState) {
    const handsLength = 7; // randomDeck.length / 4; // 4 jugadores

    if (!state.players.players.length) {
      console.error("No hay jugadores en la partida");
      return;
    }

    state.players.players.forEach((player, index) => {
      player.hand.addCards(
        state.deck.cards.splice(index * handsLength, handsLength)
      );
    });

    state.turn.setPlayerTurn(state.players.players[0]);
  }
}
