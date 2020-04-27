import { Card } from "./card.model";

export class Stack {
  readonly cards: Card[];

  constructor() {
    this.cards = [];
  }

  get cardOnTop() {
    if (!this.cards.length) {
      return null;
    }

    return this.cards[this.cards.length - 1];
  }

  addCard(card: Card | undefined) {
    if (!card) {
      throw new Error(
        "La carta ha llegado nula al intentar agregarla al stack"
      );
    }

    this.cards.push(card);
  }

  empty() {
    this.cards.splice(0, this.cards.length);
  }
}
