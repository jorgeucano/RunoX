import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './game.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ChatModule } from '../chat/chat.module';
import { DeckCardComponent } from './components/deck-card/deck-card.component';
import { DeckCardListComponent } from './components/deck-card-list/deck-card-list.component';
import { StackComponent } from './components/stack/stack.component';
import { TurnComponent } from './components/turn/turn.component';
import { RunoxButtonComponent } from './components/runox-button/runox-button.component';
import { SelectColorComponent } from './components/select-color/select-color.component';
import { PlayerCardListComponent } from './components/player-card-list/player-card-list.component';
import { DeckComponent } from './components/deck/deck.component';
import { CurrentTurnComponent } from './components/current-turn/current-turn.component';
import { InfoMessageComponent } from './components/info-message/info-message.component';

@NgModule({
  declarations: [
    GameComponent,
    GameBoardComponent,
    TurnComponent,
    DeckCardComponent,
    DeckCardListComponent,
    StackComponent,
    SelectColorComponent,
    RunoxButtonComponent,
    PlayerCardListComponent,
    StackComponent,
    DeckComponent,
    CurrentTurnComponent,
    InfoMessageComponent
  ],
  imports: [CommonModule, GameRoutingModule, SharedModule, ChatModule],
})
export class GameModule {}
