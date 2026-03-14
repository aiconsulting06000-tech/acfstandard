'use client'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function StatsBar(){
  const t = useTranslations()
  useEffect(()=>{
    const items = [{id:'c1',val:4},{id:'c2',val:18},{id:'c3',val:17},{id:'c4',val:100}]
    function run(){
      items.forEach(t=>{
        const el = document.getElementById(t.id); if(!el) return
        const cel = el as HTMLElement
        let start: number | null = null; const dur = 1600
        function step(ts:number){ if(!start) start = ts; const p = Math.min((ts-start!)/dur,1); const e = 1-Math.pow(1-p,4); cel.textContent = String(Math.round(e*t.val)); if(p<1) requestAnimationFrame(step); else cel.textContent = String(t.val) }
        requestAnimationFrame(step)
      })
    }
    const b = document.getElementById('statsbar')
    if(b) document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis'))
    const onScroll = ()=>{ const b = document.getElementById('statsbar'); if(!b) return; const r = b.getBoundingClientRect(); if(r.top < window.innerHeight && r.bottom > 0) run(); b.removeEventListener('scroll', onScroll) }
    window.addEventListener('scroll', onScroll, { passive:true })
    setTimeout(onScroll,200)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <div className="sbar" id="statsbar">
      <div className="sgrid grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="sc2"><div className="scw"><span className="ctr" id="c1">0</span></div><div className="slbl">{t('statsBar.layers.label')}</div></div>
        <div className="sc2"><div className="scw"><span className="ctr" id="c2">0</span></div><div className="slbl">{t('statsBar.kpis.label')}</div></div>
        <div className="sc2"><div className="scw"><span className="ctr" id="c3">0</span></div><div className="slbl">{t('statsBar.tools.label')}</div></div>
        <div className="sc2"><div className="scw"><span className="ctr" id="c4">0</span><span className="csuf">{t('statsBar.sovereignty.suffix')}</span></div><div className="slbl">{t('statsBar.sovereignty.label')}</div></div>
      </div>
    </div>
  )
}
