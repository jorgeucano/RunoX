import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ChatService } from "src/app/chat/chat.service";
import { Subscription, Observable } from "rxjs";
import {
  IPlayer,
  Player,
} from "@runox-game/game-engine/lib/models/player.model";
import { ChatMessage } from "../models/chat-message";
import { tap } from "rxjs/operators";

const ENTER_CODE = 13;
const ANONYMOUS_USERNAME = "Anonimo";
const PUBLIC_ROOM = "runox";
@Component({
  selector: "rnx-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.css"],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input() player: IPlayer = new Player("", "Jugador", "");
  @Input() set roomName(roomName: string) {
    if (roomName) {
      this._roomName = roomName;
      this.fetchMessages();
    }
  }
  _roomName = PUBLIC_ROOM;
  newMessageText: string;
  messages$: Observable<ChatMessage[]>;
  subscriptions: Subscription[] = [];
  chatVisible$ = this.service.chatVisible();
  @ViewChild("chatContainer") private chatContainer: ElementRef;

  constructor(private service: ChatService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
  }

  get username() {
    return this.player ? this.player.name : ANONYMOUS_USERNAME;
  }

  fetchMessages() {
    this.messages$ = this.service
      .getMessages(this._roomName)
      .pipe(tap(() => this.scrollToBottom()));
  }

  onKeyPress(e: any) {
    if (e.keyCode == ENTER_CODE) {
      this.sendMessage();
    }
  }

  checkAndSendMessage() {
    if (this._roomName && this.newMessageText) {
      this.sendMessage();
    } else {
      console.log("error, tenes que estar logueado");
    }
  }

  sendMessage() {
    this.service
      .createMessage(this._roomName, this.username, this.newMessageText)
      .then(() => {
        this.newMessageText = "";
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  isSameDayChat(
    beforeMessage: ChatMessage,
    currentMessage: ChatMessage
  ): boolean {
    if (beforeMessage) {
      return (
        new Date(beforeMessage.timestamp).getDate() !==
        new Date(currentMessage.timestamp).getDate()
      );
    }
    return true;
  }

  hideChat() {
    this.service.hideChat();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onDelete(message: ChatMessage) {
    this.service.deleteMessage(this._roomName, message);
  }
}
