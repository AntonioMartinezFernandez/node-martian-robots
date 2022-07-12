import { IHistorical } from '@domain/entities/IHistorical';
import { IMissionRepo } from '@domain/entities/IMissionRepo';
import { IMissionRegister } from '@domain/entities/types';

export class Historical implements IHistorical {
  constructor(private readonly _DBrepository: IMissionRepo) {}

  async getData(): Promise<IMissionRegister[] | Error> {
    try {
      return await this._DBrepository.findAll();
    } catch (error) {
      return new Error('Error retrieving mission data from database');
    }
  }
}
