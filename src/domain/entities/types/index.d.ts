export type surfaceSize = [string];

export type missionCommands = [string, string];

export type minX = number;

export type minY = number;

export type maxX = number;

export type maxY = number;

export type planetSurface = [minX, minY, maxX, maxY];

export interface mission {
  FieldSurface: surfaceSize;
  MissionCommands: missionCommands[];
}

export type robotPosition = [number, number];

export type robotOrientation = 'N' | 'S' | 'E' | 'W';

export type robotCommand = string;

export interface parsedRobot {
  position: robotPosition;
  orientation: robotOrientation;
  command: robotCommand;
}

export type finalRobotLocation = [string];

export interface missionResult {
  MissionResult: finalRobotLocation[];
}

export interface IMissionData {
  mission: mission;
  missionResults: finalRobotLocation[];
}
