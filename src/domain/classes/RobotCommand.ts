import { IRobotCommand } from '@domain/entities/IRobotCommand';
import {
  planetSurface,
  parsedRobot,
  finalRobotLocation,
  robotOrientation,
} from '@domain/entities/types';

export class RobotCommand implements IRobotCommand {
  private _minSurfaceX: number;
  private _minSurfaceY: number;
  private _maxSurfaceX: number;
  private _maxSurfaceY: number;
  private _robotPositionX: number;
  private _robotPositionY: number;
  private _robotOrientation: robotOrientation;
  private _robotCommand: string;
  private _robotState = '';

  constructor(surface: planetSurface, robot: parsedRobot) {
    this._minSurfaceX = surface[0];
    this._minSurfaceY = surface[1];
    this._maxSurfaceX = surface[2];
    this._maxSurfaceY = surface[3];
    this._robotPositionX = robot.position[0];
    this._robotPositionY = robot.position[1];
    this._robotOrientation = robot.orientation;
    this._robotCommand = robot.command;
  }
  calculateFinalRobotLocation(): finalRobotLocation {
    for (let i = 0; i < this._robotCommand.length; i++) {
      switch (this._robotCommand[i]) {
        case 'R':
          this.turnRight();
          break;
        case 'L':
          this.turnLeft();
          break;
        case 'F':
          this.goForward();
          break;
        default:
          break;
      }

      if (this._robotState === 'LOST') {
        this._robotState = ' ' + this._robotState;
        break;
      }
    }

    return [
      `${this._robotPositionX} ${this._robotPositionY} ${this._robotOrientation}${this._robotState}`,
    ];
  }

  private turnRight() {
    switch (this._robotOrientation) {
      case 'N':
        this._robotOrientation = 'E';
        break;
      case 'E':
        this._robotOrientation = 'S';
        break;
      case 'S':
        this._robotOrientation = 'W';
        break;
      case 'W':
        this._robotOrientation = 'N';
        break;
      default:
        break;
    }
  }

  private turnLeft() {
    switch (this._robotOrientation) {
      case 'N':
        this._robotOrientation = 'W';
        break;
      case 'E':
        this._robotOrientation = 'N';
        break;
      case 'S':
        this._robotOrientation = 'E';
        break;
      case 'W':
        this._robotOrientation = 'S';
        break;
      default:
        break;
    }
  }

  private goForward() {
    switch (this._robotOrientation) {
      case 'N':
        this._robotPositionY < this._maxSurfaceY
          ? this._robotPositionY++
          : (this._robotState = 'LOST');
        break;
      case 'S':
        this._robotPositionY > this._minSurfaceY
          ? this._robotPositionY--
          : (this._robotState = 'LOST');
        break;
      case 'E':
        this._robotPositionX < this._maxSurfaceX
          ? this._robotPositionX++
          : (this._robotState = 'LOST');
        break;
      case 'W':
        this._robotPositionX > this._minSurfaceX
          ? this._robotPositionX--
          : (this._robotState = 'LOST');
        break;
      default:
        break;
    }
  }
}
