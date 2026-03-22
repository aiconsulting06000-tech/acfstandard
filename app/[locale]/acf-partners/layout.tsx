import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'ACF® Partners — Certified AI Governance Partner Network'
    : 'Partenaires ACF® — Réseau de Partenaires Certifiés en Gouvernance IA'
  const description = isEn
    ? 'Join the ACF® partner network or find a certified partner to guide your agentic transformation.'
    : 'Rejoignez le réseau de partenaires ACF® ou trouvez un partenaire certifié pour accompagner votre transformation agentique.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/acf-partners`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/acf-partners`,
      siteName: 'ACF Standard',
    },
  }
}

export default function AcfPartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
