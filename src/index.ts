import './styles/styles.css';

import RandomDeck from './utils/randomDeck/randomDeck';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const cartas = [
  'cero',
  'uno',
  'dos',
  'tres',
  'cuatro',
  'cinco',
  'seis',
  'siete',
  'ocho',
  'nueve',
  'mas-dos',
  'saltar',
  'reversa'
];
const cartasEspeciales = ['mas-cuatro', 'comodin'];
const colores = ['verde', 'amarillo', 'azul', 'rojo'];

let deck = new RandomDeck();
deck.cards.push(...cartasEspeciales, ...cartasEspeciales);

colores.forEach(color => {
  cartas.forEach(carta => {
    const currentCard = `${carta}--${color}`;
    deck.cards.push(currentCard, currentCard);
  });
});

const _players = document.getElementById('players');
const _stack = document.getElementById('stack');
let stack: Array<any> = [];
let randomDeck = [...deck];
const handsLength = 7; // randomDeck.length / 4; // 4 jugadores

const player1 = {
  name: 'Jorge',
  id: 'jorge1234',
  hand: [...randomDeck.splice(0 * handsLength, handsLength)],
  pic:
    'https://pbs.twimg.com/profile_images/1229508740510109697/Ww22knVc_400x400.jpg'
};

const player2 = {
  name: 'Calel',
  id: 'calel1234',
  hand: [...randomDeck.splice(1 * handsLength, handsLength)],
  pic:
    'https://pbs.twimg.com/profile_images/1229508740510109697/Ww22knVc_400x400.jpg'
};

const player3 = {
  name: 'Facu',
  id: 'Facu1234',
  hand: [...randomDeck.splice(2 * handsLength, handsLength)],
  pic:
    'https://pbs.twimg.com/profile_images/1196581886916747264/PaMavazA_400x400.jpg'
};

const player4 = {
  name: 'Nicolas',
  id: 'nikomendo',
  hand: [...randomDeck.splice(3 * handsLength, handsLength)],
  pic:
    'https://pbs.twimg.com/profile_images/1106827262907899904/S1BXkb04_400x400.jpg'
};

const players = [player1, player2, player3, player4];

players.forEach(player => {
  const div = document.createElement('div');
  div.setAttribute('id', player.id);
  player.hand.forEach(carta => {
    const _hand = document.createElement('div');
    _hand.setAttribute('class', `carta ${carta}`);
    div.appendChild(_hand);
  });
  _players?.appendChild(div);
  setPlayerClicks(player.id);
});

function setPlayerClicks(id: string) {
  const _player = document.getElementById(id);
  console.log(document.getElementById(id));
  // @ts-ignore
  fromEvent(_player, 'click')
    .pipe(
      map(v => {
        // @ts-ignore
        return (v.target.className).replace('carta ', '');
      })
    )
    .subscribe((card: any) => {
      /*
       primero queremos iterar la mano para remover la clase carta-select
       luego vamos a agregar la clase a la carta que tiene nuevo click
      */
     try {
      _player?.querySelectorAll('.carta-select').forEach((el) => { el.classList.remove('carta-select'); })
      _player?.querySelector(`.${card}`)?.classList.add('carta-select');
     }
     catch(e) {

     }

    });
}

let nextCardFlag = handsLength * players.length;
let currentPlayer = 0;

/**
 * Aca se encuentra el pedido de una carta y solo esta habilitiado
 * una vez que el jugador entre en turno... Si el jugador 
 * entre una carta al stack, esta funciona deberia filtrarlo ya que no
 * es mas el jugador activo.
 * El jugadoir activo va a venir del observable de firebase
 */
const buttonNext = document.getElementById('button-next');
// @ts-ignore
const _next = fromEvent(buttonNext, 'click')
.pipe(
  // filter(b => b.player === currentPlayer)
)
.subscribe((x: any) => {
  console.log(randomDeck[nextCardFlag]);
  const div = document.getElementById(players[currentPlayer].id);
  const _hand = document.createElement('div');
  _hand.setAttribute('class', `carta ${randomDeck[nextCardFlag]}`);
  div?.appendChild(_hand);
  nextPlayer();
  nextCard();
});

/*
 esta funciona va a mutar cuando firebase este ready, ya que necesitamos 
 chequear quien es el jugador activo, (currentPlayer) vs el jugador que esta
 haciendo click en el button
*/
const nextPlayer = () => {
  currentPlayer++;
  if (currentPlayer === players.length) {
    currentPlayer = 0;
  }
}

const nextCard = () => {
  if (nextCardFlag < randomDeck.length) {
    nextCardFlag++;
  } else {
    // enviar el stack al randomDeck de nuevo
    randomDeck = [...stack];
    nextCardFlag = 0;
  }
}