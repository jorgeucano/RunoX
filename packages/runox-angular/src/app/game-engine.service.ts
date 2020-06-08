import { Injectable } from '@angular/core';
import { GameEngine} from "@runox-game/game-engine";
import {GameModes} from "@runox-game/game-engine/lib/models/game-modes";
import { environment } from "../environments/environment";
import {Player} from "@runox-game/game-engine/lib/models/player.model";
import {ICard} from "@runox-game/game-engine/lib/models/card.model";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  game = new GameEngine();

  constructor() { }

  startGame(randomTakeDeckCard: boolean = environment.gameMode.randomTakeDeckCard) {
    const gameModes: GameModes = {
      randomTakeDeckCard: randomTakeDeckCard,
    };
    this.game.start(gameModes).subscribe(
      () => {},
      (error: string) => {
        // showErrorAlert(error);
      }
    );
  }

  joinUser(user: Player) {
    this.game.join([user]).subscribe();
  }

  removeUser(user: Player) {
    this.game.remove(user).subscribe();
  }

  playCard(card: ICard) {
    this.game.playCard(this.game.playerTurn?.id, card).subscribe();
  }



}
