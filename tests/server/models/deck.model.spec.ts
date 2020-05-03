import { Deck } from "../../../src/server/models/deck.model";
import { Card } from "../../../src/server/models/card.model";
import { Value } from "../../../src/server/models/values.model";
import { Color } from "../../../src/server/models/color.model";

describe("Deck", () => {
  it("should initialize cards when we create a deck", () => {
    const deck = new Deck();

    expect(deck.cards).toBeDefined();
    expect(deck.cards.length).toBe(0);
  });

  it("should add cards when addCards method is called", () => {
    const deck = new Deck();

    const card = new Card(Value.PLUS_FOUR);

    deck.addCards([card]);

    expect(deck.cards.length).toBe(1);
  });

  it("should shuffle cards when shuffle method is called", () => {
    const deck = new Deck();

    deck.addCards([
      new Card(Value.ONE, Color.BLUE),
      new Card(Value.TWO, Color.BLUE),
      new Card(Value.THREE, Color.BLUE),
      new Card(Value.FOUR, Color.BLUE),
      new Card(Value.FIVE, Color.BLUE),
      new Card(Value.SIX, Color.BLUE),
      new Card(Value.SEVEN, Color.BLUE),
      new Card(Value.EIGHT, Color.BLUE),
      new Card(Value.NINE, Color.BLUE),
      new Card(Value.ZERO, Color.BLUE),
    ]);

    const originalOrder = deck.cards.map((card) => card.id);

    deck.shuffle();

    const newOrder = deck.cards.map((card) => card.id);

    expect(originalOrder).not.toEqual(newOrder);
  });

  it("should take a card from the deck when addCards takeCard is invoked", () => {
    const deck = new Deck();

    const card1 = new Card(Value.PLUS_FOUR);
    const card2 = new Card(Value.WILDCARD);

    deck.addCards([card1, card2]);

    const tackedCard = deck.takeCard();

    expect(tackedCard).toBeDefined();
    expect(tackedCard?.id).toEqual(card1.id);
  });

  it("should throw error when we try to take a card from an empty deck", () => {
    const deck = new Deck();
    
    expect(() => deck.takeCard()).toThrowError();
  });
});
