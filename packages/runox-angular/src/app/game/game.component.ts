import { Component, OnInit } from "@angular/core";
import { FirebaseEngineService } from "../firebase-engine.service";
import { Observable } from "rxjs";
import { IPlayer } from "@runox-game/game-engine/lib/models/player.model";
import { Room } from "../models/room";
import { GameEngineService } from "../game-engine.service";
import { IGameState } from "@runox-game/game-engine/lib/models/game-state.model";
import { ActivatedRoute, Router } from "@angular/router";
import { first, filter } from "rxjs/operators";

@Component({
  selector: "rnx-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
  room$: Observable<IGameState>;
  roomName: string = "";
  alex = 'alex'
  // @ts-ignore
  user = this.gameEngine.game.players.find(
    (player) => player.id === this.gameEngine.playerId
  );

  constructor(
    private router: Router,
    activeRouter: ActivatedRoute,
    private firebaseEngineService: FirebaseEngineService,
    private gameEngine: GameEngineService
  ) {
    activeRouter.params.pipe(first()).subscribe((params) => {
      debugger;
      if (!!params.id) {
        this.roomName = params.id;
        this.alex = this.roomName;
        this.firebaseEngineService.fetchRoom(this.roomName).then(
          (exists: boolean) => {
            if (exists) {
              this.room$ = this.firebaseEngineService.game$;
            } else {
              this.redirectToLogin();
            }
          },
          () => this.redirectToLogin()
        );
      } else {
        this.redirectToLogin();
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(["", ""]).catch(console.error);
  }

  ngOnInit(): void {}
}
