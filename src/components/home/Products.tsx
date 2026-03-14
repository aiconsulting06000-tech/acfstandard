"use client"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Products(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.getElementById('products'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.2})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec light" id="products">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">{t('products.badge')}</span>
        <h2 className="st rev d1">{t('products.title')}</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('products.subtitle')}</p>
        <div className="productgrid rev d2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="pitem">{t('products.score.title')}</div>
          <div className="pitem">{t('products.control.title')}</div>
          <div className="pitem">{t('products.certification.title')}</div>
          <div className="pitem">{t('megaMenu.products.saas.gating')}</div>
        </div>
      </div>
    </section>
  )
}
