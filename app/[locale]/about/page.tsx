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

      {/* FOUNDER */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "320px 1fr", gap: 56, alignItems: "start" }}>
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: 36, textAlign: "center", position: "sticky", top: 100 }}>
            <div style={{ width: 110, height: 110, borderRadius: 24, background: C.goldDim, border: `2px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.gold }}>VD</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Vincent DORANGE</h2>
            <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 4 }}>Founder · Agentic Governance</p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: "1px", marginBottom: 20 }}>AI CONSULTING</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 24 }}>
              {["ACF® Creator", "AI Governance", "E-commerce Expert"].map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: C.gold, background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "4px 10px", borderRadius: 100, fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".05em" }}>{tag}</span>
              ))}
            </div>
            <a href="https://www.linkedin.com/in/vincent-dorange" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0077b5", border: "none", padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#fff", transition: "all .3s", marginBottom: 12, width: "100%" }}
              className="gold-glow"
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              Connect on LinkedIn
            </a>
          </div>
          <div>
            <SectionLabel>Founder Bio</SectionLabel>
            <GoldBar />
            <div style={{ fontSize: 15, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>
              <p style={{ marginBottom: 20 }}>Vincent DORANGE has been working in e-commerce and digital strategy for over 25 years, at a time when online commerce was still in its infancy. Over these two decades, he has seen companies gain performance through platforms and algorithms... while gradually losing control of their own operations.</p>
              <p style={{ marginBottom: 20 }}>This field experience led him to focus on a question that has become central: who really decides in the digital economy?</p>
              <p style={{ marginBottom: 20 }}>A graduate of MIT Sloan School of Management and Columbia Business School in Digital Business, as well as a Master of Business in Management Consulting from the Michael Smurfit Graduate School of Business, he combines operational experience in digital commerce with international training in strategy, platforms, and organizational transformation.</p>
              <p style={{ marginBottom: 20 }}>In 2025, facing the emergence of autonomous artificial intelligence agents, he created the Agentic Commerce Framework® (ACF®), a methodological framework designed to help organizations govern the use of AI agents and preserve their decision-making sovereignty.</p>
              <p style={{ marginBottom: 20 }}>For several years, he has also pursued research and continuing education work with leading academic institutions and international organizations in the fields of strategy, technology, and artificial intelligence.</p>
              <p>He currently works with SMEs, mid-cap companies, and large corporations to help them understand and structure their transition to a controlled agentic economy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Education & Training</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Academic <span style={{ color: C.gold }}>Background</span></h2>
            <GoldBar />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Main Education */}
            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Education</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { school: "MIT Sloan School of Management", icon: "🎓" },
                  { school: "Columbia Business School", icon: "🎓" },
                  { school: "Michael Smurfit Graduate School of Business", icon: "🎓" },
                  { school: "Kedge Business School", icon: "🎓" },
                ].map(item => (
                  <div key={item.school} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px", background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 10 }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6, fontWeight: 500 }}>{item.school}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Education */}
            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Executive Education & Research</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { school: "HEC Paris", icon: "📚" },
                  { school: "INSEAD", icon: "📚" },
                  { school: "École Polytechnique", icon: "📚" },
                  { school: "CentraleSupélec", icon: "📚" },
                  { school: "Wharton School", icon: "📚" },
                  { school: "Oxford Saïd Business School", icon: "📚" },
                  { school: "Stanford University", icon: "📚" },
                  { school: "Harvard University", icon: "📚" },
                ].map(item => (
                  <div key={item.school} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 8 }}>
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <div style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>{item.school}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Affiliations */}
          <div style={{ marginTop: 32, background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 32 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>Professional Affiliations</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                "AI Accelerator Institute",
                "Responsible Artificial Intelligence Institute",
                "Project Management Institute",
                "Harvard Leaders Excellence"
              ].map(affiliation => (
                <div key={affiliation} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 10, padding: "16px 12px", textAlign: "center", fontSize: 12, color: C.gray2, lineHeight: 1.5 }}>
                  {affiliation}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
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
