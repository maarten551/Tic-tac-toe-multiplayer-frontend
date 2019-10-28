import {Model} from './Model';
import {Player} from './Player';

export class PlayerOverview extends Model {
  private _sessionId: string;
  private _players: Player[];

  constructor() {
    super();

    this._sessionId = '';
    this._players = [];
  }

  deserialize(input: any): this {
    super.deserialize(input);

    if (input._players && input._players instanceof Array) {
      this._players = input._players.map(playerJson => new Player().deserialize(playerJson));
    }

    return this;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
  }
}
