import { Injectable } from '@angular/core';
import { GameEngine } from '@runox-game/game-engine';
import { GameModes } from '@runox-game/game-engine/lib/models/game-modes';
import { environment } from '../environments/environment';
import {
  IPlayer,
  Player,
} from '@runox-game/game-engine/lib/models/player.model';
import { ICard } from '@runox-game/game-engine/lib/models/card.model';
import { ILog } from '@runox-game/game-engine/lib/log/log.factory';
import { IGameState } from '@runox-game/game-engine/lib/models/game-state.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  game = new GameEngine();
  public playerId: string;
  logs$: Observable<ILog>;

  constructor() {}

  get players(): IPlayer[] {
    return this.game.players;
  }

  create() {
    this.game.reset();
  }

  startGame(
    randomTakeDeckCard: boolean = environment.gameMode.randomTakeDeckCard
  ): Observable<void> {
    const gameModes: GameModes = {
      randomTakeDeckCard: randomTakeDeckCard,
    };
    this.logs$ = this.game.logs();
    return this.game.start(gameModes);
  }

  joinUser(user: Player) {
    this.playerId = user.id;
    if(!this.game.players.find(x => x.id ===this.playerId)) {
      this.game.join([user]).subscribe();
    }
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
    this.game.uno(userId).subscribe();
  }

  overrideInternalState(data: any) {
    this.game.overrideInternalState(data);
  }

  gameStateAsJSON(): IGameState {
    return this.game.gameStateAsJSON;
  }

  onStateChanged(): Observable<IGameState> {
    return this.game.onStateChanged();
  }

  userMessages(): Observable<ILog> {
    return this.logs$;
  }

  onCardPlayed(): Observable<ICard> {
    return this.game.onCardPlayed().pipe(filter((card: ICard) => !!card));
  }

  onSpecialCardPlayed(): Observable<ICard> {
    return this.game
      .onSpecialCardPlayed()
      .pipe(filter((card: ICard) => !!card));
  }

  loggedUser(): IPlayer {
    return this.game.players.find((player) => player.id === this.playerId);
  }
}
