import { GameObject, GameObjectProp } from "../game-object.model";
import { Player } from "../../models/player.model";

import "./avatar.styles.css";

export class Avatar extends GameObject {
  constructor(player: Player, cardsNumber: number = 0, isCurrent: boolean = false) {
    const image = document.createElement("img");
    image.setAttribute("src", player.pic);

    const avatarBadge = document.createElement("div");
    avatarBadge.setAttribute("class", "avatar-badge");
    avatarBadge.append(cardsNumber.toString());

    const avatarImage = document.createElement("div");
    avatarImage.setAttribute("class", "avatar-image");
    avatarImage.appendChild(image);
    avatarImage.appendChild(avatarBadge);

    const avatarName = document.createElement("div");
    avatarName.setAttribute("class", "avatar-name");
    avatarName.append(player.name)

    let avatarClass = "avatar";
    if (isCurrent) avatarClass += " active";

    super('div', [{ name: 'class', value: avatarClass }], [avatarName, avatarImage]);
  }
}