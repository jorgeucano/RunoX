import { FinalizeTurnCommand } from "../../src/commands/finalize-turn.command";
import { GameState } from "../../src/models/game-state.model";
import { Player } from "../../src/models/player.model";

describe("FinalizeTurnCommand", () => {
  it("should log an error when when we execute the command and there are not players playing", () => {
    const command = new FinalizeTurnCommand();
    const state = new GameState();
    const spy = spyOn(global.console, "error").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
  });

  it("should set first player as current player when we start the game", () => {
    const command = new FinalizeTurnCommand();
    const state = new GameState();
    const player1 = new Player("p1", "player 1", "avatar");
    const player2 = new Player("p2", "player 2", "avatar");
    const player3 = new Player("p3", "player 3", "avatar");
    const player4 = new Player("p4", "player 4", "avatar");

    state.playersGroup.addPlayers([player1, player2, player3, player4]);

    const spy = spyOn(state.turn, "setPlayerTurn").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.turn.player).toEqual(player1);
  });

  it("should set next player as current player when we execute the command", () => {
    const command = new FinalizeTurnCommand();
    const state = new GameState();
    const player1 = new Player("p1", "player 1", "avatar");
    const player2 = new Player("p2", "player 2", "avatar");
    const player3 = new Player("p3", "player 3", "avatar");
    const player4 = new Player("p4", "player 4", "avatar");

    state.playersGroup.addPlayers([player1, player2, player3, player4]);
    state.turn.setPlayerTurn(player1);

    const spy = spyOn(state.turn, "setPlayerTurn").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.turn.player).toEqual(player2);
  });

  it("should reset turns when we execute the command and the current player is the last in the players array", () => {
    const command = new FinalizeTurnCommand();
    const state = new GameState();
    const player1 = new Player("p1", "player 1", "avatar");
    const player2 = new Player("p2", "player 2", "avatar");
    const player3 = new Player("p3", "player 3", "avatar");
    const player4 = new Player("p4", "player 4", "avatar");

    state.playersGroup.addPlayers([player1, player2, player3, player4]);
    state.turn.setPlayerTurn(player4);

    const spy = spyOn(state.turn, "setPlayerTurn").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.turn.player).toEqual(player1);
  });
});
