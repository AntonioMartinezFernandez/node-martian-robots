import { IMissionRegister } from './types';

export interface IHistorical {
  getData(): Promise<IMissionRegister[] | Error>;
}
