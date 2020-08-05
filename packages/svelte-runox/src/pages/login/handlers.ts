import { Player } from '@runox-game/game-engine/lib/models/player.model';
import type { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import firebase from "../../services/firebase-app";
import { AppStatus } from "../../store/types";
import { store } from '../../store';
import { FirebaseEngineService } from '../../services/firebase-engine';
import { from } from 'rxjs';

const firebaseEngineService = new FirebaseEngineService();

export const login = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const _user: IPlayer = new Player(
      result.user.email,
      result.user.displayName,
      result.user.photoURL
    );
    store.setUser(_user);
    store.setStatus(AppStatus.AUTHENTICATED);
  } catch (err) {
    console.log(err);
  }
};

export const handleRoomName = (roomName: string) => {
  store.setRoomName(roomName)
}

export const handleFixRoom = (key: string, roomName: string) => {
  if (key === 'Enter' || key === 'Escape') {
    createRoom(roomName);
  }
}

export const logout = () => {
  store.reset();
}

export const createRoom = (roomName: string) => {
  store.setHasRoomNameFixed(true);
  firebaseEngineService.checkRoom(roomName)
    .subscribe((gameState) => {
      if (!gameState.exists) {
        from(firebaseEngineService.createRoom(roomName))
          .subscribe(() => console.log(`${roomName} creada!`));
      }
    });
}

export const startGame = () => {
  console.log('startGame edit me!');
}
