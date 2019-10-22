import {Component} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'tic-tac-toe-front-end';
  private messages: string[] = [];
  private inputChatMessage = '';
  private inputName = '';

  constructor(private rxStompService: RxStompService) {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection(): void {
    this.rxStompService.watch('/chat').subscribe((message: Message) => {
      this.messages.push(message.body);
    });
  }

  private sendChatMessage(): void {
    this.rxStompService.publish({destination: '/app/send/message', body: this.inputChatMessage, headers: {}});
    this.inputChatMessage = '';
  }

  private sendUsername(): void {
    this.rxStompService.publish({destination: '/app/send/username', body: this.inputName, headers: {}});
    this.inputName = '';
  }
}
