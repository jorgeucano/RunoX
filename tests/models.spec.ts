import { Deck } from "../src/models/deck.model";
import { Card } from "../src/models/card.model";
import { Hand } from "../src/models/hand.model";
import { Player } from "../src/models/player.model";
import { PlayersGroup } from "../src/models/players-group.model";
import { Turn } from "../src/models/turn.model";
import { GameState } from "../src/models/game-state.model";
import { Stack } from "../src/models/stack.model";
import { Value } from "../src/models/values.model";
import { Color } from "../src/models/color.model";
import { GameDirection } from "../src/models/game-direction.model";

describe("Card", () => {
  it("should set sprite attribute when we create a card", () => {
    const card = new Card(Value.ONE, Color.BLUE);

    expect(card).toBeDefined();
    expect(card.sprite).toEqual(`${Value.ONE}--${Color.BLUE}`);
  });

  it("should throw error if we try to create a wildcard with a color", () => {
    expect(() => new Card(Value.WILDCARD, Color.BLUE)).toThrow(Error);
  });

  it("should return true when we invoke isSpecialCard and the card is special", () => {
    const card = new Card(Value.WILDCARD);

    expect(card.isSpecialCard()).toBeTruthy();
  });

  it("should return true when we invoke hasEffects and the card is has an effect", () => {
    const card = new Card(Value.WILDCARD);

    expect(card.hasEffects()).toBeTruthy();
  });

  it("should return true when we check if a wildcard is playable", () => {
    const card = new Card(Value.THREE, Color.GREEN);
    const wildcard = new Card(Value.WILDCARD);

    expect(wildcard.isPlayable(card)).toBeTruthy();
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

    const card = new Card(Value.PLUS_FOUR);

    deck.addCards([card]);

    expect(deck.cards.length).toBe(1);
  });

  it("should shuffle cards when shuffle method is called", () => {
    const deck = new Deck();

    deck.addCards([
      new Card(Value.ONE, Color.BLUE),
      new Card(Value.TWO, Color.BLUE),
      new Card(Value.THREE, Color.BLUE),
      new Card(Value.FOUR, Color.BLUE),
      new Card(Value.FIVE, Color.BLUE),
      new Card(Value.SIX, Color.BLUE),
      new Card(Value.SEVEN, Color.BLUE),
      new Card(Value.EIGHT, Color.BLUE),
      new Card(Value.NINE, Color.BLUE),
      new Card(Value.ZERO, Color.BLUE),
    ]);

    const originalOrder = deck.cards.map((card) => card.id);

    deck.shuffle();

    const newOrder = deck.cards.map((card) => card.id);

    expect(originalOrder).not.toEqual(newOrder);
  });

  it("should take a card from the deck when addCards takeCard is invoked", () => {
    const deck = new Deck();

    const card1 = new Card(Value.PLUS_FOUR);
    const card2 = new Card(Value.WILDCARD);

    deck.addCards([card1, card2]);

    const tackedCard = deck.takeCard();

    expect(tackedCard).toBeDefined();
    expect(tackedCard?.id).toEqual(card1.id);
  });

  it("should log error when we try to take a card from an empty deck", () => {
    const deck = new Deck();
    const spy = spyOn(deck, "takeCard").and.callThrough();

    const tackedCard = deck.takeCard();

    expect(spy).toHaveBeenCalled();
    expect(tackedCard).not.toBeDefined();
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

    const card = new Card(Value.PLUS_FOUR);

    hand.addCard(card);

    expect(hand.cards.length).toBe(1);
  });

  it("should add multiple cards when addCards method is called", () => {
    const hand = new Hand();

    const cards = [new Card(Value.PLUS_FOUR), new Card(Value.WILDCARD)];

    hand.addCards(cards);

    expect(hand.cards.length).toBe(2);
  });

  it("should log error if the card we are trying to remove is not present", () => {
    const spy = spyOn(global.console, "error").and.callThrough();

    const hand = new Hand();
    const cards = [new Card(Value.PLUS_FOUR), new Card(Value.WILDCARD)];

    hand.addCards(cards);

    hand.removeCard(new Card(Value.ONE, Color.BLUE));

    expect(spy).toBeCalled();
    expect(hand.cards.length).toBe(2);
  });

  it("should remove a card from the hand when we invoke removeCard with a valid cardId", () => {
    const hand = new Hand();
    const card1 = new Card(Value.PLUS_FOUR);
    const card2 = new Card(Value.WILDCARD);
    const cards = [card1, card2];

    hand.addCards(cards);

    hand.removeCard(card1);

    expect(hand.cards.length).toBe(1);
  });
});

describe("Player", () => {
  it("should initialize player's hand when we create a player", () => {
    const player = new Player("p1", "player 1", "avatar");

    expect(player.hand).toBeDefined();
  });
});

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

  it("should log error when we try to get an invalid player", () => {
    const playersGroup = new PlayersGroup();
    const spy = spyOn(global.console, "error").and.callThrough();

    playersGroup.addPlayer(new Player("p1", "player 1", "avatar"));

    const player = playersGroup.getPlayerById("1234");

    expect(spy).toHaveBeenCalled();
    expect(player).not.toBeDefined();
  });

  it("should get player by id when getPlayerById method is called", () => {
    const playersGroup = new PlayersGroup();

    playersGroup.addPlayer(new Player("p1", "player 1", "avatar"));

    const player = playersGroup.getPlayerById("p1");

    expect(player).toBeDefined();
    expect(player?.id).toEqual("p1");
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
    expect(state.playersGroup).toBeDefined();
    expect(state.turn).toBeDefined();
  });

  it("should change direction COUNTER_CLOCKWISE when we invoke the changeDirection method", () => {
    const state = new GameState();

    state.changeDirection();

    expect(state.gameDirection).toEqual(GameDirection.COUNTER_CLOCKWISE);
  });
});

describe("Stack", () => {
  it("should initialize cards when we create a Stack model", () => {
    const stack = new Stack();

    expect(stack.cards).toBeDefined();
  });

  it("should return null when the stack has not cards", () => {
    const stack = new Stack();

    expect(stack.cards.length).toBe(0);
    expect(stack.cardOnTop).toBeNull();
  });

  it("should return the card on top of the stack when there are cards on the stack", () => {
    const stack = new Stack();
    const card = new Card(Value.PLUS_FOUR);

    stack.addCard(card);

    expect(stack.cards.length).toBe(1);
    expect(stack.cardOnTop).not.toBeNull();
    expect(stack.cardOnTop?.id).toEqual(card.id);
  });

  it("should add a card when addCard method is called", () => {
    const stack = new Stack();
    const card = new Card(Value.PLUS_FOUR);

    stack.addCard(card);

    expect(stack.cards.length).toBe(1);
  });

  it("should empty the stack when the empty method is called", () => {
    const stack = new Stack();
    const card = new Card(Value.PLUS_FOUR);

    stack.addCard(card);

    expect(stack.cards.length).toBe(1);

    stack.empty();

    expect(stack.cards.length).toBe(0);
  });
});
