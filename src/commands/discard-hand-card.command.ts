import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";

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

    // TODO: permitir cartas especial en cualquier momento
    if (
      handCard.color !== state.stack.cardOnTop?.color &&
      handCard.value !== state.stack.cardOnTop?.value
    ) {
      console.error(
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );

      throw new Error(
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );
    }

    state.turn.player.hand.removeCard(handCard);

    state.stack.addCard(handCard);

    console.log(
      `El jugador ${state.turn.player?.id} ha tirado la carta ${this.cardId} al stack`
    );
  }
}
