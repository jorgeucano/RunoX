import { Component, OnInit } from '@angular/core';
import {FirebaseEngineService} from "../firebase-engine.service";
import {Observable} from "rxjs";

@Component({
  selector: 'rnx-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  room$: Observable<any>;

  constructor(firebaseEngineService: FirebaseEngineService) {
    this.room$ = firebaseEngineService.room$;
  }

  ngOnInit(): void {
  }

}
