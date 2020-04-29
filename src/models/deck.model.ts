import { Card } from "./card.model";

export class Deck {
  cards: Card[];

  constructor() {
    this.cards = [];
  }

  addCards(cards: Card[]) {
    this.cards.push(...cards);
  }

  shuffle() {
    var index = this.cards.length,
      temporaryValue,
      randomIndex;

    // mientras queden elementos a mezclar
    while (0 !== index) {
      // seleccionar un elemento sin mezclar
      randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      // e intercambiarlo con el elemento actual
      temporaryValue = this.cards[index];
      this.cards[index] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  takeCard() {
    if (!this.cards.length) {
      throw new Error("No hay cartas disponibles en el mazo");
    }

    return this.cards.shift();
  }
}
