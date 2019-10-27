import {Component} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {PlayerService} from './service/player.service';
import {ToastrService} from 'ngx-toastr';
import {LobbyService} from './service/lobby.service';

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

  constructor(private rxStompService: RxStompService, private playerService: PlayerService, private lobbyService: LobbyService, private toastr: ToastrService) {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection(): void {
    this.rxStompService.watch('/chat').subscribe((message: Message) => {
      this.messages.unshift(message.body);
    });

    this.rxStompService.watch('/user/errors').subscribe((message: Message) => {
      this.toastr.error(message.body);
    });

    // this.rxStompService.watch('/app/lobbies').subscribe((message: Message) => {
    //   const parsedMessage: string[] = JSON.parse(message.body);
    //   const lobbies: Lobby[] = parsedMessage.map(lobbyJson => new Lobby().deserialize(lobbyJson));
    //
    //   lobbies.forEach(value => console.log(value));
    // });
  }

  private sendChatMessage(): void {
    if (this.inputChatMessage.length === 0) {
      return;
    }

    this.rxStompService.publish({destination: '/send/message', body: this.inputChatMessage, headers: {}});
    this.toastr.success(this.inputChatMessage);
    this.inputChatMessage = '';
  }

  private sendUsername(): void {
    if (this.inputName.length === 0) {
      return;
    }

    this.rxStompService.publish({destination: '/send/players/set-username', body: this.inputName, headers: {}});
    this.inputName = '';
  }

  private isSelectedGameStarted(): boolean {
    return this.lobbyService.selectedLobby != null && this.lobbyService.selectedLobby.gameSession.isActive;
  }
}
