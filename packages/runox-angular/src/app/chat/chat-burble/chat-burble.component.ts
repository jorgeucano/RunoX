import { Component, OnInit, Input } from "@angular/core";
import { ChatMessage } from '../models/chat-message';

@Component({
  selector: "rnx-chat-burble",
  templateUrl: "./chat-burble.component.html",
  styleUrls: ["./chat-burble.component.css"],
})
export class ChatBurbleComponent implements OnInit {
  @Input() message: ChatMessage = null;
  constructor() {}

  ngOnInit(): void {}

  amazingText(text: string): string {
    switch (text) {
      case "!runox":
        return '<img src="/assets/images/logo2x.png" alt="RunoX logo" class="chat-runox-icon">';

      case "!voluntad":
        return '<h2 style="color:green">Ponele voluntaaddd!</h2>';

      case "!2":
        return '<h2 style="color:darkorange">+2</h2>';

      case "!4":
        return '<h2 style="color:red">+4</h2>';

      case "!not-send!":
        return '<h3 style="color:red"> mensaje no enviado </h3>';

      default:
        return text;
    }
  }
}
