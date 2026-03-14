'use client'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import DiagramCanvas from '../ui/DiagramCanvas'
import Link from 'next/link'

export default function Hero(){
  const t = useTranslations()
  const [typed, setTyped] = useState(t('hero.typing.word1'))
  useEffect(()=>{
    const words = [t('hero.typing.word1'), t('hero.typing.word2'), t('hero.typing.word3'), t('hero.typing.word4')]
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
  },[t])

  useEffect(()=>{
    document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis'))
  },[])

  return (
    <section className="hero">
      <div className="hgrid" />
      <div className="hw grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="hbadge rev"><span className="bdot"/>OFFICIAL STANDARD — v1.0 — FEB 2026</div>
          <h1 className="rev d1">
            <span className="hl1">{t('hero.title')}</span>
            <span className="hl2"><span id="typed">{typed}</span><span className="tc"/></span>
          </h1>
          <p className="hdesc rev d2">{t('hero.description')}</p>
          <div className="hact rev d3">
            <Link href="/en/contact" className="btng w-full md:w-auto">{t('hero.cta.primary')}</Link>
            <Link href="/en/standard" className="btno w-full md:w-auto">{t('hero.cta.secondary')}</Link>
          </div>
          <div className="hstats rev d4">
            <div className="hs"><div className="hsn">{t('hero.stats.principles.value')}</div><div className="hsl" dangerouslySetInnerHTML={{__html: t('hero.stats.principles.label')}}/></div>
            <div className="hs"><div className="hsn">{t('hero.stats.modules.value')}</div><div className="hsl" dangerouslySetInnerHTML={{__html: t('hero.stats.modules.label')}}/></div>
            <div className="hs"><div className="hsn">{t('hero.stats.kpis.value')}</div><div className="hsl" dangerouslySetInnerHTML={{__html: t('hero.stats.kpis.label')}}/></div>
            <div className="hs"><div className="hsn">{t('hero.stats.tools.value')}</div><div className="hsl" dangerouslySetInnerHTML={{__html: t('hero.stats.tools.label')}}/></div>
          </div>
        </div>
          <div className="hvis rev d2">
          <DiagramCanvas />
          <div className="orb">
            <div className="oring"><div className="ocore"><div className="oacf">ACF®</div><div className="ostd">Standard</div></div></div>
          </div>
          <div className="sat stop"><div className="sc"><div className="si">🔷</div><div><div className="sn">{t('hero.satellites.score.name')}</div><div className="ss">{t('hero.satellites.score.description')}</div></div></div></div>
        </div>
      </div>
    </section>
  )
}
