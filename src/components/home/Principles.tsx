'use client'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Principles(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.querySelector('.pgrid'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.15})
    io.observe(el.parentElement!)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="secdark">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">{t('principles.badge')}</span>
        <h2 className="st rev d1">{t('principles.title')}</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('principles.subtitle')}</p>
        <div className="pgrid grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="pcard rev d1"><div className="pnw"><span className="pnum">{t('principles.principle1.number')}</span><span className="pnl">PRINCIPLE</span></div><div className="pt">{t('principles.principle1.title')}</div><p className="pd">{t('principles.principle1.description')}</p><span className="ptag">SOVEREIGNTY</span></div>
          <div className="pcard rev d2"><div className="pnw"><span className="pnum">{t('principles.principle2.number')}</span><span className="pnl">PRINCIPLE</span></div><div className="pt">{t('principles.principle2.title')}</div><p className="pd">{t('principles.principle2.description')}</p><span className="ptag">PROTECTION</span></div>
          <div className="pcard rev d3"><div className="pnw"><span className="pnum">{t('principles.principle3.number')}</span><span className="pnl">PRINCIPLE</span></div><div className="pt">{t('principles.principle3.title')}</div><p className="pd">{t('principles.principle3.description')}</p><span className="ptag">CONTROL</span></div>
          <div className="pcard rev d4"><div className="pnw"><span className="pnum">{t('principles.principle4.number')}</span><span className="pnl">PRINCIPLE</span></div><div className="pt">{t('principles.principle4.title')}</div><p className="pd">{t('principles.principle4.description')}</p><span className="ptag">CONTINUITY</span></div>
        </div>
      </div>
    </section>
  )
}
