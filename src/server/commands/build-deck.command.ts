import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";
import { Card } from "../models/card.model";
import { COLORS } from "../models/color.model";
import { Value, VALUES } from "../models/values.model";
import { CommandValidation } from "./command-result";

/**
 * Class that allows cards creation and add them to the game deck
 */
export class BuildDeckCommand extends GameCommand {
  /**
   * Class that allows cards creation and add them to the game deck
   */
  constructor() {
    super();
  }

  execute(state: GameState) {
    /*
      Traditional deck contains:
      - +4 x2
      - wildcard x2
      - color cards x2
    */
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
  }

  validate(state: GameState) {
    return new CommandValidation(true);
  }
}
