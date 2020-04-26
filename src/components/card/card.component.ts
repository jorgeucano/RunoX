/*
const _hand = document.createElement("div");
_hand.setAttribute("id", `${card.id}`);
_hand.setAttribute("class", `carta ${card.sprite}`);
*/

import { GameObject, GameObjectProp } from "../game-object.model";

import './card.styles.css';

export class CardComponent extends GameObject { 
  constructor(
    cardId: string,
    sprite: string
  ) {
    const props: GameObjectProp[] = [
      { name: 'id', value: cardId },
      { name: 'class', value: `carta ${sprite}`},
    ]
    
    const overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");

    const button = document.createElement("button");
    button.setAttribute("data-card", cardId);
    button.setAttribute("class", "button-play-card");
    button.append("JUGAR CARTA");

    overlay.appendChild(button);

    super('div', props, [overlay]);
  }
}