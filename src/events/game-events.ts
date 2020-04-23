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
    /** 
     * si la carta es un +2 vamos a tener que chequear
     * si el siguiente jugador tiene un +2, si es asi 
     * simplemente deja que lo juege (y si no lo juega, le agrega el +2)
     * en el caso de que no tenga un +2 le entrega dos cartas directo
     *  */
    console.log(data);
    return this.events.afterPlayCard.next(data);
  }

  dispatchAfterTakeCard(data: AfterTakeCardEvent) {
    return this.events.afterTakeCard.next(data);
  }

  dispatchBeforeTurn(data: BeforeTurnEvent) {
    /**
     * Si el flag de la carta es un +2, lo que vamos a hacer
     * es chequear la mano que tiene este jugador para ver si tiene +2
     * en el caso de no ser asi, vamos a tener que entregarle 2 cartaS
     */
    return this.events.beforeTurn.next(data);
  }
}
