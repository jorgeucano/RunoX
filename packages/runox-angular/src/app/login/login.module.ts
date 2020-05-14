import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RunoxUiModule} from '../../../libs/runox-ui/src/lib/runox-ui.module'

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RunoxUiModule
  ]
})
export class LoginModule { }
