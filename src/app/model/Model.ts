import {Deserializable} from './Deserializable';

export class Model implements Deserializable {
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
