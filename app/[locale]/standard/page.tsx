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

/* ── Multilingual UI strings ─── */
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
    matBadge: "Progression",
    matTitle: "4 Agentic Maturity Levels",
    matSubtitle: "A progressive scale from classical automation to supervised autonomy. Each level increases agent decision authority — and governance requirements.",
    matL0Code: "Level 0",
    matL0Name: "Classical Automation",
    matL0Risk: "Very Low Risk",
    matL0Desc: "Fixed rules, no ML. Human intervention for any modification.",
    matL1Code: "Level 1",
    matL1Name: "Assisted Agents",
    matL1Risk: "Low Risk",
    matL1Desc: "Agents analyze and recommend. Every final decision remains with a human.",
    matL2Code: "Level 2",
    matL2Name: "Governed Agents",
    matL2Risk: "Moderate Risk",
    matL2Desc: "Agents decide within strict governance. Non-delegable zones locked.",
    matL2Recommended: "Recommended Target",
    matL3Code: "Level 3",
    matL3Name: "Supervised Autonomous",
    matL3Risk: "High Risk",
    matL3Desc: "Agents decide and learn. Maximum governance. For mature organizations only.",
    modBadge: "Methodology",
    modTitle: "8 Implementation Modules",
    modSubtitle: "A sequential path deployed progressively over 6–18 months.",
    mod01Code: "MOD_01",
    mod01Name: "Sovereignty Diagnostic",
    mod01Desc: "Sovereignty Score calculation. Risk zone mapping.",
    mod02Code: "MOD_02",
    mod02Name: "Decision Mapping",
    mod02Desc: "Criticality Matrix. Non-delegable zones.",
    mod03Code: "MOD_03",
    mod03Name: "Agentic Constitution",
    mod03Desc: "9 articles. Signed by governance committee.",
    mod04Code: "MOD_04",
    mod04Name: "Agent System Design",
    mod04Desc: "Mandate sheets, interaction perimeters.",
    mod05Code: "MOD_05",
    mod05Name: "Security & Reversibility",
    mod05Desc: "Sandboxing, reversibility plan. Kill switch design.",
    mod06Code: "MOD_06",
    mod06Name: "Continuous Governance",
    mod06Desc: "Monthly reviews. Annual compliance audit.",
    mod07Code: "MOD_07",
    mod07Name: "Implementation Roadmap",
    mod07Desc: "5-phase progressive deployment.",
    mod08Code: "MOD_08",
    mod08Name: "Crisis Management",
    mod08Desc: "3-level incidents. Kill switch drills.",
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
    matBadge: "Progression",
    matTitle: "4 niveaux de maturité agentique",
    matSubtitle: "Une échelle progressive de l'automatisation classique à l'autonomie supervisée. Chaque niveau accroît l'autorité décisionnelle des agents — et les exigences de gouvernance.",
    matL0Code: "Niveau 0",
    matL0Name: "Automatisation classique",
    matL0Risk: "Risque très faible",
    matL0Desc: "Règles fixes, pas de ML. Intervention humaine pour toute modification.",
    matL1Code: "Niveau 1",
    matL1Name: "Agents assistés",
    matL1Risk: "Risque faible",
    matL1Desc: "Les agents analysent et recommandent. Chaque décision finale reste humaine.",
    matL2Code: "Niveau 2",
    matL2Name: "Agents gouvernés",
    matL2Risk: "Risque modéré",
    matL2Desc: "Les agents décident dans un cadre de gouvernance strict. Zones non-déléguables verrouillées.",
    matL2Recommended: "Cible recommandée",
    matL3Code: "Niveau 3",
    matL3Name: "Autonomie supervisée",
    matL3Risk: "Risque élevé",
    matL3Desc: "Les agents décident et apprennent. Gouvernance maximale. Réservé aux organisations matures.",
    modBadge: "Méthodologie",
    modTitle: "8 modules de mise en œuvre",
    modSubtitle: "Un parcours séquentiel déployé progressivement sur 6 à 18 mois.",
    mod01Code: "MOD_01",
    mod01Name: "Diagnostic de souveraineté",
    mod01Desc: "Calcul du score de souveraineté. Cartographie des zones à risque.",
    mod02Code: "MOD_02",
    mod02Name: "Cartographie décisionnelle",
    mod02Desc: "Matrice de criticité. Zones non-déléguables.",
    mod03Code: "MOD_03",
    mod03Name: "Constitution agentique",
    mod03Desc: "9 articles. Signé par le comité de gouvernance.",
    mod04Code: "MOD_04",
    mod04Name: "Conception du système d'agents",
    mod04Desc: "Fiches de mandat, périmètres d'interaction.",
    mod05Code: "MOD_05",
    mod05Name: "Sécurité & réversibilité",
    mod05Desc: "Sandboxing, plan de réversibilité. Conception du kill switch.",
    mod06Code: "MOD_06",
    mod06Name: "Gouvernance continue",
    mod06Desc: "Revues mensuelles. Audit de conformité annuel.",
    mod07Code: "MOD_07",
    mod07Name: "Feuille de route",
    mod07Desc: "Déploiement progressif en 5 phases.",
    mod08Code: "MOD_08",
    mod08Name: "Gestion de crise",
    mod08Desc: "Incidents à 3 niveaux. Exercices de kill switch.",
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
  es: {
    navTitle: "ACF STANDARD",
    navSubtitle: "EL MARCO DE GOBERNANZA",
    navHome: "← Inicio",
    navFramework: "Framework",
    navArchitecture: "Arquitectura",
    navEcosystem: "Ecosistema",
    navBlog: "Blog",
    navCta: "Tu Score →",
    heroBadge: "El estándar de gobernanza",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Gobernar las decisiones en la era de los sistemas autónomos.",
    heroCta: "Leer el framework ↓",
    shiftBadge: "El cambio",
    shiftLine1: "La inteligencia artificial ya no es solo una herramienta.",
    shiftLine2: "Se está convirtiendo en un decisor.",
    shiftP1: "En todos los sectores, agentes autónomos ejecutan ahora decisiones operativas en tiempo real: ajustes de precios, órdenes de aprovisionamiento, interacción con clientes, enrutamiento logístico, evaluaciones de riesgos.",
    shiftP2pre: "Estas decisiones ocurren de forma continua, a velocidad de máquina. Y en la mayoría de las organizaciones, ",
    shiftP2bold: "no existe ninguna arquitectura de gobernanza para supervisarlas.",
    shiftP3pre: "El resultado es una nueva categoría de riesgo: ",
    shiftP3bold: "sistemas de decisión autónomos sin control.",
    shiftP4: "El Agentic Commerce Framework® fue creado para resolver este problema.",
    stmtLine1: "Los sistemas autónomos no crean el caos.",
    stmtLine2: "Las decisiones sin gobernar, sí.",
    stat1Label: "de las organizaciones carecen de gobernanza IA formal",
    stat2Label: "sanciones máximas del AI Act o 7 % de los ingresos globales",
    stat3Label: "menores costes de corrección con gobernanza estructurada",
    stat4Label: "tiempo de respuesta del kill switch Nivel 1 (espec. ACF)",
    gapBadge: "La brecha de gobernanza",
    gapTitle: "Las organizaciones dedicaron la última década a adoptar la IA. Los modelos de gobernanza nunca evolucionaron.",
    gapP1: "La gobernanza tradicional asume una estructura simple: los humanos deciden, los sistemas ejecutan.",
    gapP2pre: "Los sistemas agénticos invierten esta relación. Las máquinas ahora ejecutan ",
    gapP2bold: "y deciden",
    gapP2post: " dentro de parámetros definidos.",
    gapP3: "Cuando este cambio ocurre sin gobernanza estructurada, las organizaciones pierden visibilidad y control sobre sus propias decisiones operativas. Las consecuencias no son teóricas:",
    gapList: ["Decisiones autónomas irrastreables", "Optimizaciones conflictivas entre agentes", "Deriva operativa con el tiempo", "Exposición regulatoria ante normativas de IA emergentes", "Dependencia estratégica de plataformas externas"],
    fwBadge: "El framework",
    fwTitle: "La primera arquitectura de gobernanza para sistemas de decisión autónomos.",
    fwP1pre: "El Agentic Commerce Framework® no controla los modelos de IA. Gobierna las ",
    fwP1bold: "decisiones",
    fwP1post: " que ejecutan.",
    fwP2: "El framework define cómo las organizaciones:",
    fwList: ["Estructuran la autoridad decisional", "Definen zonas no delegables", "Restringen el comportamiento autónomo", "Mantienen supervisión en tiempo real", "Preservan la soberanía humana sobre acciones críticas"],
    fwP3: "ACF crea una capa estructurada de gobernanza decisional entre el liderazgo humano y la ejecución de las máquinas.",
    compWithout: "SIN GOBERNANZA",
    compWith: "CON GOBERNANZA ACF®",
    compWithoutLabels: ["Opacidad", "Deriva", "Conflicto", "Exposición"],
    compWithLabels: ["Trazable", "Reversible", "Responsable", "Soberano"],
    compWithoutSvg: "DECISIONES SIN CONTROL",
    compWithSvg: "DECISIONES GOBERNADAS",
    archBadge: "Arquitectura",
    archTitle: "Una arquitectura de gobernanza en cuatro capas.",
    archSubtitle: "Juntas crean un sistema de control continuo para operaciones autónomas.",
    archL1Name: "Gobernanza",
    archL1Sub: "Quién posee la autoridad",
    archL1Text: "La capa de gobernanza establece la soberanía decisional. Las organizaciones definen quién conserva la autoridad final, qué decisiones pueden delegarse, cuáles permanecen exclusivamente humanas. En este nivel, las empresas formalizan su Constitución Agéntica — el documento fundacional que establece los principios de gobernanza IA.",
    archL2Name: "Política",
    archL2Sub: "Qué pueden hacer los agentes",
    archL2Text: "La política define los límites de comportamiento de los sistemas autónomos. Traduce los principios de gobernanza en reglas operativas — umbrales financieros, restricciones temporales, límites éticos, políticas regulatorias sectoriales. Las políticas garantizan que los agentes operen dentro de perímetros decisionales claramente definidos.",
    archL3Name: "Sistema",
    archL3Sub: "Cómo se ejecutan las decisiones",
    archL3Text: "La capa de sistema gobierna el entorno de ejecución técnica. Cada acción autónoma permanece observable, interrumpible y auditable — mediante trazabilidad de decisiones, coordinación multiagente y mecanismos de kill switch en varios niveles. El objetivo no es ralentizar a los agentes. Es asegurar que sean gobernables a velocidad de máquina.",
    archL4Name: "Supervisión",
    archL4Sub: "Cómo las organizaciones mantienen vigilancia continua",
    archL4Text: "La gobernanza no es una configuración puntual. Es una disciplina operativa continua. La capa de supervisión introduce monitorización continua, respuesta a incidentes y revisiones de gobernanza. La supervisión asegura que los sistemas de agentes evolucionen sin erosionar el control.",
    centralLine1: "La IA automatiza la ejecución.",
    centralLine2: "ACF gobierna las decisiones.",
    centralP: "Sin gobernanza, los sistemas autónomos crean opacidad. Con gobernanza, se convierten en instrumentos escalables de control estratégico.",
    matBadge: "Progresión",
    matTitle: "4 niveles de madurez agéntica",
    matSubtitle: "Una escala progresiva desde la automatización clásica hasta la autonomía supervisada. Cada nivel incrementa la autoridad decisional de los agentes — y los requisitos de gobernanza.",
    matL0Code: "Nivel 0",
    matL0Name: "Automatización clásica",
    matL0Risk: "Riesgo muy bajo",
    matL0Desc: "Reglas fijas, sin ML. Intervención humana para cualquier modificación.",
    matL1Code: "Nivel 1",
    matL1Name: "Agentes asistidos",
    matL1Risk: "Riesgo bajo",
    matL1Desc: "Los agentes analizan y recomiendan. Cada decisión final la toma un humano.",
    matL2Code: "Nivel 2",
    matL2Name: "Agentes gobernados",
    matL2Risk: "Riesgo moderado",
    matL2Desc: "Los agentes deciden dentro de una gobernanza estricta. Zonas no delegables bloqueadas.",
    matL2Recommended: "Objetivo recomendado",
    matL3Code: "Nivel 3",
    matL3Name: "Autonomía supervisada",
    matL3Risk: "Riesgo alto",
    matL3Desc: "Los agentes deciden y aprenden. Gobernanza máxima. Solo para organizaciones maduras.",
    modBadge: "Metodología",
    modTitle: "8 módulos de implementación",
    modSubtitle: "Un recorrido secuencial desplegado progresivamente en 6 a 18 meses.",
    mod01Code: "MOD_01",
    mod01Name: "Diagnóstico de soberanía",
    mod01Desc: "Cálculo del score de soberanía. Mapeo de zonas de riesgo.",
    mod02Code: "MOD_02",
    mod02Name: "Mapeo decisional",
    mod02Desc: "Matriz de criticidad. Zonas no delegables.",
    mod03Code: "MOD_03",
    mod03Name: "Constitución agéntica",
    mod03Desc: "9 artículos. Firmado por el comité de gobernanza.",
    mod04Code: "MOD_04",
    mod04Name: "Diseño del sistema de agentes",
    mod04Desc: "Fichas de mandato, perímetros de interacción.",
    mod05Code: "MOD_05",
    mod05Name: "Seguridad y reversibilidad",
    mod05Desc: "Sandboxing, plan de reversibilidad. Diseño del kill switch.",
    mod06Code: "MOD_06",
    mod06Name: "Gobernanza continua",
    mod06Desc: "Revisiones mensuales. Auditoría de cumplimiento anual.",
    mod07Code: "MOD_07",
    mod07Name: "Hoja de ruta",
    mod07Desc: "Despliegue progresivo en 5 fases.",
    mod08Code: "MOD_08",
    mod08Name: "Gestión de crisis",
    mod08Desc: "Incidentes de 3 niveles. Simulacros de kill switch.",
    loopBadge: "Disciplina operativa",
    loopTitle: "El bucle de gobernanza de agentes",
    loopSubtitle: "La gobernanza no es configuración. Es un bucle operativo continuo — definir, restringir, ejecutar, monitorizar, intervenir, mejorar. Y volver a empezar.",
    ecoBadge: "El ecosistema",
    ecoTitle: "Sistema operativo ACF",
    ecoSubtitle: "Cinco herramientas integradas. Un sistema en bucle cerrado. Diagnosticar → Formar → Supervisar → Certificar → Escalar.",
    ecoScore: "Diagnóstico rápido que mide la soberanía decisional y la madurez de gobernanza.",
    ecoControl: "Plataforma en tiempo real para supervisar sistemas autónomos.",
    ecoAcademy: "Formación para ejecutivos y operadores que gobiernan sistemas autónomos.",
    ecoCert: "Sellos ACF TRUST™ y ACF CERTIFIED que validan la madurez de gobernanza.",
    questionBadge: "Una nueva disciplina operativa",
    questionP1: "La transición a sistemas autónomos no es un cambio tecnológico. Es un cambio de gobernanza.",
    questionP2: "Las organizaciones deben evolucionar de gestionar software a gobernar sistemas de decisión.",
    questionP3: "El Agentic Commerce Framework® proporciona la estructura necesaria para hacerlo.",
    questionPre: "Porque en la era de los sistemas autónomos,\nla pregunta más importante ya no es:",
    questionOld: "\"¿Qué puede hacer la IA?\"",
    questionNew1: "\"¿Quién gobierna las decisiones ",
    questionNew2: "que toma",
    questionNew3: "?\"",
    ctaAssess: "Evalúa tu gobernanza →",
    ctaResearch: "Leer la investigación",
    svgHumanAuthority: "AUTORIDAD HUMANA",
    svgHumanAuthoritySub: "Liderazgo · Estrategia · Responsabilidad",
    svgL1: "GOBERNANZA",
    svgL1Sub: "Quién decide · Autoridad · Constitución",
    svgL2: "POLÍTICA",
    svgL2Sub: "Reglas · Restricciones · Límites éticos",
    svgL3: "SISTEMA",
    svgL3Sub: "Agentes · Trazabilidad · Kill switch",
    svgL4: "SUPERVISIÓN",
    svgL4Sub: "Monitorización · Incidentes · Soberanía",
    svgMachineSpeed: "EJECUCIÓN A VELOCIDAD MÁQUINA",
    loopDefine: "DEFINIR", loopDefineSub: "Autoridad",
    loopConstrain: "RESTRINGIR", loopConstrainSub: "Reglas",
    loopExecute: "EJECUTAR", loopExecuteSub: "Agentes",
    loopMonitor: "MONITORIZAR", loopMonitorSub: "Deriva",
    loopIntervene: "INTERVENIR", loopInterveneSub: "Anulación",
    loopImprove: "MEJORAR", loopImproveSub: "Evolucionar",
    loopCenter1: "BUCLE",
    loopCenter2: "CONTINUO",
    ecoFlowScore: "Score", ecoFlowScoreAction: "Diagnosticar",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Formar",
    ecoFlowControl: "Control", ecoFlowControlAction: "Supervisar",
    ecoFlowCert: "Certificación", ecoFlowCertAction: "Certificar",
    ecoFlowPartners: "Socios", ecoFlowPartnersAction: "Escalar",
    ecoFlowClosedLoop: "BUCLE CERRADO",
  },
  de: {
    navTitle: "ACF STANDARD",
    navSubtitle: "DAS GOVERNANCE-FRAMEWORK",
    navHome: "← Startseite",
    navFramework: "Framework",
    navArchitecture: "Architektur",
    navEcosystem: "Ökosystem",
    navBlog: "Blog",
    navCta: "Ihr Score →",
    heroBadge: "Der Governance-Standard",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Entscheidungen im Zeitalter autonomer Systeme steuern.",
    heroCta: "Framework lesen ↓",
    shiftBadge: "Der Wandel",
    shiftLine1: "Künstliche Intelligenz ist nicht mehr nur ein Werkzeug.",
    shiftLine2: "Sie wird zum Entscheider.",
    shiftP1: "In allen Branchen treffen autonome Agenten jetzt operative Entscheidungen in Echtzeit — Preisanpassungen, Beschaffungsaufträge, Kundeninteraktion, Logistik-Routing, Risikobewertungen.",
    shiftP2pre: "Diese Entscheidungen fallen kontinuierlich, mit Maschinengeschwindigkeit. Und in den meisten Organisationen ",
    shiftP2bold: "existiert keine Governance-Architektur zu deren Überwachung.",
    shiftP3pre: "Das Ergebnis ist eine neue Risikokategorie: ",
    shiftP3bold: "unkontrollierte autonome Entscheidungssysteme.",
    shiftP4: "Das Agentic Commerce Framework® wurde geschaffen, um dieses Problem zu lösen.",
    stmtLine1: "Autonome Systeme erzeugen kein Chaos.",
    stmtLine2: "Ungesteuerte Entscheidungen schon.",
    stat1Label: "der Organisationen haben keine formale KI-Governance",
    stat2Label: "maximale Sanktionen des AI Act oder 7 % des weltweiten Umsatzes",
    stat3Label: "geringere Korrekturkosten mit strukturierter Governance",
    stat4Label: "Reaktionszeit des Kill Switch Level 1 (ACF-Spez.)",
    gapBadge: "Die Governance-Lücke",
    gapTitle: "Organisationen haben das letzte Jahrzehnt mit der Einführung von KI verbracht. Governance-Modelle haben sich nie weiterentwickelt.",
    gapP1: "Traditionelle Governance basiert auf einer einfachen Struktur: Menschen entscheiden, Systeme führen aus.",
    gapP2pre: "Agentische Systeme kehren dieses Verhältnis um. Maschinen führen jetzt aus ",
    gapP2bold: "und entscheiden",
    gapP2post: " innerhalb definierter Parameter.",
    gapP3: "Wenn dieser Wandel ohne strukturierte Governance stattfindet, verlieren Organisationen die Sichtbarkeit und Kontrolle über ihre eigenen operativen Entscheidungen. Die Konsequenzen sind nicht theoretisch:",
    gapList: ["Nicht nachverfolgbare autonome Entscheidungen", "Widersprüchliche Agentenoptimierungen", "Operative Drift über die Zeit", "Regulatorische Exposition durch neue KI-Regulierung", "Strategische Abhängigkeit von externen Plattformen"],
    fwBadge: "Das Framework",
    fwTitle: "Die erste Governance-Architektur für autonome Entscheidungssysteme.",
    fwP1pre: "Das Agentic Commerce Framework® kontrolliert keine KI-Modelle. Es steuert die ",
    fwP1bold: "Entscheidungen",
    fwP1post: ", die sie ausführen.",
    fwP2: "Das Framework definiert, wie Organisationen:",
    fwList: ["Entscheidungsautorität strukturieren", "Nicht-delegierbare Zonen definieren", "Autonomes Verhalten einschränken", "Echtzeit-Überwachung aufrechterhalten", "Menschliche Souveränität über kritische Handlungen bewahren"],
    fwP3: "ACF schafft eine strukturierte Entscheidungs-Governance-Schicht zwischen menschlicher Führung und maschineller Ausführung.",
    compWithout: "OHNE GOVERNANCE",
    compWith: "MIT ACF® GOVERNANCE",
    compWithoutLabels: ["Opazität", "Drift", "Konflikt", "Exposition"],
    compWithLabels: ["Nachverfolgbar", "Reversibel", "Rechenschaftspflichtig", "Souverän"],
    compWithoutSvg: "UNKONTROLLIERTE ENTSCHEIDUNGEN",
    compWithSvg: "GESTEUERTE ENTSCHEIDUNGEN",
    archBadge: "Architektur",
    archTitle: "Eine vierschichtige Governance-Architektur.",
    archSubtitle: "Zusammen bilden sie ein kontinuierliches Kontrollsystem für autonome Operationen.",
    archL1Name: "Governance",
    archL1Sub: "Wer die Autorität hat",
    archL1Text: "Die Governance-Schicht etabliert die Entscheidungssouveränität. Organisationen definieren, wer die endgültige Autorität behält, welche Entscheidungen delegiert werden können, welche ausschließlich menschlich bleiben. Auf dieser Ebene formalisieren Unternehmen ihre Agentische Verfassung — das Gründungsdokument, das die Prinzipien der KI-Governance festlegt.",
    archL2Name: "Politik",
    archL2Sub: "Was Agenten tun dürfen",
    archL2Text: "Die Politik definiert die Verhaltensgrenzen autonomer Systeme. Sie übersetzt Governance-Prinzipien in operative Regeln — finanzielle Schwellenwerte, zeitliche Beschränkungen, ethische Grenzen, branchenspezifische Regulierungspolitiken. Politiken stellen sicher, dass Agenten innerhalb klar definierter Entscheidungsperimeter operieren.",
    archL3Name: "System",
    archL3Sub: "Wie Entscheidungen ausgeführt werden",
    archL3Text: "Die Systemschicht steuert die technische Ausführungsumgebung. Jede autonome Aktion bleibt beobachtbar, unterbrechbar und prüfbar — durch Entscheidungs-Nachverfolgbarkeit, Multi-Agenten-Koordination und mehrstufige Kill-Switch-Mechanismen. Das Ziel ist nicht, Agenten zu verlangsamen. Es ist sicherzustellen, dass sie mit Maschinengeschwindigkeit steuerbar bleiben.",
    archL4Name: "Supervision",
    archL4Sub: "Wie Organisationen kontinuierliche Überwachung aufrechterhalten",
    archL4Text: "Governance ist keine einmalige Konfiguration. Es ist eine fortlaufende operative Disziplin. Die Supervisionsschicht führt kontinuierliche Überwachung, Incident Response und Governance-Reviews ein. Supervision stellt sicher, dass Agentensysteme sich weiterentwickeln, ohne die Kontrolle zu erodieren.",
    centralLine1: "KI automatisiert die Ausführung.",
    centralLine2: "ACF steuert die Entscheidungen.",
    centralP: "Ohne Governance erzeugen autonome Systeme Opazität. Mit Governance werden sie skalierbare Instrumente strategischer Kontrolle.",
    matBadge: "Progression",
    matTitle: "4 agentische Reifegrade",
    matSubtitle: "Eine progressive Skala von klassischer Automatisierung bis zu überwachter Autonomie. Jede Stufe erhöht die Entscheidungsautorität der Agenten — und die Governance-Anforderungen.",
    matL0Code: "Level 0",
    matL0Name: "Klassische Automatisierung",
    matL0Risk: "Sehr niedriges Risiko",
    matL0Desc: "Feste Regeln, kein ML. Menschliches Eingreifen bei jeder Änderung.",
    matL1Code: "Level 1",
    matL1Name: "Assistierte Agenten",
    matL1Risk: "Niedriges Risiko",
    matL1Desc: "Agenten analysieren und empfehlen. Jede finale Entscheidung bleibt beim Menschen.",
    matL2Code: "Level 2",
    matL2Name: "Gesteuerte Agenten",
    matL2Risk: "Mittleres Risiko",
    matL2Desc: "Agenten entscheiden innerhalb strenger Governance. Nicht-delegierbare Zonen gesperrt.",
    matL2Recommended: "Empfohlenes Ziel",
    matL3Code: "Level 3",
    matL3Name: "Überwachte Autonomie",
    matL3Risk: "Hohes Risiko",
    matL3Desc: "Agenten entscheiden und lernen. Maximale Governance. Nur für reife Organisationen.",
    modBadge: "Methodik",
    modTitle: "8 Implementierungsmodule",
    modSubtitle: "Ein sequentieller Pfad, progressiv über 6–18 Monate ausgerollt.",
    mod01Code: "MOD_01",
    mod01Name: "Souveränitäts-Diagnose",
    mod01Desc: "Berechnung des Souveränitäts-Scores. Risikozonenkartierung.",
    mod02Code: "MOD_02",
    mod02Name: "Entscheidungskartierung",
    mod02Desc: "Kritikalitätsmatrix. Nicht-delegierbare Zonen.",
    mod03Code: "MOD_03",
    mod03Name: "Agentische Verfassung",
    mod03Desc: "9 Artikel. Vom Governance-Komitee unterzeichnet.",
    mod04Code: "MOD_04",
    mod04Name: "Agentensystem-Design",
    mod04Desc: "Mandatsblätter, Interaktionsperimeter.",
    mod05Code: "MOD_05",
    mod05Name: "Sicherheit & Reversibilität",
    mod05Desc: "Sandboxing, Reversibilitätsplan. Kill-Switch-Design.",
    mod06Code: "MOD_06",
    mod06Name: "Kontinuierliche Governance",
    mod06Desc: "Monatliche Reviews. Jährliches Compliance-Audit.",
    mod07Code: "MOD_07",
    mod07Name: "Implementierungs-Roadmap",
    mod07Desc: "Progressives Deployment in 5 Phasen.",
    mod08Code: "MOD_08",
    mod08Name: "Krisenmanagement",
    mod08Desc: "3-stufige Vorfälle. Kill-Switch-Übungen.",
    loopBadge: "Operative Disziplin",
    loopTitle: "Der Agenten-Governance-Loop",
    loopSubtitle: "Governance ist keine Konfiguration. Es ist ein kontinuierlicher operativer Kreislauf — definieren, einschränken, ausführen, überwachen, eingreifen, verbessern. Dann von vorn.",
    ecoBadge: "Das Ökosystem",
    ecoTitle: "ACF-Betriebssystem",
    ecoSubtitle: "Fünf integrierte Werkzeuge. Ein geschlossenes System. Diagnostizieren → Schulen → Überwachen → Zertifizieren → Skalieren.",
    ecoScore: "Schnelldiagnose zur Messung von Entscheidungssouveränität und Governance-Reife.",
    ecoControl: "Echtzeit-Plattform zur Überwachung autonomer Systeme.",
    ecoAcademy: "Schulung für Führungskräfte und Operatoren, die autonome Systeme steuern.",
    ecoCert: "ACF TRUST™- und ACF CERTIFIED-Labels zur Validierung der Governance-Reife.",
    questionBadge: "Eine neue operative Disziplin",
    questionP1: "Der Übergang zu autonomen Systemen ist kein Technologiewandel. Es ist ein Governance-Wandel.",
    questionP2: "Organisationen müssen sich von der Software-Verwaltung zur Steuerung von Entscheidungssystemen entwickeln.",
    questionP3: "Das Agentic Commerce Framework® liefert die dafür notwendige Struktur.",
    questionPre: "Denn im Zeitalter autonomer Systeme\nlautet die wichtigste Frage nicht mehr:",
    questionOld: "\"Was kann KI leisten?\"",
    questionNew1: "\"Wer steuert die Entscheidungen, ",
    questionNew2: "die sie trifft",
    questionNew3: "?\"",
    ctaAssess: "Bewerten Sie Ihre Governance →",
    ctaResearch: "Forschung lesen",
    svgHumanAuthority: "MENSCHLICHE AUTORITÄT",
    svgHumanAuthoritySub: "Führung · Strategie · Verantwortung",
    svgL1: "GOVERNANCE",
    svgL1Sub: "Wer entscheidet · Autorität · Verfassung",
    svgL2: "POLITIK",
    svgL2Sub: "Regeln · Einschränkungen · Ethische Leitplanken",
    svgL3: "SYSTEM",
    svgL3Sub: "Agenten · Nachverfolgbarkeit · Kill Switch",
    svgL4: "SUPERVISION",
    svgL4Sub: "Überwachung · Vorfälle · Souveränität",
    svgMachineSpeed: "AUSFÜHRUNG MIT MASCHINENGESCHWINDIGKEIT",
    loopDefine: "DEFINIEREN", loopDefineSub: "Autorität",
    loopConstrain: "EINSCHRÄNKEN", loopConstrainSub: "Regeln",
    loopExecute: "AUSFÜHREN", loopExecuteSub: "Agenten",
    loopMonitor: "ÜBERWACHEN", loopMonitorSub: "Drift",
    loopIntervene: "EINGREIFEN", loopInterveneSub: "Übersteuern",
    loopImprove: "VERBESSERN", loopImproveSub: "Entwickeln",
    loopCenter1: "KONTINUIERLICHER",
    loopCenter2: "KREISLAUF",
    ecoFlowScore: "Score", ecoFlowScoreAction: "Diagnostizieren",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Schulen",
    ecoFlowControl: "Control", ecoFlowControlAction: "Überwachen",
    ecoFlowCert: "Zertifizierung", ecoFlowCertAction: "Zertifizieren",
    ecoFlowPartners: "Partner", ecoFlowPartnersAction: "Skalieren",
    ecoFlowClosedLoop: "GESCHLOSSENER KREISLAUF",
  },
  pt: {
    navTitle: "ACF STANDARD",
    navSubtitle: "O FRAMEWORK DE GOVERNANÇA",
    navHome: "← Início",
    navFramework: "Framework",
    navArchitecture: "Arquitetura",
    navEcosystem: "Ecossistema",
    navBlog: "Blog",
    navCta: "Seu Score →",
    heroBadge: "O padrão de governança",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Governar decisões na era dos sistemas autônomos.",
    heroCta: "Ler o framework ↓",
    shiftBadge: "A mudança",
    shiftLine1: "A inteligência artificial não é mais apenas uma ferramenta.",
    shiftLine2: "Está se tornando um decisor.",
    shiftP1: "Em todos os setores, agentes autônomos executam agora decisões operacionais em tempo real — ajustes de preços, ordens de compra, engajamento de clientes, roteamento logístico, avaliações de risco.",
    shiftP2pre: "Essas decisões acontecem continuamente, na velocidade das máquinas. E na maioria das organizações, ",
    shiftP2bold: "nenhuma arquitetura de governança existe para supervisioná-las.",
    shiftP3pre: "O resultado é uma nova categoria de risco: ",
    shiftP3bold: "sistemas de decisão autônomos sem controle.",
    shiftP4: "O Agentic Commerce Framework® foi criado para resolver este problema.",
    stmtLine1: "Sistemas autônomos não criam o caos.",
    stmtLine2: "Decisões sem governança, sim.",
    stat1Label: "das organizações não possuem governança de IA formal",
    stat2Label: "sanções máximas do AI Act ou 7 % da receita global",
    stat3Label: "menores custos de correção com governança estruturada",
    stat4Label: "tempo de resposta do kill switch Nível 1 (espec. ACF)",
    gapBadge: "A lacuna de governança",
    gapTitle: "As organizações passaram a última década adotando IA. Os modelos de governança nunca evoluíram.",
    gapP1: "A governança tradicional assume uma estrutura simples: humanos decidem, sistemas executam.",
    gapP2pre: "Sistemas agênticos invertem essa relação. Máquinas agora executam ",
    gapP2bold: "e decidem",
    gapP2post: " dentro de parâmetros definidos.",
    gapP3: "Quando essa mudança ocorre sem governança estruturada, as organizações perdem visibilidade e controle sobre suas próprias decisões operacionais. As consequências não são teóricas:",
    gapList: ["Decisões autônomas irrastreáveis", "Otimizações conflitantes entre agentes", "Deriva operacional ao longo do tempo", "Exposição regulatória diante de regulamentações de IA emergentes", "Dependência estratégica de plataformas externas"],
    fwBadge: "O framework",
    fwTitle: "A primeira arquitetura de governança para sistemas de decisão autônomos.",
    fwP1pre: "O Agentic Commerce Framework® não controla modelos de IA. Ele governa as ",
    fwP1bold: "decisões",
    fwP1post: " que eles executam.",
    fwP2: "O framework define como as organizações:",
    fwList: ["Estruturam a autoridade decisória", "Definem zonas não delegáveis", "Restringem o comportamento autônomo", "Mantêm supervisão em tempo real", "Preservam a soberania humana sobre ações críticas"],
    fwP3: "ACF cria uma camada estruturada de governança decisória entre a liderança humana e a execução das máquinas.",
    compWithout: "SEM GOVERNANÇA",
    compWith: "COM GOVERNANÇA ACF®",
    compWithoutLabels: ["Opacidade", "Deriva", "Conflito", "Exposição"],
    compWithLabels: ["Rastreável", "Reversível", "Responsável", "Soberano"],
    compWithoutSvg: "DECISÕES SEM CONTROLE",
    compWithSvg: "DECISÕES GOVERNADAS",
    archBadge: "Arquitetura",
    archTitle: "Uma arquitetura de governança em quatro camadas.",
    archSubtitle: "Juntas criam um sistema de controle contínuo para operações autônomas.",
    archL1Name: "Governança",
    archL1Sub: "Quem detém a autoridade",
    archL1Text: "A camada de governança estabelece a soberania decisória. As organizações definem quem mantém a autoridade final, quais decisões podem ser delegadas, quais permanecem exclusivamente humanas. Neste nível, as empresas formalizam sua Constituição Agêntica — o documento fundacional que estabelece os princípios da governança de IA.",
    archL2Name: "Política",
    archL2Sub: "O que os agentes podem fazer",
    archL2Text: "A política define os limites comportamentais dos sistemas autônomos. Traduz princípios de governança em regras operacionais — limiares financeiros, restrições temporais, limites éticos, políticas regulatórias setoriais. As políticas garantem que os agentes operem dentro de perímetros decisórios claramente definidos.",
    archL3Name: "Sistema",
    archL3Sub: "Como as decisões são executadas",
    archL3Text: "A camada de sistema governa o ambiente de execução técnica. Cada ação autônoma permanece observável, interrompível e auditável — por meio de rastreabilidade de decisões, coordenação multiagente e mecanismos de kill switch em vários níveis. O objetivo não é desacelerar os agentes. É garantir que permaneçam governáveis na velocidade das máquinas.",
    archL4Name: "Supervisão",
    archL4Sub: "Como as organizações mantêm vigilância contínua",
    archL4Text: "Governança não é uma configuração pontual. É uma disciplina operacional contínua. A camada de supervisão introduz monitoramento contínuo, resposta a incidentes e revisões de governança. A supervisão garante que os sistemas de agentes evoluam sem erodir o controle.",
    centralLine1: "A IA automatiza a execução.",
    centralLine2: "ACF governa as decisões.",
    centralP: "Sem governança, sistemas autônomos criam opacidade. Com governança, tornam-se instrumentos escaláveis de controle estratégico.",
    matBadge: "Progressão",
    matTitle: "4 níveis de maturidade agêntica",
    matSubtitle: "Uma escala progressiva da automação clássica à autonomia supervisionada. Cada nível aumenta a autoridade decisória dos agentes — e os requisitos de governança.",
    matL0Code: "Nível 0",
    matL0Name: "Automação clássica",
    matL0Risk: "Risco muito baixo",
    matL0Desc: "Regras fixas, sem ML. Intervenção humana para qualquer modificação.",
    matL1Code: "Nível 1",
    matL1Name: "Agentes assistidos",
    matL1Risk: "Risco baixo",
    matL1Desc: "Os agentes analisam e recomendam. Cada decisão final permanece com um humano.",
    matL2Code: "Nível 2",
    matL2Name: "Agentes governados",
    matL2Risk: "Risco moderado",
    matL2Desc: "Os agentes decidem dentro de governança estrita. Zonas não delegáveis bloqueadas.",
    matL2Recommended: "Objetivo recomendado",
    matL3Code: "Nível 3",
    matL3Name: "Autonomia supervisionada",
    matL3Risk: "Risco alto",
    matL3Desc: "Os agentes decidem e aprendem. Governança máxima. Apenas para organizações maduras.",
    modBadge: "Metodologia",
    modTitle: "8 módulos de implementação",
    modSubtitle: "Um percurso sequencial implantado progressivamente ao longo de 6 a 18 meses.",
    mod01Code: "MOD_01",
    mod01Name: "Diagnóstico de soberania",
    mod01Desc: "Cálculo do score de soberania. Mapeamento de zonas de risco.",
    mod02Code: "MOD_02",
    mod02Name: "Mapeamento decisório",
    mod02Desc: "Matriz de criticidade. Zonas não delegáveis.",
    mod03Code: "MOD_03",
    mod03Name: "Constituição agêntica",
    mod03Desc: "9 artigos. Assinado pelo comitê de governança.",
    mod04Code: "MOD_04",
    mod04Name: "Design do sistema de agentes",
    mod04Desc: "Fichas de mandato, perímetros de interação.",
    mod05Code: "MOD_05",
    mod05Name: "Segurança e reversibilidade",
    mod05Desc: "Sandboxing, plano de reversibilidade. Design do kill switch.",
    mod06Code: "MOD_06",
    mod06Name: "Governança contínua",
    mod06Desc: "Revisões mensais. Auditoria de conformidade anual.",
    mod07Code: "MOD_07",
    mod07Name: "Roteiro de implementação",
    mod07Desc: "Implantação progressiva em 5 fases.",
    mod08Code: "MOD_08",
    mod08Name: "Gestão de crises",
    mod08Desc: "Incidentes de 3 níveis. Simulados de kill switch.",
    loopBadge: "Disciplina operacional",
    loopTitle: "O loop de governança de agentes",
    loopSubtitle: "Governança não é configuração. É um loop operacional contínuo — definir, restringir, executar, monitorar, intervir, melhorar. E recomeçar.",
    ecoBadge: "O ecossistema",
    ecoTitle: "Sistema operacional ACF",
    ecoSubtitle: "Cinco ferramentas integradas. Um sistema em loop fechado. Diagnosticar → Treinar → Monitorar → Certificar → Escalar.",
    ecoScore: "Diagnóstico rápido que mede a soberania decisória e a maturidade de governança.",
    ecoControl: "Plataforma em tempo real para supervisionar sistemas autônomos.",
    ecoAcademy: "Treinamento para executivos e operadores que governam sistemas autônomos.",
    ecoCert: "Selos ACF TRUST™ e ACF CERTIFIED que validam a maturidade de governança.",
    questionBadge: "Uma nova disciplina operacional",
    questionP1: "A transição para sistemas autônomos não é uma mudança tecnológica. É uma mudança de governança.",
    questionP2: "As organizações precisam evoluir da gestão de software para a governança de sistemas de decisão.",
    questionP3: "O Agentic Commerce Framework® fornece a estrutura necessária para isso.",
    questionPre: "Porque na era dos sistemas autônomos,\na pergunta mais importante já não é:",
    questionOld: "\"O que a IA pode fazer?\"",
    questionNew1: "\"Quem governa as decisões ",
    questionNew2: "que ela toma",
    questionNew3: "?\"",
    ctaAssess: "Avalie sua governança →",
    ctaResearch: "Ler a pesquisa",
    svgHumanAuthority: "AUTORIDADE HUMANA",
    svgHumanAuthoritySub: "Liderança · Estratégia · Responsabilidade",
    svgL1: "GOVERNANÇA",
    svgL1Sub: "Quem decide · Autoridade · Constituição",
    svgL2: "POLÍTICA",
    svgL2Sub: "Regras · Restrições · Limites éticos",
    svgL3: "SISTEMA",
    svgL3Sub: "Agentes · Rastreabilidade · Kill switch",
    svgL4: "SUPERVISÃO",
    svgL4Sub: "Monitoramento · Incidentes · Soberania",
    svgMachineSpeed: "EXECUÇÃO NA VELOCIDADE DA MÁQUINA",
    loopDefine: "DEFINIR", loopDefineSub: "Autoridade",
    loopConstrain: "RESTRINGIR", loopConstrainSub: "Regras",
    loopExecute: "EXECUTAR", loopExecuteSub: "Agentes",
    loopMonitor: "MONITORAR", loopMonitorSub: "Deriva",
    loopIntervene: "INTERVIR", loopInterveneSub: "Anulação",
    loopImprove: "MELHORAR", loopImproveSub: "Evoluir",
    loopCenter1: "LOOP",
    loopCenter2: "CONTÍNUO",
    ecoFlowScore: "Score", ecoFlowScoreAction: "Diagnosticar",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Treinar",
    ecoFlowControl: "Control", ecoFlowControlAction: "Monitorar",
    ecoFlowCert: "Certificação", ecoFlowCertAction: "Certificar",
    ecoFlowPartners: "Parceiros", ecoFlowPartnersAction: "Escalar",
    ecoFlowClosedLoop: "LOOP FECHADO",
  },
  ja: {
    navTitle: "ACF STANDARD",
    navSubtitle: "ガバナンスフレームワーク",
    navHome: "← ホーム",
    navFramework: "フレームワーク",
    navArchitecture: "アーキテクチャ",
    navEcosystem: "エコシステム",
    navBlog: "ブログ",
    navCta: "スコアを取得 →",
    heroBadge: "ガバナンス標準",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "自律システム時代の意思決定を統治する。",
    heroCta: "フレームワークを読む ↓",
    shiftBadge: "転換点",
    shiftLine1: "人工知能はもはや単なるツールではない。",
    shiftLine2: "意思決定者になりつつある。",
    shiftP1: "あらゆる業界で、自律エージェントがリアルタイムの業務上の意思決定を実行している——価格調整、調達発注、顧客対応、物流ルーティング、リスク評価。",
    shiftP2pre: "これらの意思決定はマシンスピードで継続的に行われている。そして多くの組織では、",
    shiftP2bold: "それらを監督するガバナンスアーキテクチャが存在しない。",
    shiftP3pre: "その結果、新たなリスクカテゴリーが生まれている：",
    shiftP3bold: "制御されていない自律的意思決定システム。",
    shiftP4: "Agentic Commerce Framework®はこの問題を解決するために作られた。",
    stmtLine1: "自律システムが混乱を生むのではない。",
    stmtLine2: "統治されない意思決定が混乱を生む。",
    stat1Label: "の組織が正式なAIガバナンスを持たない",
    stat2Label: "AI法の最大制裁額またはグローバル売上の7%",
    stat3Label: "構造化されたガバナンスによる修正コスト削減",
    stat4Label: "レベル1キルスイッチ応答時間（ACF仕様）",
    gapBadge: "ガバナンスのギャップ",
    gapTitle: "組織はこの10年間AIの導入に費やしてきた。ガバナンスモデルは進化しなかった。",
    gapP1: "従来のガバナンスはシンプルな構造を前提としている：人間が決定し、システムが実行する。",
    gapP2pre: "エージェンティックシステムはこの関係を逆転させる。マシンは今や実行し、",
    gapP2bold: "そして意思決定する",
    gapP2post: "——定義されたパラメータの範囲内で。",
    gapP3: "この転換が構造化されたガバナンスなしに起こると、組織は自らの業務上の意思決定に対する可視性と制御を失う。その結果は理論上のものではない：",
    gapList: ["追跡不能な自律的意思決定", "エージェント間の矛盾する最適化", "時間の経過に伴う運用ドリフト", "新興AI規制による規制リスク", "外部プラットフォームへの戦略的依存"],
    fwBadge: "フレームワーク",
    fwTitle: "自律的意思決定システムのための初のガバナンスアーキテクチャ。",
    fwP1pre: "Agentic Commerce Framework®はAIモデルを制御しない。それが実行する",
    fwP1bold: "意思決定",
    fwP1post: "を統治する。",
    fwP2: "このフレームワークは組織がどのように行うかを定義する：",
    fwList: ["意思決定権限の構造化", "委任不可ゾーンの定義", "自律的行動の制約", "リアルタイム監視の維持", "重要な行動に対する人間の主権の維持"],
    fwP3: "ACFは人間のリーダーシップとマシンの実行の間に、構造化された意思決定ガバナンス層を構築する。",
    compWithout: "ガバナンスなし",
    compWith: "ACF®ガバナンスあり",
    compWithoutLabels: ["不透明性", "ドリフト", "矛盾", "リスク"],
    compWithLabels: ["追跡可能", "可逆", "説明責任", "主権"],
    compWithoutSvg: "制御されない意思決定",
    compWithSvg: "統治された意思決定",
    archBadge: "アーキテクチャ",
    archTitle: "4層のガバナンスアーキテクチャ。",
    archSubtitle: "これらが一体となり、自律運用のための継続的な制御システムを構成する。",
    archL1Name: "ガバナンス",
    archL1Sub: "誰が権限を持つか",
    archL1Text: "ガバナンス層は意思決定の主権を確立する。組織は誰が最終権限を保持するか、どの意思決定が委任可能か、どの意思決定が人間専属のままかを定義する。このレベルで企業はエージェンティック憲法を策定する——AIガバナンスの原則を確立する基本文書である。",
    archL2Name: "ポリシー",
    archL2Sub: "エージェントに許可されること",
    archL2Text: "ポリシーは自律システムの行動境界を定義する。ガバナンス原則を運用規則に変換する——財務閾値、時間的制約、倫理的制限、セクター固有の規制方針。ポリシーはエージェントが明確に定義された意思決定境界内で運用されることを保証する。",
    archL3Name: "システム",
    archL3Sub: "意思決定がどのように実行されるか",
    archL3Text: "システム層は技術的実行環境を統治する。すべての自律的行動は観察可能、中断可能、監査可能なままである——意思決定の追跡性、マルチエージェント協調、多層キルスイッチメカニズムを通じて。目的はエージェントを遅くすることではない。マシンスピードで統治可能な状態を維持することである。",
    archL4Name: "監督",
    archL4Sub: "組織がどのように継続的な監視を維持するか",
    archL4Text: "ガバナンスは一度きりの設定ではない。継続的な運用規律である。監督層は継続的な監視、インシデント対応、ガバナンスレビューを導入する。監督はエージェントシステムが制御を損なうことなく進化することを保証する。",
    centralLine1: "AIは実行を自動化する。",
    centralLine2: "ACFは意思決定を統治する。",
    centralP: "ガバナンスなしでは、自律システムは不透明性を生む。ガバナンスがあれば、戦略的統制のスケーラブルな手段となる。",
    matBadge: "進行",
    matTitle: "4つのエージェンティック成熟度レベル",
    matSubtitle: "古典的自動化から監督付き自律性までの段階的スケール。各レベルはエージェントの意思決定権限を拡大し、ガバナンス要件も高まる。",
    matL0Code: "レベル0",
    matL0Name: "古典的自動化",
    matL0Risk: "非常に低いリスク",
    matL0Desc: "固定ルール、MLなし。あらゆる変更に人間の介入が必要。",
    matL1Code: "レベル1",
    matL1Name: "支援エージェント",
    matL1Risk: "低リスク",
    matL1Desc: "エージェントが分析し推奨する。最終決定はすべて人間が行う。",
    matL2Code: "レベル2",
    matL2Name: "統治エージェント",
    matL2Risk: "中程度のリスク",
    matL2Desc: "エージェントは厳格なガバナンス内で意思決定する。委任不可ゾーンはロック。",
    matL2Recommended: "推奨目標",
    matL3Code: "レベル3",
    matL3Name: "監督付き自律",
    matL3Risk: "高リスク",
    matL3Desc: "エージェントが意思決定し学習する。最大限のガバナンス。成熟した組織のみ。",
    modBadge: "方法論",
    modTitle: "8つの実装モジュール",
    modSubtitle: "6〜18ヶ月にわたって段階的に展開される逐次パス。",
    mod01Code: "MOD_01",
    mod01Name: "主権診断",
    mod01Desc: "主権スコアの算出。リスクゾーンのマッピング。",
    mod02Code: "MOD_02",
    mod02Name: "意思決定マッピング",
    mod02Desc: "クリティカリティマトリクス。委任不可ゾーン。",
    mod03Code: "MOD_03",
    mod03Name: "エージェンティック憲法",
    mod03Desc: "9条項。ガバナンス委員会が署名。",
    mod04Code: "MOD_04",
    mod04Name: "エージェントシステム設計",
    mod04Desc: "マンデートシート、インタラクション境界。",
    mod05Code: "MOD_05",
    mod05Name: "セキュリティと可逆性",
    mod05Desc: "サンドボックス化、可逆性計画。キルスイッチ設計。",
    mod06Code: "MOD_06",
    mod06Name: "継続的ガバナンス",
    mod06Desc: "月次レビュー。年次コンプライアンス監査。",
    mod07Code: "MOD_07",
    mod07Name: "実装ロードマップ",
    mod07Desc: "5フェーズの段階的展開。",
    mod08Code: "MOD_08",
    mod08Name: "危機管理",
    mod08Desc: "3レベルのインシデント。キルスイッチ訓練。",
    loopBadge: "運用規律",
    loopTitle: "エージェントガバナンスループ",
    loopSubtitle: "ガバナンスは設定ではない。継続的な運用ループである——定義、制約、実行、監視、介入、改善。そして再びループする。",
    ecoBadge: "エコシステム",
    ecoTitle: "ACFオペレーティングシステム",
    ecoSubtitle: "5つの統合ツール。1つのクローズドループシステム。診断→訓練→監視→認証→スケール。",
    ecoScore: "意思決定の主権とガバナンスの成熟度を測定する迅速な診断。",
    ecoControl: "自律システムを監視するリアルタイムプラットフォーム。",
    ecoAcademy: "自律システムを統治するエグゼクティブとオペレーターのための研修。",
    ecoCert: "ガバナンスの成熟度を検証するACF TRUST™およびACF CERTIFIEDラベル。",
    questionBadge: "新しい運用規律",
    questionP1: "自律システムへの移行はテクノロジーの変化ではない。ガバナンスの変化である。",
    questionP2: "組織はソフトウェアの管理から意思決定システムの統治へと進化しなければならない。",
    questionP3: "Agentic Commerce Framework®はそのために必要な構造を提供する。",
    questionPre: "なぜなら自律システムの時代において、\n最も重要な問いはもはや：",
    questionOld: "「AIは何ができるか？」",
    questionNew1: "「AIが下す意思決定を",
    questionNew2: "誰が統治するのか",
    questionNew3: "？」",
    ctaAssess: "ガバナンスを評価する →",
    ctaResearch: "研究を読む",
    svgHumanAuthority: "人間の権限",
    svgHumanAuthoritySub: "リーダーシップ · 戦略 · 説明責任",
    svgL1: "ガバナンス",
    svgL1Sub: "誰が決定 · 権限 · 憲法",
    svgL2: "ポリシー",
    svgL2Sub: "規則 · 制約 · 倫理的ガードレール",
    svgL3: "システム",
    svgL3Sub: "エージェント · 追跡性 · キルスイッチ",
    svgL4: "監督",
    svgL4Sub: "モニタリング · インシデント · 主権",
    svgMachineSpeed: "マシンスピード実行",
    loopDefine: "定義", loopDefineSub: "権限",
    loopConstrain: "制約", loopConstrainSub: "規則",
    loopExecute: "実行", loopExecuteSub: "エージェント",
    loopMonitor: "監視", loopMonitorSub: "ドリフト",
    loopIntervene: "介入", loopInterveneSub: "オーバーライド",
    loopImprove: "改善", loopImproveSub: "進化",
    loopCenter1: "継続的",
    loopCenter2: "ループ",
    ecoFlowScore: "Score", ecoFlowScoreAction: "診断",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "訓練",
    ecoFlowControl: "Control", ecoFlowControlAction: "監視",
    ecoFlowCert: "認証", ecoFlowCertAction: "認証する",
    ecoFlowPartners: "パートナー", ecoFlowPartnersAction: "スケール",
    ecoFlowClosedLoop: "クローズドループ",
  },
  zh: {
    navTitle: "ACF STANDARD",
    navSubtitle: "治理框架",
    navHome: "← 首页",
    navFramework: "框架",
    navArchitecture: "架构",
    navEcosystem: "生态系统",
    navBlog: "博客",
    navCta: "获取评分 →",
    heroBadge: "治理标准",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "在自主系统时代治理决策。",
    heroCta: "阅读框架 ↓",
    shiftBadge: "转折",
    shiftLine1: "人工智能不再只是一种工具。",
    shiftLine2: "它正在成为决策者。",
    shiftP1: "在各行各业，自主代理正在实时执行运营决策——价格调整、采购订单、客户互动、物流路由、风险评估。",
    shiftP2pre: "这些决策以机器速度持续发生。而在大多数组织中，",
    shiftP2bold: "不存在任何治理架构来监督这些决策。",
    shiftP3pre: "结果产生了一种新的风险类别：",
    shiftP3bold: "不受控制的自主决策系统。",
    shiftP4: "Agentic Commerce Framework®正是为解决这个问题而创建的。",
    stmtLine1: "自主系统不会制造混乱。",
    stmtLine2: "未被治理的决策才会。",
    stat1Label: "的组织没有正式的AI治理",
    stat2Label: "AI法案最高制裁额或全球收入的7%",
    stat3Label: "结构化治理降低修正成本",
    stat4Label: "一级终止开关响应时间（ACF规范）",
    gapBadge: "治理缺口",
    gapTitle: "组织花了十年时间采用AI。治理模型从未演进。",
    gapP1: "传统治理假设一个简单的结构：人类决策，系统执行。",
    gapP2pre: "代理系统颠覆了这种关系。机器现在执行",
    gapP2bold: "并做出决策",
    gapP2post: "——在定义的参数范围内。",
    gapP3: "当这种转变在没有结构化治理的情况下发生时，组织将失去对自身运营决策的可见性和控制。后果不是理论上的：",
    gapList: ["无法追踪的自主决策", "代理之间相互冲突的优化", "随时间推移的运营偏移", "新兴AI法规下的监管风险", "对外部平台的战略依赖"],
    fwBadge: "框架",
    fwTitle: "自主决策系统的首个治理架构。",
    fwP1pre: "Agentic Commerce Framework®不控制AI模型。它治理AI模型执行的",
    fwP1bold: "决策",
    fwP1post: "。",
    fwP2: "该框架定义了组织如何：",
    fwList: ["构建决策权限", "定义不可委托区域", "约束自主行为", "维持实时监督", "维护人类对关键行动的主权"],
    fwP3: "ACF在人类领导层和机器执行之间建立了一个结构化的决策治理层。",
    compWithout: "无治理",
    compWith: "有ACF®治理",
    compWithoutLabels: ["不透明", "偏移", "冲突", "风险"],
    compWithLabels: ["可追踪", "可逆", "可问责", "主权"],
    compWithoutSvg: "不受控制的决策",
    compWithSvg: "受治理的决策",
    archBadge: "架构",
    archTitle: "四层治理架构。",
    archSubtitle: "它们共同构建了一个用于自主运营的持续控制系统。",
    archL1Name: "治理",
    archL1Sub: "谁拥有权限",
    archL1Text: "治理层建立决策主权。组织定义谁保留最终权限、哪些决策可以委托、哪些必须由人类做出。在此层面，企业正式制定其代理宪法——确立AI治理原则的基础文件。",
    archL2Name: "策略",
    archL2Sub: "代理被允许做什么",
    archL2Text: "策略定义了自主系统的行为边界。它将治理原则转化为运营规则——财务阈值、时间限制、伦理约束、行业特定监管政策。策略确保代理在明确定义的决策边界内运行。",
    archL3Name: "系统",
    archL3Sub: "决策如何执行",
    archL3Text: "系统层治理技术执行环境。每个自主行动保持可观察、可中断和可审计——通过决策追溯性、多代理协调和分层终止开关机制。目标不是减慢代理速度。而是确保它们在机器速度下仍然可治理。",
    archL4Name: "监督",
    archL4Sub: "组织如何维持持续监控",
    archL4Text: "治理不是一次性配置。它是一种持续的运营纪律。监督层引入持续监控、事件响应和治理审查。监督确保代理系统在不侵蚀控制的情况下演进。",
    centralLine1: "AI自动化执行。",
    centralLine2: "ACF治理决策。",
    centralP: "没有治理，自主系统制造不透明。有了治理，它们成为可扩展的战略控制工具。",
    matBadge: "进阶",
    matTitle: "4个代理成熟度级别",
    matSubtitle: "从经典自动化到受监督自主性的渐进式标尺。每个级别增加代理决策权限——以及治理要求。",
    matL0Code: "级别0",
    matL0Name: "经典自动化",
    matL0Risk: "极低风险",
    matL0Desc: "固定规则，无机器学习。任何修改都需要人工干预。",
    matL1Code: "级别1",
    matL1Name: "辅助代理",
    matL1Risk: "低风险",
    matL1Desc: "代理分析并推荐。每个最终决策仍由人类做出。",
    matL2Code: "级别2",
    matL2Name: "受治理代理",
    matL2Risk: "中等风险",
    matL2Desc: "代理在严格治理下做出决策。不可委托区域已锁定。",
    matL2Recommended: "推荐目标",
    matL3Code: "级别3",
    matL3Name: "受监督自主",
    matL3Risk: "高风险",
    matL3Desc: "代理决策并学习。最高级别治理。仅适用于成熟组织。",
    modBadge: "方法论",
    modTitle: "8个实施模块",
    modSubtitle: "在6至18个月内渐进式部署的顺序路径。",
    mod01Code: "MOD_01",
    mod01Name: "主权诊断",
    mod01Desc: "主权评分计算。风险区域映射。",
    mod02Code: "MOD_02",
    mod02Name: "决策映射",
    mod02Desc: "关键性矩阵。不可委托区域。",
    mod03Code: "MOD_03",
    mod03Name: "代理宪法",
    mod03Desc: "9条条款。由治理委员会签署。",
    mod04Code: "MOD_04",
    mod04Name: "代理系统设计",
    mod04Desc: "授权书、交互边界。",
    mod05Code: "MOD_05",
    mod05Name: "安全与可逆性",
    mod05Desc: "沙箱化、可逆性计划。终止开关设计。",
    mod06Code: "MOD_06",
    mod06Name: "持续治理",
    mod06Desc: "月度审查。年度合规审计。",
    mod07Code: "MOD_07",
    mod07Name: "实施路线图",
    mod07Desc: "5阶段渐进式部署。",
    mod08Code: "MOD_08",
    mod08Name: "危机管理",
    mod08Desc: "3级事件。终止开关演练。",
    loopBadge: "运营纪律",
    loopTitle: "代理治理循环",
    loopSubtitle: "治理不是配置。它是一个持续的运营循环——定义、约束、执行、监控、干预、改进。然后再次循环。",
    ecoBadge: "生态系统",
    ecoTitle: "ACF操作系统",
    ecoSubtitle: "五个集成工具。一个闭环系统。诊断→培训→监控→认证→扩展。",
    ecoScore: "快速诊断，衡量决策主权和治理成熟度。",
    ecoControl: "用于监督自主系统的实时平台。",
    ecoAcademy: "为治理自主系统的高管和运营者提供培训。",
    ecoCert: "验证治理成熟度的ACF TRUST™和ACF CERTIFIED标签。",
    questionBadge: "新的运营纪律",
    questionP1: "向自主系统的过渡不是技术变革。而是治理变革。",
    questionP2: "组织必须从管理软件演进到治理决策系统。",
    questionP3: "Agentic Commerce Framework®提供了实现这一目标所需的结构。",
    questionPre: "因为在自主系统的时代，\n最重要的问题不再是：",
    questionOld: "\"AI能做什么？\"",
    questionNew1: "\"谁来治理AI",
    questionNew2: "所做的决策",
    questionNew3: "？\"",
    ctaAssess: "评估您的治理 →",
    ctaResearch: "阅读研究",
    svgHumanAuthority: "人类权限",
    svgHumanAuthoritySub: "领导力 · 战略 · 问责",
    svgL1: "治理",
    svgL1Sub: "谁决策 · 权限 · 宪法",
    svgL2: "策略",
    svgL2Sub: "规则 · 约束 · 伦理护栏",
    svgL3: "系统",
    svgL3Sub: "代理 · 追溯性 · 终止开关",
    svgL4: "监督",
    svgL4Sub: "监控 · 事件 · 主权",
    svgMachineSpeed: "机器速度执行",
    loopDefine: "定义", loopDefineSub: "权限",
    loopConstrain: "约束", loopConstrainSub: "规则",
    loopExecute: "执行", loopExecuteSub: "代理",
    loopMonitor: "监控", loopMonitorSub: "偏移",
    loopIntervene: "干预", loopInterveneSub: "覆盖",
    loopImprove: "改进", loopImproveSub: "演进",
    loopCenter1: "持续",
    loopCenter2: "循环",
    ecoFlowScore: "Score", ecoFlowScoreAction: "诊断",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "培训",
    ecoFlowControl: "Control", ecoFlowControlAction: "监控",
    ecoFlowCert: "认证", ecoFlowCertAction: "认证",
    ecoFlowPartners: "合作伙伴", ecoFlowPartnersAction: "扩展",
    ecoFlowClosedLoop: "闭环",
  },
  ko: {
    navTitle: "ACF STANDARD",
    navSubtitle: "거버넌스 프레임워크",
    navHome: "← 홈",
    navFramework: "프레임워크",
    navArchitecture: "아키텍처",
    navEcosystem: "에코시스템",
    navBlog: "블로그",
    navCta: "스코어 확인 →",
    heroBadge: "거버넌스 표준",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "자율 시스템 시대의 의사결정을 통치한다.",
    heroCta: "프레임워크 읽기 ↓",
    shiftBadge: "전환점",
    shiftLine1: "인공지능은 더 이상 단순한 도구가 아니다.",
    shiftLine2: "의사결정자가 되어가고 있다.",
    shiftP1: "모든 산업에서 자율 에이전트가 실시간으로 운영 의사결정을 실행하고 있다 — 가격 조정, 조달 주문, 고객 참여, 물류 라우팅, 리스크 평가.",
    shiftP2pre: "이러한 의사결정은 기계 속도로 지속적으로 이루어진다. 그리고 대부분의 조직에서 ",
    shiftP2bold: "이를 감독할 거버넌스 아키텍처가 존재하지 않는다.",
    shiftP3pre: "그 결과 새로운 범주의 리스크가 생겼다: ",
    shiftP3bold: "통제되지 않는 자율적 의사결정 시스템.",
    shiftP4: "Agentic Commerce Framework®는 이 문제를 해결하기 위해 만들어졌다.",
    stmtLine1: "자율 시스템이 혼란을 만드는 것이 아니다.",
    stmtLine2: "통치되지 않는 의사결정이 혼란을 만든다.",
    stat1Label: "의 조직이 공식적인 AI 거버넌스를 보유하지 않음",
    stat2Label: "AI법 최대 제재 또는 글로벌 매출의 7%",
    stat3Label: "구조화된 거버넌스로 더 낮은 수정 비용",
    stat4Label: "레벨 1 킬 스위치 응답 시간 (ACF 사양)",
    gapBadge: "거버넌스 갭",
    gapTitle: "조직들은 지난 10년간 AI를 도입해왔다. 거버넌스 모델은 결코 진화하지 않았다.",
    gapP1: "전통적 거버넌스는 단순한 구조를 가정한다: 인간이 결정하고, 시스템이 실행한다.",
    gapP2pre: "에이전틱 시스템은 이 관계를 역전시킨다. 기계가 이제 실행하고 ",
    gapP2bold: "의사결정한다",
    gapP2post: " — 정의된 매개변수 내에서.",
    gapP3: "이 전환이 구조화된 거버넌스 없이 일어나면, 조직은 자신의 운영 의사결정에 대한 가시성과 통제력을 잃는다. 그 결과는 이론적이지 않다:",
    gapList: ["추적 불가능한 자율적 의사결정", "에이전트 간 상충하는 최적화", "시간 경과에 따른 운영 드리프트", "새로운 AI 규제에 따른 규제 리스크", "외부 플랫폼에 대한 전략적 의존"],
    fwBadge: "프레임워크",
    fwTitle: "자율적 의사결정 시스템을 위한 최초의 거버넌스 아키텍처.",
    fwP1pre: "Agentic Commerce Framework®는 AI 모델을 제어하지 않는다. AI 모델이 실행하는 ",
    fwP1bold: "의사결정",
    fwP1post: "을 통치한다.",
    fwP2: "프레임워크는 조직이 어떻게 하는지를 정의한다:",
    fwList: ["의사결정 권한 구조화", "비위임 구역 정의", "자율적 행동 제약", "실시간 감독 유지", "중요 행동에 대한 인간 주권 보존"],
    fwP3: "ACF는 인간 리더십과 기계 실행 사이에 구조화된 의사결정 거버넌스 계층을 구축한다.",
    compWithout: "거버넌스 없음",
    compWith: "ACF® 거버넌스 적용",
    compWithoutLabels: ["불투명", "드리프트", "충돌", "리스크"],
    compWithLabels: ["추적 가능", "가역적", "책임 있는", "주권적"],
    compWithoutSvg: "통제되지 않는 의사결정",
    compWithSvg: "통치된 의사결정",
    archBadge: "아키텍처",
    archTitle: "4계층 거버넌스 아키텍처.",
    archSubtitle: "이들이 함께 자율 운영을 위한 지속적 통제 시스템을 구성한다.",
    archL1Name: "거버넌스",
    archL1Sub: "누가 권한을 보유하는가",
    archL1Text: "거버넌스 계층은 의사결정 주권을 확립한다. 조직은 누가 최종 권한을 보유하는지, 어떤 의사결정이 위임 가능한지, 어떤 것이 인간 전용으로 남는지를 정의한다. 이 수준에서 기업은 에이전틱 헌법을 공식화한다 — AI 거버넌스 원칙을 확립하는 기본 문서이다.",
    archL2Name: "정책",
    archL2Sub: "에이전트가 할 수 있는 것",
    archL2Text: "정책은 자율 시스템의 행동 경계를 정의한다. 거버넌스 원칙을 운영 규칙으로 변환한다 — 재무 임계값, 시간적 제약, 윤리적 한계, 부문별 규제 정책. 정책은 에이전트가 명확히 정의된 의사결정 경계 내에서 운영되도록 보장한다.",
    archL3Name: "시스템",
    archL3Sub: "의사결정이 어떻게 실행되는가",
    archL3Text: "시스템 계층은 기술적 실행 환경을 통치한다. 모든 자율적 행동은 관찰 가능, 중단 가능, 감사 가능한 상태로 유지된다 — 의사결정 추적성, 다중 에이전트 조정, 다층 킬 스위치 메커니즘을 통해. 목표는 에이전트를 늦추는 것이 아니다. 기계 속도에서 통치 가능한 상태를 유지하는 것이다.",
    archL4Name: "감독",
    archL4Sub: "조직이 어떻게 지속적 모니터링을 유지하는가",
    archL4Text: "거버넌스는 일회성 구성이 아니다. 지속적인 운영 규율이다. 감독 계층은 지속적 모니터링, 인시던트 대응 및 거버넌스 검토를 도입한다. 감독은 에이전트 시스템이 통제를 약화시키지 않고 진화하도록 보장한다.",
    centralLine1: "AI는 실행을 자동화한다.",
    centralLine2: "ACF는 의사결정을 통치한다.",
    centralP: "거버넌스 없이 자율 시스템은 불투명성을 만든다. 거버넌스가 있으면 확장 가능한 전략적 통제 도구가 된다.",
    matBadge: "진행",
    matTitle: "4가지 에이전틱 성숙도 레벨",
    matSubtitle: "고전적 자동화에서 감독된 자율성까지의 점진적 척도. 각 레벨은 에이전트 의사결정 권한을 높이고 — 거버넌스 요구사항도 높아진다.",
    matL0Code: "레벨 0",
    matL0Name: "고전적 자동화",
    matL0Risk: "매우 낮은 리스크",
    matL0Desc: "고정 규칙, ML 없음. 모든 수정에 인간 개입 필요.",
    matL1Code: "레벨 1",
    matL1Name: "보조 에이전트",
    matL1Risk: "낮은 리스크",
    matL1Desc: "에이전트가 분석하고 추천한다. 모든 최종 결정은 인간이 내린다.",
    matL2Code: "레벨 2",
    matL2Name: "통치 에이전트",
    matL2Risk: "중간 리스크",
    matL2Desc: "에이전트가 엄격한 거버넌스 내에서 결정한다. 비위임 구역 잠금.",
    matL2Recommended: "권장 목표",
    matL3Code: "레벨 3",
    matL3Name: "감독된 자율",
    matL3Risk: "높은 리스크",
    matL3Desc: "에이전트가 결정하고 학습한다. 최대 거버넌스. 성숙한 조직만 해당.",
    modBadge: "방법론",
    modTitle: "8개 구현 모듈",
    modSubtitle: "6~18개월에 걸쳐 점진적으로 배포되는 순차적 경로.",
    mod01Code: "MOD_01",
    mod01Name: "주권 진단",
    mod01Desc: "주권 스코어 산정. 리스크 구역 매핑.",
    mod02Code: "MOD_02",
    mod02Name: "의사결정 매핑",
    mod02Desc: "중요도 매트릭스. 비위임 구역.",
    mod03Code: "MOD_03",
    mod03Name: "에이전틱 헌법",
    mod03Desc: "9개 조항. 거버넌스 위원회 서명.",
    mod04Code: "MOD_04",
    mod04Name: "에이전트 시스템 설계",
    mod04Desc: "위임장, 상호작용 경계.",
    mod05Code: "MOD_05",
    mod05Name: "보안 및 가역성",
    mod05Desc: "샌드박싱, 가역성 계획. 킬 스위치 설계.",
    mod06Code: "MOD_06",
    mod06Name: "지속적 거버넌스",
    mod06Desc: "월간 검토. 연간 컴플라이언스 감사.",
    mod07Code: "MOD_07",
    mod07Name: "구현 로드맵",
    mod07Desc: "5단계 점진적 배포.",
    mod08Code: "MOD_08",
    mod08Name: "위기 관리",
    mod08Desc: "3단계 인시던트. 킬 스위치 훈련.",
    loopBadge: "운영 규율",
    loopTitle: "에이전트 거버넌스 루프",
    loopSubtitle: "거버넌스는 구성이 아니다. 지속적인 운영 루프이다 — 정의, 제약, 실행, 모니터링, 개입, 개선. 그리고 다시 루프.",
    ecoBadge: "에코시스템",
    ecoTitle: "ACF 운영 시스템",
    ecoSubtitle: "5개의 통합 도구. 하나의 폐쇄 루프 시스템. 진단 → 교육 → 모니터링 → 인증 → 확장.",
    ecoScore: "의사결정 주권과 거버넌스 성숙도를 측정하는 빠른 진단.",
    ecoControl: "자율 시스템을 감독하는 실시간 플랫폼.",
    ecoAcademy: "자율 시스템을 통치하는 경영진과 운영자를 위한 교육.",
    ecoCert: "거버넌스 성숙도를 검증하는 ACF TRUST™ 및 ACF CERTIFIED 라벨.",
    questionBadge: "새로운 운영 규율",
    questionP1: "자율 시스템으로의 전환은 기술 변화가 아니다. 거버넌스 변화이다.",
    questionP2: "조직은 소프트웨어 관리에서 의사결정 시스템 통치로 진화해야 한다.",
    questionP3: "Agentic Commerce Framework®는 이를 위해 필요한 구조를 제공한다.",
    questionPre: "자율 시스템 시대에\n가장 중요한 질문은 더 이상:",
    questionOld: "\"AI가 무엇을 할 수 있는가?\"",
    questionNew1: "\"AI가 내리는 의사결정을 ",
    questionNew2: "누가 통치하는가",
    questionNew3: "?\"",
    ctaAssess: "거버넌스를 평가하세요 →",
    ctaResearch: "연구 읽기",
    svgHumanAuthority: "인간 권한",
    svgHumanAuthoritySub: "리더십 · 전략 · 책임",
    svgL1: "거버넌스",
    svgL1Sub: "누가 결정 · 권한 · 헌법",
    svgL2: "정책",
    svgL2Sub: "규칙 · 제약 · 윤리적 가드레일",
    svgL3: "시스템",
    svgL3Sub: "에이전트 · 추적성 · 킬 스위치",
    svgL4: "감독",
    svgL4Sub: "모니터링 · 인시던트 · 주권",
    svgMachineSpeed: "기계 속도 실행",
    loopDefine: "정의", loopDefineSub: "권한",
    loopConstrain: "제약", loopConstrainSub: "규칙",
    loopExecute: "실행", loopExecuteSub: "에이전트",
    loopMonitor: "모니터링", loopMonitorSub: "드리프트",
    loopIntervene: "개입", loopInterveneSub: "오버라이드",
    loopImprove: "개선", loopImproveSub: "진화",
    loopCenter1: "지속적",
    loopCenter2: "루프",
    ecoFlowScore: "Score", ecoFlowScoreAction: "진단",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "교육",
    ecoFlowControl: "Control", ecoFlowControlAction: "모니터링",
    ecoFlowCert: "인증", ecoFlowCertAction: "인증",
    ecoFlowPartners: "파트너", ecoFlowPartnersAction: "확장",
    ecoFlowClosedLoop: "폐쇄 루프",
  },
  it: {
    navTitle: "ACF STANDARD",
    navSubtitle: "IL FRAMEWORK DI GOVERNANCE",
    navHome: "← Home",
    navFramework: "Framework",
    navArchitecture: "Architettura",
    navEcosystem: "Ecosistema",
    navBlog: "Blog",
    navCta: "Il tuo Score →",
    heroBadge: "Lo standard di governance",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Governare le decisioni nell'era dei sistemi autonomi.",
    heroCta: "Leggi il framework ↓",
    shiftBadge: "La svolta",
    shiftLine1: "L'intelligenza artificiale non è più solo uno strumento.",
    shiftLine2: "Sta diventando un decisore.",
    shiftP1: "In tutti i settori, agenti autonomi eseguono ora decisioni operative in tempo reale — aggiustamenti di prezzo, ordini di approvvigionamento, engagement dei clienti, routing logistico, valutazioni del rischio.",
    shiftP2pre: "Queste decisioni avvengono continuamente, alla velocità delle macchine. E nella maggior parte delle organizzazioni, ",
    shiftP2bold: "non esiste alcuna architettura di governance per supervisionarle.",
    shiftP3pre: "Il risultato è una nuova categoria di rischio: ",
    shiftP3bold: "sistemi decisionali autonomi non controllati.",
    shiftP4: "L'Agentic Commerce Framework® è stato creato per risolvere questo problema.",
    stmtLine1: "I sistemi autonomi non creano il caos.",
    stmtLine2: "Le decisioni non governate, sì.",
    stat1Label: "delle organizzazioni non hanno una governance IA formale",
    stat2Label: "sanzioni massime dell'AI Act o 7% del fatturato globale",
    stat3Label: "costi di correzione inferiori con governance strutturata",
    stat4Label: "tempo di risposta del kill switch Livello 1 (spec. ACF)",
    gapBadge: "Il divario di governance",
    gapTitle: "Le organizzazioni hanno dedicato l'ultimo decennio ad adottare l'IA. I modelli di governance non si sono mai evoluti.",
    gapP1: "La governance tradizionale presuppone una struttura semplice: gli umani decidono, i sistemi eseguono.",
    gapP2pre: "I sistemi agentici invertono questa relazione. Le macchine ora eseguono ",
    gapP2bold: "e decidono",
    gapP2post: " all'interno di parametri definiti.",
    gapP3: "Quando questo cambiamento avviene senza governance strutturata, le organizzazioni perdono visibilità e controllo sulle proprie decisioni operative. Le conseguenze non sono teoriche:",
    gapList: ["Decisioni autonome non tracciabili", "Ottimizzazioni conflittuali tra agenti", "Deriva operativa nel tempo", "Esposizione normativa alle regolamentazioni IA emergenti", "Dipendenza strategica da piattaforme esterne"],
    fwBadge: "Il framework",
    fwTitle: "La prima architettura di governance per sistemi decisionali autonomi.",
    fwP1pre: "L'Agentic Commerce Framework® non controlla i modelli di IA. Governa le ",
    fwP1bold: "decisioni",
    fwP1post: " che eseguono.",
    fwP2: "Il framework definisce come le organizzazioni:",
    fwList: ["Strutturano l'autorità decisionale", "Definiscono le zone non delegabili", "Vincolano il comportamento autonomo", "Mantengono la supervisione in tempo reale", "Preservano la sovranità umana sulle azioni critiche"],
    fwP3: "ACF crea uno strato strutturato di governance decisionale tra la leadership umana e l'esecuzione delle macchine.",
    compWithout: "SENZA GOVERNANCE",
    compWith: "CON GOVERNANCE ACF®",
    compWithoutLabels: ["Opacità", "Deriva", "Conflitto", "Esposizione"],
    compWithLabels: ["Tracciabile", "Reversibile", "Responsabile", "Sovrano"],
    compWithoutSvg: "DECISIONI NON CONTROLLATE",
    compWithSvg: "DECISIONI GOVERNATE",
    archBadge: "Architettura",
    archTitle: "Un'architettura di governance a quattro livelli.",
    archSubtitle: "Insieme creano un sistema di controllo continuo per le operazioni autonome.",
    archL1Name: "Governance",
    archL1Sub: "Chi detiene l'autorità",
    archL1Text: "Il livello di governance stabilisce la sovranità decisionale. Le organizzazioni definiscono chi mantiene l'autorità finale, quali decisioni possono essere delegate, quali rimangono esclusivamente umane. A questo livello, le aziende formalizzano la loro Costituzione Agentica — il documento fondativo che stabilisce i principi della governance IA.",
    archL2Name: "Policy",
    archL2Sub: "Cosa gli agenti possono fare",
    archL2Text: "La policy definisce i confini comportamentali dei sistemi autonomi. Traduce i principi di governance in regole operative — soglie finanziarie, vincoli temporali, limiti etici, politiche normative settoriali. Le policy assicurano che gli agenti operino entro perimetri decisionali chiaramente definiti.",
    archL3Name: "Sistema",
    archL3Sub: "Come vengono eseguite le decisioni",
    archL3Text: "Il livello di sistema governa l'ambiente di esecuzione tecnica. Ogni azione autonoma rimane osservabile, interrompibile e verificabile — attraverso la tracciabilità delle decisioni, il coordinamento multi-agente e meccanismi di kill switch a più livelli. L'obiettivo non è rallentare gli agenti. È assicurare che rimangano governabili alla velocità delle macchine.",
    archL4Name: "Supervisione",
    archL4Sub: "Come le organizzazioni mantengono una sorveglianza continua",
    archL4Text: "La governance non è una configurazione una tantum. È una disciplina operativa continua. Il livello di supervisione introduce monitoraggio continuo, risposta agli incidenti e revisioni di governance. La supervisione assicura che i sistemi di agenti evolvano senza erodere il controllo.",
    centralLine1: "L'IA automatizza l'esecuzione.",
    centralLine2: "ACF governa le decisioni.",
    centralP: "Senza governance, i sistemi autonomi creano opacità. Con la governance, diventano strumenti scalabili di controllo strategico.",
    matBadge: "Progressione",
    matTitle: "4 livelli di maturità agentica",
    matSubtitle: "Una scala progressiva dall'automazione classica all'autonomia supervisionata. Ogni livello aumenta l'autorità decisionale degli agenti — e i requisiti di governance.",
    matL0Code: "Livello 0",
    matL0Name: "Automazione classica",
    matL0Risk: "Rischio molto basso",
    matL0Desc: "Regole fisse, nessun ML. Intervento umano per qualsiasi modifica.",
    matL1Code: "Livello 1",
    matL1Name: "Agenti assistiti",
    matL1Risk: "Rischio basso",
    matL1Desc: "Gli agenti analizzano e raccomandano. Ogni decisione finale rimane umana.",
    matL2Code: "Livello 2",
    matL2Name: "Agenti governati",
    matL2Risk: "Rischio moderato",
    matL2Desc: "Gli agenti decidono entro una governance rigorosa. Zone non delegabili bloccate.",
    matL2Recommended: "Obiettivo raccomandato",
    matL3Code: "Livello 3",
    matL3Name: "Autonomia supervisionata",
    matL3Risk: "Rischio elevato",
    matL3Desc: "Gli agenti decidono e apprendono. Governance massima. Solo per organizzazioni mature.",
    modBadge: "Metodologia",
    modTitle: "8 moduli di implementazione",
    modSubtitle: "Un percorso sequenziale implementato progressivamente in 6-18 mesi.",
    mod01Code: "MOD_01",
    mod01Name: "Diagnostica della sovranità",
    mod01Desc: "Calcolo del punteggio di sovranità. Mappatura delle zone di rischio.",
    mod02Code: "MOD_02",
    mod02Name: "Mappatura decisionale",
    mod02Desc: "Matrice di criticità. Zone non delegabili.",
    mod03Code: "MOD_03",
    mod03Name: "Costituzione agentica",
    mod03Desc: "9 articoli. Firmata dal comitato di governance.",
    mod04Code: "MOD_04",
    mod04Name: "Progettazione del sistema di agenti",
    mod04Desc: "Schede di mandato, perimetri di interazione.",
    mod05Code: "MOD_05",
    mod05Name: "Sicurezza e reversibilità",
    mod05Desc: "Sandboxing, piano di reversibilità. Progettazione del kill switch.",
    mod06Code: "MOD_06",
    mod06Name: "Governance continua",
    mod06Desc: "Revisioni mensili. Audit di conformità annuale.",
    mod07Code: "MOD_07",
    mod07Name: "Roadmap di implementazione",
    mod07Desc: "Deployment progressivo in 5 fasi.",
    mod08Code: "MOD_08",
    mod08Name: "Gestione delle crisi",
    mod08Desc: "Incidenti a 3 livelli. Esercitazioni kill switch.",
    loopBadge: "Disciplina operativa",
    loopTitle: "Il loop di governance degli agenti",
    loopSubtitle: "La governance non è configurazione. È un loop operativo continuo — definire, vincolare, eseguire, monitorare, intervenire, migliorare. Poi ricominciare.",
    ecoBadge: "L'ecosistema",
    ecoTitle: "Sistema operativo ACF",
    ecoSubtitle: "Cinque strumenti integrati. Un sistema a ciclo chiuso. Diagnosticare → Formare → Monitorare → Certificare → Scalare.",
    ecoScore: "Diagnosi rapida che misura la sovranità decisionale e la maturità di governance.",
    ecoControl: "Piattaforma in tempo reale per la supervisione dei sistemi autonomi.",
    ecoAcademy: "Formazione per dirigenti e operatori che governano sistemi autonomi.",
    ecoCert: "Label ACF TRUST™ e ACF CERTIFIED che validano la maturità di governance.",
    questionBadge: "Una nuova disciplina operativa",
    questionP1: "La transizione ai sistemi autonomi non è un cambiamento tecnologico. È un cambiamento di governance.",
    questionP2: "Le organizzazioni devono evolversi dalla gestione del software alla governance dei sistemi decisionali.",
    questionP3: "L'Agentic Commerce Framework® fornisce la struttura necessaria per farlo.",
    questionPre: "Perché nell'era dei sistemi autonomi,\nla domanda più importante non è più:",
    questionOld: "\"Cosa può fare l'IA?\"",
    questionNew1: "\"Chi governa le decisioni ",
    questionNew2: "che prende",
    questionNew3: "?\"",
    ctaAssess: "Valuta la tua governance →",
    ctaResearch: "Leggi la ricerca",
    svgHumanAuthority: "AUTORITÀ UMANA",
    svgHumanAuthoritySub: "Leadership · Strategia · Responsabilità",
    svgL1: "GOVERNANCE",
    svgL1Sub: "Chi decide · Autorità · Costituzione",
    svgL2: "POLICY",
    svgL2Sub: "Regole · Vincoli · Guardrail etici",
    svgL3: "SISTEMA",
    svgL3Sub: "Agenti · Tracciabilità · Kill switch",
    svgL4: "SUPERVISIONE",
    svgL4Sub: "Monitoraggio · Incidenti · Sovranità",
    svgMachineSpeed: "ESECUZIONE ALLA VELOCITÀ MACCHINA",
    loopDefine: "DEFINIRE", loopDefineSub: "Autorità",
    loopConstrain: "VINCOLARE", loopConstrainSub: "Regole",
    loopExecute: "ESEGUIRE", loopExecuteSub: "Agenti",
    loopMonitor: "MONITORARE", loopMonitorSub: "Deriva",
    loopIntervene: "INTERVENIRE", loopInterveneSub: "Override",
    loopImprove: "MIGLIORARE", loopImproveSub: "Evolvere",
    loopCenter1: "LOOP",
    loopCenter2: "CONTINUO",
    ecoFlowScore: "Score", ecoFlowScoreAction: "Diagnosticare",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Formare",
    ecoFlowControl: "Control", ecoFlowControlAction: "Monitorare",
    ecoFlowCert: "Certificazione", ecoFlowCertAction: "Certificare",
    ecoFlowPartners: "Partner", ecoFlowPartnersAction: "Scalare",
    ecoFlowClosedLoop: "CICLO CHIUSO",
  },
  nl: {
    navTitle: "ACF STANDARD",
    navSubtitle: "HET GOVERNANCE-FRAMEWORK",
    navHome: "← Home",
    navFramework: "Framework",
    navArchitecture: "Architectuur",
    navEcosystem: "Ecosysteem",
    navBlog: "Blog",
    navCta: "Uw Score →",
    heroBadge: "De governance-standaard",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Beslissingen besturen in het tijdperk van autonome systemen.",
    heroCta: "Lees het framework ↓",
    shiftBadge: "De verschuiving",
    shiftLine1: "Kunstmatige intelligentie is niet langer slechts een hulpmiddel.",
    shiftLine2: "Het wordt een besluitvormer.",
    shiftP1: "In alle sectoren voeren autonome agents nu operationele beslissingen uit in realtime — prijsaanpassingen, inkooporders, klantbetrokkenheid, logistieke routing, risicobeoordelingen.",
    shiftP2pre: "Deze beslissingen vinden continu plaats, op machinesnelheid. En in de meeste organisaties ",
    shiftP2bold: "bestaat er geen governance-architectuur om ze te bewaken.",
    shiftP3pre: "Het resultaat is een nieuwe risicocategorie: ",
    shiftP3bold: "ongecontroleerde autonome beslissystemen.",
    shiftP4: "Het Agentic Commerce Framework® is gecreëerd om dit probleem op te lossen.",
    stmtLine1: "Autonome systemen veroorzaken geen chaos.",
    stmtLine2: "Onbestuurde beslissingen wel.",
    stat1Label: "van de organisaties heeft geen formele AI-governance",
    stat2Label: "maximale sancties van de AI Act of 7% van de wereldwijde omzet",
    stat3Label: "lagere correctiekosten met gestructureerde governance",
    stat4Label: "Level 1 kill switch-responstijd (ACF-spec.)",
    gapBadge: "De governance-kloof",
    gapTitle: "Organisaties hebben het afgelopen decennium besteed aan de adoptie van AI. Governance-modellen zijn nooit mee-geëvolueerd.",
    gapP1: "Traditionele governance gaat uit van een eenvoudige structuur: mensen beslissen, systemen voeren uit.",
    gapP2pre: "Agentische systemen keren deze relatie om. Machines voeren nu uit ",
    gapP2bold: "én beslissen",
    gapP2post: " binnen gedefinieerde parameters.",
    gapP3: "Wanneer deze verschuiving plaatsvindt zonder gestructureerde governance, verliezen organisaties zicht en controle op hun eigen operationele beslissingen. De gevolgen zijn niet theoretisch:",
    gapList: ["Onvolgbare autonome beslissingen", "Conflicterende agent-optimalisaties", "Operationele afdrift in de loop der tijd", "Regelgevingsrisico door opkomende AI-regulering", "Strategische afhankelijkheid van externe platforms"],
    fwBadge: "Het framework",
    fwTitle: "De eerste governance-architectuur voor autonome beslissystemen.",
    fwP1pre: "Het Agentic Commerce Framework® controleert geen AI-modellen. Het bestuurt de ",
    fwP1bold: "beslissingen",
    fwP1post: " die ze uitvoeren.",
    fwP2: "Het framework definieert hoe organisaties:",
    fwList: ["Beslissingsautoriteit structureren", "Niet-delegeerbare zones definiëren", "Autonoom gedrag beperken", "Realtime-toezicht handhaven", "Menselijke soevereiniteit over kritieke acties bewaren"],
    fwP3: "ACF creëert een gestructureerde beslissingsgovernance-laag tussen menselijk leiderschap en machine-uitvoering.",
    compWithout: "ZONDER GOVERNANCE",
    compWith: "MET ACF® GOVERNANCE",
    compWithoutLabels: ["Ondoorzichtigheid", "Afdrift", "Conflict", "Blootstelling"],
    compWithLabels: ["Traceerbaar", "Omkeerbaar", "Verantwoordelijk", "Soeverein"],
    compWithoutSvg: "ONGECONTROLEERDE BESLISSINGEN",
    compWithSvg: "BESTUURDE BESLISSINGEN",
    archBadge: "Architectuur",
    archTitle: "Een governance-architectuur in vier lagen.",
    archSubtitle: "Samen creëren ze een continu controlesysteem voor autonome operaties.",
    archL1Name: "Governance",
    archL1Sub: "Wie de autoriteit heeft",
    archL1Text: "De governance-laag vestigt beslissingssoevereiniteit. Organisaties definiëren wie de uiteindelijke autoriteit behoudt, welke beslissingen gedelegeerd kunnen worden, welke exclusief menselijk blijven. Op dit niveau formaliseren bedrijven hun Agentische Grondwet — het basisdocument dat de principes van AI-governance vastlegt.",
    archL2Name: "Beleid",
    archL2Sub: "Wat agents mogen doen",
    archL2Text: "Beleid definieert de gedragsgrenzen van autonome systemen. Het vertaalt governance-principes naar operationele regels — financiële drempels, tijdgebonden beperkingen, ethische grenzen, sectorspecifiek regelgevingsbeleid. Beleid zorgt ervoor dat agents opereren binnen duidelijk gedefinieerde beslissingsperimeters.",
    archL3Name: "Systeem",
    archL3Sub: "Hoe beslissingen worden uitgevoerd",
    archL3Text: "De systeemlaag bestuurt de technische uitvoeringsomgeving. Elke autonome actie blijft observeerbaar, onderbreekbaar en controleerbaar — door beslissingstraceerbaarheid, multi-agentcoördinatie en meerlaagse kill switch-mechanismen. Het doel is niet om agents te vertragen. Het is om ervoor te zorgen dat ze bestuurbaar blijven op machinesnelheid.",
    archL4Name: "Supervisie",
    archL4Sub: "Hoe organisaties continu toezicht handhaven",
    archL4Text: "Governance is geen eenmalige configuratie. Het is een doorlopende operationele discipline. De supervisielaag introduceert continue monitoring, incidentrespons en governance-reviews. Supervisie zorgt ervoor dat agentsystemen evolueren zonder de controle aan te tasten.",
    centralLine1: "AI automatiseert de uitvoering.",
    centralLine2: "ACF bestuurt de beslissingen.",
    centralP: "Zonder governance creëren autonome systemen ondoorzichtigheid. Met governance worden ze schaalbare instrumenten van strategische controle.",
    matBadge: "Progressie",
    matTitle: "4 agentische volwassenheidsniveaus",
    matSubtitle: "Een progressieve schaal van klassieke automatisering tot bewaakt autonomie. Elk niveau verhoogt de beslissingsautoriteit van agents — en de governance-vereisten.",
    matL0Code: "Level 0",
    matL0Name: "Klassieke automatisering",
    matL0Risk: "Zeer laag risico",
    matL0Desc: "Vaste regels, geen ML. Menselijke interventie voor elke wijziging.",
    matL1Code: "Level 1",
    matL1Name: "Geassisteerde agents",
    matL1Risk: "Laag risico",
    matL1Desc: "Agents analyseren en adviseren. Elke eindbeslissing blijft bij een mens.",
    matL2Code: "Level 2",
    matL2Name: "Bestuurde agents",
    matL2Risk: "Matig risico",
    matL2Desc: "Agents beslissen binnen strikte governance. Niet-delegeerbare zones vergrendeld.",
    matL2Recommended: "Aanbevolen doel",
    matL3Code: "Level 3",
    matL3Name: "Bewaakte autonomie",
    matL3Risk: "Hoog risico",
    matL3Desc: "Agents beslissen en leren. Maximale governance. Alleen voor volwassen organisaties.",
    modBadge: "Methodologie",
    modTitle: "8 implementatiemodules",
    modSubtitle: "Een sequentieel pad, progressief uitgerold over 6-18 maanden.",
    mod01Code: "MOD_01",
    mod01Name: "Soevereiniteitsdiagnostiek",
    mod01Desc: "Berekening van de soevereiniteitsscore. Risicozone-mapping.",
    mod02Code: "MOD_02",
    mod02Name: "Beslissingsmapping",
    mod02Desc: "Kritikaliteitsmatrix. Niet-delegeerbare zones.",
    mod03Code: "MOD_03",
    mod03Name: "Agentische grondwet",
    mod03Desc: "9 artikelen. Ondertekend door het governance-comité.",
    mod04Code: "MOD_04",
    mod04Name: "Agentsysteemontwerp",
    mod04Desc: "Mandaatbladen, interactieperimeters.",
    mod05Code: "MOD_05",
    mod05Name: "Beveiliging & omkeerbaarheid",
    mod05Desc: "Sandboxing, omkeerbaarheidsplan. Kill switch-ontwerp.",
    mod06Code: "MOD_06",
    mod06Name: "Continue governance",
    mod06Desc: "Maandelijkse reviews. Jaarlijkse compliance-audit.",
    mod07Code: "MOD_07",
    mod07Name: "Implementatie-roadmap",
    mod07Desc: "Progressieve uitrol in 5 fasen.",
    mod08Code: "MOD_08",
    mod08Name: "Crisismanagement",
    mod08Desc: "3-niveau incidenten. Kill switch-oefeningen.",
    loopBadge: "Operationele discipline",
    loopTitle: "De Agent Governance Loop",
    loopSubtitle: "Governance is geen configuratie. Het is een continue operationele lus — definiëren, beperken, uitvoeren, monitoren, ingrijpen, verbeteren. Dan opnieuw.",
    ecoBadge: "Het ecosysteem",
    ecoTitle: "ACF-besturingssysteem",
    ecoSubtitle: "Vijf geïntegreerde tools. Eén gesloten systeem. Diagnosticeren → Opleiden → Monitoren → Certificeren → Schalen.",
    ecoScore: "Snelle diagnose die beslissingssoevereiniteit en governance-volwassenheid meet.",
    ecoControl: "Realtime-platform voor het bewaken van autonome systemen.",
    ecoAcademy: "Training voor leidinggevenden en operators die autonome systemen besturen.",
    ecoCert: "ACF TRUST™- en ACF CERTIFIED-labels die governance-volwassenheid valideren.",
    questionBadge: "Een nieuwe operationele discipline",
    questionP1: "De transitie naar autonome systemen is geen technologische verschuiving. Het is een governance-verschuiving.",
    questionP2: "Organisaties moeten evolueren van softwarebeheer naar het besturen van beslissystemen.",
    questionP3: "Het Agentic Commerce Framework® biedt de structuur die daarvoor nodig is.",
    questionPre: "Want in het tijdperk van autonome systemen\nis de belangrijkste vraag niet langer:",
    questionOld: "\"Wat kan AI?\"",
    questionNew1: "\"Wie bestuurt de beslissingen ",
    questionNew2: "die het neemt",
    questionNew3: "?\"",
    ctaAssess: "Beoordeel uw governance →",
    ctaResearch: "Lees het onderzoek",
    svgHumanAuthority: "MENSELIJKE AUTORITEIT",
    svgHumanAuthoritySub: "Leiderschap · Strategie · Verantwoordelijkheid",
    svgL1: "GOVERNANCE",
    svgL1Sub: "Wie beslist · Autoriteit · Grondwet",
    svgL2: "BELEID",
    svgL2Sub: "Regels · Beperkingen · Ethische vangrails",
    svgL3: "SYSTEEM",
    svgL3Sub: "Agents · Traceerbaarheid · Kill switch",
    svgL4: "SUPERVISIE",
    svgL4Sub: "Monitoring · Incidenten · Soevereiniteit",
    svgMachineSpeed: "UITVOERING OP MACHINESNELHEID",
    loopDefine: "DEFINIËREN", loopDefineSub: "Autoriteit",
    loopConstrain: "BEPERKEN", loopConstrainSub: "Regels",
    loopExecute: "UITVOEREN", loopExecuteSub: "Agents",
    loopMonitor: "MONITOREN", loopMonitorSub: "Afdrift",
    loopIntervene: "INGRIJPEN", loopInterveneSub: "Override",
    loopImprove: "VERBETEREN", loopImproveSub: "Evolueren",
    loopCenter1: "CONTINUE",
    loopCenter2: "LUS",
    ecoFlowScore: "Score", ecoFlowScoreAction: "Diagnosticeren",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Opleiden",
    ecoFlowControl: "Control", ecoFlowControlAction: "Monitoren",
    ecoFlowCert: "Certificering", ecoFlowCertAction: "Certificeren",
    ecoFlowPartners: "Partners", ecoFlowPartnersAction: "Schalen",
    ecoFlowClosedLoop: "GESLOTEN LUS",
  },
  ru: {
    navTitle: "ACF STANDARD",
    navSubtitle: "СТРУКТУРА УПРАВЛЕНИЯ",
    navHome: "← Главная",
    navFramework: "Фреймворк",
    navArchitecture: "Архитектура",
    navEcosystem: "Экосистема",
    navBlog: "Блог",
    navCta: "Ваш Score →",
    heroBadge: "Стандарт управления",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Управление решениями в эпоху автономных систем.",
    heroCta: "Читать фреймворк ↓",
    shiftBadge: "Перелом",
    shiftLine1: "Искусственный интеллект — это больше не просто инструмент.",
    shiftLine2: "Он становится лицом, принимающим решения.",
    shiftP1: "Во всех отраслях автономные агенты теперь принимают операционные решения в реальном времени — корректировка цен, заказы на закупку, взаимодействие с клиентами, логистическая маршрутизация, оценка рисков.",
    shiftP2pre: "Эти решения принимаются непрерывно, со скоростью машин. И в большинстве организаций ",
    shiftP2bold: "не существует архитектуры управления для их контроля.",
    shiftP3pre: "Результат — новая категория рисков: ",
    shiftP3bold: "неконтролируемые автономные системы принятия решений.",
    shiftP4: "Agentic Commerce Framework® был создан для решения этой проблемы.",
    stmtLine1: "Автономные системы не создают хаос.",
    stmtLine2: "Неуправляемые решения — создают.",
    stat1Label: "организаций не имеют формального управления ИИ",
    stat2Label: "максимальные санкции AI Act или 7% мирового дохода",
    stat3Label: "снижение затрат на исправление при структурированном управлении",
    stat4Label: "время отклика аварийного отключения Уровня 1 (спец. ACF)",
    gapBadge: "Пробел в управлении",
    gapTitle: "Организации потратили последнее десятилетие на внедрение ИИ. Модели управления так и не эволюционировали.",
    gapP1: "Традиционное управление предполагает простую структуру: люди решают, системы исполняют.",
    gapP2pre: "Агентные системы переворачивают эту связь. Машины теперь исполняют ",
    gapP2bold: "и принимают решения",
    gapP2post: " в рамках заданных параметров.",
    gapP3: "Когда этот сдвиг происходит без структурированного управления, организации теряют видимость и контроль над собственными операционными решениями. Последствия не являются теоретическими:",
    gapList: ["Неотслеживаемые автономные решения", "Конфликтующие оптимизации агентов", "Операционный дрейф со временем", "Регуляторные риски в условиях формирующегося регулирования ИИ", "Стратегическая зависимость от внешних платформ"],
    fwBadge: "Фреймворк",
    fwTitle: "Первая архитектура управления для автономных систем принятия решений.",
    fwP1pre: "Agentic Commerce Framework® не контролирует модели ИИ. Он управляет ",
    fwP1bold: "решениями",
    fwP1post: ", которые они исполняют.",
    fwP2: "Фреймворк определяет, как организации:",
    fwList: ["Структурируют полномочия принятия решений", "Определяют зоны, не подлежащие делегированию", "Ограничивают автономное поведение", "Поддерживают надзор в реальном времени", "Сохраняют суверенитет человека над критическими действиями"],
    fwP3: "ACF создаёт структурированный слой управления решениями между человеческим руководством и машинным исполнением.",
    compWithout: "БЕЗ УПРАВЛЕНИЯ",
    compWith: "С УПРАВЛЕНИЕМ ACF®",
    compWithoutLabels: ["Непрозрачность", "Дрейф", "Конфликт", "Риск"],
    compWithLabels: ["Отслеживаемый", "Обратимый", "Подотчётный", "Суверенный"],
    compWithoutSvg: "НЕКОНТРОЛИРУЕМЫЕ РЕШЕНИЯ",
    compWithSvg: "УПРАВЛЯЕМЫЕ РЕШЕНИЯ",
    archBadge: "Архитектура",
    archTitle: "Четырёхуровневая архитектура управления.",
    archSubtitle: "Вместе они создают непрерывную систему контроля автономных операций.",
    archL1Name: "Управление",
    archL1Sub: "Кто обладает полномочиями",
    archL1Text: "Уровень управления устанавливает суверенитет принятия решений. Организации определяют, кто сохраняет конечные полномочия, какие решения могут быть делегированы, какие остаются исключительно за людьми. На этом уровне компании формализуют свою Агентную Конституцию — основополагающий документ, устанавливающий принципы управления ИИ.",
    archL2Name: "Политика",
    archL2Sub: "Что агентам разрешено делать",
    archL2Text: "Политика определяет поведенческие границы автономных систем. Она переводит принципы управления в операционные правила — финансовые пороги, временные ограничения, этические пределы, отраслевые регуляторные политики. Политики гарантируют, что агенты действуют в чётко определённых границах принятия решений.",
    archL3Name: "Система",
    archL3Sub: "Как исполняются решения",
    archL3Text: "Системный уровень управляет технической средой исполнения. Каждое автономное действие остаётся наблюдаемым, прерываемым и проверяемым — через отслеживаемость решений, координацию мультиагентов и многоуровневые механизмы аварийного отключения. Цель — не замедлить агентов. А обеспечить их управляемость на машинной скорости.",
    archL4Name: "Надзор",
    archL4Sub: "Как организации поддерживают непрерывный мониторинг",
    archL4Text: "Управление — это не разовая настройка. Это непрерывная операционная дисциплина. Уровень надзора вводит непрерывный мониторинг, реагирование на инциденты и пересмотр управления. Надзор гарантирует, что агентные системы развиваются без размывания контроля.",
    centralLine1: "ИИ автоматизирует исполнение.",
    centralLine2: "ACF управляет решениями.",
    centralP: "Без управления автономные системы создают непрозрачность. С управлением они становятся масштабируемыми инструментами стратегического контроля.",
    matBadge: "Прогрессия",
    matTitle: "4 уровня агентной зрелости",
    matSubtitle: "Прогрессивная шкала от классической автоматизации до контролируемой автономии. Каждый уровень повышает полномочия агентов в принятии решений — и требования к управлению.",
    matL0Code: "Уровень 0",
    matL0Name: "Классическая автоматизация",
    matL0Risk: "Очень низкий риск",
    matL0Desc: "Фиксированные правила, без ML. Вмешательство человека при любом изменении.",
    matL1Code: "Уровень 1",
    matL1Name: "Ассистируемые агенты",
    matL1Risk: "Низкий риск",
    matL1Desc: "Агенты анализируют и рекомендуют. Каждое итоговое решение остаётся за человеком.",
    matL2Code: "Уровень 2",
    matL2Name: "Управляемые агенты",
    matL2Risk: "Умеренный риск",
    matL2Desc: "Агенты принимают решения в рамках строгого управления. Зоны без делегирования заблокированы.",
    matL2Recommended: "Рекомендуемая цель",
    matL3Code: "Уровень 3",
    matL3Name: "Контролируемая автономия",
    matL3Risk: "Высокий риск",
    matL3Desc: "Агенты принимают решения и обучаются. Максимальное управление. Только для зрелых организаций.",
    modBadge: "Методология",
    modTitle: "8 модулей внедрения",
    modSubtitle: "Последовательный путь, развёртываемый поэтапно в течение 6–18 месяцев.",
    mod01Code: "MOD_01",
    mod01Name: "Диагностика суверенитета",
    mod01Desc: "Расчёт показателя суверенитета. Картирование зон риска.",
    mod02Code: "MOD_02",
    mod02Name: "Картирование решений",
    mod02Desc: "Матрица критичности. Зоны без делегирования.",
    mod03Code: "MOD_03",
    mod03Name: "Агентная конституция",
    mod03Desc: "9 статей. Подписана комитетом по управлению.",
    mod04Code: "MOD_04",
    mod04Name: "Проектирование агентной системы",
    mod04Desc: "Мандатные листы, периметры взаимодействия.",
    mod05Code: "MOD_05",
    mod05Name: "Безопасность и обратимость",
    mod05Desc: "Песочница, план обратимости. Проектирование аварийного отключения.",
    mod06Code: "MOD_06",
    mod06Name: "Непрерывное управление",
    mod06Desc: "Ежемесячные обзоры. Ежегодный аудит соответствия.",
    mod07Code: "MOD_07",
    mod07Name: "Дорожная карта внедрения",
    mod07Desc: "Поэтапное развёртывание в 5 фазах.",
    mod08Code: "MOD_08",
    mod08Name: "Управление кризисами",
    mod08Desc: "3-уровневые инциденты. Учения по аварийному отключению.",
    loopBadge: "Операционная дисциплина",
    loopTitle: "Цикл управления агентами",
    loopSubtitle: "Управление — это не настройка. Это непрерывный операционный цикл — определить, ограничить, исполнить, мониторить, вмешаться, улучшить. Затем повторить.",
    ecoBadge: "Экосистема",
    ecoTitle: "Операционная система ACF",
    ecoSubtitle: "Пять интегрированных инструментов. Одна замкнутая система. Диагностика → Обучение → Мониторинг → Сертификация → Масштабирование.",
    ecoScore: "Экспресс-диагностика, измеряющая суверенитет решений и зрелость управления.",
    ecoControl: "Платформа реального времени для контроля автономных систем.",
    ecoAcademy: "Обучение для руководителей и операторов, управляющих автономными системами.",
    ecoCert: "Метки ACF TRUST™ и ACF CERTIFIED, подтверждающие зрелость управления.",
    questionBadge: "Новая операционная дисциплина",
    questionP1: "Переход к автономным системам — это не технологический сдвиг. Это сдвиг в управлении.",
    questionP2: "Организации должны перейти от управления программным обеспечением к управлению системами принятия решений.",
    questionP3: "Agentic Commerce Framework® предоставляет необходимую для этого структуру.",
    questionPre: "Потому что в эпоху автономных систем\nсамый важный вопрос — уже не:",
    questionOld: "\"Что может ИИ?\"",
    questionNew1: "\"Кто управляет решениями, ",
    questionNew2: "которые он принимает",
    questionNew3: "?\"",
    ctaAssess: "Оцените своё управление →",
    ctaResearch: "Читать исследование",
    svgHumanAuthority: "ЧЕЛОВЕЧЕСКИЕ ПОЛНОМОЧИЯ",
    svgHumanAuthoritySub: "Лидерство · Стратегия · Ответственность",
    svgL1: "УПРАВЛЕНИЕ",
    svgL1Sub: "Кто решает · Полномочия · Конституция",
    svgL2: "ПОЛИТИКА",
    svgL2Sub: "Правила · Ограничения · Этические рамки",
    svgL3: "СИСТЕМА",
    svgL3Sub: "Агенты · Отслеживаемость · Аварийное отключение",
    svgL4: "НАДЗОР",
    svgL4Sub: "Мониторинг · Инциденты · Суверенитет",
    svgMachineSpeed: "ИСПОЛНЕНИЕ НА МАШИННОЙ СКОРОСТИ",
    loopDefine: "ОПРЕДЕЛИТЬ", loopDefineSub: "Полномочия",
    loopConstrain: "ОГРАНИЧИТЬ", loopConstrainSub: "Правила",
    loopExecute: "ИСПОЛНИТЬ", loopExecuteSub: "Агенты",
    loopMonitor: "МОНИТОРИТЬ", loopMonitorSub: "Дрейф",
    loopIntervene: "ВМЕШАТЬСЯ", loopInterveneSub: "Переопределение",
    loopImprove: "УЛУЧШИТЬ", loopImproveSub: "Развитие",
    loopCenter1: "НЕПРЕРЫВНЫЙ",
    loopCenter2: "ЦИКЛ",
    ecoFlowScore: "Score", ecoFlowScoreAction: "Диагностика",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Обучение",
    ecoFlowControl: "Control", ecoFlowControlAction: "Мониторинг",
    ecoFlowCert: "Сертификация", ecoFlowCertAction: "Сертифицировать",
    ecoFlowPartners: "Партнёры", ecoFlowPartnersAction: "Масштабировать",
    ecoFlowClosedLoop: "ЗАМКНУТЫЙ ЦИКЛ",
  },
  ar: {
    navTitle: "ACF STANDARD",
    navSubtitle: "إطار الحوكمة",
    navHome: "← الرئيسية",
    navFramework: "الإطار",
    navArchitecture: "الهندسة",
    navEcosystem: "المنظومة",
    navBlog: "المدونة",
    navCta: "احصل على تقييمك →",
    heroBadge: "معيار الحوكمة",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "حوكمة القرارات في عصر الأنظمة المستقلة.",
    heroCta: "اقرأ الإطار ↓",
    shiftBadge: "التحوّل",
    shiftLine1: "لم يعد الذكاء الاصطناعي مجرد أداة.",
    shiftLine2: "إنه يصبح صانع قرار.",
    shiftP1: "في جميع القطاعات، تنفّذ الوكلاء المستقلون الآن قرارات تشغيلية في الوقت الفعلي — تعديلات الأسعار، أوامر الشراء، التفاعل مع العملاء، توجيه الخدمات اللوجستية، تقييمات المخاطر.",
    shiftP2pre: "تحدث هذه القرارات بشكل مستمر وبسرعة الآلات. وفي معظم المؤسسات، ",
    shiftP2bold: "لا توجد بنية حوكمة للإشراف عليها.",
    shiftP3pre: "النتيجة هي فئة جديدة من المخاطر: ",
    shiftP3bold: "أنظمة قرارات مستقلة غير خاضعة للرقابة.",
    shiftP4: "تم إنشاء Agentic Commerce Framework® لحل هذه المشكلة.",
    stmtLine1: "الأنظمة المستقلة لا تخلق الفوضى.",
    stmtLine2: "القرارات غير المحوكمة هي التي تفعل.",
    stat1Label: "من المؤسسات ليس لديها حوكمة رسمية للذكاء الاصطناعي",
    stat2Label: "الحد الأقصى لعقوبات قانون الذكاء الاصطناعي أو 7% من الإيرادات العالمية",
    stat3Label: "تكاليف تصحيح أقل مع الحوكمة المنظمة",
    stat4Label: "زمن استجابة مفتاح الإيقاف الطارئ المستوى 1 (مواصفات ACF)",
    gapBadge: "فجوة الحوكمة",
    gapTitle: "أمضت المؤسسات العقد الأخير في تبني الذكاء الاصطناعي. نماذج الحوكمة لم تتطور أبداً.",
    gapP1: "تفترض الحوكمة التقليدية هيكلاً بسيطاً: البشر يقررون، والأنظمة تنفذ.",
    gapP2pre: "الأنظمة الوكيلية تعكس هذه العلاقة. الآلات الآن تنفذ ",
    gapP2bold: "وتتخذ القرارات",
    gapP2post: " ضمن معايير محددة.",
    gapP3: "عندما يحدث هذا التحوّل دون حوكمة منظمة، تفقد المؤسسات الرؤية والسيطرة على قراراتها التشغيلية الخاصة. العواقب ليست نظرية:",
    gapList: ["قرارات مستقلة غير قابلة للتتبع", "تحسينات متعارضة بين الوكلاء", "انحراف تشغيلي بمرور الوقت", "تعرّض تنظيمي في ظل لوائح الذكاء الاصطناعي الناشئة", "اعتماد استراتيجي على منصات خارجية"],
    fwBadge: "الإطار",
    fwTitle: "أول بنية حوكمة لأنظمة القرارات المستقلة.",
    fwP1pre: "Agentic Commerce Framework® لا يتحكم في نماذج الذكاء الاصطناعي. إنه يحكم ",
    fwP1bold: "القرارات",
    fwP1post: " التي تنفذها.",
    fwP2: "يحدد الإطار كيف تقوم المؤسسات بـ:",
    fwList: ["هيكلة صلاحيات اتخاذ القرار", "تحديد المناطق غير القابلة للتفويض", "تقييد السلوك المستقل", "الحفاظ على الإشراف في الوقت الفعلي", "الحفاظ على السيادة البشرية على الإجراءات الحرجة"],
    fwP3: "يُنشئ ACF طبقة حوكمة قرارات منظمة بين القيادة البشرية والتنفيذ الآلي.",
    compWithout: "بدون حوكمة",
    compWith: "مع حوكمة ACF®",
    compWithoutLabels: ["غموض", "انحراف", "تعارض", "تعرّض"],
    compWithLabels: ["قابل للتتبع", "قابل للعكس", "خاضع للمساءلة", "سيادي"],
    compWithoutSvg: "قرارات غير خاضعة للرقابة",
    compWithSvg: "قرارات محوكمة",
    archBadge: "الهندسة",
    archTitle: "بنية حوكمة من أربع طبقات.",
    archSubtitle: "معاً تُنشئ نظام رقابة مستمر للعمليات المستقلة.",
    archL1Name: "الحوكمة",
    archL1Sub: "من يملك الصلاحية",
    archL1Text: "تُرسي طبقة الحوكمة سيادة اتخاذ القرار. تحدد المؤسسات من يحتفظ بالصلاحية النهائية، وأي القرارات يمكن تفويضها، وأيها يبقى حصرياً بشرياً. على هذا المستوى، تُصيغ الشركات دستورها الوكيلي — الوثيقة التأسيسية التي تُرسي مبادئ حوكمة الذكاء الاصطناعي.",
    archL2Name: "السياسة",
    archL2Sub: "ما يُسمح للوكلاء بفعله",
    archL2Text: "تحدد السياسة الحدود السلوكية للأنظمة المستقلة. تترجم مبادئ الحوكمة إلى قواعد تشغيلية — عتبات مالية، قيود زمنية، حدود أخلاقية، سياسات تنظيمية قطاعية. تضمن السياسات أن الوكلاء يعملون ضمن نطاقات قرار محددة بوضوح.",
    archL3Name: "النظام",
    archL3Sub: "كيف تُنفّذ القرارات",
    archL3Text: "تحكم طبقة النظام بيئة التنفيذ التقنية. كل إجراء مستقل يبقى قابلاً للملاحظة والمقاطعة والتدقيق — من خلال تتبع القرارات، وتنسيق الوكلاء المتعددين، وآليات مفتاح الإيقاف الطارئ متعددة المستويات. الهدف ليس إبطاء الوكلاء. بل ضمان بقائهم قابلين للحوكمة بسرعة الآلات.",
    archL4Name: "الإشراف",
    archL4Sub: "كيف تحافظ المؤسسات على المراقبة المستمرة",
    archL4Text: "الحوكمة ليست إعداداً لمرة واحدة. إنها انضباط تشغيلي مستمر. تُقدّم طبقة الإشراف المراقبة المستمرة والاستجابة للحوادث ومراجعات الحوكمة. يضمن الإشراف أن أنظمة الوكلاء تتطور دون تآكل السيطرة.",
    centralLine1: "الذكاء الاصطناعي يؤتمت التنفيذ.",
    centralLine2: "ACF يحكم القرارات.",
    centralP: "بدون حوكمة، تُنشئ الأنظمة المستقلة غموضاً. مع الحوكمة، تصبح أدوات قابلة للتوسع للسيطرة الاستراتيجية.",
    matBadge: "التقدم",
    matTitle: "4 مستويات نضج وكيلي",
    matSubtitle: "مقياس تدريجي من الأتمتة الكلاسيكية إلى الاستقلالية المُراقبة. كل مستوى يزيد من صلاحية قرار الوكلاء — ومتطلبات الحوكمة.",
    matL0Code: "المستوى 0",
    matL0Name: "الأتمتة الكلاسيكية",
    matL0Risk: "مخاطر منخفضة جداً",
    matL0Desc: "قواعد ثابتة، بدون تعلم آلي. تدخل بشري لأي تعديل.",
    matL1Code: "المستوى 1",
    matL1Name: "وكلاء مساعدون",
    matL1Risk: "مخاطر منخفضة",
    matL1Desc: "الوكلاء يحللون ويوصون. كل قرار نهائي يبقى بشرياً.",
    matL2Code: "المستوى 2",
    matL2Name: "وكلاء محوكمون",
    matL2Risk: "مخاطر معتدلة",
    matL2Desc: "الوكلاء يقررون ضمن حوكمة صارمة. المناطق غير القابلة للتفويض مقفلة.",
    matL2Recommended: "الهدف الموصى به",
    matL3Code: "المستوى 3",
    matL3Name: "استقلالية مُراقبة",
    matL3Risk: "مخاطر عالية",
    matL3Desc: "الوكلاء يقررون ويتعلمون. أقصى حوكمة. للمؤسسات الناضجة فقط.",
    modBadge: "المنهجية",
    modTitle: "8 وحدات تنفيذ",
    modSubtitle: "مسار متسلسل يُنشر تدريجياً على مدى 6-18 شهراً.",
    mod01Code: "MOD_01",
    mod01Name: "تشخيص السيادة",
    mod01Desc: "حساب درجة السيادة. رسم خرائط مناطق المخاطر.",
    mod02Code: "MOD_02",
    mod02Name: "رسم خرائط القرارات",
    mod02Desc: "مصفوفة الأهمية. المناطق غير القابلة للتفويض.",
    mod03Code: "MOD_03",
    mod03Name: "الدستور الوكيلي",
    mod03Desc: "9 مواد. موقّع من لجنة الحوكمة.",
    mod04Code: "MOD_04",
    mod04Name: "تصميم نظام الوكلاء",
    mod04Desc: "أوراق التفويض، نطاقات التفاعل.",
    mod05Code: "MOD_05",
    mod05Name: "الأمان والقابلية للعكس",
    mod05Desc: "بيئة اختبار معزولة، خطة القابلية للعكس. تصميم مفتاح الإيقاف الطارئ.",
    mod06Code: "MOD_06",
    mod06Name: "الحوكمة المستمرة",
    mod06Desc: "مراجعات شهرية. تدقيق امتثال سنوي.",
    mod07Code: "MOD_07",
    mod07Name: "خارطة طريق التنفيذ",
    mod07Desc: "نشر تدريجي على 5 مراحل.",
    mod08Code: "MOD_08",
    mod08Name: "إدارة الأزمات",
    mod08Desc: "حوادث من 3 مستويات. تدريبات مفتاح الإيقاف الطارئ.",
    loopBadge: "الانضباط التشغيلي",
    loopTitle: "حلقة حوكمة الوكلاء",
    loopSubtitle: "الحوكمة ليست إعداداً. إنها حلقة تشغيلية مستمرة — تحديد، تقييد، تنفيذ، مراقبة، تدخل، تحسين. ثم الحلقة مجدداً.",
    ecoBadge: "المنظومة",
    ecoTitle: "نظام تشغيل ACF",
    ecoSubtitle: "خمس أدوات متكاملة. نظام حلقة مغلقة واحد. تشخيص → تدريب → مراقبة → اعتماد → توسيع.",
    ecoScore: "تشخيص سريع يقيس سيادة القرار ونضج الحوكمة.",
    ecoControl: "منصة في الوقت الفعلي للإشراف على الأنظمة المستقلة.",
    ecoAcademy: "تدريب للمديرين التنفيذيين والمشغلين الذين يحكمون الأنظمة المستقلة.",
    ecoCert: "علامتا ACF TRUST™ و ACF CERTIFIED للتحقق من نضج الحوكمة.",
    questionBadge: "انضباط تشغيلي جديد",
    questionP1: "الانتقال إلى الأنظمة المستقلة ليس تحولاً تكنولوجياً. إنه تحوّل في الحوكمة.",
    questionP2: "يجب على المؤسسات التطور من إدارة البرمجيات إلى حوكمة أنظمة القرارات.",
    questionP3: "يوفر Agentic Commerce Framework® الهيكل اللازم للقيام بذلك.",
    questionPre: "لأنه في عصر الأنظمة المستقلة،\nالسؤال الأهم لم يعد:",
    questionOld: "\"ماذا يمكن للذكاء الاصطناعي أن يفعل؟\"",
    questionNew1: "\"من يحكم القرارات ",
    questionNew2: "التي يتخذها",
    questionNew3: "؟\"",
    ctaAssess: "قيّم حوكمتك →",
    ctaResearch: "اقرأ البحث",
    svgHumanAuthority: "الصلاحية البشرية",
    svgHumanAuthoritySub: "القيادة · الاستراتيجية · المساءلة",
    svgL1: "الحوكمة",
    svgL1Sub: "من يقرر · الصلاحية · الدستور",
    svgL2: "السياسة",
    svgL2Sub: "القواعد · القيود · الحواجز الأخلاقية",
    svgL3: "النظام",
    svgL3Sub: "الوكلاء · التتبع · مفتاح الإيقاف الطارئ",
    svgL4: "الإشراف",
    svgL4Sub: "المراقبة · الحوادث · السيادة",
    svgMachineSpeed: "تنفيذ بسرعة الآلة",
    loopDefine: "تحديد", loopDefineSub: "الصلاحية",
    loopConstrain: "تقييد", loopConstrainSub: "القواعد",
    loopExecute: "تنفيذ", loopExecuteSub: "الوكلاء",
    loopMonitor: "مراقبة", loopMonitorSub: "الانحراف",
    loopIntervene: "تدخل", loopInterveneSub: "تجاوز",
    loopImprove: "تحسين", loopImproveSub: "تطوير",
    loopCenter1: "حلقة",
    loopCenter2: "مستمرة",
    ecoFlowScore: "Score", ecoFlowScoreAction: "تشخيص",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "تدريب",
    ecoFlowControl: "Control", ecoFlowControlAction: "مراقبة",
    ecoFlowCert: "اعتماد", ecoFlowCertAction: "اعتماد",
    ecoFlowPartners: "شركاء", ecoFlowPartnersAction: "توسيع",
    ecoFlowClosedLoop: "حلقة مغلقة",
  },
  tr: {
    navTitle: "ACF STANDARD",
    navSubtitle: "YÖNETİŞİM ÇERÇEVESİ",
    navHome: "← Ana Sayfa",
    navFramework: "Çerçeve",
    navArchitecture: "Mimari",
    navEcosystem: "Ekosistem",
    navBlog: "Blog",
    navCta: "Skorunuzu Alın →",
    heroBadge: "Yönetişim standardı",
    heroTitle1: "Agentic Commerce",
    heroTitle2: "Framework®",
    heroSubtitle: "Otonom sistemler çağında kararları yönetmek.",
    heroCta: "Çerçeveyi oku ↓",
    shiftBadge: "Dönüm noktası",
    shiftLine1: "Yapay zeka artık sadece bir araç değil.",
    shiftLine2: "Bir karar verici haline geliyor.",
    shiftP1: "Tüm sektörlerde, otonom ajanlar artık operasyonel kararları gerçek zamanlı olarak yürütüyor — fiyat ayarlamaları, tedarik siparişleri, müşteri etkileşimi, lojistik yönlendirme, risk değerlendirmeleri.",
    shiftP2pre: "Bu kararlar sürekli olarak, makine hızında gerçekleşiyor. Ve çoğu kuruluşta, ",
    shiftP2bold: "bunları denetleyecek bir yönetişim mimarisi bulunmuyor.",
    shiftP3pre: "Sonuç yeni bir risk kategorisi: ",
    shiftP3bold: "kontrolsüz otonom karar sistemleri.",
    shiftP4: "Agentic Commerce Framework® bu sorunu çözmek için oluşturuldu.",
    stmtLine1: "Otonom sistemler kaos yaratmaz.",
    stmtLine2: "Yönetilmeyen kararlar yaratır.",
    stat1Label: "kuruluşun resmi bir yapay zeka yönetişimi yok",
    stat2Label: "AI Act maksimum yaptırımları veya küresel gelirin %7'si",
    stat3Label: "yapılandırılmış yönetişimle daha düşük düzeltme maliyetleri",
    stat4Label: "Seviye 1 kill switch yanıt süresi (ACF spesifikasyonu)",
    gapBadge: "Yönetişim açığı",
    gapTitle: "Kuruluşlar son on yılı yapay zekayı benimsemeye harcadı. Yönetişim modelleri hiç gelişmedi.",
    gapP1: "Geleneksel yönetişim basit bir yapı varsayar: insanlar karar verir, sistemler yürütür.",
    gapP2pre: "Ajantik sistemler bu ilişkiyi tersine çevirir. Makineler artık yürütür ",
    gapP2bold: "ve karar verir",
    gapP2post: " — tanımlı parametreler dahilinde.",
    gapP3: "Bu değişim yapılandırılmış yönetişim olmadan gerçekleştiğinde, kuruluşlar kendi operasyonel kararları üzerindeki görünürlüğü ve kontrolü kaybeder. Sonuçlar teorik değildir:",
    gapList: ["İzlenemeyen otonom kararlar", "Ajanlar arası çelişen optimizasyonlar", "Zaman içinde operasyonel sapma", "Gelişen yapay zeka düzenlemeleri kapsamında düzenleyici risk", "Dış platformlara stratejik bağımlılık"],
    fwBadge: "Çerçeve",
    fwTitle: "Otonom karar sistemleri için ilk yönetişim mimarisi.",
    fwP1pre: "Agentic Commerce Framework® yapay zeka modellerini kontrol etmez. Yürüttükleri ",
    fwP1bold: "kararları",
    fwP1post: " yönetir.",
    fwP2: "Çerçeve, kuruluşların nasıl yapacağını tanımlar:",
    fwList: ["Karar otoritesini yapılandırma", "Devredilemez bölgeleri tanımlama", "Otonom davranışı kısıtlama", "Gerçek zamanlı denetimi sürdürme", "Kritik eylemler üzerinde insan egemenliğini koruma"],
    fwP3: "ACF, insan liderliği ile makine yürütmesi arasında yapılandırılmış bir karar yönetişim katmanı oluşturur.",
    compWithout: "YÖNETİŞİM OLMADAN",
    compWith: "ACF® YÖNETİŞİMİ İLE",
    compWithoutLabels: ["Opaklık", "Sapma", "Çatışma", "Maruz kalma"],
    compWithLabels: ["İzlenebilir", "Geri alınabilir", "Hesap verebilir", "Egemen"],
    compWithoutSvg: "KONTROLSÜZ KARARLAR",
    compWithSvg: "YÖNETİLEN KARARLAR",
    archBadge: "Mimari",
    archTitle: "Dört katmanlı bir yönetişim mimarisi.",
    archSubtitle: "Birlikte, otonom operasyonlar için sürekli bir kontrol sistemi oluştururlar.",
    archL1Name: "Yönetişim",
    archL1Sub: "Otoriteyi kim elinde tutar",
    archL1Text: "Yönetişim katmanı karar egemenliğini tesis eder. Kuruluşlar nihai otoriteyi kimin elinde tuttuğunu, hangi kararların devredilebileceğini, hangilerinin yalnızca insana ait kalacağını tanımlar. Bu düzeyde şirketler Ajantik Anayasalarını resmileştirir — yapay zeka yönetişim ilkelerini belirleyen kurucu belge.",
    archL2Name: "Politika",
    archL2Sub: "Ajanların ne yapmasına izin verilir",
    archL2Text: "Politika, otonom sistemlerin davranış sınırlarını tanımlar. Yönetişim ilkelerini operasyonel kurallara dönüştürür — finansal eşikler, zaman kısıtlamaları, etik sınırlar, sektöre özgü düzenleyici politikalar. Politikalar, ajanların açıkça tanımlanmış karar sınırları içinde çalışmasını sağlar.",
    archL3Name: "Sistem",
    archL3Sub: "Kararlar nasıl yürütülür",
    archL3Text: "Sistem katmanı teknik yürütme ortamını yönetir. Her otonom eylem gözlemlenebilir, kesintiye uğratılabilir ve denetlenebilir kalır — karar izlenebilirliği, çoklu ajan koordinasyonu ve katmanlı kill switch mekanizmaları aracılığıyla. Amaç ajanları yavaşlatmak değil. Makine hızında yönetilebilir kalmalarını sağlamaktır.",
    archL4Name: "Denetim",
    archL4Sub: "Kuruluşlar sürekli gözetimi nasıl sürdürür",
    archL4Text: "Yönetişim tek seferlik bir yapılandırma değildir. Sürekli bir operasyonel disiplindir. Denetim katmanı sürekli izleme, olay müdahalesi ve yönetişim incelemeleri sunar. Denetim, ajan sistemlerinin kontrolü aşındırmadan evrilmesini sağlar.",
    centralLine1: "Yapay zeka yürütmeyi otomatikleştirir.",
    centralLine2: "ACF kararları yönetir.",
    centralP: "Yönetişim olmadan, otonom sistemler opaklık yaratır. Yönetişimle, ölçeklenebilir stratejik kontrol araçlarına dönüşürler.",
    matBadge: "İlerleme",
    matTitle: "4 ajantik olgunluk seviyesi",
    matSubtitle: "Klasik otomasyondan denetimli özerkliğe ilerleyen bir ölçek. Her seviye ajan karar otoritesini artırır — ve yönetişim gereksinimlerini.",
    matL0Code: "Seviye 0",
    matL0Name: "Klasik otomasyon",
    matL0Risk: "Çok düşük risk",
    matL0Desc: "Sabit kurallar, ML yok. Her değişiklik için insan müdahalesi.",
    matL1Code: "Seviye 1",
    matL1Name: "Destekli ajanlar",
    matL1Risk: "Düşük risk",
    matL1Desc: "Ajanlar analiz eder ve önerir. Her nihai karar insanda kalır.",
    matL2Code: "Seviye 2",
    matL2Name: "Yönetilen ajanlar",
    matL2Risk: "Orta risk",
    matL2Desc: "Ajanlar sıkı yönetişim dahilinde karar verir. Devredilemez bölgeler kilitli.",
    matL2Recommended: "Önerilen hedef",
    matL3Code: "Seviye 3",
    matL3Name: "Denetimli özerklik",
    matL3Risk: "Yüksek risk",
    matL3Desc: "Ajanlar karar verir ve öğrenir. Maksimum yönetişim. Yalnızca olgun kuruluşlar için.",
    modBadge: "Metodoloji",
    modTitle: "8 uygulama modülü",
    modSubtitle: "6-18 ay boyunca aşamalı olarak dağıtılan sıralı bir yol.",
    mod01Code: "MOD_01",
    mod01Name: "Egemenlik teşhisi",
    mod01Desc: "Egemenlik skoru hesaplaması. Risk bölgesi haritalama.",
    mod02Code: "MOD_02",
    mod02Name: "Karar haritalama",
    mod02Desc: "Kritiklik matrisi. Devredilemez bölgeler.",
    mod03Code: "MOD_03",
    mod03Name: "Ajantik anayasa",
    mod03Desc: "9 madde. Yönetişim komitesi tarafından imzalanmış.",
    mod04Code: "MOD_04",
    mod04Name: "Ajan sistem tasarımı",
    mod04Desc: "Yetki belgeleri, etkileşim sınırları.",
    mod05Code: "MOD_05",
    mod05Name: "Güvenlik ve geri alınabilirlik",
    mod05Desc: "Sandbox ortamı, geri alınabilirlik planı. Kill switch tasarımı.",
    mod06Code: "MOD_06",
    mod06Name: "Sürekli yönetişim",
    mod06Desc: "Aylık incelemeler. Yıllık uyum denetimi.",
    mod07Code: "MOD_07",
    mod07Name: "Uygulama yol haritası",
    mod07Desc: "5 aşamalı ilerleyen dağıtım.",
    mod08Code: "MOD_08",
    mod08Name: "Kriz yönetimi",
    mod08Desc: "3 seviyeli olaylar. Kill switch tatbikatları.",
    loopBadge: "Operasyonel disiplin",
    loopTitle: "Ajan yönetişim döngüsü",
    loopSubtitle: "Yönetişim bir yapılandırma değildir. Sürekli bir operasyonel döngüdür — tanımla, kısıtla, yürüt, izle, müdahale et, iyileştir. Sonra tekrar.",
    ecoBadge: "Ekosistem",
    ecoTitle: "ACF işletim sistemi",
    ecoSubtitle: "Beş entegre araç. Bir kapalı döngü sistemi. Teşhis → Eğitim → İzleme → Sertifikasyon → Ölçeklendirme.",
    ecoScore: "Karar egemenliğini ve yönetişim olgunluğunu ölçen hızlı teşhis.",
    ecoControl: "Otonom sistemleri denetlemek için gerçek zamanlı platform.",
    ecoAcademy: "Otonom sistemleri yöneten yöneticiler ve operatörler için eğitim.",
    ecoCert: "Yönetişim olgunluğunu doğrulayan ACF TRUST™ ve ACF CERTIFIED etiketleri.",
    questionBadge: "Yeni bir operasyonel disiplin",
    questionP1: "Otonom sistemlere geçiş bir teknoloji değişikliği değildir. Bir yönetişim değişikliğidir.",
    questionP2: "Kuruluşlar yazılım yönetiminden karar sistemlerini yönetmeye evrilmelidir.",
    questionP3: "Agentic Commerce Framework® bunu yapmak için gereken yapıyı sağlar.",
    questionPre: "Çünkü otonom sistemler çağında,\nen önemli soru artık şu değil:",
    questionOld: "\"Yapay zeka ne yapabilir?\"",
    questionNew1: "\"Aldığı kararları ",
    questionNew2: "kim yönetir",
    questionNew3: "?\"",
    ctaAssess: "Yönetişiminizi değerlendirin →",
    ctaResearch: "Araştırmayı oku",
    svgHumanAuthority: "İNSAN OTORİTESİ",
    svgHumanAuthoritySub: "Liderlik · Strateji · Hesap verebilirlik",
    svgL1: "YÖNETİŞİM",
    svgL1Sub: "Kim karar verir · Otorite · Anayasa",
    svgL2: "POLİTİKA",
    svgL2Sub: "Kurallar · Kısıtlamalar · Etik korkuluklar",
    svgL3: "SİSTEM",
    svgL3Sub: "Ajanlar · İzlenebilirlik · Kill switch",
    svgL4: "DENETİM",
    svgL4Sub: "İzleme · Olaylar · Egemenlik",
    svgMachineSpeed: "MAKİNE HIZINDA YÜRÜTME",
    loopDefine: "TANIMLA", loopDefineSub: "Otorite",
    loopConstrain: "KISITLA", loopConstrainSub: "Kurallar",
    loopExecute: "YÜRÜT", loopExecuteSub: "Ajanlar",
    loopMonitor: "İZLE", loopMonitorSub: "Sapma",
    loopIntervene: "MÜDAHALE ET", loopInterveneSub: "Geçersiz kılma",
    loopImprove: "İYİLEŞTİR", loopImproveSub: "Evrilme",
    loopCenter1: "SÜREKLİ",
    loopCenter2: "DÖNGÜ",
    ecoFlowScore: "Score", ecoFlowScoreAction: "Teşhis",
    ecoFlowAcademy: "Academy", ecoFlowAcademyAction: "Eğitim",
    ecoFlowControl: "Control", ecoFlowControlAction: "İzleme",
    ecoFlowCert: "Sertifikasyon", ecoFlowCertAction: "Sertifikalandırma",
    ecoFlowPartners: "Ortaklar", ecoFlowPartnersAction: "Ölçeklendirme",
    ecoFlowClosedLoop: "KAPALI DÖNGÜ",
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
      {[0,1,2,3,4,5,6,7].map((i: any) => (
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
        {steps.map((s: any, i: number) => {
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
          <animateMotion dur="6s" repeatCount="indefinite" path={`M ${cx + r * Math.cos((-90 * Math.PI) / 180)} ${cy + r * Math.sin((-90 * Math.PI) / 180)} ${steps.map((s: any, i: number) => {
            const next = steps[(i + 1) % steps.length];
            return `L ${cx + r * Math.cos((next.angle * Math.PI) / 180)} ${cy + r * Math.sin((next.angle * Math.PI) / 180)}`;
          }).join(" ")} Z`} />
        </circle>

        {/* Nodes */}
        {steps.map((s: any, i: number) => {
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

        {products.map((p: any, i: number) => {
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
  const lang = (ui as any)[locale] ? locale : "en";
  const t = (ui as any)[lang];
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
            {[{ label: t.navFramework, href: "#framework" }, { label: t.navArchitecture, href: "#architecture" }, { label: t.navEcosystem, href: "#ecosystem" }, { label: t.navBlog, href: `/${locale}/blog` }].map((l: any) => (
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
            ].map((s: any, i: number) => (
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
              {t.gapList.map((item: any, i: number) => (
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
              {t.fwList.map((item: any, i: number) => (
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
                  {[0,1,2,3,4].map((i: any) => (
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
                    {[0,1,2,3,4,5,6].map((i: any) => (
                      <line key={i} x1={20 + Math.random() * 280} y1={20 + Math.random() * 160} x2={20 + Math.random() * 280} y2={20 + Math.random() * 160} stroke="#ef4444" strokeWidth="1" opacity=".35">
                        <animate attributeName="opacity" values=".1;.5;.1" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                      </line>
                    ))}
                    {/* Scattered nodes */}
                    {[{x:60,y:40},{x:180,y:30},{x:280,y:70},{x:40,y:120},{x:150,y:100},{x:260,y:140},{x:100,y:170}].map((n: any, i: number) => (
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
                    {t.compWithoutLabels.map((r: any, i: number) => (
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
                    ].map((l: any, i: number) => (
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
                    {t.compWithLabels.map((r: any, i: number) => (
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
          ].map((layer: any, i: number) => (
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
          {[200,400,600,800,1000].map((x: any) => (
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
           MATURITY LEVELS — 4 progressive levels
         ═══════════════════════════════════════════════ */}
      <section id="maturity" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>// {t.matBadge}</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: 16, textAlign: "center" }}>{t.matTitle}</h2></Reveal>
          <Reveal delay={0.15}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>{t.matSubtitle}</p></Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { code: t.matL0Code, name: t.matL0Name, risk: t.matL0Risk, desc: t.matL0Desc, riskColor: "#22c55e", recommended: false },
              { code: t.matL1Code, name: t.matL1Name, risk: t.matL1Risk, desc: t.matL1Desc, riskColor: "#22c55e", recommended: false },
              { code: t.matL2Code, name: t.matL2Name, risk: t.matL2Risk, desc: t.matL2Desc, riskColor: C.gold, recommended: true },
              { code: t.matL3Code, name: t.matL3Name, risk: t.matL3Risk, desc: t.matL3Desc, riskColor: "#ef4444", recommended: false },
            ].map((level: any, i: number) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  background: level.recommended ? `rgba(201,168,76,.06)` : `rgba(255,255,255,.02)`,
                  border: `1px solid ${level.recommended ? C.goldBorder : C.bd1}`,
                  borderRadius: 14,
                  padding: "28px 26px",
                  position: "relative",
                  transition: "all .3s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".08em" }}>{level.code}</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
                      color: level.riskColor, background: `${level.riskColor}15`,
                      border: `1px solid ${level.riskColor}30`, borderRadius: 6,
                      padding: "3px 8px", letterSpacing: ".04em",
                    }}>{level.risk}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{level.name}</h3>
                  <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.7, margin: 0 }}>{level.desc}</p>
                  {level.recommended && (
                    <div style={{ marginTop: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".06em" }}>
                      ★ {t.matL2Recommended}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           IMPLEMENTATION MODULES — 8 sequential modules
         ═══════════════════════════════════════════════ */}
      <div id="methodology">
      <section id="modules" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>// {t.modBadge}</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: 16, textAlign: "center" }}>{t.modTitle}</h2></Reveal>
          <Reveal delay={0.15}><p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.9, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>{t.modSubtitle}</p></Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { code: t.mod01Code, name: t.mod01Name, desc: t.mod01Desc },
              { code: t.mod02Code, name: t.mod02Name, desc: t.mod02Desc },
              { code: t.mod03Code, name: t.mod03Name, desc: t.mod03Desc },
              { code: t.mod04Code, name: t.mod04Name, desc: t.mod04Desc },
              { code: t.mod05Code, name: t.mod05Name, desc: t.mod05Desc },
              { code: t.mod06Code, name: t.mod06Name, desc: t.mod06Desc },
              { code: t.mod07Code, name: t.mod07Name, desc: t.mod07Desc },
              { code: t.mod08Code, name: t.mod08Name, desc: t.mod08Desc },
            ].map((mod: any, i: number) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{
                  background: "rgba(255,255,255,.02)",
                  border: `1px solid ${C.bd1}`,
                  borderRadius: 14,
                  padding: "24px 26px",
                  borderLeft: `3px solid ${C.gold}`,
                  transition: "all .3s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
                      color: C.gold, background: C.goldDim,
                      border: `1px solid ${C.goldBorder}`, borderRadius: 6,
                      padding: "3px 8px", letterSpacing: ".06em",
                    }}>{mod.code}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{mod.name}</h3>
                  <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.7, margin: 0 }}>{mod.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* ═══════════════════════════════════════════════
           GOVERNANCE LOOP — Animated diagram
         ═══════════════════════════════════════════════ */}
      <section id="governance-loop" style={{ padding: "100px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
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
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
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
            ].map((p: any) => (
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
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, color: C.gray, fontWeight: 500, marginBottom: 16 }}>{t.questionPre.split("\n").map((line: any, i: number) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}</p>
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
