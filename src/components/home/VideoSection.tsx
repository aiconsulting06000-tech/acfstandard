"use client"
import React, { useEffect } from 'react'

export default function VideoSection(){
  useEffect(()=>{
    const el = document.getElementById('videosec'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ el.classList.add('go'); io.disconnect() } }) },{threshold:.25})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec dark" id="videosec">
      <div className="ctn">
        <span className="ew rev">// Demo</span>
        <h2 className="st rev d1">See ACF In Action</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">A short walkthrough showing governance and agent lifecycle.</p>
        <div className="videowrap rev d2">
          <div className="videoembed">
            <video controls muted loop playsInline width="100%">
              <source src="/assets/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
