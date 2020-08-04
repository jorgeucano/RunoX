import { Component, OnInit, Output } from '@angular/core';
import {  EventEmitter } from "@angular/core";
@Component({
  selector: 'rnx-runox-button',
  templateUrl: './runox-button.component.html',
  styleUrls: ['./runox-button.component.css'],
})
export class RunoxButtonComponent implements OnInit {
  @Output() unoYelled: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}
  
  ngOnInit(): void {}

  yellUno() {
    this.unoYelled.emit(true);
  }
}
