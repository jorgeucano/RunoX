import { GameState } from "../../src/models/game-state.model";
import { PlayCardCommand } from "../../src/commands/play-card.command";
import { Player } from "../../src/models/player.model";
import { Card } from "../../src/models/card.model";
import { Value } from "../../src/models/values.model";
import { Color } from "../../src/models/color.model";

describe("PlayCardCommand", () => {
  it("should throw error result when we execute the command and the player is not playing", () => {
    const state = new GameState();
    const player = new Player("p1", "player 1", "avatar");
    const command = new PlayCardCommand(
      player.id,
      new Card(Value.REVERSE, Color.BLUE)
    );

    expect(() => command.validate(state)).toThrowError();
  });

  it("should return error result when we execute the command and there is not a current player", () => {
    const state = new GameState();
    const player = new Player("p1", "player 1", "avatar");
    const command = new PlayCardCommand(
      player.id,
      new Card(Value.REVERSE, Color.BLUE)
    );

    state.playersGroup.addPlayer(player);

    const commandValidation = command.validate(state);

    expect(commandValidation.isValid).toBeFalsy();
  });

  it("should return error result when we execute the command and the current player does not have the card", () => {
    const state = new GameState();
    const player = new Player("p1", "player 1", "avatar");
    const card = new Card(Value.PLUS_FOUR);
    const command = new PlayCardCommand(player.id, card);

    state.playersGroup.addPlayer(player);
    player.hand.addCard(card);
    state.turn.setPlayerTurn(player);

    const commandValidation = command.validate(state);

    expect(commandValidation.isValid).toBeFalsy();
  });

  it("should return error result when we execute the command and the card discarded is invalid", () => {
    const state = new GameState();
    const player = new Player("p1", "player 1", "avatar");
    const stackCardRedTwo = new Card(Value.TWO, Color.RED);
    const handCardBlueFour = new Card(Value.FOUR, Color.BLUE);
    const command = new PlayCardCommand(player.id, handCardBlueFour);

    state.playersGroup.addPlayer(player);
    state.stack.addCard(stackCardRedTwo);
    player.hand.addCard(handCardBlueFour);
    state.turn.setPlayerTurn(player);

    const commandValidation = command.validate(state);

    expect(commandValidation.isValid).toBeFalsy();
  });

  it("should discard current player card when we execute the command", () => {
    const state = new GameState();

    const player = new Player("p1", "player 1", "avatar");
    state.playersGroup.addPlayer(player);
    state.turn.setPlayerTurn(player);

    const stackCardRedTwo = new Card(Value.TWO, Color.RED);
    state.stack.addCard(stackCardRedTwo);

    const handCardRedFour = new Card(Value.FOUR, Color.RED);
    player.hand.addCard(handCardRedFour);

    const stackSpy = spyOn(state.stack, "addCard").and.callThrough();
    // @ts-ignore
    const spy = spyOn(state.turn.player.hand, "removeCard").and.callThrough();

    const command = new PlayCardCommand(player.id, handCardRedFour);
    command.execute(state);

    expect(spy).toBeCalled();
    expect(stackSpy).toBeCalled();
    expect(state.turn.player?.hand.cards.length).toBe(0);
    expect(state.stack.cards.length).toBe(2);
  });

  it("should change player next turn when we play a reverse card", () => {
    const state = new GameState();
    const player1 = new Player("p1", "player 1", "avatar");
    const player2 = new Player("p2", "player 2", "avatar");
    const player3 = new Player("p3", "player 3", "avatar");

    state.playersGroup.addPlayers([player1, player2, player3]);
    state.turn.setPlayerTurn(player3);

    const stackCardRedTwo = new Card(Value.TWO, Color.RED);
    state.stack.addCard(stackCardRedTwo);

    const handCardReverseRed = new Card(Value.REVERSE, Color.RED);
    player3.hand.addCard(handCardReverseRed);

    const command = new PlayCardCommand(player3.id, handCardReverseRed);

    command.execute(state);

    // si se hubiese jugado una carta 'normal' el siguiente jugador deberia
    // ser el player 1 pero como se jugo un reverse el siguiente es player 2
    expect(state.nextPlayerToPlay?.id).toEqual(player2.id);
  });
});
