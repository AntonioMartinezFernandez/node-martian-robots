import { addAliases } from 'module-alias';

addAliases({
  '@src': __dirname + '/',
  '@config': __dirname + '/config',
  '@domain': __dirname + '/domain',
  '@app': __dirname + '/app',
  '@infra': __dirname + '/infra',
  '@db': __dirname + '/db',
});

import { HttpServer } from '@infra/http/HttpServer';

const server = new HttpServer();

server.config();
server.loadRoutes();
server.mongoDB();
server.start();
