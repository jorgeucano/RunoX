import { GameState } from "./models/game-state.model";
import { Player } from "./models/player.model";
import { AddPlayersCommand } from "./commands/add-players.command";
import { BuildDeckCommand } from "./commands/build-deck.command";
import { PlayCardCommand } from "./commands/play-card.command";
import { FinalizeTurnCommand } from "./commands/finalize-turn.command";
import { StartGameCommand } from "./commands/start-game.command";
import { TakeDeckCardCommand } from "./commands/take-deck-card.command";
import { GameEvents } from "./events/game-events";
import { GameEvent } from "./events/game-event.enum";
import { filter } from "rxjs/operators";

export class GameEngine {
  private static instance: GameEngine;

  private state: GameState;
  private gameEvents: GameEvents;

  private constructor() {
    this.state = new GameState();
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
    // TODO: esto puede ser mejorado para evitar la repeticion
    let commandResult;

    const buildDeckCommand = new BuildDeckCommand();

    commandResult = buildDeckCommand.execute(this.state);

    if (!commandResult.success) {
      alert(commandResult.error);

      return;
    }

    const startGameCommand = new StartGameCommand();

    commandResult = startGameCommand.execute(this.state);

    if (!commandResult.success) {
      alert(commandResult.error);

      return;
    }

    this.gameEvents.dispatchAfterGameStart();
  }

  join(players: Player[]) {
    const addPlayersCommand = new AddPlayersCommand(players);

    const commandResult = addPlayersCommand.execute(this.state);

    if (!commandResult.success) {
      alert(commandResult.error);

      return;
    }
  }

  playCard(playerId: string, cardId: string) {
    // TODO: esto puede ser mejorado para evitar la repeticion
    let commandResult;

    const playCardCommand = new PlayCardCommand(playerId, cardId);

    commandResult = playCardCommand.execute(this.state);

    if (!commandResult.success) {
      alert(commandResult.error);

      return;
    }

    const finalizeTurnCommand = new FinalizeTurnCommand();

    commandResult = finalizeTurnCommand.execute(this.state);

    if (!commandResult.success) {
      alert(commandResult.error);

      return;
    }
  }

  takeCard() {
    // TODO: esto puede ser mejorado para evitar la repeticion
    let commandResult;

    const takeDeckCardCommand = new TakeDeckCardCommand();

    commandResult = takeDeckCardCommand.execute(this.state);

    if (!commandResult.success) {
      alert(commandResult.error);

      return;
    }

    const finalizeTurnCommand = new FinalizeTurnCommand();

    commandResult = finalizeTurnCommand.execute(this.state);

    if (!commandResult.success) {
      alert(commandResult.error);

      return;
    }
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
