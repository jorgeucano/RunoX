import { Player } from "../../../src/server/models/player.model";
import { AddPlayersCommand } from "../../../src/server/commands/add-players.command";
import { GameState } from "../../../src/server/models/game-state.model";

describe("AddPlayersCommand", () => {
  it("should add players to state when we execute the command", () => {
    const player1 = new Player("p1", "player 1", "avatar");
    const player2 = new Player("p2", "player 2", "avatar");
    const command = new AddPlayersCommand([player1, player2]);
    const state = new GameState();
    const spy = spyOn(state.playersGroup, "addPlayers").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.playersGroup.players.length).toBe(2);
  });
});
