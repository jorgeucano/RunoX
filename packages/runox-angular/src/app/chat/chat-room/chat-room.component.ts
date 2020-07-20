import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ChatService } from "src/app/chat/chat.service";
import { Subscription, Observable } from "rxjs";
import {
  IPlayer,
  Player,
} from "@runox-game/game-engine/lib/models/player.model";
import { ChatMessage } from "../models/chat-message";

const ENTER_CODE = 13;
@Component({
  selector: "rnx-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.css"],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input() roomData$: any;
  @Input() player: IPlayer = new Player("", "Jugador", "");
  newMessageText: string;
  chatRoom: string = 'runox';
  messages$: Observable<ChatMessage[]>;
  subscriptions: Subscription[] = [];

  constructor(private service: ChatService) {}

  ngOnInit(): void {
    this.roomData$?.subscribe((x) => {
      console.log(x);
      this.chatRoom = x.name;
      this.fetchMessages();
    });
    this.fetchMessages();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
  }

  fetchMessages() {
    this.messages$ = this.service.getMessages(this.chatRoom);
  }

  onKeyPress(e: any) {
    if (e.keyCode == ENTER_CODE) {
      this.sendMessage();
    }
  }

  sendMessage() {
    this.service
      .createMessage(this.chatRoom, this.player.name, this.newMessageText)
      .then(() => {
        this.newMessageText = '';
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
