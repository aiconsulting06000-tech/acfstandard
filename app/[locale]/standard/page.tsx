"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF STANDARD — THE GOVERNANCE FRAMEWORK
   Version: WOW
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.12)",
  goldBorder: "rgba(201,168,76,.18)", white: "#ffffff",
  gray: "#5a6f8a", gray2: "#8fa3be",
  bd1: "rgba(255,255,255,.06)",
  gov: "#a78bfa", pol: "#3b82f6", sys: "#06b6d4", sup: "#22c55e",
  amber: "#f59e0b", purple: "#8b5cf6",
};

/* ── Bilingual UI strings ─── */
const ui = {
  en: {
    navTitle: "ACF STANDARD",
    navSubtitle: "THE GOVERNANCE FRAMEWORK",
    navHome: "← Home",
    navFramework: "Framework",
    navArchitecture: "Architecture",
    navEcosystem: "Ecosystem",
    navBlog: "Blog",
    navCta: "Get Your Score →",
    heroBadge: "The Governance Standard",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Governing decisions in the age of autonomous systems.",
    heroCta: "Read the Framework ↓",
    shiftBadge: "The shift",
    shiftLine1: "Artificial intelligence is no longer just a tool.",
    shiftLine2: "It is becoming a decision-maker.",
    shiftP1: "Across industries, autonomous agents are now executing operational decisions in real time — pricing adjustments, procurement orders, customer engagement, logistics routing, risk assessments.",
    shiftP2pre: "These decisions happen continuously, at machine speed. And in most organizations, ",
    shiftP2bold: "no governance architecture exists to supervise them.",
    shiftP3pre: "The result is a new category of risk: ",
    shiftP3bold: "uncontrolled autonomous decision systems.",
    shiftP4: "The Agentic Commerce Framework® was created to solve this problem.",
    stmtLine1: "Autonomous systems do not create chaos.",
    stmtLine2: "Ungoverned decisions do.",
    stat1Label: "of organizations have no formal AI governance",
    stat2Label: "maximum AI Act sanctions or 7% global revenue",
    stat3Label: "lower correction costs with structured governance",
    stat4Label: "Level 1 kill switch response time (ACF spec)",
    gapBadge: "The governance gap",
    gapTitle: "Organizations spent the last decade adopting AI. Governance models never evolved.",
    gapP1: "Traditional governance assumes a simple structure: humans decide, systems execute.",
    gapP2pre: "Agentic systems invert this relationship. Machines now execute ",
    gapP2bold: "and decide",
    gapP2post: " within defined parameters.",
    gapP3: "When this shift occurs without structured governance, organizations lose visibility and control over their own operational decisions. The consequences are not theoretical:",
    gapList: ["Untraceable autonomous decisions", "Conflicting agent optimizations", "Operational drift over time", "Regulatory exposure under emerging AI regulation", "Strategic dependence on external platforms"],
    fwBadge: "The framework",
    fwTitle: "The first governance architecture for autonomous decision systems.",
    fwP1pre: "The Agentic Commerce Framework® does not control AI models. It governs the ",
    fwP1bold: "decisions",
    fwP1post: " they execute.",
    fwP2: "The framework defines how organizations:",
    fwList: ["Structure decision authority", "Define non-delegable zones", "Constrain autonomous behavior", "Maintain real-time oversight", "Preserve human sovereignty over critical actions"],
    fwP3: "ACF creates a structured decision governance layer between human leadership and machine execution.",
    compWithout: "WITHOUT GOVERNANCE",
    compWith: "WITH ACF® GOVERNANCE",
    compWithoutLabels: ["Opacity", "Drift", "Conflict", "Exposure"],
    compWithLabels: ["Traceable", "Reversible", "Accountable", "Sovereign"],
    compWithoutSvg: "UNCONTROLLED DECISIONS",
    compWithSvg: "GOVERNED DECISIONS",
    archBadge: "Architecture",
    archTitle: "A four-layer governance architecture.",
    archSubtitle: "Together they create a continuous control system for autonomous operations.",
    archL1Name: "Governance",
    archL1Sub: "Who holds authority",
    archL1Text: "The governance layer establishes decision sovereignty. Organizations define who retains final authority, which decisions can be delegated, which remain exclusively human. At this level, companies formalize their Agentic Constitution — the foundational document establishing the principles of AI governance.",
    archL2Name: "Policy",
    archL2Sub: "What agents are allowed to do",
    archL2Text: "Policy defines the behavioral boundaries of autonomous systems. It translates governance principles into operational rules — financial thresholds, time-based constraints, ethical limits, sector-specific regulatory policies. Policies ensure that agents operate within clearly defined decision boundaries.",
    archL3Name: "System",
    archL3Sub: "How decisions are executed",
    archL3Text: "The system layer governs the technical execution environment. Every autonomous action remains observable, interruptible and auditable — through decision traceability, multi-agent coordination, and layered kill-switch mechanisms. The objective is not to slow agents down. It is to ensure they remain governable at machine speed.",
    archL4Name: "Supervision",
    archL4Sub: "How organizations maintain continuous oversight",
    archL4Text: "Governance is not a one-time configuration. It is an ongoing operational discipline. The supervision layer introduces continuous monitoring, incident response and governance reviews. Supervision ensures that agent systems evolve without eroding control.",
    centralLine1: "AI automates execution.",
    centralLine2: "ACF governs decisions.",
    centralP: "Without governance, autonomous systems create opacity. With governance, they become scalable instruments of strategic control.",
    loopBadge: "Operational discipline",
    loopTitle: "The Agent Governance Loop",
    loopSubtitle: "Governance is not configuration. It is a continuous operational loop — define, constrain, execute, monitor, intervene, improve. Then loop again.",
    ecoBadge: "The ecosystem",
    ecoTitle: "ACF Operating System",
    ecoSubtitle: "Five integrated tools. One closed-loop system. Diagnose → Train → Monitor → Certify → Scale.",
    ecoScore: "Rapid diagnostic measuring decision sovereignty and governance maturity.",
    ecoControl: "Real-time platform for supervising autonomous systems.",
    ecoAcademy: "Training for executives and operators governing autonomous systems.",
    ecoCert: "ACF TRUST™ and ACF CERTIFIED labels validating governance maturity.",
    questionBadge: "A new operational discipline",
    questionP1: "The transition to autonomous systems is not a technology shift. It is a governance shift.",
    questionP2: "Organizations must evolve from managing software to governing decision systems.",
    questionP3: "The Agentic Commerce Framework® provides the structure required to do so.",
    questionPre: "Because in the age of autonomous systems,\nthe most important question is no longer:",
    questionOld: "\"What can AI do?\"",
    questionNew1: "\"Who governs the decisions ",
    questionNew2: "it makes",
    questionNew3: "?\"",
    ctaAssess: "Assess your governance →",
    ctaResearch: "Read the research",
    // SVG text in HeroVisualization
    svgHumanAuthority: "HUMAN AUTHORITY",
    svgHumanAuthoritySub: "Leadership · Strategy · Accountability",
    svgL1: "GOVERNANCE",
    svgL1Sub: "Who decides · Authority · Constitution",
    svgL2: "POLICY",
    svgL2Sub: "Rules · Constraints · Ethical guardrails",
    svgL3: "SYSTEM",
    svgL3Sub: "Agents · Traceability · Kill switch",
    svgL4: "SUPERVISION",
    svgL4Sub: "Monitoring · Incidents · Sovereignty",
    svgMachineSpeed: "MACHINE-SPEED EXECUTION",
    // GovernanceLoopSVG
    loopDefine: "DEFINE", loopDefineSub: "Authority",
    loopConstrain: "CONSTRAIN", loopConstrainSub: "Rules",
    loopExecute: "EXECUTE", loopExecuteSub: "Agents",
    loopMonitor: "MONITOR", loopMonitorSub: "Drift",
    loopIntervene: "INTERVENE", loopInterveneSub: "Override",
    loopImprove: "IMPROVE", loopImproveSub: "Evolve",
    loopCenter1: "CONTINUOUS",
    loopCenter2: "LOOP",
    // EcosystemFlowSVG
    ecoFlowScore: "Score", ecoFlowScoreAction: "Diagnose",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Train",
    ecoFlowControl: "Control", ecoFlowControlAction: "Monitor",
    ecoFlowCert: "Certification", ecoFlowCertAction: "Certify",
    ecoFlowPartners: "Partners", ecoFlowPartnersAction: "Scale",
    ecoFlowClosedLoop: "CLOSED LOOP",
  },
  fr: {
    navTitle: "ACF STANDARD",
    navSubtitle: "LE CADRE DE GOUVERNANCE",
    navHome: "← Accueil",
    navFramework: "Framework",
    navArchitecture: "Architecture",
    navEcosystem: "Écosystème",
    navBlog: "Blog",
    navCta: "Votre Score →",
    heroBadge: "Le standard de gouvernance",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Gouverner les décisions à l'ère des systèmes autonomes.",
    heroCta: "Lire le framework ↓",
    shiftBadge: "Le tournant",
    shiftLine1: "L'intelligence artificielle n'est plus un simple outil.",
    shiftLine2: "Elle devient un décideur.",
    shiftP1: "Dans tous les secteurs, des agents autonomes exécutent désormais des décisions opérationnelles en temps réel — ajustements de prix, commandes d'approvisionnement, engagement client, routage logistique, évaluations des risques.",
    shiftP2pre: "Ces décisions se produisent en continu, à la vitesse des machines. Et dans la plupart des organisations, ",
    shiftP2bold: "aucune architecture de gouvernance n'existe pour les superviser.",
    shiftP3pre: "Le résultat est une nouvelle catégorie de risque : ",
    shiftP3bold: "des systèmes de décision autonomes non contrôlés.",
    shiftP4: "L'Agentic Commerce Framework® a été créé pour résoudre ce problème.",
    stmtLine1: "Les systèmes autonomes ne créent pas le chaos.",
    stmtLine2: "Les décisions non gouvernées, si.",
    stat1Label: "des organisations n'ont aucune gouvernance IA formelle",
    stat2Label: "sanctions maximales AI Act ou 7 % du CA mondial",
    stat3Label: "coûts de correction réduits avec une gouvernance structurée",
    stat4Label: "temps de réponse du kill switch Niveau 1 (spéc. ACF)",
    gapBadge: "Le déficit de gouvernance",
    gapTitle: "Les organisations ont passé la dernière décennie à adopter l'IA. Les modèles de gouvernance n'ont jamais évolué.",
    gapP1: "La gouvernance traditionnelle repose sur une structure simple : les humains décident, les systèmes exécutent.",
    gapP2pre: "Les systèmes agentiques inversent cette relation. Les machines exécutent désormais ",
    gapP2bold: "et décident",
    gapP2post: " dans des paramètres définis.",
    gapP3: "Lorsque ce basculement se produit sans gouvernance structurée, les organisations perdent la visibilité et le contrôle sur leurs propres décisions opérationnelles. Les conséquences ne sont pas théoriques :",
    gapList: ["Décisions autonomes intraçables", "Optimisations conflictuelles entre agents", "Dérive opérationnelle dans le temps", "Exposition réglementaire face aux réglementations IA émergentes", "Dépendance stratégique envers des plateformes externes"],
    fwBadge: "Le framework",
    fwTitle: "La première architecture de gouvernance pour les systèmes de décision autonomes.",
    fwP1pre: "L'Agentic Commerce Framework® ne contrôle pas les modèles d'IA. Il gouverne les ",
    fwP1bold: "décisions",
    fwP1post: " qu'ils exécutent.",
    fwP2: "Le framework définit comment les organisations :",
    fwList: ["Structurent l'autorité décisionnelle", "Définissent les zones non déléguables", "Encadrent le comportement autonome", "Maintiennent une supervision en temps réel", "Préservent la souveraineté humaine sur les actions critiques"],
    fwP3: "ACF crée une couche structurée de gouvernance décisionnelle entre le leadership humain et l'exécution machine.",
    compWithout: "SANS GOUVERNANCE",
    compWith: "AVEC LA GOUVERNANCE ACF®",
    compWithoutLabels: ["Opacité", "Dérive", "Conflit", "Exposition"],
    compWithLabels: ["Traçable", "Réversible", "Responsable", "Souverain"],
    compWithoutSvg: "DÉCISIONS NON CONTRÔLÉES",
    compWithSvg: "DÉCISIONS GOUVERNÉES",
    archBadge: "Architecture",
    archTitle: "Une architecture de gouvernance en quatre couches.",
    archSubtitle: "Ensemble, elles créent un système de contrôle continu pour les opérations autonomes.",
    archL1Name: "Gouvernance",
    archL1Sub: "Qui détient l'autorité",
    archL1Text: "La couche de gouvernance établit la souveraineté décisionnelle. Les organisations définissent qui conserve l'autorité finale, quelles décisions peuvent être déléguées, lesquelles restent exclusivement humaines. À ce niveau, les entreprises formalisent leur constitution agentique — le document fondateur établissant les principes de la gouvernance IA.",
    archL2Name: "Politique",
    archL2Sub: "Ce que les agents sont autorisés à faire",
    archL2Text: "La politique définit les limites comportementales des systèmes autonomes. Elle traduit les principes de gouvernance en règles opérationnelles — seuils financiers, contraintes temporelles, limites éthiques, politiques réglementaires sectorielles. Les politiques garantissent que les agents opèrent dans des périmètres décisionnels clairement définis.",
    archL3Name: "Système",
    archL3Sub: "Comment les décisions sont exécutées",
    archL3Text: "La couche système gouverne l'environnement d'exécution technique. Chaque action autonome reste observable, interruptible et auditable — grâce à la traçabilité des décisions, la coordination multi-agents et les mécanismes de kill switch à plusieurs niveaux. L'objectif n'est pas de ralentir les agents. C'est de s'assurer qu'ils restent gouvernables à la vitesse machine.",
    archL4Name: "Supervision",
    archL4Sub: "Comment les organisations maintiennent une surveillance continue",
    archL4Text: "La gouvernance n'est pas une configuration ponctuelle. C'est une discipline opérationnelle continue. La couche de supervision introduit la surveillance continue, la réponse aux incidents et les revues de gouvernance. La supervision garantit que les systèmes d'agents évoluent sans éroder le contrôle.",
    centralLine1: "L'IA automatise l'exécution.",
    centralLine2: "ACF gouverne les décisions.",
    centralP: "Sans gouvernance, les systèmes autonomes créent de l'opacité. Avec une gouvernance, ils deviennent des instruments évolutifs de contrôle stratégique.",
    loopBadge: "Discipline opérationnelle",
    loopTitle: "La boucle de gouvernance des agents",
    loopSubtitle: "La gouvernance n'est pas une configuration. C'est une boucle opérationnelle continue — définir, encadrer, exécuter, surveiller, intervenir, améliorer. Puis recommencer.",
    ecoBadge: "L'écosystème",
    ecoTitle: "Système opérationnel ACF",
    ecoSubtitle: "Cinq outils intégrés. Un système en boucle fermée. Diagnostiquer → Former → Surveiller → Certifier → Déployer.",
    ecoScore: "Diagnostic rapide mesurant la souveraineté décisionnelle et la maturité de gouvernance.",
    ecoControl: "Plateforme temps réel pour la supervision des systèmes autonomes.",
    ecoAcademy: "Formation pour les dirigeants et opérateurs gouvernant les systèmes autonomes.",
    ecoCert: "Labels ACF TRUST™ et ACF CERTIFIED validant la maturité de gouvernance.",
    questionBadge: "Une nouvelle discipline opérationnelle",
    questionP1: "La transition vers les systèmes autonomes n'est pas un changement technologique. C'est un changement de gouvernance.",
    questionP2: "Les organisations doivent passer de la gestion de logiciels à la gouvernance de systèmes décisionnels.",
    questionP3: "L'Agentic Commerce Framework® fournit la structure nécessaire pour y parvenir.",
    questionPre: "Car à l'ère des systèmes autonomes,\nla question la plus importante n'est plus :",
    questionOld: "« Que peut faire l'IA ? »",
    questionNew1: "« Qui gouverne les décisions ",
    questionNew2: "qu'elle prend",
    questionNew3: " ? »",
    ctaAssess: "Évaluez votre gouvernance →",
    ctaResearch: "Lire la recherche",
    // SVG text in HeroVisualization
    svgHumanAuthority: "AUTORITÉ HUMAINE",
    svgHumanAuthoritySub: "Leadership · Stratégie · Responsabilité",
    svgL1: "GOUVERNANCE",
    svgL1Sub: "Qui décide · Autorité · Constitution",
    svgL2: "POLITIQUE",
    svgL2Sub: "Règles · Contraintes · Garde-fous éthiques",
    svgL3: "SYSTÈME",
    svgL3Sub: "Agents · Traçabilité · Kill switch",
    svgL4: "SUPERVISION",
    svgL4Sub: "Surveillance · Incidents · Souveraineté",
    svgMachineSpeed: "EXÉCUTION MACHINE",
    // GovernanceLoopSVG
    loopDefine: "DÉFINIR", loopDefineSub: "Autorité",
    loopConstrain: "ENCADRER", loopConstrainSub: "Règles",
    loopExecute: "EXÉCUTER", loopExecuteSub: "Agents",
    loopMonitor: "SURVEILLER", loopMonitorSub: "Dérive",
    loopIntervene: "INTERVENIR", loopInterveneSub: "Reprise",
    loopImprove: "AMÉLIORER", loopImproveSub: "Évoluer",
    loopCenter1: "BOUCLE",
    loopCenter2: "CONTINUE",
    // EcosystemFlowSVG
    ecoFlowScore: "Score", ecoFlowScoreAction: "Diagnostiquer",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Former",
    ecoFlowControl: "Control", ecoFlowControlAction: "Surveiller",
    ecoFlowCert: "Certification", ecoFlowCertAction: "Certifier",
    ecoFlowPartners: "Partenaires", ecoFlowPartnersAction: "Déployer",
    ecoFlowClosedLoop: "BOUCLE FERMÉE",
  },
};

