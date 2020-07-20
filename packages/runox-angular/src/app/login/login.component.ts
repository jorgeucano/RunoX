import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';
import {Player} from "@runox-game/game-engine/lib/models/player.model";
import {GameEngineService} from "../game-engine.service";
import {Hand} from "@runox-game/game-engine/lib/models/hand.model";
import {FirebaseEngineService} from "../firebase-engine.service";
import {BehaviorSubject, Observable} from "rxjs";

export enum loginStatus {
  ENTER = 0, OWNER = 1, WAITING = 2,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  status: loginStatus = loginStatus.ENTER;
  room: any = {
    name: ''
  };
  user: any;
  isRoomOwner: boolean = true;
  avatars: Array<any> = [];
  room$: Observable<any> = new BehaviorSubject<any>({name: ''});

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gameEngineService: GameEngineService,
    private firebaseEService: FirebaseEngineService
  ) {
    activeRouter.params
    .pipe(
      first()
    )
    .subscribe(
      (params) => {
        console.log('params', params.id);
        this.room.name = params.id;
        this.setRoom(params.id);
      }
    );
   }

   setRoom(roomName: string) {
    if (roomName){
      this.room$ = this.firebaseEService.readRoom(roomName);
    }
   }

  onLogin(user: any) {
    // @TODO Mostrar login de firebase para validar usario, an then ...
    this.status = this.isRoomOwner ? loginStatus.OWNER : loginStatus.WAITING;
    this.avatars.push(user);
    const hand = new Hand();
    const player: Player = {id: user.id, hand: hand, pic: user.image, name: user.name};
    if (this.room.name !== '' && this.room.name) {
      // chequear si la sala existe
      this.checkRoom(this.room.name, player);
    } else {
      this.gameEngineService.joinUser(player);
      this.user = player;
    }
  }

  setAvatars(avatars: Array<any>) {
    this.avatars = avatars;
  }

  checkRoom(roomName: string, player: any) {
    this.firebaseEService.checkRoom(roomName).subscribe(
      (data) => {
        if (data.exists) {
          this.gameEngineService.overrideInternalState(data.data());
          const fullData = data.data();
          this.setAvatars(fullData.playersGroup.players);
          if (
            !fullData.playersGroup.players.find(data => data.id === player.id)
          ) {
            this.firebaseEService.joinUser(player, this.room.name).then(
              (x) => {
                this.setAvatars([...fullData.playersGroup.players, player]);
              }
            );
          }
        } else {
          alert('La sala no existe');
        }
      }
    )
  }

  onStartGame(roomName: string) {
    this.firebaseEService.readRoom(roomName);
    this.router.navigate(['game', roomName]).catch(console.error);
  }

  onCreateGame(roomName: string) {
    // guardar la sala en firebase - gameEngine
    this.firebaseEService.createRoom(roomName).then(
      ()=> {
        this.setRoom(roomName);
      }
    )
  }

}
