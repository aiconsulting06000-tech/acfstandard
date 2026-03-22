import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'ACF® Blog — AI Governance & Agentic Commerce Insights'
    : 'Blog ACF® — Actualités sur la Gouvernance IA et le Commerce Agentique'
  const description = isEn
    ? 'Articles, analysis and news on AI governance, autonomous agents, EU AI Act and the Agentic Commerce Framework.'
    : 'Articles, analyses et actualités sur la gouvernance IA, les agents autonomes, l\'EU AI Act et l\'Agentic Commerce Framework.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/blog`,
      siteName: 'ACF Standard',
    },
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
