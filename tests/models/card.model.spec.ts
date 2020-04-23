import { Card } from "../../src/models/card.model";
import { Value } from "../../src/models/values.model";
import { Color } from "../../src/models/color.model";

describe("Card", () => {
  it("should set sprite attribute when we create a card", () => {
    const card = new Card(Value.ONE, Color.BLUE);

    expect(card).toBeDefined();
    expect(card.sprite).toEqual(`${Value.ONE}--${Color.BLUE}`);
  });

  it("should log error if we try to create a wildcard with a color", () => {
    const spy = spyOn(global.console, "error").and.callThrough();

    new Card(Value.WILDCARD, Color.BLUE);

    expect(spy).toBeCalled();
  });

  it("should return true when we invoke isSpecialCard and the card is special", () => {
    const card = new Card(Value.WILDCARD);

    expect(card.isSpecialCard()).toBeTruthy();
  });

  it("should return true when we invoke hasEffects and the card is has an effect", () => {
    const card = new Card(Value.WILDCARD);

    expect(card.hasEffects()).toBeTruthy();
  });

  it("should return true when we check if a wildcard is playable", () => {
    const card = new Card(Value.THREE, Color.GREEN);
    const wildcard = new Card(Value.WILDCARD);

    expect(wildcard.isPlayable(card)).toBeTruthy();
  });

  it("should return specific score when we check the score of a card", () => {
    const zero = new Card(Value.ZERO, Color.GREEN);
    const one = new Card(Value.ONE, Color.GREEN);
    const two = new Card(Value.TWO, Color.GREEN);
    const three = new Card(Value.THREE, Color.GREEN);
    const four = new Card(Value.FOUR, Color.GREEN);
    const five = new Card(Value.FIVE, Color.GREEN);
    const six = new Card(Value.SIX, Color.GREEN);
    const seven = new Card(Value.SEVEN, Color.GREEN);
    const eight = new Card(Value.EIGHT, Color.GREEN);
    const nine = new Card(Value.NINE, Color.GREEN);
    const plusTwo = new Card(Value.PLUS_TWO, Color.GREEN);
    const reverse = new Card(Value.REVERSE, Color.GREEN);
    const skip = new Card(Value.SKIP, Color.GREEN);
    const wildcard = new Card(Value.WILDCARD);
    const plusFour = new Card(Value.PLUS_FOUR);

    expect(zero.score).toBe(0);
    expect(one.score).toBe(1);
    expect(two.score).toBe(2);
    expect(three.score).toBe(3);
    expect(four.score).toBe(4);
    expect(five.score).toBe(5);
    expect(six.score).toBe(6);
    expect(seven.score).toBe(7);
    expect(eight.score).toBe(8);
    expect(nine.score).toBe(9);
    expect(plusTwo.score).toBe(20);
    expect(reverse.score).toBe(20);
    expect(skip.score).toBe(20);
    expect(wildcard.score).toBe(50);
    expect(plusFour.score).toBe(50);
  });
});
