import { finalRobotLocation } from '@domain/entities/types';

export interface IRobotCommand {
  calculateFinalRobotLocation(): {
    finalRobotLocation: finalRobotLocation;
    smellCommand?: string;
  };
}
