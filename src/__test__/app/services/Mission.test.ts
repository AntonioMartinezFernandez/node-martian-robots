import { mission, missionResult, planetSurface } from '@domain/entities/types';
import { Mission } from '@app/services/Mission';
import { MemoryMissionRepo } from '@app/repositories/MemoryMissionRepo';

const maxSurface: planetSurface = [0, 0, 50, 50];

describe('Mission service', () => {
  it('should return [["1 1 E"],["3 3 N LOST"],["4 2 N"]]', async () => {
    const missionData: mission = {
      FieldSurface: ['5 3'],
      MissionCommands: [
        ['1 1 E', 'RFRFRFRF'],
        ['3 2 N', 'FRRFLLFFRRFLL'],
        ['0 3 W', 'LLFFFRFLFL'],
      ],
    };

    const testResult: missionResult = {
      MissionResult: [['1 1 E'], ['3 3 N LOST'], ['4 2 N']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(testResult);
  });

  it('should return surface width error', async () => {
    const missionData: mission = {
      FieldSurface: ['51 3'],
      MissionCommands: [['1 1 E', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Surface width out of range'));
  });

  it('should return surface limits error', async () => {
    const missionData: mission = {
      FieldSurface: ['3'],
      MissionCommands: [['1 1 E', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Invalid mission surface coordinates'));
  });

  it('should return surface width error', async () => {
    const missionData: mission = {
      FieldSurface: ['-1 3'],
      MissionCommands: [['1 1 E', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Surface width out of range'));
  });

  it('should return surface length error', async () => {
    const missionData: mission = {
      FieldSurface: ['4 51'],
      MissionCommands: [['1 1 E', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Surface length out of range'));
  });

  it('should return surface length error', async () => {
    const missionData: mission = {
      FieldSurface: ['4 -1'],
      MissionCommands: [['1 1 E', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Surface length out of range'));
  });

  it('should return initial robot position error', async () => {
    const missionData: mission = {
      FieldSurface: ['50 50'],
      MissionCommands: [['-1 1 E', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Invalid initial robot position value'));
  });

  it('should return initial robot position error', async () => {
    const missionData: mission = {
      FieldSurface: ['50 50'],
      MissionCommands: [['1 -1 E', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Invalid initial robot position value'));
  });

  it('should return initial robot position error', async () => {
    const missionData: mission = {
      FieldSurface: ['50 50'],
      MissionCommands: [['51 25 S', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Invalid initial robot position value'));
  });

  it('should return initial robot position error', async () => {
    const missionData: mission = {
      FieldSurface: ['50 50'],
      MissionCommands: [['25 51 E', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Invalid initial robot position value'));
  });

  it('should return invalid command value error', async () => {
    const missionData: mission = {
      FieldSurface: ['50 50'],
      MissionCommands: [['25 25 A', 'RFLF']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Invalid robot orientation value'));
  });

  it('should return invalid command value error', async () => {
    const missionData: mission = {
      FieldSurface: ['50 50'],
      MissionCommands: [['25 25 W', 'RFLFA']],
    };

    const sut = await new Mission(
      maxSurface,
      missionData,
      new MemoryMissionRepo(),
    ).execute();
    expect(sut).toEqual(new Error('Invalid robot command value'));
  });
});
