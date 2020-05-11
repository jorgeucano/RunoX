import { GameState } from "./models/game-state.model";
import { Player } from "./models/player.model";
import { GameEvents } from "./events/game-events";
import { GameEvent } from "./events/game-event.enum";
import { CommandService } from "./commands/command.service";
import { Card } from "./models/card.model";
import { GameModes } from "./models/game-modes";

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
      [GameEvent.AFTER_YELL_UNO]: this.gameEvents.afterYellUno$,
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

  get gameStateAsJSON() {
    return this.state.parseAsJSON();
  }

  start(gameModes?: GameModes) {
    return this.commandService.startGame(this.state, gameModes);
  }

  join(players: Player[]) {
    return this.commandService.addPlayers(this.state, players);
  }

  playCard(playerId: string, card: Card) {
    return this.commandService.playCard(this.state, playerId, card);
  }

  takeCard() {
    return this.commandService.takeCard(this.state);
  }

  uno(yellerId?: string) {
    return this.commandService.yellUno(this.state, yellerId);
  }

  overrideInternalState(externalState: any) {
    this.state.overrideInternalState(externalState);
  }
}
