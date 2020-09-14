import { Component,  OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first, map, filter } from 'rxjs/operators';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import { GameEngineService } from '../game-engine.service';
import { FirebaseEngineService } from '../firebase-engine.service';
import { Room } from '../models/room';
import { LoginStatus } from '../enums/login-status';
import { IGameState } from '@runox-game/game-engine/lib/models/game-state.model';
import { RoomPlayer } from './components/login-modal/login-modal.component';
import { ChatService } from '../chat/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  status: LoginStatus = LoginStatus.ENTER;
  room: Room = new Room();
  user: IPlayer;
  isRoomOwner: boolean = true;
  players: Array<IPlayer> = [];
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    activeRouter: ActivatedRoute,
    private gameEngineService: GameEngineService,
    private firebaseService: FirebaseEngineService,
    private chatService: ChatService
  ) {
    activeRouter.params
      .pipe(
        first(),
        filter((x) => !!x.id)
      )
      .subscribe((params) => {
        this.room.name = params.id;
      });

    const subs = this.gameEngineService
      .onStateChanged()
      .pipe(
        filter(() => !!this.room.name),
        map((gameState: IGameState) => {
          this.room = Object.assign(this.room, {
            ...gameState,
            name: this.room.name,
          });
          return this.room;
        })
      )
      .subscribe();
    this.subscriptions.push(subs);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => {
      subs.unsubscribe();
    });
  }

  get isLogged(): boolean {
    return this.status !== LoginStatus.ENTER;
  }

  onStartGame(roomPlayer: RoomPlayer) {
    this.room.name = roomPlayer.roomName;
    this.gameEngineService
      .startGame()
      .pipe(
        first()
      )
      .subscribe(() => {
        const gameState = this.gameEngineService.gameStateAsJSON();
        this.firebaseService.updateFirebase(gameState, roomPlayer.roomName);
        this.router
          .navigate(['game', roomPlayer.roomName])
          .catch(console.error);
      });
  }

  onCreateGame(roomName: string) {
    this.chatService.showChat();
    this.gameEngineService.create();
    this.room.name = roomName;
    this.firebaseService.createRoom(roomName);
  }

  onJoinUser(roomPlayer: RoomPlayer) {
    this.status = this.isRoomOwner ? LoginStatus.OWNER : LoginStatus.WAITING;
    this.gameEngineService.joinUser(roomPlayer.player);
    const subs = this.gameEngineService
      .onStateChanged()
      .subscribe((gameState: IGameState) => {
        this.firebaseService.updateFirebase(gameState, roomPlayer.roomName);
      });
      this.subscriptions.push(subs);
  }

  setAvatars(players: Array<IPlayer>) {
    this.players = players;
  }
}
