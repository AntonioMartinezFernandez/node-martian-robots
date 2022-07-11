import { planetSurface } from './types';

export interface ISurface {
  build(): planetSurface | Error;
}
