import { IMissionRegister } from '@domain/entities/types';
import { Historical } from '@app/services/Historical';
import { MemoryMissionRepo } from '@app/repositories/MemoryMissionRepo';

const DBrepository = new MemoryMissionRepo();

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const actualDate = new Date();

describe('Historical service', () => {
  it('should return empty array', async () => {
    const sut: IMissionRegister[] | Error = await new Historical(
      DBrepository,
    ).getData();

    expect(sut).toEqual([]);
  });

  it('should insert data and return the repo register', async () => {
    const newMission = await DBrepository.save(
      {
        mission: {
          FieldSurface: ['5 3'],
          MissionCommands: [
            ['1 1 E', 'RFRFRFRF'],
            ['3 2 N', 'FRRFLLFFRRFLL'],
            ['0 3 W', 'LLFFFRFLFL'],
          ],
        },
        missionResults: [['1 1 E'], ['3 3 N LOST'], ['4 2 N']],
      },
      actualDate,
    );

    expect(newMission).toEqual({
      id: expect.stringMatching(uuidRegex),
      //date: expect.stringMatching(dateRegex),
      date: actualDate,
      input: {
        FieldSurface: ['5 3'],
        MissionCommands: [
          ['1 1 E', 'RFRFRFRF'],
          ['3 2 N', 'FRRFLLFFRRFLL'],
          ['0 3 W', 'LLFFFRFLFL'],
        ],
      },
      output: {
        MissionResult: [['1 1 E'], ['3 3 N LOST'], ['4 2 N']],
      },
    });
  });
});

test('should return historical data', async () => {
  const sut: IMissionRegister[] | Error = await new Historical(
    DBrepository,
  ).getData();

  if (!(sut instanceof Error)) {
    expect(sut[0]).toEqual({
      id: expect.stringMatching(uuidRegex),
      date: actualDate,
      input: {
        FieldSurface: ['5 3'],
        MissionCommands: [
          ['1 1 E', 'RFRFRFRF'],
          ['3 2 N', 'FRRFLLFFRRFLL'],
          ['0 3 W', 'LLFFFRFLFL'],
        ],
      },
      output: {
        MissionResult: [['1 1 E'], ['3 3 N LOST'], ['4 2 N']],
      },
    });
  }
});
