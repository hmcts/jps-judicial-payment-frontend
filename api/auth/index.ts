import { AUTH, AuthOptions, xuiNode } from '@hmcts/rpx-xui-node-lib';
import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { getConfigValue, showFeature } from '../configuration';
import {
  COOKIES_TOKEN,
  COOKIES_SERVICE_TOKEN,
  COOKIES_USER_ID,
  COOKIES_USER_ROLE,
  FEATURE_SECURE_COOKIE_ENABLED,
  IDAM_SECRET,
  LOGIN_ROLE_MATCHER,
  MICROSERVICE,
  NOW,
  S2S_SECRET,
  SERVICES_S2S_PATH,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_ISS_URL,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  SESSION_SECRET
} from '../configuration/references';

export const successCallback = (req: EnhancedRequest, res: Response, next: NextFunction) => {
  const {user} = req.session.passport;
  const {userinfo} = user;
  const {accessToken} = user.tokenset;
  const {ServiceAuthorization} = req.headers;
  const cookieToken = getConfigValue(COOKIES_TOKEN);
  const cookieServiceToken = getConfigValue(COOKIES_SERVICE_TOKEN);
  const cookieUserId = getConfigValue(COOKIES_USER_ID);
  const cookieUserRole = getConfigValue(COOKIES_USER_ROLE);
  
  res.cookie(cookieUserId, userinfo.uid);
  res.cookie(cookieToken, accessToken);
  res.cookie(cookieServiceToken, ServiceAuthorization);
  res.cookie(cookieUserRole, userinfo.roles);

  if (!req.isRefresh) {
    return res.redirect('/');
  }
  next();
};

export const failureCallback = (req: EnhancedRequest, res: Response, next: NextFunction) => {
  const errorMsg = `Auth Error: ${res.locals.message}`;
}

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
    scope: 'profile openid roles manage-user create-user search-user',
    sessionKey: 'jps-judicial-payment-frontend',
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
    name: 'jps-judicial-payment-frontend',
    resave: false,
    saveUninitialized: false,
    secret: getConfigValue(SESSION_SECRET),
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
        s2sEndpointUrl: `${getConfigValue(SERVICES_S2S_PATH)}/lease`,
        s2sSecret: s2sSecret.trim(),
      },
      oauth2:options,
    },
    session: fileStoreOptions,
  };
  
  return xuiNode.configure(nodeLibOptions);

 };
