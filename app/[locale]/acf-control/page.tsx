"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

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
const ui = {
  en: {
    // Nav
    navDecisionGovOS: "DECISION GOVERNANCE OS",
    navHome: "Home",
    navModules: "Modules",
    navDriftEngine: "Drift Engine",
    navDashboard: "Dashboard",
    navRisks: "Risks",
    navRequestDemo: "Request a Demo",
    navStandard: "The Standard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partners", navFaq: "FAQ", navCta: "Contact",

    // Hero
    badgeLive: "LIVE GOVERNANCE SYSTEM",
    heroLine1: "Your agents decide.",
    heroLine2: "You stay in control.",
    heroDesc1: "ACF Control is the ",
    heroDescStrong: "decision governance operating system",
    heroDesc2: " for organizations deploying autonomous AI agents. Detect drift, classify incidents, intervene instantly.",
    heroBookDemo: "Book a Demo →",
    heroWatchDemo: "Watch Demo",
    heroGDPR: "GDPR Compliant",
    heroEUAI: "EU AI Act Ready",
    heroKillSwitch60: "Kill Switch 60s",

    // Live Dashboard
    killSwitchActive: "⚠ KILL SWITCH ACTIVE",
    criticalAlert: "🚨 CRITICAL ALERT",
    controlLive: "ACF CONTROL — LIVE",
    sovereigntyScore: "Sovereignty Score",
    scoreUp: "▲ +3.2 (30d)",
    scoreSuspended: "⬛ SUSPENDED",
    scoreCritical: "▼ −33 CRITICAL",

    // Timeline
    tlKillAll: "⚠ KILL SWITCH ACTIVATED — All agents suspended",
    tlStockDriftBreach: "STOCK-AI drift exceeded 300% — sovereignty breach",
    tlDegradedMode: "Degraded mode active — human takeover required",
    tlStockCritical: "🚨 STOCK-AI CRITICAL — Score 12, drift +312%",
    tlSovBelow: "Sovereignty score below threshold (41/100)",
    tlStockDrift12: "STOCK-AI drift detected (−1.2%)",
    tlFraudBlocked: "FRAUD-DET suspicious transaction blocked",
    tlStockAccel: "⚠ STOCK-AI drift accelerating (−4.8%)",
    tlPriceGovMargin: "PRICE-GOV margin adjusted +0.3%",
    tlEscalationApproach: "Escalation threshold approaching",

    // Kill Switch Banner
    allAgentsSuspended: "ALL AGENTS SUSPENDED",
    killSwitchRecommended: "KILL SWITCH RECOMMENDED",
    humanTakeoverActive: "Human takeover active. Awaiting manual review.",
    sovereigntyBreach: "Sovereignty breach detected. Immediate intervention required.",

    // Equation bar
    eqObservability: "Observability",
    eqGovernance: "Governance",
    eqIntervention: "Intervention",
    eqSovereignty: "Sovereignty",

    // Positioning
    sectionPositioning: "Positioning",
    posTitle: "Not another AI dashboard.",
    posDesc1: "ACF Control is a ",
    posDescStrong: "decision governance layer",
    posDesc2: " — the nervous system your organization needs to remain sovereign.",
    posIsNotTitle: "ACF Control is NOT",
    posIsTitle: "ACF Control IS",
    posNotItems: [
      "An AI tool or agent builder",
      "A repricer or marketing platform",
      "A passive reporting dashboard",
      "An optimization engine",
      "A data warehouse or BI tool",
    ],
    posIsItems: [
      "A decision governance operating system",
      "A real-time drift detection center",
      "An incident classification & response hub",
      "A command authority intervention center",
      "A sovereignty supervision platform",
    ],

    // 8 Core Modules
    sectionArchitecture: "Architecture",
    modulesTitle: "8 Core Modules",
    modulesSubtitle: "Each module serves one purpose: keeping humans in command of machine decisions.",

    mod00Title: "Sovereignty Score",
    mod00Sub: "Your governance baseline — scored 0 to 100 across 4 axes.",
    mod00Axes: "Distribution · Decision · Traffic · Treasury",
    mod00Export: "PDF Export",

    mod01Title: "Decision Registry",
    mod01Sub: "A living inventory: who decides what, with what, and how.",
    mod01PriceAdj: "Price adjustment",
    mod01PriceStatus: "Governed",
    mod01Replenishment: "Replenishment",
    mod01ReplenishStatus: "Assisted",
    mod01CustExcl: "Customer exclusion",
    mod01CustStatus: "Human only",

    mod02Title: "Criticality Matrix",
    mod02Sub: "Impact × Frequency × Irreversibility.",
    mod02Optimizable: "Optimizable",
    mod02Governed: "Governed",
    mod02HumanOnly: "Human only",

    mod03Title: "Agentic Constitution",
    mod03Sub: "Strategic governance document — versioned, signed, auditable.",
    mod03Items: ["Priority objectives", "Critical thresholds", "Escalation rules", "Non-delegable zones", "Kill Switch owner"],
    mod03Signed: "Signed CEO — v2.1 — Feb 2026",

    mod04Title: "Agent Registry",
    mod04Sub: "Every agent documented: mandate, scope, limits, human owner.",

    mod05Title: "Minimum Viable Supervision",
    mod05Sub: "5 KPIs per agent. Thresholds. Alerts. 30-day history.",
    mod05Margin: "Margin",
    mod05Escalations: "Escalations",
    mod05Overrides: "Overrides",
    mod05HumanLoad: "Human load",

    mod06Title: "Continuous Governance",
    mod06Sub: "Monthly reviews, annual compliance audits, governance evolution tracking.",
    mod06Timeline: "Monthly review → Quarterly audit → Annual certification",

    mod07Title: "Crisis Management",
    mod07Sub: "3-level incident classification, kill switch drills, post-mortem protocols.",
    mod07Levels: "Level 1: Pause · Level 2: Contain · Level 3: Kill",

    // Drift Engine
    sectionKeyDiff: "Key Differentiator",
    driftTitle: "Drift Engine™",
    driftP1: "Catastrophic AI failures don't come from bugs — they come from ",
    driftP1Strong: "slow, invisible drift",
    driftP1End: ". The margin that slips from 32% → 28% without anyone noticing. Escalations that become \"normal.\"",
    driftP2Start: "The Drift Engine computes ",
    driftP2Strong: "7-day and 30-day trends",
    driftP2Mid: " for every agent KPI. It triggers alerts ",
    driftP2Gold: "before thresholds are even breached",
    driftP2End: ".",
    driftLow: "Low drift",
    driftLowDesc: "Trend moving, within tolerance",
    driftSig: "Significant drift",
    driftSigDesc: "Approaching threshold boundary",
    driftCrit: "Critical drift",
    driftCritDesc: "Immediate intervention required",
    driftStabilityLabel: "AGENT STABILITY SCORES",
    driftDetectionLabel: "DRIFT DETECTION — STOCK-AI",
    driftDetected: "⚠ DRIFT DETECTED",
    drift14dTrend: "14d trend",
    drift14dAgo: "14d ago",
    driftNow: "now",
    driftMarginWarn: "⚠ STOCK-AI margin drift: −1.8% over 14 days.",
    driftRecommendation: "→ Recommendation: review threshold or reduce scope.",

    // Kill Switch & Intervention
    sectionCommandAuth: "Command Authority",
    interventionTitle: "Immediate Intervention",
    interventionDesc1: "ACF Control doesn't just alert — it gives you the power to ",
    interventionDescStrong: "act within seconds",
    interventionDesc2: ".",
    intSuspend: "Suspend Agent",
    intReduceScope: "Reduce Scope",
    intForceEsc: "Force Escalation",
    intDegraded: "Degraded Mode",
    intKillSwitch: "Kill Switch",
    killGlobalLabel: "🛑 GLOBAL KILL SWITCH",
    killGlobalDesc: "Suspend ALL autonomous agents. Full degraded mode within 60 seconds.",
    killArmedBtn: "⚠ KILL SWITCH ARMED — Click to disarm",
    killArmBtn: "Arm Kill Switch",
    killArmedMsg: "All agents will be suspended upon confirmation. Action logged.",

    // Executive Dashboard
    sectionOnePageAnswer: "One page, one answer",
    dashTitle: "Executive Dashboard",
    dashQuestion: "One question, answered in 30 seconds: ",
    dashQuestionBold: "\"Are we sovereign today?\"",
    tabCEO: "CEO View",
    tabOps: "Operator View",
    tabConsultant: "Consultant View",
    dashActiveAgents: "Active Agents",
    dashStable: "Stable",
    dashAttention: "Attention",
    dashCritical: "Critical",
    dashRecentIncidents: "Recent Incidents",
    dashStockDrift: "STOCK-AI drift",
    dashAutoCorrected: "Auto-corrected",
    dashRoutineCheck: "Routine check",
    dashAtRisk: "At-Risk Decisions",
    dashPricingDrift: "Pricing → margin drift",
    dashInventoryLow: "Inventory → low coverage",
    dashNoCritical: "No critical risks",
    dashSuspendAll: "🛑 SUSPEND ALL",
    dashVsLastMonth: "▲ +3.2 vs last month",

    opsTitle: "Agent Operator View",
    opsDesc: "Deep-dive into each agent's performance. Adjust rules, manage drift thresholds, resolve incidents.",
    opsIncidents: "Incidents",

    consultTitle: "Certified Consultant View",
    consultDesc: "Multi-client access, benchmarks, mission templates and audit-ready exports. Deliver a full ACF diagnostic in under 2 hours.",
    consultMultiClient: "Multi-client",
    consultTemplates: "Templates",
    consultBenchmark: "Benchmark",
    consultPDFExport: "PDF Export",

    // Risk vs Cost
    sectionRealMath: "The real math",
    riskTitle1: "What does the ",
    riskTitleRed: "absence",
    riskTitle2: " of governance cost?",
    riskDesc1: "The cost of ACF Control is ",
    riskDescStrong: "negligible",
    riskDesc2: " compared to the financial, regulatory, and reputational risks you're taking without formalized governance.",
    riskAIActLabel: "EU AI ACT FINES",
    riskAIActDesc1: "Up to ",
    riskAIActStrong: "€35 million",
    riskAIActDesc2: " or 7% of global annual turnover for non-compliance with transparency and supervision requirements for high-risk AI systems.",
    riskGDPRLabel: "GDPR FINES",
    riskGDPRDesc1: "Up to ",
    riskGDPRStrong: "€20 million",
    riskGDPRDesc2: " or 4% of global annual turnover. Ungoverned automated decisions multiply the risk of data violations.",
    riskDriftLabel: "COST OF AI DRIFT",
    riskDriftDesc1: "Average observed loss from ",
    riskDriftStrong: "uncontrolled AI decisions",
    riskDriftDesc2: ": pricing errors, broken inventory, abusive customer exclusions, invisible margin erosion.",
    riskWithout: "RISK WITHOUT GOVERNANCE",
    riskMaxExposure: "Maximum cumulative exposure",
    riskACFInvestment: "ACF CONTROL INVESTMENT",
    riskFraction: "A fraction of your risk exposure",
    riskStat1: "of companies use AI agents without formalized governance",
    riskStat2: "of executives fear losing strategic control over their agents",
    riskStat3: "incidents increase 12x faster in organizations without supervision",

    // Pricing
    sectionPlans: "Plans",
    pricingTitle: "Bespoke governance, not commodity SaaS.",
    pricingDesc: "Every organization has unique sovereignty challenges. We tailor ACF Control to your agent architecture, industry, and regulatory requirements.",
    tierEssential: "ESSENTIAL",
    tierEssentialDesc: "Up to 3 agents",
    tierProfessional: "PROFESSIONAL",
    tierProfessionalDesc: "Up to 10 agents",
    tierEnterprise: "ENTERPRISE",
    tierEnterpriseDesc: "Unlimited agents",
    tierRecommended: "RECOMMENDED",
    priceOnRequest: "Price on request",
    planRequestDemo: "Request a Demo →",
    planContactUs: "Contact Us",
    featEssential: ["Sovereignty Score", "Decision Registry", "Criticality Matrix", "Basic alerts", "PDF exports"],
    featProfessional: ["Everything in Essential +", "Drift Engine™", "Incident Classification", "Kill Switch (3 levels)", "Agentic Constitution", "Smart Alerts (Slack + Email)", "Consultant Access"],
    featEnterprise: ["Everything in Professional +", "Multi-site / Multi-BU", "Custom integrations (API)", "Dedicated DDA support", "Audit trail (3 years)", "White-label option", "SLA 99.9%"],
    partnerLabel: "CERTIFIED PARTNER PROGRAM",
    partnerDesc: "Annual consultant license. ACF certification required for client access.",
    partnerApply: "Apply for Certification →",

    // Stats bar
    statKillSwitch: "Kill switch max",
    statKPIs: "Sovereignty KPIs",
    statControls: "Controls per agent",
    statOperational: "Operational in",

    // Final CTA
    ctaLine1: "Stop flying blind.",
    ctaLine2: "Start governing.",
    ctaDesc1: "Your agents are already making decisions. The only question is: ",
    ctaDescStrong: "are you in command?",
    ctaDemo: "Request a Demo →",
    ctaScore: "Calculate Your ACF Score",
  },
  fr: {
    // Nav
    navDecisionGovOS: "OS DE GOUVERNANCE DÉCISIONNELLE",
    navHome: "Accueil",
    navModules: "Modules",
    navDriftEngine: "Moteur de dérive",
    navDashboard: "Tableau de bord",
    navRisks: "Risques",
    navRequestDemo: "Demander une démo",
    navStandard: "Le Standard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partenaires", navFaq: "FAQ", navCta: "Contact",

    // Hero
    badgeLive: "SYSTÈME DE GOUVERNANCE EN DIRECT",
    heroLine1: "Vos agents décident.",
    heroLine2: "Vous gardez le contrôle.",
    heroDesc1: "ACF Control est le ",
    heroDescStrong: "système d'exploitation de gouvernance décisionnelle",
    heroDesc2: " pour les organisations déployant des agents IA autonomes. Détectez la dérive, classifiez les incidents, intervenez instantanément.",
    heroBookDemo: "Réserver une démo →",
    heroWatchDemo: "Voir la démo",
    heroGDPR: "Conforme RGPD",
    heroEUAI: "Prêt pour l'AI Act UE",
    heroKillSwitch60: "Kill Switch 60s",

    // Live Dashboard
    killSwitchActive: "⚠ KILL SWITCH ACTIVÉ",
    criticalAlert: "🚨 ALERTE CRITIQUE",
    controlLive: "ACF CONTROL — EN DIRECT",
    sovereigntyScore: "Score de souveraineté",
    scoreUp: "▲ +3,2 (30j)",
    scoreSuspended: "⬛ SUSPENDU",
    scoreCritical: "▼ −33 CRITIQUE",

    // Timeline
    tlKillAll: "⚠ KILL SWITCH ACTIVÉ — Tous les agents suspendus",
    tlStockDriftBreach: "Dérive STOCK-AI dépassant 300% — violation de souveraineté",
    tlDegradedMode: "Mode dégradé actif — reprise humaine requise",
    tlStockCritical: "🚨 STOCK-AI CRITIQUE — Score 12, dérive +312%",
    tlSovBelow: "Score de souveraineté sous le seuil (41/100)",
    tlStockDrift12: "Dérive STOCK-AI détectée (−1,2%)",
    tlFraudBlocked: "FRAUD-DET transaction suspecte bloquée",
    tlStockAccel: "⚠ Dérive STOCK-AI en accélération (−4,8%)",
    tlPriceGovMargin: "PRICE-GOV marge ajustée +0,3%",
    tlEscalationApproach: "Seuil d'escalade en approche",

    // Kill Switch Banner
    allAgentsSuspended: "TOUS LES AGENTS SUSPENDUS",
    killSwitchRecommended: "KILL SWITCH RECOMMANDÉ",
    humanTakeoverActive: "Reprise humaine active. En attente de revue manuelle.",
    sovereigntyBreach: "Violation de souveraineté détectée. Intervention immédiate requise.",

    // Equation bar
    eqObservability: "Observabilité",
    eqGovernance: "Gouvernance",
    eqIntervention: "Intervention",
    eqSovereignty: "Souveraineté",

    // Positioning
    sectionPositioning: "Positionnement",
    posTitle: "Pas un énième tableau de bord IA.",
    posDesc1: "ACF Control est une ",
    posDescStrong: "couche de gouvernance décisionnelle",
    posDesc2: " — le système nerveux dont votre organisation a besoin pour rester souveraine.",
    posIsNotTitle: "ACF Control n'est PAS",
    posIsTitle: "ACF Control EST",
    posNotItems: [
      "Un outil IA ou un constructeur d'agents",
      "Un repricing ou une plateforme marketing",
      "Un tableau de bord de reporting passif",
      "Un moteur d'optimisation",
      "Un entrepôt de données ou outil BI",
    ],
    posIsItems: [
      "Un système d'exploitation de gouvernance décisionnelle",
      "Un centre de détection de dérive en temps réel",
      "Un hub de classification et de réponse aux incidents",
      "Un centre d'intervention d'autorité de commandement",
      "Une plateforme de supervision de la souveraineté",
    ],

    // 8 Core Modules
    sectionArchitecture: "Architecture",
    modulesTitle: "8 modules fondamentaux",
    modulesSubtitle: "Chaque module a un objectif : maintenir l'humain aux commandes des décisions machines.",

    mod00Title: "Score de souveraineté",
    mod00Sub: "Votre référence de gouvernance — noté de 0 à 100 sur 4 axes.",
    mod00Axes: "Distribution · Décision · Trafic · Trésorerie",
    mod00Export: "Export PDF",

    mod01Title: "Registre des décisions",
    mod01Sub: "Un inventaire vivant : qui décide quoi, avec quoi et comment.",
    mod01PriceAdj: "Ajustement de prix",
    mod01PriceStatus: "Gouverné",
    mod01Replenishment: "Réapprovisionnement",
    mod01ReplenishStatus: "Assisté",
    mod01CustExcl: "Exclusion client",
    mod01CustStatus: "Humain seul",

    mod02Title: "Matrice de criticité",
    mod02Sub: "Impact × Fréquence × Irréversibilité.",
    mod02Optimizable: "Optimisable",
    mod02Governed: "Gouverné",
    mod02HumanOnly: "Humain seul",

    mod03Title: "Constitution agentique",
    mod03Sub: "Document de gouvernance stratégique — versionné, signé, auditable.",
    mod03Items: ["Objectifs prioritaires", "Seuils critiques", "Règles d'escalade", "Zones non-délégables", "Propriétaire du Kill Switch"],
    mod03Signed: "Signé PDG — v2.1 — Fév 2026",

    mod04Title: "Registre des agents",
    mod04Sub: "Chaque agent documenté : mandat, périmètre, limites, propriétaire humain.",

    mod05Title: "Supervision minimale viable",
    mod05Sub: "5 KPI par agent. Seuils. Alertes. Historique 30 jours.",
    mod05Margin: "Marge",
    mod05Escalations: "Escalades",
    mod05Overrides: "Dérogations",
    mod05HumanLoad: "Charge humaine",

    mod06Title: "Gouvernance continue",
    mod06Sub: "Revues mensuelles, audits de conformité annuels, suivi de l'évolution de la gouvernance.",
    mod06Timeline: "Revue mensuelle → Audit trimestriel → Certification annuelle",

    mod07Title: "Gestion de crise",
    mod07Sub: "Classification d'incidents à 3 niveaux, exercices de kill switch, protocoles post-mortem.",
    mod07Levels: "Niveau 1 : Pause · Niveau 2 : Contenir · Niveau 3 : Kill",

    // Drift Engine
    sectionKeyDiff: "Différenciateur clé",
    driftTitle: "Drift Engine™",
    driftP1: "Les défaillances IA catastrophiques ne viennent pas de bugs — elles viennent d'une ",
    driftP1Strong: "dérive lente et invisible",
    driftP1End: ". La marge qui glisse de 32% → 28% sans que personne ne le remarque. Les escalades qui deviennent « normales ».",
    driftP2Start: "Le Drift Engine calcule des ",
    driftP2Strong: "tendances à 7 et 30 jours",
    driftP2Mid: " pour chaque KPI d'agent. Il déclenche des alertes ",
    driftP2Gold: "avant même que les seuils ne soient franchis",
    driftP2End: ".",
    driftLow: "Dérive faible",
    driftLowDesc: "Tendance en mouvement, dans la tolérance",
    driftSig: "Dérive significative",
    driftSigDesc: "Approche de la limite du seuil",
    driftCrit: "Dérive critique",
    driftCritDesc: "Intervention immédiate requise",
    driftStabilityLabel: "SCORES DE STABILITÉ DES AGENTS",
    driftDetectionLabel: "DÉTECTION DE DÉRIVE — STOCK-AI",
    driftDetected: "⚠ DÉRIVE DÉTECTÉE",
    drift14dTrend: "Tendance 14j",
    drift14dAgo: "il y a 14j",
    driftNow: "maintenant",
    driftMarginWarn: "⚠ Dérive de marge STOCK-AI : −1,8% sur 14 jours.",
    driftRecommendation: "→ Recommandation : revoir le seuil ou réduire le périmètre.",

    // Kill Switch & Intervention
    sectionCommandAuth: "Autorité de commandement",
    interventionTitle: "Intervention immédiate",
    interventionDesc1: "ACF Control ne se contente pas d'alerter — il vous donne le pouvoir d'",
    interventionDescStrong: "agir en quelques secondes",
    interventionDesc2: ".",
    intSuspend: "Suspendre l'agent",
    intReduceScope: "Réduire le périmètre",
    intForceEsc: "Forcer l'escalade",
    intDegraded: "Mode dégradé",
    intKillSwitch: "Kill Switch",
    killGlobalLabel: "🛑 KILL SWITCH GLOBAL",
    killGlobalDesc: "Suspendre TOUS les agents autonomes. Mode dégradé complet en 60 secondes.",
    killArmedBtn: "⚠ KILL SWITCH ARMÉ — Cliquer pour désarmer",
    killArmBtn: "Armer le Kill Switch",
    killArmedMsg: "Tous les agents seront suspendus après confirmation. Action journalisée.",

    // Executive Dashboard
    sectionOnePageAnswer: "Une page, une réponse",
    dashTitle: "Tableau de bord exécutif",
    dashQuestion: "Une question, répondue en 30 secondes : ",
    dashQuestionBold: "« Sommes-nous souverains aujourd'hui ? »",
    tabCEO: "Vue PDG",
    tabOps: "Vue opérateur",
    tabConsultant: "Vue consultant",
    dashActiveAgents: "Agents actifs",
    dashStable: "Stable",
    dashAttention: "Attention",
    dashCritical: "Critique",
    dashRecentIncidents: "Incidents récents",
    dashStockDrift: "Dérive STOCK-AI",
    dashAutoCorrected: "Auto-corrigé",
    dashRoutineCheck: "Contrôle de routine",
    dashAtRisk: "Décisions à risque",
    dashPricingDrift: "Tarification → dérive de marge",
    dashInventoryLow: "Inventaire → couverture faible",
    dashNoCritical: "Aucun risque critique",
    dashSuspendAll: "🛑 TOUT SUSPENDRE",
    dashVsLastMonth: "▲ +3,2 vs mois dernier",

    opsTitle: "Vue opérateur d'agents",
    opsDesc: "Analyse détaillée des performances de chaque agent. Ajustez les règles, gérez les seuils de dérive, résolvez les incidents.",
    opsIncidents: "Incidents",

    consultTitle: "Vue consultant certifié",
    consultDesc: "Accès multi-clients, benchmarks, modèles de missions et exports prêts pour l'audit. Livrez un diagnostic ACF complet en moins de 2 heures.",
    consultMultiClient: "Multi-clients",
    consultTemplates: "Modèles",
    consultBenchmark: "Benchmark",
    consultPDFExport: "Export PDF",

    // Risk vs Cost
    sectionRealMath: "Le vrai calcul",
    riskTitle1: "Que coûte l'",
    riskTitleRed: "absence",
    riskTitle2: " de gouvernance ?",
    riskDesc1: "Le coût d'ACF Control est ",
    riskDescStrong: "négligeable",
    riskDesc2: " comparé aux risques financiers, réglementaires et réputationnels que vous prenez sans gouvernance formalisée.",
    riskAIActLabel: "AMENDES AI ACT UE",
    riskAIActDesc1: "Jusqu'à ",
    riskAIActStrong: "35 millions €",
    riskAIActDesc2: " ou 7% du chiffre d'affaires annuel mondial pour non-conformité aux exigences de transparence et de supervision des systèmes IA à haut risque.",
    riskGDPRLabel: "AMENDES RGPD",
    riskGDPRDesc1: "Jusqu'à ",
    riskGDPRStrong: "20 millions €",
    riskGDPRDesc2: " ou 4% du chiffre d'affaires annuel mondial. Les décisions automatisées non gouvernées multiplient le risque de violations de données.",
    riskDriftLabel: "COÛT DE LA DÉRIVE IA",
    riskDriftDesc1: "Perte moyenne observée liée aux ",
    riskDriftStrong: "décisions IA non contrôlées",
    riskDriftDesc2: " : erreurs de tarification, stocks défaillants, exclusions clients abusives, érosion de marge invisible.",
    riskWithout: "RISQUE SANS GOUVERNANCE",
    riskMaxExposure: "Exposition cumulée maximale",
    riskACFInvestment: "INVESTISSEMENT ACF CONTROL",
    riskFraction: "Une fraction de votre exposition au risque",
    riskStat1: "des entreprises utilisent des agents IA sans gouvernance formalisée",
    riskStat2: "des dirigeants craignent de perdre le contrôle stratégique de leurs agents",
    riskStat3: "les incidents augmentent 12x plus vite dans les organisations sans supervision",

    // Pricing
    sectionPlans: "Offres",
    pricingTitle: "Une gouvernance sur mesure, pas un SaaS standardisé.",
    pricingDesc: "Chaque organisation a des défis de souveraineté uniques. Nous adaptons ACF Control à votre architecture d'agents, votre secteur et vos exigences réglementaires.",
    tierEssential: "ESSENTIEL",
    tierEssentialDesc: "Jusqu'à 3 agents",
    tierProfessional: "PROFESSIONNEL",
    tierProfessionalDesc: "Jusqu'à 10 agents",
    tierEnterprise: "ENTREPRISE",
    tierEnterpriseDesc: "Agents illimités",
    tierRecommended: "RECOMMANDÉ",
    priceOnRequest: "Prix sur demande",
    planRequestDemo: "Demander une démo →",
    planContactUs: "Nous contacter",
    featEssential: ["Score de souveraineté", "Registre des décisions", "Matrice de criticité", "Alertes basiques", "Exports PDF"],
    featProfessional: ["Tout dans Essentiel +", "Drift Engine™", "Classification des incidents", "Kill Switch (3 niveaux)", "Constitution agentique", "Alertes intelligentes (Slack + Email)", "Accès consultant"],
    featEnterprise: ["Tout dans Professionnel +", "Multi-site / Multi-BU", "Intégrations personnalisées (API)", "Support DDA dédié", "Piste d'audit (3 ans)", "Option marque blanche", "SLA 99,9%"],
    partnerLabel: "PROGRAMME PARTENAIRE CERTIFIÉ",
    partnerDesc: "Licence consultant annuelle. Certification ACF requise pour l'accès client.",
    partnerApply: "Postuler à la certification →",

    // Stats bar
    statKillSwitch: "Kill switch max",
    statKPIs: "KPI de souveraineté",
    statControls: "Contrôles par agent",
    statOperational: "Opérationnel en",

    // Final CTA
    ctaLine1: "Cessez de naviguer à l'aveugle.",
    ctaLine2: "Commencez à gouverner.",
    ctaDesc1: "Vos agents prennent déjà des décisions. La seule question est : ",
    ctaDescStrong: "êtes-vous aux commandes ?",
    ctaDemo: "Demander une démo →",
    ctaScore: "Calculer votre Score ACF",
  },
  es: {
    navDecisionGovOS: "SO DE GOBERNANZA DECISIONAL",
    navHome: "Inicio",
    navModules: "Módulos",
    navDriftEngine: "Motor de deriva",
    navDashboard: "Panel de control",
    navRisks: "Riesgos",
    navRequestDemo: "Solicitar una demo",
    navStandard: "El Estándar", navScore: "ACF Score", navBlog: "Blog", navPartners: "Socios", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "SISTEMA DE GOBERNANZA EN VIVO",
    heroLine1: "Sus agentes deciden.",
    heroLine2: "Usted mantiene el control.",
    heroDesc1: "ACF Control es el ",
    heroDescStrong: "sistema operativo de gobernanza decisional",
    heroDesc2: " para organizaciones que despliegan agentes de IA autónomos. Detecte la deriva, clasifique incidentes, intervenga al instante.",
    heroBookDemo: "Reservar una demo →",
    heroWatchDemo: "Ver demo",
    heroGDPR: "Conforme con RGPD",
    heroEUAI: "Preparado para AI Act UE",
    heroKillSwitch60: "Kill Switch 60s",
    killSwitchActive: "⚠ KILL SWITCH ACTIVO",
    criticalAlert: "🚨 ALERTA CRÍTICA",
    controlLive: "ACF CONTROL — EN VIVO",
    sovereigntyScore: "Puntuación de soberanía",
    scoreUp: "▲ +3,2 (30d)",
    scoreSuspended: "⬛ SUSPENDIDO",
    scoreCritical: "▼ −33 CRÍTICO",
    tlKillAll: "⚠ KILL SWITCH ACTIVADO — Todos los agentes suspendidos",
    tlStockDriftBreach: "Deriva de STOCK-AI superó 300% — violación de soberanía",
    tlDegradedMode: "Modo degradado activo — se requiere toma de control humana",
    tlStockCritical: "🚨 STOCK-AI CRÍTICO — Puntuación 12, deriva +312%",
    tlSovBelow: "Puntuación de soberanía por debajo del umbral (41/100)",
    tlStockDrift12: "Deriva de STOCK-AI detectada (−1,2%)",
    tlFraudBlocked: "FRAUD-DET transacción sospechosa bloqueada",
    tlStockAccel: "⚠ Deriva de STOCK-AI acelerándose (−4,8%)",
    tlPriceGovMargin: "PRICE-GOV margen ajustado +0,3%",
    tlEscalationApproach: "Umbral de escalación aproximándose",
    allAgentsSuspended: "TODOS LOS AGENTES SUSPENDIDOS",
    killSwitchRecommended: "KILL SWITCH RECOMENDADO",
    humanTakeoverActive: "Toma de control humana activa. Esperando revisión manual.",
    sovereigntyBreach: "Violación de soberanía detectada. Se requiere intervención inmediata.",
    eqObservability: "Observabilidad",
    eqGovernance: "Gobernanza",
    eqIntervention: "Intervención",
    eqSovereignty: "Soberanía",
    sectionPositioning: "Posicionamiento",
    posTitle: "No es otro panel de IA más.",
    posDesc1: "ACF Control es una ",
    posDescStrong: "capa de gobernanza decisional",
    posDesc2: " — el sistema nervioso que su organización necesita para mantenerse soberana.",
    posIsNotTitle: "ACF Control NO es",
    posIsTitle: "ACF Control ES",
    posNotItems: [
      "Una herramienta de IA o constructor de agentes",
      "Un repricing o plataforma de marketing",
      "Un panel de reportes pasivo",
      "Un motor de optimización",
      "Un almacén de datos o herramienta de BI",
    ],
    posIsItems: [
      "Un sistema operativo de gobernanza decisional",
      "Un centro de detección de deriva en tiempo real",
      "Un hub de clasificación y respuesta a incidentes",
      "Un centro de intervención de autoridad de mando",
      "Una plataforma de supervisión de soberanía",
    ],
    sectionArchitecture: "Arquitectura",
    modulesTitle: "8 módulos principales",
    modulesSubtitle: "Cada módulo tiene un propósito: mantener a los humanos al mando de las decisiones de las máquinas.",
    mod00Title: "Puntuación de soberanía",
    mod00Sub: "Su referencia de gobernanza — puntuada de 0 a 100 en 4 ejes.",
    mod00Axes: "Distribución · Decisión · Tráfico · Tesorería",
    mod00Export: "Exportar PDF",
    mod01Title: "Registro de decisiones",
    mod01Sub: "Un inventario vivo: quién decide qué, con qué y cómo.",
    mod01PriceAdj: "Ajuste de precios",
    mod01PriceStatus: "Gobernado",
    mod01Replenishment: "Reabastecimiento",
    mod01ReplenishStatus: "Asistido",
    mod01CustExcl: "Exclusión de clientes",
    mod01CustStatus: "Solo humano",
    mod02Title: "Matriz de criticidad",
    mod02Sub: "Impacto × Frecuencia × Irreversibilidad.",
    mod02Optimizable: "Optimizable",
    mod02Governed: "Gobernado",
    mod02HumanOnly: "Solo humano",
    mod03Title: "Constitución agéntica",
    mod03Sub: "Documento de gobernanza estratégica — versionado, firmado, auditable.",
    mod03Items: ["Objetivos prioritarios", "Umbrales críticos", "Reglas de escalación", "Zonas no delegables", "Propietario del Kill Switch"],
    mod03Signed: "Firmado CEO — v2.1 — Feb 2026",
    mod04Title: "Registro de agentes",
    mod04Sub: "Cada agente documentado: mandato, alcance, límites, propietario humano.",
    mod05Title: "Supervisión mínima viable",
    mod05Sub: "5 KPIs por agente. Umbrales. Alertas. Historial de 30 días.",
    mod05Margin: "Margen",
    mod05Escalations: "Escalaciones",
    mod05Overrides: "Anulaciones",
    mod05HumanLoad: "Carga humana",
    mod06Title: "Gobernanza continua",
    mod06Sub: "Revisiones mensuales, auditorías de cumplimiento anuales, seguimiento de la evolución de la gobernanza.",
    mod06Timeline: "Revisión mensual → Auditoría trimestral → Certificación anual",
    mod07Title: "Gestión de crisis",
    mod07Sub: "Clasificación de incidentes en 3 niveles, simulacros de kill switch, protocolos post-mortem.",
    mod07Levels: "Nivel 1: Pausa · Nivel 2: Contener · Nivel 3: Kill",
    sectionKeyDiff: "Diferenciador clave",
    driftTitle: "Drift Engine™",
    driftP1: "Los fallos catastróficos de IA no provienen de bugs — provienen de una ",
    driftP1Strong: "deriva lenta e invisible",
    driftP1End: ". El margen que baja de 32% → 28% sin que nadie lo note. Las escalaciones que se vuelven «normales».",
    driftP2Start: "El Drift Engine calcula ",
    driftP2Strong: "tendencias de 7 y 30 días",
    driftP2Mid: " para cada KPI de agente. Activa alertas ",
    driftP2Gold: "antes de que los umbrales se superen",
    driftP2End: ".",
    driftLow: "Deriva baja",
    driftLowDesc: "Tendencia en movimiento, dentro de tolerancia",
    driftSig: "Deriva significativa",
    driftSigDesc: "Acercándose al límite del umbral",
    driftCrit: "Deriva crítica",
    driftCritDesc: "Se requiere intervención inmediata",
    driftStabilityLabel: "PUNTUACIONES DE ESTABILIDAD DE AGENTES",
    driftDetectionLabel: "DETECCIÓN DE DERIVA — STOCK-AI",
    driftDetected: "⚠ DERIVA DETECTADA",
    drift14dTrend: "Tendencia 14d",
    drift14dAgo: "hace 14d",
    driftNow: "ahora",
    driftMarginWarn: "⚠ Deriva de margen STOCK-AI: −1,8% en 14 días.",
    driftRecommendation: "→ Recomendación: revisar el umbral o reducir el alcance.",
    sectionCommandAuth: "Autoridad de mando",
    interventionTitle: "Intervención inmediata",
    interventionDesc1: "ACF Control no solo alerta — le da el poder de ",
    interventionDescStrong: "actuar en segundos",
    interventionDesc2: ".",
    intSuspend: "Suspender agente",
    intReduceScope: "Reducir alcance",
    intForceEsc: "Forzar escalación",
    intDegraded: "Modo degradado",
    intKillSwitch: "Kill Switch",
    killGlobalLabel: "🛑 KILL SWITCH GLOBAL",
    killGlobalDesc: "Suspender TODOS los agentes autónomos. Modo degradado completo en 60 segundos.",
    killArmedBtn: "⚠ KILL SWITCH ARMADO — Clic para desarmar",
    killArmBtn: "Armar Kill Switch",
    killArmedMsg: "Todos los agentes serán suspendidos tras confirmación. Acción registrada.",
    sectionOnePageAnswer: "Una página, una respuesta",
    dashTitle: "Panel ejecutivo",
    dashQuestion: "Una pregunta, respondida en 30 segundos: ",
    dashQuestionBold: "«¿Somos soberanos hoy?»",
    tabCEO: "Vista CEO",
    tabOps: "Vista operador",
    tabConsultant: "Vista consultor",
    dashActiveAgents: "Agentes activos",
    dashStable: "Estable",
    dashAttention: "Atención",
    dashCritical: "Crítico",
    dashRecentIncidents: "Incidentes recientes",
    dashStockDrift: "Deriva STOCK-AI",
    dashAutoCorrected: "Auto-corregido",
    dashRoutineCheck: "Control de rutina",
    dashAtRisk: "Decisiones en riesgo",
    dashPricingDrift: "Precios → deriva de margen",
    dashInventoryLow: "Inventario → cobertura baja",
    dashNoCritical: "Sin riesgos críticos",
    dashSuspendAll: "🛑 SUSPENDER TODO",
    dashVsLastMonth: "▲ +3,2 vs mes anterior",
    opsTitle: "Vista operador de agentes",
    opsDesc: "Análisis detallado del rendimiento de cada agente. Ajuste reglas, gestione umbrales de deriva, resuelva incidentes.",
    opsIncidents: "Incidentes",
    consultTitle: "Vista consultor certificado",
    consultDesc: "Acceso multi-cliente, benchmarks, plantillas de misión y exportaciones listas para auditoría. Entregue un diagnóstico ACF completo en menos de 2 horas.",
    consultMultiClient: "Multi-cliente",
    consultTemplates: "Plantillas",
    consultBenchmark: "Benchmark",
    consultPDFExport: "Exportar PDF",
    sectionRealMath: "El cálculo real",
    riskTitle1: "¿Cuánto cuesta la ",
    riskTitleRed: "ausencia",
    riskTitle2: " de gobernanza?",
    riskDesc1: "El coste de ACF Control es ",
    riskDescStrong: "insignificante",
    riskDesc2: " comparado con los riesgos financieros, regulatorios y reputacionales que asume sin gobernanza formalizada.",
    riskAIActLabel: "MULTAS AI ACT UE",
    riskAIActDesc1: "Hasta ",
    riskAIActStrong: "35 millones €",
    riskAIActDesc2: " o el 7% de la facturación anual global por incumplimiento de los requisitos de transparencia y supervisión de sistemas de IA de alto riesgo.",
    riskGDPRLabel: "MULTAS RGPD",
    riskGDPRDesc1: "Hasta ",
    riskGDPRStrong: "20 millones €",
    riskGDPRDesc2: " o el 4% de la facturación anual global. Las decisiones automatizadas sin gobernanza multiplican el riesgo de violaciones de datos.",
    riskDriftLabel: "COSTE DE LA DERIVA DE IA",
    riskDriftDesc1: "Pérdida media observada por ",
    riskDriftStrong: "decisiones de IA no controladas",
    riskDriftDesc2: ": errores de precios, inventario deficiente, exclusiones abusivas de clientes, erosión invisible de margen.",
    riskWithout: "RIESGO SIN GOBERNANZA",
    riskMaxExposure: "Exposición acumulada máxima",
    riskACFInvestment: "INVERSIÓN ACF CONTROL",
    riskFraction: "Una fracción de su exposición al riesgo",
    riskStat1: "de las empresas usan agentes de IA sin gobernanza formalizada",
    riskStat2: "de los ejecutivos temen perder el control estratégico de sus agentes",
    riskStat3: "los incidentes aumentan 12x más rápido en organizaciones sin supervisión",
    sectionPlans: "Planes",
    pricingTitle: "Gobernanza a medida, no SaaS estandarizado.",
    pricingDesc: "Cada organización tiene desafíos de soberanía únicos. Adaptamos ACF Control a su arquitectura de agentes, sector y requisitos regulatorios.",
    tierEssential: "ESENCIAL",
    tierEssentialDesc: "Hasta 3 agentes",
    tierProfessional: "PROFESIONAL",
    tierProfessionalDesc: "Hasta 10 agentes",
    tierEnterprise: "EMPRESA",
    tierEnterpriseDesc: "Agentes ilimitados",
    tierRecommended: "RECOMENDADO",
    priceOnRequest: "Precio bajo demanda",
    planRequestDemo: "Solicitar una demo →",
    planContactUs: "Contáctenos",
    featEssential: ["Puntuación de soberanía", "Registro de decisiones", "Matriz de criticidad", "Alertas básicas", "Exportaciones PDF"],
    featProfessional: ["Todo en Esencial +", "Drift Engine™", "Clasificación de incidentes", "Kill Switch (3 niveles)", "Constitución agéntica", "Alertas inteligentes (Slack + Email)", "Acceso consultor"],
    featEnterprise: ["Todo en Profesional +", "Multi-sitio / Multi-BU", "Integraciones personalizadas (API)", "Soporte DDA dedicado", "Pista de auditoría (3 años)", "Opción marca blanca", "SLA 99,9%"],
    partnerLabel: "PROGRAMA DE SOCIOS CERTIFICADOS",
    partnerDesc: "Licencia de consultor anual. Se requiere certificación ACF para acceso de clientes.",
    partnerApply: "Solicitar certificación →",
    statKillSwitch: "Kill switch máx",
    statKPIs: "KPIs de soberanía",
    statControls: "Controles por agente",
    statOperational: "Operativo en",
    ctaLine1: "Deje de volar a ciegas.",
    ctaLine2: "Empiece a gobernar.",
    ctaDesc1: "Sus agentes ya están tomando decisiones. La única pregunta es: ",
    ctaDescStrong: "¿tiene usted el mando?",
    ctaDemo: "Solicitar una demo →",
    ctaScore: "Calcule su ACF Score",
  },
  de: {
    navDecisionGovOS: "ENTSCHEIDUNGS-GOVERNANCE-BS",
    navHome: "Startseite",
    navModules: "Module",
    navDriftEngine: "Drift-Engine",
    navDashboard: "Dashboard",
    navRisks: "Risiken",
    navRequestDemo: "Demo anfragen",
    navStandard: "Der Standard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partner", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "LIVE-GOVERNANCE-SYSTEM",
    heroLine1: "Ihre Agenten entscheiden.",
    heroLine2: "Sie behalten die Kontrolle.",
    heroDesc1: "ACF Control ist das ",
    heroDescStrong: "Betriebssystem für Entscheidungs-Governance",
    heroDesc2: " für Organisationen, die autonome KI-Agenten einsetzen. Erkennen Sie Drift, klassifizieren Sie Vorfälle, greifen Sie sofort ein.",
    heroBookDemo: "Demo buchen →",
    heroWatchDemo: "Demo ansehen",
    heroGDPR: "DSGVO-konform",
    heroEUAI: "EU AI Act bereit",
    heroKillSwitch60: "Kill Switch 60s",
    killSwitchActive: "⚠ KILL SWITCH AKTIV",
    criticalAlert: "🚨 KRITISCHER ALARM",
    controlLive: "ACF CONTROL — LIVE",
    sovereigntyScore: "Souveränitätswert",
    scoreUp: "▲ +3,2 (30T)",
    scoreSuspended: "⬛ AUSGESETZT",
    scoreCritical: "▼ −33 KRITISCH",
    tlKillAll: "⚠ KILL SWITCH AKTIVIERT — Alle Agenten ausgesetzt",
    tlStockDriftBreach: "STOCK-AI-Drift überschritt 300% — Souveränitätsverletzung",
    tlDegradedMode: "Degradierter Modus aktiv — menschliche Übernahme erforderlich",
    tlStockCritical: "🚨 STOCK-AI KRITISCH — Wert 12, Drift +312%",
    tlSovBelow: "Souveränitätswert unter Schwellenwert (41/100)",
    tlStockDrift12: "STOCK-AI-Drift erkannt (−1,2%)",
    tlFraudBlocked: "FRAUD-DET verdächtige Transaktion blockiert",
    tlStockAccel: "⚠ STOCK-AI-Drift beschleunigt sich (−4,8%)",
    tlPriceGovMargin: "PRICE-GOV Marge angepasst +0,3%",
    tlEscalationApproach: "Eskalationsschwelle nähert sich",
    allAgentsSuspended: "ALLE AGENTEN AUSGESETZT",
    killSwitchRecommended: "KILL SWITCH EMPFOHLEN",
    humanTakeoverActive: "Menschliche Übernahme aktiv. Manuelle Prüfung ausstehend.",
    sovereigntyBreach: "Souveränitätsverletzung erkannt. Sofortiges Eingreifen erforderlich.",
    eqObservability: "Beobachtbarkeit",
    eqGovernance: "Governance",
    eqIntervention: "Intervention",
    eqSovereignty: "Souveränität",
    sectionPositioning: "Positionierung",
    posTitle: "Kein weiteres KI-Dashboard.",
    posDesc1: "ACF Control ist eine ",
    posDescStrong: "Entscheidungs-Governance-Schicht",
    posDesc2: " — das Nervensystem, das Ihre Organisation braucht, um souverän zu bleiben.",
    posIsNotTitle: "ACF Control ist NICHT",
    posIsTitle: "ACF Control IST",
    posNotItems: [
      "Ein KI-Tool oder Agenten-Baukasten",
      "Ein Repricing- oder Marketing-Plattform",
      "Ein passives Reporting-Dashboard",
      "Eine Optimierungsmaschine",
      "Ein Data Warehouse oder BI-Tool",
    ],
    posIsItems: [
      "Ein Betriebssystem für Entscheidungs-Governance",
      "Ein Echtzeit-Drift-Erkennungszentrum",
      "Ein Hub für Vorfallklassifizierung und -reaktion",
      "Ein Interventionszentrum der Befehlsautorität",
      "Eine Plattform zur Souveränitätsüberwachung",
    ],
    sectionArchitecture: "Architektur",
    modulesTitle: "8 Kernmodule",
    modulesSubtitle: "Jedes Modul dient einem Zweck: Menschen an der Steuerung von Maschinenentscheidungen zu halten.",
    mod00Title: "Souveränitätswert",
    mod00Sub: "Ihre Governance-Referenz — bewertet von 0 bis 100 auf 4 Achsen.",
    mod00Axes: "Distribution · Entscheidung · Verkehr · Finanzen",
    mod00Export: "PDF-Export",
    mod01Title: "Entscheidungsregister",
    mod01Sub: "Ein lebendiges Inventar: wer entscheidet was, womit und wie.",
    mod01PriceAdj: "Preisanpassung",
    mod01PriceStatus: "Gesteuert",
    mod01Replenishment: "Nachbestellung",
    mod01ReplenishStatus: "Assistiert",
    mod01CustExcl: "Kundenausschluss",
    mod01CustStatus: "Nur manuell",
    mod02Title: "Kritikalitätsmatrix",
    mod02Sub: "Auswirkung × Häufigkeit × Unumkehrbarkeit.",
    mod02Optimizable: "Optimierbar",
    mod02Governed: "Gesteuert",
    mod02HumanOnly: "Nur manuell",
    mod03Title: "Agentische Verfassung",
    mod03Sub: "Strategisches Governance-Dokument — versioniert, signiert, prüfbar.",
    mod03Items: ["Prioritäre Ziele", "Kritische Schwellenwerte", "Eskalationsregeln", "Nicht delegierbare Zonen", "Kill-Switch-Eigentümer"],
    mod03Signed: "Unterzeichnet CEO — v2.1 — Feb 2026",
    mod04Title: "Agentenregister",
    mod04Sub: "Jeder Agent dokumentiert: Mandat, Umfang, Grenzen, menschlicher Eigentümer.",
    mod05Title: "Minimale tragfähige Überwachung",
    mod05Sub: "5 KPIs pro Agent. Schwellenwerte. Alarme. 30-Tage-Verlauf.",
    mod05Margin: "Marge",
    mod05Escalations: "Eskalationen",
    mod05Overrides: "Überschreibungen",
    mod05HumanLoad: "Menschliche Last",
    mod06Title: "Kontinuierliche Governance",
    mod06Sub: "Monatliche Reviews, jährliche Compliance-Audits, Governance-Entwicklungsverfolgung.",
    mod06Timeline: "Monatliches Review → Quartalsaudit → Jahreszertifizierung",
    mod07Title: "Krisenmanagement",
    mod07Sub: "3-stufige Vorfallklassifizierung, Kill-Switch-Übungen, Post-Mortem-Protokolle.",
    mod07Levels: "Stufe 1: Pause · Stufe 2: Eindämmen · Stufe 3: Kill",
    sectionKeyDiff: "Schlüssel-Differenzierung",
    driftTitle: "Drift Engine™",
    driftP1: "Katastrophale KI-Ausfälle kommen nicht von Bugs — sie kommen von ",
    driftP1Strong: "langsamer, unsichtbarer Drift",
    driftP1End: ". Die Marge, die von 32% → 28% sinkt, ohne dass es jemand bemerkt. Eskalationen, die «normal» werden.",
    driftP2Start: "Die Drift Engine berechnet ",
    driftP2Strong: "7-Tage- und 30-Tage-Trends",
    driftP2Mid: " für jeden Agenten-KPI. Sie löst Alarme aus ",
    driftP2Gold: "bevor Schwellenwerte überschritten werden",
    driftP2End: ".",
    driftLow: "Geringe Drift",
    driftLowDesc: "Trend bewegt sich, innerhalb der Toleranz",
    driftSig: "Signifikante Drift",
    driftSigDesc: "Annäherung an die Schwellengrenze",
    driftCrit: "Kritische Drift",
    driftCritDesc: "Sofortiges Eingreifen erforderlich",
    driftStabilityLabel: "AGENTEN-STABILITÄTSWERTE",
    driftDetectionLabel: "DRIFT-ERKENNUNG — STOCK-AI",
    driftDetected: "⚠ DRIFT ERKANNT",
    drift14dTrend: "14-Tage-Trend",
    drift14dAgo: "vor 14T",
    driftNow: "jetzt",
    driftMarginWarn: "⚠ STOCK-AI Margendrift: −1,8% über 14 Tage.",
    driftRecommendation: "→ Empfehlung: Schwellenwert überprüfen oder Umfang reduzieren.",
    sectionCommandAuth: "Befehlsautorität",
    interventionTitle: "Sofortige Intervention",
    interventionDesc1: "ACF Control alarmiert nicht nur — es gibt Ihnen die Macht, ",
    interventionDescStrong: "in Sekunden zu handeln",
    interventionDesc2: ".",
    intSuspend: "Agent aussetzen",
    intReduceScope: "Umfang reduzieren",
    intForceEsc: "Eskalation erzwingen",
    intDegraded: "Degradierter Modus",
    intKillSwitch: "Kill Switch",
    killGlobalLabel: "🛑 GLOBALER KILL SWITCH",
    killGlobalDesc: "ALLE autonomen Agenten aussetzen. Vollständig degradierter Modus innerhalb von 60 Sekunden.",
    killArmedBtn: "⚠ KILL SWITCH SCHARF — Klicken zum Entschärfen",
    killArmBtn: "Kill Switch scharf schalten",
    killArmedMsg: "Alle Agenten werden nach Bestätigung ausgesetzt. Aktion protokolliert.",
    sectionOnePageAnswer: "Eine Seite, eine Antwort",
    dashTitle: "Executive-Dashboard",
    dashQuestion: "Eine Frage, beantwortet in 30 Sekunden: ",
    dashQuestionBold: "«Sind wir heute souverän?»",
    tabCEO: "CEO-Ansicht",
    tabOps: "Operator-Ansicht",
    tabConsultant: "Berater-Ansicht",
    dashActiveAgents: "Aktive Agenten",
    dashStable: "Stabil",
    dashAttention: "Achtung",
    dashCritical: "Kritisch",
    dashRecentIncidents: "Letzte Vorfälle",
    dashStockDrift: "STOCK-AI-Drift",
    dashAutoCorrected: "Auto-korrigiert",
    dashRoutineCheck: "Routineprüfung",
    dashAtRisk: "Gefährdete Entscheidungen",
    dashPricingDrift: "Preisgestaltung → Margendrift",
    dashInventoryLow: "Bestand → geringe Abdeckung",
    dashNoCritical: "Keine kritischen Risiken",
    dashSuspendAll: "🛑 ALLE AUSSETZEN",
    dashVsLastMonth: "▲ +3,2 vs Vormonat",
    opsTitle: "Agenten-Operator-Ansicht",
    opsDesc: "Tiefgehende Analyse der Leistung jedes Agenten. Regeln anpassen, Drift-Schwellenwerte verwalten, Vorfälle lösen.",
    opsIncidents: "Vorfälle",
    consultTitle: "Zertifizierte Berater-Ansicht",
    consultDesc: "Multi-Client-Zugang, Benchmarks, Auftragsvorlagen und audit-fertige Exporte. Liefern Sie eine vollständige ACF-Diagnose in unter 2 Stunden.",
    consultMultiClient: "Multi-Client",
    consultTemplates: "Vorlagen",
    consultBenchmark: "Benchmark",
    consultPDFExport: "PDF-Export",
    sectionRealMath: "Die wahre Rechnung",
    riskTitle1: "Was kostet das ",
    riskTitleRed: "Fehlen",
    riskTitle2: " von Governance?",
    riskDesc1: "Die Kosten von ACF Control sind ",
    riskDescStrong: "vernachlässigbar",
    riskDesc2: " im Vergleich zu den finanziellen, regulatorischen und reputationsbezogenen Risiken, die Sie ohne formalisierte Governance eingehen.",
    riskAIActLabel: "EU AI ACT BUSSGELDER",
    riskAIActDesc1: "Bis zu ",
    riskAIActStrong: "35 Millionen €",
    riskAIActDesc2: " oder 7% des weltweiten Jahresumsatzes bei Nichteinhaltung der Transparenz- und Aufsichtsanforderungen für Hochrisiko-KI-Systeme.",
    riskGDPRLabel: "DSGVO-BUSSGELDER",
    riskGDPRDesc1: "Bis zu ",
    riskGDPRStrong: "20 Millionen €",
    riskGDPRDesc2: " oder 4% des weltweiten Jahresumsatzes. Nicht gesteuerte automatisierte Entscheidungen vervielfachen das Risiko von Datenverstößen.",
    riskDriftLabel: "KOSTEN VON KI-DRIFT",
    riskDriftDesc1: "Durchschnittlicher beobachteter Verlust durch ",
    riskDriftStrong: "unkontrollierte KI-Entscheidungen",
    riskDriftDesc2: ": Preisfehler, defekter Bestand, missbräuchliche Kundenausschlüsse, unsichtbare Margenerosion.",
    riskWithout: "RISIKO OHNE GOVERNANCE",
    riskMaxExposure: "Maximale kumulative Exposition",
    riskACFInvestment: "ACF CONTROL INVESTITION",
    riskFraction: "Ein Bruchteil Ihrer Risikoexposition",
    riskStat1: "der Unternehmen setzen KI-Agenten ohne formalisierte Governance ein",
    riskStat2: "der Führungskräfte fürchten den Verlust der strategischen Kontrolle über ihre Agenten",
    riskStat3: "Vorfälle steigen 12x schneller in Organisationen ohne Überwachung",
    sectionPlans: "Tarife",
    pricingTitle: "Maßgeschneiderte Governance, kein Standard-SaaS.",
    pricingDesc: "Jede Organisation hat einzigartige Souveränitätsherausforderungen. Wir passen ACF Control an Ihre Agentenarchitektur, Branche und regulatorischen Anforderungen an.",
    tierEssential: "ESSENTIAL",
    tierEssentialDesc: "Bis zu 3 Agenten",
    tierProfessional: "PROFESSIONAL",
    tierProfessionalDesc: "Bis zu 10 Agenten",
    tierEnterprise: "ENTERPRISE",
    tierEnterpriseDesc: "Unbegrenzte Agenten",
    tierRecommended: "EMPFOHLEN",
    priceOnRequest: "Preis auf Anfrage",
    planRequestDemo: "Demo anfragen →",
    planContactUs: "Kontaktieren Sie uns",
    featEssential: ["Souveränitätswert", "Entscheidungsregister", "Kritikalitätsmatrix", "Basis-Alarme", "PDF-Exporte"],
    featProfessional: ["Alles in Essential +", "Drift Engine™", "Vorfallklassifizierung", "Kill Switch (3 Stufen)", "Agentische Verfassung", "Intelligente Alarme (Slack + E-Mail)", "Beraterzugang"],
    featEnterprise: ["Alles in Professional +", "Multi-Standort / Multi-BU", "Individuelle Integrationen (API)", "Dedizierter DDA-Support", "Audit-Trail (3 Jahre)", "White-Label-Option", "SLA 99,9%"],
    partnerLabel: "ZERTIFIZIERTES PARTNERPROGRAMM",
    partnerDesc: "Jährliche Beraterlizenz. ACF-Zertifizierung für Kundenzugang erforderlich.",
    partnerApply: "Für Zertifizierung bewerben →",
    statKillSwitch: "Kill Switch max",
    statKPIs: "Souveränitäts-KPIs",
    statControls: "Kontrollen pro Agent",
    statOperational: "Betriebsbereit in",
    ctaLine1: "Hören Sie auf, blind zu fliegen.",
    ctaLine2: "Beginnen Sie zu steuern.",
    ctaDesc1: "Ihre Agenten treffen bereits Entscheidungen. Die einzige Frage ist: ",
    ctaDescStrong: "haben Sie das Kommando?",
    ctaDemo: "Demo anfragen →",
    ctaScore: "Berechnen Sie Ihren ACF Score",
  },
  pt: {
    navDecisionGovOS: "SO DE GOVERNANÇA DECISIONAL",
    navHome: "Início",
    navModules: "Módulos",
    navDriftEngine: "Motor de deriva",
    navDashboard: "Painel",
    navRisks: "Riscos",
    navRequestDemo: "Solicitar uma demo",
    navStandard: "O Padrão", navScore: "ACF Score", navBlog: "Blog", navPartners: "Parceiros", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "SISTEMA DE GOVERNANÇA AO VIVO",
    heroLine1: "Os seus agentes decidem.",
    heroLine2: "Você mantém o controlo.",
    heroDesc1: "ACF Control é o ",
    heroDescStrong: "sistema operativo de governança decisional",
    heroDesc2: " para organizações que implantam agentes de IA autónomos. Detete a deriva, classifique incidentes, intervenha instantaneamente.",
    heroBookDemo: "Agendar uma demo →",
    heroWatchDemo: "Ver demo",
    heroGDPR: "Conforme com RGPD",
    heroEUAI: "Preparado para AI Act UE",
    heroKillSwitch60: "Kill Switch 60s",
    killSwitchActive: "⚠ KILL SWITCH ATIVO",
    criticalAlert: "🚨 ALERTA CRÍTICO",
    controlLive: "ACF CONTROL — AO VIVO",
    sovereigntyScore: "Pontuação de soberania",
    scoreUp: "▲ +3,2 (30d)",
    scoreSuspended: "⬛ SUSPENSO",
    scoreCritical: "▼ −33 CRÍTICO",
    tlKillAll: "⚠ KILL SWITCH ATIVADO — Todos os agentes suspensos",
    tlStockDriftBreach: "Deriva STOCK-AI excedeu 300% — violação de soberania",
    tlDegradedMode: "Modo degradado ativo — tomada de controlo humana necessária",
    tlStockCritical: "🚨 STOCK-AI CRÍTICO — Pontuação 12, deriva +312%",
    tlSovBelow: "Pontuação de soberania abaixo do limiar (41/100)",
    tlStockDrift12: "Deriva STOCK-AI detetada (−1,2%)",
    tlFraudBlocked: "FRAUD-DET transação suspeita bloqueada",
    tlStockAccel: "⚠ Deriva STOCK-AI a acelerar (−4,8%)",
    tlPriceGovMargin: "PRICE-GOV margem ajustada +0,3%",
    tlEscalationApproach: "Limiar de escalação a aproximar-se",
    allAgentsSuspended: "TODOS OS AGENTES SUSPENSOS",
    killSwitchRecommended: "KILL SWITCH RECOMENDADO",
    humanTakeoverActive: "Tomada de controlo humana ativa. A aguardar revisão manual.",
    sovereigntyBreach: "Violação de soberania detetada. Intervenção imediata necessária.",
    eqObservability: "Observabilidade",
    eqGovernance: "Governança",
    eqIntervention: "Intervenção",
    eqSovereignty: "Soberania",
    sectionPositioning: "Posicionamento",
    posTitle: "Não é mais um painel de IA.",
    posDesc1: "ACF Control é uma ",
    posDescStrong: "camada de governança decisional",
    posDesc2: " — o sistema nervoso de que a sua organização precisa para se manter soberana.",
    posIsNotTitle: "ACF Control NÃO é",
    posIsTitle: "ACF Control É",
    posNotItems: [
      "Uma ferramenta de IA ou construtor de agentes",
      "Um repricing ou plataforma de marketing",
      "Um painel de relatórios passivo",
      "Um motor de otimização",
      "Um armazém de dados ou ferramenta de BI",
    ],
    posIsItems: [
      "Um sistema operativo de governança decisional",
      "Um centro de deteção de deriva em tempo real",
      "Um hub de classificação e resposta a incidentes",
      "Um centro de intervenção de autoridade de comando",
      "Uma plataforma de supervisão de soberania",
    ],
    sectionArchitecture: "Arquitetura",
    modulesTitle: "8 módulos principais",
    modulesSubtitle: "Cada módulo tem um propósito: manter os humanos no comando das decisões das máquinas.",
    mod00Title: "Pontuação de soberania",
    mod00Sub: "A sua referência de governança — pontuada de 0 a 100 em 4 eixos.",
    mod00Axes: "Distribuição · Decisão · Tráfego · Tesouraria",
    mod00Export: "Exportar PDF",
    mod01Title: "Registo de decisões",
    mod01Sub: "Um inventário vivo: quem decide o quê, com o quê e como.",
    mod01PriceAdj: "Ajuste de preço",
    mod01PriceStatus: "Governado",
    mod01Replenishment: "Reabastecimento",
    mod01ReplenishStatus: "Assistido",
    mod01CustExcl: "Exclusão de clientes",
    mod01CustStatus: "Apenas humano",
    mod02Title: "Matriz de criticidade",
    mod02Sub: "Impacto × Frequência × Irreversibilidade.",
    mod02Optimizable: "Otimizável",
    mod02Governed: "Governado",
    mod02HumanOnly: "Apenas humano",
    mod03Title: "Constituição agêntica",
    mod03Sub: "Documento de governança estratégica — versionado, assinado, auditável.",
    mod03Items: ["Objetivos prioritários", "Limiares críticos", "Regras de escalação", "Zonas não delegáveis", "Proprietário do Kill Switch"],
    mod03Signed: "Assinado CEO — v2.1 — Fev 2026",
    mod04Title: "Registo de agentes",
    mod04Sub: "Cada agente documentado: mandato, âmbito, limites, proprietário humano.",
    mod05Title: "Supervisão mínima viável",
    mod05Sub: "5 KPIs por agente. Limiares. Alertas. Histórico de 30 dias.",
    mod05Margin: "Margem",
    mod05Escalations: "Escalações",
    mod05Overrides: "Substituições",
    mod05HumanLoad: "Carga humana",
    mod06Title: "Governança contínua",
    mod06Sub: "Revisões mensais, auditorias de conformidade anuais, acompanhamento da evolução da governança.",
    mod06Timeline: "Revisão mensal → Auditoria trimestral → Certificação anual",
    mod07Title: "Gestão de crises",
    mod07Sub: "Classificação de incidentes em 3 níveis, exercícios de kill switch, protocolos pós-mortem.",
    mod07Levels: "Nível 1: Pausa · Nível 2: Conter · Nível 3: Kill",
    sectionKeyDiff: "Diferenciador-chave",
    driftTitle: "Drift Engine™",
    driftP1: "Falhas catastróficas de IA não vêm de bugs — vêm de uma ",
    driftP1Strong: "deriva lenta e invisível",
    driftP1End: ". A margem que desliza de 32% → 28% sem que ninguém note. Escalações que se tornam «normais».",
    driftP2Start: "O Drift Engine calcula ",
    driftP2Strong: "tendências de 7 e 30 dias",
    driftP2Mid: " para cada KPI de agente. Dispara alertas ",
    driftP2Gold: "antes mesmo que os limiares sejam ultrapassados",
    driftP2End: ".",
    driftLow: "Deriva baixa",
    driftLowDesc: "Tendência em movimento, dentro da tolerância",
    driftSig: "Deriva significativa",
    driftSigDesc: "A aproximar-se do limite do limiar",
    driftCrit: "Deriva crítica",
    driftCritDesc: "Intervenção imediata necessária",
    driftStabilityLabel: "PONTUAÇÕES DE ESTABILIDADE DOS AGENTES",
    driftDetectionLabel: "DETEÇÃO DE DERIVA — STOCK-AI",
    driftDetected: "⚠ DERIVA DETETADA",
    drift14dTrend: "Tendência 14d",
    drift14dAgo: "há 14d",
    driftNow: "agora",
    driftMarginWarn: "⚠ Deriva de margem STOCK-AI: −1,8% em 14 dias.",
    driftRecommendation: "→ Recomendação: rever o limiar ou reduzir o âmbito.",
    sectionCommandAuth: "Autoridade de comando",
    interventionTitle: "Intervenção imediata",
    interventionDesc1: "ACF Control não se limita a alertar — dá-lhe o poder de ",
    interventionDescStrong: "agir em segundos",
    interventionDesc2: ".",
    intSuspend: "Suspender agente",
    intReduceScope: "Reduzir âmbito",
    intForceEsc: "Forçar escalação",
    intDegraded: "Modo degradado",
    intKillSwitch: "Kill Switch",
    killGlobalLabel: "🛑 KILL SWITCH GLOBAL",
    killGlobalDesc: "Suspender TODOS os agentes autónomos. Modo degradado completo em 60 segundos.",
    killArmedBtn: "⚠ KILL SWITCH ARMADO — Clique para desarmar",
    killArmBtn: "Armar Kill Switch",
    killArmedMsg: "Todos os agentes serão suspensos após confirmação. Ação registada.",
    sectionOnePageAnswer: "Uma página, uma resposta",
    dashTitle: "Painel executivo",
    dashQuestion: "Uma pergunta, respondida em 30 segundos: ",
    dashQuestionBold: "«Somos soberanos hoje?»",
    tabCEO: "Vista CEO",
    tabOps: "Vista operador",
    tabConsultant: "Vista consultor",
    dashActiveAgents: "Agentes ativos",
    dashStable: "Estável",
    dashAttention: "Atenção",
    dashCritical: "Crítico",
    dashRecentIncidents: "Incidentes recentes",
    dashStockDrift: "Deriva STOCK-AI",
    dashAutoCorrected: "Auto-corrigido",
    dashRoutineCheck: "Verificação de rotina",
    dashAtRisk: "Decisões em risco",
    dashPricingDrift: "Preços → deriva de margem",
    dashInventoryLow: "Inventário → cobertura baixa",
    dashNoCritical: "Sem riscos críticos",
    dashSuspendAll: "🛑 SUSPENDER TUDO",
    dashVsLastMonth: "▲ +3,2 vs mês anterior",
    opsTitle: "Vista operador de agentes",
    opsDesc: "Análise detalhada do desempenho de cada agente. Ajuste regras, gira limiares de deriva, resolva incidentes.",
    opsIncidents: "Incidentes",
    consultTitle: "Vista consultor certificado",
    consultDesc: "Acesso multi-cliente, benchmarks, modelos de missão e exportações prontas para auditoria. Entregue um diagnóstico ACF completo em menos de 2 horas.",
    consultMultiClient: "Multi-cliente",
    consultTemplates: "Modelos",
    consultBenchmark: "Benchmark",
    consultPDFExport: "Exportar PDF",
    sectionRealMath: "O cálculo real",
    riskTitle1: "Quanto custa a ",
    riskTitleRed: "ausência",
    riskTitle2: " de governança?",
    riskDesc1: "O custo do ACF Control é ",
    riskDescStrong: "negligenciável",
    riskDesc2: " comparado com os riscos financeiros, regulatórios e reputacionais que assume sem governança formalizada.",
    riskAIActLabel: "MULTAS AI ACT UE",
    riskAIActDesc1: "Até ",
    riskAIActStrong: "35 milhões €",
    riskAIActDesc2: " ou 7% do volume de negócios anual global por incumprimento dos requisitos de transparência e supervisão de sistemas de IA de alto risco.",
    riskGDPRLabel: "MULTAS RGPD",
    riskGDPRDesc1: "Até ",
    riskGDPRStrong: "20 milhões €",
    riskGDPRDesc2: " ou 4% do volume de negócios anual global. Decisões automatizadas sem governança multiplicam o risco de violações de dados.",
    riskDriftLabel: "CUSTO DA DERIVA DE IA",
    riskDriftDesc1: "Perda média observada por ",
    riskDriftStrong: "decisões de IA não controladas",
    riskDriftDesc2: ": erros de preços, inventário deficiente, exclusões abusivas de clientes, erosão invisível de margem.",
    riskWithout: "RISCO SEM GOVERNANÇA",
    riskMaxExposure: "Exposição acumulada máxima",
    riskACFInvestment: "INVESTIMENTO ACF CONTROL",
    riskFraction: "Uma fração da sua exposição ao risco",
    riskStat1: "das empresas usam agentes de IA sem governança formalizada",
    riskStat2: "dos executivos temem perder o controlo estratégico dos seus agentes",
    riskStat3: "os incidentes aumentam 12x mais rápido em organizações sem supervisão",
    sectionPlans: "Planos",
    pricingTitle: "Governança à medida, não SaaS padronizado.",
    pricingDesc: "Cada organização tem desafios de soberania únicos. Adaptamos o ACF Control à sua arquitetura de agentes, setor e requisitos regulatórios.",
    tierEssential: "ESSENCIAL",
    tierEssentialDesc: "Até 3 agentes",
    tierProfessional: "PROFISSIONAL",
    tierProfessionalDesc: "Até 10 agentes",
    tierEnterprise: "ENTERPRISE",
    tierEnterpriseDesc: "Agentes ilimitados",
    tierRecommended: "RECOMENDADO",
    priceOnRequest: "Preço sob consulta",
    planRequestDemo: "Solicitar uma demo →",
    planContactUs: "Contacte-nos",
    featEssential: ["Pontuação de soberania", "Registo de decisões", "Matriz de criticidade", "Alertas básicos", "Exportações PDF"],
    featProfessional: ["Tudo em Essencial +", "Drift Engine™", "Classificação de incidentes", "Kill Switch (3 níveis)", "Constituição agêntica", "Alertas inteligentes (Slack + Email)", "Acesso consultor"],
    featEnterprise: ["Tudo em Profissional +", "Multi-site / Multi-BU", "Integrações personalizadas (API)", "Suporte DDA dedicado", "Trilha de auditoria (3 anos)", "Opção marca branca", "SLA 99,9%"],
    partnerLabel: "PROGRAMA DE PARCEIROS CERTIFICADOS",
    partnerDesc: "Licença de consultor anual. Certificação ACF necessária para acesso de clientes.",
    partnerApply: "Candidatar-se à certificação →",
    statKillSwitch: "Kill switch máx",
    statKPIs: "KPIs de soberania",
    statControls: "Controlos por agente",
    statOperational: "Operacional em",
    ctaLine1: "Pare de voar às cegas.",
    ctaLine2: "Comece a governar.",
    ctaDesc1: "Os seus agentes já estão a tomar decisões. A única questão é: ",
    ctaDescStrong: "está no comando?",
    ctaDemo: "Solicitar uma demo →",
    ctaScore: "Calcule o seu ACF Score",
  },
  ja: {
    navDecisionGovOS: "意思決定ガバナンスOS",
    navHome: "ホーム",
    navModules: "モジュール",
    navDriftEngine: "ドリフトエンジン",
    navDashboard: "ダッシュボード",
    navRisks: "リスク",
    navRequestDemo: "デモを依頼",
    navStandard: "スタンダード", navScore: "ACF Score", navBlog: "ブログ", navPartners: "パートナー", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "ライブガバナンスシステム",
    heroLine1: "エージェントが決定する。",
    heroLine2: "あなたが統制する。",
    heroDesc1: "ACF Controlは、自律型AIエージェントを展開する組織のための",
    heroDescStrong: "意思決定ガバナンスオペレーティングシステム",
    heroDesc2: "です。ドリフトを検知し、インシデントを分類し、即座に介入します。",
    heroBookDemo: "デモを予約 →",
    heroWatchDemo: "デモを見る",
    heroGDPR: "GDPR準拠",
    heroEUAI: "EU AI Act対応",
    heroKillSwitch60: "キルスイッチ 60秒",
    killSwitchActive: "⚠ キルスイッチ作動中",
    criticalAlert: "🚨 重大アラート",
    controlLive: "ACF CONTROL — ライブ",
    sovereigntyScore: "主権スコア",
    scoreUp: "▲ +3.2（30日）",
    scoreSuspended: "⬛ 停止中",
    scoreCritical: "▼ −33 重大",
    tlKillAll: "⚠ キルスイッチ発動 — 全エージェント停止",
    tlStockDriftBreach: "STOCK-AIドリフトが300%超過 — 主権違反",
    tlDegradedMode: "縮退モード有効 — 人間の引き継ぎが必要",
    tlStockCritical: "🚨 STOCK-AI 重大 — スコア12、ドリフト+312%",
    tlSovBelow: "主権スコアが閾値以下（41/100）",
    tlStockDrift12: "STOCK-AIドリフト検知（−1.2%）",
    tlFraudBlocked: "FRAUD-DET 不審な取引をブロック",
    tlStockAccel: "⚠ STOCK-AIドリフト加速中（−4.8%）",
    tlPriceGovMargin: "PRICE-GOV マージン調整 +0.3%",
    tlEscalationApproach: "エスカレーション閾値に接近",
    allAgentsSuspended: "全エージェント停止",
    killSwitchRecommended: "キルスイッチ推奨",
    humanTakeoverActive: "人間の引き継ぎ有効。手動レビュー待ち。",
    sovereigntyBreach: "主権違反を検知。即時介入が必要。",
    eqObservability: "可観測性",
    eqGovernance: "ガバナンス",
    eqIntervention: "介入",
    eqSovereignty: "主権",
    sectionPositioning: "ポジショニング",
    posTitle: "単なるAIダッシュボードではない。",
    posDesc1: "ACF Controlは",
    posDescStrong: "意思決定ガバナンスレイヤー",
    posDesc2: " — 組織が主権を維持するために必要な神経系統です。",
    posIsNotTitle: "ACF Controlはこれではない",
    posIsTitle: "ACF Controlはこれである",
    posNotItems: [
      "AIツールやエージェントビルダー",
      "リプライシングやマーケティングプラットフォーム",
      "受動的なレポートダッシュボード",
      "最適化エンジン",
      "データウェアハウスやBIツール",
    ],
    posIsItems: [
      "意思決定ガバナンスオペレーティングシステム",
      "リアルタイムドリフト検知センター",
      "インシデント分類・対応ハブ",
      "指揮権限介入センター",
      "主権監督プラットフォーム",
    ],
    sectionArchitecture: "アーキテクチャ",
    modulesTitle: "8つのコアモジュール",
    modulesSubtitle: "各モジュールの目的はひとつ：機械の意思決定において人間の指揮権を維持すること。",
    mod00Title: "主権スコア",
    mod00Sub: "ガバナンスの基準値 — 4軸で0〜100のスコア。",
    mod00Axes: "流通 · 意思決定 · トラフィック · 財務",
    mod00Export: "PDF出力",
    mod01Title: "意思決定レジストリ",
    mod01Sub: "生きたインベントリ：誰が何を、何で、どう決定するか。",
    mod01PriceAdj: "価格調整",
    mod01PriceStatus: "統制済み",
    mod01Replenishment: "補充",
    mod01ReplenishStatus: "支援付き",
    mod01CustExcl: "顧客除外",
    mod01CustStatus: "人間のみ",
    mod02Title: "重要度マトリックス",
    mod02Sub: "影響 × 頻度 × 不可逆性。",
    mod02Optimizable: "最適化可能",
    mod02Governed: "統制済み",
    mod02HumanOnly: "人間のみ",
    mod03Title: "エージェント憲章",
    mod03Sub: "戦略的ガバナンス文書 — バージョン管理、署名、監査可能。",
    mod03Items: ["優先目標", "重要閾値", "エスカレーション規則", "委任不可領域", "キルスイッチ所有者"],
    mod03Signed: "CEO署名 — v2.1 — 2026年2月",
    mod04Title: "エージェントレジストリ",
    mod04Sub: "各エージェントを文書化：任務、範囲、制限、人間の所有者。",
    mod05Title: "最小限の実行可能な監督",
    mod05Sub: "エージェントごとに5つのKPI。閾値。アラート。30日間の履歴。",
    mod05Margin: "マージン",
    mod05Escalations: "エスカレーション",
    mod05Overrides: "オーバーライド",
    mod05HumanLoad: "人的負荷",
    mod06Title: "継続的ガバナンス",
    mod06Sub: "月次レビュー、年次コンプライアンス監査、ガバナンス進化の追跡。",
    mod06Timeline: "月次レビュー → 四半期監査 → 年次認証",
    mod07Title: "危機管理",
    mod07Sub: "3段階のインシデント分類、キルスイッチ訓練、事後検証プロトコル。",
    mod07Levels: "レベル1：一時停止 · レベル2：封じ込め · レベル3：キル",
    sectionKeyDiff: "主要差別化要因",
    driftTitle: "Drift Engine™",
    driftP1: "壊滅的なAI障害はバグからではなく、",
    driftP1Strong: "緩やかで目に見えないドリフト",
    driftP1End: "から発生します。誰も気づかないうちに32%→28%に下がるマージン。「普通」になるエスカレーション。",
    driftP2Start: "Drift Engineは各エージェントKPIの",
    driftP2Strong: "7日間および30日間のトレンド",
    driftP2Mid: "を計算します。",
    driftP2Gold: "閾値が突破される前に",
    driftP2End: "アラートを発動します。",
    driftLow: "低ドリフト",
    driftLowDesc: "トレンドが動いているが許容範囲内",
    driftSig: "重大なドリフト",
    driftSigDesc: "閾値の境界に接近",
    driftCrit: "危機的ドリフト",
    driftCritDesc: "即時介入が必要",
    driftStabilityLabel: "エージェント安定性スコア",
    driftDetectionLabel: "ドリフト検知 — STOCK-AI",
    driftDetected: "⚠ ドリフト検知",
    drift14dTrend: "14日間トレンド",
    drift14dAgo: "14日前",
    driftNow: "現在",
    driftMarginWarn: "⚠ STOCK-AIマージンドリフト：14日間で−1.8%。",
    driftRecommendation: "→ 推奨：閾値の見直しまたは範囲の縮小。",
    sectionCommandAuth: "指揮権限",
    interventionTitle: "即時介入",
    interventionDesc1: "ACF Controlはアラートだけではなく、",
    interventionDescStrong: "数秒で行動する",
    interventionDesc2: "力を与えます。",
    intSuspend: "エージェント停止",
    intReduceScope: "範囲縮小",
    intForceEsc: "強制エスカレーション",
    intDegraded: "縮退モード",
    intKillSwitch: "キルスイッチ",
    killGlobalLabel: "🛑 グローバルキルスイッチ",
    killGlobalDesc: "全自律エージェントを停止。60秒以内に完全縮退モード。",
    killArmedBtn: "⚠ キルスイッチ準備完了 — クリックで解除",
    killArmBtn: "キルスイッチを準備",
    killArmedMsg: "確認後、全エージェントが停止されます。操作は記録されます。",
    sectionOnePageAnswer: "1ページ、1つの答え",
    dashTitle: "エグゼクティブダッシュボード",
    dashQuestion: "30秒で回答される1つの質問：",
    dashQuestionBold: "「今日、我々は主権を保っているか？」",
    tabCEO: "CEO表示",
    tabOps: "オペレーター表示",
    tabConsultant: "コンサルタント表示",
    dashActiveAgents: "アクティブエージェント",
    dashStable: "安定",
    dashAttention: "注意",
    dashCritical: "重大",
    dashRecentIncidents: "最近のインシデント",
    dashStockDrift: "STOCK-AIドリフト",
    dashAutoCorrected: "自動修正済み",
    dashRoutineCheck: "定期チェック",
    dashAtRisk: "リスクのある決定",
    dashPricingDrift: "価格設定 → マージンドリフト",
    dashInventoryLow: "在庫 → カバレッジ不足",
    dashNoCritical: "重大なリスクなし",
    dashSuspendAll: "🛑 全停止",
    dashVsLastMonth: "▲ +3.2 先月比",
    opsTitle: "エージェントオペレーター表示",
    opsDesc: "各エージェントのパフォーマンスを詳細分析。ルールの調整、ドリフト閾値の管理、インシデントの解決。",
    opsIncidents: "インシデント",
    consultTitle: "認定コンサルタント表示",
    consultDesc: "マルチクライアントアクセス、ベンチマーク、ミッションテンプレート、監査対応エクスポート。2時間以内にACF診断を完了。",
    consultMultiClient: "マルチクライアント",
    consultTemplates: "テンプレート",
    consultBenchmark: "ベンチマーク",
    consultPDFExport: "PDF出力",
    sectionRealMath: "本当の計算",
    riskTitle1: "ガバナンスの",
    riskTitleRed: "不在",
    riskTitle2: "にはいくらかかるか？",
    riskDesc1: "ACF Controlのコストは、正式なガバナンスなしに負っている財務的、規制的、評判上のリスクと比較して",
    riskDescStrong: "ごくわずか",
    riskDesc2: "です。",
    riskAIActLabel: "EU AI ACT 罰金",
    riskAIActDesc1: "高リスクAIシステムの透明性・監督要件の不遵守に対し、最大",
    riskAIActStrong: "3,500万ユーロ",
    riskAIActDesc2: "または全世界年間売上高の7%。",
    riskGDPRLabel: "GDPR 罰金",
    riskGDPRDesc1: "最大",
    riskGDPRStrong: "2,000万ユーロ",
    riskGDPRDesc2: "または全世界年間売上高の4%。統制されていない自動決定はデータ侵害のリスクを増大させます。",
    riskDriftLabel: "AIドリフトのコスト",
    riskDriftDesc1: "",
    riskDriftStrong: "制御されていないAI決定",
    riskDriftDesc2: "による平均観測損失：価格設定エラー、在庫不良、不当な顧客除外、見えないマージン侵食。",
    riskWithout: "ガバナンスなしのリスク",
    riskMaxExposure: "最大累積エクスポージャー",
    riskACFInvestment: "ACF CONTROL 投資額",
    riskFraction: "リスクエクスポージャーのごく一部",
    riskStat1: "の企業が正式なガバナンスなしにAIエージェントを使用",
    riskStat2: "の経営者がエージェントに対する戦略的統制の喪失を懸念",
    riskStat3: "監督のない組織ではインシデントが12倍速く増加",
    sectionPlans: "プラン",
    pricingTitle: "オーダーメイドのガバナンス、汎用SaaSではない。",
    pricingDesc: "各組織には固有の主権課題があります。お客様のエージェントアーキテクチャ、業界、規制要件に合わせてACF Controlをカスタマイズします。",
    tierEssential: "エッセンシャル",
    tierEssentialDesc: "エージェント3台まで",
    tierProfessional: "プロフェッショナル",
    tierProfessionalDesc: "エージェント10台まで",
    tierEnterprise: "エンタープライズ",
    tierEnterpriseDesc: "エージェント無制限",
    tierRecommended: "推奨",
    priceOnRequest: "お問い合わせ価格",
    planRequestDemo: "デモを依頼 →",
    planContactUs: "お問い合わせ",
    featEssential: ["主権スコア", "意思決定レジストリ", "重要度マトリックス", "基本アラート", "PDFエクスポート"],
    featProfessional: ["エッセンシャルの全機能 +", "Drift Engine™", "インシデント分類", "キルスイッチ（3段階）", "エージェント憲章", "スマートアラート（Slack + Email）", "コンサルタントアクセス"],
    featEnterprise: ["プロフェッショナルの全機能 +", "マルチサイト / マルチBU", "カスタム統合（API）", "専任DDAサポート", "監査証跡（3年）", "ホワイトラベルオプション", "SLA 99.9%"],
    partnerLabel: "認定パートナープログラム",
    partnerDesc: "年間コンサルタントライセンス。クライアントアクセスにはACF認定が必要。",
    partnerApply: "認定に申請 →",
    statKillSwitch: "キルスイッチ最大",
    statKPIs: "主権KPI",
    statControls: "エージェントあたりの統制",
    statOperational: "稼働開始",
    ctaLine1: "盲目飛行をやめよう。",
    ctaLine2: "ガバナンスを始めよう。",
    ctaDesc1: "あなたのエージェントはすでに意思決定しています。唯一の問いは：",
    ctaDescStrong: "あなたは指揮を執っていますか？",
    ctaDemo: "デモを依頼 →",
    ctaScore: "ACF Scoreを計算する",
  },
  zh: {
    navDecisionGovOS: "决策治理操作系统",
    navHome: "首页",
    navModules: "模块",
    navDriftEngine: "漂移引擎",
    navDashboard: "仪表盘",
    navRisks: "风险",
    navRequestDemo: "申请演示",
    navStandard: "标准", navScore: "ACF Score", navBlog: "博客", navPartners: "合作伙伴", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "实时治理系统",
    heroLine1: "您的智能体在决策。",
    heroLine2: "您保持控制。",
    heroDesc1: "ACF Control是为部署自主AI智能体的组织打造的",
    heroDescStrong: "决策治理操作系统",
    heroDesc2: "。检测漂移，分类事件，即时干预。",
    heroBookDemo: "预约演示 →",
    heroWatchDemo: "观看演示",
    heroGDPR: "GDPR合规",
    heroEUAI: "EU AI Act就绪",
    heroKillSwitch60: "终止开关 60秒",
    killSwitchActive: "⚠ 终止开关已激活",
    criticalAlert: "🚨 严重警报",
    controlLive: "ACF CONTROL — 实时",
    sovereigntyScore: "主权评分",
    scoreUp: "▲ +3.2（30天）",
    scoreSuspended: "⬛ 已暂停",
    scoreCritical: "▼ −33 严重",
    tlKillAll: "⚠ 终止开关已触发 — 所有智能体已暂停",
    tlStockDriftBreach: "STOCK-AI漂移超过300% — 主权违规",
    tlDegradedMode: "降级模式激活 — 需要人工接管",
    tlStockCritical: "🚨 STOCK-AI 严重 — 评分12，漂移+312%",
    tlSovBelow: "主权评分低于阈值（41/100）",
    tlStockDrift12: "STOCK-AI漂移已检测（−1.2%）",
    tlFraudBlocked: "FRAUD-DET 可疑交易已拦截",
    tlStockAccel: "⚠ STOCK-AI漂移加速中（−4.8%）",
    tlPriceGovMargin: "PRICE-GOV 利润率调整 +0.3%",
    tlEscalationApproach: "升级阈值接近中",
    allAgentsSuspended: "所有智能体已暂停",
    killSwitchRecommended: "建议启用终止开关",
    humanTakeoverActive: "人工接管已激活。等待人工审查。",
    sovereigntyBreach: "检测到主权违规。需要立即干预。",
    eqObservability: "可观测性",
    eqGovernance: "治理",
    eqIntervention: "干预",
    eqSovereignty: "主权",
    sectionPositioning: "定位",
    posTitle: "不是又一个AI仪表盘。",
    posDesc1: "ACF Control是一个",
    posDescStrong: "决策治理层",
    posDesc2: " — 您的组织保持主权所需的神经系统。",
    posIsNotTitle: "ACF Control不是",
    posIsTitle: "ACF Control是",
    posNotItems: [
      "AI工具或智能体构建器",
      "重定价或营销平台",
      "被动的报告仪表盘",
      "优化引擎",
      "数据仓库或BI工具",
    ],
    posIsItems: [
      "决策治理操作系统",
      "实时漂移检测中心",
      "事件分类与响应中心",
      "指挥权限干预中心",
      "主权监督平台",
    ],
    sectionArchitecture: "架构",
    modulesTitle: "8个核心模块",
    modulesSubtitle: "每个模块服务于一个目的：让人类始终掌控机器决策。",
    mod00Title: "主权评分",
    mod00Sub: "您的治理基准 — 在4个维度上从0到100评分。",
    mod00Axes: "分销 · 决策 · 流量 · 财务",
    mod00Export: "PDF导出",
    mod01Title: "决策注册表",
    mod01Sub: "一个活的清单：谁用什么、如何做出什么决策。",
    mod01PriceAdj: "价格调整",
    mod01PriceStatus: "受治理",
    mod01Replenishment: "补货",
    mod01ReplenishStatus: "辅助",
    mod01CustExcl: "客户排除",
    mod01CustStatus: "仅人工",
    mod02Title: "关键性矩阵",
    mod02Sub: "影响 × 频率 × 不可逆性。",
    mod02Optimizable: "可优化",
    mod02Governed: "受治理",
    mod02HumanOnly: "仅人工",
    mod03Title: "智能体宪章",
    mod03Sub: "战略治理文件 — 版本控制、签署、可审计。",
    mod03Items: ["优先目标", "关键阈值", "升级规则", "不可委托区域", "终止开关所有者"],
    mod03Signed: "CEO签署 — v2.1 — 2026年2月",
    mod04Title: "智能体注册表",
    mod04Sub: "每个智能体文档化：任务、范围、限制、人类所有者。",
    mod05Title: "最小可行监督",
    mod05Sub: "每个智能体5个KPI。阈值。警报。30天历史记录。",
    mod05Margin: "利润率",
    mod05Escalations: "升级",
    mod05Overrides: "覆盖",
    mod05HumanLoad: "人力负荷",
    mod06Title: "持续治理",
    mod06Sub: "月度审查、年度合规审计、治理演进追踪。",
    mod06Timeline: "月度审查 → 季度审计 → 年度认证",
    mod07Title: "危机管理",
    mod07Sub: "3级事件分类、终止开关演练、事后分析协议。",
    mod07Levels: "级别1：暂停 · 级别2：遏制 · 级别3：终止",
    sectionKeyDiff: "关键差异化因素",
    driftTitle: "Drift Engine™",
    driftP1: "灾难性AI故障不是来自bug — 而是来自",
    driftP1Strong: "缓慢、不可见的漂移",
    driftP1End: "。利润率从32%悄然滑至28%，无人察觉。升级变成了「正常」。",
    driftP2Start: "Drift Engine为每个智能体KPI计算",
    driftP2Strong: "7天和30天趋势",
    driftP2Mid: "。它在",
    driftP2Gold: "阈值被突破之前",
    driftP2End: "就触发警报。",
    driftLow: "低漂移",
    driftLowDesc: "趋势变动中，在容差范围内",
    driftSig: "显著漂移",
    driftSigDesc: "接近阈值边界",
    driftCrit: "关键漂移",
    driftCritDesc: "需要立即干预",
    driftStabilityLabel: "智能体稳定性评分",
    driftDetectionLabel: "漂移检测 — STOCK-AI",
    driftDetected: "⚠ 检测到漂移",
    drift14dTrend: "14天趋势",
    drift14dAgo: "14天前",
    driftNow: "当前",
    driftMarginWarn: "⚠ STOCK-AI利润率漂移：14天内−1.8%。",
    driftRecommendation: "→ 建议：审查阈值或缩小范围。",
    sectionCommandAuth: "指挥权限",
    interventionTitle: "即时干预",
    interventionDesc1: "ACF Control不仅仅是警报 — 它赋予您",
    interventionDescStrong: "在几秒内行动",
    interventionDesc2: "的能力。",
    intSuspend: "暂停智能体",
    intReduceScope: "缩小范围",
    intForceEsc: "强制升级",
    intDegraded: "降级模式",
    intKillSwitch: "终止开关",
    killGlobalLabel: "🛑 全局终止开关",
    killGlobalDesc: "暂停所有自主智能体。60秒内进入完全降级模式。",
    killArmedBtn: "⚠ 终止开关已就绪 — 点击解除",
    killArmBtn: "启动终止开关",
    killArmedMsg: "确认后所有智能体将被暂停。操作已记录。",
    sectionOnePageAnswer: "一页，一个答案",
    dashTitle: "高管仪表盘",
    dashQuestion: "一个问题，30秒内回答：",
    dashQuestionBold: "「今天我们是主权的吗？」",
    tabCEO: "CEO视图",
    tabOps: "运营者视图",
    tabConsultant: "顾问视图",
    dashActiveAgents: "活跃智能体",
    dashStable: "稳定",
    dashAttention: "注意",
    dashCritical: "严重",
    dashRecentIncidents: "近期事件",
    dashStockDrift: "STOCK-AI漂移",
    dashAutoCorrected: "自动修正",
    dashRoutineCheck: "常规检查",
    dashAtRisk: "风险决策",
    dashPricingDrift: "定价 → 利润率漂移",
    dashInventoryLow: "库存 → 覆盖不足",
    dashNoCritical: "无严重风险",
    dashSuspendAll: "🛑 全部暂停",
    dashVsLastMonth: "▲ +3.2 较上月",
    opsTitle: "智能体运营者视图",
    opsDesc: "深入分析每个智能体的表现。调整规则，管理漂移阈值，解决事件。",
    opsIncidents: "事件",
    consultTitle: "认证顾问视图",
    consultDesc: "多客户访问、基准测试、任务模板和审计就绪导出。在2小时内交付完整ACF诊断。",
    consultMultiClient: "多客户",
    consultTemplates: "模板",
    consultBenchmark: "基准测试",
    consultPDFExport: "PDF导出",
    sectionRealMath: "真正的计算",
    riskTitle1: "治理的",
    riskTitleRed: "缺失",
    riskTitle2: "代价几何？",
    riskDesc1: "ACF Control的成本与您在没有正式治理的情况下承担的财务、监管和声誉风险相比",
    riskDescStrong: "微不足道",
    riskDesc2: "。",
    riskAIActLabel: "EU AI ACT 罚款",
    riskAIActDesc1: "因不遵守高风险AI系统的透明度和监管要求，最高罚款",
    riskAIActStrong: "3500万欧元",
    riskAIActDesc2: "或全球年营收的7%。",
    riskGDPRLabel: "GDPR 罚款",
    riskGDPRDesc1: "最高",
    riskGDPRStrong: "2000万欧元",
    riskGDPRDesc2: "或全球年营收的4%。未治理的自动化决策倍增了数据违规风险。",
    riskDriftLabel: "AI漂移成本",
    riskDriftDesc1: "",
    riskDriftStrong: "不受控的AI决策",
    riskDriftDesc2: "造成的平均观测损失：定价错误、库存故障、滥用客户排除、隐性利润侵蚀。",
    riskWithout: "无治理风险",
    riskMaxExposure: "最大累计风险敞口",
    riskACFInvestment: "ACF CONTROL 投资",
    riskFraction: "风险敞口的一小部分",
    riskStat1: "的企业在没有正式治理的情况下使用AI智能体",
    riskStat2: "的高管担心失去对其智能体的战略控制",
    riskStat3: "无监督的组织中事件增长速度快12倍",
    sectionPlans: "方案",
    pricingTitle: "定制化治理，而非标准化SaaS。",
    pricingDesc: "每个组织都有独特的主权挑战。我们根据您的智能体架构、行业和监管要求定制ACF Control。",
    tierEssential: "基础版",
    tierEssentialDesc: "最多3个智能体",
    tierProfessional: "专业版",
    tierProfessionalDesc: "最多10个智能体",
    tierEnterprise: "企业版",
    tierEnterpriseDesc: "无限智能体",
    tierRecommended: "推荐",
    priceOnRequest: "价格请咨询",
    planRequestDemo: "申请演示 →",
    planContactUs: "联系我们",
    featEssential: ["主权评分", "决策注册表", "关键性矩阵", "基本警报", "PDF导出"],
    featProfessional: ["基础版全部功能 +", "Drift Engine™", "事件分类", "终止开关（3级）", "智能体宪章", "智能警报（Slack + Email）", "顾问访问"],
    featEnterprise: ["专业版全部功能 +", "多站点 / 多业务单元", "自定义集成（API）", "专属DDA支持", "审计追踪（3年）", "白标选项", "SLA 99.9%"],
    partnerLabel: "认证合作伙伴计划",
    partnerDesc: "年度顾问许可证。客户访问需要ACF认证。",
    partnerApply: "申请认证 →",
    statKillSwitch: "终止开关最大",
    statKPIs: "主权KPI",
    statControls: "每智能体控制",
    statOperational: "投入运营",
    ctaLine1: "别再盲目飞行。",
    ctaLine2: "开始治理吧。",
    ctaDesc1: "您的智能体已经在做决策。唯一的问题是：",
    ctaDescStrong: "您在掌控吗？",
    ctaDemo: "申请演示 →",
    ctaScore: "计算您的ACF Score",
  },
  ko: {
    navDecisionGovOS: "의사결정 거버넌스 OS",
    navHome: "홈",
    navModules: "모듈",
    navDriftEngine: "드리프트 엔진",
    navDashboard: "대시보드",
    navRisks: "리스크",
    navRequestDemo: "데모 요청",
    navStandard: "표준", navScore: "ACF Score", navBlog: "블로그", navPartners: "파트너", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "라이브 거버넌스 시스템",
    heroLine1: "에이전트가 결정합니다.",
    heroLine2: "당신이 통제합니다.",
    heroDesc1: "ACF Control은 자율 AI 에이전트를 배포하는 조직을 위한 ",
    heroDescStrong: "의사결정 거버넌스 운영 시스템",
    heroDesc2: "입니다. 드리프트를 감지하고, 인시던트를 분류하고, 즉시 개입합니다.",
    heroBookDemo: "데모 예약 →",
    heroWatchDemo: "데모 보기",
    heroGDPR: "GDPR 준수",
    heroEUAI: "EU AI Act 대응",
    heroKillSwitch60: "킬 스위치 60초",
    killSwitchActive: "⚠ 킬 스위치 작동 중",
    criticalAlert: "🚨 심각한 경고",
    controlLive: "ACF CONTROL — 라이브",
    sovereigntyScore: "주권 점수",
    scoreUp: "▲ +3.2 (30일)",
    scoreSuspended: "⬛ 정지됨",
    scoreCritical: "▼ −33 심각",
    tlKillAll: "⚠ 킬 스위치 발동 — 모든 에이전트 정지",
    tlStockDriftBreach: "STOCK-AI 드리프트 300% 초과 — 주권 위반",
    tlDegradedMode: "저하 모드 활성화 — 인간 인수 필요",
    tlStockCritical: "🚨 STOCK-AI 심각 — 점수 12, 드리프트 +312%",
    tlSovBelow: "주권 점수가 임계값 미만 (41/100)",
    tlStockDrift12: "STOCK-AI 드리프트 감지 (−1.2%)",
    tlFraudBlocked: "FRAUD-DET 의심스러운 거래 차단",
    tlStockAccel: "⚠ STOCK-AI 드리프트 가속 중 (−4.8%)",
    tlPriceGovMargin: "PRICE-GOV 마진 조정 +0.3%",
    tlEscalationApproach: "에스컬레이션 임계값 접근 중",
    allAgentsSuspended: "모든 에이전트 정지됨",
    killSwitchRecommended: "킬 스위치 권장",
    humanTakeoverActive: "인간 인수 활성화. 수동 검토 대기 중.",
    sovereigntyBreach: "주권 위반 감지. 즉각적인 개입 필요.",
    eqObservability: "관찰 가능성",
    eqGovernance: "거버넌스",
    eqIntervention: "개입",
    eqSovereignty: "주권",
    sectionPositioning: "포지셔닝",
    posTitle: "또 다른 AI 대시보드가 아닙니다.",
    posDesc1: "ACF Control은 ",
    posDescStrong: "의사결정 거버넌스 레이어",
    posDesc2: " — 조직이 주권을 유지하기 위해 필요한 신경 시스템입니다.",
    posIsNotTitle: "ACF Control은 이것이 아닙니다",
    posIsTitle: "ACF Control은 이것입니다",
    posNotItems: [
      "AI 도구 또는 에이전트 빌더",
      "리프라이싱 또는 마케팅 플랫폼",
      "수동적 보고 대시보드",
      "최적화 엔진",
      "데이터 웨어하우스 또는 BI 도구",
    ],
    posIsItems: [
      "의사결정 거버넌스 운영 시스템",
      "실시간 드리프트 감지 센터",
      "인시던트 분류 및 대응 허브",
      "지휘 권한 개입 센터",
      "주권 감독 플랫폼",
    ],
    sectionArchitecture: "아키텍처",
    modulesTitle: "8개 핵심 모듈",
    modulesSubtitle: "각 모듈은 하나의 목적을 위해 존재합니다: 기계 의사결정에서 인간의 지휘권을 유지하는 것.",
    mod00Title: "주권 점수",
    mod00Sub: "거버넌스 기준선 — 4개 축에서 0~100점.",
    mod00Axes: "유통 · 의사결정 · 트래픽 · 재무",
    mod00Export: "PDF 내보내기",
    mod01Title: "의사결정 레지스트리",
    mod01Sub: "살아있는 인벤토리: 누가 무엇을, 무엇으로, 어떻게 결정하는가.",
    mod01PriceAdj: "가격 조정",
    mod01PriceStatus: "거버넌스 적용",
    mod01Replenishment: "보충",
    mod01ReplenishStatus: "보조",
    mod01CustExcl: "고객 제외",
    mod01CustStatus: "인간 전용",
    mod02Title: "중요도 매트릭스",
    mod02Sub: "영향 × 빈도 × 비가역성.",
    mod02Optimizable: "최적화 가능",
    mod02Governed: "거버넌스 적용",
    mod02HumanOnly: "인간 전용",
    mod03Title: "에이전트 헌장",
    mod03Sub: "전략적 거버넌스 문서 — 버전 관리, 서명, 감사 가능.",
    mod03Items: ["우선 목표", "중요 임계값", "에스컬레이션 규칙", "위임 불가 영역", "킬 스위치 소유자"],
    mod03Signed: "CEO 서명 — v2.1 — 2026년 2월",
    mod04Title: "에이전트 레지스트리",
    mod04Sub: "각 에이전트 문서화: 임무, 범위, 제한, 인간 소유자.",
    mod05Title: "최소 실행 가능 감독",
    mod05Sub: "에이전트당 5개 KPI. 임계값. 경고. 30일 이력.",
    mod05Margin: "마진",
    mod05Escalations: "에스컬레이션",
    mod05Overrides: "오버라이드",
    mod05HumanLoad: "인적 부하",
    mod06Title: "지속적 거버넌스",
    mod06Sub: "월간 리뷰, 연간 컴플라이언스 감사, 거버넌스 발전 추적.",
    mod06Timeline: "월간 리뷰 → 분기 감사 → 연간 인증",
    mod07Title: "위기 관리",
    mod07Sub: "3단계 인시던트 분류, 킬 스위치 훈련, 사후 분석 프로토콜.",
    mod07Levels: "레벨 1: 일시정지 · 레벨 2: 억제 · 레벨 3: 킬",
    sectionKeyDiff: "핵심 차별화 요소",
    driftTitle: "Drift Engine™",
    driftP1: "치명적인 AI 장애는 버그에서 오지 않습니다 — ",
    driftP1Strong: "느리고 보이지 않는 드리프트",
    driftP1End: "에서 옵니다. 아무도 모르게 32%에서 28%로 떨어지는 마진. '정상'이 되어버리는 에스컬레이션.",
    driftP2Start: "Drift Engine은 각 에이전트 KPI의 ",
    driftP2Strong: "7일 및 30일 추세",
    driftP2Mid: "를 계산합니다. ",
    driftP2Gold: "임계값이 돌파되기 전에",
    driftP2End: " 경고를 트리거합니다.",
    driftLow: "낮은 드리프트",
    driftLowDesc: "추세 변동 중, 허용 범위 내",
    driftSig: "상당한 드리프트",
    driftSigDesc: "임계값 경계에 접근 중",
    driftCrit: "심각한 드리프트",
    driftCritDesc: "즉각적인 개입 필요",
    driftStabilityLabel: "에이전트 안정성 점수",
    driftDetectionLabel: "드리프트 감지 — STOCK-AI",
    driftDetected: "⚠ 드리프트 감지됨",
    drift14dTrend: "14일 추세",
    drift14dAgo: "14일 전",
    driftNow: "현재",
    driftMarginWarn: "⚠ STOCK-AI 마진 드리프트: 14일간 −1.8%.",
    driftRecommendation: "→ 권장: 임계값 검토 또는 범위 축소.",
    sectionCommandAuth: "지휘 권한",
    interventionTitle: "즉각 개입",
    interventionDesc1: "ACF Control은 단순히 경고하지 않습니다 — ",
    interventionDescStrong: "몇 초 만에 행동할",
    interventionDesc2: " 수 있는 권한을 줍니다.",
    intSuspend: "에이전트 정지",
    intReduceScope: "범위 축소",
    intForceEsc: "강제 에스컬레이션",
    intDegraded: "저하 모드",
    intKillSwitch: "킬 스위치",
    killGlobalLabel: "🛑 글로벌 킬 스위치",
    killGlobalDesc: "모든 자율 에이전트를 정지. 60초 내 완전 저하 모드.",
    killArmedBtn: "⚠ 킬 스위치 준비 완료 — 클릭하여 해제",
    killArmBtn: "킬 스위치 준비",
    killArmedMsg: "확인 후 모든 에이전트가 정지됩니다. 작업이 기록됩니다.",
    sectionOnePageAnswer: "한 페이지, 하나의 답",
    dashTitle: "경영진 대시보드",
    dashQuestion: "30초 안에 답하는 하나의 질문: ",
    dashQuestionBold: "「오늘 우리는 주권적인가?」",
    tabCEO: "CEO 뷰",
    tabOps: "운영자 뷰",
    tabConsultant: "컨설턴트 뷰",
    dashActiveAgents: "활성 에이전트",
    dashStable: "안정",
    dashAttention: "주의",
    dashCritical: "심각",
    dashRecentIncidents: "최근 인시던트",
    dashStockDrift: "STOCK-AI 드리프트",
    dashAutoCorrected: "자동 수정됨",
    dashRoutineCheck: "정기 점검",
    dashAtRisk: "위험 의사결정",
    dashPricingDrift: "가격 → 마진 드리프트",
    dashInventoryLow: "재고 → 낮은 커버리지",
    dashNoCritical: "심각한 리스크 없음",
    dashSuspendAll: "🛑 전체 정지",
    dashVsLastMonth: "▲ +3.2 전월 대비",
    opsTitle: "에이전트 운영자 뷰",
    opsDesc: "각 에이전트 성능 심층 분석. 규칙 조정, 드리프트 임계값 관리, 인시던트 해결.",
    opsIncidents: "인시던트",
    consultTitle: "인증 컨설턴트 뷰",
    consultDesc: "멀티 클라이언트 접근, 벤치마크, 미션 템플릿, 감사 대응 내보내기. 2시간 이내에 완전한 ACF 진단 제공.",
    consultMultiClient: "멀티 클라이언트",
    consultTemplates: "템플릿",
    consultBenchmark: "벤치마크",
    consultPDFExport: "PDF 내보내기",
    sectionRealMath: "실제 계산",
    riskTitle1: "거버넌스의 ",
    riskTitleRed: "부재",
    riskTitle2: "는 얼마의 비용이 드는가?",
    riskDesc1: "ACF Control의 비용은 공식적인 거버넌스 없이 감수하는 재무적, 규제적, 평판상의 리스크에 비해 ",
    riskDescStrong: "미미합니다",
    riskDesc2: ".",
    riskAIActLabel: "EU AI ACT 벌금",
    riskAIActDesc1: "고위험 AI 시스템의 투명성 및 감독 요건 미준수 시 최대 ",
    riskAIActStrong: "3,500만 유로",
    riskAIActDesc2: " 또는 전 세계 연매출의 7%.",
    riskGDPRLabel: "GDPR 벌금",
    riskGDPRDesc1: "최대 ",
    riskGDPRStrong: "2,000만 유로",
    riskGDPRDesc2: " 또는 전 세계 연매출의 4%. 거버넌스가 없는 자동화된 의사결정은 데이터 위반 리스크를 증가시킵니다.",
    riskDriftLabel: "AI 드리프트 비용",
    riskDriftDesc1: "",
    riskDriftStrong: "통제되지 않는 AI 의사결정",
    riskDriftDesc2: "으로 인한 평균 관찰 손실: 가격 오류, 재고 결함, 남용적 고객 제외, 보이지 않는 마진 침식.",
    riskWithout: "거버넌스 없는 리스크",
    riskMaxExposure: "최대 누적 노출",
    riskACFInvestment: "ACF CONTROL 투자",
    riskFraction: "리스크 노출의 극히 일부",
    riskStat1: "의 기업이 공식적 거버넌스 없이 AI 에이전트를 사용",
    riskStat2: "의 경영진이 에이전트에 대한 전략적 통제력 상실을 우려",
    riskStat3: "감독이 없는 조직에서 인시던트가 12배 빠르게 증가",
    sectionPlans: "요금제",
    pricingTitle: "맞춤형 거버넌스, 표준화된 SaaS가 아닙니다.",
    pricingDesc: "각 조직에는 고유한 주권 과제가 있습니다. 귀사의 에이전트 아키텍처, 산업, 규제 요건에 맞춰 ACF Control을 조정합니다.",
    tierEssential: "에센셜",
    tierEssentialDesc: "에이전트 최대 3개",
    tierProfessional: "프로페셔널",
    tierProfessionalDesc: "에이전트 최대 10개",
    tierEnterprise: "엔터프라이즈",
    tierEnterpriseDesc: "에이전트 무제한",
    tierRecommended: "추천",
    priceOnRequest: "가격 문의",
    planRequestDemo: "데모 요청 →",
    planContactUs: "문의하기",
    featEssential: ["주권 점수", "의사결정 레지스트리", "중요도 매트릭스", "기본 경고", "PDF 내보내기"],
    featProfessional: ["에센셜 전체 +", "Drift Engine™", "인시던트 분류", "킬 스위치 (3단계)", "에이전트 헌장", "스마트 경고 (Slack + Email)", "컨설턴트 접근"],
    featEnterprise: ["프로페셔널 전체 +", "멀티 사이트 / 멀티 BU", "커스텀 통합 (API)", "전담 DDA 지원", "감사 추적 (3년)", "화이트 라벨 옵션", "SLA 99.9%"],
    partnerLabel: "인증 파트너 프로그램",
    partnerDesc: "연간 컨설턴트 라이선스. 클라이언트 접근에 ACF 인증 필요.",
    partnerApply: "인증 신청 →",
    statKillSwitch: "킬 스위치 최대",
    statKPIs: "주권 KPI",
    statControls: "에이전트당 통제",
    statOperational: "가동 시작",
    ctaLine1: "맹목적 비행을 멈추세요.",
    ctaLine2: "거버넌스를 시작하세요.",
    ctaDesc1: "에이전트는 이미 의사결정을 하고 있습니다. 유일한 질문은: ",
    ctaDescStrong: "당신이 지휘하고 있습니까?",
    ctaDemo: "데모 요청 →",
    ctaScore: "ACF Score 계산하기",
  },
  it: {
    navDecisionGovOS: "SO DI GOVERNANCE DECISIONALE",
    navHome: "Home",
    navModules: "Moduli",
    navDriftEngine: "Motore di deriva",
    navDashboard: "Dashboard",
    navRisks: "Rischi",
    navRequestDemo: "Richiedi una demo",
    navStandard: "Lo Standard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partner", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "SISTEMA DI GOVERNANCE LIVE",
    heroLine1: "I vostri agenti decidono.",
    heroLine2: "Voi mantenete il controllo.",
    heroDesc1: "ACF Control è il ",
    heroDescStrong: "sistema operativo di governance decisionale",
    heroDesc2: " per le organizzazioni che implementano agenti IA autonomi. Rilevate la deriva, classificate gli incidenti, intervenite istantaneamente.",
    heroBookDemo: "Prenota una demo →",
    heroWatchDemo: "Guarda la demo",
    heroGDPR: "Conforme al GDPR",
    heroEUAI: "Pronto per EU AI Act",
    heroKillSwitch60: "Kill Switch 60s",
    killSwitchActive: "⚠ KILL SWITCH ATTIVO",
    criticalAlert: "🚨 ALLARME CRITICO",
    controlLive: "ACF CONTROL — LIVE",
    sovereigntyScore: "Punteggio di sovranità",
    scoreUp: "▲ +3,2 (30g)",
    scoreSuspended: "⬛ SOSPESO",
    scoreCritical: "▼ −33 CRITICO",
    tlKillAll: "⚠ KILL SWITCH ATTIVATO — Tutti gli agenti sospesi",
    tlStockDriftBreach: "Deriva STOCK-AI oltre il 300% — violazione della sovranità",
    tlDegradedMode: "Modalità degradata attiva — presa di controllo umana necessaria",
    tlStockCritical: "🚨 STOCK-AI CRITICO — Punteggio 12, deriva +312%",
    tlSovBelow: "Punteggio di sovranità sotto la soglia (41/100)",
    tlStockDrift12: "Deriva STOCK-AI rilevata (−1,2%)",
    tlFraudBlocked: "FRAUD-DET transazione sospetta bloccata",
    tlStockAccel: "⚠ Deriva STOCK-AI in accelerazione (−4,8%)",
    tlPriceGovMargin: "PRICE-GOV margine regolato +0,3%",
    tlEscalationApproach: "Soglia di escalation in avvicinamento",
    allAgentsSuspended: "TUTTI GLI AGENTI SOSPESI",
    killSwitchRecommended: "KILL SWITCH RACCOMANDATO",
    humanTakeoverActive: "Presa di controllo umana attiva. In attesa di revisione manuale.",
    sovereigntyBreach: "Violazione della sovranità rilevata. Intervento immediato necessario.",
    eqObservability: "Osservabilità",
    eqGovernance: "Governance",
    eqIntervention: "Intervento",
    eqSovereignty: "Sovranità",
    sectionPositioning: "Posizionamento",
    posTitle: "Non l'ennesima dashboard IA.",
    posDesc1: "ACF Control è uno ",
    posDescStrong: "strato di governance decisionale",
    posDesc2: " — il sistema nervoso di cui la vostra organizzazione ha bisogno per restare sovrana.",
    posIsNotTitle: "ACF Control NON è",
    posIsTitle: "ACF Control È",
    posNotItems: [
      "Uno strumento IA o costruttore di agenti",
      "Un repricing o piattaforma di marketing",
      "Una dashboard di reporting passivo",
      "Un motore di ottimizzazione",
      "Un data warehouse o strumento BI",
    ],
    posIsItems: [
      "Un sistema operativo di governance decisionale",
      "Un centro di rilevamento della deriva in tempo reale",
      "Un hub di classificazione e risposta agli incidenti",
      "Un centro di intervento dell'autorità di comando",
      "Una piattaforma di supervisione della sovranità",
    ],
    sectionArchitecture: "Architettura",
    modulesTitle: "8 moduli fondamentali",
    modulesSubtitle: "Ogni modulo ha uno scopo: mantenere gli umani al comando delle decisioni delle macchine.",
    mod00Title: "Punteggio di sovranità",
    mod00Sub: "Il vostro riferimento di governance — da 0 a 100 su 4 assi.",
    mod00Axes: "Distribuzione · Decisione · Traffico · Tesoreria",
    mod00Export: "Esporta PDF",
    mod01Title: "Registro delle decisioni",
    mod01Sub: "Un inventario vivente: chi decide cosa, con cosa e come.",
    mod01PriceAdj: "Aggiustamento prezzo",
    mod01PriceStatus: "Governato",
    mod01Replenishment: "Riapprovvigionamento",
    mod01ReplenishStatus: "Assistito",
    mod01CustExcl: "Esclusione clienti",
    mod01CustStatus: "Solo umano",
    mod02Title: "Matrice di criticità",
    mod02Sub: "Impatto × Frequenza × Irreversibilità.",
    mod02Optimizable: "Ottimizzabile",
    mod02Governed: "Governato",
    mod02HumanOnly: "Solo umano",
    mod03Title: "Costituzione agentica",
    mod03Sub: "Documento di governance strategica — versionato, firmato, verificabile.",
    mod03Items: ["Obiettivi prioritari", "Soglie critiche", "Regole di escalation", "Zone non delegabili", "Proprietario del Kill Switch"],
    mod03Signed: "Firmato CEO — v2.1 — Feb 2026",
    mod04Title: "Registro degli agenti",
    mod04Sub: "Ogni agente documentato: mandato, perimetro, limiti, proprietario umano.",
    mod05Title: "Supervisione minima praticabile",
    mod05Sub: "5 KPI per agente. Soglie. Allarmi. Storico 30 giorni.",
    mod05Margin: "Margine",
    mod05Escalations: "Escalation",
    mod05Overrides: "Override",
    mod05HumanLoad: "Carico umano",
    mod06Title: "Governance continua",
    mod06Sub: "Revisioni mensili, audit di conformità annuali, monitoraggio dell'evoluzione della governance.",
    mod06Timeline: "Revisione mensile → Audit trimestrale → Certificazione annuale",
    mod07Title: "Gestione delle crisi",
    mod07Sub: "Classificazione degli incidenti a 3 livelli, esercitazioni kill switch, protocolli post-mortem.",
    mod07Levels: "Livello 1: Pausa · Livello 2: Contenimento · Livello 3: Kill",
    sectionKeyDiff: "Differenziatore chiave",
    driftTitle: "Drift Engine™",
    driftP1: "I guasti catastrofici dell'IA non derivano da bug — derivano da una ",
    driftP1Strong: "deriva lenta e invisibile",
    driftP1End: ". Il margine che scivola dal 32% al 28% senza che nessuno lo noti. Le escalation che diventano «normali».",
    driftP2Start: "Il Drift Engine calcola ",
    driftP2Strong: "tendenze a 7 e 30 giorni",
    driftP2Mid: " per ogni KPI dell'agente. Attiva allarmi ",
    driftP2Gold: "prima ancora che le soglie vengano superate",
    driftP2End: ".",
    driftLow: "Deriva bassa",
    driftLowDesc: "Tendenza in movimento, entro la tolleranza",
    driftSig: "Deriva significativa",
    driftSigDesc: "Avvicinamento al limite della soglia",
    driftCrit: "Deriva critica",
    driftCritDesc: "Intervento immediato necessario",
    driftStabilityLabel: "PUNTEGGI DI STABILITÀ DEGLI AGENTI",
    driftDetectionLabel: "RILEVAMENTO DERIVA — STOCK-AI",
    driftDetected: "⚠ DERIVA RILEVATA",
    drift14dTrend: "Tendenza 14g",
    drift14dAgo: "14g fa",
    driftNow: "adesso",
    driftMarginWarn: "⚠ Deriva del margine STOCK-AI: −1,8% in 14 giorni.",
    driftRecommendation: "→ Raccomandazione: rivedere la soglia o ridurre il perimetro.",
    sectionCommandAuth: "Autorità di comando",
    interventionTitle: "Intervento immediato",
    interventionDesc1: "ACF Control non si limita ad allertare — vi dà il potere di ",
    interventionDescStrong: "agire in pochi secondi",
    interventionDesc2: ".",
    intSuspend: "Sospendere l'agente",
    intReduceScope: "Ridurre il perimetro",
    intForceEsc: "Forzare l'escalation",
    intDegraded: "Modalità degradata",
    intKillSwitch: "Kill Switch",
    killGlobalLabel: "🛑 KILL SWITCH GLOBALE",
    killGlobalDesc: "Sospendere TUTTI gli agenti autonomi. Modalità degradata completa in 60 secondi.",
    killArmedBtn: "⚠ KILL SWITCH ARMATO — Clicca per disarmare",
    killArmBtn: "Armare il Kill Switch",
    killArmedMsg: "Tutti gli agenti saranno sospesi dopo la conferma. Azione registrata.",
    sectionOnePageAnswer: "Una pagina, una risposta",
    dashTitle: "Dashboard esecutiva",
    dashQuestion: "Una domanda, risposta in 30 secondi: ",
    dashQuestionBold: "«Siamo sovrani oggi?»",
    tabCEO: "Vista CEO",
    tabOps: "Vista operatore",
    tabConsultant: "Vista consulente",
    dashActiveAgents: "Agenti attivi",
    dashStable: "Stabile",
    dashAttention: "Attenzione",
    dashCritical: "Critico",
    dashRecentIncidents: "Incidenti recenti",
    dashStockDrift: "Deriva STOCK-AI",
    dashAutoCorrected: "Auto-corretto",
    dashRoutineCheck: "Controllo di routine",
    dashAtRisk: "Decisioni a rischio",
    dashPricingDrift: "Prezzi → deriva del margine",
    dashInventoryLow: "Inventario → copertura bassa",
    dashNoCritical: "Nessun rischio critico",
    dashSuspendAll: "🛑 SOSPENDI TUTTO",
    dashVsLastMonth: "▲ +3,2 vs mese scorso",
    opsTitle: "Vista operatore agenti",
    opsDesc: "Analisi approfondita delle prestazioni di ogni agente. Regolate le regole, gestite le soglie di deriva, risolvete gli incidenti.",
    opsIncidents: "Incidenti",
    consultTitle: "Vista consulente certificato",
    consultDesc: "Accesso multi-cliente, benchmark, modelli di missione ed esportazioni pronte per l'audit. Consegnate una diagnosi ACF completa in meno di 2 ore.",
    consultMultiClient: "Multi-cliente",
    consultTemplates: "Modelli",
    consultBenchmark: "Benchmark",
    consultPDFExport: "Esporta PDF",
    sectionRealMath: "Il vero calcolo",
    riskTitle1: "Quanto costa l'",
    riskTitleRed: "assenza",
    riskTitle2: " di governance?",
    riskDesc1: "Il costo di ACF Control è ",
    riskDescStrong: "trascurabile",
    riskDesc2: " rispetto ai rischi finanziari, normativi e reputazionali che correte senza governance formalizzata.",
    riskAIActLabel: "SANZIONI EU AI ACT",
    riskAIActDesc1: "Fino a ",
    riskAIActStrong: "35 milioni €",
    riskAIActDesc2: " o il 7% del fatturato annuo globale per il mancato rispetto dei requisiti di trasparenza e supervisione dei sistemi IA ad alto rischio.",
    riskGDPRLabel: "SANZIONI GDPR",
    riskGDPRDesc1: "Fino a ",
    riskGDPRStrong: "20 milioni €",
    riskGDPRDesc2: " o il 4% del fatturato annuo globale. Le decisioni automatizzate non governate moltiplicano il rischio di violazioni dei dati.",
    riskDriftLabel: "COSTO DELLA DERIVA IA",
    riskDriftDesc1: "Perdita media osservata da ",
    riskDriftStrong: "decisioni IA non controllate",
    riskDriftDesc2: ": errori di prezzo, inventario difettoso, esclusioni abusive di clienti, erosione invisibile del margine.",
    riskWithout: "RISCHIO SENZA GOVERNANCE",
    riskMaxExposure: "Esposizione cumulativa massima",
    riskACFInvestment: "INVESTIMENTO ACF CONTROL",
    riskFraction: "Una frazione della vostra esposizione al rischio",
    riskStat1: "delle aziende utilizza agenti IA senza governance formalizzata",
    riskStat2: "dei dirigenti teme di perdere il controllo strategico sui propri agenti",
    riskStat3: "gli incidenti aumentano 12 volte più velocemente nelle organizzazioni senza supervisione",
    sectionPlans: "Piani",
    pricingTitle: "Governance su misura, non SaaS standardizzato.",
    pricingDesc: "Ogni organizzazione ha sfide di sovranità uniche. Adattiamo ACF Control alla vostra architettura di agenti, settore e requisiti normativi.",
    tierEssential: "ESSENZIALE",
    tierEssentialDesc: "Fino a 3 agenti",
    tierProfessional: "PROFESSIONALE",
    tierProfessionalDesc: "Fino a 10 agenti",
    tierEnterprise: "ENTERPRISE",
    tierEnterpriseDesc: "Agenti illimitati",
    tierRecommended: "RACCOMANDATO",
    priceOnRequest: "Prezzo su richiesta",
    planRequestDemo: "Richiedi una demo →",
    planContactUs: "Contattateci",
    featEssential: ["Punteggio di sovranità", "Registro delle decisioni", "Matrice di criticità", "Allarmi base", "Esportazioni PDF"],
    featProfessional: ["Tutto in Essenziale +", "Drift Engine™", "Classificazione degli incidenti", "Kill Switch (3 livelli)", "Costituzione agentica", "Allarmi intelligenti (Slack + Email)", "Accesso consulente"],
    featEnterprise: ["Tutto in Professionale +", "Multi-sito / Multi-BU", "Integrazioni personalizzate (API)", "Supporto DDA dedicato", "Traccia di audit (3 anni)", "Opzione white-label", "SLA 99,9%"],
    partnerLabel: "PROGRAMMA PARTNER CERTIFICATO",
    partnerDesc: "Licenza consulente annuale. Certificazione ACF richiesta per l'accesso clienti.",
    partnerApply: "Candidati alla certificazione →",
    statKillSwitch: "Kill switch max",
    statKPIs: "KPI di sovranità",
    statControls: "Controlli per agente",
    statOperational: "Operativo in",
    ctaLine1: "Smettete di volare alla cieca.",
    ctaLine2: "Iniziate a governare.",
    ctaDesc1: "I vostri agenti stanno già prendendo decisioni. L'unica domanda è: ",
    ctaDescStrong: "avete il comando?",
    ctaDemo: "Richiedi una demo →",
    ctaScore: "Calcolate il vostro ACF Score",
  },
  nl: {
    navDecisionGovOS: "BESLISSINGS-GOVERNANCE-OS",
    navHome: "Home",
    navModules: "Modules",
    navDriftEngine: "Drift Engine",
    navDashboard: "Dashboard",
    navRisks: "Risico's",
    navRequestDemo: "Demo aanvragen",
    navStandard: "De Standaard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partners", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "LIVE GOVERNANCE-SYSTEEM",
    heroLine1: "Uw agents beslissen.",
    heroLine2: "U behoudt de controle.",
    heroDesc1: "ACF Control is het ",
    heroDescStrong: "besturingssysteem voor beslissings-governance",
    heroDesc2: " voor organisaties die autonome AI-agents inzetten. Detecteer drift, classificeer incidenten, grijp onmiddellijk in.",
    heroBookDemo: "Demo boeken →",
    heroWatchDemo: "Demo bekijken",
    heroGDPR: "AVG-conform",
    heroEUAI: "EU AI Act gereed",
    heroKillSwitch60: "Kill Switch 60s",
    killSwitchActive: "⚠ KILL SWITCH ACTIEF",
    criticalAlert: "🚨 KRITIEK ALARM",
    controlLive: "ACF CONTROL — LIVE",
    sovereigntyScore: "Soevereiniteitsscore",
    scoreUp: "▲ +3,2 (30d)",
    scoreSuspended: "⬛ OPGESCHORT",
    scoreCritical: "▼ −33 KRITIEK",
    tlKillAll: "⚠ KILL SWITCH GEACTIVEERD — Alle agents opgeschort",
    tlStockDriftBreach: "STOCK-AI drift overschreed 300% — soevereiniteitsschending",
    tlDegradedMode: "Degradeerde modus actief — menselijke overname vereist",
    tlStockCritical: "🚨 STOCK-AI KRITIEK — Score 12, drift +312%",
    tlSovBelow: "Soevereiniteitsscore onder drempel (41/100)",
    tlStockDrift12: "STOCK-AI drift gedetecteerd (−1,2%)",
    tlFraudBlocked: "FRAUD-DET verdachte transactie geblokkeerd",
    tlStockAccel: "⚠ STOCK-AI drift versnelt (−4,8%)",
    tlPriceGovMargin: "PRICE-GOV marge aangepast +0,3%",
    tlEscalationApproach: "Escalatiedrempel nadert",
    allAgentsSuspended: "ALLE AGENTS OPGESCHORT",
    killSwitchRecommended: "KILL SWITCH AANBEVOLEN",
    humanTakeoverActive: "Menselijke overname actief. In afwachting van handmatige review.",
    sovereigntyBreach: "Soevereiniteitsschending gedetecteerd. Onmiddellijke interventie vereist.",
    eqObservability: "Observeerbaarheid",
    eqGovernance: "Governance",
    eqIntervention: "Interventie",
    eqSovereignty: "Soevereiniteit",
    sectionPositioning: "Positionering",
    posTitle: "Geen zoveelste AI-dashboard.",
    posDesc1: "ACF Control is een ",
    posDescStrong: "beslissings-governance-laag",
    posDesc2: " — het zenuwstelsel dat uw organisatie nodig heeft om soeverein te blijven.",
    posIsNotTitle: "ACF Control is NIET",
    posIsTitle: "ACF Control IS",
    posNotItems: [
      "Een AI-tool of agent-bouwer",
      "Een repricing- of marketingplatform",
      "Een passief rapportage-dashboard",
      "Een optimalisatie-engine",
      "Een datawarehouse of BI-tool",
    ],
    posIsItems: [
      "Een besturingssysteem voor beslissings-governance",
      "Een realtime drift-detectiecentrum",
      "Een hub voor incidentclassificatie en -respons",
      "Een interventiecentrum van de commandoautoriteit",
      "Een platform voor soevereiniteitstoezicht",
    ],
    sectionArchitecture: "Architectuur",
    modulesTitle: "8 kernmodules",
    modulesSubtitle: "Elke module dient één doel: mensen aan het stuur houden van machinebeslissingen.",
    mod00Title: "Soevereiniteitsscore",
    mod00Sub: "Uw governance-basislijn — gescoord van 0 tot 100 op 4 assen.",
    mod00Axes: "Distributie · Beslissing · Verkeer · Financiën",
    mod00Export: "PDF-export",
    mod01Title: "Beslissingsregister",
    mod01Sub: "Een levende inventaris: wie beslist wat, waarmee en hoe.",
    mod01PriceAdj: "Prijsaanpassing",
    mod01PriceStatus: "Bestuurd",
    mod01Replenishment: "Herbevoorrading",
    mod01ReplenishStatus: "Geassisteerd",
    mod01CustExcl: "Klantuitsluiting",
    mod01CustStatus: "Alleen menselijk",
    mod02Title: "Kritikaliteitsmatrix",
    mod02Sub: "Impact × Frequentie × Onomkeerbaarheid.",
    mod02Optimizable: "Optimaliseerbaar",
    mod02Governed: "Bestuurd",
    mod02HumanOnly: "Alleen menselijk",
    mod03Title: "Agentische constitutie",
    mod03Sub: "Strategisch governance-document — geversioneerd, ondertekend, auditeerbaar.",
    mod03Items: ["Prioritaire doelen", "Kritieke drempels", "Escalatieregels", "Niet-delegeerbare zones", "Kill Switch-eigenaar"],
    mod03Signed: "Ondertekend CEO — v2.1 — Feb 2026",
    mod04Title: "Agent-register",
    mod04Sub: "Elke agent gedocumenteerd: mandaat, scope, limieten, menselijke eigenaar.",
    mod05Title: "Minimaal levensvatbaar toezicht",
    mod05Sub: "5 KPI's per agent. Drempels. Alarmen. 30-dagenhistorie.",
    mod05Margin: "Marge",
    mod05Escalations: "Escalaties",
    mod05Overrides: "Overrides",
    mod05HumanLoad: "Menselijke belasting",
    mod06Title: "Continue governance",
    mod06Sub: "Maandelijkse reviews, jaarlijkse compliance-audits, governance-evolutie tracking.",
    mod06Timeline: "Maandelijkse review → Kwartaalaudit → Jaarcertificering",
    mod07Title: "Crisisbeheer",
    mod07Sub: "3-niveau incidentclassificatie, kill switch-oefeningen, post-mortem protocollen.",
    mod07Levels: "Niveau 1: Pauze · Niveau 2: Indammen · Niveau 3: Kill",
    sectionKeyDiff: "Belangrijkste onderscheidend kenmerk",
    driftTitle: "Drift Engine™",
    driftP1: "Catastrofale AI-storingen komen niet door bugs — ze komen door ",
    driftP1Strong: "trage, onzichtbare drift",
    driftP1End: ". De marge die van 32% → 28% zakt zonder dat iemand het merkt. Escalaties die «normaal» worden.",
    driftP2Start: "De Drift Engine berekent ",
    driftP2Strong: "7-daagse en 30-daagse trends",
    driftP2Mid: " voor elke agent-KPI. Het activeert alarmen ",
    driftP2Gold: "vóórdat drempels worden overschreden",
    driftP2End: ".",
    driftLow: "Lage drift",
    driftLowDesc: "Trend beweegt, binnen tolerantie",
    driftSig: "Significante drift",
    driftSigDesc: "Drempelgrens nadert",
    driftCrit: "Kritieke drift",
    driftCritDesc: "Onmiddellijke interventie vereist",
    driftStabilityLabel: "STABILITEITSSCORES AGENTS",
    driftDetectionLabel: "DRIFTDETECTIE — STOCK-AI",
    driftDetected: "⚠ DRIFT GEDETECTEERD",
    drift14dTrend: "14d trend",
    drift14dAgo: "14d geleden",
    driftNow: "nu",
    driftMarginWarn: "⚠ STOCK-AI margedrift: −1,8% over 14 dagen.",
    driftRecommendation: "→ Aanbeveling: drempel herzien of scope verkleinen.",
    sectionCommandAuth: "Commandoautoriteit",
    interventionTitle: "Onmiddellijke interventie",
    interventionDesc1: "ACF Control waarschuwt niet alleen — het geeft u de macht om ",
    interventionDescStrong: "binnen seconden te handelen",
    interventionDesc2: ".",
    intSuspend: "Agent opschorten",
    intReduceScope: "Scope verkleinen",
    intForceEsc: "Escalatie forceren",
    intDegraded: "Degradeerde modus",
    intKillSwitch: "Kill Switch",
    killGlobalLabel: "🛑 GLOBALE KILL SWITCH",
    killGlobalDesc: "ALLE autonome agents opschorten. Volledig degradeerde modus binnen 60 seconden.",
    killArmedBtn: "⚠ KILL SWITCH GEWAPEND — Klik om te ontwapenen",
    killArmBtn: "Kill Switch bewapenen",
    killArmedMsg: "Alle agents worden opgeschort na bevestiging. Actie gelogd.",
    sectionOnePageAnswer: "Eén pagina, één antwoord",
    dashTitle: "Executive dashboard",
    dashQuestion: "Eén vraag, beantwoord in 30 seconden: ",
    dashQuestionBold: "«Zijn we vandaag soeverein?»",
    tabCEO: "CEO-weergave",
    tabOps: "Operator-weergave",
    tabConsultant: "Consultant-weergave",
    dashActiveAgents: "Actieve agents",
    dashStable: "Stabiel",
    dashAttention: "Aandacht",
    dashCritical: "Kritiek",
    dashRecentIncidents: "Recente incidenten",
    dashStockDrift: "STOCK-AI drift",
    dashAutoCorrected: "Auto-gecorrigeerd",
    dashRoutineCheck: "Routinecontrole",
    dashAtRisk: "Risicovolle beslissingen",
    dashPricingDrift: "Prijsstelling → margedrift",
    dashInventoryLow: "Voorraad → lage dekking",
    dashNoCritical: "Geen kritieke risico's",
    dashSuspendAll: "🛑 ALLES OPSCHORTEN",
    dashVsLastMonth: "▲ +3,2 vs vorige maand",
    opsTitle: "Agent-operator weergave",
    opsDesc: "Diepgaande analyse van de prestaties van elke agent. Regels aanpassen, driftdrempels beheren, incidenten oplossen.",
    opsIncidents: "Incidenten",
    consultTitle: "Gecertificeerde consultant-weergave",
    consultDesc: "Multi-client toegang, benchmarks, missiesjablonen en audit-klare exports. Lever een volledige ACF-diagnose in minder dan 2 uur.",
    consultMultiClient: "Multi-client",
    consultTemplates: "Sjablonen",
    consultBenchmark: "Benchmark",
    consultPDFExport: "PDF-export",
    sectionRealMath: "De echte berekening",
    riskTitle1: "Wat kost de ",
    riskTitleRed: "afwezigheid",
    riskTitle2: " van governance?",
    riskDesc1: "De kosten van ACF Control zijn ",
    riskDescStrong: "verwaarloosbaar",
    riskDesc2: " vergeleken met de financiële, regelgevende en reputatierisico's die u loopt zonder geformaliseerde governance.",
    riskAIActLabel: "EU AI ACT BOETES",
    riskAIActDesc1: "Tot ",
    riskAIActStrong: "€35 miljoen",
    riskAIActDesc2: " of 7% van de wereldwijde jaaromzet wegens niet-naleving van transparantie- en toezichtvereisten voor AI-systemen met hoog risico.",
    riskGDPRLabel: "AVG-BOETES",
    riskGDPRDesc1: "Tot ",
    riskGDPRStrong: "€20 miljoen",
    riskGDPRDesc2: " of 4% van de wereldwijde jaaromzet. Onbestuurde geautomatiseerde beslissingen vermenigvuldigen het risico op datalekken.",
    riskDriftLabel: "KOSTEN VAN AI-DRIFT",
    riskDriftDesc1: "Gemiddeld waargenomen verlies door ",
    riskDriftStrong: "ongecontroleerde AI-beslissingen",
    riskDriftDesc2: ": prijsfouten, defecte voorraad, onrechtmatige klantuitsluitingen, onzichtbare marge-erosie.",
    riskWithout: "RISICO ZONDER GOVERNANCE",
    riskMaxExposure: "Maximale cumulatieve blootstelling",
    riskACFInvestment: "ACF CONTROL INVESTERING",
    riskFraction: "Een fractie van uw risicoblootstelling",
    riskStat1: "van de bedrijven gebruikt AI-agents zonder geformaliseerde governance",
    riskStat2: "van de leidinggevenden vreest het verlies van strategische controle over hun agents",
    riskStat3: "incidenten stijgen 12x sneller in organisaties zonder toezicht",
    sectionPlans: "Plannen",
    pricingTitle: "Op maat gemaakte governance, geen standaard SaaS.",
    pricingDesc: "Elke organisatie heeft unieke soevereiniteitsuitdagingen. Wij passen ACF Control aan op uw agentarchitectuur, sector en regelgevingsvereisten.",
    tierEssential: "ESSENTIEEL",
    tierEssentialDesc: "Tot 3 agents",
    tierProfessional: "PROFESSIONEEL",
    tierProfessionalDesc: "Tot 10 agents",
    tierEnterprise: "ENTERPRISE",
    tierEnterpriseDesc: "Onbeperkte agents",
    tierRecommended: "AANBEVOLEN",
    priceOnRequest: "Prijs op aanvraag",
    planRequestDemo: "Demo aanvragen →",
    planContactUs: "Neem contact op",
    featEssential: ["Soevereiniteitsscore", "Beslissingsregister", "Kritikaliteitsmatrix", "Basisalarmen", "PDF-exports"],
    featProfessional: ["Alles in Essentieel +", "Drift Engine™", "Incidentclassificatie", "Kill Switch (3 niveaus)", "Agentische constitutie", "Slimme alarmen (Slack + E-mail)", "Consultanttoegang"],
    featEnterprise: ["Alles in Professioneel +", "Multi-site / Multi-BU", "Maatwerkintegraties (API)", "Toegewijd DDA-support", "Audittrail (3 jaar)", "White-label optie", "SLA 99,9%"],
    partnerLabel: "GECERTIFICEERD PARTNERPROGRAMMA",
    partnerDesc: "Jaarlijkse consultantlicentie. ACF-certificering vereist voor klanttoegang.",
    partnerApply: "Solliciteer voor certificering →",
    statKillSwitch: "Kill switch max",
    statKPIs: "Soevereiniteits-KPI's",
    statControls: "Controles per agent",
    statOperational: "Operationeel in",
    ctaLine1: "Stop met blind vliegen.",
    ctaLine2: "Begin met besturen.",
    ctaDesc1: "Uw agents nemen al beslissingen. De enige vraag is: ",
    ctaDescStrong: "heeft u het commando?",
    ctaDemo: "Demo aanvragen →",
    ctaScore: "Bereken uw ACF Score",
  },
  ru: {
    navDecisionGovOS: "ОС УПРАВЛЕНИЯ РЕШЕНИЯМИ",
    navHome: "Главная",
    navModules: "Модули",
    navDriftEngine: "Движок дрифта",
    navDashboard: "Панель управления",
    navRisks: "Риски",
    navRequestDemo: "Запросить демо",
    navStandard: "Стандарт", navScore: "ACF Score", navBlog: "Блог", navPartners: "Партнёры", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "СИСТЕМА УПРАВЛЕНИЯ В РЕАЛЬНОМ ВРЕМЕНИ",
    heroLine1: "Ваши агенты принимают решения.",
    heroLine2: "Вы сохраняете контроль.",
    heroDesc1: "ACF Control — это ",
    heroDescStrong: "операционная система управления решениями",
    heroDesc2: " для организаций, развёртывающих автономных ИИ-агентов. Обнаруживайте дрифт, классифицируйте инциденты, вмешивайтесь мгновенно.",
    heroBookDemo: "Записаться на демо →",
    heroWatchDemo: "Смотреть демо",
    heroGDPR: "Соответствует GDPR",
    heroEUAI: "Готов к EU AI Act",
    heroKillSwitch60: "Kill Switch 60 сек",
    killSwitchActive: "⚠ KILL SWITCH АКТИВЕН",
    criticalAlert: "🚨 КРИТИЧЕСКОЕ ОПОВЕЩЕНИЕ",
    controlLive: "ACF CONTROL — LIVE",
    sovereigntyScore: "Оценка суверенитета",
    scoreUp: "▲ +3,2 (30д)",
    scoreSuspended: "⬛ ПРИОСТАНОВЛЕН",
    scoreCritical: "▼ −33 КРИТИЧЕСКИЙ",
    tlKillAll: "⚠ KILL SWITCH АКТИВИРОВАН — Все агенты приостановлены",
    tlStockDriftBreach: "Дрифт STOCK-AI превысил 300% — нарушение суверенитета",
    tlDegradedMode: "Деградированный режим активен — требуется передача управления человеку",
    tlStockCritical: "🚨 STOCK-AI КРИТИЧЕСКИЙ — Оценка 12, дрифт +312%",
    tlSovBelow: "Оценка суверенитета ниже порога (41/100)",
    tlStockDrift12: "Обнаружен дрифт STOCK-AI (−1,2%)",
    tlFraudBlocked: "FRAUD-DET подозрительная транзакция заблокирована",
    tlStockAccel: "⚠ Дрифт STOCK-AI ускоряется (−4,8%)",
    tlPriceGovMargin: "PRICE-GOV маржа скорректирована +0,3%",
    tlEscalationApproach: "Порог эскалации приближается",
    allAgentsSuspended: "ВСЕ АГЕНТЫ ПРИОСТАНОВЛЕНЫ",
    killSwitchRecommended: "KILL SWITCH РЕКОМЕНДОВАН",
    humanTakeoverActive: "Передача управления человеку активна. Ожидание ручной проверки.",
    sovereigntyBreach: "Обнаружено нарушение суверенитета. Требуется немедленное вмешательство.",
    eqObservability: "Наблюдаемость",
    eqGovernance: "Управление",
    eqIntervention: "Вмешательство",
    eqSovereignty: "Суверенитет",
    sectionPositioning: "Позиционирование",
    posTitle: "Это не очередная ИИ-панель.",
    posDesc1: "ACF Control — это ",
    posDescStrong: "слой управления решениями",
    posDesc2: " — нервная система, необходимая вашей организации для сохранения суверенитета.",
    posIsNotTitle: "ACF Control — это НЕ",
    posIsTitle: "ACF Control — это",
    posNotItems: [
      "Инструмент ИИ или конструктор агентов",
      "Платформа репрайсинга или маркетинга",
      "Пассивная панель отчётности",
      "Движок оптимизации",
      "Хранилище данных или BI-инструмент",
    ],
    posIsItems: [
      "Операционная система управления решениями",
      "Центр обнаружения дрифта в реальном времени",
      "Хаб классификации и реагирования на инциденты",
      "Центр вмешательства командного органа",
      "Платформа контроля суверенитета",
    ],
    sectionArchitecture: "Архитектура",
    modulesTitle: "8 основных модулей",
    modulesSubtitle: "Каждый модуль служит одной цели: сохранить за людьми контроль над решениями машин.",
    mod00Title: "Оценка суверенитета",
    mod00Sub: "Ваш базовый показатель управления — от 0 до 100 по 4 осям.",
    mod00Axes: "Дистрибуция · Решения · Трафик · Казначейство",
    mod00Export: "Экспорт PDF",
    mod01Title: "Реестр решений",
    mod01Sub: "Живой реестр: кто решает что, чем и как.",
    mod01PriceAdj: "Корректировка цен",
    mod01PriceStatus: "Управляемое",
    mod01Replenishment: "Пополнение",
    mod01ReplenishStatus: "С ассистентом",
    mod01CustExcl: "Исключение клиентов",
    mod01CustStatus: "Только человек",
    mod02Title: "Матрица критичности",
    mod02Sub: "Воздействие × Частота × Необратимость.",
    mod02Optimizable: "Оптимизируемое",
    mod02Governed: "Управляемое",
    mod02HumanOnly: "Только человек",
    mod03Title: "Агентская конституция",
    mod03Sub: "Стратегический документ управления — версионированный, подписанный, аудируемый.",
    mod03Items: ["Приоритетные цели", "Критические пороги", "Правила эскалации", "Неделегируемые зоны", "Владелец Kill Switch"],
    mod03Signed: "Подписано CEO — v2.1 — Фев 2026",
    mod04Title: "Реестр агентов",
    mod04Sub: "Каждый агент задокументирован: мандат, охват, ограничения, человек-владелец.",
    mod05Title: "Минимально достаточный надзор",
    mod05Sub: "5 KPI на агента. Пороги. Оповещения. 30-дневная история.",
    mod05Margin: "Маржа",
    mod05Escalations: "Эскалации",
    mod05Overrides: "Переопределения",
    mod05HumanLoad: "Нагрузка на человека",
    mod06Title: "Непрерывное управление",
    mod06Sub: "Ежемесячные обзоры, ежегодные аудиты соответствия, отслеживание развития управления.",
    mod06Timeline: "Ежемесячный обзор → Квартальный аудит → Ежегодная сертификация",
    mod07Title: "Кризисное управление",
    mod07Sub: "3-уровневая классификация инцидентов, учения kill switch, протоколы разбора.",
    mod07Levels: "Уровень 1: Пауза · Уровень 2: Сдерживание · Уровень 3: Kill",
    sectionKeyDiff: "Ключевое отличие",
    driftTitle: "Drift Engine™",
    driftP1: "Катастрофические сбои ИИ возникают не из-за багов — они возникают из-за ",
    driftP1Strong: "медленного, невидимого дрифта",
    driftP1End: ". Маржа, снижающаяся с 32% → 28% незаметно. Эскалации, ставшие «нормой».",
    driftP2Start: "Drift Engine вычисляет ",
    driftP2Strong: "7-дневные и 30-дневные тренды",
    driftP2Mid: " для каждого KPI агента. Он запускает оповещения ",
    driftP2Gold: "ещё до достижения пороговых значений",
    driftP2End: ".",
    driftLow: "Низкий дрифт",
    driftLowDesc: "Тренд движется, в пределах допуска",
    driftSig: "Значительный дрифт",
    driftSigDesc: "Приближение к границе порога",
    driftCrit: "Критический дрифт",
    driftCritDesc: "Требуется немедленное вмешательство",
    driftStabilityLabel: "ОЦЕНКИ СТАБИЛЬНОСТИ АГЕНТОВ",
    driftDetectionLabel: "ОБНАРУЖЕНИЕ ДРИФТА — STOCK-AI",
    driftDetected: "⚠ ДРИФТ ОБНАРУЖЕН",
    drift14dTrend: "Тренд 14д",
    drift14dAgo: "14д назад",
    driftNow: "сейчас",
    driftMarginWarn: "⚠ Дрифт маржи STOCK-AI: −1,8% за 14 дней.",
    driftRecommendation: "→ Рекомендация: пересмотреть порог или сократить охват.",
    sectionCommandAuth: "Командная инстанция",
    interventionTitle: "Немедленное вмешательство",
    interventionDesc1: "ACF Control не только оповещает — он даёт вам возможность ",
    interventionDescStrong: "действовать за считанные секунды",
    interventionDesc2: ".",
    intSuspend: "Приостановить агента",
    intReduceScope: "Сократить охват",
    intForceEsc: "Принудительная эскалация",
    intDegraded: "Деградированный режим",
    intKillSwitch: "Kill Switch",
    killGlobalLabel: "🛑 ГЛОБАЛЬНЫЙ KILL SWITCH",
    killGlobalDesc: "Приостановить ВСЕХ автономных агентов. Полный деградированный режим за 60 секунд.",
    killArmedBtn: "⚠ KILL SWITCH ВЗВЕДЁН — Нажмите для отключения",
    killArmBtn: "Взвести Kill Switch",
    killArmedMsg: "Все агенты будут приостановлены после подтверждения. Действие зафиксировано.",
    sectionOnePageAnswer: "Одна страница, один ответ",
    dashTitle: "Панель для руководителя",
    dashQuestion: "Один вопрос, ответ за 30 секунд: ",
    dashQuestionBold: "«Мы суверенны сегодня?»",
    tabCEO: "Вид CEO",
    tabOps: "Вид оператора",
    tabConsultant: "Вид консультанта",
    dashActiveAgents: "Активные агенты",
    dashStable: "Стабильно",
    dashAttention: "Внимание",
    dashCritical: "Критично",
    dashRecentIncidents: "Недавние инциденты",
    dashStockDrift: "Дрифт STOCK-AI",
    dashAutoCorrected: "Автокоррекция",
    dashRoutineCheck: "Плановая проверка",
    dashAtRisk: "Решения под угрозой",
    dashPricingDrift: "Ценообразование → дрифт маржи",
    dashInventoryLow: "Запасы → низкое покрытие",
    dashNoCritical: "Нет критических рисков",
    dashSuspendAll: "🛑 ПРИОСТАНОВИТЬ ВСЕ",
    dashVsLastMonth: "▲ +3,2 vs прошлый месяц",
    opsTitle: "Вид оператора агентов",
    opsDesc: "Глубокий анализ производительности каждого агента. Корректировка правил, управление порогами дрифта, разрешение инцидентов.",
    opsIncidents: "Инциденты",
    consultTitle: "Вид сертифицированного консультанта",
    consultDesc: "Мультиклиентский доступ, бенчмарки, шаблоны миссий и экспорт для аудита. Полная диагностика ACF менее чем за 2 часа.",
    consultMultiClient: "Мультиклиент",
    consultTemplates: "Шаблоны",
    consultBenchmark: "Бенчмарк",
    consultPDFExport: "Экспорт PDF",
    sectionRealMath: "Настоящая математика",
    riskTitle1: "Во сколько обходится ",
    riskTitleRed: "отсутствие",
    riskTitle2: " управления?",
    riskDesc1: "Стоимость ACF Control ",
    riskDescStrong: "ничтожна",
    riskDesc2: " по сравнению с финансовыми, регуляторными и репутационными рисками, которые вы несёте без формализованного управления.",
    riskAIActLabel: "ШТРАФЫ EU AI ACT",
    riskAIActDesc1: "До ",
    riskAIActStrong: "€35 миллионов",
    riskAIActDesc2: " или 7% мирового годового оборота за несоблюдение требований прозрачности и надзора для систем ИИ высокого риска.",
    riskGDPRLabel: "ШТРАФЫ GDPR",
    riskGDPRDesc1: "До ",
    riskGDPRStrong: "€20 миллионов",
    riskGDPRDesc2: " или 4% мирового годового оборота. Неуправляемые автоматизированные решения увеличивают риск нарушений данных.",
    riskDriftLabel: "СТОИМОСТЬ ИИ-ДРИФТА",
    riskDriftDesc1: "Средние наблюдаемые потери от ",
    riskDriftStrong: "неконтролируемых решений ИИ",
    riskDriftDesc2: ": ценовые ошибки, дефектные запасы, злоупотребление исключениями клиентов, невидимая эрозия маржи.",
    riskWithout: "РИСК БЕЗ УПРАВЛЕНИЯ",
    riskMaxExposure: "Максимальная совокупная экспозиция",
    riskACFInvestment: "ИНВЕСТИЦИЯ В ACF CONTROL",
    riskFraction: "Малая доля вашей подверженности риску",
    riskStat1: "компаний используют ИИ-агентов без формализованного управления",
    riskStat2: "руководителей опасаются потери стратегического контроля над своими агентами",
    riskStat3: "инциденты растут в 12 раз быстрее в организациях без надзора",
    sectionPlans: "Тарифы",
    pricingTitle: "Управление на заказ, а не стандартный SaaS.",
    pricingDesc: "У каждой организации уникальные вызовы суверенитета. Мы адаптируем ACF Control к вашей архитектуре агентов, отрасли и регуляторным требованиям.",
    tierEssential: "ESSENTIAL",
    tierEssentialDesc: "До 3 агентов",
    tierProfessional: "PROFESSIONAL",
    tierProfessionalDesc: "До 10 агентов",
    tierEnterprise: "ENTERPRISE",
    tierEnterpriseDesc: "Без ограничений",
    tierRecommended: "РЕКОМЕНДОВАНО",
    priceOnRequest: "Цена по запросу",
    planRequestDemo: "Запросить демо →",
    planContactUs: "Связаться с нами",
    featEssential: ["Оценка суверенитета", "Реестр решений", "Матрица критичности", "Базовые оповещения", "Экспорт PDF"],
    featProfessional: ["Всё из Essential +", "Drift Engine™", "Классификация инцидентов", "Kill Switch (3 уровня)", "Агентская конституция", "Умные оповещения (Slack + Email)", "Доступ консультанта"],
    featEnterprise: ["Всё из Professional +", "Мульти-сайт / Мульти-BU", "Пользовательские интеграции (API)", "Выделенная поддержка DDA", "Аудиторский след (3 года)", "Опция white-label", "SLA 99,9%"],
    partnerLabel: "ПРОГРАММА СЕРТИФИЦИРОВАННЫХ ПАРТНЁРОВ",
    partnerDesc: "Годовая лицензия консультанта. Для клиентского доступа требуется сертификация ACF.",
    partnerApply: "Подать заявку на сертификацию →",
    statKillSwitch: "Kill switch макс",
    statKPIs: "KPI суверенитета",
    statControls: "Контролей на агента",
    statOperational: "В эксплуатации за",
    ctaLine1: "Хватит летать вслепую.",
    ctaLine2: "Начните управлять.",
    ctaDesc1: "Ваши агенты уже принимают решения. Единственный вопрос: ",
    ctaDescStrong: "вы у руля?",
    ctaDemo: "Запросить демо →",
    ctaScore: "Рассчитайте ваш ACF Score",
  },
  ar: {
    navDecisionGovOS: "نظام تشغيل حوكمة القرارات",
    navHome: "الرئيسية",
    navModules: "الوحدات",
    navDriftEngine: "محرك الانحراف",
    navDashboard: "لوحة التحكم",
    navRisks: "المخاطر",
    navRequestDemo: "طلب عرض توضيحي",
    navStandard: "المعيار", navScore: "ACF Score", navBlog: "المدونة", navPartners: "الشركاء", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "نظام حوكمة مباشر",
    heroLine1: "وكلاؤك يقررون.",
    heroLine2: "أنت تحافظ على السيطرة.",
    heroDesc1: "ACF Control هو ",
    heroDescStrong: "نظام تشغيل حوكمة القرارات",
    heroDesc2: " للمؤسسات التي تنشر وكلاء ذكاء اصطناعي مستقلين. اكتشف الانحراف، صنّف الحوادث، تدخّل فوراً.",
    heroBookDemo: "احجز عرضاً توضيحياً →",
    heroWatchDemo: "شاهد العرض",
    heroGDPR: "متوافق مع GDPR",
    heroEUAI: "جاهز لقانون الذكاء الاصطناعي الأوروبي",
    heroKillSwitch60: "مفتاح الإيقاف 60 ثانية",
    killSwitchActive: "⚠ مفتاح الإيقاف مُفعَّل",
    criticalAlert: "🚨 تنبيه حرج",
    controlLive: "ACF CONTROL — مباشر",
    sovereigntyScore: "نقاط السيادة",
    scoreUp: "▲ +3.2 (30 يوم)",
    scoreSuspended: "⬛ مُعلَّق",
    scoreCritical: "▼ −33 حرج",
    tlKillAll: "⚠ مفتاح الإيقاف مُفعَّل — جميع الوكلاء مُعلَّقون",
    tlStockDriftBreach: "انحراف STOCK-AI تجاوز 300% — انتهاك السيادة",
    tlDegradedMode: "وضع التدهور نشط — مطلوب تولي بشري",
    tlStockCritical: "🚨 STOCK-AI حرج — النقاط 12، انحراف +312%",
    tlSovBelow: "نقاط السيادة تحت العتبة (41/100)",
    tlStockDrift12: "انحراف STOCK-AI مُكتشَف (−1.2%)",
    tlFraudBlocked: "FRAUD-DET معاملة مشبوهة محظورة",
    tlStockAccel: "⚠ انحراف STOCK-AI يتسارع (−4.8%)",
    tlPriceGovMargin: "PRICE-GOV الهامش مُعدَّل +0.3%",
    tlEscalationApproach: "عتبة التصعيد تقترب",
    allAgentsSuspended: "جميع الوكلاء مُعلَّقون",
    killSwitchRecommended: "مفتاح الإيقاف مُوصى به",
    humanTakeoverActive: "التولي البشري نشط. في انتظار المراجعة اليدوية.",
    sovereigntyBreach: "تم اكتشاف انتهاك السيادة. مطلوب تدخل فوري.",
    eqObservability: "قابلية المراقبة",
    eqGovernance: "الحوكمة",
    eqIntervention: "التدخل",
    eqSovereignty: "السيادة",
    sectionPositioning: "التموضع",
    posTitle: "ليست لوحة تحكم ذكاء اصطناعي أخرى.",
    posDesc1: "ACF Control هو ",
    posDescStrong: "طبقة حوكمة القرارات",
    posDesc2: " — الجهاز العصبي الذي تحتاجه مؤسستك للحفاظ على سيادتها.",
    posIsNotTitle: "ACF Control ليس",
    posIsTitle: "ACF Control هو",
    posNotItems: [
      "أداة ذكاء اصطناعي أو منشئ وكلاء",
      "منصة إعادة تسعير أو تسويق",
      "لوحة تقارير سلبية",
      "محرك تحسين",
      "مستودع بيانات أو أداة ذكاء أعمال",
    ],
    posIsItems: [
      "نظام تشغيل حوكمة القرارات",
      "مركز كشف الانحراف في الوقت الفعلي",
      "مركز تصنيف الحوادث والاستجابة لها",
      "مركز تدخل سلطة القيادة",
      "منصة إشراف على السيادة",
    ],
    sectionArchitecture: "البنية المعمارية",
    modulesTitle: "8 وحدات أساسية",
    modulesSubtitle: "كل وحدة تخدم غرضاً واحداً: إبقاء البشر في قيادة قرارات الآلات.",
    mod00Title: "نقاط السيادة",
    mod00Sub: "خط الأساس لحوكمتك — من 0 إلى 100 عبر 4 محاور.",
    mod00Axes: "التوزيع · القرار · حركة المرور · الخزينة",
    mod00Export: "تصدير PDF",
    mod01Title: "سجل القرارات",
    mod01Sub: "جرد حي: من يقرر ماذا، بماذا، وكيف.",
    mod01PriceAdj: "تعديل السعر",
    mod01PriceStatus: "مُحوكَم",
    mod01Replenishment: "إعادة التموين",
    mod01ReplenishStatus: "بمساعدة",
    mod01CustExcl: "استبعاد العملاء",
    mod01CustStatus: "بشري فقط",
    mod02Title: "مصفوفة الأهمية الحرجة",
    mod02Sub: "التأثير × التكرار × عدم القابلية للعكس.",
    mod02Optimizable: "قابل للتحسين",
    mod02Governed: "مُحوكَم",
    mod02HumanOnly: "بشري فقط",
    mod03Title: "الدستور الوكيلي",
    mod03Sub: "وثيقة حوكمة استراتيجية — مُسيطَر عليها بالإصدارات، موقّعة، قابلة للتدقيق.",
    mod03Items: ["الأهداف ذات الأولوية", "العتبات الحرجة", "قواعد التصعيد", "المناطق غير القابلة للتفويض", "مالك مفتاح الإيقاف"],
    mod03Signed: "موقّع من الرئيس التنفيذي — v2.1 — فبراير 2026",
    mod04Title: "سجل الوكلاء",
    mod04Sub: "كل وكيل موثّق: التفويض، النطاق، الحدود، المالك البشري.",
    mod05Title: "الحد الأدنى من الإشراف القابل للتطبيق",
    mod05Sub: "5 مؤشرات أداء لكل وكيل. عتبات. تنبيهات. سجل 30 يوماً.",
    mod05Margin: "الهامش",
    mod05Escalations: "التصعيدات",
    mod05Overrides: "التجاوزات",
    mod05HumanLoad: "الحمل البشري",
    mod06Title: "الحوكمة المستمرة",
    mod06Sub: "مراجعات شهرية، تدقيقات امتثال سنوية، تتبع تطور الحوكمة.",
    mod06Timeline: "مراجعة شهرية → تدقيق ربع سنوي → شهادة سنوية",
    mod07Title: "إدارة الأزمات",
    mod07Sub: "تصنيف حوادث من 3 مستويات، تدريبات مفتاح الإيقاف، بروتوكولات ما بعد الحادث.",
    mod07Levels: "المستوى 1: إيقاف مؤقت · المستوى 2: احتواء · المستوى 3: إيقاف كامل",
    sectionKeyDiff: "عامل التمييز الرئيسي",
    driftTitle: "Drift Engine™",
    driftP1: "إخفاقات الذكاء الاصطناعي الكارثية لا تأتي من الأخطاء البرمجية — بل من ",
    driftP1Strong: "الانحراف البطيء وغير المرئي",
    driftP1End: ". الهامش الذي ينزلق من 32% إلى 28% دون أن يلاحظ أحد. التصعيدات التي تصبح «طبيعية».",
    driftP2Start: "يحسب Drift Engine ",
    driftP2Strong: "اتجاهات 7 أيام و30 يوماً",
    driftP2Mid: " لكل مؤشر أداء للوكيل. يطلق التنبيهات ",
    driftP2Gold: "قبل تجاوز العتبات",
    driftP2End: ".",
    driftLow: "انحراف منخفض",
    driftLowDesc: "الاتجاه يتحرك، ضمن التسامح",
    driftSig: "انحراف كبير",
    driftSigDesc: "الاقتراب من حدود العتبة",
    driftCrit: "انحراف حرج",
    driftCritDesc: "مطلوب تدخل فوري",
    driftStabilityLabel: "نقاط استقرار الوكلاء",
    driftDetectionLabel: "كشف الانحراف — STOCK-AI",
    driftDetected: "⚠ تم كشف الانحراف",
    drift14dTrend: "اتجاه 14 يوم",
    drift14dAgo: "قبل 14 يوم",
    driftNow: "الآن",
    driftMarginWarn: "⚠ انحراف هامش STOCK-AI: −1.8% خلال 14 يوماً.",
    driftRecommendation: "→ التوصية: مراجعة العتبة أو تقليص النطاق.",
    sectionCommandAuth: "سلطة القيادة",
    interventionTitle: "التدخل الفوري",
    interventionDesc1: "ACF Control لا ينبّه فقط — بل يمنحك القدرة على ",
    interventionDescStrong: "التصرف خلال ثوانٍ",
    interventionDesc2: ".",
    intSuspend: "تعليق الوكيل",
    intReduceScope: "تقليص النطاق",
    intForceEsc: "فرض التصعيد",
    intDegraded: "وضع التدهور",
    intKillSwitch: "مفتاح الإيقاف",
    killGlobalLabel: "🛑 مفتاح الإيقاف الشامل",
    killGlobalDesc: "تعليق جميع الوكلاء المستقلين. وضع التدهور الكامل خلال 60 ثانية.",
    killArmedBtn: "⚠ مفتاح الإيقاف جاهز — انقر للإلغاء",
    killArmBtn: "تسليح مفتاح الإيقاف",
    killArmedMsg: "سيتم تعليق جميع الوكلاء بعد التأكيد. تم تسجيل الإجراء.",
    sectionOnePageAnswer: "صفحة واحدة، إجابة واحدة",
    dashTitle: "لوحة التحكم التنفيذية",
    dashQuestion: "سؤال واحد، يُجاب عليه في 30 ثانية: ",
    dashQuestionBold: "«هل نحن أصحاب سيادة اليوم؟»",
    tabCEO: "عرض الرئيس التنفيذي",
    tabOps: "عرض المشغّل",
    tabConsultant: "عرض المستشار",
    dashActiveAgents: "الوكلاء النشطون",
    dashStable: "مستقر",
    dashAttention: "انتباه",
    dashCritical: "حرج",
    dashRecentIncidents: "حوادث حديثة",
    dashStockDrift: "انحراف STOCK-AI",
    dashAutoCorrected: "تصحيح تلقائي",
    dashRoutineCheck: "فحص روتيني",
    dashAtRisk: "قرارات معرضة للخطر",
    dashPricingDrift: "التسعير → انحراف الهامش",
    dashInventoryLow: "المخزون → تغطية منخفضة",
    dashNoCritical: "لا مخاطر حرجة",
    dashSuspendAll: "🛑 تعليق الكل",
    dashVsLastMonth: "▲ +3.2 مقارنة بالشهر الماضي",
    opsTitle: "عرض مشغّل الوكلاء",
    opsDesc: "تحليل عميق لأداء كل وكيل. عدّل القواعد، أدِر عتبات الانحراف، حُل الحوادث.",
    opsIncidents: "الحوادث",
    consultTitle: "عرض المستشار المعتمد",
    consultDesc: "وصول متعدد العملاء، معايير مرجعية، قوالب مهام وتصدير جاهز للتدقيق. قدّم تشخيص ACF كامل في أقل من ساعتين.",
    consultMultiClient: "متعدد العملاء",
    consultTemplates: "القوالب",
    consultBenchmark: "المعيار المرجعي",
    consultPDFExport: "تصدير PDF",
    sectionRealMath: "الحساب الحقيقي",
    riskTitle1: "ما تكلفة ",
    riskTitleRed: "غياب",
    riskTitle2: " الحوكمة؟",
    riskDesc1: "تكلفة ACF Control ",
    riskDescStrong: "لا تُذكر",
    riskDesc2: " مقارنة بالمخاطر المالية والتنظيمية وخطر السمعة التي تتحملها بدون حوكمة رسمية.",
    riskAIActLabel: "غرامات قانون الذكاء الاصطناعي الأوروبي",
    riskAIActDesc1: "حتى ",
    riskAIActStrong: "35 مليون يورو",
    riskAIActDesc2: " أو 7% من الإيرادات السنوية العالمية لعدم الامتثال لمتطلبات الشفافية والإشراف على أنظمة الذكاء الاصطناعي عالية المخاطر.",
    riskGDPRLabel: "غرامات GDPR",
    riskGDPRDesc1: "حتى ",
    riskGDPRStrong: "20 مليون يورو",
    riskGDPRDesc2: " أو 4% من الإيرادات السنوية العالمية. القرارات الآلية غير المُحوكَمة تُضاعف مخاطر انتهاكات البيانات.",
    riskDriftLabel: "تكلفة انحراف الذكاء الاصطناعي",
    riskDriftDesc1: "متوسط الخسارة الملاحظة من ",
    riskDriftStrong: "قرارات الذكاء الاصطناعي غير المسيطر عليها",
    riskDriftDesc2: ": أخطاء التسعير، مخزون معيب، استبعاد عملاء تعسفي، تآكل هامش غير مرئي.",
    riskWithout: "المخاطر بدون حوكمة",
    riskMaxExposure: "الحد الأقصى للتعرض التراكمي",
    riskACFInvestment: "استثمار ACF CONTROL",
    riskFraction: "جزء بسيط من تعرضك للمخاطر",
    riskStat1: "من الشركات تستخدم وكلاء ذكاء اصطناعي بدون حوكمة رسمية",
    riskStat2: "من المديرين التنفيذيين يخشون فقدان السيطرة الاستراتيجية على وكلائهم",
    riskStat3: "الحوادث تزداد 12 ضعفاً أسرع في المؤسسات بدون إشراف",
    sectionPlans: "الخطط",
    pricingTitle: "حوكمة مخصصة، وليست SaaS موحّدة.",
    pricingDesc: "كل مؤسسة لديها تحديات سيادة فريدة. نُكيّف ACF Control وفقاً لبنية وكلائك وقطاعك ومتطلباتك التنظيمية.",
    tierEssential: "أساسي",
    tierEssentialDesc: "حتى 3 وكلاء",
    tierProfessional: "احترافي",
    tierProfessionalDesc: "حتى 10 وكلاء",
    tierEnterprise: "مؤسسي",
    tierEnterpriseDesc: "وكلاء غير محدودين",
    tierRecommended: "مُوصى به",
    priceOnRequest: "السعر عند الطلب",
    planRequestDemo: "طلب عرض توضيحي →",
    planContactUs: "اتصل بنا",
    featEssential: ["نقاط السيادة", "سجل القرارات", "مصفوفة الأهمية الحرجة", "تنبيهات أساسية", "تصدير PDF"],
    featProfessional: ["كل ما في الأساسي +", "Drift Engine™", "تصنيف الحوادث", "مفتاح الإيقاف (3 مستويات)", "الدستور الوكيلي", "تنبيهات ذكية (Slack + Email)", "وصول المستشار"],
    featEnterprise: ["كل ما في الاحترافي +", "متعدد المواقع / متعدد وحدات الأعمال", "تكاملات مخصصة (API)", "دعم DDA مخصص", "سجل تدقيق (3 سنوات)", "خيار العلامة البيضاء", "SLA 99.9%"],
    partnerLabel: "برنامج الشركاء المعتمدين",
    partnerDesc: "ترخيص استشاري سنوي. شهادة ACF مطلوبة لوصول العملاء.",
    partnerApply: "التقدم للحصول على الشهادة →",
    statKillSwitch: "مفتاح الإيقاف أقصى",
    statKPIs: "مؤشرات أداء السيادة",
    statControls: "ضوابط لكل وكيل",
    statOperational: "تشغيلي في",
    ctaLine1: "توقف عن التحليق بلا رؤية.",
    ctaLine2: "ابدأ بالحوكمة.",
    ctaDesc1: "وكلاؤك يتخذون القرارات بالفعل. السؤال الوحيد هو: ",
    ctaDescStrong: "هل أنت في القيادة؟",
    ctaDemo: "طلب عرض توضيحي →",
    ctaScore: "احسب نقاط ACF Score الخاصة بك",
  },
  tr: {
    navDecisionGovOS: "KARAR YÖNETİŞİM İS",
    navHome: "Ana Sayfa",
    navModules: "Modüller",
    navDriftEngine: "Sapma Motoru",
    navDashboard: "Gösterge Paneli",
    navRisks: "Riskler",
    navRequestDemo: "Demo Talep Et",
    navStandard: "Standart", navScore: "ACF Score", navBlog: "Blog", navPartners: "İş Ortakları", navFaq: "FAQ", navCta: "Contact",
    badgeLive: "CANLI YÖNETİŞİM SİSTEMİ",
    heroLine1: "Ajanlarınız karar veriyor.",
    heroLine2: "Siz kontrolde kalıyorsunuz.",
    heroDesc1: "ACF Control, otonom yapay zeka ajanları kullanan kuruluşlar için ",
    heroDescStrong: "karar yönetişimi işletim sistemidir",
    heroDesc2: ". Sapmayı tespit edin, olayları sınıflandırın, anında müdahale edin.",
    heroBookDemo: "Demo Rezerve Et →",
    heroWatchDemo: "Demoyu İzle",
    heroGDPR: "KVKK/GDPR Uyumlu",
    heroEUAI: "AB AI Yasası Hazır",
    heroKillSwitch60: "Acil Durdurma 60sn",
    killSwitchActive: "⚠ ACİL DURDURMA AKTİF",
    criticalAlert: "🚨 KRİTİK UYARI",
    controlLive: "ACF CONTROL — CANLI",
    sovereigntyScore: "Egemenlik Puanı",
    scoreUp: "▲ +3,2 (30g)",
    scoreSuspended: "⬛ ASKIDA",
    scoreCritical: "▼ −33 KRİTİK",
    tlKillAll: "⚠ ACİL DURDURMA ETKİNLEŞTİRİLDİ — Tüm ajanlar askıya alındı",
    tlStockDriftBreach: "STOCK-AI sapması %300'ü aştı — egemenlik ihlali",
    tlDegradedMode: "Bozulmuş mod aktif — insan devralması gerekli",
    tlStockCritical: "🚨 STOCK-AI KRİTİK — Puan 12, sapma +%312",
    tlSovBelow: "Egemenlik puanı eşiğin altında (41/100)",
    tlStockDrift12: "STOCK-AI sapması tespit edildi (−%1,2)",
    tlFraudBlocked: "FRAUD-DET şüpheli işlem engellendi",
    tlStockAccel: "⚠ STOCK-AI sapması hızlanıyor (−%4,8)",
    tlPriceGovMargin: "PRICE-GOV marj düzeltmesi +%0,3",
    tlEscalationApproach: "Eskalasyon eşiği yaklaşıyor",
    allAgentsSuspended: "TÜM AJANLAR ASKIYA ALINDI",
    killSwitchRecommended: "ACİL DURDURMA ÖNERİLİYOR",
    humanTakeoverActive: "İnsan devralması aktif. Manuel inceleme bekleniyor.",
    sovereigntyBreach: "Egemenlik ihlali tespit edildi. Acil müdahale gerekli.",
    eqObservability: "Gözlemlenebilirlik",
    eqGovernance: "Yönetişim",
    eqIntervention: "Müdahale",
    eqSovereignty: "Egemenlik",
    sectionPositioning: "Konumlandırma",
    posTitle: "Bir yapay zeka gösterge paneli daha değil.",
    posDesc1: "ACF Control bir ",
    posDescStrong: "karar yönetişimi katmanıdır",
    posDesc2: " — kuruluşunuzun egemen kalması için ihtiyaç duyduğu sinir sistemi.",
    posIsNotTitle: "ACF Control şunlar DEĞİLDİR",
    posIsTitle: "ACF Control şunlarDIR",
    posNotItems: [
      "Bir yapay zeka aracı veya ajan oluşturucu",
      "Bir yeniden fiyatlandırma veya pazarlama platformu",
      "Pasif bir raporlama paneli",
      "Bir optimizasyon motoru",
      "Bir veri ambarı veya BI aracı",
    ],
    posIsItems: [
      "Bir karar yönetişimi işletim sistemi",
      "Gerçek zamanlı sapma tespit merkezi",
      "Olay sınıflandırma ve müdahale merkezi",
      "Komuta yetkisi müdahale merkezi",
      "Egemenlik denetim platformu",
    ],
    sectionArchitecture: "Mimari",
    modulesTitle: "8 Temel Modül",
    modulesSubtitle: "Her modül tek bir amaca hizmet eder: makine kararlarında insanları komutada tutmak.",
    mod00Title: "Egemenlik Puanı",
    mod00Sub: "Yönetişim referansınız — 4 eksende 0-100 arası puanlanır.",
    mod00Axes: "Dağıtım · Karar · Trafik · Hazine",
    mod00Export: "PDF Dışa Aktar",
    mod01Title: "Karar Sicili",
    mod01Sub: "Yaşayan bir envanter: kim neyi, neyle ve nasıl karar veriyor.",
    mod01PriceAdj: "Fiyat düzeltmesi",
    mod01PriceStatus: "Yönetilen",
    mod01Replenishment: "Yeniden stoklama",
    mod01ReplenishStatus: "Destekli",
    mod01CustExcl: "Müşteri hariç tutma",
    mod01CustStatus: "Yalnızca insan",
    mod02Title: "Kritiklik Matrisi",
    mod02Sub: "Etki × Sıklık × Geri Döndürülemezlik.",
    mod02Optimizable: "Optimize edilebilir",
    mod02Governed: "Yönetilen",
    mod02HumanOnly: "Yalnızca insan",
    mod03Title: "Ajantik Anayasa",
    mod03Sub: "Stratejik yönetişim belgesi — sürüm kontrollü, imzalı, denetlenebilir.",
    mod03Items: ["Öncelikli hedefler", "Kritik eşikler", "Eskalasyon kuralları", "Devredilemez bölgeler", "Acil Durdurma sahibi"],
    mod03Signed: "CEO imzalı — v2.1 — Şub 2026",
    mod04Title: "Ajan Sicili",
    mod04Sub: "Her ajan belgelenir: yetki, kapsam, sınırlar, insan sahibi.",
    mod05Title: "Asgari Uygulanabilir Denetim",
    mod05Sub: "Ajan başına 5 KPI. Eşikler. Uyarılar. 30 günlük geçmiş.",
    mod05Margin: "Marj",
    mod05Escalations: "Eskalasyonlar",
    mod05Overrides: "Geçersiz kılmalar",
    mod05HumanLoad: "İnsan yükü",
    mod06Title: "Sürekli Yönetişim",
    mod06Sub: "Aylık incelemeler, yıllık uyum denetimleri, yönetişim evrimi takibi.",
    mod06Timeline: "Aylık inceleme → Üç aylık denetim → Yıllık sertifikasyon",
    mod07Title: "Kriz Yönetimi",
    mod07Sub: "3 seviyeli olay sınıflandırması, acil durdurma tatbikatları, olay sonrası protokoller.",
    mod07Levels: "Seviye 1: Duraklat · Seviye 2: Sınırla · Seviye 3: Durdur",
    sectionKeyDiff: "Temel Farklılaştırıcı",
    driftTitle: "Drift Engine™",
    driftP1: "Felaket boyutundaki yapay zeka arızaları hatalardan kaynaklanmaz — ",
    driftP1Strong: "yavaş, görünmez sapmadan",
    driftP1End: " kaynaklanır. Kimsenin fark etmediği %32'den %28'e düşen marj. «Normal» hale gelen eskalasyonlar.",
    driftP2Start: "Drift Engine her ajan KPI'ı için ",
    driftP2Strong: "7 günlük ve 30 günlük trendler",
    driftP2Mid: " hesaplar. ",
    driftP2Gold: "Eşikler aşılmadan önce",
    driftP2End: " uyarıları tetikler.",
    driftLow: "Düşük sapma",
    driftLowDesc: "Trend hareket halinde, tolerans dahilinde",
    driftSig: "Önemli sapma",
    driftSigDesc: "Eşik sınırına yaklaşılıyor",
    driftCrit: "Kritik sapma",
    driftCritDesc: "Acil müdahale gerekli",
    driftStabilityLabel: "AJAN STABİLİTE PUANLARI",
    driftDetectionLabel: "SAPMA TESPİTİ — STOCK-AI",
    driftDetected: "⚠ SAPMA TESPİT EDİLDİ",
    drift14dTrend: "14g trend",
    drift14dAgo: "14g önce",
    driftNow: "şimdi",
    driftMarginWarn: "⚠ STOCK-AI marj sapması: 14 günde −%1,8.",
    driftRecommendation: "→ Öneri: eşiği gözden geçirin veya kapsamı daraltın.",
    sectionCommandAuth: "Komuta Yetkisi",
    interventionTitle: "Anında Müdahale",
    interventionDesc1: "ACF Control yalnızca uyarmaz — size ",
    interventionDescStrong: "saniyeler içinde harekete geçme",
    interventionDesc2: " gücü verir.",
    intSuspend: "Ajanı askıya al",
    intReduceScope: "Kapsamı daralt",
    intForceEsc: "Eskalasyonu zorla",
    intDegraded: "Bozulmuş mod",
    intKillSwitch: "Acil Durdurma",
    killGlobalLabel: "🛑 GENEL ACİL DURDURMA",
    killGlobalDesc: "TÜM otonom ajanları askıya al. 60 saniyede tam bozulmuş mod.",
    killArmedBtn: "⚠ ACİL DURDURMA HAZIR — Devre dışı bırakmak için tıklayın",
    killArmBtn: "Acil Durdurmayı Hazırla",
    killArmedMsg: "Onaydan sonra tüm ajanlar askıya alınacaktır. İşlem kayıt altına alındı.",
    sectionOnePageAnswer: "Bir sayfa, bir cevap",
    dashTitle: "Yönetici Gösterge Paneli",
    dashQuestion: "30 saniyede cevaplanan bir soru: ",
    dashQuestionBold: "«Bugün egemen miyiz?»",
    tabCEO: "CEO Görünümü",
    tabOps: "Operatör Görünümü",
    tabConsultant: "Danışman Görünümü",
    dashActiveAgents: "Aktif Ajanlar",
    dashStable: "Stabil",
    dashAttention: "Dikkat",
    dashCritical: "Kritik",
    dashRecentIncidents: "Son Olaylar",
    dashStockDrift: "STOCK-AI sapması",
    dashAutoCorrected: "Otomatik düzeltildi",
    dashRoutineCheck: "Rutin kontrol",
    dashAtRisk: "Riskli Kararlar",
    dashPricingDrift: "Fiyatlandırma → marj sapması",
    dashInventoryLow: "Envanter → düşük kapsam",
    dashNoCritical: "Kritik risk yok",
    dashSuspendAll: "🛑 TÜMÜNÜ ASKIYA AL",
    dashVsLastMonth: "▲ +3,2 geçen aya göre",
    opsTitle: "Ajan Operatör Görünümü",
    opsDesc: "Her ajanın performansının derinlemesine analizi. Kuralları ayarlayın, sapma eşiklerini yönetin, olayları çözün.",
    opsIncidents: "Olaylar",
    consultTitle: "Sertifikalı Danışman Görünümü",
    consultDesc: "Çok müşterili erişim, kıyaslamalar, görev şablonları ve denetime hazır dışa aktarımlar. 2 saatten kısa sürede eksiksiz ACF teşhisi sunun.",
    consultMultiClient: "Çok müşterili",
    consultTemplates: "Şablonlar",
    consultBenchmark: "Kıyaslama",
    consultPDFExport: "PDF Dışa Aktar",
    sectionRealMath: "Gerçek hesap",
    riskTitle1: "Yönetişimin ",
    riskTitleRed: "yokluğunun",
    riskTitle2: " maliyeti nedir?",
    riskDesc1: "ACF Control'ün maliyeti, resmileştirilmiş yönetişim olmadan üstlendiğiniz finansal, düzenleyici ve itibar riskleriyle karşılaştırıldığında ",
    riskDescStrong: "ihmal edilebilir",
    riskDesc2: " düzeydedir.",
    riskAIActLabel: "AB AI YASASI CEZALARI",
    riskAIActDesc1: "Yüksek riskli yapay zeka sistemleri için şeffaflık ve denetim gerekliliklerine uyumsuzluk halinde ",
    riskAIActStrong: "35 milyon €",
    riskAIActDesc2: "'ya veya küresel yıllık cironun %7'sine kadar.",
    riskGDPRLabel: "GDPR CEZALARI",
    riskGDPRDesc1: "",
    riskGDPRStrong: "20 milyon €",
    riskGDPRDesc2: "'ya veya küresel yıllık cironun %4'üne kadar. Yönetilmeyen otomatik kararlar veri ihlali riskini katlar.",
    riskDriftLabel: "YAPAY ZEKA SAPMA MALİYETİ",
    riskDriftDesc1: "",
    riskDriftStrong: "Kontrol edilmeyen yapay zeka kararlarından",
    riskDriftDesc2: " kaynaklanan ortalama gözlemlenen kayıp: fiyatlandırma hataları, bozuk envanter, kötüye kullanılan müşteri hariç tutmaları, görünmez marj erozyonu.",
    riskWithout: "YÖNETİŞİMSİZ RİSK",
    riskMaxExposure: "Maksimum kümülatif maruziyet",
    riskACFInvestment: "ACF CONTROL YATIRIMI",
    riskFraction: "Risk maruziyetinizin küçük bir kısmı",
    riskStat1: "şirketlerin resmileştirilmiş yönetişim olmadan yapay zeka ajanları kullanıyor",
    riskStat2: "yöneticilerin ajanları üzerindeki stratejik kontrolü kaybetmekten korkuyor",
    riskStat3: "olaylar denetimsiz kuruluşlarda 12 kat daha hızlı artıyor",
    sectionPlans: "Planlar",
    pricingTitle: "Özel yönetişim, standart SaaS değil.",
    pricingDesc: "Her kuruluşun benzersiz egemenlik zorlukları vardır. ACF Control'ü ajan mimarinize, sektörünüze ve düzenleyici gereksinimlerinize uyarlıyoruz.",
    tierEssential: "TEMEL",
    tierEssentialDesc: "3 ajana kadar",
    tierProfessional: "PROFESYONEL",
    tierProfessionalDesc: "10 ajana kadar",
    tierEnterprise: "KURUMSAL",
    tierEnterpriseDesc: "Sınırsız ajan",
    tierRecommended: "ÖNERİLEN",
    priceOnRequest: "Fiyat talep üzerine",
    planRequestDemo: "Demo Talep Et →",
    planContactUs: "Bize Ulaşın",
    featEssential: ["Egemenlik Puanı", "Karar Sicili", "Kritiklik Matrisi", "Temel uyarılar", "PDF dışa aktarma"],
    featProfessional: ["Temel'deki her şey +", "Drift Engine™", "Olay sınıflandırma", "Acil Durdurma (3 seviye)", "Ajantik Anayasa", "Akıllı uyarılar (Slack + E-posta)", "Danışman erişimi"],
    featEnterprise: ["Profesyonel'deki her şey +", "Çok tesisli / Çok BU", "Özel entegrasyonlar (API)", "Özel DDA desteği", "Denetim izi (3 yıl)", "Beyaz etiket seçeneği", "SLA %99,9"],
    partnerLabel: "SERTİFİKALI ORTAK PROGRAMI",
    partnerDesc: "Yıllık danışman lisansı. Müşteri erişimi için ACF sertifikası gereklidir.",
    partnerApply: "Sertifikasyon için başvurun →",
    statKillSwitch: "Acil durdurma maks",
    statKPIs: "Egemenlik KPI'ları",
    statControls: "Ajan başına kontrol",
    statOperational: "Faaliyete geçme",
    ctaLine1: "Kör uçuşu bırakın.",
    ctaLine2: "Yönetişime başlayın.",
    ctaDesc1: "Ajanlarınız zaten karar veriyor. Tek soru şu: ",
    ctaDescStrong: "komutada mısınız?",
    ctaDemo: "Demo Talep Et →",
    ctaScore: "ACF Score'unuzu Hesaplayın",
  },
};

