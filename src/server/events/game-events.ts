import { Subject } from "rxjs";
import { GameEvent } from "./game-event.enum";
import { AfterPlayCardEvent } from "./after-play-card.event";
import { AfterTakeCardsEvent } from "./after-take-cards.event";
import { BeforeTurnEvent } from "./before-turn.event";
import { GameEndEvent } from "./game-end.event";
import { AfterYellUnoEvent } from "./after-yell-uno.event";

/**
 * Game event utility class
 */
export class GameEvents {
  private static instance: GameEvents;

  private readonly events = {
    [GameEvent.AFTER_GAME_START]: new Subject<void>(),
    [GameEvent.AFTER_PLAY_CARD]: new Subject<AfterPlayCardEvent>(),
    [GameEvent.AFTER_TAKE_CARDS]: new Subject<AfterTakeCardsEvent>(),
    [GameEvent.AFTER_YELL_UNO]: new Subject<AfterYellUnoEvent>(),
    [GameEvent.BEFORE_TURN]: new Subject<BeforeTurnEvent>(),
    [GameEvent.GAME_END]: new Subject<GameEndEvent>(),
  };

  private constructor() {}

  /**
   * Get instance of game event utility class
   */
  static getInstance(): GameEvents {
    if (!GameEvents.instance) {
      GameEvents.instance = new GameEvents();
    }

    return GameEvents.instance;
  }

  /**
   * Observable that emits values when the game starts
   */
  get afterGameStart$() {
    return this.events.afterGameStart.asObservable();
  }

  /**
   * Observable that emits values after a card is played
   */
  get afterPlayCard$() {
    return this.events.afterPlayCard.asObservable();
  }

  /**
   * Observable that emits values after a card is taken
   */
  get afterTakeCards$() {
    return this.events.afterTakeCards.asObservable();
  }

  /**
   * Observable that emits values after Uno is yelled
   */
  get afterYellUno$() {
    return this.events.afterYellUno.asObservable();
  }

  /**
   * Observable that emits values before a turn begins
   */
  get beforeTurn$() {
    return this.events.beforeTurn.asObservable();
  }

  /**
   * Observable that emits values when the game ends
   */
  get gameEnd$() {
    return this.events.gameEnd.asObservable();
  }

  /**
   * Emits value in the observable at the beginning of the game
   */
  dispatchAfterGameStart() {
    return this.events.afterGameStart.next();
  }

  /**
   * Emits value after a card is played
   *
   * @param data contains player information and played card
   */
  dispatchAfterPlayCard(data: AfterPlayCardEvent) {
    return this.events.afterPlayCard.next(data);
  }

  /**
   * Emits value after a card is taken from the deck
   *
   * @param data contains player information and taken cards
   */
  dispatchAfterTakeCards(data: AfterTakeCardsEvent) {
    return this.events.afterTakeCards.next(data);
  }

  /**
   * Emits value after a player yells Uno
   *
   * @param data contains yeller information
   */
  dispatchAfterYellUno(data: AfterYellUnoEvent) {
    return this.events.afterYellUno.next(data);
  }

  /**
   * Emits value before a turn begins
   *
   * @param data contains player information
   */
  dispatchBeforeTurn(data: BeforeTurnEvent) {
    return this.events.beforeTurn.next(data);
  }

  /**
   * Emits value when there is a winner
   *
   * @param data contains winner information and winner score
   */
  dispatchGameEnd(data: GameEndEvent) {
    return this.events.gameEnd.next(data);
  }
}
