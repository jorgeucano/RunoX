import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './game.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ChatModule } from '../chat/chat.module';
import { TurnComponent } from './components/turn/turn.component';
import { DeckCardComponent } from './components/deck-card/deck-card.component';
import { DeckCardListComponent } from './components/deck-card-list/deck-card-list.component';
import { StackComponent } from './components/stack/stack.component';

@NgModule({
  declarations: [
    GameComponent,
    GameBoardComponent,
    TurnComponent,
    DeckCardComponent,
    DeckCardListComponent,
    StackComponent,
  ],
  imports: [CommonModule, GameRoutingModule, SharedModule, ChatModule],
})
export class GameModule {}
