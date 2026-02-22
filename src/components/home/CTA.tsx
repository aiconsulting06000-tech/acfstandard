"use client"
import React, { useEffect } from 'react'

export default function CTA(){
  useEffect(()=>{
    const el = document.getElementById('cta'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ el.classList.add('go'); io.disconnect() } }) },{threshold:.25})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec cta" id="cta">
      <div className="ctn">
        <h3 className="st">Get Started With ACF</h3>
        <p className="sd">Contact our team to design a governed-agent pilot for your organization.</p>
        <div className="ctabtns">
          <a className="btn primary" href="/contact">Contact Sales</a>
          <a className="btn ghost" href="/academy">Learn More</a>
        </div>
      </div>
    </section>
  )
}
