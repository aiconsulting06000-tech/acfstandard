"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF PARTNERS
   Deploy the Standard. Scale the Trust.
   Design: ACF Standard navy/gold palette
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
    const interval = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(interval); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(interval);
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

/* ── Hero Animated Handshake ──────────────────── */
function HeroHandshake() {
  return (
    <svg width="180" height="200" viewBox="0 0 180 200" fill="none">
      <defs>
        <linearGradient id="hh-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" stopOpacity="0.9" /><stop offset="50%" stopColor="#c9a84c" stopOpacity="0.3" /><stop offset="100%" stopColor="#e8c96a" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="hh-fill" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
        </linearGradient>
        <filter id="hh-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="hh-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* Shield outline */}
      <path d="M90 8 L168 32 L168 112 Q168 158 90 196 Q12 158 12 112 L12 32 Z" fill="none" stroke="url(#hh-stroke)" strokeWidth="2.5" filter="url(#hh-glow)" />
      <path d="M90 14 L162 36 L162 110 Q162 153 90 190 Q18 153 18 110 L18 36 Z" fill="url(#hh-fill)" opacity="0.92" />
      <path d="M90 22 L152 42 L152 106 Q152 144 90 180 Q28 144 28 106 L28 42 Z" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.15" />
      {/* Glowing dot */}
      <circle cx="90" cy="48" r="10" fill="#e8c96a" filter="url(#hh-dot)" opacity="0.8" />
      <circle cx="90" cy="48" r="5" fill="#fff" opacity="0.4" />
      {/* Handshake icon */}
      <g transform="translate(52, 70)" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7">
        {/* Left hand */}
        <path d="M4 30 L4 16 Q4 10 10 10 L24 10" />
        {/* Right hand */}
        <path d="M72 30 L72 16 Q72 10 66 10 L52 10" />
        {/* Clasped middle */}
        <path d="M24 10 L32 4 Q38 0 44 4 L52 10" />
        <path d="M24 10 Q30 16 38 14 Q46 12 52 10" />
        {/* Wrists */}
        <line x1="4" y1="30" x2="20" y2="30" />
        <line x1="56" y1="30" x2="72" y2="30" />
        {/* Trust symbol - small star */}
        <circle cx="38" cy="22" r="3" fill="#e8c96a" stroke="none" opacity="0.5" />
      </g>
      {/* Label */}
      <text x="90" y="76" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" opacity="0.6" letterSpacing="0.5">ACF</text>
      <text x="90" y="140" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">PARTNER</text>
    </svg>
  );
}

/* ── Hero Animated Network Globe ──────────────── */
function HeroNetwork() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      <defs>
        <linearGradient id="net-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" stopOpacity="0.8" /><stop offset="100%" stopColor="#c9a84c" stopOpacity="0.5" />
        </linearGradient>
        <filter id="net-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="net-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* Outer ring */}
      <circle cx="90" cy="90" r="80" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.15" />
      <circle cx="90" cy="90" r="68" fill="#071122" opacity="0.6" />
      <circle cx="90" cy="90" r="68" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" />
      {/* Globe grid lines */}
      <ellipse cx="90" cy="90" rx="45" ry="60" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.15" />
      <ellipse cx="90" cy="90" rx="20" ry="60" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.12" />
      <line x1="30" y1="70" x2="150" y2="70" stroke="#c9a84c" strokeWidth="0.8" opacity="0.1" />
      <line x1="25" y1="90" x2="155" y2="90" stroke="#c9a84c" strokeWidth="0.8" opacity="0.15" />
      <line x1="30" y1="110" x2="150" y2="110" stroke="#c9a84c" strokeWidth="0.8" opacity="0.1" />
      {/* Network nodes with connections */}
      <g filter="url(#net-glow)" opacity="0.7">
        {/* Central node */}
        <circle cx="90" cy="90" r="6" fill="#e8c96a" />
        <circle cx="90" cy="90" r="3" fill="#fff" opacity="0.5" />
        {/* Satellite nodes */}
        <circle cx="55" cy="60" r="4" fill="#c9a84c" />
        <circle cx="125" cy="65" r="4" fill="#c9a84c" />
        <circle cx="60" cy="120" r="4" fill="#c9a84c" />
        <circle cx="130" cy="115" r="4" fill="#c9a84c" />
        <circle cx="90" cy="42" r="3.5" fill="#e8c96a" />
        <circle cx="90" cy="138" r="3.5" fill="#e8c96a" />
        {/* Connections */}
        <line x1="90" y1="90" x2="55" y2="60" stroke="#e8c96a" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="90" x2="125" y2="65" stroke="#e8c96a" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="90" x2="60" y2="120" stroke="#e8c96a" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="90" x2="130" y2="115" stroke="#e8c96a" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="90" x2="90" y2="42" stroke="#e8c96a" strokeWidth="1" opacity="0.3" />
        <line x1="90" y1="90" x2="90" y2="138" stroke="#e8c96a" strokeWidth="1" opacity="0.3" />
        {/* Cross connections */}
        <line x1="55" y1="60" x2="125" y2="65" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" strokeDasharray="4 3" />
        <line x1="60" y1="120" x2="130" y2="115" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" strokeDasharray="4 3" />
      </g>
      {/* Pulsing outer dot */}
      <circle cx="55" cy="60" r="2" fill="#fff" opacity="0.3" />
      <circle cx="125" cy="65" r="2" fill="#fff" opacity="0.3" />
      {/* Label */}
      <text x="90" y="148" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">NETWORK</text>
    </svg>
  );
}

