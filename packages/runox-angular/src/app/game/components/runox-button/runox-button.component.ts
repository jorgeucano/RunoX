import { Component, Output } from '@angular/core';
import {  EventEmitter } from "@angular/core";
@Component({
  selector: 'rnx-runox-button',
  templateUrl: './runox-button.component.html',
  styleUrls: ['./runox-button.component.css'],
})
export class RunoxButtonComponent {
  @Output() unoYelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  yellUno() {
    this.unoYelled.emit(true);
  }
}
