import {Model} from './Model';
import {FieldCell} from './FieldCell';

export class GameSession extends Model {
  private _playerColors: Map<string, string>;
  private _isActive: boolean;
  private _turnCounter: number;
  private _currentPlayingPlayerBySessionId: string;
  private _locked = false;
  private _field: FieldCell[][] = [];

  deserialize(input: any): this {
    super.deserialize(input);

    if (input.field) {
      this._field = input.field.map(horizontalLines => {
        return horizontalLines.map(fieldCell => new FieldCell().deserialize(fieldCell));
      });
    }

    return this;
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

  get field(): FieldCell[][] {
    return this._field;
  }

  set field(value: FieldCell[][]) {
    this._field = value;
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }
}
