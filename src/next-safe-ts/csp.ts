import { headerArrayToString } from './utils';

const devDirectives = {
  'connect-src': ['webpack://*'],
  'script-src': ["'unsafe-eval'"],
  'style-src': ["'unsafe-inline'"],
};

function getCSPDirective(
  defaultValues: string[],
  values?: string[],
  extendDefaults = false
): string[] {
  if (!values) {
    return defaultValues;
  }

  const mergedValueArray = extendDefaults
    ? [...defaultValues, ...values]
    : values;

  return mergedValueArray.filter(
    (value, index, self) => self.indexOf(value) === index
  );
}

function buildCSPHeaders(
  isDev: boolean,
  contentSecurityPolicy?: CSPDirectives,
  reportOnly = false,
  extendDefaults = false
): Header[] {
  if (!contentSecurityPolicy) {
    return [];
  }

  const directives: CSPDirectives = {
    'base-uri': getCSPDirective(
      ["'none'"],
      contentSecurityPolicy['base-uri'],
      extendDefaults
    ),
    'child-src': getCSPDirective(
      ["'none'"],
      contentSecurityPolicy['child-src'],
      extendDefaults
    ),
    'connect-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['connect-src'],
      extendDefaults
    ),
    'default-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['default-src'],
      extendDefaults
    ),
    'font-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['font-src'],
      extendDefaults
    ),
    'form-action': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['form-action'],
      extendDefaults
    ),
    'frame-ancestors': getCSPDirective(
      ["'none'"],
      contentSecurityPolicy['frame-ancestors'],
      extendDefaults
    ),
    'frame-src': getCSPDirective(
      ["'none'"],
      contentSecurityPolicy['frame-src'],
      extendDefaults
    ),
    'img-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['img-src'],
      extendDefaults
    ),
    'manifest-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['manifest-src'],
      extendDefaults
    ),
    'media-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['media-src'],
      extendDefaults
    ),
    'object-src': getCSPDirective(
      ["'none'"],
      contentSecurityPolicy['object-src'],
      extendDefaults
    ),
    'prefetch-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['prefetch-src'],
      extendDefaults
    ),
    'script-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['script-src'],
      extendDefaults
    ),
    'style-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['style-src'],
      extendDefaults
    ),
    'worker-src': getCSPDirective(
      ["'self'"],
      contentSecurityPolicy['worker-src'],
      extendDefaults
    ),
    'block-all-mixed-content': getCSPDirective(
      [],
      contentSecurityPolicy['block-all-mixed-content']
    ),
    'plugin-types': getCSPDirective([], contentSecurityPolicy['plugin-types']),
    'navigate-to': getCSPDirective([], contentSecurityPolicy['navigate-to']),
    'require-sri-for': getCSPDirective(
      [],
      contentSecurityPolicy['require-sri-for']
    ),
    'require-trusted-types-for': getCSPDirective(
      [],
      contentSecurityPolicy['require-trusted-types-for']
    ),
    sandbox: getCSPDirective([], contentSecurityPolicy.sandbox, extendDefaults),
    'script-src-attr': getCSPDirective(
      [],
      contentSecurityPolicy['script-src-attr']
    ),
    'script-src-elem': getCSPDirective(
      [],
      contentSecurityPolicy['script-src-elem']
    ),
    'style-src-attr': getCSPDirective(
      [],
      contentSecurityPolicy['style-src-attr']
    ),
    'style-src-elem': getCSPDirective(
      [],
      contentSecurityPolicy['style-src-elem']
    ),
    'trusted-types': getCSPDirective(
      [],
      contentSecurityPolicy['trusted-types']
    ),
    'upgrade-insecure-requests': getCSPDirective(
      [],
      contentSecurityPolicy['upgrade-insecure-requests']
    ),
  };

  if (contentSecurityPolicy['report-to']) {
    const reportDirectiveValue = getCSPDirective(
      [],
      contentSecurityPolicy['report-to']
    );
    directives['report-uri'] = reportDirectiveValue;
    directives['report-to'] = reportDirectiveValue;
  } else if (contentSecurityPolicy['report-uri']) {
    const reportDirectiveValue = getCSPDirective(
      [],
      contentSecurityPolicy['report-uri']
    );
    directives['report-uri'] = reportDirectiveValue;
    directives['report-to'] = reportDirectiveValue;
  }

  // For each entry in directives, if the array is empty remove the key
  for (const [key, value] of Object.entries(directives)) {
    if (value.length === 0) {
      delete directives[key as keyof CSPDirectives];
    }
  }

  // Add dev directives if in dev mode i.e. local next.js development
  if (isDev) {
    for (const [key, value] of Object.entries(devDirectives)) {
      if (directives[key as keyof CSPDirectives]) {
        directives[key as keyof CSPDirectives] = [
          ...(directives[key as keyof CSPDirectives] as string[]),
          ...value,
        ];
      } else {
        directives[key as keyof CSPDirectives] = value;
      }
    }
  }

  const cspString = headerArrayToString(directives);
  const cspHeaderNames = [
    `Content-Security-Policy${reportOnly ? '-Report-Only' : ''}`,
    `X-Content-Security-Policy${reportOnly ? '-Report-Only' : ''}`,
    'X-WebKit-CSP',
  ];

  return cspHeaderNames.map((headerName) => ({
    key: headerName,
    value: cspString,
  }));
}

export { buildCSPHeaders };
