'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function AIWidget(){
  const t = useTranslations()
  const KB: Record<string,string> = {
    acf: t('ai.modal.subtitle'),
    cert: t('megaMenu.partners.become.certified'),
    dda: t('ai.modal.trending.q3'),
  }

  const [open,setOpen] = useState(false)
  const [msgs,setMsgs] = useState<{t:string,s:'u'|'b'}[]>([])
  const [v,setV] = useState('')
  function send(text?:string){ const q = (text ?? v).trim(); if(!q) return; setMsgs(m=>[...m,{t:q,s:'u'}]); setV(''); setTimeout(()=>{ const reply = KB.acf; setMsgs(m=>[...m,{t:reply,s:'b'}]) },700) }

  return (
    <>
      <button className="aibtn" id="aibtn" onClick={()=>setOpen(true)}>
        <div className="aidonline"></div>
        <div className="aiblabel"><strong>{t('ai.button.label')}</strong><span>{t('ai.button.status')}</span></div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--navy)"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      </button>

      <div className={open? 'aimodal open' : 'aimodal'} id="aimodal">
        <div className="aimodalbg" onClick={()=>setOpen(false)}></div>
        <div className="aimodalbox">
          <div className="aimodalhdr">
            <button className="aimclose" onClick={()=>setOpen(false)}>{t('ai.modal.close')}</button>
            <div className="aimbeta">{t('ai.modal.beta')}</div>
            <div className="aimtitle"><span>{t('ai.modal.title')}</span> ★</div>
            <p className="aimsub">{t('ai.modal.subtitle')}</p>
          </div>
          <div className={msgs.length? 'aimmsgs show':'aimmsgs'} id="aimmsgs">
            {msgs.map((m,i)=> (<div key={i} className={m.s==='u'?'aimmsgu aimmsg':'aimmsg aimmsgb'}>{m.t}</div>))}
          </div>
          <div className="aiminpwrap">
            <input className="aiminp" id="aiminp" placeholder={t('ai.modal.placeholder')} value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ send() } }} />
            <button className="aimsend" id="aimsend" onClick={()=>send()}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button>
          </div>
          <div className="aimtrend">
            <div className="aimtlabel">{t('ai.modal.trending.label')}</div>
            <div className="aimqs">
              <button className="aimq" onClick={()=>send(t('ai.modal.trending.q1'))}>{t('ai.modal.trending.q1')}</button>
              <button className="aimq" onClick={()=>send(t('ai.modal.trending.q2'))}>{t('ai.modal.trending.q2')}</button>
              <button className="aimq" onClick={()=>send(t('ai.modal.trending.q3'))}>{t('ai.modal.trending.q3')}</button>
            </div>
          </div>
          <div className="aimdiscl">{t('ai.modal.disclaimer')} <a href="/en/legal">{t('ai.modal.seeMore')}</a></div>
        </div>
      </div>
    </>
  )
}
