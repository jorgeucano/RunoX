import {Component} from '@angular/core';
import {Router} from '@angular/router';

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
    name: 'RIP AND TEAR'
  };

  isRoomOwner: boolean = true;

  avatars: Array<any> = [
    {id: 1, name: 'player apellidos del player 1', image: '', cards: 0},
    {id: 2, name: 'player 2', image: '', cards: 0},
    {id: 3, name: 'player 3', image: '', cards: 0},
  ];

  constructor(private router: Router) { }

  onLogin() {
    // @TODO Mostrar login de firebase para validar usario, an then ...
    this.status = this.isRoomOwner ? loginStatus.OWNER : loginStatus.WAITING;
  }

  onStartGame() {
    // @TODO Añadir lógica para empezar juego, and then ...
    this.router.navigate(['game']).catch(console.error);
  }
}
