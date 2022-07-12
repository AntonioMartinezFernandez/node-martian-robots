import { IMissionData, IMissionRegister } from './types';

export interface IMissionRepo {
  save(
    missionData: IMissionData,
    actualDate?: Date,
  ): Promise<IMissionRegister | Error>;
  findAll(): Promise<IMissionRegister[] | Error>;
}
