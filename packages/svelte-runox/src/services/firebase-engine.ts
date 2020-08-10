import type { Player } from "@runox-game/game-engine/lib/models/player.model";
import { from, Observable } from "rxjs";
import { first } from 'rxjs/operators';
// import firebase from './firebase-app';
import { GameEngineService } from "./game-engine";


export class FirebaseEngineService {

  // roomsCollection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  private gameEngine: GameEngineService;

  constructor() {
    this.gameEngine = new GameEngineService();
    // this.roomsCollection = firebase.firestore().collection('rooms-svelte');
  }

  // checkRoom(roomName: string): Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
  //   return from(this.roomsCollection.doc(roomName).get())
  //     .pipe(
  //       first()
  //     );
  // }

  createRoom(roomName: string): Promise<any> {
    // let _state = this.gameEngine.game.gameStateAsJSON;
    // _state = JSON.parse(JSON.stringify(_state));
    // const room = Object.assign(
    //   {},
    //   {
    //     ..._state,
    //     start: false,
    //     winner: null,
    //     name: roomName
    //   }
    // );
    return
    // return this.roomsCollection.doc(roomName).set(room);
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
    return
    // debugger;
    // return this.roomsCollection.doc(roomName).update(room);
  }
}

export default FirebaseEngineService;
