import { Component, OnInit } from '@angular/core';
import { FirebaseEngineService } from "../firebase-engine.service";
import { Observable } from "rxjs";
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import { Room } from '../models/room';

@Component({
  selector: 'rnx-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  room$: Observable<Room>;
  user: IPlayer;

  constructor(firebaseEngineService: FirebaseEngineService) {
    this.room$ = firebaseEngineService.room$;
  }

  ngOnInit(): void {
  }

}
