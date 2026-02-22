'use client'
import React, { useEffect } from 'react'

export default function StatsBar(){
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
    const onScroll = ()=>{ const b = document.getElementById('statsbar'); if(!b) return; const r = b.getBoundingClientRect(); if(r.top < window.innerHeight && r.bottom > 0) run(); }
    window.addEventListener('scroll', onScroll, { passive:true })
    setTimeout(onScroll,200)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <div className="sbar" id="statsbar">
      <div className="sgrid">
        <div className="sc2"><div className="scw"><span className="ctr" id="c1">0</span></div><div className="slbl">Operational Layers</div></div>
        <div className="sc2"><div className="scw"><span className="ctr" id="c2">0</span></div><div className="slbl">Sovereignty KPIs</div></div>
        <div className="sc2"><div className="scw"><span className="ctr" id="c3">0</span></div><div className="slbl">Proprietary Tools</div></div>
        <div className="sc2"><div className="scw"><span className="ctr" id="c4">0</span><span className="csuf">%</span></div><div className="slbl">Human Sovereignty</div></div>
      </div>
    </div>
  )
}
