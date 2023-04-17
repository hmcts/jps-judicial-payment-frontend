import { AUTH, AuthOptions, xuiNode } from '@hmcts/rpx-xui-node-lib';
import { getConfigValue, showFeature } from '../configuration';
import {
  FEATURE_REDIS_ENABLED,
  FEATURE_SECURE_COOKIE_ENABLED,
  IDAM_SECRET,
  LOGIN_ROLE_MATCHER,
  MICROSERVICE,
  NOW,
  REDIS_CLOUD_URL,
  REDIS_KEY_PREFIX,
  REDIS_TTL,
  S2S_SECRET,
  SERVICE_S2S_PATH,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_ISS_URL,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  SESSION_SECRET,
  SYSTEM_USER_NAME,
  SYSTEM_USER_PASSWORD
} from '../configuration/references';
//import * as log4jui from '../lib/log4jui';
//import { client } from '../lib/appInsights';

//const logger = log4jui.getLogger('auth');

import * as express from 'express';
import { NextFunction, Response } from 'express';
export interface EnhancedRequest extends express.Request {
  auth?: {
    roles: string[]
    token: string
    userId: string
    expires: number
    data?: any
  };
  body;
  headers;
  session;
  url: string;
}
export const successCallback = (req: EnhancedRequest, res: Response, next: NextFunction) => {
  const {user} = req.session.passport;
  const {userinfo} = user;
  const {accessToken} = user.tokenset;
  const cookieToken = 'token';
  const cookieUserId = 'userid';
  console.log('Setting session and cookies');
  res.cookie(cookieUserId, userinfo.uid);
  res.cookie(cookieToken, accessToken);
  if (!req.isRefresh) {
    return res.redirect('/');
  }
  next();
};
export const failureCallback = (req: EnhancedRequest, res: Response, next: NextFunction) => {
  const errorMsg = `Auth Error: ${res.locals.message}`;
  console.log(errorMsg);
};
xuiNode.on(AUTH.EVENT.AUTHENTICATE_SUCCESS, successCallback);
xuiNode.on(AUTH.EVENT.AUTHENTICATE_FAILURE, failureCallback);

export const getXuiNodeMiddleware = () => {

  const idamWebUrl = getConfigValue(SERVICES_IDAM_LOGIN_URL);
  const authorizationUrl = `${idamWebUrl}/login`;
  const secret = getConfigValue(IDAM_SECRET);
  const idamClient = getConfigValue(SERVICES_IDAM_CLIENT_ID);
  const issuerUrl = getConfigValue(SERVICES_IDAM_ISS_URL);
  const idamApiPath = getConfigValue(SERVICES_IDAM_API_URL);
  const s2sSecret = getConfigValue(S2S_SECRET);
  const tokenUrl = `${getConfigValue(SERVICES_IDAM_API_URL)}/oauth2/token`;
  const userName = getConfigValue(SYSTEM_USER_NAME);
  const password = getConfigValue(SYSTEM_USER_PASSWORD);

  const routeCredential = {
    password,
    routes: [
      '/workallocation/caseworker',
      '/api/role-access/roles/getJudicialUsers',
      '/workallocation/retrieveCaseWorkersForServices',
      '/workallocation/retrieveCaseWorkersForSpecificService',
      '/workallocation/getJudicialUsers',
      '/api/prd/judicial/searchJudicialUserByPersonalCodes',
    ],
    scope: 'openid profile roles manage-user create-user search-user',
    userName,
  };

  //TODO: we can move these out into proper config at some point to tidy up even further
  const options: AuthOptions = {
    allowRolesRegex: getConfigValue(LOGIN_ROLE_MATCHER),
    authorizationURL: authorizationUrl,
    callbackURL: getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL),
    clientID: idamClient,
    clientSecret: secret,
    discoveryEndpoint: `${idamWebUrl}/o/.well-known/openid-configuration`,
    issuerURL: issuerUrl,
    logoutURL: idamApiPath,
    responseTypes: ['code'],
    routeCredential,
    scope: 'profile openid roles manage-user create-user search-user',
    sessionKey: 'xui-webapp',
    tokenEndpointAuthMethod: 'client_secret_post',
    tokenURL: tokenUrl,
    useRoutes: true,
  };

  const baseStoreOptions = {
    cookie: {
      httpOnly: true,
      maxAge: 28800000,
      secure: showFeature(FEATURE_SECURE_COOKIE_ENABLED),
    },
    name: 'xui-webapp',
    resave: false,
    saveUninitialized: false,
    secret: getConfigValue(SESSION_SECRET),
  };

  const redisStoreOptions = {
    redisStore: {
      ...baseStoreOptions, ...{
        redisStoreOptions: {
          redisCloudUrl: getConfigValue(REDIS_CLOUD_URL),
          redisKeyPrefix: getConfigValue(REDIS_KEY_PREFIX),
          redisTtl: getConfigValue(REDIS_TTL),
        },
      },
    },
  };

  const fileStoreOptions = {
    fileStore: {
      ...baseStoreOptions, ...{
        fileStoreOptions: {
          filePath: getConfigValue(NOW) ? '/tmp/sessions' : '.sessions',
        },
      },
    },
  };

  const nodeLibOptions = {
    auth: {
      s2s: {
        microservice: getConfigValue(MICROSERVICE),
        s2sEndpointUrl: `${getConfigValue(SERVICE_S2S_PATH)}/lease`,
        s2sSecret: s2sSecret.trim(),
      },
      oauth2:options,
    },
    session: showFeature(FEATURE_REDIS_ENABLED) ? redisStoreOptions : fileStoreOptions,
  };
  
  //logger._logger.info('Setting XuiNodeLib options');
  return xuiNode.configure(nodeLibOptions);

 };
