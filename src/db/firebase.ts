import { Player } from "../models/player.model";
import { login, pushUsers, startGame } from "../index";
// import { DocumentSnapshot } from "@google-cloud/firestore";

export const firebase = require('firebase');
export var db: any;
let gameStart = false;
let roomName = '';
let _data$: any;
export const initializeFirebase = () => {
   // TODO: Replace the following with your app's Firebase project configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAZX1DilyM9IY01_xFa2pE4ull7FYOsQ00",
      authDomain: "runox-card.firebaseapp.com",
      databaseURL: "https://runox-card.firebaseio.com",
      projectId: "runox-card",
      storageBucket: "runox-card.appspot.com",
      messagingSenderId: "608707088831",
      appId: "1:608707088831:web:f204f1e44046d59d23d10a",
      measurementId: "G-RVDLEJNBM9"
    }
  firebase.initializeApp(firebaseConfig); 
  db = firebase.firestore();
  firebaseLogin();
}


export const firebaseLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result: any) => {
      // var token = result.credential.accessToken;
      var user = result.user;  
      login(user);
    }).catch((error: any) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert(errorMessage);
    });
  }

export const checkRoomInFirebase = (_roomName: string, user: Player) => {
    roomName = _roomName;
    const docRef = db.collection("rooms").doc(roomName);
    const roomRef = db.collection("rooms");
    docRef.get().then((doc:any) => {
        //stupid firebase, el object.assign es porque FIREBASE NOS OBLIGA
        let nu: any = Object.assign({}, user);
        nu.hand = Object.assign({}, user.hand);
        if (doc.exists) {
            console.log('exist doc', doc.data());
            const _data = doc.data();
            if (_data.players.find((x: any) => x.id === nu.id)) {
                console.log('ya existe el user');
            } else {
                _data.players.push(nu);
            }
            roomRef.doc(roomName).set(_data, {merge: true}).then((doc: any) => {
                console.log(doc);
            });
        } else {
            // si la sala no existe, la creo y lo pongo como encargado de la sala
            const doc = Object.assign({}, {
                players: [nu],
                start: false,
                stack: [],
                winner: ''
            });
            console.log(doc);
            roomRef.doc(roomName).set(doc).then((doc: any) => {
                console.log(doc);
            });
        }
        roomData$();
    }).catch((error: any) => {
        console.log("Error getting document:", error);
    });
}

export const roomData$ = () => {
    const docRef = db.collection("rooms").doc(roomName);
    docRef.onSnapshot({
        includeMetadataChanges: true
    }, (doc: any) => {
        _data$ = doc.data();
        console.log(`observable data ${JSON.stringify(doc.data())}`);
        // TODO: Facu aca necesitamos ejecutar las acciones dependiendo que pasa

        // agregar a los jugadores
        pushUsers(_data$.players);
        // empezar la partida
        if (_data$.start && !gameStart) {
            gameStart = true;
            const startbutton = document.getElementById('button-start');
            // @ts-ignore
            startbutton.style.display = 'none';
            startGame();
        }
        // entrega de nueva carta

        // +2

        // +4

        // cambio de color 

        // etc
    });
}

/**
 * cosas que necesitamos updetear
 * las manos, el stack y algunas cosas mas ... pero siempre deberiamos trabajar sobre el mismo mazo
 */
export const roomStart = () => {
    const docRef = db.collection("rooms").doc(roomName);
    const roomRef = db.collection("rooms");
    console.log(_data$);
    _data$.start = true;
    roomRef.doc(roomName).set(_data$, {merge: true}).then((doc: any) => {
         console.log(doc);
    });
}