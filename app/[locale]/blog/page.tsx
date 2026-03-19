"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

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

const articles_fr: Article[] = [
  {
    slug: "eu-ai-act-agentic-systems-2026",
    title: "Comment l'EU AI Act s'applique aux syst\u00e8mes agentiques en 2026",
    excerpt: "L'approche par le risque de l'AI Act cr\u00e9e des obligations sp\u00e9cifiques pour les agents autonomes. Voici ce que couvre la gouvernance ACF de niveau 2.",
    date: "2026-02-15", category: "R\u00c9GLEMENTATION", catColor: C.amber, readTime: "8 min",
    content: [
      { type: "p", text: "L'entr\u00e9e en vigueur progressive de l'AI Act europ\u00e9en en 2025-2026 marque un tournant pour les organisations d\u00e9ployant des agents IA autonomes. Pour la premi\u00e8re fois, un cadre r\u00e9glementaire impose des obligations sp\u00e9cifiques sur les syst\u00e8mes d'IA \u00e0 haut risque \u2014 et les agents autonomes de commerce en font souvent partie." },
      { type: "h2", text: "Les agents autonomes dans la classification de l'AI Act" },
      { type: "p", text: "L'AI Act classe les syst\u00e8mes d'IA en quatre niveaux de risque : inacceptable, haut, limit\u00e9 et minimal. Les agents autonomes de commerce, qui prennent des d\u00e9cisions de pricing, de procurement ou d'engagement client, tombent fr\u00e9quemment dans la cat\u00e9gorie \u00ab haut risque \u00bb d\u00e8s lors qu'ils impactent des d\u00e9cisions \u00e9conomiques significatives." },
      { type: "p", text: "Concr\u00e8tement, un agent qui ajuste automatiquement les prix en fonction de la demande, g\u00e8re la cha\u00eene d'approvisionnement ou engage des d\u00e9penses marketing de mani\u00e8re autonome doit r\u00e9pondre \u00e0 des exigences strictes de transparence, de tra\u00e7abilit\u00e9 et de supervision humaine." },
      { type: "h2", text: "Les 5 obligations cl\u00e9s pour les agents \u00e0 haut risque" },
      { type: "list", text: "Syst\u00e8me de gestion des risques : \u00e9valuation continue des risques pos\u00e9s par l'agent autonome, avec documentation actualis\u00e9e.|Gouvernance des donn\u00e9es : qualit\u00e9, pertinence et repr\u00e9sentativit\u00e9 des donn\u00e9es d'entra\u00eenement et de fonctionnement.|Documentation technique : description compl\u00e8te du fonctionnement, des limites et des performances de l'agent.|Transparence : les utilisateurs doivent savoir qu'ils interagissent avec un syst\u00e8me d'IA et comprendre ses capacit\u00e9s.|Supervision humaine : capacit\u00e9 d'intervention, de correction et d'interruption par un op\u00e9rateur humain qualifi\u00e9." },
      { type: "h2", text: "Comment l'ACF\u00ae r\u00e9pond \u00e0 ces exigences" },
      { type: "p", text: "L'Agentic Commerce Framework\u00ae a \u00e9t\u00e9 con\u00e7u d\u00e8s l'origine pour s'aligner avec les exigences de l'AI Act. La couche Gouvernance (Layer 1) \u00e9tablit la constitution agentique et la cartographie des responsabilit\u00e9s. La couche Politique (Layer 2) formalise les r\u00e8gles et limites comportementales des agents. La couche Syst\u00e8me (Layer 3) impl\u00e9mente les m\u00e9canismes techniques de contr\u00f4le et de logging. La couche Supervision (Layer 4) assure le monitoring continu et les revues p\u00e9riodiques." },
      { type: "quote", text: "Sans cadre de gouvernance formalis\u00e9, la conformit\u00e9 \u00e0 l'AI Act restera un exercice th\u00e9orique. L'ACF\u00ae transforme ces obligations en processus op\u00e9rationnels." },
      { type: "h2", text: "Sanctions et calendrier" },
      { type: "p", text: "Les sanctions pr\u00e9vues par l'AI Act peuvent atteindre 35 millions d'euros ou 7% du chiffre d'affaires mondial annuel. Les premi\u00e8res obligations de transparence s'appliquent d\u00e8s 2025, tandis que les exigences compl\u00e8tes pour les syst\u00e8mes \u00e0 haut risque entreront en vigueur progressivement en 2026-2027." },
      { type: "p", text: "Les organisations qui attendent la mise en application pour structurer leur gouvernance agentique prennent un risque consid\u00e9rable. La mise en conformit\u00e9 n\u00e9cessite du temps : cartographier les agents, d\u00e9finir les politiques, impl\u00e9menter les contr\u00f4les techniques et former les \u00e9quipes." },
      { type: "h3", text: "Action recommand\u00e9e" },
      { type: "p", text: "R\u00e9alisez votre diagnostic ACF Score\u00ae gratuit pour \u00e9valuer votre niveau de pr\u00e9paration actuel, puis engagez un plan de mise en conformit\u00e9 structur\u00e9 autour des 4 couches ACF\u00ae." },
    ]
  },
  {
    slug: "delegated-decision-agent-officer",
    title: "Le DDA : pourquoi chaque entreprise IA-native a besoin d'un Delegated Decision Agent Officer",
    excerpt: "Le DDA est le gardien l\u00e9gal de vos agents autonomes. Comment cr\u00e9er et responsabiliser ce r\u00f4le critique au sein de votre organisation.",
    date: "2026-02-08", category: "GOUVERNANCE", catColor: C.green, readTime: "7 min",
    content: [
      { type: "p", text: "\u00c0 mesure que les agents IA autonomes prennent des d\u00e9cisions de plus en plus critiques \u2014 pricing, approvisionnement, engagement client, gestion budg\u00e9taire \u2014 une question fondamentale \u00e9merge : qui est responsable quand un agent prend une mauvaise d\u00e9cision ?" },
      { type: "h2", text: "Le vide de responsabilit\u00e9 agentique" },
      { type: "p", text: "Dans une organisation traditionnelle, chaque d\u00e9cision a un propri\u00e9taire identifiable. Un directeur commercial d\u00e9cide des prix. Un responsable achats valide les commandes. Un directeur marketing approuve les campagnes. Avec l'autonomie agentique, ces d\u00e9cisions sont d\u00e9l\u00e9gu\u00e9es \u00e0 des syst\u00e8mes qui op\u00e8rent \u00e0 une vitesse et une \u00e9chelle impossibles pour un humain." },
      { type: "p", text: "Le probl\u00e8me n'est pas technique \u2014 c'est organisationnel. Qui r\u00e9pond devant le r\u00e9gulateur ? Qui est convoqu\u00e9 lors d'un audit ? Qui a l'autorit\u00e9 pour interrompre un agent qui d\u00e9rive ? Sans r\u00e9ponse claire, l'organisation s'expose \u00e0 un risque juridique et op\u00e9rationnel majeur." },
      { type: "h2", text: "Le r\u00f4le du Delegated Decision Agent Officer (DDA)" },
      { type: "p", text: "L'ACF\u00ae introduit le concept de DDA : un r\u00f4le de gouvernance nomm\u00e9, responsable de la supervision des d\u00e9cisions autonomes au sein de l'organisation. Ce n'est pas un r\u00f4le technique \u2014 c'est un r\u00f4le de gouvernance strat\u00e9gique." },
      { type: "list", text: "Responsabilit\u00e9 nomm\u00e9e : le DDA est la personne identifiable qui r\u00e9pond des d\u00e9cisions prises par les agents autonomes.|Autorit\u00e9 d'interruption : le DDA a le pouvoir et les moyens techniques d'interrompre tout agent \u00e0 tout moment.|Cadrage des politiques : le DDA d\u00e9finit et valide les r\u00e8gles de comportement de chaque agent.|Reporting r\u00e9gulier : le DDA produit des revues p\u00e9riodiques de gouvernance pour la direction.|Interface r\u00e9glementaire : le DDA est l'interlocuteur principal en cas d'audit ou de contr\u00f4le." },
      { type: "h2", text: "Profil et positionnement" },
      { type: "p", text: "Le DDA id\u00e9al combine une compr\u00e9hension business (strat\u00e9gie, risques, r\u00e9glementation) avec une culture technique suffisante pour dialoguer avec les \u00e9quipes IA. Il se positionne au niveau direction, reportant directement au CEO ou au COO. Ce n'est ni un CTO ni un compliance officer \u2014 c'est un r\u00f4le hybride nouveau, adapt\u00e9 \u00e0 l'\u00e8re agentique." },
      { type: "quote", text: "Le DDA n'est pas celui qui construit les agents. C'est celui qui s'assure que les agents construisent ce que l'organisation a d\u00e9cid\u00e9." },
      { type: "h2", text: "Impl\u00e9mentation avec l'ACF\u00ae" },
      { type: "p", text: "La Layer 1 (Gouvernance) de l'ACF\u00ae fournit le cadre pour d\u00e9finir, nommer et mandater le DDA. Le diagnostic ACF Score\u00ae \u00e9value si votre organisation a d\u00e9j\u00e0 identifi\u00e9 ce r\u00f4le \u2014 c'est l'un des crit\u00e8res les plus discriminants du scoring." },
    ]
  },
  {
    slug: "three-level-kill-switch",
    title: "Concevoir un Kill Switch \u00e0 trois niveaux pour les syst\u00e8mes d'agents autonomes",
    excerpt: "Un kill switch efficace n'est pas un simple bouton. L'ACF\u00ae sp\u00e9cifie trois niveaux d'interruption avec des temps de r\u00e9ponse d\u00e9finis.",
    date: "2026-01-29", category: "TECHNIQUE", catColor: C.blue, readTime: "10 min",
    content: [
      { type: "p", text: "L'interruptibilit\u00e9 est l'un des principes fondamentaux de la gouvernance agentique. Un agent IA autonome qui ne peut pas \u00eatre arr\u00eat\u00e9 de mani\u00e8re fiable et rapide repr\u00e9sente un risque existentiel pour l'organisation qui le d\u00e9ploie. Pourtant, la plupart des impl\u00e9mentations actuelles se limitent \u00e0 un bouton \u00ab stop \u00bb rudimentaire." },
      { type: "h2", text: "Pourquoi un seul bouton ne suffit pas" },
      { type: "p", text: "Un agent autonome complexe op\u00e8re sur plusieurs syst\u00e8mes simultan\u00e9ment : il peut \u00eatre en train de n\u00e9gocier un prix fournisseur, d'ajuster une campagne publicitaire et de r\u00e9pondre \u00e0 un client en m\u00eame temps. Un arr\u00eat brutal de toutes ces op\u00e9rations peut causer autant de dommages que la d\u00e9rive qu'on cherche \u00e0 corriger \u2014 commandes abandonn\u00e9es, engagements non tenus, incoh\u00e9rences de donn\u00e9es." },
      { type: "h2", text: "L'architecture Kill Switch ACF\u00ae \u00e0 3 niveaux" },
      { type: "h3", text: "Niveau 1 \u2014 Pause (temps de r\u00e9ponse : < 1 seconde)" },
      { type: "p", text: "Suspension imm\u00e9diate de toute nouvelle d\u00e9cision. Les op\u00e9rations en cours se terminent normalement, mais aucune nouvelle action n'est initi\u00e9e. L'agent passe en mode observation pure. Id\u00e9al pour : suspicion de d\u00e9rive l\u00e9g\u00e8re, besoin de v\u00e9rification humaine ponctuelle." },
      { type: "h3", text: "Niveau 2 \u2014 Containment (temps de r\u00e9ponse : < 5 secondes)" },
      { type: "p", text: "Les op\u00e9rations en cours sont achev\u00e9es avec des param\u00e8tres de s\u00e9curit\u00e9 renforc\u00e9s (limites de prix r\u00e9duites, volumes plafonn\u00e9s, approbation requise). Aucune nouvelle op\u00e9ration. Log complet de toutes les actions termin\u00e9es. Id\u00e9al pour : d\u00e9rive confirm\u00e9e mais non critique, investigation en cours." },
      { type: "h3", text: "Niveau 3 \u2014 Kill (temps de r\u00e9ponse : < 30 secondes)" },
      { type: "p", text: "Arr\u00eat total et imm\u00e9diat de toutes les op\u00e9rations, y compris celles en cours. Rollback automatique des actions r\u00e9versibles. Notification imm\u00e9diate au DDA et \u00e0 toutes les parties prenantes. Snapshot complet de l'\u00e9tat du syst\u00e8me pour analyse post-mortem. Id\u00e9al pour : situation de crise, perte de contr\u00f4le confirm\u00e9e, risque financier ou r\u00e9glementaire imm\u00e9diat." },
      { type: "h2", text: "Impl\u00e9mentation technique" },
      { type: "p", text: "Chaque niveau doit \u00eatre impl\u00e9ment\u00e9 avec des m\u00e9canismes ind\u00e9pendants. Le Niveau 1 utilise un flag de configuration temps r\u00e9el. Le Niveau 2 requiert un syst\u00e8me de circuit-breaker avec des seuils de s\u00e9curit\u00e9 pr\u00e9d\u00e9finis. Le Niveau 3 n\u00e9cessite un m\u00e9canisme de coupure r\u00e9seau et de rollback transactionnel." },
      { type: "quote", text: "Un kill switch qui n'a jamais \u00e9t\u00e9 test\u00e9 n'est pas un kill switch \u2014 c'est une promesse. L'ACF\u00ae exige des tests trimestriels de chaque niveau d'interruption." },
      { type: "p", text: "La Layer 3 (Syst\u00e8me) de l'ACF\u00ae d\u00e9taille les sp\u00e9cifications techniques compl\u00e8tes pour chaque niveau, incluant les protocoles de test, les crit\u00e8res de d\u00e9clenchement et les proc\u00e9dures de reprise d'activit\u00e9." },
    ]
  },
  {
    slug: "agentic-commerce-5-trillion-opportunity",
    title: "Le commerce agentique : une opportunit\u00e9 \u00e0 $5 000 milliards qui exige une gouvernance",
    excerpt: "McKinsey estime le march\u00e9 du commerce agentique entre 3 et 5 000 milliards de dollars d'ici 2030. Sans gouvernance, cette opportunit\u00e9 devient un risque syst\u00e9mique.",
    date: "2026-01-22", category: "MARCH\u00c9", catColor: C.purple, readTime: "6 min",
    content: [
      { type: "p", text: "Le commerce agentique \u2014 o\u00f9 des agents IA autonomes recherchent, comparent, n\u00e9gocient et ach\u00e8tent au nom des consommateurs et des entreprises \u2014 est en train de red\u00e9finir les fondamentaux du commerce mondial. Les estimations les plus s\u00e9rieuses positionnent ce march\u00e9 entre 3 et 5 000 milliards de dollars d'ici 2030." },
      { type: "h2", text: "Ce qui change fondamentalement" },
      { type: "p", text: "Pendant 25 ans, le commerce digital a \u00e9t\u00e9 con\u00e7u pour des humains qui naviguent, comparent et cliquent. Le commerce agentique inverse cette logique : l'intention est exprim\u00e9e une fois, l'ex\u00e9cution est d\u00e9l\u00e9gu\u00e9e. Le consommateur ne parcourt plus des pages de r\u00e9sultats \u2014 il dit \u00e0 son agent \u00ab trouve-moi des bottes d'hiver imperm\u00e9ables \u00e0 moins de 150\u20ac, livr\u00e9es avant vendredi \u00bb et l'agent fait le reste." },
      { type: "p", text: "Pour les entreprises, cela signifie que le \u00ab client \u00bb n'est plus un humain qui visite votre site \u2014 c'est un agent qui interroge votre API. Les crit\u00e8res de d\u00e9cision passent de l'\u00e9motion et du branding \u00e0 la structuration des donn\u00e9es, la fiabilit\u00e9 transactionnelle et la v\u00e9rifiabilit\u00e9 des informations produit." },
      { type: "h2", text: "L'imp\u00e9ratif de gouvernance" },
      { type: "p", text: "Cette transformation cr\u00e9e un paradoxe : pour capturer l'opportunit\u00e9 du commerce agentique, les organisations doivent d\u00e9l\u00e9guer plus de d\u00e9cisions \u00e0 des agents autonomes. Mais sans gouvernance structur\u00e9e, cette d\u00e9l\u00e9gation cr\u00e9e des risques existentiels \u2014 pricing non contr\u00f4l\u00e9, engagements non autoris\u00e9s, d\u00e9pendance aux plateformes tierces." },
      { type: "quote", text: "L'opportunit\u00e9 de $5 000 milliards n'ira pas aux organisations qui ont les meilleurs agents \u2014 elle ira \u00e0 celles qui gouvernent le mieux leurs agents." },
      { type: "h2", text: "Les 3 piliers de comp\u00e9titivit\u00e9 agentique" },
      { type: "list", text: "D\u00e9couvrabilit\u00e9 agentique : vos produits et services sont-ils structur\u00e9s pour \u00eatre compris et \u00e9valu\u00e9s par des agents IA ? Donn\u00e9es structur\u00e9es, APIs ouvertes, informations v\u00e9rifiables.|Fiabilit\u00e9 transactionnelle : vos syst\u00e8mes permettent-ils \u00e0 des agents de compl\u00e9ter des transactions de bout en bout de mani\u00e8re fiable et s\u00e9curis\u00e9e ?|Gouvernance de confiance : pouvez-vous d\u00e9montrer \u00e0 vos clients, partenaires et r\u00e9gulateurs que vos agents op\u00e8rent dans un cadre de gouvernance structur\u00e9 et auditable ?" },
      { type: "p", text: "L'ACF\u00ae fournit le cadre m\u00e9thodologique pour le troisi\u00e8me pilier \u2014 et influence directement les deux premiers. Une organisation qui a formalis\u00e9 sa gouvernance agentique est naturellement mieux positionn\u00e9e pour structurer sa d\u00e9couvrabilit\u00e9 et sa fiabilit\u00e9 transactionnelle." },
    ]
  },
  {
    slug: "4-layers-acf-governance-explained",
    title: "Les 4 couches de la gouvernance ACF\u00ae expliqu\u00e9es",
    excerpt: "Architecture compl\u00e8te du framework en 4 couches : Gouvernance, Politique, Syst\u00e8me et Supervision. Comment elles s'articulent et pourquoi chacune est indispensable.",
    date: "2026-01-15", category: "M\u00c9THODOLOGIE", catColor: C.gold, readTime: "12 min",
    content: [
      { type: "p", text: "L'Agentic Commerce Framework\u00ae repose sur une architecture en 4 couches de gouvernance. Chaque couche a un r\u00f4le distinct, des livrables sp\u00e9cifiques et des interactions d\u00e9finies avec les autres couches. C'est cette structuration qui diff\u00e9rencie l'ACF\u00ae d'une simple check-list de bonnes pratiques." },
      { type: "h2", text: "Layer 1 \u2014 Gouvernance : le \u00ab qui \u00bb" },
      { type: "p", text: "La couche Gouvernance est le fondement strat\u00e9gique de tout l'\u00e9difice. Elle r\u00e9pond aux questions de responsabilit\u00e9 et d'autorit\u00e9 : qui gouverne les agents ? Qui est responsable de leurs d\u00e9cisions ? Qui a l'autorit\u00e9 de les modifier, les restreindre ou les arr\u00eater ?" },
      { type: "list", text: "Constitution agentique : document fondateur qui d\u00e9finit les principes de gouvernance de l'organisation en mati\u00e8re d'IA autonome.|Sponsor de gouvernance nomm\u00e9 : personne identifiable au niveau direction, responsable de la gouvernance agentique.|Cartographie des autorit\u00e9s de d\u00e9cision : pour chaque type de d\u00e9cision d\u00e9l\u00e9gu\u00e9e \u00e0 un agent, identification de l'humain r\u00e9f\u00e9rent.|Protocoles d'escalade : d\u00e9finition pr\u00e9cise des crit\u00e8res et des chemins d'escalade pour chaque niveau de risque." },
      { type: "h2", text: "Layer 2 \u2014 Politique : le \u00ab quoi \u00bb" },
      { type: "p", text: "La couche Politique transforme les principes de gouvernance en r\u00e8gles op\u00e9rationnelles. Elle formalise ce que les agents peuvent et ne peuvent pas faire, avec quelles limites et dans quelles conditions." },
      { type: "list", text: "Politiques comportementales par agent : pour chaque agent d\u00e9ploy\u00e9, documentation des actions autoris\u00e9es, interdites et conditionnelles.|Limites d'autonomie : seuils financiers, temporels et op\u00e9rationnels au-del\u00e0 desquels l'approbation humaine est requise.|Alignement r\u00e9glementaire : mapping explicite entre chaque politique d'agent et les exigences r\u00e9glementaires applicables (AI Act, RGPD, sectorielles).|Cadres \u00e9thiques de d\u00e9cision : principes directeurs pour les situations ambigu\u00ebs non couvertes par les r\u00e8gles explicites." },
      { type: "h2", text: "Layer 3 \u2014 Syst\u00e8me : le \u00ab comment \u00bb" },
      { type: "p", text: "La couche Syst\u00e8me est l'infrastructure technique qui rend la gouvernance op\u00e9rationnelle. Sans elle, les deux premi\u00e8res couches restent des documents th\u00e9oriques." },
      { type: "list", text: "Kill switch \u00e0 3 niveaux : m\u00e9canismes d'interruption gradu\u00e9s avec temps de r\u00e9ponse garantis (voir notre article d\u00e9di\u00e9).|Architecture de tra\u00e7abilit\u00e9 : logging exhaustif de toutes les d\u00e9cisions autonomes, avec horodatage, contexte et justification algorithmique.|R\u00e8gles de coordination multi-agents : protocoles d'interaction entre agents pour \u00e9viter les conflits, les boucles et les optimisations contradictoires.|Protocoles d'interruptibilit\u00e9 : tests r\u00e9guliers de chaque m\u00e9canisme d'arr\u00eat pour garantir leur fiabilit\u00e9 en situation r\u00e9elle." },
      { type: "h2", text: "Layer 4 \u2014 Supervision : le \u00ab en continu \u00bb" },
      { type: "p", text: "La couche Supervision assure que la gouvernance reste vivante et adapt\u00e9e. C'est la couche qui transforme un framework statique en syst\u00e8me d'am\u00e9lioration continue." },
      { type: "list", text: "Dashboard ACF Control : monitoring temps r\u00e9el des agents, de leurs d\u00e9cisions et de leur conformit\u00e9 aux politiques d\u00e9finies.|Revues trimestrielles : \u00e9valuation formelle de la posture de gouvernance, avec scoring ACF\u00ae actualis\u00e9 et plan d'action.|Proc\u00e9dures de r\u00e9ponse aux incidents : processus document\u00e9 pour g\u00e9rer les situations de d\u00e9rive, d'erreur ou de crise agentique.|Tracking du score de souverainet\u00e9 : suivi longitudinal de l'ind\u00e9pendance de l'organisation vis-\u00e0-vis des plateformes tierces." },
      { type: "quote", text: "Les 4 couches ACF\u00ae ne sont pas s\u00e9quentielles \u2014 elles sont syst\u00e9miques. Un d\u00e9ficit dans une couche affaiblit l'ensemble du dispositif." },
      { type: "h2", text: "L'\u00e9valuation par le Score ACF\u00ae" },
      { type: "p", text: "Le diagnostic ACF Score\u00ae \u00e9value votre organisation sur chacune de ces 4 couches, avec un scoring d\u00e9taill\u00e9 qui identifie vos forces et vos lacunes. Le r\u00e9sultat n'est pas un simple chiffre \u2014 c'est une cartographie de votre maturit\u00e9 de gouvernance agentique avec des actions prioritaires pour chaque couche." },
    ]
  },
  {
    slug: "sovereignty-vs-efficiency-false-dilemma",
    title: "Souverainet\u00e9 vs. efficacit\u00e9 : le faux dilemme de l'autonomie IA",
    excerpt: "On vous dit que gouverner les agents IA ralentit l'innovation. C'est faux. Voici pourquoi les organisations les mieux gouvern\u00e9es seront les plus comp\u00e9titives.",
    date: "2026-01-08", category: "STRAT\u00c9GIE", catColor: C.amber, readTime: "7 min",
    content: [
      { type: "p", text: "L'objection la plus fr\u00e9quente face \u00e0 la gouvernance agentique est pr\u00e9visible : \u00ab Mettre des contraintes sur nos agents IA va nous ralentir. Nos concurrents qui ne gouvernent pas seront plus rapides. \u00bb C'est un argument s\u00e9duisant. Il est aussi profond\u00e9ment erron\u00e9." },
      { type: "h2", text: "Le mythe de la vitesse non gouvern\u00e9e" },
      { type: "p", text: "Un agent IA autonome sans gouvernance n'est pas \u00ab rapide \u00bb \u2014 il est incontr\u00f4l\u00e9. La rapidit\u00e9 sans direction n'est pas de la performance, c'est du bruit. Un agent qui optimise un prix localement mais d\u00e9truit la marge globalement n'est pas efficace. Un agent qui conclut 1 000 transactions par jour dont 5% devront \u00eatre annul\u00e9es manuellement n'est pas productif." },
      { type: "p", text: "Les donn\u00e9es montrent le contraire de l'intuition : les organisations avec une gouvernance formalis\u00e9e de leurs agents IA ont des taux d'incident 73% plus bas, des co\u00fbts de correction 4x inf\u00e9rieurs et des temps de d\u00e9ploiement de nouveaux agents 2x plus rapides \u2014 parce que le cadre est d\u00e9j\u00e0 en place." },
      { type: "h2", text: "La gouvernance comme acc\u00e9l\u00e9rateur" },
      { type: "p", text: "La gouvernance agentique n'est pas un frein \u2014 c'est un acc\u00e9l\u00e9rateur structurel. Pensez \u00e0 une autoroute : les r\u00e8gles de conduite (vitesse maximale, voies, signalisation) ne ralentissent pas le trafic. Elles permettent \u00e0 des millions de v\u00e9hicules de circuler simultan\u00e9ment \u00e0 haute vitesse sans chaos." },
      { type: "list", text: "D\u00e9ploiement acc\u00e9l\u00e9r\u00e9 : quand le cadre de gouvernance est \u00e9tabli, chaque nouvel agent peut \u00eatre d\u00e9ploy\u00e9 dans un environnement d\u00e9j\u00e0 s\u00e9curis\u00e9. Pas de r\u00e9invention de la roue.|Confiance stakeholder : clients, partenaires et r\u00e9gulateurs font confiance aux organisations qui d\u00e9montrent une gouvernance structur\u00e9e. Cette confiance ouvre des march\u00e9s.|R\u00e9silience op\u00e9rationnelle : une d\u00e9rive d\u00e9tect\u00e9e et contenue en 30 secondes n'a pas le m\u00eame impact qu'une d\u00e9rive d\u00e9couverte apr\u00e8s 3 semaines.|Attractivit\u00e9 talents : les meilleurs ing\u00e9nieurs IA veulent travailler dans des environnements structur\u00e9s, pas dans le chaos." },
      { type: "h2", text: "Le vrai dilemme" },
      { type: "p", text: "Le vrai choix n'est pas entre souverainet\u00e9 et efficacit\u00e9. C'est entre gouvernance proactive et gouvernance r\u00e9active. L'une co\u00fbte un investissement structurel anticip\u00e9. L'autre co\u00fbte des millions en gestion de crise, sanctions r\u00e9glementaires et perte de confiance." },
      { type: "quote", text: "Les organisations qui gouvernent leurs agents IA ne sont pas plus lentes. Elles sont plus rapides \u2014 parce qu'elles ne s'arr\u00eatent pas pour \u00e9teindre des incendies." },
      { type: "p", text: "Le Score ACF\u00ae mesure pr\u00e9cis\u00e9ment cet \u00e9quilibre entre autonomie agentique et contr\u00f4le de gouvernance. Les organisations avec les scores les plus \u00e9lev\u00e9s ne sont pas les plus conservatrices \u2014 ce sont les plus structur\u00e9es." },
    ]
  },
];

