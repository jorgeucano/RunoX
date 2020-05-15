import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'rnx-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() avatars: Array<any> = [];
  @Input() room: any = {};
  @Input() status: number;

  @Output() joinRoom = new EventEmitter();
  @Output() startGame = new EventEmitter();

  join() {
    this.joinRoom.emit();
  }

  start() {
    console.log('Start that shit!');
    this.startGame.emit();
  }
}
