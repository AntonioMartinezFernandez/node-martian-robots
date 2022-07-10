import { Uuid } from '@infra/utils/Uuid';
import { mission, missionResult } from '@src/domain/types';

export class MemoryDB {
  private _data: any[] = [];

  save(mission: mission, missionResults: missionResult) {
    const uuid = new Uuid().generate();
    const newMission = {
      id: uuid,
      date: new Date(),
      input: mission,
      output: missionResults,
    };
    this._data.push(newMission);
    return newMission;
  }

  findAll() {
    return this._data;
  }
}
