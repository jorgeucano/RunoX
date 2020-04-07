import { Card } from "./card.model";

export class Hand {
  readonly cards: Card[];

  constructor() {
    this.cards = [];
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  addCards(cards: Card[]) {
    this.cards.push(...cards);
  }

  removeCard(cardId: string) {
    const cardIndex = this.cards.findIndex((card) => card.id === cardId);

    if (cardIndex === -1) {
      console.error(`La mano del jugador no posee la carta: ${cardId}`);

      return;
    }

    this.cards.splice(cardIndex, 1);

    console.log(`Se ha descartado la carta: ${cardId}`);
  }
}
