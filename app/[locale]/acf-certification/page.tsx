"use client";

import React, { useState, useEffect, useRef } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF CERTIFICATION & ACADEMY
   Govern the Agents. Certify the Trust.
   Design: ACF Standard navy/gold palette
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldGlow: "rgba(201,168,76,.35)", goldBorder: "rgba(201,168,76,.2)",
  white: "#ffffff", gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", bd2: "rgba(201,168,76,.2)",
  green: "#22c55e", red: "#ef4444", amber: "#f59e0b",
  blue: "#3b82f6",
};

/* ── Helpers ───────────────────────────────────── */
function AnimatedCounter({ end, duration = 1600, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
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
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function GoldBar() {
  return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, marginBottom: 16 }} />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
      color: C.gold, letterSpacing: ".14em", textTransform: "uppercase",
      background: C.goldDim, border: `1px solid ${C.goldBorder}`,
      padding: "5px 14px", borderRadius: 100, display: "inline-block",
    }}>{children}</span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
      color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12,
    }}>// {children}</div>
  );
}

/* ── Shield Badges (cards) ────────────────────── */
function TrustShield({ name, color, colorLight }: { name: string; color: string; colorLight: string }) {
  const id = `trust-${name.toLowerCase()}`;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <svg width="160" height="182" viewBox="0 0 140 160" fill="none" style={{ filter: `drop-shadow(0 4px 14px ${color}30)`, transition: "all .4s" }}>
        <defs>
          <linearGradient id={`sg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorLight} stopOpacity={0.9} /><stop offset="50%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={colorLight} stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id={`sb-${id}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
          </linearGradient>
          <filter id={`gl-${id}`}><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id={`dgl-${id}`}><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M70 5 L130 24 L130 86 Q130 120 70 150 Q10 120 10 86 L10 24 Z" fill="none" stroke={`url(#sg-${id})`} strokeWidth="2.5" filter={`url(#gl-${id})`} />
        <path d="M70 10 L126 28 L126 85 Q126 117 70 146 Q14 117 14 85 L14 28 Z" fill={`url(#sb-${id})`} opacity="0.95" />
        <path d="M70 17 L118 33 L118 82 Q118 110 70 138 Q22 110 22 82 L22 33 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
        <circle cx="70" cy="36" r="7" fill={colorLight} filter={`url(#dgl-${id})`} opacity="0.85" />
        <circle cx="70" cy="36" r="3.5" fill="#fff" opacity="0.5" />
        <text x="70" y="66" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="12" fontWeight="700" fill="#ffffff" letterSpacing="0.5">ACF TRUST™</text>
        <line x1="30" y1="74" x2="110" y2="74" stroke={color} strokeWidth="0.5" opacity="0.25" />
        <text x="70" y="95" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="14" fontWeight="800" fill={colorLight} letterSpacing="1.5">{name.toUpperCase()}</text>
        <line x1="30" y1="103" x2="110" y2="103" stroke={color} strokeWidth="0.5" opacity="0.25" />
      </svg>
    </div>
  );
}

