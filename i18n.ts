export const defaultLocale = 'en'
export const locales = ['en','fr']
export function getLocaleFromPath(pathname:string){ const parts = pathname.split('/').filter(Boolean); return locales.includes(parts[0])? parts[0] : defaultLocale }
