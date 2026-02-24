"use client";

import React, { useState, useEffect, useRef } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF CONTROL — Decision Governance Operating System
   Design: ACF Standard navy/gold palette
   #050c1a / #071122 / #0d1f3c / #c9a84c / #e8c96a
   Fonts: Inter · Space Grotesk · JetBrains Mono
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldGlow: "rgba(201,168,76,.35)", goldBorder: "rgba(201,168,76,.2)",
  white: "#ffffff", gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", bd2: "rgba(201,168,76,.2)",
  green: "#22c55e", greenGlow: "rgba(34,197,94,.4)",
  red: "#ef4444", amber: "#f59e0b",
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

function Pulse({ color = "green" }) {
  const colors = { green: C.green, amber: C.amber, red: C.red, gold: C.gold };
  return (
    <span className="relative flex" style={{ width: 8, height: 8 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: colors[color], opacity: .6, animation: "pulse-ring 2s infinite" }} />
      <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: colors[color] }} />
    </span>
  );
}

function GoldBar() {
  return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, marginBottom: 16 }} />;
}

function Badge({ children }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
      color: C.gold, letterSpacing: ".14em", textTransform: "uppercase",
      background: C.goldDim, border: `1px solid ${C.goldBorder}`,
      padding: "5px 14px", borderRadius: 100, display: "inline-block",
    }}>{children}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
      color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12,
    }}>// {children}</div>
  );
}

function StabilityRing({ value, label }) {
  const color = value > 80 ? C.green : value > 60 ? C.amber : C.red;
  const circ = 2 * Math.PI * 34;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="40" cy="40" r="34" fill="none" stroke={C.navy3} strokeWidth="5" />
        <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={circ - (value / 100) * circ}
          strokeLinecap="round" style={{ transition: "all 1s" }} />
      </svg>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginTop: -52, marginBottom: 28 }}>{value}</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function KPIMini({ label, value, trend, unit = "" }) {
  const up = trend === "up";
  return (
    <div style={{ background: C.navy3, borderRadius: 10, padding: "10px 12px", border: `1px solid ${C.bd1}` }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>{value}{unit}</span>
        <span style={{ fontSize: 11, color: up ? C.green : C.red }}>{up ? "↑" : "↓"}</span>
      </div>
    </div>
  );
}

function TimelineEvent({ time, label, level }) {
  const cfg = {
    ok: { color: C.green, bg: "rgba(34,197,94,.08)", border: "rgba(34,197,94,.2)", icon: "✓" },
    warning: { color: C.amber, bg: "rgba(245,158,11,.08)", border: "rgba(245,158,11,.2)", icon: "⚠" },
    alert: { color: "#f97316", bg: "rgba(249,115,22,.08)", border: "rgba(249,115,22,.2)", icon: "◆" },
    critical: { color: C.red, bg: "rgba(239,68,68,.08)", border: "rgba(239,68,68,.2)", icon: "✕" },
  }[level];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 8, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cfg.color }}>{time}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: cfg.color }}>{cfg.icon}</span>
      <span style={{ fontSize: 13, color: C.gray2, flex: 1 }}>{label}</span>
    </div>
  );
}

