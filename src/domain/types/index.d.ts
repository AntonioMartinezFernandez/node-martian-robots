export type surfaceSize = [string];

export type missionCommands = [string];

export type planetSurface = [number, number];

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
