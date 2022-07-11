import { Mission } from '@app/services/Mission';
import { Historical } from '@app/services/Historical';
import { planetSurface } from '@domain/entities/types';
import { MongodbMissionRepo } from '@app/repositories/MongodbMissionRepo';
import { Request, Response } from 'express';

import { BaseController } from './base/BaseController';

export class MissionController extends BaseController {
  public checkService = (req: Request, res: Response) => {
    try {
      this.handleResponse(res, 200, { status: 'Service running' });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public sendMission = async (req: Request, res: Response) => {
    try {
      const maxSurface: planetSurface = [50, 50];

      const result = await new Mission(
        maxSurface,
        req.body,
        new MongodbMissionRepo(),
      ).execute();

      if (result instanceof Error) {
        this.handleResponse(res, 400, { error: result.message });
      } else {
        this.handleResponse(res, 200, result);
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public historicalData = async (req: Request, res: Response) => {
    try {
      const result = await new Historical().getData();

      if (result instanceof Error) {
        this.handleResponse(res, 500, { error: result.message });
      } else {
        this.handleResponse(res, 200, result);
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
