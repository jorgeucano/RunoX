// import { Player } from "../models/player.model";
import { login, setUsers, startGame, drawTurn, drawStack } from "../index";
import { GameEngine } from "../game-engine";
import { Player } from "../models/player.model";

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
      measurementId: "G-RVDLEJNBM9"
    };
    firebase.initializeApp(firebaseConfig);
  }
  db = firebase.firestore();
  firebaseLogin();
};

export const firebaseLogin = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  const user = firebase.auth().currentUser;

  if (!user) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        // var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
        login(user);
      })
      .catch((error: any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(`singIn error: ${error}`);
        // alert(errorMessage);
      });
  }
};

export const checkRoomInFirebase = (_roomName: string, user: Player) => {
  roomName = _roomName;
  const docRef = db.collection("rooms").doc(roomName);
  const roomRef = db.collection("rooms");
  return new Promise((resolve, reject) => {
    docRef
      .get()
      .then((doc: any) => {
        let nu = user.parseObject();
        console.log("NEW USER", nu);

        if (doc.exists) {
          const _data = doc.data();
          if (_data.playersGroup.find((x: any) => x.id === nu.id)) {
            console.log("ya existe el user");
          } else {
            if (_data.playersGroup.length > 5) {
              alert("La sala esta llena");
              return reject();
            }
            _data.playersGroup.push(nu);
          }
          roomRef
            .doc(roomName)
            .set(_data, { merge: true })
            .then((doc: any) => {
              console.log(doc);
            });
        } else {
          // si la sala no existe, la creo y lo pongo como encargado de la sala
          const doc = Object.assign(
            {},
            {
              playersGroup: [nu],
              start: false,
              stack: [],
              winner: ""
            }
          );
          console.log(doc);
          roomRef
            .doc(roomName)
            .set(doc)
            .then((doc: any) => {
              console.log(doc);
            });
        }
        roomData$();
        return resolve();
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
      includeMetadataChanges: true
    },
    (doc: any) => {
      _data$ = doc.data()
      // TODO: Facu aca necesitamos ejecutar las acciones dependiendo que pasa
      // TODO: Cuando nuevos usuarios ingresan, las manos tienen que ser repartidas de nuevo,
      // osea que en todos deberia ejecutarse el startGame command || O NO?

      // agregar a los jugadores
      setUsers(_data$.playersGroup)

      // empezar la partida
      if (_data$.start && !gameStart) {
        gameStart = true
        const chat = document.getElementById('chat')
        const deck = document.getElementById('deck')
        const stack = document.getElementById('stack-container')
        const playersTitle = document.getElementById('players-title')
        const runoxbutton = document.getElementById('button-uno')
        const startbutton = document.getElementById('button-start')

        // @ts-ignore
        chat.style.display = 'flex'
        // @ts-ignore
        deck.style.display = 'flex'
        // @ts-ignore
        stack.style.display = 'flex'
        // @ts-ignore
        playersTitle.style.display = "block";
        // @ts-ignore
        runoxbutton.style.display = 'block'
        // @ts-ignore
        startbutton.style.display = 'none'

        startGame()
      }
      // Aqui re-populamos el estado del juego con lo que hay en firebase
      game.gameState.populateData(_data$)

      // agregar a los jugadores
      const _players = game.gameState.playersGroup.players
      // TODO Hay que cambiar _players[0] por el player actual
      // game.PlayerTurn viene con los datos a null
      if (_players.length) drawTurn(_players[0])

      // entrega de nueva carta

      // +2

      // +4

      // cambio de color

      // jugador dice uno

      // termina el juego
    }
  );
};

/**
 * cosas que necesitamos updetear
 * las manos, el stack y algunas cosas mas ... pero siempre deberiamos trabajar sobre el mismo mazo
 */
export const roomStart = () => {
  const roomRef = db.collection("rooms");
  _data$.start = true;
  roomRef
    .doc(roomName)
    .set(_data$, { merge: true })
    .then((doc: any) => {
      console.log(doc);
    });
};

export const sendCard = () => {
  const roomRef = db.collection("rooms");
  console.log(_data$);
  _data$.start = true;
  roomRef
    .doc(roomName)
    .set(_data$, { merge: true })
    .then((doc: any) => {
      console.log(doc);
    });
};

export const firebaseUpdateState = (state: any) => {
  let _state = state.parseState();
  _state = JSON.parse(JSON.stringify(_state));
  console.log(_state);
  // debugger;
  const docRef = db.collection("rooms").doc(roomName);
  docRef
    .set(_state, { merge: true })
    .then((doc: any) => {
      console.log(doc);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