function ModuleCard({ id, title, subtitle, icon, children }: { id: string; title: string; subtitle: string; icon: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div style={{
      background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24,
      transition: "all .3s", position: "relative", overflow: "hidden",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, padding: "4px 12px", borderBottomLeftRadius: 12, background: "rgba(255,255,255,.03)", borderBottom: `1px solid ${C.bd1}`, borderLeft: `1px solid ${C.bd1}` }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".14em" }}>{id}</span>
      </div>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(201,168,76,0.08)", border: `1px solid rgba(201,168,76,0.25)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 13, color: C.gray, marginBottom: 16, lineHeight: 1.5 }}>{subtitle}</p>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ACFControlPage() {
  const [activeTab, setActiveTab] = useState("ceo");
  const [killArmed, setKillArmed] = useState(false);
  const [clock, setClock] = useState(new Date());

  useEffect(() => { const t = setInterval(() => setClock(new Date()), 1000); return () => clearInterval(t); }, []);
  const timeStr = clock.toLocaleTimeString("en-US", { hour12: false });

  const navLinks = ["Modules", "Drift Engine", "Dashboard", "Risks"];

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: .6; } 70% { transform: scale(2.2); opacity: 0; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp .8s cubic-bezier(.16,1,.3,1) forwards; }
        .gold-glow:hover { box-shadow: 0 0 30px ${C.goldGlow}; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
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
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF CONTROL</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>DECISION GOVERNANCE OS</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l}</a>
            ))}
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>Request a Demo</button>
          </div>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section style={{ paddingTop: 140, paddingBottom: 100, position: "relative", overflow: "hidden" }}>
        {/* Subtle grid background */}
        <div style={{
          position: "absolute", inset: 0, opacity: .03,
          backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        {/* Gold radial glow */}
        <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 800, background: `radial-gradient(circle, ${C.goldDim}, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            {/* Left */}
            <div className="fade-up">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <Pulse color="green" />
                <Badge>LIVE GOVERNANCE SYSTEM</Badge>
              </div>

              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.08, marginBottom: 24, letterSpacing: "-1px" }}>
                <span style={{ color: "#fff" }}>Your agents decide.</span><br />
                <span style={{ color: C.gold }}>You stay in control.</span>
              </h1>

              <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                ACF Control is the <strong style={{ color: "#fff" }}>decision governance operating system</strong> for organizations deploying autonomous AI agents. Detect drift, classify incidents, intervene instantly.
              </p>

              <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
                <button className="gold-glow" style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                  border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                }}>Book a Demo →</button>
                <button style={{
                  background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
                  padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .3s",
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
                >Watch Demo</button>
              </div>

              <div style={{ display: "flex", gap: 24, fontSize: 12, color: C.gray }}>
                {["GDPR Compliant", "EU AI Act Ready", "Kill Switch 60s"].map(t => (
                  <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: C.green }}>✓</span> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Live Dashboard */}
            <div className="fade-up" style={{ animationDelay: ".2s" }}>
              <div style={{ background: C.navy2, border: `1px solid ${C.bd2}`, borderRadius: 16, padding: 20, position: "relative" }}>
                <div style={{ position: "absolute", inset: -16, background: `radial-gradient(ellipse at center, ${C.goldDim}, transparent 70%)`, borderRadius: 24, zIndex: -1 }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Pulse color="green" />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em" }}>ACF CONTROL — LIVE</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.gold }}>{timeStr}</span>
                </div>

                {/* Score */}
                <div style={{ background: C.navy3, borderRadius: 12, padding: 16, marginBottom: 12, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Sovereignty Score</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: C.green }}>74</span>
                    <span style={{ fontSize: 13, color: C.gray }}>/100</span>
                    <span style={{ fontSize: 11, color: C.green, marginLeft: "auto" }}>▲ +3.2 (30d)</span>
                  </div>
                  <div style={{ width: "100%", height: 4, background: C.navy1, borderRadius: 4, marginTop: 8 }}>
                    <div style={{ width: "74%", height: 4, background: `linear-gradient(90deg, ${C.green}, ${C.gold})`, borderRadius: 4 }} />
                  </div>
                </div>

                {/* Agents */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                  {[
                    { name: "PRICE-GOV", score: 92, status: "green" },
                    { name: "STOCK-AI", score: 67, status: "amber" },
                    { name: "FRAUD-DET", score: 88, status: "green" },
                  ].map(a => (
                    <div key={a.name} style={{ background: C.navy3, borderRadius: 8, padding: 10, border: `1px solid ${C.bd1}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <Pulse color={a.status} />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.gray, letterSpacing: ".08em" }}>{a.name}</span>
                      </div>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: a.score > 80 ? C.green : a.score > 60 ? C.amber : C.red }}>{a.score}</span>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <TimelineEvent time="14:32" label="PRICE-GOV margin adjusted +0.3%" level="ok" />
                  <TimelineEvent time="14:28" label="STOCK-AI drift detected (−1.2%)" level="warning" />
                  <TimelineEvent time="14:15" label="FRAUD-DET suspicious transaction blocked" level="ok" />
                  <TimelineEvent time="13:47" label="Escalation threshold approaching" level="alert" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ EQUATION BAR ━━━ */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}`, borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Observability", c: C.gold },
            null,
            { label: "Governance", c: C.green },
            null,
            { label: "Intervention", c: C.amber },
            "=",
            { label: "Sovereignty", c: "#fff", bold: true },
          ].map((item, i) => item === null ? (
            <span key={i} style={{ fontSize: 20, color: C.gray }}>+</span>
          ) : item === "=" ? (
            <span key={i} style={{ fontSize: 20, color: C.gray }}>=</span>
          ) : (
            <span key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: item.bold ? 700 : 500, color: item.c }}>{item.label}</span>
          ))}
        </div>
      </section>

      {/* ━━━ WHAT IT IS / IS NOT ━━━ */}
      <section style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>Positioning</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Not another AI dashboard.
            </h2>
            <p style={{ fontSize: 16, color: C.gray2, maxWidth: 600, margin: "0 auto" }}>
              ACF Control is a <strong style={{ color: "#fff" }}>decision governance layer</strong> — the nervous system your organization needs to remain sovereign.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.red, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>✕</span> ACF Control is NOT
              </h3>
              {["An AI tool or agent builder", "A repricer or marketing platform", "A passive reporting dashboard", "An optimization engine", "A data warehouse or BI tool"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: C.gray2 }}>
                  <span style={{ color: "rgba(239,68,68,.4)" }}>—</span> {t}
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(34,197,94,.04)", border: "1px solid rgba(34,197,94,.15)", borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.green, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>✓</span> ACF Control IS
              </h3>
              {["A decision governance operating system", "A real-time drift detection center", "An incident classification & response hub", "A command authority intervention center", "A sovereignty supervision platform"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: C.gray2 }}>
                  <span style={{ color: C.gold }}>→</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 6 CORE MODULES ━━━ */}
      <section id="modules" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>Architecture</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>6 Core Modules</h2>
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto" }}>Each module serves one purpose: keeping humans in command of machine decisions.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <ModuleCard id="ACF-00" title="Sovereignty Score" subtitle="Your governance baseline — scored 0 to 100 across 4 axes." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="3"/></svg>}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: C.gold }}>74.5</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, marginTop: 4, letterSpacing: ".06em" }}>Distribution · Decision · Traffic · Treasury</div>
                </div>
                <span style={{ fontSize: 10, color: C.gold, background: C.goldDim, padding: "4px 10px", borderRadius: 6 }}>PDF Export</span>
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-01" title="Decision Registry" subtitle="A living inventory: who decides what, with what, and how." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "Price adjustment", status: "Governed", color: C.gold },
                  { name: "Replenishment", status: "Assisted", color: C.green },
                  { name: "Customer exclusion", status: "Human only", color: C.red },
                ].map(d => (
                  <div key={d.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: C.gray2 }}>{d.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: d.color, fontSize: 11 }}>{d.status}</span>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-02" title="Criticality Matrix" subtitle="Impact × Frequency × Irreversibility." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { label: "Optimizable", count: 12, color: C.green },
                  { label: "Governed", count: 8, color: C.gold },
                  { label: "Human only", count: 5, color: C.red },
                ].map(c => (
                  <div key={c.label} style={{ textAlign: "center", padding: 8, borderRadius: 8, background: `${c.color}11` }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.color }}>{c.count}</div>
                    <div style={{ fontSize: 8, color: c.color, textTransform: "uppercase", letterSpacing: ".08em", opacity: .8 }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-03" title="Agentic Constitution" subtitle="Strategic governance document — versioned, signed, auditable." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["Priority objectives", "Critical thresholds", "Escalation rules", "Non-delegable zones", "Kill Switch owner"].map(t => (
                  <div key={t} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.gray2 }}>
                    <span>{t}</span><span style={{ color: C.green }}>✓</span>
                  </div>
                ))}
                <div style={{ fontSize: 9, color: C.gray, borderTop: `1px solid ${C.bd1}`, paddingTop: 8, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>Signed CEO — v2.1 — Feb 2026</div>
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-04" title="Agent Registry" subtitle="Every agent documented: mandate, scope, limits, human owner." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "PRICE-GOV", level: "Lvl 2", active: true },
                  { name: "STOCK-AI", level: "Lvl 2", active: true },
                  { name: "FRAUD-DET", level: "Lvl 2", active: true },
                  { name: "ADS-OPT", level: "Lvl 1", active: false },
                ].map(a => (
                  <div key={a.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Pulse color={a.active ? "green" : "red"} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: C.gray2 }}>{a.name}</span>
                    </div>
                    <span style={{ color: C.gray, fontSize: 11 }}>{a.level}</span>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-05" title="Minimum Viable Supervision" subtitle="5 KPIs per agent. Thresholds. Alerts. 30-day history." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/><path d="M2 20h20"/></svg>}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <KPIMini label="Margin" value="32.1" unit="%" trend="up" />
                <KPIMini label="Escalations" value="3" trend="down" />
                <KPIMini label="Overrides" value="1" trend="down" />
                <KPIMini label="Human load" value="18" unit="%" trend="up" />
              </div>
            </ModuleCard>
          </div>
        </div>
      </section>

      {/* ━━━ DRIFT ENGINE ━━━ */}
      <section id="drift-engine" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <SectionLabel>Key Differentiator</SectionLabel>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20 }}>Drift Engine™</h2>
              <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7, marginBottom: 16 }}>
                Catastrophic AI failures don't come from bugs — they come from <strong style={{ color: "#fff" }}>slow, invisible drift</strong>. The margin that slips from 32% → 28% without anyone noticing. Escalations that become "normal."
              </p>
              <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7, marginBottom: 28 }}>
                The Drift Engine computes <strong style={{ color: "#fff" }}>7-day and 30-day trends</strong> for every agent KPI. It triggers alerts <strong style={{ color: C.gold }}>before thresholds are even breached</strong>.
              </p>

              {[
                { emoji: "🟡", label: "Low drift", desc: "Trend moving, within tolerance" },
                { emoji: "🟠", label: "Significant drift", desc: "Approaching threshold boundary" },
                { emoji: "🔴", label: "Critical drift", desc: "Immediate intervention required" },
              ].map(d => (
                <div key={d.label} style={{ display: "flex", gap: 12, background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 10, padding: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{d.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{d.label}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Drift Viz */}
            <div style={{ background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginBottom: 16 }}>AGENT STABILITY SCORES</div>
              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 28 }}>
                <StabilityRing value={92} label="PRICE-GOV" />
                <StabilityRing value={67} label="STOCK-AI" />
                <StabilityRing value={88} label="FRAUD-DET" />
              </div>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginBottom: 10 }}>DRIFT DETECTION — STOCK-AI</div>
              <div style={{ background: C.navy3, borderRadius: 12, padding: 16, border: `1px solid rgba(245,158,11,.15)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.amber }}>⚠ DRIFT DETECTED</span>
                  <span style={{ fontSize: 9, color: C.gray }}>14d trend</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 56 }}>
                  {[85, 84, 83, 82, 80, 79, 78, 76, 74, 72, 70, 68, 67, 66].map((v, i) => (
                    <div key={i} style={{
                      flex: 1, borderRadius: "3px 3px 0 0",
                      height: `${(v / 100) * 100}%`,
                      background: v > 80 ? C.green : v > 70 ? C.amber : "#f97316",
                      opacity: .5 + (i / 14) * .5,
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.gray }}>
                  <span>14d ago</span><span>now</span>
                </div>
                <div style={{ marginTop: 12, background: "rgba(245,158,11,.06)", border: "1px solid rgba(245,158,11,.15)", borderRadius: 8, padding: 10, fontSize: 12, color: C.gray2, lineHeight: 1.5 }}>
                  ⚠ STOCK-AI margin drift: −1.8% over 14 days.<br />
                  <span style={{ color: C.gold, fontWeight: 600 }}>→ Recommendation: review threshold or reduce scope.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ KILL SWITCH & INTERVENTION ━━━ */}
      <section style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>Command Authority</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>Immediate Intervention</h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 40px" }}>
            ACF Control doesn't just alert — it gives you the power to <strong style={{ color: "#fff" }}>act within seconds</strong>.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 48 }}>
            {[
              { icon: "⏸", label: "Suspend Agent" },
              { icon: "📐", label: "Reduce Scope" },
              { icon: "🔄", label: "Force Escalation" },
              { icon: "⚡", label: "Degraded Mode" },
              { icon: "🛑", label: "Kill Switch", danger: true },
            ].map(a => (
              <div key={a.label} style={{
                background: a.danger ? "rgba(239,68,68,.06)" : C.navy3,
                border: `1px solid ${a.danger ? "rgba(239,68,68,.25)" : C.bd1}`,
                borderRadius: 12, padding: 16, cursor: "pointer", transition: "all .3s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: a.danger ? C.red : C.gray2 }}>{a.label}</div>
              </div>
            ))}
          </div>

          {/* Kill Switch Demo */}
          <div style={{ maxWidth: 400, margin: "0 auto", background: C.navy2, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>🛑 GLOBAL KILL SWITCH</div>
            <p style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>Suspend ALL autonomous agents. Full degraded mode within 60 seconds.</p>
            <button onClick={() => setKillArmed(!killArmed)} style={{
              width: "100%", padding: 12, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
              background: killArmed ? C.red : "rgba(239,68,68,.08)",
              color: killArmed ? "#fff" : C.red,
              boxShadow: killArmed ? "0 0 20px rgba(239,68,68,.4)" : "none",
              animation: killArmed ? "pulse-ring 2s infinite" : "none",
            }}>
              {killArmed ? "⚠ KILL SWITCH ARMED — Click to disarm" : "Arm Kill Switch"}
            </button>
            {killArmed && <p style={{ fontSize: 11, color: "rgba(239,68,68,.5)", marginTop: 10 }}>All agents will be suspended upon confirmation. Action logged.</p>}
          </div>
        </div>
      </section>

      {/* ━━━ EXECUTIVE DASHBOARD ━━━ */}
      <section id="dashboard" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>One page, one answer</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>Executive Dashboard</h2>
            <p style={{ fontSize: 15, color: C.gray2 }}>
              One question, answered in 30 seconds: <strong style={{ color: "#fff", fontSize: 18 }}>"Are we sovereign today?"</strong>
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {[
              { key: "ceo", label: "CEO View" },
              { key: "ops", label: "Operator View" },
              { key: "consultant", label: "Consultant View" },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s", border: "none",
                background: activeTab === t.key ? C.goldDim : "transparent",
                color: activeTab === t.key ? C.gold : C.gray,
                outline: activeTab === t.key ? `1px solid ${C.goldBorder}` : `1px solid ${C.bd1}`,
              }}>{t.label}</button>
            ))}
          </div>

          <div style={{ background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24 }}>
            {activeTab === "ceo" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>Sovereignty Score</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800, color: C.green }}>74</div>
                  <div style={{ fontSize: 11, color: C.green, opacity: .7 }}>▲ +3.2 vs last month</div>
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>Active Agents</div>
                  {[{ c: "green", l: "Stable", n: 5 }, { c: "amber", l: "Attention", n: 2 }, { c: "red", l: "Critical", n: 0 }].map(a => (
                    <div key={a.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Pulse color={a.c} /><span style={{ fontSize: 12, color: C.gray2 }}>{a.l}</span></div>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: { green: C.green, amber: C.amber, red: C.red }[a.c] }}>{a.n}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>Recent Incidents</div>
                  {[{ t: "14:28", l: "STOCK-AI drift", c: C.amber }, { t: "12:15", l: "Auto-corrected", c: C.green }, { t: "09:42", l: "Routine check", c: C.green }].map((e, i) => (
                    <div key={i} style={{ fontSize: 12, marginBottom: 6 }}><span style={{ fontFamily: "'JetBrains Mono', monospace", color: e.c, marginRight: 8 }}>{e.t}</span><span style={{ color: C.gray2 }}>{e.l}</span></div>
                  ))}
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>At-Risk Decisions</div>
                  <div style={{ fontSize: 12, color: C.amber, marginBottom: 6 }}>Pricing → margin drift</div>
                  <div style={{ fontSize: 12, color: C.amber, marginBottom: 6 }}>Inventory → low coverage</div>
                  <div style={{ fontSize: 12, color: C.gray, marginBottom: 12 }}>No critical risks</div>
                  <button style={{ width: "100%", background: "rgba(239,68,68,.06)", border: `1px solid rgba(239,68,68,.2)`, color: C.red, padding: 8, borderRadius: 8, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer" }}>🛑 SUSPEND ALL</button>
                </div>
              </div>
            )}
            {activeTab === "ops" && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Agent Operator View</h3>
                <p style={{ fontSize: 14, color: C.gray2, maxWidth: 400, margin: "0 auto 20px" }}>Deep-dive into each agent's performance. Adjust rules, manage drift thresholds, resolve incidents.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, maxWidth: 500, margin: "0 auto" }}>
                  <KPIMini label="Margin" value="32.1" unit="%" trend="up" />
                  <KPIMini label="Escalations" value="3" trend="down" />
                  <KPIMini label="Overrides" value="1" trend="down" />
                  <KPIMini label="Incidents" value="0" trend="down" />
                </div>
              </div>
            )}
            {activeTab === "consultant" && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🗺</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Certified Consultant View</h3>
                <p style={{ fontSize: 14, color: C.gray2, maxWidth: 400, margin: "0 auto 20px" }}>Multi-client access, benchmarks, mission templates and audit-ready exports. Deliver a full ACF diagnostic in under 2 hours.</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  {["Multi-client", "Templates", "Benchmark", "PDF Export"].map(t => (
                    <span key={t} style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 11, padding: "6px 14px", borderRadius: 8 }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ━━━ RISK vs COST — THE REAL ROI SECTION ━━━ */}
      <section id="risks" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>The real math</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
              What does the <span style={{ color: C.red }}>absence</span> of governance cost?
            </h2>
            <p style={{ fontSize: 16, color: C.gray2, maxWidth: 600, margin: "0 auto" }}>
              The cost of ACF Control is <strong style={{ color: "#fff" }}>negligible</strong> compared to the financial, regulatory, and reputational risks you're taking without formalized governance.
            </p>
          </div>

          {/* Risk Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 48 }}>
            {/* AI Act */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚖️</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>EU AI ACT FINES</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                <AnimatedCounter end={35} prefix="€" suffix="M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                Up to <strong style={{ color: "#fff" }}>€35 million</strong> or 7% of global annual turnover for non-compliance with transparency and supervision requirements for high-risk AI systems.
              </p>
            </div>

            {/* GDPR */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>GDPR FINES</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                <AnimatedCounter end={20} prefix="€" suffix="M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                Up to <strong style={{ color: "#fff" }}>€20 million</strong> or 4% of global annual turnover. Ungoverned automated decisions multiply the risk of data violations.
              </p>
            </div>

            {/* Drift Cost */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📉</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>COST OF AI DRIFT</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                €<AnimatedCounter end={2} suffix=".4M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                Average observed loss from <strong style={{ color: "#fff" }}>uncontrolled AI decisions</strong>: pricing errors, broken inventory, abusive customer exclusions, invisible margin erosion.
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 32, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>RISK WITHOUT GOVERNANCE</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: C.red }}>€57.4M</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>Maximum cumulative exposure</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: C.gold }}>vs</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.green, letterSpacing: ".1em", marginBottom: 8 }}>ACF CONTROL INVESTMENT</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: C.green }}>→ 0.01%</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>A fraction of your risk exposure</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 32 }}>
            {[
              { stat: "73%", desc: "of companies use AI agents without formalized governance" },
              { stat: "89%", desc: "of executives fear losing strategic control over their agents" },
              { stat: "×12", desc: "incidents increase 12x faster in organizations without supervision" },
            ].map(s => (
              <div key={s.stat} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: 20, textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 800, color: C.gold, marginBottom: 8 }}>{s.stat}</div>
                <p style={{ fontSize: 12, color: C.gray2, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PRICING — ON REQUEST ━━━ */}
      <section style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>Plans</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
            Bespoke governance, not commodity SaaS.
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 550, margin: "0 auto 48px" }}>
            Every organization has unique sovereignty challenges. We tailor ACF Control to your agent architecture, industry, and regulatory requirements.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[
              {
                tier: "ESSENTIAL", desc: "Up to 3 agents", icon: "🛡",
                features: ["Sovereignty Score", "Decision Registry", "Criticality Matrix", "Basic alerts", "PDF exports"],
              },
              {
                tier: "PROFESSIONAL", desc: "Up to 10 agents", icon: "⚡", recommended: true,
                features: ["Everything in Essential +", "Drift Engine™", "Incident Classification", "Kill Switch (3 levels)", "Agentic Constitution", "Smart Alerts (Slack + Email)", "Consultant Access"],
              },
              {
                tier: "ENTERPRISE", desc: "Unlimited agents", icon: "🏛",
                features: ["Everything in Professional +", "Multi-site / Multi-BU", "Custom integrations (API)", "Dedicated DDA support", "Audit trail (3 years)", "White-label option", "SLA 99.9%"],
              },
            ].map(plan => (
              <div key={plan.tier} style={{
                background: plan.recommended ? C.navy2 : C.navy3,
                border: `1px solid ${plan.recommended ? C.goldBorder : C.bd1}`,
                borderRadius: 16, padding: 28, textAlign: "left", position: "relative",
              }}>
                {plan.recommended && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                    fontSize: 9, fontWeight: 800, padding: "4px 14px", borderRadius: 100, letterSpacing: ".08em",
                  }}>RECOMMENDED</div>
                )}
                <div style={{ fontSize: 28, marginBottom: 8 }}>{plan.icon}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: plan.recommended ? C.gold : C.gray, letterSpacing: ".14em", marginBottom: 4 }}>{plan.tier}</div>
                <div style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{plan.desc}</div>

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800,
                  color: plan.recommended ? C.gold : "#fff", marginBottom: 20,
                }}>
                  Price on request
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}>
                      <span style={{ color: plan.recommended ? C.gold : C.green, fontSize: 11 }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                <button className="gold-glow" style={{
                  width: "100%", padding: 12, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                  background: plan.recommended ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : C.navy2,
                  color: plan.recommended ? C.navy1 : C.gray2,
                  outline: plan.recommended ? "none" : `1px solid ${C.bd1}`,
                }}>{plan.recommended ? "Request a Demo →" : "Contact Us"}</button>
              </div>
            ))}
          </div>

          {/* Partner */}
          <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>CERTIFIED PARTNER PROGRAM</div>
            <p style={{ fontSize: 13, color: C.gray2, marginBottom: 12 }}>Annual consultant license. ACF certification required for client access.</p>
            <button style={{
              background: "transparent", border: `1px solid ${C.goldBorder}`, color: C.gold,
              padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .3s",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = C.goldDim; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}
            >Apply for Certification →</button>
          </div>
        </div>
      </section>

      {/* ━━━ STATS BAR ━━━ */}
      <section style={{ padding: "56px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
          {[
            { val: 60, suf: "s", label: "Kill switch max" },
            { val: 18, suf: "", label: "Sovereignty KPIs" },
            { val: 7, suf: "", label: "Controls per agent" },
            { val: 45, suf: "min", label: "Operational in" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.gold }}>
                <AnimatedCounter end={s.val} suffix={s.suf} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━ */}
      <section style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
            Stop flying blind.<br />
            <span style={{ color: C.gold }}>Start governing.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            Your agents are already making decisions. The only question is: <strong style={{ color: "#fff" }}>are you in command?</strong>
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "16px 36px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>Request a Demo →</button>
            <button style={{
              background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
              padding: "16px 36px", borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
            >Calculate Your ACF Score</button>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer style={{ padding: "32px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: C.navy1 }}>ACF</div>
            <span style={{ fontSize: 13, color: C.gray }}>Agentic Commerce Framework® — All rights reserved.</span>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.gray }}>
            <span>© 2026 Vincent DORANGE</span>
            <a href="#" style={{ color: C.gray, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray}>Privacy</a>
            <a href="#" style={{ color: C.gray, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray}>Terms</a>
            <a href="#" style={{ color: C.gray, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
