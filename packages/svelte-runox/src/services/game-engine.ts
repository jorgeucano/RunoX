import { GameEngine } from "@runox-game/game-engine";
import type { GameModes } from "@runox-game/game-engine/lib/models/game-modes";
// import { environment } from "../environments/environment";
import type { IPlayer, Player } from "@runox-game/game-engine/lib/models/player.model";
import type { ICard } from "@runox-game/game-engine/lib/models/card.model";
import type { ILog } from "@runox-game/game-engine/lib/log/log.factory";

export class GameEngineService {

  game = new GameEngine();
  public playerId: string;

  constructor() { }

  // startGame(randomTakeDeckCard: boolean = environment.gameMode.randomTakeDeckCard) {

  //   const gameModes: GameModes = {
  //     randomTakeDeckCard: randomTakeDeckCard,
  //   };

  //   this.game.start(gameModes).subscribe(
  //     () => { },
  //     (error: string) => {
  //       // showErrorAlert(error);
  //     }
  //   );

  //   this.game.logs().subscribe((log: ILog) => {
  //     console.log(log);
  //   });
  // }

  joinUser(user: Player) {
    this.game.join([user]).subscribe();
  }

  removeUser(user: Player) {
    this.game.remove(user).subscribe();
  }

  playCard(card: ICard) {
    this.game.playCard(this.game.playerTurn?.id, card).subscribe();
  }

  takeCard() {
    this.game.takeCard();
  }

  poneleeeeUno(userId: string) {
    this.game.uno(userId);
  }

  overrideInternalState(data: any) {
    this.game.overrideInternalState(data);
  }

  onStateChanged() {
    // return this.game.onStateChanged();
  }

}
