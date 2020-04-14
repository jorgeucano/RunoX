import "./styles/styles.css";

import { fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";
import { GameState } from "./models/game-state.model";
import { BuildDeckCommand } from "./commands/build-deck.command";
import { Player } from "./models/player.model";
import { FinalizeTurnCommand } from "./commands/finalize-turn.command";
import { StartGameCommand } from "./commands/start-game.command";
import { TakeDeckCardCommand } from "./commands/take-deck-card.command";
import { AddPlayersCommand } from "./commands/add-players.command";

const gameState = new GameState();

const buildDeckCommand = new BuildDeckCommand();

buildDeckCommand.execute(gameState);

const _players = document.getElementById("players");
const _stack = document.getElementById("stack");
const _turn = document.getElementById("turn");

const addPlayersCommand = new AddPlayersCommand([
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

addPlayersCommand.execute(gameState);

const startGameCommand = new StartGameCommand();

startGameCommand.execute(gameState);

drawPlayersCards();

drawStack();

drawTurn();

/**
 * Finaliza el turno del currentPlayer
 */
const buttonNext = document.getElementById("button-next");
// @ts-ignore
const _next = fromEvent(buttonNext, "click").subscribe((x: any) => {
  const finalizeTurnCommand = new FinalizeTurnCommand();

  finalizeTurnCommand.execute(gameState);

  clearCardSelection();

  toggleTakeButton();

  drawTurn();
});

/**
 * Toma una carta y la asigna al currentPlayer
 */
const buttonTake = document.getElementById("button-take");
// @ts-ignore
const _take = fromEvent(buttonTake, "click").subscribe((x: any) => {
  const takeDeckCardCommand = new TakeDeckCardCommand();

  takeDeckCardCommand.execute(gameState);

  toggleTakeButton();

  drawPlayersCards();
});

/** Dibuja a los jugadores con su respectiva mano
 * TODO: separar
 */
function drawPlayersCards() {
  while (_players?.lastElementChild) {
    _players?.removeChild(_players?.lastElementChild);
  }

  gameState.playersGroup.players.forEach((player) => {
    const playerDiv = document.createElement("div");

    playerDiv.append(`Mano de ${player.name}:`);

    playerDiv.setAttribute("id", player.id);

    player.hand.cards.forEach((card) => {
      const _hand = document.createElement("div");

      _hand.setAttribute("class", `carta ${card.id}`);

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
  if (!gameState.stack.cardOnTop) {
    return;
  }

  while (_stack?.lastElementChild) {
    _stack?.removeChild(_stack?.lastElementChild);
  }

  const stackTitleDiv = document.createElement("div");

  stackTitleDiv.append(`La carta en la cima del stack es:`);

  const stackCardDiv = document.createElement("div");

  stackCardDiv.setAttribute("class", `carta ${gameState.stack.cardOnTop.id}`);

  stackTitleDiv.appendChild(stackCardDiv);

  _stack?.appendChild(stackTitleDiv);
}

function setPlayerClicks(id: string) {
  const _player = document.getElementById(id);
  // @ts-ignore
  fromEvent(_player, "click")
    .pipe(
      filter(() => id === gameState.turn.player?.id),
      map((v) => {
        // @ts-ignore
        return v.target.className.replace("carta ", "");
      })
    )
    .subscribe((card: any) => {
      /*
       primero queremos iterar la mano para remover la clase carta-select
       luego vamos a agregar la clase a la carta que tiene nuevo click
      */
      try {
        _player?.querySelectorAll(".carta-select").forEach((el) => {
          el.classList.remove("carta-select");
        });
        _player?.querySelector(`.${card}`)?.classList.add("carta-select");
      } catch (e) {}
    });
}

/** Dibuja el nombre del current player */
function drawTurn() {
  if (!gameState.turn.player) {
    return;
  }

  while (_turn?.lastElementChild) {
    _turn?.removeChild(_turn?.lastElementChild);
  }

  const turnDiv = document.createElement("div");

  turnDiv.append(`Es el turno de: ${gameState.turn.player.name}`);

  _turn?.appendChild(turnDiv);
}

/** Limpia la seleccion de cartas en la partida */
function clearCardSelection() {
  _players?.querySelectorAll(".carta-select").forEach((el) => {
    el.classList.remove("carta-select");
  });
}

/** Activa o desactiva el boton de tomar cartas */
function toggleTakeButton() {
  const takeButton = document.getElementById("button-take") as HTMLInputElement;

  takeButton.disabled = !takeButton.disabled;
}
