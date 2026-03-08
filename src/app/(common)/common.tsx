const isServer = typeof window === 'undefined';
export const BASE_URL = isServer
  ? (process.env.SERVER_API_URL || 'http://backend:8080')
  : (process.env.NEXT_PUBLIC_API_URL || window.location.origin);
export const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;
