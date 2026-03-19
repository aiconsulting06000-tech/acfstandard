"use client";

import React from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", green: "#22c55e", blue: "#3b82f6",
  amber: "#f59e0b", purple: "#8b5cf6",
};

function GoldBar() { return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, margin: "0 auto 16px" }} />; }
function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>// {children}</div>;
}

const ui = {
  en: {
    navSubtext: "ABOUT",
    navHome: "← Home",
    navCta: "Get Your Score →",
    heroBadge: "ABOUT",
    heroTitle1: "Who We ",
    heroTitle2: "Are",
    heroDesc: "The team behind ACF Score® and the Agentic Commerce Framework® methodology.",
    timelineLabel: "Timeline",
    timelineTitle1: "The ",
    timelineTitle2: "ACF®",
    timelineTitle3: " Story",
    timeline: [
      { year: "2000–2024", event: "25 years of e-commerce and digital transformation experience — observing the loss of control linked to automation" },
      { year: "Early 2025", event: "Emergence of autonomous AI agents in commerce — observation of the total absence of governance framework" },
      { year: "Q1 2025", event: "Creation of the Agentic Commerce Framework® — 4-layer governance methodology" },
      { year: "Q2 2025", event: "Launch of ACF Score® — free online agentic governance diagnostic" },
      { year: "Q3 2025", event: "Design of ACF Control (dashboard) and ACF TRUST™ / ACF CERTIFIED certification program" },
      { year: "2026", event: "ACF Standard — complete ecosystem platform. Partners Program. Academy. Research Blog." },
    ],
    founderLabel: "Founder",
    founderTitle1: "Creator of the Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Founder · Agentic Governance",
    founderTags: ["ACF® Creator", "AI Governance", "E-commerce Expert"],
    founderP1: "Vincent DORANGE has been working in e-commerce and digital strategy for over 25 years. Over these two decades, he has observed from the inside the profound transformations of digital commerce: the rise of platforms, the centralization of decisions in algorithms, and the growing dependence of companies on technological infrastructures.",
    founderP2strong: "who really holds decision-making power in organizations driven by data and automated systems?",
    founderP2: "His work has progressively focused on a question that has become central in the digital economy: ",
    founderP3pre: "Facing the emergence of autonomous artificial intelligence agents, he developed in 2025 the ",
    founderP3strong: "Agentic Commerce Framework® (ACF®), a methodological framework designed to help organizations govern the use of AI agents and preserve their decision-making sovereignty in the agentic economy.",
    founderP4: "Based in France, he works with SMEs, mid-cap companies, and large corporations on issues of digital transformation, AI governance, and the evolution of business models in the era of autonomous systems.",
    educationLabel: "Education & Training",
    educationTitle1: "Academic ",
    educationTitle2: "Background",
    educationHeading: "EDUCATION",
    execEducationHeading: "Executive Education & Research",
    membershipLabel: "Professional Membership",
    membershipTitle: "Affiliations",
    companyLabel: "Company",
    companyP1: "AI CONSULTING is a consulting firm specialized in artificial intelligence, particularly in automation and AI agents with a focus on ",
    companyP1strong: "agentic governance",
    companyP2pre: "We support organizations in their transition towards ",
    companyP2strong: "sovereign and controlled use of autonomous AI agents",
    companyP3pre: "Our approach is pragmatic and operational: we don't theorize about AI, we structure your capacity to govern it. Our interventions are essentially based on the ",
    companyP3strong: "ACF® methodology",
    values: [
      { icon: "🎯", title: "Sovereignty First", desc: "Your strategic control over automated decisions is non-negotiable." },
      { icon: "⚡", title: "Operational Pragmatism", desc: "Actionable recommendations within 30 days, not abstract theory." },
      { icon: "🔍", title: "Total Transparency", desc: "Documented methodology, explainable scoring, verifiable results." },
    ],
    ctaTitle1: "Let's Work ",
    ctaTitle2: "Together",
    ctaDesc: "Whether you want a diagnostic, support, or a partnership, let's talk.",
    ctaBtn1: "Get in Touch →",
    ctaBtn2: "Get Your Score",
  },
  fr: {
    navSubtext: "À PROPOS",
    navHome: "← Accueil",
    navCta: "Votre Score →",
    heroBadge: "À PROPOS",
    heroTitle1: "Qui sommes-",
    heroTitle2: "nous",
    heroDesc: "L'équipe derrière ACF Score® et la méthodologie Agentic Commerce Framework®.",
    timelineLabel: "Chronologie",
    timelineTitle1: "L'histoire ",
    timelineTitle2: "ACF®",
    timelineTitle3: "",
    timeline: [
      { year: "2000–2024", event: "25 ans d'expérience en e-commerce et transformation digitale — observation de la perte de contrôle liée à l'automatisation" },
      { year: "Début 2025", event: "Émergence des agents IA autonomes dans le commerce — constat de l'absence totale de cadre de gouvernance" },
      { year: "T1 2025", event: "Création de l'Agentic Commerce Framework® — méthodologie de gouvernance à 4 couches" },
      { year: "T2 2025", event: "Lancement d'ACF Score® — diagnostic de gouvernance agentique en ligne gratuit" },
      { year: "T3 2025", event: "Conception d'ACF Control (tableau de bord) et du programme de certification ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — plateforme écosystème complète. Programme Partenaires. Academy. Blog Recherche." },
    ],
    founderLabel: "Fondateur",
    founderTitle1: "Créateur de l'Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Fondateur · Gouvernance agentique",
    founderTags: ["Créateur ACF®", "Gouvernance IA", "Expert E-commerce"],
    founderP1: "Vincent DORANGE travaille dans le e-commerce et la stratégie digitale depuis plus de 25 ans. Au cours de ces deux décennies, il a observé de l'intérieur les transformations profondes du commerce digital : la montée en puissance des plateformes, la centralisation des décisions dans les algorithmes et la dépendance croissante des entreprises aux infrastructures technologiques.",
    founderP2strong: "qui détient réellement le pouvoir décisionnel dans les organisations pilotées par les données et les systèmes automatisés ?",
    founderP2: "Son travail s'est progressivement concentré sur une question devenue centrale dans l'économie numérique : ",
    founderP3pre: "Face à l'émergence des agents d'intelligence artificielle autonomes, il a développé en 2025 l'",
    founderP3strong: "Agentic Commerce Framework® (ACF®), un cadre méthodologique conçu pour aider les organisations à gouverner l'utilisation des agents IA et préserver leur souveraineté décisionnelle dans l'économie agentique.",
    founderP4: "Basé en France, il accompagne PME, ETI et grandes entreprises sur les enjeux de transformation digitale, de gouvernance IA et d'évolution des modèles d'affaires à l'ère des systèmes autonomes.",
    educationLabel: "Formation & Parcours",
    educationTitle1: "Parcours ",
    educationTitle2: "académique",
    educationHeading: "FORMATION",
    execEducationHeading: "Formation continue & recherche",
    membershipLabel: "Affiliations professionnelles",
    membershipTitle: "Affiliations",
    companyLabel: "Entreprise",
    companyP1: "AI CONSULTING est un cabinet de conseil spécialisé en intelligence artificielle, en particulier dans l'automatisation et les agents IA avec un focus sur la ",
    companyP1strong: "gouvernance agentique",
    companyP2pre: "Nous accompagnons les organisations dans leur transition vers un ",
    companyP2strong: "usage souverain et contrôlé des agents IA autonomes",
    companyP3pre: "Notre approche est pragmatique et opérationnelle : nous ne théorisons pas sur l'IA, nous structurons votre capacité à la gouverner. Nos interventions s'appuient essentiellement sur la ",
    companyP3strong: "méthodologie ACF®",
    values: [
      { icon: "🎯", title: "Souveraineté d'abord", desc: "Votre contrôle stratégique sur les décisions automatisées est non négociable." },
      { icon: "⚡", title: "Pragmatisme opérationnel", desc: "Recommandations actionnables sous 30 jours, pas de théorie abstraite." },
      { icon: "🔍", title: "Transparence totale", desc: "Méthodologie documentée, scoring explicable, résultats vérifiables." },
    ],
    ctaTitle1: "Travaillons ",
    ctaTitle2: "ensemble",
    ctaDesc: "Que vous souhaitiez un diagnostic, un accompagnement ou un partenariat, parlons-en.",
    ctaBtn1: "Nous contacter →",
    ctaBtn2: "Votre Score",
  },
  es: {
    navSubtext: "ACERCA DE",
    navHome: "← Inicio",
    navCta: "Tu Puntuación →",
    heroBadge: "ACERCA DE",
    heroTitle1: "Quiénes ",
    heroTitle2: "somos",
    heroDesc: "El equipo detrás de ACF Score® y la metodología Agentic Commerce Framework®.",
    timelineLabel: "Cronología",
    timelineTitle1: "La historia de ",
    timelineTitle2: "ACF®",
    timelineTitle3: "",
    timeline: [
      { year: "2000–2024", event: "25 años de experiencia en comercio electrónico y transformación digital — observación de la pérdida de control vinculada a la automatización" },
      { year: "Inicio 2025", event: "Emergencia de agentes de IA autónomos en el comercio — constatación de la ausencia total de un marco de gobernanza" },
      { year: "T1 2025", event: "Creación del Agentic Commerce Framework® — metodología de gobernanza de 4 capas" },
      { year: "T2 2025", event: "Lanzamiento de ACF Score® — diagnóstico gratuito en línea de gobernanza agéntica" },
      { year: "T3 2025", event: "Diseño de ACF Control (panel de control) y del programa de certificación ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — plataforma de ecosistema completa. Programa de Socios. Academy. Blog de Investigación." },
    ],
    founderLabel: "Fundador",
    founderTitle1: "Creador del Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Fundador · Gobernanza agéntica",
    founderTags: ["Creador ACF®", "Gobernanza IA", "Experto E-commerce"],
    founderP1: "Vincent DORANGE trabaja en comercio electrónico y estrategia digital desde hace más de 25 años. A lo largo de estas dos décadas, ha observado desde dentro las profundas transformaciones del comercio digital: el auge de las plataformas, la centralización de las decisiones en los algoritmos y la creciente dependencia de las empresas de las infraestructuras tecnológicas.",
    founderP2strong: "¿quién posee realmente el poder de decisión en las organizaciones impulsadas por datos y sistemas automatizados?",
    founderP2: "Su trabajo se ha centrado progresivamente en una cuestión que se ha vuelto central en la economía digital: ",
    founderP3pre: "Ante la emergencia de agentes de inteligencia artificial autónomos, desarrolló en 2025 el ",
    founderP3strong: "Agentic Commerce Framework® (ACF®), un marco metodológico diseñado para ayudar a las organizaciones a gobernar el uso de agentes de IA y preservar su soberanía decisional en la economía agéntica.",
    founderP4: "Con sede en Francia, trabaja con pymes, empresas medianas y grandes corporaciones en cuestiones de transformación digital, gobernanza de IA y evolución de modelos de negocio en la era de los sistemas autónomos.",
    educationLabel: "Formación y trayectoria",
    educationTitle1: "Formación ",
    educationTitle2: "académica",
    educationHeading: "FORMACIÓN",
    execEducationHeading: "Formación ejecutiva e investigación",
    membershipLabel: "Afiliaciones profesionales",
    membershipTitle: "Afiliaciones",
    companyLabel: "Empresa",
    companyP1: "AI CONSULTING es una consultora especializada en inteligencia artificial, particularmente en automatización y agentes de IA con enfoque en la ",
    companyP1strong: "gobernanza agéntica",
    companyP2pre: "Acompañamos a las organizaciones en su transición hacia un ",
    companyP2strong: "uso soberano y controlado de los agentes de IA autónomos",
    companyP3pre: "Nuestro enfoque es pragmático y operativo: no teorizamos sobre la IA, estructuramos su capacidad para gobernarla. Nuestras intervenciones se basan esencialmente en la ",
    companyP3strong: "metodología ACF®",
    values: [
      { icon: "🎯", title: "Soberanía ante todo", desc: "Su control estratégico sobre las decisiones automatizadas es innegociable." },
      { icon: "⚡", title: "Pragmatismo operativo", desc: "Recomendaciones accionables en 30 días, no teoría abstracta." },
      { icon: "🔍", title: "Transparencia total", desc: "Metodología documentada, puntuación explicable, resultados verificables." },
    ],
    ctaTitle1: "Trabajemos ",
    ctaTitle2: "juntos",
    ctaDesc: "Ya sea que desee un diagnóstico, acompañamiento o una asociación, hablemos.",
    ctaBtn1: "Contáctenos →",
    ctaBtn2: "Tu Puntuación",
  },
  de: {
    navSubtext: "ÜBER UNS",
    navHome: "← Startseite",
    navCta: "Ihr Score →",
    heroBadge: "ÜBER UNS",
    heroTitle1: "Wer wir ",
    heroTitle2: "sind",
    heroDesc: "Das Team hinter ACF Score® und der Agentic Commerce Framework®-Methodik.",
    timelineLabel: "Zeitstrahl",
    timelineTitle1: "Die ",
    timelineTitle2: "ACF®",
    timelineTitle3: "-Geschichte",
    timeline: [
      { year: "2000–2024", event: "25 Jahre Erfahrung in E-Commerce und digitaler Transformation — Beobachtung des Kontrollverlusts durch Automatisierung" },
      { year: "Anfang 2025", event: "Aufkommen autonomer KI-Agenten im Handel — Feststellung des völligen Fehlens eines Governance-Rahmens" },
      { year: "Q1 2025", event: "Entwicklung des Agentic Commerce Framework® — 4-Schichten-Governance-Methodik" },
      { year: "Q2 2025", event: "Start von ACF Score® — kostenlose Online-Diagnose für agentische Governance" },
      { year: "Q3 2025", event: "Konzeption von ACF Control (Dashboard) und des Zertifizierungsprogramms ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — vollständige Ökosystem-Plattform. Partnerprogramm. Academy. Forschungsblog." },
    ],
    founderLabel: "Gründer",
    founderTitle1: "Schöpfer des Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Gründer · Agentische Governance",
    founderTags: ["ACF®-Schöpfer", "KI-Governance", "E-Commerce-Experte"],
    founderP1: "Vincent DORANGE arbeitet seit über 25 Jahren im E-Commerce und in der digitalen Strategie. In diesen zwei Jahrzehnten hat er die tiefgreifenden Transformationen des digitalen Handels von innen beobachtet: den Aufstieg der Plattformen, die Zentralisierung von Entscheidungen in Algorithmen und die wachsende Abhängigkeit der Unternehmen von technologischen Infrastrukturen.",
    founderP2strong: "Wer besitzt wirklich die Entscheidungsmacht in Organisationen, die von Daten und automatisierten Systemen gesteuert werden?",
    founderP2: "Seine Arbeit hat sich zunehmend auf eine Frage konzentriert, die in der digitalen Wirtschaft zentral geworden ist: ",
    founderP3pre: "Angesichts des Aufkommens autonomer Agenten der künstlichen Intelligenz entwickelte er 2025 das ",
    founderP3strong: "Agentic Commerce Framework® (ACF®), ein methodisches Rahmenwerk, das Organisationen helfen soll, den Einsatz von KI-Agenten zu steuern und ihre Entscheidungssouveränität in der agentischen Wirtschaft zu bewahren.",
    founderP4: "Mit Sitz in Frankreich arbeitet er mit KMU, mittelständischen Unternehmen und Großkonzernen an Fragen der digitalen Transformation, KI-Governance und der Weiterentwicklung von Geschäftsmodellen im Zeitalter autonomer Systeme.",
    educationLabel: "Ausbildung & Werdegang",
    educationTitle1: "Akademischer ",
    educationTitle2: "Werdegang",
    educationHeading: "AUSBILDUNG",
    execEducationHeading: "Weiterbildung & Forschung",
    membershipLabel: "Berufliche Mitgliedschaften",
    membershipTitle: "Mitgliedschaften",
    companyLabel: "Unternehmen",
    companyP1: "AI CONSULTING ist eine Beratungsfirma, spezialisiert auf künstliche Intelligenz, insbesondere auf Automatisierung und KI-Agenten mit Fokus auf ",
    companyP1strong: "agentische Governance",
    companyP2pre: "Wir begleiten Organisationen bei ihrem Übergang zu einem ",
    companyP2strong: "souveränen und kontrollierten Einsatz autonomer KI-Agenten",
    companyP3pre: "Unser Ansatz ist pragmatisch und operativ: Wir theoretisieren nicht über KI, wir strukturieren Ihre Fähigkeit, sie zu steuern. Unsere Interventionen basieren im Wesentlichen auf der ",
    companyP3strong: "ACF®-Methodik",
    values: [
      { icon: "🎯", title: "Souveränität zuerst", desc: "Ihre strategische Kontrolle über automatisierte Entscheidungen ist nicht verhandelbar." },
      { icon: "⚡", title: "Operativer Pragmatismus", desc: "Umsetzbare Empfehlungen innerhalb von 30 Tagen, keine abstrakte Theorie." },
      { icon: "🔍", title: "Vollständige Transparenz", desc: "Dokumentierte Methodik, erklärbares Scoring, überprüfbare Ergebnisse." },
    ],
    ctaTitle1: "Lassen Sie uns ",
    ctaTitle2: "zusammenarbeiten",
    ctaDesc: "Ob Sie eine Diagnose, Begleitung oder eine Partnerschaft wünschen — sprechen wir darüber.",
    ctaBtn1: "Kontakt aufnehmen →",
    ctaBtn2: "Ihr Score",
  },
  pt: {
    navSubtext: "SOBRE",
    navHome: "← Início",
    navCta: "Sua Pontuação →",
    heroBadge: "SOBRE",
    heroTitle1: "Quem ",
    heroTitle2: "somos",
    heroDesc: "A equipa por trás do ACF Score® e da metodologia Agentic Commerce Framework®.",
    timelineLabel: "Cronologia",
    timelineTitle1: "A história do ",
    timelineTitle2: "ACF®",
    timelineTitle3: "",
    timeline: [
      { year: "2000–2024", event: "25 anos de experiência em e-commerce e transformação digital — observação da perda de controlo ligada à automatização" },
      { year: "Início 2025", event: "Emergência de agentes de IA autónomos no comércio — constatação da ausência total de um quadro de governança" },
      { year: "T1 2025", event: "Criação do Agentic Commerce Framework® — metodologia de governança de 4 camadas" },
      { year: "T2 2025", event: "Lançamento do ACF Score® — diagnóstico gratuito online de governança agêntica" },
      { year: "T3 2025", event: "Conceção do ACF Control (painel de controlo) e do programa de certificação ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — plataforma de ecossistema completa. Programa de Parceiros. Academy. Blog de Investigação." },
    ],
    founderLabel: "Fundador",
    founderTitle1: "Criador do Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Fundador · Governança agêntica",
    founderTags: ["Criador ACF®", "Governança IA", "Especialista E-commerce"],
    founderP1: "Vincent DORANGE trabalha em e-commerce e estratégia digital há mais de 25 anos. Ao longo destas duas décadas, observou de dentro as profundas transformações do comércio digital: a ascensão das plataformas, a centralização das decisões nos algoritmos e a crescente dependência das empresas das infraestruturas tecnológicas.",
    founderP2strong: "quem detém realmente o poder decisório nas organizações orientadas por dados e sistemas automatizados?",
    founderP2: "O seu trabalho concentrou-se progressivamente numa questão que se tornou central na economia digital: ",
    founderP3pre: "Perante a emergência de agentes de inteligência artificial autónomos, desenvolveu em 2025 o ",
    founderP3strong: "Agentic Commerce Framework® (ACF®), um quadro metodológico concebido para ajudar as organizações a governar a utilização de agentes de IA e preservar a sua soberania decisória na economia agêntica.",
    founderP4: "Sediado em França, trabalha com PMEs, empresas de média dimensão e grandes corporações em questões de transformação digital, governança de IA e evolução de modelos de negócio na era dos sistemas autónomos.",
    educationLabel: "Formação e percurso",
    educationTitle1: "Percurso ",
    educationTitle2: "académico",
    educationHeading: "FORMAÇÃO",
    execEducationHeading: "Formação executiva e investigação",
    membershipLabel: "Afiliações profissionais",
    membershipTitle: "Afiliações",
    companyLabel: "Empresa",
    companyP1: "AI CONSULTING é uma empresa de consultoria especializada em inteligência artificial, particularmente em automatização e agentes de IA com foco na ",
    companyP1strong: "governança agêntica",
    companyP2pre: "Acompanhamos as organizações na sua transição para um ",
    companyP2strong: "uso soberano e controlado dos agentes de IA autónomos",
    companyP3pre: "A nossa abordagem é pragmática e operacional: não teorizamos sobre a IA, estruturamos a sua capacidade de a governar. As nossas intervenções baseiam-se essencialmente na ",
    companyP3strong: "metodologia ACF®",
    values: [
      { icon: "🎯", title: "Soberania em primeiro lugar", desc: "O seu controlo estratégico sobre decisões automatizadas é inegociável." },
      { icon: "⚡", title: "Pragmatismo operacional", desc: "Recomendações acionáveis em 30 dias, não teoria abstrata." },
      { icon: "🔍", title: "Transparência total", desc: "Metodologia documentada, pontuação explicável, resultados verificáveis." },
    ],
    ctaTitle1: "Vamos trabalhar ",
    ctaTitle2: "juntos",
    ctaDesc: "Quer pretenda um diagnóstico, acompanhamento ou uma parceria, vamos conversar.",
    ctaBtn1: "Contacte-nos →",
    ctaBtn2: "Sua Pontuação",
  },
  ja: {
    navSubtext: "概要",
    navHome: "← ホーム",
    navCta: "スコアを取得 →",
    heroBadge: "概要",
    heroTitle1: "私たちに",
    heroTitle2: "ついて",
    heroDesc: "ACF Score®とAgentic Commerce Framework®メソドロジーを支えるチーム。",
    timelineLabel: "沿革",
    timelineTitle1: "",
    timelineTitle2: "ACF®",
    timelineTitle3: "の歩み",
    timeline: [
      { year: "2000–2024", event: "eコマースとデジタルトランスフォーメーションにおける25年の経験 — 自動化に伴う制御喪失の観察" },
      { year: "2025年初頭", event: "商取引における自律型AIエージェントの台頭 — ガバナンスフレームワークの完全な欠如を認識" },
      { year: "2025年第1四半期", event: "Agentic Commerce Framework®の創設 — 4層ガバナンスメソドロジー" },
      { year: "2025年第2四半期", event: "ACF Score®のローンチ — 無料オンラインエージェンティックガバナンス診断" },
      { year: "2025年第3四半期", event: "ACF Control（ダッシュボード）およびACF TRUST™ / ACF CERTIFIED認証プログラムの設計" },
      { year: "2026年", event: "ACF Standard — 完全なエコシステムプラットフォーム。パートナープログラム。Academy。研究ブログ。" },
    ],
    founderLabel: "創設者",
    founderTitle1: "Agentic Commerce Framework®の ",
    founderTitle2: "創設者(ACF®)",
    founderSubtitle: "創設者 · エージェンティックガバナンス",
    founderTags: ["ACF®クリエイター", "AIガバナンス", "eコマース専門家"],
    founderP1: "Vincent DORANGEは、25年以上にわたりeコマースとデジタル戦略に携わっています。この20年間で、デジタル商取引の深い変革を内側から観察してきました：プラットフォームの台頭、アルゴリズムへの意思決定の集中、そして企業の技術インフラへの依存の高まりです。",
    founderP2strong: "データと自動化システムによって駆動される組織において、誰が本当に意思決定権を持っているのか？",
    founderP2: "彼の仕事は、デジタル経済において中心的な課題となった問いに徐々に集中するようになりました：",
    founderP3pre: "自律型人工知能エージェントの台頭に直面し、2025年に",
    founderP3strong: "Agentic Commerce Framework®（ACF®）を開発しました。これは、組織がAIエージェントの利用を統治し、エージェンティック経済における意思決定の主権を維持するために設計されたメソドロジカルフレームワークです。",
    founderP4: "フランスを拠点に、中小企業、中堅企業、大企業に対して、デジタルトランスフォーメーション、AIガバナンス、自律型システム時代のビジネスモデルの進化に関する支援を行っています。",
    educationLabel: "学歴・研修",
    educationTitle1: "学術的 ",
    educationTitle2: "背景",
    educationHeading: "学歴",
    execEducationHeading: "エグゼクティブ教育・研究",
    membershipLabel: "専門会員資格",
    membershipTitle: "所属団体",
    companyLabel: "企業",
    companyP1: "AI CONSULTINGは、人工知能、特に自動化とAIエージェントに特化したコンサルティング会社であり、",
    companyP1strong: "エージェンティックガバナンス",
    companyP2pre: "私たちは、組織が",
    companyP2strong: "自律型AIエージェントの主権的かつ制御された利用",
    companyP3pre: "私たちのアプローチは実践的かつ実務的です。AIについて理論化するのではなく、それを統治する能力を構造化します。私たちの介入は本質的に",
    companyP3strong: "ACF®メソドロジー",
    values: [
      { icon: "🎯", title: "主権第一", desc: "自動化された意思決定に対する戦略的統制は交渉の余地がありません。" },
      { icon: "⚡", title: "実践的プラグマティズム", desc: "30日以内の実行可能な提言、抽象的な理論ではありません。" },
      { icon: "🔍", title: "完全な透明性", desc: "文書化されたメソドロジー、説明可能なスコアリング、検証可能な結果。" },
    ],
    ctaTitle1: "一緒に",
    ctaTitle2: "取り組みましょう",
    ctaDesc: "診断、支援、パートナーシップのいずれをご希望でも、ぜひお話しましょう。",
    ctaBtn1: "お問い合わせ →",
    ctaBtn2: "スコアを取得",
  },
  zh: {
    navSubtext: "关于我们",
    navHome: "← 首页",
    navCta: "获取评分 →",
    heroBadge: "关于我们",
    heroTitle1: "我们是",
    heroTitle2: "谁",
    heroDesc: "ACF Score®和Agentic Commerce Framework®方法论背后的团队。",
    timelineLabel: "时间线",
    timelineTitle1: "",
    timelineTitle2: "ACF®",
    timelineTitle3: "的故事",
    timeline: [
      { year: "2000–2024", event: "25年电子商务和数字化转型经验——观察到自动化带来的控制力丧失" },
      { year: "2025年初", event: "自主AI代理在商业中的兴起——意识到治理框架的完全缺失" },
      { year: "2025年第一季度", event: "创建Agentic Commerce Framework®——四层治理方法论" },
      { year: "2025年第二季度", event: "推出ACF Score®——免费在线代理治理诊断" },
      { year: "2025年第三季度", event: "设计ACF Control（仪表板）和ACF TRUST™ / ACF CERTIFIED认证计划" },
      { year: "2026年", event: "ACF Standard——完整的生态系统平台。合作伙伴计划。Academy。研究博客。" },
    ],
    founderLabel: "创始人",
    founderTitle1: "Agentic Commerce Framework®的 ",
    founderTitle2: "创始人(ACF®)",
    founderSubtitle: "创始人 · 代理治理",
    founderTags: ["ACF®创始人", "AI治理", "电子商务专家"],
    founderP1: "Vincent DORANGE在电子商务和数字战略领域工作超过25年。在这二十多年里，他从内部观察了数字商业的深刻变革：平台的崛起、算法中决策的集中化，以及企业对技术基础设施的日益依赖。",
    founderP2strong: "在由数据和自动化系统驱动的组织中，谁真正掌握着决策权？",
    founderP2: "他的工作逐渐聚焦于一个在数字经济中变得至关重要的问题：",
    founderP3pre: "面对自主人工智能代理的兴起，他于2025年开发了",
    founderP3strong: "Agentic Commerce Framework®（ACF®），一个旨在帮助组织治理AI代理使用并在代理经济中维护其决策主权的方法论框架。",
    founderP4: "他常驻法国，与中小企业、中型企业和大型企业合作，致力于数字化转型、AI治理以及自主系统时代商业模式演进等议题。",
    educationLabel: "教育背景",
    educationTitle1: "学术 ",
    educationTitle2: "背景",
    educationHeading: "教育",
    execEducationHeading: "高管教育与研究",
    membershipLabel: "专业会员资格",
    membershipTitle: "所属机构",
    companyLabel: "公司",
    companyP1: "AI CONSULTING是一家专注于人工智能的咨询公司，尤其在自动化和AI代理领域，重点关注",
    companyP1strong: "代理治理",
    companyP2pre: "我们帮助组织向",
    companyP2strong: "自主AI代理的主权化和受控使用",
    companyP3pre: "我们的方法务实且注重实操：我们不对AI进行理论空谈，而是构建您治理AI的能力。我们的服务本质上基于",
    companyP3strong: "ACF®方法论",
    values: [
      { icon: "🎯", title: "主权优先", desc: "您对自动化决策的战略控制不可妥协。" },
      { icon: "⚡", title: "务实运营", desc: "30天内提供可执行的建议，而非抽象理论。" },
      { icon: "🔍", title: "完全透明", desc: "文档化的方法论、可解释的评分、可验证的结果。" },
    ],
    ctaTitle1: "让我们 ",
    ctaTitle2: "合作",
    ctaDesc: "无论您需要诊断、咨询还是合作伙伴关系，让我们沟通。",
    ctaBtn1: "联系我们 →",
    ctaBtn2: "获取评分",
  },
  ko: {
    navSubtext: "소개",
    navHome: "← 홈",
    navCta: "점수 확인 →",
    heroBadge: "소개",
    heroTitle1: "우리는 ",
    heroTitle2: "누구인가",
    heroDesc: "ACF Score®와 Agentic Commerce Framework® 방법론을 이끄는 팀.",
    timelineLabel: "연혁",
    timelineTitle1: "",
    timelineTitle2: "ACF®",
    timelineTitle3: "의 이야기",
    timeline: [
      { year: "2000–2024", event: "전자상거래 및 디지털 전환 분야 25년 경험 — 자동화로 인한 통제력 상실 관찰" },
      { year: "2025년 초", event: "상거래에서 자율 AI 에이전트의 부상 — 거버넌스 프레임워크의 완전한 부재 인식" },
      { year: "2025년 1분기", event: "Agentic Commerce Framework® 개발 — 4계층 거버넌스 방법론" },
      { year: "2025년 2분기", event: "ACF Score® 출시 — 무료 온라인 에이전틱 거버넌스 진단" },
      { year: "2025년 3분기", event: "ACF Control(대시보드) 및 ACF TRUST™ / ACF CERTIFIED 인증 프로그램 설계" },
      { year: "2026년", event: "ACF Standard — 완전한 에코시스템 플랫폼. 파트너 프로그램. Academy. 연구 블로그." },
    ],
    founderLabel: "설립자",
    founderTitle1: "Agentic Commerce Framework®의 ",
    founderTitle2: "창시자(ACF®)",
    founderSubtitle: "설립자 · 에이전틱 거버넌스",
    founderTags: ["ACF® 창시자", "AI 거버넌스", "전자상거래 전문가"],
    founderP1: "Vincent DORANGE는 25년 이상 전자상거래와 디지털 전략 분야에서 활동해 왔습니다. 이 20여 년간 디지털 상거래의 근본적인 변화를 내부에서 관찰했습니다: 플랫폼의 부상, 알고리즘으로의 의사결정 집중, 그리고 기술 인프라에 대한 기업의 의존도 증가.",
    founderP2strong: "데이터와 자동화 시스템에 의해 운영되는 조직에서 누가 진정한 의사결정 권한을 보유하고 있는가?",
    founderP2: "그의 작업은 디지털 경제에서 핵심적인 질문에 점차 집중하게 되었습니다: ",
    founderP3pre: "자율 인공지능 에이전트의 부상에 대응하여, 2025년에 ",
    founderP3strong: "Agentic Commerce Framework®(ACF®)를 개발했습니다. 이는 조직이 AI 에이전트의 사용을 거버넌스하고 에이전틱 경제에서 의사결정 주권을 유지할 수 있도록 설계된 방법론적 프레임워크입니다.",
    founderP4: "프랑스에 기반을 두고 중소기업, 중견기업, 대기업과 함께 디지털 전환, AI 거버넌스, 자율 시스템 시대의 비즈니스 모델 진화에 대해 협력하고 있습니다.",
    educationLabel: "교육 및 경력",
    educationTitle1: "학술 ",
    educationTitle2: "배경",
    educationHeading: "교육",
    execEducationHeading: "경영자 교육 및 연구",
    membershipLabel: "전문 회원 자격",
    membershipTitle: "소속",
    companyLabel: "기업",
    companyP1: "AI CONSULTING은 인공지능, 특히 자동화 및 AI 에이전트 분야에 특화된 컨설팅 회사로, ",
    companyP1strong: "에이전틱 거버넌스",
    companyP2pre: "우리는 조직이 ",
    companyP2strong: "자율 AI 에이전트의 주권적이고 통제된 사용",
    companyP3pre: "우리의 접근 방식은 실용적이고 운영적입니다: AI에 대해 이론화하지 않고, 이를 거버넌스할 수 있는 역량을 구조화합니다. 우리의 서비스는 본질적으로 ",
    companyP3strong: "ACF® 방법론",
    values: [
      { icon: "🎯", title: "주권 우선", desc: "자동화된 의사결정에 대한 전략적 통제는 협상의 여지가 없습니다." },
      { icon: "⚡", title: "실용적 운영", desc: "30일 이내 실행 가능한 권고사항, 추상적 이론이 아닙니다." },
      { icon: "🔍", title: "완전한 투명성", desc: "문서화된 방법론, 설명 가능한 스코어링, 검증 가능한 결과." },
    ],
    ctaTitle1: "함께 ",
    ctaTitle2: "일합시다",
    ctaDesc: "진단, 지원, 파트너십 중 무엇을 원하시든, 이야기해 봅시다.",
    ctaBtn1: "문의하기 →",
    ctaBtn2: "점수 확인",
  },
  it: {
    navSubtext: "CHI SIAMO",
    navHome: "← Home",
    navCta: "Il tuo Punteggio →",
    heroBadge: "CHI SIAMO",
    heroTitle1: "Chi ",
    heroTitle2: "siamo",
    heroDesc: "Il team dietro ACF Score® e la metodologia Agentic Commerce Framework®.",
    timelineLabel: "Cronologia",
    timelineTitle1: "La storia di ",
    timelineTitle2: "ACF®",
    timelineTitle3: "",
    timeline: [
      { year: "2000–2024", event: "25 anni di esperienza nell'e-commerce e nella trasformazione digitale — osservazione della perdita di controllo legata all'automazione" },
      { year: "Inizio 2025", event: "Emergenza degli agenti IA autonomi nel commercio — constatazione dell'assenza totale di un quadro di governance" },
      { year: "T1 2025", event: "Creazione dell'Agentic Commerce Framework® — metodologia di governance a 4 livelli" },
      { year: "T2 2025", event: "Lancio di ACF Score® — diagnostica gratuita online di governance agentica" },
      { year: "T3 2025", event: "Progettazione di ACF Control (dashboard) e del programma di certificazione ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — piattaforma ecosistema completa. Programma Partner. Academy. Blog di Ricerca." },
    ],
    founderLabel: "Fondatore",
    founderTitle1: "Creatore dell'Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Fondatore · Governance agentica",
    founderTags: ["Creatore ACF®", "Governance IA", "Esperto E-commerce"],
    founderP1: "Vincent DORANGE lavora nell'e-commerce e nella strategia digitale da oltre 25 anni. Nel corso di questi due decenni, ha osservato dall'interno le profonde trasformazioni del commercio digitale: l'ascesa delle piattaforme, la centralizzazione delle decisioni negli algoritmi e la crescente dipendenza delle aziende dalle infrastrutture tecnologiche.",
    founderP2strong: "chi detiene realmente il potere decisionale nelle organizzazioni guidate dai dati e dai sistemi automatizzati?",
    founderP2: "Il suo lavoro si è progressivamente concentrato su una questione divenuta centrale nell'economia digitale: ",
    founderP3pre: "Di fronte all'emergere di agenti di intelligenza artificiale autonomi, ha sviluppato nel 2025 l'",
    founderP3strong: "Agentic Commerce Framework® (ACF®), un quadro metodologico progettato per aiutare le organizzazioni a governare l'uso degli agenti IA e preservare la loro sovranità decisionale nell'economia agentica.",
    founderP4: "Con sede in Francia, lavora con PMI, medie imprese e grandi aziende su questioni di trasformazione digitale, governance dell'IA ed evoluzione dei modelli di business nell'era dei sistemi autonomi.",
    educationLabel: "Formazione e percorso",
    educationTitle1: "Percorso ",
    educationTitle2: "accademico",
    educationHeading: "FORMAZIONE",
    execEducationHeading: "Formazione executive e ricerca",
    membershipLabel: "Affiliazioni professionali",
    membershipTitle: "Affiliazioni",
    companyLabel: "Azienda",
    companyP1: "AI CONSULTING è una società di consulenza specializzata in intelligenza artificiale, in particolare nell'automazione e negli agenti IA con focus sulla ",
    companyP1strong: "governance agentica",
    companyP2pre: "Accompagniamo le organizzazioni nella loro transizione verso un ",
    companyP2strong: "uso sovrano e controllato degli agenti IA autonomi",
    companyP3pre: "Il nostro approccio è pragmatico e operativo: non teorizziamo sull'IA, strutturiamo la vostra capacità di governarla. I nostri interventi si basano essenzialmente sulla ",
    companyP3strong: "metodologia ACF®",
    values: [
      { icon: "🎯", title: "Sovranità prima di tutto", desc: "Il vostro controllo strategico sulle decisioni automatizzate è non negoziabile." },
      { icon: "⚡", title: "Pragmatismo operativo", desc: "Raccomandazioni attuabili entro 30 giorni, non teoria astratta." },
      { icon: "🔍", title: "Trasparenza totale", desc: "Metodologia documentata, scoring spiegabile, risultati verificabili." },
    ],
    ctaTitle1: "Lavoriamo ",
    ctaTitle2: "insieme",
    ctaDesc: "Che desideriate una diagnosi, un accompagnamento o una partnership, parliamone.",
    ctaBtn1: "Contattaci →",
    ctaBtn2: "Il tuo Punteggio",
  },
  nl: {
    navSubtext: "OVER ONS",
    navHome: "← Home",
    navCta: "Uw Score →",
    heroBadge: "OVER ONS",
    heroTitle1: "Wie wij ",
    heroTitle2: "zijn",
    heroDesc: "Het team achter ACF Score® en de Agentic Commerce Framework®-methodologie.",
    timelineLabel: "Tijdlijn",
    timelineTitle1: "Het ",
    timelineTitle2: "ACF®",
    timelineTitle3: "-verhaal",
    timeline: [
      { year: "2000–2024", event: "25 jaar ervaring in e-commerce en digitale transformatie — observatie van het controleverlies door automatisering" },
      { year: "Begin 2025", event: "Opkomst van autonome AI-agenten in de handel — vaststelling van het totale ontbreken van een governance-kader" },
      { year: "K1 2025", event: "Creatie van het Agentic Commerce Framework® — 4-laags governance-methodologie" },
      { year: "K2 2025", event: "Lancering van ACF Score® — gratis online agentische governance-diagnose" },
      { year: "K3 2025", event: "Ontwerp van ACF Control (dashboard) en het certificeringsprogramma ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — volledig ecosysteemplatform. Partnerprogramma. Academy. Onderzoeksblog." },
    ],
    founderLabel: "Oprichter",
    founderTitle1: "Maker van het Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Oprichter · Agentische governance",
    founderTags: ["ACF®-maker", "AI-governance", "E-commerce-expert"],
    founderP1: "Vincent DORANGE werkt al meer dan 25 jaar in e-commerce en digitale strategie. Gedurende deze twee decennia heeft hij van binnenuit de diepgaande transformaties van de digitale handel waargenomen: de opkomst van platformen, de centralisatie van beslissingen in algoritmen en de groeiende afhankelijkheid van bedrijven van technologische infrastructuren.",
    founderP2strong: "wie bezit werkelijk de beslissingsmacht in organisaties die worden aangestuurd door data en geautomatiseerde systemen?",
    founderP2: "Zijn werk heeft zich geleidelijk gericht op een vraag die centraal is geworden in de digitale economie: ",
    founderP3pre: "Geconfronteerd met de opkomst van autonome kunstmatige intelligentie-agenten ontwikkelde hij in 2025 het ",
    founderP3strong: "Agentic Commerce Framework® (ACF®), een methodologisch kader ontworpen om organisaties te helpen het gebruik van AI-agenten te besturen en hun beslissingssoevereiniteit in de agentische economie te behouden.",
    founderP4: "Gevestigd in Frankrijk werkt hij samen met MKB's, middelgrote bedrijven en grote ondernemingen op het gebied van digitale transformatie, AI-governance en de evolutie van bedrijfsmodellen in het tijdperk van autonome systemen.",
    educationLabel: "Opleiding & achtergrond",
    educationTitle1: "Academische ",
    educationTitle2: "achtergrond",
    educationHeading: "OPLEIDING",
    execEducationHeading: "Executive onderwijs & onderzoek",
    membershipLabel: "Professionele lidmaatschappen",
    membershipTitle: "Lidmaatschappen",
    companyLabel: "Bedrijf",
    companyP1: "AI CONSULTING is een adviesbureau gespecialiseerd in kunstmatige intelligentie, met name in automatisering en AI-agenten met focus op ",
    companyP1strong: "agentische governance",
    companyP2pre: "Wij begeleiden organisaties bij hun transitie naar een ",
    companyP2strong: "soeverein en gecontroleerd gebruik van autonome AI-agenten",
    companyP3pre: "Onze aanpak is pragmatisch en operationeel: wij theoretiseren niet over AI, wij structureren uw vermogen om het te besturen. Onze interventies zijn in essentie gebaseerd op de ",
    companyP3strong: "ACF®-methodologie",
    values: [
      { icon: "🎯", title: "Soevereiniteit eerst", desc: "Uw strategische controle over geautomatiseerde beslissingen is niet onderhandelbaar." },
      { icon: "⚡", title: "Operationeel pragmatisme", desc: "Uitvoerbare aanbevelingen binnen 30 dagen, geen abstracte theorie." },
      { icon: "🔍", title: "Volledige transparantie", desc: "Gedocumenteerde methodologie, verklaarbare scoring, verifieerbare resultaten." },
    ],
    ctaTitle1: "Laten we ",
    ctaTitle2: "samenwerken",
    ctaDesc: "Of u nu een diagnose, begeleiding of een partnerschap wenst, laten we erover praten.",
    ctaBtn1: "Neem contact op →",
    ctaBtn2: "Uw Score",
  },
  ru: {
    navSubtext: "О НАС",
    navHome: "← Главная",
    navCta: "Ваш балл →",
    heroBadge: "О НАС",
    heroTitle1: "Кто мы ",
    heroTitle2: "такие",
    heroDesc: "Команда, стоящая за ACF Score® и методологией Agentic Commerce Framework®.",
    timelineLabel: "Хронология",
    timelineTitle1: "История ",
    timelineTitle2: "ACF®",
    timelineTitle3: "",
    timeline: [
      { year: "2000–2024", event: "25 лет опыта в электронной коммерции и цифровой трансформации — наблюдение потери контроля, связанной с автоматизацией" },
      { year: "Начало 2025", event: "Появление автономных ИИ-агентов в торговле — осознание полного отсутствия системы управления" },
      { year: "1 кв. 2025", event: "Создание Agentic Commerce Framework® — 4-уровневая методология управления" },
      { year: "2 кв. 2025", event: "Запуск ACF Score® — бесплатная онлайн-диагностика агентного управления" },
      { year: "3 кв. 2025", event: "Разработка ACF Control (панель управления) и программы сертификации ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — полноценная экосистемная платформа. Партнёрская программа. Academy. Исследовательский блог." },
    ],
    founderLabel: "Основатель",
    founderTitle1: "Создатель Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "Основатель · Агентное управление",
    founderTags: ["Создатель ACF®", "Управление ИИ", "Эксперт по e-commerce"],
    founderP1: "Vincent DORANGE работает в сфере электронной коммерции и цифровой стратегии более 25 лет. За эти два десятилетия он изнутри наблюдал глубокие трансформации цифровой торговли: рост платформ, централизацию принятия решений в алгоритмах и растущую зависимость компаний от технологической инфраструктуры.",
    founderP2strong: "кто на самом деле обладает правом принятия решений в организациях, управляемых данными и автоматизированными системами?",
    founderP2: "Его работа постепенно сосредоточилась на вопросе, ставшем центральным в цифровой экономике: ",
    founderP3pre: "Столкнувшись с появлением автономных агентов искусственного интеллекта, он разработал в 2025 году ",
    founderP3strong: "Agentic Commerce Framework® (ACF®) — методологическую структуру, призванную помочь организациям управлять использованием ИИ-агентов и сохранять суверенитет в принятии решений в агентной экономике.",
    founderP4: "Базируясь во Франции, он работает с малым и средним бизнесом, средними и крупными компаниями по вопросам цифровой трансформации, управления ИИ и эволюции бизнес-моделей в эпоху автономных систем.",
    educationLabel: "Образование и подготовка",
    educationTitle1: "Академическое ",
    educationTitle2: "образование",
    educationHeading: "ОБРАЗОВАНИЕ",
    execEducationHeading: "Дополнительное образование и исследования",
    membershipLabel: "Профессиональные членства",
    membershipTitle: "Членства",
    companyLabel: "Компания",
    companyP1: "AI CONSULTING — консалтинговая компания, специализирующаяся на искусственном интеллекте, в частности на автоматизации и ИИ-агентах с фокусом на ",
    companyP1strong: "агентное управление",
    companyP2pre: "Мы сопровождаем организации в их переходе к ",
    companyP2strong: "суверенному и контролируемому использованию автономных ИИ-агентов",
    companyP3pre: "Наш подход прагматичен и ориентирован на практику: мы не теоретизируем об ИИ, а структурируем вашу способность им управлять. Наши интервенции основываются преимущественно на ",
    companyP3strong: "методологии ACF®",
    values: [
      { icon: "🎯", title: "Суверенитет прежде всего", desc: "Ваш стратегический контроль над автоматизированными решениями не подлежит обсуждению." },
      { icon: "⚡", title: "Операционный прагматизм", desc: "Практические рекомендации в течение 30 дней, а не абстрактная теория." },
      { icon: "🔍", title: "Полная прозрачность", desc: "Документированная методология, объяснимый скоринг, проверяемые результаты." },
    ],
    ctaTitle1: "Давайте работать ",
    ctaTitle2: "вместе",
    ctaDesc: "Будь то диагностика, сопровождение или партнёрство — давайте обсудим.",
    ctaBtn1: "Связаться с нами →",
    ctaBtn2: "Ваш балл",
  },
  ar: {
    navSubtext: "من نحن",
    navHome: "→ الرئيسية",
    navCta: "← احصل على نقاطك",
    heroBadge: "من نحن",
    heroTitle1: "من ",
    heroTitle2: "نحن",
    heroDesc: "الفريق الذي يقف وراء ACF Score® ومنهجية Agentic Commerce Framework®.",
    timelineLabel: "الجدول الزمني",
    timelineTitle1: "قصة ",
    timelineTitle2: "ACF®",
    timelineTitle3: "",
    timeline: [
      { year: "2000–2024", event: "25 عامًا من الخبرة في التجارة الإلكترونية والتحول الرقمي — ملاحظة فقدان السيطرة المرتبط بالأتمتة" },
      { year: "بداية 2025", event: "ظهور وكلاء الذكاء الاصطناعي المستقلين في التجارة — إدراك الغياب التام لإطار الحوكمة" },
      { year: "الربع الأول 2025", event: "إنشاء Agentic Commerce Framework® — منهجية حوكمة من 4 طبقات" },
      { year: "الربع الثاني 2025", event: "إطلاق ACF Score® — تشخيص مجاني عبر الإنترنت للحوكمة الوكيلية" },
      { year: "الربع الثالث 2025", event: "تصميم ACF Control (لوحة التحكم) وبرنامج شهادة ACF TRUST™ / ACF CERTIFIED" },
      { year: "2026", event: "ACF Standard — منصة نظام بيئي متكاملة. برنامج الشركاء. Academy. مدونة البحث." },
    ],
    founderLabel: "المؤسس",
    founderTitle1: "مبتكر Agentic Commerce Framework® ",
    founderTitle2: "(ACF®)",
    founderSubtitle: "المؤسس · الحوكمة الوكيلية",
    founderTags: ["مبتكر ACF®", "حوكمة الذكاء الاصطناعي", "خبير التجارة الإلكترونية"],
    founderP1: "يعمل Vincent DORANGE في التجارة الإلكترونية والاستراتيجية الرقمية منذ أكثر من 25 عامًا. على مدار هذين العقدين، لاحظ من الداخل التحولات العميقة للتجارة الرقمية: صعود المنصات، ومركزة القرارات في الخوارزميات، والاعتماد المتزايد للشركات على البنى التحتية التكنولوجية.",
    founderP2strong: "من يملك فعلاً سلطة اتخاذ القرار في المنظمات التي تقودها البيانات والأنظمة الآلية؟",
    founderP2: "تركّز عمله تدريجيًا على سؤال أصبح محوريًا في الاقتصاد الرقمي: ",
    founderP3pre: "في مواجهة ظهور وكلاء الذكاء الاصطناعي المستقلين، طوّر في عام 2025 ",
    founderP3strong: "Agentic Commerce Framework® (ACF®)، إطار منهجي مصمم لمساعدة المنظمات على حوكمة استخدام وكلاء الذكاء الاصطناعي والحفاظ على سيادتها في اتخاذ القرارات في الاقتصاد الوكيلي.",
    founderP4: "يقيم في فرنسا، ويعمل مع الشركات الصغيرة والمتوسطة والشركات المتوسطة الحجم والشركات الكبرى في قضايا التحول الرقمي وحوكمة الذكاء الاصطناعي وتطور نماذج الأعمال في عصر الأنظمة المستقلة.",
    educationLabel: "التعليم والتدريب",
    educationTitle1: "الخلفية ",
    educationTitle2: "الأكاديمية",
    educationHeading: "التعليم",
    execEducationHeading: "التعليم التنفيذي والبحث",
    membershipLabel: "العضويات المهنية",
    membershipTitle: "الانتماءات",
    companyLabel: "الشركة",
    companyP1: "AI CONSULTING هي شركة استشارية متخصصة في الذكاء الاصطناعي، لا سيما في الأتمتة ووكلاء الذكاء الاصطناعي مع التركيز على ",
    companyP1strong: "الحوكمة الوكيلية",
    companyP2pre: "نرافق المنظمات في انتقالها نحو ",
    companyP2strong: "استخدام سيادي ومتحكم فيه لوكلاء الذكاء الاصطناعي المستقلين",
    companyP3pre: "نهجنا عملي وتشغيلي: لا ننظّر حول الذكاء الاصطناعي، بل نبني قدرتكم على حوكمته. تعتمد تدخلاتنا بشكل أساسي على ",
    companyP3strong: "منهجية ACF®",
    values: [
      { icon: "🎯", title: "السيادة أولاً", desc: "سيطرتكم الاستراتيجية على القرارات الآلية غير قابلة للتفاوض." },
      { icon: "⚡", title: "البراغماتية التشغيلية", desc: "توصيات قابلة للتنفيذ خلال 30 يومًا، وليس نظريات مجردة." },
      { icon: "🔍", title: "الشفافية الكاملة", desc: "منهجية موثقة، تسجيل قابل للتفسير، نتائج قابلة للتحقق." },
    ],
    ctaTitle1: "لنعمل ",
    ctaTitle2: "معًا",
    ctaDesc: "سواء كنتم تريدون تشخيصًا أو مرافقة أو شراكة، لنتحدث.",
    ctaBtn1: "← تواصل معنا",
    ctaBtn2: "احصل على نقاطك",
  },
  tr: {
    navSubtext: "HAKKIMIZDA",
    navHome: "← Ana Sayfa",
    navCta: "Puanınız →",
    heroBadge: "HAKKIMIZDA",
    heroTitle1: "Biz ",
    heroTitle2: "kimiz",
    heroDesc: "ACF Score® ve Agentic Commerce Framework® metodolojisinin arkasındaki ekip.",
    timelineLabel: "Zaman Çizelgesi",
    timelineTitle1: "",
    timelineTitle2: "ACF®",
    timelineTitle3: " Hikayesi",
    timeline: [
      { year: "2000–2024", event: "E-ticaret ve dijital dönüşüm alanında 25 yıllık deneyim — otomasyona bağlı kontrol kaybının gözlemlenmesi" },
      { year: "2025 Başı", event: "Ticarette otonom yapay zeka ajanlarının ortaya çıkışı — yönetişim çerçevesinin tamamen yokluğunun tespiti" },
      { year: "2025 Ç1", event: "Agentic Commerce Framework®'ün oluşturulması — 4 katmanlı yönetişim metodolojisi" },
      { year: "2025 Ç2", event: "ACF Score®'un lansmanı — ücretsiz çevrimiçi ajantik yönetişim teşhisi" },
      { year: "2025 Ç3", event: "ACF Control (kontrol paneli) ve ACF TRUST™ / ACF CERTIFIED sertifikasyon programının tasarımı" },
      { year: "2026", event: "ACF Standard — eksiksiz ekosistem platformu. Ortaklık Programı. Academy. Araştırma Blogu." },
    ],
    founderLabel: "Kurucu",
    founderTitle1: "Agentic Commerce Framework®'ün ",
    founderTitle2: "yaratıcısı (ACF®)",
    founderSubtitle: "Kurucu · Ajantik Yönetişim",
    founderTags: ["ACF® Yaratıcısı", "Yapay Zeka Yönetişimi", "E-ticaret Uzmanı"],
    founderP1: "Vincent DORANGE, 25 yılı aşkın süredir e-ticaret ve dijital strateji alanında çalışmaktadır. Bu yirmi yıl boyunca dijital ticaretin derin dönüşümlerini içeriden gözlemlemiştir: platformların yükselişi, kararların algoritmalarda merkezileşmesi ve şirketlerin teknolojik altyapılara artan bağımlılığı.",
    founderP2strong: "veri ve otomatik sistemler tarafından yönlendirilen organizasyonlarda karar verme gücünü gerçekte kim elinde tutuyor?",
    founderP2: "Çalışmaları, dijital ekonomide merkezi hale gelen bir soruya giderek odaklanmıştır: ",
    founderP3pre: "Otonom yapay zeka ajanlarının ortaya çıkışı karşısında, 2025 yılında ",
    founderP3strong: "Agentic Commerce Framework® (ACF®)'ü geliştirmiştir; bu, organizasyonların yapay zeka ajanlarının kullanımını yönetmelerine ve ajantik ekonomide karar verme egemenliklerini korumalarına yardımcı olmak için tasarlanmış metodolojik bir çerçevedir.",
    founderP4: "Fransa merkezli olarak KOBİ'ler, orta ölçekli şirketler ve büyük kuruluşlarla dijital dönüşüm, yapay zeka yönetişimi ve otonom sistemler çağında iş modellerinin evrimi konularında çalışmaktadır.",
    educationLabel: "Eğitim ve Geçmiş",
    educationTitle1: "Akademik ",
    educationTitle2: "Geçmiş",
    educationHeading: "EĞİTİM",
    execEducationHeading: "Yönetici Eğitimi ve Araştırma",
    membershipLabel: "Profesyonel Üyelikler",
    membershipTitle: "Üyelikler",
    companyLabel: "Şirket",
    companyP1: "AI CONSULTING, yapay zeka alanında uzmanlaşmış bir danışmanlık firmasıdır; özellikle otomasyon ve yapay zeka ajanları alanında ",
    companyP1strong: "ajantik yönetişim",
    companyP2pre: "Organizasyonları ",
    companyP2strong: "otonom yapay zeka ajanlarının egemen ve kontrollü kullanımına",
    companyP3pre: "Yaklaşımımız pragmatik ve operasyoneldir: yapay zeka hakkında teorileştirmiyoruz, onu yönetme kapasitenizi yapılandırıyoruz. Müdahalelerimiz esasen ",
    companyP3strong: "ACF® metodolojisine",
    values: [
      { icon: "🎯", title: "Önce Egemenlik", desc: "Otomatik kararlar üzerindeki stratejik kontrolünüz pazarlık konusu değildir." },
      { icon: "⚡", title: "Operasyonel Pragmatizm", desc: "30 gün içinde uygulanabilir öneriler, soyut teori değil." },
      { icon: "🔍", title: "Tam Şeffaflık", desc: "Belgelenmiş metodoloji, açıklanabilir puanlama, doğrulanabilir sonuçlar." },
    ],
    ctaTitle1: "Birlikte ",
    ctaTitle2: "çalışalım",
    ctaDesc: "İster bir teşhis, ister eşlik, ister bir ortaklık isteyin — konuşalım.",
    ctaBtn1: "İletişime Geçin →",
    ctaBtn2: "Puanınız",
  },
};

