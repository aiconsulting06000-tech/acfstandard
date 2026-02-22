 'use client'
import React, { useEffect, useState } from 'react'
import DiagramCanvas from '../ui/DiagramCanvas'
import Link from 'next/link'

export default function Hero(){
  const [typed, setTyped] = useState('Governance')
  useEffect(()=>{
    const words = ['Governance','Sovereignty','Intelligence','Commerce']
    let wi = 0, ci = words[0].length, del=false, paused=false
    setTyped(words[0])
    function step(){
      if(paused){ paused=false; del=true; setTimeout(step,2400); return }
      if(!del && ci===words[wi].length){ paused=true; step(); return }
      if(del && ci===0){ del=false; wi=(wi+1)%words.length; setTimeout(step,300); return }
      ci += del?-1:1; setTyped(words[wi].slice(0,ci)); setTimeout(step, del?45:85)
    }
    const to = setTimeout(step,2600)
    return ()=>clearTimeout(to)
  },[])

  return (
    <section className="hero">
      <div className="hgrid" />
      <div className="hw">
        <div>
          <div className="hbadge rev"><span className="bdot"/>OFFICIAL STANDARD — v1.0 — FEB 2026</div>
          <h1 className="rev d1">
            <span className="hl1">The Global Standard for</span>
            <span className="hl2"><span id="typed">{typed}</span><span className="tc"/></span>
          </h1>
          <p className="hdesc rev d2">The Agentic Commerce Framework® (ACF) is the definitive governance methodology for deploying, supervising, and controlling autonomous agentic systems in commercial environments.</p>
          <div className="hact rev d3">
            <Link href="/en/contact" className="btng">Request a Governance Assessment →</Link>
            <Link href="/en/standard" className="btno">Read the Standard</Link>
          </div>
          <div className="hstats rev d4">
            <div className="hs"><div className="hsn">4</div><div className="hsl">Founding<br/>Principles</div></div>
            <div className="hs"><div className="hsn">8</div><div className="hsl">Implementation<br/>Modules</div></div>
            <div className="hs"><div className="hsn">18</div><div className="hsl">Sovereignty<br/>KPIs</div></div>
            <div className="hs"><div className="hsn">17</div><div className="hsl">Proprietary<br/>Tools</div></div>
          </div>
        </div>
        <div className="hvis rev d2">
          <DiagramCanvas />
          <div className="orb">
            <div className="oring"><div className="ocore"><div className="oacf">ACF®</div><div className="ostd">Standard</div></div></div>
          </div>
          <div className="sat stop"><div className="sc"><div className="si">🔷</div><div><div className="sn">ACF Score</div><div className="ss">Sovereignty Metric</div></div></div></div>
        </div>
      </div>
    </section>
  )
}
