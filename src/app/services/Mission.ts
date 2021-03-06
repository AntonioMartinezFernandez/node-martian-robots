import { IMission } from '@domain/entities/IMission';
import { MarsSurface } from '@domain/classes/MarsSurface';
import { Robot } from '@domain/classes/Robot';
import { RobotCommand } from '@domain/classes/RobotCommand';
import {
  finalRobotLocation,
  mission,
  parsedRobot,
  planetSurface,
  missionResult,
} from '@src/domain/entities/types';
import { IMissionRepo } from '@src/domain/entities/IMissionRepo';

export class Mission implements IMission {
  constructor(
    private readonly _surfaceLimits: planetSurface,
    private readonly _mission: mission,
    private readonly _DBrepository: IMissionRepo,
  ) {}

  public async execute(): Promise<missionResult | Error> {
    const errors: Error[] = [];
    const robotCommands: parsedRobot[] = [];
    const missionResults: finalRobotLocation[] = [];
    const smellCommands: string[] = [];

    const surface = new MarsSurface(
      this._surfaceLimits,
      this._mission.FieldSurface,
    ).build();
    if (surface instanceof Error) return new Error(surface.message);
    if (!this._mission.MissionCommands)
      return new Error('Missed mission commands');

    this._mission.MissionCommands.forEach((robot) => {
      const parsedRobotCommand = new Robot(robot).getParsedRobotCommand();

      if (parsedRobotCommand instanceof Error) {
        errors.push(parsedRobotCommand);
      } else {
        robotCommands.push(parsedRobotCommand);
      }
    });

    robotCommands.forEach((robotCommand) => {
      if (
        robotCommand.position[0] < surface[0] ||
        robotCommand.position[0] > surface[2] ||
        robotCommand.position[1] < surface[1] ||
        robotCommand.position[1] > surface[3]
      ) {
        errors.push(new Error('Invalid initial robot position value'));
      }

      const robotResult = new RobotCommand(
        surface,
        robotCommand,
        smellCommands,
      ).calculateFinalRobotLocation();

      if (robotResult.smellCommand)
        smellCommands.push(robotResult.smellCommand);

      missionResults.push(robotResult.finalRobotLocation);
    });

    if (errors.length > 0) {
      return errors[0];
    }

    try {
      await this._DBrepository.save({ mission: this._mission, missionResults });
    } catch (error) {
      console.error(error);
    }

    const result: missionResult = { MissionResult: missionResults };
    return result;
  }
}
