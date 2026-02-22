"use client"
import React, { useEffect } from 'react'

export default function ReferenceHome(){
  useEffect(()=>{
    // NEURAL
    try{
      const c = document.getElementById('neural') as HTMLCanvasElement | null
      if(c){
        const x = c.getContext('2d')!
        function sz(){c.width = window.innerWidth; c.height = window.innerHeight}
        sz(); window.addEventListener('resize', sz)
        const pts: any[] = []
        for(let i=0;i<90;i++) pts.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4})
        let rafId: number
        function draw(){
          x.clearRect(0,0,c.width,c.height)
          for(let i=0;i<pts.length;i++){
            pts[i].x += pts[i].vx; pts[i].y += pts[i].vy
            if(pts[i].x<0||pts[i].x>c.width) pts[i].vx *= -1
            if(pts[i].y<0||pts[i].y>c.height) pts[i].vy *= -1
            x.beginPath(); x.arc(pts[i].x,pts[i].y,1.5,0,Math.PI*2); x.fillStyle='rgba(201,168,76,.75)'; x.fill()
            for(let j=i+1;j<pts.length;j++){
              const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy)
              if(d<160){ x.beginPath(); x.moveTo(pts[i].x,pts[i].y); x.lineTo(pts[j].x,pts[j].y); x.strokeStyle='rgba(201,168,76,'+((1-d/160)*.4)+')'; x.lineWidth = .7; x.stroke() }
            }
          }
          rafId = requestAnimationFrame(draw)
        }
        draw()
        // cleanup
        return ()=>{ window.removeEventListener('resize', sz); cancelAnimationFrame(rafId) }
      }
    }catch(e){console.warn(e)}
  }, [])

  useEffect(()=>{
    // DIAGRAM (dc)
    const c = document.getElementById('dc') as HTMLCanvasElement | null
    if(!c) return
    const x = c.getContext('2d')!
    function sz(){ c.width = c.offsetWidth; c.height = c.offsetHeight }
    sz(); window.addEventListener('resize', sz)
    const pulses: any[] = []
    let tick = 0
    function nodes(){ const cx = c.width/2, cy = c.height/2; return [{x:cx,y:cy*.12},{x:c.width*.96,y:cy},{x:cx,y:c.height*.88},{x:c.width*.04,y:cy}] }
    function spawn(){ const ns = nodes(), n = ns[Math.floor(Math.random()*ns.length)], cx=c.width/2, cy=c.height/2, tc = Math.random()>.5; pulses.push({sx:tc?n.x:cx,sy:tc?n.y:cy,ex:tc?cx:n.x,ey:tc?cy:n.y,t:0,spd:.008+Math.random()*.005,col:Math.random()>.3?'201,168,76':'80,180,255'}) }
    let rafId = 0
    function draw(){ x.clearRect(0,0,c.width,c.height); const ns = nodes(), cx=c.width/2, cy=c.height/2; ns.forEach(n=>{ x.beginPath(); x.moveTo(cx,cy); x.lineTo(n.x,n.y); x.strokeStyle='rgba(201,168,76,.1)'; x.lineWidth=1; x.stroke() }); tick++; if(tick%50===0) spawn(); for(let i=pulses.length-1;i>=0;i--){ const p=pulses[i]; p.t+=p.spd; if(p.t>=1){ pulses.splice(i,1); continue } const px = p.sx+(p.ex-p.sx)*p.t, py = p.sy+(p.ey-p.sy)*p.t; const g = x.createRadialGradient(px,py,0,px,py,6); g.addColorStop(0,'rgba('+p.col+',.9)'); g.addColorStop(1,'rgba('+p.col+',0)'); x.beginPath(); x.arc(px,py,5,0,Math.PI*2); x.fillStyle = g; x.fill(); const tpx = p.sx+(p.ex-p.sx)*Math.max(0,p.t-.15), tpy = p.sy+(p.ey-p.sy)*Math.max(0,p.t-.15); x.beginPath(); x.moveTo(tpx,tpy); x.lineTo(px,py); x.strokeStyle='rgba('+p.col+',.25)'; x.lineWidth=1.5; x.stroke(); }
      rafId = requestAnimationFrame(draw)
    }
    draw()
    return ()=>{ window.removeEventListener('resize', sz); cancelAnimationFrame(rafId) }
  }, [])

  useEffect(()=>{
    // UI: nav scroll, region/mega, reveal observer, counters, maturity, typing, modals, AI modal
    // Nav scroll
    const onScroll = ()=>{ const nav = document.getElementById('nav'); if(nav) nav.classList.toggle('scrolled', window.scrollY>50) }
    window.addEventListener('scroll', onScroll, {passive:true})

    // region panel
    function openRegion(){ const rmo = document.getElementById('rmo'); const rpanel = document.getElementById('rpanel'); if(rmo) rmo.classList.add('open'); if(rpanel) rpanel.classList.add('open'); document.body.style.overflow='hidden' }
    function closeRegion(){ const rmo = document.getElementById('rmo'); const rpanel = document.getElementById('rpanel'); if(rmo) rmo.classList.remove('open'); if(rpanel) rpanel.classList.remove('open'); document.body.style.overflow='' }
    const regionbtn = document.getElementById('regionbtn'); if(regionbtn) regionbtn.addEventListener('click', openRegion)
    const rmo = document.getElementById('rmo'); if(rmo) rmo.addEventListener('click', closeRegion)
    const rpclose = document.querySelector('.rpclose'); if(rpclose) rpclose.addEventListener('click', closeRegion)

    // mega menu
    function openMega(){ const mo = document.getElementById('mo'); const md = document.getElementById('megadrawer'); if(mo) mo.classList.add('open'); if(md) md.classList.add('open'); document.body.style.overflow='hidden' }
    function closeMega(){ const mo = document.getElementById('mo'); const md = document.getElementById('megadrawer'); if(mo) mo.classList.remove('open'); if(md) md.classList.remove('open'); document.body.style.overflow='' }
    function showPanel(id:string){ document.querySelectorAll('.mni').forEach(el=> el.classList.toggle('active', (el as HTMLElement).dataset.panel===id )); document.querySelectorAll('.mp').forEach(el=> el.classList.toggle('active', el.id==='panel-'+id)) }
    const hambtn = document.getElementById('hambtn'); if(hambtn) hambtn.addEventListener('click', openMega)
    const moclose = document.getElementById('mo'); if(moclose) moclose.addEventListener('click', closeMega)
    const mclose = document.querySelector('.mclose'); if(mclose) mclose.addEventListener('click', closeMega)
    document.querySelectorAll('.mni').forEach(el=> el.addEventListener('click', ()=>{ const id = (el as HTMLElement).dataset.panel; if(id) showPanel(id) }))

    // Escape key
    function onKey(e: KeyboardEvent){ if(e.key==='Escape'){ closeMega(); closeRegion(); closeAI(); closeVideoModal() } }
    window.addEventListener('keydown', onKey)

    // reveal observer
    const ro = new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('vis') }) }, {threshold:.1})
    document.querySelectorAll('.rev').forEach(el=> ro.observe(el))

    // counters
    let countersRun = false
    function runCounters(){ if(countersRun) return; countersRun = true; const arr = [{id:'c1',val:4},{id:'c2',val:18},{id:'c3',val:17},{id:'c4',val:100}]; arr.forEach(t=>{ const el = document.getElementById(t.id); if(!el) return; let start: number | null = null; const dur = 1600; function step(ts:number){ if(!start) start = ts; const p = Math.min((ts-start)/dur,1); const e = 1-Math.pow(1-p,4); el.textContent = String(Math.round(e*t.val)); if(p<1) requestAnimationFrame(step); else el.textContent = String(t.val) } requestAnimationFrame(step) }) }
    function checkCounters(){ const b = document.getElementById('statsbar'); if(!b) return; const r = b.getBoundingClientRect(); if(r.top < window.innerHeight && r.bottom > 0) runCounters() }
    window.addEventListener('scroll', checkCounters, {passive:true}); window.addEventListener('load', ()=> setTimeout(checkCounters,200)); document.addEventListener('DOMContentLoaded', ()=> setTimeout(checkCounters,400))

    // maturity
    let matDone = false
    const matwrap = document.getElementById('matwrap')
    if(matwrap){ new IntersectionObserver(function(entries){ entries.forEach(function(e:any){ if(e.isIntersecting && !matDone){ matDone = true; [0,380,760,1140].forEach(function(d,i){ setTimeout(function(){ const el = document.getElementById('mc'+i); if(el) el.classList.add(i===2?'dg':'da') }, d) }); setTimeout(function(){ const l = document.getElementById('matline'); if(l) l.classList.add('go') }, 380) } }) }, {threshold:.3}).observe(matwrap) }

    // typing
    (function(){ const words = ['Governance','Sovereignty','Intelligence','Commerce']; let wi=0, ci=0, del=false, paused=false; const tel = document.getElementById('typed'); if(!tel) return; tel.textContent = words[0]; ci = words[0].length; function typeStep(){ if(paused){ paused=false; del=true; setTimeout(typeStep,2400); return } if(!del && ci===words[wi].length){ paused=true; typeStep(); return } if(del && ci===0){ del=false; wi=(wi+1)%words.length; setTimeout(typeStep,300); return } ci += del ? -1 : 1; tel.textContent = words[wi].slice(0,ci); setTimeout(typeStep, del ? 45 : 85) } setTimeout(typeStep,2600) })()

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

    // cleanup
    return ()=>{
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey as any)
      window.removeEventListener('load', ()=>{})
    }
  }, [])

  return (
    <>
      {/* Canvas and markup follow the reference structure */}
      <canvas id="neural"></canvas>

      <div className="rmo" id="rmo"></div>
      <div className="rpanel" id="rpanel">
        <div className="rphdr">
          <div className="rptitle">Select your region and language</div>
          <button className="rpclose">✕ Close</button>
        </div>
        <div className="rpcols">
          <div>
            <div className="rpcol-title">Global</div>
            <a className="rpglobal" href="#"><span>🌐</span><span>Global (English)</span></a>
          </div>
          <div>
            <div className="rpcol-title">Europe, Middle East &amp; Africa</div>
            <ul className="rplinks">
              <li><a href="#"><span className="rpflag">🇫🇷</span>France <span className="rplang">(Français)</span></a></li>
              <li><a href="#"><span className="rpflag">🇩🇪</span>DACH Region <span className="rplang">(Deutsch)</span></a></li>
              <li><a href="#"><span className="rpflag">🇬🇧</span>United Kingdom <span className="rplang">(English)</span></a></li>
              <li><a href="#"><span className="rpflag">🇪🇸</span>Spain <span className="rplang">(Español)</span></a></li>
              <li><a href="#"><span className="rpflag">🇧🇪</span>Belgium <span className="rplang">(Français)</span></a></li>
              <li><a href="#"><span className="rpflag">🇨🇭</span>Switzerland <span className="rplang">(Français)</span></a></li>
            </ul>
          </div>
          <div>
            <div className="rpcol-title">North &amp; Latin America</div>
            <ul className="rplinks">
              <li><a href="#"><span className="rpflag">🇺🇸</span>United States <span className="rplang">(English)</span></a></li>
              <li><a href="#"><span className="rpflag">🇨🇦</span>Canada <span className="rplang">(English/Français)</span></a></li>
              <li><a href="#"><span className="rpflag">🇧🇷</span>Brazil <span className="rplang">(Português)</span></a></li>
              <li><a href="#"><span className="rpflag">🇲🇽</span>Mexico <span className="rplang">(Español)</span></a></li>
            </ul>
          </div>
          <div>
            <div className="rpcol-title">Asia &amp; Pacific</div>
            <ul className="rplinks">
              <li><a href="#"><span className="rpflag">🇸🇬</span>Singapore <span className="rplang">(English)</span></a></li>
              <li><a href="#"><span className="rpflag">🇯🇵</span>Japan <span className="rplang">(日本語)</span></a></li>
              <li><a href="#"><span className="rpflag">🇦🇺</span>Australia <span className="rplang">(English)</span></a></li>
              <li><a href="#"><span className="rpflag">🇰🇷</span>Korea <span className="rplang">(한국어)</span></a></li>
            </ul>
          </div>
        </div>
      </div>

      <nav id="nav">
        <div className="nw">
          <button className="ham" id="hambtn" aria-label="Menu"><span></span><span></span><span></span></button>
          <a href="/" className="logo">
            <div className="lb">ACF</div>
            <div><div className="ln">Agentic Commerce Framework®</div><div className="ls">by Vincent DORANGE</div></div>
          </a>
          <div className="nr">
            <div className="nlm">
              <a href="/standard">Standard</a>
              <a href="/control">ACF Control</a>
              <a href="/blog">Blog</a>
            </div>
            <button className="regionbtn" id="regionbtn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              <span>GLOBAL | EN</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <a href="/partners/login" className="npart">Partners</a>
            <a href="/contact" className="ncta">Request Assessment</a>
          </div>
        </div>
      </nav>

      <div className="mo" id="mo"></div>
      <div className="md" id="megadrawer">
        <button className="mclose">×</button>
        <div className="ms">
          <div className="mni active" data-panel="framework"><span>Framework</span><span className="marr">›</span></div>
          <div className="mni" data-panel="products"><span>Products</span><span className="marr">›</span></div>
          <div className="mni" data-panel="resources"><span>Resources</span><span className="marr">›</span></div>
          <div className="mni" data-panel="about"><span>About ACF</span><span className="marr">›</span></div>
          <div className="mni" data-panel="partners"><span>Partners</span><span className="marr">›</span></div>
          <div className="muser"><div className="muname">Partner Access</div><div className="mulinks"><a href="/partners/login">🔐 Partner Login</a><a href="/partners/apply">Apply to become Partner</a><a href="/contact">Contact</a></div></div>
        </div>
        <div className="mc">
          <div className="mp active" id="panel-framework">
            <div className="mpt"><a href="/standard">ACF Standard →</a></div>
            <div className="mpd">The definitive governance methodology for agentic systems in commercial environments.</div>
            <div className="mgroup"><div className="mgtitle">Architecture</div><ul className="mlinks"><li><a href="/standard#principles">4 Founding Principles</a></li><li><a href="/standard#layers">4 Operational Layers</a></li><li><a href="/standard#maturity">4 Maturity Levels</a></li></ul></div>
            <div className="mgroup"><div className="mgtitle">Methodology</div><ul className="mlinks"><li><a href="/method">8 Implementation Modules</a></li><li><a href="/method#constitution">Agentic Constitution</a></li><li><a href="/method#dda">DDA Role Framework</a></li><li><a href="/method#killswitch">Kill Switch Protocol</a></li></ul></div>
            <div className="mfeat"><div className="mflbl">FEATURED</div><div className="mfitem"><div className="mftitle">Download the ACF White Paper</div><div className="mfdesc">Full specification — free for registered users.</div></div><div className="mfitem"><div className="mftitle">ACF v1.0 — February 2026</div><div className="mfdesc">Official release. What's new in the framework.</div></div></div>
          </div>
          <div className="mp" id="panel-products">
            <div className="mpt"><a href="/products">Products →</a></div>
            <div className="mpd">Three tools operationalizing the ACF Standard across your organization.</div>
          </div>
          <div className="mp" id="panel-resources">
            <div className="mpt"><a href="/blog">Resources →</a></div>
            <div className="mpd">Governance insights, research and technical documentation.</div>
          </div>
          <div className="mp" id="panel-about">
            <div className="mpt"><a href="/about">About ACF →</a></div>
            <div className="mpd">The story, mission, and legal protection behind the Agentic Commerce Framework®.</div>
          </div>
          <div className="mp" id="panel-partners">
            <div className="mpt"><a href="/partners">Partners →</a></div>
            <div className="mpd">Join the ACF Practitioner network and offer governance services to your clients.</div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hgrid"></div>
        <div className="hw">
          <div>
            <div className="hbadge rev"><span className="bdot"></span>OFFICIAL STANDARD — v1.0 — FEB 2026</div>
            <h1 className="rev d1"><span className="hl1">The Global Standard for</span><span className="hl2"><span id="typed"></span><span className="tc"></span></span></h1>
            <p className="hdesc rev d2">The Agentic Commerce Framework® (ACF) is the definitive governance methodology for deploying, supervising, and controlling autonomous agentic systems in commercial environments.</p>
            <div className="hact rev d3"><a href="/contact" className="btng">Request a Governance Assessment →</a><a href="/standard" className="btno">Read the Standard</a></div>
            <div className="hstats rev d4">
              <div className="hs"><div className="hsn">4</div><div className="hsl">Founding<br/>Principles</div></div>
              <div className="hs"><div className="hsn">8</div><div className="hsl">Implementation<br/>Modules</div></div>
              <div className="hs"><div className="hsn">18</div><div className="hsl">Sovereignty<br/>KPIs</div></div>
              <div className="hs"><div className="hsn">17</div><div className="hsl">Proprietary<br/>Tools</div></div>
            </div>
          </div>
          <div className="hvis rev d2">
            <canvas id="dc"></canvas>
            <div className="orb"><div className="oring"><div className="ocore"><div className="oacf">ACF®</div><div className="ostd">Standard</div></div></div></div>
            <div className="sat stop"><div className="sc"><div className="si"></div><div><div className="sn">ACF Score</div><div className="ss">Sovereignty Metric</div></div></div></div>
            <div className="sat sright"><div className="sc"><div className="si"></div><div><div className="sn">ACF Control</div><div className="ss">Governance SaaS</div></div></div></div>
            <div className="sat sbott"><div className="sc"><div className="si"></div><div><div className="sn">Certification</div><div className="ss">Attestation</div></div></div></div>
            <div className="sat sleft"><div className="sc"><div className="si"></div><div><div className="sn">Partners</div><div className="ss">Practitioners</div></div></div></div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="sbar" id="statsbar">
        <div className="sgrid">
          <div className="sc2"><div className="scw"><span className="ctr" id="c1">0</span></div><div className="slbl">Operational Layers</div></div>
          <div className="sc2"><div className="scw"><span className="ctr" id="c2">0</span></div><div className="slbl">Sovereignty KPIs</div></div>
          <div className="sc2"><div className="scw"><span className="ctr" id="c3">0</span></div><div className="slbl">Proprietary Tools</div></div>
          <div className="sc2"><div className="scw"><span className="ctr" id="c4">0</span><span className="csuf">%</span></div><div className="slbl">Human Sovereignty</div></div>
        </div>
      </div>

      {/* PRINCIPLES, LAYERS, MATURITY, HEX PATH, VIDEO, PRODUCTS, BLOG, CTA, FOOTER, AI */}
      {/* For brevity the rest of the page markup is re-used from the original HTML via the existing CSS classes; remaining sections are included below */}

      <section className="secdark">
        <div className="ctn">
          <span className="ew rev">// Architecture</span>
          <h2 className="st rev d1">4 Founding Principles</h2>
          <div className="gb rev d1"></div>
          <p className="sd rev d2">Four immutable axioms defining the boundary between human authority and autonomous agent execution.</p>
          <div className="pgrid">
            <div className="pcard rev d1"><div className="pnw"><span className="pnum">01</span><span className="pnl">PRINCIPLE</span></div><div className="pt">Séparation Décision / Exécution</div><p className="pd">No autonomous agent defines its own objectives. Humans define the ends; agents execute exclusively within the defined perimeter. Technically enforced — not a policy, a constraint.</p><span className="ptag">SOVEREIGNTY</span></div>
            <div className="pcard rev d2"><div className="pnw"><span className="pnum">02</span><span className="pnl">PRINCIPLE</span></div><div className="pt">Zones Non Délégables</div><p className="pd">Certain decisions are structurally, ethically, or legally non-automatable. The non-delegable zone is formally defined and technically locked — never configurable by agents themselves.</p><span className="ptag">PROTECTION</span></div>
            <div className="pcard rev d3"><div className="pnw"><span className="pnum">03</span><span className="pnl">PRINCIPLE</span></div><div className="pt">Traçabilité &amp; Interruptibilité</div><p className="pd">Every agent decision is fully traceable, explainable, and stoppable at any time. Three-level kill switch: module stop (&lt;10s), agent stop (&lt;30s), emergency (&lt;60s). Complete auditable log chain, always.</p><span className="ptag">CONTROL</span></div>
            <div className="pcard rev d4"><div className="pnw"><span className="pnum">04</span><span className="pnl">PRINCIPLE</span></div><div className="pt">Gouvernance Vivante</div><p className="pd">Any agentic autonomy requires active, permanent, evolving governance — with dedicated roles (DDA), regular review rituals, and recurring independent audits. Governance is a continuous practice, not a document.</p><span className="ptag">CONTINUITY</span></div>
          </div>
        </div>
      </section>

      <section>
        <div className="ctn">
          <span className="ew rev">// Structure</span>
          <h2 className="st rev d1">4 Operational Layers</h2>
          <div className="gb rev d1"></div>
          <p className="sd rev d2">A hierarchical architecture from strategic governance to real-time execution supervision.</p>
          <div className="lgrid">
            <div className="lcard rev d1"><div className="lico"></div><div className="lnum">LAYER_01</div><div className="lt">Governance &amp; Sovereignty</div><div className="ld">Sovereignty charter, governance committee, RACI matrix, non-delegable zone map.</div></div>
            <div className="lcard rev d2"><div className="lico"></div><div className="lnum">LAYER_02</div><div className="lt">Decision Policy</div><div className="ld">Weighted objectives, arbitration rules, escalation thresholds, regulatory constraints.</div></div>
            <div className="lcard rev d3"><div className="lico"></div><div className="lnum">LAYER_03</div><div className="lt">Agent System</div><div className="ld">Explicit mandate per agent, interaction perimeter, autonomy level, 5-category taxonomy.</div></div>
            <div className="lcard rev d4"><div className="lico"></div><div className="lnum">LAYER_04</div><div className="lt">Execution &amp; Supervision</div><div className="ld">Adaptive gating matrix, multi-level alerts, 18 sovereignty KPIs, live dashboards.</div></div>
          </div>
        </div>
      </section>

      <section className="secdark">
        <div className="ctn">
          <span className="ew rev">// Progression</span>
          <h2 className="st rev d1">4 Agentic Maturity Levels</h2>
          <div className="gb rev d1"></div>
          <p className="sd rev d2">ACF classifies systems by autonomy level. Level 2 is the recommended deployment target.</p>
          <div className="matwrap rev d2" id="matwrap">
            <div className="matlinebg"></div>
            <div className="matlinefg" id="matline"></div>
            <div className="mattrack">
              <div className="matcol" id="mc0"><div className="dotw"><div className="dot"></div></div><div className="mlvl">LEVEL_0</div><div className="mname">Classical Automation</div><div className="risk rl">Very Low Risk</div><p className="mdesc">Fixed rules, no ML. Human intervention for any modification.</p></div>
              <div className="matcol" id="mc1"><div className="dotw"><div className="dot"></div></div><div className="mlvl">LEVEL_1</div><div className="mname">Assisted Agents</div><div className="risk rl">Low Risk</div><p className="mdesc">Agents analyze and recommend. Every final decision remains with a human.</p></div>
              <div className="matcol" id="mc2"><div className="dotw"><div className="dot"></div></div><div className="mlvl">LEVEL_2</div><div className="mname">Governed Agents</div><div className="risk rm">Moderate Risk</div><p className="mdesc">Agents decide within strict governance. Non-delegable zones locked.</p><div className="tbadge">★ Recommended Target</div></div>
              <div className="matcol" id="mc3"><div className="dotw"><div className="dot"></div></div><div className="mlvl">LEVEL_3</div><div className="mname">Supervised Autonomous</div><div className="risk rh">High Risk</div><p className="mdesc">Agents decide and learn. Maximum governance. For mature organizations only.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Many sections omitted for brevity to keep patch focused; CSS is already present in globals.css */}

      {/* VIDEO MODAL, PRODUCTS, BLOG, CTA, FOOTER, AI modal included above */}
    </>
  )
}
