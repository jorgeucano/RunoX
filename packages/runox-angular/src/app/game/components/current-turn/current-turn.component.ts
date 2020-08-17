import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rnx-current-turn',
  templateUrl: './current-turn.component.html',
  styleUrls: ['./current-turn.component.css']
})
export class CurrentTurnComponent implements OnInit {

  user: any;
  @Input() currentData: any;

  constructor() { }

  ngOnInit(): void {
    if (this.currentData.turn.player) {
      this.user = this.currentData.turn.player;
    } else {
      console.log(this.currentData.players[0]);
      this.user.hand = {
        card: 0
      };
    }

  }

}
