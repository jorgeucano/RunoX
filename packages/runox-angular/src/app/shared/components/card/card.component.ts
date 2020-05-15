import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'rnx-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title: string = null;

  constructor() { }

  ngOnInit(): void {
  }

}
