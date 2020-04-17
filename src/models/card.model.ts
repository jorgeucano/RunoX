import { generateUniqueId } from "../utils/id-generator.helper";
import { Color } from "./color.model";
import { Value, isSpecial } from "./values.model";

export class Card {
  readonly id: string;
  readonly sprite: string;
  readonly value: Value;
  readonly color?: Color;

  constructor(value: Value, color?: Color) {
    if (isSpecial(value) && color) {
      throw Error(`La carta "${value}" no puede tener el color "${color}"`);
    }

    this.id = generateUniqueId();
    this.sprite = color ? `${value}--${color}` : value;
    this.value = value;
    this.color = color;
  }

  isSpecialCard() {
    return isSpecial(this.value);
  }

  hasEffects() {
    return (
      this.isSpecialCard() ||
      this.value === Value.PLUS_TWO ||
      this.value === Value.REVERSE ||
      this.value === Value.SKIP
    );
  }

  isPlayable(otherCard: Card) {
    if (this.isSpecialCard()) {
      return true;
    }

    if (!this.color || !otherCard.color) {
      throw new Error(
        "Ambas cartas deben tener definido un color para poder compararlas"
      );
    }

    return otherCard.value === this.value || otherCard.color === this.color;
  }
}
