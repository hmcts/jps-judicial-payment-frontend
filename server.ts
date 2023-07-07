import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { HealthCheck } from './src/app/server/healthcheck';
import { getXuiNodeMiddleware } from './api/auth';
import refDataRouter from './api/refdata/routes';
import sittingRecordsRouter from './api/sittingrecords/routes';
import { IdamAuthenticatorService } from './api/refdata/authenticator/index';
import { Logger } from '@hmcts/nodejs-logging';
const logger = Logger.getLogger()

const errorHandler = ((err, req, res, next) => {
  console.log(err.request)
  if (err) {
    const error = err.response
    res.status(error.status || 500);
    let errMsg = `${error.statusText}:`
    if (error.data.errorDescription) {
      errMsg += ` ${error.data.errorDescription}`
    }
    if (error.data.errors) {
      console.log(JSON.stringify(error.data.errors))
      errMsg += ` ${error.data.errors}`
    }

    logger.log({
      level: 'error',
      message: errMsg
    })
    res.json({
      error: {
        message: errMsg || 'Internal Server Error',
      },
    });
  }
});
const IdamAuthSvc = new IdamAuthenticatorService()

function getSystemAuthTokens(){
  IdamAuthSvc.createSystemUserAuth();
  IdamAuthSvc.createS2SAuth();
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/jps-judicial-payment-frontend/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  server.use(express.json())
  
  // setup system auth tokens
  getSystemAuthTokens()
  
  server.use(getXuiNodeMiddleware());
  server.use('/refdata', IdamAuthSvc.assignTokensMiddleware.bind(IdamAuthSvc))
  server.use('/refdata', refDataRouter, errorHandler)
  server.use('/sittingrecord', sittingRecordsRouter, errorHandler)

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  new HealthCheck().enableFor(server);


  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
