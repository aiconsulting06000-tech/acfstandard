'use client'
import React from 'react'
import Link from 'next/link'

type Props = { open: boolean; onClose: ()=>void }

export default function MegaMenu({open,onClose}:Props){
  return (
    <>
      <div className={open? 'mo open':'mo'} onClick={onClose}></div>
      <div className={open? 'md open':'md'} id="megadrawer" role="dialog" aria-hidden={!open}>
        <button className="mclose" onClick={onClose}>×</button>
        <div className="ms">
          <div className="mni active" data-panel="framework"><span>Framework</span><span className="marr">›</span></div>
          <div className="mni" data-panel="products"><span>Products</span><span className="marr">›</span></div>
          <div className="mni" data-panel="resources"><span>Resources</span><span className="marr">›</span></div>
          <div className="mni" data-panel="about"><span>About ACF</span><span className="marr">›</span></div>
          <div className="mni" data-panel="partners"><span>Partners</span><span className="marr">›</span></div>
          <div className="muser">
            <div className="muname">Partner Access</div>
            <div className="mulinks">
              <Link href="/en/partners/login">🔐 Partner Login</Link>
              <Link href="/en/partners/apply">Apply to become Partner</Link>
              <Link href="/en/contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className="mc">
          <div className="mp active" id="panel-framework">
            <div className="mpt"><Link href="/en/standard">ACF Standard →</Link></div>
            <div className="mpd">The definitive governance methodology for agentic systems in commercial environments.</div>
            <div className="mgroup"><div className="mgtitle">Architecture</div><ul className="mlinks"><li><Link href="/en/standard#principles">4 Founding Principles</Link></li><li><Link href="/en/standard#layers">4 Operational Layers</Link></li><li><Link href="/en/standard#maturity">4 Maturity Levels</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">Methodology</div><ul className="mlinks"><li><Link href="/en/method">8 Implementation Modules</Link></li><li><Link href="/en/method#constitution">Agentic Constitution</Link></li><li><Link href="/en/method#dda">DDA Role Framework</Link></li><li><Link href="/en/method#killswitch">Kill Switch Protocol</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">FEATURED</div><div className="mfitem"><div className="mftitle">Download the ACF White Paper</div><div className="mfdesc">Full specification — free for registered users.</div></div><div className="mfitem"><div className="mftitle">ACF v1.0 — February 2026</div><div className="mfdesc">Official release. What's new in the framework.</div></div></div>
          </div>
        </div>
      </div>
    </>
  )
}
