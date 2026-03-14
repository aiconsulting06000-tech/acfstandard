"use client"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function HexPath(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.getElementById('hexpath'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.2})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec light" id="hexpath">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">{t('modules.badge')}</span>
        <h2 className="st rev d1">{t('modules.title')}</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('modules.subtitle')}</p>
        <div className="hexgrid rev d2">
          <div className="hexcol">{t('modules.module1.name')}</div>
          <div className="hexcol">{t('modules.module2.name')}</div>
          <div className="hexcol">{t('modules.module3.name')}</div>
          <div className="hexcol">{t('modules.module4.name')}</div>
          <div className="hexcol">{t('modules.module5.name')}</div>
          <div className="hexcol">{t('modules.module6.name')}</div>
        </div>
      </div>
    </section>
  )
}
