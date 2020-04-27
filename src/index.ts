import "./styles/styles.css";

import { fromEvent, merge } from "rxjs";
import { map, filter, pluck, mapTo } from "rxjs/operators";
import { Player } from "./models/player.model";
import { GameEngine } from "./game-engine";
import { CardComponent } from './components/card/card.component';
import { isBuffer } from "util";
import { Avatar } from "./components/avatar/avatar.component";

const game = GameEngine.getInstance();

const _players = document.getElementById("players");
const _stack = document.getElementById("stack");
const _turn = document.getElementById("turn");
const _avatars = document.getElementById("avatars");


// TODO: analizar donde debe ser agregado en el state
let selectedCardId = "";

game
  .join([
    new Player(
      "jorge1234",
      "Jorge",
      "https://pbs.twimg.com/profile_images/1229508740510109697/Ww22knVc_400x400.jpg"
    ),
    new Player(
      "calel1234",
      "Calel",
      "https://pbs.twimg.com/profile_images/1229508740510109697/Ww22knVc_400x400.jpg"
    ),
    new Player(
      "Facu1234",
      "Facu",
      "https://pbs.twimg.com/profile_images/1196581886916747264/PaMavazA_400x400.jpg"
    ),
    new Player(
      "nikomendo",
      "Nicolas",
      "https://pbs.twimg.com/profile_images/1106827262907899904/S1BXkb04_400x400.jpg"
    ),
  ])
  .subscribe(
    () => {},
    (error: string) => {
      alert(error);
    }
  );

game.events.afterGameStart.subscribe(() => {
  drawPlayersCards();
  drawStack();
  // @ts-ignore
  drawTurn(game.playerTurn);
});

game.events.beforeTurn.subscribe((data) => {
  drawTurn(data.player);
});

game.events.afterPlayCard.subscribe(() => {
  selectedCardId = "";
  drawPlayersCards();
  drawStack();
});

game.events.afterTakeCards.subscribe(() => {
  drawPlayersCards();

  // TODO: esto es un workaround acoplado al diseño actual
  // @ts-ignore
  drawTurn(game.playerTurn);
});

game.events.beforeTurn.subscribe((data) => {
  drawTurn(data.player);
});

game.events.gameEnd.subscribe((data) => {
  alert(
    `El jugador ${data.winner.name} ha ganado!! Su puntaje es: ${data.score}`
  );

  window.location.reload();
});

game.start().subscribe(
  () => {},
  (error: string) => {
    alert(error);
  }
);

/**
 * Observamos el click de todos los botones "JUGAR CARTA"
 * @TODO Seguro hay una manera más eficiente de hacerlo ...
 **/
/* const getPlayButtons = (): NodeListOf<Element> => document.querySelectorAll('.button-play-card')
const playButtons = Array.from(getPlayButtons()).map(element => {
  return fromEvent(element, "click").pipe(
    map(element => {
      // @ts-ignore
      game.playCard(game.playerTurn?.id, element.target.dataset.card)
    })
  )
}) */

// @ts-ignore
const getElement = (id: string): HTMLElement => document.getElementById(id);

// @ts-ignore
const fromClick = (id: string) => fromEvent(getElement(id), "click");
const fromClickMap = (id: string, fn: () => any) => fromClick(id).pipe(map(fn));

const fromKeyboard = () => fromEvent(document, "keyup");
const fromKeyboardMapToTrue = (code: string) =>
  fromKeyboard().pipe(
    pluck("code"),
    filter((c) => c === code),
    mapTo(true)
  );
const fromKeybordClickMap = (code: string, id: string, fn: () => any) =>
  merge(fromKeyboardMapToTrue(code), fromClick(id)).pipe(map(fn));

const buttons$ = merge(
  fromClickMap("button-take", () => game.takeCard()),
  // 83 es la tecla s y 68 la tecla d.
  fromKeybordClickMap("KeyS", "button-take", () =>
    game.takeCard().subscribe(
      () => {},
      (error: string) => {
        alert(error);
      }
    )
  ),
  fromKeybordClickMap("KeyD", "button-play", () =>
    // @ts-ignore
    game.playCard(game.playerTurn?.id, selectedCardId).subscribe(
      () => {},
      (error: string) => {
        alert(error);
      }
    )
  ),
  fromClickMap("button-uno", () =>
    // @ts-ignore
    game.uno(game.playerTurn).subscribe(
      () => {},
      (error: string) => {
        alert(error);
      }
    )
  )
);
buttons$.subscribe();


