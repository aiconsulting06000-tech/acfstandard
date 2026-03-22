"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF AUDITOR — Agentic Maturity Audit Platform
   Design: ACF Standard navy/gold palette
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldGlow: "rgba(201,168,76,.35)", goldBorder: "rgba(201,168,76,.2)",
  white: "#ffffff", gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", bd2: "rgba(201,168,76,.2)",
  green: "#22c55e", amber: "#f59e0b", red: "#ef4444", blue: "#6366f1", purple: "#8b5cf6",
};

/* ── Helpers ────────────────────────── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
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
    let s = 0; const step = end / 100;
    const t = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [started, end]);
  return <span ref={ref}>{count}{suffix}</span>;
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
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.gold, letterSpacing: ".12em", marginBottom: 10, textTransform: "uppercase" }}>
      {"// "}{children}
    </div>
  );
}

/* ── Translations ────────────────────────── */
const T: Record<string, Record<string, string>> = {
  fr: {
    badge: "PLATEFORME D'AUDIT AGENTIQUE",
    heroTitle: "Mesurez votre maturité digitale et agentique",
    heroSub: "ACF Auditor est la plateforme d'audit guidé du framework ACF. 107 questions, 7 dimensions pondérées, scoring calibré par industrie, et une feuille de route automatisée pour passer du diagnostic à l'action.",
    startAudit: "Lancer un audit",
    learnMore: "En savoir plus",

    statsQuestions: "Questions d'audit",
    statsDimensions: "Dimensions pondérées",
    statsInsightRules: "Règles d'insights",
    statsIndustries: "Secteurs calibrés",

    dimTitle: "7 Dimensions d'Audit",
    dimSub: "Chaque dimension est pondérée et calibrée selon votre secteur d'activité pour un diagnostic pertinent et actionnable.",
    dimOrg: "Organisation & Gouvernance",
    dimOrgDesc: "Sponsorship direction, rôles digitaux, comité de pilotage, culture data.",
    dimOps: "Opérations & Processus",
    dimOpsDesc: "Digitalisation des processus, workflows, documentation, efficacité opérationnelle.",
    dimAi: "Usage IA & Maturité",
    dimAiDesc: "Cas d'usage IA en production, compétences internes, mesure d'impact.",
    dimAuto: "Niveau d'Automatisation",
    dimAutoDesc: "RPA, workflows automatisés, orchestration, taux de couverture.",
    dimData: "Données & Systèmes",
    dimDataDesc: "Centralisation data, qualité, intégrations, architecture SI.",
    dimSov: "Souveraineté & Contrôle",
    dimSovDesc: "Contrôle des données, transparence algorithmique, réversibilité, kill switch.",
    dimBiz: "Performance Business",
    dimBizDesc: "ROI digital, KPIs clients (NPS/CSAT/CES), revenus digitaux, time-to-market.",

    scoresTitle: "3 Scores Clés",
    scoresSub: "Le moteur de scoring produit trois indicateurs complémentaires pour un diagnostic à 360°.",
    scoreGlobal: "Score Global",
    scoreGlobalDesc: "Moyenne pondérée des 7 dimensions, calibrée par industrie. Détermine le niveau de maturité ACF (0 Initial → 3 Autonome).",
    scoreAgentic: "Agentic Readiness",
    scoreAgenticDesc: "Mesure la capacité à déployer des agents IA autonomes. Formule : 30% Automatisation + 25% Données + 25% Opérations + 20% Maturité IA.",
    scoreSov: "Score de Souveraineté",
    scoreSovDesc: "3 sous-indices (Contrôle 40%, Transparence 30%, Réversibilité 30%) alignés avec les principes ACF.",

    insightTitle: "Moteur d'Insights",
    insightSub: "16 règles de détection automatique de patterns cross-dimensions. L'intelligence qui transforme les données en recommandations.",
    insightCritical: "Critiques",
    insightCriticalDesc: "IA cosmétique, risque de dépendance, absence de gouvernance, angles morts données.",
    insightWarning: "Alertes",
    insightWarningDesc: "Opérations manuelles, données silotées, risque cyber, IA sans mesure, déficit compétences.",
    insightOpportunity: "Opportunités",
    insightOpportunityDesc: "Prêt pour agents autonomes, quick wins automatisation, personnalisation IA, revenus digitaux.",
    insightStrength: "Forces",
    insightStrengthDesc: "Gouvernance exemplaire, souveraineté maîtrisée, maturité data, performance business.",

    roadmapTitle: "De l'Audit à l'Action",
    roadmapSub: "Le rapport génère automatiquement une feuille de route en 3 phases basée sur vos scores et insights.",
    phase1: "Fondations & Urgences",
    phase1Desc: "Actions critiques issues des insights et des dimensions les plus faibles. Gouvernance, données, souveraineté.",
    phase1Time: "0 — 3 mois",
    phase2: "Accélération",
    phase2Desc: "Digitalisation des processus, programme d'automatisation, premiers pilotes IA mesurés.",
    phase2Time: "3 — 6 mois",
    phase3: "Scale & Agents Autonomes",
    phase3Desc: "Déploiement d'agents supervisés via ACF Control, KPIs temps réel, objectif niveau Autonome.",
    phase3Time: "6 — 12 mois",

    bridgeTitle: "Le pont vers ACF Control",
    bridgeSub: "ACF Auditor répond à « Où en êtes-vous ? ». ACF Control répond à « Comment y aller ? ». Chaque recommandation devient une action traçable.",
    bridgeAudit: "Diagnostic",
    bridgeScore: "Score de maturité",
    bridgeInsights: "Insights & patterns",
    bridgeRoadmap: "Feuille de route",
    bridgeImplement: "Implémentation",
    bridgeTracking: "Suivi des actions",
    bridgeMonitoring: "Monitoring agents",
    bridgeKpis: "KPIs temps réel",
    discoverControl: "Découvrir ACF Control →",

    ctaTitle: "Prêt à auditer votre maturité agentique ?",
    ctaSub: "Lancez un audit ACF en quelques minutes. Diagnostic structuré, reproductible et actionnable.",
    ctaBtn: "Demander un audit →",
    ctaScore: "Ou commencez par votre ACF Score gratuit →",
  },
  en: {
    badge: "AGENTIC AUDIT PLATFORM",
    heroTitle: "Measure your digital and agentic maturity",
    heroSub: "ACF Auditor is the guided audit platform of the ACF framework. 107 questions, 7 weighted dimensions, industry-calibrated scoring, and an automated roadmap to move from diagnosis to action.",
    startAudit: "Start an audit",
    learnMore: "Learn more",

    statsQuestions: "Audit questions",
    statsDimensions: "Weighted dimensions",
    statsInsightRules: "Insight rules",
    statsIndustries: "Calibrated industries",

    dimTitle: "7 Audit Dimensions",
    dimSub: "Each dimension is weighted and calibrated to your industry for a relevant and actionable diagnosis.",
    dimOrg: "Organization & Governance",
    dimOrgDesc: "Executive sponsorship, digital roles, steering committee, data culture.",
    dimOps: "Operations & Processes",
    dimOpsDesc: "Process digitalization, workflows, documentation, operational efficiency.",
    dimAi: "AI Usage & Maturity",
    dimAiDesc: "AI use cases in production, internal skills, impact measurement.",
    dimAuto: "Automation Level",
    dimAutoDesc: "RPA, automated workflows, orchestration, coverage rate.",
    dimData: "Data & Systems",
    dimDataDesc: "Data centralization, quality, integrations, IT architecture.",
    dimSov: "Sovereignty & Control",
    dimSovDesc: "Data control, algorithmic transparency, reversibility, kill switch.",
    dimBiz: "Business Performance",
    dimBizDesc: "Digital ROI, customer KPIs (NPS/CSAT/CES), digital revenue, time-to-market.",

    scoresTitle: "3 Key Scores",
    scoresSub: "The scoring engine produces three complementary indicators for a 360° diagnosis.",
    scoreGlobal: "Global Score",
    scoreGlobalDesc: "Weighted average of 7 dimensions, industry-calibrated. Determines ACF maturity level (0 Initial → 3 Autonomous).",
    scoreAgentic: "Agentic Readiness",
    scoreAgenticDesc: "Measures capacity to deploy autonomous AI agents. Formula: 30% Automation + 25% Data + 25% Operations + 20% AI Maturity.",
    scoreSov: "Sovereignty Score",
    scoreSovDesc: "3 sub-indices (Control 40%, Transparency 30%, Reversibility 30%) aligned with ACF principles.",

    insightTitle: "Insight Engine",
    insightSub: "16 automatic cross-dimension pattern detection rules. The intelligence that transforms data into recommendations.",
    insightCritical: "Critical",
    insightCriticalDesc: "AI washing, dependency risk, no governance, data blind spots.",
    insightWarning: "Warnings",
    insightWarningDesc: "Manual operations, siloed data, cyber risk, unmeasured AI, skills gap.",
    insightOpportunity: "Opportunities",
    insightOpportunityDesc: "Agent-ready, automation quick wins, AI personalization, digital revenue.",
    insightStrength: "Strengths",
    insightStrengthDesc: "Strong governance, mastered sovereignty, data maturity, business performance.",

    roadmapTitle: "From Audit to Action",
    roadmapSub: "The report automatically generates a 3-phase roadmap based on your scores and insights.",
    phase1: "Foundations & Urgencies",
    phase1Desc: "Critical actions from insights and weakest dimensions. Governance, data, sovereignty.",
    phase1Time: "0 — 3 months",
    phase2: "Acceleration",
    phase2Desc: "Process digitalization, automation program, first measured AI pilots.",
    phase2Time: "3 — 6 months",
    phase3: "Scale & Autonomous Agents",
    phase3Desc: "Deploy supervised agents via ACF Control, real-time KPIs, target Autonomous level.",
    phase3Time: "6 — 12 months",

    bridgeTitle: "The bridge to ACF Control",
    bridgeSub: 'ACF Auditor answers "Where are you?". ACF Control answers "How to get there?". Each recommendation becomes a trackable action.',
    bridgeAudit: "Diagnosis",
    bridgeScore: "Maturity score",
    bridgeInsights: "Insights & patterns",
    bridgeRoadmap: "Roadmap",
    bridgeImplement: "Implementation",
    bridgeTracking: "Action tracking",
    bridgeMonitoring: "Agent monitoring",
    bridgeKpis: "Real-time KPIs",
    discoverControl: "Discover ACF Control →",

    ctaTitle: "Ready to audit your agentic maturity?",
    ctaSub: "Launch an ACF audit in minutes. Structured, reproducible, and actionable diagnosis.",
    ctaBtn: "Request an audit →",
    ctaScore: "Or start with your free ACF Score →",
  },
};

