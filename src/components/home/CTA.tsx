"use client"
import React, { useEffect } from 'react'

export default function CTA(){
  useEffect(()=>{
    const el = document.getElementById('cta'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.25})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec cta" id="cta">
      <div className="ctn px-4 md:px-16">
        <h3 className="st">Get Started With ACF</h3>
        <p className="sd">Contact our team to design a governed-agent pilot for your organization.</p>
        <div className="ctabtns">
          <a className="btn primary w-full md:w-auto" href="/contact">Contact Sales</a>
          <a className="btn ghost w-full md:w-auto" href="/academy">Learn More</a>
        </div>
      </div>
    </section>
  )
}
