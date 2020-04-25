import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Value } from "../models/values.model";
import { isValidColor, Color } from "../models/color.model";
import { CommandValidation } from "./command-result";
import { AfterPlayCardEvent } from "../events/after-play-card.event";
import { Player } from "../models/player.model";
import { Card } from "../models/card.model";

export class PlayCardCommand extends GameCommand {
  private readonly playerId: string;
  private readonly cardId: string;

  constructor(playerId: string, cardId: string) {
    super();

    this.playerId = playerId;
    this.cardId = cardId;
  }

  execute(state: GameState) {
    const player = state.playersGroup.getPlayerById(this.playerId) as Player;

    const cardToPlay = player.hand.cards.find(
      (handCard) => handCard.id === this.cardId
    ) as Card;

    if (
      cardToPlay?.value === Value.WILDCARD ||
      cardToPlay?.value === Value.PLUS_FOUR
    ) {
      let newColor;
      // TODO: Cambiar el metodo de entrada del color
      while (!isValidColor(newColor as Color)) {
        newColor = prompt(
          "Escribe el nuevo color a jugar: azul, rojo, verde o amarillo"
        );
      }

      cardToPlay.setColor(newColor as Color);
    }

    state.turn.player?.hand.removeCard(cardToPlay);

    state.stack.addCard(cardToPlay);

    console.log(
      `El jugador ${state.turn.player?.id} ha tirado la carta ${this.cardId} al stack`
    );

    if (
      state.turn.player?.hand.cards.length === 0 &&
      state.unoYellers[state.turn.player?.id]
    ) {
      alert(
        `El jugador ${
          state.turn.player.name
        } gano! Su puntaje es: ${state.getScore()}`
      );

      // TODO: ver como finalizar el juego
      throw new Error("El juego termino!");
    }

    if (
      state.turn.player?.hand.cards.length === 1 &&
      !state.unoYellers[state.turn.player?.id]
    ) {
      state.giveCards(2, state.turn.player);
    }

    if (state.stack.cardOnTop?.value === Value.PLUS_FOUR) {
      // Es importante el orden en que se aplica los efectos.
      // Primero se aplica +4 y luego saltea turno.
      state.giveCards(4, state.nextPlayerToPlay);
      state.skipNextTurn();
    }

    if (state.stack.cardOnTop?.value === Value.PLUS_TWO) {
      state.cardsToGive += 2;

      const nextPlayerHasPlusTwo = state.nextPlayerToPlay.hand.hasCard(
        Value.PLUS_TWO
      );

      if (!nextPlayerHasPlusTwo) {
        state.giveCards(state.cardsToGive, state.nextPlayerToPlay);
        state.cardsToGive = 0;

        state.skipNextTurn();
      }
    }

    if (state.stack.cardOnTop?.value === Value.SKIP) {
      state.skipNextTurn();
    }

    if (state.stack.cardOnTop?.value === Value.REVERSE) {
      state.changeDirection();

      if (state.playersGroup.players.length === 2) {
        // si son dos jugadores entonces funciona como SKIP
        state.skipNextTurn();
      }
    }

    this.events.dispatchAfterPlayCard(
      new AfterPlayCardEvent(cardToPlay, player)
    );
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

    const cardToPlay = player.hand.cards.find(
      (handCard) => handCard.id === this.cardId
    );

    if (!cardToPlay) {
      return new CommandValidation(
        false,
        "No se ha encontrado la carta de la mano del jugador"
      );
    }

    if (
      state.stack.cardOnTop?.value === Value.PLUS_TWO &&
      cardToPlay.value !== Value.PLUS_TWO &&
      state.cardsToGive > 0
    ) {
      return new CommandValidation(false, "La carta que quiere tirar no es +2");
    }

    if (
      state.stack.cardOnTop &&
      !cardToPlay?.isPlayable(state.stack.cardOnTop)
    ) {
      return new CommandValidation(
        false,
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );
    }

    return new CommandValidation(true);
  }
}
