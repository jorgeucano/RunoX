import { GameCommand } from "./game.command";
import { Player } from "../models/player.model";
import { GameState } from "../models/game-state.model";
import { CommandValidation } from "./command-result";

/**
 * Players to add into the game
 */
export class AddPlayersCommand extends GameCommand {
  /**
   * Players to add into the game
   */
  private readonly players: Player[];

  /**
   * Class that allows adding players to the game state
   *
   * @param players - players to add into the game
   */
  constructor(players: Player[]) {
    super();

    this.players = players;
  }

  execute(state: GameState) {
    state.playersGroup.addPlayers(this.players);

    console.log(`Se ha agregado a ${this.players.length} jugadores`);
  }

  validate(state: GameState) {
    if (!this.players || !this.players.length) {
      return new CommandValidation(
        false,
        "Hubo un inconveniente con los jugadores ingresados"
      );
    }

    return new CommandValidation(true);
  }
}
