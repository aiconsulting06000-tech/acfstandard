import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'ACF Auditor — Agentic AI Maturity Audit | 107 Questions, 7 Dimensions'
    : 'ACF Auditor — Audit de Maturité IA Agentique | 107 Questions, 7 Dimensions'
  const description = isEn
    ? 'Audit your agentic AI maturity with 107 questions across 7 dimensions. Live scoring, insight engine, personalized roadmap.'
    : 'Auditez votre maturité IA agentique avec 107 questions sur 7 dimensions. Scoring en direct, moteur d\'insights, feuille de route personnalisée.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/acf-auditor`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/acf-auditor`,
      siteName: 'ACF Standard',
    },
  }
}

export default function AcfAuditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
