import { parsedRobot } from '@domain/entities/types';

export interface IRobot {
  getParsedRobotCommand(): parsedRobot | Error;
}
