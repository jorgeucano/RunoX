import { Deck } from "./deck.model";
import { PlayersGroup } from "./players-group.model";
import { Turn } from "./turn.model";
import { Stack } from "./stack.model";
import { GameDirection } from "./game-direction.model";
import { Card } from "./card.model";
import { Player } from "./player.model";
import { GameEvents } from "../events/game-events";
import { Value } from "./values.model";
import { GameModes } from "./game-modes";

/** Clase que representa el estado del juego */
export class GameState {
  readonly deck: Deck;
  readonly stack: Stack;
  readonly playersGroup: PlayersGroup;
  readonly turn: Turn;
  readonly events: GameEvents;

  gameDirection: GameDirection;
  cardsToGive: number;
  unoYellers: { [id: string]: boolean };
  id: number;
  gameModes: GameModes;

  constructor() {
    this.id = new Date().getTime();
    this.deck = new Deck();
    this.stack = new Stack();
    this.playersGroup = new PlayersGroup();
    this.turn = new Turn();
    this.events = GameEvents.getInstance();

    this.gameDirection = GameDirection.CLOCKWISE;
    this.cardsToGive = 0;
    this.unoYellers = {};
    this.gameModes = {
      randomTakeDeckCard: false,
    };
  }

  get nextPlayerToPlay() {
    // es el primer turno, entonces elegimos el primer jugador
    if (!this.turn.player) {
      return this.playersGroup.players[0];
    }

    let currentPlayerIndex = this.playersGroup.players.findIndex(
      (player) => player.id === this.turn.player?.id
    );

    const nextPlayerIndex = currentPlayerIndex + 1;

    // no ha terminado la vuelta, entonces elegimos el proximo en la lista
    if (nextPlayerIndex < this.playersGroup.players.length) {
      return this.playersGroup.players[nextPlayerIndex];
    }

    // ya ha jugado el ultimo, entonces comienza nuevamente desde el primero
    return this.playersGroup.players[0];
  }

  changeDirection() {
    const newDirection =
      this.gameDirection === GameDirection.CLOCKWISE
        ? GameDirection.COUNTER_CLOCKWISE
        : GameDirection.CLOCKWISE;

    this.gameDirection = newDirection;

    this.playersGroup.players.reverse();
  }

  giveCards(quantity: number, toPlayer: Player) {
    // numero de cartas disponibles entre mazo y pila
    const availableCards =
      this.deck.cards.length + (this.stack.cards.length - 1);

    while (quantity > availableCards) {
      throw new Error("No se puede dar más cartas que las jugables");
    }

    if (quantity > this.deck.cards.length) {
      this.addStackCardsToDeck();
    }

    let newCards: Card[] = [];

    for (let index = 0; index < quantity; index++) {
      newCards = [...newCards, this.deck.takeCard() as Card];
    }

    toPlayer.hand.addCards(newCards);

    console.log(`Se entregaron ${quantity} cartas al jugador ${toPlayer.name}`);

    return newCards;
  }

  addStackCardsToDeck() {
    const newDeckCards = this.stack.cards.filter(
      (card) => card.id === this.stack.cardOnTop?.id
    );

    this.deck.addCards(newDeckCards);

    const cardOnTopTheStack = this.stack.cardOnTop;

    if (!cardOnTopTheStack) {
      throw new Error("No se pudo obtener la carta de la cima del stack");
    }

    this.stack.empty();

    this.stack.addCard(cardOnTopTheStack);

    this.deck.shuffle();
  }

  parseObjects(array: any[]) {
    return array.map((element) => {
      return element.parseObject();
    });
  }

  parseAsJSON() {
    const state = {
      id: this.id,
      deck: {
        cards: this.parseObjects(this.deck.cards),
      },
      stack: {
        cards: this.parseObjects(this.stack.cards),
      },
      playersGroup: {
        players: this.parseObjects(this.playersGroup.players),
      },
      turn: {
        player: this.turn.player ? this.turn.player.parseObject() : null,
      },
      unoYellers: this.unoYellers,
      gameDirection: this.gameDirection,
      cardsToGive: this.cardsToGive,
      gameModes: this.gameModes,
    };

    return state;
  }

  overrideInternalState(state: any) {
    try {
      this.id = state.id;

      this.deck.cards = state.deck.cards.map((card: any) => {
        return new Card(card.value, card.color, card.id);
      });

      this.stack.cards = state.stack.cards.map((card: any) => {
        if (card.value === Value.PLUS_FOUR || card.value === Value.WILDCARD) {
          const specialCard = new Card(card.value, undefined, card.id);

          specialCard.setColor(card.color);

          return specialCard;
        }

        return new Card(card.value, card.color, card.id);
      });

      this.playersGroup.players = state.playersGroup.players.map(
        (player: any) => {
          const pl = new Player(player.id, player.name, player.pic);

          pl.hand.cards = player.hand.cards.map((card: any) => {
            return new Card(card.value, card.color, card.id);
          });

          return pl;
        }
      );

      this.turn.player = state.turn.player
        ? (this.playersGroup.players.find(
            (player) => player.id === state.turn.player.id
          ) as Player)
        : null;

      this.unoYellers = state.unoYellers;
      this.gameDirection = state.gameDirection;
      this.cardsToGive = state.cardsToGive;
      this.gameModes = state.gameModes;
    } catch (e) {
      console.error(
        "No ha sido posible cargar el estado, posiblemente haya inconsistencia de datos"
      );
    }
  }
}
