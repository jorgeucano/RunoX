import { GameCommand } from "./game.command";
import { Player } from "../models/player.model";
import { GameState } from "../models/game-state.model";
import { CommandResult } from "./command-result";

export class AddPlayersCommand extends GameCommand {
  private readonly players: Player[];

  constructor(players: Player[]) {
    super();

    this.players = players;
  }

  execute(state: GameState) {
    state.playersGroup.addPlayers(this.players);

    console.log(`Se ha agregado a ${this.players.length} jugadores`);

    return new CommandResult(true);
  }
}
