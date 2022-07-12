import { HttpException } from '@infra/http/exceptions/HttpException';
import { Response } from 'express';

export class BaseController {
  handleError(error: unknown, res: Response) {
    console.error(error);

    const httpError = new HttpException(500);
    res.status(httpError.status).json({ error: httpError.message });
  }

  handleResponse(
    res: Response,
    status: number,
    content: Record<string, unknown>,
  ) {
    res.status(status).json(content);
  }
}
