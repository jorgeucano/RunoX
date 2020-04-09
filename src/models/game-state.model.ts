import { Deck } from "./deck.model";
import { PlayersGroup } from "./players-group.model";
import { Turn } from "./turn.model";
import { Stack } from "./stack.model";

/** Clase que representa el estado del juego */
export class GameState {
  readonly deck: Deck;
  readonly stack: Stack;

  readonly playersGroup: PlayersGroup;

  readonly turn: Turn;

  constructor() {
    this.deck = new Deck();
    this.stack = new Stack();
    this.playersGroup = new PlayersGroup();
    this.turn = new Turn();
  }
}
