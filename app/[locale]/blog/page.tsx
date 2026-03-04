"use client";

import React, { useState, useEffect } from "react";

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", green: "#22c55e", blue: "#3b82f6",
  amber: "#f59e0b", purple: "#8b5cf6", red: "#ef4444",
};

function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12 }}>// {children}</div>;
}
function GoldBar() { return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, margin: "0 auto 16px" }} />; }

type Article = {
  slug: string; title: string; excerpt: string; date: string;
  category: string; catColor: string; readTime: string;
  content: { type: "h2" | "h3" | "p" | "quote" | "list"; text: string }[];
};

const articles: Article[] = [
  {
    slug: "eu-ai-act-agentic-systems-2026",
    title: "Comment l'EU AI Act s'applique aux systèmes agentiques en 2026",
    excerpt: "L'approche par le risque de l'AI Act crée des obligations spécifiques pour les agents autonomes. Voici ce que couvre la gouvernance ACF de niveau 2.",
    date: "2026-02-15", category: "RÉGLEMENTATION", catColor: C.amber, readTime: "8 min",
    content: [
      { type: "p", text: "L'entrée en vigueur progressive de l'AI Act européen en 2025-2026 marque un tournant pour les organisations déployant des agents IA autonomes. Pour la première fois, un cadre réglementaire impose des obligations spécifiques sur les systèmes d'IA à haut risque — et les agents autonomes de commerce en font souvent partie." },
      { type: "h2", text: "Les agents autonomes dans la classification de l'AI Act" },
      { type: "p", text: "L'AI Act classe les systèmes d'IA en quatre niveaux de risque : inacceptable, haut, limité et minimal. Les agents autonomes de commerce, qui prennent des décisions de pricing, de procurement ou d'engagement client, tombent fréquemment dans la catégorie « haut risque » dès lors qu'ils impactent des décisions économiques significatives." },
      { type: "p", text: "Concrètement, un agent qui ajuste automatiquement les prix en fonction de la demande, gère la chaîne d'approvisionnement ou engage des dépenses marketing de manière autonome doit répondre à des exigences strictes de transparence, de traçabilité et de supervision humaine." },
      { type: "h2", text: "Les 5 obligations clés pour les agents à haut risque" },
      { type: "list", text: "Système de gestion des risques : évaluation continue des risques posés par l'agent autonome, avec documentation actualisée.|Gouvernance des données : qualité, pertinence et représentativité des données d'entraînement et de fonctionnement.|Documentation technique : description complète du fonctionnement, des limites et des performances de l'agent.|Transparence : les utilisateurs doivent savoir qu'ils interagissent avec un système d'IA et comprendre ses capacités.|Supervision humaine : capacité d'intervention, de correction et d'interruption par un opérateur humain qualifié." },
      { type: "h2", text: "Comment l'ACF® répond à ces exigences" },
      { type: "p", text: "L'Agentic Commerce Framework® a été conçu dès l'origine pour s'aligner avec les exigences de l'AI Act. La couche Gouvernance (Layer 1) établit la constitution agentique et la cartographie des responsabilités. La couche Politique (Layer 2) formalise les règles et limites comportementales des agents. La couche Système (Layer 3) implémente les mécanismes techniques de contrôle et de logging. La couche Supervision (Layer 4) assure le monitoring continu et les revues périodiques." },
      { type: "quote", text: "Sans cadre de gouvernance formalisé, la conformité à l'AI Act restera un exercice théorique. L'ACF® transforme ces obligations en processus opérationnels." },
      { type: "h2", text: "Sanctions et calendrier" },
      { type: "p", text: "Les sanctions prévues par l'AI Act peuvent atteindre 35 millions d'euros ou 7% du chiffre d'affaires mondial annuel. Les premières obligations de transparence s'appliquent dès 2025, tandis que les exigences complètes pour les systèmes à haut risque entreront en vigueur progressivement en 2026-2027." },
      { type: "p", text: "Les organisations qui attendent la mise en application pour structurer leur gouvernance agentique prennent un risque considérable. La mise en conformité nécessite du temps : cartographier les agents, définir les politiques, implémenter les contrôles techniques et former les équipes." },
      { type: "h3", text: "Action recommandée" },
      { type: "p", text: "Réalisez votre diagnostic ACF Score® gratuit pour évaluer votre niveau de préparation actuel, puis engagez un plan de mise en conformité structuré autour des 4 couches ACF®." },
    ]
  },
  {
    slug: "delegated-decision-agent-officer",
    title: "Le DDA : pourquoi chaque entreprise IA-native a besoin d'un Delegated Decision Agent Officer",
    excerpt: "Le DDA est le gardien légal de vos agents autonomes. Comment créer et responsabiliser ce rôle critique au sein de votre organisation.",
    date: "2026-02-08", category: "GOUVERNANCE", catColor: C.green, readTime: "7 min",
    content: [
      { type: "p", text: "À mesure que les agents IA autonomes prennent des décisions de plus en plus critiques — pricing, approvisionnement, engagement client, gestion budgétaire — une question fondamentale émerge : qui est responsable quand un agent prend une mauvaise décision ?" },
      { type: "h2", text: "Le vide de responsabilité agentique" },
      { type: "p", text: "Dans une organisation traditionnelle, chaque décision a un propriétaire identifiable. Un directeur commercial décide des prix. Un responsable achats valide les commandes. Un directeur marketing approuve les campagnes. Avec l'autonomie agentique, ces décisions sont déléguées à des systèmes qui opèrent à une vitesse et une échelle impossibles pour un humain." },
      { type: "p", text: "Le problème n'est pas technique — c'est organisationnel. Qui répond devant le régulateur ? Qui est convoqué lors d'un audit ? Qui a l'autorité pour interrompre un agent qui dérive ? Sans réponse claire, l'organisation s'expose à un risque juridique et opérationnel majeur." },
      { type: "h2", text: "Le rôle du Delegated Decision Agent Officer (DDA)" },
      { type: "p", text: "L'ACF® introduit le concept de DDA : un rôle de gouvernance nommé, responsable de la supervision des décisions autonomes au sein de l'organisation. Ce n'est pas un rôle technique — c'est un rôle de gouvernance stratégique." },
      { type: "list", text: "Responsabilité nommée : le DDA est la personne identifiable qui répond des décisions prises par les agents autonomes.|Autorité d'interruption : le DDA a le pouvoir et les moyens techniques d'interrompre tout agent à tout moment.|Cadrage des politiques : le DDA définit et valide les règles de comportement de chaque agent.|Reporting régulier : le DDA produit des revues périodiques de gouvernance pour la direction.|Interface réglementaire : le DDA est l'interlocuteur principal en cas d'audit ou de contrôle." },
      { type: "h2", text: "Profil et positionnement" },
      { type: "p", text: "Le DDA idéal combine une compréhension business (stratégie, risques, réglementation) avec une culture technique suffisante pour dialoguer avec les équipes IA. Il se positionne au niveau direction, reportant directement au CEO ou au COO. Ce n'est ni un CTO ni un compliance officer — c'est un rôle hybride nouveau, adapté à l'ère agentique." },
      { type: "quote", text: "Le DDA n'est pas celui qui construit les agents. C'est celui qui s'assure que les agents construisent ce que l'organisation a décidé." },
      { type: "h2", text: "Implémentation avec l'ACF®" },
      { type: "p", text: "La Layer 1 (Gouvernance) de l'ACF® fournit le cadre pour définir, nommer et mandater le DDA. Le diagnostic ACF Score® évalue si votre organisation a déjà identifié ce rôle — c'est l'un des critères les plus discriminants du scoring." },
    ]
  },
  {
    slug: "three-level-kill-switch",
    title: "Concevoir un Kill Switch à trois niveaux pour les systèmes d'agents autonomes",
    excerpt: "Un kill switch efficace n'est pas un simple bouton. L'ACF® spécifie trois niveaux d'interruption avec des temps de réponse définis.",
    date: "2026-01-29", category: "TECHNIQUE", catColor: C.blue, readTime: "10 min",
    content: [
      { type: "p", text: "L'interruptibilité est l'un des principes fondamentaux de la gouvernance agentique. Un agent IA autonome qui ne peut pas être arrêté de manière fiable et rapide représente un risque existentiel pour l'organisation qui le déploie. Pourtant, la plupart des implémentations actuelles se limitent à un bouton « stop » rudimentaire." },
      { type: "h2", text: "Pourquoi un seul bouton ne suffit pas" },
      { type: "p", text: "Un agent autonome complexe opère sur plusieurs systèmes simultanément : il peut être en train de négocier un prix fournisseur, d'ajuster une campagne publicitaire et de répondre à un client en même temps. Un arrêt brutal de toutes ces opérations peut causer autant de dommages que la dérive qu'on cherche à corriger — commandes abandonnées, engagements non tenus, incohérences de données." },
      { type: "h2", text: "L'architecture Kill Switch ACF® à 3 niveaux" },
      { type: "h3", text: "Niveau 1 — Pause (temps de réponse : < 1 seconde)" },
      { type: "p", text: "Suspension immédiate de toute nouvelle décision. Les opérations en cours se terminent normalement, mais aucune nouvelle action n'est initiée. L'agent passe en mode observation pure. Idéal pour : suspicion de dérive légère, besoin de vérification humaine ponctuelle." },
      { type: "h3", text: "Niveau 2 — Containment (temps de réponse : < 5 secondes)" },
      { type: "p", text: "Les opérations en cours sont achevées avec des paramètres de sécurité renforcés (limites de prix réduites, volumes plafonnés, approbation requise). Aucune nouvelle opération. Log complet de toutes les actions terminées. Idéal pour : dérive confirmée mais non critique, investigation en cours." },
      { type: "h3", text: "Niveau 3 — Kill (temps de réponse : < 30 secondes)" },
      { type: "p", text: "Arrêt total et immédiat de toutes les opérations, y compris celles en cours. Rollback automatique des actions réversibles. Notification immédiate au DDA et à toutes les parties prenantes. Snapshot complet de l'état du système pour analyse post-mortem. Idéal pour : situation de crise, perte de contrôle confirmée, risque financier ou réglementaire immédiat." },
      { type: "h2", text: "Implémentation technique" },
      { type: "p", text: "Chaque niveau doit être implémenté avec des mécanismes indépendants. Le Niveau 1 utilise un flag de configuration temps réel. Le Niveau 2 requiert un système de circuit-breaker avec des seuils de sécurité prédéfinis. Le Niveau 3 nécessite un mécanisme de coupure réseau et de rollback transactionnel." },
      { type: "quote", text: "Un kill switch qui n'a jamais été testé n'est pas un kill switch — c'est une promesse. L'ACF® exige des tests trimestriels de chaque niveau d'interruption." },
      { type: "p", text: "La Layer 3 (Système) de l'ACF® détaille les spécifications techniques complètes pour chaque niveau, incluant les protocoles de test, les critères de déclenchement et les procédures de reprise d'activité." },
    ]
  },
  {
    slug: "agentic-commerce-5-trillion-opportunity",
    title: "Le commerce agentique : une opportunité à $5 000 milliards qui exige une gouvernance",
    excerpt: "McKinsey estime le marché du commerce agentique entre 3 et 5 000 milliards de dollars d'ici 2030. Sans gouvernance, cette opportunité devient un risque systémique.",
    date: "2026-01-22", category: "MARCHÉ", catColor: C.purple, readTime: "6 min",
    content: [
      { type: "p", text: "Le commerce agentique — où des agents IA autonomes recherchent, comparent, négocient et achètent au nom des consommateurs et des entreprises — est en train de redéfinir les fondamentaux du commerce mondial. Les estimations les plus sérieuses positionnent ce marché entre 3 et 5 000 milliards de dollars d'ici 2030." },
      { type: "h2", text: "Ce qui change fondamentalement" },
      { type: "p", text: "Pendant 25 ans, le commerce digital a été conçu pour des humains qui naviguent, comparent et cliquent. Le commerce agentique inverse cette logique : l'intention est exprimée une fois, l'exécution est déléguée. Le consommateur ne parcourt plus des pages de résultats — il dit à son agent « trouve-moi des bottes d'hiver imperméables à moins de 150€, livrées avant vendredi » et l'agent fait le reste." },
      { type: "p", text: "Pour les entreprises, cela signifie que le « client » n'est plus un humain qui visite votre site — c'est un agent qui interroge votre API. Les critères de décision passent de l'émotion et du branding à la structuration des données, la fiabilité transactionnelle et la vérifiabilité des informations produit." },
      { type: "h2", text: "L'impératif de gouvernance" },
      { type: "p", text: "Cette transformation crée un paradoxe : pour capturer l'opportunité du commerce agentique, les organisations doivent déléguer plus de décisions à des agents autonomes. Mais sans gouvernance structurée, cette délégation crée des risques existentiels — pricing non contrôlé, engagements non autorisés, dépendance aux plateformes tierces." },
      { type: "quote", text: "L'opportunité de $5 000 milliards n'ira pas aux organisations qui ont les meilleurs agents — elle ira à celles qui gouvernent le mieux leurs agents." },
      { type: "h2", text: "Les 3 piliers de compétitivité agentique" },
      { type: "list", text: "Découvrabilité agentique : vos produits et services sont-ils structurés pour être compris et évalués par des agents IA ? Données structurées, APIs ouvertes, informations vérifiables.|Fiabilité transactionnelle : vos systèmes permettent-ils à des agents de compléter des transactions de bout en bout de manière fiable et sécurisée ?|Gouvernance de confiance : pouvez-vous démontrer à vos clients, partenaires et régulateurs que vos agents opèrent dans un cadre de gouvernance structuré et auditable ?" },
      { type: "p", text: "L'ACF® fournit le cadre méthodologique pour le troisième pilier — et influence directement les deux premiers. Une organisation qui a formalisé sa gouvernance agentique est naturellement mieux positionnée pour structurer sa découvrabilité et sa fiabilité transactionnelle." },
    ]
  },
  {
    slug: "4-layers-acf-governance-explained",
    title: "Les 4 couches de la gouvernance ACF® expliquées",
    excerpt: "Architecture complète du framework en 4 couches : Gouvernance, Politique, Système et Supervision. Comment elles s'articulent et pourquoi chacune est indispensable.",
    date: "2026-01-15", category: "MÉTHODOLOGIE", catColor: C.gold, readTime: "12 min",
    content: [
      { type: "p", text: "L'Agentic Commerce Framework® repose sur une architecture en 4 couches de gouvernance. Chaque couche a un rôle distinct, des livrables spécifiques et des interactions définies avec les autres couches. C'est cette structuration qui différencie l'ACF® d'une simple check-list de bonnes pratiques." },
      { type: "h2", text: "Layer 1 — Gouvernance : le « qui »" },
      { type: "p", text: "La couche Gouvernance est le fondement stratégique de tout l'édifice. Elle répond aux questions de responsabilité et d'autorité : qui gouverne les agents ? Qui est responsable de leurs décisions ? Qui a l'autorité de les modifier, les restreindre ou les arrêter ?" },
      { type: "list", text: "Constitution agentique : document fondateur qui définit les principes de gouvernance de l'organisation en matière d'IA autonome.|Sponsor de gouvernance nommé : personne identifiable au niveau direction, responsable de la gouvernance agentique.|Cartographie des autorités de décision : pour chaque type de décision déléguée à un agent, identification de l'humain référent.|Protocoles d'escalade : définition précise des critères et des chemins d'escalade pour chaque niveau de risque." },
      { type: "h2", text: "Layer 2 — Politique : le « quoi »" },
      { type: "p", text: "La couche Politique transforme les principes de gouvernance en règles opérationnelles. Elle formalise ce que les agents peuvent et ne peuvent pas faire, avec quelles limites et dans quelles conditions." },
      { type: "list", text: "Politiques comportementales par agent : pour chaque agent déployé, documentation des actions autorisées, interdites et conditionnelles.|Limites d'autonomie : seuils financiers, temporels et opérationnels au-delà desquels l'approbation humaine est requise.|Alignement réglementaire : mapping explicite entre chaque politique d'agent et les exigences réglementaires applicables (AI Act, RGPD, sectorielles).|Cadres éthiques de décision : principes directeurs pour les situations ambiguës non couvertes par les règles explicites." },
      { type: "h2", text: "Layer 3 — Système : le « comment »" },
      { type: "p", text: "La couche Système est l'infrastructure technique qui rend la gouvernance opérationnelle. Sans elle, les deux premières couches restent des documents théoriques." },
      { type: "list", text: "Kill switch à 3 niveaux : mécanismes d'interruption gradués avec temps de réponse garantis (voir notre article dédié).|Architecture de traçabilité : logging exhaustif de toutes les décisions autonomes, avec horodatage, contexte et justification algorithmique.|Règles de coordination multi-agents : protocoles d'interaction entre agents pour éviter les conflits, les boucles et les optimisations contradictoires.|Protocoles d'interruptibilité : tests réguliers de chaque mécanisme d'arrêt pour garantir leur fiabilité en situation réelle." },
      { type: "h2", text: "Layer 4 — Supervision : le « en continu »" },
      { type: "p", text: "La couche Supervision assure que la gouvernance reste vivante et adaptée. C'est la couche qui transforme un framework statique en système d'amélioration continue." },
      { type: "list", text: "Dashboard ACF Control : monitoring temps réel des agents, de leurs décisions et de leur conformité aux politiques définies.|Revues trimestrielles : évaluation formelle de la posture de gouvernance, avec scoring ACF® actualisé et plan d'action.|Procédures de réponse aux incidents : processus documenté pour gérer les situations de dérive, d'erreur ou de crise agentique.|Tracking du score de souveraineté : suivi longitudinal de l'indépendance de l'organisation vis-à-vis des plateformes tierces." },
      { type: "quote", text: "Les 4 couches ACF® ne sont pas séquentielles — elles sont systémiques. Un déficit dans une couche affaiblit l'ensemble du dispositif." },
      { type: "h2", text: "L'évaluation par le Score ACF®" },
      { type: "p", text: "Le diagnostic ACF Score® évalue votre organisation sur chacune de ces 4 couches, avec un scoring détaillé qui identifie vos forces et vos lacunes. Le résultat n'est pas un simple chiffre — c'est une cartographie de votre maturité de gouvernance agentique avec des actions prioritaires pour chaque couche." },
    ]
  },
  {
    slug: "sovereignty-vs-efficiency-false-dilemma",
    title: "Souveraineté vs. efficacité : le faux dilemme de l'autonomie IA",
    excerpt: "On vous dit que gouverner les agents IA ralentit l'innovation. C'est faux. Voici pourquoi les organisations les mieux gouvernées seront les plus compétitives.",
    date: "2026-01-08", category: "STRATÉGIE", catColor: C.amber, readTime: "7 min",
    content: [
      { type: "p", text: "L'objection la plus fréquente face à la gouvernance agentique est prévisible : « Mettre des contraintes sur nos agents IA va nous ralentir. Nos concurrents qui ne gouvernent pas seront plus rapides. » C'est un argument séduisant. Il est aussi profondément erroné." },
      { type: "h2", text: "Le mythe de la vitesse non gouvernée" },
      { type: "p", text: "Un agent IA autonome sans gouvernance n'est pas « rapide » — il est incontrôlé. La rapidité sans direction n'est pas de la performance, c'est du bruit. Un agent qui optimise un prix localement mais détruit la marge globalement n'est pas efficace. Un agent qui conclut 1 000 transactions par jour dont 5% devront être annulées manuellement n'est pas productif." },
      { type: "p", text: "Les données montrent le contraire de l'intuition : les organisations avec une gouvernance formalisée de leurs agents IA ont des taux d'incident 73% plus bas, des coûts de correction 4x inférieurs et des temps de déploiement de nouveaux agents 2x plus rapides — parce que le cadre est déjà en place." },
      { type: "h2", text: "La gouvernance comme accélérateur" },
      { type: "p", text: "La gouvernance agentique n'est pas un frein — c'est un accélérateur structurel. Pensez à une autoroute : les règles de conduite (vitesse maximale, voies, signalisation) ne ralentissent pas le trafic. Elles permettent à des millions de véhicules de circuler simultanément à haute vitesse sans chaos." },
      { type: "list", text: "Déploiement accéléré : quand le cadre de gouvernance est établi, chaque nouvel agent peut être déployé dans un environnement déjà sécurisé. Pas de réinvention de la roue.|Confiance stakeholder : clients, partenaires et régulateurs font confiance aux organisations qui démontrent une gouvernance structurée. Cette confiance ouvre des marchés.|Résilience opérationnelle : une dérive détectée et contenue en 30 secondes n'a pas le même impact qu'une dérive découverte après 3 semaines.|Attractivité talents : les meilleurs ingénieurs IA veulent travailler dans des environnements structurés, pas dans le chaos." },
      { type: "h2", text: "Le vrai dilemme" },
      { type: "p", text: "Le vrai choix n'est pas entre souveraineté et efficacité. C'est entre gouvernance proactive et gouvernance réactive. L'une coûte un investissement structurel anticipé. L'autre coûte des millions en gestion de crise, sanctions réglementaires et perte de confiance." },
      { type: "quote", text: "Les organisations qui gouvernent leurs agents IA ne sont pas plus lentes. Elles sont plus rapides — parce qu'elles ne s'arrêtent pas pour éteindre des incendies." },
      { type: "p", text: "Le Score ACF® mesure précisément cet équilibre entre autonomie agentique et contrôle de gouvernance. Les organisations avec les scores les plus élevés ne sont pas les plus conservatrices — ce sont les plus structurées." },
    ]
  },
];

