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
export const S2S_SECRET = 'secrets.jps.mc-s2s-client-secret';
export const REDIS_CLOUD_URL = 'secrets.jps.webapp-redis-connection-string';

export const COOKIES_TOKEN = 'cookies.token';
export const COOKIES_USER_ID = 'cookies.userId';

export const SERVICES_IDAM_API_URL = 'services.idam.idamApiUrl';
export const SERVICES_IDAM_CLIENT_ID = 'services.idam.idamClientID';
export const SERVICES_IDAM_LOGIN_URL = 'services.idam.idamLoginUrl';
export const SERVICES_IDAM_ISS_URL = 'services.idam.iss';
export const SERVICES_IDAM_OAUTH_CALLBACK_URL = 'services.idam.oauthCallbackUrl';

export const SERVICE_S2S_PATH = 'services.s2s';

export const MICROSERVICE = 'microservice';
export const NOW = 'now';

export const SESSION_SECRET = 'sessionSecret';

export const IDAM_SECRET = 'secrets.jps.mc-idam-client-secret';

export const SYSTEM_USER_NAME = 'secrets.jps.system-user-name';

export const SYSTEM_USER_PASSWORD = 'secrets.jps.system-user-password';

export const LOGIN_ROLE_MATCHER = 'loginRoleMatcher';

export const FEATURE_SECURE_COOKIE_ENABLED = 'secureCookieEnabled';
export const FEATURE_REDIS_ENABLED = 'redisEnabled';

export const REDIS_KEY_PREFIX = 'redis.prefix';
export const REDIS_TTL = 'redis.ttl';

export const CASE_SHARE_PERMISSIONS = 'pui-case-manager';

export const SESSION_TIMEOUTS = 'sessionTimeouts';
