import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, User } from "firebase";
import { LoginStatus } from "src/app/enums/login-status";
import {
  IPlayer,
  Player,
} from "@runox-game/game-engine/lib/models/player.model";

export class RoomPlayer {
  player: IPlayer;
  roomName: string;
}
@Component({
  selector: "rnx-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.css"],
})
export class LoginModalComponent {
  @Input("roomName") set(roomName: string) {
    this._roomName = roomName;
    this.hasRoom = this._roomName !== "";
  }
  @Input() players: Array<IPlayer> = [];
  @Input() status: number;
  @Output() joinRoom: EventEmitter<RoomPlayer> = new EventEmitter<RoomPlayer>();
  @Output() createRoom: EventEmitter<string> = new EventEmitter<string>();
  @Output() startGame: EventEmitter<RoomPlayer> = new EventEmitter<
    RoomPlayer
  >();
  _roomName = "";
  LoginStatus = LoginStatus;
  user: User = null;
  showRoomName = false;
  hasRoom = false;

  constructor(public _auth: AngularFireAuth) {}

  login(): Promise<void> {
    return this._auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((u) => {
        this.user = u.user;
        this.status === LoginStatus.ENTER;
      });
  }

  logout(): Promise<void> {
    return this._auth.signOut();
  }

  loginAndJoin(): Promise<void> {
    return this.login().then(() => {
      const _user: IPlayer = new Player(
        this.user.email,
        this.user.displayName,
        this.user.photoURL
      );
      this.joinRoom.emit(this.getRoomPlayer());
    });
  }

  loginAndCreate(): Promise<void> {
    return this.login().then(() => {
      this.create().then(() => {
        this.joinRoom.emit(this.getRoomPlayer());
      });
    });
  }

  create(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this._roomName !== "") {
        this.hasRoom = true;
        this.createRoom.emit(this._roomName);
        resolve();
      } else {
        alert("Necesitas darle un nombre a la sala");
        reject();
      }
    });
  }

  start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this._roomName !== "") {
        this.startGame.emit(this.getRoomPlayer());
        resolve();
      } else {
        // alert("Necesitas darle un nombre a la sala");
        reject();
      }
    });
  }

  getRoomPlayer(): RoomPlayer {
    return {
      player: new Player(
        this.user.email,
        this.user.displayName,
        this.user.photoURL
      ),
      roomName: this._roomName,
    };
  }
}
