import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

@NgModule({
  declarations: [
    CardComponent,
    AvatarComponent,
    ButtonComponent,
    PlayerListComponent,
  ],
  imports: [CommonModule],
  exports: [
    CardComponent,
    AvatarComponent,
    ButtonComponent,
    PlayerListComponent,
  ],
})
export class SharedModule {}
