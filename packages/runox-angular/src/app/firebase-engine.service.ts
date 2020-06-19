import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs";
import {GameEngineService} from "./game-engine.service";
import {Player} from "@runox-game/game-engine/lib/models/player.model";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseEngineService {

  roomCollection: AngularFirestoreCollection<any>;
  room$: BehaviorSubject<any> = new BehaviorSubject<any>({name: ''});

  constructor(private afs: AngularFirestore, private gameEngine: GameEngineService) {
    this.roomCollection = this.afs.collection('rooms-angular');
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
    this.room$.pipe(
      mergeMap(
        () => {
          return this.roomCollection.doc(roomName).valueChanges();
        }
      )
    );
  }

  joinUser(user: Player, roomName: string) {
    // this.roomCollection.doc(roomName).update()
  }



}
