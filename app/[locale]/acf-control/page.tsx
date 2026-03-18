"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";

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
    navHome: "← Home",
    navModules: "Modules",
    navDriftEngine: "Drift Engine",
    navDashboard: "Dashboard",
    navRisks: "Risks",
    navRequestDemo: "Request a Demo",

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

    // 6 Core Modules
    sectionArchitecture: "Architecture",
    modulesTitle: "6 Core Modules",
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
    navHome: "← Accueil",
    navModules: "Modules",
    navDriftEngine: "Moteur de dérive",
    navDashboard: "Tableau de bord",
    navRisks: "Risques",
    navRequestDemo: "Demander une démo",

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

    // 6 Core Modules
    sectionArchitecture: "Architecture",
    modulesTitle: "6 modules fondamentaux",
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
};

export default function ACFControlPage() {
  const locale = useLocale();
  const lang = locale === "fr" ? "fr" : "en";
  const t = ui[lang];
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
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF CONTROL</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t.navDecisionGovOS}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t.navHome}</a>
            {navLinks.map(l => (
              <a key={l.href} href={`#${l.href}`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>
            ))}
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>{t.navRequestDemo}</button>
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

              <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
                <button className="gold-glow" style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                  border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                }}>{t.heroBookDemo}</button>
                <button style={{
                  background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
                  padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .3s",
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
                >{t.heroWatchDemo}</button>
              </div>

              <div style={{ display: "flex", gap: 24, fontSize: 12, color: C.gray }}>
                {[t.heroGDPR, t.heroEUAI, t.heroKillSwitch60].map(item => (
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
              {t.posNotItems.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: C.gray2 }}>
                  <span style={{ color: "rgba(239,68,68,.4)" }}>—</span> {item}
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(34,197,94,.04)", border: "1px solid rgba(34,197,94,.15)", borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.green, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>✓</span> {t.posIsTitle}
              </h3>
              {t.posIsItems.map(item => (
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
                ].map(d => (
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
                ].map(c => (
                  <div key={c.label} style={{ textAlign: "center", padding: 8, borderRadius: 8, background: `${c.color}11` }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.color }}>{c.count}</div>
                    <div style={{ fontSize: 8, color: c.color, textTransform: "uppercase", letterSpacing: ".08em", opacity: .8 }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard id="ACF-03" title={t.mod03Title} subtitle={t.mod03Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {t.mod03Items.map(item => (
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

            <ModuleCard id="ACF-05" title={t.mod05Title} subtitle={t.mod05Sub} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/><path d="M2 20h20"/></svg>}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <KPIMini label={t.mod05Margin} value="32.1" unit="%" trend="up" />
                <KPIMini label={t.mod05Escalations} value="3" trend="down" />
                <KPIMini label={t.mod05Overrides} value="1" trend="down" />
                <KPIMini label={t.mod05HumanLoad} value="18" unit="%" trend="up" />
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
            ].map(t => (
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
                  {[{ c: "green", l: t.dashStable, n: 5 }, { c: "amber", l: t.dashAttention, n: 2 }, { c: "red", l: t.dashCritical, n: 0 }].map(a => (
                    <div key={a.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Pulse color={a.c} /><span style={{ fontSize: 12, color: C.gray2 }}>{a.l}</span></div>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: { green: C.green, amber: C.amber, red: C.red }[a.c] }}>{a.n}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: C.navy3, borderRadius: 12, padding: 20, border: `1px solid ${C.bd1}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{t.dashRecentIncidents}</div>
                  {[{ t: "14:28", l: t.dashStockDrift, c: C.amber }, { t: "12:15", l: t.dashAutoCorrected, c: C.green }, { t: "09:42", l: t.dashRoutineCheck, c: C.green }].map((e, i) => (
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
                  {[t.consultMultiClient, t.consultTemplates, t.consultBenchmark, t.consultPDFExport].map(item => (
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
                }}>{plan.recommended ? t.planRequestDemo : t.planContactUs}</button>
              </div>
            ))}
          </div>

          {/* Partner */}
          <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{t.partnerLabel}</div>
            <p style={{ fontSize: 13, color: C.gray2, marginBottom: 12 }}>{t.partnerDesc}</p>
            <button style={{
              background: "transparent", border: `1px solid ${C.goldBorder}`, color: C.gold,
              padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .3s",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = C.goldDim; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}
            >{t.partnerApply}</button>
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
            {t.ctaLine1}<br />
            <span style={{ color: C.gold }}>{t.ctaLine2}</span>
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            {t.ctaDesc1}<strong style={{ color: "#fff" }}>{t.ctaDescStrong}</strong>
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "16px 36px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>{t.ctaDemo}</button>
            <button style={{
              background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
              padding: "16px 36px", borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
            >{t.ctaScore}</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
