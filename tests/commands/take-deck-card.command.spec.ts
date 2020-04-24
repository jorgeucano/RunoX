import { TakeDeckCardCommand } from "../../src/commands/take-deck-card.command";
import { GameState } from "../../src/models/game-state.model";
import { Card } from "../../src/models/card.model";
import { Value } from "../../src/models/values.model";
import { Player } from "../../src/models/player.model";

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
    const card = new Card(Value.PLUS_FOUR);
    const player = new Player("p1", "player 1", "avatar");

    state.deck.addCards([card]);
    state.turn.setPlayerTurn(player);

    const takeCardSpy = spyOn(state.deck, "takeCard").and.callThrough();

    command.execute(state);

    expect(state.turn.player?.hand.cards.length).toBeGreaterThan(0);
    expect(takeCardSpy).toBeCalled();
  });
});
