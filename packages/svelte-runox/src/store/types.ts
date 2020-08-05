import type { IPlayer } from '@runox-game/game-engine/lib/models/player.model';

export enum AppStatus {
  AUTHENTICATED,
  AUTHENTICATING,
  UNAUTHENTICATED,
  UNINITIALIZED,
}

export interface IState {
  hasRoomNameFixed: boolean;
  isOwner: boolean,
  roomName: string | null,
  status: AppStatus;
  user: IPlayer | null,
}

export interface IStore {
  subscribe: any,
  setHasRoomNameFixed: (hasRoomNameFixed: boolean) => void,
  setIsOwner: (isOwners: boolean) => void,
  setRoomName: (roomName: string) => void,
  setStatus: (status: AppStatus) => void,
  setUser: (user: IPlayer) => void,
  reset: () => void
}
