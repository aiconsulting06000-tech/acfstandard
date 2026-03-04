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
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>← Home</a>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 50, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", width: 600, height: 600, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(201,168,76,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div className="fade-up"><Badge>À PROPOS</Badge></div>
          <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 46, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 16, letterSpacing: "-1px" }}>
            Qui sommes-<span style={{ color: C.gold }}>nous</span> ?
          </h1>
          <p className="fade-up-d3" style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            L'équipe derrière le Score ACF® et la méthodologie Agentic Commerce Framework®.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "300px 1fr", gap: 56, alignItems: "start" }}>
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: 36, textAlign: "center", position: "sticky", top: 100 }}>
            <div style={{ width: 110, height: 110, borderRadius: 24, background: C.goldDim, border: `2px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.gold }}>VD</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Vincent DORANGE</h2>
            <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 20 }}>Fondateur · Gouvernance Agentique<br />AI CONSULTING</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
              {["ACF® Creator", "AI Governance", "E-commerce Expert", "Auteur"].map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: C.gold, background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "4px 10px", borderRadius: 100, fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".05em" }}>{tag}</span>
              ))}
            </div>
            <a href="https://www.linkedin.com/in/vincentdorange/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.navy1, border: `1px solid ${C.bd1}`, padding: "10px 20px", borderRadius: 10, fontSize: 13, color: C.gray2, transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.color = C.gray2; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
          <div>
            <SectionLabel>Fondateur</SectionLabel>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: "center" }}>Le créateur de l'<span style={{ color: C.gold }}>ACF®</span></h3>
            <div style={{ fontSize: 15, color: C.gray2, lineHeight: 1.85 }}>
              <p style={{ marginBottom: 20 }}>
                Vincent DORANGE est un expert en e-commerce, en transformation digitale et gouvernance de l'intelligence artificielle. Fort de <strong style={{ color: "#fff" }}>plus de 25 ans d'expérience</strong> dans le e-commerce et la stratégie digitale, il a observé de nombreuses entreprises perdre le contrôle de leur activité face à l'automatisation croissante.
              </p>
              <p style={{ marginBottom: 20 }}>
                En 2025, face à l'émergence des agents IA autonomes, il crée l'<strong style={{ color: C.gold }}>Agentic Commerce Framework® (ACF®)</strong> : le premier cadre méthodologique structurant la gouvernance des organisations dans l'ère agentique.
              </p>
              <p style={{ marginBottom: 20 }}>
                Ce framework est aujourd'hui la base du Score ACF® et de l'accompagnement proposé par AI CONSULTING et ses partenaires. Il couvre les 4 couches essentielles de la gouvernance agentique : Gouvernance, Politique, Système et Supervision.
              </p>
              <p>
                Basé à <strong style={{ color: "#fff" }}>Nice, France</strong>, il intervient auprès de PME, ETI et grands groupes pour structurer leur transition vers une économie agentique maîtrisée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI CONSULTING */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>L'entreprise</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>AI <span style={{ color: C.gold }}>CONSULTING</span></h2>
            <GoldBar />
          </div>
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: "40px 44px", marginBottom: 32 }}>
            <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.85, marginBottom: 20 }}>
              AI CONSULTING est un cabinet de conseil spécialisé dans l'intelligence artificielle, notamment dans les automatisations et agents IA avec un focus sur la <strong style={{ color: "#fff" }}>gouvernance agentique</strong>.
            </p>
            <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.85, marginBottom: 20 }}>
              Nous accompagnons les organisations dans leur transition vers une <strong style={{ color: C.gold }}>utilisation souveraine et maîtrisée des agents IA autonomes</strong>.
            </p>
            <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.85 }}>
              Notre approche est pragmatique et opérationnelle : nous ne théorisons pas l'IA, nous structurons votre capacité à la gouverner. Nos interventions s'appuient essentiellement sur la méthodologie ACF®.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { icon: "🛡️", title: "Souveraineté d'abord", desc: "Votre contrôle stratégique sur les décisions automatisées est non-négociable.", color: C.gold },
              { icon: "⚡", title: "Pragmatisme opérationnel", desc: "Des recommandations actionnables dans les 30 jours, pas de théorie abstraite.", color: C.green },
              { icon: "🔍", title: "Transparence totale", desc: "Méthodologie documentée, scoring explicable, résultats vérifiables.", color: C.blue },
            ].map(v => (
              <div key={v.title} style={{ background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28, transition: "all .3s" }}
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

      {/* LEGAL INFO */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Mentions légales</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>Informations <span style={{ color: C.gold }}>juridiques</span></h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 700, margin: "0 auto" }}>
            {[
              { label: "Dénomination", value: "AI CONSULTING" },
              { label: "Forme juridique", value: "SAS" },
              { label: "Siège social", value: "38 Bis Bd Victor Hugo, 06000 Nice" },
              { label: "RCS Nice", value: "909116329" },
              { label: "N° TVA", value: "FR96909116329" },
              { label: "Directeur de publication", value: "Vincent DORANGE" },
              { label: "Hébergeur", value: "Vercel Inc., San Francisco, CA" },
              { label: "Contact", value: "Formulaire disponible sur le site" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "10px 0", borderBottom: `1px solid ${C.bd1}` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".1em", textTransform: "uppercase", minWidth: 130, flexShrink: 0 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: C.gray2 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Historique</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>L'histoire de l'<span style={{ color: C.gold }}>ACF®</span></h2>
            <GoldBar />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { year: "2000–2024", event: "25 ans d'expérience e-commerce et transformation digitale — observation des pertes de contrôle liées à l'automatisation", color: C.gray },
              { year: "Début 2025", event: "Émergence des agents IA autonomes dans le commerce — constat de l'absence totale de cadre de gouvernance", color: C.blue },
              { year: "Q1 2025", event: "Création de l'Agentic Commerce Framework® — méthodologie en 4 couches de gouvernance", color: C.green },
              { year: "Q2 2025", event: "Lancement du Score ACF® — diagnostic gratuit de gouvernance agentique en ligne", color: C.gold },
              { year: "Q3 2025", event: "Conception d'ACF Control (dashboard) et du programme de certification ACF TRUST™ / ACF CERTIFIED", color: C.amber },
              { year: "2026", event: "ACF Standard — plateforme complète de l'écosystème. Programme Partners. Academy. Blog de recherche.", color: C.gold },
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

      {/* CTA */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 12 }}>Travaillons <span style={{ color: C.gold }}>ensemble</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.7 }}>Que vous souhaitiez un diagnostic, un accompagnement ou un partenariat, parlons-en.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/en/contact" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Prendre contact →</a>
            <a href="https://www.acf-score.com/calculator" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, display: "inline-block", transition: "all .3s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>Voir le diagnostic</a>
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
