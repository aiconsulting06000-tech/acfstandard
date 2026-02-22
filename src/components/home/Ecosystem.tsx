"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'

export default function Ecosystem(){
  useEffect(()=>{
    const el = document.querySelector('.ecgrid'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.15})
    io.observe(el.parentElement!)
    return ()=> io.disconnect()
  },[])

  return (
    <section>
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">// Community</span>
        <h2 className="st rev d1">ACF Ecosystem</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">A network of certified partners, practitioners, and organizations building sovereign agentic systems.</p>
        <div className="ecgrid grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="eccard rev d1">
            <div className="ecico">🤝</div>
            <div className="ectitle">Technology Partners</div>
            <div className="ecdesc">Integrations with major AI platforms, control systems, and enterprise software.</div>
            <Link href="/en/partners" className="eclink">Explore Partners →</Link>
          </div>
          <div className="eccard rev d2">
            <div className="ecico">👨‍💼</div>
            <div className="ectitle">ACF Practitioners</div>
            <div className="ecdesc">Certified governance architects and implementation experts.</div>
            <Link href="/en/academy" className="eclink">Find Practitioners →</Link>
          </div>
          <div className="eccard rev d3">
            <div className="ecico">🏢</div>
            <div className="ectitle">Regulated Organizations</div>
            <div className="ecdesc">Companies deploying governed agents in financial, healthcare, and public sectors.</div>
            <Link href="/en/contact" className="eclink">Join the Ecosystem →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