function CertifiedShield({ name, color, colorLight, stars }: { name: string; color: string; colorLight: string; stars: number }) {
  const id = `cert-${name.toLowerCase()}`;
  const starPath = "M6 0 L7.5 4.2 L12 4.6 L8.6 7.6 L9.7 12 L6 9.5 L2.3 12 L3.4 7.6 L0 4.6 L4.5 4.2 Z";
  const starW = 13, gap = 5;
  const totalW = stars * starW + (stars - 1) * gap;
  const startX = 70 - totalW / 2;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <svg width="160" height="182" viewBox="0 0 140 160" fill="none" style={{ filter: `drop-shadow(0 4px 14px ${color}30)`, transition: "all .4s" }}>
        <defs>
          <linearGradient id={`sg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorLight} stopOpacity={0.9} /><stop offset="50%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={colorLight} stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id={`sb-${id}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
          </linearGradient>
          <filter id={`gl-${id}`}><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id={`dgl-${id}`}><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M70 5 L130 24 L130 86 Q130 120 70 150 Q10 120 10 86 L10 24 Z" fill="none" stroke={`url(#sg-${id})`} strokeWidth="2.5" filter={`url(#gl-${id})`} />
        <path d="M70 10 L126 28 L126 85 Q126 117 70 146 Q14 117 14 85 L14 28 Z" fill={`url(#sb-${id})`} opacity="0.95" />
        <path d="M70 17 L118 33 L118 82 Q118 110 70 138 Q22 110 22 82 L22 33 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
        {Array.from({ length: stars }).map((_, i) => (
          <g key={i} transform={`translate(${startX + i * (starW + gap)}, 26)`} filter={`url(#dgl-${id})`}>
            <path d={starPath} fill={colorLight} opacity="0.9" />
          </g>
        ))}
        <text x="70" y="60" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" letterSpacing="0.3">ACF CERTIFIED™</text>
        <line x1="30" y1="68" x2="110" y2="68" stroke={color} strokeWidth="0.5" opacity="0.25" />
        <text x="70" y="89" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="800" fill={colorLight} letterSpacing="1.2">{name.toUpperCase()}</text>
        <line x1="30" y1="97" x2="110" y2="97" stroke={color} strokeWidth="0.5" opacity="0.25" />
      </svg>
    </div>
  );
}

/* ── Hero Animated Shield ─────────────────────── */
function HeroShield() {
  return (
    <svg width="180" height="210" viewBox="0 0 180 210" fill="none">
      <defs>
        <linearGradient id="hs-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" stopOpacity="0.9" /><stop offset="50%" stopColor="#c9a84c" stopOpacity="0.3" /><stop offset="100%" stopColor="#e8c96a" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="hs-fill" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
        </linearGradient>
        <filter id="hs-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="hs-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d="M90 8 L168 32 L168 112 Q168 158 90 196 Q12 158 12 112 L12 32 Z" fill="none" stroke="url(#hs-stroke)" strokeWidth="2.5" filter="url(#hs-glow)" />
      <path d="M90 14 L162 36 L162 110 Q162 153 90 190 Q18 153 18 110 L18 36 Z" fill="url(#hs-fill)" opacity="0.92" />
      <path d="M90 22 L152 42 L152 106 Q152 144 90 180 Q28 144 28 106 L28 42 Z" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.15" />
      <circle cx="90" cy="48" r="10" fill="#e8c96a" filter="url(#hs-dot)" opacity="0.8" />
      <circle cx="90" cy="48" r="5" fill="#fff" opacity="0.4" />
      <path d="M72 100 L84 114 L110 82" stroke="#c9a84c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
      <text x="90" y="76" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" opacity="0.6" letterSpacing="0.5">ACF</text>
      <text x="90" y="140" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">CERTIFIED</text>
    </svg>
  );
}

