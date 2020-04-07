import { Card } from "./card.model";

export class Deck {
  readonly cards: Card[];

  constructor() {
    this.cards = [];
  }

  addCards(cards: Card[]) {
    this.cards.push(...cards);
  }
}
