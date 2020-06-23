import { fromEvent } from 'rxjs'
import { first, filter, map, tap } from 'rxjs/operators'

import { CardComponent } from './components/card/card.component'
import { Avatar } from './components/avatar/avatar.component'

import { roomStart } from '../db/firebase'
import { startGame } from '../index'

// @ts-ignore
import { Sortable } from '@shopify/draggable'
import { GameEngine } from '@runox-game/game-engine'
import { Player } from '@runox-game/game-engine/lib/models/player.model'
import { Value } from '@runox-game/game-engine/lib/models/values.model'
import { Color } from '@runox-game/game-engine/lib/models/color.model'
import { showErrorAlert } from './utils/utils'

const _players = document.getElementById('players')
const _stack = document.getElementById('stack')
const _turn = document.getElementById('turn')

/** Dibuja el stack
 * TODO: serparar
 */
export function drawStack(game: GameEngine) {
  if (!game.stackCard) {
    return
  }

  if (!_stack) {
    console.error('No se encontró el elemento #stack')
    return
  }

  const stackCardElement = document.getElementById(
    `carta-stack-${game.stackCard.id}`
  )

  if (
    stackCardElement !== null &&
    `carta-stack-${game.stackCard.id}` === stackCardElement.id
  ) {
    // console.warn('La carta ya esta dibujada en la cima del stack')
    return;
  }

  const stackCardDiv = document.createElement('div')
  stackCardDiv.setAttribute('id', `carta-stack-${game.stackCard.id}`)
  stackCardDiv.setAttribute('class', `carta ${game.stackCard.sprite}`)

  var rotacion = Math.floor(Math.random() * 20) + 10
  rotacion *= Math.floor(Math.random() * 2) == 1 ? 1 : -1

  stackCardDiv.style.transform = `rotate(${rotacion}deg)`
  _stack.appendChild(stackCardDiv)
}

/** Dibuja a los jugadores con su respectiva mano
 * TODO: separar funciones de hacer primera vez el draw y la actualizacion cuando ya se esta jugando,
 * para no cargar mucho al DOM
 */
export function drawPlayersCards(game: GameEngine, globalPlayerId: string) {
  while (_players?.lastElementChild) {
    _players?.removeChild(_players?.lastElementChild)
  }

  const player = game.players.find((player) => player.id === globalPlayerId)

  const playerDiv = document.createElement('div')
  // @ts-ignore
  playerDiv.setAttribute('id', player?.id)
  playerDiv.setAttribute('class', 'player')

  const playerCards = document.createElement('div')
  playerCards.setAttribute('class', 'player-cards')
  player?.hand.cards
    .filter((card, index) => player?.hand.cards.indexOf(card) === index)
    .forEach((card) => {
      const _card = new CardComponent(card.id, card.sprite)

      playerCards.appendChild(_card.element)
    })

  playerDiv.appendChild(playerCards)

  _players?.appendChild(playerDiv)

  // @ts-ignore
  setPlayerClicks(game, player?.id)

  /**
   * Añadimos opción de reordenar las cartas.
   * Ahora mismo es un poco "inutil" ya que cuando pasa turno se mezclan de nuevo
   * pero cuando el jugador solo vea sus cartas deberían de permanecer ordenadas.
   **/
  new Sortable(document.querySelectorAll('.player-cards'), {
    draggable: '.carta',
    delay: 300,
  })
}

/** Dibuja los jugadores y la información del turno */
export function drawTurn(game: GameEngine, player?: Player) {
  while (_turn?.lastElementChild) {
    _turn?.removeChild(_turn?.lastElementChild)
  }

  const playersAvatars = document.createElement('div')
  playersAvatars.setAttribute('id', 'avatars')

  game.players.forEach((_player) => {
    const avatar = new Avatar(
      _player,
      _player.hand.cards.length,
      player && _player.id === player.id
    )

    playersAvatars.appendChild(avatar.element)
  })

  const turnDiv = document.createElement('div')
  turnDiv.appendChild(playersAvatars)

  _players?.querySelectorAll('.player-select').forEach((el) => {
    el.classList.remove('player-select')
    el.classList.remove('player-select-button')
  })

  if (player) {
    document.getElementById(player.id)?.classList.add('player-select')
    document.getElementById(player.id)?.classList.add('player-select-button')
  }

  _turn?.appendChild(turnDiv)
}

