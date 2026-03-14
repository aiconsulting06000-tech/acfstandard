"use client"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Blog(){
  const t = useTranslations()
  useEffect(()=>{
    const el = document.getElementById('blogsec'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.2})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec dark" id="blogsec">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">{t('blog.badge')}</span>
        <h2 className="st rev d1">{t('blog.title')}</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">{t('blog.subtitle')}</p>
        <div className="bloglist rev d2">
          <article className="post">{t('blog.article1.title')}</article>
          <article className="post">{t('blog.article2.title')}</article>
          <article className="post">{t('blog.article3.title')}</article>
        </div>
      </div>
    </section>
  )
}
