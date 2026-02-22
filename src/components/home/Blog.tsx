"use client"
import React, { useEffect } from 'react'

export default function Blog(){
  useEffect(()=>{
    const el = document.getElementById('blogsec'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.2})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec dark" id="blogsec">
      <div className="ctn">
        <span className="ew rev">// Insights</span>
        <h2 className="st rev d1">From the Blog</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">Timely writing on governance, deployments and case studies.</p>
        <div className="bloglist rev d2">
          <article className="post">How we built a governed agent</article>
          <article className="post">Agentic risk frameworks explained</article>
          <article className="post">Operational lessons from Level 2 deployments</article>
        </div>
      </div>
    </section>
  )
}