const articles_en: Article[] = [
  {
    slug: "eu-ai-act-agentic-systems-2026",
    title: "How the EU AI Act applies to agentic systems in 2026",
    excerpt: "The AI Act's risk-based approach creates specific obligations for autonomous agents. Here's what ACF Level 2 governance covers.",
    date: "2026-02-15", category: "REGULATION", catColor: C.amber, readTime: "8 min",
    content: [
      { type: "p", text: "The progressive enforcement of the European AI Act in 2025-2026 marks a turning point for organizations deploying autonomous AI agents. For the first time, a regulatory framework imposes specific obligations on high-risk AI systems \u2014 and autonomous commerce agents often fall into this category." },
      { type: "h2", text: "Autonomous agents in the AI Act classification" },
      { type: "p", text: "The AI Act classifies AI systems into four risk levels: unacceptable, high, limited, and minimal. Autonomous commerce agents, which make pricing, procurement, or customer engagement decisions, frequently fall into the 'high risk' category when they impact significant economic decisions." },
      { type: "p", text: "Concretely, an agent that automatically adjusts prices based on demand, manages the supply chain, or autonomously commits marketing spend must meet strict requirements for transparency, traceability, and human oversight." },
      { type: "h2", text: "5 key obligations for high-risk agents" },
      { type: "list", text: "Risk management system: continuous assessment of risks posed by the autonomous agent, with up-to-date documentation.|Data governance: quality, relevance, and representativeness of training and operational data.|Technical documentation: complete description of the agent's operation, limitations, and performance.|Transparency: users must know they are interacting with an AI system and understand its capabilities.|Human oversight: ability for intervention, correction, and interruption by a qualified human operator." },
      { type: "h2", text: "How ACF® addresses these requirements" },
      { type: "p", text: "The Agentic Commerce Framework\u00ae was designed from the outset to align with the AI Act's requirements. The Governance layer (Layer 1) establishes the agentic constitution and responsibility mapping. The Policy layer (Layer 2) formalizes the behavioral rules and limits for agents. The System layer (Layer 3) implements the technical control and logging mechanisms. The Supervision layer (Layer 4) ensures continuous monitoring and periodic reviews." },
      { type: "quote", text: "Without a formalized governance framework, AI Act compliance will remain a theoretical exercise. ACF\u00ae transforms these obligations into operational processes." },
      { type: "h2", text: "Penalties and timeline" },
      { type: "p", text: "Penalties under the AI Act can reach \u20ac35 million or 7% of annual global revenue. The first transparency obligations apply from 2025, while full requirements for high-risk systems will come into force progressively in 2026-2027." },
      { type: "p", text: "Organizations waiting for enforcement to structure their agentic governance are taking considerable risk. Compliance takes time: mapping agents, defining policies, implementing technical controls, and training teams." },
      { type: "h3", text: "Recommended action" },
      { type: "p", text: "Take the free ACF Score\u00ae diagnostic to assess your current readiness level, then engage a structured compliance plan built around the 4 ACF\u00ae layers." },
    ]
  },
  {
    slug: "delegated-decision-agent-officer",
    title: "The DDA: why every AI-native company needs a Delegated Decision Agent Officer",
    excerpt: "The DDA is the legal guardian of your autonomous agents. How to create and empower this critical role within your organization.",
    date: "2026-02-08", category: "GOVERNANCE", catColor: C.green, readTime: "7 min",
    content: [
      { type: "p", text: "As autonomous AI agents make increasingly critical decisions \u2014 pricing, procurement, customer engagement, budget management \u2014 a fundamental question emerges: who is responsible when an agent makes a bad decision?" },
      { type: "h2", text: "The agentic accountability gap" },
      { type: "p", text: "In a traditional organization, every decision has an identifiable owner. A sales director decides on pricing. A procurement manager validates orders. A marketing director approves campaigns. With agentic autonomy, these decisions are delegated to systems operating at speeds and scales impossible for humans." },
      { type: "p", text: "The problem isn't technical \u2014 it's organizational. Who answers to the regulator? Who is summoned during an audit? Who has the authority to stop a drifting agent? Without clear answers, the organization faces major legal and operational risk." },
      { type: "h2", text: "The Delegated Decision Agent Officer (DDA) role" },
      { type: "p", text: "ACF\u00ae introduces the DDA concept: a named governance role responsible for overseeing autonomous decisions within the organization. This is not a technical role \u2014 it's a strategic governance role." },
      { type: "list", text: "Named accountability: the DDA is the identifiable person who answers for decisions made by autonomous agents.|Interruption authority: the DDA has the power and technical means to interrupt any agent at any time.|Policy framing: the DDA defines and validates the behavioral rules for each agent.|Regular reporting: the DDA produces periodic governance reviews for leadership.|Regulatory interface: the DDA is the primary point of contact for audits or regulatory inquiries." },
      { type: "h2", text: "Profile and positioning" },
      { type: "p", text: "The ideal DDA combines business understanding (strategy, risk, regulation) with sufficient technical literacy to engage with AI teams. They sit at the executive level, reporting directly to the CEO or COO. They are neither a CTO nor a compliance officer \u2014 it's a new hybrid role, designed for the agentic era." },
      { type: "quote", text: "The DDA is not the one who builds agents. They are the one who ensures agents build what the organization has decided." },
      { type: "h2", text: "Implementation with ACF®" },
      { type: "p", text: "Layer 1 (Governance) of ACF\u00ae provides the framework for defining, naming, and mandating the DDA. The ACF Score\u00ae diagnostic evaluates whether your organization has already identified this role \u2014 it's one of the most discriminating criteria in the scoring." },
    ]
  },
  {
    slug: "three-level-kill-switch",
    title: "Designing a three-level kill switch for autonomous agent systems",
    excerpt: "An effective kill switch is not a single button. ACF® specifies three interrupt levels with defined response times.",
    date: "2026-01-29", category: "TECHNICAL", catColor: C.blue, readTime: "10 min",
    content: [
      { type: "p", text: "Interruptibility is one of the fundamental principles of agentic governance. An autonomous AI agent that cannot be reliably and quickly stopped represents an existential risk to the deploying organization. Yet most current implementations are limited to a rudimentary 'stop' button." },
      { type: "h2", text: "Why a single button isn't enough" },
      { type: "p", text: "A complex autonomous agent operates across multiple systems simultaneously: it may be negotiating a supplier price, adjusting an ad campaign, and responding to a customer at the same time. An abrupt halt to all these operations can cause as much damage as the drift being corrected \u2014 abandoned orders, unfulfilled commitments, data inconsistencies." },
      { type: "h2", text: "The ACF® 3-level kill switch architecture" },
      { type: "h3", text: "Level 1 \u2014 Pause (response time: < 1 second)" },
      { type: "p", text: "Immediate suspension of all new decisions. Ongoing operations complete normally, but no new actions are initiated. The agent switches to pure observation mode. Ideal for: suspected minor drift, need for ad-hoc human verification." },
      { type: "h3", text: "Level 2 \u2014 Containment (response time: < 5 seconds)" },
      { type: "p", text: "Ongoing operations are completed with enhanced safety parameters (reduced price limits, capped volumes, approval required). No new operations. Complete log of all completed actions. Ideal for: confirmed but non-critical drift, ongoing investigation." },
      { type: "h3", text: "Level 3 \u2014 Kill (response time: < 30 seconds)" },
      { type: "p", text: "Total and immediate halt of all operations, including those in progress. Automatic rollback of reversible actions. Immediate notification to the DDA and all stakeholders. Complete system state snapshot for post-mortem analysis. Ideal for: crisis situation, confirmed loss of control, immediate financial or regulatory risk." },
      { type: "h2", text: "Technical implementation" },
      { type: "p", text: "Each level must be implemented with independent mechanisms. Level 1 uses a real-time configuration flag. Level 2 requires a circuit-breaker system with predefined safety thresholds. Level 3 requires a network cutoff mechanism and transactional rollback." },
      { type: "quote", text: "A kill switch that has never been tested is not a kill switch \u2014 it's a promise. ACF\u00ae requires quarterly tests of each interrupt level." },
      { type: "p", text: "Layer 3 (System) of ACF\u00ae details the complete technical specifications for each level, including test protocols, trigger criteria, and activity recovery procedures." },
    ]
  },
  {
    slug: "agentic-commerce-5-trillion-opportunity",
    title: "Agentic commerce: a $5 trillion opportunity that demands governance",
    excerpt: "McKinsey estimates the agentic commerce market at $3-5 trillion by 2030. Without governance, this opportunity becomes a systemic risk.",
    date: "2026-01-22", category: "MARKET", catColor: C.purple, readTime: "6 min",
    content: [
      { type: "p", text: "Agentic commerce \u2014 where autonomous AI agents search, compare, negotiate, and purchase on behalf of consumers and businesses \u2014 is redefining the fundamentals of global commerce. The most serious estimates position this market between $3 and $5 trillion by 2030." },
      { type: "h2", text: "What fundamentally changes" },
      { type: "p", text: "For 25 years, digital commerce has been designed for humans who browse, compare, and click. Agentic commerce reverses this logic: intent is expressed once, execution is delegated. The consumer no longer scrolls through results pages \u2014 they tell their agent 'find me waterproof winter boots under \u20ac150, delivered before Friday' and the agent does the rest." },
      { type: "p", text: "For businesses, this means the 'customer' is no longer a human visiting your site \u2014 it's an agent querying your API. Decision criteria shift from emotion and branding to data structuring, transactional reliability, and product information verifiability." },
      { type: "h2", text: "The governance imperative" },
      { type: "p", text: "This transformation creates a paradox: to capture the agentic commerce opportunity, organizations must delegate more decisions to autonomous agents. But without structured governance, this delegation creates existential risks \u2014 uncontrolled pricing, unauthorized commitments, dependency on third-party platforms." },
      { type: "quote", text: "The $5 trillion opportunity won't go to organizations with the best agents \u2014 it will go to those who govern their agents best." },
      { type: "h2", text: "The 3 pillars of agentic competitiveness" },
      { type: "list", text: "Agentic discoverability: are your products and services structured to be understood and evaluated by AI agents? Structured data, open APIs, verifiable information.|Transactional reliability: do your systems allow agents to complete end-to-end transactions reliably and securely?|Trust governance: can you demonstrate to customers, partners, and regulators that your agents operate within a structured and auditable governance framework?" },
      { type: "p", text: "ACF\u00ae provides the methodological framework for the third pillar \u2014 and directly influences the first two. An organization that has formalized its agentic governance is naturally better positioned to structure its discoverability and transactional reliability." },
    ]
  },
  {
    slug: "4-layers-acf-governance-explained",
    title: "The 4 layers of ACF® governance explained",
    excerpt: "Complete framework architecture in 4 layers: Governance, Policy, System, and Supervision. How they interact and why each is essential.",
    date: "2026-01-15", category: "METHODOLOGY", catColor: C.gold, readTime: "12 min",
    content: [
      { type: "p", text: "The Agentic Commerce Framework\u00ae is built on a 4-layer governance architecture. Each layer has a distinct role, specific deliverables, and defined interactions with other layers. This structuring is what differentiates ACF\u00ae from a simple best-practices checklist." },
      { type: "h2", text: "Layer 1 — Governance: the 'who'" },
      { type: "p", text: "The Governance layer is the strategic foundation of the entire edifice. It answers questions of responsibility and authority: who governs the agents? Who is responsible for their decisions? Who has the authority to modify, restrict, or stop them?" },
      { type: "list", text: "Agentic constitution: founding document that defines the organization's governance principles for autonomous AI.|Named governance sponsor: an identifiable executive-level person responsible for agentic governance.|Decision authority mapping: for each type of decision delegated to an agent, identification of the human referent.|Escalation protocols: precise definition of criteria and escalation paths for each risk level." },
      { type: "h2", text: "Layer 2 — Policy: the 'what'" },
      { type: "p", text: "The Policy layer transforms governance principles into operational rules. It formalizes what agents can and cannot do, within what limits, and under what conditions." },
      { type: "list", text: "Per-agent behavioral policies: for each deployed agent, documentation of authorized, prohibited, and conditional actions.|Autonomy limits: financial, temporal, and operational thresholds beyond which human approval is required.|Regulatory alignment: explicit mapping between each agent policy and applicable regulatory requirements (AI Act, GDPR, sector-specific).|Ethical decision frameworks: guiding principles for ambiguous situations not covered by explicit rules." },
      { type: "h2", text: "Layer 3 — System: the 'how'" },
      { type: "p", text: "The System layer is the technical infrastructure that makes governance operational. Without it, the first two layers remain theoretical documents." },
      { type: "list", text: "3-level kill switch: graduated interruption mechanisms with guaranteed response times (see our dedicated article).|Traceability architecture: exhaustive logging of all autonomous decisions, with timestamps, context, and algorithmic justification.|Multi-agent coordination rules: interaction protocols between agents to prevent conflicts, loops, and contradictory optimizations.|Interruptibility protocols: regular testing of each shutdown mechanism to ensure reliability in real situations." },
      { type: "h2", text: "Layer 4 — Supervision: the 'continuous'" },
      { type: "p", text: "The Supervision layer ensures governance remains alive and adapted. It's the layer that transforms a static framework into a continuous improvement system." },
      { type: "list", text: "ACF Control Dashboard: real-time monitoring of agents, their decisions, and their compliance with defined policies.|Quarterly reviews: formal assessment of governance posture, with updated ACF\u00ae scoring and action plan.|Incident response procedures: documented process for managing drift, error, or agentic crisis situations.|Sovereignty score tracking: longitudinal tracking of the organization's independence from third-party platforms." },
      { type: "quote", text: "The 4 ACF\u00ae layers are not sequential \u2014 they are systemic. A deficit in one layer weakens the entire framework." },
      { type: "h2", text: "Assessment via ACF Score®" },
      { type: "p", text: "The ACF Score\u00ae diagnostic evaluates your organization across each of these 4 layers, with detailed scoring that identifies your strengths and gaps. The result is not a simple number \u2014 it's a map of your agentic governance maturity with priority actions for each layer." },
    ]
  },
  {
    slug: "sovereignty-vs-efficiency-false-dilemma",
    title: "Sovereignty vs. efficiency: the false dilemma of AI autonomy",
    excerpt: "You're told governing AI agents slows innovation. That's wrong. Here's why the best-governed organizations will be the most competitive.",
    date: "2026-01-08", category: "STRATEGY", catColor: C.amber, readTime: "7 min",
    content: [
      { type: "p", text: "The most common objection to agentic governance is predictable: 'Putting constraints on our AI agents will slow us down. Our competitors who don't govern will be faster.' It's a seductive argument. It's also profoundly wrong." },
      { type: "h2", text: "The myth of ungoverned speed" },
      { type: "p", text: "An autonomous AI agent without governance isn't 'fast' \u2014 it's uncontrolled. Speed without direction isn't performance, it's noise. An agent that optimizes a price locally but destroys the margin globally isn't efficient. An agent that closes 1,000 transactions per day of which 5% need to be manually reversed isn't productive." },
      { type: "p", text: "The data shows the opposite of intuition: organizations with formalized governance of their AI agents have 73% lower incident rates, 4x lower correction costs, and 2x faster deployment times for new agents \u2014 because the framework is already in place." },
      { type: "h2", text: "Governance as an accelerator" },
      { type: "p", text: "Agentic governance is not a brake \u2014 it's a structural accelerator. Think of a highway: the rules of the road (speed limits, lanes, signage) don't slow traffic. They allow millions of vehicles to move simultaneously at high speed without chaos." },
      { type: "list", text: "Accelerated deployment: when the governance framework is established, each new agent can be deployed in an already-secured environment. No reinventing the wheel.|Stakeholder trust: customers, partners, and regulators trust organizations that demonstrate structured governance. That trust opens markets.|Operational resilience: a drift detected and contained in 30 seconds doesn't have the same impact as a drift discovered after 3 weeks.|Talent attractiveness: the best AI engineers want to work in structured environments, not in chaos." },
      { type: "h2", text: "The real dilemma" },
      { type: "p", text: "The real choice isn't between sovereignty and efficiency. It's between proactive governance and reactive governance. One costs a planned structural investment. The other costs millions in crisis management, regulatory penalties, and lost trust." },
      { type: "quote", text: "Organizations that govern their AI agents aren't slower. They're faster \u2014 because they don't stop to put out fires." },
      { type: "p", text: "The ACF Score\u00ae precisely measures this balance between agentic autonomy and governance control. Organizations with the highest scores aren't the most conservative \u2014 they're the most structured." },
    ]
  },
];

