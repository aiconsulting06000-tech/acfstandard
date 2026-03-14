"use client"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Ecosystem(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.querySelector('.ecgrid'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.15})
    io.observe(el.parentElement!)
    return ()=> io.disconnect()
  },[])

  return (
    <section>
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">{t('products.badge')}</span>
        <h2 className="st rev d1">{t('products.title')}</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('products.subtitle')}</p>
        <div className="ecgrid grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="eccard rev d1">
            <div className="ecico">🤝</div>
            <div className="ectitle">{t('megaMenu.partners.portal.title')}</div>
            <div className="ecdesc">{t('products.control.description')}</div>
            <Link href="/en/partners" className="eclink">{t('megaMenu.partners.link')}</Link>
          </div>
          <div className="eccard rev d2">
            <div className="ecico">👨‍💼</div>
            <div className="ectitle">{t('megaMenu.resources.documentation.academy')}</div>
            <div className="ecdesc">{t('products.certification.description')}</div>
            <Link href="/en/academy" className="eclink">{t('megaMenu.resources.link')}</Link>
          </div>
          <div className="eccard rev d3">
            <div className="ecico">🏢</div>
            <div className="ectitle">{t('megaMenu.about.whoWeAre.title')}</div>
            <div className="ecdesc">{t('products.score.description')}</div>
            <Link href="/en/contact" className="eclink">{t('megaMenu.about.howWeWork.contact')}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
