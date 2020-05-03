import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Value } from "../models/values.model";
import { CommandValidation } from "./command-result";
import { AfterPlayCardEvent } from "../events/after-play-card.event";
import { Player } from "../models/player.model";
import { Card } from "../models/card.model";
import { GameEndEvent } from "../events/game-end.event";
import { AfterTakeCardsEvent } from "../events/after-take-cards.event";

/**
 * Class that allows a player to play a card from his hand
 */
export class PlayCardCommand extends GameCommand {
  private readonly playerId: string;
  private readonly card: Card;

  /**
   * Class that allows a player to play a card from his hand
   *
   * @param playerId - identifier of the player who wants to play a card
   * @param card - card to be played
   */
  constructor(playerId: string, card: Card) {
    super();

    this.playerId = playerId;

    this.card =
      // @ts-ignore
      card instanceof Card ? card : new Card(card.value, card.color, card.id);
  }

  execute(state: GameState) {
    state.turn.player?.hand.removeCard(this.card);

    state.stack.addCard(this.card);

    if (
      state.turn.player?.hand.cards.length === 0 &&
      state.unoYellers[state.turn.player?.id]
    ) {
      const score = state.playersGroup.players
        .filter((player) => player.id !== state.turn.player?.id)
        .reduce((score, player) => {
          score += player.hand.score;

          return score;
        }, 0);

      this.events.dispatchGameEnd(new GameEndEvent(state.turn.player, score));
    }

    this.checkForPlayersWhoShouldHaveYelledUno(state);

    if (state.stack.cardOnTop?.value === Value.PLUS_FOUR) {
      // Es importante el orden en que se aplica los efectos.
      // Primero se aplica +4 y luego saltea turno.
      const newCards = state.giveCards(4, state.nextPlayerToPlay);

      this.events.dispatchAfterTakeCards(
        new AfterTakeCardsEvent(newCards, state.nextPlayerToPlay)
      );

      state.turn.setPlayerTurn(state.nextPlayerToPlay);
    }

    if (state.stack.cardOnTop?.value === Value.PLUS_TWO) {
      state.cardsToGive += 2;

      const nextPlayerHasPlusTwo = state.nextPlayerToPlay.hand.hasCard(
        Value.PLUS_TWO
      );

      if (!nextPlayerHasPlusTwo) {
        const newCards = state.giveCards(
          state.cardsToGive,
          state.nextPlayerToPlay
        );

        this.events.dispatchAfterTakeCards(
          new AfterTakeCardsEvent(newCards, state.nextPlayerToPlay)
        );

        state.cardsToGive = 0;

        state.turn.setPlayerTurn(state.nextPlayerToPlay);
      }
    }

    if (state.stack.cardOnTop?.value === Value.SKIP) {
      state.turn.setPlayerTurn(state.nextPlayerToPlay);
    }

    if (state.stack.cardOnTop?.value === Value.REVERSE) {
      state.changeDirection();

      if (state.playersGroup.players.length === 2) {
        // si son dos jugadores entonces funciona como SKIP
        state.turn.setPlayerTurn(state.nextPlayerToPlay);
      }
    }

    const player = state.playersGroup.getPlayerById(this.playerId) as Player;

    this.events.dispatchAfterPlayCard(
      new AfterPlayCardEvent(this.card, player)
    );

    console.log(
      `El jugador ${state.turn.player?.id} ha tirado la carta ${this.card.value} ${this.card.color} al stack`
    );
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
    const player = state.playersGroup.getPlayerById(this.playerId);

    if (!player) {
      return new CommandValidation(
        false,
        "No ha sido posible encontrar al jugador en la partida"
      );
    }

    if (!state.turn.player) {
      return new CommandValidation(false, "No hay un turno activo");
    }

    if (player.id !== state.turn.player.id) {
      return new CommandValidation(false, "No es el turno del jugador");
    }

    if (!this.card) {
      return new CommandValidation(
        false,
        "No se ha encontrado la carta de la mano del jugador"
      );
    }

    const playerHasSelectedCard = player.hand.cards.some(
      (card) => card.id === this.card.id
    );

    if (!playerHasSelectedCard) {
      return new CommandValidation(
        false,
        "El jugador no posee la carta seleccionada"
      );
    }

    if (
      (this.card?.value === Value.WILDCARD ||
        this.card?.value === Value.PLUS_FOUR) &&
      !this.card.color
    ) {
      return new CommandValidation(
        false,
        "No se especifico el color de la carta"
      );
    }

    if (
      state.stack.cardOnTop?.value === Value.PLUS_TWO &&
      this.card.value !== Value.PLUS_TWO &&
      state.cardsToGive > 0
    ) {
      return new CommandValidation(false, "La carta que quiere tirar no es +2");
    }
    if (
      state.stack.cardOnTop &&
      !this.card?.isPlayable(state.stack.cardOnTop)
    ) {
      return new CommandValidation(
        false,
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );
    }

    return new CommandValidation(true);
  }
}