/* ── Partner Tier Shield ─────────────────────── */
function PartnerShield({ name, color, colorLight, stars }: { name: string; color: string; colorLight: string; stars: number }) {
  const id = `partner-${name.toLowerCase().replace(/\s/g, "")}`;
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
        <path d="M70 18 L118 34 L118 82 Q118 110 70 138 Q22 110 22 82 L22 34 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
        {/* Dot */}
        <circle cx="70" cy="40" r="8" fill={colorLight} filter={`url(#dgl-${id})`} opacity="0.8" />
        <circle cx="70" cy="40" r="4" fill="#fff" opacity="0.4" />
        {/* ACF PARTNER(TM) */}
        <text x="70" y="68" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10.5" fontWeight="700" fill="#ffffff" letterSpacing="0.5">{"ACF PARTNER\u2122"}</text>
        <line x1="30" y1="76" x2="110" y2="76" stroke={color} strokeWidth="0.5" opacity="0.25" />
        {/* Stars */}
        <g transform={`translate(${70 - (stars * 8)}, 85)`}>
          {Array.from({ length: stars }).map((_, i) => (
            <text key={i} x={i * 16} y="10" fontFamily="'Space Grotesk'" fontSize="14" fill={color} textAnchor="middle">{"\u2605"}</text>
          ))}
        </g>
        {/* Name */}
        <text x="70" y="112" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="12" fontWeight="800" fill={color} letterSpacing="1">{name.toUpperCase()}</text>
        <line x1="30" y1="120" x2="110" y2="120" stroke={color} strokeWidth="0.5" opacity="0.25" />
      </svg>
    </div>
  );
}