export default function AboutPage() {
  const locale = useLocale();
  const lang = (ui as any)[locale] ? locale : "en";
  const t = (ui as any)[lang];
  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.1s}
        .fade-up-d2{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.25s}
        .fade-up-d3{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.45s}
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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t.navSubtext}</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t.navHome}</a>
            <a href="https://www.acf-score.com/" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>{t.navCta}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 50, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", width: 600, height: 600, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(201,168,76,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div className="fade-up"><Badge>{t.heroBadge}</Badge></div>
          <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 46, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 16, letterSpacing: "-1px" }}>
            {t.heroTitle1}<span style={{ color: C.gold }}>{t.heroTitle2}</span>
          </h1>
          <p className="fade-up-d3" style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* TIMELINE / MISSION */}
      <section id="mission" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.timelineLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>{t.timelineTitle1}<span style={{ color: C.gold }}>{t.timelineTitle2}</span>{t.timelineTitle3}</h2>
            <GoldBar />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { year: t.timeline[0].year, event: t.timeline[0].event, color: C.gray },
              { year: t.timeline[1].year, event: t.timeline[1].event, color: C.blue },
              { year: t.timeline[2].year, event: t.timeline[2].event, color: C.green },
              { year: t.timeline[3].year, event: t.timeline[3].event, color: C.gold },
              { year: t.timeline[4].year, event: t.timeline[4].event, color: C.amber },
              { year: t.timeline[5].year, event: t.timeline[5].event, color: C.gold },
            ].map((tl: any, i: number) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 90, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: tl.color, paddingTop: 14, textAlign: "right" }}>{tl.year}</div>
                <div style={{ width: 12, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 14, flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: tl.color, border: `2px solid ${C.navy1}`, flexShrink: 0 }} />
                  {i < 5 && <div style={{ width: 1, flex: 1, background: C.bd1, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, padding: "10px 16px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 10, fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>{tl.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="vincent" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 56, alignItems: "start" }}>
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: 32, textAlign: "center", position: "sticky", top: 100 }}>
            <div style={{ width: 140, height: 140, borderRadius: "50%", background: C.goldDim, border: `3px solid ${C.goldBorder}`, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 48, fontWeight: 800, color: C.gold }}>VD</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Vincent DORANGE</h2>
            <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5, marginBottom: 4 }}>{t.founderSubtitle}</p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "1px", marginBottom: 20 }}>AI CONSULTING</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 24 }}>
              {t.founderTags.map((tag: string) => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: C.gold, background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "4px 10px", borderRadius: 100, fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".05em" }}>{tag}</span>
              ))}
            </div>
            <a href="https://www.linkedin.com/in/vincent-dorange" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0077b5", border: "none", padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#fff", transition: "all .3s", width: "100%" }}
              className="gold-glow"
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
          <div>
            <SectionLabel>{t.founderLabel}</SectionLabel>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 24, textAlign: "center" }}>{t.founderTitle1}<span style={{ color: C.gold }}>{t.founderTitle2}</span></h3>
            <GoldBar />
            <div style={{ fontSize: 15, color: C.gray2, lineHeight: 1.9 }}>
              <p style={{ marginBottom: 20 }}>{t.founderP1}</p>
              <p style={{ marginBottom: 20 }}>{t.founderP2}<strong style={{ color: "#fff" }}>{t.founderP2strong}</strong></p>
              <p style={{ marginBottom: 20 }}>{t.founderP3pre}<strong style={{ color: C.gold }}>{t.founderP3strong}</strong></p>
              <p>{t.founderP4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.educationLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>{t.educationTitle1}<span style={{ color: C.gold }}>{t.educationTitle2}</span></h2>
            <GoldBar />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 32 }}>
            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>{t.educationHeading}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "MIT Sloan School of Management",
                  "Columbia Business School",
                  "Michael Smurfit Graduate School of Business",
                  "Kedge Business School"
                ].map((school: any) => (
                  <div key={school} style={{ padding: "12px 14px", background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 8, fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>{school}</div>
                ))}
              </div>
            </div>

            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>{t.execEducationHeading}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "HEC Paris",
                  "INSEAD",
                  "École Polytechnique",
                  "CentraleSupélec",
                  "Wharton School",
                  "Oxford Saïd Business School",
                  "Stanford University",
                  "Harvard University"
                ].map((school: any) => (
                  <div key={school} style={{ padding: "10px 12px", background: C.navy2, border: `1px solid ${C.bd1}`, borderRadius: 8, fontSize: 12, color: C.gray2, lineHeight: 1.4 }}>{school}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.membershipLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}><span style={{ color: C.gold }}>{t.membershipTitle}</span></h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              "AI Accelerator Institute",
              "Responsible Artificial Intelligence Institute",
              "Project Management Institute",
              "Harvard Leaders Excellence"
            ].map((affiliation: any) => (
              <div key={affiliation} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, padding: "18px 14px", textAlign: "center", fontSize: 12, color: C.gray2, lineHeight: 1.5, transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; }}>
                {affiliation}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CONSULTING */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.companyLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 8 }}>AI <span style={{ color: C.gold }}>CONSULTING</span></h2>
            <GoldBar />
          </div>
          
          <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 40, marginBottom: 32 }}>
            <div style={{ fontSize: 15, color: C.gray2, lineHeight: 1.9, textAlign: "center" }}>
              <p style={{ marginBottom: 20 }}>{t.companyP1}<strong style={{ color: "#fff" }}>{t.companyP1strong}</strong>.</p>
              <p style={{ marginBottom: 20 }}>{t.companyP2pre}<strong style={{ color: C.gold }}>{t.companyP2strong}</strong>.</p>
              <p>{t.companyP3pre}<strong style={{ color: C.gold }}>{t.companyP3strong}</strong>.</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: t.values[0].icon, title: t.values[0].title, desc: t.values[0].desc, color: C.gold },
              { icon: t.values[1].icon, title: t.values[1].title, desc: t.values[1].desc, color: C.green },
              { icon: t.values[2].icon, title: t.values[2].title, desc: t.values[2].desc, color: C.blue },
            ].map((v: any) => (
              <div key={v.title} style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28, transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${v.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-.5px", marginBottom: 12 }}>{t.ctaTitle1}<span style={{ color: C.gold }}>{t.ctaTitle2}</span></h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.7 }}>{t.ctaDesc}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href={`/${locale}/contact`} className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "inline-block", transition: "all .3s" }}>{t.ctaBtn1}</a>
            <a href="https://www.acf-score.com/" style={{ background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`, padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, display: "inline-block", transition: "all .3s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>{t.ctaBtn2}</a>
          </div>
        </div>
      </section>

      <Footer />
      <AIAgent />
    </div>
  );
}
