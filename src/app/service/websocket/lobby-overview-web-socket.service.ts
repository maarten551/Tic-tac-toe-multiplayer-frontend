import {Injectable} from '@angular/core';
import {WebSocketService} from './web-socket-service';
import {Lobby} from '../../model/Lobby';
import {Message} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyOverviewWebSocketService extends WebSocketService<Lobby[]> {

  public addSubscriber(source: any, runnable: (result: Lobby[]) => void): void {
    super.addSubscriber(source, runnable);

    this.initializeConnection();
  }

  protected connectToWebSocket(): void {
    this.rxStompService.watch('/app/lobbies').subscribe((message: Message) => {
      const parsedMessage: string[] = JSON.parse(message.body);
      const lobbies: Lobby[] = parsedMessage.map(lobbyJson => new Lobby().deserialize(lobbyJson));

      this.subscribers.forEach(runnable => runnable(lobbies));
    });
  }
}
