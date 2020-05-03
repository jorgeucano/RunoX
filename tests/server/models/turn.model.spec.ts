import { Turn } from "../../../src/server/models/turn.model";
import { Player } from "../../../src/server/models/player.model";

describe("Turn", () => {
  it("should initialize player attribute as null when we create a turn model", () => {
    const turn = new Turn();

    expect(turn.player).toBeNull();
  });

  it("should set player turn setPlayerTurn method is called", () => {
    const turn = new Turn();

    const player = new Player("p1", "player 1", "avatar");

    turn.setPlayerTurn(player);

    expect(turn.player).not.toBeNull();
    expect(turn.player?.id).toEqual("p1");
  });
});
