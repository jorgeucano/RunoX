import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rnx-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() roomData$: any;

  constructor() { }

  ngOnInit(): void {
    this.roomData$.subscribe(x => console.log(x));
  }

}
