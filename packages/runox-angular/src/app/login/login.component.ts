import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first, map, filter } from "rxjs/operators";
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
  room$: Observable<Room> = new BehaviorSubject<Room>(new Room());

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

    this.room$ = this.gameEngineService.onStateChanged().pipe(
      filter(() => this.room.name !== ""),
      map((gameState: IGameState) => {
        debugger;
        return Object.assign(this.room, {
          ...gameState,
          name: this.room.name,
        });
      })
    );
  }

  ngOnInit(): void {}

  get isLogged(): boolean {
    return this.status !== LoginStatus.ENTER;
  }

  onStartGame(roomPlayer: RoomPlayer) {
    this.gameEngineService.startGame();
    this.router.navigate(["game", roomPlayer.roomName]).catch(console.error);
  }

  onCreateGame(roomName: string) {
    this.gameEngineService.create();
    this.room.name = roomName;
    // const gameState = this.gameEngineService.gameStateAsJSON();
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
