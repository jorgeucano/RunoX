import { Player } from "./player.model";

export class Players {
  readonly players: Player[];

  constructor() {
    this.players = [];
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  addPlayers(players: Player[]) {
    this.players.push(...players);
  }
}
