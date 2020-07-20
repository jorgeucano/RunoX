import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';
import {Player} from "@runox-game/game-engine/lib/models/player.model";
import {GameEngineService} from "../game-engine.service";
import {Hand} from "@runox-game/game-engine/lib/models/hand.model";
import {FirebaseEngineService} from "../firebase-engine.service";
import {Observable} from "rxjs";

enum loginStatus {
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

  isRoomOwner: boolean = true;

  avatars: Array<any> = [];
  room$: Observable<any> = this.firebaseEService.room$;

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
     this.firebaseEService.readRoom(roomName);
   }

  onLogin(user: any) {
    // @TODO Mostrar login de firebase para validar usario, an then ...
    this.status = this.isRoomOwner ? loginStatus.OWNER : loginStatus.WAITING;
    this.avatars.push(user);
    const hand = new Hand();
    const player: Player = {id: user.email, hand: hand, pic: user.photoURL, name: user.fullName};
    this.gameEngineService.joinUser(player);
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
