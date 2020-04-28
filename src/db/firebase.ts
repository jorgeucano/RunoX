import { Player } from "../models/player.model";
import { login } from "../index";
import { DocumentSnapshot } from "@google-cloud/firestore";

export const firebase = require('firebase');
export var db: any;
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

export const checkRoomInFirebase = (roomName: string, user: Player) => {
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
            console.log('data para enviar', _data);
            roomRef.doc(roomName).set(_data, {merge: true}).then((doc: any) => {
                console.log(doc);
            });
        } else {
            // si la sala no existe, la creo y lo pongo como encargado de la sala
            console.log("No such document!");
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
        roomData$(roomName);
    }).catch((error: any) => {
        console.log("Error getting document:", error);
    });
}

export const roomData$ = (roomName: string) => {
    const docRef = db.collection("rooms").doc(roomName);
    docRef.onSnapshot({
        includeMetadataChanges: true
    }, (doc: any) => {
        console.log(`observable data ${JSON.stringify(doc.data())}`);
        // TODO: Facu aca necesitamos ejecutar las acciones dependiendo que pasa

        // agregar a los jugadores

        // empezar la partida

        // entrega de nueva carta

        // +2

        // +4

        // cambio de color 

        // etc
    });
}

export const roomUpdate = (roomName: string, update: any) => {
    const docRef = db.collection("rooms").doc(roomName);
    const roomRef = db.collection("rooms");
    const _data = {};
    roomRef.doc(roomName).set(_data, {merge: true}).then((doc: any) => {
        console.log(doc);
    });
}