const categoryFilters = ["TOUS", "RÉGLEMENTATION", "GOUVERNANCE", "TECHNIQUE", "MARCHÉ", "MÉTHODOLOGIE", "STRATÉGIE"];

export default function BlogPage() {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [filter, setFilter] = useState("TOUS");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && articles.find(a => a.slug === hash)) setActiveArticle(hash);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [activeArticle]);

  const filtered = filter === "TOUS" ? articles : articles.filter(a => a.category === filter);
  const current = articles.find(a => a.slug === activeArticle);

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.1s}
        .fade-up-d2{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.25s}
        .gold-glow:hover{box-shadow:0 0 20px rgba(201,168,76,.2)}
        *{box-sizing:border-box;margin:0;padding:0}a{text-decoration:none;color:inherit}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/en/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>BLOG</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/en/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>← Accueil</a>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score →</a>
          </div>
        </div>
      </nav>

      {!current ? (
        <>
          {/* LISTING HERO */}
          <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
            <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
              <div className="fade-up"><Badge>BLOG & RECHERCHE</Badge></div>
              <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, lineHeight: 1.1, marginTop: 24, marginBottom: 14, letterSpacing: "-1px" }}>
                Gouvernance <span style={{ color: C.gold }}>agentique</span>
              </h1>
              <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
                Recherche, méthodologie et perspectives sur la gouvernance des agents IA autonomes.
              </p>
            </div>
          </section>

          {/* FILTERS */}
          <section style={{ padding: "0 0 40px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {categoryFilters.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  padding: "8px 16px", borderRadius: 100, border: `1px solid ${filter === cat ? C.goldBorder : C.bd1}`,
                  background: filter === cat ? C.goldDim : "transparent", color: filter === cat ? C.gold : C.gray,
                  fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".05em", transition: "all .2s",
                }}>{cat}</button>
              ))}
            </div>
          </section>

          {/* ARTICLES GRID */}
          <section style={{ padding: "0 0 80px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {filtered.map(a => (
                <article key={a.slug} onClick={() => { setActiveArticle(a.slug); window.location.hash = a.slug; }} style={{
                  background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 32, cursor: "pointer", transition: "all .3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.catColor}40`; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${a.catColor}12`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: a.catColor, letterSpacing: ".1em", background: `${a.catColor}15`, border: `1px solid ${a.catColor}30`, padding: "4px 10px", borderRadius: 100 }}>{a.category}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.gray }}>{a.readTime}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>{a.title}</h2>
                  <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.65, marginBottom: 16 }}>{a.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray }}>{a.date}</span>
                    <span style={{ color: C.gold, fontSize: 13, fontWeight: 600 }}>Lire →</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* ARTICLE VIEW */
        <section style={{ paddingTop: 100, paddingBottom: 80 }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px" }}>
            <button onClick={() => { setActiveArticle(null); window.location.hash = ""; }} style={{
              background: "transparent", border: `1px solid ${C.bd1}`, padding: "8px 16px", borderRadius: 8,
              color: C.gray2, fontSize: 13, cursor: "pointer", marginBottom: 32, transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.color = C.gray2; }}>← Tous les articles</button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: current.catColor, letterSpacing: ".1em", background: `${current.catColor}15`, border: `1px solid ${current.catColor}30`, padding: "4px 10px", borderRadius: 100 }}>{current.category}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray }}>{current.date}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray }}>·</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray }}>{current.readTime} de lecture</span>
            </div>

            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-.5px" }}>{current.title}</h1>
            <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.7, marginBottom: 40, paddingBottom: 32, borderBottom: `1px solid ${C.bd1}` }}>{current.excerpt}</p>

            <div>
              {current.content.map((block, i) => {
                if (block.type === "h2") return <h2 key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", marginTop: 40, marginBottom: 16 }}>{block.text}</h2>;
                if (block.type === "h3") return <h3 key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: C.gold, marginTop: 28, marginBottom: 12 }}>{block.text}</h3>;
                if (block.type === "p") return <p key={i} style={{ fontSize: 15, color: C.gray2, lineHeight: 1.85, marginBottom: 16 }}>{block.text}</p>;
                if (block.type === "quote") return (
                  <blockquote key={i} style={{ margin: "28px 0", padding: "20px 24px", borderLeft: `3px solid ${C.gold}`, background: C.goldDim, borderRadius: "0 12px 12px 0" }}>
                    <p style={{ fontSize: 15, color: C.gold2, lineHeight: 1.7, fontStyle: "italic", fontWeight: 500 }}>{block.text}</p>
                  </blockquote>
                );
                if (block.type === "list") return (
                  <div key={i} style={{ margin: "16px 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {block.text.split("|").map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: C.gold, marginTop: 5, flexShrink: 0 }}>▸</span>
                        <span style={{ fontSize: 14, color: C.gray2, lineHeight: 1.7 }}>{item.trim()}</span>
                      </div>
                    ))}
                  </div>
                );
                return null;
              })}
            </div>

            {/* Author */}
            <div style={{ marginTop: 48, padding: 28, background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, color: C.gold }}>VD</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Vincent DORANGE</div>
                <div style={{ fontSize: 13, color: C.gray }}>Fondateur ACF® · AI CONSULTING</div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 32, padding: 32, background: C.navy2, border: `1px solid ${C.goldBorder}`, borderRadius: 16, textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Évaluez votre gouvernance agentique</h3>
              <p style={{ fontSize: 14, color: C.gray2, marginBottom: 20 }}>Diagnostic gratuit en 10 minutes. Score immédiat. Rapport PDF.</p>
              <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>Calculer mon Score ACF® →</a>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ padding: "48px 0 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, paddingBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 13, color: C.navy1, letterSpacing: 1 }}>ACF</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>Agentic Commerce Framework®</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase" }}>GLOBAL STANDARD FOR AI GOVERNANCE</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 320 }}>The governance standard for organizations deploying autonomous AI agents.</p>
            </div>
            {[
              { title: "Framework", links: [{ label: "The Standard", href: "/en/standard" },{ label: "Blog", href: "/en/blog" },{ label: "ACF Certification", href: "/en/acf-certification" }] },
              { title: "Products", links: [{ label: "ACF Score®", href: "/en/acf-score" },{ label: "ACF Control", href: "/en/acf-control" },{ label: "Academy", href: "/en/acf-certification#academy" }] },
              { title: "Organization", links: [{ label: "Partner Portal", href: "/en/acf-partners" },{ label: "About", href: "/en/about" },{ label: "Contact", href: "/en/contact" },{ label: "Legal", href: "/en/legal" }] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map(l => (<a key={l.label} href={l.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.bd1}`, padding: "20px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
