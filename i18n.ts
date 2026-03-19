export const defaultLocale = 'fr'
export const locales = ['fr', 'en', 'es', 'de', 'pt', 'ja', 'zh', 'ko', 'it', 'nl', 'ru', 'ar', 'tr']
export function getLocaleFromPath(pathname:string){ const parts = pathname.split('/').filter(Boolean); return locales.includes(parts[0])? parts[0] : defaultLocale }
