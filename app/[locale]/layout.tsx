import React from 'react'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })
const jb = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jb', display: 'swap' })

const BASE_URL = 'https://acf-standard.com'
const ALL_LOCALES = ['fr', 'en', 'es', 'de', 'pt', 'ja', 'zh', 'ko', 'it', 'nl', 'ru', 'ar', 'tr'] as const

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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Agentic Commerce Framework® (ACF)?",
          "acceptedAnswer": { "@type": "Answer", "text": "The ACF is the global governance standard for organizations deploying autonomous AI agents in commercial environments. It defines 4 founding principles, 4 operational layers, 8 implementation modules, and 18 sovereignty KPIs to ensure humans retain strategic control over agentic systems." }
        },
        {
          "@type": "Question",
          "name": "Who created the ACF Standard?",
          "acceptedAnswer": { "@type": "Answer", "text": "The ACF was created by Vincent DORANGE, an AI governance expert. The framework addresses the growing need for structured governance as autonomous agents increasingly make decisions in commerce, finance, and operations." }
        },
        {
          "@type": "Question",
          "name": "What are the 4 Founding Principles of ACF?",
          "acceptedAnswer": { "@type": "Answer", "text": "The four principles are: (1) Decision Sovereignty — critical decisions are never delegated to agents, (2) Governance by Design — governance is defined before deployment, (3) Ultimate Human Control — every system preserves human intervention, (4) Traceable Accountability — every action is auditable." }
        },
        {
          "@type": "Question",
          "name": "What is the ACF Sovereignty Score?",
          "acceptedAnswer": { "@type": "Answer", "text": "The ACF Score is a proprietary metric measuring organizational decisional independence across 6 governance dimensions, providing a composite sovereignty score, 6-axis radar visualization, and personalized action plan." }
        },
        {
          "@type": "Question",
          "name": "What are the ACF maturity levels?",
          "acceptedAnswer": { "@type": "Answer", "text": "ACF defines 4 levels: Level 0 (Classical Automation), Level 1 (Assisted Agents), Level 2 (Governed Agents — recommended target), Level 3 (Supervised Autonomous — for mature organizations only)." }
        },
        {
          "@type": "Question",
          "name": "How does ACF relate to the EU AI Act?",
          "acceptedAnswer": { "@type": "Answer", "text": "ACF is designed to be fully compatible with the EU AI Act. Its risk-based governance approach maps directly to the Act's requirements for high-risk AI systems." }
        },
        {
          "@type": "Question",
          "name": "What is the DDA (Delegated Decision Agent) role?",
          "acceptedAnswer": { "@type": "Answer", "text": "The DDA is a governance role defined by ACF. The Delegated Decision Agent Officer serves as the legal guardian of autonomous agents — defining mandates, monitoring compliance, and ensuring agents stay within authorized decision perimeters." }
        },
        {
          "@type": "Question",
          "name": "How do I get ACF certified?",
          "acceptedAnswer": { "@type": "Answer", "text": "ACF Certification is an independent attestation with three paths (Level 1, 2, and 3), each requiring an audit. Certified organizations receive a publicly verifiable badge with annual renewal and continuous monitoring." }
        },
        {
          "@type": "Question",
          "name": "What is the ACF Emergency Stop Protocol?",
          "acceptedAnswer": { "@type": "Answer", "text": "A 3-level interrupt mechanism: Level 1 pauses non-critical operations, Level 2 suspends all agent decision-making, Level 3 performs full system shutdown. Each level has defined response times and escalation procedures." }
        },
        {
          "@type": "Question",
          "name": "Is ACF only for large enterprises?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. ACF scales from startups to large enterprises. The 8 implementation modules can be deployed progressively over 6-18 months, allowing organizations of any size to build governance at their own pace." }
        }
      ]
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
