"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

/* ═══════════════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════════════ */
const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", green: "#22c55e", blue: "#3b82f6",
  amber: "#f59e0b", red: "#ef4444", purple: "#8b5cf6",
};

/* ═══════════════════════════════════════════════════════════════
   BILINGUAL UI STRINGS
   ═══════════════════════════════════════════════════════════════ */
const ui = {
  en: {
    navSubtext: "COMPLIANCE CHECKER",
    navHome: "← Home",
    navCta: "Get Your ACF Score →",
    heroBadge: "FREE DIAGNOSTIC TOOL",
    heroTitle1: "ACF Compliance ",
    heroTitle2: "Checker",
    heroDesc: "Evaluate your organization's compliance with the Agentic Commerce Framework® across its 4 founding principles. Identify gaps, assess risks, and get actionable recommendations in 5 minutes.",
    heroStart: "Start the Assessment →",
    heroInfo: "20 questions · 5 steps · No sign-up required",
    stepLabels: [
      "Decision Governance",
      "Non-Delegable Zones",
      "Traceability & Control",
      "Regulatory Alignment",
      "Operational Maturity",
    ],
    stepDescriptions: [
      "Evaluate how your organization maintains decision sovereignty over AI agent actions.",
      "Assess whether critical decisions remain under exclusive human control.",
      "Review your audit trail capabilities and system interruptibility mechanisms.",
      "Check alignment with EU AI Act, GDPR, and agentic-specific regulations.",
      "Measure operational readiness across ACF layers, modules, and KPIs.",
    ],
    questions: [
      // Step 1 — Decision Governance (4 questions)
      {
        q: "How are decisions distributed between humans and AI agents in your organization?",
        a: [
          { text: "AI agents make most decisions autonomously with no formal oversight", score: 0 },
          { text: "AI agents decide, but humans are notified after the fact", score: 1 },
          { text: "AI agents recommend, humans approve critical decisions", score: 2 },
          { text: "Clear decision matrix defining agent vs. human authority per domain", score: 3 },
        ],
      },
      {
        q: "Is there a formal Decision Delegation Agreement (DDA) for each AI agent?",
        a: [
          { text: "No — agents operate without formal delegation boundaries", score: 0 },
          { text: "Informal guidelines exist but are not documented", score: 1 },
          { text: "DDAs exist for some agents but coverage is incomplete", score: 2 },
          { text: "Every agent has a documented DDA with scope, limits, and escalation rules", score: 3 },
        ],
      },
      {
        q: "How does your organization handle decisions that exceed agent authority?",
        a: [
          { text: "No escalation mechanism — agents continue regardless", score: 0 },
          { text: "Agents log anomalies but continue operating", score: 1 },
          { text: "Agents pause and wait for human input on some decisions", score: 2 },
          { text: "Systematic escalation protocol with defined SLAs and fallback chains", score: 3 },
        ],
      },
      {
        q: "Can your organization override or reverse any AI agent decision?",
        a: [
          { text: "No — once executed, agent decisions are final", score: 0 },
          { text: "Some decisions can be reversed but the process is manual and slow", score: 1 },
          { text: "Most decisions are reversible within a defined timeframe", score: 2 },
          { text: "All agent decisions are reversible with automated rollback mechanisms", score: 3 },
        ],
      },
      // Step 2 — Non-Delegable Zones (4 questions)
      {
        q: "Has your organization identified decisions that must NEVER be delegated to AI agents?",
        a: [
          { text: "No — all decisions can potentially be automated", score: 0 },
          { text: "We have an informal understanding but nothing documented", score: 1 },
          { text: "Some non-delegable areas are identified but the list is incomplete", score: 2 },
          { text: "Comprehensive Non-Delegable Zones registry covering all critical domains", score: 3 },
        ],
      },
      {
        q: "Which of the following are treated as non-delegable in your organization?",
        a: [
          { text: "None are formally protected — agents can act in all domains", score: 0 },
          { text: "Only financial decisions above a threshold are human-only", score: 1 },
          { text: "Financial, legal, and HR decisions require human approval", score: 2 },
          { text: "Strategic pricing, brand positioning, employee decisions, legal commitments, and crisis response are all protected", score: 3 },
        ],
      },
      {
        q: "How do you enforce non-delegable zones technically?",
        a: [
          { text: "No technical enforcement — relies on agent behavior", score: 0 },
          { text: "Policy documents exist but no technical controls", score: 1 },
          { text: "Some API-level restrictions prevent agent actions in protected zones", score: 2 },
          { text: "Hard-coded guardrails, permission systems, and automated monitoring for all NDZs", score: 3 },
        ],
      },
      {
        q: "How often are your non-delegable zones reviewed and updated?",
        a: [
          { text: "Never — they were never formally defined", score: 0 },
          { text: "Set once and never revisited", score: 1 },
          { text: "Reviewed annually or when major incidents occur", score: 2 },
          { text: "Quarterly reviews with stakeholder input and regulatory change monitoring", score: 3 },
        ],
      },
      // Step 3 — Traceability & Control (4 questions)
      {
        q: "Can you trace every decision made by your AI agents?",
        a: [
          { text: "No — agent decisions are not logged", score: 0 },
          { text: "Basic logs exist but lack decision context and rationale", score: 1 },
          { text: "Detailed logs capture decisions, inputs, and outputs", score: 2 },
          { text: "Full audit trail with decision rationale, confidence scores, data sources, and timestamps", score: 3 },
        ],
      },
      {
        q: "Do you have an emergency stop (kill switch) for your AI agents?",
        a: [
          { text: "No — there is no way to immediately stop agents", score: 0 },
          { text: "We can shut down the system, but it takes hours", score: 1 },
          { text: "Kill switch exists for some agents with minutes-level response", score: 2 },
          { text: "Instant kill switch per agent, per domain, and system-wide, with automated triggers", score: 3 },
        ],
      },
      {
        q: "How do you monitor AI agent behavior in real-time?",
        a: [
          { text: "No real-time monitoring — we review results periodically", score: 0 },
          { text: "Basic dashboards show agent activity but no alerting", score: 1 },
          { text: "Monitoring with alerts for anomalies and threshold breaches", score: 2 },
          { text: "Real-time observability with drift detection, anomaly alerts, and automated circuit breakers", score: 3 },
        ],
      },
      {
        q: "Can you reconstruct the full reasoning chain of any agent decision?",
        a: [
          { text: "No — agent reasoning is opaque (black box)", score: 0 },
          { text: "We can see inputs and outputs but not intermediate reasoning", score: 1 },
          { text: "Partial explainability for most agent decisions", score: 2 },
          { text: "Full chain-of-thought logging with explainability reports for every decision", score: 3 },
        ],
      },
      // Step 4 — Regulatory Alignment (4 questions)
      {
        q: "How prepared is your organization for the EU AI Act requirements on agentic systems?",
        a: [
          { text: "Unaware of EU AI Act requirements for AI agents", score: 0 },
          { text: "Aware but no assessment or preparation has been done", score: 1 },
          { text: "Gap analysis completed, implementation plan in progress", score: 2 },
          { text: "Fully mapped requirements with compliance controls in place and regular audits", score: 3 },
        ],
      },
      {
        q: "How does your organization handle GDPR compliance for autonomous AI decisions?",
        a: [
          { text: "No GDPR assessment for AI agent processing activities", score: 0 },
          { text: "Basic data processing records but no specific agent DPIA", score: 1 },
          { text: "DPIAs conducted for major agent systems, consent mechanisms in place", score: 2 },
          { text: "Comprehensive DPIAs, automated data minimization, right to explanation, and human review for all automated decisions", score: 3 },
        ],
      },
      {
        q: "Do you maintain documentation required by regulators for your AI agent systems?",
        a: [
          { text: "No documentation of AI agent systems or their decision-making", score: 0 },
          { text: "Technical documentation exists but lacks governance context", score: 1 },
          { text: "Governance documentation covers most systems but gaps remain", score: 2 },
          { text: "Complete technical and governance documentation with risk assessments, aligned to EU AI Act Article 11 requirements", score: 3 },
        ],
      },
      {
        q: "How do you handle cross-border data flows and jurisdictional compliance for AI agents?",
        a: [
          { text: "No consideration of cross-border data or jurisdictional issues", score: 0 },
          { text: "Aware of the issue but no specific controls for agent data flows", score: 1 },
          { text: "Data residency rules applied to some agent systems", score: 2 },
          { text: "Full jurisdictional mapping with data localization, SCCs, and agent-specific transfer impact assessments", score: 3 },
        ],
      },
      // Step 5 — Operational Maturity (4 questions)
      {
        q: "How well does your organization cover the 4 ACF operational layers?",
        a: [
          { text: "Unaware of the ACF 4-layer model (Governance, Decision Policy, Agent System, Execution)", score: 0 },
          { text: "Partial coverage — only 1-2 layers are addressed", score: 1 },
          { text: "3 layers covered but integration between them is weak", score: 2 },
          { text: "All 4 layers fully implemented with strong cross-layer integration and feedback loops", score: 3 },
        ],
      },
      {
        q: "How many of the 8 ACF implementation modules are deployed in your organization?",
        a: [
          { text: "None — we are not using the ACF module framework", score: 0 },
          { text: "1-2 modules partially implemented", score: 1 },
          { text: "4-5 modules implemented with some gaps", score: 2 },
          { text: "All 8 modules fully deployed and integrated (DDA, NDZ, Kill Switch, Audit Trail, Drift Monitor, Escalation, Reporting, Governance Review)", score: 3 },
        ],
      },
      {
        q: "Do you track KPIs specific to AI agent governance?",
        a: [
          { text: "No governance KPIs for AI agents", score: 0 },
          { text: "Basic metrics like uptime and error rates only", score: 1 },
          { text: "Governance KPIs including decision accuracy, escalation rates, and compliance scores", score: 2 },
          { text: "Comprehensive KPI dashboard with sovereignty index, drift rate, NDZ violation rate, audit coverage, and time-to-intervene", score: 3 },
        ],
      },
      {
        q: "How does your organization approach continuous improvement of AI governance?",
        a: [
          { text: "No formal improvement process — governance is static", score: 0 },
          { text: "Ad-hoc improvements driven by incidents", score: 1 },
          { text: "Regular reviews with stakeholder feedback loops", score: 2 },
          { text: "Living governance model with quarterly audits, automated policy updates, community input, and regulatory watch", score: 3 },
        ],
      },
    ],
    principleNames: [
      "Decision Sovereignty",
      "Non-Delegable Zones",
      "Traceability & Interruptibility",
      "Living Governance",
    ],
    riskLevels: {
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    resultsTitle1: "Your ACF Compliance ",
    resultsTitle2: "Report",
    overallScore: "Overall Compliance Score",
    principleScores: "Score by Principle",
    riskLevel: "Risk Level",
    recommendations: "Recommendations",
    recIntro: "Based on your assessment, here are prioritized actions:",
    nextSteps: "Next Steps",
    ctaScore: "Get Detailed ACF Score® →",
    ctaScoreDesc: "Full 7-step diagnostic with PDF report",
    ctaEU: "EU AI Act Compliance Check →",
    ctaEUDesc: "Evaluate your EU AI Act readiness",
    ctaContact: "Contact ACF Experts →",
    ctaContactDesc: "Get personalized governance consulting",
    restart: "Retake Assessment",
    shareResults: "Save Results",
    savedMsg: "Results saved to your browser",
    prevResults: "You have previous results saved. ",
    loadPrev: "Load previous results",
    prev: "← Previous",
    next: "Next Step →",
    submit: "See My Results →",
    questionOf: "of",
    stepLabel: "Step",
    recs: {
      decision_0: "URGENT: Establish formal Decision Delegation Agreements (DDAs) for all AI agents immediately. Your organization has no governance over agent decision-making.",
      decision_1: "Implement a structured decision matrix defining clear boundaries between human and AI agent authority. Formalize escalation protocols.",
      decision_2: "Strengthen your decision governance by adding automated enforcement of delegation limits and improving escalation SLAs.",
      decision_3: "Your decision governance is strong. Consider sharing best practices and pursuing ACF Certification.",
      ndz_0: "CRITICAL: Define and enforce Non-Delegable Zones immediately. Unprotected critical decisions create severe legal and operational risk.",
      ndz_1: "Document all non-delegable zones formally and implement technical guardrails. Current informal protections are insufficient.",
      ndz_2: "Complete your NDZ coverage and implement automated monitoring to detect violations. Establish quarterly reviews.",
      ndz_3: "Excellent NDZ coverage. Ensure continuous monitoring and consider contributing to ACF community standards.",
      trace_0: "URGENT: Implement basic logging and a kill switch mechanism. Operating without traceability or interruptibility is extremely risky.",
      trace_1: "Upgrade to comprehensive audit trails and implement real-time monitoring. Add kill switch capabilities for all agent systems.",
      trace_2: "Enhance real-time observability and add automated circuit breakers. Improve decision explainability.",
      trace_3: "Your traceability infrastructure is mature. Focus on predictive monitoring and proactive drift detection.",
      reg_0: "CRITICAL: Begin EU AI Act and GDPR compliance assessment immediately. Non-compliance creates significant regulatory exposure.",
      reg_1: "Conduct thorough gap analysis against EU AI Act requirements. Prioritize DPIAs for all agent systems.",
      reg_2: "Close remaining compliance gaps. Ensure documentation meets Article 11 requirements. Implement automated compliance monitoring.",
      reg_3: "Strong regulatory posture. Maintain vigilance on evolving regulations and consider becoming an ACF compliance reference.",
      ops_0: "Start with the ACF 4-layer model. Implement foundational modules: DDA, NDZ registry, and basic audit trail.",
      ops_1: "Accelerate module deployment. Focus on governance KPIs and establish feedback loops between operational layers.",
      ops_2: "Integrate remaining modules and strengthen cross-layer communication. Implement living governance practices.",
      ops_3: "Operational excellence achieved. Consider ACF CERTIFIED™ certification and contribute to framework evolution.",
    },
  },
  fr: {
    navSubtext: "VÉRIFICATEUR DE CONFORMITÉ",
    navHome: "← Accueil",
    navCta: "Obtenir votre ACF Score →",
    heroBadge: "OUTIL DE DIAGNOSTIC GRATUIT",
    heroTitle1: "Vérificateur de Conformité ",
    heroTitle2: "ACF",
    heroDesc: "Évaluez la conformité de votre organisation avec l'Agentic Commerce Framework® à travers ses 4 principes fondateurs. Identifiez les lacunes, évaluez les risques et obtenez des recommandations concrètes en 5 minutes.",
    heroStart: "Commencer l'évaluation →",
    heroInfo: "20 questions · 5 étapes · Aucune inscription requise",
    stepLabels: [
      "Gouvernance Décisionnelle",
      "Zones Non Délégables",
      "Traçabilité & Contrôle",
      "Alignement Réglementaire",
      "Maturité Opérationnelle",
    ],
    stepDescriptions: [
      "Évaluez comment votre organisation maintient la souveraineté décisionnelle sur les actions des agents IA.",
      "Vérifiez que les décisions critiques restent sous contrôle humain exclusif.",
      "Examinez vos capacités de piste d'audit et vos mécanismes d'interruptibilité.",
      "Vérifiez l'alignement avec l'AI Act européen, le RGPD et les réglementations spécifiques aux agents.",
      "Mesurez la maturité opérationnelle à travers les couches ACF, les modules et les KPIs.",
    ],
    questions: [
      // Étape 1 — Gouvernance Décisionnelle
      {
        q: "Comment les décisions sont-elles réparties entre les humains et les agents IA dans votre organisation ?",
        a: [
          { text: "Les agents IA prennent la plupart des décisions de manière autonome sans supervision formelle", score: 0 },
          { text: "Les agents IA décident, mais les humains sont informés après coup", score: 1 },
          { text: "Les agents IA recommandent, les humains approuvent les décisions critiques", score: 2 },
          { text: "Matrice décisionnelle claire définissant l'autorité agent vs. humain par domaine", score: 3 },
        ],
      },
      {
        q: "Existe-t-il un Accord de Délégation Décisionnelle (DDA) formel pour chaque agent IA ?",
        a: [
          { text: "Non — les agents opèrent sans limites de délégation formelles", score: 0 },
          { text: "Des directives informelles existent mais ne sont pas documentées", score: 1 },
          { text: "Des DDAs existent pour certains agents mais la couverture est incomplète", score: 2 },
          { text: "Chaque agent dispose d'un DDA documenté avec périmètre, limites et règles d'escalade", score: 3 },
        ],
      },
      {
        q: "Comment votre organisation gère-t-elle les décisions qui dépassent l'autorité des agents ?",
        a: [
          { text: "Aucun mécanisme d'escalade — les agents continuent quoi qu'il arrive", score: 0 },
          { text: "Les agents signalent les anomalies mais continuent à fonctionner", score: 1 },
          { text: "Les agents se mettent en pause et attendent l'intervention humaine pour certaines décisions", score: 2 },
          { text: "Protocole d'escalade systématique avec SLAs définis et chaînes de secours", score: 3 },
        ],
      },
      {
        q: "Votre organisation peut-elle annuler ou inverser toute décision d'un agent IA ?",
        a: [
          { text: "Non — une fois exécutées, les décisions des agents sont définitives", score: 0 },
          { text: "Certaines décisions peuvent être inversées mais le processus est manuel et lent", score: 1 },
          { text: "La plupart des décisions sont réversibles dans un délai défini", score: 2 },
          { text: "Toutes les décisions des agents sont réversibles avec des mécanismes de rollback automatisés", score: 3 },
        ],
      },
      // Étape 2 — Zones Non Délégables
      {
        q: "Votre organisation a-t-elle identifié les décisions qui ne doivent JAMAIS être déléguées aux agents IA ?",
        a: [
          { text: "Non — toutes les décisions peuvent potentiellement être automatisées", score: 0 },
          { text: "Nous avons une compréhension informelle mais rien de documenté", score: 1 },
          { text: "Certaines zones non délégables sont identifiées mais la liste est incomplète", score: 2 },
          { text: "Registre complet des Zones Non Délégables couvrant tous les domaines critiques", score: 3 },
        ],
      },
      {
        q: "Lesquels des domaines suivants sont traités comme non délégables dans votre organisation ?",
        a: [
          { text: "Aucun n'est formellement protégé — les agents peuvent agir dans tous les domaines", score: 0 },
          { text: "Seules les décisions financières au-dessus d'un seuil sont réservées aux humains", score: 1 },
          { text: "Les décisions financières, juridiques et RH nécessitent une approbation humaine", score: 2 },
          { text: "Tarification stratégique, positionnement de marque, décisions employés, engagements juridiques et gestion de crise sont tous protégés", score: 3 },
        ],
      },
      {
        q: "Comment appliquez-vous techniquement les zones non délégables ?",
        a: [
          { text: "Aucune application technique — repose sur le comportement de l'agent", score: 0 },
          { text: "Des documents de politique existent mais aucun contrôle technique", score: 1 },
          { text: "Certaines restrictions au niveau API empêchent les actions des agents dans les zones protégées", score: 2 },
          { text: "Garde-fous codés en dur, systèmes de permissions et surveillance automatisée pour toutes les ZND", score: 3 },
        ],
      },
      {
        q: "À quelle fréquence vos zones non délégables sont-elles révisées et mises à jour ?",
        a: [
          { text: "Jamais — elles n'ont jamais été formellement définies", score: 0 },
          { text: "Définies une fois et jamais révisées", score: 1 },
          { text: "Révisées annuellement ou lors d'incidents majeurs", score: 2 },
          { text: "Revues trimestrielles avec contribution des parties prenantes et veille réglementaire", score: 3 },
        ],
      },
      // Étape 3 — Traçabilité & Contrôle
      {
        q: "Pouvez-vous tracer chaque décision prise par vos agents IA ?",
        a: [
          { text: "Non — les décisions des agents ne sont pas enregistrées", score: 0 },
          { text: "Des logs basiques existent mais manquent de contexte décisionnel", score: 1 },
          { text: "Des logs détaillés capturent les décisions, entrées et sorties", score: 2 },
          { text: "Piste d'audit complète avec raisonnement, scores de confiance, sources de données et horodatages", score: 3 },
        ],
      },
      {
        q: "Disposez-vous d'un arrêt d'urgence (kill switch) pour vos agents IA ?",
        a: [
          { text: "Non — il n'y a aucun moyen d'arrêter immédiatement les agents", score: 0 },
          { text: "Nous pouvons arrêter le système, mais cela prend des heures", score: 1 },
          { text: "Un kill switch existe pour certains agents avec un temps de réponse de quelques minutes", score: 2 },
          { text: "Kill switch instantané par agent, par domaine et global, avec déclencheurs automatisés", score: 3 },
        ],
      },
      {
        q: "Comment surveillez-vous le comportement des agents IA en temps réel ?",
        a: [
          { text: "Aucune surveillance en temps réel — nous examinons les résultats périodiquement", score: 0 },
          { text: "Des tableaux de bord basiques montrent l'activité des agents mais sans alertes", score: 1 },
          { text: "Surveillance avec alertes pour les anomalies et dépassements de seuils", score: 2 },
          { text: "Observabilité en temps réel avec détection de dérive, alertes d'anomalies et disjoncteurs automatiques", score: 3 },
        ],
      },
      {
        q: "Pouvez-vous reconstituer la chaîne de raisonnement complète de toute décision d'un agent ?",
        a: [
          { text: "Non — le raisonnement des agents est opaque (boîte noire)", score: 0 },
          { text: "Nous pouvons voir les entrées et sorties mais pas le raisonnement intermédiaire", score: 1 },
          { text: "Explicabilité partielle pour la plupart des décisions des agents", score: 2 },
          { text: "Journalisation complète de la chaîne de pensée avec rapports d'explicabilité pour chaque décision", score: 3 },
        ],
      },
      // Étape 4 — Alignement Réglementaire
      {
        q: "Quel est le niveau de préparation de votre organisation aux exigences de l'AI Act européen pour les systèmes agentiques ?",
        a: [
          { text: "Ignorance des exigences de l'AI Act pour les agents IA", score: 0 },
          { text: "Conscients mais aucune évaluation ou préparation n'a été faite", score: 1 },
          { text: "Analyse des écarts terminée, plan de mise en œuvre en cours", score: 2 },
          { text: "Exigences entièrement cartographiées avec contrôles de conformité en place et audits réguliers", score: 3 },
        ],
      },
      {
        q: "Comment votre organisation gère-t-elle la conformité RGPD pour les décisions autonomes des agents IA ?",
        a: [
          { text: "Aucune évaluation RGPD pour les activités de traitement des agents IA", score: 0 },
          { text: "Registres de traitement basiques mais pas d'AIPD spécifique aux agents", score: 1 },
          { text: "AIPDs réalisées pour les principaux systèmes d'agents, mécanismes de consentement en place", score: 2 },
          { text: "AIPDs complètes, minimisation automatisée des données, droit à l'explication et revue humaine pour toutes les décisions automatisées", score: 3 },
        ],
      },
      {
        q: "Maintenez-vous la documentation exigée par les régulateurs pour vos systèmes d'agents IA ?",
        a: [
          { text: "Aucune documentation des systèmes d'agents IA ou de leur prise de décision", score: 0 },
          { text: "La documentation technique existe mais manque de contexte de gouvernance", score: 1 },
          { text: "La documentation de gouvernance couvre la plupart des systèmes mais des lacunes subsistent", score: 2 },
          { text: "Documentation technique et de gouvernance complète avec évaluations des risques, alignée sur les exigences de l'Article 11 de l'AI Act", score: 3 },
        ],
      },
      {
        q: "Comment gérez-vous les flux de données transfrontaliers et la conformité juridictionnelle pour les agents IA ?",
        a: [
          { text: "Aucune considération des données transfrontalières ou des questions juridictionnelles", score: 0 },
          { text: "Conscients du problème mais aucun contrôle spécifique pour les flux de données des agents", score: 1 },
          { text: "Règles de résidence des données appliquées à certains systèmes d'agents", score: 2 },
          { text: "Cartographie juridictionnelle complète avec localisation des données, CCT et évaluations d'impact de transfert spécifiques aux agents", score: 3 },
        ],
      },
      // Étape 5 — Maturité Opérationnelle
      {
        q: "Dans quelle mesure votre organisation couvre-t-elle les 4 couches opérationnelles ACF ?",
        a: [
          { text: "Ignorance du modèle 4 couches ACF (Gouvernance, Politique Décisionnelle, Système Agent, Exécution)", score: 0 },
          { text: "Couverture partielle — seulement 1-2 couches sont adressées", score: 1 },
          { text: "3 couches couvertes mais l'intégration entre elles est faible", score: 2 },
          { text: "Les 4 couches entièrement implémentées avec forte intégration inter-couches et boucles de rétroaction", score: 3 },
        ],
      },
      {
        q: "Combien des 8 modules d'implémentation ACF sont déployés dans votre organisation ?",
        a: [
          { text: "Aucun — nous n'utilisons pas le framework de modules ACF", score: 0 },
          { text: "1-2 modules partiellement implémentés", score: 1 },
          { text: "4-5 modules implémentés avec quelques lacunes", score: 2 },
          { text: "Les 8 modules entièrement déployés et intégrés (DDA, ZND, Kill Switch, Piste d'Audit, Moniteur de Dérive, Escalade, Reporting, Revue de Gouvernance)", score: 3 },
        ],
      },
      {
        q: "Suivez-vous des KPIs spécifiques à la gouvernance des agents IA ?",
        a: [
          { text: "Aucun KPI de gouvernance pour les agents IA", score: 0 },
          { text: "Métriques basiques comme le temps de disponibilité et les taux d'erreur uniquement", score: 1 },
          { text: "KPIs de gouvernance incluant précision décisionnelle, taux d'escalade et scores de conformité", score: 2 },
          { text: "Tableau de bord KPI complet avec indice de souveraineté, taux de dérive, taux de violation ZND, couverture d'audit et temps d'intervention", score: 3 },
        ],
      },
      {
        q: "Comment votre organisation aborde-t-elle l'amélioration continue de la gouvernance IA ?",
        a: [
          { text: "Aucun processus d'amélioration formel — la gouvernance est statique", score: 0 },
          { text: "Améliorations ad-hoc motivées par les incidents", score: 1 },
          { text: "Revues régulières avec boucles de rétroaction des parties prenantes", score: 2 },
          { text: "Modèle de gouvernance vivante avec audits trimestriels, mises à jour automatisées des politiques, contribution communautaire et veille réglementaire", score: 3 },
        ],
      },
    ],
    principleNames: [
      "Souveraineté Décisionnelle",
      "Zones Non Délégables",
      "Traçabilité & Interruptibilité",
      "Gouvernance Vivante",
    ],
    riskLevels: {
      critical: "Critique",
      high: "Élevé",
      medium: "Moyen",
      low: "Faible",
    },
    resultsTitle1: "Votre Rapport de Conformité ",
    resultsTitle2: "ACF",
    overallScore: "Score de Conformité Global",
    principleScores: "Score par Principe",
    riskLevel: "Niveau de Risque",
    recommendations: "Recommandations",
    recIntro: "Sur la base de votre évaluation, voici les actions prioritaires :",
    nextSteps: "Prochaines Étapes",
    ctaScore: "Obtenir le ACF Score® détaillé →",
    ctaScoreDesc: "Diagnostic complet en 7 étapes avec rapport PDF",
    ctaEU: "Vérification Conformité AI Act UE →",
    ctaEUDesc: "Évaluez votre conformité à l'AI Act européen",
    ctaContact: "Contacter les Experts ACF →",
    ctaContactDesc: "Obtenez un accompagnement personnalisé en gouvernance",
    restart: "Refaire l'évaluation",
    shareResults: "Sauvegarder les résultats",
    savedMsg: "Résultats sauvegardés dans votre navigateur",
    prevResults: "Vous avez des résultats précédents sauvegardés. ",
    loadPrev: "Charger les résultats précédents",
    prev: "← Précédent",
    next: "Étape suivante →",
    submit: "Voir mes résultats →",
    questionOf: "sur",
    stepLabel: "Étape",
    recs: {
      decision_0: "URGENT : Établissez immédiatement des Accords de Délégation Décisionnelle (DDA) formels pour tous les agents IA. Votre organisation n'a aucune gouvernance sur la prise de décision des agents.",
      decision_1: "Implémentez une matrice décisionnelle structurée définissant des limites claires entre l'autorité humaine et celle des agents IA. Formalisez les protocoles d'escalade.",
      decision_2: "Renforcez votre gouvernance décisionnelle en ajoutant l'application automatisée des limites de délégation et en améliorant les SLAs d'escalade.",
      decision_3: "Votre gouvernance décisionnelle est solide. Envisagez de partager vos bonnes pratiques et de poursuivre la Certification ACF.",
      ndz_0: "CRITIQUE : Définissez et appliquez immédiatement les Zones Non Délégables. Les décisions critiques non protégées créent un risque juridique et opérationnel sévère.",
      ndz_1: "Documentez formellement toutes les zones non délégables et implémentez des garde-fous techniques. Les protections informelles actuelles sont insuffisantes.",
      ndz_2: "Complétez votre couverture ZND et implémentez une surveillance automatisée pour détecter les violations. Établissez des revues trimestrielles.",
      ndz_3: "Excellente couverture ZND. Assurez une surveillance continue et envisagez de contribuer aux standards communautaires ACF.",
      trace_0: "URGENT : Implémentez une journalisation basique et un mécanisme de kill switch. Opérer sans traçabilité ni interruptibilité est extrêmement risqué.",
      trace_1: "Passez à des pistes d'audit complètes et implémentez une surveillance en temps réel. Ajoutez des capacités de kill switch pour tous les systèmes d'agents.",
      trace_2: "Améliorez l'observabilité en temps réel et ajoutez des disjoncteurs automatiques. Améliorez l'explicabilité des décisions.",
      trace_3: "Votre infrastructure de traçabilité est mature. Concentrez-vous sur la surveillance prédictive et la détection proactive de dérive.",
      reg_0: "CRITIQUE : Commencez immédiatement l'évaluation de conformité AI Act et RGPD. La non-conformité crée une exposition réglementaire significative.",
      reg_1: "Réalisez une analyse des écarts approfondie par rapport aux exigences de l'AI Act. Priorisez les AIPDs pour tous les systèmes d'agents.",
      reg_2: "Comblez les lacunes de conformité restantes. Assurez-vous que la documentation répond aux exigences de l'Article 11. Implémentez une surveillance automatisée de la conformité.",
      reg_3: "Posture réglementaire solide. Maintenez la vigilance sur l'évolution des réglementations et envisagez de devenir une référence de conformité ACF.",
      ops_0: "Commencez par le modèle 4 couches ACF. Implémentez les modules fondamentaux : DDA, registre ZND et piste d'audit basique.",
      ops_1: "Accélérez le déploiement des modules. Concentrez-vous sur les KPIs de gouvernance et établissez des boucles de rétroaction entre les couches opérationnelles.",
      ops_2: "Intégrez les modules restants et renforcez la communication inter-couches. Implémentez des pratiques de gouvernance vivante.",
      ops_3: "Excellence opérationnelle atteinte. Envisagez la certification ACF CERTIFIED™ et contribuez à l'évolution du framework.",
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
interface Results {
  answers: number[];
  principleScores: number[];
  principlePercents: number[];
  overall: number;
  riskLevel: string;
  date: string;
}

const QUESTIONS_PER_STEP = 4;
const TOTAL_STEPS = 5;
const MAX_SCORE_PER_QUESTION = 3;
const STORAGE_KEY = "acf-compliance-results";

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
function computeResults(answers: number[]): Results {
  const principleScores: number[] = [];
  const principlePercents: number[] = [];
  for (let s = 0; s < TOTAL_STEPS; s++) {
    const start = s * QUESTIONS_PER_STEP;
    let sum = 0;
    for (let i = start; i < start + QUESTIONS_PER_STEP; i++) {
      sum += answers[i] ?? 0;
    }
    principleScores.push(sum);
    principlePercents.push(Math.round((sum / (QUESTIONS_PER_STEP * MAX_SCORE_PER_QUESTION)) * 100));
  }
  const totalScore = principleScores.reduce((a, b) => a + b, 0);
  const maxTotal = TOTAL_STEPS * QUESTIONS_PER_STEP * MAX_SCORE_PER_QUESTION;
  const overall = Math.round((totalScore / maxTotal) * 100);
  let riskLevel = "low";
  if (overall < 25) riskLevel = "critical";
  else if (overall < 50) riskLevel = "high";
  else if (overall < 75) riskLevel = "medium";
  return { answers, principleScores, principlePercents, overall, riskLevel, date: new Date().toISOString() };
}

function getRiskColor(level: string) {
  if (level === "critical") return C.red;
  if (level === "high") return C.amber;
  if (level === "medium") return C.gold;
  return C.green;
}

function getPrincipleColor(idx: number) {
  const colors = [C.gold, C.blue, C.green, C.purple, C.amber];
  return colors[idx] || C.gold;
}

/* ═══════════════════════════════════════════════════════════════
   CIRCULAR PROGRESS
   ═══════════════════════════════════════════════════════════════ */
function CircularProgress({ percent, size = 200, strokeWidth = 12, color }: { percent: number; size?: number; strokeWidth?: number; color: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (percent / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [percent, circumference]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>{percent}%</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ComplianceChecker() {
  const locale = useLocale();
  const t = locale === "fr" ? ui.fr : ui.en;

  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(TOTAL_STEPS * QUESTIONS_PER_STEP).fill(-1));
  const [results, setResults] = useState<Results | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [hasPrevResults, setHasPrevResults] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHasPrevResults(true);
    } catch {}
  }, []);

  const loadPrevResults = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setResults(JSON.parse(stored));
        setPhase("results");
      }
    } catch {}
  }, []);

  const startQuiz = () => {
    setPhase("quiz");
    setCurrentStep(0);
    setAnswers(new Array(TOTAL_STEPS * QUESTIONS_PER_STEP).fill(-1));
  };

  const selectAnswer = (qIndex: number, score: number) => {
    const next = [...answers];
    next[qIndex] = score;
    setAnswers(next);
  };

  const canProceed = () => {
    const start = currentStep * QUESTIONS_PER_STEP;
    for (let i = start; i < start + QUESTIONS_PER_STEP; i++) {
      if (answers[i] === -1) return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const r = computeResults(answers);
      setResults(r);
      setPhase("results");
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(r)); } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const saveResults = () => {
    if (results) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
      } catch {}
    }
  };

  const restart = () => {
    setPhase("intro");
    setCurrentStep(0);
    setAnswers(new Array(TOTAL_STEPS * QUESTIONS_PER_STEP).fill(-1));
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const globalQuestionIndex = currentStep * QUESTIONS_PER_STEP;
  const progressPercent = phase === "quiz"
    ? Math.round(((currentStep * QUESTIONS_PER_STEP + answers.slice(globalQuestionIndex, globalQuestionIndex + QUESTIONS_PER_STEP).filter(a => a !== -1).length) / (TOTAL_STEPS * QUESTIONS_PER_STEP)) * 100)
    : 0;

  /* recommendation getter */
  const getRecommendation = (principleIndex: number, scorePercent: number): string => {
    const keys = ["decision", "ndz", "trace", "reg", "ops"];
    const key = keys[principleIndex];
    let level = 3;
    if (scorePercent < 25) level = 0;
    else if (scorePercent < 50) level = 1;
    else if (scorePercent < 75) level = 2;
    return (t.recs as Record<string, string>)[`${key}_${level}`] || "";
  };

  /* principle mapping: steps 0-3 map to principles 0-3, step 4 is ops/governance */
  const principleLabels = [...t.principleNames, t.stepLabels[4]];

  return (
    <div className="min-h-screen" style={{ background: C.navy1, color: C.white, fontFamily: "'Inter', sans-serif" }}>
      {/* ─── NAV BAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ background: "rgba(5,12,26,.92)", borderColor: C.goldBorder, height: 72 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={`/${locale}`} className="flex items-center gap-3 no-underline">
              <div className="w-9 h-9 rounded-md flex items-center justify-center text-xs font-extrabold" style={{ background: C.gold, color: C.navy1, fontFamily: "'Space Grotesk', sans-serif" }}>ACF</div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold" style={{ color: C.white, fontFamily: "'Space Grotesk', sans-serif" }}>ACF Standard</div>
                <div className="text-[9px] uppercase tracking-widest" style={{ color: C.gold }}>{t.navSubtext}</div>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/${locale}`} className="text-xs font-medium no-underline hidden sm:inline-block" style={{ color: C.gray2 }}>{t.navHome}</a>
            <a href="https://www.acf-score.com/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold no-underline px-4 py-2 rounded-md" style={{ background: C.gold, color: C.navy1 }}>{t.navCta}</a>
          </div>
        </div>
      </nav>

      {/* ─── PROGRESS BAR (quiz phase) ─── */}
      {phase === "quiz" && (
        <div className="fixed top-[72px] left-0 right-0 z-40" style={{ background: C.navy2 }}>
          <div className="h-1 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%`, background: `linear-gradient(90deg, ${C.gold}, ${C.gold2})` }} />
          {/* Step indicators */}
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            {t.stepLabels.map((label, idx) => (
              <div key={idx} className="flex items-center gap-2 cursor-default">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: idx === currentStep ? C.gold : idx < currentStep ? "rgba(201,168,76,.3)" : "rgba(255,255,255,.06)",
                    color: idx === currentStep ? C.navy1 : idx < currentStep ? C.gold : C.gray,
                    border: idx === currentStep ? "none" : `1px solid ${idx < currentStep ? C.goldBorder : C.bd1}`,
                  }}
                >
                  {idx < currentStep ? "✓" : idx + 1}
                </div>
                <span className="text-xs font-medium hidden lg:inline" style={{ color: idx === currentStep ? C.gold : C.gray }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ INTRO PHASE ═══ */}
      {phase === "intro" && (
        <main className="pt-32 pb-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="text-[10px] font-bold tracking-[.14em] uppercase px-4 py-1.5 rounded-full" style={{ color: C.gold, background: C.goldDim, border: `1px solid ${C.goldBorder}`, fontFamily: "'JetBrains Mono', monospace" }}>{t.heroBadge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {t.heroTitle1}<span style={{ color: C.gold }}>{t.heroTitle2}</span>
            </h1>
            <p className="text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: C.gray2 }}>{t.heroDesc}</p>

            {hasPrevResults && (
              <div className="mb-6 p-4 rounded-xl border" style={{ background: "rgba(201,168,76,.06)", borderColor: C.goldBorder }}>
                <p className="text-sm" style={{ color: C.gray2 }}>
                  {t.prevResults}
                  <button onClick={loadPrevResults} className="underline font-semibold" style={{ color: C.gold, background: "none", border: "none", cursor: "pointer" }}>{t.loadPrev}</button>
                </p>
              </div>
            )}

            <button
              onClick={startQuiz}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all duration-300 hover:scale-105"
              style={{ background: C.gold, color: C.navy1, boxShadow: `0 4px 24px rgba(201,168,76,.35)` }}
            >
              {t.heroStart}
            </button>
            <p className="mt-4 text-xs" style={{ color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>{t.heroInfo}</p>

            {/* Step preview cards */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {t.stepLabels.map((label, idx) => (
                <div key={idx} className="p-5 rounded-xl border transition-all duration-300 hover:border-opacity-60" style={{ background: C.navy2, borderColor: C.bd1 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: C.goldDim, color: C.gold }}>{idx + 1}</div>
                    <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: C.gray2 }}>{t.stepDescriptions[idx]}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ═══ QUIZ PHASE ═══ */}
      {phase === "quiz" && (
        <main className="pt-40 pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Step header */}
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-[.14em] uppercase" style={{ color: C.gold, fontFamily: "'JetBrains Mono', monospace" }}>
                {t.stepLabel} {currentStep + 1} / {TOTAL_STEPS}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {t.stepLabels[currentStep]}
              </h2>
              <p className="text-sm mt-2" style={{ color: C.gray2 }}>{t.stepDescriptions[currentStep]}</p>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {Array.from({ length: QUESTIONS_PER_STEP }).map((_, qi) => {
                const qIdx = globalQuestionIndex + qi;
                const question = t.questions[qIdx];
                if (!question) return null;
                return (
                  <div key={qIdx} className="p-6 rounded-xl border transition-all duration-300" style={{ background: C.navy2, borderColor: answers[qIdx] !== -1 ? C.goldBorder : C.bd1 }}>
                    <div className="flex items-start gap-3 mb-5">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: C.goldDim, color: C.gold }}>
                        {qi + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold leading-snug">{question.q}</h3>
                    </div>
                    <div className="space-y-3 ml-10">
                      {question.a.map((answer, ai) => {
                        const selected = answers[qIdx] === answer.score;
                        return (
                          <button
                            key={ai}
                            onClick={() => selectAnswer(qIdx, answer.score)}
                            className="w-full text-left p-4 rounded-lg border transition-all duration-200 hover:border-opacity-80"
                            style={{
                              background: selected ? "rgba(201,168,76,.1)" : "rgba(255,255,255,.02)",
                              borderColor: selected ? C.gold : "rgba(255,255,255,.08)",
                              color: selected ? C.white : C.gray2,
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center transition-all duration-200"
                                style={{ borderColor: selected ? C.gold : "rgba(255,255,255,.2)" }}
                              >
                                {selected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: C.gold }} />}
                              </div>
                              <span className="text-sm leading-relaxed">{answer.text}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-lg text-sm font-semibold border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ borderColor: C.bd1, color: C.gray2, background: "transparent" }}
              >
                {t.prev}
              </button>
              <span className="text-xs" style={{ color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>
                {answers.filter(a => a !== -1).length} {t.questionOf} {TOTAL_STEPS * QUESTIONS_PER_STEP}
              </span>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                style={{ background: canProceed() ? C.gold : "rgba(201,168,76,.3)", color: C.navy1 }}
              >
                {currentStep === TOTAL_STEPS - 1 ? t.submit : t.next}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ═══ RESULTS PHASE ═══ */}
      {phase === "results" && results && (
        <main className="pt-32 pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {t.resultsTitle1}<span style={{ color: C.gold }}>{t.resultsTitle2}</span>
              </h1>
            </div>

            {/* Overall Score Card */}
            <div className="p-8 sm:p-10 rounded-2xl border mb-8 text-center" style={{ background: C.navy2, borderColor: C.goldBorder }}>
              <h2 className="text-sm font-bold tracking-[.12em] uppercase mb-6" style={{ color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>{t.overallScore}</h2>
              <div className="flex justify-center mb-6">
                <CircularProgress percent={results.overall} size={220} strokeWidth={14} color={getRiskColor(results.riskLevel)} />
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: `${getRiskColor(results.riskLevel)}18`, border: `1px solid ${getRiskColor(results.riskLevel)}40` }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: getRiskColor(results.riskLevel) }} />
                <span className="text-sm font-bold" style={{ color: getRiskColor(results.riskLevel) }}>
                  {t.riskLevel}: {t.riskLevels[results.riskLevel as keyof typeof t.riskLevels]}
                </span>
              </div>
            </div>

            {/* Principle Scores */}
            <div className="p-8 rounded-2xl border mb-8" style={{ background: C.navy2, borderColor: C.bd1 }}>
              <h2 className="text-sm font-bold tracking-[.12em] uppercase mb-8" style={{ color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>{t.principleScores}</h2>
              <div className="space-y-6">
                {results.principlePercents.map((pct, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-sm" style={{ background: getPrincipleColor(idx) }} />
                        <span className="text-sm font-semibold">{principleLabels[idx]}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: getPrincipleColor(idx), fontFamily: "'Space Grotesk', sans-serif" }}>{pct}%</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.06)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${getPrincipleColor(idx)}, ${getPrincipleColor(idx)}88)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-8 rounded-2xl border mb-8" style={{ background: C.navy2, borderColor: C.bd1 }}>
              <h2 className="text-sm font-bold tracking-[.12em] uppercase mb-4" style={{ color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>{t.recommendations}</h2>
              <p className="text-sm mb-6" style={{ color: C.gray2 }}>{t.recIntro}</p>
              <div className="space-y-4">
                {results.principlePercents.map((pct, idx) => {
                  const rec = getRecommendation(idx, pct);
                  if (!rec) return null;
                  const isUrgent = pct < 25;
                  const isWarning = pct >= 25 && pct < 50;
                  return (
                    <div key={idx} className="p-5 rounded-xl border" style={{
                      background: isUrgent ? "rgba(239,68,68,.06)" : isWarning ? "rgba(245,158,11,.06)" : "rgba(255,255,255,.02)",
                      borderColor: isUrgent ? "rgba(239,68,68,.25)" : isWarning ? "rgba(245,158,11,.2)" : C.bd1,
                    }}>
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-sm mt-1 flex-shrink-0" style={{ background: getPrincipleColor(idx) }} />
                        <div>
                          <div className="text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: getPrincipleColor(idx) }}>{principleLabels[idx]}</div>
                          <p className="text-sm leading-relaxed" style={{ color: C.gray2 }}>{rec}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps / CTAs */}
            <div className="p-8 rounded-2xl border mb-8" style={{ background: C.navy2, borderColor: C.bd1 }}>
              <h2 className="text-sm font-bold tracking-[.12em] uppercase mb-6" style={{ color: C.gray, fontFamily: "'JetBrains Mono', monospace" }}>{t.nextSteps}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="https://www.acf-score.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-xl border text-left no-underline transition-all duration-300 hover:scale-[1.02] group"
                  style={{ background: "rgba(201,168,76,.06)", borderColor: C.goldBorder }}
                >
                  <div className="text-2xl mb-3">📊</div>
                  <div className="text-sm font-bold mb-1 group-hover:underline" style={{ color: C.gold }}>{t.ctaScore}</div>
                  <p className="text-xs" style={{ color: C.gray2 }}>{t.ctaScoreDesc}</p>
                </a>
                <a
                  href="https://artificialintelligenceact.eu/fr/evaluation/verificateur-de-conformite-a-l-acte-de-l-ai-de-l-ue/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-xl border text-left no-underline transition-all duration-300 hover:scale-[1.02] group"
                  style={{ background: "rgba(59,130,246,.06)", borderColor: "rgba(59,130,246,.2)" }}
                >
                  <div className="text-2xl mb-3">🇪🇺</div>
                  <div className="text-sm font-bold mb-1 group-hover:underline" style={{ color: C.blue }}>{t.ctaEU}</div>
                  <p className="text-xs" style={{ color: C.gray2 }}>{t.ctaEUDesc}</p>
                </a>
                <a
                  href={`/${locale}/contact`}
                  className="p-5 rounded-xl border text-left no-underline transition-all duration-300 hover:scale-[1.02] group"
                  style={{ background: "rgba(34,197,94,.06)", borderColor: "rgba(34,197,94,.2)" }}
                >
                  <div className="text-2xl mb-3">🤝</div>
                  <div className="text-sm font-bold mb-1 group-hover:underline" style={{ color: C.green }}>{t.ctaContact}</div>
                  <p className="text-xs" style={{ color: C.gray2 }}>{t.ctaContactDesc}</p>
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={saveResults}
                className="px-6 py-3 rounded-lg text-sm font-semibold border transition-all duration-200 hover:border-opacity-80"
                style={{ borderColor: C.goldBorder, color: C.gold, background: "transparent" }}
              >
                {savedNotice ? t.savedMsg : t.shareResults}
              </button>
              <button
                onClick={restart}
                className="px-6 py-3 rounded-lg text-sm font-semibold border transition-all duration-200"
                style={{ borderColor: C.bd1, color: C.gray2, background: "transparent" }}
              >
                {t.restart}
              </button>
            </div>
          </div>
        </main>
      )}

      <Footer />
      <AIAgent />
    </div>
  );
}
