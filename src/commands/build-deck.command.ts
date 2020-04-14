import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Card } from "../models/card.model";

export class BuildDeckCommand extends GameCommand {
  execute(state: GameState) {
    // TODO: usar el randmon deck

    const CARDS = [
      "cero",
      "uno",
      "dos",
      "tres",
      "cuatro",
      "cinco",
      "seis",
      "siete",
      "ocho",
      "nueve",
      "mas-dos",
      "saltar",
      "reversa",
    ];
    const SPECIAL_CARDS = ["mas-cuatro", "comodin"];
    const COLORS = ["verde", "amarillo", "azul", "rojo"];

    state.deck.addCards([
      ...SPECIAL_CARDS.map((specialCard) => new Card(specialCard)),
      ...SPECIAL_CARDS.map((specialCard) => new Card(specialCard)),
    ]);

    COLORS.forEach((color) => {
      CARDS.forEach((card) => {
        const newCard1 = new Card(`${card}--${color}`, color, card);
        const newCard2 = new Card(`${card}--${color}`, color, card);

        state.deck.addCards([newCard1, newCard2]);
      });
    });

    state.deck.shuffle();

    console.log(`Se ha creado el deck: ${JSON.stringify(state.deck.cards)}`);
  }
}
