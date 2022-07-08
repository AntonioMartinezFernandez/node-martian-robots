import { Router } from 'express';
import { RobotController } from '@src/infra/http/controllers/RobotController';

class RobotsRouter {
  public path = '/robots';
  public router = Router();
  public robotController = new RobotController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/`, this.robotController.checkStatus);
    this.router.post(
      `${this.path}/send-orders-to-mars`,
      this.robotController.sendOrders,
    );
  }
}

export default RobotsRouter;
