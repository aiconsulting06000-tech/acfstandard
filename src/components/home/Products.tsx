"use client"
import React, { useEffect } from 'react'

export default function Products(){
  useEffect(()=>{
    const el = document.getElementById('products'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ el.classList.add('go'); io.disconnect() } }) },{threshold:.2})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec light" id="products">
      <div className="ctn">
        <span className="ew rev">// Suite</span>
        <h2 className="st rev d1">Products & Integrations</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">Tooling, connectors and governance controls to operationalize agents.</p>
        <div className="productgrid rev d2">
          <div className="pitem">Control Plane</div>
          <div className="pitem">Policy Engine</div>
          <div className="pitem">Audit Dashboard</div>
          <div className="pitem">SDKs & Connectors</div>
        </div>
      </div>
    </section>
  )
}
