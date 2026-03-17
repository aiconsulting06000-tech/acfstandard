"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF CONTACT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", green: "#22c55e",
};

function GoldBar() { return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, margin: "0 auto 16px" }} />; }
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12 }}>// {children}</div>;
}
function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}

export default function ACFContactPage() {
  const locale = useLocale();
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif",
    background: C.navy3, border: `1px solid ${C.bd1}`, color: "#fff", outline: "none", transition: "border-color .3s",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.1s; }
        .fade-up-d2 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.25s; }
        .gold-glow:hover { box-shadow:0 0 20px rgba(201,168,76,.2); }
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        ::placeholder { color: ${C.gray}; opacity: 0.6; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href={`/${locale}/`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>CONTACT</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>← Home</a>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div className="fade-up"><Badge>GET IN TOUCH</Badge></div>
          <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, lineHeight: 1.1, marginTop: 24, marginBottom: 16, letterSpacing: "-1px" }}>
            Let's talk <span style={{ color: C.gold }}>governance</span>
          </h1>
          <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
            Whether you need an assessment, want to become a partner, or have questions about the framework — we're here.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "start" }}>

          {/* LEFT — FORM */}
          {!sent ? (
            <div style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 20, padding: 40 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Send us a message</h2>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 28 }}>We typically respond within 24 business hours.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>First Name <span style={{ color: "#ef4444" }}>*</span></label>
                  <input type="text" placeholder="Vincent" style={inputStyle} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>Last Name <span style={{ color: "#ef4444" }}>*</span></label>
                  <input type="text" placeholder="DORANGE" style={inputStyle} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>Email <span style={{ color: "#ef4444" }}>*</span></label>
                <input type="email" placeholder="you@company.com" style={inputStyle} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>Company</label>
                <input type="text" placeholder="Your organization" style={inputStyle} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>Subject <span style={{ color: "#ef4444" }}>*</span></label>
                <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1}>
                  <option value="" style={{ background: C.navy1 }}>Select a topic...</option>
                  <option value="assessment" style={{ background: C.navy1 }}>Request an Assessment</option>
                  <option value="partnership" style={{ background: C.navy1 }}>Partnership Inquiry</option>
                  <option value="certification" style={{ background: C.navy1 }}>Certification Question</option>
                  <option value="enterprise" style={{ background: C.navy1 }}>Enterprise / ACF Control</option>
                  <option value="media" style={{ background: C.navy1 }}>Press / Media</option>
                  <option value="other" style={{ background: C.navy1 }}>Other</option>
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>Message <span style={{ color: "#ef4444" }}>*</span></label>
                <textarea rows={5} placeholder="Tell us how we can help..." style={{ ...inputStyle, resize: "vertical" }} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
              </div>

              <button onClick={() => setSent(true)} className="gold-glow" style={{
                width: "100%", padding: 15, borderRadius: 10, border: "none", fontSize: 15, fontWeight: 700,
                cursor: "pointer", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, transition: "all .3s",
              }}>Send Message →</button>
            </div>
          ) : (
            <div style={{ background: C.navy3, border: `1px solid ${C.green}40`, borderRadius: 20, padding: 60, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Message Sent!</h3>
              <p style={{ fontSize: 15, color: C.gray2, maxWidth: 360, margin: "0 auto", lineHeight: 1.7 }}>
                Thank you for reaching out. Our team will get back to you within <strong style={{ color: "#fff" }}>24 business hours</strong>.
              </p>
            </div>
          )}

          {/* RIGHT — INFO */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Company card */}
            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>Organization</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>AI CONSULTING</h3>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 20 }}>Publisher of the Agentic Commerce Framework®</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ color: C.gold, fontSize: 16, marginTop: 1, flexShrink: 0 }}>📍</span>
                  <div>
                    <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>38 Bis Boulevard Victor Hugo</div>
                    <div style={{ fontSize: 13, color: C.gray }}>06000 Nice, France</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.gold, fontSize: 16, flexShrink: 0 }}>🏛️</span>
                  <div style={{ fontSize: 13, color: C.gray }}>RCS Nice : 909116329</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.gold, fontSize: 16, flexShrink: 0 }}>📋</span>
                  <div style={{ fontSize: 13, color: C.gray }}>TVA : FR96909116329</div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>Quick Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "📊", label: "Get your free ACF Score®", href: "https://www.acf-score.com/calculator" },
                  { icon: "🛡️", label: "View certification programs", href: `/${locale}/acf-certification` },
                  { icon: "🤝", label: "Become a partner", href: `/${locale}/acf-partners` },
                  { icon: "📖", label: "Read the standard", href: `/${locale}/` },
                ].map(a => (
                  <a key={a.label} href={a.href} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                    background: C.navy1, border: `1px solid ${C.bd1}`, borderRadius: 10,
                    fontSize: 14, color: C.gray2, transition: "all .2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.color = C.gray2; }}>
                    <span style={{ fontSize: 18 }}>{a.icon}</span>
                    {a.label}
                    <span style={{ marginLeft: "auto", color: C.gray, fontSize: 14 }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Founder */}
            <div style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>Created By</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800, color: C.gold }}>VD</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Vincent DORANGE</div>
                  <div style={{ fontSize: 13, color: C.gray }}>Founder & Author of ACF®</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
