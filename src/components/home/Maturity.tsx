'use client'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Maturity(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.getElementById('matwrap'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ [0,380,760,1140].forEach((d,i)=>{ setTimeout(()=>{ const cel = document.getElementById('mc'+i); if(cel) cel.classList.add(i===2?'dg':'da') }, d) }); setTimeout(()=>{ const l=document.getElementById('matline'); if(l) l.classList.add('go') },380); io.disconnect() } }) },{threshold:.3})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="secdark">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">{t('maturity.badge')}</span>
        <h2 className="st rev d1">{t('maturity.title')}</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('maturity.subtitle')}</p>
        <div className="matwrap rev d2" id="matwrap">
          <div className="matlinebg"></div>
          <div className="matlinefg" id="matline"></div>
          <div className="mattrack">
            <div className="matcol" id="mc0"><div className="dotw"><div className="dot"></div></div><div className="mlvl">{t('maturity.level0.code')}</div><div className="mname">{t('maturity.level0.name')}</div><div className="risk rl">{t('maturity.level0.risk')}</div><p className="mdesc">{t('maturity.level0.description')}</p></div>
            <div className="matcol" id="mc1"><div className="dotw"><div className="dot"></div></div><div className="mlvl">{t('maturity.level1.code')}</div><div className="mname">{t('maturity.level1.name')}</div><div className="risk rl">{t('maturity.level1.risk')}</div><p className="mdesc">{t('maturity.level1.description')}</p></div>
            <div className="matcol" id="mc2"><div className="dotw"><div className="dot"></div></div><div className="mlvl">{t('maturity.level2.code')}</div><div className="mname">{t('maturity.level2.name')}</div><div className="risk rm">{t('maturity.level2.risk')}</div><p className="mdesc">{t('maturity.level2.description')}</p><div className="tbadge">{t('maturity.level2.badge')}</div></div>
            <div className="matcol" id="mc3"><div className="dotw"><div className="dot"></div></div><div className="mlvl">{t('maturity.level3.code')}</div><div className="mname">{t('maturity.level3.name')}</div><div className="risk rh">{t('maturity.level3.risk')}</div><p className="mdesc">{t('maturity.level3.description')}</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
