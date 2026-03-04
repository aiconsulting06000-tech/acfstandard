"use client";

import React, { useState, useEffect, useRef } from "react";

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
function GoldBarCenter() { return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, margin: "0 auto 16px" }} />; }
function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12 }}>// {children}</div>;
}

/* ── Hero Shield SVG ─────────────────────────────── */
function HeroShield() {
  return (
    <svg width="200" height="220" viewBox="0 0 200 220" fill="none">
      <defs>
        <linearGradient id="hs-stroke" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e8c96a" stopOpacity="0.9" /><stop offset="50%" stopColor="#c9a84c" stopOpacity="0.3" /><stop offset="100%" stopColor="#e8c96a" stopOpacity="0.9" /></linearGradient>
        <linearGradient id="hs-fill" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" /></linearGradient>
        <filter id="hs-glow"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d="M100 8 L188 36 L188 124 Q188 174 100 216 Q12 174 12 124 L12 36 Z" fill="none" stroke="url(#hs-stroke)" strokeWidth="2.5" filter="url(#hs-glow)" />
      <path d="M100 16 L180 40 L180 120 Q180 167 100 208 Q20 167 20 120 L20 40 Z" fill="url(#hs-fill)" opacity="0.92" />
      {/* 4 layers inside shield */}
      <g opacity="0.7">
        <rect x="56" y="60" width="88" height="14" rx="4" fill="#c9a84c" opacity="0.25" stroke="#c9a84c" strokeWidth="0.8" />
        <text x="100" y="71" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="7" fill="#c9a84c" fontWeight="600" opacity="0.9">GOVERNANCE</text>
        <rect x="56" y="80" width="88" height="14" rx="4" fill="#22c55e" opacity="0.15" stroke="#22c55e" strokeWidth="0.8" />
        <text x="100" y="91" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="7" fill="#22c55e" fontWeight="600" opacity="0.9">POLICY</text>
        <rect x="56" y="100" width="88" height="14" rx="4" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="0.8" />
        <text x="100" y="111" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="7" fill="#3b82f6" fontWeight="600" opacity="0.9">SYSTEM</text>
        <rect x="56" y="120" width="88" height="14" rx="4" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="0.8" />
        <text x="100" y="131" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="7" fill="#f59e0b" fontWeight="600" opacity="0.9">SUPERVISION</text>
      </g>
      <text x="100" y="162" textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="11" fontWeight="800" fill="#c9a84c" opacity="0.7" letterSpacing="2">ACF®</text>
      <text x="100" y="176" textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="8" fontWeight="600" fill="#ffffff" opacity="0.4" letterSpacing="1">THE STANDARD</text>
    </svg>
  );
}

