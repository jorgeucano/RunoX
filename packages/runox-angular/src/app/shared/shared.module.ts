import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    CardComponent,
    AvatarComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    AvatarComponent,
    ButtonComponent
  ]
})
export class  SharedModule { }
