"use client"
import React, { useEffect } from 'react'

export default function Methodology(){
  useEffect(()=>{
    const el = document.querySelector('.mgrid'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.15})
    io.observe(el.parentElement!)
    return ()=> io.disconnect()
  },[])

  const modules = [
    {num:'01',icon:'📋',title:'Governance Charter',desc:'Define sovereignty boundaries, RACI matrix, escalation authority'},
    {num:'02',icon:'🎯',title:'Objective Weighting',desc:'Set agent goals, constraints, and success metrics'},
    {num:'03',icon:'🛡️',title:'Non-Delegable Zones',desc:'Identify decisions only humans can make'},
    {num:'04',icon:'🔐',title:'Agent Authorization',desc:'Assign explicit mandates and autonomy levels'},
    {num:'05',icon:'📊',title:'KPI Framework',desc:'Define 18 sovereignty metrics and thresholds'},
    {num:'06',icon:'🚨',title:'Escalation Protocol',desc:'Multi-level alerts and human decision triggers'},
    {num:'07',icon:'✓',title:'Audit Trail',desc:'Real-time traceability and decision logging'},
    {num:'08',icon:'🔄',title:'Living Governance',desc:'Quarterly review and framework evolution'},
  ]

  return (
    <section>
      <div className="ctn">
        <span className="ew rev">// Implementation</span>
        <h2 className="st rev d1">8 Implementation Modules</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">The step-by-step methodology to embed ACF governance into your agentic infrastructure.</p>
        <div className="mgrid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m,i)=>(
            <div key={i} className="mcard rev" style={{animationDelay: i*50+'ms'}}>
              <div className="mico">{m.icon}</div>
              <div className="mnum">MODULE_{m.num}</div>
              <div className="mtitle">{m.title}</div>
              <div className="mdesc">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
