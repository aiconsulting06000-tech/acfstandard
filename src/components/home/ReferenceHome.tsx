"use client"
import React, { useEffect } from 'react'

const rawHTML = `
<!-- Body markup copied from reference HTML -->
<canvas id="neural"></canvas>

<!-- REGION PANEL OVERLAY -->
<div class="rmo" id="rmo"></div>
<div class="rpanel" id="rpanel">
  <div class="rphdr">
    <div class="rptitle">Select your region and language</div>
    <button class="rpclose">✕ Close</button>
  </div>
  <div class="rpcols">
    <div>
      <div class="rpcol-title">Global</div>
      <a class="rpglobal" href="#"><span>🌐</span><span>Global (English)</span></a>
    </div>
    <div>
      <div class="rpcol-title">Europe, Middle East &amp; Africa</div>
      <ul class="rplinks">
        <li><a href="#"><span class="rpflag">🇫🇷</span>France <span class="rplang">(Français)</span></a></li>
        <li><a href="#"><span class="rpflag">🇩🇪</span>DACH Region <span class="rplang">(Deutsch)</span></a></li>
        <li><a href="#"><span class="rpflag">🇬🇧</span>United Kingdom <span class="rplang">(English)</span></a></li>
        <li><a href="#"><span class="rpflag">🇪🇸</span>Spain <span class="rplang">(Español)</span></a></li>
        <li><a href="#"><span class="rpflag">🇧🇪</span>Belgium <span class="rplang">(Français)</span></a></li>
        <li><a href="#"><span class="rpflag">🇨🇭</span>Switzerland <span class="rplang">(Français)</span></a></li>
      </ul>
    </div>
    <div>
      <div class="rpcol-title">North &amp; Latin America</div>
      <ul class="rplinks">
        <li><a href="#"><span class="rpflag">🇺🇸</span>United States <span class="rplang">(English)</span></a></li>
        <li><a href="#"><span class="rpflag">🇨🇦</span>Canada <span class="rplang">(English/Français)</span></a></li>
        <li><a href="#"><span class="rpflag">🇧🇷</span>Brazil <span class="rplang">(Português)</span></a></li>
        <li><a href="#"><span class="rpflag">🇲🇽</span>Mexico <span class="rplang">(Español)</span></a></li>
      </ul>
    </div>
    <div>
      <div class="rpcol-title">Asia &amp; Pacific</div>
      <ul class="rplinks">
        <li><a href="#"><span class="rpflag">🇸🇬</span>Singapore <span class="rplang">(English)</span></a></li>
        <li><a href="#"><span class="rpflag">🇯🇵</span>Japan <span class="rplang">(日本語)</span></a></li>
        <li><a href="#"><span class="rpflag">🇦🇺</span>Australia <span class="rplang">(English)</span></a></li>
        <li><a href="#"><span class="rpflag">🇰🇷</span>Korea <span class="rplang">(한국어)</span></a></li>
      </ul>
    </div>
  </div>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hgrid"></div>
  <div class="hw grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <div class="hbadge rev"><span class="bdot"></span>OFFICIAL STANDARD — v1.0 — FEB 2026</div>
      <h1 class="rev d1">
        <span class="hl1">The Global Standard for</span>
        <span class="hl2"><span id="typed"></span><span class="tc"></span></span>
      </h1>
      <p class="hdesc rev d2">The Agentic Commerce Framework® (ACF) is the definitive governance methodology for deploying, supervising, and controlling autonomous agentic systems in commercial environments.</p>
      <div class="hact rev d3">
        <a href="/contact" class="btng w-full md:w-auto">Request a Governance Assessment →</a>
        <a href="/standard" class="btno w-full md:w-auto">Read the Standard</a>
      </div>
      <div class="hstats rev d4 grid grid-cols-1 md:grid-cols-4 gap-2">
        <div class="hs"><div class="hsn">4</div><div class="hsl">Founding<br/>Principles</div></div>
        <div class="hs"><div class="hsn">8</div><div class="hsl">Implementation<br/>Modules</div></div>
        <div class="hs"><div class="hsn">18</div><div class="hsl">Sovereignty<br/>KPIs</div></div>
        <div class="hs"><div class="hsn">17</div><div class="hsl">Proprietary<br/>Tools</div></div>
      </div>
    </div>
    <div class="hvis rev d2">
      <canvas id="dc"></canvas>
      <div class="orb">
        <div class="oring"><div class="ocore"><div class="oacf">ACF®</div><div class="ostd">Standard</div></div></div>
      </div>
      <div class="sat stop"><div class="sc"><div class="si"></div><div><div class="sn">ACF Score</div><div class="ss">Sovereignty Metric</div></div></div></div>
      <div class="sat sright"><div class="sc"><div class="si"></div><div><div class="sn">ACF Control</div><div class="ss">Governance SaaS</div></div></div></div>
      <div class="sat sbott"><div class="sc"><div class="si"></div><div><div class="sn">Certification</div><div class="ss">Attestation</div></div></div></div>
      <div class="sat sleft"><div class="sc"><div class="si"></div><div><div class="sn">Partners</div><div class="ss">Practitioners</div></div></div></div>
    </div>
  </div>
</section>

<!-- STATS BAR -->
<div class="sbar" id="statsbar">
  <div class="sgrid">
    <div class="sc2"><div class="scw"><span class="ctr" id="c1">0</span></div><div class="slbl">Operational Layers</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c2">0</span></div><div class="slbl">Sovereignty KPIs</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c3">0</span></div><div class="slbl">Proprietary Tools</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c4">0</span><span class="csuf">%</span></div><div class="slbl">Human Sovereignty</div></div>
  </div>
</div>

<!-- PRINCIPLES -->
<section class="secdark">
  <div class="ctn px-4 md:px-16">
    <span class="ew rev">// Architecture</span>
    <h2 class="st rev d1">4 Founding Principles</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">Four immutable axioms defining the boundary between human authority and autonomous agent execution.</p>
    <div class="pgrid grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="pcard rev d1"><div class="pnw"><span class="pnum">01</span><span class="pnl">PRINCIPLE</span></div><div class="pt">Séparation Décision / Exécution</div><p class="pd">No autonomous agent defines its own objectives. Humans define the ends; agents execute exclusively within the defined perimeter. Technically enforced — not a policy, a constraint.</p><span class="ptag">SOVEREIGNTY</span></div>
      <div class="pcard rev d2"><div class="pnw"><span class="pnum">02</span><span class="pnl">PRINCIPLE</span></div><div class="pt">Zones Non Délégables</div><p class="pd">Certain decisions are structurally, ethically, or legally non-automatable. The non-delegable zone is formally defined and technically locked — never configurable by agents themselves.</p><span class="ptag">PROTECTION</span></div>
      <div class="pcard rev d3"><div class="pnw"><span class="pnum">03</span><span class="pnl">PRINCIPLE</span></div><div class="pt">Traçabilité &amp; Interruptibilité</div><p class="pd">Every agent decision is fully traceable, explainable, and stoppable at any time. Three-level kill switch: module stop (&lt;10s), agent stop (&lt;30s), emergency (&lt;60s). Complete auditable log chain, always.</p><span class="ptag">CONTROL</span></div>
      <div class="pcard rev d4"><div class="pnw"><span class="pnum">04</span><span class="pnl">PRINCIPLE</span></div><div class="pt">Gouvernance Vivante</div><p class="pd">Any agentic autonomy requires active, permanent, evolving governance — with dedicated roles (DDA), regular review rituals, and recurring independent audits. Governance is a continuous practice, not a document.</p><span class="ptag">CONTINUITY</span></div>
    </div>
  </div>
</section>

<!-- LAYERS -->
<section>
  <div class="ctn px-4 md:px-16">
    <span class="ew rev">// Structure</span>
    <h2 class="st rev d1">4 Operational Layers</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">A hierarchical architecture from strategic governance to real-time execution supervision.</p>
    <div class="lgrid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="lcard rev d1"><div class="lico">🔒</div><div class="lnum">LAYER_01</div><div class="lt">Governance &amp; Sovereignty</div><div class="ld">Sovereignty charter, governance committee, RACI matrix, non-delegable zone map.</div></div>
      <div class="lcard rev d2"><div class="lico">⚖️</div><div class="lnum">LAYER_02</div><div class="lt">Decision Policy</div><div class="ld">Weighted objectives, arbitration rules, escalation thresholds, regulatory constraints.</div></div>
      <div class="lcard rev d3"><div class="lico">🤖</div><div class="lnum">LAYER_03</div><div class="lt">Agent System</div><div class="ld">Explicit mandate per agent, interaction perimeter, autonomy level, 5-category taxonomy.</div></div>
      <div class="lcard rev d4"><div class="lico">⚙️</div><div class="lnum">LAYER_04</div><div class="lt">Execution &amp; Supervision</div><div class="ld">Adaptive gating matrix, multi-level alerts, 18 sovereignty KPIs, live dashboards.</div></div>
    </div>
  </div>
</section>

<!-- MATURITY -->
<section class="secdark">
  <div class="ctn px-4 md:px-16">
    <span class="ew rev">// Progression</span>
    <h2 class="st rev d1">4 Agentic Maturity Levels</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">ACF classifies systems by autonomy level. Level 2 is the recommended deployment target.</p>
    <div class="matwrap rev d2" id="matwrap">
      <div class="matlinebg"></div>
      <div class="matlinefg" id="matline"></div>
      <div class="mattrack">
        <div class="matcol" id="mc0"><div class="dotw"><div class="dot"></div></div><div class="mlvl">LEVEL_0</div><div class="mname">Classical Automation</div><div class="risk rl">Very Low Risk</div><p class="mdesc">Fixed rules, no ML. Human intervention for any modification.</p></div>
        <div class="matcol" id="mc1"><div class="dotw"><div class="dot"></div></div><div class="mlvl">LEVEL_1</div><div class="mname">Assisted Agents</div><div class="risk rl">Low Risk</div><p class="mdesc">Agents analyze and recommend. Every final decision remains with a human.</p></div>
        <div class="matcol" id="mc2"><div class="dotw"><div class="dot"></div></div><div class="mlvl">LEVEL_2</div><div class="mname">Governed Agents</div><div class="risk rm">Moderate Risk</div><p class="mdesc">Agents decide within strict governance. Non-delegable zones locked.</p><div class="tbadge">★ Recommended Target</div></div>
        <div class="matcol" id="mc3"><div class="dotw"><div class="dot"></div></div><div class="mlvl">LEVEL_3</div><div class="mname">Supervised Autonomous</div><div class="risk rh">High Risk</div><p class="mdesc">Agents decide and learn. Maximum governance. For mature organizations only.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- HEX PATH MODULES -->
<section class="hexsec">
  <div class="ctn px-4 md:px-16">
    <span class="ew rev">// Methodology</span>
    <h2 class="st rev d1">8 Implementation Modules</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">A sequential path deployed progressively over 6–18 months. Each module builds on the previous.</p>
  </div>
</section>

<!-- VIDEO / FOUNDER -->
<section class="videosec">
  <div class="ctn px-4 md:px-16">
    <div class="videogrid">
      <div>
        <span class="ew rev">// Why ACF</span>
        <h2 class="st rev d1">Governance Cannot Wait.<br/>Agents Already Decide.</h2>
        <div class="gb rev d1"></div>
        <p class="vdesc rev d2">In 2026, autonomous agents are already executing decisions in commercial environments — setting prices, qualifying leads, processing claims, managing contracts. Most organizations have no framework to govern them.</p>
        <p class="vdesc rev d3" style="margin-top:16px">ACF was created to fill that void — before a governance failure becomes a legal, financial, or reputational crisis.</p>
        <div class="vquote rev d3">
          <div class="vqline"></div>
          <div class="vqbody">
            <div class="vqtext">"The question is no longer <em>whether</em> to deploy agents. It is <em>how</em> to deploy them without surrendering your sovereignty."</div>
            <div class="vqauthor">— Vincent DORANGE, Creator of the ACF Standard</div>
          </div>
        </div>
      </div>
      <div class="videobox rev d2">
        <div class="vplayer" id="vplayer">
          <div class="vthumbnail">
            <div class="vtgrid"></div>
            <div class="vtcontent">
              <div class="vtbadge">ACF — FOUNDER MESSAGE</div>
              <div class="vtname">Vincent DORANGE</div>
              <div class="vtrole">Creator, Agentic Commerce Framework®</div>
            </div>
          </div>
          <div class="vplaybtn">
            <div class="vplayring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--navy)"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div class="vduration">3:09</div>
          <div class="vtframes"></div>
        </div>
        <div class="vstats">
          <div class="vstat"><span class="vsn">2026</span><span class="vsl">Official Release</span></div>
          <div class="vstat"><span class="vsn">45p</span><span class="vsl">Full Documentation</span></div>
          <div class="vstat"><span class="vsn">INPI</span><span class="vsl">Legally Protected</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VIDEO MODAL -->
<div class="aimodal" id="videomodal" style="z-index:1100">
  <div class="aimodalbg"></div>
  <div style="position:relative;z-index:1;width:900px;max-width:95vw;background:#000;border-radius:14px;overflow:hidden;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;">
    <div style="text-align:center;padding:40px;color:var(--gr2)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--gold);margin-bottom:16px;letter-spacing:.1em">VIDEO PLACEHOLDER</div>
      <div style="font-family:'Space Grotesk',sans-serif;font-size:20px;color:#fff;margin-bottom:10px">Upload your video to enable playback</div>
      <div style="font-size:14px">Replace this modal with a YouTube or Vimeo embed URL in the code</div>
    </div>
  </div>
</div>

<!-- PRODUCTS -->
<section class="secdark">
  <div class="ctn px-4 md:px-16">
    <span class="ew rev">// Ecosystem</span>
    <h2 class="st rev d1">The ACF Ecosystem</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">Three complementary products operationalizing the ACF Standard.</p>
  </div>
  <div class="prodgrid grid grid-cols-1 md:grid-cols-3 gap-6" style="max-width:1320px;margin:60px auto 0;padding:0 40px">
    <div class="pc rev d1">
      <div class="piw"></div>
      <div class="plbl">DIAGNOSTIC TOOL</div><div class="ptitle">ACF Score</div>
      <div class="pdesc">Proprietary Sovereignty Score measuring your decisional independence across 6 governance dimensions.</div>
      <ul class="pfeat"><li>Composite Sovereignty Score metric</li><li>6-axis radar visualization</li><li>Personalized action plan per axis</li></ul>
      <a href="https://acf-score.com" class="plink" target="_blank">Measure your Score →</a>
    </div>
    <div class="pc rev d2">
      <div class="piw"></div>
      <div class="plbl">SAAS PLATFORM</div><div class="ptitle">ACF Control</div>
      <div class="pdesc">Real-time governance dashboard monitoring your 18 Sovereignty KPIs with adaptive gating and automated escalation.</div>
      <ul class="pfeat"><li>18 KPIs across 6 governance axes</li><li>Adaptive gating with human escalation</li><li>Tamper-evident audit logs</li></ul>
      <a href="/control" class="plink">Discover ACF Control →</a>
    </div>
    <div class="pc rev d3">
      <div class="piw"></div>
      <div class="plbl">INDEPENDENT ATTESTATION</div><div class="ptitle">ACF Certification</div>
      <div class="pdesc">Independent certification attesting compliance with the ACF governance standard. Publicly verifiable.</div>
      <ul class="pfeat"><li>Level 1, 2, and 3 certification paths</li><li>Publicly verifiable badge</li><li>Annual renewal + continuous monitoring</li></ul>
      <a href="/certification" class="plink">Get Certified →</a>
    </div>
  </div>
</section>

<!-- BLOG -->
<section>
  <div class="ctn px-4 md:px-16">
    <span class="ew rev">// Insights</span>
    <h2 class="st rev d1">Latest from the ACF Blog</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">Governance insights, framework updates, and agentic intelligence research.</p>
    <div class="bgrid grid grid-cols-1 md:grid-cols-3 gap-6">
      <article class="bcard rev d1"><div class="bimg"></div><div class="bbody"><div class="btitle">ACF Score — the Sovereignty Metric</div><div class="bexc">How we measure organizational sovereignty.</div></div></article>
      <article class="bcard rev d2"><div class="bimg"></div><div class="bbody"><div class="btitle">Kill Switch Protocols</div><div class="bexc">Designing interruptibility for agents.</div></div></article>
      <article class="bcard rev d3"><div class="bimg"></div><div class="bbody"><div class="btitle">Operationalising Governance</div><div class="bexc">Embedding ACF into CI/CD pipelines.</div></div></article>
    </div>
    <div style="text-align:center;margin-top:40px" class="rev"><a href="/blog" class="btno w-full md:w-auto">View All Articles →</a></div>
  </div>
</section>

<!-- CTA -->
<section class="ctasec">
  <div class="ctawm">ACF®</div>
  <div class="ctn ctain">
    <span class="ew">// Next Step</span>
    <h2>Ready to Govern Your<br/>Agentic Systems?</h2>
    <p>Request a governance assessment and discover your current Sovereignty Score.</p>
    <div class="ctabtns">
      <a href="/contact" class="btng w-full md:w-auto">Request a Governance Assessment →</a>
      <a href="/partners/apply" class="btno w-full md:w-auto">Become an ACF Partner</a>
    </div>
  </div>
</section>

<!-- AI BUTTON -->
<button class="aibtn" id="aibtn">
  <div class="aidonline"></div>
  <div class="aiblabel"><strong>Ask ACF Agent</strong><span>AI GOVERNANCE · ONLINE</span></div>
</button>

<!-- AI MODAL -->
<div class="aimodal" id="aimodal">
  <div class="aimodalbg"></div>
  <div class="aimodalbox">
    <div class="aimodalhdr">
      <button class="aimclose">×</button>
      <div class="aimbeta">BETA</div>
      <div class="aimtitle"><span>Ask ACF</span> ★</div>
      <p class="aimsub">A chatbot answering questions based on the ACF Standard and governance insights</p>
    </div>
    <div class="aimmsgs" id="aimmsgs"></div>
    <div class="aiminpwrap">
      <input class="aiminp" id="aiminp" placeholder="Ask about ACF governance..." autocomplete="off" />
      <button class="aimsend" id="aimsend"></button>
    </div>
    <div class="aimtrend">
      <div class="aimtlabel">TRENDING QUESTIONS</div>
      <div class="aimqs">
        <button class="aimq">What is the ACF Standard?</button>
        <button class="aimq">How to get ACF certified?</button>
        <button class="aimq">What is the DDA role?</button>
        <button class="aimq">What is the ACF Sovereignty Score?</button>
        <button class="aimq">The 4 Founding Principles?</button>
      </div>
    </div>
    <div class="aimdiscl">AI experiment. Responses based on ACF Standard documentation. <a href="/legal">See More</a></div>
  </div>
</div>
`

