import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatBurbleComponent } from "./chat-burble/chat-burble.component";
import { ChatRoomComponent } from "./chat-room/chat-room.component";
import { FormsModule } from "@angular/forms";
import { ChatService } from "./chat.service";

@NgModule({
  declarations: [ChatRoomComponent, ChatBurbleComponent],
  imports: [CommonModule, FormsModule],
  providers: [ChatService],
  exports: [ChatRoomComponent],
})
export class ChatModule {}
