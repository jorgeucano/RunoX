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
      [GameEvent.AFTER_TAKE_CARDS]: this.gameEvents.afterTakeCards$,
      [GameEvent.BEFORE_TURN]: this.gameEvents.beforeTurn$,
      [GameEvent.GAME_END]: this.gameEvents.gameEnd$,
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
    return this.commandService.startGame(this.state);
  }

  join(players: Player[]) {
    return this.commandService.addPlayers(this.state, players);
  }

  playCard(playerId: string, cardId: string) {
    return this.commandService.playCard(this.state, playerId, cardId);
  }

  takeCard() {
    return this.commandService.takeCard(this.state);
  }

  uno(yeller?: Player) {
    return this.commandService.yellUno(this.state, yeller);
  }
}
