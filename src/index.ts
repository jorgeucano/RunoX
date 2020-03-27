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

// Ahora cuando iteras deck, se genera un deck aleatorio nuevo
// Forma 1 de Iteracion:
console.log([...deck]);

// Forma 2 de Iteracion:
for (let card of deck) {
  console.log(card);
}

// Pero los cards del deck siempre estan intactos (ordenados, como se pushearon):
console.log(deck.cards);
