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
        { q: "Quels KPIs sont monitorés par ACF Control ?", a: "ACF Control monitore 18 KPIs propriétaires répartis sur les 6 axes de gouvernance ACF. Chaque axe dispose de 3 indicateurs spécifiques mesurant en continu la souveraineté décisionnelle de votre organisation. Les seuils et pondérations sont définis lors de la phase d'implémentation." },
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
        { q: "Comment démarrer avec l'ACF ?", a: "Quatre étapes simples : (1) Vérifiez votre conformité EU AI Act avec l'ACF AI Act Checker gratuit, (2) Évaluez votre gouvernance avec le diagnostic ACF Score sur acf-score.com, (3) Téléchargez le livre blanc ACF pour comprendre le framework complet, (4) Contactez notre équipe pour un accompagnement personnalisé." },
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
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty. Thresholds and weightings are defined during implementation." },
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
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
  es: [
    /* -- TAB 1 -- */
    {
      label: "El Framework ACF®",
      questions: [
        { q: "¿Qué es el Agentic Commerce Framework® (ACF)?", a: "El ACF es el estándar global de gobernanza para organizaciones que despliegan agentes de IA autónomos en entornos comerciales. Define 4 principios fundadores, 4 capas operativas, 8 módulos de implementación y 18 KPIs de soberanía para garantizar que los humanos mantengan el control estratégico sobre los sistemas agénticos." },
        { q: "¿Quién creó el estándar ACF®?", a: "El ACF fue creado por Vincent DORANGE, experto en gobernanza de IA y fundador de AI CONSULTING. El framework es el resultado de varios años de investigación sobre gobernanza de sistemas autónomos en entornos comerciales. ACF® es una marca registrada." },
        { q: "¿Cuáles son los 4 principios fundadores del ACF?", a: "Los cuatro principios inmutables son: (1) Soberanía Decisional — las decisiones críticas nunca se delegan a los agentes, (2) Gobernanza por Diseño — la gobernanza se define antes del despliegue, (3) Control Humano Último — cada sistema preserva la capacidad de intervención humana, (4) Responsabilidad Trazable — cada acción autónoma es auditable y atribuible." },
        { q: "¿Qué son las 4 capas operativas del ACF?", a: "Las 4 capas definen la arquitectura de gobernanza: Capa 1 (Estratégica) — definición de mandatos y perímetros decisionales, Capa 2 (Táctica) — reglas de gating y umbrales de escalamiento, Capa 3 (Operativa) — monitoreo en tiempo real de 18 KPIs, Capa 4 (Auditoría) — trazabilidad completa y logs infalsificables." },
        { q: "¿Cuáles son los 8 módulos de implementación?", a: "Los 8 módulos cubren: M01 Mapeo de agentes, M02 Clasificación de riesgos, M03 Definición de mandatos, M04 Protocolos de gating, M05 Arquitectura de monitoreo, M06 Protocolo de parada de emergencia, M07 Marco de auditoría y cumplimiento, M08 Formación y simulación. Despliegue progresivo de 6 a 18 meses." },
        { q: "¿Qué son los 18 KPIs de soberanía?", a: "Los 18 KPIs miden la soberanía decisional a través de 6 ejes de gobernanza (3 KPIs por eje): autonomía decisional, transparencia algorítmica, resiliencia operativa, cumplimiento regulatorio, ética y rendimiento. Cada KPI tiene umbrales definidos que activan alertas y escalamientos automáticos." },
        { q: "¿Qué es el rol DDA (Delegated Decision Agent)?", a: "El DDA Officer es un rol de gobernanza definido por el ACF. Actúa como el guardián legal de sus agentes autónomos — responsable de definir mandatos, monitorear el cumplimiento y garantizar que ningún agente exceda su perímetro decisional autorizado. Es un rol clave para el cumplimiento del EU AI Act." },
        { q: "¿El ACF es un estándar abierto o propietario?", a: "ACF® es un estándar propietario creado y mantenido por Vincent DORANGE. La metodología, herramientas y marca están legalmente protegidas. El libro blanco es libremente accesible para fomentar la adopción, pero la implementación certificada requiere herramientas y procesos oficiales ACF." },
      ],
    },
    /* -- TAB 2 -- */
    {
      label: "Comercio Agéntico",
      questions: [
        { q: "¿Qué es el comercio agéntico?", a: "El comercio agéntico se refiere al uso de agentes de IA autónomos capaces de tomar decisiones comerciales de forma independiente: negociación de precios, gestión de inventarios, personalización dinámica, ejecución de transacciones. A diferencia de la automatización clásica, estos agentes aprenden y se adaptan en tiempo real." },
        { q: "¿Cuál es la diferencia entre un agente de IA y un chatbot?", a: "Un chatbot sigue scripts predefinidos y responde preguntas. Un agente de IA autónomo toma decisiones, ejecuta acciones, aprende de los resultados y puede operar sin intervención humana. El chatbot es reactivo, el agente es proactivo. Esta autonomía decisional requiere un marco de gobernanza como el ACF." },
        { q: "¿Cuáles son los riesgos del comercio agéntico sin gobernanza?", a: "Sin gobernanza estructurada, los riesgos incluyen: decisiones sesgadas o discriminatorias, pérdida de control sobre políticas comerciales, incumplimiento regulatorio (EU AI Act, RGPD), manipulación de precios, daño reputacional, responsabilidad legal poco clara e imposibilidad de auditar. El ACF aborda cada uno a través de sus 8 módulos." },
        { q: "¿Qué sectores se ven afectados por el comercio agéntico?", a: "Todos los sectores que despliegan agentes de IA en contextos comerciales: e-commerce y retail, servicios financieros, seguros, logística y cadena de suministro, marketing, inmobiliaria, turismo, salud y servicios B2B." },
        { q: "¿Qué es un agente de IA autónomo?", a: "Un agente de IA autónomo es un sistema de inteligencia artificial capaz de percibir su entorno, tomar decisiones y ejecutar acciones de forma independiente para alcanzar objetivos definidos. Se distingue por su aprendizaje continuo, autonomía decisional y capacidad de operar en entornos dinámicos." },
        { q: "¿Cómo están transformando los agentes de IA el comercio?", a: "Los agentes de IA transforman el comercio automatizando decisiones complejas: precios dinámicos en tiempo real, negociación autónoma con proveedores, personalización hipercontextual, gestión predictiva de inventarios, detección de fraude y optimización de la cadena de valor. McKinsey estima que el comercio agéntico podría generar 1,2 billones de dólares en valor para 2030." },
        { q: "¿Cuál es la diferencia entre automatización clásica y comercio agéntico?", a: "La automatización clásica sigue reglas fijas (si X entonces Y). El comercio agéntico usa agentes de IA que aprenden, se adaptan y toman decisiones en situaciones imprevistas. El ACF define 4 niveles de madurez: Nivel 0 (automatización clásica), Nivel 1 (agentes asistidos), Nivel 2 (agentes gobernados), Nivel 3 (autonomía supervisada)." },
        { q: "¿Está regulado el comercio agéntico?", a: "Sí, principalmente por el EU AI Act que entra en vigor progresivamente entre 2024 y 2027. Los agentes de IA comerciales pueden clasificarse como de alto riesgo según su dominio. El RGPD también se aplica al tratamiento de datos personales. El ACF está diseñado para garantizar el cumplimiento." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act y Cumplimiento",
      questions: [
        { q: "¿Qué es el EU AI Act?", a: "El EU AI Act es el primer marco legal integral del mundo para la inteligencia artificial. Adoptado en 2024, establece reglas armonizadas para el desarrollo, comercialización y uso de sistemas de IA en la UE, con un enfoque basado en niveles de riesgo." },
        { q: "¿Cuándo entra en vigor el EU AI Act?", a: "El EU AI Act entra en vigor progresivamente: febrero 2025 para prácticas prohibidas, agosto 2025 para obligaciones GPAI, agosto 2026 para sistemas de alto riesgo (Anexo III), y agosto 2027 para sistemas en productos regulados. Las sanciones pueden alcanzar 35 millones de euros o el 7% de la facturación global." },
        { q: "¿Cómo ayuda el ACF con el cumplimiento del EU AI Act?", a: "El ACF cubre directamente los principales requisitos del EU AI Act: sistema de gestión de riesgos (Art. 9), gobernanza de datos (Art. 10), documentación técnica (Art. 11), transparencia (Art. 13), supervisión humana (Art. 14) y ciberseguridad (Art. 15)." },
        { q: "¿Qué es un sistema de IA de alto riesgo?", a: "Según el EU AI Act, un sistema de IA es de alto riesgo si se utiliza en áreas sensibles listadas en el Anexo III: biometría, infraestructura crítica, educación, empleo, servicios esenciales (crédito, seguros), fuerzas del orden, inmigración, justicia." },
        { q: "¿Cuáles son las obligaciones para los proveedores de IA?", a: "Los proveedores de IA de alto riesgo deben: implementar gestión de riesgos, garantizar la calidad de los datos de entrenamiento, mantener documentación técnica, garantizar transparencia y trazabilidad, permitir la supervisión humana, asegurar robustez y ciberseguridad, y realizar una evaluación de conformidad antes de la comercialización." },
        { q: "¿Cuáles son las obligaciones para los implementadores?", a: "Los implementadores de IA de alto riesgo deben: usar el sistema según las instrucciones del proveedor, asegurar la supervisión humana, monitorear el funcionamiento, conservar los logs generados automáticamente, realizar una evaluación de impacto en derechos fundamentales (ciertos sectores), e informar a las personas que interactúan con un sistema de IA." },
        { q: "¿Qué son los modelos GPAI?", a: "Los modelos GPAI son modelos de IA de propósito general (como GPT-4, Claude, Gemini, LLaMA) entrenados con grandes datos y capaces de tareas variadas. El EU AI Act impone: documentación técnica, cumplimiento de derechos de autor, y para modelos de riesgo sistémico, evaluaciones adicionales y monitoreo continuo." },
        { q: "¿Qué sanciones prevé el EU AI Act?", a: "Las sanciones son proporcionales: hasta 35M€ o el 7% de la facturación global para prácticas prohibidas, hasta 15M€ o el 3% para incumplimiento de alto riesgo, hasta 7,5M€ o el 1,5% para información inexacta. Las PYMES y startups obtienen sanciones reducidas." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "¿Qué es el ACF Score®?", a: "El ACF Score es una herramienta de diagnóstico propietaria que mide la soberanía decisional de su organización a través de 6 ejes de gobernanza. Proporciona una puntuación compuesta de 0 a 100, una visualización radar de 6 ejes y un plan de acción personalizado." },
        { q: "¿Cuáles son los 6 ejes del ACF Score?", a: "Los 6 ejes son: (1) Autonomía Decisional, (2) Transparencia Algorítmica, (3) Resiliencia Operativa, (4) Cumplimiento Regulatorio, (5) Ética y Responsabilidad, (6) Rendimiento y Optimización. Cada eje contiene 3 KPIs específicos." },
        { q: "¿Cómo se calcula el ACF Score?", a: "La puntuación se calcula a partir de respuestas evaluadas en 6 ejes con 3 KPIs cada uno (18 total). Cada KPI se pondera según su impacto en la soberanía. Puntuación final: 0-25 (Crítico), 26-50 (En desarrollo), 51-75 (Dominado), 76-100 (Excelencia)." },
        { q: "¿Cuánto dura el diagnóstico ACF Score?", a: "El diagnóstico completo toma menos de 10 minutos con preguntas estructuradas en los 6 ejes de gobernanza. Los resultados están disponibles inmediatamente con un plan de acción detallado." },
        { q: "¿El diagnóstico ACF Score es gratuito?", a: "El diagnóstico básico es accesible gratuitamente en acf-score.com. Proporciona su puntuación global y visualización radar. Opciones premium disponibles para informes detallados con recomendaciones personalizadas." },
        { q: "¿A quién va dirigido el ACF Score?", a: "El ACF Score está dirigido a cualquier organización que use o planee usar agentes de IA: directores de innovación, responsables de cumplimiento, CTOs, CEOs de startups de IA y consultores de transformación digital." },
        { q: "¿Cuál es la diferencia entre ACF Score y ACF Control?", a: "ACF Score es un diagnóstico puntual que evalúa la madurez de gobernanza. ACF Control es una plataforma de monitoreo continuo que rastrea 18 KPIs en tiempo real con gating adaptativo y alertas automáticas. Score diagnostica, Control gobierna diariamente." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "¿Qué es ACF Control?", a: "ACF Control es la plataforma de gobernanza en tiempo real que monitorea sus 18 KPIs de soberanía con gating adaptativo y escalamiento automatizado. Es el centro de comando de la gobernanza agéntica — panel en tiempo real, alertas inteligentes y logs de auditoría infalsificables." },
        { q: "¿Cómo funciona el gating adaptativo?", a: "El gating adaptativo define umbrales dinámicos por KPI. Cuando un agente de IA se acerca o excede un umbral, el sistema puede: alertar al operador, restringir el perímetro decisional del agente, suspender acciones o escalar a un humano." },
        { q: "¿Qué es el Protocolo de Parada de Emergencia ACF?", a: "Un mecanismo de interrupción de 3 niveles: Nivel 1 (Pausa operativa, < 30s) — suspensión no crítica, Nivel 2 (Parada decisional, < 5s) — suspensión total de decisiones del agente, Nivel 3 (Parada total, < 1s) — apagado completo con respaldo manual." },
        { q: "¿Qué KPIs monitorea ACF Control?", a: "ACF Control monitorea 18 KPIs propietarios en los 6 ejes de gobernanza ACF. Cada eje tiene 3 indicadores específicos que miden continuamente la soberanía decisional de su organización." },
        { q: "¿Se integra ACF Control con sistemas existentes?", a: "Sí, ACF Control se integra vía API con los principales entornos de agentes de IA: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein y soluciones propietarias. La arquitectura es agnóstica." },
        { q: "¿Son los logs de ACF Control infalsificables?", a: "Sí, mediante hashing criptográfico para garantizar la integridad de los logs de auditoría. Cada acción del agente, decisión e intervención humana está sellada temporalmente y encadenada. Esencial para el cumplimiento del EU AI Act (Artículo 12)." },
        { q: "¿Se pueden personalizar los umbrales de alerta?", a: "Absolutamente. Cada organización configura umbrales por KPI según sector, apetito de riesgo y requisitos regulatorios. Perfiles sectoriales preconfigurados (finanzas, salud, e-commerce) aceleran el despliegue." },
      ],
    },
    /* -- TAB 6 -- */
    {
      label: "ACF AI Act Checker",
      questions: [
        { q: "¿Qué es el ACF AI Act Checker?", a: "El ACF AI Act Checker es una herramienta de diagnóstico gratuita que evalúa su cumplimiento con el EU AI Act. En minutos, identifica su rol, clasifica su sistema de IA por nivel de riesgo y lista sus obligaciones específicas con los artículos de ley correspondientes." },
        { q: "¿Cómo funciona el diagnóstico del Checker?", a: "El diagnóstico sigue un árbol de decisión de 4 fases: (1) Identificar su rol en la cadena de valor de IA, (2) Clasificar el nivel de riesgo, (3) Evaluar las reglas aplicables, (4) Presentar obligaciones con artículos de ley y acciones recomendadas." },
        { q: "¿El Checker reemplaza el asesoramiento legal?", a: "No. El ACF AI Act Checker proporciona una indicación preliminar. No constituye asesoramiento legal. Para un acompañamiento completo, combine los resultados del Checker con el framework ACF y asesoría legal profesional." },
        { q: "¿Se almacenan mis datos en el Checker?", a: "No. Los datos solo se utilizan para enviar resultados por email si se solicita. No se almacenan ni comparten. Sin cookies de seguimiento. El diagnóstico se ejecuta del lado del cliente." },
        { q: "¿Puedo recibir mis resultados por email?", a: "Sí. Después del diagnóstico, ingrese su email para recibir un resumen completo: nombre del sistema, rol identificado, nivel de riesgo y lista detallada de obligaciones. También puede descargar los resultados en PDF." },
        { q: "¿El Checker cubre todos los tipos de sistemas de IA?", a: "El Checker cubre los principales casos de uso del EU AI Act: proveedores, implementadores, distribuidores, importadores, fabricantes de productos y representantes autorizados. Evalúa IA clásica, sistemas de alto riesgo y modelos GPAI." },
      ],
    },
    /* -- TAB 7 -- */
    {
      label: "Certificación ACF",
      questions: [
        { q: "¿Qué es la certificación ACF?", a: "La certificación ACF es una atestación independiente de cumplimiento con el estándar de gobernanza ACF. Demuestra que su organización ha implementado los procesos, herramientas y prácticas requeridos para gobernar agentes de IA autónomos de manera responsable." },
        { q: "¿Cuáles son los 3 niveles de certificación?", a: "Nivel 1 (Fundación) — gobernanza básica, primeros módulos ACF, procesos documentados. Nivel 2 (Avanzado) — monitoreo activo de KPIs, gating adaptativo operacional, parada de emergencia probada. Nivel 3 (Excelencia) — gobernanza completa, auditoría continua, cumplimiento EU AI Act demostrado." },
        { q: "¿Cómo obtener la certificación ACF?", a: "El proceso incluye: (1) Auto-evaluación vía ACF Score, (2) Solicitud con documentación de gobernanza, (3) Auditoría independiente por evaluador acreditado ACF, (4) Remediación si es necesario, (5) Emisión de badge públicamente verificable. Típicamente 3-6 meses." },
        { q: "¿Cuánto cuesta la certificación ACF?", a: "El costo varía según nivel de certificación, tamaño de la organización y número de sistemas de IA a auditar. Contáctenos para un presupuesto personalizado. Tarifas adaptadas disponibles para startups y PYMES." },
        { q: "¿Cuánto dura la validez de la certificación?", a: "La certificación ACF es válida por 12 meses con renovación anual que incluye auditoría de seguimiento y verificación de prácticas de gobernanza." },
        { q: "¿Es la certificación públicamente verificable?", a: "Sí. Cada organización certificada recibe un badge digital con identificador único y URL de verificación. Cualquiera puede verificar la validez y nivel en tiempo real en el portal ACF." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "Implementación y Madurez",
      questions: [
        { q: "¿Cuáles son los 4 niveles de madurez ACF?", a: "Nivel 0 (Automatización Clásica) — reglas fijas, sin ML. Nivel 1 (Agentes Asistidos) — los agentes recomiendan, los humanos deciden. Nivel 2 (Agentes Gobernados) — los agentes deciden dentro de gobernanza estricta. Nivel 3 (Autonomía Supervisada) — los agentes deciden y aprenden, gobernanza máxima requerida." },
        { q: "¿Cuánto tiempo toma implementar el ACF?", a: "La implementación completa toma 6-18 meses. Los módulos fundamentales (M01-M03) pueden desplegarse en 2-3 meses para gobernanza inmediata." },
        { q: "¿Es el ACF adecuado para startups y PYMES?", a: "Absolutamente. El ACF se escala a todos los tamaños de organización. Las startups se benefician de gobernanza estructurada desde el inicio (Gobernanza por Diseño). Los 8 módulos se despliegan progresivamente. Precios adaptados disponibles." },
        { q: "¿Se deben implementar los 8 módulos a la vez?", a: "No. Comience con 3 módulos fundamentales: M01 (Mapeo), M02 (Clasificación de Riesgos), M03 (Mandatos). Añada módulos subsiguientes a medida que la madurez agéntica evolucione. Cada módulo aporta valor autónomo." },
        { q: "¿Cómo empezar con el ACF?", a: "Cuatro pasos simples: (1) Verifique su cumplimiento EU AI Act con el ACF AI Act Checker gratuito, (2) Evalúe su gobernanza con el diagnóstico ACF Score en acf-score.com, (3) Descargue el libro blanco ACF, (4) Contacte a nuestro equipo para orientación personalizada." },
        { q: "¿Es el ACF compatible con otros frameworks de IA?", a: "Sí. El ACF complementa NIST AI RMF, ISO/IEC 42001, IEEE 7000 y OECD AI Principles. El ACF se especializa en comercio agéntico y agentes de IA autónomos — un dominio que los frameworks genéricos no cubren en profundidad." },
      ],
    },
  ],
  de: [
    /* -- TAB 1 -- */
    {
      label: "Das ACF® Framework",
      questions: [
        { q: "Was ist das Agentic Commerce Framework® (ACF)?", a: "Das ACF ist der globale Governance-Standard für Organisationen, die autonome KI-Agenten in kommerziellen Umgebungen einsetzen. Es definiert 4 Gründungsprinzipien, 4 operative Schichten, 8 Implementierungsmodule und 18 Souveränitäts-KPIs, um sicherzustellen, dass Menschen die strategische Kontrolle über agentische Systeme behalten." },
        { q: "Wer hat den ACF® Standard geschaffen?", a: "Das ACF wurde von Vincent DORANGE, KI-Governance-Experte und Gründer von AI CONSULTING, geschaffen. Das Framework ist das Ergebnis mehrjähriger Forschung zur Governance autonomer Systeme in kommerziellen Umgebungen. ACF® ist eine eingetragene Marke." },
        { q: "Was sind die 4 Gründungsprinzipien des ACF?", a: "Die vier unveränderlichen Prinzipien sind: (1) Entscheidungssouveränität — kritische Entscheidungen werden nie an Agenten delegiert, (2) Governance by Design — Governance wird vor dem Einsatz definiert, (3) Ultimative menschliche Kontrolle — jedes System bewahrt die Fähigkeit menschlicher Intervention, (4) Nachverfolgbare Verantwortlichkeit — jede autonome Handlung ist auditierbar und zuordenbar." },
        { q: "Was sind die 4 operativen Schichten des ACF?", a: "Die 4 Schichten definieren die Governance-Architektur: Schicht 1 (Strategisch) — Definition von Mandaten und Entscheidungsperimetern, Schicht 2 (Taktisch) — Gating-Regeln und Eskalationsschwellen, Schicht 3 (Operativ) — Echtzeit-Monitoring von 18 KPIs, Schicht 4 (Audit) — vollständige Nachverfolgbarkeit und fälschungssichere Logs." },
        { q: "Was sind die 8 Implementierungsmodule?", a: "Die 8 Module umfassen: M01 Agenten-Mapping, M02 Risikoklassifizierung, M03 Mandatsdefinition, M04 Gating-Protokolle, M05 Monitoring-Architektur, M06 Notfall-Stopp-Protokoll, M07 Audit- und Compliance-Framework, M08 Schulung und Simulation. Progressiver Einsatz über 6-18 Monate." },
        { q: "Was sind die 18 Souveränitäts-KPIs?", a: "Die 18 KPIs messen die Entscheidungssouveränität über 6 Governance-Achsen (3 KPIs pro Achse): Entscheidungsautonomie, algorithmische Transparenz, operative Resilienz, regulatorische Compliance, Ethik und Leistung. Jeder KPI hat definierte Schwellenwerte, die automatische Warnungen und Eskalationen auslösen." },
        { q: "Was ist die Rolle des DDA (Delegated Decision Agent)?", a: "Der DDA Officer ist eine vom ACF definierte Governance-Rolle. Er dient als rechtlicher Hüter Ihrer autonomen Agenten — verantwortlich für die Definition von Mandaten, die Überwachung der Compliance und die Sicherstellung, dass kein Agent seinen autorisierten Entscheidungsperimeter überschreitet." },
        { q: "Ist ACF ein offener oder proprietärer Standard?", a: "ACF® ist ein proprietärer Standard, der von Vincent DORANGE erstellt und gepflegt wird. Methodik, Tools und Marke sind rechtlich geschützt. Das Whitepaper ist frei zugänglich, aber die zertifizierte Implementierung erfordert offizielle ACF-Tools und -Prozesse." },
      ],
    },
    /* -- TAB 2 -- */
    {
      label: "Agentischer Handel",
      questions: [
        { q: "Was ist agentischer Handel (Agentic Commerce)?", a: "Agentischer Handel bezeichnet den Einsatz autonomer KI-Agenten, die kommerzielle Entscheidungen eigenständig treffen können: Preisverhandlung, Bestandsmanagement, dynamische Personalisierung, Transaktionsausführung. Im Gegensatz zur klassischen Automatisierung lernen und adaptieren diese Agenten in Echtzeit." },
        { q: "Was ist der Unterschied zwischen einem KI-Agenten und einem Chatbot?", a: "Ein Chatbot folgt vordefinierten Skripten und beantwortet Fragen. Ein autonomer KI-Agent trifft Entscheidungen, führt Aktionen aus, lernt aus Ergebnissen und kann ohne menschliche Intervention operieren. Der Chatbot ist reaktiv, der Agent ist proaktiv." },
        { q: "Welche Risiken birgt agentischer Handel ohne Governance?", a: "Ohne strukturierte Governance umfassen die Risiken: voreingenommene oder diskriminierende Entscheidungen, Kontrollverlust über Geschäftspolitiken, regulatorische Nichteinhaltung (EU AI Act, DSGVO), Preismanipulation, Reputationsschäden, unklare rechtliche Haftung und Unmöglichkeit der Auditierung." },
        { q: "Welche Sektoren sind vom agentischen Handel betroffen?", a: "Alle Sektoren, die KI-Agenten in kommerziellen Kontexten einsetzen: E-Commerce und Einzelhandel, Finanzdienstleistungen, Versicherungen, Logistik und Lieferkette, Marketing, Immobilien, Tourismus, Gesundheitswesen und B2B-Dienstleistungen." },
        { q: "Was ist ein autonomer KI-Agent?", a: "Ein autonomer KI-Agent ist ein KI-System, das seine Umgebung wahrnehmen, Entscheidungen treffen und Aktionen eigenständig ausführen kann, um definierte Ziele zu erreichen. Er zeichnet sich durch kontinuierliches Lernen, Entscheidungsautonomie und die Fähigkeit aus, in dynamischen Umgebungen zu operieren." },
        { q: "Wie transformieren KI-Agenten den Handel?", a: "KI-Agenten transformieren den Handel durch die Automatisierung komplexer Entscheidungen: dynamische Preisgestaltung in Echtzeit, autonome Lieferantenverhandlung, hyperkontextuelle Personalisierung, prädiktives Bestandsmanagement, Betrugserkennung und Wertschöpfungskettenoptimierung. McKinsey schätzt, dass agentischer Handel bis 2030 einen Wert von 1,2 Billionen Dollar generieren könnte." },
        { q: "Was ist der Unterschied zwischen klassischer Automatisierung und agentischem Handel?", a: "Klassische Automatisierung folgt festen Regeln (wenn X dann Y). Agentischer Handel nutzt KI-Agenten, die lernen, sich anpassen und Entscheidungen in unvorhergesehenen Situationen treffen. ACF definiert 4 Reifegrade: Stufe 0 (klassische Automatisierung), Stufe 1 (assistierte Agenten), Stufe 2 (governte Agenten), Stufe 3 (überwachte Autonomie)." },
        { q: "Ist agentischer Handel reguliert?", a: "Ja, hauptsächlich durch den EU AI Act, der zwischen 2024 und 2027 schrittweise in Kraft tritt. Kommerzielle KI-Agenten können je nach Einsatzbereich als hochriskant eingestuft werden. Die DSGVO gilt ebenfalls für die Verarbeitung personenbezogener Daten." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act & Compliance",
      questions: [
        { q: "Was ist der EU AI Act?", a: "Der EU AI Act ist der weltweit erste umfassende Rechtsrahmen für künstliche Intelligenz. 2024 verabschiedet, legt er harmonisierte Regeln für die Entwicklung, Vermarktung und Nutzung von KI-Systemen in der EU fest, mit einem risikobasierten Ansatz." },
        { q: "Wann tritt der EU AI Act in Kraft?", a: "Der EU AI Act tritt schrittweise in Kraft: Februar 2025 für verbotene Praktiken, August 2025 für GPAI-Verpflichtungen, August 2026 für Hochrisikosysteme (Anhang III) und August 2027 für Systeme in regulierten Produkten. Strafen können 35 Millionen Euro oder 7% des globalen Umsatzes erreichen." },
        { q: "Wie hilft ACF bei der EU AI Act Compliance?", a: "ACF deckt direkt die wichtigsten Anforderungen des EU AI Act ab: Risikomanagementsystem (Art. 9), Datengovernance (Art. 10), technische Dokumentation (Art. 11), Transparenz (Art. 13), menschliche Aufsicht (Art. 14) und Cybersicherheit (Art. 15)." },
        { q: "Was ist ein KI-System mit hohem Risiko?", a: "Gemäß dem EU AI Act ist ein KI-System hochriskant, wenn es in sensiblen Bereichen gemäß Anhang III eingesetzt wird: Biometrie, kritische Infrastruktur, Bildung, Beschäftigung, wesentliche Dienstleistungen, Strafverfolgung, Immigration, Justiz." },
        { q: "Welche Pflichten haben KI-Anbieter?", a: "Anbieter von Hochrisiko-KI müssen: Risikomanagement implementieren, Trainingsdatenqualität sicherstellen, technische Dokumentation pflegen, Transparenz und Nachverfolgbarkeit garantieren, menschliche Aufsicht ermöglichen, Robustheit und Cybersicherheit sicherstellen und eine Konformitätsbewertung vor der Markteinführung durchführen." },
        { q: "Welche Pflichten haben die Betreiber?", a: "Betreiber von Hochrisiko-KI müssen: das System gemäß den Anweisungen des Anbieters nutzen, menschliche Aufsicht sicherstellen, den Betrieb überwachen, automatisch generierte Logs aufbewahren, eine Grundrechte-Folgenabschätzung durchführen und Personen informieren, dass sie mit einem KI-System interagieren." },
        { q: "Was sind GPAI-Modelle (General Purpose AI)?", a: "GPAI-Modelle sind KI-Modelle für allgemeine Zwecke (wie GPT-4, Claude, Gemini, LLaMA), die mit großen Datenmengen trainiert wurden und vielfältige Aufgaben bewältigen können. Der EU AI Act schreibt vor: technische Dokumentation, Urheberrechts-Compliance und für Modelle mit systemischem Risiko zusätzliche Bewertungen und kontinuierliches Monitoring." },
        { q: "Welche Strafen sieht der EU AI Act vor?", a: "Die Strafen sind proportional: bis zu 35 Mio. Euro oder 7% des weltweiten Umsatzes für verbotene Praktiken, bis zu 15 Mio. oder 3% für Nichteinhaltung bei Hochrisiko, bis zu 7,5 Mio. oder 1,5% für ungenaue Informationen. KMU und Startups erhalten reduzierte Strafen." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "Was ist der ACF Score®?", a: "Der ACF Score ist ein proprietäres Diagnosetool, das die Entscheidungssouveränität Ihrer Organisation über 6 Governance-Achsen misst. Es liefert einen zusammengesetzten Score von 0 bis 100, eine 6-Achsen-Radar-Visualisierung und einen personalisierten Aktionsplan." },
        { q: "Was sind die 6 Achsen des ACF Score?", a: "Die 6 Achsen sind: (1) Entscheidungsautonomie, (2) Algorithmische Transparenz, (3) Operative Resilienz, (4) Regulatorische Compliance, (5) Ethik & Verantwortung, (6) Leistung & Optimierung. Jede Achse enthält 3 spezifische KPIs." },
        { q: "Wie wird der ACF Score berechnet?", a: "Der Score wird aus den Diagnoseantworten berechnet, die über 6 Achsen mit je 3 KPIs (18 insgesamt) ausgewertet werden. Jeder KPI wird nach seinem Einfluss auf die Souveränität gewichtet. Endscore: 0-25 (Kritisch), 26-50 (In Entwicklung), 51-75 (Beherrscht), 76-100 (Exzellenz)." },
        { q: "Wie lange dauert die ACF Score Diagnose?", a: "Die vollständige Diagnose dauert weniger als 10 Minuten mit strukturierten Fragen über alle 6 Governance-Achsen. Ergebnisse sind sofort verfügbar mit detailliertem Aktionsplan und priorisierten Empfehlungen." },
        { q: "Ist die ACF Score Diagnose kostenlos?", a: "Die Basisdiagnose ist kostenlos auf acf-score.com zugänglich. Sie liefert Ihren Gesamtscore und Radar-Visualisierung. Premium-Optionen sind verfügbar für detaillierte Berichte mit personalisierten Empfehlungen und Branchen-Benchmarks." },
        { q: "Für wen ist der ACF Score gedacht?", a: "Der ACF Score richtet sich an jede Organisation, die KI-Agenten einsetzt oder plant: Innovationsdirektoren, Compliance-Verantwortliche, CTOs, KI-Startup-CEOs und Berater für digitale Transformation." },
        { q: "Was ist der Unterschied zwischen ACF Score und ACF Control?", a: "ACF Score ist eine punktuelle Diagnose zur Bewertung der Governance-Reife. ACF Control ist eine kontinuierliche Monitoring-Plattform, die 18 KPIs in Echtzeit verfolgt mit adaptivem Gating und automatischen Warnungen. Score diagnostiziert, Control regiert täglich." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "Was ist ACF Control?", a: "ACF Control ist die Echtzeit-Governance-Plattform, die Ihre 18 Souveränitäts-KPIs mit adaptivem Gating und automatisierter Eskalation überwacht. Es ist das Kommandozentrum Ihrer agentischen Governance — Echtzeit-Dashboard, intelligente Warnungen und fälschungssichere Audit-Logs." },
        { q: "Wie funktioniert adaptives Gating?", a: "Adaptives Gating definiert dynamische Schwellenwerte pro KPI. Wenn ein KI-Agent einen Schwellenwert erreicht oder überschreitet, kann das System: den Operator warnen, den Entscheidungsperimeter des Agenten einschränken, Aktionen aussetzen oder an einen Menschen eskalieren." },
        { q: "Was ist das ACF Notfall-Stopp-Protokoll?", a: "Ein 3-stufiger Unterbrechungsmechanismus: Stufe 1 (Operative Pause, < 30s) — nicht-kritische Aussetzung, Stufe 2 (Entscheidungsstopp, < 5s) — vollständige Aussetzung der Agentenentscheidungen, Stufe 3 (Vollständiger Systemstopp, < 1s) — komplettes Herunterfahren mit manuellem Fallback." },
        { q: "Welche KPIs überwacht ACF Control?", a: "ACF Control überwacht 18 proprietäre KPIs über die 6 ACF-Governance-Achsen. Jede Achse hat 3 spezifische Indikatoren, die kontinuierlich die Entscheidungssouveränität Ihrer Organisation messen." },
        { q: "Lässt sich ACF Control in bestehende Systeme integrieren?", a: "Ja, ACF Control integriert sich über API mit den wichtigsten KI-Agenten-Umgebungen: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein und proprietären Lösungen. Die Architektur ist agnostisch." },
        { q: "Sind die ACF Control Logs fälschungssicher?", a: "Ja, durch kryptographisches Hashing zur Sicherstellung der Audit-Log-Integrität. Jede Agentenaktion, Entscheidung und menschliche Intervention wird zeitgestempelt und verkettet. Wesentlich für die EU AI Act Compliance (Artikel 12)." },
        { q: "Können Alarmschwellen angepasst werden?", a: "Absolut. Jede Organisation konfiguriert Schwellenwerte pro KPI basierend auf Branche, Risikoappetit und regulatorischen Anforderungen. Vorkonfigurierte Branchenprofile (Finanzen, Gesundheit, E-Commerce) beschleunigen den Einsatz." },
      ],
    },
    /* -- TAB 6 -- */
    {
      label: "ACF AI Act Checker",
      questions: [
        { q: "Was ist der ACF AI Act Checker?", a: "Der ACF AI Act Checker ist ein kostenloses Diagnosetool, das Ihre Konformität mit dem EU AI Act bewertet. In Minuten identifiziert er Ihre Rolle, klassifiziert Ihr KI-System nach Risikoniveau und listet Ihre spezifischen Verpflichtungen mit den entsprechenden Gesetzesartikeln auf." },
        { q: "Wie funktioniert die Checker-Diagnose?", a: "Die Diagnose folgt einem 4-Phasen-Entscheidungsbaum: (1) Ihre Rolle in der KI-Wertschöpfungskette identifizieren, (2) System-Risikoniveau klassifizieren, (3) Anwendbare Regeln bewerten, (4) Verpflichtungen mit Gesetzesartikeln und empfohlenen Maßnahmen präsentieren." },
        { q: "Ersetzt der Checker eine Rechtsberatung?", a: "Nein. Der ACF AI Act Checker liefert eine vorläufige Einschätzung. Er stellt keine Rechtsberatung dar. Für umfassende Unterstützung kombinieren Sie die Checker-Ergebnisse mit dem ACF-Framework und professioneller Rechtsberatung." },
        { q: "Werden meine Daten vom Checker gespeichert?", a: "Nein. Daten werden nur zum Versand der Ergebnisse per E-Mail verwendet, wenn gewünscht. Sie werden weder gespeichert noch geteilt. Keine Tracking-Cookies. Die Diagnose läuft clientseitig." },
        { q: "Kann ich meine Ergebnisse per E-Mail erhalten?", a: "Ja. Nach der Diagnose geben Sie Ihre E-Mail ein, um eine vollständige Zusammenfassung zu erhalten: Systemname, identifizierte Rolle, Risikoniveau und detaillierte Verpflichtungsliste. Sie können die Ergebnisse auch als PDF herunterladen." },
        { q: "Deckt der Checker alle Arten von KI-Systemen ab?", a: "Der Checker deckt die wichtigsten EU AI Act Anwendungsfälle ab: Anbieter, Betreiber, Distributoren, Importeure, Produkthersteller und autorisierte Vertreter. Er bewertet klassische KI, Hochrisikosysteme und GPAI-Modelle." },
      ],
    },
    /* -- TAB 7 -- */
    {
      label: "ACF-Zertifizierung",
      questions: [
        { q: "Was ist die ACF-Zertifizierung?", a: "Die ACF-Zertifizierung ist eine unabhängige Konformitätsbescheinigung nach dem ACF-Governance-Standard. Sie belegt, dass Ihre Organisation die erforderlichen Prozesse, Tools und Praktiken implementiert hat, um autonome KI-Agenten verantwortungsvoll zu steuern." },
        { q: "Welche 3 Zertifizierungsstufen gibt es?", a: "Stufe 1 (Fundament) — grundlegende Governance, erste ACF-Module, dokumentierte Prozesse. Stufe 2 (Fortgeschritten) — aktives KPI-Monitoring, operatives adaptives Gating, getesteter Notfallstopp. Stufe 3 (Exzellenz) — vollständige Governance, kontinuierliche Auditierung, nachgewiesene EU AI Act Compliance." },
        { q: "Wie erhält man die ACF-Zertifizierung?", a: "Der Prozess umfasst: (1) Selbstbewertung über ACF Score, (2) Bewerbung mit Governance-Dokumentation, (3) Unabhängiges Audit durch akkreditierten ACF-Prüfer, (4) Behebung falls nötig, (5) Ausstellung eines öffentlich verifizierbaren Badges. Typischerweise 3-6 Monate." },
        { q: "Was kostet die ACF-Zertifizierung?", a: "Die Kosten variieren je nach Zertifizierungsstufe, Organisationsgröße und Anzahl der zu auditierenden KI-Systeme. Kontaktieren Sie uns für ein personalisiertes Angebot. Angepasste Tarife für Startups und KMU verfügbar." },
        { q: "Wie lange ist die Zertifizierung gültig?", a: "Die ACF-Zertifizierung ist 12 Monate gültig mit jährlicher Erneuerung einschließlich Folge-Audit und Überprüfung der Governance-Praktiken." },
        { q: "Ist die Zertifizierung öffentlich verifizierbar?", a: "Ja. Jede zertifizierte Organisation erhält ein digitales Badge mit eindeutiger Kennung und Verifizierungs-URL. Jeder kann Gültigkeit und Stufe in Echtzeit auf dem ACF-Portal überprüfen." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "Implementierung & Reife",
      questions: [
        { q: "Was sind die 4 ACF-Reifegrade?", a: "Stufe 0 (Klassische Automatisierung) — feste Regeln, kein ML. Stufe 1 (Assistierte Agenten) — Agenten empfehlen, Menschen entscheiden. Stufe 2 (Governte Agenten) — Agenten entscheiden innerhalb strenger Governance. Stufe 3 (Überwachte Autonomie) — Agenten entscheiden und lernen, maximale Governance erforderlich." },
        { q: "Wie lange dauert die ACF-Implementierung?", a: "Die vollständige Implementierung dauert 6-18 Monate. Grundlagenmodule (M01-M03) können in 2-3 Monaten für sofortige Governance eingesetzt werden." },
        { q: "Ist ACF für Startups und KMU geeignet?", a: "Absolut. ACF skaliert für alle Organisationsgrößen. Startups profitieren von strukturierter Governance von Anfang an (Governance by Design). Die 8 Module werden progressiv eingesetzt. Angepasste Preise verfügbar." },
        { q: "Müssen alle 8 Module gleichzeitig implementiert werden?", a: "Nein. Beginnen Sie mit 3 Grundlagenmodulen: M01 (Mapping), M02 (Risikoklassifizierung), M03 (Mandate). Fügen Sie weitere Module hinzu, wenn die agentische Reife wächst. Jedes Modul liefert eigenständigen Wert." },
        { q: "Wie startet man mit ACF?", a: "Vier einfache Schritte: (1) Prüfen Sie Ihre EU AI Act Compliance mit dem kostenlosen ACF AI Act Checker, (2) Bewerten Sie Ihre Governance mit der ACF Score Diagnose auf acf-score.com, (3) Laden Sie das ACF Whitepaper herunter, (4) Kontaktieren Sie unser Team für personalisierte Beratung." },
        { q: "Ist ACF mit anderen KI-Frameworks kompatibel?", a: "Ja. ACF ergänzt NIST AI RMF, ISO/IEC 42001, IEEE 7000 und OECD AI Principles. ACF spezialisiert sich auf agentischen Handel und autonome KI-Agenten — ein Bereich, den generische Frameworks nicht tiefgehend abdecken." },
      ],
    },
  ],
  pt: [
    /* -- TAB 1 -- */
    {
      label: "O Framework ACF®",
      questions: [
        { q: "O que é o Agentic Commerce Framework® (ACF)?", a: "O ACF é o padrão global de governança para organizações que implementam agentes de IA autónomos em ambientes comerciais. Define 4 princípios fundadores, 4 camadas operacionais, 8 módulos de implementação e 18 KPIs de soberania para garantir que os humanos mantenham o controlo estratégico sobre os sistemas agênticos." },
        { q: "Quem criou o padrão ACF®?", a: "O ACF foi criado por Vincent DORANGE, especialista em governança de IA e fundador da AI CONSULTING. O framework é o resultado de vários anos de investigação sobre governança de sistemas autónomos em ambientes comerciais. ACF® é uma marca registada." },
        { q: "Quais são os 4 princípios fundadores do ACF?", a: "Os quatro princípios imutáveis são: (1) Soberania Decisional — decisões críticas nunca são delegadas a agentes, (2) Governança by Design — a governança é definida antes da implementação, (3) Controlo Humano Último — cada sistema preserva a capacidade de intervenção humana, (4) Responsabilidade Rastreável — cada ação autónoma é auditável e atribuível." },
        { q: "O que são as 4 camadas operacionais do ACF?", a: "As 4 camadas definem a arquitetura de governança: Camada 1 (Estratégica) — definição de mandatos e perímetros decisórios, Camada 2 (Tática) — regras de gating e limiares de escalamento, Camada 3 (Operacional) — monitorização em tempo real de 18 KPIs, Camada 4 (Auditoria) — rastreabilidade completa e logs invioláveis." },
        { q: "Quais são os 8 módulos de implementação?", a: "Os 8 módulos abrangem: M01 Mapeamento de agentes, M02 Classificação de riscos, M03 Definição de mandatos, M04 Protocolos de gating, M05 Arquitetura de monitorização, M06 Protocolo de paragem de emergência, M07 Framework de auditoria e conformidade, M08 Formação e simulação. Implementação progressiva de 6 a 18 meses." },
        { q: "O que são os 18 KPIs de soberania?", a: "Os 18 KPIs medem a soberania decisional através de 6 eixos de governança (3 KPIs por eixo): autonomia decisional, transparência algorítmica, resiliência operacional, conformidade regulatória, ética e desempenho. Cada KPI tem limiares definidos que ativam alertas e escalamentos automáticos." },
        { q: "O que é o papel DDA (Delegated Decision Agent)?", a: "O DDA Officer é um papel de governança definido pelo ACF. Atua como o guardião legal dos seus agentes autónomos — responsável por definir mandatos, monitorizar a conformidade e garantir que nenhum agente exceda o seu perímetro decisional autorizado." },
        { q: "O ACF é um padrão aberto ou proprietário?", a: "ACF® é um padrão proprietário criado e mantido por Vincent DORANGE. A metodologia, ferramentas e marca estão legalmente protegidas. O livro branco é livremente acessível, mas a implementação certificada requer ferramentas e processos oficiais ACF." },
      ],
    },
    /* -- TAB 2 -- */
    {
      label: "Comércio Agêntico",
      questions: [
        { q: "O que é comércio agêntico?", a: "O comércio agêntico refere-se ao uso de agentes de IA autónomos capazes de tomar decisões comerciais de forma independente: negociação de preços, gestão de inventário, personalização dinâmica, execução de transações. Ao contrário da automação clássica, estes agentes aprendem e adaptam-se em tempo real." },
        { q: "Qual é a diferença entre um agente de IA e um chatbot?", a: "Um chatbot segue scripts predefinidos e responde a perguntas. Um agente de IA autónomo toma decisões, executa ações, aprende com os resultados e pode operar sem intervenção humana. O chatbot é reativo, o agente é proativo." },
        { q: "Quais são os riscos do comércio agêntico sem governança?", a: "Sem governança estruturada, os riscos incluem: decisões enviesadas ou discriminatórias, perda de controlo sobre políticas comerciais, não conformidade regulatória (EU AI Act, RGPD), manipulação de preços, danos reputacionais, responsabilidade legal pouco clara e impossibilidade de auditoria." },
        { q: "Que setores são afetados pelo comércio agêntico?", a: "Todos os setores que implementam agentes de IA em contextos comerciais: e-commerce e retalho, serviços financeiros, seguros, logística e cadeia de abastecimento, marketing, imobiliário, turismo, saúde e serviços B2B." },
        { q: "O que é um agente de IA autónomo?", a: "Um agente de IA autónomo é um sistema de IA capaz de perceber o seu ambiente, tomar decisões e executar ações de forma independente para alcançar objetivos definidos. Distingue-se pela aprendizagem contínua, autonomia decisional e capacidade de operar em ambientes dinâmicos." },
        { q: "Como estão os agentes de IA a transformar o comércio?", a: "Os agentes de IA transformam o comércio automatizando decisões complexas: preços dinâmicos em tempo real, negociação autónoma com fornecedores, personalização hipercontextual, gestão preditiva de inventário, deteção de fraude e otimização da cadeia de valor." },
        { q: "Qual é a diferença entre automação clássica e comércio agêntico?", a: "A automação clássica segue regras fixas (se X então Y). O comércio agêntico usa agentes de IA que aprendem, adaptam-se e tomam decisões em situações imprevistas. O ACF define 4 níveis de maturidade: Nível 0 (automação clássica), Nível 1 (agentes assistidos), Nível 2 (agentes governados), Nível 3 (autonomia supervisionada)." },
        { q: "O comércio agêntico é regulado?", a: "Sim, principalmente pelo EU AI Act que entra em vigor progressivamente entre 2024 e 2027. Os agentes de IA comerciais podem ser classificados como de alto risco dependendo do seu domínio. O RGPD também se aplica ao tratamento de dados pessoais." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act e Conformidade",
      questions: [
        { q: "O que é o EU AI Act?", a: "O EU AI Act é o primeiro quadro legal abrangente do mundo para a inteligência artificial. Adotado em 2024, estabelece regras harmonizadas para o desenvolvimento, colocação no mercado e utilização de sistemas de IA na UE, com uma abordagem baseada em riscos." },
        { q: "Quando entra em vigor o EU AI Act?", a: "O EU AI Act entra em vigor progressivamente: fevereiro de 2025 para práticas proibidas, agosto de 2025 para obrigações GPAI, agosto de 2026 para sistemas de alto risco (Anexo III) e agosto de 2027 para sistemas em produtos regulados." },
        { q: "Como o ACF ajuda na conformidade com o EU AI Act?", a: "O ACF cobre diretamente os principais requisitos do EU AI Act: sistema de gestão de riscos (Art. 9), governança de dados (Art. 10), documentação técnica (Art. 11), transparência (Art. 13), supervisão humana (Art. 14) e cibersegurança (Art. 15)." },
        { q: "O que é um sistema de IA de alto risco?", a: "Segundo o EU AI Act, um sistema de IA é de alto risco se utilizado em áreas sensíveis listadas no Anexo III: biometria, infraestrutura crítica, educação, emprego, serviços essenciais, aplicação da lei, imigração, justiça." },
        { q: "Quais são as obrigações para os fornecedores de IA?", a: "Os fornecedores de IA de alto risco devem: implementar gestão de riscos, garantir qualidade dos dados de treino, manter documentação técnica, garantir transparência e rastreabilidade, permitir supervisão humana, assegurar robustez e cibersegurança, e realizar avaliação de conformidade antes da colocação no mercado." },
        { q: "Quais são as obrigações para os implementadores?", a: "Os implementadores de IA de alto risco devem: utilizar o sistema conforme instruções do fornecedor, assegurar supervisão humana, monitorizar o funcionamento, conservar logs gerados automaticamente, realizar avaliação de impacto nos direitos fundamentais e informar as pessoas que interagem com um sistema de IA." },
        { q: "O que são modelos GPAI?", a: "Os modelos GPAI são modelos de IA de propósito geral (como GPT-4, Claude, Gemini, LLaMA) treinados com grandes volumes de dados e capazes de tarefas variadas. O EU AI Act impõe: documentação técnica, conformidade com direitos de autor, e para modelos de risco sistémico, avaliações adicionais e monitorização contínua." },
        { q: "Que penalizações prevê o EU AI Act?", a: "As penalizações são proporcionais: até 35M€ ou 7% do volume de negócios global para práticas proibidas, até 15M€ ou 3% para não conformidade de alto risco, até 7,5M€ ou 1,5% para informações inexatas. PMEs e startups obtêm penalizações reduzidas." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "O que é o ACF Score®?", a: "O ACF Score é uma ferramenta de diagnóstico proprietária que mede a soberania decisional da sua organização através de 6 eixos de governança. Fornece uma pontuação composta de 0 a 100, uma visualização radar de 6 eixos e um plano de ação personalizado." },
        { q: "Quais são os 6 eixos do ACF Score?", a: "Os 6 eixos são: (1) Autonomia Decisional, (2) Transparência Algorítmica, (3) Resiliência Operacional, (4) Conformidade Regulatória, (5) Ética e Responsabilidade, (6) Desempenho e Otimização. Cada eixo contém 3 KPIs específicos." },
        { q: "Como é calculado o ACF Score?", a: "A pontuação é calculada a partir das respostas avaliadas em 6 eixos com 3 KPIs cada (18 total). Cada KPI é ponderado pelo seu impacto na soberania. Pontuação final: 0-25 (Crítico), 26-50 (Em desenvolvimento), 51-75 (Dominado), 76-100 (Excelência)." },
        { q: "Quanto tempo demora o diagnóstico ACF Score?", a: "O diagnóstico completo demora menos de 10 minutos com perguntas estruturadas nos 6 eixos de governança. Os resultados estão disponíveis imediatamente com plano de ação detalhado." },
        { q: "O diagnóstico ACF Score é gratuito?", a: "O diagnóstico básico é acessível gratuitamente em acf-score.com. Fornece a sua pontuação global e visualização radar. Opções premium disponíveis para relatórios detalhados com recomendações personalizadas." },
        { q: "A quem se destina o ACF Score?", a: "O ACF Score destina-se a qualquer organização que utilize ou planeie utilizar agentes de IA: diretores de inovação, responsáveis de conformidade, CTOs, CEOs de startups de IA e consultores de transformação digital." },
        { q: "Qual é a diferença entre ACF Score e ACF Control?", a: "ACF Score é um diagnóstico pontual que avalia a maturidade de governança. ACF Control é uma plataforma de monitorização contínua que rastreia 18 KPIs em tempo real com gating adaptativo e alertas automáticos. Score diagnostica, Control governa diariamente." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "O que é o ACF Control?", a: "ACF Control é a plataforma de governança em tempo real que monitoriza os seus 18 KPIs de soberania com gating adaptativo e escalamento automatizado. É o centro de comando da governança agêntica." },
        { q: "Como funciona o gating adaptativo?", a: "O gating adaptativo define limiares dinâmicos por KPI. Quando um agente de IA se aproxima ou excede um limiar, o sistema pode: alertar o operador, restringir o perímetro decisional do agente, suspender ações ou escalar para um humano." },
        { q: "O que é o Protocolo de Paragem de Emergência ACF?", a: "Um mecanismo de interrupção de 3 níveis: Nível 1 (Pausa operacional, < 30s) — suspensão não crítica, Nível 2 (Paragem decisional, < 5s) — suspensão total de decisões, Nível 3 (Paragem total, < 1s) — encerramento completo com fallback manual." },
        { q: "Que KPIs monitoriza o ACF Control?", a: "O ACF Control monitoriza 18 KPIs proprietários nos 6 eixos de governança ACF. Cada eixo tem 3 indicadores específicos que medem continuamente a soberania decisional da sua organização." },
        { q: "O ACF Control integra-se com sistemas existentes?", a: "Sim, o ACF Control integra-se via API com os principais ambientes de agentes de IA: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein e soluções proprietárias. A arquitetura é agnóstica." },
        { q: "Os logs do ACF Control são invioláveis?", a: "Sim, usando hashing criptográfico para garantir a integridade dos logs de auditoria. Cada ação do agente, decisão e intervenção humana é carimbada temporalmente e encadeada. Essencial para a conformidade com o EU AI Act (Artigo 12)." },
        { q: "Os limiares de alerta podem ser personalizados?", a: "Absolutamente. Cada organização configura limiares por KPI com base no setor, apetite ao risco e requisitos regulatórios. Perfis setoriais pré-configurados (finanças, saúde, e-commerce) aceleram a implementação." },
      ],
    },
    /* -- TAB 6 -- */
    {
      label: "ACF AI Act Checker",
      questions: [
        { q: "O que é o ACF AI Act Checker?", a: "O ACF AI Act Checker é uma ferramenta de diagnóstico gratuita que avalia a sua conformidade com o EU AI Act. Em minutos, identifica o seu papel, classifica o seu sistema de IA por nível de risco e lista as suas obrigações específicas." },
        { q: "Como funciona o diagnóstico do Checker?", a: "O diagnóstico segue uma árvore de decisão de 4 fases: (1) Identificar o seu papel na cadeia de valor da IA, (2) Classificar o nível de risco, (3) Avaliar regras aplicáveis, (4) Apresentar obrigações com artigos de lei e ações recomendadas." },
        { q: "O Checker substitui aconselhamento jurídico?", a: "Não. O ACF AI Act Checker fornece uma indicação preliminar. Não constitui aconselhamento jurídico. Para apoio completo, combine os resultados do Checker com o framework ACF e aconselhamento jurídico profissional." },
        { q: "Os meus dados são armazenados pelo Checker?", a: "Não. Os dados são utilizados apenas para enviar resultados por email, se solicitado. Não são armazenados nem partilhados. Sem cookies de rastreio. O diagnóstico é executado no lado do cliente." },
        { q: "Posso receber os meus resultados por email?", a: "Sim. Após o diagnóstico, introduza o seu email para receber um resumo completo: nome do sistema, papel identificado, nível de risco e lista detalhada de obrigações. Também pode descarregar os resultados em PDF." },
        { q: "O Checker cobre todos os tipos de sistemas de IA?", a: "O Checker cobre os principais casos de uso do EU AI Act: fornecedores, implementadores, distribuidores, importadores, fabricantes de produtos e representantes autorizados. Avalia IA clássica, sistemas de alto risco e modelos GPAI." },
      ],
    },
    /* -- TAB 7 -- */
    {
      label: "Certificação ACF",
      questions: [
        { q: "O que é a certificação ACF?", a: "A certificação ACF é uma atestação independente de conformidade com o padrão de governança ACF. Demonstra que a sua organização implementou os processos, ferramentas e práticas necessários para governar agentes de IA autónomos de forma responsável." },
        { q: "Quais são os 3 níveis de certificação?", a: "Nível 1 (Fundação) — governança básica, primeiros módulos ACF, processos documentados. Nível 2 (Avançado) — monitorização ativa de KPIs, gating adaptativo operacional, paragem de emergência testada. Nível 3 (Excelência) — governança completa, auditoria contínua, conformidade EU AI Act demonstrada." },
        { q: "Como obter a certificação ACF?", a: "O processo inclui: (1) Auto-avaliação via ACF Score, (2) Candidatura com documentação de governança, (3) Auditoria independente por avaliador acreditado ACF, (4) Remediação se necessário, (5) Emissão de badge publicamente verificável. Tipicamente 3-6 meses." },
        { q: "Quanto custa a certificação ACF?", a: "O custo varia conforme o nível de certificação, tamanho da organização e número de sistemas de IA a auditar. Contacte-nos para um orçamento personalizado. Tarifas adaptadas disponíveis para startups e PMEs." },
        { q: "Qual é a validade da certificação?", a: "A certificação ACF é válida por 12 meses com renovação anual incluindo auditoria de seguimento e verificação de práticas de governança." },
        { q: "A certificação é publicamente verificável?", a: "Sim. Cada organização certificada recebe um badge digital com identificador único e URL de verificação. Qualquer pessoa pode verificar a validade e nível em tempo real no portal ACF." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "Implementação e Maturidade",
      questions: [
        { q: "Quais são os 4 níveis de maturidade ACF?", a: "Nível 0 (Automação Clássica) — regras fixas, sem ML. Nível 1 (Agentes Assistidos) — agentes recomendam, humanos decidem. Nível 2 (Agentes Governados) — agentes decidem dentro de governança estrita. Nível 3 (Autonomia Supervisionada) — agentes decidem e aprendem, governança máxima necessária." },
        { q: "Quanto tempo leva implementar o ACF?", a: "A implementação completa leva 6-18 meses. Os módulos fundamentais (M01-M03) podem ser implementados em 2-3 meses para governança imediata." },
        { q: "O ACF é adequado para startups e PMEs?", a: "Absolutamente. O ACF escala para todos os tamanhos de organização. Startups beneficiam de governança estruturada desde o início (Governança by Design). Os 8 módulos implementam-se progressivamente. Preços adaptados disponíveis." },
        { q: "É necessário implementar os 8 módulos de uma vez?", a: "Não. Comece com 3 módulos fundamentais: M01 (Mapeamento), M02 (Classificação de Riscos), M03 (Mandatos). Adicione módulos subsequentes à medida que a maturidade agêntica evolui. Cada módulo entrega valor autónomo." },
        { q: "Como começar com o ACF?", a: "Quatro passos simples: (1) Verifique a sua conformidade EU AI Act com o ACF AI Act Checker gratuito, (2) Avalie a sua governança com o diagnóstico ACF Score em acf-score.com, (3) Descarregue o livro branco ACF, (4) Contacte a nossa equipa para orientação personalizada." },
        { q: "O ACF é compatível com outros frameworks de IA?", a: "Sim. O ACF complementa NIST AI RMF, ISO/IEC 42001, IEEE 7000 e OECD AI Principles. O ACF especializa-se em comércio agêntico e agentes de IA autónomos — um domínio que frameworks genéricos não cobrem em profundidade." },
      ],
    },
  ],
  it: [
    /* -- TAB 1 -- */
    {
      label: "Il Framework ACF®",
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
    /* -- TAB 2 -- */
    {
      label: "Commercio Agentico",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act e Conformità",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach €35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15)." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to €35M or 7% of global turnover for prohibited practices, up to €15M or 3% for high-risk non-compliance, up to €7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score®?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* -- TAB 6 -- */
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
    /* -- TAB 7 -- */
    {
      label: "Certificazione ACF",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "Implementazione e Maturità",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
  nl: [
    /* -- TAB 1 -- */
    {
      label: "Het ACF® Framework",
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
    /* -- TAB 2 -- */
    {
      label: "Agentische Handel",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act & Compliance",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach €35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15)." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to €35M or 7% of global turnover for prohibited practices, up to €15M or 3% for high-risk non-compliance, up to €7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score®?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* -- TAB 6 -- */
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
    /* -- TAB 7 -- */
    {
      label: "ACF-Certificering",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "Implementatie & Volwassenheid",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
  ja: [
    /* -- TAB 1 -- */
    {
      label: "ACF®フレームワーク",
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
    /* -- TAB 2 -- */
    {
      label: "エージェンティックコマース",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act & コンプライアンス",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach €35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15)." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to €35M or 7% of global turnover for prohibited practices, up to €15M or 3% for high-risk non-compliance, up to €7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score®?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* -- TAB 6 -- */
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
    /* -- TAB 7 -- */
    {
      label: "ACF認証",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "実装と成熟度",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
  zh: [
    /* -- TAB 1 -- */
    {
      label: "ACF®框架",
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
    /* -- TAB 2 -- */
    {
      label: "代理商务",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act与合规",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach €35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15)." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to €35M or 7% of global turnover for prohibited practices, up to €15M or 3% for high-risk non-compliance, up to €7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score®?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* -- TAB 6 -- */
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
    /* -- TAB 7 -- */
    {
      label: "ACF认证",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "实施与成熟度",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
  ko: [
    /* -- TAB 1 -- */
    {
      label: "ACF® 프레임워크",
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
    /* -- TAB 2 -- */
    {
      label: "에이전틱 커머스",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act & 컴플라이언스",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach €35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15)." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to €35M or 7% of global turnover for prohibited practices, up to €15M or 3% for high-risk non-compliance, up to €7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score®?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* -- TAB 6 -- */
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
    /* -- TAB 7 -- */
    {
      label: "ACF 인증",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "구현 & 성숙도",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
  ru: [
    /* -- TAB 1 -- */
    {
      label: "Фреймворк ACF®",
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
    /* -- TAB 2 -- */
    {
      label: "Агентная коммерция",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act и соответствие",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach €35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15)." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to €35M or 7% of global turnover for prohibited practices, up to €15M or 3% for high-risk non-compliance, up to €7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score®?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* -- TAB 6 -- */
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
    /* -- TAB 7 -- */
    {
      label: "Сертификация ACF",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "Внедрение и зрелость",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
  ar: [
    /* -- TAB 1 -- */
    {
      label: "إطار عمل ACF®",
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
    /* -- TAB 2 -- */
    {
      label: "التجارة الوكيلية",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act والامتثال",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach €35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15)." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to €35M or 7% of global turnover for prohibited practices, up to €15M or 3% for high-risk non-compliance, up to €7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score®?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* -- TAB 6 -- */
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
    /* -- TAB 7 -- */
    {
      label: "شهادة ACF",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "التنفيذ والنضج",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
        { q: "Is ACF compatible with other AI frameworks?", a: "Yes. ACF complements NIST AI RMF, ISO/IEC 42001, IEEE 7000, and OECD AI Principles. ACF specializes in agentic commerce and autonomous AI agents — a domain generic frameworks don't cover in depth. ACF provides the commercial agent-specific governance layer." },
      ],
    },
  ],
  tr: [
    /* -- TAB 1 -- */
    {
      label: "ACF® Çerçevesi",
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
    /* -- TAB 2 -- */
    {
      label: "Ajantik Ticaret",
      questions: [
        { q: "What is agentic commerce?", a: "Agentic commerce refers to the use of autonomous AI agents capable of making commercial decisions independently: price negotiation, inventory management, dynamic personalization, transaction execution. Unlike classical automation, these agents learn and adapt in real time." },
        { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot follows predefined scripts and answers questions. An autonomous AI agent makes decisions, executes actions, learns from outcomes, and can operate without human intervention. The chatbot is reactive, the agent is proactive. This decisional autonomy requires a governance framework like ACF." },
        { q: "What are the risks of agentic commerce without governance?", a: "Without structured governance, risks include: biased or discriminatory decisions, loss of control over commercial policies, regulatory non-compliance (EU AI Act, GDPR), price manipulation, reputational damage, unclear legal liability, and inability to audit. ACF addresses each through its 8 modules." },
        { q: "Which sectors are affected by agentic commerce?", a: "All sectors deploying AI agents in commercial contexts: e-commerce and retail, financial services, insurance, logistics and supply chain, marketing, real estate, tourism, healthcare, and B2B services." },
        { q: "What is an autonomous AI agent?", a: "An autonomous AI agent is an AI system capable of perceiving its environment, making decisions, and executing actions independently to achieve defined objectives. It is distinguished by continuous learning, decisional autonomy, and the ability to operate in dynamic environments." },
        { q: "How are AI agents transforming commerce?", a: "AI agents transform commerce by automating complex decisions: real-time dynamic pricing, autonomous supplier negotiation, hyper-contextual personalization, predictive inventory management, fraud detection, and value chain optimization. McKinsey estimates agentic commerce could generate $1.2 trillion in value by 2030." },
        { q: "What's the difference between classical automation and agentic commerce?", a: "Classical automation follows fixed rules (if X then Y). Agentic commerce uses AI agents that learn, adapt, and make decisions in unforeseen situations. ACF defines 4 maturity levels: Level 0 (classical automation), Level 1 (assisted agents), Level 2 (governed agents), Level 3 (supervised autonomy)." },
        { q: "Is agentic commerce regulated?", a: "Yes, primarily by the EU AI Act coming into force progressively between 2024 and 2027. Commercial AI agents may be classified as high-risk depending on their domain. GDPR also applies to personal data processing. ACF is designed to ensure compliance." },
      ],
    },
    /* -- TAB 3 -- */
    {
      label: "EU AI Act & Uyumluluk",
      questions: [
        { q: "What is the EU AI Act?", a: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. Adopted in 2024, it establishes harmonized rules for the development, placing on market, and use of AI systems in the EU, with a risk-based approach." },
        { q: "When does the EU AI Act come into force?", a: "The EU AI Act comes into force progressively: February 2025 for prohibited practices, August 2025 for GPAI obligations, August 2026 for high-risk systems (Annex III), and August 2027 for systems in regulated products. Penalties can reach €35 million or 7% of global turnover." },
        { q: "How does ACF help with EU AI Act compliance?", a: "ACF directly covers main EU AI Act requirements: risk management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11), transparency (Art. 13), human oversight (Art. 14), and cybersecurity (Art. 15)." },
        { q: "What is a high-risk AI system?", a: "Under the EU AI Act, an AI system is high-risk if used in sensitive areas listed in Annex III: biometrics, critical infrastructure, education, employment, essential services (credit, insurance), law enforcement, immigration, justice." },
        { q: "What are the obligations for AI providers?", a: "Providers of high-risk AI must: implement risk management, ensure training data quality, maintain technical documentation, guarantee transparency and traceability, enable human oversight, ensure robustness and cybersecurity, and perform conformity assessment before market placement." },
        { q: "What are the obligations for deployers?", a: "Deployers of high-risk AI must: use the system per provider instructions, ensure human oversight, monitor operation, keep automatically generated logs, perform fundamental rights impact assessment (certain sectors), and inform persons they interact with an AI system." },
        { q: "What are GPAI (General Purpose AI) models?", a: "GPAI models are general-purpose AI models (like GPT-4, Claude, Gemini, LLaMA) trained on large data and capable of varied tasks. The EU AI Act imposes: technical documentation, copyright compliance, and for systemic risk models, additional evaluations and continuous monitoring." },
        { q: "What penalties does the EU AI Act provide?", a: "Penalties are proportional: up to €35M or 7% of global turnover for prohibited practices, up to €15M or 3% for high-risk non-compliance, up to €7.5M or 1.5% for inaccurate information. SMEs and startups get reduced penalties." },
      ],
    },
    /* -- TAB 4 -- */
    {
      label: "ACF Score",
      questions: [
        { q: "What is the ACF Score®?", a: "The ACF Score is a proprietary diagnostic tool measuring your organization's decisional sovereignty across 6 governance axes. It provides a composite score from 0 to 100, a 6-axis radar visualization, and a personalized action plan." },
        { q: "What are the 6 axes of the ACF Score?", a: "The 6 axes are: (1) Decisional Autonomy, (2) Algorithmic Transparency, (3) Operational Resilience, (4) Regulatory Compliance, (5) Ethics & Responsibility, (6) Performance & Optimization. Each axis contains 3 specific KPIs." },
        { q: "How is the ACF Score calculated?", a: "The score is calculated from diagnostic responses evaluated across 6 axes with 3 KPIs each (18 total). Each KPI is weighted by sovereignty impact. The final score ranges 0-100: 0-25 (Critical), 26-50 (Developing), 51-75 (Mastered), 76-100 (Excellence)." },
        { q: "How long does the ACF Score diagnostic take?", a: "The complete diagnostic takes less than 10 minutes with structured questions across all 6 governance axes. Results are available immediately with a detailed action plan and prioritized recommendations." },
        { q: "Is the ACF Score diagnostic free?", a: "The basic diagnostic is freely accessible on acf-score.com. It provides your overall score and radar visualization. Premium options are available for detailed reports with personalized recommendations and sector benchmarks." },
        { q: "Who is the ACF Score for?", a: "The ACF Score is for any organization using or planning to use AI agents: innovation directors, compliance officers, CTOs, AI startup CEOs, and digital transformation consultants." },
        { q: "What's the difference between ACF Score and ACF Control?", a: "ACF Score is a point-in-time diagnostic evaluating governance maturity. ACF Control is a continuous monitoring platform tracking 18 KPIs in real time with adaptive gating and automatic alerts. Score diagnoses, Control governs daily." },
      ],
    },
    /* -- TAB 5 -- */
    {
      label: "ACF Control",
      questions: [
        { q: "What is ACF Control?", a: "ACF Control is the real-time governance platform monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation. It's the command center for agentic governance — real-time dashboard, smart alerts, and tamper-proof audit logs." },
        { q: "How does adaptive gating work?", a: "Adaptive gating defines dynamic thresholds per KPI. When an AI agent approaches or exceeds a threshold, the system can: alert the operator, restrict the agent's decision perimeter, suspend actions, or escalate to a human." },
        { q: "What is the ACF Emergency Stop Protocol?", a: "A 3-level interrupt mechanism: Level 1 (Operational pause, < 30s) — non-critical suspension, Level 2 (Decision stop, < 5s) — total agent decision suspension, Level 3 (Full system stop, < 1s) — complete shutdown with manual fallback." },
        { q: "Which KPIs does ACF Control monitor?", a: "ACF Control monitors 18 proprietary KPIs across the 6 ACF governance axes. Each axis has 3 specific indicators continuously measuring your organization's decisional sovereignty." },
        { q: "Does ACF Control integrate with existing systems?", a: "Yes, ACF Control integrates via API with major AI agent environments: LangChain, AutoGPT, CrewAI, Microsoft Copilot, Salesforce Einstein, and proprietary solutions. The architecture is agnostic." },
        { q: "Are ACF Control logs tamper-proof?", a: "Yes, using cryptographic hashing to ensure audit log integrity. Every agent action, decision, and human intervention is timestamped and chained. Essential for EU AI Act compliance (Article 12 on record-keeping)." },
        { q: "Can alert thresholds be customized?", a: "Absolutely. Each organization configures thresholds per KPI based on sector, risk appetite, and regulatory requirements. Pre-configured sector profiles (finance, healthcare, e-commerce) accelerate deployment." },
      ],
    },
    /* -- TAB 6 -- */
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
    /* -- TAB 7 -- */
    {
      label: "ACF Sertifikasyon",
      questions: [
        { q: "What is ACF Certification?", a: "ACF Certification is an independent attestation of compliance with the ACF governance standard. It demonstrates your organization has implemented required processes, tools, and practices to govern autonomous AI agents responsibly. A trust signal for clients, partners, and regulators." },
        { q: "What are the 3 certification levels?", a: "Level 1 (Foundation) — basic governance, first ACF modules, documented processes. Level 2 (Advanced) — active KPI monitoring, operational adaptive gating, tested emergency stop. Level 3 (Excellence) — complete governance, continuous audit, demonstrated EU AI Act compliance." },
        { q: "How to obtain ACF Certification?", a: "The process includes: (1) Self-assessment via ACF Score, (2) Application with governance documentation, (3) Independent audit by accredited ACF assessor, (4) Remediation if needed, (5) Publicly verifiable badge issuance. Typically 3-6 months." },
        { q: "How much does ACF Certification cost?", a: "Cost varies by certification level, organization size, and number of AI systems to audit. Contact us for a personalized quote. Adapted rates available for startups and SMEs." },
        { q: "How long is certification valid?", a: "ACF Certification is valid for 12 months with annual renewal including follow-up audit and governance practice verification." },
        { q: "Is certification publicly verifiable?", a: "Yes. Each certified organization receives a digital badge with unique identifier and verification URL. Anyone can verify validity and level in real time on the ACF portal." },
      ],
    },
    /* -- TAB 8 -- */
    {
      label: "Uygulama & Olgunluk",
      questions: [
        { q: "What are the 4 ACF maturity levels?", a: "Level 0 (Classical Automation) — fixed rules, no ML. Level 1 (Assisted Agents) — agents recommend, humans decide. Level 2 (Governed Agents) — agents decide within strict governance, recommended target. Level 3 (Supervised Autonomy) — agents decide and learn, maximum governance required." },
        { q: "How long to implement ACF?", a: "Full implementation takes 6-18 months. Foundational modules (M01-M03) can deploy in 2-3 months for immediate governance. Progressive deployment adapts to your existing maturity and system complexity." },
        { q: "Is ACF suitable for startups and SMEs?", a: "Absolutely. ACF scales to all organization sizes. Startups benefit from structured governance from the start (Governance by Design). The 8 modules deploy progressively. Adapted pricing available." },
        { q: "Do all 8 modules need implementing at once?", a: "No. Start with 3 foundational modules: M01 (Mapping), M02 (Risk Classification), M03 (Mandates). Add subsequent modules as agentic maturity evolves. Each module delivers standalone value." },
        { q: "How to get started with ACF?", a: "Four simple steps: (1) Check your EU AI Act compliance with the free ACF AI Act Checker, (2) Assess your governance with the ACF Score diagnostic on acf-score.com, (3) Download the ACF whitepaper to understand the complete framework, (4) Contact our team for personalized guidance." },
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
    ctaTitle: "Vous n'avez pas trouvé votre réponse ?",
    ctaBtn: "Contactez-nous",
    ctaChecker: "Tester l'ACF AI Act Checker",
    ctaScore: "Faire mon diagnostic ACF Score",
    navHome: "Accueil", navStandard: "Le Standard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partenaires", navFaq: "FAQ", navCta: "Contact",
  },
  en: {
    heroTitle: "FAQ",
    heroSub: "Everything you need to know about the Agentic Commerce Framework\u00ae, AI governance, the EU AI Act, and our tools.",
    ctaTitle: "Didn't find your answer?",
    ctaBtn: "Contact us",
    ctaChecker: "Try the ACF AI Act Checker",
    ctaScore: "Take the ACF Score diagnostic",
    navHome: "Home", navStandard: "The Standard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partners", navFaq: "FAQ", navCta: "Contact",
  },
  es: {
    heroTitle: "FAQ",
    heroSub: "Todo lo que necesitas saber sobre el Agentic Commerce Framework\u00ae, la gobernanza de IA, la EU AI Act y nuestras herramientas.",
    ctaTitle: "\u00bfNo encontraste tu respuesta?",
    ctaBtn: "Cont\u00e1ctenos",
    ctaChecker: "Probar el ACF AI Act Checker",
    ctaScore: "Hacer mi diagnóstico ACF Score",
    navHome: "Inicio", navStandard: "El Estándar", navScore: "ACF Score", navBlog: "Blog", navPartners: "Socios", navFaq: "FAQ", navCta: "Contact",
  },
  de: {
    heroTitle: "FAQ",
    heroSub: "Alles, was Sie \u00fcber das Agentic Commerce Framework\u00ae, KI-Governance, den EU AI Act und unsere Tools wissen m\u00fcssen.",
    ctaTitle: "Keine Antwort gefunden?",
    ctaBtn: "Kontaktieren Sie uns",
    ctaChecker: "ACF AI Act Checker testen",
    ctaScore: "ACF Score Diagnose starten",
    navHome: "Startseite", navStandard: "Der Standard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partner", navFaq: "FAQ", navCta: "Contact",
  },
  pt: {
    heroTitle: "FAQ",
    heroSub: "Tudo o que precisa saber sobre o Agentic Commerce Framework\u00ae, governan\u00e7a de IA, o EU AI Act e as nossas ferramentas.",
    ctaTitle: "N\u00e3o encontrou a sua resposta?",
    ctaBtn: "Contacte-nos",
    ctaChecker: "Testar o ACF AI Act Checker",
    ctaScore: "Fazer o diagnóstico ACF Score",
    navHome: "Início", navStandard: "O Padrão", navScore: "ACF Score", navBlog: "Blog", navPartners: "Parceiros", navFaq: "FAQ", navCta: "Contact",
  },
  it: {
    heroTitle: "FAQ",
    heroSub: "Tutto quello che devi sapere sull'Agentic Commerce Framework\u00ae, la governance IA, l'EU AI Act e i nostri strumenti.",
    ctaTitle: "Non hai trovato la tua risposta?",
    ctaBtn: "Contattaci",
    ctaChecker: "Provare l'ACF AI Act Checker",
    ctaScore: "Fare la diagnosi ACF Score",
    navHome: "Home", navStandard: "Lo Standard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partner", navFaq: "FAQ", navCta: "Contact",
  },
  nl: {
    heroTitle: "FAQ",
    heroSub: "Alles wat u moet weten over het Agentic Commerce Framework\u00ae, AI-governance, de EU AI Act en onze tools.",
    ctaTitle: "Geen antwoord gevonden?",
    ctaBtn: "Neem contact op",
    ctaChecker: "ACF AI Act Checker testen",
    ctaScore: "ACF Score diagnose starten",
    navHome: "Home", navStandard: "De Standaard", navScore: "ACF Score", navBlog: "Blog", navPartners: "Partners", navFaq: "FAQ", navCta: "Contact",
  },
  ja: {
    heroTitle: "FAQ",
    heroSub: "Agentic Commerce Framework\u00ae\u3001AI\u30ac\u30d0\u30ca\u30f3\u30b9\u3001EU AI Act\u3001\u30c4\u30fc\u30eb\u306b\u3064\u3044\u3066\u77e5\u3063\u3066\u304a\u304f\u3079\u304d\u3059\u3079\u3066\u3002",
    ctaTitle: "\u56de\u7b54\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u304b\uff1f",
    ctaBtn: "\u304a\u554f\u3044\u5408\u308f\u305b",
    ctaChecker: "ACF AI Act Checkerを試す",
    ctaScore: "ACF Scoreの診断を受ける",
    navHome: "ホーム", navStandard: "スタンダード", navScore: "ACF Score", navBlog: "ブログ", navPartners: "パートナー", navFaq: "FAQ", navCta: "Contact",
  },
  zh: {
    heroTitle: "FAQ",
    heroSub: "\u5173\u4e8eAgentic Commerce Framework\u00ae\u3001AI\u6cbb\u7406\u3001EU AI Act\u548c\u6211\u4eec\u5de5\u5177\u7684\u6240\u6709\u4fe1\u606f\u3002",
    ctaTitle: "\u6ca1\u6709\u627e\u5230\u7b54\u6848\uff1f",
    ctaBtn: "\u8054\u7cfb\u6211\u4eec",
    ctaChecker: "试用ACF AI Act Checker",
    ctaScore: "进行ACF Score诊断",
    navHome: "首页", navStandard: "标准", navScore: "ACF Score", navBlog: "博客", navPartners: "合作伙伴", navFaq: "FAQ", navCta: "Contact",
  },
  ko: {
    heroTitle: "FAQ",
    heroSub: "Agentic Commerce Framework\u00ae, AI \uac70\ubc84\ub10c\uc2a4, EU AI Act \ubc0f \ub3c4\uad6c\uc5d0 \ub300\ud574 \uc54c\uc544\uc57c \ud560 \ubaa8\ub4e0 \uac83.",
    ctaTitle: "\ub2f5\ubcc0\uc744 \ucc3e\uc9c0 \ubabb\ud558\uc168\ub098\uc694?",
    ctaBtn: "\ubb38\uc758\ud558\uae30",
    ctaChecker: "ACF AI Act Checker 시도",
    ctaScore: "ACF Score 진단 받기",
    navHome: "홈", navStandard: "표준", navScore: "ACF Score", navBlog: "블로그", navPartners: "파트너", navFaq: "FAQ", navCta: "Contact",
  },
  ru: {
    heroTitle: "FAQ",
    heroSub: "\u0412\u0441\u0451, \u0447\u0442\u043e \u043d\u0443\u0436\u043d\u043e \u0437\u043d\u0430\u0442\u044c \u043e\u0431 Agentic Commerce Framework\u00ae, \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0438 \u0418\u0418, EU AI Act \u0438 \u043d\u0430\u0448\u0438\u0445 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u0430\u0445.",
    ctaTitle: "\u041d\u0435 \u043d\u0430\u0448\u043b\u0438 \u043e\u0442\u0432\u0435\u0442?",
    ctaBtn: "\u0421\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u043d\u0430\u043c\u0438",
    ctaChecker: "Попробовать ACF AI Act Checker",
    ctaScore: "Пройти диагностику ACF Score",
    navHome: "Главная", navStandard: "Стандарт", navScore: "ACF Score", navBlog: "Блог", navPartners: "Партнёры", navFaq: "FAQ", navCta: "Contact",
  },
  ar: {
    heroTitle: "FAQ",
    heroSub: "\u0643\u0644 \u0645\u0627 \u062a\u062d\u062a\u0627\u062c \u0645\u0639\u0631\u0641\u062a\u0647 \u0639\u0646 Agentic Commerce Framework\u00ae \u0648\u062d\u0648\u0643\u0645\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u0649 \u0648\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u0649 \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u0649 \u0648\u0623\u062f\u0648\u0627\u062a\u0646\u0627.",
    ctaTitle: "\u0644\u0645 \u062a\u062c\u062f \u0625\u062c\u0627\u0628\u062a\u0643\u061f",
    ctaBtn: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
    ctaChecker: "جرب ACF AI Act Checker",
    ctaScore: "قم بتشخيص ACF Score",
    navHome: "الرئيسية", navStandard: "المعيار", navScore: "ACF Score", navBlog: "المدونة", navPartners: "الشركاء", navFaq: "FAQ", navCta: "Contact",
  },
  tr: {
    heroTitle: "FAQ",
    heroSub: "Agentic Commerce Framework\u00ae, yapay zeka y\u00f6neti\u015fimi, EU AI Act ve ara\u00e7lar\u0131m\u0131z hakk\u0131nda bilmeniz gereken her \u015fey.",
    ctaTitle: "Cevab\u0131n\u0131z\u0131 bulamad\u0131n\u0131z m\u0131?",
    ctaBtn: "Bize ula\u015f\u0131n",
    ctaChecker: "ACF AI Act Checker'ı deneyin",
    ctaScore: "ACF Score tanılama yapın",
    navHome: "Ana Sayfa", navStandard: "Standart", navScore: "ACF Score", navBlog: "Blog", navPartners: "İş Ortakları", navFaq: "FAQ", navCta: "Contact",
  },
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function FaqPage() {
  const locale = useLocale();
  const lang = faqData[locale] ? locale : "en";
  const t = uiStrings[locale] || uiStrings.en;
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

      {/* ── NAV — Full site header ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 72,
          background: "rgba(5,12,26,.92)",
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${C.goldBorder}`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href={`/${locale}/`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div
              style={{
                width: 40, height: 40,
                background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`,
                borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1,
              }}
            >
              ACF
            </div>
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

      {/* ── HERO ── */}
      <section
        style={{
          background: C.navy1,
          padding: "140px 0 60px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px" }}>
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
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
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
