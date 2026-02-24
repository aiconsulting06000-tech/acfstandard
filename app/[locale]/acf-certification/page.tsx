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

export default function ACFCertificationPage() {
  const [activeTrack, setActiveTrack] = useState("core");
  const navLinks = ["Trust", "Certified", "Academy", "Ecosystem"];

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
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
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF CERTIFICATION</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>GOVERNANCE STANDARD</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/en/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
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

      {/* ━━━ HERO ━━━ */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }} className="fade-up">
            <Badge>CERTIFICATION & ACADEMY</Badge>

            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 24, letterSpacing: "-1px" }}>
              <span style={{ color: "#fff" }}>Govern the Agents.</span><br />
              <span style={{ color: C.gold }}>Certify the Trust.</span>
            </h1>

            <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.7, marginBottom: 20, maxWidth: 620, margin: "0 auto 32px" }}>
              Autonomous agents are reshaping commerce. Pricing, inventory, advertising, fraud detection — decisions once made by humans are now executed by systems. The question is no longer <em>if</em>. The question is: <strong style={{ color: "#fff" }}>who governs them?</strong>
            </p>

            <p style={{ fontSize: 15, color: C.gray, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
              ACF is not an AI tool. It is a governance standard.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
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

          {/* Trust Levels */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              {
                level: "LEVEL 1", name: "Initiated", color: C.green, icon: "🟢",
                desc: "You have started your agentic journey.",
                items: ["ACF Score completed", "Decision mapping in place", "First governed agent deployed", "Constitution agentique defined", "Kill switch operational"],
                tagline: "You are aware.",
              },
              {
                level: "LEVEL 2", name: "Governed", color: C.amber, icon: "🟡",
                desc: "You operate agents under formal supervision.",
                items: ["Multiple agents deployed", "Explicit policies & escalation rules", "Dashboard monitoring active", "Human accountability assigned", "Quarterly governance reviews"],
                tagline: "You are in control.",
              },
              {
                level: "LEVEL 3", name: "Sovereign", color: C.blue, icon: "🔵",
                desc: "Agentic governance is embedded in your organization.",
                items: ["Enterprise-wide constitution", "Multi-agent coordination rules", "Audit trails & interruptibility proven", "Sovereignty score monitored monthly", "Executive ownership of decision policy"],
                tagline: "You own your autonomy.",
              },
            ].map(t => (
              <div key={t.name} style={{
                background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28,
                position: "relative", transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 20 }}>{t.icon}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: t.color, letterSpacing: ".14em" }}>{t.level}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>{t.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {t.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}>
                      <span style={{ color: t.color, fontSize: 11 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
                <div style={{
                  borderTop: `1px solid ${C.bd1}`, paddingTop: 12,
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: t.color,
                  fontStyle: "italic",
                }}>{t.tagline}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <p style={{ fontSize: 12, color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>
              Annual audit required to maintain certification. Certified organizations display the ACF TRUST™ badge on their digital touchpoints.
            </p>
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
            <p style={{ fontSize: 14, color: C.gray2, maxWidth: 500, margin: "0 auto" }}>
              When you see the ACF TRUST™ badge, you know:
            </p>
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
              <div key={g.label} style={{
                background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: "20px 16px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {g.icon}
                </div>
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
              {
                tier: "PRACTITIONER", name: "ACF Practitioner",
                desc: "For consultants, product leaders, architects.",
                abilities: ["Run ACF diagnostics", "Build decision maps", "Design governed agents", "Deploy ACF tools", "Create agentic constitutions"],
                requirements: ["ACF Academy Core Track", "Case study exam", "Constitution validation", "Ethics commitment"],
                tagline: "You operate on projects.",
                recommended: false,
              },
              {
                tier: "CONSULTANT", name: "ACF Consultant",
                desc: "For agencies and consulting firms.",
                abilities: ["Everything Practitioner +", "Certify client organizations", "Deliver ACF implementations", "Conduct governance audits", "Train internal teams", "Sell ACF Control"],
                requirements: ["Practitioner certification", "2 validated client cases", "Governance audit passed", "ACF committee review", "Annual license fee"],
                tagline: "You scale delivery.",
                recommended: true,
              },
              {
                tier: "PARTNER", name: "ACF Partner",
                desc: "For major firms and system integrators.",
                abilities: ["Everything Consultant +", "Deploy ACF at enterprise scale", "Certify across regions", "Co-develop sector frameworks", "Territory exclusivity", "Co-branding rights"],
                requirements: ["Consultant certification", "5+ certified implementations", "Dedicated ACF team", "Manual selection by ACF", "Annual partner fee"],
                tagline: "You shape the ecosystem.",
                recommended: false,
              },
            ].map(plan => (
              <div key={plan.tier} style={{
                background: plan.recommended ? C.navy2 : C.navy3,
                border: `1px solid ${plan.recommended ? C.goldBorder : C.bd1}`,
                borderRadius: 16, padding: 28, position: "relative",
              }}>
                {plan.recommended && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                    fontSize: 9, fontWeight: 800, padding: "4px 14px", borderRadius: 100, letterSpacing: ".08em",
                  }}>MOST POPULAR</div>
                )}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: plan.recommended ? C.gold : C.gray, letterSpacing: ".14em", marginBottom: 8 }}>{plan.tier}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{plan.desc}</p>

                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".1em", marginBottom: 8 }}>YOU CAN:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                  {plan.abilities.map(a => (
                    <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}>
                      <span style={{ color: plan.recommended ? C.gold : C.green, fontSize: 11 }}>✓</span> {a}
                    </div>
                  ))}
                </div>

                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", marginBottom: 8 }}>REQUIREMENTS:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                  {plan.requirements.map(r => (
                    <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray }}>
                      <span style={{ color: C.gray, fontSize: 10 }}>→</span> {r}
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: `1px solid ${C.bd1}`, paddingTop: 12, marginBottom: 16,
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600,
                  color: plan.recommended ? C.gold : C.gray2, fontStyle: "italic",
                }}>{plan.tagline}</div>

                <button className="gold-glow" style={{
                  width: "100%", padding: 12, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                  background: plan.recommended ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : C.navy2,
                  color: plan.recommended ? C.navy1 : C.gray2,
                  outline: plan.recommended ? "none" : `1px solid ${C.bd1}`,
                }}>{plan.recommended ? "Apply for Certification →" : "Learn More"}</button>
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
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              ACF <span style={{ color: C.gold }}>Academy</span>
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              ACF Academy doesn't train people to use AI.<br />
              <strong style={{ color: "#fff" }}>It trains them to govern autonomous systems.</strong>
            </p>
          </div>

          {/* Track Selector */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {[
              { key: "core", label: "Core Track (101–103)", sub: "→ Practitioner" },
              { key: "pro", label: "Professional Track (201–203)", sub: "→ Consultant" },
              { key: "exec", label: "Executive Program", sub: "→ ACF Trust readiness" },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTrack(t.key)} style={{
                padding: "12px 20px", borderRadius: 10, border: "none", cursor: "pointer", transition: "all .3s",
                background: activeTrack === t.key ? C.goldDim : "transparent",
                borderWidth: 1, borderStyle: "solid",
                borderColor: activeTrack === t.key ? C.goldBorder : C.bd1,
              }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: activeTrack === t.key ? "#fff" : C.gray2, marginBottom: 2 }}>{t.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: activeTrack === t.key ? C.gold : C.gray, letterSpacing: ".08em" }}>{t.sub}</div>
              </button>
            ))}
          </div>

          {/* Core Track */}
          {activeTrack === "core" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {[
                {
                  code: "ACF-101", title: "Foundations",
                  topics: ["Agentic commerce explained", "Decision vs execution", "Non-delegable zones", "4 governance layers", "Maturity levels", "Reading an ACF Score"],
                  outcome: "You can read an agentic organization.",
                },
                {
                  code: "ACF-102", title: "Operational Toolkit",
                  topics: ["Decision mapping", "Impact/Frequency/Irreversibility matrix", "Agentic Constitution design", "Agent profiling", "Drift dashboard setup"],
                  outcome: "You can deploy a Level 2 governed agent.",
                },
                {
                  code: "ACF-103", title: "Supervision & Drift",
                  topics: ["Weak signal detection", "Slow drift patterns", "Agent conflicts", "Kill switch protocols", "Incident classification & response"],
                  outcome: "You can govern a living autonomous system.",
                },
              ].map(m => (
                <div key={m.code} style={{
                  background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24,
                  transition: "all .3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{m.code}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{m.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                    {m.topics.map(t => (
                      <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray2 }}>
                        <span style={{ color: C.gold, fontSize: 10 }}>▸</span> {t}
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 10, fontSize: 12, color: C.green, fontWeight: 600 }}>
                    🎯 {m.outcome}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Professional Track */}
          {activeTrack === "pro" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {[
                {
                  code: "ACF-201", title: "Client Deployment",
                  topics: ["Running ACF workshops", "Overcoming human resistance", "ACF Control implementation", "Building Trust certification path", "Client governance roadmap"],
                  outcome: "You can deliver ACF for clients.",
                },
                {
                  code: "ACF-202", title: "Audit & Certification",
                  topics: ["ACF Trust audit methodology", "Evidence requirements", "Advanced scoring", "Audit report writing", "Non-compliance management"],
                  outcome: "You can certify organizations.",
                },
                {
                  code: "ACF-203", title: "Complex Cases",
                  topics: ["Multi-agent architectures", "Multi-country deployments", "Business conflict resolution", "Major incident simulation", "Enterprise-scale governance"],
                  outcome: "You can handle enterprise complexity.",
                },
              ].map(m => (
                <div key={m.code} style={{
                  background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24,
                  transition: "all .3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{m.code}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{m.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                    {m.topics.map(t => (
                      <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray2 }}>
                        <span style={{ color: C.gold, fontSize: 10 }}>▸</span> {t}
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 10, fontSize: 12, color: C.green, fontWeight: 600 }}>
                    🎯 {m.outcome}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Executive Program */}
          {activeTrack === "exec" && (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div style={{
                background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 36,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em" }}>EXECUTIVE PROGRAM</div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>For CEOs, COMEX & Board Members</h3>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.7, marginBottom: 24 }}>
                  2 intensive days. Not a course — a transformation. Leaders leave with a signed Agentic Constitution, a 90-day governance roadmap, and the clarity to own their autonomous future.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {["Agentic strategy", "Organizational sovereignty", "Risk & personal responsibility", "Governance at scale", "Live incident simulation", "ACF Control walkthrough"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}>
                      <span style={{ color: C.gold, fontSize: 10 }}>▸</span> {t}
                    </div>
                  ))}
                </div>

                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", marginBottom: 12 }}>DELIVERABLES:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {["Signed Constitution", "90-day Roadmap", "Named Sponsor", "ACF TRUST Readiness"].map(d => (
                    <span key={d} style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 11, padding: "6px 14px", borderRadius: 8 }}>{d}</span>
                  ))}
                </div>

                <p style={{ fontSize: 13, color: C.gray, fontStyle: "italic", marginBottom: 20 }}>
                  No certification here. Just one thing: they leave responsible.
                </p>

                <button className="gold-glow" style={{
                  width: "100%", padding: 14, borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, transition: "all .3s",
                }}>Request Executive Program →</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ ECOSYSTEM ━━━ */}
      <section id="ecosystem" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>Closed-Loop System</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
            The ACF <span style={{ color: C.gold }}>Ecosystem</span>
          </h2>
          <GoldBar />
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Every piece feeds the next. A system, not a product.
          </p>

          {/* Visual Ecosystem */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600, margin: "0 auto" }}>
            {[
              { step: "01", label: "ACF Score", desc: "Free diagnostic — assess your sovereignty", color: C.green, link: "/en/acf-score" },
              { step: "02", label: "ACF Academy", desc: "Train teams to govern autonomous systems", color: C.gold, link: "#academy" },
              { step: "03", label: "ACF Control", desc: "Governance platform — operate in real time", color: C.amber, link: "/en/acf-control" },
              { step: "04", label: "ACF TRUST™", desc: "Public label — prove it to customers", color: C.blue, link: "#trust" },
              { step: "05", label: "ACF CERTIFIED", desc: "Partners deploy & audit organizations", color: C.gold, link: "#certified" },
            ].map((s, i) => (
              <div key={s.step}>
                <a href={s.link} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                  background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, transition: "all .3s", textDecoration: "none",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${s.color}15`, border: `1px solid ${s.color}40`, flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: s.color }}>{s.step}</span>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{s.desc}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: C.gray, fontSize: 16 }}>→</span>
                </a>
                {i < 4 && (
                  <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
                    <span style={{ color: C.gray, fontSize: 14 }}>↓</span>
                  </div>
                )}
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
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20 }}>
            Why this <span style={{ color: C.gold }}>matters</span>
          </h2>
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
          <p style={{ fontSize: 16, color: C.gray2 }}>
            You don't need more AI. You need <strong style={{ color: C.gold }}>decision sovereignty.</strong>
          </p>
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
            Get started.<br />
            <span style={{ color: C.gold }}>Build trust.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            Whether you're an enterprise proving governance or a consultant building the future of agentic commerce — there's a path for you.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>Get ACF TRUST™ Label →</button>
            <button style={{
              background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
              padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
            >Start the Academy</button>
            <button style={{
              background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
              padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
            >Become a Partner</button>
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
