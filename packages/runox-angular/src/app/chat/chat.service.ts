import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ChatMessage } from "./models/chat-message";

const INITIAL_COUNT_OF_MESSAGES = 13;
@Injectable({
  providedIn: "root",
})
export class ChatService {
  chatCollection: AngularFirestoreCollection<any>;

  /**** NO OLVIDAR
   *
   *
   * anotar
   * ¿cuál es la mejor manera de internacionalizar una app?
   *
   *
   */
  constructor(afs: AngularFirestore) {
    this.chatCollection = afs.collection(`chat`);
  }

  getMessages(roomName: string): Observable<ChatMessage[]> {
    console.debug('getMessages', roomName);
    return this.chatCollection
      .doc(`${roomName}-chat`)
      .collection("messages", (ref) =>
        ref.orderBy("timestamp").limit(INITIAL_COUNT_OF_MESSAGES)
      )
      .snapshotChanges()
      .pipe(
        tap(console.log),
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

    console.debug('createMessage', msg);

    return new Promise<ChatMessage>((resolve, reject) => {
      colRef.add(msg).then(
        () => resolve(msg),
        (error) => reject(error)
      );
    });
  }
}
