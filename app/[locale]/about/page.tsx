"use client";

import React from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";

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

const ui = {
  en: {
    navSubtext: "ABOUT",
    navHome: "← Home",
    navCta: "Get Your Score →",
    heroBadge: "ABOUT",
    heroTitle1: "Who We ",
    heroTitle2: "Are",
    heroDesc: "The team behind ACF Score® and the Agentic Commerce Framework® methodology.",
    timelineLabel: "Timeline",
    timelineTitle1: "The ",
    timelineTitle2: "ACF®",
    timelineTitle3: " Story",
    timeline: [
      { year: "2000–2024", event: "25 years of e-commerce and digital transformation experience — observing the loss of control linked to automation" },
      { year: "Early 2025", event: "Emergence of autonomous AI agents in commerce — observation of the total absence of governance framework" },
      { year: "Q1 2025", event: "Creation of the Agentic Commerce Framework® — 4-layer governance methodology" },
      { year: "Q2 2025", event: "Launch of ACF Score® — free online agentic governance diagnostic" },
      { year: "Q3 2025", event: "Design of ACF Control (dashboard) and ACF TRUST™ / ACF CERTIFIED certification program" },
      { year: "2026", event: "ACF Standard — complete ecosystem platform. Partners Program. Academy. Research Blog." },
    ],
    founderLabel: "Founder",
    founderTitle1: "Creator of the Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Founder · Agentic Governance",
    founderTags: ["ACF® Creator", "AI Governance", "E-commerce Expert"],
    founderP1: "Vincent DORANGE has been working in e-commerce and digital strategy for over 25 years. Over these two decades, he has observed from the inside the profound transformations of digital commerce: the rise of platforms, the centralization of decisions in algorithms, and the growing dependence of companies on technological infrastructures.",
    founderP2strong: "who really holds decision-making power in organizations driven by data and automated systems?",
    founderP2: "His work has progressively focused on a question that has become central in the digital economy: ",
    founderP3pre: "Facing the emergence of autonomous artificial intelligence agents, he developed in 2025 the ",
    founderP3strong: "Agentic Commerce Framework® (ACF®), a methodological framework designed to help organizations govern the use of AI agents and preserve their decision-making sovereignty in the agentic economy.",
    founderP4: "Based in France, he works with SMEs, mid-cap companies, and large corporations on issues of digital transformation, AI governance, and the evolution of business models in the era of autonomous systems.",
    educationLabel: "Education & Training",
    educationTitle1: "Academic ",
    educationTitle2: "Background",
    educationHeading: "EDUCATION",
    execEducationHeading: "Executive Education & Research",
    membershipLabel: "Professional Membership",
    membershipTitle: "Affiliations",
    companyLabel: "Company",
    companyP1: "AI CONSULTING is a consulting firm specialized in artificial intelligence, particularly in automation and AI agents with a focus on ",
    companyP1strong: "agentic governance",
    companyP2pre: "We support organizations in their transition towards ",
    companyP2strong: "sovereign and controlled use of autonomous AI agents",
    companyP3pre: "Our approach is pragmatic and operational: we don't theorize about AI, we structure your capacity to govern it. Our interventions are essentially based on the ",
    companyP3strong: "ACF® methodology",
    values: [
      { icon: "🎯", title: "Sovereignty First", desc: "Your strategic control over automated decisions is non-negotiable." },
      { icon: "⚡", title: "Operational Pragmatism", desc: "Actionable recommendations within 30 days, not abstract theory." },
      { icon: "🔍", title: "Total Transparency", desc: "Documented methodology, explainable scoring, verifiable results." },
    ],
    ctaTitle1: "Let's Work ",
    ctaTitle2: "Together",
    ctaDesc: "Whether you want a diagnostic, support, or a partnership, let's talk.",
    ctaBtn1: "Get in Touch →",
    ctaBtn2: "Get Your Score",
  },
  fr: {
    navSubtext: "À PROPOS",
    navHome: "← Accueil",
    navCta: "Votre Score →",
    heroBadge: "À PROPOS",
    heroTitle1: "Qui nous ",
    heroTitle2: "sommes",
    heroDesc: "L'équipe derrière ACF Score® et la méthodologie Agentic Commerce Framework®.",
    timelineLabel: "Chronologie",
    timelineTitle1: "L'histoire ",
    timelineTitle2: "ACF®",
    timelineTitle3: "",
    timeline: [
      { year: "2000–2024", event: "25 ans d'expérience en e-commerce et transformation digitale — observation de la perte de contrôle liée à l'automatisation" },
      { year: "Début 2025", event: "Émergence des agents IA autonomes dans le commerce — constat de l'absence totale de cadre de gouvernance" },
      { year: "T1 2025", event: "Création de l'Agentic Commerce Framework® — méthodologie de gouvernance à 4 couches" },
      { year: "T2 2025", event: "Lancement d'ACF Score® — diagnostic de gouvernance agentique en ligne gratuit" },
      { year: "T3 2025", event: "Conception d'ACF Control (tableau de bord) et du programme de certification ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — plateforme écosystème complète. Programme Partenaires. Academy. Blog Recherche." },
    ],
    founderLabel: "Fondateur",
    founderTitle1: "Créateur de l'Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Fondateur · Gouvernance agentique",
    founderTags: ["Créateur ACF®", "Gouvernance IA", "Expert E-commerce"],
    founderP1: "Vincent DORANGE travaille dans le e-commerce et la stratégie digitale depuis plus de 25 ans. Au cours de ces deux décennies, il a observé de l'intérieur les transformations profondes du commerce digital : la montée en puissance des plateformes, la centralisation des décisions dans les algorithmes et la dépendance croissante des entreprises aux infrastructures technologiques.",
    founderP2strong: "qui détient réellement le pouvoir décisionnel dans les organisations pilotées par les données et les systèmes automatisés ?",
    founderP2: "Son travail s'est progressivement concentré sur une question devenue centrale dans l'économie numérique : ",
    founderP3pre: "Face à l'émergence des agents d'intelligence artificielle autonomes, il a développé en 2025 l'",
    founderP3strong: "Agentic Commerce Framework® (ACF®), un cadre méthodologique conçu pour aider les organisations à gouverner l'utilisation des agents IA et préserver leur souveraineté décisionnelle dans l'économie agentique.",
    founderP4: "Basé en France, il accompagne PME, ETI et grandes entreprises sur les enjeux de transformation digitale, de gouvernance IA et d'évolution des modèles d'affaires à l'ère des systèmes autonomes.",
    educationLabel: "Formation & Parcours",
    educationTitle1: "Parcours ",
    educationTitle2: "académique",
    educationHeading: "FORMATION",
    execEducationHeading: "Formation continue & recherche",
    membershipLabel: "Affiliations professionnelles",
    membershipTitle: "Affiliations",
    companyLabel: "Entreprise",
    companyP1: "AI CONSULTING est un cabinet de conseil spécialisé en intelligence artificielle, en particulier dans l'automatisation et les agents IA avec un focus sur la ",
    companyP1strong: "gouvernance agentique",
    companyP2pre: "Nous accompagnons les organisations dans leur transition vers un ",
    companyP2strong: "usage souverain et contrôlé des agents IA autonomes",
    companyP3pre: "Notre approche est pragmatique et opérationnelle : nous ne théorisons pas sur l'IA, nous structurons votre capacité à la gouverner. Nos interventions s'appuient essentiellement sur la ",
    companyP3strong: "méthodologie ACF®",
    values: [
      { icon: "🎯", title: "Souveraineté d'abord", desc: "Votre contrôle stratégique sur les décisions automatisées est non négociable." },
      { icon: "⚡", title: "Pragmatisme opérationnel", desc: "Recommandations actionnables sous 30 jours, pas de théorie abstraite." },
      { icon: "🔍", title: "Transparence totale", desc: "Méthodologie documentée, scoring explicable, résultats vérifiables." },
    ],
    ctaTitle1: "Travaillons ",
    ctaTitle2: "ensemble",
    ctaDesc: "Que vous souhaitiez un diagnostic, un accompagnement ou un partenariat, parlons-en.",
    ctaBtn1: "Nous contacter →",
    ctaBtn2: "Votre Score",
  },
};

