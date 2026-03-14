'use client'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Layers(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.querySelector('.lgrid'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.15})
    io.observe(el.parentElement!)
    return ()=> io.disconnect()
  },[])

  return (
    <section>
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">{t('layers.badge')}</span>
        <h2 className="st rev d1">{t('layers.title')}</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('layers.subtitle')}</p>
        <div className="lgrid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lcard rev d1"><div className="lico">🔒</div><div className="lnum">{t('layers.layer1.number')}</div><div className="lt">{t('layers.layer1.title')}</div><div className="ld">{t('layers.layer1.description')}</div></div>
          <div className="lcard rev d2"><div className="lico">⚖️</div><div className="lnum">{t('layers.layer2.number')}</div><div className="lt">{t('layers.layer2.title')}</div><div className="ld">{t('layers.layer2.description')}</div></div>
          <div className="lcard rev d3"><div className="lico">🤖</div><div className="lnum">{t('layers.layer3.number')}</div><div className="lt">{t('layers.layer3.title')}</div><div className="ld">{t('layers.layer3.description')}</div></div>
          <div className="lcard rev d4"><div className="lico">⚙️</div><div className="lnum">{t('layers.layer4.number')}</div><div className="lt">{t('layers.layer4.title')}</div><div className="ld">{t('layers.layer4.description')}</div></div>
        </div>
      </div>
    </section>
  )
}
