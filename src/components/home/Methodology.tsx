"use client"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Methodology(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.querySelector('.mgrid'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.15})
    io.observe(el.parentElement!)
    return ()=> io.disconnect()
  },[])

  const modules = [
    {num:'01',icon:'📋',title:t('modules.module1.name'),desc:t('modules.module1.description')},
    {num:'02',icon:'🎯',title:t('modules.module2.name'),desc:t('modules.module2.description')},
    {num:'03',icon:'🛡️',title:t('modules.module3.name'),desc:t('modules.module3.description')},
    {num:'04',icon:'🔐',title:t('modules.module4.name'),desc:t('modules.module4.description')},
    {num:'05',icon:'📊',title:t('modules.module5.name'),desc:t('modules.module5.description')},
    {num:'06',icon:'🚨',title:t('modules.module6.name'),desc:t('modules.module6.description')},
    {num:'07',icon:'✓',title:t('modules.module7.name'),desc:t('modules.module7.description')},
    {num:'08',icon:'🔄',title:t('modules.module8.name'),desc:t('modules.module8.description')},
  ]

  return (
    <section>
      <div className="ctn">
        <span className="ew rev">{t('modules.badge')}</span>
        <h2 className="st rev d1">{t('modules.title')}</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('modules.subtitle')}</p>
        <div className="mgrid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m,i)=>(
            <div key={i} className="mcard rev" style={{animationDelay: i*50+'ms'}}>
              <div className="mico">{m.icon}</div>
              <div className="mnum">{t(`modules.module${i+1}.code`)}</div>
              <div className="mtitle">{m.title}</div>
              <div className="mdesc">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
