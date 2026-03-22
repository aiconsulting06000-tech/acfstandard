import type { Metadata } from 'next'
import React from 'react'

const BASE_URL = 'https://www.acfstandard.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en' || !['fr'].includes(locale)

  const title = isEn
    ? 'About — Vincent Dorange, Creator of ACF® Standard'
    : 'À Propos — Vincent Dorange, Créateur du Standard ACF®'
  const description = isEn
    ? 'Vincent Dorange, AI governance expert and creator of the Agentic Commerce Framework®. MIT, Columbia, HEC Paris, INSEAD.'
    : 'Vincent Dorange, expert en gouvernance IA et créateur de l\'Agentic Commerce Framework®. MIT, Columbia, HEC Paris, INSEAD.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/about`,
      siteName: 'ACF Standard',
    },
  }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
