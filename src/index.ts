import "./styles/styles.css";

import { fromEvent } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { Player } from "./models/player.model";
import {
  initializeFirebase,
  firebaseUpdateState,
  setWinner,
} from "./db/firebase";

import { drawTurn, drawStack, drawPlayersCards } from "./ui";
import { GameEngine } from "./game-engine";

const game = GameEngine.getInstance();
let globalPlayer: Player;

game.events.afterGameStart.subscribe(() => {
  firebaseUpdateState(game.gameState).then(() => {
    updateMainLayout();
  });
});

game.events.beforeTurn.subscribe((data) => {
  firebaseUpdateState(game.gameState).then(() => {
    drawTurn(game, data.player);
  });
});

game.events.afterPlayCard.subscribe(() => {
  firebaseUpdateState(game.gameState).then(() => {
    drawPlayersCards(game, globalPlayer.id);
    drawStack(game);
  });
});

game.events.afterTakeCards.subscribe(() => {
  firebaseUpdateState(game.gameState).then(() => {
    drawPlayersCards(game, globalPlayer.id);

    // TODO: esto es un workaround acoplado al diseño actual
    // Cuando el jugador grita UNO! y no tiene 1 carta entonces se le suman 2,
    // como el dibujado se hace en el beforeTurn entonces necesitamos volver
    // a dibujar el turno del jugador aqui
    // @ts-ignore
    drawTurn(game, game.playerTurn);
  });
});

game.events.afterYellUno.subscribe(() => {
  firebaseUpdateState(game.gameState);
});

game.events.gameEnd.subscribe((data) => {
  firebaseUpdateState(game.gameState).then(() => {
    alert(
      `El jugador ${data.winner.name} ha ganado!! Su puntaje es: ${data.score}`
    );

    setWinner(data.winner.name, data.score);
  });
});

// @ts-ignore
const getElement = (id: string): HTMLElement => document.getElementById(id);
// @ts-ignore
const fromClick = (id: string) => fromEvent(getElement(id), "click");

fromClick("button-take")
  .pipe(
    filter(() => game.playerTurn?.id === globalPlayer.id),
    switchMap(() => game.takeCard())
  )
  .subscribe();

fromClick("button-uno")
  // @ts-ignore
  .pipe(switchMap(() => game.uno(globalPlayer.id)))
  .subscribe();

export const updateMainLayout = () => {
  drawPlayersCards(game, globalPlayer.id);
  drawStack(game);
  // @ts-ignore
  drawTurn(game, game.gameState.turn.player);
};

export const setGlobalPlayer = (user: Player) => {
  globalPlayer = user;
};

export const startGame = () => {
  game.start().subscribe(
    () => {},
    (error: string) => {
      alert(error);
    }
  );
};

initializeFirebase(game);
