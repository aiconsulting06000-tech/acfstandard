import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'ACF® Certification — 3-Level AI Governance Attestation'
    : 'Certification ACF® — 3 Niveaux d\'Attestation de Gouvernance IA'
  const description = isEn
    ? 'Get ACF® certified: 3 levels (Foundation, Advanced, Excellence), independent audit, publicly verifiable badge.'
    : 'Obtenez la certification ACF® : 3 niveaux (Fondation, Avancé, Excellence), audit indépendant, badge vérifiable publiquement.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/acf-certification`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/acf-certification`,
      siteName: 'ACF Standard',
    },
  }
}

export default function AcfCertificationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
