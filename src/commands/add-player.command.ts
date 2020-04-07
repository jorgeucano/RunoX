import { GameCommand } from "./game.command";
import { Player } from "../models/player.model";
import { GameState } from "../models/game-state.model";

export class AddPlayerCommand extends GameCommand {
  readonly player: Player;

  constructor(player: Player) {
    super();

    this.player = player;
  }

  execute(state: GameState) {
    state.players.addPlayer(
      new Player(this.player.id, this.player.name, this.player.pic)
    );

    console.log(`Se ha agregado a: ${this.player?.name}`);
  }
}
