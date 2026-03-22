import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'FAQ — Frequently Asked Questions about ACF® Standard & AI Governance'
    : 'FAQ — Questions Fréquentes sur le Standard ACF® et la Gouvernance IA'
  const description = isEn
    ? 'Answers to the most frequently asked questions about the Agentic Commerce Framework, certification, KPIs and deployment.'
    : 'Réponses aux questions les plus fréquentes sur l\'Agentic Commerce Framework, la certification, les KPIs et le déploiement.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/faq`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/faq`,
      siteName: 'ACF Standard',
    },
  }
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
