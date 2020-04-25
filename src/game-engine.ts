import { GameState } from "./models/game-state.model";
import { Player } from "./models/player.model";
import { GameEvents } from "./events/game-events";
import { GameEvent } from "./events/game-event.enum";
import { filter } from "rxjs/operators";
import { CommandService } from "./commands/command.service";

export class GameEngine {
  private static instance: GameEngine;

  private readonly state: GameState;
  private readonly commandService: CommandService;
  private readonly gameEvents: GameEvents;

  private constructor() {
    this.state = new GameState();
    this.commandService = new CommandService();
    this.gameEvents = GameEvents.getInstance();

    this.setSubscriptions();
  }

  static getInstance(): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine();
    }

    return GameEngine.instance;
  }

  get events() {
    return {
      [GameEvent.AFTER_GAME_START]: this.gameEvents.afterGameStart$,
      [GameEvent.AFTER_PLAY_CARD]: this.gameEvents.afterPlayCard$,
      [GameEvent.AFTER_TAKE_CARD]: this.gameEvents.afterTakeCard$,
      [GameEvent.BEFORE_TURN]: this.gameEvents.beforeTurn$,
    };
  }

  get players() {
    return this.state.playersGroup.players;
  }

  get playerTurn() {
    return this.state.turn.player;
  }

  get stackCard() {
    return this.state.stack.cardOnTop;
  }

  start() {
    this.commandService.startGame(this.state);
  }

  join(players: Player[]) {
    this.commandService.addPlayers(this.state, players);
  }

  playCard(playerId: string, cardId: string) {
    this.commandService.playCard(this.state, playerId, cardId);
  }

  takeCard() {
    this.commandService.takeCard(this.state);
  }

  uno(yeller?: Player) {
    this.commandService.yellUno(this.state, yeller);
  }

  private setSubscriptions() {
    this.subscribeToAfterTakeCard();
  }

  private subscribeToAfterTakeCard() {
    this.gameEvents.afterTakeCard$
      .pipe(filter(() => !this.state.deck.cards.length))
      .subscribe(() => {
        this.state.addStackCardsToDeck();
      });
  }
}