const DIMENSIONS = [
  { key: "org", icon: "\u{1F3DB}", weight: "10%", color: "#6366f1" },
  { key: "ops", icon: "\u2699\uFE0F", weight: "20%", color: "#f59e0b" },
  { key: "ai", icon: "\u{1F916}", weight: "15%", color: "#8b5cf6" },
  { key: "auto", icon: "\u{1F504}", weight: "15%", color: "#10b981" },
  { key: "data", icon: "\u{1F5C4}", weight: "15%", color: "#3b82f6" },
  { key: "sov", icon: "\u{1F6E1}", weight: "10%", color: "#ef4444" },
  { key: "biz", icon: "\u{1F4C8}", weight: "15%", color: "#06b6d4" },
];

export default function ACFAuditorPage() {
  const locale = useLocale();
  const t = T[locale] || T.en;

  return (
    <div style={{ background: C.navy1, color: C.white, fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(5,12,26,.85)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.bd1}`, padding: "0 24px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, fontWeight: 900, fontSize: 13, padding: "4px 10px", borderRadius: 4, fontFamily: "'Space Grotesk'" }}>ACF</div>
          <div>
            <div style={{ color: C.white, fontSize: 12, fontWeight: 600 }}>Agentic Commerce Framework®</div>
            <div style={{ color: C.gray, fontSize: 10 }}>ACF Auditor</div>
          </div>
        </Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href={`/${locale}/acf-score`} style={{ color: C.gray2, fontSize: 12, textDecoration: "none" }}>ACF Score</Link>
          <Link href={`/${locale}/acf-control`} style={{ color: C.gray2, fontSize: 12, textDecoration: "none" }}>ACF Control</Link>
          <Link href={`/${locale}/contact`} style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
            fontSize: 11, fontWeight: 700, padding: "7px 18px", borderRadius: 6, textDecoration: "none",
          }}>{t.startAudit}</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.goldGlow} 0%, transparent 70%)`, opacity: 0.08 }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <Badge>{t.badge}</Badge>
          <h1 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, margin: "24px 0 20px", letterSpacing: "-0.02em" }}>
            {t.heroTitle}
          </h1>
          <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.7, maxWidth: 640, margin: "0 auto 32px" }}>
            {t.heroSub}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${locale}/contact`} style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              fontSize: 14, fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none",
              boxShadow: `0 0 30px ${C.goldGlow}`,
            }}>{t.startAudit} →</Link>
            <a href="#dimensions" style={{
              border: `1px solid ${C.goldBorder}`, color: C.gold,
              fontSize: 14, fontWeight: 600, padding: "14px 32px", borderRadius: 8, textDecoration: "none",
            }}>{t.learnMore}</a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
        maxWidth: 900, margin: "0 auto 80px", background: C.bd1, borderRadius: 12, overflow: "hidden",
      }}>
        {[
          { value: 107, label: t.statsQuestions },
          { value: 7, label: t.statsDimensions },
          { value: 16, label: t.statsInsightRules },
          { value: 7, label: t.statsIndustries },
        ].map((s, i) => (
          <div key={i} style={{ background: C.navy2, padding: "24px 16px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontSize: 32, fontWeight: 800, color: C.gold }}>
              <AnimatedCounter end={s.value} />
            </div>
            <div style={{ fontSize: 12, color: C.gray, marginTop: 4, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── 7 DIMENSIONS ── */}
      <section id="dimensions" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>{t.dimTitle}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 32, fontWeight: 800, margin: "8px 0 16px" }}>{t.dimTitle}</h2>
          <GoldBar />
          <p style={{ color: C.gray2, fontSize: 15, maxWidth: 600, margin: "0 auto" }}>{t.dimSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {DIMENSIONS.map((dim, i) => {
            const labels = [t.dimOrg, t.dimOps, t.dimAi, t.dimAuto, t.dimData, t.dimSov, t.dimBiz];
            const descs = [t.dimOrgDesc, t.dimOpsDesc, t.dimAiDesc, t.dimAutoDesc, t.dimDataDesc, t.dimSovDesc, t.dimBizDesc];
            return (
              <div key={dim.key} style={{
                background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: 20,
                borderLeft: `3px solid ${dim.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{dim.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{labels[i]}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: dim.color, fontWeight: 700, background: `${dim.color}18`, padding: "3px 10px", borderRadius: 20 }}>
                    {dim.weight}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: C.gray2, margin: 0, lineHeight: 1.6 }}>{descs[i]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3 KEY SCORES ── */}
      <section style={{ background: C.navy2, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>{t.scoresTitle}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 32, fontWeight: 800, margin: "8px 0 16px" }}>{t.scoresTitle}</h2>
            <GoldBar />
            <p style={{ color: C.gray2, fontSize: 15, maxWidth: 600, margin: "0 auto" }}>{t.scoresSub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { title: t.scoreGlobal, desc: t.scoreGlobalDesc, color: C.gold, icon: "📊" },
              { title: t.scoreAgentic, desc: t.scoreAgenticDesc, color: C.purple, icon: "🤖" },
              { title: t.scoreSov, desc: t.scoreSovDesc, color: C.red, icon: "🛡" },
            ].map(s => (
              <div key={s.title} style={{
                background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: 24, textAlign: "center",
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 16, marginBottom: 8, color: s.color }}>{s.title}</div>
                <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHT ENGINE ── */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>{t.insightTitle}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 32, fontWeight: 800, margin: "8px 0 16px" }}>{t.insightTitle}</h2>
          <GoldBar />
          <p style={{ color: C.gray2, fontSize: 15, maxWidth: 600, margin: "0 auto" }}>{t.insightSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {[
            { title: t.insightCritical, desc: t.insightCriticalDesc, color: C.red, count: 4 },
            { title: t.insightWarning, desc: t.insightWarningDesc, color: C.amber, count: 5 },
            { title: t.insightOpportunity, desc: t.insightOpportunityDesc, color: C.blue, count: 4 },
            { title: t.insightStrength, desc: t.insightStrengthDesc, color: C.green, count: 3 },
          ].map(rule => (
            <div key={rule.title} style={{
              background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: 20,
              borderLeft: `4px solid ${rule.color}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{
                  display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: rule.color,
                  boxShadow: `0 0 8px ${rule.color}`,
                }} />
                <span style={{ fontWeight: 700, fontSize: 15 }}>{rule.title}</span>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: rule.color, marginLeft: "auto" }}>{rule.count} rules</span>
              </div>
              <p style={{ fontSize: 13, color: C.gray2, margin: 0, lineHeight: 1.6 }}>{rule.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" style={{ background: C.navy2, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>{t.roadmapTitle}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 32, fontWeight: 800, margin: "8px 0 16px" }}>{t.roadmapTitle}</h2>
            <GoldBar />
            <p style={{ color: C.gray2, fontSize: 15, maxWidth: 600, margin: "0 auto" }}>{t.roadmapSub}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { phase: "Phase 1", title: t.phase1, desc: t.phase1Desc, time: t.phase1Time, color: C.red },
              { phase: "Phase 2", title: t.phase2, desc: t.phase2Desc, time: t.phase2Time, color: C.amber },
              { phase: "Phase 3", title: t.phase3, desc: t.phase3Desc, time: t.phase3Time, color: C.green },
            ].map(p => (
              <div key={p.phase} style={{
                background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: 24,
                borderLeft: `4px solid ${p.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontWeight: 800, fontSize: 13, color: p.color }}>{p.phase}</span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{p.title}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.gray, fontFamily: "'JetBrains Mono'" }}>{p.time}</span>
                </div>
                <p style={{ fontSize: 14, color: C.gray2, margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIDGE TO ACF CONTROL ── */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>{t.bridgeTitle}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 32, fontWeight: 800, margin: "8px 0 16px" }}>{t.bridgeTitle}</h2>
          <GoldBar />
          <p style={{ color: C.gray2, fontSize: 15, maxWidth: 640, margin: "0 auto" }}>{t.bridgeSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center" }}>
          {/* ACF Auditor column */}
          <div style={{ background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 800, fontSize: 18, marginBottom: 16, color: C.gold }}>ACF Auditor</div>
            {[t.bridgeAudit, t.bridgeScore, t.bridgeInsights, t.bridgeRoadmap].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 14, color: C.gray2 }}>
                <span style={{ color: C.gold }}>&#10003;</span> {item}
              </div>
            ))}
          </div>
          {/* Arrow */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, color: C.gold }}>→</div>
          </div>
          {/* ACF Control column */}
          <div style={{ background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 800, fontSize: 18, marginBottom: 16, color: C.green }}>ACF Control</div>
            {[t.bridgeImplement, t.bridgeTracking, t.bridgeMonitoring, t.bridgeKpis].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 14, color: C.gray2 }}>
                <span style={{ color: C.green }}>&#10003;</span> {item}
              </div>
            ))}
            <Link href={`/${locale}/acf-control`} style={{ color: C.gold, fontSize: 13, textDecoration: "none", fontWeight: 600, marginTop: 8, display: "inline-block" }}>
              {t.discoverControl}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navy3}, ${C.navy2})`,
        padding: "80px 24px", textAlign: "center",
        borderTop: `1px solid ${C.goldBorder}`, borderBottom: `1px solid ${C.goldBorder}`,
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 28, fontWeight: 800, marginBottom: 16 }}>{t.ctaTitle}</h2>
          <p style={{ color: C.gray2, fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>{t.ctaSub}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${locale}/contact`} style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              fontSize: 14, fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none",
              boxShadow: `0 0 30px ${C.goldGlow}`,
            }}>{t.ctaBtn}</Link>
          </div>
          <Link href="https://acf-score.com" style={{ color: C.gray, fontSize: 13, marginTop: 16, display: "inline-block", textDecoration: "none" }}>
            {t.ctaScore}
          </Link>
        </div>
      </section>

      <Footer />
      <AIAgent />
    </div>
  );
}
