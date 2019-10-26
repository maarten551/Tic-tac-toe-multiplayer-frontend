import {Model} from './Model';
import {Player} from './Player';
import {GameSession} from './GameSession';

export class Lobby extends Model {
  private _id: string;
  private _name: string;
  private _leader: Player;
  private _players: Player[];
  private _gameSession: GameSession;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get leader(): Player {
    return this._leader;
  }

  set leader(value: Player) {
    this._leader = value;
  }

  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
  }

  deserialize(input: any): this {
    super.deserialize(input);

    if (input.leader) {
      this._leader = new Player().deserialize(input.leader);
    }

    if (input.gameSession) {
      this._gameSession = new GameSession().deserialize(input.gameSession);
    }

    if (input.players && input.players instanceof Array) {
      this._players = input.players.map(playerJson => new Player().deserialize(playerJson));
    }

    return this;
  }

  get gameSession(): GameSession {
    return this._gameSession;
  }

  set gameSession(value: GameSession) {
    this._gameSession = value;
  }
}
