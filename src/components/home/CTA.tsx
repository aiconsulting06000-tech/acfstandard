"use client"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function CTA(){
  const t = useTranslations()
  
  useEffect(()=>{
    const el = document.getElementById('cta'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.25})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec cta" id="cta">
      <div className="ctn px-4 md:px-16">
        <h3 className="st">{t('cta.title')}</h3>
        <p className="sd">{t('cta.description')}</p>
        <div className="ctabtns">
          <a className="btn primary w-full md:w-auto" href="/contact">{t('cta.primary')}</a>
          <a className="btn ghost w-full md:w-auto" href="/academy">{t('nav.theStandard')}</a>
        </div>
      </div>
    </section>
  )
}
