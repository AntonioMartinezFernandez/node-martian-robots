import { Response } from 'express';
import { HttpException } from '@src/infra/http/exceptions/HttpException';

export class BaseController {
  handleError(error: unknown, res: Response) {
    console.error(error);

    const httpError = new HttpException(500);
    res.status(httpError.status).json({ error: httpError.message });
  }
}
