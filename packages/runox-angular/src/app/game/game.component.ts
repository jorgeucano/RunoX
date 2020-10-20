import { Component } from '@angular/core';
import { FirebaseEngineService } from '../firebase-engine.service';
import { Observable } from 'rxjs';
import { GameEngineService } from '../game-engine.service';
import { IGameState } from '@runox-game/game-engine/lib/models/game-state.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ChatService } from '../chat/chat.service';
import { ICard } from '@runox-game/game-engine/lib/models/card.model';
import { ILog } from '@runox-game/game-engine/lib/log/log.factory';
import { Room } from '../models/room';

@Component({
  selector: 'rnx-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  room$: Observable<IGameState>;
  currentCard$: Observable<ICard>;
  logs$: Observable<ILog>;
  roomName: string = '';
  user = this.gameEngine.loggedUser();

  constructor(
    private router: Router,
    activeRouter: ActivatedRoute,
    private firebaseEngineService: FirebaseEngineService,
    private gameEngine: GameEngineService,
    private chat: ChatService
  ) {
    activeRouter.params.pipe(first()).subscribe((params) => {
      if (!!params.id) {
        this.roomName = params.id;
        this.fetchRoom();
      } else {
        this.redirectToLogin();
      }
    });
  }

  fetchRoom() {
    this.firebaseEngineService.fetchRoom(this.roomName).then(
      (exists: boolean) => {
        if (exists) {
          this.setRoom();
        } else {
          this.redirectToLogin();
        }
      },
      () => this.redirectToLogin()
    );
  }

  setRoom() {
    this.room$ = this.firebaseEngineService.game$;
    this.room$.subscribe((room: Room) => {
      if (room) {
        this.logs$ = this.gameEngine.userMessages();
        this.currentCard$ = room.onCardPlayed();
      }else{
        this.redirectToLogin();
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['', '']).catch(console.error);
  }

  hideChat() {
    this.chat.hideChat();
  }

  playCard(card: ICard) {
    this.gameEngine.playCard(card);
  }

  yellUno(){
    this.gameEngine.poneleeeeUno(this.gameEngine.playerId);
  }
}
