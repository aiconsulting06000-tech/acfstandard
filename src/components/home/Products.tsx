"use client"
import React, { useEffect } from 'react'

export default function Products(){
  useEffect(()=>{
    const el = document.getElementById('products'); if(!el) return
    const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.rev').forEach(r=>r.classList.add('vis')); io.disconnect() } }) },{threshold:.2})
    io.observe(el)
    return ()=> io.disconnect()
  },[])

  return (
    <section className="sec light" id="products">
      <div className="ctn px-4 md:px-16">
        <span className="ew rev">// Suite</span>
        <h2 className="st rev d1">Products & Integrations</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">Tooling, connectors and governance controls to operationalize agents.</p>
        <div className="productgrid rev d2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="pitem">Control Plane</div>
          <div className="pitem">Policy Engine</div>
          <div className="pitem">Audit Dashboard</div>
          <div className="pitem">SDKs & Connectors</div>
        </div>
      </div>
    </section>
  )
}