export default function TheStandardPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes heroPulse{0%,100%{filter:drop-shadow(0 0 12px rgba(201,168,76,.15))}50%{filter:drop-shadow(0 0 36px rgba(201,168,76,.45))}}
        @keyframes heroOrbitCW{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes sparkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}
        .fade-up{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.1s}
        .fade-up-d2{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.3s}
        .fade-up-d3{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.55s}
        .gold-glow:hover{box-shadow:0 0 20px rgba(201,168,76,.2)}
        .hero-shield{animation:heroFloat 4s ease-in-out infinite,heroPulse 4s ease-in-out infinite}
        *{box-sizing:border-box;margin:0;padding:0}a{text-decoration:none;color:inherit}
        @media(max-width:768px){.hide-mobile{display:none!important}.grid-2{grid-template-columns:1fr!important}.grid-3{grid-template-columns:1fr!important}.grid-4{grid-template-columns:1fr 1fr!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/en/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>THE GOVERNANCE FRAMEWORK</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["Framework", "Layers", "Ecosystem", "Blog"].map(l => (
              <a key={l} href={l === "Blog" ? "/en/blog" : `#${l.toLowerCase()}`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l}</a>
            ))}
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Get Your Score →</a>
          </div>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 600, height: 600, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(201,168,76,.06)", animation: "heroOrbitCW 60s linear infinite" }} />
          <div style={{ position: "absolute", inset: 80, borderRadius: "50%", border: "1px dashed rgba(201,168,76,.04)", animation: "heroOrbitCW 80s linear infinite reverse" }} />
          {[0,1,2,3,4].map(i => (<div key={i} style={{ position: "absolute", top: `${50+40*Math.sin((i/5)*Math.PI*2)}%`, left: `${50+40*Math.cos((i/5)*Math.PI*2)}%`, width: 4, height: 4, borderRadius: "50%", background: C.gold, opacity: 0, animation: `sparkle ${2+i*.3}s ease-in-out infinite ${i*.7}s` }} />))}
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }}>
          <div className="fade-up">
            <Badge>THE GOVERNANCE STANDARD</Badge>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.06, marginTop: 24, marginBottom: 24, letterSpacing: "-1.5px" }}>
              <span style={{ color: "#fff" }}>Agentic Commerce</span><br /><span style={{ color: C.gold }}>Framework®</span>
            </h1>
            <p style={{ fontSize: 18, color: C.gray2, lineHeight: 1.7, maxWidth: 560, marginBottom: 12 }}>
              Le premier standard de gouvernance pour les organisations qui déploient des <strong style={{ color: "#fff" }}>agents IA autonomes</strong>.
            </p>
            <p style={{ fontSize: 15, color: C.gray, maxWidth: 500, marginBottom: 32 }}>
              4 couches de gouvernance. 5 produits intégrés. Un cadre méthodologique complet pour structurer le contrôle, limiter les risques et préserver votre souveraineté.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Évaluer ma gouvernance →</a>
              <a href="#framework" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, display: "inline-block", transition: "all .3s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Explorer le Framework</a>
            </div>
          </div>
          <div className="fade-up-d2 hero-shield hide-mobile"><HeroShield /></div>
        </div>
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <section style={{ padding: "32px 0", borderTop: `1px solid ${C.bd1}`, borderBottom: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }} className="grid-4">
          {[
            { val: 73, suf: "%", label: "des entreprises sans gouvernance formalisée" },
            { val: 35, suf: "M€", label: "sanctions AI Act (jusqu'à 7% du CA)" },
            { val: 4, suf: "", label: "couches de gouvernance ACF®" },
            { val: 10, suf: " min", label: "pour obtenir votre Score ACF®" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 800, color: C.gold }}><AnimatedCounter end={s.val} suffix={s.suf} /></div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".08em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ THE PROBLEM ═══════ */}
      <section id="framework" style={{ padding: "70px 0", borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Le constat</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Les agents IA prennent des décisions <span style={{ color: C.gold }}>à votre place</span></h2>
            <GoldBarCenter />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>Pricing, procurement, engagement client, logistique — les agents autonomes exécutent des décisions à la vitesse machine. La question n'est pas de savoir s'il faut les utiliser. C'est <strong style={{ color: "#fff" }}>qui les gouverne</strong>.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, margin: "0 auto" }} className="grid-2">
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.red, letterSpacing: ".1em", marginBottom: 14, fontWeight: 700 }}>✕ SANS GOUVERNANCE</div>
              {["Agents qui optimisent localement, détruisent globalement", "Aucune traçabilité des décisions autonomes", "€2,4M de pertes moyennes par décision IA non contrôlée", "Sanctions AI Act jusqu'à 7% du CA mondial", "Dépendance critique aux plateformes tierces", "Impossibilité de piloter ou corriger en temps réel", "Atteinte à l'image de marque par actions non conformes"].map(r => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 8 }}><span style={{ color: C.red, fontSize: 11, marginTop: 3, flexShrink: 0 }}>✕</span> {r}</div>
              ))}
            </div>
            <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.gold, letterSpacing: ".1em", marginBottom: 14, fontWeight: 700 }}>✓ AVEC GOUVERNANCE ACF®</div>
              {["Chaque décision traçable et réversible", "Responsabilité humaine identifiée à chaque niveau", "Conformité réglementaire native (AI Act, RGPD)", "Souveraineté préservée à la vitesse machine", "Kill switch à 3 niveaux avec temps de réponse garantis", "Dashboard de monitoring temps réel", "Labels de confiance ACF TRUST™ / ACF CERTIFIED"].map(r => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 8 }}><span style={{ color: C.gold, fontSize: 11, marginTop: 3, flexShrink: 0 }}>✓</span> {r}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 4 LAYERS ═══════ */}
      <section id="layers" style={{ padding: "70px 0", background: C.navy2, borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>La méthodologie</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Les 4 couches de gouvernance <span style={{ color: C.gold }}>ACF®</span></h2>
            <GoldBarCenter />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>Un framework en couches qui structure le contrôle à travers tout votre écosystème agentique — de la gouvernance stratégique à la supervision temps réel.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="grid-2">
            {[
              { num: "01", title: "Couche Gouvernance", subtitle: "Le « qui »", color: C.gold, desc: "Fondement stratégique. Définit qui gouverne, qui décide, qui est responsable. Établit la constitution agentique de l'organisation.", items: ["Constitution agentique", "Sponsor de gouvernance nommé (DDA)", "Cartographie des autorités de décision", "Protocoles d'escalade par niveau de risque", "Comité de gouvernance agentique"] },
              { num: "02", title: "Couche Politique", subtitle: "Le « quoi »", color: C.green, desc: "Règles opérationnelles et limites formalisées pour le comportement des agents autonomes. Les garde-fous qui contraignent l'action IA.", items: ["Politiques comportementales par agent", "Limites d'autonomie (financières, temporelles)", "Alignement réglementaire (AI Act, RGPD)", "Cadres éthiques de décision", "Règles sectorielles spécifiques"] },
              { num: "03", title: "Couche Système", subtitle: "Le « comment »", color: C.blue, desc: "Infrastructure technique de monitoring, logging et contrôle de l'exécution des agents en temps réel.", items: ["Kill switch à 3 niveaux", "Architecture de traçabilité complète", "Coordination multi-agents", "Protocoles d'interruptibilité", "Tests trimestriels de résilience"] },
              { num: "04", title: "Couche Supervision", subtitle: "Le « en continu »", color: C.amber, desc: "Surveillance humaine continue, cadence de revue et amélioration permanente de la posture de gouvernance.", items: ["Dashboard ACF Control temps réel", "Revues trimestrielles de gouvernance", "Procédures de réponse aux incidents", "Tracking du score de souveraineté", "Reporting direction et régulateur"] },
            ].map(l => (
              <div key={l.num} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 20, padding: 32, transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${l.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${l.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: `${l.color}15`, border: `1px solid ${l.color}40` }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: l.color }}>{l.num}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>{l.title}</h3>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: l.color, letterSpacing: ".1em" }}>{l.subtitle}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.65, marginBottom: 18 }}>{l.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {l.items.map(item => (<div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}><span style={{ color: l.color, fontSize: 10 }}>▸</span> {item}</div>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW THE SCORE WORKS ═══════ */}
      <section style={{ padding: "70px 0", borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Le processus</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Comment ça <span style={{ color: C.gold }}>marche</span> ?</h2>
            <GoldBarCenter />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>7 étapes guidées, 10 minutes, résultat immédiat.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="grid-4">
            {[
              { num: "01", title: "Contexte entreprise", desc: "Secteur, taille, présence agents IA actuels", color: C.gray2 },
              { num: "02", title: "Maturité agentique", desc: "Fonctionnement actuel de vos agents autonomes", color: C.gray2 },
              { num: "03", title: "4 couches ACF®", desc: "Évaluation de chaque couche de gouvernance", color: C.gold },
              { num: "04", title: "Score & Actions", desc: "Score global, positionnement marché, 3 actions prioritaires", color: C.green },
            ].map(s => (
              <div key={s.num} style={{ textAlign: "center", padding: 24, background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: C.gold }}>{s.num}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 28 }} className="grid-3">
            {[
              { icon: "📊", title: "Score de Souveraineté", desc: "Mesurez votre indépendance face aux plateformes tierces et votre résilience opérationnelle." },
              { icon: "🎯", title: "Score Global ACF®", desc: "Évaluez vos 4 couches de gouvernance sur 100 points avec positionnement marché." },
              { icon: "⚡", title: "3 Actions Prioritaires", desc: "Plan d'action personnalisé et priorisé pour sécuriser votre transition agentique." },
            ].map(d => (
              <div key={d.title} style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{d.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{d.title}</h3>
                <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.6 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ECOSYSTEM ═══════ */}
      <section id="ecosystem" style={{ padding: "70px 0", background: C.navy2, borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>L'écosystème</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>5 produits. <span style={{ color: C.gold }}>1 système.</span></h2>
            <GoldBarCenter />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>Chaque produit alimente le suivant. Un écosystème en boucle fermée pour une gouvernance complète.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }} className="grid-3">
            {[
              { icon: "📊", name: "ACF Score®", tag: "Diagnostic gratuit", desc: "Évaluez votre gouvernance agentique en 10 minutes. Score immédiat, rapport PDF, recommandations personnalisées.", color: C.green, href: "/en/acf-score", cta: "Calculer mon Score" },
              { icon: "🎛️", name: "ACF Control", tag: "Plateforme de gouvernance", desc: "Dashboard de monitoring temps réel. Suivez les décisions, appliquez les politiques, maintenez le contrôle.", color: C.amber, href: "/en/acf-control", cta: "Explorer Control" },
              { icon: "🎓", name: "ACF Academy", tag: "Formation", desc: "Programme de formation en 6 modules. Parcours équipes et parcours dirigeants. Apprenez à gouverner.", color: C.blue, href: "/en/acf-certification#academy", cta: "Voir les programmes" },
              { icon: "🛡️", name: "ACF Certification", tag: "Labels de confiance", desc: "Labels ACF TRUST™ et ACF CERTIFIED. Prouvez votre gouvernance à vos clients, partenaires et régulateurs.", color: C.gold, href: "/en/acf-certification", cta: "Se certifier" },
              { icon: "🤝", name: "ACF Partners", tag: "Réseau mondial", desc: "Déployez, auditez, formez et certifiez les organisations. Exclusivité territoriale et revenue share.", color: C.purple, href: "/en/acf-partners", cta: "Devenir partenaire" },
            ].map(p => (
              <div key={p.name} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: "28px 24px", transition: "all .3s", display: "flex", flexDirection: "column", ...(p.name === "ACF Partners" ? { gridColumn: "span 1" } : {}) }}
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

      {/* ═══════ USE CASES ═══════ */}
      <section style={{ padding: "70px 0", borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Cas d'usage</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Qui a besoin de <span style={{ color: C.gold }}>gouvernance agentique</span> ?</h2>
            <GoldBarCenter />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }} className="grid-3">
            {[
              { icon: "🛒", title: "E-commerce & Retail", items: ["Agents de pricing dynamique", "Chatbots autonomes", "Optimisation supply chain", "Agents marketplace (Amazon, etc.)"] },
              { icon: "🏦", title: "Finance & Assurance", items: ["Trading algorithmique", "Agents de souscription", "Détection de fraude autonome", "Agents de crédit scoring"] },
              { icon: "🏭", title: "Industrie & Logistique", items: ["Agents de procurement", "Optimisation production", "Maintenance prédictive", "Gestion de flotte autonome"] },
              { icon: "💊", title: "Santé & Pharma", items: ["Agents de diagnostic", "Gestion des stocks médicaux", "Essais cliniques IA", "Compliance réglementaire"] },
              { icon: "📱", title: "Tech & SaaS", items: ["Agents DevOps autonomes", "Customer success IA", "Agents de facturation", "Orchestration multi-agents"] },
              { icon: "🏛️", title: "Secteur Public", items: ["Services citoyens IA", "Agents de traitement", "Conformité AI Act", "Transparence décisionnelle"] },
            ].map(uc => (
              <div key={uc.title} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28, transition: "all .3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.goldBorder} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd1}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{uc.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{uc.title}</h3>
                {uc.items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2, marginBottom: 5 }}><span style={{ color: C.gold, fontSize: 10 }}>▸</span> {item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ RESEARCH ═══════ */}
      <section style={{ padding: "70px 0", background: C.navy2, borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Recherche & Fondements</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Un framework ancré dans la <span style={{ color: C.gold }}>recherche</span></h2>
            <GoldBarCenter />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>L'ACF® est construit sur la recherche rigoureuse à l'intersection de la gouvernance IA, la souveraineté organisationnelle et la conformité réglementaire.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="grid-2">
            {[
              { title: "Commerce Agentique", desc: "Comment les agents IA autonomes transforment le commerce et pourquoi les contrôles traditionnels échouent.", icon: "🔬" },
              { title: "Souveraineté Décisionnelle", desc: "La théorie de la souveraineté organisationnelle à l'ère des systèmes autonomes.", icon: "⚖️" },
              { title: "Paysage Réglementaire", desc: "AI Act, RGPD, réglementations sectorielles — comment les frameworks de gouvernance doivent s'adapter.", icon: "📜" },
              { title: "Architecture 4 Couches", desc: "La méthodologie derrière le modèle de gouvernance ACF® et comment il monte en échelle.", icon: "🏗️" },
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
            <p style={{ fontSize: 14, color: C.gray, marginBottom: 16 }}>Développé par <strong style={{ color: "#fff" }}>Vincent DORANGE</strong> — AI CONSULTING, Nice, France</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a href="/en/blog" style={{ display: "inline-block", padding: "12px 24px", borderRadius: 8, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 13, fontWeight: 600, transition: "all .2s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = C.goldDim; }} onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}>Lire le blog →</a>
              <a href="/en/about" style={{ display: "inline-block", padding: "12px 24px", borderRadius: 8, border: `1px solid ${C.bd1}`, color: C.gray2, fontSize: 13, fontWeight: 600, transition: "all .2s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }} onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>À propos de l'ACF® →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section style={{ padding: "70px 0", borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 12 }}>Gouvernez les agents.<br /><span style={{ color: C.gold }}>Préservez votre souveraineté.</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>Commencez par un diagnostic gratuit. Obtenez votre Score ACF® en 10 minutes. Comprenez où vous en êtes — et quoi faire ensuite.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Calculer mon Score ACF® →</a>
            <a href="/en/acf-certification" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, display: "inline-block" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Certification & Academy</a>
            <a href="/en/contact" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, display: "inline-block" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Nous contacter</a>
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
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 320 }}>Le standard de gouvernance pour les organisations déployant des agents IA autonomes.</p>
            </div>
            {[
              { title: "Framework", links: [{ label: "The Standard", href: "/en/standard" },{ label: "Blog", href: "/en/blog" },{ label: "Certification", href: "/en/acf-certification" }] },
              { title: "Products", links: [{ label: "ACF Score®", href: "/en/acf-score" },{ label: "ACF Control", href: "/en/acf-control" },{ label: "Academy", href: "/en/acf-certification#academy" }] },
              { title: "Organization", links: [{ label: "Partners", href: "/en/acf-partners" },{ label: "About", href: "/en/about" },{ label: "Contact", href: "/en/contact" },{ label: "Legal", href: "/en/legal" }] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map(l => (<a key={l.label} href={l.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.bd1}`, padding: "20px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
