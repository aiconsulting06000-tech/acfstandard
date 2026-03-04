"use client";

import React, { useState, useEffect, useRef } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF STANDARD — THE STANDARD
   The Governance Framework for Autonomous AI Agents
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldGlow: "rgba(201,168,76,.35)", goldBorder: "rgba(201,168,76,.2)",
  white: "#ffffff", gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", bd2: "rgba(201,168,76,.2)",
  green: "#22c55e", red: "#ef4444", amber: "#f59e0b",
  blue: "#3b82f6", purple: "#8b5cf6",
};

function AnimatedCounter({ end, duration = 1600, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let s = 0; const step = end / (duration / 16);
    const t = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [started, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function GoldBar() { return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, marginBottom: 16 }} />; }
function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12 }}>// {children}</div>;
}

/* ── Hero SVGs ─────────────────────────────────── */
function HeroFrameworkShield() {
  return (
    <svg width="180" height="200" viewBox="0 0 180 200" fill="none">
      <defs>
        <linearGradient id="fs-stroke" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e8c96a" stopOpacity="0.9" /><stop offset="50%" stopColor="#c9a84c" stopOpacity="0.3" /><stop offset="100%" stopColor="#e8c96a" stopOpacity="0.9" /></linearGradient>
        <linearGradient id="fs-fill" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" /></linearGradient>
        <filter id="fs-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="fs-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d="M90 8 L168 32 L168 112 Q168 158 90 196 Q12 158 12 112 L12 32 Z" fill="none" stroke="url(#fs-stroke)" strokeWidth="2.5" filter="url(#fs-glow)" />
      <path d="M90 14 L162 36 L162 110 Q162 153 90 190 Q18 153 18 110 L18 36 Z" fill="url(#fs-fill)" opacity="0.92" />
      <path d="M90 22 L152 42 L152 106 Q152 144 90 180 Q28 144 28 106 L28 42 Z" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.15" />
      <circle cx="90" cy="48" r="10" fill="#e8c96a" filter="url(#fs-dot)" opacity="0.8" />
      <circle cx="90" cy="48" r="5" fill="#fff" opacity="0.4" />
      <g opacity="0.65" stroke="#c9a84c" strokeWidth="1.5" fill="none">
        <rect x="62" y="75" width="56" height="10" rx="3" opacity="0.9" />
        <rect x="62" y="90" width="56" height="10" rx="3" opacity="0.7" />
        <rect x="62" y="105" width="56" height="10" rx="3" opacity="0.5" />
        <rect x="62" y="120" width="56" height="10" rx="3" opacity="0.3" />
      </g>
      <text x="90" y="76" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" opacity="0.6" letterSpacing="0.5">ACF</text>
      <text x="90" y="150" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="9" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1.5">THE STANDARD</text>
    </svg>
  );
}

