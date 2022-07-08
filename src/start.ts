import { addAliases } from 'module-alias';

addAliases({
  '@src': __dirname + '/',
});

import { HttpServer } from '@src/infra/http/HttpServer';

const server = new HttpServer();

server.config();
server.loadRoutes();
//server.mongoDB();
server.start();
