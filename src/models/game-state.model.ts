import { Deck } from "./deck.model";
import { PlayersGroup } from "./players-group.model";
import { Turn } from "./turn.model";
import { Stack } from "./stack.model";
import { GameDirection } from "./game-direction.model";
import { Card } from "./card.model";
import { Player } from "./player.model";

/** Clase que representa el estado del juego */
export class GameState {
  readonly deck: Deck;
  readonly stack: Stack;

  readonly playersGroup: PlayersGroup;

  readonly turn: Turn;

  gameDirection: GameDirection;

  cardsToGive: number;

  constructor() {
    this.deck = new Deck();
    this.stack = new Stack();
    this.playersGroup = new PlayersGroup();
    this.turn = new Turn();
    this.gameDirection = GameDirection.CLOCKWISE;
    this.cardsToGive = 0;
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

  giveCards(quantity: number, toPlayer: Player) {
    const avaibleCards = this.deck.cards.length + this.stack.cards.length;

    while (quantity > avaibleCards) {
      console.error("No se puede dar más cartas que las jugables");

      return;
    }

    if (quantity > this.deck.cards.length) {
      this.addStackCardsToDeck();
    }

    for (let index = 0; index < quantity; index++) {
      const newCard = this.deck.takeCard();

      toPlayer.hand.addCard(newCard as Card);
    }

    console.log(`Se entregaron ${quantity} cartas al jugador ${toPlayer.name}`);
  }

  skipNextTurn() {
    this.turn.setPlayerTurn(this.nextPlayerToPlay);
  }

  addStackCardsToDeck() {
    const newDeckCards = this.stack.cards.filter(
      (card) => card.id === this.stack.cardOnTop?.id
    );

    this.deck.addCards(newDeckCards);

    const cardOnTopTheStack = this.stack.cardOnTop;

    if (!cardOnTopTheStack) {
      console.error("No se pudo obtener la carta de la cima del stack");

      return;
    }

    this.stack.empty();

    this.stack.addCard(cardOnTopTheStack);

    this.deck.shuffle();
  }
}
