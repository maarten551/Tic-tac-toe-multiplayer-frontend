import {Component, OnDestroy, OnInit} from '@angular/core';
import {LobbyOverviewWebSocketService} from '../../service/websocket/lobby-overview-web-socket.service';
import {Lobby} from '../../model/Lobby';
import {PlayerService} from '../../service/player.service';
import {RxStompService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-lobby-overview-component',
  templateUrl: './lobby-overview.component.html',
  styleUrls: ['./lobby-overview.component.scss']
})
export class LobbyOverviewComponent implements OnInit, OnDestroy {
  private lobbiesInOverview: Lobby[] = [];
  private newLobbyName = '';

  constructor(private rxStompService: RxStompService, private playerService: PlayerService, private lobbyOverviewWebSocketService: LobbyOverviewWebSocketService) {
  }

  ngOnInit() {
    this.lobbyOverviewWebSocketService.addSubscriber(this, result => this.lobbiesInOverview = result);
  }

  ngOnDestroy(): void {
    this.lobbyOverviewWebSocketService.removeSubscriber(this);
  }

  private createNewLobby(): void {
    if (this.newLobbyName.length === 0) {
      return;
    }

    this.rxStompService.publish({destination: '/send/lobbies/create', body: this.newLobbyName, headers: {}});
    this.newLobbyName = '';
  }

  private leaveCurrentJoinedLobby(): void {
    this.rxStompService.publish({destination: '/send/lobbies/leave-current', body: this.newLobbyName, headers: {}});
  }

  private joinLobby(lobby: Lobby): void {
    this.rxStompService.publish({destination: '/send/lobbies/join', body: lobby.id, headers: {}});
  }

  private isCurrentPlayerInLobby(lobby: Lobby): boolean {
    return lobby.players.some(value => value.sessionId === this.playerService.currentPlayer.sessionId);
  }
}
