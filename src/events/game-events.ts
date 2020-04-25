import { Subject } from "rxjs";
import { GameEvent } from "./game-event.enum";
import { AfterPlayCardEvent } from "./after-play-card.event";
import { AfterTakeCardsEvent } from "./after-take-cards.event";
import { BeforeTurnEvent } from "./before-turn.event";
import { GameEndEvent } from "./game-end.event";

export class GameEvents {
  private static instance: GameEvents;

  private readonly events = {
    [GameEvent.AFTER_GAME_START]: new Subject<void>(),
    [GameEvent.AFTER_PLAY_CARD]: new Subject<AfterPlayCardEvent>(),
    [GameEvent.AFTER_TAKE_CARDS]: new Subject<AfterTakeCardsEvent>(),
    [GameEvent.BEFORE_TURN]: new Subject<BeforeTurnEvent>(),
    [GameEvent.GAME_END]: new Subject<GameEndEvent>(),
  };

  private constructor() {}

  static getInstance(): GameEvents {
    if (!GameEvents.instance) {
      GameEvents.instance = new GameEvents();
    }

    return GameEvents.instance;
  }

  get afterGameStart$() {
    return this.events.afterGameStart.asObservable();
  }

  get afterPlayCard$() {
    return this.events.afterPlayCard.asObservable();
  }

  get afterTakeCards$() {
    return this.events.afterTakeCards.asObservable();
  }

  get beforeTurn$() {
    return this.events.beforeTurn.asObservable();
  }

  get gameEnd$() {
    return this.events.gameEnd.asObservable();
  }

  dispatchAfterGameStart() {
    return this.events.afterGameStart.next();
  }

  dispatchAfterPlayCard(data: AfterPlayCardEvent) {
    return this.events.afterPlayCard.next(data);
  }

  dispatchAfterTakeCards(data: AfterTakeCardsEvent) {
    return this.events.afterTakeCards.next(data);
  }

  dispatchBeforeTurn(data: BeforeTurnEvent) {
    return this.events.beforeTurn.next(data);
  }

  dispatchGameEnd(data: GameEndEvent) {
    return this.events.gameEnd.next(data);
  }
}