export default function ACFControlPage() {
  const locale = useLocale();
  const lang = (ui as any)[locale] ? locale : "en";
  const t = (ui as any)[lang];
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
    const runSequence = () => sequence.map((s: any) => setTimeout(() => setAlertPhase(s.phase), s.delay));
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
    { label: t.navModules, href: "modules" },
    { label: t.navDriftEngine, href: "drift-engine" },
    { label: t.navDashboard, href: "dashboard" },
    { label: t.navRisks, href: "risks" },
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
      `}</style>

      {/* ━━━ NAV ━━━ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 800, height: 72,
        background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href={`/${locale}/`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1,
            }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>Agentic Commerce Framework®</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".1em" }}>GLOBAL STANDARD FOR AI GOVERNANCE</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {[
              { label: t.navHome, href: `/${locale}/` },
              { label: t.navStandard, href: `/${locale}/standard` },
              { label: t.navScore, href: `/${locale}/acf-score` },
              { label: t.navBlog, href: `/${locale}/blog` },
              { label: t.navPartners, href: `/${locale}/acf-partners` },
              { label: t.navFaq, href: `/${locale}/faq` },
            ].map((l) => (
              <a key={l.label} href={l.href} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>
            ))}
            <a href={`/${locale}/contact`} style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700, display: "inline-block" }}>{t.navCta}</a>
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
                <Badge>{t.badgeLive}</Badge>
              </div>

              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.08, marginBottom: 24, letterSpacing: "-1px" }}>
                <span style={{ color: "#fff" }}>{t.heroLine1}</span><br />
                <span style={{ color: C.gold }}>{t.heroLine2}</span>
              </h1>

              <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                {t.heroDesc1}<strong style={{ color: "#fff" }}>{t.heroDescStrong}</strong>{t.heroDesc2}
              </p>

              <div style={{ display: "flex", gap: 12, marginBottom: 32, position: "relative", zIndex: 5 }}>
                <Link href={`/${locale}/contact`} className="gold-glow" style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                  border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                  display: "inline-block", textDecoration: "none",
                }}>{t.heroBookDemo}</Link>
                <button style={{
                  background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
                  padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .3s",
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
                >{t.heroWatchDemo}</button>
              </div>

              <div style={{ display: "flex", gap: 24, fontSize: 12, color: C.gray }}>
                {[t.heroGDPR, t.heroEUAI, t.heroKillSwitch60].map((item: any) => (
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
                      {isKill ? t.killSwitchActive : isAlert ? t.criticalAlert : t.controlLive}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: isAlert || isKill ? C.red : C.gold }}>{timeStr}</span>
                </div>

                {/* Score */}
                <div style={{
                  background: C.navy3, borderRadius: 12, padding: 16, marginBottom: 12, border: `1px solid ${isAlert ? "rgba(239,68,68,.3)" : C.bd1}`,
                  transition: "border-color .5s",
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>{t.sovereigntyScore}</div>
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
                      {alertPhase === 0 || isRecovery ? t.scoreUp : isKill ? t.scoreSuspended : t.scoreCritical}
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
                  ].map((a: any) => (
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
                      <TimelineEvent time={timeStr.slice(0,5)} label={t.tlKillAll} level="critical" />
                      <TimelineEvent time={timeStr.slice(0,5)} label={t.tlStockDriftBreach} level="critical" />
                      <TimelineEvent time={timeStr.slice(0,5)} label={t.tlDegradedMode} level="alert" />
                    </>
                  ) : isAlert ? (
                    <>
                      <TimelineEvent time={timeStr.slice(0,5)} label={t.tlStockCritical} level="critical" />
                      <TimelineEvent time={timeStr.slice(0,5)} label={t.tlSovBelow} level="critical" />
                      <TimelineEvent time="14:28" label={t.tlStockDrift12} level="warning" />
                      <TimelineEvent time="14:15" label={t.tlFraudBlocked} level="ok" />
                    </>
                  ) : alertPhase === 1 ? (
                    <>
                      <TimelineEvent time={timeStr.slice(0,5)} label={t.tlStockAccel} level="warning" />
                      <TimelineEvent time="14:32" label={t.tlPriceGovMargin} level="ok" />
                      <TimelineEvent time="14:28" label={t.tlStockDrift12} level="warning" />
                      <TimelineEvent time="14:15" label={t.tlFraudBlocked} level="ok" />
                    </>
                  ) : (
                    <>
                      <TimelineEvent time="14:32" label={t.tlPriceGovMargin} level="ok" />
                      <TimelineEvent time="14:28" label={t.tlStockDrift12} level="warning" />
                      <TimelineEvent time="14:15" label={t.tlFraudBlocked} level="ok" />
                      <TimelineEvent time="13:47" label={t.tlEscalationApproach} level="alert" />
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
                        {isKill ? t.allAgentsSuspended : t.killSwitchRecommended}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(239,68,68,.7)", marginTop: 2 }}>
                        {isKill ? t.humanTakeoverActive : t.sovereigntyBreach}
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
            { label: t.eqObservability, c: C.gold, bold: false },
            null,
            { label: t.eqGovernance, c: C.green, bold: false },
            null,
            { label: t.eqIntervention, c: C.amber, bold: false },
            "=",
            { label: t.eqSovereignty, c: "#fff", bold: true },
          ] as (null | string | { label: string; c: string; bold: boolean })[]).map((item: any, i: number) => item === null ? (
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
            <SectionLabel>{t.sectionPositioning}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
              {t.posTitle}
            </h2>
            <p style={{ fontSize: 16, color: C.gray2, maxWidth: 600, margin: "0 auto" }}>
              {t.posDesc1}<strong style={{ color: "#fff" }}>{t.posDescStrong}</strong>{t.posDesc2}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.red, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>✕</span> {t.posIsNotTitle}
              </h3>
              {t.posNotItems.map((item: any) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: C.gray2 }}>
                  <span style={{ color: "rgba(239,68,68,.4)" }}>—</span> {item}
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(34,197,94,.04)", border: "1px solid rgba(34,197,94,.15)", borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.green, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>✓</span> {t.posIsTitle}
              </h3>
              {t.posIsItems.map((item: any) => (
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
            <SectionLabel>{t.sectionArchitecture}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>{t.modulesTitle}</h2>
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto" }}>{t.modulesSubtitle}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <ModuleCard id="ACF-00" title={t.mod00Title} subtitle={t.mod00Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="3"/></svg>}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: C.gold }}>74.5</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, marginTop: 4, letterSpacing: ".06em" }}>{t.mod00Axes}</div>
                </div>
                <span style={{ fontSize: 10, color: C.gold, background: C.goldDim, padding: "4px 10px", borderRadius: 6 }}>{t.mod00Export}</span>
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-01" title={t.mod01Title} subtitle={t.mod01Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: t.mod01PriceAdj, status: t.mod01PriceStatus, color: C.gold },
                  { name: t.mod01Replenishment, status: t.mod01ReplenishStatus, color: C.green },
                  { name: t.mod01CustExcl, status: t.mod01CustStatus, color: C.red },
                ].map((d: any) => (
                  <div key={d.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: C.gray2 }}>{d.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: d.color, fontSize: 11 }}>{d.status}</span>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-02" title={t.mod02Title} subtitle={t.mod02Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { label: t.mod02Optimizable, count: 12, color: C.green },
                  { label: t.mod02Governed, count: 8, color: C.gold },
                  { label: t.mod02HumanOnly, count: 5, color: C.red },
                ].map((c: any) => (
                  <div key={c.label} style={{ textAlign: "center", padding: 8, borderRadius: 8, background: `${c.color}11` }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.color }}>{c.count}</div>
                    <div style={{ fontSize: 8, color: c.color, textTransform: "uppercase", letterSpacing: ".08em", opacity: .8 }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-03" title={t.mod03Title} subtitle={t.mod03Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {t.mod03Items.map((item: any) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.gray2 }}>
                    <span>{item}</span><span style={{ color: C.green }}>✓</span>
                  </div>
                ))}
                <div style={{ fontSize: 9, color: C.gray, borderTop: `1px solid ${C.bd1}`, paddingTop: 8, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{t.mod03Signed}</div>
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-04" title={t.mod04Title} subtitle={t.mod04Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "PRICE-GOV", level: "Lvl 2", active: true },
                  { name: "STOCK-AI", level: "Lvl 2", active: true },
                  { name: "FRAUD-DET", level: "Lvl 2", active: true },
                  { name: "ADS-OPT", level: "Lvl 1", active: false },
                ].map((a: any) => (
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

            <ModuleCard id="ACF-05" title={t.mod05Title} subtitle={t.mod05Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/><path d="M2 20h20"/></svg>}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <KPIMini label={t.mod05Margin} value="32.1" unit="%" trend="up" />
                <KPIMini label={t.mod05Escalations} value="3" trend="down" />
                <KPIMini label={t.mod05Overrides} value="1" trend="down" />
                <KPIMini label={t.mod05HumanLoad} value="18" unit="%" trend="up" />
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-06" title={t.mod06Title} subtitle={t.mod06Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {t.mod06Timeline.split(" → ").map((step: string, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? C.green : i === 1 ? C.amber : C.gold, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray2 }}>{step}</span>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-07" title={t.mod07Title} subtitle={t.mod07Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {t.mod07Levels.split(" · ").map((level: string, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 8, padding: "6px 10px" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? C.amber : i === 1 ? "#f97316" : C.red, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray2 }}>{level}</span>
                  </div>
                ))}
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
              <SectionLabel>{t.sectionKeyDiff}</SectionLabel>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20 }}>{t.driftTitle}</h2>
              <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7, marginBottom: 16 }}>
                {t.driftP1}<strong style={{ color: "#fff" }}>{t.driftP1Strong}</strong>{t.driftP1End}
              </p>
              <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7, marginBottom: 28 }}>
                {t.driftP2Start}<strong style={{ color: "#fff" }}>{t.driftP2Strong}</strong>{t.driftP2Mid}<strong style={{ color: C.gold }}>{t.driftP2Gold}</strong>{t.driftP2End}
              </p>

              {[
                { emoji: "🟡", label: t.driftLow, desc: t.driftLowDesc },
                { emoji: "🟠", label: t.driftSig, desc: t.driftSigDesc },
                { emoji: "🔴", label: t.driftCrit, desc: t.driftCritDesc },
              ].map((d: any) => (
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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginBottom: 16 }}>{t.driftStabilityLabel}</div>
              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 28 }}>
                <StabilityRing value={92} label="PRICE-GOV" />
                <StabilityRing value={67} label="STOCK-AI" />
                <StabilityRing value={88} label="FRAUD-DET" />
              </div>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginBottom: 10 }}>{t.driftDetectionLabel}</div>
              <div style={{ background: C.navy3, borderRadius: 12, padding: 16, border: `1px solid rgba(245,158,11,.15)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.amber }}>{t.driftDetected}</span>
                  <span style={{ fontSize: 9, color: C.gray }}>{t.drift14dTrend}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 56 }}>
                  {[85, 84, 83, 82, 80, 79, 78, 76, 74, 72, 70, 68, 67, 66].map((v: any, i: number) => (
                    <div key={i} style={{
                      flex: 1, borderRadius: "3px 3px 0 0",
                      height: `${(v / 100) * 100}%`,
                      background: v > 80 ? C.green : v > 70 ? C.amber : "#f97316",
                      opacity: .5 + (i / 14) * .5,
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.gray }}>
                  <span>{t.drift14dAgo}</span><span>{t.driftNow}</span>
                </div>
                <div style={{ marginTop: 12, background: "rgba(245,158,11,.06)", border: "1px solid rgba(245,158,11,.15)", borderRadius: 8, padding: 10, fontSize: 12, color: C.gray2, lineHeight: 1.5 }}>
                  {t.driftMarginWarn}<br />
                  <span style={{ color: C.gold, fontWeight: 600 }}>{t.driftRecommendation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ KILL SWITCH & INTERVENTION ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>{t.sectionCommandAuth}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>{t.interventionTitle}</h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 40px" }}>
            {t.interventionDesc1}<strong style={{ color: "#fff" }}>{t.interventionDescStrong}</strong>{t.interventionDesc2}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 48 }}>
            {[
              { icon: "⏸", label: t.intSuspend },
              { icon: "📐", label: t.intReduceScope },
              { icon: "🔄", label: t.intForceEsc },
              { icon: "⚡", label: t.intDegraded },
              { icon: "🛑", label: t.intKillSwitch, danger: true },
            ].map((a: any) => (
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
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t.killGlobalLabel}</div>
            <p style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{t.killGlobalDesc}</p>
            <button onClick={() => setKillArmed(!killArmed)} style={{
              width: "100%", padding: 12, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
              background: killArmed ? C.red : "rgba(239,68,68,.08)",
              color: killArmed ? "#fff" : C.red,
              boxShadow: killArmed ? "0 0 20px rgba(239,68,68,.4)" : "none",
            }}>
              {killArmed ? t.killArmedBtn : t.killArmBtn}
            </button>
            {killArmed && <p style={{ fontSize: 11, color: "rgba(239,68,68,.5)", marginTop: 10 }}>{t.killArmedMsg}</p>}
          </div>
        </div>
      </section>

      {/* ━━━ EXECUTIVE DASHBOARD ━━━ */}
      <section id="dashboard" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.sectionOnePageAnswer}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>{t.dashTitle}</h2>
            <p style={{ fontSize: 15, color: C.gray2 }}>
              {t.dashQuestion}<strong style={{ color: "#fff", fontSize: 18 }}>{t.dashQuestionBold}</strong>
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {[
              { key: "ceo", label: t.tabCEO },
              { key: "ops", label: t.tabOps },
              { key: "consultant", label: t.tabConsultant },
            ].map((t: any) => (
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
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t.sovereigntyScore}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800, color: C.green }}>74</div>
                  <div style={{ fontSize: 11, color: C.green, opacity: .7 }}>{t.dashVsLastMonth}</div>
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t.dashActiveAgents}</div>
                  {[{ c: "green", l: t.dashStable, n: 5 }, { c: "amber", l: t.dashAttention, n: 2 }, { c: "red", l: t.dashCritical, n: 0 }].map((a: any) => (
                    <div key={a.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Pulse color={a.c} /><span style={{ fontSize: 12, color: C.gray2 }}>{a.l}</span></div>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: ({ green: C.green, amber: C.amber, red: C.red } as Record<string, string>)[a.c] }}>{a.n}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t.dashRecentIncidents}</div>
                  {[{ t: "14:28", l: t.dashStockDrift, c: C.amber }, { t: "12:15", l: t.dashAutoCorrected, c: C.green }, { t: "09:42", l: t.dashRoutineCheck, c: C.green }].map((e: any, i: number) => (
                    <div key={i} style={{ fontSize: 12, marginBottom: 6 }}><span style={{ fontFamily: "'JetBrains Mono', monospace", color: e.c, marginRight: 8 }}>{e.t}</span><span style={{ color: C.gray2 }}>{e.l}</span></div>
                  ))}
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t.dashAtRisk}</div>
                  <div style={{ fontSize: 12, color: C.amber, marginBottom: 6 }}>{t.dashPricingDrift}</div>
                  <div style={{ fontSize: 12, color: C.amber, marginBottom: 6 }}>{t.dashInventoryLow}</div>
                  <div style={{ fontSize: 12, color: C.gray, marginBottom: 12 }}>{t.dashNoCritical}</div>
                  <button style={{ width: "100%", background: "rgba(239,68,68,.06)", border: `1px solid rgba(239,68,68,.2)`, color: C.red, padding: 8, borderRadius: 8, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer" }}>{t.dashSuspendAll}</button>
                </div>
              </div>
            )}
            {activeTab === "ops" && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t.opsTitle}</h3>
                <p style={{ fontSize: 14, color: C.gray2, maxWidth: 400, margin: "0 auto 20px" }}>{t.opsDesc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, maxWidth: 500, margin: "0 auto" }}>
                  <KPIMini label={t.mod05Margin} value="32.1" unit="%" trend="up" />
                  <KPIMini label={t.mod05Escalations} value="3" trend="down" />
                  <KPIMini label={t.mod05Overrides} value="1" trend="down" />
                  <KPIMini label={t.opsIncidents} value="0" trend="down" />
                </div>
              </div>
            )}
            {activeTab === "consultant" && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🗺</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t.consultTitle}</h3>
                <p style={{ fontSize: 14, color: C.gray2, maxWidth: 400, margin: "0 auto 20px" }}>{t.consultDesc}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  {[t.consultMultiClient, t.consultTemplates, t.consultBenchmark, t.consultPDFExport].map((item: any) => (
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
            <SectionLabel>{t.sectionRealMath}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
              {t.riskTitle1}<span style={{ color: C.red }}>{t.riskTitleRed}</span>{t.riskTitle2}
            </h2>
            <p style={{ fontSize: 16, color: C.gray2, maxWidth: 600, margin: "0 auto" }}>
              {t.riskDesc1}<strong style={{ color: "#fff" }}>{t.riskDescStrong}</strong>{t.riskDesc2}
            </p>
          </div>

          {/* Risk Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 48 }}>
            {/* AI Act */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚖️</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t.riskAIActLabel}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                <AnimatedCounter end={35} prefix="€" suffix="M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                {t.riskAIActDesc1}<strong style={{ color: "#fff" }}>{t.riskAIActStrong}</strong>{t.riskAIActDesc2}
              </p>
            </div>

            {/* GDPR */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t.riskGDPRLabel}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                <AnimatedCounter end={20} prefix="€" suffix="M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                {t.riskGDPRDesc1}<strong style={{ color: "#fff" }}>{t.riskGDPRStrong}</strong>{t.riskGDPRDesc2}
              </p>
            </div>

            {/* Drift Cost */}
            <div style={{ background: C.navy3, border: `1px solid rgba(239,68,68,.15)`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📉</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t.riskDriftLabel}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.red, marginBottom: 8 }}>
                €<AnimatedCounter end={2} suffix=".4M" />
              </div>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>
                {t.riskDriftDesc1}<strong style={{ color: "#fff" }}>{t.riskDriftStrong}</strong>{t.riskDriftDesc2}
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 32, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t.riskWithout}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: C.red }}>€57.4M</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{t.riskMaxExposure}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: C.gold }}>vs</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.green, letterSpacing: ".1em", marginBottom: 8 }}>{t.riskACFInvestment}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: C.green }}>→ 0.01%</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{t.riskFraction}</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 32 }}>
            {[
              { stat: "73%", desc: t.riskStat1 },
              { stat: "89%", desc: t.riskStat2 },
              { stat: "×12", desc: t.riskStat3 },
            ].map((s: any) => (
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
          <SectionLabel>{t.sectionPlans}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
            {t.pricingTitle}
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 550, margin: "0 auto 48px" }}>
            {t.pricingDesc}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[
              {
                tier: t.tierEssential, desc: t.tierEssentialDesc, icon: "🛡",
                features: t.featEssential,
              },
              {
                tier: t.tierProfessional, desc: t.tierProfessionalDesc, icon: "⚡", recommended: true,
                features: t.featProfessional,
              },
              {
                tier: t.tierEnterprise, desc: t.tierEnterpriseDesc, icon: "🏛",
                features: t.featEnterprise,
              },
            ].map((plan: any) => (
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
                  }}>{t.tierRecommended}</div>
                )}
                <div style={{ fontSize: 28, marginBottom: 8 }}>{plan.icon}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: plan.recommended ? C.gold : C.gray, letterSpacing: ".14em", marginBottom: 4 }}>{plan.tier}</div>
                <div style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{plan.desc}</div>

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800,
                  color: plan.recommended ? C.gold : "#fff", marginBottom: 20,
                }}>
                  {t.priceOnRequest}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {plan.features.map((f: any) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}>
                      <span style={{ color: plan.recommended ? C.gold : C.green, fontSize: 11 }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                <Link href={`/${locale}/contact`} className="gold-glow" style={{
                  width: "100%", padding: 12, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                  background: plan.recommended ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : C.navy2,
                  color: plan.recommended ? C.navy1 : C.gray2,
                  outline: plan.recommended ? "none" : `1px solid ${C.bd1}`,
                  display: "block", textAlign: "center", textDecoration: "none",
                }}>{plan.recommended ? t.planRequestDemo : t.planContactUs}</Link>
              </div>
            ))}
          </div>

          {/* Partner */}
          <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{t.partnerLabel}</div>
            <p style={{ fontSize: 13, color: C.gray2, marginBottom: 12 }}>{t.partnerDesc}</p>
            <Link href={`/${locale}/acf-certification`} style={{
              background: "transparent", border: `1px solid ${C.goldBorder}`, color: C.gold,
              padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .3s",
              display: "inline-block", textDecoration: "none",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = C.goldDim; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}
            >{t.partnerApply}</Link>
          </div>
        </div>
      </section>

      {/* ━━━ STATS BAR ━━━ */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
          {[
            { val: 60, suf: "s", label: t.statKillSwitch },
            { val: 18, suf: "", label: t.statKPIs },
            { val: 7, suf: "", label: t.statControls },
            { val: 45, suf: "min", label: t.statOperational },
          ].map((s: any) => (
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
            {t.ctaLine1}<br />
            <span style={{ color: C.gold }}>{t.ctaLine2}</span>
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            {t.ctaDesc1}<strong style={{ color: "#fff" }}>{t.ctaDescStrong}</strong>
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <Link href={`/${locale}/contact`} className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "16px 36px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .3s",
              display: "inline-block", textDecoration: "none",
            }}>{t.ctaDemo}</Link>
            <a href="https://www.acf-score.com/" target="_blank" rel="noopener noreferrer" className="gold-glow" style={{
              background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
              padding: "16px 36px", borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer",
              display: "inline-block", textDecoration: "none",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
            >{t.ctaScore}</a>
          </div>
        </div>
      </section>

      <Footer />
      <AIAgent />
    </div>
  );
}