function HeroScales() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      <defs>
        <filter id="sc-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="sc-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="90" cy="90" r="80" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.15" />
      <circle cx="90" cy="90" r="68" fill="#071122" opacity="0.6" />
      <circle cx="90" cy="90" r="68" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" />
      <g stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" filter="url(#sc-glow)">
        <line x1="90" y1="50" x2="90" y2="72" /><line x1="50" y1="72" x2="130" y2="72" />
        <line x1="50" y1="72" x2="42" y2="95" /><line x1="50" y1="72" x2="58" y2="95" /><path d="M38 95 Q50 105 62 95" />
        <line x1="130" y1="72" x2="122" y2="95" /><line x1="130" y1="72" x2="138" y2="95" /><path d="M118 95 Q130 105 142 95" />
      </g>
      <circle cx="90" cy="47" r="5" fill="#e8c96a" filter="url(#sc-dot)" opacity="0.7" />
      <circle cx="90" cy="47" r="2.5" fill="#fff" opacity="0.4" />
      <text x="50" y="115" textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="8" fill="#c9a84c" opacity="0.5" fontWeight="600">AI</text>
      <text x="130" y="115" textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="8" fill="#c9a84c" opacity="0.5" fontWeight="600">HUMAN</text>
      <text x="90" y="148" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">GOVERNANCE</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════ */
export default function TheStandardPage() {
  const navLinks = ["Framework", "Layers", "Products", "Research"];
  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes heroFloatSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes heroPulse{0%,100%{filter:drop-shadow(0 0 12px rgba(201,168,76,.15))}50%{filter:drop-shadow(0 0 36px rgba(201,168,76,.45))}}
        @keyframes heroOrbitCW{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes heroOrbitCCW{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes sparkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}
        .fade-up{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.1s}
        .fade-up-d2{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.3s}
        .fade-up-d3{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.55s}
        .gold-glow:hover{box-shadow:0 0 20px rgba(201,168,76,.2)}
        .hero-left{animation:heroFloat 4s ease-in-out infinite,heroPulse 4s ease-in-out infinite}
        .hero-right{animation:heroFloatSlow 5s ease-in-out infinite,heroPulse 5s ease-in-out infinite .5s}
        *{box-sizing:border-box;margin:0;padding:0}a{text-decoration:none;color:inherit}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>THE GOVERNANCE FRAMEWORK</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l}</a>
            ))}
            <a href="/en/acf-score" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Get Your Score →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 700, height: 700, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(201,168,76,.06)", animation: "heroOrbitCW 60s linear infinite" }} />
          <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(201,168,76,.04)", animation: "heroOrbitCCW 45s linear infinite" }} />
          <div style={{ position: "absolute", inset: 140, borderRadius: "50%", border: "1px dashed rgba(201,168,76,.06)", animation: "heroOrbitCW 80s linear infinite" }} />
          {[0,1,2,3,4,5].map(i => (<div key={i} style={{ position: "absolute", top: `${50+42*Math.sin((i/6)*Math.PI*2)}%`, left: `${50+42*Math.cos((i/6)*Math.PI*2)}%`, width: 4, height: 4, borderRadius: "50%", background: C.gold, opacity: 0, animation: `sparkle ${2+i*.3}s ease-in-out infinite ${i*.8}s` }} />))}
        </div>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 40, alignItems: "center" }}>
            <div className="fade-up" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-left"><HeroFrameworkShield /><div style={{ textAlign: "center", marginTop: 12 }}><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: .6 }}>FRAMEWORK</div><div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>Structure the control</div></div></div>
            </div>
            <div style={{ textAlign: "center" }} className="fade-up-d2">
              <Badge>THE GOVERNANCE STANDARD</Badge>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 24, letterSpacing: "-1px" }}>
                <span style={{ color: "#fff" }}>Agentic Commerce</span><br /><span style={{ color: C.gold }}>Framework®</span>
              </h1>
              <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 28px" }}>
                The first governance standard for organizations<br />deploying autonomous AI agents.<br /><strong style={{ color: "#fff" }}>Structure. Control. Sovereignty.</strong>
              </p>
              <p style={{ fontSize: 14, color: C.gray, maxWidth: 420, margin: "0 auto 32px" }}>Not an AI tool. A governance methodology.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <a href="/en/acf-score" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Assess Your Governance →</a>
                <a href="#framework" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, display: "inline-block", transition: "all .3s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Explore the Framework</a>
              </div>
            </div>
            <div className="fade-up-d3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-right"><HeroScales /><div style={{ textAlign: "center", marginTop: 4 }}><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: .6 }}>GOVERNANCE</div><div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>Balance autonomy</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>The Challenge</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>AI agents are making decisions <span style={{ color: C.gold }}>on your behalf</span></h2>
          <GoldBar />
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>Pricing, procurement, customer engagement, logistics — autonomous agents execute decisions at machine speed. The question isn't whether to use them. It's <strong style={{ color: "#fff" }}>who governs them</strong>.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 700, margin: "0 auto" }}>
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 12, padding: 24, textAlign: "left" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>WITHOUT GOVERNANCE</div>
              {["Agents optimize locally, destroy globally", "No audit trail for autonomous decisions", "€2.4M avg. loss per uncontrolled AI decision", "AI Act penalties up to 7% of global revenue"].map(r => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 6 }}><span style={{ color: C.red, fontSize: 11, marginTop: 2 }}>✕</span> {r}</div>
              ))}
            </div>
            <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 12, padding: 24, textAlign: "left" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".1em", marginBottom: 8 }}>WITH ACF GOVERNANCE</div>
              {["Every decision traceable and reversible", "Human accountability at every level", "Regulatory compliance built-in (AI Act, GDPR)", "Sovereignty preserved at machine speed"].map(r => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 6 }}><span style={{ color: C.gold, fontSize: 11, marginTop: 2 }}>✓</span> {r}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 LAYERS */}
      <section id="framework" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>The Methodology</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>The 4 ACF<span style={{ color: C.gold }}>®</span> Governance Layers</h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>A layered framework that structures control across your entire agentic ecosystem — from strategic governance to real-time supervision.</p>
          </div>
          <div id="layers" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { num: "01", title: "Governance Layer", color: C.gold, desc: "Strategic oversight and accountability. Defines who governs, who decides, who is responsible.", items: ["Agentic Constitution", "Named governance sponsor", "Decision authority mapping", "Escalation protocols"] },
              { num: "02", title: "Policy Layer", color: C.green, desc: "Formalized rules and boundaries for autonomous agent behavior. The guardrails that constrain AI action.", items: ["Agent behavior policies", "Autonomy boundaries", "Compliance alignment (AI Act, GDPR)", "Ethical decision frameworks"] },
              { num: "03", title: "System Layer", color: C.blue, desc: "Technical infrastructure for monitoring, logging, and controlling agent execution in real time.", items: ["Kill switch implementation", "Audit trail architecture", "Multi-agent coordination rules", "Interruptibility protocols"] },
              { num: "04", title: "Supervision Layer", color: C.amber, desc: "Ongoing human oversight, review cadence, and continuous improvement of governance posture.", items: ["Dashboard monitoring (ACF Control)", "Quarterly governance reviews", "Incident response procedures", "Sovereignty score tracking"] },
            ].map(l => (
              <div key={l.num} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 32, transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${l.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${l.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${l.color}15`, border: `1px solid ${l.color}40` }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: l.color }}>{l.num}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>{l.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6, marginBottom: 16 }}>{l.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {l.items.map(item => (<div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}><span style={{ color: l.color, fontSize: 10 }}>▸</span> {item}</div>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section id="products" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Product Ecosystem</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>The ACF <span style={{ color: C.gold }}>Ecosystem</span></h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>Five integrated products. One closed-loop system. Every piece feeds the next.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { icon: "📊", name: "ACF Score®", tag: "Free diagnostic", desc: "Assess your agentic governance in 10 minutes. Get your sovereignty score and personalized recommendations.", color: C.green, href: "/en/acf-score", cta: "Get Your Score" },
              { icon: "🎛️", name: "ACF Control", tag: "Governance platform", desc: "Real-time monitoring dashboard for autonomous agents. Track decisions, enforce policies, maintain control.", color: C.amber, href: "/en/acf-control", cta: "Explore Control" },
              { icon: "🎓", name: "ACF Academy", tag: "Training program", desc: "6-module training program. Core track for teams, executive track for leaders. Learn to govern.", color: C.blue, href: "/en/acf-certification#academy", cta: "View Programs" },
              { icon: "🛡️", name: "ACF Certification", tag: "Trust labels", desc: "ACF TRUST™ and ACF CERTIFIED labels. Prove your governance to customers, partners, and regulators.", color: C.gold, href: "/en/acf-certification", cta: "Get Certified" },
              { icon: "🤝", name: "ACF Partners", tag: "Global network", desc: "Deploy, audit, train, and certify organizations worldwide. Territory exclusivity and revenue share.", color: C.purple, href: "/en/acf-partners", cta: "Become a Partner" },
            ].map(p => (
              <div key={p.name} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: "28px 24px", transition: "all .3s", display: "flex", flexDirection: "column", ...(p.name === "ACF Partners" ? { gridColumn: "2" } : {}) }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: p.color, letterSpacing: ".12em", textTransform: "uppercase" }}>{p.tag}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{p.desc}</p>
                <a href={p.href} style={{ display: "block", textAlign: "center", padding: "10px 16px", borderRadius: 8, border: `1px solid ${p.color}40`, color: p.color, fontSize: 13, fontWeight: 600, transition: "all .2s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = `${p.color}15`; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}>{p.cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Foundations</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Research & <span style={{ color: C.gold }}>Methodology</span></h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>ACF® is built on rigorous research at the intersection of AI governance, organizational sovereignty, and regulatory compliance.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { title: "Agentic Commerce", desc: "How autonomous AI agents are reshaping commerce and why traditional controls fail.", icon: "🔬" },
              { title: "Decision Sovereignty", desc: "The theory of organizational sovereignty in an age of autonomous systems.", icon: "⚖️" },
              { title: "Regulatory Landscape", desc: "AI Act, GDPR, sectoral regulations — how governance frameworks must adapt.", icon: "📜" },
              { title: "4-Layer Architecture", desc: "The methodology behind the ACF® governance model and how it scales.", icon: "🏗️" },
            ].map(r => (
              <div key={r.title} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 14, padding: 28, transition: "all .3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.goldBorder} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd1}>
                <div style={{ fontSize: 24, marginBottom: 14 }}>{r.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{r.title}</h3>
                <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ fontSize: 14, color: C.gray, marginBottom: 16 }}>Developed by <strong style={{ color: "#fff" }}>Vincent DORANGE</strong> — AI CONSULTING, Nice, France</p>
            <a href="/en/about" style={{ display: "inline-block", padding: "12px 24px", borderRadius: 8, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 13, fontWeight: 600, transition: "all .2s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = C.goldDim; }} onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}>About ACF →</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 24, textAlign: "center" }}>
          {[
            { val: 4, suf: "", label: "Governance layers" },
            { val: 5, suf: "", label: "Ecosystem products" },
            { val: 3, suf: "", label: "Certification levels" },
            { val: 3, suf: "", label: "Trust tiers" },
            { val: 6, suf: "", label: "Academy modules" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.gold }}><AnimatedCounter end={s.val} suffix={s.suf} /></div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Govern the agents.<br /><span style={{ color: C.gold }}>Own your sovereignty.</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 32px" }}>Start with a free diagnostic. Get your ACF Score® in 10 minutes. Understand where you stand — and what to do next.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/en/acf-score" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Get Your ACF Score® →</a>
            <a href="/en/acf-certification" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, display: "inline-block" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Certification & Academy</a>
            <a href="/en/contact" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, display: "inline-block" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Contact Us</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 0 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, paddingBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 13, color: C.navy1, letterSpacing: 1 }}>ACF</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>Agentic Commerce Framework®</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase" }}>GLOBAL STANDARD FOR AI GOVERNANCE</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 320 }}>The governance standard for organizations deploying autonomous AI agents. Structure. Control. Sovereignty.</p>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Framework</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ label: "The Standard", href: "/en/standard" },{ label: "Methodology", href: "/en/standard#framework" },{ label: "Research", href: "/en/standard#research" },{ label: "ACF Certification", href: "/en/acf-certification" }].map(link => (
                  <a key={link.label} href={link.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{link.label}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Products</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ label: "ACF Score®", href: "/en/acf-score" },{ label: "ACF Control", href: "/en/acf-control" },{ label: "Certification", href: "/en/acf-certification" },{ label: "Academy", href: "/en/acf-certification#academy" }].map(link => (
                  <a key={link.label} href={link.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{link.label}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Organization</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ label: "Partner Portal", href: "/en/acf-partners" },{ label: "About", href: "/en/about" },{ label: "Contact", href: "/en/contact" },{ label: "Legal", href: "/en/legal" }].map(link => (
                  <a key={link.label} href={link.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{link.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.bd1}`, padding: "20px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