type UiStrings = typeof ui.en;

/* ── Scroll-triggered reveal ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s, transform .8s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

/* ── Animated counter for stats ─── */
function AnimatedStat({ value, prefix = "", suffix = "", duration = 1800 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const { ref, vis } = useReveal(0.3);
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!vis || started.current) return;
    started.current = true;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (current >= steps) { setCount(value); clearInterval(timer); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [vis, value, duration]);
  return <span ref={ref}>{prefix}{vis ? count : 0}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════
   HERO ANIMATED VISUALIZATION — The signature visual
   4 layers floating with pulsing energy lines between them
   ══════════════════════════════════════════════════════════ */
function HeroVisualization({ t }: { t: UiStrings }) {
  return (
    <svg viewBox="0 0 400 480" fill="none" style={{ width: "100%", maxWidth: 460, height: "auto" }}>
      <defs>
        <linearGradient id="g-gov" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.gov} stopOpacity=".8" /><stop offset="100%" stopColor={C.gov} stopOpacity=".2" /></linearGradient>
        <linearGradient id="g-pol" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.pol} stopOpacity=".8" /><stop offset="100%" stopColor={C.pol} stopOpacity=".2" /></linearGradient>
        <linearGradient id="g-sys" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.sys} stopOpacity=".8" /><stop offset="100%" stopColor={C.sys} stopOpacity=".2" /></linearGradient>
        <linearGradient id="g-sup" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.sup} stopOpacity=".8" /><stop offset="100%" stopColor={C.sup} stopOpacity=".2" /></linearGradient>
        <filter id="glow-gov"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="glow-pol"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="glow-sys"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="glow-sup"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <linearGradient id="line-pulse" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.gold} stopOpacity="0" /><stop offset="50%" stopColor={C.gold} stopOpacity=".6" /><stop offset="100%" stopColor={C.gold} stopOpacity="0" /></linearGradient>
      </defs>

      {/* Background circles */}
      <circle cx="200" cy="240" r="200" fill="none" stroke={C.gold} strokeWidth=".3" opacity=".1">
        <animateTransform attributeName="transform" type="rotate" values="0 200 240;360 200 240" dur="120s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="240" r="150" fill="none" stroke={C.gold} strokeWidth=".3" opacity=".08" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="rotate" values="360 200 240;0 200 240" dur="90s" repeatCount="indefinite" />
      </circle>

      {/* HUMAN AUTHORITY label */}
      <text x="200" y="32" textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="11" fontWeight="700" fill="#fff" opacity=".5" letterSpacing="2">{t.svgHumanAuthority}</text>
      <text x="200" y="48" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="8" fill={C.gray} opacity=".5">{t.svgHumanAuthoritySub}</text>

      {/* Energy line from top */}
      <line x1="200" y1="58" x2="200" y2="85" stroke="url(#line-pulse)" strokeWidth="1.5">
        <animate attributeName="opacity" values=".2;.8;.2" dur="2s" repeatCount="indefinite" />
      </line>

      {/* Layer 1 — Governance */}
      <g filter="url(#glow-gov)">
        <rect x="60" y="88" width="280" height="64" rx="14" fill={C.navy3} stroke="url(#g-gov)" strokeWidth="1.2">
          <animate attributeName="stroke-opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite" />
        </rect>
        <text x="88" y="116" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.gov} opacity=".6" fontWeight="600">L1</text>
        <text x="112" y="116" fontFamily="'Space Grotesk'" fontSize="14" fill={C.gov} fontWeight="700">{t.svgL1}</text>
        <text x="112" y="136" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.gray2} opacity=".7">{t.svgL1Sub}</text>
      </g>

      {/* Pulse line */}
      <line x1="200" y1="152" x2="200" y2="178" stroke="url(#line-pulse)" strokeWidth="1.5">
        <animate attributeName="opacity" values=".2;.8;.2" dur="2s" begin=".5s" repeatCount="indefinite" />
      </line>

      {/* Layer 2 — Policy */}
      <g filter="url(#glow-pol)">
        <rect x="60" y="180" width="280" height="64" rx="14" fill={C.navy3} stroke="url(#g-pol)" strokeWidth="1.2">
          <animate attributeName="stroke-opacity" values=".5;1;.5" dur="3s" begin=".5s" repeatCount="indefinite" />
        </rect>
        <text x="88" y="208" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.pol} opacity=".6" fontWeight="600">L2</text>
        <text x="112" y="208" fontFamily="'Space Grotesk'" fontSize="14" fill={C.pol} fontWeight="700">{t.svgL2}</text>
        <text x="112" y="228" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.gray2} opacity=".7">{t.svgL2Sub}</text>
      </g>

      {/* Pulse line */}
      <line x1="200" y1="244" x2="200" y2="270" stroke="url(#line-pulse)" strokeWidth="1.5">
        <animate attributeName="opacity" values=".2;.8;.2" dur="2s" begin="1s" repeatCount="indefinite" />
      </line>

      {/* Layer 3 — System */}
      <g filter="url(#glow-sys)">
        <rect x="60" y="272" width="280" height="64" rx="14" fill={C.navy3} stroke="url(#g-sys)" strokeWidth="1.2">
          <animate attributeName="stroke-opacity" values=".5;1;.5" dur="3s" begin="1s" repeatCount="indefinite" />
        </rect>
        <text x="88" y="300" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.sys} opacity=".6" fontWeight="600">L3</text>
        <text x="112" y="300" fontFamily="'Space Grotesk'" fontSize="14" fill={C.sys} fontWeight="700">{t.svgL3}</text>
        <text x="112" y="320" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.gray2} opacity=".7">{t.svgL3Sub}</text>
      </g>

      {/* Pulse line */}
      <line x1="200" y1="336" x2="200" y2="362" stroke="url(#line-pulse)" strokeWidth="1.5">
        <animate attributeName="opacity" values=".2;.8;.2" dur="2s" begin="1.5s" repeatCount="indefinite" />
      </line>

      {/* Layer 4 — Supervision */}
      <g filter="url(#glow-sup)">
        <rect x="60" y="364" width="280" height="64" rx="14" fill={C.navy3} stroke="url(#g-sup)" strokeWidth="1.2">
          <animate attributeName="stroke-opacity" values=".5;1;.5" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </rect>
        <text x="88" y="392" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.sup} opacity=".6" fontWeight="600">L4</text>
        <text x="112" y="392" fontFamily="'Space Grotesk'" fontSize="14" fill={C.sup} fontWeight="700">{t.svgL4}</text>
        <text x="112" y="412" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.gray2} opacity=".7">{t.svgL4Sub}</text>
      </g>

      {/* Energy line to bottom */}
      <line x1="200" y1="428" x2="200" y2="454" stroke="url(#line-pulse)" strokeWidth="1.5">
        <animate attributeName="opacity" values=".2;.8;.2" dur="2s" begin="2s" repeatCount="indefinite" />
      </line>

      {/* MACHINE-SPEED EXECUTION label */}
      <text x="200" y="470" textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="11" fontWeight="700" fill="#fff" opacity=".5" letterSpacing="2">{t.svgMachineSpeed}</text>

      {/* Floating particles */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <circle key={i} cx={60 + (i * 40)} cy={240} r="1.5" fill={C.gold} opacity="0">
          <animate attributeName="opacity" values="0;.5;0" dur={`${2.5 + i * 0.4}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values={`${200 + i * 15};${180 + i * 10};${200 + i * 15}`} dur={`${3 + i * 0.3}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   GOVERNANCE LOOP — Animated hexagonal loop
   ══════════════════════════════════════════════════════════ */
function GovernanceLoopSVG({ t }: { t: UiStrings }) {
  const { ref, vis } = useReveal();
  const steps = [
    { label: t.loopDefine, sub: t.loopDefineSub, color: C.gov, angle: -90 },
    { label: t.loopConstrain, sub: t.loopConstrainSub, color: C.pol, angle: -30 },
    { label: t.loopExecute, sub: t.loopExecuteSub, color: C.sys, angle: 30 },
    { label: t.loopMonitor, sub: t.loopMonitorSub, color: C.sup, angle: 90 },
    { label: t.loopIntervene, sub: t.loopInterveneSub, color: C.amber, angle: 150 },
    { label: t.loopImprove, sub: t.loopImproveSub, color: C.gold, angle: 210 },
  ];
  const cx = 200, cy = 200, r = 140;
  return (
    <div ref={ref} style={{ maxWidth: 560, margin: "48px auto", opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(.9)", transition: "all .9s cubic-bezier(.16,1,.3,1)" }}>
      <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%" }}>
        <defs>
          <filter id="loop-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        {/* Outer rotating ring */}
        <circle cx={cx} cy={cy} r={r + 30} fill="none" stroke={C.gold} strokeWidth=".4" opacity=".1" strokeDasharray="3 9">
          <animateTransform attributeName="transform" type="rotate" values="0 200 200;360 200 200" dur="60s" repeatCount="indefinite" />
        </circle>

        {/* Connecting lines between nodes */}
        {steps.map((s, i) => {
          const next = steps[(i + 1) % steps.length];
          const x1 = cx + r * Math.cos((s.angle * Math.PI) / 180);
          const y1 = cy + r * Math.sin((s.angle * Math.PI) / 180);
          const x2 = cx + r * Math.cos((next.angle * Math.PI) / 180);
          const y2 = cy + r * Math.sin((next.angle * Math.PI) / 180);
          return (
            <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={s.color} strokeWidth="1" opacity=".2">
              <animate attributeName="opacity" values=".1;.4;.1" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </line>
          );
        })}

        {/* Animated pulse traveling the loop */}
        <circle r="3" fill={C.gold} opacity=".7" filter="url(#loop-glow)">
          <animateMotion dur="6s" repeatCount="indefinite" path={`M ${cx + r * Math.cos((-90 * Math.PI) / 180)} ${cy + r * Math.sin((-90 * Math.PI) / 180)} ${steps.map((s, i) => {
            const next = steps[(i + 1) % steps.length];
            return `L ${cx + r * Math.cos((next.angle * Math.PI) / 180)} ${cy + r * Math.sin((next.angle * Math.PI) / 180)}`;
          }).join(" ")} Z`} />
        </circle>

        {/* Nodes */}
        {steps.map((s, i) => {
          const x = cx + r * Math.cos((s.angle * Math.PI) / 180);
          const y = cy + r * Math.sin((s.angle * Math.PI) / 180);
          return (
            <g key={s.label}>
              <circle cx={x} cy={y} r="28" fill={C.navy3} stroke={s.color} strokeWidth="1.2">
                <animate attributeName="stroke-opacity" values=".4;1;.4" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </circle>
              <text x={x} y={y - 4} textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="9" fontWeight="700" fill={s.color}>{s.label}</text>
              <text x={x} y={y + 8} textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="7" fill={C.gray2} opacity=".7">{s.sub}</text>
            </g>
          );
        })}

        {/* Center label */}
        <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="11" fontWeight="800" fill={C.gold} opacity=".6">ACF®</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="7" fill={C.gray} opacity=".5">{t.loopCenter1}</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="7" fill={C.gray} opacity=".5">{t.loopCenter2}</text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ECOSYSTEM FLOW — Animated horizontal pipeline
   ══════════════════════════════════════════════════════════ */
function EcosystemFlowSVG({ t }: { t: UiStrings }) {
  const { ref, vis } = useReveal();
  const products = [
    { name: t.ecoFlowScore, action: t.ecoFlowScoreAction, color: C.sup, icon: "◉" },
    { name: t.ecoFlowAcademy, action: t.ecoFlowAcademyAction, color: C.pol, icon: "◈" },
    { name: t.ecoFlowControl, action: t.ecoFlowControlAction, color: C.amber, icon: "◎" },
    { name: t.ecoFlowCert, action: t.ecoFlowCertAction, color: C.gold, icon: "◆" },
    { name: t.ecoFlowPartners, action: t.ecoFlowPartnersAction, color: C.gov, icon: "◇" },
  ];
  return (
    <div ref={ref} style={{ maxWidth: 920, margin: "48px auto", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1)" }}>
      <svg viewBox="0 0 780 160" fill="none" style={{ width: "100%" }}>
        {/* Connecting line */}
        <line x1="70" y1="70" x2="710" y2="70" stroke={C.gold} strokeWidth=".8" opacity=".15" />
        {/* Animated pulse on line */}
        <circle r="4" fill={C.gold} opacity=".5">
          <animate attributeName="cx" values="70;710;70" dur="5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="70;70;70" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".2;.7;.2" dur="5s" repeatCount="indefinite" />
        </circle>

        {products.map((p, i) => {
          const x = 70 + i * 160;
          return (
            <g key={p.name}>
              <circle cx={x} cy="70" r="32" fill={C.navy3} stroke={p.color} strokeWidth="1.4">
                <animate attributeName="stroke-opacity" values=".4;.9;.4" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <text x={x} y="74" textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="16" fontWeight="700" fill={p.color}>{p.icon}</text>
              <text x={x} y="118" textAnchor="middle" fontFamily="'Space Grotesk'" fontSize="13" fontWeight="700" fill="#fff" opacity=".8">{p.name}</text>
              <text x={x} y="136" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="10" fill={C.gray}>{p.action}</text>
              {i < 4 && (
                <text x={x + 80} y="74" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="14" fill={C.gold} opacity=".3">→</text>
              )}
            </g>
          );
        })}
        {/* Loop-back arrow */}
        <path d="M 720 70 Q 750 70 750 40 Q 750 10 390 10 Q 30 10 30 40 Q 30 70 60 70" fill="none" stroke={C.gold} strokeWidth=".8" opacity=".15" strokeDasharray="4 6" />
        <text x="390" y="8" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="9" fill={C.gray} opacity=".5">{t.ecoFlowClosedLoop}</text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */
export default function TheStandardPage() {
  const locale = useLocale();
  const lang = locale === "fr" ? "fr" : "en";
  const t = ui[lang];
  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes heroEntry{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gridFloat{0%{background-position:0 0}100%{background-position:80px 80px}}
        .hero-anim{opacity:0;animation:heroEntry 1s cubic-bezier(.16,1,.3,1) forwards}
        .hero-d1{animation-delay:.2s}
        .hero-d2{animation-delay:.45s}
        .hero-d3{animation-delay:.7s}
        .hero-d4{animation-delay:1s}
        .gold-glow:hover{box-shadow:0 0 28px rgba(201,168,76,.18)}
        *{box-sizing:border-box;margin:0;padding:0}a{text-decoration:none;color:inherit}
        ::selection{background:rgba(201,168,76,.3);color:#fff}
        @media(max-width:900px){.hero-grid{grid-template-columns:1fr!important}.hide-mobile{display:none!important}.eco-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.88)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href={`/${locale}/`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>{t.navTitle}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t.navSubtitle}</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href={`/${locale}/`} className="hide-mobile" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t.navHome}</a>
            {[{ label: t.navFramework, href: "#framework" }, { label: t.navArchitecture, href: "#architecture" }, { label: t.navEcosystem, href: "#ecosystem" }, { label: t.navBlog, href: `/${locale}/blog` }].map(l => (
              <a key={l.label} href={l.href} className="hide-mobile" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>
            ))}
            <a href="https://www.acf-score.com/" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "inline-block" }}>{t.navCta}</a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════
           HERO — Split layout: manifesto + animated diagram
         ═══════════════════════════════════════════════ */}
      <section style={{ paddingTop: 120, paddingBottom: 40, position: "relative", overflow: "hidden" }}>
        {/* Animated grid background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.02) 1px,transparent 1px)", backgroundSize: "80px 80px", animation: "gridFloat 20s linear infinite", maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%,black 20%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%,black 20%,transparent 100%)" }} />

        <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 460px", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
          {/* LEFT — Text */}
          <div>
            <div className="hero-anim hero-d1" style={{ marginBottom: 28 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.heroBadge}</span>
            </div>
            <h1 className="hero-anim hero-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 54, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-2px", marginBottom: 28 }}>
              {t.heroTitle1}<br /><span style={{ color: C.gold }}>{t.heroTitle2}</span>
            </h1>
            <p className="hero-anim hero-d3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 21, color: C.gray2, lineHeight: 1.55, maxWidth: 500, marginBottom: 36, fontWeight: 400 }}>
              {t.heroSubtitle}
            </p>
            <div className="hero-anim hero-d4" style={{ display: "flex", gap: 14 }}>
              <a href="#framework" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, transition: "all .3s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t.heroCta}</a>
            </div>
          </div>

          {/* RIGHT — Animated Governance Stack */}
          <div className="hero-anim hero-d3 hide-mobile">
            <HeroVisualization t={t} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           THE SHIFT — Cinematic prose
         ═══════════════════════════════════════════════ */}
      <section id="framework" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 40 }}>// {t.shiftBadge}</div></Reveal>

          <Reveal delay={0.1}><p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, lineHeight: 1.3, color: "#fff", marginBottom: 48, letterSpacing: "-.5px" }}>{t.shiftLine1}</p></Reveal>

          <Reveal delay={0.15}><p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, lineHeight: 1.3, color: C.gold, marginBottom: 48, letterSpacing: "-.5px" }}>{t.shiftLine2}</p></Reveal>

          <Reveal delay={0.1}>
            <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>
              {t.shiftP1}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>
              {t.shiftP2pre}<strong style={{ color: "#fff" }}>{t.shiftP2bold}</strong>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>
              {t.shiftP3pre}<strong style={{ color: C.gold }}>{t.shiftP3bold}</strong>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9 }}>
              {t.shiftP4}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           STATEMENT — Full-width breathing pause
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: C.gray, lineHeight: 1.4, marginBottom: 16 }}>{t.stmtLine1}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>{t.stmtLine2}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           ANIMATED STATS — Visual impact moment
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2, position: "relative", overflow: "hidden" }}>
        {/* Animated horizontal scan line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity: 0.15 }}>
          <div style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, animation: "scanLine 4s linear infinite" }} />
        </div>
        <style>{`@keyframes scanLine{0%{left:-50%}100%{left:150%}}`}</style>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
            {[
              { value: 73, suffix: "%", prefix: "", label: t.stat1Label, color: C.gold },
              { value: 35, suffix: "M", prefix: "€", label: t.stat2Label, color: C.amber },
              { value: 4, suffix: "x", prefix: "", label: t.stat3Label, color: C.sup },
              { value: 1, suffix: "s", prefix: "<", label: t.stat4Label, color: C.sys },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div style={{ padding: "20px 0" }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 38, fontWeight: 800, color: s.color, marginBottom: 8, letterSpacing: "-1px" }}>
                    <AnimatedStat value={s.value} prefix={s.prefix} suffix={s.suffix} duration={s.value > 10 ? 1800 : 1200} />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray2, letterSpacing: ".04em", lineHeight: 1.5 }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           THE GOVERNANCE GAP
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24 }}>// {t.gapBadge}</div></Reveal>

          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: 32 }}>{t.gapTitle}</h2></Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>{t.gapP1}</p></Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>{t.gapP2pre}<strong style={{ color: "#fff" }}>{t.gapP2bold}</strong>{t.gapP2post}</p></Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 32 }}>{t.gapP3}</p></Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, paddingLeft: 4 }}>
              {t.gapList.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ color: C.gray, fontSize: 14, marginTop: 3, flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           INTRODUCING ACF
         ═══════════════════════════════════════════════ */}
      <section id="principles" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24 }}>// {t.fwBadge}</div></Reveal>

          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: 32 }}>{t.fwTitle}</h2></Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>{t.fwP1pre}<strong style={{ color: "#fff" }}>{t.fwP1bold}</strong>{t.fwP1post}</p></Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>{t.fwP2}</p></Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {t.fwList.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.gold, fontSize: 12, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9 }}>{t.fwP3}</p></Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           VISUAL COMPARISON — Without vs With governance
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
              {/* WITHOUT */}
              <div style={{ position: "relative", background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 20, padding: "40px 36px", overflow: "hidden" }}>
                {/* Animated noise lines */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08 }}>
                  {[0,1,2,3,4].map(i => (
                    <div key={i} style={{ position: "absolute", top: `${15 + i * 18}%`, left: 0, right: 0, height: 1, background: "#ef4444" }}>
                      <div style={{ position: "absolute", top: 0, width: "30%", height: "100%", background: "#ef4444", animation: `noiseLine ${2 + i * 0.5}s linear infinite`, animationDelay: `${i * 0.3}s` }} />
                    </div>
                  ))}
                </div>
                <style>{`@keyframes noiseLine{0%{left:-30%}100%{left:130%}}`}</style>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: ".14em", marginBottom: 24, position: "relative" }}>✕ {t.compWithout}</div>
                <div style={{ position: "relative" }}>
                  <svg viewBox="0 0 320 200" fill="none" style={{ width: "100%", marginBottom: 20 }}>
                    {/* Chaotic lines */}
                    {[0,1,2,3,4,5,6].map(i => (
                      <line key={i} x1={20 + Math.random() * 280} y1={20 + Math.random() * 160} x2={20 + Math.random() * 280} y2={20 + Math.random() * 160} stroke="#ef4444" strokeWidth="1" opacity=".35">
                        <animate attributeName="opacity" values=".1;.5;.1" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                      </line>
                    ))}
                    {/* Scattered nodes */}
                    {[{x:60,y:40},{x:180,y:30},{x:280,y:70},{x:40,y:120},{x:150,y:100},{x:260,y:140},{x:100,y:170}].map((n,i) => (
                      <g key={i}>
                        <circle cx={n.x} cy={n.y} r="10" fill={C.navy3} stroke="#ef4444" strokeWidth="1.2" opacity=".6">
                          <animate attributeName="opacity" values=".3;.7;.3" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                        </circle>
                        <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="8" fill="#ef4444" opacity=".7">?</text>
                      </g>
                    ))}
                    <text x="160" y="195" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="8" fill="#ef4444" opacity=".6">{t.compWithoutSvg}</text>
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {t.compWithoutLabels.map((r, i) => (
                      <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#c4c4c4" }}>
                        <span style={{ color: "#ef4444", fontSize: 12 }}>✕</span> {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WITH ACF */}
              <div style={{ position: "relative", background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: "40px 36px", overflow: "hidden" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".14em", marginBottom: 24, position: "relative" }}>✓ {t.compWith}</div>
                <div style={{ position: "relative" }}>
                  <svg viewBox="0 0 320 200" fill="none" style={{ width: "100%", marginBottom: 20 }}>
                    {/* Structured layers */}
                    {[
                      { y: 20, color: C.gov, label: t.svgL1 },
                      { y: 65, color: C.pol, label: t.svgL2 },
                      { y: 110, color: C.sys, label: t.svgL3 },
                      { y: 155, color: C.sup, label: t.svgL4 },
                    ].map((l, i) => (
                      <g key={i}>
                        <rect x="40" y={l.y} width="240" height="32" rx="8" fill={C.navy3} stroke={l.color} strokeWidth="1">
                          <animate attributeName="stroke-opacity" values=".3;.8;.3" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                        </rect>
                        <text x="160" y={l.y + 20} textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="8" fill={l.color} fontWeight="600" opacity=".8">{l.label}</text>
                        {i < 3 && (
                          <line x1="160" y1={l.y + 32} x2="160" y2={l.y + 33 + 20} stroke={C.gold} strokeWidth=".8" opacity=".2">
                            <animate attributeName="opacity" values=".1;.4;.1" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                          </line>
                        )}
                      </g>
                    ))}
                    {/* Energy flow */}
                    <circle r="2.5" fill={C.gold} opacity=".6">
                      <animate attributeName="cy" values="36;81;126;171;126;81;36" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="cx" values="160;160;160;160;160;160;160" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values=".3;.8;.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="160" y="198" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="8" fill={C.gold} opacity=".5">{t.compWithSvg}</text>
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {t.compWithLabels.map((r, i) => (
                      <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#c4c4c4" }}>
                        <span style={{ color: C.gold, fontSize: 12 }}>✓</span> {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           FOUR-LAYER ARCHITECTURE — Detailed
         ═══════════════════════════════════════════════ */}
      <section id="architecture" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div id="layers" style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24 }}>// {t.archBadge}</div></Reveal>

          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: 16 }}>{t.archTitle}</h2></Reveal>

          <Reveal delay={0.15}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 48 }}>{t.archSubtitle}</p></Reveal>

          {[
            { num: "01", name: t.archL1Name, sub: t.archL1Sub, color: C.gov, text: t.archL1Text },
            { num: "02", name: t.archL2Name, sub: t.archL2Sub, color: C.pol, text: t.archL2Text },
            { num: "03", name: t.archL3Name, sub: t.archL3Sub, color: C.sys, text: t.archL3Text },
            { num: "04", name: t.archL4Name, sub: t.archL4Sub, color: C.sup, text: t.archL4Text },
          ].map((layer, i) => (
            <Reveal key={layer.num} delay={0.1}>
              <div style={{ marginBottom: 48, paddingLeft: 24, borderLeft: `2px solid ${layer.color}40` }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: layer.color, fontWeight: 700, opacity: .5 }}>{layer.num}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: layer.color }}>{layer.name}</h3>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.gray, marginBottom: 14, letterSpacing: ".05em" }}>{layer.sub}</div>
                <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.85 }}>{layer.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           ENERGY SEPARATOR — Visual breath
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}`, position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 1200 60" fill="none" style={{ width: "100%", display: "block" }}>
          {/* Center pulse */}
          <line x1="0" y1="30" x2="1200" y2="30" stroke={C.gold} strokeWidth=".3" opacity=".08" />
          <circle r="4" fill={C.gold} opacity=".4" filter="url(#glow-gov)">
            <animate attributeName="cx" values="0;600;1200;600;0" dur="6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="30;30;30;30;30" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values=".1;.6;.1" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Side dots */}
          {[200,400,600,800,1000].map(x => (
            <circle key={x} cx={x} cy="30" r="1.5" fill={C.gold} opacity=".1">
              <animate attributeName="opacity" values=".05;.25;.05" dur="3s" begin={`${x/600}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </section>

      {/* ═══════════════════════════════════════════════
           CENTRAL STATEMENT — The "holy shit" moment
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 500, height: 500, transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(201,168,76,.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 42, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-1px" }}>
              {t.centralLine1}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 42, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-1px", color: C.gold, marginTop: 8 }}>
              {t.centralLine2}
            </h2>
          </Reveal>
          <Reveal delay={0.35}>
            <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.8, maxWidth: 520, margin: "32px auto 0" }}>
              {t.centralP}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           GOVERNANCE LOOP — Animated diagram
         ═══════════════════════════════════════════════ */}
      <section id="methodology" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24 }}>// {t.loopBadge}</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: 16 }}>{t.loopTitle}</h2></Reveal>
          <Reveal delay={0.15}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 0 }}>{t.loopSubtitle}</p></Reveal>

          <GovernanceLoopSVG t={t} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           ECOSYSTEM — Flow diagram + cards
         ═══════════════════════════════════════════════ */}
      <section id="ecosystem" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div id="maturity" style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>// {t.ecoBadge}</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: 16, textAlign: "center" }}>{t.ecoTitle}</h2></Reveal>
          <Reveal delay={0.15}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, textAlign: "center", maxWidth: 560, margin: "0 auto" }}>{t.ecoSubtitle}</p></Reveal>

          <EcosystemFlowSVG t={t} />

          <div className="eco-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 40 }}>
            {[
              { name: "ACF Score®", desc: t.ecoScore, href: `/${locale}/acf-score`, color: C.sup },
              { name: "ACF Control", desc: t.ecoControl, href: `/${locale}/acf-control`, color: C.amber },
              { name: "ACF Academy", desc: t.ecoAcademy, href: `/${locale}/acf-certification#academy`, color: C.pol },
              { name: "ACF Certification", desc: t.ecoCert, href: `/${locale}/acf-certification`, color: C.gold },
            ].map(p => (
              <Reveal key={p.name}>
                <a href={p.href} style={{ display: "block", background: `${p.color}06`, border: `1px solid ${p.color}20`, borderRadius: 14, padding: "22px 26px", transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}50`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${p.color}20`; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: p.color, marginBottom: 6 }}>{p.name}</div>
                  <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           THE QUESTION — Final philosophical statement
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24 }}>// {t.questionBadge}</div></Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>{t.questionP1}</p></Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 28 }}>{t.questionP2}</p></Reveal>

          <Reveal delay={0.1}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, marginBottom: 48 }}>{t.questionP3}</p></Reveal>

          <Reveal delay={0.15}>
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, color: C.gray, fontWeight: 500, marginBottom: 16 }}>{t.questionPre.split("\n").map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, color: C.gray, fontWeight: 600, marginBottom: 20 }}>{t.questionOld}</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff" }}>
                {t.questionNew1}<span style={{ color: C.gold }}>{t.questionNew2}</span>{t.questionNew3}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           AUTHOR + CTA
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="https://www.acf-score.com/" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block" }}>{t.ctaAssess}</a>
            <a href={`/${locale}/blog`} style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, display: "inline-block", transition: "all .3s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t.ctaResearch}</a>
          </div>
        </div>
      </section>

      <Footer />
      <AIAgent />
    </div>
  );
}
