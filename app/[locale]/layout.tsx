import React from 'react'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })
const jb = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jb', display: 'swap' })

const BASE_URL = 'https://acf-standard.com'
const ALL_LOCALES = ['fr', 'en', 'es', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'is', 'et', 'lv', 'lt', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'sr', 'uk', 'el', 'ar', 'he', 'tr', 'ja', 'zh', 'ko', 'id', 'ms', 'th', 'vi', 'hi', 'ru'] as const

function getLocalizedTitle(locale: string): string {
  switch (locale) {
    case 'fr':
      return 'ACF\u00AE \u2014 Le Standard Mondial de Gouvernance IA | Agentic Commerce Framework'
    case 'en':
      return 'ACF\u00AE \u2014 Global AI Governance Standard | Agentic Commerce Framework'
    default:
      return 'ACF\u00AE \u2014 Agentic Commerce Framework | AI Governance Standard'
  }
}

function getLocalizedDescription(locale: string): string {
  switch (locale) {
    case 'fr':
      return "L'Agentic Commerce Framework\u00AE (ACF) est le standard de gouvernance de r\u00E9f\u00E9rence pour d\u00E9ployer et contr\u00F4ler les agents IA autonomes. 4 principes, 18 KPIs, certification."
    case 'en':
    default:
      return 'The Agentic Commerce Framework\u00AE (ACF) is the definitive governance standard for deploying and controlling autonomous AI agents. 4 principles, 18 KPIs, certification.'
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  const title = getLocalizedTitle(locale)
  const description = getLocalizedDescription(locale)
  const canonicalUrl = `${BASE_URL}/${locale}`

  const alternateLanguages: Record<string, string> = {}
  for (const loc of ALL_LOCALES) {
    alternateLanguages[loc] = `${BASE_URL}/${loc}`
  }

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'ACF Standard',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    messages = (await import(`../../messages/en.json`)).default
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ACF Standard",
      "alternateName": ["Agentic Commerce Framework", "ACF"],
      "url": "https://acf-standard.com",
      "description": "The global governance standard for organizations deploying autonomous AI agents.",
      "foundingDate": "2025",
      "founder": {
        "@type": "Person",
        "name": "Vincent DORANGE",
        "url": "https://acf-standard.com/en/about",
        "sameAs": ["https://www.linkedin.com/in/vincent-dorange"]
      },
      "sameAs": ["https://www.linkedin.com/in/vincent-dorange"],
      "knowsAbout": ["AI Governance", "Agentic Commerce", "Autonomous AI Agents", "EU AI Act", "Decision Sovereignty"]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ACF Standard",
      "alternateName": "Agentic Commerce Framework",
      "url": "https://acf-standard.com",
      "description": "The governance standard for organizations deploying autonomous AI agents.",
      "inLanguage": locale,
      "publisher": { "@type": "Organization", "name": "ACF Standard", "url": "https://acf-standard.com" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Vincent DORANGE",
      "jobTitle": "Founder & AI Governance Expert",
      "description": "Creator of the Agentic Commerce Framework\u00AE (ACF\u00AE).",
      "url": "https://acf-standard.com/en/about",
      "worksFor": { "@type": "Organization", "name": "AI Consulting" },
      "knowsAbout": ["AI Governance", "Agentic Commerce", "E-commerce Strategy", "Autonomous AI Agents", "EU AI Act Compliance"],
      "sameAs": ["https://www.linkedin.com/in/vincent-dorange"]
    }
  ]

  return (
    <html lang={locale || 'en'}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
      </head>
      <body className={`${inter.variable} ${space.variable} ${jb.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
