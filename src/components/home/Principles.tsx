'use client'
import React, { useEffect } from 'react'

export default function Principles(){
  useEffect(()=>{
    const el = document.querySelector('.pgrid'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.15})
    io.observe(el.parentElement!)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="secdark">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">// Architecture</span>
        <h2 className="st rev d1">4 Founding Principles</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">Four immutable axioms defining the boundary between human authority and autonomous agent execution.</p>
        <div className="pgrid grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="pcard rev d1"><div className="pnw"><span className="pnum">01</span><span className="pnl">PRINCIPLE</span></div><div className="pt">Decision / Execution Separation</div><p className="pd">No autonomous agent defines its own objectives. Humans define the ends; agents execute exclusively within the defined perimeter. Technically enforced — not a policy, a constraint.</p><span className="ptag">SOVEREIGNTY</span></div>
          <div className="pcard rev d2"><div className="pnw"><span className="pnum">02</span><span className="pnl">PRINCIPLE</span></div><div className="pt">Non-Delegable Zones</div><p className="pd">Certain decisions are structurally, ethically, or legally non-automatable. The non-delegable zone is formally defined and technically locked — never configurable by agents themselves.</p><span className="ptag">PROTECTION</span></div>
          <div className="pcard rev d3"><div className="pnw"><span className="pnum">03</span><span className="pnl">PRINCIPLE</span></div><div className="pt">Traceability &amp; Interruptibility</div><p className="pd">Every agent decision is fully traceable, explainable, and stoppable at any time. Three-level kill switch: module stop (&lt;10s), agent stop (&lt;30s), emergency (&lt;60s). Complete auditable log chain, always.</p><span className="ptag">CONTROL</span></div>
          <div className="pcard rev d4"><div className="pnw"><span className="pnum">04</span><span className="pnl">PRINCIPLE</span></div><div className="pt">Living Governance</div><p className="pd">Any agentic autonomy requires active, permanent, evolving governance — with dedicated roles (DDA), regular review rituals, and recurring independent audits. Governance is a continuous practice, not a document.</p><span className="ptag">CONTINUITY</span></div>
        </div>
      </div>
    </section>
  )
}
