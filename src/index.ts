import "./styles/styles.css";

import { fromEvent, merge } from "rxjs";
import { map, filter } from "rxjs/operators";
import { Player } from "./models/player.model";
import { GameEngine } from "./game-engine";
import { GameEvents } from "./events/game-events";
import { GameEventName } from "./events/game-events.enum";

const engine = GameEngine.getInstance();
const events = GameEvents.getInstance();

const _players = document.getElementById("players");
const _stack = document.getElementById("stack");
const _turn = document.getElementById("turn");

// TODO: analizar donde debe ser agregado en el state
let selectedCardId = "";

engine.join([
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

events.on(GameEventName.GAME_STARTED, () => {
  drawPlayersCards();

  drawStack();

  drawTurn();
});

events.on(GameEventName.AFTER_PLAY_CARD, () => {
  selectedCardId = "";

  drawPlayersCards();

  drawStack();

  drawTurn();
});

events.on(GameEventName.AFTER_TAKE_CARD, () => {
  drawPlayersCards();

  drawTurn();
});

engine.start();

// @ts-ignore
const getElement = (id: string): HTMLElement => document.getElementById(id);
// @ts-ignore
const fromClick = (id: string) => fromEvent(getElement(id), "click");
const fromClickMap = (id: string, fn: () => any) => fromClick(id).pipe(map(fn));

const buttons$ = merge(
  fromClickMap("button-take", () => engine.takeCard()),
  fromClickMap("button-play", () =>
    // @ts-ignore
    engine.playCard(engine.playerTurn?.id, selectedCardId)
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

  engine.players.forEach((player) => {
    const playerDiv = document.createElement("div");

    playerDiv.append(`Mano de ${player.name}:`);

    playerDiv.setAttribute("id", player.id);

    player.hand.cards.forEach((card) => {
      const _hand = document.createElement("div");

      _hand.setAttribute("id", `${card.id}`);

      _hand.setAttribute("class", `carta ${card.sprite}`);

      playerDiv.appendChild(_hand);
    });

    _players?.appendChild(playerDiv);

    setPlayerClicks(player.id);
  });
}

/** Dibuja el stack
 * TODO: serparar
 * TODO: observar los cambios de gameState.stack.cardOnTop
 */
function drawStack() {
  if (!engine.stackCard) {
    return;
  }

  while (_stack?.lastElementChild) {
    _stack?.removeChild(_stack?.lastElementChild);
  }

  const stackTitleDiv = document.createElement("div");

  stackTitleDiv.append(`La carta en la cima del stack es:`);

  const stackCardDiv = document.createElement("div");

  stackCardDiv.setAttribute("class", `carta ${engine.stackCard.sprite}`);

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
      filter(() => id === engine.playerTurn?.id),
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
function drawTurn() {
  if (!engine.playerTurn) {
    return;
  }

  while (_turn?.lastElementChild) {
    _turn?.removeChild(_turn?.lastElementChild);
  }

  const turnDiv = document.createElement("div");

  _players?.querySelectorAll(".player-select").forEach((el) => {
    el.classList.remove("player-select");
    el.classList.remove("player-select-button");
  });

  document.getElementById(engine.playerTurn.id)?.classList.add("player-select");
  document
    .getElementById(engine.playerTurn.id)
    ?.classList.add("player-select-button");

  turnDiv.append(`Es el turno de: ${engine.playerTurn.name}`);

  _turn?.appendChild(turnDiv);
}
