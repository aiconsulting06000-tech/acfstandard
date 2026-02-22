'use client'
import React, { useEffect } from 'react'

export default function Maturity(){
  useEffect(()=>{
    const el = document.getElementById('matwrap'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ [0,380,760,1140].forEach((d,i)=>{ setTimeout(()=>{ const cel = document.getElementById('mc'+i); if(cel) cel.classList.add(i===2?'dg':'da') }, d) }); setTimeout(()=>{ const l=document.getElementById('matline'); if(l) l.classList.add('go') },380); io.disconnect() } }) },{threshold:.3})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="secdark">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">// Progression</span>
        <h2 className="st rev d1">4 Agentic Maturity Levels</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">ACF classifies systems by autonomy level. Level 2 is the recommended deployment target.</p>
        <div className="matwrap rev d2" id="matwrap">
          <div className="matlinebg"></div>
          <div className="matlinefg" id="matline"></div>
          <div className="mattrack">
            <div className="matcol" id="mc0"><div className="dotw"><div className="dot"></div></div><div className="mlvl">LEVEL_0</div><div className="mname">Classical Automation</div><div className="risk rl">Very Low Risk</div><p className="mdesc">Fixed rules, no ML. Human intervention for any modification.</p></div>
            <div className="matcol" id="mc1"><div className="dotw"><div className="dot"></div></div><div className="mlvl">LEVEL_1</div><div className="mname">Assisted Agents</div><div className="risk rl">Low Risk</div><p className="mdesc">Agents analyze and recommend. Every final decision remains with a human.</p></div>
            <div className="matcol" id="mc2"><div className="dotw"><div className="dot"></div></div><div className="mlvl">LEVEL_2</div><div className="mname">Governed Agents</div><div className="risk rm">Moderate Risk</div><p className="mdesc">Agents decide within strict governance. Non-delegable zones locked.</p><div className="tbadge">★ Recommended Target</div></div>
            <div className="matcol" id="mc3"><div className="dotw"><div className="dot"></div></div><div className="mlvl">LEVEL_3</div><div className="mname">Supervised Autonomous</div><div className="risk rh">High Risk</div><p className="mdesc">Agents decide and learn. Maximum governance. For mature organizations only.</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
