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
    navCta: "Calculer mon Score →",
    // Hero
    heroTag: "OUTIL DE DIAGNOSTIC — GRATUIT",
    heroLine1: "Mesurez votre",
    heroLine2: "score de souveraineté",
    heroDesc: "Êtes-vous prêt pour l'ère des agents IA autonomes ? Évaluez la robustesse de votre gouvernance agentique en 10 minutes. Obtenez votre ACF Score® sur 6 axes de gouvernance avec des recommandations personnalisées.",
    heroCta: "Calculer mon Score — Gratuit →",
    heroHow: "Comment ça marche",
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
    axesSectionLabel: "// Cadre de mesure",
    axesSectionTitle: "6 axes de gouvernance",
    axesSectionDesc: "Votre score de souveraineté est calculé sur 6 dimensions critiques de gouvernance agentique. Chaque axe révèle une vulnérabilité ou une force spécifique de votre cadre actuel.",
    axis1Title: "Autonomie décisionnelle",
    axis1Desc: "Mesure le degré d'indépendance décisionnelle de vos agents IA — et si ces décisions restent dans les limites définies.",
    axis2Title: "Contrôle & supervision",
    axis2Desc: "Évalue votre capacité à surveiller, intervenir et arrêter les opérations autonomes des agents à tout moment via vos protocoles de kill switch.",
    axis3Title: "Résilience",
    axis3Desc: "Évalue la capacité de votre organisation à maintenir ses opérations et à se rétablir rapidement lorsque les systèmes agentiques échouent ou agissent de manière inattendue.",
    axis4Title: "Dépendance aux plateformes",
    axis4Desc: "Quantifie votre exposition aux plateformes IA tierces (Amazon, Google, OpenAI) et le risque si un fournisseur unique devient indisponible.",
    axis5Title: "Conformité réglementaire",
    axis5Desc: "Mesure l'alignement avec l'AI Act de l'UE, le RGPD et les réglementations sectorielles régissant l'utilisation des systèmes autonomes en environnements commerciaux.",
    axis6Title: "Contrôles techniques",
    axis6Desc: "Évalue l'infrastructure technique : traçabilité, journaux d'audit, sandboxing, mécanismes de réversibilité et contrôle d'accès de vos systèmes IA.",
    // How it works
    howSectionLabel: "// Processus",
    howSectionTitle: "7 étapes vers votre score",
    howSectionDesc: "Un diagnostic structuré en 10 minutes. Aucune inscription requise. Obtenez vos résultats complets immédiatement.",
    step1Title: "Contexte entreprise",
    step1Desc: "Secteur, taille de l'entreprise, utilisation actuelle des agents IA et périmètre de déploiement.",
    step1Tag: "FONDATION",
    step2Title: "Niveau de maturité",
    step2Desc: "Comment vos agents fonctionnent actuellement — de l'assistance à l'autonomie complète.",
    step2Tag: "ÉVALUATION",
    step3Title: "4 couches ACF",
    step3Desc: "Gouvernance, politique décisionnelle, système d'agents et supervision de l'exécution.",
    step3Tag: "FRAMEWORK",
    step4Title: "Dépendances",
    step4Desc: "Cartographie des fournisseurs critiques, exposition aux risques des plateformes et points de défaillance uniques.",
    step4Tag: "CARTE DES RISQUES",
    step5Title: "Mécanismes de contrôle",
    step5Desc: "Disponibilité du kill switch, qualité de la piste d'audit et protocoles d'escalade humaine.",
    step5Tag: "CONTRÔLES",
    step6Title: "Vérification de conformité",
    step6Desc: "Évaluation de l'alignement avec l'AI Act de l'UE, le RGPD et les réglementations sectorielles.",
    step6Tag: "CONFORMITÉ",
    step7Title: "Votre score & rapport",
    step7Desc: "Score de souveraineté immédiat, analyse par axe et vos 3 actions prioritaires.",
    step7Tag: "RÉSULTATS",
    stepReadyTitle: "Prêt ?",
    stepReadyDesc: "10 minutes. Gratuit. Sans inscription. Résultats immédiats.",
    stepReadyCta: "Commencer →",
    // Deliverables
    delSectionLabel: "// Ce que vous obtenez",
    delSectionTitle: "Votre rapport de gouvernance complet",
    delSectionDesc: "Un rapport de diagnostic complet — actionnable, spécifique à votre organisation, téléchargeable en PDF.",
    del1Title: "Score de souveraineté",
    del1Desc: "Votre score composite mesurant l'indépendance décisionnelle sur les 6 axes de gouvernance. Comparé aux standards de l'industrie.",
    del2Title: "Score ACF® global",
    del2Desc: "Évaluation complète de vos 4 couches de gouvernance opérationnelle avec scores individuels et analyse des écarts pour chaque dimension.",
    del3Title: "3 actions prioritaires",
    del3Desc: "Un plan d'action personnalisé et priorisé pour sécuriser votre transition et atteindre la conformité de gouvernance ACF Niveau 2.",
    // Risks
    riskSectionLabel: "// Pourquoi c'est important",
    riskSectionTitle: "Sans gouvernance agentique, vous risquez :",
    risk1Title: "Des décisions IA contre vos intérêts commerciaux",
    risk1Desc: "Des agents optimisant des métriques locales sans vision commerciale globale — détruisant silencieusement de la valeur.",
    risk2Title: "Perte de contrôle stratégique",
    risk2Desc: "Incapacité à piloter, auditer ou corriger vos systèmes IA en temps réel lorsque les décisions tournent mal.",
    risk3Title: "Dépendance critique aux plateformes",
    risk3Desc: "Une panne d'Amazon, Google ou OpenAI arrête toute votre opération. Aucun plan de repli, aucune résilience.",
    risk4Title: "Responsabilité juridique sur les décisions automatisées",
    risk4Desc: "Vous restez juridiquement responsable de chaque décision prise par vos agents — même celles que vous ne pouvez pas expliquer.",
    risk5Title: "Érosion des marges par une tarification non contrôlée",
    risk5Desc: "Des agents fixant prix et promotions sans limites peuvent détruire la rentabilité en quelques heures.",
    risk6Title: "Aucune piste d'audit",
    risk6Desc: "Sans traçabilité, vous ne pouvez ni comprendre, ni expliquer, ni corriger ce que vos agents IA ont fait.",
    // CTA
    ctaFreeTag: "✓ 100% GRATUIT · SANS INSCRIPTION · RÉSULTATS IMMÉDIATS",
    ctaTitle1: "Calculez votre",
    ctaTitle2: "score de souveraineté",
    ctaTitle3: "maintenant",
    ctaDesc: "10 minutes. Un diagnostic complet de votre gouvernance agentique. Comprenez où vous en êtes avant qu'une défaillance ne vous force à le découvrir.",
    ctaPrimary: "Lancer le diagnostic — Gratuit →",
    ctaSecondary: "Demander une évaluation personnalisée",
    // Footer
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Standard mondial de gouvernance IA",
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
    footerPartnerPortal: "Portail partenaire",
    footerAbout: "À propos",
    footerContact: "Contact",
    footerLegal: "Légal",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tous droits réservés.",
  },
  es: {
    navSubtext: "HERRAMIENTA DE DIAGNÓSTICO — GRATUITA",
    navHome: "← Inicio",
    navCta: "Calcular mi Puntuación →",
    heroTag: "HERRAMIENTA DE DIAGNÓSTICO — GRATUITA",
    heroLine1: "Mida su",
    heroLine2: "Puntuación de Soberanía",
    heroDesc: "¿Está preparado para la era de los agentes de IA autónomos? Evalúe la robustez de su gobernanza agéntica en 10 minutos. Obtenga su ACF Score® en 6 ejes de gobernanza con recomendaciones personalizadas.",
    heroCta: "Calcular mi Puntuación — Gratis →",
    heroHow: "Cómo funciona",
    badge1: "7 pasos guiados",
    badge2: "Informe PDF completo",
    badge3: "Sin registro necesario",
    badge4: "Resultado en 10 minutos",
    dialLabel: "PUNTUACIÓN DE SOBERANÍA",
    stat1: "de las empresas usan agentes de IA sin gobernanza formal",
    stat2: "pérdidas promedio por decisiones de IA no controladas",
    stat3: "de los ejecutivos temen la pérdida de control estratégico",
    axesSectionLabel: "// Marco de medición",
    axesSectionTitle: "6 ejes de gobernanza",
    axesSectionDesc: "Su Puntuación de Soberanía se calcula en 6 dimensiones críticas de gobernanza agéntica. Cada eje revela una vulnerabilidad o fortaleza específica en su marco actual.",
    axis1Title: "Autonomía decisional",
    axis1Desc: "Mide el grado en que sus agentes de IA toman decisiones de forma independiente — y si esas decisiones permanecen dentro de los límites definidos.",
    axis2Title: "Control y supervisión",
    axis2Desc: "Evalúa su capacidad para monitorear, intervenir y detener las operaciones autónomas de los agentes en cualquier momento mediante sus protocolos de kill switch.",
    axis3Title: "Resiliencia",
    axis3Desc: "Evalúa la capacidad de su organización para mantener operaciones y recuperarse rápidamente cuando los sistemas agénticos fallan o actúan de forma inesperada.",
    axis4Title: "Dependencia de plataformas",
    axis4Desc: "Cuantifica su exposición a plataformas de IA de terceros (Amazon, Google, OpenAI) y el riesgo si un proveedor único deja de estar disponible.",
    axis5Title: "Cumplimiento normativo",
    axis5Desc: "Mide la alineación con la Ley de IA de la UE, el RGPD y las regulaciones sectoriales que rigen el uso de sistemas autónomos en entornos comerciales.",
    axis6Title: "Controles técnicos",
    axis6Desc: "Evalúa la infraestructura técnica: trazabilidad, registros de auditoría, sandboxing, mecanismos de reversibilidad y control de acceso de sus sistemas de IA.",
    howSectionLabel: "// Proceso",
    howSectionTitle: "7 pasos hacia su puntuación",
    howSectionDesc: "Un diagnóstico estructurado en 10 minutos. Sin registro. Obtenga sus resultados completos de inmediato.",
    step1Title: "Contexto empresarial",
    step1Desc: "Sector, tamaño de la empresa, uso actual de agentes de IA y alcance de despliegue.",
    step1Tag: "FUNDAMENTO",
    step2Title: "Nivel de madurez",
    step2Desc: "Cómo operan actualmente sus agentes — desde asistidos hasta completamente autónomos.",
    step2Tag: "EVALUACIÓN",
    step3Title: "4 capas ACF",
    step3Desc: "Gobernanza, política de decisiones, sistema de agentes y supervisión de ejecución.",
    step3Tag: "FRAMEWORK",
    step4Title: "Dependencias",
    step4Desc: "Mapeo de proveedores críticos, exposición a riesgos de plataformas y puntos únicos de fallo.",
    step4Tag: "MAPA DE RIESGOS",
    step5Title: "Mecanismos de control",
    step5Desc: "Preparación del kill switch, calidad de la pista de auditoría y protocolos de escalamiento humano.",
    step5Tag: "CONTROLES",
    step6Title: "Verificación de cumplimiento",
    step6Desc: "Evaluación de alineación con la Ley de IA de la UE, el RGPD y regulaciones sectoriales.",
    step6Tag: "CUMPLIMIENTO",
    step7Title: "Su puntuación e informe",
    step7Desc: "Puntuación de Soberanía inmediata, desglose por ejes y sus 3 acciones prioritarias.",
    step7Tag: "RESULTADOS",
    stepReadyTitle: "¿Listo?",
    stepReadyDesc: "10 minutos. Gratis. Sin registro. Resultados inmediatos.",
    stepReadyCta: "Comenzar ahora →",
    delSectionLabel: "// Lo que obtiene",
    delSectionTitle: "Su informe completo de gobernanza",
    delSectionDesc: "Un informe de diagnóstico completo — accionable, específico para su organización, descargable en PDF.",
    del1Title: "Puntuación de Soberanía",
    del1Desc: "Su puntuación compuesta que mide la independencia decisional en los 6 ejes de gobernanza. Comparada con los estándares de la industria.",
    del2Title: "Puntuación ACF® global",
    del2Desc: "Evaluación completa de sus 4 capas de gobernanza operativa con puntuaciones individuales y análisis de brechas para cada dimensión.",
    del3Title: "3 acciones prioritarias",
    del3Desc: "Un plan de acción personalizado y priorizado para asegurar su transición y alcanzar la conformidad de gobernanza ACF Nivel 2.",
    riskSectionLabel: "// Por qué importa",
    riskSectionTitle: "Sin gobernanza agéntica, usted se arriesga a:",
    risk1Title: "Decisiones de IA contra sus intereses comerciales",
    risk1Desc: "Agentes optimizando métricas locales sin visión empresarial global — destruyendo valor silenciosamente.",
    risk2Title: "Pérdida de control estratégico",
    risk2Desc: "Incapacidad para dirigir, auditar o corregir sus sistemas de IA en tiempo real cuando las decisiones van mal.",
    risk3Title: "Dependencia crítica de plataformas",
    risk3Desc: "Una caída de Amazon, Google u OpenAI detiene toda su operación. Sin respaldo, sin resiliencia.",
    risk4Title: "Responsabilidad legal por decisiones automatizadas",
    risk4Desc: "Usted sigue siendo legalmente responsable de cada decisión que toman sus agentes — incluso las que no puede explicar.",
    risk5Title: "Erosión de márgenes por precios no controlados",
    risk5Desc: "Agentes fijando precios y promociones sin límites pueden destruir la rentabilidad en horas.",
    risk6Title: "Sin pista de auditoría",
    risk6Desc: "Sin trazabilidad, no puede comprender, explicar ni corregir lo que sus agentes de IA han hecho.",
    ctaFreeTag: "✓ 100% GRATIS · SIN REGISTRO · RESULTADOS INMEDIATOS",
    ctaTitle1: "Calcule su",
    ctaTitle2: "Puntuación de Soberanía",
    ctaTitle3: "ahora",
    ctaDesc: "10 minutos. Un diagnóstico completo de su gobernanza agéntica. Comprenda dónde se encuentra antes de que un fallo le obligue a descubrirlo.",
    ctaPrimary: "Iniciar el diagnóstico — Gratis →",
    ctaSecondary: "Solicitar una evaluación personalizada",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Estándar global de gobernanza de IA",
    footerDesc: "El estándar de gobernanza para organizaciones que despliegan agentes de IA autónomos.",
    footerFramework: "Framework",
    footerTheStandard: "El Estándar",
    footerBlog: "Blog",
    footerCertification: "ACF Certification",
    footerProducts: "Productos",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Organización",
    footerPartnerPortal: "Portal de socios",
    footerAbout: "Acerca de",
    footerContact: "Contacto",
    footerLegal: "Legal",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Todos los derechos reservados.",
  },
  de: {
    navSubtext: "DIAGNOSEWERKZEUG — KOSTENLOS",
    navHome: "← Startseite",
    navCta: "Meinen Score berechnen →",
    heroTag: "DIAGNOSEWERKZEUG — KOSTENLOS",
    heroLine1: "Messen Sie Ihren",
    heroLine2: "Souveränitäts-Score",
    heroDesc: "Sind Sie bereit für die Ära autonomer KI-Agenten? Bewerten Sie die Robustheit Ihrer agentischen Governance in 10 Minuten. Erhalten Sie Ihren ACF Score® über 6 Governance-Achsen mit personalisierten Empfehlungen.",
    heroCta: "Meinen Score berechnen — Kostenlos →",
    heroHow: "So funktioniert es",
    badge1: "7 geführte Schritte",
    badge2: "Vollständiger PDF-Bericht",
    badge3: "Keine Anmeldung erforderlich",
    badge4: "Ergebnis in 10 Minuten",
    dialLabel: "SOUVERÄNITÄTS-SCORE",
    stat1: "der Unternehmen nutzen KI-Agenten ohne formale Governance",
    stat2: "durchschnittliche Verluste durch unkontrollierte KI-Entscheidungen",
    stat3: "der Führungskräfte fürchten den strategischen Kontrollverlust",
    axesSectionLabel: "// Messrahmen",
    axesSectionTitle: "6 Governance-Achsen",
    axesSectionDesc: "Ihr Souveränitäts-Score wird über 6 kritische Dimensionen agentischer Governance berechnet. Jede Achse deckt eine spezifische Schwachstelle oder Stärke in Ihrem aktuellen Rahmenwerk auf.",
    axis1Title: "Entscheidungsautonomie",
    axis1Desc: "Misst den Grad, in dem Ihre KI-Agenten eigenständig Entscheidungen treffen — und ob diese Entscheidungen innerhalb definierter Grenzen bleiben.",
    axis2Title: "Kontrolle & Überwachung",
    axis2Desc: "Bewertet Ihre Fähigkeit, autonome Agentenoperationen jederzeit zu überwachen, einzugreifen und zu stoppen — durch Ihre Kill-Switch-Protokolle.",
    axis3Title: "Resilienz",
    axis3Desc: "Bewertet die Fähigkeit Ihrer Organisation, den Betrieb aufrechtzuerhalten und sich schnell zu erholen, wenn agentische Systeme ausfallen oder unerwartet handeln.",
    axis4Title: "Plattformabhängigkeit",
    axis4Desc: "Quantifiziert Ihre Abhängigkeit von KI-Plattformen Dritter (Amazon, Google, OpenAI) und das Risiko, wenn ein einzelner Anbieter ausfällt.",
    axis5Title: "Regulatorische Konformität",
    axis5Desc: "Misst die Übereinstimmung mit dem EU AI Act, der DSGVO und branchenspezifischen Vorschriften für den Einsatz autonomer Systeme in kommerziellen Umgebungen.",
    axis6Title: "Technische Kontrollen",
    axis6Desc: "Bewertet die technische Infrastruktur: Rückverfolgbarkeit, Audit-Protokolle, Sandboxing, Reversibilitätsmechanismen und Zugangskontrolle Ihrer KI-Systeme.",
    howSectionLabel: "// Prozess",
    howSectionTitle: "7 Schritte zu Ihrem Score",
    howSectionDesc: "Eine strukturierte Diagnose in 10 Minuten. Keine Anmeldung erforderlich. Erhalten Sie Ihre vollständigen Ergebnisse sofort.",
    step1Title: "Unternehmenskontext",
    step1Desc: "Branche, Unternehmensgröße, aktuelle KI-Agenten-Nutzung und Einsatzumfang.",
    step1Tag: "GRUNDLAGE",
    step2Title: "Reifegrad",
    step2Desc: "Wie Ihre Agenten derzeit arbeiten — von assistiert bis vollständig autonom.",
    step2Tag: "BEWERTUNG",
    step3Title: "4 ACF-Schichten",
    step3Desc: "Governance, Entscheidungspolitik, Agentensystem und Ausführungsüberwachung.",
    step3Tag: "FRAMEWORK",
    step4Title: "Abhängigkeiten",
    step4Desc: "Kartierung kritischer Lieferanten, Plattformrisikoexposition und einzelne Ausfallpunkte.",
    step4Tag: "RISIKOKARTE",
    step5Title: "Kontrollmechanismen",
    step5Desc: "Kill-Switch-Bereitschaft, Audit-Trail-Qualität und menschliche Eskalationsprotokolle.",
    step5Tag: "KONTROLLEN",
    step6Title: "Konformitätsprüfung",
    step6Desc: "Bewertung der Übereinstimmung mit dem EU AI Act, der DSGVO und branchenspezifischen Vorschriften.",
    step6Tag: "KONFORMITÄT",
    step7Title: "Ihr Score & Bericht",
    step7Desc: "Sofortiger Souveränitäts-Score, Achsenaufschlüsselung und Ihre 3 prioritären Maßnahmen.",
    step7Tag: "ERGEBNISSE",
    stepReadyTitle: "Bereit?",
    stepReadyDesc: "10 Minuten. Kostenlos. Ohne Anmeldung. Sofortige Ergebnisse.",
    stepReadyCta: "Jetzt starten →",
    delSectionLabel: "// Was Sie erhalten",
    delSectionTitle: "Ihr vollständiger Governance-Bericht",
    delSectionDesc: "Ein vollständiger Diagnosebericht — umsetzbar, spezifisch für Ihre Organisation, als PDF herunterladbar.",
    del1Title: "Souveränitäts-Score",
    del1Desc: "Ihr zusammengesetzter Score, der die Entscheidungsunabhängigkeit über alle 6 Governance-Achsen misst. Verglichen mit Branchenstandards.",
    del2Title: "Globaler ACF® Score",
    del2Desc: "Vollständige Bewertung Ihrer 4 operativen Governance-Schichten mit Einzelwertungen und Lückenanalyse für jede Dimension.",
    del3Title: "3 prioritäre Maßnahmen",
    del3Desc: "Ein personalisierter, priorisierter Aktionsplan zur Sicherung Ihres Übergangs und Erreichung der ACF Level 2 Governance-Konformität.",
    riskSectionLabel: "// Warum es wichtig ist",
    riskSectionTitle: "Ohne agentische Governance riskieren Sie:",
    risk1Title: "KI-Entscheidungen gegen Ihre Geschäftsinteressen",
    risk1Desc: "Agenten, die lokale Metriken optimieren, ohne globale Geschäftsvision — und dabei stillschweigend Wert vernichten.",
    risk2Title: "Verlust der strategischen Kontrolle",
    risk2Desc: "Unfähigkeit, Ihre KI-Systeme in Echtzeit zu steuern, zu prüfen oder zu korrigieren, wenn Entscheidungen schief gehen.",
    risk3Title: "Kritische Plattformabhängigkeit",
    risk3Desc: "Ein Ausfall von Amazon, Google oder OpenAI stoppt Ihren gesamten Betrieb. Kein Ausweichplan, keine Resilienz.",
    risk4Title: "Rechtliche Haftung für automatisierte Entscheidungen",
    risk4Desc: "Sie bleiben rechtlich verantwortlich für jede Entscheidung Ihrer Agenten — auch für solche, die Sie nicht erklären können.",
    risk5Title: "Margenerosion durch unkontrollierte Preisgestaltung",
    risk5Desc: "Agenten, die Preise und Aktionen ohne Grenzen festlegen, können die Rentabilität in Stunden zerstören.",
    risk6Title: "Kein Audit-Trail",
    risk6Desc: "Ohne Rückverfolgbarkeit können Sie nicht verstehen, erklären oder korrigieren, was Ihre KI-Agenten getan haben.",
    ctaFreeTag: "✓ 100% KOSTENLOS · OHNE ANMELDUNG · SOFORTIGE ERGEBNISSE",
    ctaTitle1: "Berechnen Sie Ihren",
    ctaTitle2: "Souveränitäts-Score",
    ctaTitle3: "jetzt",
    ctaDesc: "10 Minuten. Eine vollständige Diagnose Ihrer agentischen Governance. Verstehen Sie, wo Sie stehen, bevor ein Ausfall Sie zwingt, es herauszufinden.",
    ctaPrimary: "Diagnose starten — Kostenlos →",
    ctaSecondary: "Individuelle Bewertung anfordern",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Globaler Standard für KI-Governance",
    footerDesc: "Der Governance-Standard für Organisationen, die autonome KI-Agenten einsetzen.",
    footerFramework: "Framework",
    footerTheStandard: "Der Standard",
    footerBlog: "Blog",
    footerCertification: "ACF Certification",
    footerProducts: "Produkte",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Organisation",
    footerPartnerPortal: "Partnerportal",
    footerAbout: "Über uns",
    footerContact: "Kontakt",
    footerLegal: "Rechtliches",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Alle Rechte vorbehalten.",
  },
  pt: {
    navSubtext: "FERRAMENTA DE DIAGNÓSTICO — GRATUITA",
    navHome: "← Início",
    navCta: "Calcular minha Pontuação →",
    heroTag: "FERRAMENTA DE DIAGNÓSTICO — GRATUITA",
    heroLine1: "Meça sua",
    heroLine2: "Pontuação de Soberania",
    heroDesc: "Você está preparado para a era dos agentes de IA autônomos? Avalie a robustez da sua governança agêntica em 10 minutos. Obtenha seu ACF Score® em 6 eixos de governança com recomendações personalizadas.",
    heroCta: "Calcular minha Pontuação — Grátis →",
    heroHow: "Como funciona",
    badge1: "7 etapas guiadas",
    badge2: "Relatório PDF completo",
    badge3: "Sem cadastro necessário",
    badge4: "Resultado em 10 minutos",
    dialLabel: "PONTUAÇÃO DE SOBERANIA",
    stat1: "das empresas usam agentes de IA sem governança formal",
    stat2: "perdas médias por decisões de IA não controladas",
    stat3: "dos executivos temem a perda de controle estratégico",
    axesSectionLabel: "// Estrutura de medição",
    axesSectionTitle: "6 eixos de governança",
    axesSectionDesc: "Sua Pontuação de Soberania é calculada em 6 dimensões críticas de governança agêntica. Cada eixo revela uma vulnerabilidade ou força específica no seu framework atual.",
    axis1Title: "Autonomia decisional",
    axis1Desc: "Mede o grau em que seus agentes de IA tomam decisões de forma independente — e se essas decisões permanecem dentro dos limites definidos.",
    axis2Title: "Controle e supervisão",
    axis2Desc: "Avalia sua capacidade de monitorar, intervir e interromper operações autônomas dos agentes a qualquer momento através dos seus protocolos de kill switch.",
    axis3Title: "Resiliência",
    axis3Desc: "Avalia a capacidade da sua organização de manter operações e se recuperar rapidamente quando sistemas agênticos falham ou agem de forma inesperada.",
    axis4Title: "Dependência de plataformas",
    axis4Desc: "Quantifica sua exposição a plataformas de IA de terceiros (Amazon, Google, OpenAI) e o risco se um único provedor ficar indisponível.",
    axis5Title: "Conformidade regulatória",
    axis5Desc: "Mede o alinhamento com a Lei de IA da UE, o RGPD e as regulamentações setoriais que regem o uso de sistemas autônomos em ambientes comerciais.",
    axis6Title: "Controles técnicos",
    axis6Desc: "Avalia a infraestrutura técnica: rastreabilidade, registros de auditoria, sandboxing, mecanismos de reversibilidade e controle de acesso dos seus sistemas de IA.",
    howSectionLabel: "// Processo",
    howSectionTitle: "7 etapas para sua pontuação",
    howSectionDesc: "Um diagnóstico estruturado em 10 minutos. Sem cadastro. Obtenha seus resultados completos imediatamente.",
    step1Title: "Contexto empresarial",
    step1Desc: "Setor, tamanho da empresa, uso atual de agentes de IA e escopo de implantação.",
    step1Tag: "FUNDAMENTO",
    step2Title: "Nível de maturidade",
    step2Desc: "Como seus agentes operam atualmente — de assistidos a totalmente autônomos.",
    step2Tag: "AVALIAÇÃO",
    step3Title: "4 camadas ACF",
    step3Desc: "Governança, política de decisão, sistema de agentes e supervisão de execução.",
    step3Tag: "FRAMEWORK",
    step4Title: "Dependências",
    step4Desc: "Mapeamento de fornecedores críticos, exposição a riscos de plataformas e pontos únicos de falha.",
    step4Tag: "MAPA DE RISCOS",
    step5Title: "Mecanismos de controle",
    step5Desc: "Prontidão do kill switch, qualidade da trilha de auditoria e protocolos de escalamento humano.",
    step5Tag: "CONTROLES",
    step6Title: "Verificação de conformidade",
    step6Desc: "Avaliação de alinhamento com a Lei de IA da UE, o RGPD e regulamentações setoriais.",
    step6Tag: "CONFORMIDADE",
    step7Title: "Sua pontuação e relatório",
    step7Desc: "Pontuação de Soberania imediata, detalhamento por eixos e suas 3 ações prioritárias.",
    step7Tag: "RESULTADOS",
    stepReadyTitle: "Pronto?",
    stepReadyDesc: "10 minutos. Grátis. Sem cadastro. Resultados imediatos.",
    stepReadyCta: "Começar agora →",
    delSectionLabel: "// O que você recebe",
    delSectionTitle: "Seu relatório completo de governança",
    delSectionDesc: "Um relatório de diagnóstico completo — acionável, específico para sua organização, disponível para download em PDF.",
    del1Title: "Pontuação de Soberania",
    del1Desc: "Sua pontuação composta medindo a independência decisional em todos os 6 eixos de governança. Comparada com os padrões da indústria.",
    del2Title: "Pontuação ACF® global",
    del2Desc: "Avaliação completa das suas 4 camadas de governança operacional com pontuações individuais e análise de lacunas para cada dimensão.",
    del3Title: "3 ações prioritárias",
    del3Desc: "Um plano de ação personalizado e priorizado para garantir sua transição e alcançar a conformidade de governança ACF Nível 2.",
    riskSectionLabel: "// Por que é importante",
    riskSectionTitle: "Sem governança agêntica, você arrisca:",
    risk1Title: "Decisões de IA contra seus interesses comerciais",
    risk1Desc: "Agentes otimizando métricas locais sem visão empresarial global — destruindo valor silenciosamente.",
    risk2Title: "Perda de controle estratégico",
    risk2Desc: "Incapacidade de dirigir, auditar ou corrigir seus sistemas de IA em tempo real quando as decisões dão errado.",
    risk3Title: "Dependência crítica de plataformas",
    risk3Desc: "Uma queda da Amazon, Google ou OpenAI interrompe toda a sua operação. Sem plano alternativo, sem resiliência.",
    risk4Title: "Responsabilidade legal por decisões automatizadas",
    risk4Desc: "Você permanece legalmente responsável por cada decisão que seus agentes tomam — inclusive aquelas que não consegue explicar.",
    risk5Title: "Erosão de margens por preços não controlados",
    risk5Desc: "Agentes definindo preços e promoções sem limites podem destruir a lucratividade em horas.",
    risk6Title: "Sem trilha de auditoria",
    risk6Desc: "Sem rastreabilidade, você não pode compreender, explicar nem corrigir o que seus agentes de IA fizeram.",
    ctaFreeTag: "✓ 100% GRÁTIS · SEM CADASTRO · RESULTADOS IMEDIATOS",
    ctaTitle1: "Calcule sua",
    ctaTitle2: "Pontuação de Soberania",
    ctaTitle3: "agora",
    ctaDesc: "10 minutos. Um diagnóstico completo da sua governança agêntica. Entenda onde você está antes que uma falha o force a descobrir.",
    ctaPrimary: "Iniciar o diagnóstico — Grátis →",
    ctaSecondary: "Solicitar uma avaliação personalizada",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Padrão global de governança de IA",
    footerDesc: "O padrão de governança para organizações que implantam agentes de IA autônomos.",
    footerFramework: "Framework",
    footerTheStandard: "O Padrão",
    footerBlog: "Blog",
    footerCertification: "ACF Certification",
    footerProducts: "Produtos",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Organização",
    footerPartnerPortal: "Portal de parceiros",
    footerAbout: "Sobre",
    footerContact: "Contato",
    footerLegal: "Legal",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Todos os direitos reservados.",
  },
  ja: {
    navSubtext: "診断ツール — 無料",
    navHome: "← ホーム",
    navCta: "スコアを計算する →",
    heroTag: "診断ツール — 無料",
    heroLine1: "測定する",
    heroLine2: "ソブリンティスコア",
    heroDesc: "自律型AIエージェントの時代に備えていますか？10分でエージェンティックガバナンスの堅牢性を評価しましょう。6つのガバナンス軸にわたるACF Score®とパーソナライズされた推奨事項を取得できます。",
    heroCta: "スコアを計算する — 無料 →",
    heroHow: "仕組み",
    badge1: "7つのガイド付きステップ",
    badge2: "完全なPDFレポート",
    badge3: "登録不要",
    badge4: "10分で結果",
    dialLabel: "ソブリンティスコア",
    stat1: "の企業が正式なガバナンスなしにAIエージェントを使用",
    stat2: "制御されていないAI決定による平均損失",
    stat3: "の経営者が戦略的統制力の喪失を懸念",
    axesSectionLabel: "// 測定フレームワーク",
    axesSectionTitle: "6つのガバナンス軸",
    axesSectionDesc: "ソブリンティスコアはエージェンティックガバナンスの6つの重要な次元にわたって算出されます。各軸は、現在のフレームワークにおける特定の脆弱性または強みを明らかにします。",
    axis1Title: "意思決定の自律性",
    axis1Desc: "AIエージェントが独立して意思決定を行う度合い、およびそれらの決定が定義された境界内に留まっているかを測定します。",
    axis2Title: "制御と監督",
    axis2Desc: "キルスイッチプロトコルを通じて、自律エージェントの運用をいつでも監視、介入、停止する能力を評価します。",
    axis3Title: "レジリエンス",
    axis3Desc: "エージェンティックシステムが故障したり予期しない動作をした場合に、運用を維持し迅速に回復する組織の能力を評価します。",
    axis4Title: "プラットフォーム依存度",
    axis4Desc: "サードパーティAIプラットフォーム（Amazon、Google、OpenAI）への露出度と、単一プロバイダーが利用不能になった場合のリスクを定量化します。",
    axis5Title: "規制遵守",
    axis5Desc: "EU AI法、GDPR、および商業環境における自律システムの使用を規制する業界固有の規制との整合性を測定します。",
    axis6Title: "技術的制御",
    axis6Desc: "技術インフラストラクチャを評価します：追跡可能性、監査ログ、サンドボックス化、可逆性メカニズム、AIシステムのアクセス制御。",
    howSectionLabel: "// プロセス",
    howSectionTitle: "スコアまでの7ステップ",
    howSectionDesc: "10分間の構造化された診断。登録不要。結果を即座に取得できます。",
    step1Title: "企業コンテキスト",
    step1Desc: "業種、企業規模、現在のAIエージェント使用状況と展開範囲。",
    step1Tag: "基盤",
    step2Title: "成熟度レベル",
    step2Desc: "現在のエージェントの運用方法 — アシスト型から完全自律型まで。",
    step2Tag: "評価",
    step3Title: "4つのACFレイヤー",
    step3Desc: "ガバナンス、意思決定ポリシー、エージェントシステム、実行監督の各レイヤー。",
    step3Tag: "FRAMEWORK",
    step4Title: "依存関係",
    step4Desc: "重要サプライヤーのマッピング、プラットフォームリスクの露出度、単一障害点。",
    step4Tag: "リスクマップ",
    step5Title: "制御メカニズム",
    step5Desc: "キルスイッチの準備状況、監査証跡の品質、人間エスカレーションプロトコル。",
    step5Tag: "制御",
    step6Title: "コンプライアンスチェック",
    step6Desc: "EU AI法、GDPR、業界固有の規制との整合性評価。",
    step6Tag: "コンプライアンス",
    step7Title: "スコアとレポート",
    step7Desc: "即時のソブリンティスコア、軸ごとの内訳、3つの優先アクション。",
    step7Tag: "結果",
    stepReadyTitle: "準備はできましたか？",
    stepReadyDesc: "10分。無料。登録不要。即時結果。",
    stepReadyCta: "今すぐ開始 →",
    delSectionLabel: "// 取得できるもの",
    delSectionTitle: "完全なガバナンスレポート",
    delSectionDesc: "完全な診断レポート — 実行可能、組織固有、PDFでダウンロード可能。",
    del1Title: "ソブリンティスコア",
    del1Desc: "6つのガバナンス軸にわたる意思決定の独立性を測定する複合スコア。業界標準とのベンチマーク付き。",
    del2Title: "グローバルACF® スコア",
    del2Desc: "4つの運用ガバナンスレイヤーの完全な評価。各次元の個別スコアとギャップ分析付き。",
    del3Title: "3つの優先アクション",
    del3Desc: "移行を確保しACF レベル2ガバナンス準拠を達成するための、パーソナライズされた優先順位付きアクションプラン。",
    riskSectionLabel: "// なぜ重要か",
    riskSectionTitle: "エージェンティックガバナンスがなければ、以下のリスクがあります：",
    risk1Title: "ビジネス利益に反するAI決定",
    risk1Desc: "グローバルなビジネスビジョンなしにローカルメトリクスを最適化するエージェント — 静かに価値を破壊します。",
    risk2Title: "戦略的統制力の喪失",
    risk2Desc: "意思決定が誤った方向に向かった時、AIシステムをリアルタイムで操縦、監査、修正する能力の欠如。",
    risk3Title: "重大なプラットフォーム依存",
    risk3Desc: "Amazon、Google、OpenAIの1つの障害で全ての業務が停止。フォールバックなし、レジリエンスなし。",
    risk4Title: "自動化された決定に対する法的責任",
    risk4Desc: "エージェントが下す全ての決定に対して法的責任を負い続けます — 説明できないものについても。",
    risk5Title: "制御されていない価格設定によるマージン侵食",
    risk5Desc: "制限なく価格やプロモーションを設定するエージェントは、数時間で収益性を破壊する可能性があります。",
    risk6Title: "監査証跡なし",
    risk6Desc: "追跡可能性がなければ、AIエージェントが何をしたかを理解、説明、修正することができません。",
    ctaFreeTag: "✓ 100%無料 · 登録不要 · 即時結果",
    ctaTitle1: "計算する",
    ctaTitle2: "ソブリンティスコア",
    ctaTitle3: "今すぐ",
    ctaDesc: "10分。エージェンティックガバナンスの完全な診断。障害が発見を強いる前に、現状を把握しましょう。",
    ctaPrimary: "診断を開始する — 無料 →",
    ctaSecondary: "カスタム評価を依頼する",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "AIガバナンスのグローバルスタンダード",
    footerDesc: "自律型AIエージェントを展開する組織のためのガバナンススタンダード。",
    footerFramework: "フレームワーク",
    footerTheStandard: "スタンダード",
    footerBlog: "ブログ",
    footerCertification: "ACF Certification",
    footerProducts: "製品",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "組織",
    footerPartnerPortal: "パートナーポータル",
    footerAbout: "概要",
    footerContact: "お問い合わせ",
    footerLegal: "法的情報",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.",
  },
  zh: {
    navSubtext: "诊断工具 — 免费",
    navHome: "← 首页",
    navCta: "计算我的分数 →",
    heroTag: "诊断工具 — 免费",
    heroLine1: "衡量您的",
    heroLine2: "主权分数",
    heroDesc: "您是否已为自主AI代理时代做好准备？用10分钟评估您的代理治理的稳健性。获取涵盖6个治理轴的ACF Score®和个性化建议。",
    heroCta: "计算我的分数 — 免费 →",
    heroHow: "运作方式",
    badge1: "7个引导步骤",
    badge2: "完整PDF报告",
    badge3: "无需注册",
    badge4: "10分钟出结果",
    dialLabel: "主权分数",
    stat1: "的企业在没有正式治理的情况下使用AI代理",
    stat2: "因不受控的AI决策造成的平均损失",
    stat3: "的高管担心失去战略控制权",
    axesSectionLabel: "// 测量框架",
    axesSectionTitle: "6个治理轴",
    axesSectionDesc: "您的主权分数基于代理治理的6个关键维度计算。每个轴揭示您当前框架中的特定漏洞或优势。",
    axis1Title: "决策自主权",
    axis1Desc: "衡量您的AI代理独立做出决策的程度——以及这些决策是否保持在定义的边界内。",
    axis2Title: "控制与监督",
    axis2Desc: "评估您通过终止开关协议随时监控、干预和停止自主代理运营的能力。",
    axis3Title: "韧性",
    axis3Desc: "评估当代理系统故障或出现意外行为时，您的组织维持运营和快速恢复的能力。",
    axis4Title: "平台依赖度",
    axis4Desc: "量化您对第三方AI平台（Amazon、Google、OpenAI）的依赖程度，以及单一提供商不可用时的风险。",
    axis5Title: "监管合规",
    axis5Desc: "衡量与欧盟AI法案、GDPR以及管辖商业环境中自主系统使用的行业特定法规的一致性。",
    axis6Title: "技术控制",
    axis6Desc: "评估技术基础设施：可追溯性、审计日志、沙箱化、可逆性机制以及AI系统的访问控制。",
    howSectionLabel: "// 流程",
    howSectionTitle: "获得分数的7个步骤",
    howSectionDesc: "10分钟的结构化诊断。无需注册。立即获取完整结果。",
    step1Title: "企业背景",
    step1Desc: "行业、企业规模、当前AI代理使用情况和部署范围。",
    step1Tag: "基础",
    step2Title: "成熟度水平",
    step2Desc: "您的代理目前如何运作——从辅助型到完全自主型。",
    step2Tag: "评估",
    step3Title: "4个ACF层级",
    step3Desc: "治理、决策策略、代理系统和执行监督层级。",
    step3Tag: "FRAMEWORK",
    step4Title: "依赖关系",
    step4Desc: "关键供应商映射、平台风险暴露和单点故障。",
    step4Tag: "风险图",
    step5Title: "控制机制",
    step5Desc: "终止开关准备状态、审计跟踪质量和人工升级协议。",
    step5Tag: "控制",
    step6Title: "合规检查",
    step6Desc: "欧盟AI法案、GDPR和行业特定监管一致性评估。",
    step6Tag: "合规",
    step7Title: "您的分数与报告",
    step7Desc: "即时主权分数、轴线分解和您的3项优先行动。",
    step7Tag: "结果",
    stepReadyTitle: "准备好了吗？",
    stepReadyDesc: "10分钟。免费。无需注册。即时结果。",
    stepReadyCta: "立即开始 →",
    delSectionLabel: "// 您将获得",
    delSectionTitle: "完整的治理报告",
    delSectionDesc: "完整的诊断报告——可操作、针对您的组织、可下载PDF。",
    del1Title: "主权分数",
    del1Desc: "衡量6个治理轴的决策独立性的综合分数。与行业标准进行基准比较。",
    del2Title: "全球ACF® 分数",
    del2Desc: "对4个运营治理层级的完整评估，包含各维度的单独分数和差距分析。",
    del3Title: "3项优先行动",
    del3Desc: "个性化的优先行动计划，以确保您的转型并达到ACF 2级治理合规。",
    riskSectionLabel: "// 为什么重要",
    riskSectionTitle: "没有代理治理，您将面临以下风险：",
    risk1Title: "AI决策违背您的商业利益",
    risk1Desc: "代理在没有全局商业视野的情况下优化局部指标——悄无声息地摧毁价值。",
    risk2Title: "失去战略控制权",
    risk2Desc: "当决策出错时，无法实时引导、审计或纠正您的AI系统。",
    risk3Title: "关键平台依赖",
    risk3Desc: "Amazon、Google或OpenAI的一次故障将使您的整个运营停滞。没有后备方案，没有韧性。",
    risk4Title: "自动化决策的法律责任",
    risk4Desc: "您对代理做出的每一个决策仍承担法律责任——即使是那些您无法解释的决策。",
    risk5Title: "不受控定价导致利润侵蚀",
    risk5Desc: "无限制地设定价格和促销的代理可以在数小时内摧毁盈利能力。",
    risk6Title: "没有审计跟踪",
    risk6Desc: "没有可追溯性，您无法理解、解释或纠正AI代理所做的事情。",
    ctaFreeTag: "✓ 100%免费 · 无需注册 · 即时结果",
    ctaTitle1: "计算您的",
    ctaTitle2: "主权分数",
    ctaTitle3: "立即",
    ctaDesc: "10分钟。对您的代理治理进行完整诊断。在故障迫使您发现之前，了解您的现状。",
    ctaPrimary: "开始诊断 — 免费 →",
    ctaSecondary: "申请定制评估",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "AI治理全球标准",
    footerDesc: "部署自主AI代理的组织的治理标准。",
    footerFramework: "框架",
    footerTheStandard: "标准",
    footerBlog: "博客",
    footerCertification: "ACF Certification",
    footerProducts: "产品",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "组织",
    footerPartnerPortal: "合作伙伴门户",
    footerAbout: "关于",
    footerContact: "联系我们",
    footerLegal: "法律信息",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.",
  },
  ko: {
    navSubtext: "진단 도구 — 무료",
    navHome: "← 홈",
    navCta: "내 점수 계산하기 →",
    heroTag: "진단 도구 — 무료",
    heroLine1: "측정하세요",
    heroLine2: "주권 점수",
    heroDesc: "자율 AI 에이전트 시대에 준비되셨나요? 10분 안에 에이전틱 거버넌스의 견고성을 평가하세요. 6개 거버넌스 축에 걸친 ACF Score®와 맞춤 권장 사항을 받아보세요.",
    heroCta: "내 점수 계산하기 — 무료 →",
    heroHow: "작동 방식",
    badge1: "7단계 가이드",
    badge2: "완전한 PDF 보고서",
    badge3: "가입 불필요",
    badge4: "10분 내 결과",
    dialLabel: "주권 점수",
    stat1: "의 기업이 공식 거버넌스 없이 AI 에이전트를 사용",
    stat2: "통제되지 않은 AI 결정으로 인한 평균 손실",
    stat3: "의 경영진이 전략적 통제력 상실을 우려",
    axesSectionLabel: "// 측정 프레임워크",
    axesSectionTitle: "6개 거버넌스 축",
    axesSectionDesc: "주권 점수는 에이전틱 거버넌스의 6가지 핵심 차원에 걸쳐 산출됩니다. 각 축은 현재 프레임워크의 특정 취약점 또는 강점을 드러냅니다.",
    axis1Title: "의사결정 자율성",
    axis1Desc: "AI 에이전트가 독립적으로 의사결정을 내리는 정도와 그 결정이 정의된 경계 내에 있는지를 측정합니다.",
    axis2Title: "통제 및 감독",
    axis2Desc: "킬 스위치 프로토콜을 통해 자율 에이전트 운영을 언제든지 모니터링, 개입 및 중지할 수 있는 능력을 평가합니다.",
    axis3Title: "회복탄력성",
    axis3Desc: "에이전틱 시스템이 실패하거나 예기치 않게 작동할 때 운영을 유지하고 신속하게 복구하는 조직의 능력을 평가합니다.",
    axis4Title: "플랫폼 의존도",
    axis4Desc: "서드파티 AI 플랫폼(Amazon, Google, OpenAI)에 대한 노출도와 단일 공급자가 이용 불가능할 때의 리스크를 정량화합니다.",
    axis5Title: "규제 준수",
    axis5Desc: "EU AI법, GDPR 및 상업 환경에서의 자율 시스템 사용을 규제하는 업종별 규정과의 정합성을 측정합니다.",
    axis6Title: "기술적 통제",
    axis6Desc: "기술 인프라를 평가합니다: 추적 가능성, 감사 로그, 샌드박싱, 가역성 메커니즘, AI 시스템의 접근 제어.",
    howSectionLabel: "// 프로세스",
    howSectionTitle: "점수까지 7단계",
    howSectionDesc: "10분간의 구조화된 진단. 가입 불필요. 완전한 결과를 즉시 받아보세요.",
    step1Title: "기업 컨텍스트",
    step1Desc: "산업, 기업 규모, 현재 AI 에이전트 사용 현황 및 배포 범위.",
    step1Tag: "기반",
    step2Title: "성숙도 수준",
    step2Desc: "현재 에이전트의 운영 방식 — 보조형부터 완전 자율형까지.",
    step2Tag: "평가",
    step3Title: "4개 ACF 레이어",
    step3Desc: "거버넌스, 의사결정 정책, 에이전트 시스템, 실행 감독 레이어.",
    step3Tag: "FRAMEWORK",
    step4Title: "의존 관계",
    step4Desc: "핵심 공급업체 매핑, 플랫폼 리스크 노출도, 단일 장애점.",
    step4Tag: "리스크 맵",
    step5Title: "통제 메커니즘",
    step5Desc: "킬 스위치 준비 상태, 감사 추적 품질, 인간 에스컬레이션 프로토콜.",
    step5Tag: "통제",
    step6Title: "컴플라이언스 점검",
    step6Desc: "EU AI법, GDPR 및 업종별 규제 정합성 평가.",
    step6Tag: "컴플라이언스",
    step7Title: "점수 및 보고서",
    step7Desc: "즉시 주권 점수, 축별 분석, 3가지 우선 조치.",
    step7Tag: "결과",
    stepReadyTitle: "준비되셨나요?",
    stepReadyDesc: "10분. 무료. 가입 불필요. 즉시 결과.",
    stepReadyCta: "지금 시작하기 →",
    delSectionLabel: "// 받게 되는 것",
    delSectionTitle: "완전한 거버넌스 보고서",
    delSectionDesc: "완전한 진단 보고서 — 실행 가능, 조직 맞춤형, PDF 다운로드 가능.",
    del1Title: "주권 점수",
    del1Desc: "6개 거버넌스 축에 걸친 의사결정 독립성을 측정하는 종합 점수. 업계 표준과 벤치마킹.",
    del2Title: "글로벌 ACF® 점수",
    del2Desc: "4개 운영 거버넌스 레이어의 완전한 평가. 각 차원별 개별 점수 및 갭 분석 포함.",
    del3Title: "3가지 우선 조치",
    del3Desc: "전환을 확보하고 ACF 레벨 2 거버넌스 준수를 달성하기 위한 맞춤형 우선순위 행동 계획.",
    riskSectionLabel: "// 왜 중요한가",
    riskSectionTitle: "에이전틱 거버넌스가 없으면 다음과 같은 리스크에 직면합니다:",
    risk1Title: "비즈니스 이익에 반하는 AI 결정",
    risk1Desc: "글로벌 비즈니스 비전 없이 로컬 지표를 최적화하는 에이전트 — 조용히 가치를 파괴합니다.",
    risk2Title: "전략적 통제력 상실",
    risk2Desc: "결정이 잘못될 때 AI 시스템을 실시간으로 조정, 감사 또는 수정할 수 없는 상황.",
    risk3Title: "치명적 플랫폼 의존",
    risk3Desc: "Amazon, Google 또는 OpenAI의 한 번의 장애로 전체 운영이 중단. 대안 없음, 회복탄력성 없음.",
    risk4Title: "자동화된 결정에 대한 법적 책임",
    risk4Desc: "에이전트가 내리는 모든 결정에 대해 법적 책임을 계속 집니다 — 설명할 수 없는 결정에 대해서도.",
    risk5Title: "통제되지 않은 가격 책정으로 인한 마진 침식",
    risk5Desc: "제한 없이 가격과 프로모션을 설정하는 에이전트는 몇 시간 만에 수익성을 파괴할 수 있습니다.",
    risk6Title: "감사 추적 없음",
    risk6Desc: "추적 가능성이 없으면 AI 에이전트가 무엇을 했는지 이해, 설명 또는 수정할 수 없습니다.",
    ctaFreeTag: "✓ 100% 무료 · 가입 불필요 · 즉시 결과",
    ctaTitle1: "계산하세요",
    ctaTitle2: "주권 점수",
    ctaTitle3: "지금",
    ctaDesc: "10분. 에이전틱 거버넌스에 대한 완전한 진단. 장애가 발견을 강제하기 전에 현재 상태를 파악하세요.",
    ctaPrimary: "진단 시작하기 — 무료 →",
    ctaSecondary: "맞춤 평가 요청",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "AI 거버넌스 글로벌 표준",
    footerDesc: "자율 AI 에이전트를 배포하는 조직을 위한 거버넌스 표준.",
    footerFramework: "프레임워크",
    footerTheStandard: "표준",
    footerBlog: "블로그",
    footerCertification: "ACF Certification",
    footerProducts: "제품",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "조직",
    footerPartnerPortal: "파트너 포털",
    footerAbout: "소개",
    footerContact: "문의",
    footerLegal: "법적 정보",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.",
  },
  it: {
    navSubtext: "STRUMENTO DIAGNOSTICO — GRATUITO",
    navHome: "← Home",
    navCta: "Calcola il mio Punteggio →",
    heroTag: "STRUMENTO DIAGNOSTICO — GRATUITO",
    heroLine1: "Misura la tua",
    heroLine2: "Punteggio di Sovranità",
    heroDesc: "Sei pronto per l'era degli agenti IA autonomi? Valuta la robustezza della tua governance agentica in 10 minuti. Ottieni il tuo ACF Score® su 6 assi di governance con raccomandazioni personalizzate.",
    heroCta: "Calcola il mio Punteggio — Gratis →",
    heroHow: "Come funziona",
    badge1: "7 passaggi guidati",
    badge2: "Report PDF completo",
    badge3: "Nessuna registrazione richiesta",
    badge4: "Risultato in 10 minuti",
    dialLabel: "PUNTEGGIO DI SOVRANITÀ",
    stat1: "delle aziende usa agenti IA senza governance formale",
    stat2: "perdite medie da decisioni IA non controllate",
    stat3: "dei dirigenti teme la perdita di controllo strategico",
    axesSectionLabel: "// Quadro di misurazione",
    axesSectionTitle: "6 assi di governance",
    axesSectionDesc: "Il tuo Punteggio di Sovranità è calcolato su 6 dimensioni critiche della governance agentica. Ogni asse rivela una vulnerabilità o un punto di forza specifico nel tuo framework attuale.",
    axis1Title: "Autonomia decisionale",
    axis1Desc: "Misura il grado in cui i tuoi agenti IA prendono decisioni in modo indipendente — e se tali decisioni restano entro i limiti definiti.",
    axis2Title: "Controllo e supervisione",
    axis2Desc: "Valuta la tua capacità di monitorare, intervenire e arrestare le operazioni autonome degli agenti in qualsiasi momento tramite i protocolli di kill switch.",
    axis3Title: "Resilienza",
    axis3Desc: "Valuta la capacità della tua organizzazione di mantenere le operazioni e recuperare rapidamente quando i sistemi agentici falliscono o agiscono in modo imprevisto.",
    axis4Title: "Dipendenza dalle piattaforme",
    axis4Desc: "Quantifica la tua esposizione a piattaforme IA di terze parti (Amazon, Google, OpenAI) e il rischio se un singolo fornitore diventa indisponibile.",
    axis5Title: "Conformità normativa",
    axis5Desc: "Misura l'allineamento con l'EU AI Act, il GDPR e le normative settoriali che regolano l'uso di sistemi autonomi in ambienti commerciali.",
    axis6Title: "Controlli tecnici",
    axis6Desc: "Valuta l'infrastruttura tecnica: tracciabilità, registri di audit, sandboxing, meccanismi di reversibilità e controllo degli accessi dei tuoi sistemi IA.",
    howSectionLabel: "// Processo",
    howSectionTitle: "7 passaggi verso il tuo punteggio",
    howSectionDesc: "Una diagnosi strutturata in 10 minuti. Nessuna registrazione. Ottieni i tuoi risultati completi immediatamente.",
    step1Title: "Contesto aziendale",
    step1Desc: "Settore, dimensione aziendale, utilizzo attuale degli agenti IA e ambito di distribuzione.",
    step1Tag: "FONDAMENTO",
    step2Title: "Livello di maturità",
    step2Desc: "Come operano attualmente i tuoi agenti — dall'assistenza all'autonomia completa.",
    step2Tag: "VALUTAZIONE",
    step3Title: "4 livelli ACF",
    step3Desc: "Governance, politica decisionale, sistema degli agenti e supervisione dell'esecuzione.",
    step3Tag: "FRAMEWORK",
    step4Title: "Dipendenze",
    step4Desc: "Mappatura dei fornitori critici, esposizione al rischio delle piattaforme e singoli punti di guasto.",
    step4Tag: "MAPPA DEI RISCHI",
    step5Title: "Meccanismi di controllo",
    step5Desc: "Prontezza del kill switch, qualità della traccia di audit e protocolli di escalation umana.",
    step5Tag: "CONTROLLI",
    step6Title: "Verifica di conformità",
    step6Desc: "Valutazione dell'allineamento con l'EU AI Act, il GDPR e le normative settoriali.",
    step6Tag: "CONFORMITÀ",
    step7Title: "Il tuo punteggio e report",
    step7Desc: "Punteggio di Sovranità immediato, analisi per asse e le tue 3 azioni prioritarie.",
    step7Tag: "RISULTATI",
    stepReadyTitle: "Pronto?",
    stepReadyDesc: "10 minuti. Gratuito. Senza registrazione. Risultati immediati.",
    stepReadyCta: "Inizia ora →",
    delSectionLabel: "// Cosa ottieni",
    delSectionTitle: "Il tuo report di governance completo",
    delSectionDesc: "Un report diagnostico completo — attuabile, specifico per la tua organizzazione, scaricabile in PDF.",
    del1Title: "Punteggio di Sovranità",
    del1Desc: "Il tuo punteggio composito che misura l'indipendenza decisionale su tutti i 6 assi di governance. Confrontato con gli standard del settore.",
    del2Title: "Punteggio ACF® globale",
    del2Desc: "Valutazione completa dei tuoi 4 livelli di governance operativa con punteggi individuali e analisi delle lacune per ogni dimensione.",
    del3Title: "3 azioni prioritarie",
    del3Desc: "Un piano d'azione personalizzato e prioritizzato per garantire la tua transizione e raggiungere la conformità di governance ACF Livello 2.",
    riskSectionLabel: "// Perché è importante",
    riskSectionTitle: "Senza governance agentica, rischi:",
    risk1Title: "Decisioni IA contro i tuoi interessi commerciali",
    risk1Desc: "Agenti che ottimizzano metriche locali senza visione aziendale globale — distruggendo silenziosamente valore.",
    risk2Title: "Perdita di controllo strategico",
    risk2Desc: "Incapacità di guidare, verificare o correggere i tuoi sistemi IA in tempo reale quando le decisioni vanno storte.",
    risk3Title: "Dipendenza critica dalle piattaforme",
    risk3Desc: "Un'interruzione di Amazon, Google o OpenAI ferma tutta la tua operatività. Nessun piano alternativo, nessuna resilienza.",
    risk4Title: "Responsabilità legale sulle decisioni automatizzate",
    risk4Desc: "Resti legalmente responsabile per ogni decisione presa dai tuoi agenti — anche quelle che non puoi spiegare.",
    risk5Title: "Erosione dei margini da prezzi non controllati",
    risk5Desc: "Agenti che fissano prezzi e promozioni senza limiti possono distruggere la redditività in poche ore.",
    risk6Title: "Nessuna traccia di audit",
    risk6Desc: "Senza tracciabilità, non puoi capire, spiegare o correggere ciò che i tuoi agenti IA hanno fatto.",
    ctaFreeTag: "✓ 100% GRATUITO · SENZA REGISTRAZIONE · RISULTATI IMMEDIATI",
    ctaTitle1: "Calcola il tuo",
    ctaTitle2: "Punteggio di Sovranità",
    ctaTitle3: "adesso",
    ctaDesc: "10 minuti. Una diagnosi completa della tua governance agentica. Comprendi dove ti trovi prima che un guasto ti costringa a scoprirlo.",
    ctaPrimary: "Avvia la diagnosi — Gratis →",
    ctaSecondary: "Richiedi una valutazione personalizzata",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Standard globale per la governance IA",
    footerDesc: "Lo standard di governance per le organizzazioni che implementano agenti IA autonomi.",
    footerFramework: "Framework",
    footerTheStandard: "Lo Standard",
    footerBlog: "Blog",
    footerCertification: "ACF Certification",
    footerProducts: "Prodotti",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Organizzazione",
    footerPartnerPortal: "Portale partner",
    footerAbout: "Chi siamo",
    footerContact: "Contatti",
    footerLegal: "Note legali",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tutti i diritti riservati.",
  },
  nl: {
    navSubtext: "DIAGNOSETOOL — GRATIS",
    navHome: "← Home",
    navCta: "Bereken mijn Score →",
    heroTag: "DIAGNOSETOOL — GRATIS",
    heroLine1: "Meet uw",
    heroLine2: "Soevereiniteitsscore",
    heroDesc: "Bent u klaar voor het tijdperk van autonome AI-agenten? Evalueer de robuustheid van uw agentisch bestuur in 10 minuten. Ontvang uw ACF Score® over 6 bestuursassen met gepersonaliseerde aanbevelingen.",
    heroCta: "Bereken mijn Score — Gratis →",
    heroHow: "Hoe het werkt",
    badge1: "7 begeleide stappen",
    badge2: "Volledig PDF-rapport",
    badge3: "Geen registratie vereist",
    badge4: "Resultaat in 10 minuten",
    dialLabel: "SOEVEREINITEITSSCORE",
    stat1: "van de bedrijven gebruikt AI-agenten zonder formeel bestuur",
    stat2: "gemiddelde verliezen door ongecontroleerde AI-beslissingen",
    stat3: "van de leidinggevenden vreest strategisch controleverlies",
    axesSectionLabel: "// Meetkader",
    axesSectionTitle: "6 bestuursassen",
    axesSectionDesc: "Uw Soevereiniteitsscore wordt berekend over 6 kritieke dimensies van agentisch bestuur. Elke as onthult een specifieke kwetsbaarheid of sterkte in uw huidige kader.",
    axis1Title: "Beslissingsautonomie",
    axis1Desc: "Meet de mate waarin uw AI-agenten onafhankelijk beslissingen nemen — en of die beslissingen binnen de gedefinieerde grenzen blijven.",
    axis2Title: "Controle & toezicht",
    axis2Desc: "Evalueert uw vermogen om autonome agentoperaties op elk moment te monitoren, in te grijpen en te stoppen via uw kill switch-protocollen.",
    axis3Title: "Veerkracht",
    axis3Desc: "Beoordeelt het vermogen van uw organisatie om operaties te handhaven en snel te herstellen wanneer agentische systemen falen of onverwacht handelen.",
    axis4Title: "Platformafhankelijkheid",
    axis4Desc: "Kwantificeert uw blootstelling aan AI-platforms van derden (Amazon, Google, OpenAI) en het risico als één enkele leverancier onbeschikbaar wordt.",
    axis5Title: "Naleving van regelgeving",
    axis5Desc: "Meet de afstemming met de EU AI Act, de AVG en sectorspecifieke regelgeving voor het gebruik van autonome systemen in commerciële omgevingen.",
    axis6Title: "Technische controles",
    axis6Desc: "Evalueert de technische infrastructuur: traceerbaarheid, auditlogboeken, sandboxing, reversibiliteitsmechanismen en toegangscontrole van uw AI-systemen.",
    howSectionLabel: "// Proces",
    howSectionTitle: "7 stappen naar uw score",
    howSectionDesc: "Een gestructureerde diagnose in 10 minuten. Geen registratie vereist. Ontvang uw volledige resultaten onmiddellijk.",
    step1Title: "Bedrijfscontext",
    step1Desc: "Sector, bedrijfsgrootte, huidig gebruik van AI-agenten en implementatiebereik.",
    step1Tag: "FUNDAMENT",
    step2Title: "Volwassenheidsniveau",
    step2Desc: "Hoe uw agenten momenteel opereren — van geassisteerd tot volledig autonoom.",
    step2Tag: "BEOORDELING",
    step3Title: "4 ACF-lagen",
    step3Desc: "Bestuur, besluitvormingsbeleid, agentsysteem en uitvoeringstoezicht.",
    step3Tag: "FRAMEWORK",
    step4Title: "Afhankelijkheden",
    step4Desc: "Mapping van kritieke leveranciers, platformrisicoblootstelling en single points of failure.",
    step4Tag: "RISICOKAART",
    step5Title: "Controlemechanismen",
    step5Desc: "Kill switch-gereedheid, kwaliteit van het auditspoor en menselijke escalatieprotocollen.",
    step5Tag: "CONTROLES",
    step6Title: "Nalevingscontrole",
    step6Desc: "Beoordeling van afstemming met de EU AI Act, de AVG en sectorspecifieke regelgeving.",
    step6Tag: "NALEVING",
    step7Title: "Uw score & rapport",
    step7Desc: "Onmiddellijke Soevereiniteitsscore, uitsplitsing per as en uw 3 prioritaire acties.",
    step7Tag: "RESULTATEN",
    stepReadyTitle: "Klaar?",
    stepReadyDesc: "10 minuten. Gratis. Zonder registratie. Onmiddellijke resultaten.",
    stepReadyCta: "Nu beginnen →",
    delSectionLabel: "// Wat u krijgt",
    delSectionTitle: "Uw volledige bestuursrapport",
    delSectionDesc: "Een volledig diagnostisch rapport — uitvoerbaar, specifiek voor uw organisatie, downloadbaar als PDF.",
    del1Title: "Soevereiniteitsscore",
    del1Desc: "Uw samengestelde score die de beslissingsautonomie over alle 6 bestuursassen meet. Vergeleken met industriestandaarden.",
    del2Title: "Globale ACF® Score",
    del2Desc: "Volledige evaluatie van uw 4 operationele bestuurslagen met individuele scores en kloofanalyse voor elke dimensie.",
    del3Title: "3 prioritaire acties",
    del3Desc: "Een gepersonaliseerd, geprioriteerd actieplan om uw transitie te waarborgen en ACF Level 2 bestuursconformiteit te bereiken.",
    riskSectionLabel: "// Waarom het belangrijk is",
    riskSectionTitle: "Zonder agentisch bestuur riskeert u:",
    risk1Title: "AI-beslissingen tegen uw zakelijke belangen",
    risk1Desc: "Agenten die lokale statistieken optimaliseren zonder globale bedrijfsvisie — stilzwijgend waarde vernietigen.",
    risk2Title: "Verlies van strategische controle",
    risk2Desc: "Onvermogen om uw AI-systemen in realtime te sturen, te auditen of te corrigeren wanneer beslissingen fout gaan.",
    risk3Title: "Kritieke platformafhankelijkheid",
    risk3Desc: "Eén storing bij Amazon, Google of OpenAI stopt uw gehele operatie. Geen uitwijkmogelijkheid, geen veerkracht.",
    risk4Title: "Juridische aansprakelijkheid voor geautomatiseerde beslissingen",
    risk4Desc: "U blijft juridisch verantwoordelijk voor elke beslissing die uw agenten nemen — zelfs degenen die u niet kunt uitleggen.",
    risk5Title: "Margeverlies door ongecontroleerde prijsstelling",
    risk5Desc: "Agenten die zonder grenzen prijzen en promoties instellen, kunnen de winstgevendheid in uren vernietigen.",
    risk6Title: "Geen auditspoor",
    risk6Desc: "Zonder traceerbaarheid kunt u niet begrijpen, uitleggen of corrigeren wat uw AI-agenten hebben gedaan.",
    ctaFreeTag: "✓ 100% GRATIS · ZONDER REGISTRATIE · ONMIDDELLIJKE RESULTATEN",
    ctaTitle1: "Bereken uw",
    ctaTitle2: "Soevereiniteitsscore",
    ctaTitle3: "nu",
    ctaDesc: "10 minuten. Een volledige diagnose van uw agentisch bestuur. Begrijp waar u staat voordat een storing u dwingt het te ontdekken.",
    ctaPrimary: "Start de diagnose — Gratis →",
    ctaSecondary: "Vraag een maatwerkbeoordeling aan",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Wereldwijde standaard voor AI-bestuur",
    footerDesc: "De bestuursstandaard voor organisaties die autonome AI-agenten inzetten.",
    footerFramework: "Framework",
    footerTheStandard: "De Standaard",
    footerBlog: "Blog",
    footerCertification: "ACF Certification",
    footerProducts: "Producten",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Organisatie",
    footerPartnerPortal: "Partnerportaal",
    footerAbout: "Over ons",
    footerContact: "Contact",
    footerLegal: "Juridisch",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Alle rechten voorbehouden.",
  },
  ru: {
    navSubtext: "ДИАГНОСТИЧЕСКИЙ ИНСТРУМЕНТ — БЕСПЛАТНО",
    navHome: "← Главная",
    navCta: "Рассчитать мой балл →",
    heroTag: "ДИАГНОСТИЧЕСКИЙ ИНСТРУМЕНТ — БЕСПЛАТНО",
    heroLine1: "Измерьте ваш",
    heroLine2: "Балл суверенитета",
    heroDesc: "Готовы ли вы к эре автономных ИИ-агентов? Оцените устойчивость вашего агентного управления за 10 минут. Получите ACF Score® по 6 осям управления с персонализированными рекомендациями.",
    heroCta: "Рассчитать мой балл — Бесплатно →",
    heroHow: "Как это работает",
    badge1: "7 направляемых шагов",
    badge2: "Полный PDF-отчёт",
    badge3: "Регистрация не требуется",
    badge4: "Результат за 10 минут",
    dialLabel: "БАЛЛ СУВЕРЕНИТЕТА",
    stat1: "компаний используют ИИ-агентов без формального управления",
    stat2: "средние потери от неконтролируемых решений ИИ",
    stat3: "руководителей опасаются потери стратегического контроля",
    axesSectionLabel: "// Система измерений",
    axesSectionTitle: "6 осей управления",
    axesSectionDesc: "Ваш Балл суверенитета рассчитывается по 6 критическим измерениям агентного управления. Каждая ось выявляет конкретную уязвимость или сильную сторону вашей текущей системы.",
    axis1Title: "Автономия принятия решений",
    axis1Desc: "Измеряет степень, в которой ваши ИИ-агенты принимают решения самостоятельно — и остаются ли эти решения в рамках установленных границ.",
    axis2Title: "Контроль и надзор",
    axis2Desc: "Оценивает вашу способность отслеживать, вмешиваться и останавливать автономные операции агентов в любой момент через протоколы аварийного отключения.",
    axis3Title: "Устойчивость",
    axis3Desc: "Оценивает способность вашей организации поддерживать операции и быстро восстанавливаться, когда агентные системы выходят из строя или действуют непредвиденно.",
    axis4Title: "Зависимость от платформ",
    axis4Desc: "Количественно оценивает вашу зависимость от сторонних ИИ-платформ (Amazon, Google, OpenAI) и риск, если единственный поставщик станет недоступен.",
    axis5Title: "Соответствие нормативам",
    axis5Desc: "Измеряет соответствие EU AI Act, GDPR и отраслевым нормативам, регулирующим использование автономных систем в коммерческой среде.",
    axis6Title: "Технические средства контроля",
    axis6Desc: "Оценивает техническую инфраструктуру: отслеживаемость, журналы аудита, изолированные среды, механизмы обратимости и контроль доступа к вашим ИИ-системам.",
    howSectionLabel: "// Процесс",
    howSectionTitle: "7 шагов к вашему баллу",
    howSectionDesc: "Структурированная диагностика за 10 минут. Без регистрации. Получите полные результаты немедленно.",
    step1Title: "Контекст компании",
    step1Desc: "Отрасль, размер компании, текущее использование ИИ-агентов и масштаб развёртывания.",
    step1Tag: "ОСНОВА",
    step2Title: "Уровень зрелости",
    step2Desc: "Как ваши агенты работают сейчас — от ассистируемых до полностью автономных.",
    step2Tag: "ОЦЕНКА",
    step3Title: "4 уровня ACF",
    step3Desc: "Управление, политика принятия решений, агентная система и контроль исполнения.",
    step3Tag: "FRAMEWORK",
    step4Title: "Зависимости",
    step4Desc: "Картирование критических поставщиков, оценка рисков платформ и единых точек отказа.",
    step4Tag: "КАРТА РИСКОВ",
    step5Title: "Механизмы контроля",
    step5Desc: "Готовность аварийного отключения, качество аудиторского следа и протоколы эскалации.",
    step5Tag: "КОНТРОЛЬ",
    step6Title: "Проверка соответствия",
    step6Desc: "Оценка соответствия EU AI Act, GDPR и отраслевым нормативам.",
    step6Tag: "СООТВЕТСТВИЕ",
    step7Title: "Ваш балл и отчёт",
    step7Desc: "Мгновенный Балл суверенитета, разбивка по осям и ваши 3 приоритетных действия.",
    step7Tag: "РЕЗУЛЬТАТЫ",
    stepReadyTitle: "Готовы?",
    stepReadyDesc: "10 минут. Бесплатно. Без регистрации. Мгновенные результаты.",
    stepReadyCta: "Начать сейчас →",
    delSectionLabel: "// Что вы получите",
    delSectionTitle: "Ваш полный отчёт об управлении",
    delSectionDesc: "Полный диагностический отчёт — практичный, специфичный для вашей организации, доступный для скачивания в PDF.",
    del1Title: "Балл суверенитета",
    del1Desc: "Ваш составной балл, измеряющий автономность принятия решений по всем 6 осям управления. Сравнение с отраслевыми стандартами.",
    del2Title: "Глобальный ACF® балл",
    del2Desc: "Полная оценка ваших 4 операционных уровней управления с индивидуальными баллами и анализом пробелов по каждому измерению.",
    del3Title: "3 приоритетных действия",
    del3Desc: "Персонализированный приоритетный план действий для обеспечения вашего перехода и достижения соответствия управлению ACF Уровня 2.",
    riskSectionLabel: "// Почему это важно",
    riskSectionTitle: "Без агентного управления вы рискуете:",
    risk1Title: "ИИ-решения против ваших бизнес-интересов",
    risk1Desc: "Агенты, оптимизирующие локальные метрики без глобального бизнес-видения — тихо разрушают ценность.",
    risk2Title: "Потеря стратегического контроля",
    risk2Desc: "Неспособность направлять, проверять или корректировать ваши ИИ-системы в реальном времени, когда решения идут не так.",
    risk3Title: "Критическая зависимость от платформ",
    risk3Desc: "Один сбой Amazon, Google или OpenAI останавливает всю вашу деятельность. Нет резерва, нет устойчивости.",
    risk4Title: "Юридическая ответственность за автоматизированные решения",
    risk4Desc: "Вы несёте юридическую ответственность за каждое решение ваших агентов — даже за те, которые вы не можете объяснить.",
    risk5Title: "Эрозия маржи из-за неконтролируемого ценообразования",
    risk5Desc: "Агенты, устанавливающие цены и акции без ограничений, могут уничтожить рентабельность за считанные часы.",
    risk6Title: "Отсутствие аудиторского следа",
    risk6Desc: "Без отслеживаемости вы не можете понять, объяснить или исправить то, что сделали ваши ИИ-агенты.",
    ctaFreeTag: "✓ 100% БЕСПЛАТНО · БЕЗ РЕГИСТРАЦИИ · МГНОВЕННЫЕ РЕЗУЛЬТАТЫ",
    ctaTitle1: "Рассчитайте ваш",
    ctaTitle2: "Балл суверенитета",
    ctaTitle3: "сейчас",
    ctaDesc: "10 минут. Полная диагностика вашего агентного управления. Поймите, где вы находитесь, прежде чем сбой заставит вас это узнать.",
    ctaPrimary: "Начать диагностику — Бесплатно →",
    ctaSecondary: "Запросить индивидуальную оценку",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Глобальный стандарт управления ИИ",
    footerDesc: "Стандарт управления для организаций, внедряющих автономных ИИ-агентов.",
    footerFramework: "Фреймворк",
    footerTheStandard: "Стандарт",
    footerBlog: "Блог",
    footerCertification: "ACF Certification",
    footerProducts: "Продукты",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Организация",
    footerPartnerPortal: "Партнёрский портал",
    footerAbout: "О нас",
    footerContact: "Контакты",
    footerLegal: "Правовая информация",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Все права защищены.",
  },
  ar: {
    navSubtext: "أداة تشخيص — مجانية",
    navHome: "← الرئيسية",
    navCta: "احسب نقاطي →",
    heroTag: "أداة تشخيص — مجانية",
    heroLine1: "قِس",
    heroLine2: "نقاط السيادة",
    heroDesc: "هل أنت مستعد لعصر وكلاء الذكاء الاصطناعي المستقلين؟ قيّم متانة حوكمتك الوكيلية في 10 دقائق. احصل على ACF Score® عبر 6 محاور حوكمة مع توصيات مخصصة.",
    heroCta: "احسب نقاطي — مجاناً →",
    heroHow: "كيف يعمل",
    badge1: "7 خطوات موجّهة",
    badge2: "تقرير PDF كامل",
    badge3: "بدون تسجيل",
    badge4: "النتيجة في 10 دقائق",
    dialLabel: "نقاط السيادة",
    stat1: "من الشركات تستخدم وكلاء الذكاء الاصطناعي بدون حوكمة رسمية",
    stat2: "متوسط الخسائر من قرارات الذكاء الاصطناعي غير المتحكم بها",
    stat3: "من المديرين التنفيذيين يخشون فقدان السيطرة الاستراتيجية",
    axesSectionLabel: "// إطار القياس",
    axesSectionTitle: "6 محاور حوكمة",
    axesSectionDesc: "يتم حساب نقاط السيادة عبر 6 أبعاد حرجة للحوكمة الوكيلية. كل محور يكشف عن ثغرة أو نقطة قوة محددة في إطارك الحالي.",
    axis1Title: "استقلالية القرار",
    axis1Desc: "يقيس درجة اتخاذ وكلاء الذكاء الاصطناعي للقرارات بشكل مستقل — وما إذا كانت هذه القرارات تبقى ضمن الحدود المحددة.",
    axis2Title: "التحكم والإشراف",
    axis2Desc: "يقيّم قدرتك على مراقبة عمليات الوكلاء المستقلين والتدخل فيها وإيقافها في أي وقت عبر بروتوكولات مفتاح الإيقاف.",
    axis3Title: "المرونة",
    axis3Desc: "يقيّم قدرة مؤسستك على الحفاظ على العمليات والتعافي بسرعة عندما تفشل الأنظمة الوكيلية أو تتصرف بشكل غير متوقع.",
    axis4Title: "الاعتماد على المنصات",
    axis4Desc: "يحدد كمياً مدى تعرضك لمنصات الذكاء الاصطناعي الخارجية (Amazon، Google، OpenAI) والمخاطر إذا أصبح مزود واحد غير متاح.",
    axis5Title: "الامتثال التنظيمي",
    axis5Desc: "يقيس التوافق مع قانون الذكاء الاصطناعي الأوروبي وGDPR واللوائح القطاعية التي تحكم استخدام الأنظمة المستقلة في البيئات التجارية.",
    axis6Title: "الضوابط التقنية",
    axis6Desc: "يقيّم البنية التحتية التقنية: التتبع، سجلات التدقيق، العزل، آليات الإرجاع، والتحكم في الوصول لأنظمة الذكاء الاصطناعي.",
    howSectionLabel: "// العملية",
    howSectionTitle: "7 خطوات نحو نقاطك",
    howSectionDesc: "تشخيص منظم في 10 دقائق. بدون تسجيل. احصل على نتائجك الكاملة فوراً.",
    step1Title: "سياق الشركة",
    step1Desc: "القطاع، حجم الشركة، الاستخدام الحالي لوكلاء الذكاء الاصطناعي ونطاق النشر.",
    step1Tag: "الأساس",
    step2Title: "مستوى النضج",
    step2Desc: "كيف يعمل وكلاؤك حالياً — من المساعدة إلى الاستقلالية الكاملة.",
    step2Tag: "التقييم",
    step3Title: "4 طبقات ACF",
    step3Desc: "الحوكمة، سياسة القرار، نظام الوكلاء، والإشراف على التنفيذ.",
    step3Tag: "FRAMEWORK",
    step4Title: "التبعيات",
    step4Desc: "تخطيط الموردين الحرجين، التعرض لمخاطر المنصات، ونقاط الفشل الوحيدة.",
    step4Tag: "خريطة المخاطر",
    step5Title: "آليات التحكم",
    step5Desc: "جاهزية مفتاح الإيقاف، جودة مسار التدقيق، وبروتوكولات التصعيد البشري.",
    step5Tag: "الضوابط",
    step6Title: "فحص الامتثال",
    step6Desc: "تقييم التوافق مع قانون الذكاء الاصطناعي الأوروبي وGDPR واللوائح القطاعية.",
    step6Tag: "الامتثال",
    step7Title: "نقاطك وتقريرك",
    step7Desc: "نقاط السيادة الفورية، تحليل المحاور، و3 إجراءات ذات أولوية.",
    step7Tag: "النتائج",
    stepReadyTitle: "مستعد؟",
    stepReadyDesc: "10 دقائق. مجاني. بدون تسجيل. نتائج فورية.",
    stepReadyCta: "ابدأ الآن →",
    delSectionLabel: "// ما تحصل عليه",
    delSectionTitle: "تقرير الحوكمة الكامل",
    delSectionDesc: "تقرير تشخيصي كامل — قابل للتنفيذ، مخصص لمؤسستك، قابل للتحميل كـ PDF.",
    del1Title: "نقاط السيادة",
    del1Desc: "نقاطك المركبة التي تقيس استقلالية القرار عبر جميع محاور الحوكمة الستة. مقارنة بمعايير الصناعة.",
    del2Title: "نقاط ACF® الشاملة",
    del2Desc: "تقييم كامل لطبقات الحوكمة التشغيلية الأربع مع نقاط فردية وتحليل الفجوات لكل بُعد.",
    del3Title: "3 إجراءات ذات أولوية",
    del3Desc: "خطة عمل مخصصة ومرتبة حسب الأولوية لتأمين انتقالك وتحقيق الامتثال لحوكمة ACF المستوى 2.",
    riskSectionLabel: "// لماذا هذا مهم",
    riskSectionTitle: "بدون حوكمة وكيلية، أنت تخاطر بـ:",
    risk1Title: "قرارات ذكاء اصطناعي ضد مصالحك التجارية",
    risk1Desc: "وكلاء يحسّنون مقاييس محلية بدون رؤية تجارية شاملة — يدمرون القيمة بصمت.",
    risk2Title: "فقدان السيطرة الاستراتيجية",
    risk2Desc: "عدم القدرة على توجيه أو تدقيق أو تصحيح أنظمة الذكاء الاصطناعي في الوقت الفعلي عندما تسوء القرارات.",
    risk3Title: "اعتماد حرج على المنصات",
    risk3Desc: "عطل واحد في Amazon أو Google أو OpenAI يوقف عملياتك بالكامل. لا بديل، لا مرونة.",
    risk4Title: "مسؤولية قانونية عن القرارات الآلية",
    risk4Desc: "تبقى مسؤولاً قانونياً عن كل قرار يتخذه وكلاؤك — حتى تلك التي لا تستطيع تفسيرها.",
    risk5Title: "تآكل الهوامش بسبب التسعير غير المتحكم به",
    risk5Desc: "وكلاء يحددون الأسعار والعروض بدون حدود يمكنهم تدمير الربحية في ساعات.",
    risk6Title: "لا مسار تدقيق",
    risk6Desc: "بدون تتبع، لا يمكنك فهم أو تفسير أو تصحيح ما فعله وكلاء الذكاء الاصطناعي.",
    ctaFreeTag: "✓ مجاني 100% · بدون تسجيل · نتائج فورية",
    ctaTitle1: "احسب",
    ctaTitle2: "نقاط السيادة",
    ctaTitle3: "الآن",
    ctaDesc: "10 دقائق. تشخيص كامل لحوكمتك الوكيلية. افهم أين أنت قبل أن يجبرك عطل على اكتشاف ذلك.",
    ctaPrimary: "ابدأ التشخيص — مجاناً →",
    ctaSecondary: "اطلب تقييماً مخصصاً",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "المعيار العالمي لحوكمة الذكاء الاصطناعي",
    footerDesc: "معيار الحوكمة للمؤسسات التي تنشر وكلاء ذكاء اصطناعي مستقلين.",
    footerFramework: "الإطار",
    footerTheStandard: "المعيار",
    footerBlog: "المدونة",
    footerCertification: "ACF Certification",
    footerProducts: "المنتجات",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "المؤسسة",
    footerPartnerPortal: "بوابة الشركاء",
    footerAbout: "حول",
    footerContact: "اتصل بنا",
    footerLegal: "قانوني",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. جميع الحقوق محفوظة.",
  },
  tr: {
    navSubtext: "TEŞHİS ARACI — ÜCRETSİZ",
    navHome: "← Ana Sayfa",
    navCta: "Puanımı Hesapla →",
    heroTag: "TEŞHİS ARACI — ÜCRETSİZ",
    heroLine1: "Ölçün",
    heroLine2: "Egemenlik Puanınızı",
    heroDesc: "Otonom yapay zeka ajanları çağına hazır mısınız? Ajantik yönetişiminizin sağlamlığını 10 dakikada değerlendirin. 6 yönetişim ekseni üzerinden ACF Score® ve kişiselleştirilmiş öneriler alın.",
    heroCta: "Puanımı Hesapla — Ücretsiz →",
    heroHow: "Nasıl çalışır",
    badge1: "7 rehberli adım",
    badge2: "Eksiksiz PDF raporu",
    badge3: "Kayıt gerekmez",
    badge4: "10 dakikada sonuç",
    dialLabel: "EGEMENLİK PUANI",
    stat1: "şirketlerin resmi yönetişim olmadan yapay zeka ajanları kullanıyor",
    stat2: "kontrolsüz yapay zeka kararlarından kaynaklanan ortalama kayıplar",
    stat3: "yöneticilerin stratejik kontrol kaybından endişe duyuyor",
    axesSectionLabel: "// Ölçüm çerçevesi",
    axesSectionTitle: "6 yönetişim ekseni",
    axesSectionDesc: "Egemenlik Puanınız, ajantik yönetişimin 6 kritik boyutunda hesaplanır. Her eksen, mevcut çerçevenizdeki belirli bir zafiyeti veya güçlü yönü ortaya koyar.",
    axis1Title: "Karar özerkliği",
    axis1Desc: "Yapay zeka ajanlarınızın bağımsız olarak karar verme derecesini ve bu kararların tanımlanmış sınırlar içinde kalıp kalmadığını ölçer.",
    axis2Title: "Kontrol ve denetim",
    axis2Desc: "Acil durdurma protokolleri aracılığıyla otonom ajan operasyonlarını herhangi bir anda izleme, müdahale etme ve durdurma kapasitenizi değerlendirir.",
    axis3Title: "Dayanıklılık",
    axis3Desc: "Ajantik sistemler arızalandığında veya beklenmedik şekilde davrandığında kuruluşunuzun operasyonları sürdürme ve hızla toparlanma yeteneğini değerlendirir.",
    axis4Title: "Platform bağımlılığı",
    axis4Desc: "Üçüncü taraf yapay zeka platformlarına (Amazon, Google, OpenAI) maruziyetinizi ve tek bir sağlayıcının kullanılamaz hale gelmesi durumundaki riski ölçer.",
    axis5Title: "Düzenleyici uyumluluk",
    axis5Desc: "AB Yapay Zeka Yasası, GDPR ve ticari ortamlarda otonom sistemlerin kullanımını düzenleyen sektöre özgü düzenlemelerle uyumu ölçer.",
    axis6Title: "Teknik kontroller",
    axis6Desc: "Teknik altyapıyı değerlendirir: izlenebilirlik, denetim günlükleri, korumalı alan, geri dönüşüm mekanizmaları ve yapay zeka sistemlerinizin erişim kontrolü.",
    howSectionLabel: "// Süreç",
    howSectionTitle: "Puanınıza 7 adım",
    howSectionDesc: "10 dakikalık yapılandırılmış bir teşhis. Kayıt gerekmez. Tam sonuçlarınızı hemen alın.",
    step1Title: "Şirket bağlamı",
    step1Desc: "Sektör, şirket büyüklüğü, mevcut yapay zeka ajanı kullanımı ve dağıtım kapsamı.",
    step1Tag: "TEMEL",
    step2Title: "Olgunluk seviyesi",
    step2Desc: "Ajanlarınızın şu anda nasıl çalıştığı — yardımlıdan tam otonom'a.",
    step2Tag: "DEĞERLENDİRME",
    step3Title: "4 ACF katmanı",
    step3Desc: "Yönetişim, karar politikası, ajan sistemi ve yürütme denetimi katmanları.",
    step3Tag: "FRAMEWORK",
    step4Title: "Bağımlılıklar",
    step4Desc: "Kritik tedarikçi haritalama, platform riski maruziyeti ve tek hata noktaları.",
    step4Tag: "RİSK HARİTASI",
    step5Title: "Kontrol mekanizmaları",
    step5Desc: "Acil durdurma hazırlığı, denetim izi kalitesi ve insan eskalasyon protokolleri.",
    step5Tag: "KONTROLLER",
    step6Title: "Uyumluluk kontrolü",
    step6Desc: "AB Yapay Zeka Yasası, GDPR ve sektöre özgü düzenleyici uyum değerlendirmesi.",
    step6Tag: "UYUMLULUK",
    step7Title: "Puanınız ve raporunuz",
    step7Desc: "Anlık Egemenlik Puanı, eksen bazında analiz ve 3 öncelikli eyleminiz.",
    step7Tag: "SONUÇLAR",
    stepReadyTitle: "Hazır mısınız?",
    stepReadyDesc: "10 dakika. Ücretsiz. Kayıt yok. Anında sonuçlar.",
    stepReadyCta: "Şimdi başla →",
    delSectionLabel: "// Ne elde edersiniz",
    delSectionTitle: "Eksiksiz yönetişim raporunuz",
    delSectionDesc: "Eksiksiz bir teşhis raporu — uygulanabilir, kuruluşunuza özel, PDF olarak indirilebilir.",
    del1Title: "Egemenlik Puanı",
    del1Desc: "Tüm 6 yönetişim ekseninde karar bağımsızlığını ölçen bileşik puanınız. Sektör standartlarıyla karşılaştırmalı.",
    del2Title: "Küresel ACF® Puanı",
    del2Desc: "4 operasyonel yönetişim katmanınızın eksiksiz değerlendirmesi; her boyut için bireysel puanlar ve boşluk analizi.",
    del3Title: "3 öncelikli eylem",
    del3Desc: "Geçişinizi güvence altına almak ve ACF Seviye 2 yönetişim uyumluluğuna ulaşmak için kişiselleştirilmiş, önceliklendirilmiş eylem planı.",
    riskSectionLabel: "// Neden önemli",
    riskSectionTitle: "Ajantik yönetişim olmadan şunları riske atarsınız:",
    risk1Title: "İş çıkarlarınıza aykırı yapay zeka kararları",
    risk1Desc: "Küresel iş vizyonu olmadan yerel metrikleri optimize eden ajanlar — sessizce değer yok ederler.",
    risk2Title: "Stratejik kontrolün kaybı",
    risk2Desc: "Kararlar yanlış gittiğinde yapay zeka sistemlerinizi gerçek zamanlı olarak yönlendirme, denetleme veya düzeltme yetersizliği.",
    risk3Title: "Kritik platform bağımlılığı",
    risk3Desc: "Amazon, Google veya OpenAI'ın tek bir kesintisi tüm operasyonunuzu durdurur. Yedek yok, dayanıklılık yok.",
    risk4Title: "Otomatik kararlar için yasal sorumluluk",
    risk4Desc: "Ajanlarınızın aldığı her karardan yasal olarak sorumlu olmaya devam edersiniz — açıklayamadıklarınız da dahil.",
    risk5Title: "Kontrolsüz fiyatlandırmadan kaynaklanan marj erozyonu",
    risk5Desc: "Sınır olmadan fiyat ve promosyon belirleyen ajanlar, karlılığı saatler içinde yok edebilir.",
    risk6Title: "Denetim izi yok",
    risk6Desc: "İzlenebilirlik olmadan, yapay zeka ajanlarınızın ne yaptığını anlayamaz, açıklayamaz veya düzeltemezsiniz.",
    ctaFreeTag: "✓ %100 ÜCRETSİZ · KAYIT YOK · ANINDA SONUÇLAR",
    ctaTitle1: "Hesaplayın",
    ctaTitle2: "Egemenlik Puanınızı",
    ctaTitle3: "şimdi",
    ctaDesc: "10 dakika. Ajantik yönetişiminizin eksiksiz bir teşhisi. Bir arıza sizi keşfetmeye zorlamadan önce nerede olduğunuzu anlayın.",
    ctaPrimary: "Teşhisi başlat — Ücretsiz →",
    ctaSecondary: "Özel bir değerlendirme talep edin",
    footerLogoText: "Agentic Commerce Framework®",
    footerLogoSubtext: "Yapay Zeka Yönetişimi Küresel Standardı",
    footerDesc: "Otonom yapay zeka ajanları dağıtan kuruluşlar için yönetişim standardı.",
    footerFramework: "Çerçeve",
    footerTheStandard: "Standart",
    footerBlog: "Blog",
    footerCertification: "ACF Certification",
    footerProducts: "Ürünler",
    footerScore: "ACF Score®",
    footerControl: "ACF Control",
    footerAcademy: "Academy",
    footerOrganization: "Kuruluş",
    footerPartnerPortal: "İş Ortağı Portalı",
    footerAbout: "Hakkında",
    footerContact: "İletişim",
    footerLegal: "Yasal",
    footerCopyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tüm hakları saklıdır.",
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
      <a href="/${locale}/compliance-checker" target="_top" class="btno">${t.ctaChecker || 'ACF AI Act Checker →'}</a>
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
  const lang = (translations as any)[locale] ? locale : "en";
  const t = (translations as any)[lang];
  return (
    <iframe
      srcDoc={buildHTML(locale, t)}
      style={{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",border:"none",zIndex:9999}}
      title="ACF Score"
    />
  )
}
