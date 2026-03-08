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
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>ABOUT</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>← Home</a>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 50, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", width: 600, height: 600, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(201,168,76,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div className="fade-up"><Badge>ABOUT</Badge></div>
          <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 46, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 16, letterSpacing: "-1px" }}>
            Who We <span style={{ color: C.gold }}>Are</span>
          </h1>
          <p className="fade-up-d3" style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            The team behind ACF Score® and the Agentic Commerce Framework® methodology.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Timeline</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>The <span style={{ color: C.gold }}>ACF®</span> Story</h2>
            <GoldBar />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { year: "2000–2024", event: "25 years of e-commerce and digital transformation experience — observing the loss of control linked to automation", color: C.gray },
              { year: "Early 2025", event: "Emergence of autonomous AI agents in commerce — observation of the total absence of governance framework", color: C.blue },
              { year: "Q1 2025", event: "Creation of the Agentic Commerce Framework® — 4-layer governance methodology", color: C.green },
              { year: "Q2 2025", event: "Launch of ACF Score® — free online agentic governance diagnostic", color: C.gold },
              { year: "Q3 2025", event: "Design of ACF Control (dashboard) and ACF TRUST™ / ACF CERTIFIED certification program", color: C.amber },
              { year: "2026", event: "ACF Standard — complete ecosystem platform. Partners Program. Academy. Research Blog.", color: C.gold },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 90, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: t.color, paddingTop: 14, textAlign: "right" }}>{t.year}</div>
                <div style={{ width: 12, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 14, flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, border: `2px solid ${C.navy1}`, flexShrink: 0 }} />
                  {i < 5 && <div style={{ width: 1, flex: 1, background: C.bd1, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, padding: "10px 16px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 10, fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>{t.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 56, alignItems: "start" }}>
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: 32, textAlign: "center", position: "sticky", top: 100 }}>
            <div style={{ width: 140, height: 140, borderRadius: "50%", background: C.goldDim, border: `3px solid ${C.goldBorder}`, margin: "0 auto 20px", overflow: "hidden", position: "relative" }}>
              <img src="/vincent-dorange.png" alt="Vincent DORANGE" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -45%)", width: "110%", height: "110%", objectFit: "cover" }} />
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Vincent DORANGE</h2>
            <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 4 }}>Founder · Agentic Governance</p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "1px", marginBottom: 20 }}>AI CONSULTING</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 24 }}>
              {["ACF® Creator", "AI Governance", "E-commerce Expert"].map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: C.gold, background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "4px 10px", borderRadius: 100, fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".05em" }}>{tag}</span>
              ))}
            </div>
            <a href="https://www.linkedin.com/in/vincent-dorange" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0077b5", border: "none", padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#fff", transition: "all .3s", width: "100%" }}
              className="gold-glow"
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
          <div>
            <SectionLabel>Founder</SectionLabel>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 24, textAlign: "center" }}>Creator of the Agentic Commerce Framework® <span style={{ color: C.gold }}>(ACF®)</span></h3>
            <GoldBar />
            <div style={{ fontSize: 15, color: C.gray2, lineHeight: 1.9 }}>
              <p style={{ marginBottom: 20 }}>Vincent DORANGE has been working in e-commerce and digital strategy for over 25 years. Over these two decades, he has observed from the inside the profound transformations of digital commerce: the rise of platforms, the centralization of decisions in algorithms, and the growing dependence of companies on technological infrastructures.</p>
              <p style={{ marginBottom: 20 }}>His work has progressively focused on a question that has become central in the digital economy: <strong style={{ color: "#fff" }}>who really holds decision-making power in organizations driven by data and automated systems?</strong></p>
              <p style={{ marginBottom: 20 }}>Facing the emergence of autonomous artificial intelligence agents, he developed in 2025 the <strong style={{ color: C.gold }}>Agentic Commerce Framework® (ACF®), a methodological framework designed to help organizations govern the use of AI agents and preserve their decision-making sovereignty in the agentic economy.</strong></p>
              <p>Based in France, he works with SMEs, mid-cap companies, and large corporations on issues of digital transformation, AI governance, and the evolution of business models in the era of autonomous systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Education & Training</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Academic <span style={{ color: C.gold }}>Background</span></h2>
            <GoldBar />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 32 }}>
            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>EDUCATION</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "MIT Sloan School of Management",
                  "Columbia Business School",
                  "Michael Smurfit Graduate School of Business",
                  "Kedge Business School"
                ].map(school => (
                  <div key={school} style={{ padding: "12px 14px", background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 8, fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>{school}</div>
                ))}
              </div>
            </div>

            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>Executive Education & Research</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "HEC Paris",
                  "INSEAD",
                  "École Polytechnique",
                  "CentraleSupélec",
                  "Wharton School",
                  "Oxford Saïd Business School",
                  "Stanford University",
                  "Harvard University"
                ].map(school => (
                  <div key={school} style={{ padding: "10px 12px", background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 8, fontSize: 12, color: C.gray2, lineHeight: 1.4 }}>{school}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Professional Membership</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}><span style={{ color: C.gold }}>Affiliations</span></h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              "AI Accelerator Institute",
              "Responsible Artificial Intelligence Institute",
              "Project Management Institute",
              "Harvard Leaders Excellence"
            ].map(affiliation => (
              <div key={affiliation} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: "18px 14px", textAlign: "center", fontSize: 12, color: C.gray2, lineHeight: 1.5, transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; }}>
                {affiliation}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CONSULTING */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Company</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>AI <span style={{ color: C.gold }}>CONSULTING</span></h2>
            <GoldBar />
          </div>
          
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 40, marginBottom: 32 }}>
            <div style={{ fontSize: 15, color: C.gray2, lineHeight: 1.9, textAlign: "center" }}>
              <p style={{ marginBottom: 20 }}>AI CONSULTING is a consulting firm specialized in artificial intelligence, particularly in automation and AI agents with a focus on <strong style={{ color: "#fff" }}>agentic governance</strong>.</p>
              <p style={{ marginBottom: 20 }}>We support organizations in their transition towards <strong style={{ color: C.gold }}>sovereign and controlled use of autonomous AI agents</strong>.</p>
              <p>Our approach is pragmatic and operational: we don't theorize about AI, we structure your capacity to govern it. Our interventions are essentially based on the <strong style={{ color: C.gold }}>ACF® methodology</strong>.</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "🎯", title: "Sovereignty First", desc: "Your strategic control over automated decisions is non-negotiable.", color: C.gold },
              { icon: "⚡", title: "Operational Pragmatism", desc: "Actionable recommendations within 30 days, not abstract theory.", color: C.green },
              { icon: "🔍", title: "Total Transparency", desc: "Documented methodology, explainable scoring, verifiable results.", color: C.blue },
            ].map(v => (
              <div key={v.title} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28, transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${v.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 12 }}>Let's Work <span style={{ color: C.gold }}>Together</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.7 }}>Whether you want a diagnostic, support, or a partnership, let's talk.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/en/contact" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Get in Touch →</a>
            <a href="https://www.acf-score.com/calculator" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, display: "inline-block", transition: "all .3s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Get Your Score</a>
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
              { title: "Framework", links: [{ label: "The Standard", href: "/en/standard" },{ label: "Blog", href: "/en/blog" },{ label: "ACF Certification", href: "/en/acf-certification" }] },
              { title: "Products", links: [{ label: "ACF Score®", href: "/en/acf-score" },{ label: "ACF Control", href: "/en/acf-control" },{ label: "Academy", href: "/en/acf-certification#academy" }] },
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
