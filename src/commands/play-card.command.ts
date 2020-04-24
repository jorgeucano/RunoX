import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Value } from "../models/values.model";
import { isValidColor, Color } from "../models/color.model";
import { CommandResult } from "./command-result";
import { AfterPlayCardEvent } from "../events/after-play-card.event";

export class PlayCardCommand extends GameCommand {
  private readonly playerId: string;
  private readonly cardId: string;

  constructor(playerId: string, cardId: string) {
    super();

    this.playerId = playerId;
    this.cardId = cardId;
  }

  execute(state: GameState): CommandResult {
    const player = state.playersGroup.getPlayerById(this.playerId);

    if (!player) {
      console.error("No ha sido posible encontrar al jugador en la partida");

      return new CommandResult(
        false,
        "No ha sido posible encontrar al jugador en la partida"
      );
    }

    if (!state.turn.player) {
      console.error("No hay un turno activo");

      return new CommandResult(false, "No hay un turno activo");
    }

    if (player.id !== state.turn.player.id) {
      console.error("No es el turno del jugador");

      return new CommandResult(false, "No es el turno del jugador");
    }

    const cardToPlay = player.hand.cards.find(
      (handCard) => handCard.id === this.cardId
    );

    if (!cardToPlay) {
      return new CommandResult(
        false,
        "No se ha encontrado la carta de la mano del jugador"
      );
    }

    if (
      state.stack.cardOnTop?.value === Value.PLUS_TWO &&
      cardToPlay.value !== Value.PLUS_TWO &&
      state.cardsToGive > 0
    ) {
      console.error("La carta que quiere tirar no es +2");

      alert("La carta que quiere tirar no es +2");
      return new CommandResult(false, "La carta que quiere tirar no es +2");
    }

    if (
      state.stack.cardOnTop &&
      !cardToPlay?.isPlayable(state.stack.cardOnTop)
    ) {
      console.error(
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );

      return new CommandResult(
        false,
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );
    }

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

    state.turn.player.hand.removeCard(cardToPlay);

    state.stack.addCard(cardToPlay);

    console.log(
      `El jugador ${state.turn.player?.id} ha tirado la carta ${this.cardId} al stack`
    );

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

    return new CommandResult(true);
  }
}
