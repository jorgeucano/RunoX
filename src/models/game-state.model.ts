import { Deck } from "./deck.model";
import { PlayersGroup } from "./players-group.model";
import { Turn } from "./turn.model";
import { Stack } from "./stack.model";
import { GameDirection } from "./game-direction.model";
import { Color } from "./color.model";
import { Card } from "./card.model";

/** Clase que representa el estado del juego */
export class GameState {
  readonly deck: Deck;
  readonly stack: Stack;

  readonly playersGroup: PlayersGroup;

  readonly turn: Turn;

  gameDirection: GameDirection;

  constructor() {
    this.deck = new Deck();
    this.stack = new Stack();
    this.playersGroup = new PlayersGroup();
    this.turn = new Turn();
    this.gameDirection = GameDirection.CLOCKWISE;
  }

  get nextPlayerToPlay() {
    // es el primer turno, entonces elegimos el primer jugador
    if (!this.turn.player) {
      return this.playersGroup.players[0];
    }

    let currentPlayerIndex = this.playersGroup.players.findIndex(
      (player) => player.id === this.turn.player?.id
    );

    const nextPlayerIndex = currentPlayerIndex + 1;

    // no ha terminado la vuelta, entonces elegimos el proximo en la lista
    if (nextPlayerIndex < this.playersGroup.players.length) {
      return this.playersGroup.players[nextPlayerIndex];
    }

    // ya ha jugado el ultimo, entonces comienza nuevamente desde el primero
    return this.playersGroup.players[0];
  }

  changeDirection() {
    const newDirection =
      this.gameDirection === GameDirection.CLOCKWISE
        ? GameDirection.COUNTER_CLOCKWISE
        : GameDirection.CLOCKWISE;

    this.gameDirection = newDirection;

    this.playersGroup.players.reverse();
  }

  changePlayableColor(color: Color) {
    this.stack.cardOnTop?.setColor(color);
    console.warn(`El nuevo color es ${color}`);
  }

  giveCards(quantity: number) {
    const avaibleCards = this.deck.cards.length + this.stack.cards.length;
    while(quantity > avaibleCards) {
      // No puede entregar mas cartas que las que hay jugables.
      quantity -= 1;
    }
    if (quantity > this.deck.cards.length) {
      //Si no alcanza del mazo, entonces mezcla el deck con el stack.
      this.reshuffle();
    }
    for (let index = 0; index < quantity; index++) {
      const newCard = this.deck.takeCard();
      this.nextPlayerToPlay.hand.addCard(newCard as Card)
    }
    console.log(`Se entregaron ${quantity} cartas al jugador ${this.nextPlayerToPlay.name}`);
  }

  reshuffle() {
    // No mezcla las cartas, simplemente las pone tal cual en el maso.
    // TODO: Mezclar el deck al juntarlas con el stack.
    this.deck.addCards(this.stack.cards);
    this.stack.empty()
  }
}
