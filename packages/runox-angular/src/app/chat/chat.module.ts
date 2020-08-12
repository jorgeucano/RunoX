import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatBurbleComponent } from "./chat-burble/chat-burble.component";
import { ChatRoomComponent } from "./chat-room/chat-room.component";
import { FormsModule } from "@angular/forms";
import { ChatService } from "./chat.service";
import { OpenChatButtonComponent } from './open-chat-button/open-chat-button.component';

@NgModule({
  declarations: [ChatRoomComponent, ChatBurbleComponent, OpenChatButtonComponent],
  imports: [CommonModule, FormsModule],
  providers: [ChatService],
  exports: [ChatRoomComponent, OpenChatButtonComponent],
})
export class ChatModule {}
