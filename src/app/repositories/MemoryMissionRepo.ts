import { IMissionRepo } from '@domain/entities/IMissionRepo';
import { IMissionData, IMissionRegister } from '@domain/entities/types';
import { Uuid } from '@infra/utils/Uuid';

export class MemoryMissionRepo implements IMissionRepo {
  private _data: IMissionRegister[] = [];

  constructor(private readonly _uuid = new Uuid()) {}

  async save(
    missionData: IMissionData,
    actualDate = new Date(),
  ): Promise<IMissionRegister | Error> {
    try {
      const data: IMissionRegister = {
        id: this._uuid.generate(),
        date: actualDate,
        input: {
          FieldSurface: missionData.mission.FieldSurface as string[],
          MissionCommands: missionData.mission.MissionCommands as string[][],
        },
        output: { MissionResult: missionData.missionResults as string[][] },
      };

      this._data.push(data);

      return data;
    } catch (error) {
      console.log(error);
      return new Error('Error saving mission data on database');
    }
  }

  async findAll(): Promise<IMissionRegister[] | Error> {
    return this._data;
  }
}
