import { TakeDeckCardCommand } from "../../../src/server/commands/take-deck-card.command";
import { GameState } from "../../../src/server/models/game-state.model";
import { Card } from "../../../src/server/models/card.model";
import { Value } from "../../../src/server/models/values.model";
import { Player } from "../../../src/server/models/player.model";

describe("TakeDeckCardCommand", () => {
  it("should return error result when there is no cards in the deck and we execute the command", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();

    const commandValidation = command.validate(state);

    expect(commandValidation.isValid).toBeFalsy();
    expect(state.deck.cards.length).toBe(0);
  });

  it("should return error result when there is not a player turn", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();
    const card = new Card(Value.PLUS_FOUR);

    state.deck.addCards([card]);

    const commandValidation = command.validate(state);

    expect(commandValidation.isValid).toBeFalsy();
  });

  it("should add the card taken from the deck", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();
    const player = new Player("p1", "player 1", "avatar");

    state.deck.addCards([new Card(Value.PLUS_FOUR), new Card(Value.WILDCARD)]);
    state.turn.setPlayerTurn(player);

    const takeCardSpy = spyOn(state.deck, "takeCard").and.callThrough();

    command.execute(state);

    expect(player.hand.cards.length).toBeGreaterThan(0);
    expect(takeCardSpy).toBeCalled();
  });
});