/* ── Form Input ────────────────────────────────── */
function FormField({ label, type = "text", placeholder, required = true, options }: { label: string; type?: string; placeholder?: string; required?: boolean; options?: string[] }) {
  const baseStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif",
    background: C.navy3, border: `1px solid ${C.bd1}`, color: "#fff", outline: "none", transition: "border-color .3s",
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>
        {label} {required && <span style={{ color: C.red }}>*</span>}
      </label>
      {type === "select" && options ? (
        <select style={{ ...baseStyle, appearance: "none", cursor: "pointer" }}
          onFocus={e => e.target.style.borderColor = C.goldBorder}
          onBlur={e => e.target.style.borderColor = C.bd1}>
          <option value="" style={{ background: C.navy1 }}>{placeholder || "Select..."}</option>
          {options.map(o => <option key={o} value={o} style={{ background: C.navy1 }}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea rows={4} placeholder={placeholder} style={{ ...baseStyle, resize: "vertical" }}
          onFocus={e => e.target.style.borderColor = C.goldBorder}
          onBlur={e => e.target.style.borderColor = C.bd1} />
      ) : (
        <input type={type} placeholder={placeholder} style={baseStyle}
          onFocus={e => e.target.style.borderColor = C.goldBorder}
          onBlur={e => e.target.style.borderColor = C.bd1} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ACFPartnersPage() {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState<"advantages" | "portal" | "apply">("advantages");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navLinks = [
    { label: t("acfPartners.navAdvantages"), href: "#advantages" },
    { label: t("acfPartners.navTiers"), href: "#tiers" },
    { label: t("acfPartners.navPortal"), href: "#portal" },
    { label: t("acfPartners.navApply"), href: "#apply" },
  ];

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
        @keyframes pulse { 0%,100% { opacity:.6; } 50% { opacity:1; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        .fade-up { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.1s; }
        .fade-up-d2 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.3s; }
        .fade-up-d3 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.55s; }
        .gold-glow:hover { box-shadow:0 0 20px rgba(201,168,76,.2); }
        .hero-left { animation:heroFloat 4s ease-in-out infinite, heroPulse 4s ease-in-out infinite; }
        .hero-right { animation:heroFloatSlow 5s ease-in-out infinite, heroPulse 5s ease-in-out infinite .5s; }
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        ::placeholder { color: ${C.gray}; opacity: 0.6; }
        select option { background: ${C.navy1}; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>{t("acfPartners.navTitle")}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t("acfPartners.navSubtitle")}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t("acfPartners.navHome")}</a>
            {navLinks.map(item => (
              <a key={item.href} href={item.href} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{item.label}</a>
            ))}
            <a href="#portal" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s", display: "inline-block" }}>{t("acfPartners.navPartnerLogin")}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.03) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 700, height: 700, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(201,168,76,.06)", animation: "heroOrbitCW 60s linear infinite" }} />
          <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(201,168,76,.04)", animation: "heroOrbitCCW 45s linear infinite" }} />
          <div style={{ position: "absolute", inset: 140, borderRadius: "50%", border: "1px dashed rgba(201,168,76,.06)", animation: "heroOrbitCW 80s linear infinite" }} />
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ position: "absolute", top: `${50 + 42 * Math.sin((i / 6) * Math.PI * 2)}%`, left: `${50 + 42 * Math.cos((i / 6) * Math.PI * 2)}%`, width: 4, height: 4, borderRadius: "50%", background: C.gold, opacity: 0, animation: `sparkle ${2 + i * 0.3}s ease-in-out infinite ${i * 0.8}s` }} />
          ))}
        </div>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 40, alignItems: "center" }}>
            <div className="fade-up" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-left" style={{ position: "relative" }}>
                <HeroHandshake />
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: 0.6 }}>{t("acfPartners.heroPartnership")}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>{t("acfPartners.heroDeployTheStandard")}</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center" }} className="fade-up-d2">
              <Badge>{t("acfPartners.heroBadge")}</Badge>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 24, letterSpacing: "-1px" }}>
                <span style={{ color: "#fff" }}>{t("acfPartners.heroTitle1")}</span><br />
                <span style={{ color: C.gold }}>{t("acfPartners.heroTitle2")}</span>
              </h1>
              <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 28px" }}>
                {t("acfPartners.heroParagraph1Line1")}<br />{t("acfPartners.heroParagraph1Line2")}<br /><strong style={{ color: "#fff" }}>{t("acfPartners.heroParagraph1Bold")}</strong>
              </p>
              <p style={{ fontSize: 14, color: C.gray, maxWidth: 420, margin: "0 auto 32px" }}>{t("acfPartners.heroParagraph2")}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <a href="#apply" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s", display: "inline-block" }}>{t("acfPartners.heroBtnBecome")}</a>
                <a href="#portal" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .3s", display: "inline-block" }} onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }} onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t("acfPartners.heroBtnPortal")}</a>
              </div>
            </div>
            <div className="fade-up-d3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-right" style={{ position: "relative" }}>
                <HeroNetwork />
                <div style={{ textAlign: "center", marginTop: 4 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: 0.6 }}>{t("acfPartners.heroNetwork")}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>{t("acfPartners.heroScaleWorldwide")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section id="advantages" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>{t("acfPartners.advantagesLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t("acfPartners.advantagesTitle1")}<span style={{ color: C.gold }}>{t("acfPartners.advantagesTitle2")}</span></h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>{t("acfPartners.advantagesParagraph1")}<strong style={{ color: "#fff" }}>{t("acfPartners.advantagesParagraphBold")}</strong>{t("acfPartners.advantagesParagraph2")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { icon: "\u{1F30D}", title: t("acfPartners.advTerritoryTitle"), desc: t("acfPartners.advTerritoryDesc"), color: C.green },
              { icon: "\u{1F4B0}", title: t("acfPartners.advRevenueTitle"), desc: t("acfPartners.advRevenueDesc"), color: C.gold },
              { icon: "\u{1F393}", title: t("acfPartners.advAcademyTitle"), desc: t("acfPartners.advAcademyDesc"), color: C.blue },
              { icon: "\u{1F3F7}\u{FE0F}", title: t("acfPartners.advCoBrandTitle"), desc: t("acfPartners.advCoBrandDesc"), color: C.amber },
              { icon: "\u{1F4CA}", title: t("acfPartners.advDashboardTitle"), desc: t("acfPartners.advDashboardDesc"), color: C.purple },
              { icon: "\u{1F6E1}\u{FE0F}", title: t("acfPartners.advSupportTitle"), desc: t("acfPartners.advSupportDesc"), color: C.green },
            ].map(a => (
              <div key={a.title} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: "28px 24px", transition: "all .3s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${a.color}15`; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{a.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TIERS */}
      <section id="tiers" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>{t("acfPartners.tiersLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t("acfPartners.tiersTitle1")}<span style={{ color: C.gold }}>{t("acfPartners.tiersTitle2")}</span>{t("acfPartners.tiersTitle3")}</h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>{t("acfPartners.tiersParagraph")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { stars: 1, name: t("acfPartners.tierAffiliateName"), color: "#22c55e", colorLight: "#4ade80", glowColor: "rgba(34,197,94,.15)", desc: t("acfPartners.tierAffiliateDesc"), items: [t("acfPartners.tierAffiliateItem1"), t("acfPartners.tierAffiliateItem2"), t("acfPartners.tierAffiliateItem3"), t("acfPartners.tierAffiliateItem4"), t("acfPartners.tierAffiliateItem5")], tagline: t("acfPartners.tierAffiliateTagline"), badge: null },
              { stars: 2, name: t("acfPartners.tierCertifiedName"), color: "#c9a84c", colorLight: "#e8c96a", glowColor: "rgba(201,168,76,.15)", desc: t("acfPartners.tierCertifiedDesc"), items: [t("acfPartners.tierCertifiedItem1"), t("acfPartners.tierCertifiedItem2"), t("acfPartners.tierCertifiedItem3"), t("acfPartners.tierCertifiedItem4"), t("acfPartners.tierCertifiedItem5"), t("acfPartners.tierCertifiedItem6")], tagline: t("acfPartners.tierCertifiedTagline"), badge: t("acfPartners.tierCertifiedBadge") },
              { stars: 3, name: t("acfPartners.tierStrategicName"), color: "#3b82f6", colorLight: "#60a5fa", glowColor: "rgba(59,130,246,.15)", desc: t("acfPartners.tierStrategicDesc"), items: [t("acfPartners.tierStrategicItem1"), t("acfPartners.tierStrategicItem2"), t("acfPartners.tierStrategicItem3"), t("acfPartners.tierStrategicItem4"), t("acfPartners.tierStrategicItem5"), t("acfPartners.tierStrategicItem6"), t("acfPartners.tierStrategicItem7")], tagline: t("acfPartners.tierStrategicTagline"), badge: null },
            ].map(entry => (
              <div key={entry.name} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: "32px 28px 28px", position: "relative", transition: "all .3s", textAlign: "center", display: "flex", flexDirection: "column" }} onMouseEnter={e => { e.currentTarget.style.borderColor = `${entry.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${entry.glowColor}`; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                {entry.badge && (<div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, fontSize: 10, fontWeight: 800, letterSpacing: ".1em", padding: "5px 16px", borderRadius: 100, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{entry.badge}</div>)}
                <PartnerShield name={entry.name} color={entry.color} colorLight={entry.colorLight} stars={entry.stars} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: entry.color, letterSpacing: ".14em" }}>{"\u2605".repeat(entry.stars)} {t("acfPartners.tierLabel")} {entry.stars}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{entry.name}</h3>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>{entry.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, textAlign: "left", flex: 1 }}>
                  {entry.items.map(item => (<div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}><span style={{ color: entry.color, fontSize: 11 }}>{"\u2713"}</span> {item}</div>))}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 12, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: entry.color, fontStyle: "italic" }}>{entry.tagline}</div>
                  <a href="#apply" className="gold-glow" style={{ display: "block", padding: "12px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s", textAlign: "center", background: entry.badge ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : "transparent", color: entry.badge ? C.navy1 : entry.color, border: entry.badge ? "none" : `1px solid ${entry.color}40` }}>{t("acfPartners.tierApplyFor", { name: entry.name })}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER PORTAL */}
      <section id="portal" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t("acfPartners.portalLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t("acfPartners.portalTitle1")}<span style={{ color: C.gold }}>{t("acfPartners.portalTitle2")}</span></h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>{t("acfPartners.portalParagraph")}</p>
          </div>
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: 40, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${C.goldDim} 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: C.goldDim, border: `1px solid ${C.goldBorder}`, margin: "0 auto 16px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{t("acfPartners.portalAccessTitle")}</h3>
                <p style={{ fontSize: 13, color: C.gray }}>{t("acfPartners.portalAccessDesc")}</p>
              </div>
              <FormField label={t("acfPartners.portalEmail")} type="email" placeholder="partner@company.com" />
              <FormField label={t("acfPartners.portalPassword")} type="password" placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2, cursor: "pointer" }}><input type="checkbox" style={{ accentColor: C.gold }} /> {t("acfPartners.portalRememberMe")}</label>
                <a href="#" style={{ fontSize: 13, color: C.gold, transition: "opacity .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.7"} onMouseLeave={e => (e.target as HTMLElement).style.opacity = "1"}>{t("acfPartners.portalForgotPassword")}</a>
              </div>
              <button className="gold-glow" style={{ width: "100%", padding: 14, borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, transition: "all .3s" }}>{t("acfPartners.portalSignIn")}</button>
              <div style={{ textAlign: "center", marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.bd1}` }}>
                <p style={{ fontSize: 13, color: C.gray }}>{t("acfPartners.portalNotPartner")} <a href="#apply" style={{ color: C.gold, fontWeight: 600 }}>{t("acfPartners.portalApplyNow")}</a></p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 32 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>{t("acfPartners.portalInsideTitle")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: "\u{1F4CA}", label: t("acfPartners.portalFeatureDashboardLabel"), desc: t("acfPartners.portalFeatureDashboardDesc") },
                { icon: "\u{1F393}", label: t("acfPartners.portalFeatureTrainingLabel"), desc: t("acfPartners.portalFeatureTrainingDesc") },
                { icon: "\u{1F4B0}", label: t("acfPartners.portalFeatureRevenueLabel"), desc: t("acfPartners.portalFeatureRevenueDesc") },
                { icon: "\u{1F4CB}", label: t("acfPartners.portalFeatureAuditLabel"), desc: t("acfPartners.portalFeatureAuditDesc") },
                { icon: "\u{1F465}", label: t("acfPartners.portalFeatureClientLabel"), desc: t("acfPartners.portalFeatureClientDesc") },
                { icon: "\u{1F514}", label: t("acfPartners.portalFeatureUpdatesLabel"), desc: t("acfPartners.portalFeatureUpdatesDesc") },
              ].map(f => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 10, transition: "all .2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.goldBorder} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd1}>
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{f.label}</div>
                    <div style={{ fontSize: 11, color: C.gray }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t("acfPartners.applyLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t("acfPartners.applyTitle1")}<span style={{ color: C.gold }}>{t("acfPartners.applyTitle2")}</span></h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 550, margin: "0 auto", lineHeight: 1.7 }}>{t("acfPartners.applyParagraph1")}<strong style={{ color: "#fff" }}>{t("acfPartners.applyParagraphBold")}</strong>{t("acfPartners.applyParagraph2")}</p>
          </div>
          {!formSubmitted ? (
            <div style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 20, padding: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <FormField label={t("acfPartners.applyFirstName")} placeholder={t("acfPartners.applyFirstNamePlaceholder")} />
                <FormField label={t("acfPartners.applyLastName")} placeholder={t("acfPartners.applyLastNamePlaceholder")} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <FormField label={t("acfPartners.applyEmail")} type="email" placeholder={t("acfPartners.applyEmailPlaceholder")} />
                <FormField label={t("acfPartners.applyPhone")} type="tel" placeholder={t("acfPartners.applyPhonePlaceholder")} required={false} />
              </div>
              <FormField label={t("acfPartners.applyCompanyName")} placeholder={t("acfPartners.applyCompanyPlaceholder")} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <FormField label={t("acfPartners.applyCountry")} type="select" options={[t("acfPartners.applyCountryFrance"), t("acfPartners.applyCountryUK"), t("acfPartners.applyCountryGermany"), t("acfPartners.applyCountryUS"), t("acfPartners.applyCountryCanada"), t("acfPartners.applyCountryJapan"), t("acfPartners.applyCountryAustralia"), t("acfPartners.applyCountryUAE"), t("acfPartners.applyCountrySwitzerland"), t("acfPartners.applyCountryNetherlands"), t("acfPartners.applyCountrySingapore"), t("acfPartners.applyCountryIndia"), t("acfPartners.applyCountryBrazil"), t("acfPartners.applyCountryOther")]} />
                <FormField label={t("acfPartners.applyPartnershipTier")} type="select" options={[t("acfPartners.applyTierAffiliate"), t("acfPartners.applyTierCertified"), t("acfPartners.applyTierStrategic")]} />
              </div>
              <FormField label={t("acfPartners.applyIndustry")} type="select" options={[t("acfPartners.applyIndustryConsulting"), t("acfPartners.applyIndustryTech"), t("acfPartners.applyIndustryFinance"), t("acfPartners.applyIndustryLegal"), t("acfPartners.applyIndustryHealthcare"), t("acfPartners.applyIndustryRetail"), t("acfPartners.applyIndustryManufacturing"), t("acfPartners.applyIndustryEducation"), t("acfPartners.applyIndustryOther")]} />
              <FormField label={t("acfPartners.applyTeamSize")} type="select" options={[t("acfPartners.applyTeamSize1"), t("acfPartners.applyTeamSize2"), t("acfPartners.applyTeamSize3"), t("acfPartners.applyTeamSize4"), t("acfPartners.applyTeamSize5")]} />
              <FormField label={t("acfPartners.applyWhyPartner")} type="textarea" placeholder={t("acfPartners.applyWhyPlaceholder")} />
              <FormField label={t("acfPartners.applyWebsite")} type="url" placeholder={t("acfPartners.applyWebsitePlaceholder")} required={false} />
              <div style={{ marginTop: 8 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: C.gray2, cursor: "pointer", lineHeight: 1.5 }}>
                  <input type="checkbox" style={{ accentColor: C.gold, marginTop: 3, flexShrink: 0 }} />
                  {t("acfPartners.applyCheckbox")}
                </label>
              </div>
              <button className="gold-glow" onClick={() => setFormSubmitted(true)} style={{ width: "100%", padding: 16, borderRadius: 12, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, transition: "all .3s", marginTop: 28 }}>{t("acfPartners.applySubmit")}</button>
            </div>
          ) : (
            <div style={{ background: C.navy3, border: `1px solid ${C.green}40`, borderRadius: 20, padding: 60, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>{"\u{1F389}"}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t("acfPartners.applySuccessTitle")}</h3>
              <p style={{ fontSize: 15, color: C.gray2, maxWidth: 400, margin: "0 auto 24px", lineHeight: 1.7 }}>{t("acfPartners.applySuccessParagraph1")}<strong style={{ color: "#fff" }}>{t("acfPartners.applySuccessParagraphBold")}</strong>{t("acfPartners.applySuccessParagraph2")}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320, margin: "0 auto" }}>
                {[t("acfPartners.applySuccessStep1"), t("acfPartners.applySuccessStep2"), t("acfPartners.applySuccessStep3"), t("acfPartners.applySuccessStep4")].map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: i === 0 ? `${C.green}20` : C.goldDim, border: `1px solid ${i === 0 ? `${C.green}40` : C.goldBorder}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: i === 0 ? C.green : C.gold, flexShrink: 0 }}>{i === 0 ? "\u2713" : (i + 1)}</div>
                    <span style={{ fontSize: 13, color: i === 0 ? C.green : C.gray2 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t("acfPartners.journeyLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t("acfPartners.journeyTitle1")}<span style={{ color: C.gold }}>{t("acfPartners.journeyTitle2")}</span></h2>
            <GoldBar />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600, margin: "0 auto" }}>
            {[
              { step: "01", label: t("acfPartners.journeyStep1Label"), desc: t("acfPartners.journeyStep1Desc"), color: C.green },
              { step: "02", label: t("acfPartners.journeyStep2Label"), desc: t("acfPartners.journeyStep2Desc"), color: C.gold },
              { step: "03", label: t("acfPartners.journeyStep3Label"), desc: t("acfPartners.journeyStep3Desc"), color: C.amber },
              { step: "04", label: t("acfPartners.journeyStep4Label"), desc: t("acfPartners.journeyStep4Desc"), color: C.blue },
              { step: "05", label: t("acfPartners.journeyStep5Label"), desc: t("acfPartners.journeyStep5Desc"), color: C.gold },
              { step: "06", label: t("acfPartners.journeyStep6Label"), desc: t("acfPartners.journeyStep6Desc"), color: C.green },
            ].map((s, i) => (
              <div key={s.step}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, transition: "all .3s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}15`, border: `1px solid ${s.color}40`, flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: s.color }}>{s.step}</span>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{s.desc}</div>
                  </div>
                </div>
                {i < 5 && (<div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><span style={{ color: C.gray, fontSize: 14 }}>{"\u2193"}</span></div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
          {[
            { val: 3, suf: "", label: t("acfPartners.statTiers") },
            { val: 35, suf: "%", label: t("acfPartners.statRevenue") },
            { val: 6, suf: "", label: t("acfPartners.statPortalFeatures") },
            { val: 5, suf: t("acfPartners.statDaysSuffix"), label: t("acfPartners.statReview") },
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
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t("acfPartners.ctaTitle1")}<br /><span style={{ color: C.gold }}>{t("acfPartners.ctaTitle2")}</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 32px" }}>{t("acfPartners.ctaParagraph")}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="#apply" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, border: "none", padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s", display: "inline-block" }}>{t("acfPartners.ctaBtnBecome")}</a>
            <a href="#portal" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "inline-block" }} onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }} onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t("acfPartners.ctaBtnPortal")}</a>
            <a href="/en/acf-certification" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "inline-block" }} onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }} onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t("acfPartners.ctaBtnCertification")}</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 0 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 60, paddingBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 13, color: C.navy1, letterSpacing: 1 }}>ACF</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{t("acfPartners.footerBrand")}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase" }}>{t("acfPartners.footerTagline")}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 360 }}>{t("acfPartners.footerDesc")}</p>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>{t("acfPartners.footerProducts")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ label: t("acfPartners.footerAcfScore"), href: "/en/acf-score" }, { label: t("acfPartners.footerAcfControl"), href: "/en/acf-control" }, { label: t("acfPartners.footerAcfCertification"), href: "/en/acf-certification" }, { label: t("acfPartners.footerAcfPartners"), href: "/en/acf-partners" }].map(link => (
                  <a key={link.label} href={link.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{link.label}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>{t("acfPartners.footerFramework")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ label: t("acfPartners.footerTheStandard"), href: "/" }, { label: t("acfPartners.footerAbout"), href: "/about" }, { label: t("acfPartners.footerContact"), href: "/contact" }].map(link => (
                  <a key={link.label} href={link.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{link.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.bd1}`, padding: "20px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>{t("acfPartners.footerCopyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
