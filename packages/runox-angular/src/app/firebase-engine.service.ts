import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {GameEngineService} from "./game-engine.service";
import {Player} from "@runox-game/game-engine/lib/models/player.model";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseEngineService {

  roomCollection: AngularFirestoreCollection<any>;
  room$: Observable<any>;

  constructor(private afs: AngularFirestore, private gameEngine: GameEngineService) {
    this.roomCollection = this.afs.collection('room');
  }

  createRoom(roomName: string): Promise<any> {
    let _state = this.gameEngine.game.gameStateAsJSON;
    _state = JSON.parse(JSON.stringify(_state));
    const room = Object.assign(
      {},
      {
        ..._state,
        start: false,
        winner: null,
      }
    );
    return this.roomCollection.doc(roomName).set(room);
  }

  readRoom(roomName: string) {
    this.room$ = this.roomCollection.doc(roomName).valueChanges();
  }

  joinUser(user: Player, roomName: string) {
    // this.roomCollection.doc(roomName).update()
  }



}
