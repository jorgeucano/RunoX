import { Player } from "../../src/models/player.model";
import { AddPlayerCommand } from "../../src/commands/add-player.command";
import { GameState } from "../../src/models/game-state.model";

describe("AddPlayerCommand", () => {
  it("should add player to state when we execute the command", () => {
    const player = new Player("p1", "player 1", "avatar");
    const command = new AddPlayerCommand(player);
    const state = new GameState();
    const spy = spyOn(state.playersGroup, "addPlayer").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.playersGroup.players.length).toBe(1);
  });
});
