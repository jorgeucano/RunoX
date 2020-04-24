import { CommandsInvoker } from "./commands-invoker";
import { GameState } from "../models/game-state.model";
import { Player } from "../models/player.model";
import { BuildDeckCommand } from "./build-deck.command";
import { StartGameCommand } from "./start-game.command";
import { AddPlayersCommand } from "./add-players.command";
import { PlayCardCommand } from "./play-card.command";
import { TakeDeckCardCommand } from "./take-deck-card.command";
import { FinalizeTurnCommand } from "./finalize-turn.command";

export class CommandService {
  startGame(currentState: GameState) {
    const invoker = new CommandsInvoker([
      new BuildDeckCommand(),
      new StartGameCommand(),
    ]);

    invoker.invoke(currentState);
  }

  addPlayers(currentState: GameState, players: Player[]) {
    const invoker = new CommandsInvoker([new AddPlayersCommand(players)]);

    invoker.invoke(currentState);
  }

  playCard(currentState: GameState, playerId: string, cardId: string) {
    const invoker = new CommandsInvoker([
      new PlayCardCommand(playerId, cardId),
      new FinalizeTurnCommand(),
    ]);

    invoker.invoke(currentState);
  }

  takeCard(currentState: GameState) {
    const invoker = new CommandsInvoker([
      new TakeDeckCardCommand(),
      new FinalizeTurnCommand(),
    ]);

    invoker.invoke(currentState);
  }
}
