import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'Contact — ACF Standard | Agentic Commerce Framework'
    : 'Contact — ACF Standard | Agentic Commerce Framework'
  const description = isEn
    ? 'Contact the ACF Standard team. Questions about the framework, certification or AI governance tools.'
    : 'Contactez l\'équipe ACF Standard. Questions sur le framework, la certification ou les outils de gouvernance IA.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/contact`,
      siteName: 'ACF Standard',
    },
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
