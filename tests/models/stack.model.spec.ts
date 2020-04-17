import { Stack } from "../../src/models/stack.model";
import { Card } from "../../src/models/card.model";
import { Value } from "../../src/models/values.model";

describe("Stack", () => {
  it("should initialize cards when we create a Stack model", () => {
    const stack = new Stack();

    expect(stack.cards).toBeDefined();
  });

  it("should return null when the stack has not cards", () => {
    const stack = new Stack();

    expect(stack.cards.length).toBe(0);
    expect(stack.cardOnTop).toBeNull();
  });

  it("should return the card on top of the stack when there are cards on the stack", () => {
    const stack = new Stack();
    const card = new Card(Value.PLUS_FOUR);

    stack.addCard(card);

    expect(stack.cards.length).toBe(1);
    expect(stack.cardOnTop).not.toBeNull();
    expect(stack.cardOnTop?.id).toEqual(card.id);
  });

  it("should add a card when addCard method is called", () => {
    const stack = new Stack();
    const card = new Card(Value.PLUS_FOUR);

    stack.addCard(card);

    expect(stack.cards.length).toBe(1);
  });

  it("should empty the stack when the empty method is called", () => {
    const stack = new Stack();
    const card = new Card(Value.PLUS_FOUR);

    stack.addCard(card);

    expect(stack.cards.length).toBe(1);

    stack.empty();

    expect(stack.cards.length).toBe(0);
  });
});
