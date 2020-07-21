import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ChatMessage } from "./models/chat-message";

const INITIAL_COUNT_OF_MESSAGES = 13;
@Injectable({
  providedIn: "root",
})
export class ChatService {
  chatCollection: AngularFirestoreCollection<any>;

  constructor(afs: AngularFirestore) {
    this.chatCollection = afs.collection(`chat`);
  }

  getMessages(roomName: string): Observable<ChatMessage[]> {
    return this.chatCollection
      .doc(`${roomName}-chat`)
      .collection("messages", (ref) =>
        ref.orderBy("timestamp").limit(INITIAL_COUNT_OF_MESSAGES)
      )
      .snapshotChanges()
      .pipe(
        map((list) => {
          return list.map((x) => x.payload.doc.data() as ChatMessage);
        })
      );
  }

  createMessage(
    roomName: string,
    playerId: string,
    text: string
  ): Promise<ChatMessage> {
    const colRef = this.chatCollection
      .doc(`${roomName}-chat`)
      .collection("messages");

    const timestamp = Date.now();
    const msg: ChatMessage = {
      roomName,
      text,
      name: playerId,
      timestamp,
    };
    return new Promise<ChatMessage>((resolve, reject) => {
      colRef.add(msg).then(
        () => resolve(msg),
        (error) => reject(error)
      );
    });
  }
}
