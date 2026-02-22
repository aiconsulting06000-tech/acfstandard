'use client'
import React from 'react'

export default function Layers(){
  return (
    <section>
      <div className="ctn">
        <span className="ew rev">// Structure</span>
        <h2 className="st rev d1">4 Operational Layers</h2>
        <div className="gb rev d1"></div>
        <p className="sd rev d2">A hierarchical architecture from strategic governance to real-time execution supervision.</p>
        <div className="lgrid">
          <div className="lcard rev d1"><div className="lico">🔒</div><div className="lnum">LAYER_01</div><div className="lt">Governance &amp; Sovereignty</div><div className="ld">Sovereignty charter, governance committee, RACI matrix, non-delegable zone map.</div></div>
          <div className="lcard rev d2"><div className="lico">⚖️</div><div className="lnum">LAYER_02</div><div className="lt">Decision Policy</div><div className="ld">Weighted objectives, arbitration rules, escalation thresholds, regulatory constraints.</div></div>
          <div className="lcard rev d3"><div className="lico">🤖</div><div className="lnum">LAYER_03</div><div className="lt">Agent System</div><div className="ld">Explicit mandate per agent, interaction perimeter, autonomy level, 5-category taxonomy.</div></div>
          <div className="lcard rev d4"><div className="lico">⚙️</div><div className="lnum">LAYER_04</div><div className="lt">Execution &amp; Supervision</div><div className="ld">Adaptive gating matrix, multi-level alerts, 18 sovereignty KPIs, live dashboards.</div></div>
        </div>
      </div>
    </section>
  )
}
