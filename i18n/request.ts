import { getRequestConfig } from 'next-intl/server'

const locales = ['fr', 'en', 'es', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'is', 'et', 'lv', 'lt', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'sr', 'uk', 'el', 'ar', 'he', 'tr', 'ja', 'zh', 'ko', 'id', 'ms', 'th', 'vi', 'hi', 'ru']

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale)) {
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
