import { CommandsInvoker } from "./commands-invoker";
import { GameState } from "../models/game-state.model";
import { Player } from "../models/player.model";
import { BuildDeckCommand } from "./build-deck.command";
import { StartGameCommand } from "./start-game.command";
import { AddPlayersCommand } from "./add-players.command";
import { PlayCardCommand } from "./play-card.command";
import { TakeDeckCardCommand } from "./take-deck-card.command";
import { FinalizeTurnCommand } from "./finalize-turn.command";
import { YellUnoCommand } from "./yell-uno.command";
import { Card } from "../models/card.model";

export class CommandService {
  startGame(currentState: GameState) {
    const invoker = new CommandsInvoker([
      new BuildDeckCommand(),
      new StartGameCommand(),
    ]);

    return invoker.invoke(currentState);
  }

  addPlayers(currentState: GameState, players: Player[]) {
    const invoker = new CommandsInvoker([new AddPlayersCommand(players)]);

    return invoker.invoke(currentState);
  }

  playCard(currentState: GameState, playerId: string, card: Card) {
    const invoker = new CommandsInvoker([
      new PlayCardCommand(playerId, card),
      new FinalizeTurnCommand(),
    ]);

    return invoker.invoke(currentState);
  }

  takeCard(currentState: GameState) {
    const invoker = new CommandsInvoker([
      new TakeDeckCardCommand(),
      new FinalizeTurnCommand(),
    ]);

    return invoker.invoke(currentState);
  }

  yellUno(currentState: GameState, yeller?: Player) {
    const invoker = new CommandsInvoker([new YellUnoCommand(yeller)]);

    return invoker.invoke(currentState);
  }
}
