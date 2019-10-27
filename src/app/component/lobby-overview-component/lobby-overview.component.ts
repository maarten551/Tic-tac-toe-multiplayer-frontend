import {Component, OnDestroy, OnInit} from '@angular/core';
import {LobbyOverviewWebSocketService} from '../../service/websocket/lobby-overview-web-socket.service';
import {Lobby} from '../../model/Lobby';
import {PlayerService} from '../../service/player.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {LobbyService} from '../../service/lobby.service';

@Component({
  selector: 'app-lobby-overview-component',
  templateUrl: './lobby-overview.component.html',
  styleUrls: ['./lobby-overview.component.scss']
})
export class LobbyOverviewComponent {
  private newLobbyName = '';

  constructor(private rxStompService: RxStompService, private lobbyService: LobbyService, private playerService: PlayerService) {
  }

  private createNewLobby(): void {
    if (this.newLobbyName.length === 0) {
      return;
    }

    this.rxStompService.publish({destination: '/send/lobbies/create', body: this.newLobbyName, headers: {}});
    this.newLobbyName = '';
  }

  private leaveCurrentJoinedLobby(): void {
    this.lobbyService.selectedLobby = null;

    this.rxStompService.publish({destination: '/send/lobbies/leave-current', body: this.newLobbyName, headers: {}});
  }

  private joinLobby(lobby: Lobby): void {
    this.lobbyService.selectedLobby = lobby;

    this.rxStompService.publish({destination: '/send/lobbies/join', body: lobby.id, headers: {}});
  }

  private startGame(lobby: Lobby): void {
    this.rxStompService.publish({destination: `/send/lobby/${lobby.id}/start-game`, body: lobby.id, headers: {}});
  }

  private isCurrentLeaderOfLobby(lobby: Lobby): boolean {
    return lobby.leader === this.playerService.currentPlayer;
  }
}
