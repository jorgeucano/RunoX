import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';
import {Player} from "@runox-game/game-engine/lib/models/player.model";
import {GameEngineService} from "../game-engine.service";
import {ICard} from "@runox-game/game-engine/lib/models/card.model";
import {Hand} from "@runox-game/game-engine/lib/models/hand.model";

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

  constructor(private router: Router, private activeRouter: ActivatedRoute, private gameEngineService: GameEngineService) {
    activeRouter.params
    .pipe(
      first()
    )
    .subscribe(
      (params) => {
        console.log('params', params.id);
        this.room.name = params.id;
      }
    );
   }

  onLogin(user: any) {
    // @TODO Mostrar login de firebase para validar usario, an then ...
    this.status = this.isRoomOwner ? loginStatus.OWNER : loginStatus.WAITING;
    this.avatars.push(user);
    /*
    readonly id: string;
    readonly name: string;
    readonly pic: string;
    readonly hand: IHand;
     */
    const hand = new Hand();
    const player: Player = {id: user.email, hand: hand, pic: user.photoURL, name: user.fullName};
    this.gameEngineService.joinUser(player);

  }

  onStartGame(roomName: string) {
    // guardar la sala en firebase - gameEngine

    // @TODO Añadir lógica para empezar juego, and then ...
    this.router.navigate(['game']).catch(console.error);
  }
}
