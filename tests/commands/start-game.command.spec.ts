import { StartGameCommand } from "../../src/commands/start-game.command";
import { GameState } from "../../src/models/game-state.model";
import { Card } from "../../src/models/card.model";
import { Value } from "../../src/models/values.model";
import { Color } from "../../src/models/color.model";
import { Player } from "../../src/models/player.model";

describe("StartGameCommand", () => {
  it("should log an error when when we execute the command and there are not players playing", () => {
    const command = new StartGameCommand();
    const state = new GameState();
    const spy = spyOn(global.console, "error").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
  });

  it("should deal the cards to the players, set current and add a card to the stack player when the command is executed", () => {
    const command = new StartGameCommand();
    const state = new GameState();
    const card = new Card(Value.ONE, Color.BLUE);
    const player1 = new Player("p1", "player 1", "avatar");
    const player2 = new Player("p2", "player 2", "avatar");
    const player3 = new Player("p3", "player 3", "avatar");
    const player4 = new Player("p4", "player 4", "avatar");

    state.deck.addCards([card, card, card, card]);
    state.playersGroup.addPlayers([player1, player2, player3, player4]);

    const turnSpy = spyOn(state.turn, "setPlayerTurn").and.callThrough();
    const deckSpy = spyOn(state.deck, "takeCard").and.returnValue(card);
    const stackSpy = spyOn(state.stack, "addCard").and.callThrough();
    const hand1Spy = spyOn(player1.hand, "addCards").and.callThrough();
    const hand2Spy = spyOn(player2.hand, "addCards").and.callThrough();
    const hand3Spy = spyOn(player3.hand, "addCards").and.callThrough();
    const hand4Spy = spyOn(player4.hand, "addCards").and.callThrough();

    command.execute(state);

    expect(turnSpy).toBeCalled();
    expect(deckSpy).toBeCalled();
    expect(stackSpy).toBeCalled();
    expect(hand1Spy).toBeCalled();
    expect(hand2Spy).toBeCalled();
    expect(hand3Spy).toBeCalled();
    expect(hand4Spy).toBeCalled();
    expect(state.turn.player).toEqual(player1);
    expect(state.stack.cards.length).toBe(1);
    expect(state.stack.cardOnTop).not.toBeNull();
  });
});
