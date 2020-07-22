import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { Room } from "src/app/models/room";
import { LoginStatus } from 'src/app/enums/login-status';
import { IPlayer, Player } from '@runox-game/game-engine/lib/models/player.model';

@Component({
  selector: "rnx-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.css"],
})
export class LoginModalComponent {
  @Input() players: Array<IPlayer> = [];
  @Input() room: Room = new Room();
  @Input() status: number;
  @Output() joinRoom: EventEmitter<IPlayer> = new EventEmitter<IPlayer>();
  @Output() createRoom: EventEmitter<any> = new EventEmitter<any>();
  @Output() startGame: EventEmitter<any> = new EventEmitter<any>();
  LoginStatus = LoginStatus;

  roomName = "";

  // tslint:disable-next-line: variable-name
  constructor(public _auth: AngularFireAuth) {
    console.log(auth, _auth);
  }

  login() {
    this._auth.signInWithPopup(new auth.GoogleAuthProvider()).then((u) => {
      const user = u.user;
      const _user: IPlayer = new Player(user.email, user.displayName, user.photoURL);
      this.joinRoom.emit(_user);
    });
  }

  logout() {
    this._auth.signOut();
  }

  join() {
    this.login();
  }

  create() {
    if (this.roomName !== "") {
      this.createRoom.emit(this.roomName);
    } else {
      // TODO: modal con: "complete el nombre de la room"
      alert("Necesitas darl un nombre a la sala");
    }
  }

  start() {
    // NEVER NEVER NEVER borren la siguiente linea
    // console.log('Start that shit!');
    if (this.roomName !== "") {
      this.startGame.emit(this.roomName);
    } else {
      // TODO: modal con: "complete el nombre de la room"
    }
  }
}
