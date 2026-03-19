"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
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
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
  purple: "#8b5cf6",
  bd1: "rgba(255,255,255,.07)",
};

/* ═══════════════════════════════════════════════════════════════
   BILINGUAL UI STRINGS
   ═══════════════════════════════════════════════════════════════ */
const ui: Record<string, Record<string, string>> = {
  fr: {
    navSubtext: "EU AI ACT CHECKER",
    navHome: "\u2190 Accueil",
    navCta: "Obtenir votre ACF Score \u2192",
    heroTitle: "V\u00e9rificateur de conformit\u00e9 EU AI Act",
    heroSub:
      "Outil de diagnostic gratuit bas\u00e9 sur le diagramme de flux du Future of Life Institute (v1.0) pour \u00e9valuer votre conformit\u00e9 au R\u00e8glement europ\u00e9en sur l\u2019intelligence artificielle.",
    start: "Commencer le diagnostic",
    next: "Suivant",
    prev: "Pr\u00e9c\u00e9dent",
    stepOf: "sur",
    source: "Source",
    note: "Remarque",
    seeDefinitions: "Voir les d\u00e9finitions",
    hideDefinitions: "Masquer les d\u00e9finitions",
    resultsTitle: "Vos r\u00e9sultats",
    resultsSubtitle:
      "Voici un r\u00e9sum\u00e9 de vos obligations au titre du R\u00e8glement europ\u00e9en sur l\u2019IA, bas\u00e9 sur vos r\u00e9ponses.",
    saveTitle: "Sauvegarder vos r\u00e9sultats",
    aiNameLabel: "Nom de votre syst\u00e8me d\u2019IA *",
    aiNamePlaceholder: "Ex : MonSyst\u00e8meIA",
    emailLabel: "Adresse \u00e9lectronique",
    emailPlaceholder: "nom@entreprise.com",
    sendBtn: "Envoyer mes r\u00e9sultats par courriel",
    pdfTitle: "Enregistrer en PDF",
    pdfInstructions:
      "Appuyez sur Ctrl+P (ou Cmd+P sur Mac) pour imprimer cette page en PDF.",
    successToast: "R\u00e9sultats envoy\u00e9s avec succ\u00e8s !",
    ctaText:
      "Besoin d\u2019accompagnement ? D\u00e9couvrez le framework ACF\u00ae \u2192",
    restart: "Recommencer le diagnostic",
    question: "Question",
    obligationsFound: "obligations identifi\u00e9es",
    obligationFound: "obligation identifi\u00e9e",
    whatToDo: "Que faire ?",
    noneOfAbove: "Aucune de ces r\u00e9ponses",
    yes: "Oui",
    no: "Non",
    sectionEntity: "Entit\u00e9",
    sectionHighRisk: "Haut risque",
    sectionScope: "P\u00e9rim\u00e8tre",
    sectionRules: "R\u00e8gles",
    sectionResults: "R\u00e9sultats",
    /* Progress bar phase names */
    phase1: "Votre r\u00f4le",
    phase2: "Classification",
    phase3: "R\u00e8gles",
    phase4: "R\u00e9sultats",
    /* Encouraging transition text */
    encourage1: "Commen\u00e7ons par identifier votre situation...",
    encourage2: "Quelques pr\u00e9cisions sur votre syst\u00e8me...",
    encourage3: "\u00c9valuons le niveau de risque...",
    encourage4: "Derni\u00e8re v\u00e9rification...",
    /* Entity helper descriptions */
    helperProvider: "Vous d\u00e9veloppez un syst\u00e8me d\u2019IA et le commercialisez sous votre nom",
    helperDeployer: "Vous utilisez un syst\u00e8me d\u2019IA d\u00e9velopp\u00e9 par un tiers (ex: ChatGPT, Copilot...)",
    helperDistributor: "Vous revendez des syst\u00e8mes d\u2019IA sans les modifier",
    helperImporter: "Vous importez dans l\u2019UE des syst\u00e8mes d\u2019IA d\u2019un fournisseur hors UE",
    helperProductMfg: "Vous int\u00e9grez un syst\u00e8me d\u2019IA dans votre produit physique",
    helperAuthRep: "Vous repr\u00e9sentez un fournisseur non-UE via un mandat \u00e9crit",
    /* Priority badges */
    priorityUrgent: "Urgent",
    priorityImportant: "Important",
    priorityInfo: "Info",
  },
  en: {
    navSubtext: "EU AI ACT CHECKER",
    navHome: "\u2190 Home",
    navCta: "Get your ACF Score \u2192",
    heroTitle: "EU AI Act Compliance Checker",
    heroSub:
      "Free diagnostic tool based on the Future of Life Institute flowchart (v1.0) to assess your compliance with the European AI Regulation.",
    start: "Start the diagnostic",
    next: "Next",
    prev: "Previous",
    stepOf: "of",
    source: "Source",
    note: "Note",
    seeDefinitions: "See definitions",
    hideDefinitions: "Hide definitions",
    resultsTitle: "Your results",
    resultsSubtitle:
      "Here is a summary of your obligations under the European AI Regulation, based on your answers.",
    saveTitle: "Save your results",
    aiNameLabel: "Name of your AI system *",
    aiNamePlaceholder: "E.g.: MyAISystem",
    emailLabel: "Email address",
    emailPlaceholder: "name@company.com",
    sendBtn: "Send my results by email",
    pdfTitle: "Save as PDF",
    pdfInstructions:
      "Press Ctrl+P (or Cmd+P on Mac) to print this page as PDF.",
    successToast: "Results sent successfully!",
    ctaText: "Need guidance? Discover the ACF\u00ae framework \u2192",
    restart: "Restart the diagnostic",
    question: "Question",
    obligationsFound: "obligations identified",
    obligationFound: "obligation identified",
    whatToDo: "What to do?",
    noneOfAbove: "None of the above",
    yes: "Yes",
    no: "No",
    sectionEntity: "Entity",
    sectionHighRisk: "High Risk",
    sectionScope: "Scope",
    sectionRules: "Rules",
    sectionResults: "Results",
    /* Progress bar phase names */
    phase1: "Your role",
    phase2: "Classification",
    phase3: "Rules",
    phase4: "Results",
    /* Encouraging transition text */
    encourage1: "Let\u2019s start by identifying your situation...",
    encourage2: "A few details about your system...",
    encourage3: "Let\u2019s assess the risk level...",
    encourage4: "Final checks...",
    /* Entity helper descriptions */
    helperProvider: "You develop an AI system and market it under your name",
    helperDeployer: "You use an AI system built by others (e.g. ChatGPT, Copilot...)",
    helperDistributor: "You resell AI systems without modifying them",
    helperImporter: "You import AI systems from a non-EU provider into the EU",
    helperProductMfg: "You integrate an AI system into your physical product",
    helperAuthRep: "You represent a non-EU provider through a written mandate",
    /* Priority badges */
    priorityUrgent: "Urgent",
    priorityImportant: "Important",
    priorityInfo: "Info",
  },
};

/* ═══════════════════════════════════════════════════════════════
   STEP DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */
type StepType = "radio" | "checkbox";

interface StepDef {
  id: string;
  section: "E" | "HR" | "S" | "R";
  type: StepType;
  title: { fr: string; en: string };
  question: { fr: string; en: string };
  note?: { fr: string; en: string };
  hint?: { fr: string; en: string };
  options: { fr: string; en: string }[];
  source: { fr: string; en: string };
  hasDefinitions?: boolean;
  definitions?: { fr: string; en: string };
}

