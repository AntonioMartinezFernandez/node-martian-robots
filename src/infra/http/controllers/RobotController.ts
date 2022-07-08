import { Request, Response } from 'express';

import { BaseController } from './BaseController';

export class RobotController extends BaseController {
  public checkStatus = (req: Request, res: Response) => {
    try {
      res.status(200).send({ status: 'Service is running...' });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public sendOrders = (req: Request, res: Response) => {
    try {
      res.status(200).send({ status: 'Sending...' });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
