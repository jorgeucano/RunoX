import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Value } from "../models/values.model";
import { isValidColor, Color } from "../models/color.model";

export class PlayCardCommand extends GameCommand {
  private readonly playerId: string;
  private readonly cardId: string;

  constructor(playerId: string, cardId: string) {
    super();

    this.playerId = playerId;
    this.cardId = cardId;
  }

  execute(state: GameState): boolean {
    const player = state.playersGroup.getPlayerById(this.playerId);

    if (!player) {
      console.error("No ha sido posible encontrar al jugador en la partida");

      alert("No ha sido posible encontrar al jugador en la partida");
      return false;
    }

    if (!state.turn.player) {
      console.error("No hay un turno activo");

      alert("No hay un turno activo");
      return false;
    }

    if (player.id !== state.turn.player.id) {
      console.error("No es el turno del jugador");

      alert("No es el turno del jugador");
      return false;
    }

    const handCard = player.hand.cards.find(
      (handCard) => handCard.id === this.cardId
    );

    if (!handCard) {
      alert("No se ha encontrado la carta de la mano del jugador");

      // alert("No se ha encontrado la carta de la mano del jugador");
      return false;
    }

    if(state.stack.cardOnTop?.value === Value.PLUS_TWO && handCard.value !== Value.PLUS_TWO) {
      console.error(
        "La carta que quiere tirar no es +2"
      );
      
      alert("La carta que quiere tirar no es +2");
      return false;
    }

    if (state.stack.cardOnTop && !handCard?.isPlayable(state.stack.cardOnTop)) {
      console.error(
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );

      alert(
        "La carta que quiere tirar no tiene el mismo color o valor que la del stack"
      );
      return false;

    }

    
    state.turn.player.hand.removeCard(handCard);
    
    state.stack.addCard(handCard);
    
    if(handCard?.value === Value.PLUS_FOUR) {
      // Es importante el orden en que se aplica los efectos. Primero se aplica +4 y luego saltea turno.
      state.giveCards(4, state.nextPlayerToPlay);
      state.skipNextTurn();
    }
    
    if(handCard?.value === Value.PLUS_TWO) {
      state.cardsToGive += 2;
    }

    if (handCard?.value === Value.WILDCARD || handCard?.value === Value.PLUS_FOUR) {
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

    if (handCard?.value === Value.REVERSE) {
      state.changeDirection();
    }

    if(handCard?.value === Value.SKIP) {
      state.skipNextTurn();
    }

    console.log(
      `El jugador ${state.turn.player?.id} ha tirado la carta ${this.cardId} al stack`
    );
    return true;
  }
}
