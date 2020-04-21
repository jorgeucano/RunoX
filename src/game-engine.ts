import { GameState } from "./models/game-state.model";
import { Player } from "./models/player.model";
import { AddPlayerCommand } from "./commands/add-player.command";
import { AddPlayersCommand } from "./commands/add-players.command";
import { BuildDeckCommand } from "./commands/build-deck.command";
import { DiscardHandCardCommand } from "./commands/discard-hand-card.command";
import { FinalizeTurnCommand } from "./commands/finalize-turn.command";
import { RegenerateDeckCommand } from "./commands/regenerate-deck.command";
import { StartGameCommand } from "./commands/start-game.command";
import { TakeDeckCardCommand } from "./commands/take-deck-card.command";

export class GameEngine {
  private static instance: GameEngine;

  private state: GameState;

  private constructor() {
    this.state = new GameState();
  }

  static getInstance(): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine();
    }

    return GameEngine.instance;
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

  addPlayer(player: Player) {
    const addPlayerCommand = new AddPlayerCommand(player);

    addPlayerCommand.execute(this.state);
  }

  addPlayers(players: Player[]) {
    const addPlayersCommand = new AddPlayersCommand(players);

    addPlayersCommand.execute(this.state);
  }

  buildDeck() {
    const buildDeckCommand = new BuildDeckCommand();

    buildDeckCommand.execute(this.state);
  }

  discardHandCard(cardId: string) {
    const discardHandCardCommand = new DiscardHandCardCommand(cardId);

    discardHandCardCommand.execute(this.state);
  }

  finalizeTurn() {
    const finalizeTurnCommand = new FinalizeTurnCommand();

    finalizeTurnCommand.execute(this.state);
  }

  regenerateDeck() {
    const regenerateDeckCommand = new RegenerateDeckCommand();

    regenerateDeckCommand.execute(this.state);
  }

  startGame() {
    const startGameCommand = new StartGameCommand();

    startGameCommand.execute(this.state);
  }

  takeDeckCard() {
    const takeDeckCardCommand = new TakeDeckCardCommand();

    takeDeckCardCommand.execute(this.state);
  }
}
