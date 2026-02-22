'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import MegaMenu from './MegaMenu'
import RegionSelector from './RegionSelector'

export default function Nav(){
  const [megaOpen,setMegaOpen] = useState(false)
  const [regionOpen,setRegionOpen] = useState(false)

  return (
    <nav id="nav">
      <div className="nw">
        <button className="ham" id="hambtn" aria-label="Menu" onClick={()=>setMegaOpen(true)}>
          <span></span><span></span><span></span>
        </button>
        <Link href="/en/" className="logo">
          <div className="lb">ACF</div>
          <div>
            <div className="ln">Agentic Commerce Framework®</div>
            <div className="ls">by Vincent DORANGE</div>
          </div>
        </Link>

        <div className="nr">
          <div className="nlm">
            <Link href="/en/standard">Standard</Link>
            <Link href="/en/control">ACF Control</Link>
            <Link href="/en/blog">Blog</Link>
          </div>

          <button className="regionbtn" id="regionbtn" onClick={()=>setRegionOpen(true)}>
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

      <MegaMenu open={megaOpen} onClose={()=>setMegaOpen(false)} />
      <RegionSelector open={regionOpen} onClose={()=>setRegionOpen(false)} />
    </nav>
  )
}
