import { Player } from '@runox-game/game-engine/lib/models/player.model';
import type { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import { getContext } from 'svelte';
import { store } from '../store';
import { AppStatus } from "../store/types";

export const login = async () => {
  const app = getContext('firebase').getFirebase();
  const provider = new app.auth.GoogleAuthProvider();
  try {
    const result = await app.auth().signInWithPopup(provider);
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
  console.log(roomName);
  // store.setHasRoomNameFixed(true);
  // firebaseEngineService.checkRoom(roomName)
  //   .subscribe((gameState) => {
  //     if (!gameState.exists) {
  //       from(firebaseEngineService.createRoom(roomName))
  //         .subscribe(() => console.log(`${roomName} creada!`));
  //     }
  //   });
}

export const startGame = () => {
  console.log('startGame edit me!');
}
