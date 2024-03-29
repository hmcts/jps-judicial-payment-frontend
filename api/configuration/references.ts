/**
 * References to the configuration properties and their values contained with
 * the /config .json files.
 *
 * We store reference on how to extract the value from the .json data structure here.
 *
 * They are reference strings and therefore need to be testable.
 *
 * This file should be representative of the .json files in the root /config folder
 */
export const S2S_SECRET = 'secrets.jps.jps-s2s-client-secret';

export const COOKIES_TOKEN = 'cookies.token';
export const COOKIES_USER_ID = 'cookies.userId';
export const COOKIES_USER_ROLE = 'cookies.userRole';

export const SERVICES_USER_API_PATH = 'services.users_api';
export const SERVICES_LOCATION_API_URL = 'services.location_api';
export const SERVICES_JPS_API_URL = 'services.jps_api';

export const SERVICES_IDAM_API_URL = 'services.idam.idamApiUrl';
export const SERVICES_IDAM_CLIENT_ID = 'services.idam.idamClientID';
export const SERVICES_IDAM_LOGIN_URL = 'services.idam.idamLoginUrl';
export const SERVICES_IDAM_ISS_URL = 'services.idam.iss';
export const SERVICES_IDAM_OAUTH_CALLBACK_URL = 'services.idam.oauthCallbackUrl';

export const SERVICES_S2S_PATH = 'services.s2s';

export const MICROSERVICE = 'microservice';
export const NOW = 'now';

export const SESSION_SECRET = 'sessionSecret';

export const IDAM_SECRET = 'secrets.jps.jps-idam-client-secret';

export const JPS_SYSTEM_USERNAME = 'secrets.jps.idam-jps-system-username';
export const JPS_SYSTEM_PASSWORD = 'secrets.jps.idam-jps-system-password';


export const LOGIN_ROLE_MATCHER = 'loginRoleMatcher';

export const FEATURE_SECURE_COOKIE_ENABLED = 'secureCookieEnabled';

export const CASE_SHARE_PERMISSIONS = 'pui-case-manager';

export const SESSION_TIMEOUTS = 'sessionTimeouts';

export const REDIS_ENABLED = 'redisEnabled'
export const REDISCLOUD_URL = 'secrets.jps.judicial-payment-frontend-redis6-connection-string'
export const REDIS_TTL = 'redis.ttl'
export const REDIS_KEY_PREFIX = 'redis.prefix'

export const OIDC_ENABLED = 'oidcEnabled'
