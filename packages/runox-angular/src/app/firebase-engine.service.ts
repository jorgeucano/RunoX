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

@Injectable({
  providedIn: "root",
})
export class FirebaseEngineService {
  roomCollection: AngularFirestoreCollection<any>;
  room$: BehaviorSubject<Room> = new BehaviorSubject<Room>(new Room());

  constructor(
    private afs: AngularFirestore,
    private gameEngine: GameEngineService
  ) {
    this.roomCollection = this.afs.collection("rooms-angular");
  }

  createRoom(roomName: string): Promise<void> {
    let _state = this.gameEngine.game.gameStateAsJSON;
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
    return this.roomCollection.doc(roomName).set(room);
  }

  readRoom(roomName: string): Observable<Room> {
    return this.room$.pipe(
      mergeMap(() => this.checkRoom(roomName)),
      map((gameState) => {
        if (gameState === null) {
          return from(this.createRoom(roomName));
        }
      }),
      mergeMap(() => {
        return this.roomCollection
          .doc(roomName)
          .valueChanges()
          .pipe(
            tap(console.log),
            map((x) => x as Room));
      })
    );
  }

  updateData(): void {
    this.gameEngine.onStateChanged();
  }

  updateFirebase(newState: Room): void {
    const _state = JSON.parse(JSON.stringify(newState));
    const room = Object.assign(
      {},
      {
        ..._state,
      }
    );
    this.roomCollection
      .doc(room.name)
      .update(room)
      .then((response) => {
        console.log(`response de firebase`, response);
      });
  }

  joinUser(user: Player, roomName: string): Promise<void> {
    this.gameEngine.joinUser(user);
    let _state = this.gameEngine.game.gameStateAsJSON;
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
    return this.roomCollection.doc(roomName).update(room);
  }

  checkRoom(roomName: string): Observable<Room> {
    return this.roomCollection
      .doc(roomName)
      .get()
      .pipe(
        first(),
        map((x) => {
          if (x.exists) {
            return x.data() as Room;
          } else {
            return null;
          }
        })
      );
  }
}