export default function AboutPage() {
  const locale = useLocale();
  const lang = locale === "fr" ? "fr" : "en";
  const t = ui[lang];
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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t.navSubtext}</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t.navHome}</a>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>{t.navCta}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 50, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", width: 600, height: 600, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(201,168,76,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div className="fade-up"><Badge>{t.heroBadge}</Badge></div>
          <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 46, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 16, letterSpacing: "-1px" }}>
            {t.heroTitle1}<span style={{ color: C.gold }}>{t.heroTitle2}</span>
          </h1>
          <p className="fade-up-d3" style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.timelineLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>{t.timelineTitle1}<span style={{ color: C.gold }}>{t.timelineTitle2}</span>{t.timelineTitle3}</h2>
            <GoldBar />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { year: t.timeline[0].year, event: t.timeline[0].event, color: C.gray },
              { year: t.timeline[1].year, event: t.timeline[1].event, color: C.blue },
              { year: t.timeline[2].year, event: t.timeline[2].event, color: C.green },
              { year: t.timeline[3].year, event: t.timeline[3].event, color: C.gold },
              { year: t.timeline[4].year, event: t.timeline[4].event, color: C.amber },
              { year: t.timeline[5].year, event: t.timeline[5].event, color: C.gold },
            ].map((tl, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 90, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: tl.color, paddingTop: 14, textAlign: "right" }}>{tl.year}</div>
                <div style={{ width: 12, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 14, flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: tl.color, border: `2px solid ${C.navy1}`, flexShrink: 0 }} />
                  {i < 5 && <div style={{ width: 1, flex: 1, background: C.bd1, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, padding: "10px 16px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 10, fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>{tl.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 56, alignItems: "start" }}>
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: 32, textAlign: "center", position: "sticky", top: 100 }}>
            <div style={{ width: 140, height: 140, borderRadius: "50%", background: C.goldDim, border: `3px solid ${C.goldBorder}`, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 48, fontWeight: 800, color: C.gold }}>VD</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Vincent DORANGE</h2>
            <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 4 }}>{t.founderSubtitle}</p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "1px", marginBottom: 20 }}>AI CONSULTING</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 24 }}>
              {t.founderTags.map(tag => (
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
            <SectionLabel>{t.founderLabel}</SectionLabel>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 24, textAlign: "center" }}>{t.founderTitle1}<span style={{ color: C.gold }}>{t.founderTitle2}</span></h3>
            <GoldBar />
            <div style={{ fontSize: 15, color: C.gray2, lineHeight: 1.9 }}>
              <p style={{ marginBottom: 20 }}>{t.founderP1}</p>
              <p style={{ marginBottom: 20 }}>{t.founderP2}<strong style={{ color: "#fff" }}>{t.founderP2strong}</strong></p>
              <p style={{ marginBottom: 20 }}>{t.founderP3pre}<strong style={{ color: C.gold }}>{t.founderP3strong}</strong></p>
              <p>{t.founderP4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.educationLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>{t.educationTitle1}<span style={{ color: C.gold }}>{t.educationTitle2}</span></h2>
            <GoldBar />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 32 }}>
            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>{t.educationHeading}</div>
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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>{t.execEducationHeading}</div>
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
            <SectionLabel>{t.membershipLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}><span style={{ color: C.gold }}>{t.membershipTitle}</span></h2>
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
            <SectionLabel>{t.companyLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>AI <span style={{ color: C.gold }}>CONSULTING</span></h2>
            <GoldBar />
          </div>
          
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 40, marginBottom: 32 }}>
            <div style={{ fontSize: 15, color: C.gray2, lineHeight: 1.9, textAlign: "center" }}>
              <p style={{ marginBottom: 20 }}>{t.companyP1}<strong style={{ color: "#fff" }}>{t.companyP1strong}</strong>.</p>
              <p style={{ marginBottom: 20 }}>{t.companyP2pre}<strong style={{ color: C.gold }}>{t.companyP2strong}</strong>.</p>
              <p>{t.companyP3pre}<strong style={{ color: C.gold }}>{t.companyP3strong}</strong>.</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: t.values[0].icon, title: t.values[0].title, desc: t.values[0].desc, color: C.gold },
              { icon: t.values[1].icon, title: t.values[1].title, desc: t.values[1].desc, color: C.green },
              { icon: t.values[2].icon, title: t.values[2].title, desc: t.values[2].desc, color: C.blue },
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
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 12 }}>{t.ctaTitle1}<span style={{ color: C.gold }}>{t.ctaTitle2}</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.7 }}>{t.ctaDesc}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href={`/${locale}/contact`} className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>{t.ctaBtn1}</a>
            <a href="https://www.acf-score.com/calculator" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, display: "inline-block", transition: "all .3s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t.ctaBtn2}</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
