import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Card } from "../models/card.model";
import { COLORS } from "../models/color.model";
import { Value, VALUES } from "../models/values.model";
import { CommandResult } from "./command-result";

export class BuildDeckCommand extends GameCommand {
  execute(state: GameState) {
    const specialCards = [Value.PLUS_FOUR, Value.WILDCARD];

    state.deck.addCards([
      ...specialCards.map((specialCard) => new Card(specialCard)),
      ...specialCards.map((specialCard) => new Card(specialCard)),
    ]);

    COLORS.forEach((color) => {
      VALUES.filter(
        (card) => card !== Value.WILDCARD && card !== Value.PLUS_FOUR
      ).forEach((card) => {
        const newCard1 = new Card(card, color);
        const newCard2 = new Card(card, color);

        state.deck.addCards([newCard1, newCard2]);
      });
    });

    state.deck.shuffle();

    console.log("Se ha creado el deck");

    return new CommandResult(true);
  }
}
