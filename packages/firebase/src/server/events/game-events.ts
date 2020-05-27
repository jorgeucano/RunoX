import { Subject } from "rxjs";
import { GameEvent } from "./game-event.enum";
import { AfterPlayCardEvent } from "./after-play-card.event";
import { AfterTakeCardsEvent } from "./after-take-cards.event";
import { BeforeTurnEvent } from "./before-turn.event";
import { GameEndEvent } from "./game-end.event";
import { AfterYellUnoEvent } from "./after-yell-uno.event";
import { ChangeColorEvent } from "./color-change.event";
import { SkipEvent } from "./skip.event";
import { ReverseEvent } from "./reverse.event";

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
    [GameEvent.CHANGE_COLOR]: new Subject<ChangeColorEvent>(),
    [GameEvent.SKIP]: new Subject<SkipEvent>(),
    [GameEvent.REVERSE]: new Subject<ReverseEvent>(),
    [GameEvent.ERROR]: new Subject<any>(),
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
    return this.events[GameEvent.AFTER_GAME_START].asObservable();
  }

  /**
   * Observable that emits values after a card is played
   */
  get afterPlayCard$() {
    return this.events[GameEvent.AFTER_PLAY_CARD].asObservable();
  }

  /**
   * Observable that emits values after a card is taken
   */
  get afterTakeCards$() {
    return this.events[GameEvent.AFTER_TAKE_CARDS].asObservable();
  }

  /**
   * Observable that emits values after Uno is yelled
   */
  get afterYellUno$() {
    return this.events[GameEvent.AFTER_YELL_UNO].asObservable();
  }

  /**
   * Observable that emits values before a turn begins
   */
  get beforeTurn$() {
    return this.events[GameEvent.BEFORE_TURN].asObservable();
  }

  /**
   * Observable that emits values when the game ends
   */
  get gameEnd$() {
    return this.events[GameEvent.GAME_END].asObservable();
  }

  /**
   * Observable that emits values when the color of card has changed
   */
  get changeColor$() {
    return this.events[GameEvent.CHANGE_COLOR].asObservable();
  }


  /**
   * Observable that emits values when the color of card has changed
   */
  get skip$() {
    return this.events[GameEvent.SKIP].asObservable();
  }

  /**
   * Observable that emits values when the color of card has changed
   */
  get reverse$() {
    return this.events[GameEvent.REVERSE].asObservable();
  }

  /**
   * Observable that emits values when an error occurred
   */
  get error$() {
    return this.events[GameEvent.ERROR].asObservable();
  }

  /**
   * Emits value in the observable at the beginning of the game
   */
  dispatchAfterGameStart() {
    return this.events[GameEvent.AFTER_GAME_START].next();
  }

  /**
   * Emits value after a card is played
   *
   * @param data contains player information and played card
   */
  dispatchAfterPlayCard(data: AfterPlayCardEvent) {
    return this.events[GameEvent.AFTER_PLAY_CARD].next(data);
  }

  /**
   * Emits value after a card is taken from the deck
   *
   * @param data contains player information and taken cards
   */
  dispatchAfterTakeCards(data: AfterTakeCardsEvent) {
    return this.events[GameEvent.AFTER_TAKE_CARDS].next(data);
  }

  /**
   * Emits value after a player yells Uno
   *
   * @param data contains yeller information
   */
  dispatchAfterYellUno(data: AfterYellUnoEvent) {
    return this.events[GameEvent.AFTER_YELL_UNO].next(data);
  }

  /**
   * Emits value before a turn begins
   *
   * @param data contains player information
   */
  dispatchBeforeTurn(data: BeforeTurnEvent) {
    return this.events[GameEvent.BEFORE_TURN].next(data);
  }

  /**
   * Emits value when there is a winner
   *
   * @param data contains winner information and winner score
   */
  dispatchGameEnd(data: GameEndEvent) {
    return this.events[GameEvent.GAME_END].next(data);
  }

  /**
   * Emits value when the color of card has changed
   *
   * @param data contains new color
   */
  dispatchChangeColor(data: ChangeColorEvent) {
    return this.events[GameEvent.CHANGE_COLOR].next(data);
  }

  /**
   * Emits value  when the next player has skiped
   *
   * @param data contains next user
   */
  dispatchSkip(data: SkipEvent) {
    return this.events[GameEvent.SKIP].next(data);
  }
  

  /**
   * Emits value the direction is changed by revert card
   *
   * @param data contains new color
   */
  dispatchReverse(data: ReverseEvent) {
    return this.events[GameEvent.REVERSE].next(data);
  }

  /**
   * Emits error 
   *
   * @param error
   */
  dispatchError(error: any): any {
    return this.events[GameEvent.ERROR].next(error);
  }
}
