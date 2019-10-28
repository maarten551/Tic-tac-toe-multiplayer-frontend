import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../../service/player.service';
import {LobbyService} from '../../service/lobby.service';
import {FieldCell} from '../../model/FieldCell';
import {ToastrService} from 'ngx-toastr';
import {RxStompService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.scss']
})
export class GameSessionComponent implements OnInit {

  constructor(private rxStompService: RxStompService, private playerService: PlayerService, private lobbyService: LobbyService, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  executeMove(fieldCell: FieldCell, x: number, y: number) {
    if (this.lobbyService.selectedLobby.gameSession.locked) {
      this.toastr.error('The game is over, wait for a bit and you will be returned to the main screen');
      return;
    }

    if (this.playerService.currentPlayer.sessionId !== this.lobbyService.selectedLobby.gameSession.currentPlayingPlayerBySessionId) {
      this.toastr.error('It\'s not your turn!');
      return;
    }

    if (fieldCell.selectedByPlayer) {
      this.toastr.error('This field is already selected by someone (could be even you!)');
      return;
    }

    this.rxStompService.publish({destination: `/send/lobby/${this.lobbyService.selectedLobby.id}/execute-move`, body: JSON.stringify({x, y}), headers: {}});
  }

  private getNameOfCurrentPlayer(): string {
    return this.playerService.getPlayerBySessionId(this.lobbyService.selectedLobby.gameSession.currentPlayingPlayerBySessionId).username;
  }
}
