import {Component, OnDestroy, OnInit} from '@angular/core';
import {LobbyOverviewWebSocketService} from '../../service/websocket/lobby-overview-web-socket.service';
import {Lobby} from '../../model/Lobby';

@Component({
  selector: 'app-lobby-overview-component',
  templateUrl: './lobby-overview.component.html',
  styleUrls: ['./lobby-overview.component.scss']
})
export class LobbyOverviewComponent implements OnInit, OnDestroy {
  private lobbiesInOverview: Lobby[] = [];

  constructor(private lobbyOverviewWebSocketService: LobbyOverviewWebSocketService) {
  }

  ngOnInit() {
    this.lobbyOverviewWebSocketService.addSubscriber(this, result => this.lobbiesInOverview = result);
  }

  ngOnDestroy(): void {
    this.lobbyOverviewWebSocketService.removeSubscriber(this);
  }
}
