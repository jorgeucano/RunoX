import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { CommandValidation } from "./command-result";
import { Player } from "../models/player.model";
import { AfterTakeCardsEvent } from "../events/after-take-cards.event";

/**
 * Class that allows the current player to take a card from the deck
 */
export class TakeDeckCardCommand extends GameCommand {
  /**
   * Class that allows the current player to take a card from the deck
   */
  constructor() {
    super();
  }

  execute(state: GameState) {
    const currentPlayer = state.turn.player as Player;

    const newCard = state.giveCards(1, currentPlayer);

    this.events.dispatchAfterTakeCards(
      new AfterTakeCardsEvent(newCard, currentPlayer)
    );

    state.unoYellers[currentPlayer.id] = false;

    this.checkForPlayersWhoShouldHaveYelledUno(state);
  }

  private checkForPlayersWhoShouldHaveYelledUno(state: GameState) {
    const playersWhoShouldHaveYelled = state.playersGroup.players.filter(
      (player) =>
        player.id !== state.turn.player?.id &&
        player.hand.cards.length === 1 &&
        !state.unoYellers[player.id]
    );

    playersWhoShouldHaveYelled.forEach((player) => {
      const newCards = state.giveCards(2, player);

      this.events.dispatchAfterTakeCards(
        new AfterTakeCardsEvent(newCards, player)
      );
    });
  }

  validate(state: GameState) {
    if (!state.turn.player) {
      return new CommandValidation(false, "No se le asigno turno a un jugador");
    }

    return new CommandValidation(true);
  }
}
