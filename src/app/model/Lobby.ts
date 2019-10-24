import {Model} from './Model';
import {Player} from './Player';

export class Lobby extends Model {
  private _id: string;
  private _name: string;
  private _leader: Player;
  private _players: Player[];
  private _playerColor: Map<Player, string>;

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
