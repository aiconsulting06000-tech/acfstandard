'use client'
import React, { useState } from 'react'

const KB: Record<string,string> = {
  acf: 'ACF — Agentic Commerce Framework® — is a proprietary governance methodology created by Vincent DORANGE. It defines how organizations deploy and supervise autonomous agentic systems.',
  cert: 'ACF Certification: follow the published process. Visit /en/certification.',
  dda: 'The DDA — Delegated Decision Authority — is the named individual responsible for final decisions.',
}

export default function AIWidget(){
  const [open,setOpen] = useState(false)
  const [msgs,setMsgs] = useState<{t:string,s:'u'|'b'}[]>([])
  const [v,setV] = useState('')
  function send(text?:string){ const q = (text ?? v).trim(); if(!q) return; setMsgs(m=>[...m,{t:q,s:'u'}]); setV(''); setTimeout(()=>{ const key = q.toLowerCase(); const reply = KB.acf; setMsgs(m=>[...m,{t:reply,s:'b'}]) },700) }

  return (
    <>
      <button className="aibtn" id="aibtn" onClick={()=>setOpen(true)}>
        <div className="aidonline"></div>
        <div className="aiblabel"><strong>Ask ACF Agent</strong><span>AI GOVERNANCE · ONLINE</span></div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--navy)"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      </button>

      <div className={open? 'aimodal open' : 'aimodal'} id="aimodal">
        <div className="aimodalbg" onClick={()=>setOpen(false)}></div>
        <div className="aimodalbox">
          <div className="aimodalhdr">
            <button className="aimclose" onClick={()=>setOpen(false)}>×</button>
            <div className="aimbeta">BETA</div>
            <div className="aimtitle"><span>Ask ACF</span> ★</div>
            <p className="aimsub">A chatbot answering questions based on the ACF Standard</p>
          </div>
          <div className={msgs.length? 'aimmsgs show':'aimmsgs'} id="aimmsgs">
            {msgs.map((m,i)=> (<div key={i} className={m.s==='u'?'aimmsgu aimmsg':'aimmsg aimmsgb'}>{m.t}</div>))}
          </div>
          <div className="aiminpwrap">
            <input className="aiminp" id="aiminp" placeholder="Ask about ACF governance..." value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ send() } }} />
            <button className="aimsend" id="aimsend" onClick={()=>send()}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button>
          </div>
          <div className="aimtrend">
            <div className="aimtlabel">TRENDING QUESTIONS</div>
            <div className="aimqs">
              <button className="aimq" onClick={()=>send('What is the ACF Standard?')}>What is the ACF Standard?</button>
              <button className="aimq" onClick={()=>send('How do I get ACF certified?')}>How to get ACF certified?</button>
              <button className="aimq" onClick={()=>send('What is the DDA role?')}>What is the DDA role?</button>
            </div>
          </div>
          <div className="aimdiscl">AI experiment. Responses based on ACF Standard documentation. <a href="/en/legal">See More</a></div>
        </div>
      </div>
    </>
  )
}
