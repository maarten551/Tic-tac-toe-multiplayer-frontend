import {Injectable} from '@angular/core';
import {WebSocketService} from './web-socket-service';
import {Player} from '../../model/Player';
import {Message} from '@stomp/stompjs';
import {PlayerOverview} from '../../model/PlayerOverview';

@Injectable({
  providedIn: 'root'
})
export class PlayerOverviewWebSocketService extends WebSocketService<PlayerOverview> {

  public addSubscriber(source: any, runnable: (result: PlayerOverview) => void): void {
    super.addSubscriber(source, runnable);

    this.initializeConnection();
  }

  protected connectToWebSocket(): void {
    this.rxStompService.watch('/players').subscribe((message: Message) => {
      const parsedMessage: string[] = JSON.parse(message.body);

      this.subscribers.forEach(runnable => runnable(new PlayerOverview().deserialize(parsedMessage)));
    });
  }
}