const categoryFilters_fr = ["TOUS", "R\u00c9GLEMENTATION", "GOUVERNANCE", "TECHNIQUE", "MARCH\u00c9", "M\u00c9THODOLOGIE", "STRAT\u00c9GIE"];
const categoryFilters_en = ["ALL", "REGULATION", "GOVERNANCE", "TECHNICAL", "MARKET", "METHODOLOGY", "STRATEGY"];

const ui = {
  fr: {
    badge: "BLOG & RECHERCHE",
    title: "Gouvernance",
    titleHighlight: "agentique",
    subtitle: "Recherche, m\u00e9thodologie et perspectives sur la gouvernance des agents IA autonomes.",
    readCta: "Lire \u2192",
    backAll: "\u2190 Tous les articles",
    readSuffix: "de lecture",
    authorRole: "Fondateur ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "\u00c9valuez votre gouvernance agentique",
    ctaSubtitle: "Diagnostic gratuit en 10 minutes. Score imm\u00e9diat. Rapport PDF.",
    ctaButton: "Calculer mon Score ACF\u00ae \u2192",
    allFilter: "TOUS",
  },
  en: {
    badge: "BLOG & RESEARCH",
    title: "Agentic",
    titleHighlight: "Governance",
    subtitle: "Research, methodology, and insights on autonomous AI agent governance.",
    readCta: "Read \u2192",
    backAll: "\u2190 All Articles",
    readSuffix: "read",
    authorRole: "Founder ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "Assess your agentic governance",
    ctaSubtitle: "Free diagnostic in 10 minutes. Instant score. PDF report.",
    ctaButton: "Calculate my ACF Score\u00ae \u2192",
    allFilter: "ALL",
  },
  es: {
    badge: "BLOG E INVESTIGACI\u00d3N",
    title: "Gobernanza",
    titleHighlight: "ag\u00e9ntica",
    subtitle: "Investigaci\u00f3n, metodolog\u00eda y perspectivas sobre la gobernanza de agentes de IA aut\u00f3nomos.",
    readCta: "Leer \u2192",
    backAll: "\u2190 Todos los art\u00edculos",
    readSuffix: "de lectura",
    authorRole: "Fundador ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "Eval\u00fae su gobernanza ag\u00e9ntica",
    ctaSubtitle: "Diagn\u00f3stico gratuito en 10 minutos. Puntuaci\u00f3n inmediata. Informe PDF.",
    ctaButton: "Calcular mi ACF Score\u00ae \u2192",
    allFilter: "TODOS",
  },
  de: {
    badge: "BLOG & FORSCHUNG",
    title: "Agentische",
    titleHighlight: "Governance",
    subtitle: "Forschung, Methodik und Einblicke in die Governance autonomer KI-Agenten.",
    readCta: "Lesen \u2192",
    backAll: "\u2190 Alle Artikel",
    readSuffix: "Lesezeit",
    authorRole: "Gr\u00fcnder ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "Bewerten Sie Ihre agentische Governance",
    ctaSubtitle: "Kostenloses Diagnose in 10 Minuten. Sofortergebnis. PDF-Bericht.",
    ctaButton: "Meinen ACF Score\u00ae berechnen \u2192",
    allFilter: "ALLE",
  },
  pt: {
    badge: "BLOG & PESQUISA",
    title: "Governan\u00e7a",
    titleHighlight: "ag\u00eantica",
    subtitle: "Pesquisa, metodologia e perspectivas sobre a governan\u00e7a de agentes de IA aut\u00f4nomos.",
    readCta: "Ler \u2192",
    backAll: "\u2190 Todos os artigos",
    readSuffix: "de leitura",
    authorRole: "Fundador ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "Avalie sua governan\u00e7a ag\u00eantica",
    ctaSubtitle: "Diagn\u00f3stico gratuito em 10 minutos. Pontua\u00e7\u00e3o instant\u00e2nea. Relat\u00f3rio PDF.",
    ctaButton: "Calcular meu ACF Score\u00ae \u2192",
    allFilter: "TODOS",
  },
  ja: {
    badge: "\u30d6\u30ed\u30b0\uff06\u30ea\u30b5\u30fc\u30c1",
    title: "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    titleHighlight: "\u30ac\u30d0\u30ca\u30f3\u30b9",
    subtitle: "\u81ea\u5f8bAI\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u306e\u30ac\u30d0\u30ca\u30f3\u30b9\u306b\u95a2\u3059\u308b\u7814\u7a76\u3001\u65b9\u6cd5\u8ad6\u3001\u77e5\u898b\u3002",
    readCta: "\u8aad\u3080 \u2192",
    backAll: "\u2190 \u5168\u8a18\u4e8b\u4e00\u89a7",
    readSuffix: "\u8aad\u4e86\u6642\u9593",
    authorRole: "\u5275\u8a2d\u8005 ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u30fb\u30ac\u30d0\u30ca\u30f3\u30b9\u3092\u8a55\u4fa1\u3059\u308b",
    ctaSubtitle: "10\u5206\u3067\u7121\u6599\u8a3a\u65ad\u3002\u5373\u6642\u30b9\u30b3\u30a2\u3002PDF\u30ec\u30dd\u30fc\u30c8\u3002",
    ctaButton: "ACF Score\u00ae\u3092\u8a08\u7b97\u3059\u308b \u2192",
    allFilter: "\u3059\u3079\u3066",
  },
  zh: {
    badge: "\u535a\u5ba2\u4e0e\u7814\u7a76",
    title: "\u667a\u80fd\u4f53",
    titleHighlight: "\u6cbb\u7406",
    subtitle: "\u5173\u4e8e\u81ea\u4e3bAI\u667a\u80fd\u4f53\u6cbb\u7406\u7684\u7814\u7a76\u3001\u65b9\u6cd5\u8bba\u4e0e\u89c1\u89e3\u3002",
    readCta: "\u9605\u8bfb \u2192",
    backAll: "\u2190 \u6240\u6709\u6587\u7ae0",
    readSuffix: "\u9605\u8bfb\u65f6\u95f4",
    authorRole: "\u521b\u59cb\u4eba ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "\u8bc4\u4f30\u60a8\u7684\u667a\u80fd\u4f53\u6cbb\u7406",
    ctaSubtitle: "10\u5206\u949f\u514d\u8d39\u8bca\u65ad\u3002\u5373\u65f6\u8bc4\u5206\u3002PDF\u62a5\u544a\u3002",
    ctaButton: "\u8ba1\u7b97\u6211\u7684 ACF Score\u00ae \u2192",
    allFilter: "\u5168\u90e8",
  },
  ko: {
    badge: "\ube14\ub85c\uadf8 & \ub9ac\uc11c\uce58",
    title: "\uc5d0\uc774\uc804\ud2b8",
    titleHighlight: "\uac70\ubc84\ub10c\uc2a4",
    subtitle: "\uc790\uc728 AI \uc5d0\uc774\uc804\ud2b8 \uac70\ubc84\ub10c\uc2a4\uc5d0 \ub300\ud55c \uc5f0\uad6c, \ubc29\ubc95\ub860 \ubc0f \uc778\uc0ac\uc774\ud2b8.",
    readCta: "\uc77d\uae30 \u2192",
    backAll: "\u2190 \ubaa8\ub4e0 \uae00",
    readSuffix: "\uc77d\uae30 \uc2dc\uac04",
    authorRole: "\uc124\ub9bd\uc790 ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "\uc5d0\uc774\uc804\ud2b8 \uac70\ubc84\ub10c\uc2a4\ub97c \ud3c9\uac00\ud558\uc138\uc694",
    ctaSubtitle: "10\ubd84 \ubb34\ub8cc \uc9c4\ub2e8. \uc989\uc2dc \uc810\uc218. PDF \ubcf4\uace0\uc11c.",
    ctaButton: "ACF Score\u00ae \uacc4\uc0b0\ud558\uae30 \u2192",
    allFilter: "\uc804\uccb4",
  },
  it: {
    badge: "BLOG & RICERCA",
    title: "Governance",
    titleHighlight: "agentica",
    subtitle: "Ricerca, metodologia e approfondimenti sulla governance degli agenti IA autonomi.",
    readCta: "Leggi \u2192",
    backAll: "\u2190 Tutti gli articoli",
    readSuffix: "di lettura",
    authorRole: "Fondatore ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "Valuta la tua governance agentica",
    ctaSubtitle: "Diagnosi gratuita in 10 minuti. Punteggio immediato. Report PDF.",
    ctaButton: "Calcola il mio ACF Score\u00ae \u2192",
    allFilter: "TUTTI",
  },
  nl: {
    badge: "BLOG & ONDERZOEK",
    title: "Agentisch",
    titleHighlight: "bestuur",
    subtitle: "Onderzoek, methodologie en inzichten over het bestuur van autonome AI-agenten.",
    readCta: "Lezen \u2192",
    backAll: "\u2190 Alle artikelen",
    readSuffix: "leestijd",
    authorRole: "Oprichter ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "Beoordeel uw agentisch bestuur",
    ctaSubtitle: "Gratis diagnose in 10 minuten. Direct resultaat. PDF-rapport.",
    ctaButton: "Mijn ACF Score\u00ae berekenen \u2192",
    allFilter: "ALLE",
  },
  ru: {
    badge: "\u0411\u041b\u041e\u0413 \u0418 \u0418\u0421\u0421\u041b\u0415\u0414\u041e\u0412\u0410\u041d\u0418\u042f",
    title: "\u0410\u0433\u0435\u043d\u0442\u043d\u043e\u0435",
    titleHighlight: "\u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
    subtitle: "\u0418\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u044f, \u043c\u0435\u0442\u043e\u0434\u043e\u043b\u043e\u0433\u0438\u044f \u0438 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430 \u043f\u043e \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044e \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u043c\u0438 \u0418\u0418-\u0430\u0433\u0435\u043d\u0442\u0430\u043c\u0438.",
    readCta: "\u0427\u0438\u0442\u0430\u0442\u044c \u2192",
    backAll: "\u2190 \u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u044c\u0438",
    readSuffix: "\u0447\u0442\u0435\u043d\u0438\u044f",
    authorRole: "\u041e\u0441\u043d\u043e\u0432\u0430\u0442\u0435\u043b\u044c ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "\u041e\u0446\u0435\u043d\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0430\u0433\u0435\u043d\u0442\u043d\u043e\u0435 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
    ctaSubtitle: "\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u0430\u044f \u0434\u0438\u0430\u0433\u043d\u043e\u0441\u0442\u0438\u043a\u0430 \u0437\u0430 10 \u043c\u0438\u043d\u0443\u0442. \u041c\u0433\u043d\u043e\u0432\u0435\u043d\u043d\u044b\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442. PDF-\u043e\u0442\u0447\u0451\u0442.",
    ctaButton: "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044c \u043c\u043e\u0439 ACF Score\u00ae \u2192",
    allFilter: "\u0412\u0421\u0415",
  },
  ar: {
    badge: "\u0627\u0644\u0645\u062f\u0648\u0651\u0646\u0629 \u0648\u0627\u0644\u0623\u0628\u062d\u0627\u062b",
    title: "\u062d\u0648\u0643\u0645\u0629",
    titleHighlight: "\u0627\u0644\u0648\u0643\u0644\u0627\u0621",
    subtitle: "\u0623\u0628\u062d\u0627\u062b \u0648\u0645\u0646\u0647\u062c\u064a\u0627\u062a \u0648\u0631\u0624\u0649 \u062d\u0648\u0644 \u062d\u0648\u0643\u0645\u0629 \u0648\u0643\u0644\u0627\u0621 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0627\u0644\u0645\u0633\u062a\u0642\u0644\u064a\u0646.",
    readCta: "\u0627\u0642\u0631\u0623 \u2192",
    backAll: "\u2190 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a",
    readSuffix: "\u0644\u0644\u0642\u0631\u0627\u0621\u0629",
    authorRole: "\u0627\u0644\u0645\u0624\u0633\u0633 ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "\u0642\u064a\u0651\u0645 \u062d\u0648\u0643\u0645\u0629 \u0627\u0644\u0648\u0643\u0644\u0627\u0621 \u0644\u062f\u064a\u0643",
    ctaSubtitle: "\u062a\u0634\u062e\u064a\u0635 \u0645\u062c\u0627\u0646\u064a \u0641\u064a 10 \u062f\u0642\u0627\u0626\u0642. \u0646\u062a\u064a\u062c\u0629 \u0641\u0648\u0631\u064a\u0629. \u062a\u0642\u0631\u064a\u0631 PDF.",
    ctaButton: "\u0627\u062d\u0633\u0628 ACF Score\u00ae \u0627\u0644\u062e\u0627\u0635 \u0628\u064a \u2192",
    allFilter: "\u0627\u0644\u0643\u0644",
  },
  tr: {
    badge: "BLOG & ARA\u015eTIRMA",
    title: "Ajantik",
    titleHighlight: "y\u00f6neti\u015fim",
    subtitle: "Otonom yapay zek\u00e2 ajanlar\u0131n\u0131n y\u00f6neti\u015fimi \u00fczerine ara\u015ft\u0131rma, metodoloji ve i\u00e7g\u00f6r\u00fcler.",
    readCta: "Oku \u2192",
    backAll: "\u2190 T\u00fcm makaleler",
    readSuffix: "okuma s\u00fcresi",
    authorRole: "Kurucu ACF\u00ae \u00b7 AI CONSULTING",
    ctaTitle: "Ajantik y\u00f6neti\u015fiminizi de\u011ferlendirin",
    ctaSubtitle: "10 dakikada \u00fccretsiz tan\u0131. Anl\u0131k skor. PDF raporu.",
    ctaButton: "ACF Score\u00ae hesapla \u2192",
    allFilter: "T\u00dcM\u00dc",
  },
};

