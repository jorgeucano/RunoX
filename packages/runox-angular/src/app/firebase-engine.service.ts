import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {GameEngineService} from "./game-engine.service";
import {Player} from "@runox-game/game-engine/lib/models/player.model";
import {first, map, mergeMap} from "rxjs/operators";
import {IGameState} from "@runox-game/game-engine/lib/models/game-state.model";

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
    debugger;
    _state = JSON.parse(JSON.stringify(_state));
    const room = Object.assign(
      {},
      {
        ..._state,
        start: false,
        winner: null,
        name: roomName
      }
    );
    return this.roomCollection.doc(roomName).set(room);
  }

  readRoom(roomName: string) {
    return this.room$.pipe(
      mergeMap(
        () => {
          return this.roomCollection.doc(roomName).valueChanges();
        }
      )
    );
  }

  updateData() {
    this.gameEngine.onStateChanged()
  }

  updateFirebase(newState: IGameState) {
    const _state = JSON.parse(JSON.stringify(newState));
    const room = Object.assign(
      {},
      {
        ..._state
      }
    );
    this.roomCollection.doc(room.name).update(room).then(
      (response) => {
        console.log(`response de firebase`, response);
      }
    )
  }

  joinUser(user: Player, roomName: string): Promise<any> {
    this.gameEngine.joinUser(user);
    let _state = this.gameEngine.game.gameStateAsJSON;
    _state = JSON.parse(JSON.stringify(_state));
    const room = Object.assign(
      {},
      {
        ..._state,
        start: false,
        winner: null,
        name: roomName
      }
    );
    debugger;
    return this.roomCollection.doc(roomName).update(room);
  }


  checkRoom(roomName: string): Observable<any> {
    return this.roomCollection.doc(roomName).get()
        .pipe(
          first()
        );
  }



}
