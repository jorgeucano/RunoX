import { Component, OnInit } from '@angular/core';

enum loginStatus {
  ENTER = 0,
  OWNER = 1,
  WAITING = 2,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status: loginStatus = loginStatus.ENTER;

  room: any = {
    name: 'RIP AND TEAR'
  };

  avatars: Array<any> = [
    {id: 1, name: 'player apellidos del player 1', image: '', cards: 0},
    {id: 2, name: 'player 2', image: '', cards: 0},
    {id: 3, name: 'player 3', image: '', cards: 0},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onLogin() {
    console.log('LOGIN FIREBASE POPUP');
    this.status = loginStatus.WAITING;
  }
}
