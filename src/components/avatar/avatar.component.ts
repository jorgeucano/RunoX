import { GameObject } from "../game-object.model";
import { Player } from "../../models/player.model";

import "./avatar.styles.css";

export class Avatar extends GameObject {
  constructor(user: Player) {
    super('div');
  }
}