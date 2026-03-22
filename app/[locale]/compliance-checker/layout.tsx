import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'ACF® Compliance Checker — Free AI Governance Compliance Tool'
    : 'Compliance Checker ACF® — Vérificateur de Conformité IA Gratuit'
  const description = isEn
    ? 'Check your organization\'s ACF® compliance for free. Instant results and recommendations.'
    : 'Vérifiez gratuitement la conformité de votre organisation au standard ACF®. Résultats instantanés et recommandations.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/compliance-checker`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/compliance-checker`,
      siteName: 'ACF Standard',
    },
  }
}

export default function ComplianceCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
