import "./ui/styles/styles.css";

import { fromEvent } from "rxjs";
import { filter, switchMap, first } from "rxjs/operators";
import { initializeFirebase, firebaseUpdateState, setWinner, createAndSendMessage } from "./db/firebase";

import { drawTurn, drawStack, drawPlayersCards } from "./ui";
import { getUrlSearch, showInfoAlert, showErrorAlert } from "./ui/utils/utils";
import { Player } from "@runox-game/game-engine/lib/models/player.model";
import { GameEngine } from "@runox-game/game-engine";
import { GameModes } from "@runox-game/game-engine/lib/models/game-modes";

getUrlSearch();

const game = new GameEngine();
let globalPlayer: Player;

game.events.afterGameStart.subscribe(() => {
  firebaseUpdateState(game.gameStateAsJSON).then(() => {
    updateMainLayout();
  });
});

game.events.beforeTurn.subscribe((data) => {
  firebaseUpdateState(game.gameStateAsJSON).then(() => {
    drawTurn(game, data.player as Player);
  });
});

game.events.afterPlayCard.subscribe(() => {
  firebaseUpdateState(game.gameStateAsJSON).then(() => {
    drawPlayersCards(game, globalPlayer.id);
    drawStack(game);
  });
});

game.events.afterTakeCards.subscribe(() => {
  firebaseUpdateState(game.gameStateAsJSON).then(() => {
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
  firebaseUpdateState(game.gameStateAsJSON);
});

game.events.gameEnd.subscribe((data) => {
  firebaseUpdateState(game.gameStateAsJSON).then(() => {
    showInfoAlert(`El jugador ${data.winner.name} ha ganado!! Su puntaje es: ${data.score}`);

    setWinner(data.winner.name, data.score);
  });
});

// @ts-ignore
const getElement = (id: string): HTMLElement => document.getElementById(id);
// @ts-ignore
const fromClick = (id: string) => fromEvent(getElement(id), "click");
// @ts-ignore
const fromKeyUp = (id: string) => fromEvent(getElement(id), "keyup").pipe(filter(e => e.keyCode == 13));

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

fromClick("button-send-message")
   // @ts-ignore
  .pipe(switchMap(() => createAndSendMessage(globalPlayer)))
  .subscribe();

  fromKeyUp("input-write-message")
   // @ts-ignore
  .pipe(switchMap(() => createAndSendMessage(globalPlayer)))
  .subscribe();

export const updateMainLayout = () => {
  drawPlayersCards(game, globalPlayer.id);
  drawStack(game);
  // @ts-ignore
  drawTurn(game, game.playerTurn);

  showTurnNotification();
};

export const setGlobalPlayer = (user: Player) => {
  globalPlayer = user;
};

export const startGame = () => {
  const gameModes: GameModes = {
    randomTakeDeckCard: false,
  };

  game.start(gameModes).subscribe(
    () => {},
    (error: string) => {
      showErrorAlert(error);
    }
  );
};

export const showTurnNotification = () => {
  if (!window.Notification) {
    console.log("Las notificaciones no estan disponibles en el equipo");

    return;
  }

  window.Notification.requestPermission().then(() => {
    if (Notification.permission === "granted" && game.playerTurn?.id === globalPlayer.id) {
      const notification = new Notification(`${globalPlayer.name} es tu turno de jugar!`, {
        body: "Tus amigos estan esperando que juegues una carta",
        tag: "turnNotification",
        // TODO: mejorar la imagen que se muestra
        image: "./assets/images/logo2x.png",
        requireInteraction: false,
      });

      setTimeout(notification.close.bind(notification), 5000);
    }
  });
};

// @ts-ignore
document.getElementById("button-start")?.style.display = "block";

// @ts-ignore
fromClick("google-login")
  .pipe(first())
  .subscribe(() => {
    initializeFirebase(game);
  });
