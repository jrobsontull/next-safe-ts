import { buildCSPHeaders } from './csp';

function getHeaders(
  isDev = false,
  contentSecurityPolicy: CSPDirectives = {}
): Header[] {
  return [...buildCSPHeaders(isDev, contentSecurityPolicy)];
}

export { getHeaders };
