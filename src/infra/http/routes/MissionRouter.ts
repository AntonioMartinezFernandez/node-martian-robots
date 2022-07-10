import { Router } from 'express';
import { MissionController } from '@src/infra/http/controllers/MissionController';

export default class MissionRouter {
  public path = '/mission';
  public router = Router();
  public missionController = new MissionController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/`, this.missionController.checkService);
    this.router.post(`${this.path}/`, this.missionController.sendMission);
    this.router.get(
      `${this.path}/historical`,
      this.missionController.historicalData,
    );
  }
}
