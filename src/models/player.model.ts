import { Hand } from "./hand.model";

export class Player {
  readonly id: string;
  readonly name: string;
  readonly pic: string;

  readonly hand: Hand;

  constructor(id: string, name: string, pic: string) {
    this.id = id;
    this.name = name;
    this.pic = pic;

    this.hand = new Hand();
  }

  parseObjects(array: any[]) {
    return array.map(element => {
      return element.parseObject();
    });
  }

  parseObject() {
    return {
      id: this.id,
      name: this.name,
      pic: this.pic,
      hand: {
        cards: this.parseObjects(this.hand.cards)
      }
    };
  }
}
