import { APP_MAX_COMMAND_LENGTH } from '@config/environment';
import { IRobot } from '@domain/entities/IRobot';
import {
  missionCommands,
  parsedRobot,
  robotPosition,
} from '@domain/entities/types';

export class Robot implements IRobot {
  private _parsedRobotCommand: parsedRobot | Error;

  constructor(private readonly _missionCommand: missionCommands) {
    this._parsedRobotCommand = this.parseCommand();
  }

  private parseCommand(): parsedRobot | Error {
    const initialRobotPosition = this._missionCommand[0].split(' ');

    const position: robotPosition = [
      parseInt(initialRobotPosition[0]),
      parseInt(initialRobotPosition[1]),
    ];
    if (isNaN(position[0]) || isNaN(position[1])) {
      return new Error('Invalid initial robot position value');
    }

    const orientation = initialRobotPosition[2];
    if (
      orientation !== 'N' &&
      orientation !== 'S' &&
      orientation !== 'E' &&
      orientation !== 'W'
    ) {
      return new Error('Invalid robot orientation value');
    }

    const command = this._missionCommand[1];
    if (command.length > parseInt(APP_MAX_COMMAND_LENGTH))
      return new Error('Command too long');
    for (const order of command) {
      if (order !== 'R' && order !== 'L' && order !== 'F')
        return new Error('Invalid robot command value');
    }

    const newRobot: parsedRobot = {
      position: position,
      orientation: orientation,
      command: command,
    };

    return newRobot;
  }

  getParsedRobotCommand(): parsedRobot | Error {
    return this._parsedRobotCommand;
  }
}
