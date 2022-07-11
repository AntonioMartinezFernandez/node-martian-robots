import { IMissionRepo } from '@src/domain/entities/IMissionRepo';
import { IMissionData } from '@src/domain/entities/types';

export class MemoryMissionRepo implements IMissionRepo {
  async save(mission: IMissionData): Promise<IMissionData | Error> {
    return await mission;
  }

  async findAll(): Promise<any[] | Error> {
    return await new Error('Method not implemented.');
  }
}
