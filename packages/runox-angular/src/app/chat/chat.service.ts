import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable, Subject, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ChatMessage } from "./models/chat-message";

const INITIAL_COUNT_OF_MESSAGES = 13;
const MESSAGE_COLLECTION_NAME = "messages";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  chatCollection: AngularFirestoreCollection<any>;
  chatVisibleSubject = new Subject<boolean>();

  constructor(afs: AngularFirestore) {
    this.chatCollection = afs.collection(`chat`);
    this.chatVisibleSubject.next(false);
  }

  getMessages(roomName: string): Observable<ChatMessage[]> {
    return this.chatCollection
      .doc(roomName)
      .collection(MESSAGE_COLLECTION_NAME, (ref) =>
        ref.orderBy("timestamp", "desc").limit(INITIAL_COUNT_OF_MESSAGES)
      )
      .snapshotChanges()
      .pipe(
        map((list) =>
          list
            .map((x) => {
              const msg = x.payload.doc.data() as ChatMessage;
              msg.id = x.payload.doc.id;
              return msg;
            })
            .sort((a, b) => a.timestamp - b.timestamp)
        )
      );
  }

  createMessage(
    roomName: string,
    playerId: string,
    text: string
  ): Promise<ChatMessage> {
    const colRef = this.chatCollection
      .doc(roomName)
      .collection(MESSAGE_COLLECTION_NAME);

    const timestamp = Date.now();
    const msg: ChatMessage = {
      id: null,
      roomName,
      text,
      name: playerId,
      timestamp,
    };
    return new Promise<ChatMessage>((resolve, reject) => {
      colRef.add(msg).then(
        (doc) => {
          msg.id = doc.id;
          resolve(msg);
        },
        (error) => reject(error)
      );
    });
  }

  deleteMessage(roomName: string, message: ChatMessage) {
    return this.chatCollection
      .doc(roomName)
      .collection(MESSAGE_COLLECTION_NAME)
      .doc(message.id)
      .delete();
  }

  chatVisible() {
    return this.chatVisibleSubject.asObservable().pipe(startWith(true));
  }

  hideChat() {
    this.chatVisibleSubject.next(false);
  }

  showChat() {
    this.chatVisibleSubject.next(true);
  }
}
