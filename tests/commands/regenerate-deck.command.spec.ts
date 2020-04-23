import { RegenerateDeckCommand } from "../../src/commands/regenerate-deck.command";
import { GameState } from "../../src/models/game-state.model";
import { Card } from "../../src/models/card.model";
import { Value } from "../../src/models/values.model";

describe("RegenerateDeckCommand", () => {
  it("should return error result if there are cards on the deck when we execute the command", () => {
    const command = new RegenerateDeckCommand();
    const state = new GameState();
    const card = new Card(Value.PLUS_FOUR);

    state.deck.addCards([card]);

    const result = command.execute(state);

    expect(result.success).toBeFalsy();
  });

  it("should return error result if there are not cards on the stack when we execute the command", () => {
    const command = new RegenerateDeckCommand();
    const state = new GameState();
    const addCardsSpy = spyOn(state.deck, "addCards").and.callThrough();
    const cardOnTopSpy = jest.spyOn(state.stack, "cardOnTop", "get");

    const result = command.execute(state);

    expect(result.success).toBeFalsy();
    expect(addCardsSpy).toBeCalled();
    expect(cardOnTopSpy).toBeCalled();
  });

  it("should regenerate the deck when we execute the command", () => {
    const command = new RegenerateDeckCommand();
    const state = new GameState();
    const card1 = new Card(Value.PLUS_FOUR);
    const card2 = new Card(Value.WILDCARD);

    state.stack.addCard(card1);
    state.stack.addCard(card2);

    const deckAddCardsSpy = spyOn(state.deck, "addCards").and.callThrough();
    const deckShuffleSpy = spyOn(state.deck, "shuffle").and.callThrough();
    const stackEmptySpy = spyOn(state.stack, "empty").and.callThrough();
    const stackAddCardSpy = spyOn(state.stack, "addCard").and.callThrough();
    const stackCardOnTopSpy = jest.spyOn(state.stack, "cardOnTop", "get");

    command.execute(state);

    expect(deckAddCardsSpy).toBeCalled();
    expect(deckShuffleSpy).toBeCalled();
    expect(stackEmptySpy).toBeCalled();
    expect(stackAddCardSpy).toBeCalled();
    expect(stackCardOnTopSpy).toBeCalled();

    expect(state.deck.cards.length).toBeGreaterThan(0);
    expect(state.stack.cards.length).toBeGreaterThan(0);
    expect(state.stack.cardOnTop?.id).toEqual(card2.id);
  });
});
