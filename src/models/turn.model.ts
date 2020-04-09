import { Player, NullPlayer } from "./player.model";

export class Turn {
  readonly player: Player;

  constructor() {
    this.player = new NullPlayer();
  }

  setPlayerTurn(player: Player) {
    Object.assign(this.player, player);
  }
}
