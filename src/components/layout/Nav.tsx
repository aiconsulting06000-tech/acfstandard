'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import MegaMenu from './MegaMenu'
import RegionSelector from './RegionSelector'

export default function Nav(){
  const t = useTranslations()
  const [megaOpen, setMegaOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const [activePanel, setActivePanel] = useState('framework')

  const openPanel = (panel: string) => {
    setActivePanel(panel)
    setMegaOpen(true)
  }

  return (
    <nav id="nav">
      <div className="nw">
        {/* Hamburger — mobile only */}
        <button className="ham" style={{display:'none'}} id="hambtn" aria-label={t('nav.menu')} onClick={() => openPanel('framework')}>
          <span></span><span></span><span></span>
        </button>

        <Link href="/en/" className="logo">
          <div className="lb">ACF</div>
          <div>
            <div className="ln">{t('nav.logoText')}</div>
            <div className="ls">by Vincent DORANGE</div>
          </div>
        </Link>

        <div className="nr" style={{display:'flex', alignItems:'center', gap:16}}>
          <div className="nlm" style={{display:'flex', alignItems:'center', gap:16}}>
            <Link href="/en/standard" className="nlm-link">{t('nav.theStandard')}</Link>
            <button className="nlm-btn" onClick={() => openPanel('framework')}>{t('megaMenu.framework.title')} ›</button>
            <button className="nlm-btn" onClick={() => openPanel('framework')}>{t('megaMenu.framework.methodology.title')} ›</button>
            <button className="nlm-btn" onClick={() => openPanel('products')}>{t('nav.acfControl')} ›</button>
            <button className="nlm-btn" onClick={() => openPanel('resources')}>{t('nav.acfCertification')} ›</button>
            <button className="nlm-btn" onClick={() => openPanel('partners')}>{t('nav.partners')} ›</button>
            <Link href="/en/academy" className="nlm-link">{t('megaMenu.resources.documentation.academy')}</Link>
            <Link href="/en/about" className="nlm-link">{t('megaMenu.about.title')}</Link>
          </div>

          <button className="regionbtn" onClick={() => setRegionOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span>{t('nav.region')}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <Link href="/en/partners/login" className="npart">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>
            {t('nav.partners')}
          </Link>

          <Link href="/en/contact" className="ncta">{t('nav.requestAssessment')}</Link>
        </div>
      </div>

      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} activePanel={activePanel} setActivePanel={setActivePanel} />
      <RegionSelector open={regionOpen} onClose={() => setRegionOpen(false)} />

      <style jsx>{`
        .nlm-link { color: var(--gr2); text-decoration: none; font-size: 13px; font-weight: 500; transition: .2s; }
        .nlm-link:hover { color: var(--gold); }
        .nlm-btn { background: transparent; border: none; color: var(--gr2); font-size: 13px; font-weight: 500; cursor: pointer; font-family: inherit; transition: .2s; padding: 0; }
        .nlm-btn:hover { color: var(--gold); }
        @media(max-width:768px) {
          #hambtn { display: flex !important; }
          .nr { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
