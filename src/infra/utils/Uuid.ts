import { v4 as uuidv4 } from 'uuid';

export class Uuid {
  public generate(): string {
    return uuidv4();
  }
}
