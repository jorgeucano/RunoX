import { generateUniqueId } from "../utils/id-generator.helper";
import { Color } from "./color.model";
import { Value, isSpecial } from "./values.model";

export class Card {
  readonly id: string;
  readonly sprite: string;
  readonly value: Value;
  color?: Color;

  constructor(value: Value, color?: Color, id?: string) {
    if (isSpecial(value) && color) {
      throw new Error(`La carta "${value}" no puede tener el color "${color}"`);
    }

    this.id = id || generateUniqueId();
    this.sprite = color ? `${value}--${color}` : value;
    this.value = value;
    this.color = color;
  }

  get score(): number {
    switch (this.value) {
      case Value.PLUS_TWO:
      case Value.SKIP:
      case Value.REVERSE:
        return 20;
      case Value.WILDCARD:
      case Value.PLUS_FOUR:
        return 50;
      case Value.ONE:
        return 1;
      case Value.TWO:
        return 2;
      case Value.THREE:
        return 3;
      case Value.FOUR:
        return 4;
      case Value.FIVE:
        return 5;
      case Value.SIX:
        return 6;
      case Value.SEVEN:
        return 7;
      case Value.EIGHT:
        return 8;
      case Value.NINE:
        return 9;
      case Value.ZERO:
        return 0;
      default:
        return 0;
    }
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

  setColor(color: Color) {
    this.color = color;
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

  parseObject() {
    return {
      id: this.id,
      sprite: this.sprite,
      value: this.value,
      color: this.color,
    };
  }
}
