import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';

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

  constructor(private router: Router, private activeRouter: ActivatedRoute) {
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
  }

  onStartGame() {
    // @TODO Añadir lógica para empezar juego, and then ...
    this.router.navigate(['game']).catch(console.error);
  }
}
