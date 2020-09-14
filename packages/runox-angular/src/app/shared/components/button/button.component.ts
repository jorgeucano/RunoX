import { Component, Input } from '@angular/core';

@Component({
  selector: 'rnx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() rounded = false;
}
