"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";'use client'
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
          <button className="ham" style={{display:'none'}} id="hambtn" aria-label="Menu" onClick={() => openPanel('framework')}>
            <span></span><span></span><span></span>
          </button>
          <Link href="/en/" className="logo">
            <div className="lb">ACF</div>
            <div>
              <div className="ln">Agentic Commerce Framework®</div>
              <div className="ls">by Vincent DORANGE</div>
            </div>
          </Link>
          <div className="nr" style={{display:'flex', alignItems:'center', gap:16}}>
            <div className="nlm" style={{display:'flex', alignItems:'center', gap:16}}>
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
              <span>GLOBAL | EN</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <Link href="/en/partners/login" className="npart">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>
              Partners
            </Link>
            <Link href="/en/contact" className="ncta">Request Assessment</Link>
          </div>
        </div>
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
      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} activePanel={activePanel} setActivePanel={setActivePanel} />
      <RegionSelector open={regionOpen} onClose={() => setRegionOpen(false)} />
    </>
  )
}


const navItems = [
  { href: "/standard", label: "Standard" },
  { href: "/framework", label: "Framework" },
  { href: "/method", label: "Method" },
  { href: "/control", label: "Control" },
  { href: "/certification", label: "Certification" },
  { href: "/partners", label: "Partners" },
  { href: "/academy", label: "Academy" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-50" style={{ background: 'var(--acf-surface)' }}>
      <div className="container flex items-center justify-between" style={{ height: 70 }}>
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center">
            <span style={{ color: 'var(--acf-accent)', fontWeight: 800, fontSize: 18 }}>ACF</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide" style={{ color: 'var(--acf-accent)' }}>Agentic Commerce Framework</div>
            <div className="text-xs muted">by Vincent DORANGE</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" style={{ color: pathname === item.href ? 'var(--acf-accent)' : undefined }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="btn hidden md:inline-block">Contact</Link>
          <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="var(--acf-accent)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="var(--acf-accent)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t" style={{ background: 'var(--acf-surface)', borderColor: 'var(--acf-accent)' }}>
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold transition" style={{ color: pathname === item.href ? 'var(--acf-accent)' : 'var(--acf-foreground-muted)', background: pathname === item.href ? 'rgba(201,168,76,0.1)' : undefined }}>
                {item.label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn block w-full text-center">Contact</Link>
            </div>
          </nav>
        </div>
      )}
      <style jsx>{`
        .nav-link { color: var(--acf-foreground-muted); font-weight: 600; }
        .nav-link:hover { color: var(--acf-accent); }
      `}</style>
    </header>
  );
}
