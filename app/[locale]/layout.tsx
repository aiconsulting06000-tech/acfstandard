import '../globals.css'
import React from 'react'
import Nav from '../../src/components/layout/Nav'
import Footer from '../../src/components/layout/Footer'

import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })
const jb = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jb', display: 'swap' })

export const metadata = {
  title: 'ACF — Agentic Commerce Framework',
}

export default function LocaleLayout({ children, params }:{children:React.ReactNode, params:any}){
  return (
    <html lang={params.locale||'en'}>
      <body className={`acf-bg acf-text ${inter.variable} ${space.variable} ${jb.variable} antialiased`}>
        <Nav />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
