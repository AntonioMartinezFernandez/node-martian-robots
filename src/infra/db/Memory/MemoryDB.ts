import { mission, missionResult } from '@domain/entities/types';
import { Uuid } from '@infra/utils/Uuid';

export class MemoryDB {
  private _data: any[] = [];

  save(missionData: mission, missionResults: missionResult) {
    const uuid = new Uuid().generate();
    const newMission = {
      id: uuid,
      date: new Date(),
      input: missionData,
      output: missionResults,
    };
    this._data.push(newMission);
    return newMission;
  }

  findAll() {
    return this._data;
  }
}
