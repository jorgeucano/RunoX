import { Deck } from "./deck.model";
import { Players } from "./players.model";
import { Turn } from "./turn.model";

/** Clase que representa el estado del juego */
export class GameState {
  readonly deck: Deck;

  // TODO: agregar pila de cartas en juego

  readonly players: Players;
  readonly turn: Turn;

  constructor() {
    this.deck = new Deck();
    this.players = new Players();
    this.turn = new Turn();
  }
}
