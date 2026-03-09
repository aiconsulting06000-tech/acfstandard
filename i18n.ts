export const defaultLocale = 'fr'
export const locales = ['fr', 'en', 'es', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'is', 'et', 'lv', 'lt', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'sr', 'uk', 'el', 'ar', 'he', 'tr', 'ja', 'zh', 'ko', 'id', 'ms', 'th', 'vi', 'hi', 'ru']
export function getLocaleFromPath(pathname:string){ const parts = pathname.split('/').filter(Boolean); return locales.includes(parts[0])? parts[0] : defaultLocale }
