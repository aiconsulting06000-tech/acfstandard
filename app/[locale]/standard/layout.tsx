import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'The ACF® Standard — Complete Agentic AI Governance Methodology'
    : 'Le Standard ACF® — Méthodologie Complète de Gouvernance IA Agentique'
  const description = isEn
    ? 'Discover the ACF methodology: 4 founding principles, 4 operational layers, 18 KPIs, 8 implementation modules to govern your AI agents.'
    : 'Découvrez la méthodologie ACF : 4 principes fondateurs, 4 couches opérationnelles, 18 KPIs, 8 modules d\'implémentation pour gouverner vos agents IA.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/standard`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/standard`,
      siteName: 'ACF Standard',
    },
  }
}

export default function StandardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
