import {Deserializable} from './Deserializable';
import {Model} from './Model';
import {Player} from './Player';

export class Lobby extends Model {
  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _leader: Player;

  get leader(): Player {
    return this._leader;
  }

  set leader(value: Player) {
    this._leader = value;
  }

  private _players: Player[];

  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
  }

  private _playerColor: Map<Player, string>;

  get playerColor(): Map<Player, string> {
    return this._playerColor;
  }

  set playerColor(value: Map<Player, string>) {
    this._playerColor = value;
  }

  deserialize(input: any): this {
    super.deserialize(input);

    if (input._leader) {
      this._leader = new Player().deserialize(input._leader);
    }

    if (input._players && input._players instanceof Array) {
      this._players = input._players.map(playerJson => new Player().deserialize(playerJson));
    }

    this._playerColor = null;

    return this;
  }
}
