"use client";

import React from "react";

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", green: "#22c55e", blue: "#3b82f6",
  amber: "#f59e0b", purple: "#8b5cf6",
};

function GoldBar() { return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, margin: "0 auto 16px" }} />; }
function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>// {children}</div>;
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.1s}
        .fade-up-d2{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.25s}
        .fade-up-d3{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.45s}
        .gold-glow:hover{box-shadow:0 0 20px rgba(201,168,76,.2)}
        *{box-sizing:border-box;margin:0;padding:0}a{text-decoration:none;color:inherit}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/en/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>ABOUT</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/en/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>← Back to Standard</a>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 50, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", width: 600, height: 600, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(201,168,76,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div className="fade-up"><Badge>ABOUT ACF</Badge></div>
          <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 46, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 16, letterSpacing: "-1px" }}>
            Governing <span style={{ color: C.gold }}>AI autonomy</span><br />before it governs you
          </h1>
          <p className="fade-up-d3" style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
            The Agentic Commerce Framework® is the first governance standard designed specifically for organizations deploying autonomous AI agents.
          </p>
        </div>
      </section>

      {/* THE ORIGIN */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <SectionLabel>The Origin</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 16, textAlign: "center" }}>Why ACF<span style={{ color: C.gold }}>®</span> exists</h2>
            <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, margin: "0 auto 20px" }} />
            <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.8, marginBottom: 16 }}>
              In 2024, autonomous AI agents began making decisions that directly impact business outcomes — pricing, procurement, customer engagement, logistics. Yet no governance framework existed to structure their control.
            </p>
            <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.8, marginBottom: 16 }}>
              The Agentic Commerce Framework® was created to fill this critical gap: a structured methodology to ensure that organizations maintain sovereignty over their autonomous AI operations.
            </p>
            <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.8 }}>
              Not an AI tool. Not a software platform. A <strong style={{ color: "#fff" }}>governance standard</strong> — designed to be implemented across any industry, any scale, any AI stack.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { year: "2024", event: "Initial research on agentic governance gaps", color: C.gray },
              { year: "2024", event: "ACF® methodology development — 4 governance layers defined", color: C.blue },
              { year: "2025", event: "ACF Score® diagnostic tool launched — free governance assessment", color: C.green },
              { year: "2025", event: "ACF Control dashboard & certification program designed", color: C.gold },
              { year: "2026", event: "ACF Standard platform — full ecosystem live", color: C.amber },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 60, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: t.color, paddingTop: 2 }}>{t.year}</div>
                <div style={{ flex: 1, padding: "12px 16px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 10, fontSize: 14, color: C.gray2, lineHeight: 1.5, borderLeft: `3px solid ${t.color}` }}>{t.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>Founder</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Vincent <span style={{ color: C.gold }}>DORANGE</span></h2>
          <GoldBar />
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div style={{ width: 100, height: 100, borderRadius: 20, background: C.goldDim, border: `2px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 800, color: C.gold }}>VD</span>
            </div>
          </div>
          <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.8, maxWidth: 640, margin: "0 auto 24px" }}>
            Author of the Agentic Commerce Framework® and founder of AI CONSULTING, Vincent DORANGE is a specialist in AI governance, digital commerce strategy, and organizational sovereignty.
          </p>
          <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.8, maxWidth: 640, margin: "0 auto 32px" }}>
            With over 15 years of experience in digital transformation and e-commerce, he identified the critical governance gap emerging as AI agents began making autonomous decisions in business environments. ACF® is the result of this observation: a comprehensive framework to ensure that human control keeps pace with machine autonomy.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="https://www.linkedin.com/in/vincentdorange/" target="_blank" rel="noopener noreferrer" style={{ background: C.navy3, border: `1px solid ${C.bd1}`, padding: "12px 24px", borderRadius: 10, fontSize: 14, color: C.gray2, display: "inline-flex", alignItems: "center", gap: 8, transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.color = C.gray2; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
            <a href="/en/contact" style={{ background: C.navy3, border: `1px solid ${C.bd1}`, padding: "12px 24px", borderRadius: 10, fontSize: 14, color: C.gray2, display: "inline-flex", alignItems: "center", gap: 8, transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.color = C.gray2; }}>
              Contact →
            </a>
          </div>
        </div>
      </section>

      {/* AI CONSULTING */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Publisher</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>AI <span style={{ color: C.gold }}>CONSULTING</span></h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Publisher and operator of the Agentic Commerce Framework® ecosystem. Based in Nice, France.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { icon: "🏢", title: "Company", lines: ["AI CONSULTING", "38 Bis Bd Victor Hugo", "06000 Nice, France"] },
              { icon: "🏛️", title: "Legal", lines: ["RCS Nice : 909116329", "TVA : FR96909116329", "SASU"] },
              { icon: "🌐", title: "Ecosystem", lines: ["ACF Standard — Framework", "ACF Score® — Diagnostic", "ACF Control — Dashboard"] },
            ].map(card => (
              <div key={card.title} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{card.title}</div>
                {card.lines.map(l => (
                  <div key={l} style={{ fontSize: 14, color: C.gray2, lineHeight: 1.8 }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Mission</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Our <span style={{ color: C.gold }}>principles</span></h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, margin: "0 auto" }}>
            {[
              { num: "01", title: "Sovereignty First", desc: "Organizations must retain strategic control over their autonomous AI operations. No vendor lock-in, no black box.", color: C.gold },
              { num: "02", title: "Human Accountability", desc: "Every automated decision must trace back to a human-defined rule, a named sponsor, and an escalation path.", color: C.green },
              { num: "03", title: "Regulatory Alignment", desc: "Built to comply with the EU AI Act, GDPR, and sector-specific regulations from day one. Not retrofitted — by design.", color: C.blue },
              { num: "04", title: "Open Standard", desc: "The framework is designed to be implemented across any industry, any AI stack, any organizational scale. Universal governance.", color: C.amber },
            ].map(v => (
              <div key={v.num} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28, transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${v.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${v.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${v.color}15`, border: `1px solid ${v.color}40` }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: v.color }}>{v.num}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>{v.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 12 }}>Ready to govern <span style={{ color: C.gold }}>your AI agents</span>?</h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 28px" }}>Start with a free diagnostic. Get your ACF Score® in 10 minutes.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Get Your ACF Score® →</a>
            <a href="/en/contact" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, display: "inline-block", transition: "all .3s" }}
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
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 320 }}>The governance standard for organizations deploying autonomous AI agents.</p>
            </div>
            {[
              { title: "Framework", links: [{ label: "The Standard", href: "/en/" },{ label: "Methodology", href: "/en/#methodology" },{ label: "Research", href: "/en/#research" },{ label: "ACF Certification", href: "/en/acf-certification" }] },
              { title: "Products", links: [{ label: "ACF Score®", href: "/en/acf-score" },{ label: "ACF Control", href: "/en/acf-control" },{ label: "Certification", href: "/en/acf-certification" },{ label: "Academy", href: "/en/acf-certification#academy" }] },
              { title: "Organization", links: [{ label: "Partner Portal", href: "/en/acf-partners" },{ label: "About", href: "/en/about" },{ label: "Contact", href: "/en/contact" },{ label: "Legal", href: "/en/legal" }] },
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
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
