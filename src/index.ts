import RandomDeck from "./utils/randomDeck/randomDeck";

const cartas = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+2", "+4", "flip", "skip"];
const colores = ["verde", "amarilla", "azul", "roja"];

let deck = new RandomDeck();
colores.forEach((color) => {
  cartas.forEach((carta) => {
    const currentCard = `${carta}--${color}`;
    deck.cards.push(currentCard, currentCard);
  });
});

const _players = document.getElementById('players');

const player1 = {
  name: 'Jorge',
  id: 'jorge1234',
  hand: [],
  pic: 'https://pbs.twimg.com/profile_images/1229508740510109697/Ww22knVc_400x400.jpg'
};

const player2 = {
  name: 'Calel',
  id: 'calel1234',
  hand: [],
  pic: 'https://pbs.twimg.com/profile_images/1229508740510109697/Ww22knVc_400x400.jpg'
}

const player3 = {
  name: 'Facu',
  id: 'Facu1234',
  hand: [],
  pic: 'https://pbs.twimg.com/profile_images/1196581886916747264/PaMavazA_400x400.jpg'
}

const player4 = {
   name: 'Nicolas', id: 'nikomendo', hand: [], pic: 'https://pbs.twimg.com/profile_images/1106827262907899904/S1BXkb04_400x400.jpg' 
}
const players = [player1, player2, player3, player4];

players.forEach((player)=> {
  const _hand = `<div class="carta uno--rojo"></div>`;
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="${player.id}">
    ${_hand}
  </div>
  `; 
  _players?.appendChild(div);
})

console.log(_players);