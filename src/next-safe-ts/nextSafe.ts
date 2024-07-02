import { buildCSPHeaders } from './csp';
import { buildPermissionsPolicyHeaders } from './permPolicy';
import { getHeaderObject, isValidHeader } from './utils';

function nextSafe(
  isDev = false,
  contentTypeOptions: ContentTypeDirectives = {},
  contentSecurityPolicy: CSPDirectives = {},
  frameOptions: FrameDirectives = {},
  permissionsPolicy: PermissionsPolicyDirectives = {},
  referrerPolicy: ReferrerPolicyDirectives = {},
  xssProtection: XSSProtectionDirectives = {},
  extendDefaults = false
): Header[] {
  const headers = [
    ...buildCSPHeaders(isDev, contentSecurityPolicy, extendDefaults),
    ...buildPermissionsPolicyHeaders(isDev, permissionsPolicy, extendDefaults),
    getHeaderObject(
      'Referrer-Policy',
      ['no-referrer'],
      referrerPolicy['Referrer-Policy'],
      extendDefaults
    ),
    getHeaderObject(
      'X-Content-Type-Options',
      ['nosniff'],
      contentTypeOptions['X-Content-Type-Options'],
      extendDefaults
    ),
    getHeaderObject(
      'X-Frame-Options',
      ['DENY'],
      frameOptions['X-Frame-Options'],
      extendDefaults
    ),
    getHeaderObject(
      'X-XSS-Protection',
      ['1; mode=block'],
      xssProtection['X-XSS-Protection'],
      extendDefaults
    ),
  ];
  return headers.filter(isValidHeader);
}

export { nextSafe };
