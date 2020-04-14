import { generateUniqueId } from "../utils/id-generator.helper";

export class Card {
  readonly id: string;
  readonly sprite: string;
  readonly color?: string;
  readonly value?: string;

  constructor(sprite: string, color?: string, value?: string) {
    this.id = generateUniqueId();
    this.sprite = sprite;
    this.color = color;
    this.value = value;
  }

  // TODO: contemplar cartas especiales con sus efectos
}
