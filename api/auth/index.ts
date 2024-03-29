import { AUTH, AuthOptions, xuiNode } from '@hmcts/rpx-xui-node-lib';
import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { getConfigValue, showFeature } from '../configuration';
import {
  COOKIES_TOKEN,
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
  SESSION_SECRET,
  JPS_SYSTEM_USERNAME,
  JPS_SYSTEM_PASSWORD,
  REDIS_ENABLED,
  REDISCLOUD_URL,
  REDIS_KEY_PREFIX,
  REDIS_TTL,
  OIDC_ENABLED
} from '../configuration/references';

export const successCallback = (req: EnhancedRequest, res: Response, next: NextFunction) => {
  const {user} = req.session.passport;
  console.log(user)
  const {userinfo} = user;
  const {accessToken} = user.tokenset;
  const cookieToken = getConfigValue(COOKIES_TOKEN);
  const cookieUserId = getConfigValue(COOKIES_USER_ID);
  const cookieUserRole = getConfigValue(COOKIES_USER_ROLE);
  const uid = userinfo.uid ? userinfo.uid: userinfo.id;
  const uName = userinfo.name ? userinfo.name : `${userinfo.forename} ${userinfo.surname}`
  res.cookie(cookieUserId, [uid, uName]);
  res.cookie(cookieToken, accessToken);
  res.cookie(cookieUserRole, userinfo.roles);

  if (!req.isRefresh) {
    return res.redirect('/');
  }
  next();
};

export const failureCallback = (req: EnhancedRequest, res: Response, next: NextFunction) => {
  const errorMsg = `Auth Error: ${res.locals['message']}`;
  console.log(res)
  console.log(errorMsg)
}

xuiNode.on(AUTH.EVENT.AUTHENTICATE_SUCCESS, successCallback);
xuiNode.on(AUTH.EVENT.AUTHENTICATE_FAILURE, failureCallback);

export const getXuiNodeMiddleware = () => {
  console.log(`Redis enabled is set to ${showFeature(REDIS_ENABLED)}`)
  console.log(`Redis url set to: ${getConfigValue(REDISCLOUD_URL)}`)
  console.log(`OIDC set to: ${showFeature(OIDC_ENABLED)}`)
  console.log(`s2s set to: ${getConfigValue(S2S_SECRET)}`)
  console.log(`using s2s path: ${getConfigValue(SERVICES_S2S_PATH)}`)
  console.log(`Using auth option: ${showFeature(OIDC_ENABLED) ? 'oidc' : 'oauth2'}`)
  const idamWebUrl = getConfigValue(SERVICES_IDAM_LOGIN_URL);
  const authorizationUrl = `${idamWebUrl}/login`;
  const secret = getConfigValue(IDAM_SECRET);
  const idamClient = getConfigValue(SERVICES_IDAM_CLIENT_ID);
  const issuerUrl = getConfigValue(SERVICES_IDAM_ISS_URL);
  const idamApiPath = getConfigValue(SERVICES_IDAM_API_URL);
  const s2sSecret = getConfigValue(S2S_SECRET);
  const tokenUrl = `${getConfigValue(SERVICES_IDAM_API_URL)}/oauth2/token`;
  const userName = getConfigValue(JPS_SYSTEM_USERNAME);
  const password = getConfigValue(JPS_SYSTEM_PASSWORD);
  const routeCredential = {
    password,
    routes: [
      '/refdata/userInfo'
    ],
    scope: 'openid profile roles',
    userName
  };

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
    scope: 'profile openid roles',
    sessionKey: 'jps_judicial_payment_frontend',
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
    name: 'jps_judicial_payment_frontend',
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

  const redisStoreOptions = {
    redisStore: {
      ...baseStoreOptions, ...{
        redisStoreOptions: {
          redisCloudUrl: getConfigValue(REDISCLOUD_URL),
          redisKeyPrefix: getConfigValue(REDIS_KEY_PREFIX),
          redisTtl: getConfigValue(REDIS_TTL)
        }
      }
    }
  };

  const nodeLibOptions = {
    auth: {
      s2s: {
        microservice: getConfigValue(MICROSERVICE),
        s2sEndpointUrl: `${getConfigValue(SERVICES_S2S_PATH)}/lease`,
        s2sSecret: s2sSecret.trim(),
      },
    },
    session: showFeature(REDIS_ENABLED) ? redisStoreOptions : fileStoreOptions
  };

  const type = showFeature(OIDC_ENABLED) ? 'oidc' : 'oauth2';
  nodeLibOptions.auth[type] = options;
  return xuiNode.configure(nodeLibOptions);

};
