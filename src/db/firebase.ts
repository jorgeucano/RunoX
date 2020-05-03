import { updateMainLayout, setGlobalPlayer } from "../index";
import { GameEngine } from "../game-engine";
import { Player } from "../models/player.model";
import { getUrlSearch } from "../utils/utils";
import { drawStartLayout } from "../ui";

// @ts-ignore
export const firebase = window.firebase;
export var db: any;

let game: GameEngine;
let gameStart = false;
let roomName = "";
let _data$: any;

export const initializeFirebase = (gameEngine: GameEngine) => {
  game = gameEngine;
  // TODO: Replace the following with your app's Firebase project configuration
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: "AIzaSyAZX1DilyM9IY01_xFa2pE4ull7FYOsQ00",
      authDomain: "runox-card.firebaseapp.com",
      databaseURL: "https://runox-card.firebaseio.com",
      projectId: "runox-card",
      storageBucket: "runox-card.appspot.com",
      messagingSenderId: "608707088831",
      appId: "1:608707088831:web:f204f1e44046d59d23d10a",
      measurementId: "G-RVDLEJNBM9",
    };
    firebase.initializeApp(firebaseConfig);
  }

  db = firebase.firestore();

  firebaseLogin()
    .then((user) => {
      setGlobalPlayer(user);
      // @ts-ignore
      document.getElementById("button-start")?.style.display = "block";
      // @ts-ignore
      document.getElementById("google-login")?.style.display = "none";
      return enterToRoom(user);
    })
    .then(() => {
      drawStartLayout(game);
    });
};

export const firebaseLogin = (): Promise<Player> => {
  getUrlSearch();

  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    if (!user) {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result: any) => {
          const player = new Player(
            result.user.email,
            result.user.displayName,
            result.user.photoURL
          );

          return resolve(player);
        })
        .catch((error: any) => {
          console.error(`singIn error: ${error}`);

          return reject();
        });
    } else {
      return resolve(new Player(user.id, user.name, user.pic));
    }
  });
};

export const enterToRoom = (user: Player) => {
  roomName = getUrlSearch();
  const docRef = db.collection("rooms").doc(roomName);
  const roomRef = db.collection("rooms");

  return new Promise((resolve, reject) => {
    docRef
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          const _data = doc.data();

          if (
            _data.playersGroup.players.some(
              (player: any) => player.id === user.id
            )
          ) {
            console.warn("ya existe el user");

            // Aqui re-populamos el estado del juego con lo que hay en firebase
            if (game.gameStateAsJSON.id !== _data.id) {
              game.overrideInternalState(_data);
            }
          } else {
            if (_data.start) {
              alert("La partida ya ha comenzado");

              return reject();
            }

            if (_data.playersGroup.players.length > 5) {
              alert("La sala esta llena");

              return reject();
            }

            // Aqui re-populamos el estado del juego con lo que hay en firebase
            if (game.gameStateAsJSON.id !== _data.id) {
              game.overrideInternalState(_data);
            }

            game.join([user]).subscribe(
              () => {
                firebaseUpdateState(game.gameStateAsJSON);

                return resolve();
              },
              (error: string) => {
                alert(error);
              }
            );
          }

          roomData$();

          resolve();
        } else {
          // si la sala no existe, la creo y
          // TODO: lo pongo como encargado de la sala

          game.join([user]).subscribe(
            () => {
              return resolve();
            },
            (error: string) => {
              alert(error);
            }
          );

          let _state = game.gameStateAsJSON;
          _state = JSON.parse(JSON.stringify(_state));

          const room = Object.assign(
            {},
            {
              ..._state,
              start: false,
              winner: null,
            }
          );

          roomRef
            .doc(roomName)
            .set(room)
            .then((doc: any) => {
              roomData$();

              return resolve();
            });
        }
      })
      .catch((error: any) => {
        console.log("Error getting document:", error);

        reject();
      });
  });
};

export const roomData$ = () => {
  const docRef = db.collection("rooms").doc(roomName);

  docRef.onSnapshot(
    {
      includeMetadataChanges: true,
    },
    (doc: any) => {
      _data$ = doc.data();

      // empezo la partida
      if (_data$.start && !gameStart) {
        gameStart = true;

        const chat = document.getElementById("chat");
        const deck = document.getElementById("deck");
        const stack = document.getElementById("stack-container");
        const playersTitle = document.getElementById("players-title");
        const runoxbutton = document.getElementById("button-uno");
        const startbutton = document.getElementById("button-start");

        // @ts-ignore
        chat.style.display = "flex";
        // @ts-ignore
        deck.style.display = "flex";
        // @ts-ignore
        stack.style.display = "flex";
        // @ts-ignore
        playersTitle.style.display = "block";
        // @ts-ignore
        runoxbutton.style.display = "block";
        // @ts-ignore
        startbutton.style.display = "none";
      }

      if (_data$.winner !== null) {
        alert(
          `El jugador ${_data$.winner.name} ha ganado!! Su puntaje es: ${_data$.winner.score}`
        );
      }

      // Aqui re-populamos el estado del juego con lo que hay en firebase
      if (game.gameStateAsJSON.id === _data$.id) {
        game.overrideInternalState(_data$);
      }

      updateMainLayout();
    }
  );
};

/**
 * cosas que necesitamos updetear
 * las manos, el stack y algunas cosas mas ... pero siempre deberiamos trabajar sobre el mismo mazo
 */
export const roomStart = (): Promise<any> => {
  const roomRef = db.collection("rooms");

  return roomRef.doc(roomName).set({ start: true }, { merge: true });
};

export const setWinner = (name: string, score: number): Promise<any> => {
  const roomRef = db.collection("rooms");

  return roomRef.doc(roomName).set(
    {
      winner: {
        name,
        score,
      },
    },
    { merge: true }
  );
};

export const firebaseUpdateState = (state: any): Promise<any> => {
  const _state = JSON.parse(JSON.stringify(state));

  const docRef = db.collection("rooms").doc(roomName);

  return docRef.set(_state, { merge: true });
};