const STEPS: StepDef[] = [
  /* ─── E1: Entity Type ─── */
  {
    id: "E1",
    section: "E",
    type: "radio",
    title: {
      fr: "Type d\u2019entit\u00e9",
      en: "Entity type",
    },
    question: {
      fr: "Quel type d\u2019entit\u00e9 est votre organisation ?",
      en: "What type of entity is your organisation?",
    },
    note: {
      fr: "Il est possible d\u2019\u00eatre plusieurs types d\u2019entit\u00e9s \u00e0 la fois (consid\u00e9rant 83).",
      en: "It is possible to be multiple entity types at the same time (recital 83).",
    },
    options: [
      { fr: "Fournisseur", en: "Provider" },
      { fr: "D\u00e9ployeur", en: "Deployer" },
      { fr: "Distributeur", en: "Distributor" },
      { fr: "Importateur", en: "Importer" },
      { fr: "Fabricant de produits", en: "Product manufacturer" },
      { fr: "Repr\u00e9sentant autoris\u00e9", en: "Authorised representative" },
    ],
    source: {
      fr: "Article 3, points 2-8, consid\u00e9rant 87",
      en: "Article 3, points 2-8, recital 87",
    },
    hasDefinitions: true,
    definitions: {
      fr: "\u2022 Fournisseur : personne physique/morale qui d\u00e9veloppe ou fait d\u00e9velopper un syst\u00e8me d\u2019IA et le met sur le march\u00e9 ou le met en service sous son propre nom ou sa propre marque (Art. 3(2)).\n\u2022 D\u00e9ployeur : personne physique/morale qui utilise un syst\u00e8me d\u2019IA sous sa propre autorit\u00e9 (Art. 3(4)).\n\u2022 Distributeur : personne physique/morale dans la cha\u00eene d\u2019approvisionnement, autre que le fournisseur ou l\u2019importateur, qui met un syst\u00e8me d\u2019IA \u00e0 disposition sur le march\u00e9 (Art. 3(6)).\n\u2022 Importateur : personne physique/morale \u00e9tablie dans l\u2019UE qui met sur le march\u00e9 un syst\u00e8me d\u2019IA portant le nom ou la marque d\u2019une personne \u00e9tablie hors UE (Art. 3(7)).\n\u2022 Fabricant de produits : fabricant au sens de la l\u00e9gislation d\u2019harmonisation de l\u2019UE qui met sur le march\u00e9 ou en service un produit avec un syst\u00e8me d\u2019IA (Art. 3(5)).\n\u2022 Repr\u00e9sentant autoris\u00e9 : personne physique/morale \u00e9tablie dans l\u2019UE ayant re\u00e7u un mandat \u00e9crit d\u2019un fournisseur (Art. 3(8)).",
      en: "\u2022 Provider: natural/legal person who develops or has an AI system developed and places it on the market or puts it into service under its own name or trademark (Art. 3(2)).\n\u2022 Deployer: natural/legal person using an AI system under its own authority (Art. 3(4)).\n\u2022 Distributor: natural/legal person in the supply chain, other than the provider or importer, that makes an AI system available on the market (Art. 3(6)).\n\u2022 Importer: natural/legal person established in the EU placing on the market an AI system bearing the name or trademark of a person established outside the EU (Art. 3(7)).\n\u2022 Product manufacturer: manufacturer within the meaning of EU harmonisation legislation placing on the market or putting into service a product with an AI system (Art. 3(5)).\n\u2022 Authorised representative: natural/legal person established in the EU having received a written mandate from a provider (Art. 3(8)).",
    },
  },

  /* ─── E2: System Modifications ─── */
  {
    id: "E2",
    section: "E",
    type: "checkbox",
    title: {
      fr: "Modifications du syst\u00e8me",
      en: "System modifications",
    },
    question: {
      fr: "Effectuez-vous (ou un d\u00e9ployeur/distributeur/importateur en aval) l\u2019une des modifications suivantes ?",
      en: "Do you (or a downstream deployer/distributor/importer) perform any of the following modifications?",
    },
    options: [
      {
        fr: "Apposer un nom/une marque diff\u00e9rent(e) sur le syst\u00e8me",
        en: "Affix a different name/trademark on the system",
      },
      {
        fr: "Modification de la destination d\u2019un syst\u00e8me d\u00e9j\u00e0 en service",
        en: "Modify the intended purpose of a system already in service",
      },
      {
        fr: "Effectuer une modification substantielle (article 3, point 23)",
        en: "Make a substantial modification (Article 3, point 23)",
      },
      {
        fr: "Aucune de ces r\u00e9ponses",
        en: "None of the above",
      },
    ],
    source: {
      fr: "Article 25, points 1-2",
      en: "Article 25, points 1-2",
    },
  },

  /* ─── E3: Products integrating AI ─── */
  {
    id: "E3",
    section: "E",
    type: "checkbox",
    title: {
      fr: "Produits int\u00e9grant un syst\u00e8me d\u2019IA",
      en: "Products integrating an AI system",
    },
    question: {
      fr: "Votre produit int\u00e8gre-t-il un syst\u00e8me d\u2019IA ET r\u00e9pond-il \u00e0 l\u2019un des crit\u00e8res suivants ?",
      en: "Does your product integrate an AI system AND meet one of the following criteria?",
    },
    note: {
      fr: "S\u2019applique UNIQUEMENT si votre produit est mis sur le march\u00e9/en service dans l\u2019UE.",
      en: "Applies ONLY if your product is placed on the market/put into service in the EU.",
    },
    options: [
      {
        fr: 'Le syst\u00e8me d\u2019IA a \u00e9t\u00e9/sera "mis sur le march\u00e9" avec mon produit sous mon nom/marque',
        en: 'The AI system has been/will be "placed on the market" with my product under my name/trademark',
      },
      {
        fr: 'Le syst\u00e8me d\u2019IA a \u00e9t\u00e9/sera "mis en service" sous mon nom/marque apr\u00e8s la mise sur le march\u00e9',
        en: 'The AI system has been/will be "put into service" under my name/trademark after placing on the market',
      },
      {
        fr: "Aucune de ces r\u00e9ponses",
        en: "None of the above",
      },
    ],
    source: {
      fr: "Article 25, point 3, Annexe I",
      en: "Article 25, point 3, Annex I",
    },
  },

  /* ─── HR1: Annex I Section B ─── */
  {
    id: "HR1",
    section: "HR",
    type: "checkbox",
    title: {
      fr: "Annexe I, Section B",
      en: "Annex I, Section B",
    },
    question: {
      fr: "Votre syst\u00e8me d\u2019IA entre-t-il dans l\u2019une des cat\u00e9gories \u00e0 haut risque suivantes ?",
      en: "Does your AI system fall into any of the following high-risk categories?",
    },
    options: [
      {
        fr: "S\u00fbret\u00e9 de l\u2019aviation civile",
        en: "Civil aviation safety",
      },
      {
        fr: "V\u00e9hicules \u00e0 deux ou trois roues et quadricycles",
        en: "Two- or three-wheel vehicles and quadricycles",
      },
      {
        fr: "V\u00e9hicules agricoles et forestiers",
        en: "Agricultural and forestry vehicles",
      },
      { fr: "\u00c9quipements marins", en: "Marine equipment" },
      {
        fr: "Interop\u00e9rabilit\u00e9 des syst\u00e8mes ferroviaires",
        en: "Interoperability of the rail system",
      },
      {
        fr: "V\u00e9hicules \u00e0 moteur et leurs remorques",
        en: "Motor vehicles and their trailers",
      },
      { fr: "Aviation civile", en: "Civil aviation" },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: { fr: "Article 6, point 1", en: "Article 6, point 1" },
  },

  /* ─── HR2: Annex I Section A ─── */
  {
    id: "HR2",
    section: "HR",
    type: "checkbox",
    title: {
      fr: "Annexe I, Section A",
      en: "Annex I, Section A",
    },
    question: {
      fr: "Votre syst\u00e8me d\u2019IA entre-t-il dans l\u2019une des cat\u00e9gories suivantes ?",
      en: "Does your AI system fall into any of the following categories?",
    },
    options: [
      { fr: "Machines", en: "Machinery" },
      { fr: "Jouets", en: "Toys" },
      {
        fr: "Bateaux de plaisance et v\u00e9hicules nautiques",
        en: "Recreational craft and watercraft",
      },
      {
        fr: "Ascenseurs et composants de s\u00e9curit\u00e9",
        en: "Lifts and safety components",
      },
      {
        fr: "\u00c9quipements pour atmosph\u00e8res explosibles",
        en: "Equipment for explosive atmospheres",
      },
      {
        fr: "\u00c9quipements radio\u00e9lectriques",
        en: "Radio equipment",
      },
      {
        fr: "\u00c9quipements sous pression",
        en: "Pressure equipment",
      },
      {
        fr: "Installations \u00e0 c\u00e2bles",
        en: "Cableway installations",
      },
      {
        fr: "\u00c9quipements de protection individuelle",
        en: "Personal protective equipment",
      },
      { fr: "Appareils \u00e0 gaz", en: "Gas appliances" },
      {
        fr: "Dispositifs m\u00e9dicaux",
        en: "Medical devices",
      },
      {
        fr: "Dispositifs m\u00e9dicaux de diagnostic in vitro",
        en: "In vitro diagnostic medical devices",
      },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: { fr: "Article 6, point 1", en: "Article 6, point 1" },
  },

  /* ─── HR3: Third-party conformity assessment ─── */
  {
    id: "HR3",
    section: "HR",
    type: "radio",
    title: {
      fr: "\u00c9valuation de conformit\u00e9 par tiers",
      en: "Third-party conformity assessment",
    },
    question: {
      fr: "Votre produit (ou le produit dont votre syst\u00e8me d\u2019IA est un composant de s\u00e9curit\u00e9) doit-il faire l\u2019objet d\u2019une \u00e9valuation de conformit\u00e9 par un tiers en vertu de la l\u00e9gislation europ\u00e9enne existante ?",
      en: "Does your product (or the product of which your AI system is a safety component) need to undergo a third-party conformity assessment under existing EU legislation?",
    },
    hint: {
      fr: "Chaque cat\u00e9gorie \u00e0 haut risque est associ\u00e9e \u00e0 une l\u00e9gislation existante ; voir Annexe I, Section A.",
      en: "Each high-risk category is associated with existing legislation; see Annex I, Section A.",
    },
    options: [
      { fr: "Oui", en: "Yes" },
      { fr: "Non", en: "No" },
    ],
    source: { fr: "Article 6, point 1", en: "Article 6, point 1" },
  },

  /* ─── HR4: Annex III ─── */
  {
    id: "HR4",
    section: "HR",
    type: "checkbox",
    title: { fr: "Annexe III", en: "Annex III" },
    question: {
      fr: "Votre syst\u00e8me d\u2019IA entre-t-il dans l\u2019une des cat\u00e9gories \u00e0 haut risque suivantes ?",
      en: "Does your AI system fall into any of the following high-risk categories?",
    },
    hint: {
      fr: "Voir les d\u00e9finitions dans l\u2019Annexe III.",
      en: "See definitions in Annex III.",
    },
    options: [
      { fr: "Biom\u00e9trie (ex : reconnaissance faciale)", en: "Biometrics (e.g. facial recognition)" },
      {
        fr: "Infrastructures critiques (ex : r\u00e9seaux \u00e9lectriques, eau)",
        en: "Critical infrastructure (e.g. power grids, water)",
      },
      {
        fr: "\u00c9ducation et formation professionnelle (ex : notation automatis\u00e9e)",
        en: "Education and vocational training (e.g. automated grading)",
      },
      {
        fr: "Emploi et gestion des travailleurs (ex : tri de CV)",
        en: "Employment and workers management (e.g. CV screening)",
      },
      {
        fr: "Services priv\u00e9s essentiels et services publics (ex : scoring de cr\u00e9dit)",
        en: "Essential private and public services (e.g. credit scoring)",
      },
      { fr: "R\u00e9pression (ex : \u00e9valuation des risques)", en: "Law enforcement (e.g. risk assessment)" },
      {
        fr: "Migration, asile et contr\u00f4le aux fronti\u00e8res",
        en: "Migration, asylum and border control",
      },
      {
        fr: "Administration de la justice et processus d\u00e9mocratiques",
        en: "Administration of justice and democratic processes",
      },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: { fr: "Article 6, point 2", en: "Article 6, point 2" },
  },

  /* ─── HR5: Significant risk ─── */
  {
    id: "HR5",
    section: "HR",
    type: "radio",
    title: {
      fr: "Risque significatif",
      en: "Significant risk",
    },
    question: {
      fr: "Votre syst\u00e8me d\u2019IA pr\u00e9sente-t-il un risque significatif de pr\u00e9judice pour la sant\u00e9, la s\u00e9curit\u00e9 ou les droits fondamentaux ?",
      en: "Does your AI system pose a significant risk of harm to health, safety or fundamental rights?",
    },
    hint: {
      fr: "Le syst\u00e8me ne pr\u00e9sente PAS de risque significatif si : il effectue une t\u00e2che proc\u00e9durale \u00e9troite ; il am\u00e9liore le r\u00e9sultat d\u2019une activit\u00e9 humaine pr\u00e9alable ; il d\u00e9tecte des sch\u00e9mas d\u00e9cisionnels sans remplacer l\u2019\u00e9valuation humaine ; il effectue une t\u00e2che pr\u00e9paratoire. Note : un syst\u00e8me effectuant du profilage de personnes physiques est TOUJOURS consid\u00e9r\u00e9 \u00e0 haut risque.",
      en: "The system does NOT pose a significant risk if: it performs a narrow procedural task; it improves the result of a previously completed human activity; it detects decision-making patterns without replacing human assessment; it performs a preparatory task. Note: a system profiling natural persons is ALWAYS considered high-risk.",
    },
    options: [
      { fr: "Oui", en: "Yes" },
      { fr: "Non", en: "No" },
    ],
    source: { fr: "Article 6, point 3", en: "Article 6, point 3" },
  },

  /* ─── HR6: Safety component for Product Manufacturers ─── */
  {
    id: "HR6",
    section: "HR",
    type: "checkbox",
    title: {
      fr: "Composant de s\u00e9curit\u00e9 dans un produit",
      en: "Safety component in a product",
    },
    question: {
      fr: "Votre produit inclut-il un syst\u00e8me d\u2019IA comme composant de s\u00e9curit\u00e9 ET entre-t-il dans l\u2019une des cat\u00e9gories suivantes ?",
      en: "Does your product include an AI system as a safety component AND fall into any of the following categories?",
    },
    options: [
      {
        fr: "S\u00fbret\u00e9 de l\u2019aviation civile",
        en: "Civil aviation safety",
      },
      {
        fr: "V\u00e9hicules \u00e0 deux ou trois roues et quadricycles",
        en: "Two- or three-wheel vehicles and quadricycles",
      },
      {
        fr: "V\u00e9hicules agricoles et forestiers",
        en: "Agricultural and forestry vehicles",
      },
      { fr: "\u00c9quipements marins", en: "Marine equipment" },
      {
        fr: "Interop\u00e9rabilit\u00e9 des syst\u00e8mes ferroviaires",
        en: "Interoperability of the rail system",
      },
      {
        fr: "V\u00e9hicules \u00e0 moteur et leurs remorques",
        en: "Motor vehicles and their trailers",
      },
      { fr: "Aviation civile", en: "Civil aviation" },
      { fr: "Machines", en: "Machinery" },
      { fr: "Jouets", en: "Toys" },
      {
        fr: "Bateaux de plaisance et v\u00e9hicules nautiques",
        en: "Recreational craft and watercraft",
      },
      {
        fr: "Ascenseurs et composants de s\u00e9curit\u00e9",
        en: "Lifts and safety components",
      },
      {
        fr: "\u00c9quipements pour atmosph\u00e8res explosibles",
        en: "Equipment for explosive atmospheres",
      },
      {
        fr: "\u00c9quipements radio\u00e9lectriques",
        en: "Radio equipment",
      },
      {
        fr: "\u00c9quipements sous pression",
        en: "Pressure equipment",
      },
      {
        fr: "Installations \u00e0 c\u00e2bles",
        en: "Cableway installations",
      },
      {
        fr: "\u00c9quipements de protection individuelle",
        en: "Personal protective equipment",
      },
      { fr: "Appareils \u00e0 gaz", en: "Gas appliances" },
      {
        fr: "Dispositifs m\u00e9dicaux",
        en: "Medical devices",
      },
      {
        fr: "Dispositifs m\u00e9dicaux de diagnostic in vitro",
        en: "In vitro diagnostic medical devices",
      },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: {
      fr: "Article 25, point 3, Annexe I",
      en: "Article 25, point 3, Annex I",
    },
  },

  /* ─── S1: Scope ─── */
  {
    id: "S1",
    section: "S",
    type: "checkbox",
    title: {
      fr: "Champ d\u2019application",
      en: "Scope",
    },
    question: {
      fr: "R\u00e9pondez-vous \u00e0 l\u2019un des crit\u00e8res suivants ?",
      en: "Do you meet any of the following criteria?",
    },
    options: [
      {
        fr: "Je mets sur le march\u00e9 ou en service des syst\u00e8mes d\u2019IA dans l\u2019UE",
        en: "I place on the market or put into service AI systems in the EU",
      },
      {
        fr: "Je mets sur le march\u00e9 des mod\u00e8les d\u2019IA \u00e0 usage g\u00e9n\u00e9ral dans l\u2019UE",
        en: "I place on the market general-purpose AI models in the EU",
      },
      {
        fr: "Je suis \u00e9tabli(e) dans l\u2019UE",
        en: "I am established in the EU",
      },
      {
        fr: "Je mets sur le march\u00e9 un syst\u00e8me d\u2019IA portant le nom/la marque d\u2019une personne \u00e9tablie hors UE",
        en: "I place on the market an AI system bearing the name/trademark of a person established outside the EU",
      },
      {
        fr: "Les r\u00e9sultats de mon syst\u00e8me d\u2019IA sont utilis\u00e9s dans l\u2019UE",
        en: "The outputs of my AI system are used in the EU",
      },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: { fr: "Article 2", en: "Article 2" },
  },

  /* ─── R1: GPAI with systemic risk ─── */
  {
    id: "R1",
    section: "R",
    type: "checkbox",
    title: {
      fr: "Mod\u00e8les d\u2019IA \u00e0 usage g\u00e9n\u00e9ral avec risque syst\u00e9mique",
      en: "General-purpose AI models with systemic risk",
    },
    question: {
      fr: "Votre mod\u00e8le d\u2019IA r\u00e9pond-il \u00e0 l\u2019un des crit\u00e8res suivants ?",
      en: "Does your AI model meet any of the following criteria?",
    },
    note: {
      fr: "Capacit\u00e9s d\u2019impact \u00e9lev\u00e9 : volume de calcul > 10\u00b2\u2075 FLOP (Article 51, paragraphe 2)",
      en: "High-impact capabilities: compute volume > 10\u00b2\u2075 FLOP (Article 51, paragraph 2)",
    },
    options: [
      {
        fr: "Il a des capacit\u00e9s d\u2019impact \u00e9lev\u00e9es",
        en: "It has high-impact capabilities",
      },
      {
        fr: "La Commission a d\u00e9cid\u00e9 qu\u2019il avait des capacit\u00e9s/impact \u00e9lev\u00e9s (Annexe XIII)",
        en: "The Commission has decided it has high capabilities/impact (Annex XIII)",
      },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: { fr: "Article 51", en: "Article 51" },
  },

  /* ─── R2: Excluded systems ─── */
  {
    id: "R2",
    section: "R",
    type: "checkbox",
    title: {
      fr: "Syst\u00e8mes exclus",
      en: "Excluded systems",
    },
    question: {
      fr: "Votre syst\u00e8me ou cas d\u2019utilisation entre-t-il dans l\u2019une des cat\u00e9gories suivantes ?",
      en: "Does your system or use case fall into any of the following categories?",
    },
    options: [
      {
        fr: "Syst\u00e8mes d\u2019IA \u00e0 des fins exclusivement militaires",
        en: "AI systems for exclusively military purposes",
      },
      {
        fr: "Autorit\u00e9s publiques de pays tiers pour application de la loi",
        en: "Public authorities of third countries for law enforcement",
      },
      {
        fr: "Activit\u00e9s de R&D en IA",
        en: "AI R&D activities",
      },
      {
        fr: "Composants IA sous licence libre et gratuite",
        en: "AI components under free and open-source licence",
      },
      {
        fr: "Usage purement personnel et non professionnel",
        en: "Purely personal and non-professional use",
      },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: { fr: "Article 2", en: "Article 2" },
  },

  /* ─── R3: Prohibited practices ─── */
  {
    id: "R3",
    section: "R",
    type: "checkbox",
    title: {
      fr: "Pratiques interdites",
      en: "Prohibited practices",
    },
    question: {
      fr: "Votre syst\u00e8me effectue-t-il l\u2019une de ces fonctions ?",
      en: "Does your system perform any of these functions?",
    },
    hint: {
      fr: "Voir les d\u00e9finitions \u00e0 l\u2019Article 5.",
      en: "See definitions in Article 5.",
    },
    options: [
      {
        fr: "Techniques subliminales, manipulation et tromperie",
        en: "Subliminal techniques, manipulation and deception",
      },
      {
        fr: "Exploitation des vuln\u00e9rabilit\u00e9s",
        en: "Exploitation of vulnerabilities",
      },
      {
        fr: "Cat\u00e9gorisation biom\u00e9trique",
        en: "Biometric categorisation",
      },
      {
        fr: "Notation sociale (scoring social)",
        en: "Social scoring",
      },
      { fr: "Police pr\u00e9dictive", en: "Predictive policing" },
      {
        fr: "Constitution de bases de donn\u00e9es de reconnaissance faciale",
        en: "Building facial recognition databases",
      },
      {
        fr: "Reconnaissance des \u00e9motions sur le lieu de travail ou dans les \u00e9tablissements d\u2019enseignement (sauf raisons m\u00e9dicales/s\u00e9curit\u00e9)",
        en: "Emotion recognition in the workplace or educational institutions (except for medical/safety reasons)",
      },
      {
        fr: "Biom\u00e9trie \u00e0 distance en temps r\u00e9el",
        en: "Real-time remote biometrics",
      },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: { fr: "Article 5", en: "Article 5" },
  },

  /* ─── R4: Transparency obligations ─── */
  {
    id: "R4",
    section: "R",
    type: "checkbox",
    title: {
      fr: "Obligations de transparence",
      en: "Transparency obligations",
    },
    question: {
      fr: "Votre syst\u00e8me effectue-t-il l\u2019une de ces fonctions ?",
      en: "Does your system perform any of these functions?",
    },
    options: [
      {
        fr: "G\u00e9n\u00e9ration ou manipulation d\u2019images, audio ou vid\u00e9o constituant un deepfake",
        en: "Generation or manipulation of images, audio or video constituting a deepfake",
      },
      {
        fr: "G\u00e9n\u00e9ration ou manipulation de texte publi\u00e9 pour informer le public sur des sujets d\u2019int\u00e9r\u00eat g\u00e9n\u00e9ral",
        en: "Generation or manipulation of text published to inform the public on matters of general interest",
      },
      {
        fr: "Reconnaissance des \u00e9motions ou cat\u00e9gorisation biom\u00e9trique",
        en: "Emotion recognition or biometric categorisation",
      },
      {
        fr: "Interaction directe avec des personnes",
        en: "Direct interaction with persons",
      },
      {
        fr: "G\u00e9n\u00e9ration de contenu synth\u00e9tique (audio, image, vid\u00e9o ou texte)",
        en: "Generation of synthetic content (audio, image, video or text)",
      },
      { fr: "Aucune de ces r\u00e9ponses", en: "None of the above" },
    ],
    source: { fr: "Article 50", en: "Article 50" },
  },

  /* ─── R5: Public law ─── */
  {
    id: "R5",
    section: "R",
    type: "radio",
    title: {
      fr: "Droit public",
      en: "Public law",
    },
    question: {
      fr: "\u00cates-vous un organisme de droit public ou une entit\u00e9 priv\u00e9e fournissant des services publics ?",
      en: "Are you a body governed by public law or a private entity providing public services?",
    },
    options: [
      { fr: "Oui", en: "Yes" },
      { fr: "Non", en: "No" },
    ],
    source: { fr: "Consid\u00e9rant 96", en: "Recital 96" },
  },
];

/* step index lookup */
const STEP_INDEX: Record<string, number> = {};
STEPS.forEach((s, i) => {
  STEP_INDEX[s.id] = i;
});

/* ═══════════════════════════════════════════════════════════════
   OBLIGATION DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */
interface ObligationDef {
  id: string;
  title: { fr: string; en: string };
  desc: { fr: string; en: string };
  articles: { fr: string; en: string };
  action: { fr: string; en: string };
  color: string;
}

const OBLIGATIONS: ObligationDef[] = [
  {
    id: "ai_literacy",
    title: { fr: "Ma\u00eetrise de l\u2019IA", en: "AI Literacy" },
    desc: {
      fr: "Tous les op\u00e9rateurs doivent veiller \u00e0 ce que le personnel disposant de comp\u00e9tences suffisantes en mati\u00e8re d\u2019IA.",
      en: "All operators must ensure staff have sufficient AI literacy skills.",
    },
    articles: { fr: "Article 4", en: "Article 4" },
    action: {
      fr: "Mettre en place un programme de formation en ma\u00eetrise de l\u2019IA pour votre personnel.",
      en: "Implement an AI literacy training programme for your staff.",
    },
    color: C.gold,
  },
  {
    id: "handover",
    title: {
      fr: "Transfert d\u2019obligations (fournisseur)",
      en: "Handover obligations (provider)",
    },
    desc: {
      fr: "Les modifications apport\u00e9es entra\u00eenent un transfert des obligations du fournisseur vers vous.",
      en: "The modifications made result in a transfer of provider obligations to you.",
    },
    articles: { fr: "Article 25, points 1-2", en: "Article 25, points 1-2" },
    action: {
      fr: "Vous devez respecter toutes les obligations du fournisseur conform\u00e9ment \u00e0 l\u2019Article 16.",
      en: "You must comply with all provider obligations under Article 16.",
    },
    color: C.amber,
  },
  {
    id: "provider_hr",
    title: {
      fr: "Obligations du fournisseur (haut risque)",
      en: "Provider obligations (high-risk)",
    },
    desc: {
      fr: "En tant que fournisseur d\u2019un syst\u00e8me d\u2019IA \u00e0 haut risque, vous avez des obligations sp\u00e9cifiques.",
      en: "As a provider of a high-risk AI system, you have specific obligations.",
    },
    articles: { fr: "Article 16", en: "Article 16" },
    action: {
      fr: "Syst\u00e8me de gestion de la qualit\u00e9, documentation technique, marquage CE, \u00e9valuation de conformit\u00e9, enregistrement dans la base de donn\u00e9es de l\u2019UE.",
      en: "Quality management system, technical documentation, CE marking, conformity assessment, registration in the EU database.",
    },
    color: C.red,
  },
  {
    id: "deployer_hr",
    title: {
      fr: "Obligations du d\u00e9ployeur (haut risque)",
      en: "Deployer obligations (high-risk)",
    },
    desc: {
      fr: "En tant que d\u00e9ployeur d\u2019un syst\u00e8me d\u2019IA \u00e0 haut risque, vous devez respecter certaines exigences.",
      en: "As a deployer of a high-risk AI system, you must comply with certain requirements.",
    },
    articles: { fr: "Article 26", en: "Article 26" },
    action: {
      fr: "Contr\u00f4le humain, surveillance, conservation des journaux, conformit\u00e9 avec les instructions d\u2019utilisation.",
      en: "Human oversight, monitoring, log retention, compliance with instructions for use.",
    },
    color: C.amber,
  },
  {
    id: "distributor",
    title: {
      fr: "Obligations du distributeur",
      en: "Distributor obligations",
    },
    desc: {
      fr: "En tant que distributeur, vous devez v\u00e9rifier la conformit\u00e9 du syst\u00e8me avant de le mettre \u00e0 disposition.",
      en: "As a distributor, you must verify the system's compliance before making it available.",
    },
    articles: { fr: "Article 24", en: "Article 24" },
    action: {
      fr: "V\u00e9rifier le marquage CE, la documentation et la d\u00e9claration de conformit\u00e9.",
      en: "Verify CE marking, documentation and declaration of conformity.",
    },
    color: C.purple,
  },
  {
    id: "importer",
    title: {
      fr: "Obligations de l\u2019importateur",
      en: "Importer obligations",
    },
    desc: {
      fr: "En tant qu\u2019importateur, vous devez v\u00e9rifier que le fournisseur a respect\u00e9 ses obligations.",
      en: "As an importer, you must verify that the provider has complied with its obligations.",
    },
    articles: { fr: "Article 23", en: "Article 23" },
    action: {
      fr: "V\u00e9rifier la conformit\u00e9, le marquage CE, la documentation technique et conserver une copie du certificat de conformit\u00e9.",
      en: "Verify conformity, CE marking, technical documentation and keep a copy of the conformity certificate.",
    },
    color: C.purple,
  },
  {
    id: "product_manufacturer",
    title: {
      fr: "Obligations du fabricant de produits",
      en: "Product manufacturer obligations",
    },
    desc: {
      fr: "En tant que fabricant de produits int\u00e9grant un syst\u00e8me d\u2019IA, vous avez des obligations sp\u00e9cifiques.",
      en: "As a manufacturer of products integrating an AI system, you have specific obligations.",
    },
    articles: {
      fr: "Consid\u00e9rants 47, 166",
      en: "Recitals 47, 166",
    },
    action: {
      fr: "Veiller \u00e0 ce que le syst\u00e8me d\u2019IA int\u00e9gr\u00e9 soit conforme aux exigences applicables.",
      en: "Ensure the integrated AI system complies with applicable requirements.",
    },
    color: C.amber,
  },
  {
    id: "authorised_rep",
    title: {
      fr: "Obligations du repr\u00e9sentant autoris\u00e9",
      en: "Authorised representative obligations",
    },
    desc: {
      fr: "En tant que repr\u00e9sentant autoris\u00e9, vous agissez au nom du fournisseur dans l\u2019UE.",
      en: "As an authorised representative, you act on behalf of the provider in the EU.",
    },
    articles: { fr: "Articles 22, 54", en: "Articles 22, 54" },
    action: {
      fr: "Conserver la documentation technique, coop\u00e9rer avec les autorit\u00e9s comp\u00e9tentes, informer le fournisseur de tout probl\u00e8me de conformit\u00e9.",
      en: "Keep technical documentation, cooperate with competent authorities, inform the provider of any compliance issues.",
    },
    color: C.purple,
  },
  {
    id: "gpai",
    title: {
      fr: "Obligations GPAI",
      en: "GPAI obligations",
    },
    desc: {
      fr: "En tant que fournisseur de mod\u00e8les d\u2019IA \u00e0 usage g\u00e9n\u00e9ral, vous devez respecter des obligations sp\u00e9cifiques.",
      en: "As a provider of general-purpose AI models, you must comply with specific obligations.",
    },
    articles: { fr: "Article 53", en: "Article 53" },
    action: {
      fr: "R\u00e9diger la documentation technique, politique de respect du droit d\u2019auteur, fournir un r\u00e9sum\u00e9 des donn\u00e9es d\u2019entra\u00eenement.",
      en: "Draft technical documentation, copyright compliance policy, provide a summary of training data.",
    },
    color: C.gold,
  },
  {
    id: "gpai_systemic",
    title: {
      fr: "GPAI avec risque syst\u00e9mique",
      en: "GPAI with systemic risk",
    },
    desc: {
      fr: "Votre mod\u00e8le d\u2019IA \u00e0 usage g\u00e9n\u00e9ral pr\u00e9sente un risque syst\u00e9mique et est soumis \u00e0 des obligations renforc\u00e9es.",
      en: "Your general-purpose AI model presents a systemic risk and is subject to enhanced obligations.",
    },
    articles: { fr: "Article 55", en: "Article 55" },
    action: {
      fr: "\u00c9valuation du mod\u00e8le, \u00e9valuation et att\u00e9nuation des risques syst\u00e9miques, tests adversariaux, signalement d\u2019incidents graves.",
      en: "Model evaluation, systemic risk assessment and mitigation, adversarial testing, reporting of serious incidents.",
    },
    color: C.red,
  },
  {
    id: "notify_nca",
    title: {
      fr: "Notification \u00e0 l\u2019autorit\u00e9 nationale comp\u00e9tente",
      en: "Notify national competent authority",
    },
    desc: {
      fr: "Vous devez notifier l\u2019autorit\u00e9 nationale comp\u00e9tente conform\u00e9ment \u00e0 l\u2019Article 6.",
      en: "You must notify the national competent authority in accordance with Article 6.",
    },
    articles: { fr: "Articles 49, 6", en: "Articles 49, 6" },
    action: {
      fr: "Contacter votre autorit\u00e9 nationale comp\u00e9tente pour effectuer la notification requise.",
      en: "Contact your national competent authority to make the required notification.",
    },
    color: C.amber,
  },
  {
    id: "transparency",
    title: {
      fr: "Obligations de transparence",
      en: "Transparency obligations",
    },
    desc: {
      fr: "Votre syst\u00e8me est soumis \u00e0 des obligations de transparence sp\u00e9cifiques.",
      en: "Your system is subject to specific transparency obligations.",
    },
    articles: { fr: "Article 50, points 1-4", en: "Article 50, points 1-4" },
    action: {
      fr: "Informer les utilisateurs qu\u2019ils interagissent avec une IA, marquer les contenus synth\u00e9tiques, \u00e9tiqueter les deepfakes.",
      en: "Inform users they are interacting with AI, mark synthetic content, label deepfakes.",
    },
    color: C.gold,
  },
  {
    id: "fria",
    title: {
      fr: "\u00c9valuation d\u2019impact sur les droits fondamentaux",
      en: "Fundamental Rights Impact Assessment",
    },
    desc: {
      fr: "En tant qu\u2019organisme public ou prestataire de services publics d\u00e9ployant un syst\u00e8me \u00e0 haut risque, vous devez r\u00e9aliser une AIDRF.",
      en: "As a public body or public service provider deploying a high-risk system, you must conduct a FRIA.",
    },
    articles: { fr: "Article 27", en: "Article 27" },
    action: {
      fr: "R\u00e9aliser une \u00e9valuation d\u2019impact sur les droits fondamentaux avant le d\u00e9ploiement.",
      en: "Conduct a fundamental rights impact assessment before deployment.",
    },
    color: C.amber,
  },
  {
    id: "prohibited",
    title: { fr: "INTERDIT", en: "PROHIBITED" },
    desc: {
      fr: "Votre syst\u00e8me d\u2019IA effectue une pratique interdite par le R\u00e8glement europ\u00e9en sur l\u2019IA.",
      en: "Your AI system performs a practice prohibited by the European AI Regulation.",
    },
    articles: { fr: "Article 5", en: "Article 5" },
    action: {
      fr: "Vous devez cesser imm\u00e9diatement l\u2019utilisation de ce syst\u00e8me d\u2019IA. Les sanctions peuvent aller jusqu\u2019\u00e0 35 millions d\u2019euros ou 7 % du chiffre d\u2019affaires mondial.",
      en: "You must immediately cease use of this AI system. Penalties can reach up to \u20ac35 million or 7% of global turnover.",
    },
    color: C.red,
  },
  {
    id: "out_of_scope",
    title: { fr: "Hors champ d\u2019application", en: "Out of scope" },
    desc: {
      fr: "Votre syst\u00e8me ne semble pas entrer dans le champ d\u2019application du R\u00e8glement europ\u00e9en sur l\u2019IA.",
      en: "Your system does not appear to fall within the scope of the European AI Regulation.",
    },
    articles: { fr: "Article 2", en: "Article 2" },
    action: {
      fr: "Continuez \u00e0 surveiller l\u2019\u00e9volution de la r\u00e9glementation. Ce r\u00e9sultat est indicatif et ne constitue pas un avis juridique.",
      en: "Continue to monitor regulatory developments. This result is indicative and does not constitute legal advice.",
    },
    color: C.green,
  },
  {
    id: "excluded_military",
    title: {
      fr: "Exclu : usage militaire",
      en: "Excluded: military use",
    },
    desc: {
      fr: "Les syst\u00e8mes d\u2019IA \u00e0 des fins exclusivement militaires sont exclus du R\u00e8glement.",
      en: "AI systems for exclusively military purposes are excluded from the Regulation.",
    },
    articles: { fr: "Article 2", en: "Article 2" },
    action: {
      fr: "Ce r\u00e9sultat est indicatif. D\u2019autres r\u00e9glementations peuvent s\u2019appliquer.",
      en: "This result is indicative. Other regulations may apply.",
    },
    color: C.green,
  },
  {
    id: "excluded_third_country",
    title: {
      fr: "Exclu : autorit\u00e9s de pays tiers",
      en: "Excluded: third-country authorities",
    },
    desc: {
      fr: "L\u2019utilisation par des autorit\u00e9s publiques de pays tiers est exclue du R\u00e8glement.",
      en: "Use by public authorities of third countries is excluded from the Regulation.",
    },
    articles: { fr: "Article 2", en: "Article 2" },
    action: {
      fr: "Ce r\u00e9sultat est indicatif. Des accords internationaux peuvent s\u2019appliquer.",
      en: "This result is indicative. International agreements may apply.",
    },
    color: C.green,
  },
  {
    id: "excluded_research",
    title: {
      fr: "Exclusion : recherche",
      en: "Exclusion: research",
    },
    desc: {
      fr: "Les activit\u00e9s de R&D en IA b\u00e9n\u00e9ficient d\u2019une exclusion sp\u00e9cifique.",
      en: "AI R&D activities benefit from a specific exclusion.",
    },
    articles: { fr: "Article 2", en: "Article 2" },
    action: {
      fr: "L\u2019exclusion s\u2019applique uniquement aux activit\u00e9s de recherche. La mise sur le march\u00e9 reste soumise au R\u00e8glement.",
      en: "The exclusion applies only to research activities. Placing on the market remains subject to the Regulation.",
    },
    color: C.green,
  },
  {
    id: "excluded_opensource",
    title: {
      fr: "Exclusion : open source",
      en: "Exclusion: open source",
    },
    desc: {
      fr: "Les composants IA sous licence libre et gratuite b\u00e9n\u00e9ficient d\u2019une exclusion partielle.",
      en: "AI components under free and open-source licence benefit from a partial exclusion.",
    },
    articles: { fr: "Article 2, 112", en: "Article 2, 112" },
    action: {
      fr: "L\u2019exclusion est partielle et ne s\u2019applique pas aux syst\u00e8mes \u00e0 haut risque ou interdits. V\u00e9rifiez les conditions pr\u00e9cises.",
      en: "The exclusion is partial and does not apply to high-risk or prohibited systems. Check the precise conditions.",
    },
    color: C.green,
  },
  {
    id: "excluded_personal",
    title: {
      fr: "Exclusion : usage personnel",
      en: "Exclusion: personal use",
    },
    desc: {
      fr: "L\u2019usage purement personnel et non professionnel est exclu du R\u00e8glement.",
      en: "Purely personal and non-professional use is excluded from the Regulation.",
    },
    articles: { fr: "Article 2", en: "Article 2" },
    action: {
      fr: "Cette exclusion ne s\u2019applique qu\u2019\u00e0 un usage strictement personnel.",
      en: "This exclusion applies only to strictly personal use.",
    },
    color: C.green,
  },
  {
    id: "high_risk_exception",
    title: {
      fr: "Exception haut risque",
      en: "High-risk exception",
    },
    desc: {
      fr: "Votre syst\u00e8me entre dans l\u2019Annexe III mais ne pr\u00e9sente pas de risque significatif. Il est exempt des obligations \u00e0 haut risque mais doit notifier l\u2019autorit\u00e9.",
      en: "Your system falls under Annex III but does not pose a significant risk. It is exempt from high-risk obligations but must notify the authority.",
    },
    articles: { fr: "Articles 2, 112", en: "Articles 2, 112" },
    action: {
      fr: "Notifiez l\u2019autorit\u00e9 nationale comp\u00e9tente de cette exemption.",
      en: "Notify the national competent authority of this exemption.",
    },
    color: C.gold,
  },
  {
    id: "product_mfg_out",
    title: {
      fr: "Hors champ (fabricant de produits)",
      en: "Out of scope (product manufacturer)",
    },
    desc: {
      fr: "En tant que fabricant de produits, votre produit n\u2019int\u00e8gre pas un syst\u00e8me d\u2019IA qualifiant. Pas d\u2019obligations suppl\u00e9mentaires au titre du R\u00e8glement IA.",
      en: "As a product manufacturer, your product does not integrate a qualifying AI system. No additional obligations under the AI Regulation.",
    },
    articles: { fr: "Article 25, point 3", en: "Article 25, point 3" },
    action: {
      fr: "Continuez \u00e0 surveiller les \u00e9volutions r\u00e9glementaires.",
      en: "Continue monitoring regulatory developments.",
    },
    color: C.green,
  },
];

const OBL_MAP: Record<string, ObligationDef> = {};
OBLIGATIONS.forEach((o) => {
  OBL_MAP[o.id] = o;
});

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ComplianceCheckerPage() {
  const locale = useLocale();
  const lang = locale === "fr" ? "fr" : "en";
  const t = ui[lang];

  /* ─── State ─── */
  const [started, setStarted] = useState(false);
  const [currentStepId, setCurrentStepId] = useState("E1");
  const [answers, setAnswers] = useState<Record<string, Set<number>>>({});
  const [obligations, setObligations] = useState<Set<string>>(new Set());
  const [entityType, setEntityType] = useState("");
  const [highRisk, setHighRisk] = useState(false);
  const [gpaiStatus, setGpaiStatus] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showDefs, setShowDefs] = useState(false);
  const [fade, setFade] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [aiName, setAiName] = useState("");
  const [email, setEmail] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverStart, setHoverStart] = useState(false);
  const [hoverRestart, setHoverRestart] = useState(false);
  const [hoverSend, setHoverSend] = useState(false);
  const [hoverCta, setHoverCta] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Entity helper descriptions map (index in E1 options -> helper key) */
  const entityHelperKeys = [
    "helperProvider",
    "helperDeployer",
    "helperDistributor",
    "helperImporter",
    "helperProductMfg",
    "helperAuthRep",
  ];

  /* ─── Navigation helpers ─── */
  const stepDef = STEPS[STEP_INDEX[currentStepId]];
  const currentAnswers = answers[currentStepId] || new Set<number>();

  const sectionOrder = ["E", "HR", "S", "R"];
  const sectionLabels: Record<string, string> = {
    E: t.sectionEntity,
    HR: t.sectionHighRisk,
    S: t.sectionScope,
    R: t.sectionRules,
  };

  /* approximate question number */
  const questionNum = history.length + 1;
  const totalApprox = 14;

  const progress = showResults
    ? 100
    : Math.min(95, Math.round((questionNum / totalApprox) * 100));

  /* ─── Encouraging text based on current section ─── */
  const getEncouragingText = (): string => {
    if (!stepDef) return "";
    const sec = stepDef.section;
    if (sec === "E") return t.encourage1 || "";
    if (sec === "HR") return t.encourage3 || "";
    if (sec === "S") return t.encourage2 || "";
    if (sec === "R") return t.encourage4 || "";
    return "";
  };

  /* ─── Phase for progress bar ─── */
  const getPhaseForSection = (sec: string): number => {
    if (sec === "E") return 1;
    if (sec === "HR") return 2;
    if (sec === "S") return 3;
    if (sec === "R") return 4;
    return 1;
  };
  const currentPhase = showResults ? 5 : stepDef ? getPhaseForSection(stepDef.section) : 1;
  const phaseNames = [t.phase1 || "Your role", t.phase2 || "Classification", t.phase3 || "Rules", t.phase4 || "Results"];

  /* ─── Answer handlers ─── */
  const handleRadio = useCallback(
    (idx: number) => {
      setAnswers((prev) => ({
        ...prev,
        [currentStepId]: new Set([idx]),
      }));
    },
    [currentStepId]
  );

  const handleCheckbox = useCallback(
    (idx: number) => {
      const step = STEPS[STEP_INDEX[currentStepId]];
      const noneIdx = step.options.length - 1;
      const isNone =
        step.options[idx].en === "None of the above" ||
        step.options[idx].fr === "Aucune de ces r\u00e9ponses";

      setAnswers((prev) => {
        const cur = new Set(prev[currentStepId] || []);
        if (isNone) {
          // selecting "none" → clear all others
          if (cur.has(idx)) {
            cur.delete(idx);
          } else {
            cur.clear();
            cur.add(idx);
          }
        } else {
          // selecting non-none → remove "none"
          cur.delete(noneIdx);
          if (cur.has(idx)) {
            cur.delete(idx);
          } else {
            cur.add(idx);
          }
        }
        return { ...prev, [currentStepId]: cur };
      });
    },
    [currentStepId]
  );

  /* ─── Check if "none" is selected ─── */
  const isNoneSelected = useCallback(
    (stepId: string): boolean => {
      const step = STEPS[STEP_INDEX[stepId]];
      const a = answers[stepId];
      if (!a || a.size === 0) return false;
      const noneIdx = step.options.length - 1;
      return a.has(noneIdx);
    },
    [answers]
  );

  /* ─── Check if any non-none option is selected ─── */
  const hasNonNone = useCallback(
    (stepId: string): boolean => {
      const step = STEPS[STEP_INDEX[stepId]];
      const a = answers[stepId];
      if (!a || a.size === 0) return false;
      const noneIdx = step.options.length - 1;
      for (const v of a) {
        if (v !== noneIdx) return true;
      }
      return false;
    },
    [answers]
  );

  /* ─── Get selected option index for radio ─── */
  const getRadioAnswer = useCallback(
    (stepId: string): number | null => {
      const a = answers[stepId];
      if (!a || a.size === 0) return null;
      return [...a][0];
    },
    [answers]
  );

  /* ─── Transition with fade ─── */
  const goToStep = useCallback(
    (stepId: string, addToHistory = true) => {
      setFade(false);
      setTimeout(() => {
        if (addToHistory) {
          setHistory((prev) => [...prev, currentStepId]);
        }
        setCurrentStepId(stepId);
        setShowResults(false);
        setFade(true);
        if (cardRef.current) {
          cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    },
    [currentStepId]
  );

  const goToResults = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setHistory((prev) => [...prev, currentStepId]);
      setShowResults(true);
      setFade(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  }, [currentStepId]);

  /* ─── NEXT logic (state machine) ─── */
  const handleNext = useCallback(() => {
    const a = answers[currentStepId] || new Set();
    if (a.size === 0) return; // must answer

    const obls = new Set(obligations);

    switch (currentStepId) {
      case "E1": {
        const idx = [...a][0];
        const opts = [
          "provider",
          "deployer",
          "distributor",
          "importer",
          "product_manufacturer",
          "authorised_rep",
        ];
        const et = opts[idx];
        setEntityType(et);
        obls.add("ai_literacy");

        if (et === "authorised_rep") {
          obls.add("authorised_rep");
          setObligations(obls);
          goToResults();
          return;
        }
        if (et === "product_manufacturer") {
          obls.add("product_manufacturer");
          setObligations(obls);
          goToStep("E3");
          return;
        }
        // provider, deployer, distributor, importer
        if (et === "distributor") obls.add("distributor");
        if (et === "importer") obls.add("importer");
        setObligations(obls);
        goToStep("E2");
        return;
      }

      case "E2": {
        if (hasNonNone("E2")) {
          obls.add("handover");
        }
        setObligations(obls);
        goToStep("HR1");
        return;
      }

      case "E3": {
        if (isNoneSelected("E3")) {
          obls.add("product_mfg_out");
          setObligations(obls);
          goToResults();
          return;
        }
        if (hasNonNone("E3")) {
          setObligations(obls);
          goToStep("HR6");
          return;
        }
        return;
      }

      case "HR1": {
        if (hasNonNone("HR1")) {
          setHighRisk(true);
          if (entityType === "provider" || obligations.has("handover"))
            obls.add("provider_hr");
          if (entityType === "deployer") obls.add("deployer_hr");
          setObligations(obls);
          goToStep("S1");
          return;
        }
        setObligations(obls);
        goToStep("HR2");
        return;
      }

      case "HR2": {
        if (hasNonNone("HR2")) {
          setObligations(obls);
          goToStep("HR3");
          return;
        }
        setObligations(obls);
        goToStep("HR4");
        return;
      }

      case "HR3": {
        const idx = [...a][0];
        if (idx === 0) {
          // Yes
          setHighRisk(true);
          if (entityType === "provider" || obligations.has("handover"))
            obls.add("provider_hr");
          if (entityType === "deployer") obls.add("deployer_hr");
          setObligations(obls);
          goToStep("S1");
          return;
        }
        setObligations(obls);
        goToStep("HR4");
        return;
      }

      case "HR4": {
        if (hasNonNone("HR4")) {
          setObligations(obls);
          goToStep("HR5");
          return;
        }
        setObligations(obls);
        goToStep("S1");
        return;
      }

      case "HR5": {
        const idx = [...a][0];
        if (idx === 0) {
          // Yes - significant risk
          setHighRisk(true);
          obls.add("notify_nca");
          if (entityType === "provider" || obligations.has("handover"))
            obls.add("provider_hr");
          if (entityType === "deployer") obls.add("deployer_hr");
        } else {
          // No - not significant
          obls.add("notify_nca");
          obls.add("high_risk_exception");
        }
        setObligations(obls);
        goToStep("S1");
        return;
      }

      case "HR6": {
        if (hasNonNone("HR6")) {
          setHighRisk(true);
          obls.add("provider_hr");
          obls.add("handover");
        }
        setObligations(obls);
        goToStep("S1");
        return;
      }

      case "S1": {
        if (isNoneSelected("S1")) {
          obls.add("out_of_scope");
          setObligations(obls);
          goToResults();
          return;
        }
        // check if GPAI option (index 1) is selected
        const hasGPAI = a.has(1);
        if (hasGPAI) {
          setGpaiStatus(true);
          obls.add("gpai");
          setObligations(obls);
          goToStep("R1");
          return;
        }
        setObligations(obls);
        goToStep("R2");
        return;
      }

      case "R1": {
        if (hasNonNone("R1")) {
          obls.add("gpai_systemic");
        }
        setObligations(obls);
        goToStep("R2");
        return;
      }

      case "R2": {
        // Military
        if (a.has(0)) {
          obls.add("excluded_military");
          setObligations(obls);
          goToResults();
          return;
        }
        // Third-country authorities
        if (a.has(1)) {
          obls.add("excluded_third_country");
          setObligations(obls);
          goToResults();
          return;
        }
        // R&D
        if (a.has(2)) obls.add("excluded_research");
        // Open source
        if (a.has(3)) obls.add("excluded_opensource");
        // Personal use
        if (a.has(4)) obls.add("excluded_personal");

        setObligations(obls);
        goToStep("R3");
        return;
      }

      case "R3": {
        if (hasNonNone("R3")) {
          obls.add("prohibited");
          setObligations(obls);
          goToResults();
          return;
        }
        setObligations(obls);
        goToStep("R4");
        return;
      }

      case "R4": {
        if (hasNonNone("R4")) {
          obls.add("transparency");
        }
        // if deployer + high risk → go to R5
        if (entityType === "deployer" && highRisk) {
          setObligations(obls);
          goToStep("R5");
          return;
        }
        setObligations(obls);
        goToResults();
        return;
      }

      case "R5": {
        const idx = [...a][0];
        if (idx === 0) {
          obls.add("fria");
        }
        setObligations(obls);
        goToResults();
        return;
      }

      default:
        goToResults();
    }
  }, [
    currentStepId,
    answers,
    obligations,
    entityType,
    highRisk,
    hasNonNone,
    isNoneSelected,
    goToStep,
    goToResults,
  ]);

  /* ─── PREVIOUS ─── */
  const handlePrev = useCallback(() => {
    if (history.length === 0) {
      setStarted(false);
      return;
    }
    const prev = [...history];
    const last = prev.pop()!;
    setFade(false);
    setTimeout(() => {
      setHistory(prev);
      setCurrentStepId(last);
      setShowResults(false);
      setFade(true);
    }, 200);
  }, [history]);

  /* ─── RESTART ─── */
  const handleRestart = useCallback(() => {
    setStarted(false);
    setCurrentStepId("E1");
    setAnswers({});
    setObligations(new Set());
    setEntityType("");
    setHighRisk(false);
    setGpaiStatus(false);
    setShowResults(false);
    setShowDefs(false);
    setHistory([]);
    setAiName("");
    setEmail("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ─── Send results (fake) ─── */
  const handleSend = useCallback(() => {
    if (!aiName.trim()) return;
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, [aiName]);

  /* ─── Can advance? ─── */
  const canNext = currentAnswers.size > 0;

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */

  /* ─── NAV BAR ─── */
  const renderNav = () => (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: `linear-gradient(135deg, ${C.navy1} 0%, ${C.navy2} 100%)`,
        borderBottom: `1px solid ${C.goldBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: 64,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Logo box */}
        <div
          style={{
            width: 40,
            height: 40,
            background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 16,
            color: C.navy1,
          }}
        >
          ACF
        </div>
        <div>
          <div
            style={{
              color: C.white,
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.2,
            }}
          >
            ACF Standard
          </div>
          <div
            style={{
              color: C.gold,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
            }}
          >
            {t.navSubtext}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <a
          href={`/${locale}`}
          style={{
            color: C.gray2,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {t.navHome}
        </a>
        <a
          href={`/${locale}/standard`}
          style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`,
            color: C.navy1,
            padding: "8px 18px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 700,
            border: "none",
          }}
        >
          {t.navCta}
        </a>
      </div>
    </nav>
  );

  /* ─── PROGRESS BAR ─── */
  const renderProgress = () => (
    <div
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        zIndex: 999,
        height: 4,
        background: C.navy3,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${C.gold}, ${C.gold2})`,
          transition: "width 0.5s ease",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );

  /* ─── PHASE PROGRESS BAR ─── */
  const renderPhaseProgress = () => {
    const phases = phaseNames;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
          marginBottom: 16,
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {phases.map((name: any, i: number) => {
          const phaseNum = i + 1;
          const isActive = currentPhase === phaseNum;
          const isDone = currentPhase > phaseNum;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", flex: 1 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    background: isActive
                      ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})`
                      : isDone ? C.gold : "transparent",
                    color: isActive || isDone ? C.navy1 : C.gray,
                    border: `2px solid ${isActive || isDone ? C.gold : C.goldBorder}`,
                    transition: "all .2s",
                    marginBottom: 4,
                  }}
                >
                  {isDone ? (
                    <span style={{ fontSize: 14, fontWeight: 900 }}>{"\u2713"}</span>
                  ) : phaseNum}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? C.gold : isDone ? C.gold2 : C.gray,
                    textAlign: "center" as const,
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {name}
                </span>
              </div>
              {i < phases.length - 1 && (
                <div
                  style={{
                    height: 2,
                    flex: 1,
                    background: isDone ? C.gold : C.goldBorder,
                    marginBottom: 18,
                    marginLeft: -4,
                    marginRight: -4,
                    transition: "background .3s",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /* ─── SECTION INDICATORS ─── */
  const renderSectionIndicators = () => {
    const currentSection = showResults ? "RESULTS" : stepDef?.section || "E";
    const currentSIdx = sectionOrder.indexOf(currentSection);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginBottom: 32,
          flexWrap: "wrap" as const,
        }}
      >
        {sectionOrder.map((sec: any, i: number) => {
          const isActive = sec === currentSection;
          const isDone = i < currentSIdx || showResults;
          return (
            <div
              key={sec}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  background: isActive
                    ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})`
                    : isDone
                    ? C.green
                    : C.navy3,
                  color: isActive || isDone ? C.navy1 : C.gray,
                  border: isActive
                    ? "none"
                    : `1px solid ${isDone ? C.green : C.goldBorder}`,
                  transition: "all 0.3s ease",
                }}
              >
                {isDone && !isActive ? "\u2713" : i + 1}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? C.gold : isDone ? C.green : C.gray,
                }}
              >
                {sectionLabels[sec]}
              </span>
              {i < sectionOrder.length - 1 && (
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: isDone ? C.green : C.goldBorder,
                    marginLeft: 4,
                  }}
                />
              )}
            </div>
          );
        })}
        {/* Results indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 24,
              height: 1,
              background: showResults ? C.green : C.goldBorder,
              marginRight: 4,
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              background: showResults
                ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})`
                : C.navy3,
              color: showResults ? C.navy1 : C.gray,
              border: showResults ? "none" : `1px solid ${C.goldBorder}`,
            }}
          >
            5
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: showResults ? 700 : 500,
              color: showResults ? C.gold : C.gray,
            }}
          >
            {t.sectionResults}
          </span>
        </div>
      </div>
    );
  };

  /* ─── HERO ─── */
  const renderHero = () => (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center" as const,
        padding: "120px 24px 60px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          fontWeight: 900,
          color: C.navy1,
          marginBottom: 32,
          boxShadow: `0 8px 32px rgba(201,168,76,0.3)`,
        }}
      >
        AI
      </div>
      <h1
        style={{
          color: C.white,
          fontSize: 42,
          fontWeight: 800,
          marginBottom: 16,
          lineHeight: 1.2,
          maxWidth: 700,
        }}
      >
        {t.heroTitle}
      </h1>
      <p
        style={{
          color: C.gray2,
          fontSize: 18,
          maxWidth: 600,
          marginBottom: 48,
          lineHeight: 1.6,
        }}
      >
        {t.heroSub}
      </p>
      <button
        onClick={() => {
          setStarted(true);
          setFade(true);
        }}
        onMouseEnter={() => setHoverStart(true)}
        onMouseLeave={() => setHoverStart(false)}
        style={{
          background: hoverStart
            ? `linear-gradient(135deg, ${C.gold2}, ${C.gold})`
            : `linear-gradient(135deg, ${C.gold}, ${C.gold2})`,
          color: C.navy1,
          border: "none",
          padding: "16px 40px",
          borderRadius: 12,
          fontSize: 18,
          fontWeight: 700,
          cursor: "pointer",
          transform: hoverStart ? "translateY(-2px)" : "none",
          boxShadow: hoverStart
            ? `0 12px 40px rgba(201,168,76,0.4)`
            : `0 4px 16px rgba(201,168,76,0.2)`,
          transition: "all 0.2s ease",
        }}
      >
        {t.start}
      </button>
    </div>
  );

  /* ─── QUESTION CARD ─── */
  const renderQuestionCard = () => {
    if (!stepDef) return null;
    const step = stepDef;

    return (
      <div
        ref={cardRef}
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "100px 24px 60px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          opacity: fade ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {renderPhaseProgress()}
        {renderSectionIndicators()}

        {/* Encouraging text */}
        {getEncouragingText() && (
          <div
            style={{
              textAlign: "center" as const,
              marginBottom: 8,
              color: C.gray,
              fontSize: 14,
              fontStyle: "italic" as const,
            }}
          >
            {getEncouragingText()}
          </div>
        )}

        {/* Question counter */}
        <div
          style={{
            textAlign: "center" as const,
            marginBottom: 12,
            color: C.gray,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase" as const,
          }}
        >
          {t.question} {questionNum} / ~{totalApprox}
        </div>

        {/* Card */}
        <div
          style={{
            background: C.navy3,
            borderRadius: 16,
            borderTop: `3px solid ${C.gold}`,
            padding: "32px 32px 28px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {/* Step ID + Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                background: C.goldDim,
                color: C.gold,
                fontSize: 12,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 6,
                letterSpacing: 0.5,
              }}
            >
              {step.id}
            </span>
            <h2
              style={{
                color: C.gold,
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
              }}
            >
              {step.title[lang]}
            </h2>
          </div>

          {/* Question text */}
          <p
            style={{
              color: C.white,
              fontSize: 17,
              lineHeight: 1.6,
              marginBottom: 20,
              marginTop: 12,
            }}
          >
            {step.question[lang]}
          </p>

          {/* Note box */}
          {step.note && (
            <div
              style={{
                borderLeft: `3px solid ${C.gold}`,
                background: C.goldDim,
                padding: "12px 16px",
                borderRadius: "0 8px 8px 0",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  color: C.gold,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 4,
                  textTransform: "uppercase" as const,
                  letterSpacing: 0.5,
                }}
              >
                {t.note}
              </div>
              <div
                style={{
                  color: C.gray2,
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {step.note[lang]}
              </div>
            </div>
          )}

          {/* Hint box */}
          {step.hint && (
            <div
              style={{
                borderLeft: `3px solid ${C.gold}`,
                background: C.goldDim,
                padding: "12px 16px",
                borderRadius: "0 8px 8px 0",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  color: C.gold,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 4,
                  textTransform: "uppercase" as const,
                  letterSpacing: 0.5,
                }}
              >
                {t.note}
              </div>
              <div
                style={{
                  color: C.gray2,
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {step.hint[lang]}
              </div>
            </div>
          )}

          {/* Definitions toggle (E1 only) */}
          {step.hasDefinitions && step.definitions && (
            <div style={{ marginBottom: 20 }}>
              <button
                onClick={() => setShowDefs(!showDefs)}
                style={{
                  background: "none",
                  border: `1px solid ${C.goldBorder}`,
                  color: C.gold,
                  padding: "8px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {showDefs ? t.hideDefinitions : t.seeDefinitions}
              </button>
              {showDefs && (
                <div
                  style={{
                    marginTop: 12,
                    background: C.navy2,
                    border: `1px solid ${C.goldBorder}`,
                    borderRadius: 8,
                    padding: "16px 20px",
                    whiteSpace: "pre-line" as const,
                    color: C.gray2,
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  {step.definitions[lang]}
                </div>
              )}
            </div>
          )}

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {step.options.map((opt: any, idx: number) => {
              const selected = currentAnswers.has(idx);
              const isHovered = hoveredOption === idx;
              const isRadio = step.type === "radio";

              return (
                <div
                  key={idx}
                  onClick={() =>
                    isRadio ? handleRadio(idx) : handleCheckbox(idx)
                  }
                  onMouseEnter={() => setHoveredOption(idx)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    borderRadius: 10,
                    cursor: "pointer",
                    background: selected
                      ? C.goldDim
                      : isHovered
                      ? "rgba(255,255,255,0.03)"
                      : "transparent",
                    border: `1px solid ${
                      selected ? C.gold : isHovered ? C.goldBorder : C.bd1
                    }`,
                    transition: "all 0.15s ease",
                  }}
                >
                  {/* Radio / Checkbox indicator */}
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: isRadio ? "50%" : 6,
                      border: `2px solid ${selected ? C.gold : C.gray}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.15s ease",
                      background: selected ? C.gold : "transparent",
                    }}
                  >
                    {selected && (
                      <div
                        style={{
                          color: C.navy1,
                          fontSize: isRadio ? 10 : 14,
                          fontWeight: 900,
                          lineHeight: 1,
                        }}
                      >
                        {isRadio ? "\u25CF" : "\u2713"}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const }}>
                    <span
                      style={{
                        color: selected ? C.white : C.gray2,
                        fontSize: 15,
                        fontWeight: selected ? 600 : 400,
                        lineHeight: 1.4,
                      }}
                    >
                      {opt[lang]}
                    </span>
                    {step.id === "E1" && idx < entityHelperKeys.length && t[entityHelperKeys[idx]] && (
                      <span
                        style={{
                          fontSize: 13,
                          color: C.gray,
                          fontStyle: "italic" as const,
                          marginTop: 2,
                          lineHeight: 1.4,
                        }}
                      >
                        {t[entityHelperKeys[idx]]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Source */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: `1px solid ${C.bd1}`,
              color: C.gray,
              fontSize: 12,
              fontStyle: "italic" as const,
            }}
          >
            {t.source} : {step.source[lang]}
          </div>
        </div>

        {/* Navigation buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
            gap: 16,
          }}
        >
          <button
            onClick={handlePrev}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
            style={{
              background: "transparent",
              color: hoverPrev ? C.white : C.gray2,
              border: `1px solid ${hoverPrev ? C.gray2 : C.gray}`,
              padding: "12px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {t.prev}
          </button>
          <button
            onClick={handleNext}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            disabled={!canNext}
            style={{
              background: canNext
                ? hoverNext
                  ? `linear-gradient(135deg, ${C.gold2}, ${C.gold})`
                  : `linear-gradient(135deg, ${C.gold}, ${C.gold2})`
                : C.navy3,
              color: canNext ? C.navy1 : C.gray,
              border: canNext ? "none" : `1px solid ${C.bd1}`,
              padding: "12px 36px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              cursor: canNext ? "pointer" : "not-allowed",
              transform: canNext && hoverNext ? "translateY(-1px)" : "none",
              boxShadow:
                canNext && hoverNext
                  ? `0 8px 24px rgba(201,168,76,0.3)`
                  : "none",
              transition: "all 0.2s ease",
              opacity: canNext ? 1 : 0.5,
            }}
          >
            {t.next}
          </button>
        </div>
      </div>
    );
  };

  /* ─── PRIORITY BADGE ─── */
  const getPriority = (obl: ObligationDef): "urgent" | "important" | "info" => {
    if (obl.color === C.red) return "urgent";
    if (obl.color === C.amber || obl.color === C.gold) return "important";
    return "info";
  };

  const renderPriorityBadge = (priority: "urgent" | "important" | "info") => {
    const badgeColors: Record<string, { bg: string; text: string; border: string }> = {
      urgent: { bg: "rgba(239,68,68,.18)", text: C.red, border: "rgba(239,68,68,.4)" },
      important: { bg: "rgba(245,158,11,.18)", text: C.amber, border: "rgba(245,158,11,.4)" },
      info: { bg: C.goldDim, text: C.gold, border: C.goldBorder },
    };
    const label = priority === "urgent" ? (t.priorityUrgent || "Urgent") : priority === "important" ? (t.priorityImportant || "Important") : (t.priorityInfo || "Info");
    const bc = badgeColors[priority];
    return (
      <span style={{
        display: "inline-block",
        background: bc.bg,
        color: bc.text,
        border: `1px solid ${bc.border}`,
        borderRadius: 6,
        padding: "2px 10px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
        textTransform: "uppercase" as const,
        marginLeft: 8,
      }}>
        {label}
      </span>
    );
  };

  /* ─── RESULTS PAGE ─── */
  const renderResults = () => {
    const oblList = [...obligations]
      .map((id: any) => OBL_MAP[id])
      .filter(Boolean);
    const count = oblList.length;

    return (
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "100px 24px 60px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          opacity: fade ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {renderPhaseProgress()}
        {renderSectionIndicators()}

        {/* Results header */}
        <div style={{ textAlign: "center" as const, marginBottom: 40 }}>
          <h1
            style={{
              color: C.white,
              fontSize: 36,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            {t.resultsTitle}
          </h1>
          <p
            style={{
              color: C.gray2,
              fontSize: 16,
              marginBottom: 8,
              lineHeight: 1.5,
            }}
          >
            {t.resultsSubtitle}
          </p>
          <div
            style={{
              display: "inline-block",
              background: C.goldDim,
              border: `1px solid ${C.goldBorder}`,
              borderRadius: 24,
              padding: "8px 20px",
              color: C.gold,
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            {count} {count === 1 ? t.obligationFound : t.obligationsFound}
          </div>
        </div>

        {/* Obligation cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: 16,
            marginBottom: 48,
          }}
        >
          {oblList.map((obl: any) => (
            <div
              key={obl.id}
              style={{
                background: C.navy3,
                borderRadius: 12,
                borderLeft: `4px solid ${obl.color}`,
                padding: "24px 28px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: obl.color,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    color: C.white,
                    fontSize: 18,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {obl.title[lang]}
                </h3>
                {renderPriorityBadge(getPriority(obl))}
              </div>
              <p
                style={{
                  color: C.gray2,
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginBottom: 12,
                  marginTop: 4,
                }}
              >
                {obl.desc[lang]}
              </p>
              <div
                style={{
                  color: C.gray,
                  fontSize: 12,
                  marginBottom: 12,
                  fontStyle: "italic" as const,
                }}
              >
                {obl.articles[lang]}
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${obl.color}`,
                  background: "rgba(255,255,255,0.03)",
                  padding: "10px 14px",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <div
                  style={{
                    color: obl.color,
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 4,
                    textTransform: "uppercase" as const,
                    letterSpacing: 0.5,
                  }}
                >
                  {t.whatToDo}
                </div>
                <div
                  style={{
                    color: C.gray2,
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {obl.action[lang]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <a
            href={`/${locale}/standard`}
            onMouseEnter={() => setHoverCta(true)}
            onMouseLeave={() => setHoverCta(false)}
            style={{
              display: "inline-block",
              background: hoverCta
                ? `linear-gradient(135deg, ${C.gold2}, ${C.gold})`
                : `linear-gradient(135deg, ${C.gold}, ${C.gold2})`,
              color: C.navy1,
              padding: "16px 36px",
              borderRadius: 12,
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 700,
              transform: hoverCta ? "translateY(-2px)" : "none",
              boxShadow: hoverCta
                ? `0 12px 40px rgba(201,168,76,0.4)`
                : `0 4px 16px rgba(201,168,76,0.2)`,
              transition: "all 0.2s ease",
            }}
          >
            {t.ctaText}
          </a>
        </div>

        {/* Save section */}
        <div
          style={{
            background: C.navy3,
            borderRadius: 16,
            padding: "32px",
            borderTop: `3px solid ${C.gold}`,
            marginBottom: 32,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <h2
            style={{
              color: C.white,
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 24,
              marginTop: 0,
            }}
          >
            {t.saveTitle}
          </h2>

          {/* AI system name */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                color: C.gray2,
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {t.aiNameLabel}
            </label>
            <input
              type="text"
              value={aiName}
              onChange={(e) => setAiName(e.target.value)}
              placeholder={t.aiNamePlaceholder}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: `1px solid ${C.goldBorder}`,
                background: C.navy2,
                color: C.white,
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box" as const,
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                color: C.gray2,
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {t.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: `1px solid ${C.goldBorder}`,
                background: C.navy2,
                color: C.white,
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box" as const,
              }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            onMouseEnter={() => setHoverSend(true)}
            onMouseLeave={() => setHoverSend(false)}
            style={{
              background:
                aiName.trim()
                  ? hoverSend
                    ? `linear-gradient(135deg, ${C.gold2}, ${C.gold})`
                    : `linear-gradient(135deg, ${C.gold}, ${C.gold2})`
                  : C.navy2,
              color: aiName.trim() ? C.navy1 : C.gray,
              border: aiName.trim() ? "none" : `1px solid ${C.bd1}`,
              padding: "12px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              cursor: aiName.trim() ? "pointer" : "not-allowed",
              opacity: aiName.trim() ? 1 : 0.5,
              transition: "all 0.2s ease",
              marginBottom: 24,
            }}
          >
            {t.sendBtn}
          </button>

          {/* PDF instructions */}
          <div
            style={{
              borderTop: `1px solid ${C.bd1}`,
              paddingTop: 20,
            }}
          >
            <h3
              style={{
                color: C.gold,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 8,
                marginTop: 0,
              }}
            >
              {t.pdfTitle}
            </h3>
            <p
              style={{
                color: C.gray2,
                fontSize: 14,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {t.pdfInstructions}
            </p>
          </div>
        </div>

        {/* Restart */}
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <button
            onClick={handleRestart}
            onMouseEnter={() => setHoverRestart(true)}
            onMouseLeave={() => setHoverRestart(false)}
            style={{
              background: "transparent",
              color: hoverRestart ? C.white : C.gray2,
              border: `1px solid ${hoverRestart ? C.gray2 : C.gray}`,
              padding: "12px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {t.restart}
          </button>
        </div>
      </div>
    );
  };

  /* ─── TOAST ─── */
  const renderToast = () =>
    toastVisible ? (
      <div
        style={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          background: C.green,
          color: C.navy1,
          padding: "14px 28px",
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          zIndex: 2000,
          boxShadow: "0 8px 32px rgba(34,197,94,0.3)",
          animation: "fadeInUp 0.3s ease",
        }}
      >
        {t.successToast}
      </div>
    ) : null;

  /* ═══════════════════════════════════════════════════════════════
     MAIN RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${C.navy1} 0%, ${C.navy2} 100%)`,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Inline keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeInUp {
              from { opacity: 0; transform: translate(-50%, 20px); }
              to   { opacity: 1; transform: translate(-50%, 0); }
            }
            input::placeholder { color: ${C.gray} !important; }
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; }
          `,
        }}
      />

      {renderNav()}
      {started && renderProgress()}
      {renderToast()}

      {!started && renderHero()}
      {started && !showResults && renderQuestionCard()}
      {started && showResults && renderResults()}

      <Footer />
      <AIAgent />
    </div>
  );
}
