"use client"
import { useLocale } from "next-intl";

const translations = {
  en: {
    // Nav
    navSubtext: "DIAGNOSTIC TOOL — FREE",
    navHome: "← Home",
    navCta: "Calculate My Score →",
    // Hero
    heroTag: "DIAGNOSTIC TOOL — FREE",
    heroLine1: "Measure Your",
    heroLine2: "Sovereignty Score",
    heroDesc: "Are you ready for the era of autonomous AI agents? Evaluate the robustness of your agentic governance in 10 minutes. Get your ACF Score® across 6 governance axes with personalized recommendations.",
    heroCta: "Calculate My Score — Free →",
    heroHow: "How It Works",
    badge1: "7 guided steps",
    badge2: "Full PDF report",
    badge3: "No sign-up required",
    badge4: "Result in 10 minutes",
    // Dial
    dialLabel: "SOVEREIGNTY SCORE",
    // Stats
    stat1: "of companies use AI agents without formal governance",
    stat2: "average losses from uncontrolled AI decisions",
    stat3: "of executives fear strategic loss of control",
    // 6 Axes
    axesSectionLabel: "// Measurement Framework",
    axesSectionTitle: "6 Governance Axes",
    axesSectionDesc: "Your Sovereignty Score is calculated across 6 critical dimensions of agentic governance. Each axis reveals a specific vulnerability or strength in your current framework.",
    axis1Title: "Decisional Autonomy",
    axis1Desc: "Measures the degree to which your AI agents make decisions independently — and whether those decisions stay within defined boundaries.",
    axis2Title: "Control & Supervision",
    axis2Desc: "Evaluates your capacity to monitor, intervene, and stop autonomous agent operations at any time through your kill switch protocols.",
    axis3Title: "Resilience",
    axis3Desc: "Assesses your organization's ability to maintain operations and recover quickly when agentic systems fail or act unexpectedly.",
    axis4Title: "Platform Dependency",
    axis4Desc: "Quantifies your exposure to third-party AI platforms (Amazon, Google, OpenAI) and the risk if any single provider becomes unavailable.",
    axis5Title: "Regulatory Compliance",
    axis5Desc: "Measures alignment with EU AI Act, GDPR, and sector-specific regulations governing the use of autonomous systems in commercial environments.",
    axis6Title: "Technical Controls",
    axis6Desc: "Evaluates the technical infrastructure: traceability, audit logs, sandboxing, reversibility mechanisms, and access control for your AI systems.",
    // How it works
    howSectionLabel: "// Process",
    howSectionTitle: "7 Steps to Your Score",
    howSectionDesc: "A structured diagnostic that takes 10 minutes. No sign-up required. Get your full results immediately.",
    step1Title: "Company Context",
    step1Desc: "Sector, company size, current AI agent usage and deployment scope.",
    step1Tag: "FOUNDATION",
    step2Title: "Maturity Level",
    step2Desc: "How your agents currently operate — from assisted to fully autonomous.",
    step2Tag: "ASSESSMENT",
    step3Title: "4 ACF Layers",
    step3Desc: "Governance, Decision Policy, Agent System, and Execution Supervision layers.",
    step3Tag: "FRAMEWORK",
    step4Title: "Dependencies",
    step4Desc: "Critical supplier mapping, platform risk exposure, and single points of failure.",
    step4Tag: "RISK MAP",
    step5Title: "Control Mechanisms",
    step5Desc: "Kill switch readiness, audit trail quality, and human escalation protocols.",
    step5Tag: "CONTROLS",
    step6Title: "Compliance Check",
    step6Desc: "EU AI Act, GDPR, and sector-specific regulatory alignment assessment.",
    step6Tag: "COMPLIANCE",
    step7Title: "Your Score & Report",
    step7Desc: "Immediate Sovereignty Score, axis breakdown, and your 3 priority actions.",
    step7Tag: "RESULTS",
    stepReadyTitle: "Ready?",
    stepReadyDesc: "10 minutes. Free. No sign-up. Immediate results.",
    stepReadyCta: "Start Now →",
    // Deliverables
    delSectionLabel: "// What You Get",
    delSectionTitle: "Your Complete Governance Report",
    delSectionDesc: "A full diagnostic report — actionable, specific to your organization, downloadable as PDF.",
    del1Title: "Sovereignty Score",
    del1Desc: "Your composite score measuring decisional independence across all 6 governance axes. Benchmarked against industry standards.",
    del2Title: "Global ACF® Score",
    del2Desc: "Full evaluation of your 4 operational governance layers with individual scores and gap analysis for each dimension.",
    del3Title: "3 Priority Actions",
    del3Desc: "A personalized, prioritized action plan to secure your transition and reach ACF Level 2 governance compliance.",
    // Risks
    riskSectionLabel: "// Why It Matters",
    riskSectionTitle: "Without Agentic Governance, You Risk:",
    risk1Title: "AI Decisions Against Your Business Interests",
    risk1Desc: "Agents optimizing local metrics without global business vision — silently destroying value.",
    risk2Title: "Loss of Strategic Control",
    risk2Desc: "Inability to steer, audit, or correct your AI systems in real time when decisions go wrong.",
    risk3Title: "Critical Platform Dependency",
    risk3Desc: "One Amazon, Google, or OpenAI outage stops your entire operation. No fallback, no resilience.",
    risk4Title: "Legal Liability on Automated Decisions",
    risk4Desc: "You remain legally responsible for every decision your agents make — even those you can't explain.",
    risk5Title: "Margin Erosion via Uncontrolled Pricing",
    risk5Desc: "Agents setting prices and promotions without boundaries can destroy profitability in hours.",
    risk6Title: "No Audit Trail",
    risk6Desc: "Without traceability, you cannot understand, explain, or correct what your AI agents have done.",
    // CTA
    ctaFreeTag: "✓ 100% FREE · NO SIGN-UP · INSTANT RESULTS",
    ctaTitle1: "Calculate Your",
    ctaTitle2: "Sovereignty Score",
    ctaTitle3: "Now",
    ctaDesc: "10 minutes. A complete diagnostic of your agentic governance. Understand where you stand before a failure forces you to find out.",
    ctaPrimary: "Start the Diagnostic — Free →",
    ctaSecondary: "Request a Custom Assessment",
    // Footer
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Global Standard for AI Governance",
    footerDesc: "The governance standard for organizations deploying autonomous AI agents.",
    footerFramework: "Framework",
    footerTheStandard: "The Standard",
    footerBlog: "Blog",
    footerCertification: "ACF Certification",
    footerProducts: "Products",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Organization",
    footerPartnerPortal: "Partner Portal",
    footerAbout: "About",
    footerContact: "Contact",
    footerLegal: "Legal",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.",
  },
  fr: {
    // Nav
    navSubtext: "OUTIL DE DIAGNOSTIC — GRATUIT",
    navHome: "← Accueil",
    navCta: "Calculer Mon Score →",
    // Hero
    heroTag: "OUTIL DE DIAGNOSTIC — GRATUIT",
    heroLine1: "Mesurez Votre",
    heroLine2: "Score de Souveraineté",
    heroDesc: "Êtes-vous prêt pour l'ère des agents IA autonomes ? Évaluez la robustesse de votre gouvernance agentique en 10 minutes. Obtenez votre ACF Score® sur 6 axes de gouvernance avec des recommandations personnalisées.",
    heroCta: "Calculer Mon Score — Gratuit →",
    heroHow: "Comment Ça Marche",
    badge1: "7 étapes guidées",
    badge2: "Rapport PDF complet",
    badge3: "Aucune inscription requise",
    badge4: "Résultat en 10 minutes",
    // Dial
    dialLabel: "SCORE DE SOUVERAINETÉ",
    // Stats
    stat1: "des entreprises utilisent des agents IA sans gouvernance formelle",
    stat2: "de pertes moyennes liées aux décisions IA non contrôlées",
    stat3: "des dirigeants craignent la perte de contrôle stratégique",
    // 6 Axes
    axesSectionLabel: "// Cadre de Mesure",
    axesSectionTitle: "6 Axes de Gouvernance",
    axesSectionDesc: "Votre Score de Souveraineté est calculé sur 6 dimensions critiques de gouvernance agentique. Chaque axe révèle une vulnérabilité ou une force spécifique de votre cadre actuel.",
    axis1Title: "Autonomie Décisionnelle",
    axis1Desc: "Mesure le degré d'indépendance décisionnelle de vos agents IA — et si ces décisions restent dans les limites définies.",
    axis2Title: "Contrôle & Supervision",
    axis2Desc: "Évalue votre capacité à surveiller, intervenir et arrêter les opérations autonomes des agents à tout moment via vos protocoles de kill switch.",
    axis3Title: "Résilience",
    axis3Desc: "Évalue la capacité de votre organisation à maintenir ses opérations et à se rétablir rapidement lorsque les systèmes agentiques échouent ou agissent de manière inattendue.",
    axis4Title: "Dépendance aux Plateformes",
    axis4Desc: "Quantifie votre exposition aux plateformes IA tierces (Amazon, Google, OpenAI) et le risque si un fournisseur unique devient indisponible.",
    axis5Title: "Conformité Réglementaire",
    axis5Desc: "Mesure l'alignement avec l'AI Act de l'UE, le RGPD et les réglementations sectorielles régissant l'utilisation des systèmes autonomes en environnements commerciaux.",
    axis6Title: "Contrôles Techniques",
    axis6Desc: "Évalue l'infrastructure technique : traçabilité, journaux d'audit, sandboxing, mécanismes de réversibilité et contrôle d'accès de vos systèmes IA.",
    // How it works
    howSectionLabel: "// Processus",
    howSectionTitle: "7 Étapes Vers Votre Score",
    howSectionDesc: "Un diagnostic structuré en 10 minutes. Aucune inscription requise. Obtenez vos résultats complets immédiatement.",
    step1Title: "Contexte Entreprise",
    step1Desc: "Secteur, taille de l'entreprise, utilisation actuelle des agents IA et périmètre de déploiement.",
    step1Tag: "FONDATION",
    step2Title: "Niveau de Maturité",
    step2Desc: "Comment vos agents fonctionnent actuellement — de l'assistance à l'autonomie complète.",
    step2Tag: "ÉVALUATION",
    step3Title: "4 Couches ACF",
    step3Desc: "Gouvernance, Politique Décisionnelle, Système d'Agents et Supervision de l'Exécution.",
    step3Tag: "FRAMEWORK",
    step4Title: "Dépendances",
    step4Desc: "Cartographie des fournisseurs critiques, exposition aux risques des plateformes et points de défaillance uniques.",
    step4Tag: "CARTE DES RISQUES",
    step5Title: "Mécanismes de Contrôle",
    step5Desc: "Disponibilité du kill switch, qualité de la piste d'audit et protocoles d'escalade humaine.",
    step5Tag: "CONTRÔLES",
    step6Title: "Vérification de Conformité",
    step6Desc: "Évaluation de l'alignement avec l'AI Act de l'UE, le RGPD et les réglementations sectorielles.",
    step6Tag: "CONFORMITÉ",
    step7Title: "Votre Score & Rapport",
    step7Desc: "Score de Souveraineté immédiat, analyse par axe et vos 3 actions prioritaires.",
    step7Tag: "RÉSULTATS",
    stepReadyTitle: "Prêt ?",
    stepReadyDesc: "10 minutes. Gratuit. Sans inscription. Résultats immédiats.",
    stepReadyCta: "Commencer →",
    // Deliverables
    delSectionLabel: "// Ce Que Vous Obtenez",
    delSectionTitle: "Votre Rapport de Gouvernance Complet",
    delSectionDesc: "Un rapport de diagnostic complet — actionnable, spécifique à votre organisation, téléchargeable en PDF.",
    del1Title: "Score de Souveraineté",
    del1Desc: "Votre score composite mesurant l'indépendance décisionnelle sur les 6 axes de gouvernance. Comparé aux standards de l'industrie.",
    del2Title: "Score ACF® Global",
    del2Desc: "Évaluation complète de vos 4 couches de gouvernance opérationnelle avec scores individuels et analyse des écarts pour chaque dimension.",
    del3Title: "3 Actions Prioritaires",
    del3Desc: "Un plan d'action personnalisé et priorisé pour sécuriser votre transition et atteindre la conformité de gouvernance ACF Niveau 2.",
    // Risks
    riskSectionLabel: "// Pourquoi C'est Important",
    riskSectionTitle: "Sans Gouvernance Agentique, Vous Risquez :",
    risk1Title: "Des Décisions IA Contre Vos Intérêts Commerciaux",
    risk1Desc: "Des agents optimisant des métriques locales sans vision commerciale globale — détruisant silencieusement de la valeur.",
    risk2Title: "Perte de Contrôle Stratégique",
    risk2Desc: "Incapacité à piloter, auditer ou corriger vos systèmes IA en temps réel lorsque les décisions tournent mal.",
    risk3Title: "Dépendance Critique aux Plateformes",
    risk3Desc: "Une panne d'Amazon, Google ou OpenAI arrête toute votre opération. Aucun plan de repli, aucune résilience.",
    risk4Title: "Responsabilité Juridique sur les Décisions Automatisées",
    risk4Desc: "Vous restez juridiquement responsable de chaque décision prise par vos agents — même celles que vous ne pouvez pas expliquer.",
    risk5Title: "Érosion des Marges par une Tarification Non Contrôlée",
    risk5Desc: "Des agents fixant prix et promotions sans limites peuvent détruire la rentabilité en quelques heures.",
    risk6Title: "Aucune Piste d'Audit",
    risk6Desc: "Sans traçabilité, vous ne pouvez ni comprendre, ni expliquer, ni corriger ce que vos agents IA ont fait.",
    // CTA
    ctaFreeTag: "✓ 100% GRATUIT · SANS INSCRIPTION · RÉSULTATS IMMÉDIATS",
    ctaTitle1: "Calculez Votre",
    ctaTitle2: "Score de Souveraineté",
    ctaTitle3: "Maintenant",
    ctaDesc: "10 minutes. Un diagnostic complet de votre gouvernance agentique. Comprenez où vous en êtes avant qu'une défaillance ne vous force à le découvrir.",
    ctaPrimary: "Lancer le Diagnostic — Gratuit →",
    ctaSecondary: "Demander une Évaluation Personnalisée",
    // Footer
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Standard Mondial de Gouvernance IA",
    footerDesc: "Le standard de gouvernance pour les organisations déployant des agents IA autonomes.",
    footerFramework: "Framework",
    footerTheStandard: "Le Standard",
    footerBlog: "Blog",
    footerCertification: "ACF Certification",
    footerProducts: "Produits",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Organisation",
    footerPartnerPortal: "Portail Partenaire",
    footerAbout: "À Propos",
    footerContact: "Contact",
    footerLegal: "Légal",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tous droits réservés.",
  },
};

