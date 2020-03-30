import './styles/styles.css';

import RandomDeck from './utils/randomDeck/randomDeck';

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
const randomDeck = [...deck];
const handsLength = 6; // 4 jugadores

const player1 = {
  name: 'Jorge',
  id: 'jorge1234',
  hand: [...randomDeck.splice(0, handsLength)],
  pic:
    'https://pbs.twimg.com/profile_images/1229508740510109697/Ww22knVc_400x400.jpg'
};

const player2 = {
  name: 'Calel',
  id: 'calel1234',
  hand: [...randomDeck.splice(0, handsLength)],
  pic:
    'https://pbs.twimg.com/profile_images/1229508740510109697/Ww22knVc_400x400.jpg'
};

const player3 = {
  name: 'Facu',
  id: 'Facu1234',
  hand: [...randomDeck.splice(0, handsLength)],
  pic:
    'https://pbs.twimg.com/profile_images/1196581886916747264/PaMavazA_400x400.jpg'
};

const player4 = {
  name: 'Nicolas',
  id: 'nikomendo',
  hand: [...randomDeck.splice(0, handsLength)],
  pic:
    'https://pbs.twimg.com/profile_images/1106827262907899904/S1BXkb04_400x400.jpg'
};

const players = [player1, player2, player3, player4];

players.forEach(player => {
  const div = document.createElement('div');
  div.setAttribute('id', player.id);

  const playerContainer = document.createElement('div');
  const playerName = document.createElement('span');
  playerName.innerText = `Jugador ${player.id}`;
  playerContainer.appendChild(playerName);

  div.appendChild(playerContainer);

  player.hand.forEach(carta => {
    const _hand = document.createElement('div');
    _hand.setAttribute('class', `carta ${carta}`);
    div.appendChild(_hand);
  });

  _players?.appendChild(div);
});

const stackTitleContainer = document.createElement('div');
const stackTitle = document.createElement('span');
stackTitle.innerText = 'Rest of the stack';
stackTitleContainer.appendChild(stackTitle);
_stack?.appendChild(stackTitleContainer);

randomDeck.forEach(c => {
  const card = document.createElement('div');
  card.setAttribute('class', `carta ${c}`);
  _stack?.appendChild(card);
});
