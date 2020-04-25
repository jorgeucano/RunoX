import "./styles/styles.css";

import { fromEvent, merge, combineLatest } from "rxjs";
import { map, filter, pluck, mapTo, tap, first } from "rxjs/operators";
import { Player } from "./models/player.model";
import { GameEngine } from "./game-engine";

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

game.events.afterPlayCard.subscribe(() => {
  selectedCardId = "";

  drawPlayersCards();

  drawStack();
});

game.events.afterTakeCard.subscribe(() => {
  drawPlayersCards();
});

game.events.beforeTurn.subscribe((data) => {
  drawTurn(data.player);
});

game.start();

// @ts-ignore
const getElement = (id: string): HTMLElement => document.getElementById(id);
// @ts-ignore
const fromClick = (id: string) => fromEvent(getElement(id), "click");
const fromClickMap = (id: string, fn: () => any) => fromClick(id).pipe(map(fn));

const fromKeyboard = () => fromEvent(document, "keyup");
const fromKeyboardMapToTrue = (code: string) => fromKeyboard().pipe(
  pluck("code"),
  filter(c => c === code),
  mapTo(true)
  );
  const fromKeybordClickMap = (code: string, id: string, fn: ()=> any) => 
  merge(fromKeyboardMapToTrue(code), fromClick(id)).pipe(map(fn));

const buttons$ = merge(
  // 83 es la tecla s y 68 la tecla d.
  fromKeybordClickMap("KeyS", "button-take", () => game.takeCard()),
  // @ts-ignore
  fromKeybordClickMap("KeyD", "button-play", () => game.playCard(game.playerTurn?.id, selectedCardId)),
  // @ts-ignore
  fromClickMap("button-uno", () => game.uno(game.playerTurn))
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

    const playerTitleDiv = document.createElement("div");
    playerTitleDiv.append(`Mano de ${player.name}:`);
    playerDiv.appendChild(playerTitleDiv);

    const playerCards = document.createElement("div");
    player.hand.cards.forEach((card) => {
      const _hand = document.createElement("div");
      _hand.setAttribute("id", `${card.id}`);
      _hand.setAttribute("class", `carta ${card.sprite}`);
      playerCards.appendChild(_hand);
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

  while (_stack?.lastElementChild) {
    _stack?.removeChild(_stack?.lastElementChild);
  }

  const stackTitleDiv = document.createElement("div");

  stackTitleDiv.append(`La carta en la cima del stack es:`);

  const stackCardDiv = document.createElement("div");

  stackCardDiv.setAttribute("class", `carta ${game.stackCard.sprite}`);

  stackTitleDiv.appendChild(stackCardDiv);

  _stack?.appendChild(stackTitleDiv);
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
       primero queremos iterar la mano para remover la clase carta-select
       luego vamos a agregar la clase a la carta que tiene nuevo click
      */
      try {
        _player?.querySelectorAll(".carta-select").forEach((el) => {
          el.classList.remove("carta-select");
        });

        document.getElementById(cardId)?.classList.add("carta-select");

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
