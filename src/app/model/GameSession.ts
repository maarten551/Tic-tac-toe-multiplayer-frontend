import {Model} from './Model';

export class GameSession extends Model {
  private _playerColors: Map<string, string>;
  private _isActive: boolean;
  private _turnCounter: number;
  private _currentPlayingPlayerBySessionId: string;

  deserialize(input: any): this {
    return super.deserialize(input);
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get playerColors(): Map<string, string> {
    return this._playerColors;
  }

  set playerColors(value: Map<string, string>) {
    this._playerColors = value;
  }

  get turnCounter(): number {
    return this._turnCounter;
  }

  set turnCounter(value: number) {
    this._turnCounter = value;
  }

  get currentPlayingPlayerBySessionId(): string {
    return this._currentPlayingPlayerBySessionId;
  }

  set currentPlayingPlayerBySessionId(value: string) {
    this._currentPlayingPlayerBySessionId = value;
  }
}