export default function BlogPage() {
  const locale = useLocale();
  const lang = (ui as any)[locale] ? locale : "en";
  const t = (ui as any)[lang];
  const articles = lang === "fr" ? articles_fr : articles_en;
  const categoryFilters = lang === "fr" ? categoryFilters_fr : categoryFilters_en;

  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [filter, setFilter] = useState(t.allFilter);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && articles.find(a => a.slug === hash)) setActiveArticle(hash);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [activeArticle]);

  const filtered = filter === t.allFilter ? articles : articles.filter((a: any) => a.category === filter);
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
          <a href={`/${locale}/`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>BLOG</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{"\u2190 Home"}</a>
            <a href="https://www.acf-score.com/" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score {"\u2192"}</a>
          </div>
        </div>
      </nav>

      {!current ? (
        <>
          {/* LISTING HERO */}
          <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
            <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
              <div className="fade-up"><Badge>{t.badge}</Badge></div>
              <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, lineHeight: 1.1, marginTop: 24, marginBottom: 14, letterSpacing: "-1px" }}>
                {t.title} <span style={{ color: C.gold }}>{t.titleHighlight}</span>
              </h1>
              <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
                {t.subtitle}
              </p>
            </div>
          </section>

          {/* FILTERS */}
          <section style={{ padding: "0 0 40px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {categoryFilters.map((cat: any) => (
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
              {filtered.map((a: any) => (
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
                    <span style={{ color: C.gold, fontSize: 13, fontWeight: 600 }}>{t.readCta}</span>
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
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.color = C.gray2; }}>{t.backAll}</button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: current.catColor, letterSpacing: ".1em", background: `${current.catColor}15`, border: `1px solid ${current.catColor}30`, padding: "4px 10px", borderRadius: 100 }}>{current.category}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray }}>{current.date}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray }}>{"\u00b7"}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray }}>{current.readTime} {t.readSuffix}</span>
            </div>

            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-.5px" }}>{current.title}</h1>
            <p style={{ fontSize: 17, color: C.gray2, lineHeight: 1.7, marginBottom: 40, paddingBottom: 32, borderBottom: `1px solid ${C.bd1}` }}>{current.excerpt}</p>

            <div>
              {current.content.map((block: any, i: number) => {
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
                    {block.text.split("|").map((item: any, j: number) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: C.gold, marginTop: 5, flexShrink: 0 }}>{"\u25b8"}</span>
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
                <div style={{ fontSize: 13, color: C.gray }}>{t.authorRole}</div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 32, padding: 32, background: C.navy2, border: `1px solid ${C.goldBorder}`, borderRadius: 16, textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{t.ctaTitle}</h3>
              <p style={{ fontSize: 14, color: C.gray2, marginBottom: 20 }}>{t.ctaSubtitle}</p>
              <a href="https://www.acf-score.com/" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>{t.ctaButton}</a>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <AIAgent />
    </div>
  );
}
