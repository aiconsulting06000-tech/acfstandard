import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'ACF Control — Real-Time AI Governance & Monitoring Platform'
    : 'ACF Control — Plateforme de Monitoring et Gouvernance IA en Temps Réel'
  const description = isEn
    ? 'Monitor your AI agents in real-time. Dashboard, alerts, Emergency Stop Protocol, audit trail. The control tower for your autonomous agents.'
    : 'Supervisez vos agents IA en temps réel. Tableau de bord, alertes, Emergency Stop Protocol, audit trail. La tour de contrôle de vos agents autonomes.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/acf-control`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/acf-control`,
      siteName: 'ACF Standard',
    },
  }
}

export default function AcfControlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
