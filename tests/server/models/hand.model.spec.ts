import { Hand } from "../../../src/server/models/hand.model";
import { Card } from "../../../src/server/models/card.model";
import { Value } from "../../../src/server/models/values.model";
import { Color } from "../../../src/server/models/color.model";

describe("Hand", () => {
  it("should initialize cards when we create a hand", () => {
    const hand = new Hand();

    expect(hand.cards).toBeDefined();
    expect(hand.cards.length).toBe(0);
  });

  it("should add a card when addCard method is called", () => {
    const hand = new Hand();

    const card = new Card(Value.PLUS_FOUR);

    hand.addCard(card);

    expect(hand.cards.length).toBe(1);
  });

  it("should add multiple cards when addCards method is called", () => {
    const hand = new Hand();

    const cards = [new Card(Value.PLUS_FOUR), new Card(Value.WILDCARD)];

    hand.addCards(cards);

    expect(hand.cards.length).toBe(2);
  });

  it("should throw error if the card we are trying to remove is not present", () => {
    const hand = new Hand();
    const cards = [new Card(Value.PLUS_FOUR), new Card(Value.WILDCARD)];

    hand.addCards(cards);

    expect(() =>
      hand.removeCard(new Card(Value.ONE, Color.BLUE))
    ).toThrowError();
  });

  it("should remove a card from the hand when we invoke removeCard with a valid cardId", () => {
    const hand = new Hand();
    const card1 = new Card(Value.PLUS_FOUR);
    const card2 = new Card(Value.WILDCARD);
    const cards = [card1, card2];

    hand.addCards(cards);

    hand.removeCard(card1);

    expect(hand.cards.length).toBe(1);
  });

  it("should calculate the hand score correctly", () => {
    const hand = new Hand();
    const plusFour = new Card(Value.PLUS_FOUR);
    const wildcard = new Card(Value.WILDCARD);
    const cards = [plusFour, wildcard];

    hand.addCards(cards);

    expect(hand.score).toBe(100);
  });
});
