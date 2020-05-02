import { Player } from "../../src/models/player.model";
import { GameState } from "../../src/models/game-state.model";
import { Card } from "../../src/models/card.model";
import { Value } from "../../src/models/values.model";
import { Color } from "../../src/models/color.model";
import { YellUnoCommand } from "../../src/commands/yell-uno.command";

describe("YellUnoCommand", () => {
  it("should add player to yellers if has only 1 or 2 cards", () => {
    const player = new Player("p1", "player 1", "avatar");
    const card = new Card(Value.ONE, Color.BLUE);
    player.hand.addCard(card);
    const command = new YellUnoCommand(player.id);
    const state = new GameState();
    state.playersGroup.addPlayer(player);

    command.execute(state);

    expect(state.unoYellers[player.id]).toBeTruthy();
  });

  it("should add 2 card to player if yells and has more than 2 cards", () => {
    const player = new Player("p1", "player 1", "avatar");
    player.hand.addCards([
      new Card(Value.ONE, Color.BLUE),
      new Card(Value.TWO, Color.BLUE),
      new Card(Value.THREE, Color.BLUE),
    ]);
    const command = new YellUnoCommand(player.id);
    const state = new GameState();
    state.playersGroup.addPlayer(player);
    state.deck.addCards([
      new Card(Value.FOUR, Color.BLUE),
      new Card(Value.FIVE, Color.BLUE),
      new Card(Value.SIX, Color.BLUE),
    ]);

    command.execute(state);

    expect(state.unoYellers[player.id]).toBeFalsy();
    expect(player.hand.cards.length).toBe(5);
  });
});
