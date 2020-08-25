import { Component, Input, OnInit } from "@angular/core";
import { Room } from "src/app/models/room";
import { IPlayer } from "@runox-game/game-engine/lib/models/player.model";
import { Observable } from "rxjs";
import { map, flatMap } from "rxjs/operators";
import { Value } from "@runox-game/game-engine/lib/models/values.model";

@Component({
  selector: "rnx-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.css"],
})
export class GameBoardComponent implements OnInit {
  @Input() set room$(x: Observable<Room>) {
    if (x) {
      x.subscribe((x) => (this.room = x));
      this.hasToSelectColor$ = x.pipe(
        flatMap((room: Room) =>
          room
            .onCardPlayed()
            .pipe(
              map(
                (x) => x?.value === Value.WILDCARD || x?.value === Value.PLUS_FOUR
              )
            )
        )
      );
    }
  }
  @Input() player: IPlayer;
  room: Room;
  hasToSelectColor$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {}
}
