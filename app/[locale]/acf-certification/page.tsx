"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

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

/* ── Shield Badges (cards) ────────────────────── */
function TrustShield({ name, color, colorLight }: { name: string; color: string; colorLight: string }) {
  const id = `trust-${name.toLowerCase()}`;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <svg width="160" height="182" viewBox="0 0 140 160" fill="none" style={{ filter: `drop-shadow(0 4px 14px ${color}30)`, transition: "all .4s" }}>
        <defs>
          <linearGradient id={`sg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorLight} stopOpacity={0.9} /><stop offset="50%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={colorLight} stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id={`sb-${id}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
          </linearGradient>
          <filter id={`gl-${id}`}><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id={`dgl-${id}`}><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M70 5 L130 24 L130 86 Q130 120 70 150 Q10 120 10 86 L10 24 Z" fill="none" stroke={`url(#sg-${id})`} strokeWidth="2.5" filter={`url(#gl-${id})`} />
        <path d="M70 10 L126 28 L126 85 Q126 117 70 146 Q14 117 14 85 L14 28 Z" fill={`url(#sb-${id})`} opacity="0.95" />
        <path d="M70 17 L118 33 L118 82 Q118 110 70 138 Q22 110 22 82 L22 33 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
        <circle cx="70" cy="36" r="7" fill={colorLight} filter={`url(#dgl-${id})`} opacity="0.85" />
        <circle cx="70" cy="36" r="3.5" fill="#fff" opacity="0.5" />
        <text x="70" y="66" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="12" fontWeight="700" fill="#ffffff" letterSpacing="0.5">ACF TRUST™</text>
        <line x1="30" y1="74" x2="110" y2="74" stroke={color} strokeWidth="0.5" opacity="0.25" />
        <text x="70" y="95" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="14" fontWeight="800" fill={colorLight} letterSpacing="1.5">{name.toUpperCase()}</text>
        <line x1="30" y1="103" x2="110" y2="103" stroke={color} strokeWidth="0.5" opacity="0.25" />
      </svg>
    </div>
  );
}

function CertifiedShield({ name, color, colorLight, stars }: { name: string; color: string; colorLight: string; stars: number }) {
  const id = `cert-${name.toLowerCase()}`;
  const starPath = "M6 0 L7.5 4.2 L12 4.6 L8.6 7.6 L9.7 12 L6 9.5 L2.3 12 L3.4 7.6 L0 4.6 L4.5 4.2 Z";
  const starW = 13, gap = 5;
  const totalW = stars * starW + (stars - 1) * gap;
  const startX = 70 - totalW / 2;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <svg width="160" height="182" viewBox="0 0 140 160" fill="none" style={{ filter: `drop-shadow(0 4px 14px ${color}30)`, transition: "all .4s" }}>
        <defs>
          <linearGradient id={`sg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorLight} stopOpacity={0.9} /><stop offset="50%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={colorLight} stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id={`sb-${id}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
          </linearGradient>
          <filter id={`gl-${id}`}><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id={`dgl-${id}`}><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M70 5 L130 24 L130 86 Q130 120 70 150 Q10 120 10 86 L10 24 Z" fill="none" stroke={`url(#sg-${id})`} strokeWidth="2.5" filter={`url(#gl-${id})`} />
        <path d="M70 10 L126 28 L126 85 Q126 117 70 146 Q14 117 14 85 L14 28 Z" fill={`url(#sb-${id})`} opacity="0.95" />
        <path d="M70 17 L118 33 L118 82 Q118 110 70 138 Q22 110 22 82 L22 33 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
        {Array.from({ length: stars }).map((_: any, i: number) => (
          <g key={i} transform={`translate(${startX + i * (starW + gap)}, 26)`} filter={`url(#dgl-${id})`}>
            <path d={starPath} fill={colorLight} opacity="0.9" />
          </g>
        ))}
        <text x="70" y="60" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" letterSpacing="0.3">ACF CERTIFIED™</text>
        <line x1="30" y1="68" x2="110" y2="68" stroke={color} strokeWidth="0.5" opacity="0.25" />
        <text x="70" y="89" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="800" fill={colorLight} letterSpacing="1.2">{name.toUpperCase()}</text>
        <line x1="30" y1="97" x2="110" y2="97" stroke={color} strokeWidth="0.5" opacity="0.25" />
      </svg>
    </div>
  );
}

/* ── Hero Animated Shield ─────────────────────── */
function HeroShield() {
  return (
    <svg width="180" height="210" viewBox="0 0 180 210" fill="none">
      <defs>
        <linearGradient id="hs-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" stopOpacity="0.9" /><stop offset="50%" stopColor="#c9a84c" stopOpacity="0.3" /><stop offset="100%" stopColor="#e8c96a" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="hs-fill" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
        </linearGradient>
        <filter id="hs-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="hs-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d="M90 8 L168 32 L168 112 Q168 158 90 196 Q12 158 12 112 L12 32 Z" fill="none" stroke="url(#hs-stroke)" strokeWidth="2.5" filter="url(#hs-glow)" />
      <path d="M90 14 L162 36 L162 110 Q162 153 90 190 Q18 153 18 110 L18 36 Z" fill="url(#hs-fill)" opacity="0.92" />
      <path d="M90 22 L152 42 L152 106 Q152 144 90 180 Q28 144 28 106 L28 42 Z" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.15" />
      <circle cx="90" cy="48" r="10" fill="#e8c96a" filter="url(#hs-dot)" opacity="0.8" />
      <circle cx="90" cy="48" r="5" fill="#fff" opacity="0.4" />
      <path d="M72 100 L84 114 L110 82" stroke="#c9a84c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
      <text x="90" y="76" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" opacity="0.6" letterSpacing="0.5">ACF</text>
      <text x="90" y="140" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">CERTIFIED</text>
    </svg>
  );
}

/* ── Hero Animated Graduation Cap ─────────────── */
function HeroAcademyCap() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      <defs>
        <linearGradient id="cap-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" stopOpacity="0.8" /><stop offset="100%" stopColor="#c9a84c" stopOpacity="0.5" />
        </linearGradient>
        <filter id="cap-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="cap-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="90" cy="90" r="80" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.15" />
      <circle cx="90" cy="90" r="68" fill="#071122" opacity="0.6" />
      <circle cx="90" cy="90" r="68" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" />
      <polygon points="90,42 145,68 90,88 35,68" fill="url(#cap-g)" opacity="0.7" filter="url(#cap-glow)" />
      <polygon points="90,42 145,68 90,88 35,68" fill="none" stroke="#e8c96a" strokeWidth="1.5" opacity="0.4" />
      <path d="M55 72 L55 105 Q55 118 90 125 Q125 118 125 105 L125 72" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.35" />
      <line x1="145" y1="68" x2="150" y2="105" stroke="#e8c96a" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <circle cx="150" cy="108" r="4" fill="#e8c96a" filter="url(#cap-dot)" opacity="0.7" />
      <circle cx="150" cy="108" r="2" fill="#fff" opacity="0.4" />
      <circle cx="90" cy="68" r="4" fill="#e8c96a" opacity="0.6" />
      <text x="90" y="148" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">ACADEMY</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════ */
