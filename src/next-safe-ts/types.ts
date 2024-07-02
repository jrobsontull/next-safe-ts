type CSPDirectives = {
  'base-uri'?: string[];
  'child-src'?: string[];
  'connect-src'?: string[];
  'default-src'?: string[];
  'font-src'?: string[];
  'form-action'?: string[];
  'frame-ancestors'?: string[];
  'frame-src'?: string[];
  'img-src'?: string[];
  'manifest-src'?: string[];
  'media-src'?: string[];
  'object-src'?: string[];
  'prefetch-src'?: string[];
  'script-src'?: string[];
  'style-src'?: string[];
  'worker-src'?: string[];
  'block-all-mixed-content'?: string[];
  'plugin-types'?: string[];
  'navigate-to'?: string[];
  'require-sri-for'?: string[];
  'require-trusted-types-for'?: string[];
  sandbox?: string[];
  'script-src-attr'?: string[];
  'script-src-elem'?: string[];
  'style-src-attr'?: string[];
  'style-src-elem'?: string[];
  'trusted-types'?: string[];
  'upgrade-insecure-requests'?: string[];
  'report-to'?: string[];
  'report-uri'?: string[];
};

type ContentTypeDirectives = {
  'X-Content-Type-Options'?: string[];
};

type FrameDirectives = {
  'X-Frame-Options'?: string[];
};

type PermissionsPolicyDirectives = {
  'Permissions-Policy'?: string[];
};

type ReferrerPolicyDirectives = {
  'Referrer-Policy'?: string[];
};

type XSSProtectionDirectives = {
  'X-XSS-Protection'?: string[];
};

type Header = {
  key: string;
  value: string;
};
