import { Subject } from "rxjs";
import { GameEvent } from "./game-event.enum";
import { AfterPlayCardEvent } from "./after-play-card.event";
import { AfterTakeCardEvent } from "./after-take-card.event";
import { BeforeTurnEvent } from "./before-turn.event";

export class GameEvents {
  private static instance: GameEvents;

  private readonly events = {
    [GameEvent.AFTER_GAME_START]: new Subject<void>(),
    [GameEvent.AFTER_PLAY_CARD]: new Subject<AfterPlayCardEvent>(),
    [GameEvent.AFTER_TAKE_CARD]: new Subject<AfterTakeCardEvent>(),
    [GameEvent.BEFORE_TURN]: new Subject<BeforeTurnEvent>(),
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

  get afterTakeCard$() {
    return this.events.afterTakeCard.asObservable();
  }

  get beforeTurn$() {
    return this.events.beforeTurn.asObservable();
  }

  dispatchAfterGameStart() {
    return this.events.afterGameStart.next();
  }

  dispatchAfterPlayCard(data: AfterPlayCardEvent) {
    return this.events.afterPlayCard.next(data);
  }

  dispatchAfterTakeCard(data: AfterTakeCardEvent) {
    return this.events.afterTakeCard.next(data);
  }

  dispatchBeforeTurn(data: BeforeTurnEvent) {
    return this.events.beforeTurn.next(data);
  }
}