const ui = {
  en: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "GOVERNANCE STANDARD",
    navHome: "← Home",
    applyNow: "Apply Now",
    certLabel: "CERTIFICATION",
    certSubLabel: "Prove your governance",
    academyLabel: "ACADEMY",
    academySubLabel: "Learn to govern",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Govern the Agents.",
    heroTitle2: "Certify the Trust.",
    heroDesc1: "Autonomous agents are reshaping commerce.",
    heroDesc2: "The question is no longer ",
    heroDescIf: "if",
    heroDesc3: "The question is: ",
    heroDesc4: "who governs them?",
    heroSubDesc: "ACF is not an AI tool. It is a governance standard.",
    heroBtn1: "Get ACF TRUST™ Label →",
    heroBtn2: "Become a Partner",
    trustSectionLabel: "Public Label",
    trustDesc: "The public label for agentic governance. It signals to customers, partners, and regulators that your company operates autonomous systems under explicit governance. Not just automation. ",
    trustDescStrong: "Accountability.",
    trustL1: { level: "LEVEL 1", name: "Initiated", desc: "You have started your agentic journey.", items: ["ACF Score completed","Decision mapping in place","First governed agent deployed","Constitution agentique defined","Kill switch operational"], tagline: "You are aware." },
    trustL2: { level: "LEVEL 2", name: "Governed", desc: "You operate agents under formal supervision.", items: ["Multiple agents deployed","Explicit policies & escalation rules","Dashboard monitoring active","Human accountability assigned","Quarterly governance reviews"], tagline: "You are in control." },
    trustL3: { level: "LEVEL 3", name: "Sovereign", desc: "Agentic governance is embedded in your organization.", items: ["Enterprise-wide constitution","Multi-agent coordination rules","Audit trails & interruptibility proven","Sovereignty score monitored monthly","Executive ownership of decision policy"], tagline: "You own your autonomy." },
    trustFooter: "Annual audit required to maintain certification. Certified organizations display the ACF TRUST™ badge on their digital touchpoints.",
    guaranteeLabel: "Consumer Promise",
    guaranteeTitle1: "What ACF TRUST™ ",
    guaranteeTitle2: "guarantees",
    guaranteeSubtitle: "When you see the ACF TRUST™ badge, you know:",
    guaranteeItems: ["Your data is protected", "Prices are governed", "A human supervises", "Kill switch is ready", "Decisions are auditable", "AI Act compliant"],
    certifiedLabel: "Professional Certification",
    certifiedDesc: "Professional certification for practitioners and partners who implement agentic governance in the field. You don't certify AI skills. You certify ",
    certifiedDescStrong: "the capacity to govern autonomous systems.",
    mostPopular: "MOST POPULAR",
    practitioner: { tier: "PRACTITIONER", name: "ACF Practitioner", desc: "For consultants, product leaders, architects.", youCan: "YOU CAN:", abilities: ["Run ACF diagnostics","Build decision maps","Design governed agents","Deploy ACF tools","Create agentic constitutions"], reqLabel: "REQUIREMENTS:", requirements: ["ACF Academy Core Track","Case study exam","Constitution validation","Ethics commitment"], tagline: "You operate on projects.", btnText: "Learn More" },
    consultant: { tier: "CONSULTANT", name: "ACF Consultant", desc: "For agencies and consulting firms.", youCan: "YOU CAN:", abilities: ["Everything Practitioner +","Certify client organizations","Deliver ACF implementations","Conduct governance audits","Train internal teams","Sell ACF Control"], reqLabel: "REQUIREMENTS:", requirements: ["Practitioner certification","2 validated client cases","Governance audit passed","ACF committee review","Annual license fee"], tagline: "You scale delivery.", btnText: "Apply for Certification →" },
    partner: { tier: "PARTNER", name: "ACF Partner", desc: "For major firms and system integrators.", youCan: "YOU CAN:", abilities: ["Everything Consultant +","Deploy ACF at enterprise scale","Certify across regions","Co-develop sector frameworks","Territory exclusivity","Co-branding rights"], reqLabel: "REQUIREMENTS:", requirements: ["Consultant certification","5+ certified implementations","Dedicated ACF team","Manual selection by ACF","Annual partner fee"], tagline: "You shape the ecosystem.", btnText: "Learn More" },
    academySectionLabel: "Learn to Govern",
    academyDesc1: "ACF Academy doesn't train people to use AI.",
    academyDesc2: "It trains them to govern autonomous systems.",
    coreTrack: { key: "core", label: "Core Track (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "Professional Track (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Executive Program", sub: "→ ACF Trust readiness" },
    core101: { code: "ACF-101", title: "Foundations", topics: ["Agentic commerce explained","Decision vs execution","Non-delegable zones","4 governance layers","Maturity levels","Reading an ACF Score"], outcome: "You can read an agentic organization." },
    core102: { code: "ACF-102", title: "Operational Toolkit", topics: ["Decision mapping","Impact/Frequency/Irreversibility matrix","Agentic Constitution design","Agent profiling","Drift dashboard setup"], outcome: "You can deploy a Level 2 governed agent." },
    core103: { code: "ACF-103", title: "Supervision & Drift", topics: ["Weak signal detection","Slow drift patterns","Agent conflicts","Kill switch protocols","Incident classification & response"], outcome: "You can govern a living autonomous system." },
    pro201: { code: "ACF-201", title: "Client Deployment", topics: ["Running ACF workshops","Overcoming human resistance","ACF Control implementation","Building Trust certification path","Client governance roadmap"], outcome: "You can deliver ACF for clients." },
    pro202: { code: "ACF-202", title: "Audit & Certification", topics: ["ACF Trust audit methodology","Evidence requirements","Advanced scoring","Audit report writing","Non-compliance management"], outcome: "You can certify organizations." },
    pro203: { code: "ACF-203", title: "Complex Cases", topics: ["Multi-agent architectures","Multi-country deployments","Business conflict resolution","Major incident simulation","Enterprise-scale governance"], outcome: "You can handle enterprise complexity." },
    execProgramLabel: "EXECUTIVE PROGRAM",
    execProgramTitle: "For CEOs, COMEX & Board Members",
    execProgramDesc: "2 intensive days. Not a course — a transformation. Leaders leave with a signed Agentic Constitution, a 90-day governance roadmap, and the clarity to own their autonomous future.",
    execTopics: ["Agentic strategy","Organizational sovereignty","Risk & personal responsibility","Governance at scale","Live incident simulation","ACF Control walkthrough"],
    execDeliverablesLabel: "DELIVERABLES:",
    execDeliverables: ["Signed Constitution","90-day Roadmap","Named Sponsor","ACF TRUST Readiness"],
    execNote: "No certification here. Just one thing: they leave responsible.",
    execBtn: "Request Executive Program →",
    ecosystemLabel: "Closed-Loop System",
    ecosystemTitle1: "The ACF ",
    ecosystemTitle2: "Ecosystem",
    ecosystemDesc: "Every piece feeds the next. A system, not a product.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Free diagnostic — assess your sovereignty" },
      { step: "02", label: "ACF Academy", desc: "Train teams to govern autonomous systems" },
      { step: "03", label: "ACF Control", desc: "Governance platform — operate in real time" },
      { step: "04", label: "ACF TRUST™", desc: "Public label — prove it to customers" },
      { step: "05", label: "ACF CERTIFIED", desc: "Partners deploy & audit organizations" },
    ],
    ecoBack: "↺ BACK TO ACF SCORE",
    whyTitle1: "Why this ",
    whyTitle2: "matters",
    withoutGov: "WITHOUT GOVERNANCE",
    withoutGovDesc: "Autonomy amplifies errors. Agents optimize locally, destroy value globally. No audit trail. No accountability. No way back.",
    withAcf: "WITH ACF",
    withAcfDesc: "Autonomy amplifies clarity. Decisions are governed. Humans are in command. Every action is traceable, reversible, accountable.",
    whyBottom: "You don't need more AI. You need ",
    whyBottomStrong: "decision sovereignty.",
    statsLabels: ["Academy modules", "Certification levels", "Trust tiers", "Ecosystem products"],
    finalTitle1: "Get started.",
    finalTitle2: "Build trust.",
    finalDesc: "Whether you're an enterprise proving governance or a consultant building the future of agentic commerce — there's a path for you.",
    finalBtn1: "Get ACF TRUST™ Label →",
    finalBtn2: "Start the Academy",
    finalBtn3: "Become a Partner",
  },
  fr: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "STANDARD DE GOUVERNANCE",
    navHome: "← Accueil",
    applyNow: "Candidater",
    certLabel: "CERTIFICATION",
    certSubLabel: "Prouvez votre gouvernance",
    academyLabel: "ACADEMY",
    academySubLabel: "Apprendre à gouverner",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Gouvernez les agents.",
    heroTitle2: "Certifiez la confiance.",
    heroDesc1: "Les agents autonomes transforment le commerce.",
    heroDesc2: "La question n'est plus ",
    heroDescIf: "si",
    heroDesc3: "La question est : ",
    heroDesc4: "qui les gouverne ?",
    heroSubDesc: "ACF n'est pas un outil IA. C'est un standard de gouvernance.",
    heroBtn1: "Obtenir le label ACF TRUST™ →",
    heroBtn2: "Devenir partenaire",
    trustSectionLabel: "Label public",
    trustDesc: "Le label public de gouvernance agentique. Il signale aux clients, partenaires et régulateurs que votre entreprise opère des systèmes autonomes sous gouvernance explicite. Pas seulement de l'automatisation. ",
    trustDescStrong: "De la responsabilité.",
    trustL1: { level: "NIVEAU 1", name: "Initié", desc: "Vous avez commencé votre parcours agentique.", items: ["ACF Score complété","Cartographie décisionnelle en place","Premier agent gouverné déployé","Constitution agentique définie","Kill switch opérationnel"], tagline: "Vous êtes conscient." },
    trustL2: { level: "NIVEAU 2", name: "Gouverné", desc: "Vous opérez des agents sous supervision formelle.", items: ["Agents multiples déployés","Politiques explicites & règles d'escalade","Monitoring tableau de bord actif","Responsabilité humaine assignée","Revues de gouvernance trimestrielles"], tagline: "Vous êtes en contrôle." },
    trustL3: { level: "NIVEAU 3", name: "Souverain", desc: "La gouvernance agentique est ancrée dans votre organisation.", items: ["Constitution à l'échelle de l'entreprise","Règles de coordination multi-agents","Pistes d'audit & interruptibilité prouvées","Score de souveraineté suivi mensuellement","Direction responsable de la politique décisionnelle"], tagline: "Vous possédez votre autonomie." },
    trustFooter: "Audit annuel requis pour maintenir la certification. Les organisations certifiées affichent le badge ACF TRUST™ sur leurs points de contact numériques.",
    guaranteeLabel: "Promesse consommateur",
    guaranteeTitle1: "Ce que ACF TRUST™ ",
    guaranteeTitle2: "garantit",
    guaranteeSubtitle: "Quand vous voyez le badge ACF TRUST™, vous savez :",
    guaranteeItems: ["Vos données sont protégées", "Les prix sont gouvernés", "Un humain supervise", "Le kill switch est prêt", "Les décisions sont auditables", "Conforme à l'AI Act"],
    certifiedLabel: "Certification professionnelle",
    certifiedDesc: "Certification professionnelle pour les praticiens et partenaires qui mettent en œuvre la gouvernance agentique sur le terrain. Vous ne certifiez pas des compétences IA. Vous certifiez ",
    certifiedDescStrong: "la capacité à gouverner des systèmes autonomes.",
    mostPopular: "LE PLUS POPULAIRE",
    practitioner: { tier: "PRATICIEN", name: "ACF Praticien", desc: "Pour les consultants, chefs de produit, architectes.", youCan: "VOUS POUVEZ :", abilities: ["Réaliser des diagnostics ACF","Construire des cartographies décisionnelles","Concevoir des agents gouvernés","Déployer les outils ACF","Créer des constitutions agentiques"], reqLabel: "PRÉREQUIS :", requirements: ["ACF Academy Parcours Core","Examen étude de cas","Validation de constitution","Engagement éthique"], tagline: "Vous opérez sur des projets.", btnText: "En savoir plus" },
    consultant: { tier: "CONSULTANT", name: "ACF Consultant", desc: "Pour les agences et cabinets de conseil.", youCan: "VOUS POUVEZ :", abilities: ["Tout ce que Praticien +","Certifier les organisations clientes","Livrer des implémentations ACF","Conduire des audits de gouvernance","Former les équipes internes","Vendre ACF Control"], reqLabel: "PRÉREQUIS :", requirements: ["Certification Praticien","2 cas clients validés","Audit de gouvernance réussi","Revue du comité ACF","Frais de licence annuels"], tagline: "Vous passez à l'échelle.", btnText: "Candidater pour la certification →" },
    partner: { tier: "PARTENAIRE", name: "ACF Partenaire", desc: "Pour les grands cabinets et intégrateurs systèmes.", youCan: "VOUS POUVEZ :", abilities: ["Tout ce que Consultant +","Déployer ACF à l'échelle entreprise","Certifier à travers les régions","Co-développer des frameworks sectoriels","Exclusivité territoriale","Droits de co-branding"], reqLabel: "PRÉREQUIS :", requirements: ["Certification Consultant","5+ implémentations certifiées","Équipe ACF dédiée","Sélection manuelle par ACF","Frais de partenariat annuels"], tagline: "Vous façonnez l'écosystème.", btnText: "En savoir plus" },
    academySectionLabel: "Apprendre à gouverner",
    academyDesc1: "ACF Academy ne forme pas les gens à utiliser l'IA.",
    academyDesc2: "Elle les forme à gouverner des systèmes autonomes.",
    coreTrack: { key: "core", label: "Parcours Core (101–103)", sub: "→ Praticien" },
    proTrack: { key: "pro", label: "Parcours professionnel (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Programme exécutif", sub: "→ Préparation ACF Trust" },
    core101: { code: "ACF-101", title: "Fondamentaux", topics: ["Le commerce agentique expliqué","Décision vs exécution","Zones non-déléguables","4 couches de gouvernance","Niveaux de maturité","Lire un ACF Score"], outcome: "Vous savez lire une organisation agentique." },
    core102: { code: "ACF-102", title: "Boîte à outils opérationnelle", topics: ["Cartographie décisionnelle","Matrice Impact/Fréquence/Irréversibilité","Conception de constitution agentique","Profilage d'agents","Mise en place du tableau de bord de dérive"], outcome: "Vous pouvez déployer un agent gouverné de Niveau 2." },
    core103: { code: "ACF-103", title: "Supervision & dérive", topics: ["Détection des signaux faibles","Patterns de dérive lente","Conflits entre agents","Protocoles de kill switch","Classification & réponse aux incidents"], outcome: "Vous pouvez gouverner un système autonome vivant." },
    pro201: { code: "ACF-201", title: "Déploiement client", topics: ["Animation d'ateliers ACF","Surmonter la résistance humaine","Implémentation ACF Control","Construction du parcours de certification Trust","Feuille de route de gouvernance client"], outcome: "Vous pouvez livrer ACF pour des clients." },
    pro202: { code: "ACF-202", title: "Audit & certification", topics: ["Méthodologie d'audit ACF Trust","Exigences de preuve","Scoring avancé","Rédaction de rapport d'audit","Gestion de la non-conformité"], outcome: "Vous pouvez certifier des organisations." },
    pro203: { code: "ACF-203", title: "Cas complexes", topics: ["Architectures multi-agents","Déploiements multi-pays","Résolution de conflits métier","Simulation d'incident majeur","Gouvernance à l'échelle entreprise"], outcome: "Vous pouvez gérer la complexité entreprise." },
    execProgramLabel: "PROGRAMME EXÉCUTIF",
    execProgramTitle: "Pour PDG, COMEX & membres du conseil",
    execProgramDesc: "2 jours intensifs. Pas un cours — une transformation. Les dirigeants repartent avec une Constitution Agentique signée, une feuille de route de gouvernance à 90 jours et la clarté pour maîtriser leur avenir autonome.",
    execTopics: ["Stratégie agentique","Souveraineté organisationnelle","Risque & responsabilité personnelle","Gouvernance à l'échelle","Simulation d'incident en direct","Démonstration ACF Control"],
    execDeliverablesLabel: "LIVRABLES :",
    execDeliverables: ["Constitution signée","Feuille de route 90 jours","Sponsor nommé","Préparation ACF TRUST"],
    execNote: "Pas de certification ici. Juste une chose : ils repartent responsables.",
    execBtn: "Demander le programme exécutif →",
    ecosystemLabel: "Système en boucle fermée",
    ecosystemTitle1: "L'Écosystème ",
    ecosystemTitle2: "ACF",
    ecosystemDesc: "Chaque élément nourrit le suivant. Un système, pas un produit.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Diagnostic gratuit — évaluez votre souveraineté" },
      { step: "02", label: "ACF Academy", desc: "Formez les équipes à gouverner les systèmes autonomes" },
      { step: "03", label: "ACF Control", desc: "Plateforme de gouvernance — opérez en temps réel" },
      { step: "04", label: "ACF TRUST™", desc: "Label public — prouvez-le à vos clients" },
      { step: "05", label: "ACF CERTIFIED", desc: "Les partenaires déploient & auditent les organisations" },
    ],
    ecoBack: "↺ RETOUR À ACF SCORE",
    whyTitle1: "Pourquoi c'est ",
    whyTitle2: "important",
    withoutGov: "SANS GOUVERNANCE",
    withoutGovDesc: "L'autonomie amplifie les erreurs. Les agents optimisent localement, détruisent la valeur globalement. Pas de piste d'audit. Pas de responsabilité. Pas de retour possible.",
    withAcf: "AVEC ACF",
    withAcfDesc: "L'autonomie amplifie la clarté. Les décisions sont gouvernées. Les humains commandent. Chaque action est traçable, réversible, responsable.",
    whyBottom: "Vous n'avez pas besoin de plus d'IA. Vous avez besoin de ",
    whyBottomStrong: "souveraineté décisionnelle.",
    statsLabels: ["Modules Academy", "Niveaux de certification", "Niveaux Trust", "Produits écosystème"],
    finalTitle1: "Commencez.",
    finalTitle2: "Bâtissez la confiance.",
    finalDesc: "Que vous soyez une entreprise prouvant sa gouvernance ou un consultant bâtissant l'avenir du commerce agentique — il y a un parcours pour vous.",
    finalBtn1: "Obtenir le label ACF TRUST™ →",
    finalBtn2: "Commencer l'Academy",
    finalBtn3: "Devenir partenaire",
  },
  es: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "ESTÁNDAR DE GOBERNANZA",
    navHome: "← Inicio",
    applyNow: "Solicitar",
    certLabel: "CERTIFICATION",
    certSubLabel: "Demuestre su gobernanza",
    academyLabel: "ACADEMY",
    academySubLabel: "Aprenda a gobernar",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Gobierne los agentes.",
    heroTitle2: "Certifique la confianza.",
    heroDesc1: "Los agentes autónomos están transformando el comercio.",
    heroDesc2: "La pregunta ya no es ",
    heroDescIf: "si",
    heroDesc3: "La pregunta es: ",
    heroDesc4: "¿quién los gobierna?",
    heroSubDesc: "ACF no es una herramienta de IA. Es un estándar de gobernanza.",
    heroBtn1: "Obtener el sello ACF TRUST™ →",
    heroBtn2: "Ser socio",
    trustSectionLabel: "Sello público",
    trustDesc: "El sello público de gobernanza agéntica. Señala a clientes, socios y reguladores que su empresa opera sistemas autónomos bajo gobernanza explícita. No solo automatización. ",
    trustDescStrong: "Responsabilidad.",
    trustL1: { level: "NIVEL 1", name: "Iniciado", desc: "Ha comenzado su camino agéntico.", items: ["ACF Score completado","Cartografía de decisiones establecida","Primer agente gobernado desplegado","Constitución agéntica definida","Kill switch operativo"], tagline: "Es consciente." },
    trustL2: { level: "NIVEL 2", name: "Gobernado", desc: "Opera agentes bajo supervisión formal.", items: ["Múltiples agentes desplegados","Políticas explícitas y reglas de escalamiento","Monitoreo de panel activo","Responsabilidad humana asignada","Revisiones de gobernanza trimestrales"], tagline: "Tiene el control." },
    trustL3: { level: "NIVEL 3", name: "Soberano", desc: "La gobernanza agéntica está integrada en su organización.", items: ["Constitución a escala empresarial","Reglas de coordinación multi-agente","Pistas de auditoría e interrumpibilidad demostradas","Puntuación de soberanía monitoreada mensualmente","Propiedad ejecutiva de la política de decisiones"], tagline: "Es dueño de su autonomía." },
    trustFooter: "Auditoría anual requerida para mantener la certificación. Las organizaciones certificadas muestran la insignia ACF TRUST™ en sus puntos de contacto digitales.",
    guaranteeLabel: "Promesa al consumidor",
    guaranteeTitle1: "Lo que ACF TRUST™ ",
    guaranteeTitle2: "garantiza",
    guaranteeSubtitle: "Cuando ve la insignia ACF TRUST™, sabe que:",
    guaranteeItems: ["Sus datos están protegidos", "Los precios están gobernados", "Un humano supervisa", "El kill switch está listo", "Las decisiones son auditables", "Cumple con el AI Act"],
    certifiedLabel: "Certificación profesional",
    certifiedDesc: "Certificación profesional para profesionales y socios que implementan la gobernanza agéntica en el terreno. No certifica habilidades de IA. Certifica ",
    certifiedDescStrong: "la capacidad de gobernar sistemas autónomos.",
    mostPopular: "MÁS POPULAR",
    practitioner: { tier: "PROFESIONAL", name: "ACF Practitioner", desc: "Para consultores, líderes de producto, arquitectos.", youCan: "PUEDE:", abilities: ["Ejecutar diagnósticos ACF","Construir mapas de decisiones","Diseñar agentes gobernados","Desplegar herramientas ACF","Crear constituciones agénticas"], reqLabel: "REQUISITOS:", requirements: ["ACF Academy Pista Core","Examen de caso de estudio","Validación de constitución","Compromiso ético"], tagline: "Opera en proyectos.", btnText: "Más información" },
    consultant: { tier: "CONSULTOR", name: "ACF Consultant", desc: "Para agencias y firmas consultoras.", youCan: "PUEDE:", abilities: ["Todo lo de Practitioner +","Certificar organizaciones clientes","Entregar implementaciones ACF","Realizar auditorías de gobernanza","Formar equipos internos","Vender ACF Control"], reqLabel: "REQUISITOS:", requirements: ["Certificación Practitioner","2 casos de clientes validados","Auditoría de gobernanza aprobada","Revisión del comité ACF","Cuota de licencia anual"], tagline: "Escala la entrega.", btnText: "Solicitar certificación →" },
    partner: { tier: "SOCIO", name: "ACF Partner", desc: "Para grandes firmas e integradores de sistemas.", youCan: "PUEDE:", abilities: ["Todo lo de Consultant +","Desplegar ACF a escala empresarial","Certificar en distintas regiones","Co-desarrollar marcos sectoriales","Exclusividad territorial","Derechos de co-branding"], reqLabel: "REQUISITOS:", requirements: ["Certificación Consultant","5+ implementaciones certificadas","Equipo ACF dedicado","Selección manual por ACF","Cuota de socio anual"], tagline: "Da forma al ecosistema.", btnText: "Más información" },
    academySectionLabel: "Aprenda a gobernar",
    academyDesc1: "ACF Academy no forma personas para usar IA.",
    academyDesc2: "Las forma para gobernar sistemas autónomos.",
    coreTrack: { key: "core", label: "Pista Core (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "Pista Profesional (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Programa Ejecutivo", sub: "→ Preparación ACF Trust" },
    core101: { code: "ACF-101", title: "Fundamentos", topics: ["Comercio agéntico explicado","Decisión vs ejecución","Zonas no delegables","4 capas de gobernanza","Niveles de madurez","Leer un ACF Score"], outcome: "Puede leer una organización agéntica." },
    core102: { code: "ACF-102", title: "Kit operativo", topics: ["Cartografía de decisiones","Matriz Impacto/Frecuencia/Irreversibilidad","Diseño de constitución agéntica","Perfilado de agentes","Configuración del panel de deriva"], outcome: "Puede desplegar un agente gobernado de Nivel 2." },
    core103: { code: "ACF-103", title: "Supervisión y deriva", topics: ["Detección de señales débiles","Patrones de deriva lenta","Conflictos entre agentes","Protocolos de kill switch","Clasificación y respuesta a incidentes"], outcome: "Puede gobernar un sistema autónomo vivo." },
    pro201: { code: "ACF-201", title: "Despliegue para clientes", topics: ["Talleres ACF","Superar la resistencia humana","Implementación de ACF Control","Construcción de la ruta de certificación Trust","Hoja de ruta de gobernanza del cliente"], outcome: "Puede entregar ACF para clientes." },
    pro202: { code: "ACF-202", title: "Auditoría y certificación", topics: ["Metodología de auditoría ACF Trust","Requisitos de evidencia","Puntuación avanzada","Redacción de informes de auditoría","Gestión de no conformidad"], outcome: "Puede certificar organizaciones." },
    pro203: { code: "ACF-203", title: "Casos complejos", topics: ["Arquitecturas multi-agente","Despliegues multi-país","Resolución de conflictos empresariales","Simulación de incidentes mayores","Gobernanza a escala empresarial"], outcome: "Puede manejar la complejidad empresarial." },
    execProgramLabel: "PROGRAMA EJECUTIVO",
    execProgramTitle: "Para CEOs, COMEX y miembros del consejo",
    execProgramDesc: "2 días intensivos. No es un curso — es una transformación. Los líderes se van con una Constitución Agéntica firmada, una hoja de ruta de gobernanza a 90 días y la claridad para asumir su futuro autónomo.",
    execTopics: ["Estrategia agéntica","Soberanía organizacional","Riesgo y responsabilidad personal","Gobernanza a escala","Simulación de incidentes en vivo","Demostración de ACF Control"],
    execDeliverablesLabel: "ENTREGABLES:",
    execDeliverables: ["Constitución firmada","Hoja de ruta 90 días","Patrocinador designado","Preparación ACF TRUST"],
    execNote: "Sin certificación aquí. Solo una cosa: se van siendo responsables.",
    execBtn: "Solicitar programa ejecutivo →",
    ecosystemLabel: "Sistema de ciclo cerrado",
    ecosystemTitle1: "El Ecosistema ",
    ecosystemTitle2: "ACF",
    ecosystemDesc: "Cada pieza alimenta la siguiente. Un sistema, no un producto.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Diagnóstico gratuito — evalúe su soberanía" },
      { step: "02", label: "ACF Academy", desc: "Forme equipos para gobernar sistemas autónomos" },
      { step: "03", label: "ACF Control", desc: "Plataforma de gobernanza — opere en tiempo real" },
      { step: "04", label: "ACF TRUST™", desc: "Sello público — demuéstrelo a sus clientes" },
      { step: "05", label: "ACF CERTIFIED", desc: "Los socios despliegan y auditan organizaciones" },
    ],
    ecoBack: "↺ VOLVER A ACF SCORE",
    whyTitle1: "Por qué esto ",
    whyTitle2: "importa",
    withoutGov: "SIN GOBERNANZA",
    withoutGovDesc: "La autonomía amplifica los errores. Los agentes optimizan localmente, destruyen valor globalmente. Sin pista de auditoría. Sin responsabilidad. Sin vuelta atrás.",
    withAcf: "CON ACF",
    withAcfDesc: "La autonomía amplifica la claridad. Las decisiones están gobernadas. Los humanos están al mando. Cada acción es rastreable, reversible, responsable.",
    whyBottom: "No necesita más IA. Necesita ",
    whyBottomStrong: "soberanía decisional.",
    statsLabels: ["Módulos Academy", "Niveles de certificación", "Niveles Trust", "Productos del ecosistema"],
    finalTitle1: "Comience.",
    finalTitle2: "Construya confianza.",
    finalDesc: "Ya sea una empresa que demuestra su gobernanza o un consultor que construye el futuro del comercio agéntico — hay un camino para usted.",
    finalBtn1: "Obtener el sello ACF TRUST™ →",
    finalBtn2: "Iniciar la Academy",
    finalBtn3: "Ser socio",
  },
  de: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "GOVERNANCE-STANDARD",
    navHome: "← Startseite",
    applyNow: "Jetzt bewerben",
    certLabel: "CERTIFICATION",
    certSubLabel: "Governance nachweisen",
    academyLabel: "ACADEMY",
    academySubLabel: "Governance erlernen",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Agenten regieren.",
    heroTitle2: "Vertrauen zertifizieren.",
    heroDesc1: "Autonome Agenten verändern den Handel.",
    heroDesc2: "Die Frage ist nicht mehr ",
    heroDescIf: "ob",
    heroDesc3: "Die Frage ist: ",
    heroDesc4: "Wer regiert sie?",
    heroSubDesc: "ACF ist kein KI-Tool. Es ist ein Governance-Standard.",
    heroBtn1: "ACF TRUST™ Label erhalten →",
    heroBtn2: "Partner werden",
    trustSectionLabel: "Öffentliches Label",
    trustDesc: "Das öffentliche Label für agentische Governance. Es signalisiert Kunden, Partnern und Regulierungsbehörden, dass Ihr Unternehmen autonome Systeme unter expliziter Governance betreibt. Nicht nur Automatisierung. ",
    trustDescStrong: "Verantwortlichkeit.",
    trustL1: { level: "STUFE 1", name: "Initiiert", desc: "Sie haben Ihre agentische Reise begonnen.", items: ["ACF Score abgeschlossen","Entscheidungskartierung vorhanden","Erster regierter Agent eingesetzt","Agentische Verfassung definiert","Kill Switch betriebsbereit"], tagline: "Sie sind sich bewusst." },
    trustL2: { level: "STUFE 2", name: "Regiert", desc: "Sie betreiben Agenten unter formeller Aufsicht.", items: ["Mehrere Agenten eingesetzt","Explizite Richtlinien & Eskalationsregeln","Dashboard-Monitoring aktiv","Menschliche Verantwortlichkeit zugewiesen","Vierteljährliche Governance-Reviews"], tagline: "Sie haben die Kontrolle." },
    trustL3: { level: "STUFE 3", name: "Souverän", desc: "Agentische Governance ist in Ihrer Organisation verankert.", items: ["Unternehmensweite Verfassung","Multi-Agenten-Koordinationsregeln","Audit-Trails & Unterbrechbarkeit nachgewiesen","Souveränitäts-Score monatlich überwacht","Geschäftsführung verantwortlich für Entscheidungspolitik"], tagline: "Sie besitzen Ihre Autonomie." },
    trustFooter: "Jährliches Audit zur Aufrechterhaltung der Zertifizierung erforderlich. Zertifizierte Organisationen zeigen das ACF TRUST™ Badge an ihren digitalen Kontaktpunkten.",
    guaranteeLabel: "Verbraucherversprechen",
    guaranteeTitle1: "Was ACF TRUST™ ",
    guaranteeTitle2: "garantiert",
    guaranteeSubtitle: "Wenn Sie das ACF TRUST™ Badge sehen, wissen Sie:",
    guaranteeItems: ["Ihre Daten sind geschützt", "Preise sind reguliert", "Ein Mensch überwacht", "Kill Switch ist bereit", "Entscheidungen sind auditierbar", "AI Act konform"],
    certifiedLabel: "Professionelle Zertifizierung",
    certifiedDesc: "Professionelle Zertifizierung für Praktiker und Partner, die agentische Governance in der Praxis umsetzen. Sie zertifizieren nicht KI-Fähigkeiten. Sie zertifizieren ",
    certifiedDescStrong: "die Fähigkeit, autonome Systeme zu regieren.",
    mostPopular: "AM BELIEBTESTEN",
    practitioner: { tier: "PRAKTIKER", name: "ACF Practitioner", desc: "Für Berater, Produktverantwortliche, Architekten.", youCan: "SIE KÖNNEN:", abilities: ["ACF-Diagnosen durchführen","Entscheidungskarten erstellen","Regierte Agenten entwerfen","ACF-Tools einsetzen","Agentische Verfassungen erstellen"], reqLabel: "VORAUSSETZUNGEN:", requirements: ["ACF Academy Core Track","Fallstudie-Prüfung","Verfassungsvalidierung","Ethikverpflichtung"], tagline: "Sie arbeiten an Projekten.", btnText: "Mehr erfahren" },
    consultant: { tier: "BERATER", name: "ACF Consultant", desc: "Für Agenturen und Beratungsfirmen.", youCan: "SIE KÖNNEN:", abilities: ["Alles vom Practitioner +","Kundenorganisationen zertifizieren","ACF-Implementierungen liefern","Governance-Audits durchführen","Interne Teams schulen","ACF Control verkaufen"], reqLabel: "VORAUSSETZUNGEN:", requirements: ["Practitioner-Zertifizierung","2 validierte Kundenfälle","Governance-Audit bestanden","ACF-Komitee-Review","Jährliche Lizenzgebühr"], tagline: "Sie skalieren die Umsetzung.", btnText: "Zertifizierung beantragen →" },
    partner: { tier: "PARTNER", name: "ACF Partner", desc: "Für Großunternehmen und Systemintegratoren.", youCan: "SIE KÖNNEN:", abilities: ["Alles vom Consultant +","ACF im Unternehmensmaßstab einsetzen","Regionsübergreifend zertifizieren","Branchenrahmen mitentwickeln","Gebietsexklusivität","Co-Branding-Rechte"], reqLabel: "VORAUSSETZUNGEN:", requirements: ["Consultant-Zertifizierung","5+ zertifizierte Implementierungen","Dediziertes ACF-Team","Manuelle Auswahl durch ACF","Jährliche Partnergebühr"], tagline: "Sie gestalten das Ökosystem.", btnText: "Mehr erfahren" },
    academySectionLabel: "Governance erlernen",
    academyDesc1: "ACF Academy bildet Menschen nicht für den Einsatz von KI aus.",
    academyDesc2: "Sie bildet sie aus, autonome Systeme zu regieren.",
    coreTrack: { key: "core", label: "Core Track (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "Professional Track (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Executive-Programm", sub: "→ ACF Trust Bereitschaft" },
    core101: { code: "ACF-101", title: "Grundlagen", topics: ["Agentischer Handel erklärt","Entscheidung vs. Ausführung","Nicht delegierbare Zonen","4 Governance-Schichten","Reifegrade","Einen ACF Score lesen"], outcome: "Sie können eine agentische Organisation lesen." },
    core102: { code: "ACF-102", title: "Operatives Toolkit", topics: ["Entscheidungskartierung","Impact/Frequenz/Irreversibilitäts-Matrix","Design agentischer Verfassung","Agenten-Profilierung","Drift-Dashboard-Einrichtung"], outcome: "Sie können einen regierten Agenten der Stufe 2 einsetzen." },
    core103: { code: "ACF-103", title: "Supervision & Drift", topics: ["Schwache Signale erkennen","Langsame Drift-Muster","Agentenkonflikte","Kill-Switch-Protokolle","Vorfallsklassifikation & -reaktion"], outcome: "Sie können ein lebendes autonomes System regieren." },
    pro201: { code: "ACF-201", title: "Kundenbereitstellung", topics: ["ACF-Workshops durchführen","Menschlichen Widerstand überwinden","ACF Control Implementierung","Trust-Zertifizierungspfad aufbauen","Kunden-Governance-Roadmap"], outcome: "Sie können ACF für Kunden liefern." },
    pro202: { code: "ACF-202", title: "Audit & Zertifizierung", topics: ["ACF Trust Audit-Methodik","Nachweisanforderungen","Fortgeschrittene Bewertung","Auditbericht-Erstellung","Nichtkonformitäts-Management"], outcome: "Sie können Organisationen zertifizieren." },
    pro203: { code: "ACF-203", title: "Komplexe Fälle", topics: ["Multi-Agenten-Architekturen","Multi-Länder-Bereitstellungen","Geschäftliche Konfliktlösung","Simulation schwerer Vorfälle","Governance im Unternehmensmaßstab"], outcome: "Sie können Unternehmenskomplexität bewältigen." },
    execProgramLabel: "EXECUTIVE-PROGRAMM",
    execProgramTitle: "Für CEOs, COMEX & Vorstandsmitglieder",
    execProgramDesc: "2 intensive Tage. Kein Kurs — eine Transformation. Führungskräfte gehen mit einer unterzeichneten agentischen Verfassung, einer 90-Tage-Governance-Roadmap und der Klarheit, ihre autonome Zukunft zu gestalten.",
    execTopics: ["Agentische Strategie","Organisationale Souveränität","Risiko & persönliche Verantwortung","Governance im Großmaßstab","Live-Vorfallssimulation","ACF Control Walkthrough"],
    execDeliverablesLabel: "ERGEBNISSE:",
    execDeliverables: ["Unterzeichnete Verfassung","90-Tage-Roadmap","Benannter Sponsor","ACF TRUST Bereitschaft"],
    execNote: "Keine Zertifizierung hier. Nur eines: Sie gehen verantwortlich.",
    execBtn: "Executive-Programm anfragen →",
    ecosystemLabel: "Geschlossenes System",
    ecosystemTitle1: "Das ACF ",
    ecosystemTitle2: "Ökosystem",
    ecosystemDesc: "Jedes Teil nährt das nächste. Ein System, kein Produkt.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Kostenlose Diagnose — bewerten Sie Ihre Souveränität" },
      { step: "02", label: "ACF Academy", desc: "Teams für die Governance autonomer Systeme schulen" },
      { step: "03", label: "ACF Control", desc: "Governance-Plattform — in Echtzeit betreiben" },
      { step: "04", label: "ACF TRUST™", desc: "Öffentliches Label — beweisen Sie es Ihren Kunden" },
      { step: "05", label: "ACF CERTIFIED", desc: "Partner setzen ein & auditieren Organisationen" },
    ],
    ecoBack: "↺ ZURÜCK ZU ACF SCORE",
    whyTitle1: "Warum das ",
    whyTitle2: "wichtig ist",
    withoutGov: "OHNE GOVERNANCE",
    withoutGovDesc: "Autonomie verstärkt Fehler. Agenten optimieren lokal, zerstören Wert global. Kein Audit-Trail. Keine Verantwortlichkeit. Kein Zurück.",
    withAcf: "MIT ACF",
    withAcfDesc: "Autonomie verstärkt Klarheit. Entscheidungen werden regiert. Menschen haben das Kommando. Jede Aktion ist nachverfolgbar, umkehrbar, verantwortlich.",
    whyBottom: "Sie brauchen nicht mehr KI. Sie brauchen ",
    whyBottomStrong: "Entscheidungssouveränität.",
    statsLabels: ["Academy-Module", "Zertifizierungsstufen", "Trust-Stufen", "Ökosystem-Produkte"],
    finalTitle1: "Loslegen.",
    finalTitle2: "Vertrauen aufbauen.",
    finalDesc: "Ob Sie ein Unternehmen sind, das Governance nachweist, oder ein Berater, der die Zukunft des agentischen Handels gestaltet — es gibt einen Weg für Sie.",
    finalBtn1: "ACF TRUST™ Label erhalten →",
    finalBtn2: "Academy starten",
    finalBtn3: "Partner werden",
  },
  pt: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "PADRÃO DE GOVERNANÇA",
    navHome: "← Início",
    applyNow: "Candidatar-se",
    certLabel: "CERTIFICATION",
    certSubLabel: "Prove a sua governança",
    academyLabel: "ACADEMY",
    academySubLabel: "Aprenda a governar",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Governe os agentes.",
    heroTitle2: "Certifique a confiança.",
    heroDesc1: "Os agentes autónomos estão a transformar o comércio.",
    heroDesc2: "A questão já não é ",
    heroDescIf: "se",
    heroDesc3: "A questão é: ",
    heroDesc4: "quem os governa?",
    heroSubDesc: "ACF não é uma ferramenta de IA. É um padrão de governança.",
    heroBtn1: "Obter o selo ACF TRUST™ →",
    heroBtn2: "Tornar-se parceiro",
    trustSectionLabel: "Selo público",
    trustDesc: "O selo público de governança agêntica. Sinaliza a clientes, parceiros e reguladores que a sua empresa opera sistemas autónomos sob governança explícita. Não apenas automação. ",
    trustDescStrong: "Responsabilidade.",
    trustL1: { level: "NÍVEL 1", name: "Iniciado", desc: "Começou a sua jornada agêntica.", items: ["ACF Score concluído","Mapeamento de decisões implementado","Primeiro agente governado implantado","Constituição agêntica definida","Kill switch operacional"], tagline: "Está consciente." },
    trustL2: { level: "NÍVEL 2", name: "Governado", desc: "Opera agentes sob supervisão formal.", items: ["Múltiplos agentes implantados","Políticas explícitas e regras de escalamento","Monitoramento de painel ativo","Responsabilidade humana atribuída","Revisões de governança trimestrais"], tagline: "Tem o controlo." },
    trustL3: { level: "NÍVEL 3", name: "Soberano", desc: "A governança agêntica está integrada na sua organização.", items: ["Constituição à escala empresarial","Regras de coordenação multi-agente","Trilhas de auditoria e interruptibilidade comprovadas","Pontuação de soberania monitorizada mensalmente","Propriedade executiva da política de decisões"], tagline: "É dono da sua autonomia." },
    trustFooter: "Auditoria anual necessária para manter a certificação. As organizações certificadas exibem o selo ACF TRUST™ nos seus pontos de contacto digitais.",
    guaranteeLabel: "Promessa ao consumidor",
    guaranteeTitle1: "O que ACF TRUST™ ",
    guaranteeTitle2: "garante",
    guaranteeSubtitle: "Quando vê o selo ACF TRUST™, sabe que:",
    guaranteeItems: ["Os seus dados estão protegidos", "Os preços são governados", "Um humano supervisiona", "O kill switch está pronto", "As decisões são auditáveis", "Em conformidade com o AI Act"],
    certifiedLabel: "Certificação profissional",
    certifiedDesc: "Certificação profissional para profissionais e parceiros que implementam governança agêntica no terreno. Não certifica competências de IA. Certifica ",
    certifiedDescStrong: "a capacidade de governar sistemas autónomos.",
    mostPopular: "MAIS POPULAR",
    practitioner: { tier: "PROFISSIONAL", name: "ACF Practitioner", desc: "Para consultores, líderes de produto, arquitetos.", youCan: "PODE:", abilities: ["Executar diagnósticos ACF","Construir mapas de decisões","Desenhar agentes governados","Implantar ferramentas ACF","Criar constituições agênticas"], reqLabel: "REQUISITOS:", requirements: ["ACF Academy Pista Core","Exame de caso de estudo","Validação de constituição","Compromisso ético"], tagline: "Opera em projetos.", btnText: "Saiba mais" },
    consultant: { tier: "CONSULTOR", name: "ACF Consultant", desc: "Para agências e firmas de consultoria.", youCan: "PODE:", abilities: ["Tudo do Practitioner +","Certificar organizações clientes","Entregar implementações ACF","Realizar auditorias de governança","Formar equipas internas","Vender ACF Control"], reqLabel: "REQUISITOS:", requirements: ["Certificação Practitioner","2 casos de clientes validados","Auditoria de governança aprovada","Revisão do comité ACF","Taxa de licença anual"], tagline: "Escala a entrega.", btnText: "Candidatar-se à certificação →" },
    partner: { tier: "PARCEIRO", name: "ACF Partner", desc: "Para grandes firmas e integradores de sistemas.", youCan: "PODE:", abilities: ["Tudo do Consultant +","Implantar ACF à escala empresarial","Certificar em várias regiões","Co-desenvolver frameworks setoriais","Exclusividade territorial","Direitos de co-branding"], reqLabel: "REQUISITOS:", requirements: ["Certificação Consultant","5+ implementações certificadas","Equipa ACF dedicada","Seleção manual pela ACF","Taxa de parceiro anual"], tagline: "Molda o ecossistema.", btnText: "Saiba mais" },
    academySectionLabel: "Aprenda a governar",
    academyDesc1: "ACF Academy não forma pessoas para usar IA.",
    academyDesc2: "Forma-as para governar sistemas autónomos.",
    coreTrack: { key: "core", label: "Pista Core (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "Pista Profissional (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Programa Executivo", sub: "→ Preparação ACF Trust" },
    core101: { code: "ACF-101", title: "Fundamentos", topics: ["Comércio agêntico explicado","Decisão vs execução","Zonas não delegáveis","4 camadas de governança","Níveis de maturidade","Ler um ACF Score"], outcome: "Consegue ler uma organização agêntica." },
    core102: { code: "ACF-102", title: "Kit operacional", topics: ["Mapeamento de decisões","Matriz Impacto/Frequência/Irreversibilidade","Design de constituição agêntica","Perfilagem de agentes","Configuração do painel de desvio"], outcome: "Pode implantar um agente governado de Nível 2." },
    core103: { code: "ACF-103", title: "Supervisão e desvio", topics: ["Deteção de sinais fracos","Padrões de desvio lento","Conflitos entre agentes","Protocolos de kill switch","Classificação e resposta a incidentes"], outcome: "Pode governar um sistema autónomo vivo." },
    pro201: { code: "ACF-201", title: "Implantação para clientes", topics: ["Workshops ACF","Superar resistência humana","Implementação ACF Control","Construção do caminho de certificação Trust","Roteiro de governança do cliente"], outcome: "Pode entregar ACF para clientes." },
    pro202: { code: "ACF-202", title: "Auditoria e certificação", topics: ["Metodologia de auditoria ACF Trust","Requisitos de evidência","Pontuação avançada","Redação de relatórios de auditoria","Gestão de não conformidade"], outcome: "Pode certificar organizações." },
    pro203: { code: "ACF-203", title: "Casos complexos", topics: ["Arquiteturas multi-agente","Implantações multi-país","Resolução de conflitos empresariais","Simulação de incidentes graves","Governança à escala empresarial"], outcome: "Pode lidar com complexidade empresarial." },
    execProgramLabel: "PROGRAMA EXECUTIVO",
    execProgramTitle: "Para CEOs, COMEX e membros do conselho",
    execProgramDesc: "2 dias intensivos. Não é um curso — é uma transformação. Os líderes saem com uma Constituição Agêntica assinada, um roteiro de governança de 90 dias e a clareza para assumir o seu futuro autónomo.",
    execTopics: ["Estratégia agêntica","Soberania organizacional","Risco e responsabilidade pessoal","Governança em escala","Simulação de incidentes ao vivo","Demonstração ACF Control"],
    execDeliverablesLabel: "ENTREGÁVEIS:",
    execDeliverables: ["Constituição assinada","Roteiro de 90 dias","Patrocinador nomeado","Preparação ACF TRUST"],
    execNote: "Sem certificação aqui. Apenas uma coisa: saem responsáveis.",
    execBtn: "Solicitar programa executivo →",
    ecosystemLabel: "Sistema em ciclo fechado",
    ecosystemTitle1: "O Ecossistema ",
    ecosystemTitle2: "ACF",
    ecosystemDesc: "Cada peça alimenta a seguinte. Um sistema, não um produto.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Diagnóstico gratuito — avalie a sua soberania" },
      { step: "02", label: "ACF Academy", desc: "Forme equipas para governar sistemas autónomos" },
      { step: "03", label: "ACF Control", desc: "Plataforma de governança — opere em tempo real" },
      { step: "04", label: "ACF TRUST™", desc: "Selo público — prove-o aos seus clientes" },
      { step: "05", label: "ACF CERTIFIED", desc: "Os parceiros implantam e auditam organizações" },
    ],
    ecoBack: "↺ VOLTAR AO ACF SCORE",
    whyTitle1: "Porque é que isto ",
    whyTitle2: "importa",
    withoutGov: "SEM GOVERNANÇA",
    withoutGovDesc: "A autonomia amplifica erros. Os agentes otimizam localmente, destroem valor globalmente. Sem trilha de auditoria. Sem responsabilidade. Sem retorno.",
    withAcf: "COM ACF",
    withAcfDesc: "A autonomia amplifica clareza. As decisões são governadas. Os humanos estão no comando. Cada ação é rastreável, reversível, responsável.",
    whyBottom: "Não precisa de mais IA. Precisa de ",
    whyBottomStrong: "soberania decisional.",
    statsLabels: ["Módulos Academy", "Níveis de certificação", "Níveis Trust", "Produtos do ecossistema"],
    finalTitle1: "Comece.",
    finalTitle2: "Construa confiança.",
    finalDesc: "Seja uma empresa a provar a sua governança ou um consultor a construir o futuro do comércio agêntico — há um caminho para si.",
    finalBtn1: "Obter o selo ACF TRUST™ →",
    finalBtn2: "Iniciar a Academy",
    finalBtn3: "Tornar-se parceiro",
  },
  ja: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "ガバナンス基準",
    navHome: "← ホーム",
    applyNow: "今すぐ申請",
    certLabel: "CERTIFICATION",
    certSubLabel: "ガバナンスを証明する",
    academyLabel: "ACADEMY",
    academySubLabel: "統治を学ぶ",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "エージェントを統治する。",
    heroTitle2: "信頼を認証する。",
    heroDesc1: "自律型エージェントが商取引を変革しています。",
    heroDesc2: "問題はもはや",
    heroDescIf: "「もし」",
    heroDesc3: "問題は：",
    heroDesc4: "誰がそれらを統治するのか？",
    heroSubDesc: "ACFはAIツールではありません。ガバナンス基準です。",
    heroBtn1: "ACF TRUST™ラベルを取得 →",
    heroBtn2: "パートナーになる",
    trustSectionLabel: "公開ラベル",
    trustDesc: "エージェント型ガバナンスの公開ラベルです。顧客、パートナー、規制当局に対し、貴社が明示的なガバナンスの下で自律システムを運用していることを示します。単なる自動化ではありません。",
    trustDescStrong: "アカウンタビリティ。",
    trustL1: { level: "レベル1", name: "開始", desc: "エージェント型の旅を開始しました。", items: ["ACF Score完了","意思決定マッピング実施","初の統治エージェント展開","エージェント型憲法定義","キルスイッチ稼働"], tagline: "認識しています。" },
    trustL2: { level: "レベル2", name: "統治", desc: "正式な監督下でエージェントを運用しています。", items: ["複数エージェント展開","明示的ポリシーとエスカレーションルール","ダッシュボード監視稼働中","人的責任の割り当て","四半期ガバナンスレビュー"], tagline: "管理しています。" },
    trustL3: { level: "レベル3", name: "主権", desc: "エージェント型ガバナンスが組織に根付いています。", items: ["全社的憲法","マルチエージェント調整ルール","監査証跡と中断可能性の実証","主権スコアの月次監視","意思決定ポリシーの経営層責任"], tagline: "自律性を所有しています。" },
    trustFooter: "認証維持には年次監査が必要です。認証組織はデジタルタッチポイントにACF TRUST™バッジを表示します。",
    guaranteeLabel: "消費者への約束",
    guaranteeTitle1: "ACF TRUST™が",
    guaranteeTitle2: "保証するもの",
    guaranteeSubtitle: "ACF TRUST™バッジが表示されていれば：",
    guaranteeItems: ["データは保護されている", "価格は統治されている", "人間が監督している", "キルスイッチは準備済み", "意思決定は監査可能", "AI Act準拠"],
    certifiedLabel: "専門認証",
    certifiedDesc: "現場でエージェント型ガバナンスを実装する実務者とパートナーのための専門認証です。AIスキルを認証するのではありません。認証するのは",
    certifiedDescStrong: "自律システムを統治する能力です。",
    mostPopular: "最も人気",
    practitioner: { tier: "プラクティショナー", name: "ACF Practitioner", desc: "コンサルタント、プロダクトリーダー、アーキテクト向け。", youCan: "できること：", abilities: ["ACF診断の実行","意思決定マップの構築","統治エージェントの設計","ACFツールの展開","エージェント型憲法の作成"], reqLabel: "要件：", requirements: ["ACF Academy コアトラック","ケーススタディ試験","憲法の検証","倫理的コミットメント"], tagline: "プロジェクトで活躍します。", btnText: "詳細を見る" },
    consultant: { tier: "コンサルタント", name: "ACF Consultant", desc: "エージェンシーやコンサルティングファーム向け。", youCan: "できること：", abilities: ["Practitionerのすべて +","クライアント組織の認証","ACF実装の提供","ガバナンス監査の実施","社内チームの研修","ACF Controlの販売"], reqLabel: "要件：", requirements: ["Practitioner認証","2件の検証済みクライアントケース","ガバナンス監査合格","ACF委員会レビュー","年間ライセンス料"], tagline: "デリバリーを拡大します。", btnText: "認証を申請 →" },
    partner: { tier: "パートナー", name: "ACF Partner", desc: "大手企業やシステムインテグレーター向け。", youCan: "できること：", abilities: ["Consultantのすべて +","企業規模でのACF展開","地域横断的な認証","セクター別フレームワークの共同開発","テリトリー独占権","共同ブランディング権"], reqLabel: "要件：", requirements: ["Consultant認証","5件以上の認証済み実装","専任ACFチーム","ACFによる手動選定","年間パートナー料"], tagline: "エコシステムを形成します。", btnText: "詳細を見る" },
    academySectionLabel: "統治を学ぶ",
    academyDesc1: "ACF AcademyはAIの使い方を教えません。",
    academyDesc2: "自律システムの統治方法を教えます。",
    coreTrack: { key: "core", label: "コアトラック (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "プロフェッショナルトラック (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "エグゼクティブプログラム", sub: "→ ACF Trust準備" },
    core101: { code: "ACF-101", title: "基礎", topics: ["エージェント型商取引の解説","意思決定vs実行","委任不可ゾーン","4つのガバナンス層","成熟度レベル","ACF Scoreの読み方"], outcome: "エージェント型組織を理解できます。" },
    core102: { code: "ACF-102", title: "運用ツールキット", topics: ["意思決定マッピング","影響/頻度/不可逆性マトリックス","エージェント型憲法設計","エージェントプロファイリング","ドリフトダッシュボード設定"], outcome: "レベル2の統治エージェントを展開できます。" },
    core103: { code: "ACF-103", title: "監督とドリフト", topics: ["弱いシグナルの検出","緩慢なドリフトパターン","エージェント間の競合","キルスイッチプロトコル","インシデント分類と対応"], outcome: "稼働中の自律システムを統治できます。" },
    pro201: { code: "ACF-201", title: "クライアント展開", topics: ["ACFワークショップの実施","人的抵抗の克服","ACF Control実装","Trust認証パスの構築","クライアントガバナンスロードマップ"], outcome: "クライアント向けにACFを提供できます。" },
    pro202: { code: "ACF-202", title: "監査と認証", topics: ["ACF Trust監査方法論","エビデンス要件","高度スコアリング","監査報告書の作成","不適合管理"], outcome: "組織を認証できます。" },
    pro203: { code: "ACF-203", title: "複雑なケース", topics: ["マルチエージェントアーキテクチャ","複数国展開","ビジネス紛争解決","大規模インシデントシミュレーション","企業規模のガバナンス"], outcome: "企業の複雑性に対応できます。" },
    execProgramLabel: "エグゼクティブプログラム",
    execProgramTitle: "CEO、COMEX、取締役会メンバー向け",
    execProgramDesc: "2日間の集中プログラム。講座ではなく、変革です。リーダーは署名済みのエージェント型憲法、90日間のガバナンスロードマップ、そして自律的な未来を主導する明確なビジョンを持って帰ります。",
    execTopics: ["エージェント型戦略","組織の主権","リスクと個人的責任","大規模ガバナンス","ライブインシデントシミュレーション","ACF Controlウォークスルー"],
    execDeliverablesLabel: "成果物：",
    execDeliverables: ["署名済み憲法","90日ロードマップ","指名スポンサー","ACF TRUST準備"],
    execNote: "ここに認証はありません。ただ一つ：彼らは責任を持って帰ります。",
    execBtn: "エグゼクティブプログラムを申請 →",
    ecosystemLabel: "クローズドループシステム",
    ecosystemTitle1: "ACF ",
    ecosystemTitle2: "エコシステム",
    ecosystemDesc: "すべてのピースが次につながります。製品ではなくシステムです。",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "無料診断 — 主権を評価" },
      { step: "02", label: "ACF Academy", desc: "自律システム統治のためのチーム育成" },
      { step: "03", label: "ACF Control", desc: "ガバナンスプラットフォーム — リアルタイム運用" },
      { step: "04", label: "ACF TRUST™", desc: "公開ラベル — 顧客に証明" },
      { step: "05", label: "ACF CERTIFIED", desc: "パートナーが組織を展開・監査" },
    ],
    ecoBack: "↺ ACF SCOREに戻る",
    whyTitle1: "なぜこれが",
    whyTitle2: "重要なのか",
    withoutGov: "ガバナンスなし",
    withoutGovDesc: "自律性はエラーを増幅します。エージェントは局所的に最適化し、全体の価値を破壊します。監査証跡なし。責任なし。後戻りなし。",
    withAcf: "ACFあり",
    withAcfDesc: "自律性は明確さを増幅します。意思決定は統治されます。人間が指揮します。すべてのアクションは追跡可能、可逆的、責任ある。",
    whyBottom: "必要なのはもっと多くのAIではありません。必要なのは",
    whyBottomStrong: "意思決定の主権です。",
    statsLabels: ["Academyモジュール", "認証レベル", "Trustレベル", "エコシステム製品"],
    finalTitle1: "始めましょう。",
    finalTitle2: "信頼を築く。",
    finalDesc: "ガバナンスを証明する企業であれ、エージェント型商取引の未来を構築するコンサルタントであれ、あなたのための道があります。",
    finalBtn1: "ACF TRUST™ラベルを取得 →",
    finalBtn2: "Academyを始める",
    finalBtn3: "パートナーになる",
  },
  zh: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "治理标准",
    navHome: "← 首页",
    applyNow: "立即申请",
    certLabel: "CERTIFICATION",
    certSubLabel: "证明您的治理",
    academyLabel: "ACADEMY",
    academySubLabel: "学习治理",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "治理代理。",
    heroTitle2: "认证信任。",
    heroDesc1: "自主代理正在重塑商业。",
    heroDesc2: "问题不再是",
    heroDescIf: "是否",
    heroDesc3: "问题是：",
    heroDesc4: "谁来治理它们？",
    heroSubDesc: "ACF不是AI工具。它是治理标准。",
    heroBtn1: "获取ACF TRUST™标签 →",
    heroBtn2: "成为合作伙伴",
    trustSectionLabel: "公开标签",
    trustDesc: "代理治理的公开标签。它向客户、合作伙伴和监管机构表明，您的公司在明确的治理框架下运营自主系统。不仅仅是自动化。",
    trustDescStrong: "问责制。",
    trustL1: { level: "等级1", name: "启动", desc: "您已开始代理之旅。", items: ["ACF Score已完成","决策映射已到位","首个受治理代理已部署","代理宪法已定义","终止开关已运行"], tagline: "您已觉醒。" },
    trustL2: { level: "等级2", name: "受治理", desc: "您在正式监督下运营代理。", items: ["多个代理已部署","明确的政策和升级规则","仪表板监控活跃","人类责任已分配","季度治理审查"], tagline: "您已掌控。" },
    trustL3: { level: "等级3", name: "主权", desc: "代理治理已嵌入您的组织。", items: ["企业级宪法","多代理协调规则","审计追踪和可中断性已验证","主权评分每月监控","决策政策的高管负责"], tagline: "您拥有自主权。" },
    trustFooter: "维持认证需要年度审计。认证组织在其数字触点展示ACF TRUST™徽章。",
    guaranteeLabel: "消费者承诺",
    guaranteeTitle1: "ACF TRUST™",
    guaranteeTitle2: "的保证",
    guaranteeSubtitle: "当您看到ACF TRUST™徽章时，您知道：",
    guaranteeItems: ["您的数据受到保护", "价格受到治理", "有人类监督", "终止开关已就绪", "决策可审计", "符合AI Act"],
    certifiedLabel: "专业认证",
    certifiedDesc: "面向在实践中实施代理治理的从业者和合作伙伴的专业认证。您认证的不是AI技能。您认证的是",
    certifiedDescStrong: "治理自主系统的能力。",
    mostPopular: "最受欢迎",
    practitioner: { tier: "从业者", name: "ACF Practitioner", desc: "面向顾问、产品负责人、架构师。", youCan: "您可以：", abilities: ["执行ACF诊断","构建决策地图","设计受治理代理","部署ACF工具","创建代理宪法"], reqLabel: "要求：", requirements: ["ACF Academy核心课程","案例研究考试","宪法验证","道德承诺"], tagline: "在项目中运营。", btnText: "了解更多" },
    consultant: { tier: "顾问", name: "ACF Consultant", desc: "面向机构和咨询公司。", youCan: "您可以：", abilities: ["Practitioner的一切 +","认证客户组织","交付ACF实施","执行治理审计","培训内部团队","销售ACF Control"], reqLabel: "要求：", requirements: ["Practitioner认证","2个已验证客户案例","治理审计通过","ACF委员会审查","年度许可费"], tagline: "扩展交付。", btnText: "申请认证 →" },
    partner: { tier: "合作伙伴", name: "ACF Partner", desc: "面向大型企业和系统集成商。", youCan: "您可以：", abilities: ["Consultant的一切 +","企业规模部署ACF","跨区域认证","共同开发行业框架","区域独占权","联合品牌权"], reqLabel: "要求：", requirements: ["Consultant认证","5+已认证实施","专属ACF团队","ACF手动遴选","年度合作伙伴费"], tagline: "塑造生态系统。", btnText: "了解更多" },
    academySectionLabel: "学习治理",
    academyDesc1: "ACF Academy不培训人们使用AI。",
    academyDesc2: "它培训他们治理自主系统。",
    coreTrack: { key: "core", label: "核心课程 (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "专业课程 (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "高管项目", sub: "→ ACF Trust准备" },
    core101: { code: "ACF-101", title: "基础", topics: ["代理商业解析","决策vs执行","不可委托区域","4个治理层","成熟度等级","解读ACF Score"], outcome: "您能理解代理型组织。" },
    core102: { code: "ACF-102", title: "运营工具包", topics: ["决策映射","影响/频率/不可逆性矩阵","代理宪法设计","代理画像","漂移仪表板设置"], outcome: "您能部署等级2的受治理代理。" },
    core103: { code: "ACF-103", title: "监督与漂移", topics: ["弱信号检测","缓慢漂移模式","代理冲突","终止开关协议","事件分类与响应"], outcome: "您能治理运行中的自主系统。" },
    pro201: { code: "ACF-201", title: "客户部署", topics: ["ACF工作坊","克服人类阻力","ACF Control实施","构建Trust认证路径","客户治理路线图"], outcome: "您能为客户交付ACF。" },
    pro202: { code: "ACF-202", title: "审计与认证", topics: ["ACF Trust审计方法论","证据要求","高级评分","审计报告撰写","不合规管理"], outcome: "您能认证组织。" },
    pro203: { code: "ACF-203", title: "复杂案例", topics: ["多代理架构","多国部署","商业冲突解决","重大事件模拟","企业规模治理"], outcome: "您能应对企业级复杂性。" },
    execProgramLabel: "高管项目",
    execProgramTitle: "面向CEO、COMEX和董事会成员",
    execProgramDesc: "2天密集课程。不是培训——是变革。领导者将带着签署的代理宪法、90天治理路线图以及掌控自主未来的清晰愿景离开。",
    execTopics: ["代理战略","组织主权","风险与个人责任","规模化治理","实时事件模拟","ACF Control演示"],
    execDeliverablesLabel: "交付成果：",
    execDeliverables: ["签署的宪法","90天路线图","指定发起人","ACF TRUST准备"],
    execNote: "这里没有认证。只有一件事：他们带着责任离开。",
    execBtn: "申请高管项目 →",
    ecosystemLabel: "闭环系统",
    ecosystemTitle1: "ACF ",
    ecosystemTitle2: "生态系统",
    ecosystemDesc: "每一部分都连接下一部分。这是系统，不是产品。",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "免费诊断——评估您的主权" },
      { step: "02", label: "ACF Academy", desc: "培训团队治理自主系统" },
      { step: "03", label: "ACF Control", desc: "治理平台——实时运营" },
      { step: "04", label: "ACF TRUST™", desc: "公开标签——向客户证明" },
      { step: "05", label: "ACF CERTIFIED", desc: "合作伙伴部署和审计组织" },
    ],
    ecoBack: "↺ 返回ACF SCORE",
    whyTitle1: "为什么这",
    whyTitle2: "很重要",
    withoutGov: "没有治理",
    withoutGovDesc: "自主性放大错误。代理局部优化，全局破坏价值。没有审计追踪。没有问责。没有退路。",
    withAcf: "使用ACF",
    withAcfDesc: "自主性放大清晰度。决策受到治理。人类掌控全局。每项行动可追踪、可逆转、可问责。",
    whyBottom: "您不需要更多AI。您需要",
    whyBottomStrong: "决策主权。",
    statsLabels: ["Academy模块", "认证等级", "Trust等级", "生态系统产品"],
    finalTitle1: "开始行动。",
    finalTitle2: "建立信任。",
    finalDesc: "无论您是证明治理的企业，还是构建代理商业未来的顾问——都有适合您的路径。",
    finalBtn1: "获取ACF TRUST™标签 →",
    finalBtn2: "开始Academy",
    finalBtn3: "成为合作伙伴",
  },
  ko: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "거버넌스 표준",
    navHome: "← 홈",
    applyNow: "지금 신청",
    certLabel: "CERTIFICATION",
    certSubLabel: "거버넌스를 증명하세요",
    academyLabel: "ACADEMY",
    academySubLabel: "거버넌스를 배우세요",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "에이전트를 통치하라.",
    heroTitle2: "신뢰를 인증하라.",
    heroDesc1: "자율 에이전트가 상거래를 변혁하고 있습니다.",
    heroDesc2: "문제는 더 이상 ",
    heroDescIf: "만약",
    heroDesc3: "문제는: ",
    heroDesc4: "누가 그들을 통치하는가?",
    heroSubDesc: "ACF는 AI 도구가 아닙니다. 거버넌스 표준입니다.",
    heroBtn1: "ACF TRUST™ 라벨 받기 →",
    heroBtn2: "파트너 되기",
    trustSectionLabel: "공개 라벨",
    trustDesc: "에이전트 거버넌스를 위한 공개 라벨입니다. 귀사가 명시적 거버넌스 하에 자율 시스템을 운영한다는 것을 고객, 파트너, 규제 기관에 알립니다. 단순한 자동화가 아닙니다. ",
    trustDescStrong: "책임성.",
    trustL1: { level: "레벨 1", name: "시작", desc: "에이전트 여정을 시작했습니다.", items: ["ACF Score 완료","의사결정 매핑 완료","첫 번째 거버넌스 에이전트 배포","에이전트 헌법 정의","킬 스위치 작동"], tagline: "인식하고 있습니다." },
    trustL2: { level: "레벨 2", name: "통치", desc: "정식 감독 하에 에이전트를 운영합니다.", items: ["다수 에이전트 배포","명시적 정책 및 에스컬레이션 규칙","대시보드 모니터링 활성","인적 책임 할당","분기별 거버넌스 검토"], tagline: "통제하고 있습니다." },
    trustL3: { level: "레벨 3", name: "주권", desc: "에이전트 거버넌스가 조직에 내재화되었습니다.", items: ["전사적 헌법","멀티 에이전트 조정 규칙","감사 추적 및 중단 가능성 입증","주권 점수 월간 모니터링","의사결정 정책의 경영진 소유"], tagline: "자율성을 소유합니다." },
    trustFooter: "인증 유지를 위해 연간 감사가 필요합니다. 인증 조직은 디지털 접점에 ACF TRUST™ 배지를 표시합니다.",
    guaranteeLabel: "소비자 약속",
    guaranteeTitle1: "ACF TRUST™가 ",
    guaranteeTitle2: "보장하는 것",
    guaranteeSubtitle: "ACF TRUST™ 배지가 보이면 다음을 알 수 있습니다:",
    guaranteeItems: ["데이터가 보호됨", "가격이 통치됨", "인간이 감독함", "킬 스위치 준비 완료", "의사결정이 감사 가능", "AI Act 준수"],
    certifiedLabel: "전문 인증",
    certifiedDesc: "현장에서 에이전트 거버넌스를 구현하는 실무자와 파트너를 위한 전문 인증입니다. AI 기술을 인증하는 것이 아닙니다. 인증하는 것은 ",
    certifiedDescStrong: "자율 시스템을 통치하는 역량입니다.",
    mostPopular: "가장 인기",
    practitioner: { tier: "실무자", name: "ACF Practitioner", desc: "컨설턴트, 제품 리더, 아키텍트 대상.", youCan: "가능한 역할:", abilities: ["ACF 진단 실행","의사결정 맵 구축","거버넌스 에이전트 설계","ACF 도구 배포","에이전트 헌법 작성"], reqLabel: "요구 사항:", requirements: ["ACF Academy 코어 트랙","케이스 스터디 시험","헌법 검증","윤리 서약"], tagline: "프로젝트에서 운영합니다.", btnText: "자세히 보기" },
    consultant: { tier: "컨설턴트", name: "ACF Consultant", desc: "에이전시 및 컨설팅 회사 대상.", youCan: "가능한 역할:", abilities: ["Practitioner의 모든 것 +","고객 조직 인증","ACF 구현 제공","거버넌스 감사 수행","내부 팀 교육","ACF Control 판매"], reqLabel: "요구 사항:", requirements: ["Practitioner 인증","검증된 고객 사례 2건","거버넌스 감사 통과","ACF 위원회 검토","연간 라이선스 비용"], tagline: "딜리버리를 확장합니다.", btnText: "인증 신청 →" },
    partner: { tier: "파트너", name: "ACF Partner", desc: "대기업 및 시스템 통합업체 대상.", youCan: "가능한 역할:", abilities: ["Consultant의 모든 것 +","기업 규모 ACF 배포","지역 간 인증","섹터 프레임워크 공동 개발","지역 독점권","공동 브랜딩 권리"], reqLabel: "요구 사항:", requirements: ["Consultant 인증","5건 이상 인증된 구현","전담 ACF 팀","ACF에 의한 수동 선발","연간 파트너 비용"], tagline: "생태계를 형성합니다.", btnText: "자세히 보기" },
    academySectionLabel: "거버넌스를 배우세요",
    academyDesc1: "ACF Academy는 AI 사용법을 가르치지 않습니다.",
    academyDesc2: "자율 시스템 통치를 가르칩니다.",
    coreTrack: { key: "core", label: "코어 트랙 (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "프로페셔널 트랙 (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "임원 프로그램", sub: "→ ACF Trust 준비" },
    core101: { code: "ACF-101", title: "기초", topics: ["에이전트 상거래 설명","의사결정 vs 실행","위임 불가 영역","4개 거버넌스 계층","성숙도 수준","ACF Score 읽기"], outcome: "에이전트 조직을 이해할 수 있습니다." },
    core102: { code: "ACF-102", title: "운영 도구", topics: ["의사결정 매핑","영향/빈도/비가역성 매트릭스","에이전트 헌법 설계","에이전트 프로파일링","드리프트 대시보드 설정"], outcome: "레벨 2 거버넌스 에이전트를 배포할 수 있습니다." },
    core103: { code: "ACF-103", title: "감독과 드리프트", topics: ["약한 신호 감지","느린 드리프트 패턴","에이전트 충돌","킬 스위치 프로토콜","인시던트 분류 및 대응"], outcome: "운영 중인 자율 시스템을 통치할 수 있습니다." },
    pro201: { code: "ACF-201", title: "고객 배포", topics: ["ACF 워크숍 실행","인적 저항 극복","ACF Control 구현","Trust 인증 경로 구축","고객 거버넌스 로드맵"], outcome: "고객을 위해 ACF를 제공할 수 있습니다." },
    pro202: { code: "ACF-202", title: "감사 및 인증", topics: ["ACF Trust 감사 방법론","증거 요구 사항","고급 스코어링","감사 보고서 작성","부적합 관리"], outcome: "조직을 인증할 수 있습니다." },
    pro203: { code: "ACF-203", title: "복잡한 사례", topics: ["멀티 에이전트 아키텍처","다국가 배포","비즈니스 분쟁 해결","대규모 인시던트 시뮬레이션","기업 규모 거버넌스"], outcome: "기업 복잡성을 처리할 수 있습니다." },
    execProgramLabel: "임원 프로그램",
    execProgramTitle: "CEO, COMEX 및 이사회 멤버 대상",
    execProgramDesc: "2일 집중 프로그램. 강좌가 아닌 변혁입니다. 리더들은 서명된 에이전트 헌법, 90일 거버넌스 로드맵, 자율적 미래를 주도할 명확한 비전을 가지고 돌아갑니다.",
    execTopics: ["에이전트 전략","조직 주권","리스크 및 개인 책임","대규모 거버넌스","라이브 인시던트 시뮬레이션","ACF Control 워크스루"],
    execDeliverablesLabel: "산출물:",
    execDeliverables: ["서명된 헌법","90일 로드맵","지명 스폰서","ACF TRUST 준비"],
    execNote: "여기에 인증은 없습니다. 단 하나: 그들은 책임감을 가지고 떠납니다.",
    execBtn: "임원 프로그램 신청 →",
    ecosystemLabel: "폐쇄 루프 시스템",
    ecosystemTitle1: "ACF ",
    ecosystemTitle2: "생태계",
    ecosystemDesc: "모든 부분이 다음으로 이어집니다. 제품이 아닌 시스템입니다.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "무료 진단 — 주권을 평가하세요" },
      { step: "02", label: "ACF Academy", desc: "자율 시스템 통치를 위한 팀 교육" },
      { step: "03", label: "ACF Control", desc: "거버넌스 플랫폼 — 실시간 운영" },
      { step: "04", label: "ACF TRUST™", desc: "공개 라벨 — 고객에게 증명" },
      { step: "05", label: "ACF CERTIFIED", desc: "파트너가 조직을 배포 및 감사" },
    ],
    ecoBack: "↺ ACF SCORE로 돌아가기",
    whyTitle1: "왜 이것이 ",
    whyTitle2: "중요한가",
    withoutGov: "거버넌스 없이",
    withoutGovDesc: "자율성은 오류를 증폭합니다. 에이전트는 로컬에서 최적화하고 글로벌 가치를 파괴합니다. 감사 추적 없음. 책임 없음. 되돌림 없음.",
    withAcf: "ACF와 함께",
    withAcfDesc: "자율성은 명확성을 증폭합니다. 의사결정은 통치됩니다. 인간이 지휘합니다. 모든 행동은 추적 가능하고, 되돌릴 수 있으며, 책임 있습니다.",
    whyBottom: "더 많은 AI가 필요한 것이 아닙니다. 필요한 것은 ",
    whyBottomStrong: "의사결정 주권입니다.",
    statsLabels: ["Academy 모듈", "인증 레벨", "Trust 레벨", "생태계 제품"],
    finalTitle1: "시작하세요.",
    finalTitle2: "신뢰를 구축하세요.",
    finalDesc: "거버넌스를 증명하는 기업이든, 에이전트 상거래의 미래를 구축하는 컨설턴트든 — 당신을 위한 길이 있습니다.",
    finalBtn1: "ACF TRUST™ 라벨 받기 →",
    finalBtn2: "Academy 시작하기",
    finalBtn3: "파트너 되기",
  },
  it: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "STANDARD DI GOVERNANCE",
    navHome: "← Home",
    applyNow: "Candidati ora",
    certLabel: "CERTIFICATION",
    certSubLabel: "Dimostra la tua governance",
    academyLabel: "ACADEMY",
    academySubLabel: "Impara a governare",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Governa gli agenti.",
    heroTitle2: "Certifica la fiducia.",
    heroDesc1: "Gli agenti autonomi stanno trasformando il commercio.",
    heroDesc2: "La domanda non è più ",
    heroDescIf: "se",
    heroDesc3: "La domanda è: ",
    heroDesc4: "chi li governa?",
    heroSubDesc: "ACF non è uno strumento di IA. È uno standard di governance.",
    heroBtn1: "Ottieni il marchio ACF TRUST™ →",
    heroBtn2: "Diventa partner",
    trustSectionLabel: "Marchio pubblico",
    trustDesc: "Il marchio pubblico per la governance agentica. Segnala a clienti, partner e regolatori che la tua azienda opera sistemi autonomi sotto governance esplicita. Non solo automazione. ",
    trustDescStrong: "Responsabilità.",
    trustL1: { level: "LIVELLO 1", name: "Avviato", desc: "Hai iniziato il tuo percorso agentico.", items: ["ACF Score completato","Mappatura decisionale implementata","Primo agente governato distribuito","Costituzione agentica definita","Kill switch operativo"], tagline: "Sei consapevole." },
    trustL2: { level: "LIVELLO 2", name: "Governato", desc: "Operi agenti sotto supervisione formale.", items: ["Agenti multipli distribuiti","Politiche esplicite e regole di escalation","Monitoraggio dashboard attivo","Responsabilità umana assegnata","Revisioni di governance trimestrali"], tagline: "Sei in controllo." },
    trustL3: { level: "LIVELLO 3", name: "Sovrano", desc: "La governance agentica è radicata nella tua organizzazione.", items: ["Costituzione a livello aziendale","Regole di coordinamento multi-agente","Tracce di audit e interruttibilità dimostrate","Punteggio di sovranità monitorato mensilmente","Responsabilità dirigenziale sulla politica decisionale"], tagline: "Possiedi la tua autonomia." },
    trustFooter: "Audit annuale richiesto per mantenere la certificazione. Le organizzazioni certificate espongono il badge ACF TRUST™ sui propri punti di contatto digitali.",
    guaranteeLabel: "Promessa al consumatore",
    guaranteeTitle1: "Cosa ACF TRUST™ ",
    guaranteeTitle2: "garantisce",
    guaranteeSubtitle: "Quando vedi il badge ACF TRUST™, sai che:",
    guaranteeItems: ["I tuoi dati sono protetti", "I prezzi sono governati", "Un essere umano supervisiona", "Il kill switch è pronto", "Le decisioni sono verificabili", "Conforme all'AI Act"],
    certifiedLabel: "Certificazione professionale",
    certifiedDesc: "Certificazione professionale per professionisti e partner che implementano la governance agentica sul campo. Non certifica competenze IA. Certifica ",
    certifiedDescStrong: "la capacità di governare sistemi autonomi.",
    mostPopular: "PIÙ POPOLARE",
    practitioner: { tier: "PROFESSIONISTA", name: "ACF Practitioner", desc: "Per consulenti, product leader, architetti.", youCan: "PUOI:", abilities: ["Eseguire diagnosi ACF","Costruire mappe decisionali","Progettare agenti governati","Distribuire strumenti ACF","Creare costituzioni agentiche"], reqLabel: "REQUISITI:", requirements: ["ACF Academy Percorso Core","Esame caso di studio","Validazione della costituzione","Impegno etico"], tagline: "Operi su progetti.", btnText: "Scopri di più" },
    consultant: { tier: "CONSULENTE", name: "ACF Consultant", desc: "Per agenzie e società di consulenza.", youCan: "PUOI:", abilities: ["Tutto del Practitioner +","Certificare organizzazioni clienti","Fornire implementazioni ACF","Condurre audit di governance","Formare team interni","Vendere ACF Control"], reqLabel: "REQUISITI:", requirements: ["Certificazione Practitioner","2 casi clienti validati","Audit di governance superato","Revisione del comitato ACF","Canone di licenza annuale"], tagline: "Scali la delivery.", btnText: "Candidati per la certificazione →" },
    partner: { tier: "PARTNER", name: "ACF Partner", desc: "Per grandi aziende e system integrator.", youCan: "PUOI:", abilities: ["Tutto del Consultant +","Distribuire ACF su scala aziendale","Certificare tra le regioni","Co-sviluppare framework settoriali","Esclusività territoriale","Diritti di co-branding"], reqLabel: "REQUISITI:", requirements: ["Certificazione Consultant","5+ implementazioni certificate","Team ACF dedicato","Selezione manuale da ACF","Canone partner annuale"], tagline: "Plasmi l'ecosistema.", btnText: "Scopri di più" },
    academySectionLabel: "Impara a governare",
    academyDesc1: "ACF Academy non forma le persone all'uso dell'IA.",
    academyDesc2: "Le forma a governare sistemi autonomi.",
    coreTrack: { key: "core", label: "Percorso Core (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "Percorso Professionale (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Programma Executive", sub: "→ Preparazione ACF Trust" },
    core101: { code: "ACF-101", title: "Fondamenti", topics: ["Commercio agentico spiegato","Decisione vs esecuzione","Zone non delegabili","4 livelli di governance","Livelli di maturità","Leggere un ACF Score"], outcome: "Puoi leggere un'organizzazione agentica." },
    core102: { code: "ACF-102", title: "Toolkit operativo", topics: ["Mappatura decisionale","Matrice Impatto/Frequenza/Irreversibilità","Design della costituzione agentica","Profilazione degli agenti","Configurazione dashboard di deriva"], outcome: "Puoi distribuire un agente governato di Livello 2." },
    core103: { code: "ACF-103", title: "Supervisione e deriva", topics: ["Rilevamento segnali deboli","Pattern di deriva lenta","Conflitti tra agenti","Protocolli kill switch","Classificazione e risposta agli incidenti"], outcome: "Puoi governare un sistema autonomo attivo." },
    pro201: { code: "ACF-201", title: "Deployment per clienti", topics: ["Workshop ACF","Superare la resistenza umana","Implementazione ACF Control","Costruzione del percorso di certificazione Trust","Roadmap di governance del cliente"], outcome: "Puoi fornire ACF per i clienti." },
    pro202: { code: "ACF-202", title: "Audit e certificazione", topics: ["Metodologia di audit ACF Trust","Requisiti di evidenza","Scoring avanzato","Redazione report di audit","Gestione della non conformità"], outcome: "Puoi certificare organizzazioni." },
    pro203: { code: "ACF-203", title: "Casi complessi", topics: ["Architetture multi-agente","Deployment multi-paese","Risoluzione conflitti aziendali","Simulazione incidenti maggiori","Governance su scala aziendale"], outcome: "Puoi gestire la complessità aziendale." },
    execProgramLabel: "PROGRAMMA EXECUTIVE",
    execProgramTitle: "Per CEO, COMEX e membri del consiglio",
    execProgramDesc: "2 giorni intensivi. Non un corso — una trasformazione. I leader ripartono con una Costituzione Agentica firmata, una roadmap di governance a 90 giorni e la chiarezza per guidare il proprio futuro autonomo.",
    execTopics: ["Strategia agentica","Sovranità organizzativa","Rischio e responsabilità personale","Governance su scala","Simulazione incidenti dal vivo","Walkthrough ACF Control"],
    execDeliverablesLabel: "DELIVERABLE:",
    execDeliverables: ["Costituzione firmata","Roadmap 90 giorni","Sponsor designato","Preparazione ACF TRUST"],
    execNote: "Nessuna certificazione qui. Solo una cosa: ripartono responsabili.",
    execBtn: "Richiedi il programma executive →",
    ecosystemLabel: "Sistema a ciclo chiuso",
    ecosystemTitle1: "L'Ecosistema ",
    ecosystemTitle2: "ACF",
    ecosystemDesc: "Ogni pezzo alimenta il successivo. Un sistema, non un prodotto.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Diagnosi gratuita — valuta la tua sovranità" },
      { step: "02", label: "ACF Academy", desc: "Forma i team a governare sistemi autonomi" },
      { step: "03", label: "ACF Control", desc: "Piattaforma di governance — opera in tempo reale" },
      { step: "04", label: "ACF TRUST™", desc: "Marchio pubblico — dimostralo ai tuoi clienti" },
      { step: "05", label: "ACF CERTIFIED", desc: "I partner distribuiscono e auditano le organizzazioni" },
    ],
    ecoBack: "↺ TORNA AD ACF SCORE",
    whyTitle1: "Perché questo ",
    whyTitle2: "è importante",
    withoutGov: "SENZA GOVERNANCE",
    withoutGovDesc: "L'autonomia amplifica gli errori. Gli agenti ottimizzano localmente, distruggono valore globalmente. Nessuna traccia di audit. Nessuna responsabilità. Nessun ritorno.",
    withAcf: "CON ACF",
    withAcfDesc: "L'autonomia amplifica la chiarezza. Le decisioni sono governate. Gli umani sono al comando. Ogni azione è tracciabile, reversibile, responsabile.",
    whyBottom: "Non hai bisogno di più IA. Hai bisogno di ",
    whyBottomStrong: "sovranità decisionale.",
    statsLabels: ["Moduli Academy", "Livelli di certificazione", "Livelli Trust", "Prodotti ecosistema"],
    finalTitle1: "Inizia.",
    finalTitle2: "Costruisci fiducia.",
    finalDesc: "Che tu sia un'azienda che dimostra la propria governance o un consulente che costruisce il futuro del commercio agentico — c'è un percorso per te.",
    finalBtn1: "Ottieni il marchio ACF TRUST™ →",
    finalBtn2: "Inizia l'Academy",
    finalBtn3: "Diventa partner",
  },
  nl: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "GOVERNANCE-STANDAARD",
    navHome: "← Home",
    applyNow: "Nu solliciteren",
    certLabel: "CERTIFICATION",
    certSubLabel: "Bewijs uw governance",
    academyLabel: "ACADEMY",
    academySubLabel: "Leer governance",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Beheers de agents.",
    heroTitle2: "Certificeer het vertrouwen.",
    heroDesc1: "Autonome agents transformeren de handel.",
    heroDesc2: "De vraag is niet meer ",
    heroDescIf: "of",
    heroDesc3: "De vraag is: ",
    heroDesc4: "wie bestuurt ze?",
    heroSubDesc: "ACF is geen AI-tool. Het is een governance-standaard.",
    heroBtn1: "ACF TRUST™ label verkrijgen →",
    heroBtn2: "Word partner",
    trustSectionLabel: "Publiek label",
    trustDesc: "Het publieke label voor agentische governance. Het signaleert aan klanten, partners en toezichthouders dat uw bedrijf autonome systemen onder expliciete governance exploiteert. Niet alleen automatisering. ",
    trustDescStrong: "Verantwoordelijkheid.",
    trustL1: { level: "NIVEAU 1", name: "Gestart", desc: "U bent begonnen aan uw agentische reis.", items: ["ACF Score voltooid","Besluitvormingsmapping geïmplementeerd","Eerste bestuurde agent ingezet","Agentische grondwet gedefinieerd","Kill switch operationeel"], tagline: "U bent bewust." },
    trustL2: { level: "NIVEAU 2", name: "Bestuurd", desc: "U exploiteert agents onder formeel toezicht.", items: ["Meerdere agents ingezet","Expliciete beleidsregels en escalatieregels","Dashboard-monitoring actief","Menselijke verantwoordelijkheid toegewezen","Driemaandelijkse governance-reviews"], tagline: "U heeft controle." },
    trustL3: { level: "NIVEAU 3", name: "Soeverein", desc: "Agentische governance is verankerd in uw organisatie.", items: ["Bedrijfsbrede grondwet","Multi-agent coördinatieregels","Audittrails en onderbreekbaarheid bewezen","Soevereiniteitsscore maandelijks gemonitord","Directie verantwoordelijk voor besluitvormingsbeleid"], tagline: "U bezit uw autonomie." },
    trustFooter: "Jaarlijkse audit vereist om certificering te behouden. Gecertificeerde organisaties tonen het ACF TRUST™ badge op hun digitale contactpunten.",
    guaranteeLabel: "Consumentenbelofte",
    guaranteeTitle1: "Wat ACF TRUST™ ",
    guaranteeTitle2: "garandeert",
    guaranteeSubtitle: "Als u het ACF TRUST™ badge ziet, weet u:",
    guaranteeItems: ["Uw gegevens zijn beschermd", "Prijzen zijn bestuurd", "Een mens houdt toezicht", "Kill switch staat klaar", "Beslissingen zijn auditeerbaar", "AI Act conform"],
    certifiedLabel: "Professionele certificering",
    certifiedDesc: "Professionele certificering voor professionals en partners die agentische governance in het veld implementeren. U certificeert geen AI-vaardigheden. U certificeert ",
    certifiedDescStrong: "het vermogen om autonome systemen te besturen.",
    mostPopular: "MEEST POPULAIR",
    practitioner: { tier: "PROFESSIONAL", name: "ACF Practitioner", desc: "Voor consultants, productleiders, architecten.", youCan: "U KUNT:", abilities: ["ACF-diagnoses uitvoeren","Besluitvormingskaarten bouwen","Bestuurde agents ontwerpen","ACF-tools inzetten","Agentische grondwetten creëren"], reqLabel: "VEREISTEN:", requirements: ["ACF Academy Core Track","Casestudie-examen","Grondwetvalidatie","Ethische toezegging"], tagline: "U opereert op projecten.", btnText: "Meer weten" },
    consultant: { tier: "CONSULTANT", name: "ACF Consultant", desc: "Voor bureaus en adviesbureaus.", youCan: "U KUNT:", abilities: ["Alles van Practitioner +","Klantorganisaties certificeren","ACF-implementaties leveren","Governance-audits uitvoeren","Interne teams trainen","ACF Control verkopen"], reqLabel: "VEREISTEN:", requirements: ["Practitioner-certificering","2 gevalideerde klantcases","Governance-audit geslaagd","ACF-commissie review","Jaarlijkse licentiekosten"], tagline: "U schaalt de delivery.", btnText: "Solliciteer voor certificering →" },
    partner: { tier: "PARTNER", name: "ACF Partner", desc: "Voor grote bedrijven en systeemintegratoren.", youCan: "U KUNT:", abilities: ["Alles van Consultant +","ACF op bedrijfsschaal inzetten","Regio-overschrijdend certificeren","Sectorframeworks mede-ontwikkelen","Territoriale exclusiviteit","Co-branding rechten"], reqLabel: "VEREISTEN:", requirements: ["Consultant-certificering","5+ gecertificeerde implementaties","Toegewijd ACF-team","Handmatige selectie door ACF","Jaarlijkse partnervergoeding"], tagline: "U vormt het ecosysteem.", btnText: "Meer weten" },
    academySectionLabel: "Leer governance",
    academyDesc1: "ACF Academy leidt mensen niet op om AI te gebruiken.",
    academyDesc2: "Het leidt hen op om autonome systemen te besturen.",
    coreTrack: { key: "core", label: "Core Track (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "Professional Track (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Executive Programma", sub: "→ ACF Trust gereedheid" },
    core101: { code: "ACF-101", title: "Fundamenten", topics: ["Agentische handel uitgelegd","Beslissing vs uitvoering","Niet-delegeerbare zones","4 governance-lagen","Volwassenheidsniveaus","Een ACF Score lezen"], outcome: "U kunt een agentische organisatie lezen." },
    core102: { code: "ACF-102", title: "Operationele toolkit", topics: ["Besluitvormingsmapping","Impact/Frequentie/Onomkeerbaarheidsmatrix","Agentische grondwet ontwerp","Agent-profilering","Drift dashboard instelling"], outcome: "U kunt een bestuurd agent van Niveau 2 inzetten." },
    core103: { code: "ACF-103", title: "Toezicht en drift", topics: ["Zwakke signalen detecteren","Trage driftpatronen","Agentconflicten","Kill switch protocollen","Incidentclassificatie en -respons"], outcome: "U kunt een levend autonoom systeem besturen." },
    pro201: { code: "ACF-201", title: "Klantimplementatie", topics: ["ACF-workshops uitvoeren","Menselijke weerstand overwinnen","ACF Control implementatie","Trust-certificeringspad opbouwen","Klant governance-roadmap"], outcome: "U kunt ACF voor klanten leveren." },
    pro202: { code: "ACF-202", title: "Audit en certificering", topics: ["ACF Trust auditmethodologie","Bewijsvereisten","Geavanceerde scoring","Auditrapport schrijven","Non-conformiteitsmanagement"], outcome: "U kunt organisaties certificeren." },
    pro203: { code: "ACF-203", title: "Complexe cases", topics: ["Multi-agent architecturen","Multi-land implementaties","Zakelijke conflictoplossing","Simulatie van grote incidenten","Governance op bedrijfsschaal"], outcome: "U kunt bedrijfscomplexiteit aan." },
    execProgramLabel: "EXECUTIVE PROGRAMMA",
    execProgramTitle: "Voor CEO's, COMEX en bestuursleden",
    execProgramDesc: "2 intensieve dagen. Geen cursus — een transformatie. Leiders vertrekken met een ondertekende Agentische Grondwet, een 90-dagen governance-roadmap en de helderheid om hun autonome toekomst te leiden.",
    execTopics: ["Agentische strategie","Organisatorische soevereiniteit","Risico en persoonlijke verantwoordelijkheid","Governance op schaal","Live incidentsimulatie","ACF Control walkthrough"],
    execDeliverablesLabel: "DELIVERABLES:",
    execDeliverables: ["Ondertekende grondwet","90-dagen roadmap","Benoemde sponsor","ACF TRUST gereedheid"],
    execNote: "Geen certificering hier. Slechts één ding: ze vertrekken verantwoordelijk.",
    execBtn: "Executive programma aanvragen →",
    ecosystemLabel: "Gesloten-lus systeem",
    ecosystemTitle1: "Het ACF ",
    ecosystemTitle2: "Ecosysteem",
    ecosystemDesc: "Elk onderdeel voedt het volgende. Een systeem, geen product.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Gratis diagnose — beoordeel uw soevereiniteit" },
      { step: "02", label: "ACF Academy", desc: "Train teams om autonome systemen te besturen" },
      { step: "03", label: "ACF Control", desc: "Governance-platform — opereer in real time" },
      { step: "04", label: "ACF TRUST™", desc: "Publiek label — bewijs het aan uw klanten" },
      { step: "05", label: "ACF CERTIFIED", desc: "Partners implementeren en auditeren organisaties" },
    ],
    ecoBack: "↺ TERUG NAAR ACF SCORE",
    whyTitle1: "Waarom dit ",
    whyTitle2: "belangrijk is",
    withoutGov: "ZONDER GOVERNANCE",
    withoutGovDesc: "Autonomie versterkt fouten. Agents optimaliseren lokaal, vernietigen waarde globaal. Geen audittrail. Geen verantwoordelijkheid. Geen weg terug.",
    withAcf: "MET ACF",
    withAcfDesc: "Autonomie versterkt helderheid. Beslissingen worden bestuurd. Mensen hebben het commando. Elke actie is traceerbaar, omkeerbaar, verantwoordelijk.",
    whyBottom: "U heeft niet meer AI nodig. U heeft ",
    whyBottomStrong: "besluitvormingssoevereiniteit nodig.",
    statsLabels: ["Academy-modules", "Certificeringsniveaus", "Trust-niveaus", "Ecosysteemproducten"],
    finalTitle1: "Begin.",
    finalTitle2: "Bouw vertrouwen.",
    finalDesc: "Of u nu een bedrijf bent dat governance bewijst of een consultant die de toekomst van agentische handel opbouwt — er is een pad voor u.",
    finalBtn1: "ACF TRUST™ label verkrijgen →",
    finalBtn2: "Start de Academy",
    finalBtn3: "Word partner",
  },
  ru: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "СТАНДАРТ УПРАВЛЕНИЯ",
    navHome: "← Главная",
    applyNow: "Подать заявку",
    certLabel: "CERTIFICATION",
    certSubLabel: "Подтвердите управление",
    academyLabel: "ACADEMY",
    academySubLabel: "Научитесь управлять",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Управляйте агентами.",
    heroTitle2: "Сертифицируйте доверие.",
    heroDesc1: "Автономные агенты преобразуют коммерцию.",
    heroDesc2: "Вопрос больше не в том, ",
    heroDescIf: "будет ли",
    heroDesc3: "Вопрос в том: ",
    heroDesc4: "кто ими управляет?",
    heroSubDesc: "ACF — это не инструмент ИИ. Это стандарт управления.",
    heroBtn1: "Получить знак ACF TRUST™ →",
    heroBtn2: "Стать партнёром",
    trustSectionLabel: "Публичный знак",
    trustDesc: "Публичный знак агентного управления. Он сигнализирует клиентам, партнёрам и регуляторам, что ваша компания управляет автономными системами под явным контролем. Не просто автоматизация. ",
    trustDescStrong: "Ответственность.",
    trustL1: { level: "УРОВЕНЬ 1", name: "Начальный", desc: "Вы начали свой агентный путь.", items: ["ACF Score завершён","Картирование решений внедрено","Первый управляемый агент развёрнут","Агентная конституция определена","Kill switch работает"], tagline: "Вы осознаёте." },
    trustL2: { level: "УРОВЕНЬ 2", name: "Управляемый", desc: "Вы управляете агентами под формальным контролем.", items: ["Множество агентов развёрнуто","Явные политики и правила эскалации","Мониторинг панели активен","Человеческая ответственность назначена","Ежеквартальные обзоры управления"], tagline: "Вы контролируете." },
    trustL3: { level: "УРОВЕНЬ 3", name: "Суверенный", desc: "Агентное управление встроено в вашу организацию.", items: ["Конституция масштаба предприятия","Правила координации мультиагентов","Аудиторские следы и прерываемость доказаны","Показатель суверенитета отслеживается ежемесячно","Руководство отвечает за политику решений"], tagline: "Вы владеете своей автономией." },
    trustFooter: "Ежегодный аудит необходим для поддержания сертификации. Сертифицированные организации размещают значок ACF TRUST™ на своих цифровых точках контакта.",
    guaranteeLabel: "Обещание потребителю",
    guaranteeTitle1: "Что ACF TRUST™ ",
    guaranteeTitle2: "гарантирует",
    guaranteeSubtitle: "Когда вы видите значок ACF TRUST™, вы знаете:",
    guaranteeItems: ["Ваши данные защищены", "Цены управляются", "Человек контролирует", "Kill switch готов", "Решения проверяемы", "Соответствует AI Act"],
    certifiedLabel: "Профессиональная сертификация",
    certifiedDesc: "Профессиональная сертификация для практиков и партнёров, внедряющих агентное управление на практике. Вы не сертифицируете навыки ИИ. Вы сертифицируете ",
    certifiedDescStrong: "способность управлять автономными системами.",
    mostPopular: "САМЫЙ ПОПУЛЯРНЫЙ",
    practitioner: { tier: "ПРАКТИК", name: "ACF Practitioner", desc: "Для консультантов, продуктовых лидеров, архитекторов.", youCan: "ВЫ МОЖЕТЕ:", abilities: ["Проводить диагностику ACF","Строить карты решений","Проектировать управляемых агентов","Развёртывать инструменты ACF","Создавать агентные конституции"], reqLabel: "ТРЕБОВАНИЯ:", requirements: ["ACF Academy Основной курс","Экзамен по кейсу","Валидация конституции","Этическое обязательство"], tagline: "Вы работаете на проектах.", btnText: "Подробнее" },
    consultant: { tier: "КОНСУЛЬТАНТ", name: "ACF Consultant", desc: "Для агентств и консалтинговых фирм.", youCan: "ВЫ МОЖЕТЕ:", abilities: ["Всё от Practitioner +","Сертифицировать клиентские организации","Выполнять внедрения ACF","Проводить аудиты управления","Обучать внутренние команды","Продавать ACF Control"], reqLabel: "ТРЕБОВАНИЯ:", requirements: ["Сертификация Practitioner","2 подтверждённых клиентских кейса","Аудит управления пройден","Обзор комитета ACF","Ежегодная лицензионная плата"], tagline: "Вы масштабируете поставку.", btnText: "Подать заявку на сертификацию →" },
    partner: { tier: "ПАРТНЁР", name: "ACF Partner", desc: "Для крупных фирм и системных интеграторов.", youCan: "ВЫ МОЖЕТЕ:", abilities: ["Всё от Consultant +","Развёртывать ACF в масштабе предприятия","Сертифицировать по регионам","Совместно разрабатывать отраслевые рамки","Территориальная эксклюзивность","Права ко-брендинга"], reqLabel: "ТРЕБОВАНИЯ:", requirements: ["Сертификация Consultant","5+ сертифицированных внедрений","Выделенная команда ACF","Ручной отбор ACF","Ежегодная партнёрская плата"], tagline: "Вы формируете экосистему.", btnText: "Подробнее" },
    academySectionLabel: "Научитесь управлять",
    academyDesc1: "ACF Academy не обучает людей использовать ИИ.",
    academyDesc2: "Она обучает их управлять автономными системами.",
    coreTrack: { key: "core", label: "Основной курс (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "Профессиональный курс (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Программа для руководителей", sub: "→ Готовность ACF Trust" },
    core101: { code: "ACF-101", title: "Основы", topics: ["Агентная коммерция","Решение vs исполнение","Неделегируемые зоны","4 уровня управления","Уровни зрелости","Чтение ACF Score"], outcome: "Вы можете понимать агентную организацию." },
    core102: { code: "ACF-102", title: "Операционный инструментарий", topics: ["Картирование решений","Матрица Влияние/Частота/Необратимость","Проектирование агентной конституции","Профилирование агентов","Настройка панели дрифта"], outcome: "Вы можете развернуть управляемого агента Уровня 2." },
    core103: { code: "ACF-103", title: "Надзор и дрифт", topics: ["Обнаружение слабых сигналов","Паттерны медленного дрифта","Конфликты агентов","Протоколы kill switch","Классификация и реагирование на инциденты"], outcome: "Вы можете управлять живой автономной системой." },
    pro201: { code: "ACF-201", title: "Внедрение у клиентов", topics: ["Проведение мастер-классов ACF","Преодоление человеческого сопротивления","Внедрение ACF Control","Построение пути сертификации Trust","Дорожная карта управления клиента"], outcome: "Вы можете поставлять ACF клиентам." },
    pro202: { code: "ACF-202", title: "Аудит и сертификация", topics: ["Методология аудита ACF Trust","Требования к доказательствам","Продвинутая оценка","Написание аудиторского отчёта","Управление несоответствиями"], outcome: "Вы можете сертифицировать организации." },
    pro203: { code: "ACF-203", title: "Сложные кейсы", topics: ["Мультиагентные архитектуры","Мультистрановые развёртывания","Разрешение бизнес-конфликтов","Симуляция крупных инцидентов","Управление масштаба предприятия"], outcome: "Вы можете справляться со сложностью предприятия." },
    execProgramLabel: "ПРОГРАММА ДЛЯ РУКОВОДИТЕЛЕЙ",
    execProgramTitle: "Для CEO, COMEX и членов совета директоров",
    execProgramDesc: "2 интенсивных дня. Не курс — трансформация. Лидеры уезжают с подписанной Агентной Конституцией, 90-дневной дорожной картой управления и ясностью для управления своим автономным будущим.",
    execTopics: ["Агентная стратегия","Организационный суверенитет","Риск и персональная ответственность","Управление в масштабе","Симуляция инцидентов в реальном времени","Обзор ACF Control"],
    execDeliverablesLabel: "РЕЗУЛЬТАТЫ:",
    execDeliverables: ["Подписанная конституция","90-дневная дорожная карта","Назначенный спонсор","Готовность ACF TRUST"],
    execNote: "Здесь нет сертификации. Только одно: они уезжают ответственными.",
    execBtn: "Запросить программу для руководителей →",
    ecosystemLabel: "Замкнутая система",
    ecosystemTitle1: "Экосистема ",
    ecosystemTitle2: "ACF",
    ecosystemDesc: "Каждый элемент питает следующий. Система, а не продукт.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Бесплатная диагностика — оцените свой суверенитет" },
      { step: "02", label: "ACF Academy", desc: "Обучите команды управлять автономными системами" },
      { step: "03", label: "ACF Control", desc: "Платформа управления — работайте в реальном времени" },
      { step: "04", label: "ACF TRUST™", desc: "Публичный знак — докажите клиентам" },
      { step: "05", label: "ACF CERTIFIED", desc: "Партнёры внедряют и аудируют организации" },
    ],
    ecoBack: "↺ НАЗАД К ACF SCORE",
    whyTitle1: "Почему это ",
    whyTitle2: "важно",
    withoutGov: "БЕЗ УПРАВЛЕНИЯ",
    withoutGovDesc: "Автономия усиливает ошибки. Агенты оптимизируют локально, разрушают ценность глобально. Нет аудиторского следа. Нет ответственности. Нет пути назад.",
    withAcf: "С ACF",
    withAcfDesc: "Автономия усиливает ясность. Решения управляются. Люди командуют. Каждое действие отслеживаемо, обратимо, подотчётно.",
    whyBottom: "Вам не нужно больше ИИ. Вам нужен ",
    whyBottomStrong: "суверенитет решений.",
    statsLabels: ["Модули Academy", "Уровни сертификации", "Уровни Trust", "Продукты экосистемы"],
    finalTitle1: "Начните.",
    finalTitle2: "Создайте доверие.",
    finalDesc: "Будь вы предприятие, доказывающее управление, или консультант, строящий будущее агентной коммерции — для вас есть путь.",
    finalBtn1: "Получить знак ACF TRUST™ →",
    finalBtn2: "Начать Academy",
    finalBtn3: "Стать партнёром",
  },
  ar: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "معيار الحوكمة",
    navHome: "← الرئيسية",
    applyNow: "قدّم الآن",
    certLabel: "CERTIFICATION",
    certSubLabel: "أثبت حوكمتك",
    academyLabel: "ACADEMY",
    academySubLabel: "تعلّم الحوكمة",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "احكم الوكلاء.",
    heroTitle2: "اعتمد الثقة.",
    heroDesc1: "الوكلاء المستقلون يعيدون تشكيل التجارة.",
    heroDesc2: "السؤال لم يعد ",
    heroDescIf: "هل",
    heroDesc3: "السؤال هو: ",
    heroDesc4: "من يحكمهم؟",
    heroSubDesc: "ACF ليس أداة ذكاء اصطناعي. إنه معيار حوكمة.",
    heroBtn1: "احصل على علامة ACF TRUST™ ←",
    heroBtn2: "كن شريكاً",
    trustSectionLabel: "علامة عامة",
    trustDesc: "العلامة العامة للحوكمة الوكيلية. تُشير للعملاء والشركاء والجهات التنظيمية أن شركتك تُشغّل أنظمة مستقلة تحت حوكمة صريحة. ليست مجرد أتمتة. ",
    trustDescStrong: "مساءلة.",
    trustL1: { level: "المستوى 1", name: "مُبتدئ", desc: "بدأت رحلتك الوكيلية.", items: ["ACF Score مكتمل","خرائط القرارات مُنفّذة","أول وكيل محكوم مُنشر","الدستور الوكيلي مُحدّد","مفتاح الإيقاف تشغيلي"], tagline: "أنت واعٍ." },
    trustL2: { level: "المستوى 2", name: "محكوم", desc: "تُشغّل وكلاء تحت إشراف رسمي.", items: ["وكلاء متعددون مُنشرون","سياسات صريحة وقواعد تصعيد","مراقبة لوحة القيادة نشطة","مسؤولية بشرية مُعيّنة","مراجعات حوكمة ربع سنوية"], tagline: "أنت مسيطر." },
    trustL3: { level: "المستوى 3", name: "سيادي", desc: "الحوكمة الوكيلية متجذرة في مؤسستك.", items: ["دستور على مستوى المؤسسة","قواعد تنسيق متعدد الوكلاء","مسارات التدقيق وقابلية المقاطعة مُثبتة","درجة السيادة تُراقب شهرياً","ملكية تنفيذية لسياسة القرارات"], tagline: "تملك استقلاليتك." },
    trustFooter: "تدقيق سنوي مطلوب للحفاظ على الشهادة. المؤسسات المعتمدة تعرض شارة ACF TRUST™ على نقاط الاتصال الرقمية.",
    guaranteeLabel: "وعد للمستهلك",
    guaranteeTitle1: "ما يضمنه ",
    guaranteeTitle2: "ACF TRUST™",
    guaranteeSubtitle: "عندما ترى شارة ACF TRUST™، تعرف أن:",
    guaranteeItems: ["بياناتك محمية", "الأسعار محكومة", "إنسان يُشرف", "مفتاح الإيقاف جاهز", "القرارات قابلة للتدقيق", "متوافق مع AI Act"],
    certifiedLabel: "شهادة مهنية",
    certifiedDesc: "شهادة مهنية للممارسين والشركاء الذين ينفّذون الحوكمة الوكيلية في الميدان. لا تعتمد مهارات الذكاء الاصطناعي. تعتمد ",
    certifiedDescStrong: "القدرة على حكم الأنظمة المستقلة.",
    mostPopular: "الأكثر شعبية",
    practitioner: { tier: "ممارس", name: "ACF Practitioner", desc: "للاستشاريين وقادة المنتجات والمهندسين المعماريين.", youCan: "يمكنك:", abilities: ["إجراء تشخيصات ACF","بناء خرائط القرارات","تصميم وكلاء محكومين","نشر أدوات ACF","إنشاء دساتير وكيلية"], reqLabel: "المتطلبات:", requirements: ["ACF Academy المسار الأساسي","امتحان دراسة حالة","التحقق من الدستور","التزام أخلاقي"], tagline: "تعمل على المشاريع.", btnText: "اعرف المزيد" },
    consultant: { tier: "مستشار", name: "ACF Consultant", desc: "للوكالات وشركات الاستشارات.", youCan: "يمكنك:", abilities: ["كل ما في Practitioner +","اعتماد مؤسسات العملاء","تقديم تطبيقات ACF","إجراء تدقيقات الحوكمة","تدريب الفرق الداخلية","بيع ACF Control"], reqLabel: "المتطلبات:", requirements: ["شهادة Practitioner","حالتان مُعتمدتان للعملاء","تدقيق الحوكمة ناجح","مراجعة لجنة ACF","رسوم ترخيص سنوية"], tagline: "تُوسّع نطاق التسليم.", btnText: "تقدّم للشهادة ←" },
    partner: { tier: "شريك", name: "ACF Partner", desc: "للشركات الكبرى ومتكاملي الأنظمة.", youCan: "يمكنك:", abilities: ["كل ما في Consultant +","نشر ACF على مستوى المؤسسة","الاعتماد عبر المناطق","المشاركة في تطوير أُطر قطاعية","حصرية إقليمية","حقوق العلامة التجارية المشتركة"], reqLabel: "المتطلبات:", requirements: ["شهادة Consultant","5+ تطبيقات معتمدة","فريق ACF مُخصص","اختيار يدوي من ACF","رسوم شراكة سنوية"], tagline: "تُشكّل النظام البيئي.", btnText: "اعرف المزيد" },
    academySectionLabel: "تعلّم الحوكمة",
    academyDesc1: "ACF Academy لا تُدرّب الناس على استخدام الذكاء الاصطناعي.",
    academyDesc2: "تُدرّبهم على حكم الأنظمة المستقلة.",
    coreTrack: { key: "core", label: "المسار الأساسي (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "المسار المهني (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "البرنامج التنفيذي", sub: "→ جاهزية ACF Trust" },
    core101: { code: "ACF-101", title: "الأساسيات", topics: ["التجارة الوكيلية مُفسّرة","القرار مقابل التنفيذ","المناطق غير القابلة للتفويض","4 طبقات حوكمة","مستويات النضج","قراءة ACF Score"], outcome: "يمكنك فهم مؤسسة وكيلية." },
    core102: { code: "ACF-102", title: "مجموعة الأدوات التشغيلية", topics: ["رسم خرائط القرارات","مصفوفة التأثير/التكرار/عدم الرجعية","تصميم الدستور الوكيلي","تنميط الوكلاء","إعداد لوحة الانحراف"], outcome: "يمكنك نشر وكيل محكوم المستوى 2." },
    core103: { code: "ACF-103", title: "الإشراف والانحراف", topics: ["كشف الإشارات الضعيفة","أنماط الانحراف البطيء","صراعات الوكلاء","بروتوكولات مفتاح الإيقاف","تصنيف الحوادث والاستجابة"], outcome: "يمكنك حكم نظام مستقل حي." },
    pro201: { code: "ACF-201", title: "النشر للعملاء", topics: ["إدارة ورش ACF","التغلب على المقاومة البشرية","تنفيذ ACF Control","بناء مسار شهادة Trust","خارطة طريق حوكمة العميل"], outcome: "يمكنك تقديم ACF للعملاء." },
    pro202: { code: "ACF-202", title: "التدقيق والاعتماد", topics: ["منهجية تدقيق ACF Trust","متطلبات الأدلة","التقييم المتقدم","كتابة تقارير التدقيق","إدارة عدم المطابقة"], outcome: "يمكنك اعتماد المؤسسات." },
    pro203: { code: "ACF-203", title: "حالات معقدة", topics: ["هياكل متعددة الوكلاء","عمليات نشر متعددة البلدان","حل النزاعات التجارية","محاكاة حوادث كبرى","حوكمة على مستوى المؤسسة"], outcome: "يمكنك التعامل مع تعقيد المؤسسة." },
    execProgramLabel: "البرنامج التنفيذي",
    execProgramTitle: "للرؤساء التنفيذيين وأعضاء مجلس الإدارة",
    execProgramDesc: "يومان مكثفان. ليس دورة — بل تحوّل. يغادر القادة بدستور وكيلي موقّع وخارطة طريق حوكمة لـ 90 يوماً ووضوح لقيادة مستقبلهم المستقل.",
    execTopics: ["الاستراتيجية الوكيلية","السيادة المؤسسية","المخاطر والمسؤولية الشخصية","الحوكمة على نطاق واسع","محاكاة حوادث مباشرة","جولة ACF Control"],
    execDeliverablesLabel: "المخرجات:",
    execDeliverables: ["دستور موقّع","خارطة طريق 90 يوماً","راعٍ مُسمّى","جاهزية ACF TRUST"],
    execNote: "لا شهادة هنا. شيء واحد فقط: يغادرون مسؤولين.",
    execBtn: "اطلب البرنامج التنفيذي ←",
    ecosystemLabel: "نظام الحلقة المغلقة",
    ecosystemTitle1: "نظام ",
    ecosystemTitle2: "ACF البيئي",
    ecosystemDesc: "كل جزء يغذي التالي. نظام، وليس منتج.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "تشخيص مجاني — قيّم سيادتك" },
      { step: "02", label: "ACF Academy", desc: "درّب الفرق على حكم الأنظمة المستقلة" },
      { step: "03", label: "ACF Control", desc: "منصة الحوكمة — شغّل في الوقت الفعلي" },
      { step: "04", label: "ACF TRUST™", desc: "علامة عامة — أثبتها لعملائك" },
      { step: "05", label: "ACF CERTIFIED", desc: "الشركاء ينشرون ويدققون المؤسسات" },
    ],
    ecoBack: "↺ العودة إلى ACF SCORE",
    whyTitle1: "لماذا هذا ",
    whyTitle2: "مهم",
    withoutGov: "بدون حوكمة",
    withoutGovDesc: "الاستقلالية تُضخّم الأخطاء. الوكلاء يُحسّنون محلياً ويُدمّرون القيمة عالمياً. لا مسار تدقيق. لا مساءلة. لا عودة.",
    withAcf: "مع ACF",
    withAcfDesc: "الاستقلالية تُضخّم الوضوح. القرارات محكومة. البشر يقودون. كل إجراء قابل للتتبع وقابل للعكس ومسؤول.",
    whyBottom: "لا تحتاج المزيد من الذكاء الاصطناعي. تحتاج ",
    whyBottomStrong: "سيادة القرار.",
    statsLabels: ["وحدات Academy", "مستويات الشهادة", "مستويات Trust", "منتجات النظام البيئي"],
    finalTitle1: "ابدأ.",
    finalTitle2: "ابنِ الثقة.",
    finalDesc: "سواء كنت مؤسسة تُثبت حوكمتها أو مستشاراً يبني مستقبل التجارة الوكيلية — هناك مسار لك.",
    finalBtn1: "احصل على علامة ACF TRUST™ ←",
    finalBtn2: "ابدأ Academy",
    finalBtn3: "كن شريكاً",
  },
  tr: {
    navTitle: "ACF CERTIFICATION",
    navSubtext: "YÖNETİŞİM STANDARDI",
    navHome: "← Ana Sayfa",
    applyNow: "Şimdi Başvur",
    certLabel: "CERTIFICATION",
    certSubLabel: "Yönetişiminizi kanıtlayın",
    academyLabel: "ACADEMY",
    academySubLabel: "Yönetişimi öğrenin",
    heroBadge: "CERTIFICATION & ACADEMY",
    heroTitle1: "Ajanları yönetin.",
    heroTitle2: "Güveni sertifikalandırın.",
    heroDesc1: "Otonom ajanlar ticareti dönüştürüyor.",
    heroDesc2: "Soru artık ",
    heroDescIf: "olup olmadığı",
    heroDesc3: "Soru şu: ",
    heroDesc4: "onları kim yönetiyor?",
    heroSubDesc: "ACF bir yapay zeka aracı değildir. Bir yönetişim standardıdır.",
    heroBtn1: "ACF TRUST™ Etiketi Alın →",
    heroBtn2: "İş ortağı olun",
    trustSectionLabel: "Kamusal etiket",
    trustDesc: "Ajantik yönetişim için kamusal etiket. Müşterilere, iş ortaklarına ve düzenleyicilere şirketinizin otonom sistemleri açık yönetişim altında işlettiğini bildirir. Sadece otomasyon değil. ",
    trustDescStrong: "Hesap verebilirlik.",
    trustL1: { level: "SEVİYE 1", name: "Başlangıç", desc: "Ajantik yolculuğunuza başladınız.", items: ["ACF Score tamamlandı","Karar haritalama yerinde","İlk yönetilen ajan dağıtıldı","Ajantik anayasa tanımlandı","Kill switch operasyonel"], tagline: "Farkındasınız." },
    trustL2: { level: "SEVİYE 2", name: "Yönetilen", desc: "Ajanları resmi denetim altında işletiyorsunuz.", items: ["Birden fazla ajan dağıtıldı","Açık politikalar ve eskalasyon kuralları","Gösterge paneli izleme aktif","İnsan sorumluluğu atandı","Üç aylık yönetişim incelemeleri"], tagline: "Kontrol sizde." },
    trustL3: { level: "SEVİYE 3", name: "Egemen", desc: "Ajantik yönetişim organizasyonunuza yerleşmiştir.", items: ["Kuruluş çapında anayasa","Çoklu ajan koordinasyon kuralları","Denetim izleri ve kesintiye uğratılabilirlik kanıtlandı","Egemenlik puanı aylık izleniyor","Karar politikasının yönetim sorumluluğu"], tagline: "Özerkliğinize sahipsiniz." },
    trustFooter: "Sertifikanın sürdürülmesi için yıllık denetim gereklidir. Sertifikalı kuruluşlar dijital temas noktalarında ACF TRUST™ rozetini sergiler.",
    guaranteeLabel: "Tüketici vaadi",
    guaranteeTitle1: "ACF TRUST™ neyi ",
    guaranteeTitle2: "garanti eder",
    guaranteeSubtitle: "ACF TRUST™ rozetini gördüğünüzde bilirsiniz ki:",
    guaranteeItems: ["Verileriniz korunuyor", "Fiyatlar yönetiliyor", "Bir insan denetliyor", "Kill switch hazır", "Kararlar denetlenebilir", "AI Act uyumlu"],
    certifiedLabel: "Profesyonel sertifikasyon",
    certifiedDesc: "Sahada ajantik yönetişimi uygulayan uygulayıcılar ve iş ortakları için profesyonel sertifikasyon. Yapay zeka becerilerini sertifikalandırmıyorsunuz. Sertifikalandırdığınız ",
    certifiedDescStrong: "otonom sistemleri yönetme kapasitesidir.",
    mostPopular: "EN POPÜLER",
    practitioner: { tier: "UYGULAYICI", name: "ACF Practitioner", desc: "Danışmanlar, ürün liderleri, mimarlar için.", youCan: "YAPABİLİRSİNİZ:", abilities: ["ACF teşhisleri yürütmek","Karar haritaları oluşturmak","Yönetilen ajanlar tasarlamak","ACF araçlarını dağıtmak","Ajantik anayasalar oluşturmak"], reqLabel: "GEREKSİNİMLER:", requirements: ["ACF Academy Çekirdek Yol","Vaka çalışması sınavı","Anayasa doğrulaması","Etik taahhüt"], tagline: "Projelerde çalışırsınız.", btnText: "Daha fazla bilgi" },
    consultant: { tier: "DANIŞMAN", name: "ACF Consultant", desc: "Ajanslar ve danışmanlık firmaları için.", youCan: "YAPABİLİRSİNİZ:", abilities: ["Practitioner'ın tamamı +","Müşteri kuruluşlarını sertifikalandırmak","ACF uygulamalarını sunmak","Yönetişim denetimleri yapmak","İç ekipleri eğitmek","ACF Control satmak"], reqLabel: "GEREKSİNİMLER:", requirements: ["Practitioner sertifikası","2 doğrulanmış müşteri vakası","Yönetişim denetimi geçildi","ACF komite incelemesi","Yıllık lisans ücreti"], tagline: "Teslimatı ölçeklendirirsiniz.", btnText: "Sertifikasyon için başvurun →" },
    partner: { tier: "İŞ ORTAĞI", name: "ACF Partner", desc: "Büyük firmalar ve sistem entegratörleri için.", youCan: "YAPABİLİRSİNİZ:", abilities: ["Consultant'ın tamamı +","ACF'yi kurumsal ölçekte dağıtmak","Bölgeler arası sertifikalandırmak","Sektör çerçevelerini birlikte geliştirmek","Bölgesel münhasırlık","Ortak marka hakları"], reqLabel: "GEREKSİNİMLER:", requirements: ["Consultant sertifikası","5+ sertifikalı uygulama","Özel ACF ekibi","ACF tarafından manuel seçim","Yıllık iş ortağı ücreti"], tagline: "Ekosistemi şekillendirirsiniz.", btnText: "Daha fazla bilgi" },
    academySectionLabel: "Yönetişimi öğrenin",
    academyDesc1: "ACF Academy insanları yapay zeka kullanmaya eğitmez.",
    academyDesc2: "Onları otonom sistemleri yönetmeye eğitir.",
    coreTrack: { key: "core", label: "Çekirdek Yol (101–103)", sub: "→ Practitioner" },
    proTrack: { key: "pro", label: "Profesyonel Yol (201–203)", sub: "→ Consultant" },
    execTrack: { key: "exec", label: "Yönetici Programı", sub: "→ ACF Trust hazırlığı" },
    core101: { code: "ACF-101", title: "Temeller", topics: ["Ajantik ticaret açıklaması","Karar vs yürütme","Devredilemez bölgeler","4 yönetişim katmanı","Olgunluk seviyeleri","ACF Score okuma"], outcome: "Bir ajantik organizasyonu okuyabilirsiniz." },
    core102: { code: "ACF-102", title: "Operasyonel araç seti", topics: ["Karar haritalama","Etki/Sıklık/Geri Dönülemezlik matrisi","Ajantik anayasa tasarımı","Ajan profilleme","Sapma gösterge paneli kurulumu"], outcome: "Seviye 2 yönetilen bir ajan dağıtabilirsiniz." },
    core103: { code: "ACF-103", title: "Denetim ve sapma", topics: ["Zayıf sinyal tespiti","Yavaş sapma kalıpları","Ajan çatışmaları","Kill switch protokolleri","Olay sınıflandırma ve müdahale"], outcome: "Yaşayan bir otonom sistemi yönetebilirsiniz." },
    pro201: { code: "ACF-201", title: "Müşteri dağıtımı", topics: ["ACF atölyeleri yürütme","İnsan direncini aşma","ACF Control uygulaması","Trust sertifikasyon yolu oluşturma","Müşteri yönetişim yol haritası"], outcome: "Müşteriler için ACF sunabilirsiniz." },
    pro202: { code: "ACF-202", title: "Denetim ve sertifikasyon", topics: ["ACF Trust denetim metodolojisi","Kanıt gereksinimleri","Gelişmiş puanlama","Denetim raporu yazımı","Uygunsuzluk yönetimi"], outcome: "Kuruluşları sertifikalandırabilirsiniz." },
    pro203: { code: "ACF-203", title: "Karmaşık vakalar", topics: ["Çoklu ajan mimarileri","Çok ülkeli dağıtımlar","İş çatışması çözümü","Büyük olay simülasyonu","Kurumsal ölçekte yönetişim"], outcome: "Kurumsal karmaşıklığı yönetebilirsiniz." },
    execProgramLabel: "YÖNETİCİ PROGRAMI",
    execProgramTitle: "CEO'lar, COMEX ve yönetim kurulu üyeleri için",
    execProgramDesc: "2 yoğun gün. Bir kurs değil — bir dönüşüm. Liderler imzalanmış bir Ajantik Anayasa, 90 günlük yönetişim yol haritası ve otonom geleceklerini sahiplenme netliğiyle ayrılır.",
    execTopics: ["Ajantik strateji","Organizasyonel egemenlik","Risk ve kişisel sorumluluk","Ölçekli yönetişim","Canlı olay simülasyonu","ACF Control tanıtımı"],
    execDeliverablesLabel: "TESLİMATLAR:",
    execDeliverables: ["İmzalanmış anayasa","90 günlük yol haritası","Atanmış sponsor","ACF TRUST hazırlığı"],
    execNote: "Burada sertifikasyon yok. Sadece bir şey: sorumlu olarak ayrılırlar.",
    execBtn: "Yönetici programı talep edin →",
    ecosystemLabel: "Kapalı döngü sistemi",
    ecosystemTitle1: "ACF ",
    ecosystemTitle2: "Ekosistemi",
    ecosystemDesc: "Her parça bir sonrakini besler. Bir ürün değil, bir sistem.",
    ecoSteps: [
      { step: "01", label: "ACF Score", desc: "Ücretsiz teşhis — egemenliğinizi değerlendirin" },
      { step: "02", label: "ACF Academy", desc: "Ekipleri otonom sistemleri yönetmeye eğitin" },
      { step: "03", label: "ACF Control", desc: "Yönetişim platformu — gerçek zamanlı çalıştırın" },
      { step: "04", label: "ACF TRUST™", desc: "Kamusal etiket — müşterilerinize kanıtlayın" },
      { step: "05", label: "ACF CERTIFIED", desc: "İş ortakları kuruluşları dağıtır ve denetler" },
    ],
    ecoBack: "↺ ACF SCORE'A DÖN",
    whyTitle1: "Bunun neden ",
    whyTitle2: "önemli olduğu",
    withoutGov: "YÖNETİŞİM OLMADAN",
    withoutGovDesc: "Özerklik hataları güçlendirir. Ajanlar yerel olarak optimize eder, küresel olarak değeri yok eder. Denetim izi yok. Hesap verebilirlik yok. Geri dönüş yok.",
    withAcf: "ACF İLE",
    withAcfDesc: "Özerklik netliği güçlendirir. Kararlar yönetilir. İnsanlar komutadadır. Her eylem izlenebilir, geri alınabilir, hesap verilebilir.",
    whyBottom: "Daha fazla yapay zekaya ihtiyacınız yok. İhtiyacınız olan ",
    whyBottomStrong: "karar egemenliğidir.",
    statsLabels: ["Academy modülleri", "Sertifikasyon seviyeleri", "Trust seviyeleri", "Ekosistem ürünleri"],
    finalTitle1: "Başlayın.",
    finalTitle2: "Güven inşa edin.",
    finalDesc: "İster yönetişimini kanıtlayan bir kuruluş olun, ister ajantik ticaretin geleceğini inşa eden bir danışman — sizin için bir yol var.",
    finalBtn1: "ACF TRUST™ Etiketi Alın →",
    finalBtn2: "Academy'yi başlatın",
    finalBtn3: "İş ortağı olun",
  },
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ACFCertificationPage() {
  const locale = useLocale();
  const lang = (ui as any)[locale] ? locale : "en";
  const t = (ui as any)[lang];
  const [activeTrack, setActiveTrack] = useState("core");
  const navLinks = ["Trust", "Certified", "Academy", "Ecosystem"];

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heroFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes heroFloatSlow { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes heroPulse { 0%,100% { filter:drop-shadow(0 0 12px rgba(201,168,76,.15)); } 50% { filter:drop-shadow(0 0 36px rgba(201,168,76,.45)); } }
        @keyframes heroOrbitCW { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes heroOrbitCCW { from { transform:rotate(0deg); } to { transform:rotate(-360deg); } }
        @keyframes sparkle { 0%,100% { opacity:0; transform:scale(0); } 50% { opacity:1; transform:scale(1); } }
        .fade-up { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.1s; }
        .fade-up-d2 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.3s; }
        .fade-up-d3 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.55s; }
        .gold-glow:hover { box-shadow:0 0 20px rgba(201,168,76,.2); }
        .hero-left { animation:heroFloat 4s ease-in-out infinite, heroPulse 4s ease-in-out infinite; }
        .hero-right { animation:heroFloatSlow 5s ease-in-out infinite, heroPulse 5s ease-in-out infinite .5s; }
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
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
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>{t.navTitle}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t.navSubtext}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t.navHome}</a>
            {navLinks.map((l: any) => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l}</a>
            ))}
            <button className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
            }}>{t.applyNow}</button>
          </div>
        </div>
      </nav>

      {/* ━━━ HERO with animated icons ━━━ */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(201,168,76,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
        }} />

        {/* Orbiting rings */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 700, height: 700, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(201,168,76,.06)", animation: "heroOrbitCW 60s linear infinite" }} />
          <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(201,168,76,.04)", animation: "heroOrbitCCW 45s linear infinite" }} />
          <div style={{ position: "absolute", inset: 140, borderRadius: "50%", border: "1px dashed rgba(201,168,76,.06)", animation: "heroOrbitCW 80s linear infinite" }} />
          {/* Sparkle dots */}
          {[0,1,2,3,4,5].map((i: any) => (
            <div key={i} style={{
              position: "absolute",
              top: `${50 + 42 * Math.sin((i / 6) * Math.PI * 2)}%`,
              left: `${50 + 42 * Math.cos((i / 6) * Math.PI * 2)}%`,
              width: 4, height: 4, borderRadius: "50%", background: C.gold, opacity: 0,
              animation: `sparkle ${2 + i * 0.3}s ease-in-out infinite ${i * 0.8}s`,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 40, alignItems: "center" }}>

            {/* LEFT — Animated Shield */}
            <div className="fade-up" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-left" style={{ position: "relative" }}>
                <HeroShield />
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: 0.6 }}>{t.certLabel}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>{t.certSubLabel}</div>
                </div>
              </div>
            </div>

            {/* CENTER — Text */}
            <div style={{ textAlign: "center" }} className="fade-up-d2">
              <Badge>{t.heroBadge}</Badge>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 24, letterSpacing: "-1px" }}>
                <span style={{ color: "#fff" }}>{t.heroTitle1}</span><br />
                <span style={{ color: C.gold }}>{t.heroTitle2}</span>
              </h1>
              <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 28px" }}>
                {t.heroDesc1}<br />
                {t.heroDesc2}<em>{t.heroDescIf}</em>.<br />
                {t.heroDesc3}<strong style={{ color: "#fff" }}>{t.heroDesc4}</strong>
              </p>
              <p style={{ fontSize: 14, color: C.gray, maxWidth: 420, margin: "0 auto 32px" }}>
                {t.heroSubDesc}
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <button className="gold-glow" style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                  border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                }}>{t.heroBtn1}</button>
                <button style={{
                  background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
                  padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .3s",
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
                >{t.heroBtn2}</button>
              </div>
            </div>

            {/* RIGHT — Animated Graduation Cap */}
            <div className="fade-up-d3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-right" style={{ position: "relative" }}>
                <HeroAcademyCap />
                <div style={{ textAlign: "center", marginTop: 4 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: 0.6 }}>{t.academyLabel}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>{t.academySubLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ ACF TRUST™ ━━━ */}
      <section id="levels" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>{t.trustSectionLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              ACF TRUST<span style={{ color: C.gold }}>™</span>
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              {t.trustDesc}<strong style={{ color: "#fff" }}>{t.trustDescStrong}</strong>
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { level: t.trustL1.level, name: t.trustL1.name, color: "#22c55e", colorLight: "#4ade80", glowColor: "rgba(34,197,94,.15)", desc: t.trustL1.desc, items: t.trustL1.items, tagline: t.trustL1.tagline },
              { level: t.trustL2.level, name: t.trustL2.name, color: "#c9a84c", colorLight: "#e8c96a", glowColor: "rgba(201,168,76,.15)", desc: t.trustL2.desc, items: t.trustL2.items, tagline: t.trustL2.tagline },
              { level: t.trustL3.level, name: t.trustL3.name, color: "#3b82f6", colorLight: "#60a5fa", glowColor: "rgba(59,130,246,.15)", desc: t.trustL3.desc, items: t.trustL3.items, tagline: t.trustL3.tagline },
            ].map((tr: any) => (
              <div key={tr.name} style={{
                background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: "32px 28px 28px",
                position: "relative", transition: "all .4s cubic-bezier(.16,1,.3,1)", textAlign: "center", overflow: "hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${tr.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${tr.glowColor}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <TrustShield name={tr.name} color={tr.color} colorLight={tr.colorLight} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: tr.colorLight, letterSpacing: ".14em" }}>{tr.level}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{tr.name}</h3>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>{tr.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, textAlign: "left" }}>
                  {tr.items.map((item: any) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}>
                      <span style={{ color: tr.colorLight, fontSize: 11 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 12, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: tr.colorLight, fontStyle: "italic" }}>{tr.tagline}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <p style={{ fontSize: 12, color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>{t.trustFooter}</p>
          </div>
        </div>
      </section>

      {/* ━━━ WHAT ACF TRUST GUARANTEES ━━━ */}
      <section id="process" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.guaranteeLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              {t.guaranteeTitle1}<span style={{ color: C.gold }}>{t.guaranteeTitle2}</span>
            </h2>
            <p style={{ fontSize: 14, color: C.gray2, maxWidth: 500, margin: "0 auto" }}>{t.guaranteeSubtitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, maxWidth: 900, margin: "0 auto" }}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: t.guaranteeItems[0] },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, label: t.guaranteeItems[1] },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, label: t.guaranteeItems[2] },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, label: t.guaranteeItems[3] },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>, label: t.guaranteeItems[4] },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: t.guaranteeItems[5] },
            ].map((g: any) => (
              <div key={g.label} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: "20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{g.icon}</div>
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
            <SectionLabel>{t.certifiedLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              ACF <span style={{ color: C.gold }}>CERTIFIED</span>
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              {t.certifiedDesc}<strong style={{ color: "#fff" }}>{t.certifiedDescStrong}</strong>
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { tier: t.practitioner.tier, name: t.practitioner.name, badgeName: "Practitioner", color: "#22c55e", colorLight: "#4ade80", glowColor: "rgba(34,197,94,.15)", stars: 1, desc: t.practitioner.desc, youCan: t.practitioner.youCan, abilities: t.practitioner.abilities, reqLabel: t.practitioner.reqLabel, requirements: t.practitioner.requirements, tagline: t.practitioner.tagline, recommended: false, btnText: t.practitioner.btnText },
              { tier: t.consultant.tier, name: t.consultant.name, badgeName: "Consultant", color: "#c9a84c", colorLight: "#e8c96a", glowColor: "rgba(201,168,76,.15)", stars: 2, desc: t.consultant.desc, youCan: t.consultant.youCan, abilities: t.consultant.abilities, reqLabel: t.consultant.reqLabel, requirements: t.consultant.requirements, tagline: t.consultant.tagline, recommended: true, btnText: t.consultant.btnText },
              { tier: t.partner.tier, name: t.partner.name, badgeName: "Partner", color: "#3b82f6", colorLight: "#60a5fa", glowColor: "rgba(59,130,246,.15)", stars: 3, desc: t.partner.desc, youCan: t.partner.youCan, abilities: t.partner.abilities, reqLabel: t.partner.reqLabel, requirements: t.partner.requirements, tagline: t.partner.tagline, recommended: false, btnText: t.partner.btnText },
            ].map((plan: any) => (
              <div key={plan.tier} style={{
                background: plan.recommended ? C.navy2 : C.navy3,
                border: `1px solid ${plan.recommended ? C.goldBorder : C.bd1}`,
                borderRadius: 16, padding: "40px 28px 28px", position: "relative", textAlign: "center",
                transition: "all .4s cubic-bezier(.16,1,.3,1)", overflow: "visible",
                display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${plan.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${plan.glowColor}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = plan.recommended ? C.goldBorder : C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {plan.recommended && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 2, background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, fontSize: 9, fontWeight: 800, padding: "5px 16px", borderRadius: 100, letterSpacing: ".08em", whiteSpace: "nowrap" }}>{t.mostPopular}</div>
                )}
                <CertifiedShield name={plan.badgeName} color={plan.color} colorLight={plan.colorLight} stars={plan.stars} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: plan.recommended ? C.gold : C.gray, letterSpacing: ".14em", marginBottom: 8 }}>{plan.tier}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{plan.desc}</p>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: plan.colorLight, letterSpacing: ".1em", marginBottom: 8, textAlign: "left" }}>{plan.youCan}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16, textAlign: "left" }}>
                  {plan.abilities.map((a: any) => (<div key={a} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}><span style={{ color: plan.colorLight, fontSize: 11 }}>✓</span> {a}</div>))}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", marginBottom: 8, textAlign: "left" }}>{plan.reqLabel}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16, textAlign: "left" }}>
                  {plan.requirements.map((r: any) => (<div key={r} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray }}><span style={{ color: C.gray, fontSize: 10 }}>→</span> {r}</div>))}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 12, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: plan.colorLight, fontStyle: "italic" }}>{plan.tagline}</div>
                  <button className="gold-glow" style={{
                    width: "100%", padding: 12, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                    background: plan.recommended ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : C.navy2,
                    color: plan.recommended ? C.navy1 : C.gray2,
                    outline: plan.recommended ? "none" : `1px solid ${C.bd1}`,
                  }}>{plan.btnText}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ACADEMY ━━━ */}
      <section id="academy" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.academySectionLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>ACF <span style={{ color: C.gold }}>Academy</span></h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{t.academyDesc1}<br /><strong style={{ color: "#fff" }}>{t.academyDesc2}</strong></p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {[
              t.coreTrack,
              t.proTrack,
              t.execTrack,
            ].map((tk: any) => (
              <button key={tk.key} onClick={() => setActiveTrack(tk.key)} style={{
                padding: "12px 20px", borderRadius: 10, border: "none", cursor: "pointer", transition: "all .3s",
                background: activeTrack === tk.key ? C.goldDim : "transparent",
                borderWidth: 1, borderStyle: "solid", borderColor: activeTrack === tk.key ? C.goldBorder : C.bd1,
              }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: activeTrack === tk.key ? "#fff" : C.gray2, marginBottom: 2 }}>{tk.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: activeTrack === tk.key ? C.gold : C.gray, letterSpacing: ".08em" }}>{tk.sub}</div>
              </button>
            ))}
          </div>

          {activeTrack === "core" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {[t.core101, t.core102, t.core103].map((m: any) => (
                <div key={m.code} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24, transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{m.code}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{m.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                    {m.topics.map((tp: any) => (<div key={tp} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray2 }}><span style={{ color: C.gold, fontSize: 10 }}>▸</span> {tp}</div>))}
                  </div>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 10, fontSize: 12, color: C.green, fontWeight: 600 }}>🎯 {m.outcome}</div>
                </div>
              ))}
            </div>
          )}

          {activeTrack === "pro" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {[t.pro201, t.pro202, t.pro203].map((m: any) => (
                <div key={m.code} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 24, transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", marginBottom: 8 }}>{m.code}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{m.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                    {m.topics.map((tp: any) => (<div key={tp} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray2 }}><span style={{ color: C.gold, fontSize: 10 }}>▸</span> {tp}</div>))}
                  </div>
                  <div style={{ borderTop: `1px solid ${C.bd1}`, paddingTop: 10, fontSize: 12, color: C.green, fontWeight: 600 }}>🎯 {m.outcome}</div>
                </div>
              ))}
            </div>
          )}

          {activeTrack === "exec" && (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em" }}>{t.execProgramLabel}</div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{t.execProgramTitle}</h3>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.7, marginBottom: 24 }}>{t.execProgramDesc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {t.execTopics.map((tp: any) => (
                    <div key={tp} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}><span style={{ color: C.gold, fontSize: 10 }}>▸</span> {tp}</div>
                  ))}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em", marginBottom: 12 }}>{t.execDeliverablesLabel}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {t.execDeliverables.map((d: any) => (
                    <span key={d} style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 11, padding: "6px 14px", borderRadius: 8 }}>{d}</span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: C.gray, fontStyle: "italic", marginBottom: 20 }}>{t.execNote}</p>
                <button className="gold-glow" style={{ width: "100%", padding: 14, borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, transition: "all .3s" }}>{t.execBtn}</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ ECOSYSTEM ━━━ */}
      <section id="ecosystem" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionLabel>{t.ecosystemLabel}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t.ecosystemTitle1}<span style={{ color: C.gold }}>{t.ecosystemTitle2}</span></h2>
          <GoldBar />
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>{t.ecosystemDesc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600, margin: "0 auto" }}>
            {[
              { step: t.ecoSteps[0].step, label: t.ecoSteps[0].label, desc: t.ecoSteps[0].desc, color: C.green, link: `/${locale}/acf-score` },
              { step: t.ecoSteps[1].step, label: t.ecoSteps[1].label, desc: t.ecoSteps[1].desc, color: C.gold, link: "#academy" },
              { step: t.ecoSteps[2].step, label: t.ecoSteps[2].label, desc: t.ecoSteps[2].desc, color: C.amber, link: `/${locale}/acf-control` },
              { step: t.ecoSteps[3].step, label: t.ecoSteps[3].label, desc: t.ecoSteps[3].desc, color: C.blue, link: "#trust" },
              { step: t.ecoSteps[4].step, label: t.ecoSteps[4].label, desc: t.ecoSteps[4].desc, color: C.gold, link: "#certified" },
            ].map((s: any, i: number) => (
              <div key={s.step}>
                <a href={s.link} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, transition: "all .3s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}15`, border: `1px solid ${s.color}40`, flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: s.color }}>{s.step}</span>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{s.desc}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: C.gray, fontSize: 16 }}>→</span>
                </a>
                {i < 4 && (<div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><span style={{ color: C.gray, fontSize: 14 }}>↓</span></div>)}
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.gold, letterSpacing: ".1em" }}>{t.ecoBack}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ WHY THIS MATTERS ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20 }}>{t.whyTitle1}<span style={{ color: C.gold }}>{t.whyTitle2}</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 12, padding: 20, textAlign: "left" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, letterSpacing: ".1em", marginBottom: 8 }}>{t.withoutGov}</div>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>{t.withoutGovDesc}</p>
            </div>
            <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 12, padding: 20, textAlign: "left" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".1em", marginBottom: 8 }}>{t.withAcf}</div>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>{t.withAcfDesc}</p>
            </div>
          </div>
          <p style={{ fontSize: 16, color: C.gray2 }}>{t.whyBottom}<strong style={{ color: C.gold }}>{t.whyBottomStrong}</strong></p>
        </div>
      </section>

      {/* ━━━ STATS BAR ━━━ */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
          {[
            { val: 6, suf: "", label: t.statsLabels[0] },
            { val: 3, suf: "", label: t.statsLabels[1] },
            { val: 3, suf: "", label: t.statsLabels[2] },
            { val: 5, suf: "", label: t.statsLabels[3] },
          ].map((s: any) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.gold }}><AnimatedCounter end={s.val} suffix={s.suf} /></div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t.finalTitle1}<br /><span style={{ color: C.gold }}>{t.finalTitle2}</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 32px" }}>{t.finalDesc}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, border: "none", padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s" }}>{t.finalBtn1}</button>
            <button style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t.finalBtn2}</button>
            <button style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t.finalBtn3}</button>
          </div>
        </div>
      </section>

      <Footer />
      <AIAgent />
    </div>
  );
}
