import { Component, OnInit, Output } from '@angular/core';
import {  EventEmitter } from "@angular/core";
@Component({
  selector: 'rnx-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css'],
})
export class SelectColorComponent implements OnInit {
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}
  
  ngOnInit(): void {}

  select(value: string) {
    this.selected.emit(value);
  }
}
