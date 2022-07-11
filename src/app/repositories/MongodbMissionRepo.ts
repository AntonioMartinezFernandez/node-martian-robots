import { IMissionRepo } from '@domain/entities/IMissionRepo';
import { IMissionData } from '@domain/entities/types';
import { missionModel } from '@infra/db/MongoDB/models/Mission';
import { Uuid } from '@infra/utils/Uuid';

export class MongodbMissionRepo implements IMissionRepo {
  constructor(
    private readonly _uuid = new Uuid(),
    private readonly _missionModel = missionModel,
  ) {}

  async save(missionData: IMissionData): Promise<IMissionData | Error> {
    try {
      const data = {
        id: this._uuid.generate(),
        date: new Date(),
        input: {
          FieldSurface: missionData.mission.FieldSurface as string[],
          MissionCommands: missionData.mission.MissionCommands as string[][],
        },
        output: { MissionResult: missionData.missionResults as string[][] },
      };

      await this._missionModel.create(data);

      return missionData;
    } catch (error) {
      console.log(error);
      return new Error('Error saving mission data on database');
    }
  }

  async findAll(): Promise<any[] | Error> {
    try {
      return await this._missionModel
        .find({}, '-_id id date input output')
        .lean();
    } catch (error) {
      console.log(error);
      return new Error('Error retrieving mission data from database');
    }
  }
}
