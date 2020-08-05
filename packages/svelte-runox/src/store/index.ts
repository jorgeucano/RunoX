import { writable } from 'svelte/store';

import type { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import { AppStatus, IState, IStore } from './types';

const initialState: IState = {
  hasRoomNameFixed: false,
  isOwner: false,
  roomName: null,
  status: AppStatus.UNINITIALIZED,
  user: null
}

const STORE_KEY = 'RunoxSvelte';

function createStore(): IStore {
  const { subscribe, set, update } = writable(initialState);

  const _json = localStorage.getItem(STORE_KEY);

  if (_json) {
    set(JSON.parse(_json));
  }

  const _update = (target: string, value: any) => {
    update(state => {
      const newState = Object.assign({}, { ...state, [target]: value })
      localStorage.setItem(STORE_KEY, JSON.stringify(newState));
      return newState;
    });
  }

  return {
    subscribe,
    setHasRoomNameFixed: (value: boolean) => _update('hasRoomNameFixed', value),
    setIsOwner: (value: boolean) => _update('isOwner', value),
    setRoomName: (value: string) => _update('roomName', value),
    setStatus: (value: AppStatus) => _update('status', value),
    setUser: (value: IPlayer) => _update('user', value),
    reset: () => {
      localStorage.setItem(STORE_KEY, JSON.stringify(initialState));
      set(initialState)
    }
  }
}

export const store = createStore();