export function drawStartLayout(game: GameEngine) {
  // const chat = document.getElementById("chat");
  const deck = document.getElementById('deck')
  const stack = document.getElementById('stack')
  const playersTitle = document.getElementById('players-title')
  const runoxbutton = document.getElementById('button-uno')
  const startbutton = document.getElementById('button-start')

  // @ts-ignore
  fromEvent(startbutton, 'click')
    .pipe(first())
    .subscribe(() => {
      // @ts-ignore
      // chat.style.display = "flex";
      // @ts-ignore
      deck.style.display = 'flex'
      // @ts-ignore
      stack.style.display = 'flex'
      // @ts-ignore
      playersTitle.style.display = 'block'
      // @ts-ignore
      runoxbutton.style.display = 'block'
      // @ts-ignore
      startbutton.style.display = 'none'

      roomStart().then(() => {
        startGame()
      })
    })

  drawTurn(game)
}

function setPlayerClicks(game: GameEngine, id: string) {
  const _player = document.getElementById(id)

  // @ts-ignore
  fromEvent(_player, 'click')
    .pipe(
      // @ts-ignore
      filter((event) => event.target.classList.contains('carta')),
      filter(() => id === game.playerTurn?.id),
      // @ts-ignore
      map((event) => event.target.id)
    )
    .subscribe((cardId: string) => {
      /*
       primero queremos iterar la mano para remover la clase carta-selected
       luego vamos a agregar la clase a la carta que tiene nuevo click
      */

      try {
        _player?.querySelectorAll('.carta-selected').forEach((el) => {
          el.classList.remove('carta-selected')
        })

        const selectedCard = document.getElementById(cardId)
        selectedCard?.classList.add('carta-selected')
        const buttonPlay = selectedCard?.querySelector('.button-play-card')

        /**
         * @TODO Revisar esto por si los leaks
         */
        //@ts-ignore
        fromEvent(buttonPlay, 'click').subscribe(() => {
          const cardInPlayer = game.playerTurn?.hand.cards.find(
            (c) => c.id === cardId
          )

          if (!cardInPlayer) {
            return
          }

          if (
            cardInPlayer?.value === Value.WILDCARD ||
            cardInPlayer?.value === Value.PLUS_FOUR
          ) {
            let newColor

            const playerSelectColor = document.getElementById(
              'player-select-color'
            )
            // @ts-ignore
            playerSelectColor.style.display = 'block'
            //@ts-ignore
            // @ts-ignore
            fromEvent(playerSelectColor, 'click')
              .pipe(
                filter((event) =>
                  // @ts-ignore
                  event.target.classList.value.includes('button-')
                ),
                //filter(() => id === game.playerTurn?.id),
                // @ts-ignore
                map((event) => event.target.id),
                first()
              )
              .subscribe((newColor: any) => {
                cardInPlayer.setColor(newColor as Color)
                // @ts-ignore
                playerSelectColor.style.display = 'none'
                game
                  //@ts-ignore
                  .playCard(game.playerTurn?.id, cardInPlayer)
                  .subscribe(
                    () => {},
                    (error: string) => {
                      if (
                        cardInPlayer?.value === Value.WILDCARD ||
                        cardInPlayer?.value === Value.PLUS_FOUR
                      ) {
                        return
                      }
                      showErrorAlert(error)
                    }
                  )
              })
          } else {
            game
            //@ts-ignore
            .playCard(game.playerTurn?.id, cardInPlayer)
            .subscribe(
              () => {},
              (error: string) => {
                if (
                  cardInPlayer?.value === Value.WILDCARD ||
                  cardInPlayer?.value === Value.PLUS_FOUR
                ) {
                  return
                }
                showErrorAlert(error)
              }
            )
          }
        })
      } catch (e) {}
    })
}
