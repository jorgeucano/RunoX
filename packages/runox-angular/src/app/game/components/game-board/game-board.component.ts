import {Component, Input, OnInit} from '@angular/core';
import { Room } from 'src/app/models/room';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'rnx-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  @Input() room$: Observable<Room>;
  @Input() player: IPlayer;

  constructor() { }

  ngOnInit(): void {
    this.room$.subscribe(x => console.log(x));
  }

}
