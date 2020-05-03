import { Card } from "./card.model";

export class Stack {
  cards: Card[];

  constructor() {
    this.cards = [];
  }

  get cardOnTop() {
    if (!this.cards.length) {
      return null;
    }

    return this.cards[0];
  }

  addCard(card: Card | undefined) {
    if (!card) {
      throw new Error(
        "La carta ha llegado nula al intentar agregarla al stack"
      );
    }

    this.cards.unshift(card);
  }

  empty() {
    this.cards.splice(0, this.cards.length);
  }
}
