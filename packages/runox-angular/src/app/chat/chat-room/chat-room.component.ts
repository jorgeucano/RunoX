import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ChatService } from "src/app/chat/chat.service";
import { Subscription, Observable } from "rxjs";
import {
  IPlayer,
  Player,
} from "@runox-game/game-engine/lib/models/player.model";
import { ChatMessage } from "../models/chat-message";
import { Room } from "src/app/models/room";

const ENTER_CODE = 13;
const PUBLIC_ROOM = "runox";
@Component({
  selector: "rnx-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.css"],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input("room") set(room: Room) {
    this.room = room;
    this.fetchMessages();
  }
  @Input() player: IPlayer = new Player("", "Jugador", "");
  newMessageText: string;
  messages$: Observable<ChatMessage[]>;
  subscriptions: Subscription[] = [];
  room = new Room();

  constructor(private service: ChatService) {
    this.room.name = PUBLIC_ROOM;
  }

  ngOnInit(): void {
    this.fetchMessages();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
  }

  fetchMessages() {
    this.messages$ = this.service.getMessages(this.room.name);
  }

  onKeyPress(e: any) {
    if (e.keyCode == ENTER_CODE) {
      this.sendMessage();
    }
  }

  sendMessage() {
    this.service
      .createMessage(this.room.name, this.player.name, this.newMessageText)
      .then(() => {
        this.newMessageText = "";
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  isSameDayChat(beforeMessage: ChatMessage, currentMessage: ChatMessage): boolean {
    if (beforeMessage) {
      return new Date(beforeMessage.timestamp).getDate() !== new Date(currentMessage.timestamp).getDate();
    }
    return true;
  }
}
