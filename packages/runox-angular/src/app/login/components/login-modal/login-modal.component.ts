import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { LoginStatus } from 'src/app/enums/login-status';
import {
  IPlayer,
  Player,
} from '@runox-game/game-engine/lib/models/player.model';
import {map, take} from 'rxjs/operators';

export class RoomPlayer {
  player: IPlayer;
  roomName: string;
}
@Component({
  selector: 'rnx-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  @Input('roomName') set(roomName: string) {
    this._roomName = roomName;
    this.hasRoom = this._roomName !== '';
  }
  @Input() players: Array<IPlayer> = [];
  @Input() status: number;
  @Output() joinRoom: EventEmitter<RoomPlayer> = new EventEmitter<RoomPlayer>();
  @Output() userLogged: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() createRoom: EventEmitter<string> = new EventEmitter<string>();
  @Output() startGame: EventEmitter<RoomPlayer> = new EventEmitter<
    RoomPlayer
  >();
  _roomName = '';
  LoginStatus = LoginStatus;
  user: User = null;
  showRoomName = false;
  hasRoom = false;

  constructor(public _auth: AngularFireAuth) {
    if (this._auth.user) {
      this._auth.user.pipe(
        take(1),
        map((user: any) => {
          this.user = <User>{
            displayName:user.displayName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            photoURL:user.photoURL,
            providerId:user.providerId,
            uid:user.uid
          }
          this.status = LoginStatus.ENTER;
          const _player: IPlayer = new Player(
            user.email,
            user.displayName,
            user.photoURL
          );
          this.players.push(_player);
          if (this._roomName !== '') {
            this.joinRoom.emit({ player: _player, roomName: this._roomName});
          } else {
            this.status = LoginStatus.OWNER;
          }
        })
      ).subscribe()
    } else {
      console.log(`el usuario no existe`);
    }
  }

  login(): Promise<void> {
    return this._auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((u) => {
        this.user = u.user;
        this.status === LoginStatus.ENTER
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
      this.players.push(_user);
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
      if (this._roomName !== '') {
        this.hasRoom = true;
        this.createRoom.emit(this._roomName);
        this.joinRoom.emit(this.getRoomPlayer());
        resolve();
      } else {
        alert('Necesitas darle un nombre a la sala');
        reject();
      }
    });
  }

  start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this._roomName !== '') {
        this.startGame.emit(this.getRoomPlayer());
        resolve();
      } else {
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
