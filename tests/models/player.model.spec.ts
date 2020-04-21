import { Player } from "../../src/models/player.model";

describe("Player", () => {
  it("should initialize player's hand when we create a player", () => {
    const player = new Player("p1", "player 1", "avatar");

    expect(player.hand).toBeDefined();
  });
});
