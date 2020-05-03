import { Card } from "./card.model";
import { Value } from "./values.model";
import { Color } from "./color.model";

export class Hand {
  cards: Card[];

  constructor() {
    this.cards = [];
  }

  get score() {
    return this.cards.reduce((score, card) => {
      score += card.score;

      return score;
    }, 0);
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  addCards(cards: Card[]) {
    this.cards.push(...cards);
  }

  removeCard(card: Card | undefined) {
    if (card === undefined) {
      throw new Error(`La mano del jugador no posee cartas`);
    }

    const cardIndex = this.cards.findIndex(
      (handCard) => handCard.id === card.id
    );

    if (cardIndex === -1) {
      throw new Error(`La mano del jugador no posee la carta: ${card.id}`);
    }

    this.cards.splice(cardIndex, 1);

    console.log(`Se ha descartado la carta: ${card.id}`);
  }

  hasCard(value: Value, color?: Color) {
    if (!color) {
      return this.cards.some((handCard) => handCard.value === value);
    }

    return this.cards.some(
      (handCard) => handCard.value === value && handCard.color === color
    );
  }
}
