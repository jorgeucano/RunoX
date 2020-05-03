import { GameState } from "../../../src/server/models/game-state.model";
import { GameDirection } from "../../../src/server/models/game-direction.model";

describe("GameState", () => {
  it("should initialize attributes when we create a GameState model", () => {
    const state = new GameState();

    expect(state.deck).toBeDefined();
    expect(state.playersGroup).toBeDefined();
    expect(state.turn).toBeDefined();
  });

  it("should change direction COUNTER_CLOCKWISE when we invoke the changeDirection method", () => {
    const state = new GameState();

    state.changeDirection();

    expect(state.gameDirection).toEqual(GameDirection.COUNTER_CLOCKWISE);
  });
});
