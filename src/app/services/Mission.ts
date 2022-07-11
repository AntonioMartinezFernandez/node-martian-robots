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
    private readonly _maxSurface: planetSurface,
    private readonly _mission: mission,
    private readonly _repo: IMissionRepo,
  ) {}

  public async execute(): Promise<missionResult | Error> {
    const surface = new MarsSurface(
      this._maxSurface,
      this._mission.FieldSurface,
    ).build();
    if (surface instanceof Error) return new Error(surface.message);

    if (!this._mission.MissionCommands)
      return new Error('Missed mission commands');

    const errors: Error[] = [];
    const robotCommands: parsedRobot[] = [];

    this._mission.MissionCommands.forEach((robot) => {
      const parsedRobotCommand = new Robot(robot).getParsedRobotCommand();
      if (parsedRobotCommand instanceof Error) {
        errors.push(parsedRobotCommand);
      } else {
        robotCommands.push(parsedRobotCommand);
      }
    });

    const missionResults: finalRobotLocation[] = [];
    robotCommands.forEach((robotCommand) => {
      if (
        robotCommand.position[0] < 0 ||
        robotCommand.position[0] > surface[0] ||
        robotCommand.position[1] < 0 ||
        robotCommand.position[1] > surface[1]
      ) {
        errors.push(new Error('Invalid initial robot position value'));
      }

      missionResults.push(
        new RobotCommand(surface, robotCommand).calculateFinalRobotLocation(),
      );
    });

    if (errors.length > 0) {
      return errors[0];
    }

    try {
      this._repo.save({ mission: this._mission, missionResults });
    } catch (error) {
      console.log(error);
    }

    const result: missionResult = { MissionResult: missionResults };
    return result;
  }
}
