"use client"
import React, { useEffect } from 'react'

export default function HexPath(){
  useEffect(()=>{
    const el = document.getElementById('hexpath'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ el.classList.add('go'); io.disconnect() } }) },{threshold:.2})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec light" id="hexpath">
      <div className="ctn">
        <span className="ew rev">// Journey</span>
        <h2 className="st rev d1">The Hex Path</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">A practical 6-step pathway to deploy governed agents safely.</p>
        <div className="hexgrid rev d2">
          <div className="hexcol">Plan</div>
          <div className="hexcol">Design</div>
          <div className="hexcol">Build</div>
          <div className="hexcol">Verify</div>
          <div className="hexcol">Deploy</div>
          <div className="hexcol">Govern</div>
        </div>
      </div>
    </section>
  )
}
