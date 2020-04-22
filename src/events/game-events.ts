import { GameEvent } from "./game-event.enum";
import { Subject } from "rxjs";

export class GameEvents {
  private static instance: GameEvents;

  private readonly events = {
    [GameEvent.AFTER_GAME_START]: new Subject<void>(),
    [GameEvent.AFTER_PLAY_CARD]: new Subject<void>(),
    [GameEvent.AFTER_TAKE_CARD]: new Subject<void>(),
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

  dispatchAfterGameStart() {
    return this.events.afterGameStart.next();
  }

  dispatchAfterPlayCard() {
    // TODO: incluir data en el payload del evento
    return this.events.afterPlayCard.next();
  }

  dispatchAfterTakeCard() {
    // TODO: incluir data en el payload del evento
    return this.events.afterTakeCard.next();
  }
}
