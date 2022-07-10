import { HTTP_PORT } from '@config/environment';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import { address } from 'ip';

import { mongodbConnect } from '@db/MongoDB/mongodbConnector';

import MissionRouter from '@infra/http/routes/MissionRouter';

export class HttpServer {
  private server: express.Application;
  private connectMongoDB = false;

  constructor() {
    this.server = express();
    console.clear();
  }

  mongoDB() {
    this.connectMongoDB = true;
  }

  config() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(hpp());
    this.server.use(compression());

    console.log('Server configuration loaded...');
  }

  loadRoutes() {
    this.server.use('/', new MissionRouter().router);

    this.server.use(
      '*',
      function (req: express.Request, res: express.Response) {
        res.sendStatus(404);
      },
    );

    console.log('Routes loaded...');
  }

  async start() {
    if (this.connectMongoDB) {
      try {
        await mongodbConnect();
        console.log('MongoDB connected...');
      } catch (err) {
        console.log('MongoDB error...');
        console.log(err);
      }
    }

    this.server.listen(HTTP_PORT, () => {
      console.log(`\n================ Martian Robots =================`);
      console.log(` 🚀 Server listening on http://${address()}:${HTTP_PORT}`);
      console.log(`=================================================`);
    });
  }
}
