import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'ACF Score — Free AI Sovereignty Diagnostic | Agentic Commerce Framework'
    : 'ACF Score — Diagnostic Gratuit de Souveraineté IA | Agentic Commerce Framework'
  const description = isEn
    ? 'Evaluate your AI decision sovereignty in 5 minutes. Composite score, 6-axis radar, personalized action plan. Free.'
    : 'Évaluez votre souveraineté décisionnelle IA en 5 minutes. Score composite, radar 6 axes, plan d\'action personnalisé. Gratuit.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/acf-score`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/acf-score`,
      siteName: 'ACF Standard',
    },
  }
}

export default function AcfScoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
