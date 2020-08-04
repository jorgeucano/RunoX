import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first, map, filter, tap } from "rxjs/operators";
import { IPlayer } from "@runox-game/game-engine/lib/models/player.model";
import { GameEngineService } from "../game-engine.service";
import { FirebaseEngineService } from "../firebase-engine.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Room } from "../models/room";
import { LoginStatus } from "../enums/login-status";
import { IGameState } from "@runox-game/game-engine/lib/models/game-state.model";
import { RoomPlayer } from "./components/login-modal/login-modal.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  status: LoginStatus = LoginStatus.ENTER;
  room: Room = new Room();
  user: IPlayer;
  isRoomOwner: boolean = true;
  players: Array<IPlayer> = [];

  constructor(
    private router: Router,
    activeRouter: ActivatedRoute,
    private gameEngineService: GameEngineService,
    private firebaseService: FirebaseEngineService
  ) {
    activeRouter.params
      .pipe(
        first(),
        filter((x) => !!x.id)
      )
      .subscribe((params) => {
        this.room.name = params.id;
      });

    this.gameEngineService
      .onStateChanged()
      .pipe(
        tap(console.debug),
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
  }

  ngOnInit(): void {}

  get isLogged(): boolean {
    return this.status !== LoginStatus.ENTER;
  }

  onStartGame(roomPlayer: RoomPlayer) {
    this.room.name = roomPlayer.roomName;
    this.gameEngineService
      .startGame()
      .pipe(first())
      .subscribe(() => {
        const gameState = this.gameEngineService.gameStateAsJSON();
        console.error(gameState);
        this.firebaseService.updateFirebase(gameState, roomPlayer.roomName);
        this.router
          .navigate(["game", roomPlayer.roomName])
          .catch(console.error);
      });
  }

  onCreateGame(roomName: string) {
    this.gameEngineService.create();
    this.room.name = roomName;
    this.firebaseService.createRoom(roomName);
  }

  onJoinUser(roomPlayer: RoomPlayer) {
    this.status = this.isRoomOwner ? LoginStatus.OWNER : LoginStatus.WAITING;
    this.gameEngineService.joinUser(roomPlayer.player);
    this.gameEngineService
      .onStateChanged()
      .pipe(first())
      .subscribe((gameState: IGameState) => {
        this.firebaseService.updateFirebase(gameState, roomPlayer.roomName);
      });
  }

  setAvatars(players: Array<IPlayer>) {
    this.players = players;
  }
}
