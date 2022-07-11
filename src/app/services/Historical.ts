import { IHistorical } from '@domain/entities/IHistorical';
import { IMissionRepo } from '@domain/entities/IMissionRepo';
import { MongodbMissionRepo } from '@app/repositories/MongodbMissionRepo';

export class Historical implements IHistorical {
  constructor(
    private readonly _repo: IMissionRepo = new MongodbMissionRepo(),
  ) {}

  async getData() {
    try {
      return await this._repo.findAll();
    } catch (error) {
      return new Error('Error retrieving mission data from database');
    }
  }
}
