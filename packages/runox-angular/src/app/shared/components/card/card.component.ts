import { Component, Input } from '@angular/core'

@Component({
  selector: 'rnx-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = null;

}
