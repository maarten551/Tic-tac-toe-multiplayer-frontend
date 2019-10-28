import {Injectable} from '@angular/core';
import {RxStompService, StompHeaders} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {PlayerOverviewWebSocketService} from './websocket/player-overview-web-socket.service';
import {PlayerOverview} from '../model/PlayerOverview';
import {Player} from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _playerOverviewIsRetrieved = false;
  private _playerOverview: PlayerOverview = new PlayerOverview();
  private _currentPlayer: Player = new Player();

  protected constructor(private playerOverviewWebSocketService: PlayerOverviewWebSocketService) {
    this._currentPlayer.username = 'Loading...';

    playerOverviewWebSocketService.addSubscriber(this, result => {
      if (!this._playerOverviewIsRetrieved) {
        this._playerOverview = result;
        this._playerOverviewIsRetrieved = true;

        this._currentPlayer = result.players.find(value => value.sessionId === this._playerOverview.sessionId);
      } else {
        result.players.forEach(newPlayerInfo => {
          const olderPlayer = this.getPlayerBySessionId(newPlayerInfo.sessionId);

          if (olderPlayer) {
            olderPlayer.username = newPlayerInfo.username;
          } else {
            this._playerOverview.players.push(newPlayerInfo);
          }
        });
      }
    });
  }

  public getPlayerBySessionId(sessionId: string): Player {
    return this._playerOverview.players.find(player => player.sessionId === sessionId);
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }
}
