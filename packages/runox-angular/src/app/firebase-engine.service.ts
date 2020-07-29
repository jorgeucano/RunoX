import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { BehaviorSubject, Observable, from } from "rxjs";
import { GameEngineService } from "./game-engine.service";
import { Player } from "@runox-game/game-engine/lib/models/player.model";
import { first, map, mergeMap, tap } from "rxjs/operators";
import { Room } from "./models/room";
import { IGameState } from "@runox-game/game-engine/lib/models/game-state.model";

@Injectable({
  providedIn: "root",
})
export class FirebaseEngineService {
  roomCollection: AngularFirestoreCollection<any>;
  room$: BehaviorSubject<Room> = new BehaviorSubject<Room>(new Room());
  public game$: BehaviorSubject<IGameState> = new BehaviorSubject<IGameState>(
    null
  );

  constructor(
    private afs: AngularFirestore,
    private gameEngine: GameEngineService
  ) {
    this.roomCollection = this.afs.collection("rooms-angular");
  }

  updateFirebase(state: IGameState, roomName: string): void {
    const _state = JSON.parse(JSON.stringify(state));
    this.roomCollection
      .doc(roomName)
      .update(_state)
      .then(() => {
        this.game$.next(state);
        console.log(`response de firebase`);
      });
  }

  /***************************************************************************/
  createRoom(roomName: string): Promise<void> {
    let _state = this.gameEngine.gameStateAsJSON();
    _state = JSON.parse(JSON.stringify(_state));
    const room = Object.assign(
      {},
      {
        ..._state,
        start: false,
        winner: null,
        name: roomName,
      }
    );
    return this.roomCollection
      .doc(roomName)
      .set(room)
      .then(() => {
        this.game$.next(_state);
      });
  }

  // readRoom(roomName: string): Observable<Room> {
  //   return this.room$.pipe(
  //     mergeMap(() => this.checkRoom(roomName)),
  //     map((gameState) => {
  //       if (gameState === null) {
  //         return from(this.createRoom(roomName));
  //       }
  //     }),
  //     mergeMap(() => {
  //       return this.roomCollection
  //         .doc(roomName)
  //         .valueChanges()
  //         .pipe(map((x) => x as Room));
  //     })
  //   );
  // }

  // updateData(): void {
  //   this.gameEngine.onStateChanged();
  // }

  // joinUser(user: Player, roomName: string): Promise<void> {
  //   this.gameEngine.joinUser(user);
  //   let _state = this.gameEngine.gameStateAsJSON();
  //   _state = JSON.parse(JSON.stringify(_state));
  //   const room = Object.assign(
  //     {},
  //     {
  //       ..._state,
  //       start: false,
  //       winner: null,
  //       name: roomName,
  //     }
  //   );
  //   return this.roomCollection.doc(roomName).update(room);
  // }

  fetchRoom(roomName: string): Promise<boolean> {
    return this.roomCollection
      .doc(roomName)
      .get()
      .pipe(first())
      .toPromise()
      .then((x: any) => {
        if (x.exists) {
          this.gameEngine.overrideInternalState(x.data());
          return true;
        } else {
          return false;
        }
      });
  }
}
