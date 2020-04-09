import { Player } from "./player.model";

export class Turn {
  player: Player | null;

  constructor() {
    this.player = null;
  }

  setPlayerTurn(player: Player) {
    this.player = player;
  }
}
