import { BuildDeckCommand } from "../../src/commands/build-deck.command";
import { GameState } from "../../src/models/game-state.model";
import { Color } from "../../src/models/color.model";
import { Value } from "../../src/models/values.model";

describe("BuildDeckCommand", () => {
  it("should generate a deck and add it to the state when we execute the command", () => {
    const command = new BuildDeckCommand();
    const state = new GameState();
    const spy = spyOn(state.deck, "addCards").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.deck.cards.length).toBeGreaterThan(0);
  });

  it("should generate a deck with a specific amount of cards", () => {
    const command = new BuildDeckCommand();
    const state = new GameState();

    command.execute(state);

    const greenCards = state.deck.cards.filter(
      (card) => card.color === Color.GREEN
    );
    const blueCards = state.deck.cards.filter(
      (card) => card.color === Color.BLUE
    );
    const redCards = state.deck.cards.filter(
      (card) => card.color === Color.RED
    );
    const yellowCards = state.deck.cards.filter(
      (card) => card.color === Color.YELLOW
    );

    const wildcards = state.deck.cards.filter(
      (card) => card.value === Value.WILDCARD
    );

    const plusFour = state.deck.cards.filter(
      (card) => card.value === Value.PLUS_FOUR
    );

    expect(greenCards.length).toBe(26);
    expect(blueCards.length).toBe(26);
    expect(redCards.length).toBe(26);
    expect(yellowCards.length).toBe(26);
    expect(wildcards.length).toBe(2);
    expect(plusFour.length).toBe(2);
  });
});
