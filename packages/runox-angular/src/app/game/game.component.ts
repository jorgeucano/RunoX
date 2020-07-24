import { Component, OnInit } from '@angular/core';
import { FirebaseEngineService } from "../firebase-engine.service";
import { Observable } from "rxjs";
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import { Room } from '../models/room';
import {GameEngineService} from "../game-engine.service";

@Component({
  selector: 'rnx-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  room$: Observable<Room>;
  // @ts-ignore
  user = this.gameEngine.game.state.playersGroup.players.find(player => player.id === this.gameEngine.playerId);
  constructor(private firebaseEngineService: FirebaseEngineService, private gameEngine: GameEngineService) {
    console.log(this.user);
    debugger;
    this.room$ = firebaseEngineService.room$;
  }

  ngOnInit(): void {
  }

}
