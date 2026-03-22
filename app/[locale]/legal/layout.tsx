import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'Legal Notice — ACF Standard'
    : 'Mentions Légales — ACF Standard'
  const description = isEn
    ? 'Legal notice, privacy policy and terms of use for the ACF Standard website.'
    : 'Mentions légales, politique de confidentialité et conditions d\'utilisation du site ACF Standard.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/legal`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/legal`,
      siteName: 'ACF Standard',
    },
  }
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