/* ── Hero Animated Graduation Cap ─────────────── */
function HeroAcademyCap() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      <defs>
        <linearGradient id="cap-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" stopOpacity="0.8" /><stop offset="100%" stopColor="#c9a84c" stopOpacity="0.5" />
        </linearGradient>
        <filter id="cap-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="cap-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="90" cy="90" r="80" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.15" />
      <circle cx="90" cy="90" r="68" fill="#071122" opacity="0.6" />
      <circle cx="90" cy="90" r="68" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" />
      <polygon points="90,42 145,68 90,88 35,68" fill="url(#cap-g)" opacity="0.7" filter="url(#cap-glow)" />
      <polygon points="90,42 145,68 90,88 35,68" fill="none" stroke="#e8c96a" strokeWidth="1.5" opacity="0.4" />
      <path d="M55 72 L55 105 Q55 118 90 125 Q125 118 125 105 L125 72" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.35" />
      <line x1="145" y1="68" x2="150" y2="105" stroke="#e8c96a" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <circle cx="150" cy="108" r="4" fill="#e8c96a" filter="url(#cap-dot)" opacity="0.7" />
      <circle cx="150" cy="108" r="2" fill="#fff" opacity="0.4" />
      <circle cx="90" cy="68" r="4" fill="#e8c96a" opacity="0.6" />
      <text x="90" y="148" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">ACADEMY</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ACFCertificationPage() {
  const [activeTrack, setActiveTrack] = useState("core");
  const navLinks = ["Trust", "Certified", "Academy", "Ecosystem"];

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heroFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes heroFloatSlow { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes heroPulse { 0%,100% { filter:drop-shadow(0 0 12px rgba(201,168,76,.15)); } 50% { filter:drop-shadow(0 0 36px rgba(201,168,76,.45)); } }
        @keyframes heroOrbitCW { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes heroOrbitCCW { from { transform:rotate(0deg); } to { transform:rotate(-360deg); } }
        @keyframes sparkle { 0%,100% { opacity:0; transform:scale(0); } 50% { opacity:1; transform:scale(1); } }
        .fade-up { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.1s; }
        .fade-up-d2 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.3s; }
        .fade-up-d3 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.55s; }
        .gold-glow:hover { box-shadow:0 0 20px rgba(201,168,76,.2); }
        .hero-left { animation:heroFloat 4s ease-in-out infinite, heroPulse 4s ease-in-out infinite; }
        .hero-right { animation:heroFloatSlow 5s ease-in-out infinite, heroPulse 5s ease-in-out infinite .5s; }
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
      `}</style>

      {/* ━━━ NAV ━━━ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72,
        background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1,
            }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF CERTIFICATION</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>GOVERNANCE STANDARD</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>← Back to Standard</a>
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l}</a>
            ))}
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>Apply Now</button>
          </div>
        </div>
      </nav>

      {/* ━━━ HERO with animated icons ━━━ */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(201,168,76,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
        }} />

        {/* Orbiting rings */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 700, height: 700, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(201,168,76,.06)", animation: "heroOrbitCW 60s linear infinite" }} />
          <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(201,168,76,.04)", animation: "heroOrbitCCW 45s linear infinite" }} />
          <div style={{ position: "absolute", inset: 140, borderRadius: "50%", border: "1px dashed rgba(201,168,76,.06)", animation: "heroOrbitCW 80s linear infinite" }} />
          {/* Sparkle dots */}
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              position: "absolute",
              top: `${50 + 42 * Math.sin((i / 6) * Math.PI * 2)}%`,
              left: `${50 + 42 * Math.cos((i / 6) * Math.PI * 2)}%`,
              width: 4, height: 4, borderRadius: "50%", background: C.gold, opacity: 0,
              animation: `sparkle ${2 + i * 0.3}s ease-in-out infinite ${i * 0.8}s`,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 40, alignItems: "center" }}>

            {/* LEFT — Animated Shield */}
            <div className="fade-up" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-left" style={{ position: "relative" }}>
                <HeroShield />
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: 0.6 }}>CERTIFICATION</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>Prove your governance</div>
                </div>
              </div>
            </div>

            {/* CENTER — Text */}
            <div style={{ textAlign: "center" }} className="fade-up-d2">
              <Badge>CERTIFICATION & ACADEMY</Badge>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 24, letterSpacing: "-1px" }}>
                <span style={{ color: "#fff" }}>Govern the Agents.</span><br />
                <span style={{ color: C.gold }}>Certify the Trust.</span>
              </h1>
              <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 28px" }}>
                Autonomous agents are reshaping commerce.<br />
                The question is no longer <em>if</em>.<br />
                The question is: <strong style={{ color: "#fff" }}>who governs them?</strong>
              </p>
              <p style={{ fontSize: 14, color: C.gray, maxWidth: 420, margin: "0 auto 32px" }}>
                ACF is not an AI tool. It is a governance standard.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <button className="gold-glow" style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                  border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                }}>Get ACF TRUST™ Label →</button>
                <button style={{
                  background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
                  padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .3s",
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
                >Become a Partner</button>
              </div>
            </div>

            {/* RIGHT — Animated Graduation Cap */}
            <div className="fade-up-d3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-right" style={{ position: "relative" }}>
                <HeroAcademyCap />
                <div style={{ textAlign: "center", marginTop: 4 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: 0.6 }}>ACADEMY</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>Learn to govern</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ ACF TRUST™ ━━━ */}
      <section id="trust" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Public Label</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              ACF TRUST<span style={{ color: C.gold }}>™</span>
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              The public label for agentic governance. It signals to customers, partners, and regulators that your company operates autonomous systems under explicit governance. Not just automation. <strong style={{ color: "#fff" }}>Accountability.</strong>
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { level: "LEVEL 1", name: "Initiated", color: "#22c55e", colorLight: "#4ade80", glowColor: "rgba(34,197,94,.15)", desc: "You have started your agentic journey.", items: ["ACF Score completed","Decision mapping in place","First governed agent deployed","Constitution agentique defined","Kill switch operational"], tagline: "You are aware." },
              { level: "LEVEL 2", name: "Governed", color: "#c9a84c", colorLight: "#e8c96a", glowColor: "rgba(201,168,76,.15)", desc: "You operate agents under formal supervision.", items: ["Multiple agents deployed","Explicit policies & escalation rules","Dashboard monitoring active","Human accountability assigned","Quarterly governance reviews"], tagline: "You are in control." },
              { level: "LEVEL 3", name: "Sovereign", color: "#3b82f6", colorLight: "#60a5fa", glowColor: "rgba(59,130,246,.15)", desc: "Agentic governance is embedded in your organization.", items: ["Enterprise-wide constitution","Multi-agent coordination rules","Audit trails & interruptibility proven","Sovereignty score monitored monthly","Executive ownership of decision policy"], tagline: "You own your autonomy." },
            ].map(t => (
              <div key={t.name} style={{
                background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: "32px 28px 28px",
                position: "relative", transition: "all .4s cubic-bezier(.16,1,.3,1)", textAlign: "center", overflow: "hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${t.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${t.glowColor}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <TrustShield name={t.name} color={t.color} colorLight={t.colorLight} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: t.colorLight, letterSpacing: ".14em" }}>{t.level}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>{t.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, textAlign: "left" }}>
                  {t.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}>
                      <span style={{ color: t.colorLight, fontSize: 11 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 12, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: t.colorLight, fontStyle: "italic" }}>{t.tagline}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <p style={{ fontSize: 12, color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>Annual audit required to maintain certification. Certified organizations display the ACF TRUST™ badge on their digital touchpoints.</p>
          </div>
        </div>
      </section>

      {/* ━━━ WHAT ACF TRUST GUARANTEES ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Consumer Promise</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              What ACF TRUST™ <span style={{ color: C.gold }}>guarantees</span>
            </h2>
            <p style={{ fontSize: 14, color: C.gray2, maxWidth: 500, margin: "0 auto" }}>When you see the ACF TRUST™ badge, you know:</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, maxWidth: 900, margin: "0 auto" }}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: "Your data is protected" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, label: "Prices are governed" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, label: "A human supervises" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, label: "Kill switch is ready" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>, label: "Decisions are auditable" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: "AI Act compliant" },
            ].map(g => (
              <div key={g.label} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: "20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{g.icon}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.gray2 }}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ACF CERTIFIED ━━━ */}
      <section id="certified" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Professional Certification</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              ACF <span style={{ color: C.gold }}>CERTIFIED</span>
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              Professional certification for practitioners and partners who implement agentic governance in the field. You don't certify AI skills. You certify <strong style={{ color: "#fff" }}>the capacity to govern autonomous systems.</strong>
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { tier: "PRACTITIONER", name: "ACF Practitioner", badgeName: "Practitioner", color: "#22c55e", colorLight: "#4ade80", glowColor: "rgba(34,197,94,.15)", stars: 1, desc: "For consultants, product leaders, architects.", abilities: ["Run ACF diagnostics","Build decision maps","Design governed agents","Deploy ACF tools","Create agentic constitutions"], requirements: ["ACF Academy Core Track","Case study exam","Constitution validation","Ethics commitment"], tagline: "You operate on projects.", recommended: false },
              { tier: "CONSULTANT", name: "ACF Consultant", badgeName: "Consultant", color: "#c9a84c", colorLight: "#e8c96a", glowColor: "rgba(201,168,76,.15)", stars: 2, desc: "For agencies and consulting firms.", abilities: ["Everything Practitioner +","Certify client organizations","Deliver ACF implementations","Conduct governance audits","Train internal teams","Sell ACF Control"], requirements: ["Practitioner certification","2 validated client cases","Governance audit passed","ACF committee review","Annual license fee"], tagline: "You scale delivery.", recommended: true },
              { tier: "PARTNER", name: "ACF Partner", badgeName: "Partner", color: "#3b82f6", colorLight: "#60a5fa", glowColor: "rgba(59,130,246,.15)", stars: 3, desc: "For major firms and system integrators.", abilities: ["Everything Consultant +","Deploy ACF at enterprise scale","Certify across regions","Co-develop sector frameworks","Territory exclusivity","Co-branding rights"], requirements: ["Consultant certification","5+ certified implementations","Dedicated ACF team","Manual selection by ACF","Annual partner fee"], tagline: "You shape the ecosystem.", recommended: false },
            ].map(plan => (
              <div key={plan.tier} style={{
                background: plan.recommended ? C.navy2 : C.navy3,
                border: `1px solid ${plan.recommended ? C.goldBorder : C.bd1}`,
                borderRadius: 16, padding: "40px 28px 28px", position: "relative", textAlign: "center",
                transition: "all .4s cubic-bezier(.16,1,.3,1)", overflow: "visible",
                display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${plan.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${plan.glowColor}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = plan.recommended ? C.goldBorder : C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {plan.recommended && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 2, background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, fontSize: 9, fontWeight: 800, padding: "5px 16px", borderRadius: 100, letterSpacing: ".08em", whiteSpace: "nowrap" }}>MOST POPULAR</div>
                )}
                <CertifiedShield name={plan.badgeName} color={plan.color} colorLight={plan.colorLight} stars={plan.stars} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: plan.recommended ? C.gold : C.gray, letterSpacing: ".14em", marginBottom: 8 }}>{plan.tier}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{plan.desc}</p>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: plan.colorLight, letterSpacing: ".1em", marginBottom: 8, textAlign: "left" }}>YOU CAN:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16, textAlign: "left" }}>
                  {plan.abilities.map(a => (<div key={a} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}><span style={{ color: plan.colorLight, fontSize: 11 }}>✓</span> {a}</div>))}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", marginBottom: 8, textAlign: "left" }}>REQUIREMENTS:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16, textAlign: "left" }}>
                  {plan.requirements.map(r => (<div key={r} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray }}><span style={{ color: C.gray, fontSize: 10 }}>→</span> {r}</div>))}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 12, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: plan.colorLight, fontStyle: "italic" }}>{plan.tagline}</div>
                  <button className="gold-glow" style={{
                    width: "100%", padding: 12, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                    background: plan.recommended ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : C.navy2,
                    color: plan.recommended ? C.navy1 : C.gray2,
                    outline: plan.recommended ? "none" : `1px solid ${C.bd1}`,
                  }}>{plan.recommended ? "Apply for Certification →" : "Learn More"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ACADEMY ━━━ */}
      <section id="academy" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Learn to Govern</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>ACF <span style={{ color: C.gold }}>Academy</span></h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>ACF Academy doesn't train people to use AI.<br /><strong style={{ color: "#fff" }}>It trains them to govern autonomous systems.</strong></p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {[
              { key: "core", label: "Core Track (101–103)", sub: "→ Practitioner" },
              { key: "pro", label: "Professional Track (201–203)", sub: "→ Consultant" },
              { key: "exec", label: "Executive Program", sub: "→ ACF Trust readiness" },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTrack(t.key)} style={{
                padding: "12px 20px", borderRadius: 10, border: "none", cursor: "pointer", transition: "all .3s",
                background: activeTrack === t.key ? C.goldDim : "transparent",
                borderWidth: 1, borderStyle: "solid", borderColor: activeTrack === t.key ? C.goldBorder : C.bd1,
              }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: activeTrack === t.key ? "#fff" : C.gray2, marginBottom: 2 }}>{t.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: activeTrack === t.key ? C.gold : C.gray, letterSpacing: ".08em" }}>{t.sub}</div>
              </button>
            ))}
          </div>

          {activeTrack === "core" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {[
                { code: "ACF-101", title: "Foundations", topics: ["Agentic commerce explained","Decision vs execution","Non-delegable zones","4 governance layers","Maturity levels","Reading an ACF Score"], outcome: "You can read an agentic organization." },
                { code: "ACF-102", title: "Operational Toolkit", topics: ["Decision mapping","Impact/Frequency/Irreversibility matrix","Agentic Constitution design","Agent profiling","Drift dashboard setup"], outcome: "You can deploy a Level 2 governed agent." },
                { code: "ACF-103", title: "Supervision & Drift", topics: ["Weak signal detection","Slow drift patterns","Agent conflicts","Kill switch protocols","Incident classification & response"], outcome: "You can govern a living autonomous system." },
              ].map(m => (
                <div key={m.code} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24, transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{m.code}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{m.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                    {m.topics.map(t => (<div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray2 }}><span style={{ color: C.gold, fontSize: 10 }}>▸</span> {t}</div>))}
                  </div>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 10, fontSize: 12, color: C.green, fontWeight: 600 }}>🎯 {m.outcome}</div>
                </div>
              ))}
            </div>
          )}

          {activeTrack === "pro" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {[
                { code: "ACF-201", title: "Client Deployment", topics: ["Running ACF workshops","Overcoming human resistance","ACF Control implementation","Building Trust certification path","Client governance roadmap"], outcome: "You can deliver ACF for clients." },
                { code: "ACF-202", title: "Audit & Certification", topics: ["ACF Trust audit methodology","Evidence requirements","Advanced scoring","Audit report writing","Non-compliance management"], outcome: "You can certify organizations." },
                { code: "ACF-203", title: "Complex Cases", topics: ["Multi-agent architectures","Multi-country deployments","Business conflict resolution","Major incident simulation","Enterprise-scale governance"], outcome: "You can handle enterprise complexity." },
              ].map(m => (
                <div key={m.code} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24, transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{m.code}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{m.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                    {m.topics.map(t => (<div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray2 }}><span style={{ color: C.gold, fontSize: 10 }}>▸</span> {t}</div>))}
                  </div>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 10, fontSize: 12, color: C.green, fontWeight: 600 }}>🎯 {m.outcome}</div>
                </div>
              ))}
            </div>
          )}

          {activeTrack === "exec" && (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em" }}>EXECUTIVE PROGRAM</div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>For CEOs, COMEX & Board Members</h3>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.7, marginBottom: 24 }}>2 intensive days. Not a course — a transformation. Leaders leave with a signed Agentic Constitution, a 90-day governance roadmap, and the clarity to own their autonomous future.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {["Agentic strategy","Organizational sovereignty","Risk & personal responsibility","Governance at scale","Live incident simulation","ACF Control walkthrough"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}><span style={{ color: C.gold, fontSize: 10 }}>▸</span> {t}</div>
                  ))}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", marginBottom: 12 }}>DELIVERABLES:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {["Signed Constitution","90-day Roadmap","Named Sponsor","ACF TRUST Readiness"].map(d => (
                    <span key={d} style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 11, padding: "6px 14px", borderRadius: 8 }}>{d}</span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: C.gray, fontStyle: "italic", marginBottom: 20 }}>No certification here. Just one thing: they leave responsible.</p>
                <button className="gold-glow" style={{ width: "100%", padding: 14, borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, transition: "all .3s" }}>Request Executive Program →</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ ECOSYSTEM ━━━ */}
      <section id="ecosystem" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>Closed-Loop System</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>The ACF <span style={{ color: C.gold }}>Ecosystem</span></h2>
          <GoldBar />
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>Every piece feeds the next. A system, not a product.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600, margin: "0 auto" }}>
            {[
              { step: "01", label: "ACF Score", desc: "Free diagnostic — assess your sovereignty", color: C.green, link: "/en/acf-score" },
              { step: "02", label: "ACF Academy", desc: "Train teams to govern autonomous systems", color: C.gold, link: "#academy" },
              { step: "03", label: "ACF Control", desc: "Governance platform — operate in real time", color: C.amber, link: "/en/acf-control" },
              { step: "04", label: "ACF TRUST™", desc: "Public label — prove it to customers", color: C.blue, link: "#trust" },
              { step: "05", label: "ACF CERTIFIED", desc: "Partners deploy & audit organizations", color: C.gold, link: "#certified" },
            ].map((s, i) => (
              <div key={s.step}>
                <a href={s.link} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, transition: "all .3s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}15`, border: `1px solid ${s.color}40`, flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: s.color }}>{s.step}</span>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{s.desc}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: C.gray, fontSize: 16 }}>→</span>
                </a>
                {i < 4 && (<div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><span style={{ color: C.gray, fontSize: 14 }}>↓</span></div>)}
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.gold, letterSpacing: ".1em" }}>↺ BACK TO ACF SCORE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ WHY THIS MATTERS ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20 }}>Why this <span style={{ color: C.gold }}>matters</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 12, padding: 20, textAlign: "left" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>WITHOUT GOVERNANCE</div>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>Autonomy amplifies errors. Agents optimize locally, destroy value globally. No audit trail. No accountability. No way back.</p>
            </div>
            <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 12, padding: 20, textAlign: "left" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".1em", marginBottom: 8 }}>WITH ACF</div>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>Autonomy amplifies clarity. Decisions are governed. Humans are in command. Every action is traceable, reversible, accountable.</p>
            </div>
          </div>
          <p style={{ fontSize: 16, color: C.gray2 }}>You don't need more AI. You need <strong style={{ color: C.gold }}>decision sovereignty.</strong></p>
        </div>
      </section>

      {/* ━━━ STATS BAR ━━━ */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
          {[
            { val: 6, suf: "", label: "Academy modules" },
            { val: 3, suf: "", label: "Certification levels" },
            { val: 3, suf: "", label: "Trust tiers" },
            { val: 5, suf: "", label: "Ecosystem products" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.gold }}><AnimatedCounter end={s.val} suffix={s.suf} /></div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>Get started.<br /><span style={{ color: C.gold }}>Build trust.</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 32px" }}>Whether you're an enterprise proving governance or a consultant building the future of agentic commerce — there's a path for you.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, border: "none", padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s" }}>Get ACF TRUST™ Label →</button>
            <button style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Start the Academy</button>
            <button style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Become a Partner</button>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer style={{ padding: "48px 0 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 60, paddingBottom: 40 }}>
            {/* Left column */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 13, color: C.navy1, letterSpacing: 1,
                }}>ACF</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>Agentic Commerce Framework®</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase" }}>GLOBAL STANDARD FOR AI GOVERNANCE</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 360 }}>
                ACF Certification & Academy is the governance pathway of the Agentic Commerce Framework. Certify trust. Train leaders. Build accountability.
              </p>
            </div>

            {/* Middle column — ACF Products */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>ACF Products</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "ACF Score®", href: "/en/acf-score" },
                  { label: "ACF Control", href: "/en/acf-control" },
                  { label: "ACF Certification", href: "/en/acf-certification" },
                ].map(link => (
                  <a key={link.label} href={link.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}
                  >{link.label}</a>
                ))}
              </div>
            </div>

            {/* Right column — Framework */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Framework</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "The Standard", href: "/" },
                  { label: "About ACF", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map(link => (
                  <a key={link.label} href={link.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}
                  >{link.label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: `1px solid ${C.bd1}`, padding: "20px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>
              © 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
