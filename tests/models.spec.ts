import { Deck } from "../src/models/deck.model";
import { Card } from "../src/models/card.model";
import { Hand } from "../src/models/hand.model";
import { Player } from "../src/models/player.model";
import { Players } from "../src/models/players.model";
import { Turn } from "../src/models/turn.model";
import { GameState } from "../src/models/game-state.model";

describe("Card", () => {
  it("should set id attribute when we create a card", () => {
    const cardId = "card";

    const card = new Card(cardId);

    expect(card).toBeDefined();
    expect(card.id).toEqual(cardId);
  });
});

describe("Deck", () => {
  it("should initialize cards when we create a deck", () => {
    const deck = new Deck();

    expect(deck.cards).toBeDefined();
    expect(deck.cards.length).toBe(0);
  });

  it("should add cards when addCards method is called", () => {
    const deck = new Deck();

    const card = new Card("card");

    deck.addCards([card]);

    expect(deck.cards.length).toBe(1);
  });
});

describe("Hand", () => {
  it("should initialize cards when we create a hand", () => {
    const hand = new Hand();

    expect(hand.cards).toBeDefined();
    expect(hand.cards.length).toBe(0);
  });

  it("should add a card when addCard method is called", () => {
    const hand = new Hand();

    const card = new Card("card");

    hand.addCard(card);

    expect(hand.cards.length).toBe(1);
  });

  it("should add multiple cards when addCards method is called", () => {
    const hand = new Hand();

    const cards = [new Card("card1"), new Card("card2")];

    hand.addCards(cards);

    expect(hand.cards.length).toBe(2);
  });

  it("should log error if the card we are trying to remove is not present", () => {
    const spy = spyOn(global.console, "error").and.callThrough();

    const hand = new Hand();
    const cards = [new Card("card1"), new Card("card2")];

    hand.addCards(cards);

    hand.removeCard("card3");

    expect(spy).toBeCalled();
    expect(hand.cards.length).toBe(2);
  });

  it("should remove a card from the hand when we invoke removeCard with a valid cardId", () => {
    const hand = new Hand();
    const cards = [new Card("card1"), new Card("card2")];

    hand.addCards(cards);

    hand.removeCard("card1");

    expect(hand.cards.length).toBe(1);
  });
});

describe("Player", () => {
  it("should initialize player's hand when we create a player", () => {
    const player = new Player("p1", "player 1", "avatar");

    expect(player.hand).toBeDefined();
  });
});

describe("Players", () => {
  it("should initialize players array when we create a players model", () => {
    const players = new Players();

    expect(players.players).toBeDefined();
    expect(players.players.length).toBe(0);
  });

  it("should add a player when addPlayer method is called", () => {
    const players = new Players();

    const player = new Player("p1", "player 1", "avatar");

    players.addPlayer(player);

    expect(players.players.length).toBe(1);
  });

  it("should add multiple players when addPlayers method is called", () => {
    const players = new Players();

    players.addPlayers([
      new Player("p1", "player 1", "avatar"),
      new Player("p2", "player 2", "avatar"),
    ]);

    expect(players.players.length).toBe(2);
  });
});

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

describe("GameState", () => {
  it("should initialize attributes when we create a GameState model", () => {
    const state = new GameState();

    expect(state.deck).toBeDefined();
    expect(state.players).toBeDefined();
    expect(state.turn).toBeDefined();
  });
});
