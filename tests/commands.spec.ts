import { AddPlayerCommand } from "../src/commands/add-player.command";
import { BuildDeckCommand } from "../src/commands/build-deck.command";
import { FinalizeTurnCommand } from "../src/commands/finalize-turn.command";
import { StartGameCommand } from "../src/commands/start-game.command";
import { TakeDeckCardCommand } from "../src/commands/take-deck-card.command";
import { Card } from "../src/models/card.model";
import { Player } from "../src/models/player.model";
import { GameState } from "../src/models/game-state.model";
import { RegenerateDeckCommand } from "../src/commands/regenerate-deck.command";
import { AddPlayersCommand } from "../src/commands/add-players.command";
import { DiscardHandCardCommand } from "../src/commands/discard-hand-card.command";
import { Value } from "../src/models/values.model";
import { Color } from "../src/models/color.model";

describe("AddPlayerCommand", () => {
  it("should set player attribute when we create the command", () => {
    const player = new Player("p1", "player 1", "avatar");
    const command = new AddPlayerCommand(player);

    expect(command.player).toBeDefined();
    expect(command.player.id).toEqual("p1");
  });

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

describe("AddPlayersCommand", () => {
  it("should set players attribute when we create the command", () => {
    const player1 = new Player("p1", "player 1", "avatar");
    const player2 = new Player("p2", "player 2", "avatar");
    const command = new AddPlayersCommand([player1, player2]);

    expect(command.players).toBeDefined();
    expect(command.players[0].id).toEqual("p1");
  });

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

describe("BuildDeckCommand", () => {
  it("should generate a deck and add it to the state when we execute the command", () => {
    const command = new BuildDeckCommand();
    const state = new GameState();
    const spy = spyOn(state.deck, "addCards").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.deck.cards.length).toBeGreaterThan(0);
  });
});

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

describe("TakeDeckCardCommand", () => {
  it("should log error when there is no cards in the deck and we execute the command", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();
    const spy = spyOn(global.console, "error").and.callThrough();

    command.execute(state);

    expect(spy).toBeCalled();
    expect(state.deck.cards.length).toBe(0);
  });

  it("should log error when there is a problem while taking a card from the deck", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();
    const card = new Card(Value.PLUS_FOUR);

    state.deck.addCards([card]);

    const takeCardSpy = spyOn(state.deck, "takeCard").and.returnValue(null);
    const errorSpy = spyOn(global.console, "error").and.callThrough();

    command.execute(state);

    expect(takeCardSpy).toBeCalled();
    expect(errorSpy).toBeCalled();
  });

  it("should add the card taken from the deck", () => {
    const command = new TakeDeckCardCommand();
    const state = new GameState();
    const card = new Card(Value.PLUS_FOUR);
    const player = new Player("p1", "player 1", "avatar");

    state.deck.addCards([card]);
    state.turn.setPlayerTurn(player);

    const takeCardSpy = spyOn(state.deck, "takeCard").and.callThrough();
    const errorSpy = spyOn(global.console, "error").and.callThrough();

    command.execute(state);

    expect(state.turn.player?.hand.cards.length).toBeGreaterThan(0);
    expect(takeCardSpy).toBeCalled();
    expect(errorSpy).not.toBeCalled();
  });
});

describe("RegenerateDeckCommand", () => {
  it("should log error if there are cards on the deck when we execute the command", () => {
    const command = new RegenerateDeckCommand();
    const state = new GameState();
    const card = new Card(Value.PLUS_FOUR);
    const spy = spyOn(global.console, "error").and.callThrough();

    state.deck.addCards([card]);

    command.execute(state);

    expect(spy).toBeCalled();
  });

  it("should log error if there are not cards on the stack when we execute the command", () => {
    const command = new RegenerateDeckCommand();
    const state = new GameState();
    const errorSpy = spyOn(global.console, "error").and.callThrough();
    const addCardsSpy = spyOn(state.deck, "addCards").and.callThrough();
    const cardOnTopSpy = jest.spyOn(state.stack, "cardOnTop", "get");

    command.execute(state);

    expect(errorSpy).toBeCalled();
    expect(addCardsSpy).toBeCalled();
    expect(cardOnTopSpy).toBeCalled();
  });

  it("should regenerate the deck when we execute the command", () => {
    const command = new RegenerateDeckCommand();
    const state = new GameState();
    const card1 = new Card(Value.PLUS_FOUR);
    const card2 = new Card(Value.WILDCARD);

    state.stack.addCard(card1);
    state.stack.addCard(card2);

    const deckAddCardsSpy = spyOn(state.deck, "addCards").and.callThrough();
    const deckShuffleSpy = spyOn(state.deck, "shuffle").and.callThrough();
    const stackEmptySpy = spyOn(state.stack, "empty").and.callThrough();
    const stackAddCardSpy = spyOn(state.stack, "addCard").and.callThrough();
    const stackCardOnTopSpy = jest.spyOn(state.stack, "cardOnTop", "get");

    command.execute(state);

    expect(deckAddCardsSpy).toBeCalled();
    expect(deckShuffleSpy).toBeCalled();
    expect(stackEmptySpy).toBeCalled();
    expect(stackAddCardSpy).toBeCalled();
    expect(stackCardOnTopSpy).toBeCalled();

    expect(state.deck.cards.length).toBeGreaterThan(0);
    expect(state.stack.cards.length).toBeGreaterThan(0);
    expect(state.stack.cardOnTop?.id).toEqual(card2.id);
  });
});

describe("DiscardHandCardCommand", () => {
  it("should log error when we execute the command and there is not a current player", () => {
    const state = new GameState();
    const command = new DiscardHandCardCommand("card1");
    const spy = spyOn(global.console, "error").and.callThrough();

    expect(() => command.execute(state)).toThrow(Error);
    expect(spy).toBeCalled();
  });

  it("should log error when we execute the command and the current player does not have the card", () => {
    const state = new GameState();
    const player = new Player("p1", "player 1", "avatar");
    const card = new Card(Value.PLUS_FOUR);
    const command = new DiscardHandCardCommand("card2");
    const spy = spyOn(global.console, "error").and.callThrough();

    player.hand.addCard(card);
    state.turn.setPlayerTurn(player);

    expect(() => command.execute(state)).toThrow(Error);
    expect(spy).toBeCalled();
  });

  it("should log error when we execute the command and the card discarded is invalid", () => {
    const state = new GameState();
    const player = new Player("p1", "player 1", "avatar");
    const stackCardRedTwo = new Card(Value.TWO, Color.RED);
    const handCardBlueFour = new Card(Value.FOUR, Color.BLUE);
    const command = new DiscardHandCardCommand("cardBlueFour");
    const spy = spyOn(global.console, "error").and.callThrough();

    state.stack.addCard(stackCardRedTwo);
    player.hand.addCard(handCardBlueFour);
    state.turn.setPlayerTurn(player);

    expect(() => command.execute(state)).toThrow(Error);
    expect(spy).toBeCalled();
  });

  it("should discard current player card when we execute the command", () => {
    const state = new GameState();

    const player = new Player("p1", "player 1", "avatar");
    state.turn.setPlayerTurn(player);

    const stackCardRedTwo = new Card(Value.TWO, Color.RED);
    state.stack.addCard(stackCardRedTwo);

    const handCardRedFour = new Card(Value.FOUR, Color.RED);
    player.hand.addCard(handCardRedFour);

    const stackSpy = spyOn(state.stack, "addCard").and.callThrough();
    // @ts-ignore
    const spy = spyOn(state.turn.player.hand, "removeCard").and.callThrough();

    const command = new DiscardHandCardCommand(handCardRedFour.id);
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

    const command = new DiscardHandCardCommand(handCardReverseRed.id);

    command.execute(state);

    // si se hubiese jugado una carta 'normal' el siguiente jugador deberia
    // ser el player 1 pero como se jugo un reverse el siguiente es player 2
    expect(state.nextPlayerToPlay?.id).toEqual(player2.id);
  });
});
