import { finalRobotLocation } from '@domain/types';

export interface IRobotCommand {
  calculateFinalRobotLocation(): finalRobotLocation;
}
