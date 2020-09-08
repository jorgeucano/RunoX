import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ILog } from '@runox-game/game-engine/lib/log/log.factory';
import { map, tap, filter } from 'rxjs/operators';
import { LogLevel } from '@runox-game/game-engine/lib/log/log-levels.enum';

@Component({
  selector: 'rnx-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.css'],
})
export class InfoMessageComponent {
  @Input() set logs$(logs$: Observable<ILog>) {
    if (logs$) {
      this.message$ = logs$.pipe(
        filter((log: ILog) => log.level == LogLevel.USER),
        map((log: ILog) => log.mesagge),
      );
    }
  }
  message$: Observable<string>;
}
