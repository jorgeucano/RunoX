export class Card {
  readonly id: string;
  readonly color?: string;
  readonly value?: string;

  constructor(id: string, color?: string, value?: string) {
    this.id = id;
    this.color = color;
    this.value = value;
  }

  // TODO: contemplar cartas especiales con sus efectos
}
