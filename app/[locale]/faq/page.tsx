"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

/* ═══════════════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════════════ */
const C = {
  navy1: "#050c1a",
  navy2: "#071122",
  navy3: "#0d1f3c",
  gold: "#c9a84c",
  gold2: "#e8c96a",
  goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)",
  white: "#ffffff",
  gray: "#6b7fa0",
  gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)",
};

/* ═══════════════════════════════════════════════════════════════
   FAQ DATA — 8 TABS, 56 QUESTIONS
   ═══════════════════════════════════════════════════════════════ */

interface FaqQ { q: string; a: string }
interface FaqTab { label: string; questions: FaqQ[] }

const faqData: Record<string, FaqTab[]> = {
  fr: [
    /* ── TAB 1: Le Framework ACF® ── */
    {
      label: "Le Framework ACF®",
      questions: [
        { q: "Qu'est-ce que l'Agentic Commerce Framework® (ACF) ?", a: "L'ACF est le standard mondial de gouvernance pour les organisations déployant des agents IA autonomes dans des environnements commerciaux. Il définit 4 principes fondateurs, 4 couches opérationnelles, 8 modules d'implémentation et 18 KPIs de souveraineté pour garantir que les humains conservent le contrôle stratégique sur les systèmes agentiques." },
        { q: "Qui a créé le standard ACF® ?", a: "L'ACF a été créé par Vincent DORANGE, expert en gouvernance IA et fondateur d'AI CONSULTING. Le framework est le fruit de plusieurs années de recherche sur la gouvernance des systèmes autonomes dans les environnements commerciaux. ACF® est une marque déposée." },
        { q: "Quels sont les 4 principes fondateurs de l'ACF ?", a: "Les quatre principes immuables sont : (1) Souveraineté Décisionnelle — les décisions critiques ne sont jamais déléguées aux agents, (2) Gouvernance by Design — la gouvernance est définie avant le déploiement, (3) Contrôle Humain Ultime — chaque système préserve la capacité d'intervention humaine, (4) Responsabilité Traçable — chaque action autonome est auditable et attribuable." },
        { q: "Qu'est-ce que les 4 couches opérationnelles ACF ?", a: "Les 4 couches définissent l'architecture de gouvernance : Couche 1 (Stratégique) — définition des mandats et périmètres décisionnels, Couche 2 (Tactique) — règles de gating et seuils d'escalade, Couche 3 (Opérationnelle) — monitoring temps réel des 18 KPIs, Couche 4 (Audit) — traçabilité complète et logs infalsifiables." },
        { q: "Quels sont les 8 modules d'implémentation ?", a: "Les 8 modules couvrent : M01 Cartographie des agents, M02 Classification des risques, M03 Définition des mandats, M04 Protocoles de gating, M05 Architecture de monitoring, M06 Protocole d'arrêt d'urgence, M07 Cadre d'audit et conformité, M08 Formation et simulation. Déploiement progressif sur 6 à 18 mois." },
        { q: "Qu'est-ce que les 18 KPIs de souveraineté ?", a: "Les 18 KPIs mesurent la souveraineté décisionnelle à travers 6 axes de gouvernance (3 KPIs par axe) : autonomie décisionnelle, transparence algorithmique, résilience opérationnelle, conformité réglementaire, éthique et performance. Chaque KPI a des seuils définis déclenchant des alertes et escalades automatiques." },
        { q: "Qu'est-ce que le rôle DDA (Delegated Decision Agent) ?", a: "Le DDA Officer est un rôle de gouvernance défini par l'ACF. Il agit comme le gardien légal de vos agents autonomes — responsable de la définition des mandats, du monitoring de la conformité, et de la garantie qu'aucun agent ne dépasse son périmètre décisionnel autorisé. C'est un rôle clé pour la conformité EU AI Act." },
        { q: "L'ACF est-il un standard ouvert ou propriétaire ?", a: "L'ACF® est un standard propriétaire créé et maintenu par Vincent DORANGE. La méthodologie, les outils et la marque sont juridiquement protégés. Le livre blanc est librement accessible pour favoriser l'adoption, mais l'implémentation certifiée requiert l'utilisation des outils et processus officiels ACF." },
      ],
    },
    /* ── TAB 2: Commerce Agentique ── */
    {
      label: "Commerce Agentique",
      questions: [
        { q: "Qu'est-ce que le commerce agentique (agentic commerce) ?", a: "Le commerce agentique désigne l'utilisation d'agents IA autonomes capables de prendre des décisions commerciales de manière indépendante : négociation de prix, gestion des stocks, personnalisation dynamique, exécution de transactions. Contrairement à l'automatisation classique, ces agents apprennent et s'adaptent en temps réel." },
        { q: "Quelle est la différence entre un agent IA et un chatbot ?", a: "Un chatbot suit des scripts prédéfinis et répond à des questions. Un agent IA autonome prend des décisions, exécute des actions, apprend de ses résultats et peut opérer sans intervention humaine. Le chatbot est réactif, l'agent est proactif. C'est cette autonomie décisionnelle qui nécessite un cadre de gouvernance comme l'ACF." },
        { q: "Quels sont les risques du commerce agentique sans gouvernance ?", a: "Sans gouvernance structurée, les risques incluent : décisions biaisées ou discriminatoires, perte de contrôle sur les politiques commerciales, non-conformité réglementaire (EU AI Act, RGPD), manipulation des prix, atteinte à la réputation, responsabilité juridique floue, et impossibilité d'audit. L'ACF adresse chacun de ces risques via ses 8 modules." },
        { q: "Quels secteurs sont concernés par le commerce agentique ?", a: "Tous les secteurs déployant des agents IA dans des contextes commerciaux : e-commerce et retail, services financiers et bancaires, assurance, logistique et supply chain, marketing et publicité, immobilier, tourisme, santé, et services B2B. Le commerce agentique transforme chaque secteur où des décisions commerciales peuvent être automatisées." },
        { q: "Qu'est-ce qu'un agent IA autonome ?", a: "Un agent IA autonome est un système d'intelligence artificielle capable de percevoir son environnement, de prendre des décisions et d'exécuter des actions de manière indépendante pour atteindre des objectifs définis. Il se distingue par sa capacité d'apprentissage continu, son autonomie décisionnelle et sa capacité à opérer dans des environnements dynamiques." },
        { q: "Comment les agents IA transforment-ils le commerce ?", a: "Les agents IA transforment le commerce en automatisant les décisions complexes : tarification dynamique en temps réel, négociation autonome avec les fournisseurs, personnalisation hyper-contextuelle, gestion prédictive des stocks, détection de fraude, et optimisation de la chaîne de valeur. McKinsey estime que le commerce agentique pourrait générer 1,2 trillion de dollars de valeur d'ici 2030." },
        { q: "Quelle différence entre automatisation classique et commerce agentique ?", a: "L'automatisation classique suit des règles fixes (si X alors Y). Le commerce agentique utilise des agents IA qui apprennent, s'adaptent et prennent des décisions dans des situations imprévues. L'ACF définit 4 niveaux de maturité : Niveau 0 (automatisation classique), Niveau 1 (agents assistés), Niveau 2 (agents gouvernés), Niveau 3 (autonomie supervisée)." },
        { q: "Le commerce agentique est-il réglementé ?", a: "Oui, principalement par l'EU AI Act (Règlement européen sur l'intelligence artificielle) qui entre en vigueur progressivement entre 2024 et 2027. Les agents IA commerciaux peuvent être classés à haut risque selon leur domaine d'application. Le RGPD s'applique également au traitement des données personnelles. L'ACF est conçu pour assurer la conformité." },
      ],
    },
    /* ── TAB 3: EU AI Act & Conformité ── */
    {
      label: "EU AI Act & Conformité",
      questions: [
        { q: "Qu'est-ce que l'EU AI Act ?", a: "L'EU AI Act (Règlement européen sur l'intelligence artificielle) est le premier cadre juridique complet au monde pour l'intelligence artificielle. Adopté en 2024, il établit des règles harmonisées pour le développement, la mise sur le marché et l'utilisation des systèmes d'IA dans l'Union européenne, avec une approche basée sur les niveaux de risque." },
        { q: "Quand l'EU AI Act entre-t-il en vigueur ?", a: "L'EU AI Act entre en vigueur de manière progressive : février 2025 pour l'interdiction des pratiques inacceptables, août 2025 pour les obligations GPAI, août 2026 pour les systèmes à haut risque (Annexe III), et août 2027 pour les systèmes intégrés dans des produits réglementés. Les sanctions peuvent atteindre 35 millions d'euros ou 7% du CA mondial." },
        { q: "Comment l'ACF aide-t-il à la conformité EU AI Act ?", a: "L'ACF couvre directement les principales exigences de l'EU AI Act : système de gestion des risques (Art. 9), gouvernance des données (Art. 10), documentation technique (Art. 11), transparence (Art. 13), contrôle humain (Art. 14), et cybersécurité (Art. 15). Le niveau 2 de gouvernance ACF couvre les obligations clés pour les agents autonomes commerciaux." },
        { q: "Qu'est-ce qu'un système IA à haut risque ?", a: "Selon l'EU AI Act, un système IA est classé à haut risque s'il est utilisé dans des domaines sensibles listés à l'Annexe III : biométrie, infrastructure critique, éducation, emploi, services essentiels (crédit, assurance), forces de l'ordre, immigration, justice. Les systèmes intégrés dans des produits réglementés sont également concernés." },
        { q: "Quelles sont les obligations pour les fournisseurs d'IA ?", a: "Les fournisseurs de systèmes IA à haut risque doivent : mettre en place un système de gestion des risques, assurer la qualité des données d'entraînement, maintenir une documentation technique complète, garantir la transparence et la traçabilité, permettre le contrôle humain, assurer la robustesse et la cybersécurité, et effectuer une évaluation de conformité avant la mise sur le marché." },
        { q: "Quelles sont les obligations pour les déployeurs ?", a: "Les déployeurs de systèmes IA à haut risque doivent : utiliser le système conformément aux instructions du fournisseur, assurer le contrôle humain, monitorer le fonctionnement, conserver les logs générés automatiquement, réaliser une analyse d'impact sur les droits fondamentaux (pour certains secteurs), et informer les personnes concernées qu'elles interagissent avec un système IA." },
        { q: "Qu'est-ce que les modèles GPAI (General Purpose AI) ?", a: "Les modèles GPAI sont des modèles d'IA à usage général (comme GPT-4, Claude, Gemini, LLaMA) entraînés sur de grandes quantités de données et capables d'accomplir une variété de tâches. L'EU AI Act impose des obligations spécifiques : documentation technique, politique de respect du droit d'auteur, et pour les modèles à risque systémique, des évaluations et un monitoring continu." },
        { q: "Quelles sanctions prévoit l'EU AI Act ?", a: "Les sanctions sont proportionnelles : jusqu'à 35 millions d'euros ou 7% du CA mondial pour les pratiques interdites, jusqu'à 15 millions ou 3% pour la non-conformité des systèmes à haut risque, jusqu'à 7,5 millions ou 1,5% pour les informations inexactes. Les PME et startups bénéficient de sanctions réduites." },
      ],
    },
    /* ── TAB 4: ACF Score ── */
    {
      label: "ACF Score",
      questions: [
        { q: "Qu'est-ce que le ACF Score® ?", a: "Le ACF Score est un outil de diagnostic propriétaire qui mesure la souveraineté décisionnelle de votre organisation à travers 6 axes de gouvernance. Il fournit un score composite de 0 à 100, une visualisation radar 6 axes, et un plan d'action personnalisé pour renforcer la gouvernance de vos systèmes agentiques." },
        { q: "Quels sont les 6 axes du ACF Score ?", a: "Les 6 axes sont : (1) Autonomie Décisionnelle — contrôle sur les décisions critiques, (2) Transparence Algorithmique — explicabilité des décisions IA, (3) Résilience Opérationnelle — capacité de reprise et continuité, (4) Conformité Réglementaire — alignement EU AI Act et RGPD, (5) Éthique & Responsabilité — équité et non-discrimination, (6) Performance & Optimisation — efficacité de la gouvernance." },
        { q: "Comment est calculé le ACF Score ?", a: "Le score est calculé à partir de vos réponses au diagnostic, évaluées sur chacun des 6 axes avec 3 KPIs par axe (18 KPIs au total). Chaque KPI est pondéré selon son impact sur la souveraineté décisionnelle. Le score final est une moyenne pondérée de 0 à 100 avec des seuils : 0-25 (Critique), 26-50 (En développement), 51-75 (Maîtrisé), 76-100 (Excellence)." },
        { q: "Combien de temps dure le diagnostic ACF Score ?", a: "Le diagnostic complet prend moins de 10 minutes. Il se compose de questions structurées couvrant les 6 axes de gouvernance. Les résultats sont disponibles immédiatement avec un plan d'action détaillé et des recommandations prioritaires." },
        { q: "Le diagnostic ACF Score est-il gratuit ?", a: "Le diagnostic de base est accessible gratuitement sur acf-score.com. Il fournit votre score global et une visualisation radar de vos 6 axes. Pour un rapport détaillé avec recommandations personnalisées, benchmarks sectoriels et plan d'action complet, des options premium sont disponibles." },
        { q: "À qui s'adresse le ACF Score ?", a: "Le ACF Score s'adresse à toute organisation utilisant ou prévoyant d'utiliser des agents IA : directeurs de l'innovation, responsables conformité, CTO, CEO de startups IA, et consultants en transformation digitale. Que vous déployiez votre premier agent ou que vous gériez des centaines de systèmes autonomes, le score vous situe." },
        { q: "Quelle est la différence entre ACF Score et ACF Control ?", a: "Le ACF Score est un outil de diagnostic ponctuel qui évalue votre maturité de gouvernance à un instant T. ACF Control est une plateforme de monitoring continu qui surveille vos 18 KPIs en temps réel, avec du gating adaptatif et des alertes automatiques. Le Score diagnostique, Control gouverne au quotidien." },
      ],
    },
    /* ── TAB 5: ACF Control ── */
    {
      label: "ACF Control",
      questions: [
        { q: "Qu'est-ce que ACF Control ?", a: "ACF Control est la plateforme de gouvernance temps réel qui monitore vos 18 KPIs de souveraineté avec du gating adaptatif et une escalade automatisée. C'est le centre de commande de votre gouvernance agentique — tableau de bord en temps réel, alertes intelligentes, et logs d'audit infalsifiables." },
        { q: "Comment fonctionne le gating adaptatif ?", a: "Le gating adaptatif définit des seuils dynamiques pour chaque KPI. Quand un agent IA approche ou dépasse un seuil, le système peut : alerter l'opérateur humain, restreindre le périmètre décisionnel de l'agent, suspendre certaines actions, ou escalader vers un décideur humain. Les seuils s'adaptent au contexte et au niveau de risque." },
        { q: "Qu'est-ce que le protocole d'arrêt d'urgence ACF ?", a: "Le protocole d'arrêt d'urgence est un mécanisme d'interruption à 3 niveaux : Niveau 1 (Pause opérationnelle, < 30s) — suspension des opérations non critiques, Niveau 2 (Arrêt décisionnel, < 5s) — suspension totale des décisions agents, Niveau 3 (Arrêt système total, < 1s) — coupure complète avec basculement vers les processus manuels." },
        { q: "Quels KPIs sont monitorés par ACF Control ?", a: "18 KPIs répartis sur 6 axes : Autonomie Décisionnelle (taux d'override, périmètre de délégation, respect des mandats), Transparence (explicabilité, traçabilité, documentation), Résilience (temps de reprise, disponibilité, résistance), Conformité, Éthique et Performance — chacun avec 3 indicateurs spécifiques." },
        { q: "ACF Control s'intègre-t-il aux systèmes existants ?", a: "Oui, ACF Control est conçu pour s'intégrer via API aux principaux environnements d'agents IA : LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, et les solutions IA propriétaires. L'architecture est agnostique et s'adapte à votre stack technologique existant." },
        { q: "Les logs ACF Control sont-ils infalsifiables ?", a: "Oui, ACF Control utilise des techniques de hachage cryptographique pour garantir l'intégrité des logs d'audit. Chaque action d'agent, décision et intervention humaine est horodatée et chaînée de manière infalsifiable. C'est essentiel pour la conformité EU AI Act (Article 12 sur la tenue de registres)." },
        { q: "Peut-on personnaliser les seuils d'alerte ?", a: "Absolument. Chaque organisation peut configurer ses propres seuils pour chacun des 18 KPIs en fonction de son secteur, de son appétence au risque et de ses exigences réglementaires. Des profils sectoriels préconfigurés sont disponibles (finance, santé, e-commerce) pour accélérer le déploiement." },
      ],
    },
    /* ── TAB 6: ACF AI Act Checker ── */
    {
      label: "ACF AI Act Checker",
      questions: [
        { q: "Qu'est-ce que l'ACF AI Act Checker ?", a: "L'ACF AI Act Checker est un outil de diagnostic gratuit qui évalue votre conformité au Règlement européen sur l'intelligence artificielle (EU AI Act). En quelques minutes, il identifie votre rôle (fournisseur, déployeur, distributeur...), classe votre système IA par niveau de risque, et liste vos obligations spécifiques avec les articles de loi correspondants." },
        { q: "Comment fonctionne le diagnostic du Checker ?", a: "Le diagnostic suit un arbre de décision en 4 phases : (1) Identification de votre rôle dans la chaîne de valeur IA, (2) Classification du niveau de risque de votre système, (3) Évaluation des règles spécifiques applicables (GPAI, haut risque, biométrie...), (4) Présentation de vos obligations avec les articles de loi et actions recommandées." },
        { q: "Le Checker remplace-t-il un avis juridique ?", a: "Non. L'ACF AI Act Checker fournit une indication préliminaire basée sur vos réponses. Il ne constitue pas un avis juridique. Pour un accompagnement complet, combinez les résultats du Checker avec le framework ACF et un conseil juridique professionnel." },
        { q: "Mes données sont-elles conservées par le Checker ?", a: "Non. Vos données sont utilisées uniquement pour vous transmettre vos résultats par email si vous le souhaitez. Elles ne sont ni stockées, ni partagées avec des tiers. Aucun cookie de suivi n'est utilisé. Le diagnostic s'exécute côté client — vos réponses ne quittent pas votre navigateur sauf si vous demandez l'envoi par email." },
        { q: "Puis-je recevoir mes résultats par email ?", a: "Oui. À la fin du diagnostic, vous pouvez saisir votre adresse email pour recevoir un récapitulatif complet : nom du système, rôle identifié, niveau de risque, et liste détaillée de vos obligations. Vous pouvez également télécharger vos résultats en PDF." },
        { q: "Le Checker couvre-t-il tous les types de systèmes IA ?", a: "Le Checker couvre les principaux cas d'usage de l'EU AI Act : fournisseurs, déployeurs, distributeurs, importateurs, fabricants de produits et représentants autorisés. Il évalue les systèmes IA classiques, les systèmes à haut risque et les modèles GPAI. Des mises à jour régulières suivent l'évolution de la réglementation." },
      ],
    },
    /* ── TAB 7: Certification ACF ── */
    {
      label: "Certification ACF",
      questions: [
        { q: "Qu'est-ce que la certification ACF ?", a: "La certification ACF est une attestation indépendante de conformité au standard de gouvernance ACF. Elle démontre que votre organisation a mis en place les processus, outils et pratiques requis pour gouverner ses agents IA autonomes de manière responsable. C'est un signal de confiance pour vos clients, partenaires et régulateurs." },
        { q: "Quels sont les 3 niveaux de certification ?", a: "Niveau 1 (Fondation) — gouvernance de base, premiers modules ACF, processus documentés. Niveau 2 (Avancé) — monitoring actif des KPIs, gating adaptatif opérationnel, protocole d'arrêt d'urgence testé. Niveau 3 (Excellence) — gouvernance complète, audit continu, conformité EU AI Act démontrée, programme de simulation opérationnel." },
        { q: "Comment obtenir la certification ACF ?", a: "Le processus comprend : (1) Auto-évaluation via le ACF Score, (2) Candidature avec documentation de vos pratiques, (3) Audit indépendant par un évaluateur accrédité ACF, (4) Remédiation si nécessaire, (5) Délivrance du badge publiquement vérifiable. Le processus prend 3 à 6 mois." },
        { q: "Combien coûte la certification ACF ?", a: "Le coût varie selon le niveau de certification, la taille de l'organisation et le nombre de systèmes IA à auditer. Contactez-nous pour un devis personnalisé. Des tarifs adaptés sont disponibles pour les startups et PME." },
        { q: "Quelle est la durée de validité de la certification ?", a: "La certification ACF est valide 12 mois. Le renouvellement annuel comprend un audit de suivi et une vérification du maintien des pratiques. Un monitoring continu est effectué entre les audits." },
        { q: "La certification est-elle publiquement vérifiable ?", a: "Oui. Chaque organisation certifiée reçoit un badge numérique avec un identifiant unique et une URL de vérification. N'importe qui — client, partenaire, régulateur — peut vérifier la validité et le niveau de certification en temps réel sur le portail ACF." },
      ],
    },
    /* ── TAB 8: Implémentation & Maturité ── */
    {
      label: "Implémentation & Maturité",
      questions: [
        { q: "Quels sont les 4 niveaux de maturité ACF ?", a: "Niveau 0 (Automatisation Classique) — règles fixes, pas de ML, pas de gouvernance agentique nécessaire. Niveau 1 (Agents Assistés) — les agents recommandent, les humains décident. Niveau 2 (Agents Gouvernés) — les agents décident dans un cadre strict, le niveau cible. Niveau 3 (Autonomie Supervisée) — les agents décident et apprennent, gouvernance maximale requise." },
        { q: "Combien de temps pour implémenter l'ACF ?", a: "L'implémentation complète des 8 modules prend 6 à 18 mois, selon la maturité existante et la complexité de vos systèmes. Le déploiement est progressif : les modules fondamentaux (M01-M03) peuvent être implémentés en 2-3 mois, fournissant une base de gouvernance immédiate." },
        { q: "L'ACF est-il adapté aux startups et PME ?", a: "Absolument. L'ACF est conçu pour s'adapter à toutes les tailles. Les startups déployant leur premier agent IA bénéficient d'un cadre structurant dès le départ (Gouvernance by Design). Les 8 modules se déploient progressivement. Des tarifs adaptés sont disponibles." },
        { q: "Faut-il implémenter les 8 modules d'un coup ?", a: "Non. L'implémentation est progressive. Commencez par les 3 modules fondamentaux : M01 (Cartographie), M02 (Classification des risques), M03 (Mandats). Les modules suivants s'ajoutent à mesure que votre maturité agentique évolue. Chaque module apporte une valeur autonome." },
        { q: "Comment démarrer avec l'ACF ?", a: "Trois étapes simples : (1) Réalisez votre diagnostic ACF Score gratuit sur acf-score.com, (2) Téléchargez le livre blanc ACF pour comprendre le framework, (3) Contactez notre équipe pour un accompagnement personnalisé. Vous pouvez aussi utiliser l'ACF AI Act Checker pour évaluer votre conformité EU AI Act." },
        { q: "L'ACF est-il compatible avec d'autres frameworks IA ?", a: "Oui. L'ACF complète les frameworks existants : NIST AI RMF, ISO/IEC 42001, IEEE 7000, OECD AI Principles. L'ACF se distingue par sa spécialisation dans le commerce agentique et les agents IA autonomes — un domaine que les frameworks génériques ne couvrent pas. L'ACF fournit la couche de gouvernance spécifique aux agents commerciaux." },
      ],
    },
  ],
  en: [
    /* ── TAB 1: The ACF® Framework ── */
    {
      label: "The ACF® Framework",
      questions: [
        { q: "What is the Agentic Commerce Framework® (ACF)?", a: "The ACF is the global governance standard for organizations deploying autonomous AI agents in commercial environments. It defines 4 founding principles, 4 operational layers, 8 implementation modules, and 18 sovereignty KPIs to ensure humans retain strategic control over agentic systems." },
        { q: "Who created the ACF® standard?", a: "The ACF was created by Vincent DORANGE, an AI governance expert and founder of AI CONSULTING. The framework is the result of several years of research on autonomous system governance in commercial environments. ACF® is a registered trademark." },
        { q: "What are the 4 founding principles of ACF?", a: "The four immutable principles are: (1) Decision Sovereignty — critical decisions are never delegated to agents, (2) Governance by Design — governance is defined before deployment, (3) Ultimate Human Control — every system preserves human intervention capability, (4) Traceable Accountability — every autonomous action is auditable and attributable." },
        { q: "What are the 4 ACF operational layers?", a: "The 4 layers define the governance architecture: Layer 1 (Strategic) — mandate and decision perimeter definition, Layer 2 (Tactical) — gating rules and escalation thresholds, Layer 3 (Operational) — real-time monitoring of 18 KPIs, Layer 4 (Audit) — complete traceability and tamper-proof logs." },
        { q: "What are the 8 implementation modules?", a: "The 8 modules cover: M01 Agent Mapping, M02 Risk Classification, M03 Mandate Definition, M04 Gating Protocols, M05 Monitoring Architecture, M06 Emergency Stop Protocol, M07 Audit & Compliance Framework, M08 Training & Simulation. Progressive deployment over 6–18 months." },
        { q: "What are the 18 sovereignty KPIs?", a: "The 18 KPIs measure decisional sovereignty across 6 governance axes (3 KPIs per axis): decisional autonomy, algorithmic transparency, operational resilience, regulatory compliance, ethics, and performance. Each KPI has defined thresholds triggering automatic alerts and escalations." },
        { q: "What is the DDA (Delegated Decision Agent) role?", a: "The DDA Officer is a governance role defined by ACF. They serve as the legal guardian of your autonomous agents — responsible for defining mandates, monitoring compliance, and ensuring no agent exceeds its authorized decision perimeter. It's a key role for EU AI Act compliance." },
        { q: "Is ACF an open or proprietary standard?", a: "ACF® is a proprietary standard created and maintained by Vincent DORANGE. The methodology, tools, and brand are legally protected. The whitepaper is freely accessible to encourage adoption, but certified implementation requires official ACF tools and processes." },
      ],
    },
    /* ── TAB 2: Agentic Commerce ── */
    {
      label: "Agentic Commerce",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services. Agentic commerce transforms every sector where commercial decisions can be automated." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance with these regulations." },
      ],
    },
    /* ── TAB 3: EU AI Act & Compliance ── */
    {
      label: "EU AI Act & Compliance",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach \u20ac35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15). ACF Level 2 governance covers key obligations for commercial autonomous agents." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice. Systems in regulated products are also covered." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to \u20ac35M or 7% of global turnover for prohibited practices, up to \u20ac15M or 3% for high-risk non-compliance, up to \u20ac7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* ── TAB 4: ACF Score ── */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score\u00ae?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan to strengthen governance over your agentic systems." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants. Whether deploying your first agent or managing hundreds, the score positions you." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* ── TAB 5: ACF Control ── */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human. Thresholds adapt to context and risk level." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "18 KPIs across 6 axes: Decisional Autonomy (override rate, delegation perimeter, mandate compliance), Transparency (explainability, traceability, documentation), Resilience (recovery time, availability, resistance), plus Compliance, Ethics, and Performance axes." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* ── TAB 6: ACF AI Act Checker ── */
    {
      label: "ACF AI Act Checker",
      questions: [
        { q: "What is the ACF AI Act Checker?", a: "The ACF AI Act Checker is a free diagnostic tool assessing your compliance with the EU AI Act. In minutes, it identifies your role (provider, deployer, distributor...), classifies your AI system by risk level, and lists your specific obligations with corresponding law articles." },
        { q: "How does the Checker diagnostic work?", a: "The diagnostic follows a 4-phase decision tree: (1) Identify your role in the AI value chain, (2) Classify system risk level, (3) Evaluate applicable rules (GPAI, high-risk, biometrics...), (4) Present obligations with law articles and recommended actions." },
        { q: "Does the Checker replace legal advice?", a: "No. The ACF AI Act Checker provides a preliminary indication. It does not constitute legal advice. For complete support, combine Checker results with the ACF framework and professional legal counsel." },
        { q: "Is my data stored by the Checker?", a: "No. Data is only used to send results by email if requested. It is neither stored nor shared. No tracking cookies. The diagnostic runs client-side — answers don't leave your browser unless you request email delivery." },
        { q: "Can I receive results by email?", a: "Yes. After the diagnostic, enter your email to receive a complete summary: system name, identified role, risk level, and detailed obligation list. You can also download results as PDF." },
        { q: "Does the Checker cover all AI system types?", a: "The Checker covers main EU AI Act use cases: providers, deployers, distributors, importers, product manufacturers, and authorized representatives. It evaluates classical AI, high-risk systems, and GPAI models. Regular updates follow regulatory evolution." },
      ],
    },
    /* ── TAB 7: ACF Certification ── */
    {
      label: "ACF Certification",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification. Continuous monitoring between audits ensures standards are maintained." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* ── TAB 8: Implementation & Maturity ── */
    {
      label: "Implementation & Maturity",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively at the pace of growth. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Three steps: (1) Take the free ACF Score diagnostic on acf-score.com, (2) Download the ACF whitepaper, (3) Contact our team for personalized guidance. Also use the ACF AI Act Checker for EU AI Act compliance assessment." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   UI STRINGS
   ═══════════════════════════════════════════════════════════════ */
const uiStrings: Record<string, Record<string, string>> = {
  fr: {
    heroTitle: "FAQ",
    heroSub: "Tout ce que vous devez savoir sur l'Agentic Commerce Framework\u00ae, la gouvernance IA, l'EU AI Act et nos outils.",
    ctaTitle: "Vous n'avez pas trouv\u00e9 votre r\u00e9ponse ?",
    ctaBtn: "Contactez-nous",
    ctaChecker: "Tester l'ACF AI Act Checker",
    ctaScore: "Faire mon diagnostic ACF Score",
  },
  en: {
    heroTitle: "FAQ",
    heroSub: "Everything you need to know about the Agentic Commerce Framework\u00ae, AI governance, the EU AI Act, and our tools.",
    ctaTitle: "Didn't find your answer?",
    ctaBtn: "Contact us",
    ctaChecker: "Try the ACF AI Act Checker",
    ctaScore: "Take the ACF Score diagnostic",
  },
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function FaqPage() {
  const locale = useLocale();
  const lang = locale === "fr" ? "fr" : "en";
  const t = uiStrings[lang];
  const tabs = faqData[lang];

  const [activeTab, setActiveTab] = useState(0);
  const [openQ, setOpenQ] = useState<string | null>(null);

  const toggleQ = (id: string) => setOpenQ(openQ === id ? null : id);

  // FAQ JSON-LD for SEO
  const allQuestions = tabs.flatMap((tab: FaqTab) => tab.questions);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q: FaqQ) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO ── */}
      <section
        style={{
          background: C.navy1,
          padding: "120px 0 60px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              border: `1px solid ${C.goldBorder}`,
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              color: C.gold,
              letterSpacing: "0.1em",
              marginBottom: 20,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            // FAQ
          </div>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: C.white,
              margin: "0 0 16px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {t.heroTitle}
          </h1>
          <p
            style={{
              fontSize: 18,
              color: C.gray2,
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── TABS ── */}
      <section style={{ background: C.navy1, padding: "0 0 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 40,
              justifyContent: "center",
            }}
          >
            {tabs.map((tab: FaqTab, i: number) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(i);
                  setOpenQ(null);
                }}
                style={{
                  background:
                    activeTab === i ? C.gold : "transparent",
                  color: activeTab === i ? C.navy1 : C.gray2,
                  border: `1px solid ${activeTab === i ? C.gold : C.goldBorder}`,
                  padding: "10px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all .2s",
                  fontFamily: "'Inter', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {tab.label}
                <span
                  style={{
                    background:
                      activeTab === i
                        ? "rgba(5,12,26,.3)"
                        : C.goldDim,
                    color: activeTab === i ? C.navy1 : C.gold,
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: 10,
                  }}
                >
                  {tab.questions.length}
                </span>
              </button>
            ))}
          </div>

          {/* Questions accordion */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {tabs[activeTab].questions.map((item: FaqQ, qi: number) => {
              const id = `${activeTab}-${qi}`;
              const isOpen = openQ === id;
              return (
                <div
                  key={id}
                  style={{
                    background: C.navy2,
                    border: `1px solid ${isOpen ? C.goldBorder : C.bd1}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    transition: "border-color .3s",
                  }}
                >
                  <button
                    onClick={() => toggleQ(id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "18px 24px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: isOpen ? C.gold : C.white,
                        lineHeight: 1.5,
                        paddingRight: 16,
                        transition: "color .2s",
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        minWidth: 28,
                        borderRadius: "50%",
                        border: `1px solid ${isOpen ? C.gold : C.goldBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        color: C.gold,
                        transition: "transform .3s",
                        transform: isOpen ? "rotate(45deg)" : "none",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 500 : 0,
                      overflow: "hidden",
                      transition: "max-height .4s ease",
                    }}
                  >
                    <p
                      style={{
                        padding: "0 24px 20px",
                        margin: 0,
                        fontSize: 16,
                        color: C.gray2,
                        lineHeight: 1.8,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CTA SECTION ── */}
          <div
            style={{
              marginTop: 60,
              padding: 40,
              background: C.navy2,
              border: `1px solid ${C.goldBorder}`,
              borderRadius: 16,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: C.white,
                margin: "0 0 24px",
              }}
            >
              {t.ctaTitle}
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <a
                href={`/${locale}/contact`}
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: C.gold,
                  color: C.navy1,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  borderRadius: 8,
                }}
              >
                {t.ctaBtn}
              </a>
              <a
                href={`/${locale}/compliance-checker`}
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "transparent",
                  border: `1px solid ${C.goldBorder}`,
                  color: C.gold,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  borderRadius: 8,
                }}
              >
                {t.ctaChecker}
              </a>
              <a
                href="https://www.acf-score.com"
                target="_blank"
                rel="noopener"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "transparent",
                  border: `1px solid ${C.bd1}`,
                  color: C.gray2,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  borderRadius: 8,
                }}
              >
                {t.ctaScore}
              </a>
            </div>
          </div>
        </div>
      </section>

      <AIAgent />
      <Footer />
    </>
  );
}