const buildHTML = (locale: string, t: Record<string, string>) => `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ACF Score® — Sovereignty Metric | Agentic Commerce Framework</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --navy:#050c1a;--navy2:#071122;--navy3:#0d1f3c;
  --gold:#c9a84c;--gold2:#e8c96a;--gold-dim:rgba(201,168,76,.14);--gold-glow:rgba(201,168,76,.35);
  --w:#fff;--gr:#6b7fa0;--gr2:#9db0c8;
  --bd:rgba(201,168,76,.2);--bd2:rgba(255,255,255,.07);
  --green:#22c55e;--green-glow:rgba(34,197,94,.4);
  --red:#ef4444;
}
html{scroll-behavior:smooth}
body{background:var(--navy);color:var(--w);font-family:'Inter',sans-serif;line-height:1.6;overflow-x:hidden}
#neural{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.4}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:800;background:rgba(5,12,26,.92);backdrop-filter:blur(24px);border-bottom:1px solid var(--bd);height:72px;display:flex;align-items:center}
.nw{max-width:1400px;margin:0 auto;padding:0 32px;width:100%;display:flex;align-items:center;gap:20px}
.logo{display:flex;align-items:center;gap:12px;text-decoration:none}
.lb{width:38px;height:38px;background:var(--gold);border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:13px;color:var(--navy);flex-shrink:0}
.ln{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:var(--w);line-height:1.2}
.ls{font-size:9.5px;color:var(--gold);letter-spacing:.1em;text-transform:uppercase}
.nr{display:flex;align-items:center;gap:16px;margin-left:auto}
.nback{color:var(--gr2);text-decoration:none;font-size:13px;font-weight:500;transition:.2s;display:flex;align-items:center;gap:6px}
.nback:hover{color:var(--gold)}
.ncta{background:var(--gold);color:var(--navy);padding:9px 18px;border-radius:6px;font-weight:700;font-size:12.5px;text-decoration:none;transition:.2s}
.ncta:hover{background:var(--gold2);box-shadow:0 4px 20px var(--gold-glow)}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding-top:72px}
.hgrid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,168,76,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.05) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%)}
.hw{max-width:1320px;margin:0 auto;padding:40px 40px 60px;width:100%;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.htag{display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--bd);padding:6px 14px;border-radius:100px;font-size:11px;color:var(--gold);letter-spacing:.1em;text-transform:uppercase;font-weight:600;margin-bottom:20px;font-family:'JetBrains Mono',monospace}
.hdot{width:6px;height:6px;background:var(--gold);border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(32px,4vw,60px);font-weight:800;line-height:1.08;letter-spacing:-.025em;margin-bottom:20px}
.hgold{color:var(--gold)}
.hline::after{content:'';display:block;height:3px;width:55%;background:linear-gradient(90deg,var(--gold),transparent);margin-top:8px}
.hdesc{font-size:16px;color:var(--gr2);line-height:1.8;margin-bottom:32px;max-width:500px}
.hact{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
.btng{background:var(--gold);color:var(--navy);padding:14px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:.25s}
.btng:hover{background:var(--gold2);box-shadow:0 8px 30px var(--gold-glow);transform:translateY(-2px)}
.btno{background:transparent;color:var(--w);border:1px solid rgba(255,255,255,.18);padding:14px 28px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:.25s}
.btno:hover{border-color:var(--gold);color:var(--gold)}
.hbadges{display:flex;gap:12px;flex-wrap:wrap}
.hb{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--gr2);font-family:'JetBrains Mono',monospace}
.hb::before{content:'✓';color:var(--green);font-weight:700}

/* SCORE DIAL */
.dial-wrap{position:relative;display:flex;align-items:center;justify-content:center;height:460px}
.dial-outer{position:relative;width:320px;height:320px}
.dial-svg{width:100%;height:100%}
.dial-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.dial-score{font-family:'Space Grotesk',sans-serif;font-size:72px;font-weight:900;color:var(--gold);line-height:1}
.dial-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--gr);letter-spacing:.12em;margin-top:6px}
.dial-status{font-size:13px;color:var(--green);font-weight:600;margin-top:4px}
.axes{position:absolute;inset:0}
.axis-dot{position:absolute;display:flex;flex-direction:column;align-items:center;gap:4px}
.axis-dot .ad-val{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:var(--gold)}
.axis-dot .ad-lbl{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--gr);letter-spacing:.08em;text-align:center}
.axis-dot .ad-bar{width:36px;height:4px;background:var(--navy3);border-radius:2px;overflow:hidden;margin-top:2px}
.axis-dot .ad-fill{height:100%;background:var(--gold);border-radius:2px;transition:width 1.5s cubic-bezier(.16,1,.3,1)}

/* STATS */
.statsbar{background:var(--navy3);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)}
.sgrid{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr)}
.sc{padding:32px 20px;text-align:center;border-right:1px solid var(--bd);transition:.3s}
.sc:last-child{border-right:none}
.scn{font-family:'Space Grotesk',sans-serif;font-size:44px;font-weight:800;color:var(--gold);line-height:1}
.scl{font-size:12px;color:var(--gr);margin-top:6px;font-family:'JetBrains Mono',monospace;letter-spacing:.04em}

/* SECTIONS */
section{padding:80px 0;position:relative;z-index:1}
.ctn{max-width:1320px;margin:0 auto;padding:0 40px}
.ew{font-size:15px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;display:block;font-family:'JetBrains Mono',monospace}
.st{font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3vw,44px);font-weight:800;line-height:1.1;letter-spacing:-.02em;margin-bottom:16px}
.sd{font-size:16px;color:var(--gr2);max-width:580px;line-height:1.75}
.gb{width:44px;height:3px;background:linear-gradient(90deg,var(--gold),transparent);margin:12px 0 28px}
.secdark{background:var(--navy2)}
.rev{opacity:0;transform:translateY(26px);transition:all .7s cubic-bezier(.16,1,.3,1)}
.rev.vis{opacity:1;transform:translateY(0)}
.d1{transition-delay:.08s}.d2{transition-delay:.18s}.d3{transition-delay:.28s}

/* AXES GRID */
.axgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
.axcard{background:var(--navy3);border:1px solid var(--bd2);border-radius:12px;padding:32px 28px;transition:.3s;position:relative;overflow:hidden}
.axcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),transparent);transform:scaleX(0);transform-origin:left;transition:.4s}
.axcard:hover::before{transform:scaleX(1)}
.axcard:hover{border-color:var(--gold);transform:translateY(-4px)}
.ax-ico{width:48px;height:48px;border-radius:10px;background:var(--gold-dim);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:22px}
.ax-num{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--gold);letter-spacing:.12em;margin-bottom:8px}
.ax-title{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;margin-bottom:10px}
.ax-desc{font-size:13.5px;color:var(--gr);line-height:1.65;margin-bottom:16px}
.ax-score{display:flex;align-items:center;gap:10px}
.ax-bar{flex:1;height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden}
.ax-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--gold),var(--gold2));transition:width 1.8s cubic-bezier(.16,1,.3,1);width:0}
.ax-pct{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--gold);font-weight:700;flex-shrink:0}

/* STEPS */
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:48px}
.step{background:var(--navy3);padding:36px 28px;position:relative;transition:.3s}
.step:hover{background:#081728}
.step::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),transparent);transform:scaleX(0);transform-origin:left;transition:.4s}
.step:hover::after{transform:scaleX(1)}
.step-n{font-family:'Space Grotesk',sans-serif;font-size:56px;font-weight:900;color:rgba(201,168,76,.12);line-height:1;margin-bottom:16px}
.step-title{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;margin-bottom:10px}
.step-desc{font-size:13.5px;color:var(--gr);line-height:1.65}
.step-tag{display:inline-flex;margin-top:14px;padding:4px 10px;background:var(--gold-dim);border:1px solid var(--bd);border-radius:100px;font-size:10px;color:var(--gold);letter-spacing:.07em;font-weight:700;font-family:'JetBrains Mono',monospace}

/* RISKS */
.rgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:48px}
.rcard{background:var(--navy3);border:1px solid rgba(239,68,68,.15);border-radius:10px;padding:24px 28px;display:flex;gap:16px;align-items:flex-start;transition:.3s}
.rcard:hover{border-color:rgba(239,68,68,.35);background:#140a0a}
.rico{width:36px;height:36px;border-radius:8px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px}
.rtitle{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;margin-bottom:6px;color:var(--w)}
.rdesc{font-size:13px;color:var(--gr);line-height:1.55}

/* DELIVERABLES */
.delgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
.delcard{background:var(--navy3);border:1px solid var(--bd2);border-radius:12px;padding:32px;text-align:center;transition:.3s}
.delcard:hover{border-color:var(--gold);transform:translateY(-4px)}
.del-ico{font-size:36px;margin-bottom:16px}
.del-title{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;margin-bottom:10px}
.del-desc{font-size:13.5px;color:var(--gr);line-height:1.65}

/* CTA */
.ctasec{background:var(--navy3);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:100px 0;text-align:center;position:relative;overflow:hidden}
.ctawm{position:absolute;font-family:'Space Grotesk',sans-serif;font-size:160px;font-weight:900;color:rgba(201,168,76,.025);top:50%;left:50%;transform:translate(-50%,-50%);white-space:nowrap;pointer-events:none}
.ctain{position:relative;z-index:1}
.ctasec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,4vw,48px);font-weight:800;margin-bottom:16px;letter-spacing:-.02em}
.ctasec p{font-size:17px;color:var(--gr2);margin:0 auto 36px;max-width:520px;line-height:1.75}
.ctabtns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
.free-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);color:var(--green);padding:6px 14px;border-radius:100px;font-size:11px;font-weight:700;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;margin-bottom:20px}

/* FOOTER */
footer{background:var(--navy2);border-top:1px solid var(--bd);padding:50px 0 28px}
.fgrid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:56px;margin-bottom:40px}
.fdesc{color:var(--gr);font-size:14px;line-height:1.75;margin-top:14px;max-width:270px}
.ftitle{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
.flinks{list-style:none;display:flex;flex-direction:column;gap:9px}
.flinks a{color:var(--gr);font-size:14px;text-decoration:none;transition:.2s}
.flinks a:hover{color:var(--w)}
.fbot{border-top:1px solid var(--bd2);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.fcopy{font-size:12px;color:var(--gr);font-family:'JetBrains Mono',monospace}

@media(max-width:1024px){.hw{grid-template-columns:1fr;gap:48px}.axgrid{grid-template-columns:repeat(2,1fr)}.steps{grid-template-columns:repeat(2,1fr)}.fgrid{grid-template-columns:1fr 1fr}}
@media(max-width:768px){.hw{padding:30px 20px 40px}.axgrid{grid-template-columns:1fr}.rgrid{grid-template-columns:1fr}.delgrid{grid-template-columns:1fr}.steps{grid-template-columns:1fr}.dial-wrap{height:320px}.dial-outer{width:240px;height:240px}.dial-score{font-size:52px}.nw{padding:0 20px}.ctn{padding:0 20px}}
</style>
</head>
<body>
<canvas id="neural"></canvas>

<!-- NAV -->
<nav>
  <div class="nw">
    <a href="/${locale}/acf-score" target="_top" class="logo">
      <div class="lb">ACF</div>
      <div>
        <div class="ln">ACF SCORE</div>
        <div class="ls">${t.navSubtext}</div>
      </div>
    </a>
    <div class="nr">
      <a href="/${locale}/" target="_top" class="nback">${t.navHome}</a>
      <a href="https://www.acf-score.com/" target="_blank" class="ncta">${t.navCta}</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hgrid"></div>
  <div class="hw">
    <div>
      <div class="htag rev"><span class="hdot"></span>${t.heroTag}</div>
      <h1 class="rev d1">
        <span style="display:block;color:var(--w)">${t.heroLine1}</span>
        <span class="hgold hline">${t.heroLine2}</span>
      </h1>
      <p class="hdesc rev d2">${t.heroDesc}</p>
      <div class="hact rev d2">
        <a href="https://www.acf-score.com/" target="_blank" class="btng">${t.heroCta}</a>
        <a href="#how" class="btno">${t.heroHow}</a>
      </div>
      <div class="hbadges rev d2">
        <span class="hb">${t.badge1}</span>
        <span class="hb">${t.badge2}</span>
        <span class="hb">${t.badge3}</span>
        <span class="hb">${t.badge4}</span>
      </div>
    </div>
    <div class="dial-wrap rev d2">
      <div class="dial-outer">
        <svg class="dial-svg" viewBox="0 0 320 320">
          <defs>
            <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#c9a84c"/>
              <stop offset="100%" style="stop-color:#e8c96a"/>
            </linearGradient>
          </defs>
          <!-- Background ring -->
          <circle cx="160" cy="160" r="130" fill="none" stroke="rgba(201,168,76,.08)" stroke-width="18"/>
          <!-- Progress ring -->
          <circle cx="160" cy="160" r="130" fill="none" stroke="url(#dialGrad)" stroke-width="18"
            stroke-dasharray="816.8" stroke-dashoffset="204" stroke-linecap="round"
            transform="rotate(-90 160 160)" id="dialRing" style="transition:stroke-dashoffset 2s cubic-bezier(.16,1,.3,1)"/>
          <!-- Inner decorative rings -->
          <circle cx="160" cy="160" r="105" fill="none" stroke="rgba(201,168,76,.06)" stroke-width="1"/>
          <circle cx="160" cy="160" r="85" fill="none" stroke="rgba(201,168,76,.04)" stroke-width="1"/>
          <!-- Glow dots on ring -->
          <circle cx="160" cy="30" r="4" fill="var(--gold)" opacity=".3"/>
          <circle cx="289" cy="109" r="3" fill="var(--gold)" opacity=".2"/>
        </svg>
        <div class="dial-center">
          <div class="dial-score" id="dialScore">0</div>
          <div class="dial-label">${t.dialLabel}</div>
          <div class="dial-status">/ 100 pts</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- STATS -->
<div class="statsbar">
  <div class="sgrid">
    <div class="sc"><div class="scn">73%</div><div class="scl">${t.stat1}</div></div>
    <div class="sc"><div class="scn">€2.4M</div><div class="scl">${t.stat2}</div></div>
    <div class="sc"><div class="scn">89%</div><div class="scl">${t.stat3}</div></div>
  </div>
</div>

<!-- 6 AXES -->
<section class="secdark" id="axes">
  <div class="ctn">
    <span class="ew rev">${t.axesSectionLabel}</span>
    <h2 class="st rev d1">${t.axesSectionTitle}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${t.axesSectionDesc}</p>
    <div class="axgrid">
      <div class="axcard rev d1">
        <div class="ax-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
        <div class="ax-num">AXIS_01</div>
        <div class="ax-title">${t.axis1Title}</div>
        <div class="ax-desc">${t.axis1Desc}</div>
        <div class="ax-score"><div class="ax-bar"><div class="ax-fill" data-w="78"></div></div><span class="ax-pct">78/100</span></div>
      </div>
      <div class="axcard rev d2">
        <div class="ax-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <div class="ax-num">AXIS_02</div>
        <div class="ax-title">${t.axis2Title}</div>
        <div class="ax-desc">${t.axis2Desc}</div>
        <div class="ax-score"><div class="ax-bar"><div class="ax-fill" data-w="65"></div></div><span class="ax-pct">65/100</span></div>
      </div>
      <div class="axcard rev d3">
        <div class="ax-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
        <div class="ax-num">AXIS_03</div>
        <div class="ax-title">${t.axis3Title}</div>
        <div class="ax-desc">${t.axis3Desc}</div>
        <div class="ax-score"><div class="ax-bar"><div class="ax-fill" data-w="55"></div></div><span class="ax-pct">55/100</span></div>
      </div>
      <div class="axcard rev d1">
        <div class="ax-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
        <div class="ax-num">AXIS_04</div>
        <div class="ax-title">${t.axis4Title}</div>
        <div class="ax-desc">${t.axis4Desc}</div>
        <div class="ax-score"><div class="ax-bar"><div class="ax-fill" data-w="42"></div></div><span class="ax-pct">42/100</span></div>
      </div>
      <div class="axcard rev d2">
        <div class="ax-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
        <div class="ax-num">AXIS_05</div>
        <div class="ax-title">${t.axis5Title}</div>
        <div class="ax-desc">${t.axis5Desc}</div>
        <div class="ax-score"><div class="ax-bar"><div class="ax-fill" data-w="70"></div></div><span class="ax-pct">70/100</span></div>
      </div>
      <div class="axcard rev d3">
        <div class="ax-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
        <div class="ax-num">AXIS_06</div>
        <div class="ax-title">${t.axis6Title}</div>
        <div class="ax-desc">${t.axis6Desc}</div>
        <div class="ax-score"><div class="ax-bar"><div class="ax-fill" data-w="60"></div></div><span class="ax-pct">60/100</span></div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section id="how">
  <div class="ctn">
    <span class="ew rev">${t.howSectionLabel}</span>
    <h2 class="st rev d1">${t.howSectionTitle}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${t.howSectionDesc}</p>
    <div class="steps">
      <div class="step rev d1">
        <div class="step-n">01</div>
        <div class="step-title">${t.step1Title}</div>
        <div class="step-desc">${t.step1Desc}</div>
        <span class="step-tag">${t.step1Tag}</span>
      </div>
      <div class="step rev d2">
        <div class="step-n">02</div>
        <div class="step-title">${t.step2Title}</div>
        <div class="step-desc">${t.step2Desc}</div>
        <span class="step-tag">${t.step2Tag}</span>
      </div>
      <div class="step rev d3">
        <div class="step-n">03</div>
        <div class="step-title">${t.step3Title}</div>
        <div class="step-desc">${t.step3Desc}</div>
        <span class="step-tag">${t.step3Tag}</span>
      </div>
      <div class="step rev d1">
        <div class="step-n">04</div>
        <div class="step-title">${t.step4Title}</div>
        <div class="step-desc">${t.step4Desc}</div>
        <span class="step-tag">${t.step4Tag}</span>
      </div>
      <div class="step rev d2">
        <div class="step-n">05</div>
        <div class="step-title">${t.step5Title}</div>
        <div class="step-desc">${t.step5Desc}</div>
        <span class="step-tag">${t.step5Tag}</span>
      </div>
      <div class="step rev d3">
        <div class="step-n">06</div>
        <div class="step-title">${t.step6Title}</div>
        <div class="step-desc">${t.step6Desc}</div>
        <span class="step-tag">${t.step6Tag}</span>
      </div>
      <div class="step rev d1">
        <div class="step-n">07</div>
        <div class="step-title">${t.step7Title}</div>
        <div class="step-desc">${t.step7Desc}</div>
        <span class="step-tag">${t.step7Tag}</span>
      </div>
      <div class="step rev d2" style="background:var(--gold-dim);border-left:3px solid var(--gold)">
        <div class="step-n" style="color:rgba(201,168,76,.3)">→</div>
        <div class="step-title" style="color:var(--gold)">${t.stepReadyTitle}</div>
        <div class="step-desc">${t.stepReadyDesc}</div>
        <a href="https://www.acf-score.com/" target="_blank" class="btng" style="margin-top:16px;font-size:13px;padding:10px 18px">${t.stepReadyCta}</a>
      </div>
    </div>
  </div>
</section>

<!-- DELIVERABLES -->
<section class="secdark">
  <div class="ctn">
    <span class="ew rev">${t.delSectionLabel}</span>
    <h2 class="st rev d1">${t.delSectionTitle}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${t.delSectionDesc}</p>
    <div class="delgrid">
      <div class="delcard rev d1">
        <div class="del-ico"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
        <div class="del-title">${t.del1Title}</div>
        <div class="del-desc">${t.del1Desc}</div>
      </div>
      <div class="delcard rev d2">
        <div class="del-ico"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
        <div class="del-title">${t.del2Title}</div>
        <div class="del-desc">${t.del2Desc}</div>
      </div>
      <div class="delcard rev d3">
        <div class="del-ico"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg></div>
        <div class="del-title">${t.del3Title}</div>
        <div class="del-desc">${t.del3Desc}</div>
      </div>
    </div>
  </div>
</section>

<!-- RISKS -->
<section>
  <div class="ctn">
    <span class="ew rev">${t.riskSectionLabel}</span>
    <h2 class="st rev d1">${t.riskSectionTitle}</h2>
    <div class="gb rev d1"></div>
    <div class="rgrid">
      <div class="rcard rev d1">
        <div class="rico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
        <div><div class="rtitle">${t.risk1Title}</div><div class="rdesc">${t.risk1Desc}</div></div>
      </div>
      <div class="rcard rev d2">
        <div class="rico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.5"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="8" width="20" height="8" rx="4"/></svg></div>
        <div><div class="rtitle">${t.risk2Title}</div><div class="rdesc">${t.risk2Desc}</div></div>
      </div>
      <div class="rcard rev d1">
        <div class="rico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
        <div><div class="rtitle">${t.risk3Title}</div><div class="rdesc">${t.risk3Desc}</div></div>
      </div>
      <div class="rcard rev d2">
        <div class="rico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
        <div><div class="rtitle">${t.risk4Title}</div><div class="rdesc">${t.risk4Desc}</div></div>
      </div>
      <div class="rcard rev d1">
        <div class="rico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
        <div><div class="rtitle">${t.risk5Title}</div><div class="rdesc">${t.risk5Desc}</div></div>
      </div>
      <div class="rcard rev d2">
        <div class="rico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
        <div><div class="rtitle">${t.risk6Title}</div><div class="rdesc">${t.risk6Desc}</div></div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="ctasec">
  <div class="ctawm">ACF SCORE®</div>
  <div class="ctn ctain">
    <div class="free-tag">${t.ctaFreeTag}</div>
    <h2>${t.ctaTitle1}<br><span style="color:var(--gold)">${t.ctaTitle2}</span> ${t.ctaTitle3}</h2>
    <p>${t.ctaDesc}</p>
    <div class="ctabtns">
      <a href="https://www.acf-score.com/" target="_blank" class="btng" style="font-size:15px;padding:16px 32px">${t.ctaPrimary}</a>
      <a href="/${locale}/contact" target="_top" class="btno">${t.ctaSecondary}</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ctn">
    <div class="fgrid" style="grid-template-columns:1.5fr 1fr 1fr 1fr">
      <div>
        <a href="/${locale}/" target="_top" class="logo">
          <div class="lb">ACF</div>
          <div><div class="ln">${t.footerLogoText}</div><div class="ls">${t.footerLogoSubtext}</div></div>
        </a>
        <p class="fdesc">${t.footerDesc}</p>
      </div>
      <div>
        <div class="ftitle">${t.footerFramework}</div>
        <ul class="flinks">
          <li><a href="/${locale}/standard" target="_top">${t.footerTheStandard}</a></li>
          <li><a href="/${locale}/blog" target="_top">${t.footerBlog}</a></li>
          <li><a href="/${locale}/acf-certification" target="_top">${t.footerCertification}</a></li>
        </ul>
      </div>
      <div>
        <div class="ftitle">${t.footerProducts}</div>
        <ul class="flinks">
          <li><a href="/${locale}/acf-score" target="_top">${t.footerScore}</a></li>
          <li><a href="/${locale}/acf-control" target="_top">${t.footerControl}</a></li>
          <li><a href="/${locale}/acf-certification#academy" target="_top">${t.footerAcademy}</a></li>
        </ul>
      </div>
      <div>
        <div class="ftitle">${t.footerOrganization}</div>
        <ul class="flinks">
          <li><a href="/${locale}/acf-partners" target="_top">${t.footerPartnerPortal}</a></li>
          <li><a href="/${locale}/about" target="_top">${t.footerAbout}</a></li>
          <li><a href="/${locale}/contact" target="_top">${t.footerContact}</a></li>
          <li><a href="/${locale}/legal" target="_top">${t.footerLegal}</a></li>
        </ul>
      </div>
    </div>
    <div class="fbot">
      <div class="fcopy">${t.footerCopyright}</div>
    </div>
  </div>
</footer>

<script>
// NEURAL NETWORK
(function(){
  var c=document.getElementById('neural'),x=c.getContext('2d');
  function sz(){c.width=innerWidth;c.height=innerHeight}sz();addEventListener('resize',sz);
  var pts=[];for(var i=0;i<80;i++)pts.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});
  function draw(){
    x.clearRect(0,0,c.width,c.height);
    for(var i=0;i<pts.length;i++){
      pts[i].x+=pts[i].vx;pts[i].y+=pts[i].vy;
      if(pts[i].x<0||pts[i].x>c.width)pts[i].vx*=-1;
      if(pts[i].y<0||pts[i].y>c.height)pts[i].vy*=-1;
      x.beginPath();x.arc(pts[i].x,pts[i].y,1.5,0,Math.PI*2);x.fillStyle='rgba(201,168,76,.6)';x.fill();
      for(var j=i+1;j<pts.length;j++){
        var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<140){x.beginPath();x.moveTo(pts[i].x,pts[i].y);x.lineTo(pts[j].x,pts[j].y);x.strokeStyle='rgba(201,168,76,'+(1-d/140)*.3+')';x.lineWidth=.6;x.stroke()}
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// SCROLL REVEAL
var ro=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:.1});
document.querySelectorAll('.rev').forEach(function(el){ro.observe(el)});

// DIAL ANIMATION
var dialDone=false;
new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting&&!dialDone){
      dialDone=true;
      var target=74,start=null,dur=2000;
      var ring=document.getElementById('dialRing');
      var scoreEl=document.getElementById('dialScore');
      var circ=2*Math.PI*130;
      function step(ts){
        if(!start)start=ts;
        var p=Math.min((ts-start)/dur,1);
        var ease=1-Math.pow(1-p,4);
        var val=Math.round(ease*target);
        scoreEl.textContent=val;
        ring.style.strokeDashoffset=circ-(circ*ease*target/100);
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  });
},{threshold:.3}).observe(document.querySelector('.dial-wrap'));

// AXES BARS ANIMATION
var axDone=false;
new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting&&!axDone){
      axDone=true;
      document.querySelectorAll('.ax-fill').forEach(function(el){
        el.style.width=el.dataset.w+'%';
      });
    }
  });
},{threshold:.2}).observe(document.querySelector('.axgrid'));
</script>
</body>
</html>
`

export default function ACFScore() {
  const locale = useLocale();
  const t = translations[locale as keyof typeof translations] || translations.en;
  return (
    <iframe
      srcDoc={buildHTML(locale, t)}
      style={{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",border:"none",zIndex:9999}}
      title="ACF Score"
    />
  )
}
