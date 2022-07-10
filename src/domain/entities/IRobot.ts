import { parsedRobot } from '@domain/types';

export interface IRobot {
  getParsedRobotCommand(): parsedRobot | Error;
}
