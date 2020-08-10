import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rnx-open-chat-button',
  templateUrl: './open-chat-button.component.html',
  styleUrls: ['./open-chat-button.component.css'],
})
export class OpenChatButtonComponent implements OnInit {
  chatHidden$ = this.chat.chatVisible().pipe(map((x) => !x));

  constructor(private chat: ChatService) {}

  ngOnInit(): void {}

  openChat() {
    this.chat.showChat();
  }
}
