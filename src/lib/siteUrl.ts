const DEFAULT_SITE_URL = 'https://bestaiagent.in';

type ImportMetaWithEnv = {
  env?: {
    VITE_SITE_URL?: string;
  };
};

function normalizeSiteUrl(value: string | undefined) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/\/$/, '');
}

export const SITE_URL =
  normalizeSiteUrl(typeof process !== 'undefined' ? process.env.SITE_URL : undefined) ||
  normalizeSiteUrl(typeof import.meta !== 'undefined' ? (import.meta as ImportMetaWithEnv).env?.VITE_SITE_URL : undefined) ||
  DEFAULT_SITE_URL;

export function publicUrl(pathName = '/') {
  if (/^https?:\/\//i.test(pathName)) return pathName;
  const normalizedPath = pathName.startsWith('/') ? pathName : `/${pathName}`;
  return `${SITE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`;
}

export function normalizePath(inputPath: string) {
  const clean = inputPath.split('?')[0].replace(/\/+$/, '');
  return clean || '/';
}
