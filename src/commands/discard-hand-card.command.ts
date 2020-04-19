import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Value } from "../models/values.model";
import { isValidColor, Color } from "../models/color.model";

export class DiscardHandCardCommand extends GameCommand {
  readonly cardId: string;

  constructor(cardId: string) {
    super();

    this.cardId = cardId;
  }

  execute(state: GameState) {
    if (!state.turn.player) {
      console.error("No hay un turno de un jugador activo");

      throw new Error("No hay un turno de un jugador activo");
    }

    const handCard = state.turn.player?.hand.cards.find(
      (handCard) => handCard.id === this.cardId
    );

    if (!handCard) {
      console.error("No se ha encontrado la carta de la mano del jugador");

      throw new Error("No se ha encontrado la carta de la mano del jugador");
    }

    if (state.stack.cardOnTop && !handCard.isPlayable(state.stack.cardOnTop)) {
      console.error(
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );

      throw new Error(
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );
    }

    
    state.turn.player.hand.removeCard(handCard);
    
    state.stack.addCard(handCard);
    
    if (handCard.value === Value.WILDCARD) {
      let newColor;
      // TODO: Cambiar el metodo de entrada del color
      // TODO: hacer la validación de color en changePlayableColor
      while (!isValidColor(newColor as Color)) {
        newColor = prompt(
          "Escribe el nuevo color a jugar: azul, rojo, verde o amarillo"
        );
      }
      state.changePlayableColor(newColor as Color);
    }
    
    if (handCard.value === Value.REVERSE) {
      state.changeDirection();
    }

    console.log(
      `El jugador ${state.turn.player?.id} ha tirado la carta ${this.cardId} al stack`
    );
  }
}
