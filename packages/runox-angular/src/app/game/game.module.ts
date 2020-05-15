import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import {SharedModule} from '../shared/shared.module';
import { GameComponent } from './game.component';
import { GameBoardComponent } from './components/game-board/game-board.component';


@NgModule({
  declarations: [GameComponent, GameBoardComponent], imports: [
    CommonModule, GameRoutingModule, SharedModule
  ]
})
export class GameModule { }
