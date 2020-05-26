
import "./avatar.styles.css";

import { GameObject } from "../game-object.model";
import { IPlayer } from "@runox-game/game-engine/lib/models/player.model";

export class Avatar extends GameObject {
  constructor(player: IPlayer, cardsNumber: number = 0, isCurrent: boolean = false) {
    const image = document.createElement("img");
    image.setAttribute("src", player.pic);

    const avatarImage = document.createElement("div");
    avatarImage.setAttribute("class", "avatar-image");
    avatarImage.appendChild(image);

    if (cardsNumber > 0) {
      let avatarBadge = document.createElement('div')
      avatarBadge.setAttribute("class", "avatar-badge");
      avatarBadge.append(cardsNumber.toString());
      avatarImage.appendChild(avatarBadge)
    }

    const avatarName = document.createElement("div");
    avatarName.setAttribute("class", "avatar-name");
    avatarName.append(player.name)

    let avatarClass = "avatar";
    if (isCurrent) avatarClass += " active";

    super('div', [{ name: 'class', value: avatarClass }], [avatarName, avatarImage]);
  }
}