import {Injectable} from '@angular/core';
import {LobbyOverviewWebSocketService} from './websocket/lobby-overview-web-socket.service';
import {Lobby} from '../model/Lobby';
import {PlayerService} from './player.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {IMessage} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private _selectedLobbyWatchSubscription: Subscription = null;
  private _waitingLobbies: Lobby[] = [];
  private _selectedLobby: Lobby;

  constructor(private lobbyOverviewWebSocketService: LobbyOverviewWebSocketService, private playerService: PlayerService, private rxStompService: RxStompService) {
    lobbyOverviewWebSocketService.addSubscriber(this, (activeLobbies: Lobby[]) => {
      // Remove all lobbies not mentioned by the server anymore
      const toBeRemovedLobbies = this._waitingLobbies.filter(waitingLobby => !activeLobbies.some(newLobby => newLobby.id === waitingLobby.id));
      toBeRemovedLobbies.forEach(toBeRemovedLobby => this._waitingLobbies.splice(this._waitingLobbies.indexOf(toBeRemovedLobby), 1));

      activeLobbies.forEach(newLobbyInfo => {
        let lobbyInSystem = this.getLobbyById(newLobbyInfo.id);

        if (lobbyInSystem) {
          lobbyInSystem.name = newLobbyInfo.name;
        } else {
          lobbyInSystem = newLobbyInfo;
          this._waitingLobbies.push(lobbyInSystem);
        }

        lobbyInSystem.leader = playerService.getPlayerBySessionId(lobbyInSystem.leader.sessionId);
        if (lobbyInSystem.leader === playerService.currentPlayer) {
          this.selectedLobby = lobbyInSystem;
        }

        lobbyInSystem.players = newLobbyInfo.players.map(value => playerService.getPlayerBySessionId(value.sessionId));
      });
    });
  }

  private getLobbyById(id: string): Lobby {
    return this._waitingLobbies.find(value => value.id === id);
  }

  private handleSelectedLobbyMessage(message: IMessage) {
    const parsedMessage: { [key: string]: string } = JSON.parse(message.body);

    const newLobbyData: Lobby = new Lobby().deserialize(parsedMessage.lobby);
    this._selectedLobby.gameSession = newLobbyData.gameSession;
    this._selectedLobby.name = newLobbyData.name;

    console.warn(message.body);
  }

  get waitingLobbies(): Lobby[] {
    return this._waitingLobbies;
  }

  get selectedLobby(): Lobby {
    return this._selectedLobby;
  }

  set selectedLobby(lobby: Lobby) {
    if (this._selectedLobbyWatchSubscription != null) {
      this._selectedLobbyWatchSubscription.unsubscribe();
    }

    this._selectedLobby = lobby;
    this._selectedLobbyWatchSubscription = this.rxStompService.watch(`/lobby/${lobby.id}`)
      .subscribe(message => {
        this.handleSelectedLobbyMessage(message);
      });
  }
}
