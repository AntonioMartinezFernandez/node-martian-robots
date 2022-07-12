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
    for (let i = 0; i < command.length; i++) {
      if (command[i] !== 'R' && command[i] !== 'L' && command[i] !== 'F')
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
