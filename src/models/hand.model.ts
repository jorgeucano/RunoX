import { Card } from "./card.model";

export class Hand {
  readonly cards: Card[];

  constructor() {
    this.cards = [];
  }

  get score() {
    return this.cards.reduce((amount, card) => {
      amount += card.score;

      return amount;
    }, 0);
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  addCards(cards: Card[]) {
    this.cards.push(...cards);
  }

  removeCard(card: Card) {
    const cardIndex = this.cards.findIndex(
      (handCard) => handCard.id === card.id
    );

    if (cardIndex === -1) {
      console.error(`La mano del jugador no posee la carta: ${card.id}`);

      return;
    }

    this.cards.splice(cardIndex, 1);

    console.log(`Se ha descartado la carta: ${card.id}`);
  }
}
