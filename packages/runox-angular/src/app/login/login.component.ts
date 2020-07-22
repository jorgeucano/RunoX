import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { IPlayer } from "@runox-game/game-engine/lib/models/player.model";
import { GameEngineService } from "../game-engine.service";
import { Hand } from "@runox-game/game-engine/lib/models/hand.model";
import { FirebaseEngineService } from "../firebase-engine.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Room } from "../models/room";
import { LoginStatus } from "../enums/login-status";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
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
    private firebaseEService: FirebaseEngineService
  ) {
    activeRouter.params.pipe(first()).subscribe((params) => {
      this.room.name = params.id;
      this.setRoom(params.id);
    });
  }

  get isLogged(): boolean {
    return this.status !== LoginStatus.ENTER;
  }

  setRoom(roomName: string) {
    if (roomName) {
      this.room$ = this.firebaseEService.readRoom(roomName);
    }
  }

  onLogin(user: IPlayer) {
    // @TODO Mostrar login de firebase para validar usario, an then ...
    this.status = this.isRoomOwner ? LoginStatus.OWNER : LoginStatus.WAITING;
    this.players.push(user);
    const hand = new Hand();
    const player: IPlayer = {
      id: user.id,
      hand: hand,
      pic: user.pic,
      name: user.name,
    };
    if (this.room.name !== "" && this.room.name) {
      // chequear si la sala existe
      this.checkRoom(this.room.name, player);
    } else {
      this.gameEngineService.joinUser(player);
      this.user = player;
    }
  }

  setAvatars(players: Array<IPlayer>) {
    this.players = players;
  }

  checkRoom(roomName: string, player: IPlayer) {
    this.firebaseEService.checkRoom(roomName).subscribe((gameState) => {
      if (gameState !== null) {
        this.gameEngineService.overrideInternalState(gameState);
        this.setAvatars(gameState.playersGroup.players);
        if (
          !gameState.playersGroup.players.find((data) => data.id === player.id)
        ) {
          this.firebaseEService.joinUser(player, this.room.name).then((x) => {
            this.setAvatars([...gameState.playersGroup.players, player]);
          });
        }
      } else {
        alert("La sala no existe");
      }
    });
  }

  onStartGame(roomName: string) {
    this.firebaseEService.readRoom(roomName);
    this.router.navigate(["game", roomName]).catch(console.error);
  }

  onCreateGame(roomName: string) {
    // guardar la sala en firebase - gameEngine
    this.firebaseEService.createRoom(roomName).then(() => {
      this.setRoom(roomName);
    });
  }
}
