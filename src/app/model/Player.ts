import {Model} from './Model';

export class Player extends Model {
  private _sessionId: string;
  private _username: string;

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