export default function ReferenceHome(){
  useEffect(()=>{
    const style = document.createElement('style')
    style.id = 'acf-ref-style'
    style.textContent = readFileSyncSafe()
    document.head.appendChild(style)
    return ()=>{ const s = document.getElementById('acf-ref-style'); if(s) s.remove() }
  }, [])

  useEffect(()=>{
    // NEURAL canvas
    try{
      const c = document.getElementById('neural') as HTMLCanvasElement | null
      if(!c) return
      const canvas = c as HTMLCanvasElement
      const x = canvas.getContext('2d')!
      function sz(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight }
      sz(); window.addEventListener('resize', sz)
      const pts: any[] = []
      for(let i=0;i<90;i++) pts.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4})
      let rafId = 0
      function draw(){ x.clearRect(0,0,canvas.width,canvas.height); for(let i=0;i<pts.length;i++){ pts[i].x += pts[i].vx; pts[i].y += pts[i].vy; if(pts[i].x<0||pts[i].x>canvas.width) pts[i].vx *= -1; if(pts[i].y<0||pts[i].y>canvas.height) pts[i].vy *= -1; x.beginPath(); x.arc(pts[i].x,pts[i].y,1.5,0,Math.PI*2); x.fillStyle='rgba(201,168,76,.75)'; x.fill(); for(let j=i+1;j<pts.length;j++){ const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy); if(d<160){ x.beginPath(); x.moveTo(pts[i].x,pts[i].y); x.lineTo(pts[j].x,pts[j].y); x.strokeStyle='rgba(201,168,76,'+((1-d/160)*.4)+')'; x.lineWidth = .7; x.stroke() } } } rafId = requestAnimationFrame(draw) }
      draw()
      return ()=>{ window.removeEventListener('resize', sz); cancelAnimationFrame(rafId) }
    }catch(e){ console.warn(e) }
  }, [])

  useEffect(()=>{
    // DIAGRAM (dc)
    const c = document.getElementById('dc') as HTMLCanvasElement | null
    if(!c) return
    const canvas = c as HTMLCanvasElement
    const x = canvas.getContext('2d')!
    function sz(){ canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    sz(); window.addEventListener('resize', sz)
    const pulses: any[] = []
    let tick = 0
    function nodes(){ const cx = canvas.width/2, cy = canvas.height/2; return [{x:cx,y:cy*.12},{x:canvas.width*.96,y:cy},{x:cx,y:canvas.height*.88},{x:canvas.width*.04,y:cy}] }
    function spawn(){ const ns = nodes(), n = ns[Math.floor(Math.random()*ns.length)], cx=canvas.width/2, cy=canvas.height/2, tc = Math.random()>.5; pulses.push({sx:tc?n.x:cx,sy:tc?n.y:cy,ex:tc?cx:n.x,ey:tc?cy:n.y,t:0,spd:.008+Math.random()*.005,col:Math.random()>.3?'201,168,76':'80,180,255'}) }
    let rafId = 0
    function draw(){ x.clearRect(0,0,canvas.width,canvas.height); const ns = nodes(), cx=canvas.width/2, cy=canvas.height/2; ns.forEach(n=>{ x.beginPath(); x.moveTo(cx,cy); x.lineTo(n.x,n.y); x.strokeStyle='rgba(201,168,76,.1)'; x.lineWidth=1; x.stroke() }); tick++; if(tick%50===0) spawn(); for(let i=pulses.length-1;i>=0;i--){ const p=pulses[i]; p.t+=p.spd; if(p.t>=1){ pulses.splice(i,1); continue } const px = p.sx+(p.ex-p.sx)*p.t, py = p.sy+(p.ey-p.sy)*p.t; const g = x.createRadialGradient(px,py,0,px,py,6); g.addColorStop(0,'rgba('+p.col+',.9)'); g.addColorStop(1,'rgba('+p.col+',0)'); x.beginPath(); x.arc(px,py,5,0,Math.PI*2); x.fillStyle = g; x.fill(); const tpx = p.sx+(p.ex-p.sx)*Math.max(0,p.t-.15), tpy = p.sy+(p.ey-p.sy)*Math.max(0,p.t-.15); x.beginPath(); x.moveTo(tpx,tpy); x.lineTo(px,py); x.strokeStyle='rgba('+p.col+',.25)'; x.lineWidth=1.5; x.stroke(); } rafId = requestAnimationFrame(draw) }
    draw()
    return ()=>{ window.removeEventListener('resize', sz); cancelAnimationFrame(rafId) }
  }, [])

  useEffect(()=>{
    // Nav scroll
    const onScroll = ()=>{ const nav = document.getElementById('nav'); if(nav) nav.classList.toggle('scrolled', window.scrollY>50) }
    window.addEventListener('scroll', onScroll, {passive:true})

    // Region open/close
    function openRegion(){ const rmo = document.getElementById('rmo'); const rpanel = document.getElementById('rpanel'); if(rmo) rmo.classList.add('open'); if(rpanel) rpanel.classList.add('open'); document.body.style.overflow='hidden' }
    function closeRegion(){ const rmo = document.getElementById('rmo'); const rpanel = document.getElementById('rpanel'); if(rmo) rmo.classList.remove('open'); if(rpanel) rpanel.classList.remove('open'); document.body.style.overflow='' }
    const rmo = document.getElementById('rmo'); if(rmo) rmo.addEventListener('click', closeRegion)
    const rpclose = document.querySelector('.rpclose'); if(rpclose) rpclose.addEventListener('click', closeRegion)

    // Mega menu (drawer only — no hambtn here, handled by Nav.tsx)
    function closeMega(){ const mo = document.getElementById('mo'); const md = document.getElementById('megadrawer'); if(mo) mo.classList.remove('open'); if(md) md.classList.remove('open'); document.body.style.overflow='' }
    function showPanel(id:string){ document.querySelectorAll('.mni').forEach(el=> el.classList.toggle('active', (el as HTMLElement).dataset.panel===id )); document.querySelectorAll('.mp').forEach(el=> el.classList.toggle('active', el.id==='panel-'+id)) }
    const moclose = document.getElementById('mo'); if(moclose) moclose.addEventListener('click', closeMega)
    const mclose = document.querySelector('.mclose'); if(mclose) mclose.addEventListener('click', closeMega)
    document.querySelectorAll('.mni').forEach(el=> el.addEventListener('click', ()=>{ const id = (el as HTMLElement).dataset.panel; if(id) showPanel(id) }))

    // Escape key
    function onKey(e: KeyboardEvent){ if(e.key==='Escape'){ closeMega(); closeRegion(); closeAI(); closeVideoModal() } }
    window.addEventListener('keydown', onKey)

    // Reveal observer
    const ro = new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('vis') }) }, {threshold:.1})
    document.querySelectorAll('.rev').forEach(el=> ro.observe(el))

    // counters
    let countersRun = false
    function runCounters(){ if(countersRun) return; countersRun = true; const arr = [{id:'c1',val:4},{id:'c2',val:18},{id:'c3',val:17},{id:'c4',val:100}]; arr.forEach(t=>{ const el = document.getElementById(t.id); if(!el) return; const element = el as HTMLElement; let start: number | null = null; const dur = 1600; function step(ts:number){ if(!start) start = ts; const p = Math.min((ts-start)/dur,1); const e = 1-Math.pow(1-p,4); element.textContent = String(Math.round(e*t.val)); if(p<1) requestAnimationFrame(step); else element.textContent = String(t.val) } requestAnimationFrame(step) }) }
    function checkCounters(){ const b = document.getElementById('statsbar'); if(!b) return; const r = b.getBoundingClientRect(); if(r.top < window.innerHeight && r.bottom > 0) runCounters() }
    window.addEventListener('scroll', checkCounters, {passive:true}); window.addEventListener('load', ()=> setTimeout(checkCounters,200)); document.addEventListener('DOMContentLoaded', ()=> setTimeout(checkCounters,400))

    // maturity
    let matDone = false
    const matwrap = document.getElementById('matwrap')
    if(matwrap){ new IntersectionObserver(function(entries){ entries.forEach(function(e:any){ if(e.isIntersecting && !matDone){ matDone = true; [0,380,760,1140].forEach(function(d,i){ setTimeout(function(){ const el = document.getElementById('mc'+i); if(el) el.classList.add(i===2?'dg':'da') }, d) }); setTimeout(function(){ const l = document.getElementById('matline'); if(l) l.classList.add('go') }, 380) } }) }, {threshold:.3}).observe(matwrap) }

    // typing
    (function(){ const words = ['Governance','Sovereignty','Intelligence','Commerce']; let wi=0, ci=0, del=false, paused=false; const tel = document.getElementById('typed'); if(!tel) return; const typedEl = tel as HTMLElement; typedEl.textContent = words[0]; ci = words[0].length; function typeStep(){ if(paused){ paused=false; del=true; setTimeout(typeStep,2400); return } if(!del && ci===words[wi].length){ paused=true; typeStep(); return } if(del && ci===0){ del=false; wi=(wi+1)%words.length; setTimeout(typeStep,300); return } ci += del ? -1 : 1; typedEl.textContent = words[wi].slice(0,ci); setTimeout(typeStep, del ? 45 : 85) } setTimeout(typeStep,2600) })()

    // video modal
    function openVideoModal(){ const m = document.getElementById('videomodal'); if(m) m.classList.add('open'); document.body.style.overflow='hidden' }
    function closeVideoModal(){ const m = document.getElementById('videomodal'); if(m) m.classList.remove('open'); document.body.style.overflow='' }
    const vplayer = document.getElementById('vplayer'); if(vplayer) vplayer.addEventListener('click', openVideoModal)
    const vmback = document.querySelector('#videomodal .aimodalbg'); if(vmback) vmback.addEventListener('click', closeVideoModal)

    // AI modal
    function closeAI(){ const m = document.getElementById('aimodal'); if(m) m.classList.remove('open'); document.body.style.overflow = '' }
    function openAI(){ const m = document.getElementById('aimodal'); if(m) m.classList.add('open'); document.body.style.overflow = 'hidden' }
    const aibtn = document.getElementById('aibtn'); if(aibtn) aibtn.addEventListener('click', ()=>{ openAI() })
    const aimodalbg = document.querySelector('#aimodal .aimodalbg'); if(aimodalbg) aimodalbg.addEventListener('click', closeAI)
    const aimclose = document.querySelector('.aimclose'); if(aimclose) aimclose.addEventListener('click', closeAI)

    // AI send / quick q handlers
    const aimsend = document.getElementById('aimsend'); function addMsg(text:string, type:'u'|'b'){ const msgs = document.getElementById('aimmsgs'); if(!msgs) return; msgs.classList.add('show'); const d = document.createElement('div'); d.className = 'aimmsg aimmsg' + type; d.textContent = text; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight }
    function getReply(m:string){ const l = m.toLowerCase(); if(l.includes('what is acf')||l.includes('who created')||l.includes('framework')) return 'ACF — Agentic Commerce Framework® — is a proprietary governance methodology created by Vincent DORANGE. It defines how organizations deploy and supervise autonomous agentic systems.'; if(l.includes('certif')) return 'ACF Certification: ...'; if(l.includes('dda')||l.includes('delegat')) return 'The DDA — Délégué à la Décision Agentique — is the legal guardian of autonomous agents.'; if(l.includes('score')||l.includes('sovereignty score')) return 'ACF Score measures your Sovereignty Score across 6 axes.'; if(l.includes('principle')) return 'ACF has 4 founding principles.'; return 'For details visit /standard or contact us.' }
    function showTyping(){ const msgs = document.getElementById('aimmsgs'); if(!msgs) return; msgs.classList.add('show'); const d = document.createElement('div'); d.className='aimtyp'; d.id='aimtyp'; d.innerHTML = '<span></span><span></span><span></span>'; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight }
    function hideTyping(){ const t = document.getElementById('aimtyp'); if(t) t.remove() }
    function sendMsg(text:string){ if(!text) return; addMsg(text,'u'); showTyping(); setTimeout(()=>{ hideTyping(); addMsg(getReply(text),'b') }, 700 + Math.random()*400) }
    if(aimsend) aimsend.addEventListener('click', ()=>{ const inp = document.getElementById('aiminp') as HTMLInputElement | null; const v = inp?.value.trim(); if(v){ if(inp) inp.value=''; sendMsg(v) } })
    const aiminp = document.getElementById('aiminp') as HTMLInputElement | null; if(aiminp) aiminp.addEventListener('keydown', (e)=>{ if((e as KeyboardEvent).key === 'Enter'){ const v = aiminp.value.trim(); if(v){ aiminp.value=''; sendMsg(v) } } })
    document.querySelectorAll('.aimq').forEach(b=> b.addEventListener('click', ()=>{ const txt = (b as HTMLElement).textContent||''; const inp = document.getElementById('aiminp') as HTMLInputElement | null; if(inp) inp.value = txt; sendMsg(txt) }))

    return ()=>{
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey as any)
    }
  }, [])

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
    </>
  )
}

function readFileSyncSafe(){
  return ''
}
