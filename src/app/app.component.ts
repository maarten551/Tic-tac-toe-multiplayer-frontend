import {Component} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Lobby} from './model/Lobby';
import {log} from 'util';
import {PlayerService} from './service/player.service';
import {Player} from './model/Player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title = 'tic-tac-toe-front-end';
  private messages: string[] = [];
  private inputChatMessage = '';
  private inputName = '';

  constructor(private rxStompService: RxStompService, private playerService: PlayerService) {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection(): void {
    this.rxStompService.watch('/chat').subscribe((message: Message) => {
      this.messages.push(message.body);
    });

    // this.rxStompService.watch('/app/lobbies').subscribe((message: Message) => {
    //   const parsedMessage: string[] = JSON.parse(message.body);
    //   const lobbies: Lobby[] = parsedMessage.map(lobbyJson => new Lobby().deserialize(lobbyJson));
    //
    //   lobbies.forEach(value => console.log(value));
    // });
  }

  private sendChatMessage(): void {
    this.rxStompService.publish({destination: '/send/message', body: this.inputChatMessage, headers: {}});
    this.inputChatMessage = '';
  }

  private sendUsername(): void {
    this.rxStompService.publish({destination: '/send/players/set-username', body: this.inputName, headers: {}});
    this.inputName = '';
  }
}
