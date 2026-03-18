import type { MetadataRoute } from 'next'

const BASE_URL = 'https://acf-standard.com'

const locales = [
  'fr', 'en', 'es', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'da',
  'no', 'fi', 'is', 'et', 'lv', 'lt', 'cs', 'sk', 'hu', 'ro',
  'bg', 'hr', 'sl', 'sr', 'uk', 'el', 'ar', 'he', 'tr', 'ja',
  'zh', 'ko', 'id', 'ms', 'th', 'vi', 'hi', 'ru',
] as const

const pages = [
  '',
  '/standard',
  '/about',
  '/blog',
  '/contact',
  '/acf-score',
  '/acf-control',
  '/acf-certification',
  '/acf-partners',
  '/compliance-checker',
  '/legal',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of pages) {
      const isHomepage = page === ''
      const url = `${BASE_URL}/${locale}${page}`

      const alternateRefs: { hreflang: string; href: string }[] = locales.map(
        (lang) => ({
          hreflang: lang,
          href: `${BASE_URL}/${lang}${page}`,
        })
      )

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: isHomepage ? 'weekly' : 'monthly',
        priority: isHomepage ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            alternateRefs.map((ref) => [ref.hreflang, ref.href])
          ),
        },
      })
    }
  }

  return entries
}
