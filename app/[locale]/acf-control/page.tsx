"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

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

function Pulse({ color = "green" }: { color?: string }) {
  const colors: Record<string, string> = { green: C.green, amber: C.amber, red: C.red, gold: C.gold };
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: colors[color] }} />;
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

function StabilityRing({ value, label }: { value: number; label: string }) {
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

function KPIMini({ label, value, trend, unit = "" }: { label: string; value: string | number; trend: string; unit?: string }) {
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

function TimelineEvent({ time, label, level }: { time: string; label: string; level: string }) {
  const cfgMap: Record<string, { color: string; bg: string; border: string; icon: string }> = {
    ok: { color: C.green, bg: "rgba(34,197,94,.08)", border: "rgba(34,197,94,.2)", icon: "✓" },
    warning: { color: C.amber, bg: "rgba(245,158,11,.08)", border: "rgba(245,158,11,.2)", icon: "⚠" },
    alert: { color: "#f97316", bg: "rgba(249,115,22,.08)", border: "rgba(249,115,22,.2)", icon: "◆" },
    critical: { color: C.red, bg: "rgba(239,68,68,.08)", border: "rgba(239,68,68,.2)", icon: "✕" },
  };
  const cfg = cfgMap[level] || cfgMap.ok;
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
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("ceo");
  const [killArmed, setKillArmed] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [alertPhase, setAlertPhase] = useState(0);
  // Phase 0: Normal (0-6s) | Phase 1: Drift warning (6-9s) | Phase 2: Critical alert + red flash (9-12s) 
  // Phase 3: Kill switch fires (12-15s) | Phase 4: Recovery (15-18s) | Loop

  useEffect(() => { const t = setInterval(() => setClock(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    const sequence = [
      { phase: 0, delay: 0 },
      { phase: 1, delay: 3000 },
      { phase: 2, delay: 5000 },
      { phase: 3, delay: 7000 },
      { phase: 4, delay: 9000 },
      { phase: 0, delay: 11000 },
    ];
    const runSequence = () => sequence.map(s => setTimeout(() => setAlertPhase(s.phase), s.delay));
    let timers = runSequence();
    const loop = setInterval(() => { timers = runSequence(); }, 11000);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, []);

  const timeStr = clock.toLocaleTimeString("en-US", { hour12: false });
  const sovScore = alertPhase === 0 ? 74 : alertPhase === 1 ? 68 : alertPhase === 2 ? 41 : alertPhase === 3 ? 41 : 74;
  const stockScore = alertPhase === 0 ? 67 : alertPhase === 1 ? 38 : alertPhase === 2 ? 12 : alertPhase === 3 ? 0 : 67;
  const isAlert = alertPhase === 2;
  const isKill = alertPhase === 3;
  const isRecovery = alertPhase === 4;

  const navLinks = [
    { label: t("acfControl.navModules"), id: "modules" },
    { label: t("acfControl.navDriftEngine"), id: "drift-engine" },
    { label: t("acfControl.navDashboard"), id: "dashboard" },
    { label: t("acfControl.navRisks"), id: "risks" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes alertFlash { 0%,100% { box-shadow: 0 0 0px rgba(239,68,68,0); } 50% { box-shadow: 0 0 40px rgba(239,68,68,.5); } }
        @keyframes redPulse { 0%,100% { border-color: rgba(239,68,68,.3); } 50% { border-color: rgba(239,68,68,.7); } }
        @keyframes killFlash { 0% { opacity: 1; } 50% { opacity: .4; } 100% { opacity: 1; } }
        .fade-up { opacity: 0; animation: fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay: .1s; }
        .gold-glow:hover { box-shadow: 0 0 20px rgba(201,168,76,.2); }
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
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>{t("acfControl.navTitle")}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t("acfControl.navSubtitle")}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/en/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t("acfControl.navBack")}</a>
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>
            ))}
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>{t("acfControl.navRequestDemo")}</button>
          </div>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            {/* Left */}
            <div className="fade-up">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <Pulse color="green" />
                <Badge>{t("acfControl.heroBadge")}</Badge>
              </div>

              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.08, marginBottom: 24, letterSpacing: "-1px" }}>
                <span style={{ color: "#fff" }}>{t("acfControl.heroTitle1")}</span><br />
                <span style={{ color: C.gold }}>{t("acfControl.heroTitle2")}</span>
              </h1>

              <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                {t("acfControl.heroDescPre")}<strong style={{ color: "#fff" }}>{t("acfControl.heroDescBold")}</strong>{t("acfControl.heroDescPost")}
              </p>

              <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
                <button className="gold-glow" style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                  border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                }}>{t("acfControl.heroBookDemo")}</button>
                <button style={{
                  background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
                  padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .3s",
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
                >{t("acfControl.heroWatchDemo")}</button>
              </div>

              <div style={{ display: "flex", gap: 24, fontSize: 12, color: C.gray }}>
                {[t("acfControl.heroBadge1"), t("acfControl.heroBadge2"), t("acfControl.heroBadge3")].map(item => (
                  <span key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: C.green }}>✓</span> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Live Dashboard with Alert Scenario */}
            <div className="fade-up" style={{ animationDelay: ".2s" }}>
              <div style={{
                background: C.navy2, border: `1px solid ${isAlert || isKill ? "rgba(239,68,68,.4)" : C.bd2}`, borderRadius: 16, padding: 20, position: "relative",
                transition: "border-color .5s, box-shadow .5s",
                animation: isAlert ? "alertFlash 1s ease-in-out infinite" : isKill ? "redPulse 1.5s ease-in-out infinite" : "none",
              }}>

                {/* Red overlay flash */}
                {isAlert && <div style={{ position: "absolute", inset: 0, background: "rgba(239,68,68,.06)", borderRadius: 16, pointerEvents: "none", transition: "opacity .3s" }} />}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Pulse color={isAlert || isKill ? "red" : "green"} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: isAlert || isKill ? C.red : C.gray, letterSpacing: ".1em", transition: "color .5s" }}>
                      {isKill ? t("acfControl.dashKillActive") : isAlert ? t("acfControl.dashCriticalAlert") : t("acfControl.dashLive")}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: isAlert || isKill ? C.red : C.gold }}>{timeStr}</span>
                </div>

                {/* Score */}
                <div style={{
                  background: C.navy3, borderRadius: 12, padding: 16, marginBottom: 12, border: `1px solid ${isAlert ? "rgba(239,68,68,.3)" : C.bd1}`,
                  transition: "border-color .5s",
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>{t("acfControl.dashSovereigntyScore")}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800,
                      color: sovScore > 60 ? C.green : sovScore > 40 ? C.amber : C.red,
                      transition: "color .5s",
                    }}>{sovScore}</span>
                    <span style={{ fontSize: 13, color: C.gray }}>/100</span>
                    <span style={{
                      fontSize: 11, marginLeft: "auto", transition: "color .5s",
                      color: alertPhase === 0 || isRecovery ? C.green : C.red,
                    }}>
                      {alertPhase === 0 || isRecovery ? t("acfControl.dashTrendUp") : isKill ? t("acfControl.dashSuspended") : t("acfControl.dashTrendDown")}
                    </span>
                  </div>
                  <div style={{ width: "100%", height: 4, background: C.navy1, borderRadius: 4, marginTop: 8 }}>
                    <div style={{
                      width: `${sovScore}%`, height: 4, borderRadius: 4, transition: "width 1s, background .5s",
                      background: sovScore > 60 ? `linear-gradient(90deg, ${C.green}, ${C.gold})` : sovScore > 40 ? C.amber : C.red,
                    }} />
                  </div>
                </div>

                {/* Agents */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                  {[
                    { name: "PRICE-GOV", score: alertPhase === 0 || isRecovery ? 92 : isKill ? 0 : 92, status: isKill ? "red" : "green" },
                    { name: "STOCK-AI", score: stockScore, status: stockScore > 60 ? "amber" : "red" },
                    { name: "FRAUD-DET", score: alertPhase === 0 || isRecovery ? 88 : isKill ? 0 : 88, status: isKill ? "red" : "green" },
                  ].map(a => (
                    <div key={a.name} style={{
                      background: C.navy3, borderRadius: 8, padding: 10, border: `1px solid ${a.status === "red" && alertPhase > 0 ? "rgba(239,68,68,.2)" : C.bd1}`,
                      transition: "border-color .5s",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <Pulse color={a.status} />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.gray, letterSpacing: ".08em" }}>{a.name}</span>
                      </div>
                      <span style={{
                        fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, transition: "color .5s",
                        color: isKill ? C.red : a.score > 80 ? C.green : a.score > 60 ? C.amber : C.red,
                        animation: isKill ? "killFlash 1s infinite" : "none",
                      }}>{isKill ? "OFF" : a.score}</span>
                    </div>
                  ))}
                </div>

                {/* Timeline — dynamic */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {isKill ? (
                    <>
                      <TimelineEvent time={timeStr.slice(0,5)} label={t("acfControl.dashKillActivated")} level="critical" />
                      <TimelineEvent time={timeStr.slice(0,5)} label={t("acfControl.dashStockDriftBreach")} level="critical" />
                      <TimelineEvent time={timeStr.slice(0,5)} label={t("acfControl.dashDegradedMode")} level="alert" />
                    </>
                  ) : isAlert ? (
                    <>
                      <TimelineEvent time={timeStr.slice(0,5)} label={t("acfControl.dashStockCritical")} level="critical" />
                      <TimelineEvent time={timeStr.slice(0,5)} label={t("acfControl.dashSovBelow")} level="critical" />
                      <TimelineEvent time="14:28" label={t("acfControl.dashStockDrift")} level="warning" />
                      <TimelineEvent time="14:15" label={t("acfControl.dashFraudBlocked")} level="ok" />
                    </>
                  ) : alertPhase === 1 ? (
                    <>
                      <TimelineEvent time={timeStr.slice(0,5)} label={t("acfControl.dashStockAccel")} level="warning" />
                      <TimelineEvent time="14:32" label={t("acfControl.dashPriceAdj")} level="ok" />
                      <TimelineEvent time="14:28" label={t("acfControl.dashStockDrift")} level="warning" />
                      <TimelineEvent time="14:15" label={t("acfControl.dashFraudBlocked")} level="ok" />
                    </>
                  ) : (
                    <>
                      <TimelineEvent time="14:32" label={t("acfControl.dashPriceAdj")} level="ok" />
                      <TimelineEvent time="14:28" label={t("acfControl.dashStockDrift")} level="warning" />
                      <TimelineEvent time="14:15" label={t("acfControl.dashFraudBlocked")} level="ok" />
                      <TimelineEvent time="13:47" label={t("acfControl.dashEscalation")} level="alert" />
                    </>
                  )}
                </div>

                {/* Kill Switch Banner */}
                {(isAlert || isKill) && (
                  <div style={{
                    marginTop: 12, padding: "10px 14px", borderRadius: 10,
                    background: isKill ? "rgba(239,68,68,.15)" : "rgba(239,68,68,.08)",
                    border: `1px solid rgba(239,68,68,${isKill ? ".4" : ".2"})`,
                    display: "flex", alignItems: "center", gap: 10,
                    animation: isAlert ? "redPulse 1s infinite" : "none",
                  }}>
                    <span style={{ fontSize: 16 }}>{isKill ? "🛑" : "⚠️"}</span>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.red, letterSpacing: ".08em" }}>
                        {isKill ? t("acfControl.dashAllSuspended") : t("acfControl.dashKillRecommended")}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(239,68,68,.7)", marginTop: 2 }}>
                        {isKill ? t("acfControl.dashHumanTakeover") : t("acfControl.dashSovereigntyBreach")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ EQUATION BAR ━━━ */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}`, borderBottom: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {([
            { label: t("acfControl.eqObservability"), c: C.gold, bold: false },
            null,
            { label: t("acfControl.eqGovernance"), c: C.green, bold: false },
            null,
            { label: t("acfControl.eqIntervention"), c: C.amber, bold: false },
            "=",
            { label: t("acfControl.eqSovereignty"), c: "#fff", bold: true },
          ] as (null | string | { label: string; c: string; bold: boolean })[]).map((item, i) => item === null ? (
            <span key={i} style={{ fontSize: 20, color: C.gray }}>+</span>
          ) : typeof item === "string" ? (
            <span key={i} style={{ fontSize: 20, color: C.gray }}>=</span>
          ) : (
            <span key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: item.bold ? 700 : 500, color: item.c }}>{item.label}</span>
          ))}
        </div>
      </section>

      {/* ━━━ WHAT IT IS / IS NOT ━━━ */}
      <section style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>{t("acfControl.posLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
              {t("acfControl.posTitle")}
            </h2>
            <p style={{ fontSize: 16, color: C.gray2, maxWidth: 600, margin: "0 auto" }}>
              {t("acfControl.posDescPre")}<strong style={{ color: "#fff" }}>{t("acfControl.posDescBold")}</strong>{t("acfControl.posDescPost")}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.red, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>✕</span> {t("acfControl.posNotTitle")}
              </h3>
              {[t("acfControl.posNot1"), t("acfControl.posNot2"), t("acfControl.posNot3"), t("acfControl.posNot4"), t("acfControl.posNot5")].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: C.gray2 }}>
                  <span style={{ color: "rgba(239,68,68,.4)" }}>—</span> {item}
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(34,197,94,.04)", border: "1px solid rgba(34,197,94,.15)", borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.green, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>✓</span> {t("acfControl.posIsTitle")}
              </h3>
              {[t("acfControl.posIs1"), t("acfControl.posIs2"), t("acfControl.posIs3"), t("acfControl.posIs4"), t("acfControl.posIs5")].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: C.gray2 }}>
                  <span style={{ color: C.gold }}>→</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 6 CORE MODULES ━━━ */}
      <section id="modules" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>{t("acfControl.modLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>{t("acfControl.modTitle")}</h2>
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto" }}>{t("acfControl.modSubtitle")}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <ModuleCard id="ACF-00" title={t("acfControl.mod00Title")} subtitle={t("acfControl.mod00Sub")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="3"/></svg>}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: C.gold }}>74.5</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, marginTop: 4, letterSpacing: ".06em" }}>{t("acfControl.mod00Axes")}</div>
                </div>
                <span style={{ fontSize: 10, color: C.gold, background: C.goldDim, padding: "4px 10px", borderRadius: 6 }}>{t("acfControl.mod00Export")}</span>
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-01" title={t("acfControl.mod01Title")} subtitle={t("acfControl.mod01Sub")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: t("acfControl.mod01d1Name"), status: t("acfControl.mod01d1Status"), color: C.gold },
                  { name: t("acfControl.mod01d2Name"), status: t("acfControl.mod01d2Status"), color: C.green },
                  { name: t("acfControl.mod01d3Name"), status: t("acfControl.mod01d3Status"), color: C.red },
                ].map(d => (
                  <div key={d.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: C.gray2 }}>{d.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: d.color, fontSize: 11 }}>{d.status}</span>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-02" title={t("acfControl.mod02Title")} subtitle={t("acfControl.mod02Sub")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { label: t("acfControl.mod02c1"), count: 12, color: C.green },
                  { label: t("acfControl.mod02c2"), count: 8, color: C.gold },
                  { label: t("acfControl.mod02c3"), count: 5, color: C.red },
                ].map(c => (
                  <div key={c.label} style={{ textAlign: "center", padding: 8, borderRadius: 8, background: `${c.color}11` }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.color }}>{c.count}</div>
                    <div style={{ fontSize: 8, color: c.color, textTransform: "uppercase", letterSpacing: ".08em", opacity: .8 }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-03" title={t("acfControl.mod03Title")} subtitle={t("acfControl.mod03Sub")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[t("acfControl.mod03f1"), t("acfControl.mod03f2"), t("acfControl.mod03f3"), t("acfControl.mod03f4"), t("acfControl.mod03f5")].map(item => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.gray2 }}>
                    <span>{item}</span><span style={{ color: C.green }}>✓</span>
                  </div>
                ))}
                <div style={{ fontSize: 9, color: C.gray, borderTop: `1px solid ${C.bd1}`, paddingTop: 8, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{t("acfControl.mod03signed")}</div>
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-04" title={t("acfControl.mod04Title")} subtitle={t("acfControl.mod04Sub")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>}>
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

            <ModuleCard id="ACF-05" title={t("acfControl.mod05Title")} subtitle={t("acfControl.mod05Sub")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/><path d="M2 20h20"/></svg>}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <KPIMini label={t("acfControl.kpiMargin")} value="32.1" unit="%" trend="up" />
                <KPIMini label={t("acfControl.kpiEscalations")} value="3" trend="down" />
                <KPIMini label={t("acfControl.kpiOverrides")} value="1" trend="down" />
                <KPIMini label={t("acfControl.kpiHumanLoad")} value="18" unit="%" trend="up" />
              </div>
            </ModuleCard>
          </div>
        </div>
      </section>

      {/* ━━━ DRIFT ENGINE ━━━ */}
      <section id="drift-engine" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <SectionLabel>{t("acfControl.driftLabel")}</SectionLabel>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20 }}>{t("acfControl.driftTitle")}</h2>
              <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7, marginBottom: 16 }}>
                {t("acfControl.driftP1Pre")}<strong style={{ color: "#fff" }}>{t("acfControl.driftP1Bold")}</strong>{t("acfControl.driftP1Post")}
              </p>
              <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7, marginBottom: 28 }}>
                {t("acfControl.driftP2Pre")}<strong style={{ color: "#fff" }}>{t("acfControl.driftP2Bold")}</strong>{t("acfControl.driftP2Mid")}<strong style={{ color: C.gold }}>{t("acfControl.driftP2Gold")}</strong>{t("acfControl.driftP2Post")}
              </p>

              {[
                { emoji: "🟡", label: t("acfControl.driftLow"), desc: t("acfControl.driftLowDesc") },
                { emoji: "🟠", label: t("acfControl.driftSignificant"), desc: t("acfControl.driftSignificantDesc") },
                { emoji: "🔴", label: t("acfControl.driftCritical"), desc: t("acfControl.driftCriticalDesc") },
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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginBottom: 16 }}>{t("acfControl.driftStabilityScores")}</div>
              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 28 }}>
                <StabilityRing value={92} label="PRICE-GOV" />
                <StabilityRing value={67} label="STOCK-AI" />
                <StabilityRing value={88} label="FRAUD-DET" />
              </div>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginBottom: 10 }}>{t("acfControl.driftDetection")}</div>
              <div style={{ background: C.navy3, borderRadius: 12, padding: 16, border: `1px solid rgba(245,158,11,.15)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.amber }}>{t("acfControl.driftDetected")}</span>
                  <span style={{ fontSize: 9, color: C.gray }}>{t("acfControl.driftTrend14d")}</span>
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
                  <span>{t("acfControl.driftAgo")}</span><span>{t("acfControl.driftNow")}</span>
                </div>
                <div style={{ marginTop: 12, background: "rgba(245,158,11,.06)", border: "1px solid rgba(245,158,11,.15)", borderRadius: 8, padding: 10, fontSize: 12, color: C.gray2, lineHeight: 1.5 }}>
                  {t("acfControl.driftRecommendation")}<br />
                  <span style={{ color: C.gold, fontWeight: 600 }}>{t("acfControl.driftRecommendationAction")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ KILL SWITCH & INTERVENTION ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>{t("acfControl.killLabel")}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>{t("acfControl.killTitle")}</h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 40px" }}>
            {t("acfControl.killDescPre")}<strong style={{ color: "#fff" }}>{t("acfControl.killDescBold")}</strong>{t("acfControl.killDescPost")}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 48 }}>
            {[
              { icon: "⏸", label: t("acfControl.killSuspend") },
              { icon: "📐", label: t("acfControl.killReduce") },
              { icon: "🔄", label: t("acfControl.killEscalate") },
              { icon: "⚡", label: t("acfControl.killDegraded") },
              { icon: "🛑", label: t("acfControl.killSwitch"), danger: true },
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
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t("acfControl.killGlobalTitle")}</div>
            <p style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{t("acfControl.killGlobalDesc")}</p>
            <button onClick={() => setKillArmed(!killArmed)} style={{
              width: "100%", padding: 12, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
              background: killArmed ? C.red : "rgba(239,68,68,.08)",
              color: killArmed ? "#fff" : C.red,
              boxShadow: killArmed ? "0 0 20px rgba(239,68,68,.4)" : "none",
            }}>
              {killArmed ? t("acfControl.killArmed") : t("acfControl.killArm")}
            </button>
            {killArmed && <p style={{ fontSize: 11, color: "rgba(239,68,68,.5)", marginTop: 10 }}>{t("acfControl.killArmedInfo")}</p>}
          </div>
        </div>
      </section>

      {/* ━━━ EXECUTIVE DASHBOARD ━━━ */}
      <section id="dashboard" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t("acfControl.dashLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>{t("acfControl.dashTitle")}</h2>
            <p style={{ fontSize: 15, color: C.gray2 }}>
              {t("acfControl.dashQuestionPre")}<strong style={{ color: "#fff", fontSize: 18 }}>{t("acfControl.dashQuestionBold")}</strong>
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {[
              { key: "ceo", label: t("acfControl.dashCeo") },
              { key: "ops", label: t("acfControl.dashOps") },
              { key: "consultant", label: t("acfControl.dashConsultant") },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s", border: "none",
                background: activeTab === tab.key ? C.goldDim : "transparent",
                color: activeTab === tab.key ? C.gold : C.gray,
                outline: activeTab === tab.key ? `1px solid ${C.goldBorder}` : `1px solid ${C.bd1}`,
              }}>{tab.label}</button>
            ))}
          </div>

          <div style={{ background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24 }}>
            {activeTab === "ceo" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t("acfControl.dashSovereigntyScore")}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800, color: C.green }}>74</div>
                  <div style={{ fontSize: 11, color: C.green, opacity: .7 }}>{t("acfControl.dashVsLastMonth")}</div>
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t("acfControl.dashActiveAgents")}</div>
                  {[{ c: "green", l: t("acfControl.dashStable"), n: 5 }, { c: "amber", l: t("acfControl.dashAttention"), n: 2 }, { c: "red", l: t("acfControl.dashCriticalLabel"), n: 0 }].map(a => (
                    <div key={a.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Pulse color={a.c} /><span style={{ fontSize: 12, color: C.gray2 }}>{a.l}</span></div>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: { green: C.green, amber: C.amber, red: C.red }[a.c] }}>{a.n}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t("acfControl.dashRecentIncidents")}</div>
                  {[{ time: "14:28", l: t("acfControl.dashStockDriftShort"), c: C.amber }, { time: "12:15", l: t("acfControl.dashAutoCorrected"), c: C.green }, { time: "09:42", l: t("acfControl.dashRoutineCheck"), c: C.green }].map((e, i) => (
                    <div key={i} style={{ fontSize: 12, marginBottom: 6 }}><span style={{ fontFamily: "'JetBrains Mono', monospace", color: e.c, marginRight: 8 }}>{e.time}</span><span style={{ color: C.gray2 }}>{e.l}</span></div>
                  ))}
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t("acfControl.dashAtRisk")}</div>
                  <div style={{ fontSize: 12, color: C.amber, marginBottom: 6 }}>{t("acfControl.dashPricingDrift")}</div>
                  <div style={{ fontSize: 12, color: C.amber, marginBottom: 6 }}>{t("acfControl.dashInventoryLow")}</div>
                  <div style={{ fontSize: 12, color: C.gray, marginBottom: 12 }}>{t("acfControl.dashNoCritical")}</div>
                  <button style={{ width: "100%", background: "rgba(239,68,68,.06)", border: `1px solid rgba(239,68,68,.2)`, color: C.red, padding: 8, borderRadius: 8, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer" }}>{t("acfControl.dashSuspendAll")}</button>
                </div>
              </div>
            )}
            {activeTab === "ops" && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t("acfControl.dashOpsTitle")}</h3>
                <p style={{ fontSize: 14, color: C.gray2, maxWidth: 400, margin: "0 auto 20px" }}>{t("acfControl.dashOpsDesc")}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, maxWidth: 500, margin: "0 auto" }}>
                  <KPIMini label={t("acfControl.kpiMargin")} value="32.1" unit="%" trend="up" />
                  <KPIMini label={t("acfControl.kpiEscalations")} value="3" trend="down" />
                  <KPIMini label={t("acfControl.kpiOverrides")} value="1" trend="down" />
                  <KPIMini label={t("acfControl.kpiIncidents")} value="0" trend="down" />
                </div>
              </div>
            )}
            {activeTab === "consultant" && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🗺</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t("acfControl.dashConsultantTitle")}</h3>
                <p style={{ fontSize: 14, color: C.gray2, maxWidth: 400, margin: "0 auto 20px" }}>{t("acfControl.dashConsultantDesc")}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  {[t("acfControl.dashMultiClient"), t("acfControl.dashTemplates"), t("acfControl.dashBenchmark"), t("acfControl.dashPdfExport")].map(item => (
                    <span key={item} style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 11, padding: "6px 14px", borderRadius: 8 }}>{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ━━━ RISK vs COST — THE REAL ROI SECTION ━━━ */}
      <section id="risks" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>{t("acfControl.riskLabel")}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
              {t("acfControl.riskTitle")}<span style={{ color: C.red }}>{t("acfControl.riskTitleRed")}</span>{t("acfControl.riskTitlePost")}
            </h2>
            <p style={{ fontSize: 16, color: C.gray2, maxWidth: 600, margin: "0 auto" }}>
              {t("acfControl.riskDescPre")}<strong style={{ color: "#fff" }}>{t("acfControl.riskDescBold")}</strong>{t("acfControl.riskDescPost")}
            </p>
          </div>

          {/* Risk Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 48 }}>
            {/* AI Act */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚖️</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t("acfControl.riskAiAct")}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                <AnimatedCounter end={35} prefix="€" suffix="M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                {t("acfControl.riskAiActDescPre")}<strong style={{ color: "#fff" }}>{t("acfControl.riskAiActDescBold")}</strong>{t("acfControl.riskAiActDescPost")}
              </p>
            </div>

            {/* GDPR */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t("acfControl.riskGdpr")}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                <AnimatedCounter end={20} prefix="€" suffix="M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                {t("acfControl.riskGdprDescPre")}<strong style={{ color: "#fff" }}>{t("acfControl.riskGdprDescBold")}</strong>{t("acfControl.riskGdprDescPost")}
              </p>
            </div>

            {/* Drift Cost */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📉</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t("acfControl.riskDrift")}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                €<AnimatedCounter end={2} suffix=".4M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                {t("acfControl.riskDriftDescPre")}<strong style={{ color: "#fff" }}>{t("acfControl.riskDriftDescBold")}</strong>{t("acfControl.riskDriftDescPost")}
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 32, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t("acfControl.riskWithout")}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: C.red }}>€57.4M</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{t("acfControl.riskMaxExposure")}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: C.gold }}>vs</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.green, letterSpacing: ".1em", marginBottom: 8 }}>{t("acfControl.riskWith")}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: C.green }}>→ 0.01%</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{t("acfControl.riskFraction")}</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 32 }}>
            {[
              { stat: "73%", desc: t("acfControl.riskStat1") },
              { stat: "89%", desc: t("acfControl.riskStat2") },
              { stat: "×12", desc: t("acfControl.riskStat3") },
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
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>{t("acfControl.planLabel")}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
            {t("acfControl.planTitle")}
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 550, margin: "0 auto 48px" }}>
            {t("acfControl.planDesc")}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[
              {
                tier: t("acfControl.planEssential"), desc: t("acfControl.planEssentialDesc"), icon: "🛡",
                features: [t("acfControl.planFeatSovereignty"), t("acfControl.planFeatRegistry"), t("acfControl.planFeatMatrix"), t("acfControl.planFeatAlerts"), t("acfControl.planFeatExports")],
              },
              {
                tier: t("acfControl.planProfessional"), desc: t("acfControl.planProfessionalDesc"), icon: "⚡", recommended: true,
                features: [t("acfControl.planFeatEssentialPlus"), t("acfControl.planFeatDrift"), t("acfControl.planFeatIncident"), t("acfControl.planFeatKill3"), t("acfControl.planFeatConstitution"), t("acfControl.planFeatSmartAlerts"), t("acfControl.planFeatConsultantAccess")],
              },
              {
                tier: t("acfControl.planEnterprise"), desc: t("acfControl.planEnterpriseDesc"), icon: "🏛",
                features: [t("acfControl.planFeatProfessionalPlus"), t("acfControl.planFeatMultiSite"), t("acfControl.planFeatApi"), t("acfControl.planFeatDda"), t("acfControl.planFeatAuditTrail"), t("acfControl.planFeatWhiteLabel"), t("acfControl.planFeatSla")],
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
                  }}>{t("acfControl.planRecommended")}</div>
                )}
                <div style={{ fontSize: 28, marginBottom: 8 }}>{plan.icon}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: plan.recommended ? C.gold : C.gray, letterSpacing: ".14em", marginBottom: 4 }}>{plan.tier}</div>
                <div style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{plan.desc}</div>

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800,
                  color: plan.recommended ? C.gold : "#fff", marginBottom: 20,
                }}>
                  {t("acfControl.planPrice")}
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
                }}>{plan.recommended ? t("acfControl.planRequestDemo") : t("acfControl.planContactUs")}</button>
              </div>
            ))}
          </div>

          {/* Partner */}
          <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{t("acfControl.partnerLabel")}</div>
            <p style={{ fontSize: 13, color: C.gray2, marginBottom: 12 }}>{t("acfControl.partnerDesc")}</p>
            <button style={{
              background: "transparent", border: `1px solid ${C.goldBorder}`, color: C.gold,
              padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .3s",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = C.goldDim; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}
            >{t("acfControl.partnerApply")}</button>
          </div>
        </div>
      </section>

      {/* ━━━ STATS BAR ━━━ */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
          {[
            { val: 60, suf: "s", label: t("acfControl.statKillSwitch") },
            { val: 18, suf: "", label: t("acfControl.statKpis") },
            { val: 7, suf: "", label: t("acfControl.statControls") },
            { val: 45, suf: "min", label: t("acfControl.statOperational") },
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
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
            {t("acfControl.ctaTitle1")}<br />
            <span style={{ color: C.gold }}>{t("acfControl.ctaTitle2")}</span>
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            {t("acfControl.ctaDescPre")}<strong style={{ color: "#fff" }}>{t("acfControl.ctaDescBold")}</strong>
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "16px 36px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>{t("acfControl.ctaRequestDemo")}</button>
            <button style={{
              background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
              padding: "16px 36px", borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
            >{t("acfControl.ctaCalcScore")}</button>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer style={{ padding: "32px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: C.navy1 }}>ACF</div>
            <span style={{ fontSize: 13, color: C.gray }}>{t("acfControl.footerRights")}</span>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.gray }}>
            <span>{t("acfControl.footerCopyright")}</span>
            <a href="#" style={{ color: C.gray, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray}>{t("acfControl.footerPrivacy")}</a>
            <a href="#" style={{ color: C.gray, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray}>{t("acfControl.footerTerms")}</a>
            <a href="#" style={{ color: C.gray, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray}>{t("acfControl.footerContact")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
