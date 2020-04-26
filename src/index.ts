import "./styles/styles.css";

import { fromEvent, merge, pipe } from "rxjs";
import { map, filter } from "rxjs/operators";
import { Player } from "./models/player.model";
import { GameEngine } from "./game-engine";
import { CardComponent } from './components/card/card.component';
import { isBuffer } from "util";

const game = GameEngine.getInstance();

const _players = document.getElementById("players");
const _stack = document.getElementById("stack");
const _turn = document.getElementById("turn");


// TODO: analizar donde debe ser agregado en el state
let selectedCardId = "";

game.join([
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
]);

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
  debugger
  selectedCardId = "";
  drawPlayersCards();
  drawStack();
});

game.events.afterTakeCard.subscribe(() => {
  drawPlayersCards();
});

game.start();

// @ts-ignore
const getElement = (id: string): HTMLElement => document.getElementById(id);

// @ts-ignore
const fromClick = (id: string) => fromEvent(getElement(id), "click");
const fromClickMap = (id: string, fn: () => any) => fromClick(id).pipe(map(fn));

const buttons$ = merge(
  fromClickMap("button-take", () => game.takeCard()),
  /* fromClickMap("button-play", () =>
    // @ts-ignore
    game.playCard(game.playerTurn?.id, selectedCardId)
  ) */
);

buttons$.subscribe();

const getPlayButtons = (): HTMLCollectionOf<Element> => document.getElementsByClassName('button-play-card')
const playButtons = Array.from(getPlayButtons()).map(element => {
  return fromEvent(element, "click").pipe(
    map(element => {
      // @ts-ignore
      game.playCard(game.playerTurn?.id, element.target.dataset.card)
    })
  )
})

playButtons.forEach(element => {
  element.subscribe()
});


/** Dibuja a los jugadores con su respectiva mano
 * TODO: separar
 */
function drawPlayersCards() {
  while (_players?.lastElementChild) {
    _players?.removeChild(_players?.lastElementChild);
  }

  game.players.forEach((player) => {
    if (game.playerTurn?.id === player.id) {
      const playerDiv = document.createElement("div");
      playerDiv.setAttribute("id", player.id);
      playerDiv.setAttribute("class", "player");
  
      const playerCards = document.createElement("div");
      playerCards.setAttribute("class", "player-cards");
      player.hand.cards.forEach((card) => {
        const _card = new CardComponent(card.id, card.sprite);
        playerCards.appendChild(_card.element);
      });
      playerDiv.appendChild(playerCards);

      _players?.appendChild(playerDiv);
      setPlayerClicks(game.playerTurn?.id);
    }
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
  console.log("setPlayerClicks", id)
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

        document.getElementById(cardId)?.classList.add("carta-selected");

        selectedCardId = cardId;
      } catch (e) {}
    });
}

/** Dibuja el nombre del current player */
function drawTurn(player: Player) {
  while (_turn?.lastElementChild) {
    _turn?.removeChild(_turn?.lastElementChild);
  }

  const turnDiv = document.createElement("div");

  _players?.querySelectorAll(".player-select").forEach((el) => {
    el.classList.remove("player-select");
    el.classList.remove("player-select-button");
  });

  document.getElementById(player.id)?.classList.add("player-select");
  document.getElementById(player.id)?.classList.add("player-select-button");
  turnDiv.append(`Es el turno de: ${player.name}`);
  _turn?.appendChild(turnDiv);
}
