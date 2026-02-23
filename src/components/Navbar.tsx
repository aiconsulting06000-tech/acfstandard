'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import MegaMenu from './MegaMenu'
import RegionSelector from './RegionSelector'

export default function Nav(){
  const [megaOpen, setMegaOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const [activePanel, setActivePanel] = useState('framework')

  const openPanel = (panel: string) => {
    setActivePanel(panel)
    setMegaOpen(true)
  }

  return (
    <>
      <nav id="nav">
        <div className="nw">
          <button className="ham" id="hambtn" aria-label="Menu" onClick={() => openPanel('framework')}>
            <span></span><span></span><span></span>
          </button>
          <Link href="/en/" className="logo">
            <div className="lb">ACF</div>
            <div className="logo-text">
              <div className="ln">Agentic Commerce Framework®</div>
              <div className="ls">Global Standard for AI Governance</div>
            </div>
          </Link>
          <div className="nr">
            <div className="nlm">
              <Link href="/en/standard" className="nlm-link">Standard</Link>
              <button className="nlm-btn" onClick={() => openPanel('framework')}>Framework ›</button>
              <button className="nlm-btn" onClick={() => openPanel('method')}>Method ›</button>
              <button className="nlm-btn" onClick={() => openPanel('products')}>Control ›</button>
              <button className="nlm-btn" onClick={() => openPanel('resources')}>Certification ›</button>
              <button className="nlm-btn" onClick={() => openPanel('partners')}>Partners ›</button>
              <Link href="/en/academy" className="nlm-link">Academy</Link>
              <Link href="/en/about" className="nlm-link">About</Link>
            </div>
            <button className="regionbtn" onClick={() => setRegionOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              <span className="region-label">GLOBAL | EN</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <Link href="/en/partners/login" className="npart">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>
              <span className="npart-label">Partners</span>
            </Link>
            <Link href="/en/contact" className="ncta">Request Assessment</Link>
          </div>
        </div>
        <style jsx>{`
          .ham { display: none; flex-direction: column; gap: 5px; background: transparent; border: 1px solid rgba(255,255,255,.15); padding: 10px 12px; cursor: pointer; border-radius: 6px; transition: .2s; flex-shrink: 0; }
          .ham:hover { border-color: var(--gold); }
          .ham span { display: block; width: 20px; height: 1.5px; background: #fff; border-radius: 1px; }
          .logo-text { overflow: hidden; min-width: 0; }
          .ln { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 14px; color: #fff; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .ls { font-size: 9.5px; color: var(--gold); letter-spacing: .1em; text-transform: uppercase; white-space: nowrap; }
          .nr { display: flex; align-items: center; gap: 12px; margin-left: auto; flex-shrink: 0; }
          .nlm { display: flex; align-items: center; gap: 14px; }
          .nlm-link { color: var(--gr2); text-decoration: none; font-size: 13px; font-weight: 500; transition: .2s; white-space: nowrap; }
          .nlm-link:hover { color: var(--gold); }
          .nlm-btn { background: transparent; border: none; color: var(--gr2); font-size: 13px; font-weight: 500; cursor: pointer; font-family: inherit; transition: .2s; padding: 0; white-space: nowrap; }
          .nlm-btn:hover { color: var(--gold); }
          @media(max-width: 1200px) {
            .ln { font-size: 12px; }
            .nlm { gap: 10px; }
            .nlm-link, .nlm-btn { font-size: 11.5px; }
          }
          @media(max-width: 1024px) {
            .nlm-link[href*="academy"], .nlm-link[href*="about"] { display: none; }
          }
          @media(max-width: 900px) {
            .nlm { display: none; }
            .ncta { display: none; }
            .region-label { display: none; }
          }
          @media(max-width: 768px) {
            .ham { display: flex; }
            .nr { display: none; }
            .ls { display: none; }
            .ln { font-size: 13px; }
          }
          @media(max-width: 480px) {
            .ln { font-size: 12px; max-width: 140px; }
            .lb { width: 32px !important; height: 32px !important; font-size: 11px !important; }
          }
        `}</style>
      </nav>
      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} activePanel={activePanel} setActivePanel={setActivePanel} />
      <RegionSelector open={regionOpen} onClose={() => setRegionOpen(false)} />
    </>
  )
}
