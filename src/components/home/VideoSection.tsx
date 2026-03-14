"use client"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function VideoSection(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.getElementById('videosec'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.25})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec dark" id="videosec">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">{t('video.badge')}</span>
        <h2 className="st rev d1" dangerouslySetInnerHTML={{__html: t('video.title')}} />
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('video.description1')}</p>
        <div className="videowrap rev d2">
          <div className="videoembed">
            <video controls muted loop playsInline width="100%">
              <source src="/assets/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
