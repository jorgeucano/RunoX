import { PlayersGroup } from "../../../src/server/models/players-group.model";
import { Player } from "../../../src/server/models/player.model";

describe("PlayersGroup", () => {
  it("should initialize players array when we create a players model", () => {
    const playersGroup = new PlayersGroup();

    expect(playersGroup.players).toBeDefined();
    expect(playersGroup.players.length).toBe(0);
  });

  it("should add a player when addPlayer method is called", () => {
    const playersGroup = new PlayersGroup();

    const player = new Player("p1", "player 1", "avatar");

    playersGroup.addPlayer(player);

    expect(playersGroup.players.length).toBe(1);
  });

  it("should add multiple players when addPlayers method is called", () => {
    const playersGroup = new PlayersGroup();

    playersGroup.addPlayers([
      new Player("p1", "player 1", "avatar"),
      new Player("p2", "player 2", "avatar"),
    ]);

    expect(playersGroup.players.length).toBe(2);
  });

  it("should throw error when we try to get an invalid player", () => {
    const playersGroup = new PlayersGroup();

    playersGroup.addPlayer(new Player("p1", "player 1", "avatar"));

    expect(() => playersGroup.getPlayerById("1234")).toThrowError();
  });

  it("should get player by id when getPlayerById method is called", () => {
    const playersGroup = new PlayersGroup();

    playersGroup.addPlayer(new Player("p1", "player 1", "avatar"));

    const player = playersGroup.getPlayerById("p1");

    expect(player).toBeDefined();
    expect(player?.id).toEqual("p1");
  });
});
