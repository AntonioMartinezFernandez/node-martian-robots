import { missionResult } from './types';

export interface IMission {
  execute(): Promise<missionResult | Error>;
}
