import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { GameEngineService } from "./game-engine.service";
import { first } from "rxjs/operators";
import { Room } from "./models/room";
import {
  IGameState,
  GameState,
} from "@runox-game/game-engine/lib/models/game-state.model";

@Injectable({
  providedIn: "root",
})
export class FirebaseEngineService {
  roomCollection: AngularFirestoreCollection<any>;
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
        const room = Object.assign(new Room(), {
          ...state,
          name: roomName,
        });
        this.game$.next(room);
        console.log(`response de firebase`, state as Room);
      });
  }

  createRoom(roomName: string): Promise<void> {
    let _state = this.gameEngine.gameStateAsJSON();
    _state = JSON.parse(JSON.stringify(_state));
    const room = Object.assign({}, {
      ..._state,
      start: false,
      winner: null,
      name: roomName,
    });
    return this.roomCollection
      .doc(roomName)
      .set(room)
      .then(() => {
        const _room = Object.assign(new Room(), {
          ..._state,
          name: roomName,
        }) as GameState;
        this.game$.next(_room);
      });
  }

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