/** Dibuja a los jugadores con su respectiva mano
 * TODO: separar
 */
function drawPlayersCards() {
  while (_players?.lastElementChild) {
    _players?.removeChild(_players?.lastElementChild);
  }
  game.players.forEach((player) => {
    const playerDiv = document.createElement("div");
    playerDiv.setAttribute("id", player.id);
    playerDiv.setAttribute("class", "player");
    
    /*
    const playerTitle = document.createElement("div");
    playerTitle.setAttribute("class", "player-title");
    playerTitle.append(`Player: ${player.name}`)
    playerDiv.appendChild(playerTitle); 
    */
  
    const playerCards = document.createElement("div");
    playerCards.setAttribute("class", "player-cards");
    player.hand.cards.forEach((card) => {
      const _card = new CardComponent(card.id, card.sprite);
      playerCards.appendChild(_card.element);
    });
    playerDiv.appendChild(playerCards);
    
    _players?.appendChild(playerDiv);
    setPlayerClicks(player.id);
  });
}

/** Dibuja el stack
 * TODO: serparar
 * TODO: observar los cambios de gameState.stack.cardOnTop
 */
function drawStack() {
  if (!game.stackCard) {
    return;
  }
  
  if (!_stack) {
    console.error('No se encontró el elemento #stack')
    return;
  }

  const stackCardDiv = document.createElement("div");
  stackCardDiv.setAttribute("class", `carta ${game.stackCard.sprite}`);
  
  var rotacion = Math.floor(Math.random() * 20) + 10;
  rotacion *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

  stackCardDiv.style.transform = `rotate(${rotacion}deg)`;
  _stack.appendChild(stackCardDiv);
}

function setPlayerClicks(id: string) {
  const _player = document.getElementById(id);

  // @ts-ignore
  fromEvent(_player, "click")
    .pipe(
      // @ts-ignore
      filter((event) => event.target.classList.contains("carta")),
      filter(() => id === game.playerTurn?.id),
      map((event) => {
        // @ts-ignore
        return event.target.id;
      })
    )
    .subscribe((cardId: string) => {
      /*
       primero queremos iterar la mano para remover la clase carta-selected
       luego vamos a agregar la clase a la carta que tiene nuevo click
      */
      
      console.log('carta click!')

      try {
        _player?.querySelectorAll(".carta-selected").forEach((el) => {
          el.classList.remove("carta-selected");
        });

        const selectedCard = document.getElementById(cardId)
        selectedCard?.classList.add("carta-selected");
        const buttonPlay = selectedCard?.querySelector('.button-play-card');
        
        /**
         * @TODO Revisar esto por si los leaks
         */
        //@ts-ignore
        fromEvent(buttonPlay, 'click').subscribe(() => {
          //@ts-ignore
          game.playCard(game.playerTurn?.id, cardId)
        })

        selectedCardId = cardId;
      } catch (e) { }
    });
}

/** Dibuja el nombre del current player */
function drawTurn(player: Player) {
  console.log('drawTurn', player.id)

  while (_turn?.lastElementChild) {
    _turn?.removeChild(_turn?.lastElementChild);
  }

  const playersAvatars = document.createElement("div");
  playersAvatars.setAttribute('id', 'avatars')
  game.players.forEach(_player => {
    const avatar = new Avatar(_player, _player.hand.cards.length, _player.id === player.id);
    playersAvatars.appendChild(avatar.element);
  })

  const turnDiv = document.createElement("div");
  turnDiv.appendChild(playersAvatars);

  _players?.querySelectorAll(".player-select").forEach((el) => {
    el.classList.remove("player-select");
    el.classList.remove("player-select-button");
  });

  document.getElementById(player.id)?.classList.add("player-select");
  document.getElementById(player.id)?.classList.add("player-select-button");
  //turnDiv.append(`Es el turno de: ${player.name}`);
  _turn?.appendChild(turnDiv);
}

const firebase = require('firebase');
const firebaseui = require('firebaseui');
const initializeFirebase = () => {
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
    /*
     * export const firebaseConfig = { ...firebase config... }
     */
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 
  console.log('firebase');
  firebaseLogin();
}

const firebaseLogin = () => {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
}


// inicializamos firebase 
initializeFirebase();