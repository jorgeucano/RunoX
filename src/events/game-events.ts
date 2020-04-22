import { GameEvent } from "./game-event.enum";
import { Subject } from "rxjs";

export class GameEvents {
  private static instance: GameEvents;

  private events: {
    [key: string]: Subject<void>;
  } = {
    [GameEvent.AFTER_GAME_START]: new Subject(),
    [GameEvent.AFTER_PLAY_CARD]: new Subject(),
    [GameEvent.AFTER_TAKE_CARD]: new Subject(),
  };

  private constructor() {}

  static getInstance(): GameEvents {
    if (!GameEvents.instance) {
      GameEvents.instance = new GameEvents();
    }

    return GameEvents.instance;
  }

  on(event: GameEvent) {
    return this.events[event].asObservable();
  }

  dispatch(event: GameEvent) {
    this.events[event].next();
  }
}
