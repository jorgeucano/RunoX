import { TakeDeckCardCommand } from "../../src/commands/take-deck-card.command";
import { GameState } from "../../src/models/game-state.model";
import { Card } from "../../src/models/card.model";
import { Value } from "../../src/models/values.model";
import { Player } from "../../src/models/player.model";

describe("TakeDeckCardCommand", () => {
  it("should log error when there is no cards in the deck and we execute the command", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();
    const spy = spyOn(global.console, "error").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.deck.cards.length).toBe(0);
  });

  it("should log error when there is a problem while taking a card from the deck", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();
    const card = new Card(Value.PLUS_FOUR);

    state.deck.addCards([card]);

    const takeCardSpy = spyOn(state.deck, "takeCard").and.returnValue(null);
    const errorSpy = spyOn(global.console, "error").and.callThrough();

    command.execute(state);

    expect(takeCardSpy).toBeCalled();
    expect(errorSpy).toBeCalled();
  });

  it("should add the card taken from the deck", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();
    const card = new Card(Value.PLUS_FOUR);
    const player = new Player("p1", "player 1", "avatar");

    state.deck.addCards([card]);
    state.turn.setPlayerTurn(player);

    const takeCardSpy = spyOn(state.deck, "takeCard").and.callThrough();
    const errorSpy = spyOn(global.console, "error").and.callThrough();

    command.execute(state);

    expect(state.turn.player?.hand.cards.length).toBeGreaterThan(0);
    expect(takeCardSpy).toBeCalled();
    expect(errorSpy).not.toBeCalled();
  });
});
