import { IMissionData } from './types';

export interface IMissionRepo {
  save(missionData: IMissionData): Promise<IMissionData | Error>;
  findAll(): Promise<any[] | Error>;
}
