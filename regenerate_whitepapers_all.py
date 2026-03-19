#!/usr/bin/env python3
"""Regenerate ALL 12 non-FR ACF Whitepaper PDFs with dark navy theme."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
import os

# ── Colors ──
NAVY = HexColor("#050c1a")
DARK_CARD = HexColor("#0f172a")
GOLD = HexColor("#c9a84c")
LIGHT_GOLD = HexColor("#e8d5a0")
WHITE = white
GREY = HexColor("#94a3b8")
LIGHT_GREY = HexColor("#e2e8f0")
MEDIUM_GREY = HexColor("#64748b")

W, H = A4
OUT_DIR = r"C:\Users\vdora\acfstandard\public"

# ── All translations ──
LANGS = {
    "en": {
        "doc_title": "ACF\u00ae \u2014 White Paper",
        "cover_label": "AI CONSULTING",
        "cover_subtitle": "WHITE PAPER",
        "cover_desc1": "The global governance standard for autonomous",
        "cover_desc2": "agentic systems in commercial environments.",
        "stats": [("4","Founding\nPrinciples"),("8","Implementation\nModules"),("18","Sovereignty\nKPIs"),("17","Proprietary\nTools")],
        "author_label": "Author", "date_label": "Date", "date_val": "December 2025",
        "class_label": "Classification", "class_val": "Public",
        "toc_label": "// Contents", "toc_title": "Table of Contents",
        "toc": [("01","Executive Summary","3"),("02","The Agentic Commerce Challenge","4"),("03","The ACF\u00ae Framework","5"),("04","Methodology \u2014 8 Modules","7"),("05","Emergency Stop Protocol","8"),("06","ACF\u00ae Products","9"),("07","About","10")],
        "exec_num": "01", "exec_title": "Executive Summary",
        "exec_p1": "The Agentic Commerce Framework\u00ae (ACF) is the global governance standard designed for organizations deploying autonomous agents in commercial environments. Created by Vincent DORANGE, AI governance expert, the ACF defines a comprehensive methodology articulating 4 founding principles, 4 operational layers, 8 implementation modules and 18 sovereignty KPIs.",
        "exec_p2": "Facing the multiplication of agentic systems in commerce, finance and operations, the ACF provides the necessary framework to ensure that strategic decisions remain under human control, that every autonomous action is traceable and auditable, and that emergency stop mechanisms are always available.",
        "exec_quote1": "\u00ab The question is no longer whether to deploy agents.",
        "exec_quote2": "It is how to deploy them without surrendering",
        "exec_quote3": "your decisional sovereignty. \u00bb",
        "key_stats_label": "KEY FIGURES",
        "key_stats": [("4 Principles","Immutable sovereignty axioms"),("4 Layers","Hierarchical governance architecture"),("8 Modules","Progressive deployment over 6\u201318 months"),("18 KPIs","Real-time sovereignty indicators"),("17 Tools","Proprietary governance instruments"),("4 Levels","From classic automation to supervised autonomy")],
        "ch_num": "02", "ch_title": "The Agentic Commerce Challenge",
        "ch_p1": "In 2026, autonomous agents already execute decisions in commercial environments \u2014 pricing, lead qualification, claims processing, contract management. Most organizations have no framework to govern them.",
        "ch_p2": "Without structured governance, every deployed agent represents a legal, financial and reputational risk. Decisions taken without human supervision can lead to unauthorized contractual commitments, regulatory violations or irreversible financial losses.",
        "ch_p3": "The ACF\u00ae was created to fill this void \u2014 before a governance failure becomes a legal, financial or reputational crisis. It is the first global standard to offer a complete and actionable methodology for agentic system governance.",
        "risks_label": "IDENTIFIED RISKS",
        "risks": [("Legal risk","Contractual commitments made without human authorization"),("Financial risk","Unsupervised pricing and investment decisions"),("Regulatory risk","Non-compliance with EU AI Act and local regulations"),("Reputational risk","Visible agent actions without control by clients"),("Operational risk","Decision cascades without stop mechanism")],
        "fw_num": "03", "fw_title": "The ACF\u00ae Framework",
        "fw_principles_title": "The 4 Founding Principles",
        "principles": [("P1","Decision / execution separation","Critical strategic decisions are never delegated to autonomous agents."),("P2","Non-delegable zones","Certain decisions are defined as strictly reserved for humans."),("P3","Traceability & interruptibility","Every autonomous action is auditable and the system can be interrupted at any time."),("P4","Living governance","The governance framework evolves continuously with agent capabilities.")],
        "fw_layers_title": "The 4 Operational Layers",
        "layers": [("C1","Strategic","Sovereignty charter, governance committee, RACI matrix"),("C2","Tactical","Weighted objectives, arbitration rules, escalation thresholds"),("C3","Operational","Agent mandates, interaction perimeters, 5-category taxonomy"),("C4","Technical","Adaptive gating, multi-level alerts, 18 KPIs, real-time dashboards")],
        "mat_cont": "03 // Continued",
        "mat_title": "The 4 Agentic Maturity Levels",
        "mat_desc": "The ACF classifies systems by autonomy level. Level 2 is the recommended target.",
        "levels": [("LEVEL 0","Classic automation","Very low","Fixed rules, no ML. Human intervention for any modification.",None),("LEVEL 1","Assisted agents","Low","Agents analyze and recommend. Every final decision remains human.",None),("LEVEL 2","Governed agents","Moderate","Agents decide within a strict framework. Non-delegable zones locked.","\u2605 RECOMMENDED TARGET"),("LEVEL 3","Supervised autonomy","High","Agents decide and learn. Maximum governance required.",None)],
        "risk_prefix": "Risk: ",
        "mat_progression": "Level 0  \u2192  Level 1  \u2192  Level 2 \u2605  \u2192  Level 3",
        "mat_progression_desc": "Recommended progression \u2014 each level requires more mature governance",
        "meth_num": "04", "meth_title": "Methodology",
        "meth_desc1": "8 modules deployed progressively over 6 to 18 months.",
        "meth_desc2": "Each module builds on the previous one.",
        "modules": [("MOD 01","Sovereignty diagnosis","Sovereignty Score calculation. Risk zone mapping."),("MOD 02","Decision mapping","Criticality matrix. Non-delegable zone identification."),("MOD 03","Agentic constitution","9 articles. Signed by governance committee."),("MOD 04","Agent system design","Mandate cards, interaction perimeters, autonomy levels."),("MOD 05","Security & reversibility","Sandboxing, reversibility plan, stop protocol design."),("MOD 06","Continuous governance","Monthly reviews. Annual compliance audit."),("MOD 07","Roadmap","Progressive rollout in 5 phases."),("MOD 08","Crisis management","3-level incidents. Emergency stop simulation exercises.")],
        "meth_timeline": "Recommended rollout: Modules 01\u201303 (Month 1\u20133) \u2192 Modules 04\u201306 (Month 4\u20139) \u2192 Modules 07\u201308 (Month 10\u201318)",
        "em_num": "05", "em_title": "Emergency Stop Protocol",
        "em_intro": "An effective stop mechanism is not a simple button. The ACF specifies three interruption levels with defined response times and clear escalation procedures.",
        "em_levels": [("LEVEL 1","Operational pause","Suspension of non-critical operations. Agents continue current tasks but do not initiate new actions. Automatic or manual trigger.","< 30 seconds","#22c55e"),("LEVEL 2","Decision stop","Complete suspension of all agent decision-making. All pending decisions redirected to human operators.","< 5 seconds","#f59e0b"),("LEVEL 3","Total system stop","Complete interruption of all agentic systems. Switch to manual backup processes. Reserved for governance committee.","< 1 second","#ef4444")],
        "em_time_prefix": "Time: ",
        "em_note": "Each level is tested via quarterly simulation exercises (Module 08)",
        "prod_num": "06", "prod_title": "ACF\u00ae Products",
        "prod_intro": "Four complementary products operationalizing the ACF standard.",
        "products": [("ACF AI Act Checker","COMPLIANCE TOOL","Free diagnostic tool to assess your compliance with the EU AI Act. Identify your obligations based on your role and risk level.",["EU AI Act compliance diagnostic","Role-based obligation mapping","Automated risk classification"]),("ACF Score","DIAGNOSTIC TOOL","Proprietary sovereignty score measuring your decisional independence across 6 governance dimensions.",["Composite sovereignty score","6-axis radar visualization","Personalized action plan per axis"]),("ACF Control","GOVERNANCE PLATFORM","Real-time governance dashboard monitoring your 18 sovereignty KPIs with adaptive gating and automated escalation.",["18 KPIs across 6 governance axes","Adaptive gating with human escalation","Tamper-proof audit logs"]),("ACF Certification","INDEPENDENT CERTIFICATION","Independent certification attesting compliance with the ACF governance standard. Publicly verifiable.",["Level 1, 2 and 3 pathway","Publicly verifiable badge","Annual renewal + continuous monitoring"])],
        "about_num": "07", "about_title": "About",
        "about_p1": "The Agentic Commerce Framework\u00ae was created by Vincent DORANGE, AI governance expert and founder of AI CONSULTING. The framework is the result of several years of research on the governance of autonomous systems in commercial environments.",
        "about_p2": "ACF\u00ae is a registered trademark. The entire methodology and tools are legally protected.",
        "contact_label": "Contact",
        "contact_info": [("Website","www.acfstandard.com"),("Standard","ACF\u00ae \u2014 Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "\u00a9 2026 Agentic Commerce Framework\u00ae \u2014 Vincent DORANGE. All rights reserved.",
        "back_footer2": "ACF\u00ae is a registered trademark. Methodology and tools legally protected.",
    },
    "es": {
        "doc_title": "ACF® — Libro Blanco",
        "cover_label": "AI CONSULTING",
        "cover_subtitle": "LIBRO BLANCO",
        "cover_desc1": "El estándar mundial de gobernanza para sistemas",
        "cover_desc2": "agénticos autónomos en entornos comerciales.",
        "stats": [("4","Principios\nFundadores"),("8","Módulos de\nImplementación"),("18","KPIs de\nSoberanía"),("17","Herramientas\nPropietarias")],
        "author_label": "Autor", "date_label": "Fecha", "date_val": "Diciembre 2025",
        "class_label": "Clasificación", "class_val": "Público",
        "toc_label": "// Índice", "toc_title": "Índice de contenidos",
        "toc": [("01","Resumen ejecutivo","3"),("02","El desafío del comercio agéntico","4"),("03","El framework ACF®","5"),("04","Metodología — 8 Módulos","7"),("05","Protocolo de parada de emergencia","8"),("06","Los productos ACF®","9"),("07","Acerca de","10")],
        "exec_num": "01", "exec_title": "Resumen ejecutivo",
        "exec_p1": "El Agentic Commerce Framework® (ACF) es el estándar mundial de gobernanza diseñado para organizaciones que despliegan agentes autónomos en entornos comerciales. Creado por Vincent DORANGE, experto en gobernanza IA, el ACF define una metodología completa que articula 4 principios fundadores, 4 capas operacionales, 8 módulos de implementación y 18 KPIs de soberanía.",
        "exec_p2": "Ante la multiplicación de sistemas agénticos en el comercio, las finanzas y las operaciones, el ACF proporciona el marco necesario para garantizar que las decisiones estratégicas permanezcan bajo control humano, que cada acción autónoma sea trazable y auditable, y que mecanismos de parada de emergencia estén siempre disponibles.",
        "exec_quote1": "«La cuestión ya no es si desplegar agentes.",
        "exec_quote2": "Es cómo desplegarlos sin ceder",
        "exec_quote3": "su soberanía decisional.»",
        "key_stats_label": "CIFRAS CLAVE",
        "key_stats": [("4 Principios","Axiomas inmutables de soberanía"),("4 Capas","Arquitectura jerárquica de gobernanza"),("8 Módulos","Despliegue progresivo de 6 a 18 meses"),("18 KPIs","Indicadores de soberanía en tiempo real"),("17 Herramientas","Instrumentos propietarios de gobernanza"),("4 Niveles","De la automatización clásica a la autonomía supervisada")],
        "ch_num": "02", "ch_title": "El desafío del comercio agéntico",
        "ch_p1": "En 2026, los agentes autónomos ya ejecutan decisiones en entornos comerciales — fijación de precios, cualificación de leads, tratamiento de reclamaciones, gestión de contratos. La mayoría de las organizaciones no tienen ningún marco para gobernarlos.",
        "ch_p2": "Sin gobernanza estructurada, cada agente desplegado representa un riesgo jurídico, financiero y reputacional. Las decisiones tomadas sin supervisión humana pueden resultar en compromisos contractuales no autorizados, violaciones regulatorias o pérdidas financieras irreversibles.",
        "ch_p3": "El ACF® fue creado para llenar este vacío — antes de que una falla de gobernanza se convierta en una crisis legal, financiera o reputacional.",
        "risks_label": "RIESGOS IDENTIFICADOS",
        "risks": [("Riesgo jurídico","Compromisos contractuales sin autorización humana"),("Riesgo financiero","Decisiones de pricing no supervisadas"),("Riesgo regulatorio","No conformidad con EU AI Act"),("Riesgo reputacional","Acciones de agentes visibles sin control"),("Riesgo operacional","Cascadas de decisiones sin mecanismo de parada")],
        "fw_num": "03", "fw_title": "El framework ACF®",
        "fw_principles_title": "Los 4 Principios Fundadores",
        "principles": [("P1","Separación decisión / ejecución","Las decisiones estratégicas críticas nunca se delegan a agentes autónomos."),("P2","Zonas no delegables","Ciertas decisiones están estrictamente reservadas al humano."),("P3","Trazabilidad e interrumpibilidad","Cada acción autónoma es auditable y el sistema puede interrumpirse en cualquier momento."),("P4","Gobernanza viva","El marco de gobernanza evoluciona continuamente con las capacidades de los agentes.")],
        "fw_layers_title": "Las 4 Capas Operacionales",
        "layers": [("C1","Estratégica","Carta de soberanía, comité de gobernanza, matriz RACI"),("C2","Táctica","Objetivos ponderados, reglas de arbitraje, umbrales de escalada"),("C3","Operacional","Mandatos por agente, perímetros de interacción, taxonomía 5 categorías"),("C4","Técnica","Gating adaptativo, alertas multinivel, 18 KPIs, dashboards tiempo real")],
        "mat_cont": "03 // Continuación",
        "mat_title": "Los 4 Niveles de Madurez Agéntica",
        "mat_desc": "El ACF clasifica los sistemas por nivel de autonomía. El Nivel 2 es el objetivo recomendado.",
        "levels": [("NIVEL 0","Automatización clásica","Muy bajo","Reglas fijas, sin ML. Intervención humana para cualquier modificación.",None),("NIVEL 1","Agentes asistidos","Bajo","Los agentes analizan y recomiendan. Cada decisión final permanece humana.",None),("NIVEL 2","Agentes gobernados","Moderado","Los agentes deciden en un marco estricto. Zonas no delegables bloqueadas.","★ OBJETIVO RECOMENDADO"),("NIVEL 3","Autonomía supervisada","Elevado","Los agentes deciden y aprenden. Gobernanza máxima requerida.",None)],
        "risk_prefix": "Riesgo: ",
        "mat_progression": "Nivel 0  →  Nivel 1  →  Nivel 2 ★  →  Nivel 3",
        "mat_progression_desc": "Progresión recomendada — cada nivel requiere una gobernanza más madura",
        "meth_num": "04", "meth_title": "Metodología",
        "meth_desc1": "8 módulos desplegados progresivamente de 6 a 18 meses.",
        "meth_desc2": "Cada módulo se apoya en el anterior.",
        "modules": [("MOD 01","Diagnóstico de soberanía","Cálculo del Score de soberanía. Cartografía de zonas de riesgo."),("MOD 02","Cartografía decisional","Matriz de criticidad. Identificación de zonas no delegables."),("MOD 03","Constitución agéntica","9 artículos. Firmada por el comité de gobernanza."),("MOD 04","Diseño del sistema agente","Fichas de mandato, perímetros de interacción, niveles de autonomía."),("MOD 05","Seguridad y reversibilidad","Sandboxing, plan de reversibilidad, diseño del protocolo de parada."),("MOD 06","Gobernanza continua","Revisiones mensuales. Auditoría de conformidad anual."),("MOD 07","Hoja de ruta","Despliegue progresivo en 5 fases."),("MOD 08","Gestión de crisis","Incidentes 3 niveles. Ejercicios de simulación de parada de emergencia.")],
        "meth_timeline": "Despliegue recomendado: Módulos 01-03 (Mes 1-3) → Módulos 04-06 (Mes 4-9) → Módulos 07-08 (Mes 10-18)",
        "em_num": "05", "em_title": "Protocolo de parada de emergencia",
        "em_intro": "Un mecanismo de parada eficaz no es un simple botón. El ACF especifica tres niveles de interrupción con tiempos de respuesta definidos y procedimientos de escalada claros.",
        "em_levels": [("NIVEL 1","Pausa operacional","Suspensión de operaciones no críticas. Los agentes continúan tareas en curso pero no inician nuevas acciones.","< 30 segundos","#22c55e"),("NIVEL 2","Parada decisional","Suspensión completa de toda toma de decisión por agentes. Todas las decisiones pendientes se redirigen a operadores humanos.","< 5 segundos","#f59e0b"),("NIVEL 3","Parada total del sistema","Interrupción completa de todos los sistemas agénticos. Cambio a procesos manuales de respaldo.","< 1 segundo","#ef4444")],
        "em_time_prefix": "Tiempo: ",
        "em_note": "Cada nivel se prueba mediante ejercicios de simulación trimestrales (Módulo 08)",
        "prod_num": "06", "prod_title": "Los productos ACF®",
        "prod_intro": "Cuatro productos complementarios que operacionalizan el estándar ACF.",
        "products": [("ACF AI Act Checker","HERRAMIENTA DE CUMPLIMIENTO","Herramienta de diagnóstico gratuita para evaluar su cumplimiento con la EU AI Act.",["Diagnóstico de cumplimiento EU AI Act","Mapeo de obligaciones por rol","Clasificación automática de riesgo"]),("ACF Score","HERRAMIENTA DIAGNÓSTICA","Score de soberanía propietario que mide su independencia decisional en 6 dimensiones de gobernanza.",["Score compuesto de soberanía","Visualización radar 6 ejes","Plan de acción personalizado por eje"]),("ACF Control","PLATAFORMA DE GOBERNANZA","Dashboard de gobernanza en tiempo real que monitorea sus 18 KPIs de soberanía con gating adaptativo.",["18 KPIs en 6 ejes de gobernanza","Gating adaptativo con escalada humana","Logs de auditoría infalsificables"]),("ACF Certification","CERTIFICACIÓN INDEPENDIENTE","Certificación independiente que atestigua la conformidad al estándar de gobernanza ACF.",["Recorrido Level 1, 2 y 3","Badge públicamente verificable","Renovación anual + monitoreo continuo"])],
        "about_num": "07", "about_title": "Acerca de",
        "about_p1": "El Agentic Commerce Framework® fue creado por Vincent DORANGE, experto en gobernanza IA y fundador de AI CONSULTING. El framework es el resultado de varios años de investigación sobre la gobernanza de sistemas autónomos en entornos comerciales.",
        "about_p2": "ACF® es una marca registrada. Toda la metodología y herramientas están jurídicamente protegidas.",
        "contact_label": "Contacto",
        "contact_info": [("Sitio web","www.acfstandard.com"),("Estándar","ACF® — Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Todos los derechos reservados.",
        "back_footer2": "ACF® es una marca registrada. Metodología y herramientas jurídicamente protegidas.",
    },
    "de": {
        "doc_title": "ACF® — Whitepaper",
        "cover_label": "AI CONSULTING",
        "cover_subtitle": "WHITEPAPER",
        "cover_desc1": "Der globale Governance-Standard für autonome",
        "cover_desc2": "agentische Systeme in kommerziellen Umgebungen.",
        "stats": [("4","Gründungs-\nprinzipien"),("8","Implementierungs-\nmodule"),("18","Souveränitäts-\nKPIs"),("17","Proprietäre\nWerkzeuge")],
        "author_label": "Autor", "date_label": "Datum", "date_val": "Dezember 2025",
        "class_label": "Klassifizierung", "class_val": "Öffentlich",
        "toc_label": "// Inhalt", "toc_title": "Inhaltsverzeichnis",
        "toc": [("01","Zusammenfassung","3"),("02","Die agentische Herausforderung","4"),("03","Das ACF® Framework","5"),("04","Methodik — 8 Module","7"),("05","Notabschaltprotokoll","8"),("06","ACF® Produkte","9"),("07","Über uns","10")],
        "exec_num": "01", "exec_title": "Zusammenfassung",
        "exec_p1": "Das Agentic Commerce Framework® (ACF) ist der globale Governance-Standard für Organisationen, die autonome Agenten in kommerziellen Umgebungen einsetzen. Entwickelt von Vincent DORANGE, KI-Governance-Experte, definiert das ACF eine umfassende Methodik mit 4 Gründungsprinzipien, 4 operativen Schichten, 8 Implementierungsmodulen und 18 Souveränitäts-KPIs.",
        "exec_p2": "Angesichts der Verbreitung agentischer Systeme im Handel, Finanzen und Betrieb bietet das ACF den notwendigen Rahmen, um sicherzustellen, dass strategische Entscheidungen unter menschlicher Kontrolle bleiben, jede autonome Aktion rückverfolgbar und prüfbar ist und Notabschaltmechanismen stets verfügbar sind.",
        "exec_quote1": "«Die Frage ist nicht mehr, ob Agenten eingesetzt werden.",
        "exec_quote2": "Sondern wie sie eingesetzt werden, ohne die",
        "exec_quote3": "Entscheidungssouveränität aufzugeben.»",
        "key_stats_label": "SCHLÜSSELZAHLEN",
        "key_stats": [("4 Prinzipien","Unveränderliche Axiome der Souveränität"),("4 Schichten","Hierarchische Governance-Architektur"),("8 Module","Progressive Einführung über 6-18 Monate"),("18 KPIs","Echtzeit-Souveränitätsindikatoren"),("17 Werkzeuge","Proprietäre Governance-Instrumente"),("4 Stufen","Von klassischer Automatisierung zu überwachter Autonomie")],
        "ch_num": "02", "ch_title": "Die agentische Herausforderung",
        "ch_p1": "Im Jahr 2026 treffen autonome Agenten bereits Entscheidungen in kommerziellen Umgebungen — Preisgestaltung, Lead-Qualifizierung, Reklamationsbearbeitung, Vertragsmanagement. Die meisten Organisationen haben keinen Rahmen, um sie zu steuern.",
        "ch_p2": "Ohne strukturierte Governance stellt jeder eingesetzte Agent ein juristisches, finanzielles und reputationsbezogenes Risiko dar. Entscheidungen ohne menschliche Aufsicht können zu unautorisierten vertraglichen Verpflichtungen, regulatorischen Verstößen oder irreversiblen finanziellen Verlusten führen.",
        "ch_p3": "Das ACF® wurde geschaffen, um diese Lücke zu füllen — bevor ein Governance-Versagen zu einer rechtlichen, finanziellen oder Reputationskrise wird.",
        "risks_label": "IDENTIFIZIERTE RISIKEN",
        "risks": [("Juristisches Risiko","Vertragliche Verpflichtungen ohne menschliche Genehmigung"),("Finanzielles Risiko","Unüberwachte Preis- und Investitionsentscheidungen"),("Regulatorisches Risiko","Nichteinhaltung des EU AI Act"),("Reputationsrisiko","Sichtbare Agentenaktionen ohne Kontrolle"),("Operationelles Risiko","Entscheidungskaskaden ohne Abschaltmechanismus")],
        "fw_num": "03", "fw_title": "Das Framework ACF®",
        "fw_principles_title": "Die 4 Gründungsprinzipien",
        "principles": [("P1","Trennung Entscheidung / Ausführung","Kritische strategische Entscheidungen werden nie an autonome Agenten delegiert."),("P2","Nicht-delegierbare Zonen","Bestimmte Entscheidungen sind strikt dem Menschen vorbehalten."),("P3","Rückverfolgbarkeit & Unterbrechbarkeit","Jede autonome Aktion ist prüfbar und das System kann jederzeit unterbrochen werden."),("P4","Lebendige Governance","Der Governance-Rahmen entwickelt sich kontinuierlich mit den Fähigkeiten der Agenten.")],
        "fw_layers_title": "Die 4 Operativen Schichten",
        "layers": [("C1","Strategisch","Souveränitätscharta, Governance-Komitee, RACI-Matrix"),("C2","Taktisch","Gewichtete Ziele, Schlichtungsregeln, Eskalationsschwellen"),("C3","Operationell","Mandatskarten je Agent, Interaktionsperimeter, 5-Kategorien-Taxonomie"),("C4","Technisch","Adaptives Gating, mehrstufige Alarme, 18 KPIs, Echtzeit-Dashboards")],
        "mat_cont": "03 // Fortsetzung",
        "mat_title": "Die 4 Agentischen Reifegradstufen",
        "mat_desc": "Das ACF klassifiziert Systeme nach Autonomiegrad. Stufe 2 ist das empfohlene Ziel.",
        "levels": [("STUFE 0","Klassische Automatisierung","Sehr gering","Feste Regeln, kein ML. Menschliches Eingreifen bei jeder Änderung.",None),("STUFE 1","Assistierte Agenten","Gering","Agenten analysieren und empfehlen. Jede Endentscheidung bleibt menschlich.",None),("STUFE 2","Gesteuerte Agenten","Moderat","Agenten entscheiden in einem strikten Rahmen. Nicht-delegierbare Zonen gesperrt.","★ EMPFOHLENES ZIEL"),("STUFE 3","Überwachte Autonomie","Hoch","Agenten entscheiden und lernen. Maximale Governance erforderlich.",None)],
        "risk_prefix": "Risiko: ",
        "mat_progression": "Stufe 0  →  Stufe 1  →  Stufe 2 ★  →  Stufe 3",
        "mat_progression_desc": "Empfohlene Progression — jede Stufe erfordert eine reifere Governance",
        "meth_num": "04", "meth_title": "Methodik",
        "meth_desc1": "8 Module, progressiv über 6 bis 18 Monate eingeführt.",
        "meth_desc2": "Jedes Modul baut auf dem vorherigen auf.",
        "modules": [("MOD 01","Souveränitätsdiagnose","Berechnung des Souveränitäts-Scores. Kartierung der Risikozonen."),("MOD 02","Entscheidungskartierung","Kritikalitätsmatrix. Identifizierung nicht-delegierbarer Zonen."),("MOD 03","Agentische Verfassung","9 Artikel. Vom Governance-Komitee unterzeichnet."),("MOD 04","Agentensystemdesign","Mandatskarten, Interaktionsperimeter, Autonomiestufen."),("MOD 05","Sicherheit & Reversibilität","Sandboxing, Reversibilitätsplan, Abschaltprotokolldesign."),("MOD 06","Kontinuierliche Governance","Monatliche Reviews. Jährliches Konformitätsaudit."),("MOD 07","Roadmap","Progressiver Rollout in 5 Phasen."),("MOD 08","Krisenmanagement","3-stufige Vorfälle. Notabschaltsimulationsübungen.")],
        "meth_timeline": "Empfohlener Rollout: Module 01-03 (Monat 1-3) → Module 04-06 (Monat 4-9) → Module 07-08 (Monat 10-18)",
        "em_num": "05", "em_title": "Notabschaltprotokoll",
        "em_intro": "Ein wirksamer Abschaltmechanismus ist kein einfacher Knopf. Das ACF spezifiziert drei Unterbrechungsstufen mit definierten Reaktionszeiten und klaren Eskalationsverfahren.",
        "em_levels": [("STUFE 1","Betriebspause","Aussetzung nicht-kritischer Operationen. Agenten führen laufende Aufgaben fort, initiieren aber keine neuen Aktionen.","< 30 Sekunden","#22c55e"),("STUFE 2","Entscheidungsstopp","Vollständige Aussetzung aller Agentenentscheidungen. Alle ausstehenden Entscheidungen werden an menschliche Operatoren weitergeleitet.","< 5 Sekunden","#f59e0b"),("STUFE 3","Systemstopp","Vollständige Unterbrechung aller agentischen Systeme. Umschaltung auf manuelle Backup-Prozesse.","< 1 Sekunde","#ef4444")],
        "em_time_prefix": "Zeit: ",
        "em_note": "Jede Stufe wird durch vierteljährliche Simulationsübungen getestet (Modul 08)",
        "prod_num": "06", "prod_title": "ACF® Produkte",
        "prod_intro": "Vier komplementäre Produkte, die den ACF-Standard operationalisieren.",
        "products": [("ACF AI Act Checker","COMPLIANCE-TOOL","Kostenloses Diagnosetool zur Bewertung Ihrer Konformität mit dem EU AI Act.",["EU AI Act Compliance-Diagnose","Rollenbasierte Pflichtenzuordnung","Automatische Risikoklassifizierung"]),("ACF Score","DIAGNOSE-TOOL","Proprietärer Souveränitäts-Score, der Ihre Entscheidungsunabhängigkeit über 6 Governance-Dimensionen misst.",["Zusammengesetzter Souveränitäts-Score","6-Achsen-Radarvisualisierung","Personalisierter Aktionsplan pro Achse"]),("ACF Control","GOVERNANCE-PLATTFORM","Echtzeit-Governance-Dashboard, das Ihre 18 Souveränitäts-KPIs mit adaptivem Gating überwacht.",["18 KPIs über 6 Governance-Achsen","Adaptives Gating mit menschlicher Eskalation","Fälschungssichere Audit-Logs"]),("ACF Certification","UNABHÄNGIGE ZERTIFIZIERUNG","Unabhängige Zertifizierung, die die Konformität mit dem ACF-Governance-Standard bescheinigt.",["Level 1, 2 und 3 Pfad","Öffentlich verifizierbares Badge","Jährliche Erneuerung + kontinuierliches Monitoring"])],
        "about_num": "07", "about_title": "Über uns",
        "about_p1": "Das Agentic Commerce Framework® wurde von Vincent DORANGE erstellt, KI-Governance-Experte und Gründer von AI CONSULTING. Das Framework ist das Ergebnis mehrjähriger Forschung zur Governance autonomer Systeme in kommerziellen Umgebungen.",
        "about_p2": "ACF® ist eine eingetragene Marke. Die gesamte Methodik und alle Werkzeuge sind rechtlich geschützt.",
        "contact_label": "Kontakt",
        "contact_info": [("Website","www.acfstandard.com"),("Standard","ACF® — Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Alle Rechte vorbehalten.",
        "back_footer2": "ACF® ist eine eingetragene Marke. Methodik und Werkzeuge rechtlich geschützt.",
    },
    "it": {
        "doc_title": "ACF® — Libro Bianco",
        "cover_label": "AI CONSULTING",
        "cover_subtitle": "LIBRO BIANCO",
        "cover_desc1": "Lo standard globale di governance per i sistemi",
        "cover_desc2": "agentici autonomi in ambienti commerciali.",
        "stats": [("4","Principi\nFondatori"),("8","Moduli di\nImplementazione"),("18","KPI di\nSovranità"),("17","Strumenti\nProprietari")],
        "author_label": "Autore", "date_label": "Data", "date_val": "Dicembre 2025",
        "class_label": "Classificazione", "class_val": "Pubblico",
        "toc_label": "// Indice", "toc_title": "Indice dei contenuti",
        "toc": [("01","Sintesi esecutiva","3"),("02","La sfida del commercio agentico","4"),("03","Il framework ACF®","5"),("04","Metodologia — 8 Moduli","7"),("05","Protocollo di arresto d'emergenza","8"),("06","I prodotti ACF®","9"),("07","Chi siamo","10")],
        "exec_num": "01", "exec_title": "Sintesi esecutiva",
        "exec_p1": "L'Agentic Commerce Framework® (ACF) è lo standard globale di governance progettato per le organizzazioni che implementano agenti autonomi in ambienti commerciali. Creato da Vincent DORANGE, esperto in governance IA, l'ACF definisce una metodologia completa con 4 principi fondatori, 4 livelli operativi, 8 moduli di implementazione e 18 KPI di sovranità.",
        "exec_p2": "Di fronte alla moltiplicazione dei sistemi agentici nel commercio, nella finanza e nelle operazioni, l'ACF fornisce il quadro necessario per garantire che le decisioni strategiche rimangano sotto controllo umano, che ogni azione autonoma sia tracciabile e verificabile, e che meccanismi di arresto d'emergenza siano sempre disponibili.",
        "exec_quote1": "«La questione non è più se implementare agenti.",
        "exec_quote2": "Ma come implementarli senza cedere",
        "exec_quote3": "la propria sovranità decisionale.»",
        "key_stats_label": "CIFRE CHIAVE",
        "key_stats": [("4 Principi","Assiomi immutabili di sovranità"),("4 Livelli","Architettura gerarchica di governance"),("8 Moduli","Implementazione progressiva da 6 a 18 mesi"),("18 KPI","Indicatori di sovranità in tempo reale"),("17 Strumenti","Strumenti proprietari di governance"),("4 Livelli","Dall'automazione classica all'autonomia supervisionata")],
        "ch_num": "02", "ch_title": "La sfida del commercio agentico",
        "ch_p1": "Nel 2026, gli agenti autonomi eseguono già decisioni in ambienti commerciali — fissazione dei prezzi, qualificazione dei lead, gestione dei reclami, gestione dei contratti. La maggior parte delle organizzazioni non ha alcun quadro per governarli.",
        "ch_p2": "Senza governance strutturata, ogni agente implementato rappresenta un rischio giuridico, finanziario e reputazionale. Le decisioni prese senza supervisione umana possono portare a impegni contrattuali non autorizzati, violazioni normative o perdite finanziarie irreversibili.",
        "ch_p3": "L'ACF® è stato creato per colmare questo vuoto — prima che un fallimento di governance diventi una crisi legale, finanziaria o reputazionale.",
        "risks_label": "RISCHI IDENTIFICATI",
        "risks": [("Rischio giuridico","Impegni contrattuali senza autorizzazione umana"),("Rischio finanziario","Decisioni di pricing non supervisionate"),("Rischio normativo","Non conformità al EU AI Act"),("Rischio reputazionale","Azioni degli agenti visibili senza controllo"),("Rischio operativo","Cascate di decisioni senza meccanismo di arresto")],
        "fw_num": "03", "fw_title": "Il framework ACF®",
        "fw_principles_title": "I 4 Principi Fondatori",
        "principles": [("P1","Separazione decisione / esecuzione","Le decisioni strategiche critiche non vengono mai delegate ad agenti autonomi."),("P2","Zone non delegabili","Alcune decisioni sono strettamente riservate all'essere umano."),("P3","Tracciabilità e interrompibilità","Ogni azione autonoma è verificabile e il sistema può essere interrotto in qualsiasi momento."),("P4","Governance vivente","Il quadro di governance evolve continuamente con le capacità degli agenti.")],
        "fw_layers_title": "I 4 Livelli Operativi",
        "layers": [("C1","Strategico","Carta di sovranità, comitato di governance, matrice RACI"),("C2","Tattico","Obiettivi ponderati, regole di arbitrato, soglie di escalation"),("C3","Operativo","Mandati per agente, perimetri di interazione, tassonomia 5 categorie"),("C4","Tecnico","Gating adattivo, alert multilivello, 18 KPI, dashboard in tempo reale")],
        "mat_cont": "03 // Continua",
        "mat_title": "I 4 Livelli di Maturità Agentica",
        "mat_desc": "L'ACF classifica i sistemi per livello di autonomia. Il Livello 2 è l'obiettivo raccomandato.",
        "levels": [("LIVELLO 0","Automazione classica","Molto basso","Regole fisse, nessun ML. Intervento umano per qualsiasi modifica.",None),("LIVELLO 1","Agenti assistiti","Basso","Gli agenti analizzano e raccomandano. Ogni decisione finale resta umana.",None),("LIVELLO 2","Agenti governati","Moderato","Gli agenti decidono in un quadro rigoroso. Zone non delegabili bloccate.","★ OBIETTIVO RACCOMANDATO"),("LIVELLO 3","Autonomia supervisionata","Elevato","Gli agenti decidono e apprendono. Governance massima richiesta.",None)],
        "risk_prefix": "Rischio: ",
        "mat_progression": "Livello 0  →  Livello 1  →  Livello 2 ★  →  Livello 3",
        "mat_progression_desc": "Progressione raccomandata — ogni livello richiede una governance più matura",
        "meth_num": "04", "meth_title": "Metodologia",
        "meth_desc1": "8 moduli implementati progressivamente da 6 a 18 mesi.",
        "meth_desc2": "Ogni modulo si basa sul precedente.",
        "modules": [("MOD 01","Diagnosi di sovranità","Calcolo dello Score di sovranità. Mappatura delle zone di rischio."),("MOD 02","Mappatura decisionale","Matrice di criticità. Identificazione delle zone non delegabili."),("MOD 03","Costituzione agentica","9 articoli. Firmata dal comitato di governance."),("MOD 04","Design del sistema agente","Schede mandato, perimetri di interazione, livelli di autonomia."),("MOD 05","Sicurezza e reversibilità","Sandboxing, piano di reversibilità, progettazione protocollo di arresto."),("MOD 06","Governance continua","Revisioni mensili. Audit di conformità annuale."),("MOD 07","Roadmap","Implementazione progressiva in 5 fasi."),("MOD 08","Gestione delle crisi","Incidenti 3 livelli. Esercitazioni di simulazione arresto d'emergenza.")],
        "meth_timeline": "Implementazione raccomandata: Moduli 01-03 (Mese 1-3) → Moduli 04-06 (Mese 4-9) → Moduli 07-08 (Mese 10-18)",
        "em_num": "05", "em_title": "Protocollo di arresto d'emergenza",
        "em_intro": "Un meccanismo di arresto efficace non è un semplice pulsante. L'ACF specifica tre livelli di interruzione con tempi di risposta definiti e procedure di escalation chiare.",
        "em_levels": [("LIVELLO 1","Pausa operativa","Sospensione delle operazioni non critiche. Gli agenti continuano le attività in corso ma non avviano nuove azioni.","< 30 secondi","#22c55e"),("LIVELLO 2","Arresto decisionale","Sospensione completa di ogni processo decisionale degli agenti. Tutte le decisioni in sospeso vengono reindirizzate agli operatori umani.","< 5 secondi","#f59e0b"),("LIVELLO 3","Arresto totale del sistema","Interruzione completa di tutti i sistemi agentici. Passaggio ai processi manuali di backup.","< 1 secondo","#ef4444")],
        "em_time_prefix": "Tempo: ",
        "em_note": "Ogni livello viene testato tramite esercitazioni di simulazione trimestrali (Modulo 08)",
        "prod_num": "06", "prod_title": "I prodotti ACF®",
        "prod_intro": "Quattro prodotti complementari che operazionalizzano lo standard ACF.",
        "products": [("ACF AI Act Checker","STRUMENTO DI CONFORMITÀ","Strumento diagnostico gratuito per valutare la conformità all'EU AI Act.",["Diagnostica conformità EU AI Act","Mappatura obblighi per ruolo","Classificazione automatica del rischio"]),("ACF Score","STRUMENTO DIAGNOSTICO","Score di sovranità proprietario che misura la vostra indipendenza decisionale su 6 dimensioni di governance.",["Score composito di sovranità","Visualizzazione radar 6 assi","Piano d'azione personalizzato per asse"]),("ACF Control","PIATTAFORMA DI GOVERNANCE","Dashboard di governance in tempo reale che monitora i vostri 18 KPI di sovranità con gating adattivo.",["18 KPI su 6 assi di governance","Gating adattivo con escalation umana","Log di audit infalsificabili"]),("ACF Certification","CERTIFICAZIONE INDIPENDENTE","Certificazione indipendente che attesta la conformità allo standard di governance ACF.",["Percorso Level 1, 2 e 3","Badge pubblicamente verificabile","Rinnovo annuale + monitoraggio continuo"])],
        "about_num": "07", "about_title": "Chi siamo",
        "about_p1": "L'Agentic Commerce Framework® è stato creato da Vincent DORANGE, esperto in governance IA e fondatore di AI CONSULTING. Il framework è il risultato di diversi anni di ricerca sulla governance dei sistemi autonomi in ambienti commerciali.",
        "about_p2": "ACF® è un marchio registrato. L'intera metodologia e gli strumenti sono giuridicamente protetti.",
        "contact_label": "Contatto",
        "contact_info": [("Sito web","www.acfstandard.com"),("Standard","ACF® — Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tutti i diritti riservati.",
        "back_footer2": "ACF® è un marchio registrato. Metodologia e strumenti giuridicamente protetti.",
    },
    "pt": {
        "doc_title": "ACF® — Livro Branco",
        "cover_label": "AI CONSULTING", "cover_subtitle": "LIVRO BRANCO",
        "cover_desc1": "O padrão global de governança para sistemas",
        "cover_desc2": "agênticos autônomos em ambientes comerciais.",
        "stats": [("4","Princípios\nFundadores"),("8","Módulos de\nImplementação"),("18","KPIs de\nSoberania"),("17","Ferramentas\nProprietárias")],
        "author_label": "Autor", "date_label": "Data", "date_val": "Dezembro 2025",
        "class_label": "Classificação", "class_val": "Público",
        "toc_label": "// Sumário", "toc_title": "Sumário",
        "toc": [("01","Resumo executivo","3"),("02","O desafio do comércio agêntico","4"),("03","O framework ACF®","5"),("04","Metodologia — 8 Módulos","7"),("05","Protocolo de parada de emergência","8"),("06","Os produtos ACF®","9"),("07","Sobre","10")],
        "exec_num": "01", "exec_title": "Resumo executivo",
        "exec_p1": "O Agentic Commerce Framework® (ACF) é o padrão global de governança projetado para organizações que implantam agentes autônomos em ambientes comerciais. Criado por Vincent DORANGE, especialista em governança de IA, o ACF define uma metodologia completa com 4 princípios fundadores, 4 camadas operacionais, 8 módulos de implementação e 18 KPIs de soberania.",
        "exec_p2": "Diante da multiplicação de sistemas agênticos no comércio, finanças e operações, o ACF fornece o framework necessário para garantir que as decisões estratégicas permaneçam sob controle humano, que cada ação autônoma seja rastreável e auditável, e que mecanismos de parada de emergência estejam sempre disponíveis.",
        "exec_quote1": "«A questão não é mais se devemos implantar agentes.",
        "exec_quote2": "É como implantá-los sem ceder",
        "exec_quote3": "sua soberania decisional.»",
        "key_stats_label": "NÚMEROS-CHAVE",
        "key_stats": [("4 Princípios","Axiomas imutáveis de soberania"),("4 Camadas","Arquitetura hierárquica de governança"),("8 Módulos","Implantação progressiva de 6 a 18 meses"),("18 KPIs","Indicadores de soberania em tempo real"),("17 Ferramentas","Instrumentos proprietários de governança"),("4 Níveis","Da automação clássica à autonomia supervisionada")],
        "ch_num": "02", "ch_title": "O desafio do comércio agêntico",
        "ch_p1": "Em 2026, agentes autônomos já executam decisões em ambientes comerciais — precificação, qualificação de leads, tratamento de reclamações, gestão de contratos. A maioria das organizações não possui nenhum framework para governá-los.",
        "ch_p2": "Sem governança estruturada, cada agente implantado representa um risco jurídico, financeiro e reputacional. Decisões tomadas sem supervisão humana podem resultar em compromissos contratuais não autorizados, violações regulatórias ou perdas financeiras irreversíveis.",
        "ch_p3": "O ACF® foi criado para preencher esse vazio — antes que uma falha de governança se torne uma crise legal, financeira ou reputacional.",
        "risks_label": "RISCOS IDENTIFICADOS",
        "risks": [("Risco jurídico","Compromissos contratuais sem autorização humana"),("Risco financeiro","Decisões de precificação não supervisionadas"),("Risco regulatório","Não conformidade com EU AI Act"),("Risco reputacional","Ações de agentes visíveis sem controle"),("Risco operacional","Cascatas de decisões sem mecanismo de parada")],
        "fw_num": "03", "fw_title": "O framework ACF®",
        "fw_principles_title": "Os 4 Princípios Fundadores",
        "principles": [("P1","Separação decisão / execução","Decisões estratégicas críticas nunca são delegadas a agentes autônomos."),("P2","Zonas não delegáveis","Certas decisões são estritamente reservadas ao humano."),("P3","Rastreabilidade e interruptibilidade","Cada ação autônoma é auditável e o sistema pode ser interrompido a qualquer momento."),("P4","Governança viva","O framework de governança evolui continuamente com as capacidades dos agentes.")],
        "fw_layers_title": "As 4 Camadas Operacionais",
        "layers": [("C1","Estratégica","Carta de soberania, comitê de governança, matriz RACI"),("C2","Tática","Objetivos ponderados, regras de arbitragem, limiares de escalada"),("C3","Operacional","Mandatos por agente, perímetros de interação, taxonomia 5 categorias"),("C4","Técnica","Gating adaptativo, alertas multinível, 18 KPIs, dashboards em tempo real")],
        "mat_cont": "03 // Continuação",
        "mat_title": "Os 4 Níveis de Maturidade Agêntica",
        "mat_desc": "O ACF classifica os sistemas por nível de autonomia. O Nível 2 é o objetivo recomendado.",
        "levels": [("NÍVEL 0","Automação clássica","Muito baixo","Regras fixas, sem ML. Intervenção humana para qualquer modificação.",None),("NÍVEL 1","Agentes assistidos","Baixo","Os agentes analisam e recomendam. Cada decisão final permanece humana.",None),("NÍVEL 2","Agentes governados","Moderado","Os agentes decidem em um quadro estrito. Zonas não delegáveis bloqueadas.","★ OBJETIVO RECOMENDADO"),("NÍVEL 3","Autonomia supervisionada","Elevado","Os agentes decidem e aprendem. Governança máxima requerida.",None)],
        "risk_prefix": "Risco: ",
        "mat_progression": "Nível 0  →  Nível 1  →  Nível 2 ★  →  Nível 3",
        "mat_progression_desc": "Progressão recomendada — cada nível requer uma governança mais madura",
        "meth_num": "04", "meth_title": "Metodologia",
        "meth_desc1": "8 módulos implantados progressivamente de 6 a 18 meses.",
        "meth_desc2": "Cada módulo se baseia no anterior.",
        "modules": [("MOD 01","Diagnóstico de soberania","Cálculo do Score de soberania. Mapeamento das zonas de risco."),("MOD 02","Mapeamento decisional","Matriz de criticidade. Identificação das zonas não delegáveis."),("MOD 03","Constituição agêntica","9 artigos. Assinada pelo comitê de governança."),("MOD 04","Design do sistema agente","Fichas de mandato, perímetros de interação, níveis de autonomia."),("MOD 05","Segurança e reversibilidade","Sandboxing, plano de reversibilidade, design do protocolo de parada."),("MOD 06","Governança contínua","Revisões mensais. Auditoria de conformidade anual."),("MOD 07","Roadmap","Implantação progressiva em 5 fases."),("MOD 08","Gestão de crise","Incidentes 3 níveis. Exercícios de simulação de parada de emergência.")],
        "meth_timeline": "Implantação recomendada: Módulos 01-03 (Mês 1-3) → Módulos 04-06 (Mês 4-9) → Módulos 07-08 (Mês 10-18)",
        "em_num": "05", "em_title": "Protocolo de parada de emergência",
        "em_intro": "Um mecanismo de parada eficaz não é um simples botão. O ACF especifica três níveis de interrupção com tempos de resposta definidos e procedimentos de escalada claros.",
        "em_levels": [("NÍVEL 1","Pausa operacional","Suspensão de operações não críticas. Os agentes continuam tarefas em curso mas não iniciam novas ações.","< 30 segundos","#22c55e"),("NÍVEL 2","Parada decisional","Suspensão completa de toda tomada de decisão por agentes. Todas as decisões pendentes são redirecionadas para operadores humanos.","< 5 segundos","#f59e0b"),("NÍVEL 3","Parada total do sistema","Interrupção completa de todos os sistemas agênticos. Mudança para processos manuais de backup.","< 1 segundo","#ef4444")],
        "em_time_prefix": "Tempo: ",
        "em_note": "Cada nível é testado por meio de exercícios de simulação trimestrais (Módulo 08)",
        "prod_num": "06", "prod_title": "Os produtos ACF®",
        "prod_intro": "Quatro produtos complementares que operacionalizam o padrão ACF.",
        "products": [("ACF AI Act Checker","FERRAMENTA DE CONFORMIDADE","Ferramenta de diagnóstico gratuita para avaliar sua conformidade com o EU AI Act.",["Diagnóstico de conformidade EU AI Act","Mapeamento de obrigações por papel","Classificação automática de risco"]),("ACF Score","FERRAMENTA DIAGNÓSTICA","Score de soberania proprietário que mede sua independência decisional em 6 dimensões de governança.",["Score composto de soberania","Visualização radar 6 eixos","Plano de ação personalizado por eixo"]),("ACF Control","PLATAFORMA DE GOVERNANÇA","Dashboard de governança em tempo real que monitora seus 18 KPIs de soberania com gating adaptativo.",["18 KPIs em 6 eixos de governança","Gating adaptativo com escalada humana","Logs de auditoria infalsificáveis"]),("ACF Certification","CERTIFICAÇÃO INDEPENDENTE","Certificação independente que atesta a conformidade ao padrão de governança ACF.",["Percurso Level 1, 2 e 3","Badge publicamente verificável","Renovação anual + monitoramento contínuo"])],
        "about_num": "07", "about_title": "Sobre",
        "about_p1": "O Agentic Commerce Framework® foi criado por Vincent DORANGE, especialista em governança de IA e fundador da AI CONSULTING. O framework é o resultado de vários anos de pesquisa sobre governança de sistemas autônomos em ambientes comerciais.",
        "about_p2": "ACF® é uma marca registrada. Toda a metodologia e ferramentas são juridicamente protegidas.",
        "contact_label": "Contato",
        "contact_info": [("Site","www.acfstandard.com"),("Padrão","ACF® — Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Todos os direitos reservados.",
        "back_footer2": "ACF® é uma marca registrada. Metodologia e ferramentas juridicamente protegidas.",
    },
    "nl": {
        "doc_title": "ACF® — Whitepaper",
        "cover_label": "AI CONSULTING", "cover_subtitle": "WHITEPAPER",
        "cover_desc1": "De wereldwijde governance-standaard voor autonome",
        "cover_desc2": "agentische systemen in commerciële omgevingen.",
        "stats": [("4","Grond-\nbeginselen"),("8","Implementatie-\nmodules"),("18","Soevereiniteits-\nKPI's"),("17","Eigen\nTools")],
        "author_label": "Auteur", "date_label": "Datum", "date_val": "December 2025",
        "class_label": "Classificatie", "class_val": "Openbaar",
        "toc_label": "// Inhoud", "toc_title": "Inhoudsopgave",
        "toc": [("01","Samenvatting","3"),("02","De agentische uitdaging","4"),("03","Het ACF® framework","5"),("04","Methodologie — 8 Modules","7"),("05","Noodstopprotocol","8"),("06","ACF® Producten","9"),("07","Over ons","10")],
        "exec_num": "01", "exec_title": "Samenvatting",
        "exec_p1": "Het Agentic Commerce Framework® (ACF) is de wereldwijde governance-standaard voor organisaties die autonome agenten inzetten in commerciële omgevingen. Ontwikkeld door Vincent DORANGE, AI-governance expert, definieert het ACF een uitgebreide methodologie met 4 grondbeginselen, 4 operationele lagen, 8 implementatiemodules en 18 soevereiniteits-KPI's.",
        "exec_p2": "Gezien de toename van agentische systemen in handel, financiën en operaties biedt het ACF het nodige kader om ervoor te zorgen dat strategische beslissingen onder menselijke controle blijven, dat elke autonome actie traceerbaar en controleerbaar is, en dat noodstopmaatregelen altijd beschikbaar zijn.",
        "exec_quote1": "«De vraag is niet meer of agenten ingezet moeten worden.",
        "exec_quote2": "Maar hoe ze in te zetten zonder uw",
        "exec_quote3": "beslissingssoevereiniteit op te geven.»",
        "key_stats_label": "KERNGETALLEN",
        "key_stats": [("4 Principes","Onveranderlijke axioma's van soevereiniteit"),("4 Lagen","Hiërarchische governance-architectuur"),("8 Modules","Progressieve uitrol over 6-18 maanden"),("18 KPI's","Real-time soevereiniteitsindicatoren"),("17 Tools","Eigen governance-instrumenten"),("4 Niveaus","Van klassieke automatisering tot bewaakt autonomie")],
        "ch_num": "02", "ch_title": "De agentische uitdaging",
        "ch_p1": "In 2026 nemen autonome agenten al beslissingen in commerciële omgevingen — prijsstelling, leadkwalificatie, klachtenafhandeling, contractbeheer. De meeste organisaties hebben geen kader om ze te besturen.",
        "ch_p2": "Zonder gestructureerd governance vormt elke ingezette agent een juridisch, financieel en reputatierisico. Beslissingen zonder menselijk toezicht kunnen leiden tot ongeautoriseerde contractuele verplichtingen, regelgevende overtredingen of onomkeerbare financiële verliezen.",
        "ch_p3": "Het ACF® is gecreëerd om deze leemte te vullen — voordat een governance-falen een juridische, financiële of reputatiecrisis wordt.",
        "risks_label": "GEÏDENTIFICEERDE RISICO'S",
        "risks": [("Juridisch risico","Contractuele verplichtingen zonder menselijke goedkeuring"),("Financieel risico","Onbewaakte prijs- en investeringsbeslissingen"),("Regelgevend risico","Niet-naleving van de EU AI Act"),("Reputatierisico","Zichtbare agentenacties zonder controle"),("Operationeel risico","Beslissingscascades zonder stopmechanisme")],
        "fw_num": "03", "fw_title": "Het ACF® framework",
        "fw_principles_title": "De 4 Grondbeginselen",
        "principles": [("P1","Scheiding beslissing / uitvoering","Kritische strategische beslissingen worden nooit aan autonome agenten gedelegeerd."),("P2","Niet-delegeerbare zones","Bepaalde beslissingen zijn strikt voorbehouden aan de mens."),("P3","Traceerbaarheid & onderbrekbaarheid","Elke autonome actie is controleerbaar en het systeem kan op elk moment worden onderbroken."),("P4","Levende governance","Het governance-kader evolueert continu met de mogelijkheden van de agenten.")],
        "fw_layers_title": "De 4 Operationele Lagen",
        "layers": [("C1","Strategisch","Soevereiniteitscharter, governance-comité, RACI-matrix"),("C2","Tactisch","Gewogen doelstellingen, arbitrageregels, escalatiedrempels"),("C3","Operationeel","Mandaatkaarten per agent, interactieperimeters, 5-categorieëntaxonomie"),("C4","Technisch","Adaptieve gating, meervoudige alarmen, 18 KPI's, real-time dashboards")],
        "mat_cont": "03 // Vervolg",
        "mat_title": "De 4 Agentische Volwassenheidsniveaus",
        "mat_desc": "Het ACF classificeert systemen op autonomieniveau. Niveau 2 is het aanbevolen doel.",
        "levels": [("NIVEAU 0","Klassieke automatisering","Zeer laag","Vaste regels, geen ML. Menselijke interventie bij elke wijziging.",None),("NIVEAU 1","Ondersteunde agenten","Laag","Agenten analyseren en adviseren. Elke eindbeslissing blijft menselijk.",None),("NIVEAU 2","Bestuurde agenten","Matig","Agenten beslissen binnen een strikt kader. Niet-delegeerbare zones vergrendeld.","★ AANBEVOLEN DOEL"),("NIVEAU 3","Bewaakte autonomie","Hoog","Agenten beslissen en leren. Maximale governance vereist.",None)],
        "risk_prefix": "Risico: ",
        "mat_progression": "Niveau 0  →  Niveau 1  →  Niveau 2 ★  →  Niveau 3",
        "mat_progression_desc": "Aanbevolen progressie — elk niveau vereist een rijpere governance",
        "meth_num": "04", "meth_title": "Methodologie",
        "meth_desc1": "8 modules, progressief uitgerold over 6 tot 18 maanden.",
        "meth_desc2": "Elke module bouwt voort op de vorige.",
        "modules": [("MOD 01","Soevereiniteitsdiagnose","Berekening van de Soevereiniteitsscore. Mapping van risicozones."),("MOD 02","Beslissingscartografie","Kritikaliteitsmatrix. Identificatie van niet-delegeerbare zones."),("MOD 03","Agentische grondwet","9 artikelen. Ondertekend door het governance-comité."),("MOD 04","Agentsysteemontwerp","Mandaatkaarten, interactieperimeters, autonomieniveaus."),("MOD 05","Veiligheid & reversibiliteit","Sandboxing, reversibiliteitsplan, noodstopprotocolontwerp."),("MOD 06","Continue governance","Maandelijkse reviews. Jaarlijks conformiteitsaudit."),("MOD 07","Routekaart","Progressieve uitrol in 5 fasen."),("MOD 08","Crisismanagement","3-niveau incidenten. Noodstopsimulatie-oefeningen.")],
        "meth_timeline": "Aanbevolen uitrol: Modules 01-03 (Maand 1-3) → Modules 04-06 (Maand 4-9) → Modules 07-08 (Maand 10-18)",
        "em_num": "05", "em_title": "Noodstopprotocol",
        "em_intro": "Een effectief stopmechanisme is geen simpele knop. Het ACF specificeert drie onderbrekingsniveaus met gedefinieerde responstijden en duidelijke escalatieprocedures.",
        "em_levels": [("NIVEAU 1","Operationele pauze","Opschorting van niet-kritische operaties. Agenten zetten lopende taken voort maar starten geen nieuwe acties.","< 30 seconden","#22c55e"),("NIVEAU 2","Beslissingsstop","Volledige opschorting van alle agentbeslissingen. Alle openstaande beslissingen worden doorverwezen naar menselijke operators.","< 5 seconden","#f59e0b"),("NIVEAU 3","Totale systeemstop","Volledige onderbreking van alle agentische systemen. Overschakeling naar handmatige back-upprocessen.","< 1 seconde","#ef4444")],
        "em_time_prefix": "Tijd: ",
        "em_note": "Elk niveau wordt getest via driemaandelijkse simulatie-oefeningen (Module 08)",
        "prod_num": "06", "prod_title": "ACF® Producten",
        "prod_intro": "Vier complementaire producten die de ACF-standaard operationaliseren.",
        "products": [("ACF AI Act Checker","COMPLIANCE TOOL","Gratis diagnosetool om uw naleving van de EU AI Act te beoordelen.",["EU AI Act compliance diagnose","Rolgebaseerde verplichtingsmapping","Automatische risicoclassificatie"]),("ACF Score","DIAGNOSTISCH INSTRUMENT","Eigen soevereiniteitsscore die uw beslissingsOnafhankelijkheid meet over 6 governance-dimensies.",["Samengestelde soevereiniteitsscore","6-as radarvisualisatie","Gepersonaliseerd actieplan per as"]),("ACF Control","GOVERNANCE-PLATFORM","Real-time governance dashboard dat uw 18 soevereiniteits-KPI's bewaakt met adaptieve gating.",["18 KPI's over 6 governance-assen","Adaptieve gating met menselijke escalatie","Onvervalsbare auditlogs"]),("ACF Certification","ONAFHANKELIJKE CERTIFICERING","Onafhankelijke certificering die conformiteit met de ACF-governance-standaard bevestigt.",["Level 1, 2 en 3 traject","Openbaar verifieerbaar badge","Jaarlijkse vernieuwing + continue monitoring"])],
        "about_num": "07", "about_title": "Over ons",
        "about_p1": "Het Agentic Commerce Framework® is gecreëerd door Vincent DORANGE, AI-governance expert en oprichter van AI CONSULTING. Het framework is het resultaat van meerdere jaren onderzoek naar governance van autonome systemen in commerciële omgevingen.",
        "about_p2": "ACF® is een gedeponeerd merk. De volledige methodologie en tools zijn juridisch beschermd.",
        "contact_label": "Contact",
        "contact_info": [("Website","www.acfstandard.com"),("Standaard","ACF® — Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Alle rechten voorbehouden.",
        "back_footer2": "ACF® is een gedeponeerd merk. Methodologie en tools juridisch beschermd.",
    },
    "ru": {
        "doc_title": "ACF® — White Paper",
        "cover_label": "AI CONSULTING", "cover_subtitle": "WHITE PAPER",
        "cover_desc1": "Global governance standard for autonomous",
        "cover_desc2": "agentic systems in commercial environments.",
        "stats": [("4","Founding\nPrinciples"),("8","Implementation\nModules"),("18","Sovereignty\nKPIs"),("17","Proprietary\nTools")],
        "author_label": "Author", "date_label": "Date", "date_val": "December 2025",
        "class_label": "Classification", "class_val": "Public",
        "toc_label": "// Contents", "toc_title": "Table of Contents",
        "toc": [("01","Executive Summary","3"),("02","The Agentic Commerce Challenge","4"),("03","The ACF® Framework","5"),("04","Methodology — 8 Modules","7"),("05","Emergency Stop Protocol","8"),("06","ACF® Products","9"),("07","About","10")],
        "exec_num": "01", "exec_title": "Executive Summary",
        "exec_p1": "The Agentic Commerce Framework® (ACF) is the global governance standard designed for organizations deploying autonomous agents in commercial environments. Created by Vincent DORANGE, AI governance expert, the ACF defines a comprehensive methodology with 4 founding principles, 4 operational layers, 8 implementation modules and 18 sovereignty KPIs.",
        "exec_p2": "Facing the multiplication of agentic systems in commerce, finance and operations, the ACF provides the framework needed to ensure strategic decisions remain under human control, every autonomous action is traceable and auditable, and emergency stop mechanisms are always available.",
        "exec_quote1": "\"The question is no longer whether to deploy agents.",
        "exec_quote2": "It is how to deploy them without surrendering",
        "exec_quote3": "your decisional sovereignty.\"",
        "key_stats_label": "KEY FIGURES",
        "key_stats": [("4 Principles","Immutable sovereignty axioms"),("4 Layers","Hierarchical governance architecture"),("8 Modules","Progressive deployment over 6-18 months"),("18 KPIs","Real-time sovereignty indicators"),("17 Tools","Proprietary governance instruments"),("4 Levels","From classic automation to supervised autonomy")],
        "ch_num": "02", "ch_title": "The Agentic Commerce Challenge",
        "ch_p1": "In 2026, autonomous agents already execute decisions in commercial environments — pricing, lead qualification, claims processing, contract management. Most organizations have no framework to govern them.",
        "ch_p2": "Without structured governance, every deployed agent represents a legal, financial and reputational risk. Decisions taken without human supervision can lead to unauthorized contractual commitments, regulatory violations or irreversible financial losses.",
        "ch_p3": "The ACF® was created to fill this void — before a governance failure becomes a legal, financial or reputational crisis.",
        "risks_label": "IDENTIFIED RISKS",
        "risks": [("Legal risk","Contractual commitments without human authorization"),("Financial risk","Unsupervised pricing and investment decisions"),("Regulatory risk","Non-compliance with EU AI Act"),("Reputational risk","Visible agent actions without control"),("Operational risk","Decision cascades without stop mechanism")],
        "fw_num": "03", "fw_title": "The ACF® Framework",
        "fw_principles_title": "The 4 Founding Principles",
        "principles": [("P1","Decision / execution separation","Critical strategic decisions are never delegated to autonomous agents."),("P2","Non-delegable zones","Certain decisions are strictly reserved for humans."),("P3","Traceability & interruptibility","Every autonomous action is auditable and the system can be interrupted at any time."),("P4","Living governance","The governance framework evolves continuously with agent capabilities.")],
        "fw_layers_title": "The 4 Operational Layers",
        "layers": [("C1","Strategic","Sovereignty charter, governance committee, RACI matrix"),("C2","Tactical","Weighted objectives, arbitration rules, escalation thresholds"),("C3","Operational","Agent mandates, interaction perimeters, 5-category taxonomy"),("C4","Technical","Adaptive gating, multi-level alerts, 18 KPIs, real-time dashboards")],
        "mat_cont": "03 // Continued",
        "mat_title": "The 4 Agentic Maturity Levels",
        "mat_desc": "The ACF classifies systems by autonomy level. Level 2 is the recommended target.",
        "levels": [("LEVEL 0","Classic automation","Very low","Fixed rules, no ML. Human intervention for any modification.",None),("LEVEL 1","Assisted agents","Low","Agents analyze and recommend. Every final decision remains human.",None),("LEVEL 2","Governed agents","Moderate","Agents decide within a strict framework. Non-delegable zones locked.","★ RECOMMENDED TARGET"),("LEVEL 3","Supervised autonomy","High","Agents decide and learn. Maximum governance required.",None)],
        "risk_prefix": "Risk: ",
        "mat_progression": "Level 0  →  Level 1  →  Level 2 ★  →  Level 3",
        "mat_progression_desc": "Recommended progression — each level requires more mature governance",
        "meth_num": "04", "meth_title": "Methodology",
        "meth_desc1": "8 modules deployed progressively over 6 to 18 months.",
        "meth_desc2": "Each module builds on the previous one.",
        "modules": [("MOD 01","Sovereignty diagnosis","Sovereignty Score calculation. Risk zone mapping."),("MOD 02","Decision mapping","Criticality matrix. Non-delegable zone identification."),("MOD 03","Agentic constitution","9 articles. Signed by governance committee."),("MOD 04","Agent system design","Mandate cards, interaction perimeters, autonomy levels."),("MOD 05","Security & reversibility","Sandboxing, reversibility plan, stop protocol design."),("MOD 06","Continuous governance","Monthly reviews. Annual compliance audit."),("MOD 07","Roadmap","Progressive rollout in 5 phases."),("MOD 08","Crisis management","3-level incidents. Emergency stop simulation exercises.")],
        "meth_timeline": "Recommended rollout: Modules 01-03 (Month 1-3) → Modules 04-06 (Month 4-9) → Modules 07-08 (Month 10-18)",
        "em_num": "05", "em_title": "Emergency Stop Protocol",
        "em_intro": "An effective stop mechanism is not a simple button. The ACF specifies three interruption levels with defined response times and clear escalation procedures.",
        "em_levels": [("LEVEL 1","Operational pause","Suspension of non-critical operations. Agents continue current tasks but do not initiate new actions.","< 30 seconds","#22c55e"),("LEVEL 2","Decision stop","Complete suspension of all agent decision-making. All pending decisions redirected to human operators.","< 5 seconds","#f59e0b"),("LEVEL 3","Total system stop","Complete interruption of all agentic systems. Switch to manual backup processes.","< 1 second","#ef4444")],
        "em_time_prefix": "Time: ",
        "em_note": "Each level is tested via quarterly simulation exercises (Module 08)",
        "prod_num": "06", "prod_title": "ACF® Products",
        "prod_intro": "Four complementary products operationalizing the ACF standard.",
        "products": [("ACF AI Act Checker","COMPLIANCE TOOL","Free diagnostic tool to assess your compliance with the EU AI Act. Identify your obligations based on your role and risk level.",["EU AI Act compliance diagnostic","Role-based obligation mapping","Automated risk classification"]),("ACF Score","DIAGNOSTIC TOOL","Proprietary sovereignty score measuring your decisional independence across 6 governance dimensions.",["Composite sovereignty score","6-axis radar visualization","Personalized action plan per axis"]),("ACF Control","GOVERNANCE PLATFORM","Real-time governance dashboard monitoring your 18 sovereignty KPIs with adaptive gating.",["18 KPIs across 6 governance axes","Adaptive gating with human escalation","Tamper-proof audit logs"]),("ACF Certification","INDEPENDENT CERTIFICATION","Independent certification attesting compliance with the ACF governance standard.",["Level 1, 2 and 3 pathway","Publicly verifiable badge","Annual renewal + continuous monitoring"])],
        "about_num": "07", "about_title": "About",
        "about_p1": "The Agentic Commerce Framework® was created by Vincent DORANGE, AI governance expert and founder of AI CONSULTING. The framework is the result of several years of research on autonomous system governance in commercial environments.",
        "about_p2": "ACF® is a registered trademark. The entire methodology and tools are legally protected.",
        "contact_label": "Contact",
        "contact_info": [("Website","www.acfstandard.com"),("Standard","ACF® — Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.",
        "back_footer2": "ACF® is a registered trademark. Methodology and tools legally protected.",
    },
    "ar": {
        "doc_title": "ACF® — White Paper",
        "cover_label": "AI CONSULTING", "cover_subtitle": "WHITE PAPER",
        "cover_desc1": "Global governance standard for autonomous",
        "cover_desc2": "agentic systems in commercial environments.",
        "stats": [("4","Founding\nPrinciples"),("8","Implementation\nModules"),("18","Sovereignty\nKPIs"),("17","Proprietary\nTools")],
        "author_label": "Author", "date_label": "Date", "date_val": "December 2025",
        "class_label": "Classification", "class_val": "Public",
        "toc_label": "// Contents", "toc_title": "Table of Contents",
        "toc": [("01","Executive Summary","3"),("02","The Agentic Commerce Challenge","4"),("03","The ACF® Framework","5"),("04","Methodology — 8 Modules","7"),("05","Emergency Stop Protocol","8"),("06","ACF® Products","9"),("07","About","10")],
        "exec_num": "01", "exec_title": "Executive Summary",
        "exec_p1": "The Agentic Commerce Framework® (ACF) is the global governance standard designed for organizations deploying autonomous agents in commercial environments. Created by Vincent DORANGE, AI governance expert, the ACF defines a comprehensive methodology with 4 founding principles, 4 operational layers, 8 implementation modules and 18 sovereignty KPIs.",
        "exec_p2": "Facing the multiplication of agentic systems in commerce, finance and operations, the ACF provides the framework needed to ensure strategic decisions remain under human control, every autonomous action is traceable and auditable, and emergency stop mechanisms are always available.",
        "exec_quote1": "\"The question is no longer whether to deploy agents.",
        "exec_quote2": "It is how to deploy them without surrendering",
        "exec_quote3": "your decisional sovereignty.\"",
        "key_stats_label": "KEY FIGURES",
        "key_stats": [("4 Principles","Immutable sovereignty axioms"),("4 Layers","Hierarchical governance architecture"),("8 Modules","Progressive deployment over 6-18 months"),("18 KPIs","Real-time sovereignty indicators"),("17 Tools","Proprietary governance instruments"),("4 Levels","From classic automation to supervised autonomy")],
        "ch_num": "02", "ch_title": "The Agentic Commerce Challenge",
        "ch_p1": "In 2026, autonomous agents already execute decisions in commercial environments — pricing, lead qualification, claims processing, contract management. Most organizations have no framework to govern them.",
        "ch_p2": "Without structured governance, every deployed agent represents a legal, financial and reputational risk. Decisions taken without human supervision can lead to unauthorized contractual commitments, regulatory violations or irreversible financial losses.",
        "ch_p3": "The ACF® was created to fill this void — before a governance failure becomes a legal, financial or reputational crisis.",
        "risks_label": "IDENTIFIED RISKS",
        "risks": [("Legal risk","Contractual commitments without human authorization"),("Financial risk","Unsupervised pricing and investment decisions"),("Regulatory risk","Non-compliance with EU AI Act"),("Reputational risk","Visible agent actions without control"),("Operational risk","Decision cascades without stop mechanism")],
        "fw_num": "03", "fw_title": "The ACF® Framework",
        "fw_principles_title": "The 4 Founding Principles",
        "principles": [("P1","Decision / execution separation","Critical strategic decisions are never delegated to autonomous agents."),("P2","Non-delegable zones","Certain decisions are strictly reserved for humans."),("P3","Traceability & interruptibility","Every autonomous action is auditable and the system can be interrupted at any time."),("P4","Living governance","The governance framework evolves continuously with agent capabilities.")],
        "fw_layers_title": "The 4 Operational Layers",
        "layers": [("C1","Strategic","Sovereignty charter, governance committee, RACI matrix"),("C2","Tactical","Weighted objectives, arbitration rules, escalation thresholds"),("C3","Operational","Agent mandates, interaction perimeters, 5-category taxonomy"),("C4","Technical","Adaptive gating, multi-level alerts, 18 KPIs, real-time dashboards")],
        "mat_cont": "03 // Continued",
        "mat_title": "The 4 Agentic Maturity Levels",
        "mat_desc": "The ACF classifies systems by autonomy level. Level 2 is the recommended target.",
        "levels": [("LEVEL 0","Classic automation","Very low","Fixed rules, no ML. Human intervention for any modification.",None),("LEVEL 1","Assisted agents","Low","Agents analyze and recommend. Every final decision remains human.",None),("LEVEL 2","Governed agents","Moderate","Agents decide within a strict framework. Non-delegable zones locked.","★ RECOMMENDED TARGET"),("LEVEL 3","Supervised autonomy","High","Agents decide and learn. Maximum governance required.",None)],
        "risk_prefix": "Risk: ",
        "mat_progression": "Level 0  →  Level 1  →  Level 2 ★  →  Level 3",
        "mat_progression_desc": "Recommended progression — each level requires more mature governance",
        "meth_num": "04", "meth_title": "Methodology",
        "meth_desc1": "8 modules deployed progressively over 6 to 18 months.",
        "meth_desc2": "Each module builds on the previous one.",
        "modules": [("MOD 01","Sovereignty diagnosis","Sovereignty Score calculation. Risk zone mapping."),("MOD 02","Decision mapping","Criticality matrix. Non-delegable zone identification."),("MOD 03","Agentic constitution","9 articles. Signed by governance committee."),("MOD 04","Agent system design","Mandate cards, interaction perimeters, autonomy levels."),("MOD 05","Security & reversibility","Sandboxing, reversibility plan, stop protocol design."),("MOD 06","Continuous governance","Monthly reviews. Annual compliance audit."),("MOD 07","Roadmap","Progressive rollout in 5 phases."),("MOD 08","Crisis management","3-level incidents. Emergency stop simulation exercises.")],
        "meth_timeline": "Recommended rollout: Modules 01-03 (Month 1-3) → Modules 04-06 (Month 4-9) → Modules 07-08 (Month 10-18)",
        "em_num": "05", "em_title": "Emergency Stop Protocol",
        "em_intro": "An effective stop mechanism is not a simple button. The ACF specifies three interruption levels with defined response times and clear escalation procedures.",
        "em_levels": [("LEVEL 1","Operational pause","Suspension of non-critical operations. Agents continue current tasks but do not initiate new actions.","< 30 seconds","#22c55e"),("LEVEL 2","Decision stop","Complete suspension of all agent decision-making. All pending decisions redirected to human operators.","< 5 seconds","#f59e0b"),("LEVEL 3","Total system stop","Complete interruption of all agentic systems. Switch to manual backup processes.","< 1 second","#ef4444")],
        "em_time_prefix": "Time: ",
        "em_note": "Each level is tested via quarterly simulation exercises (Module 08)",
        "prod_num": "06", "prod_title": "ACF® Products",
        "prod_intro": "Four complementary products operationalizing the ACF standard.",
        "products": [("ACF AI Act Checker","COMPLIANCE TOOL","Free diagnostic tool to assess your compliance with the EU AI Act. Identify your obligations based on your role and risk level.",["EU AI Act compliance diagnostic","Role-based obligation mapping","Automated risk classification"]),("ACF Score","DIAGNOSTIC TOOL","Proprietary sovereignty score measuring your decisional independence across 6 governance dimensions.",["Composite sovereignty score","6-axis radar visualization","Personalized action plan per axis"]),("ACF Control","GOVERNANCE PLATFORM","Real-time governance dashboard monitoring your 18 sovereignty KPIs with adaptive gating.",["18 KPIs across 6 governance axes","Adaptive gating with human escalation","Tamper-proof audit logs"]),("ACF Certification","INDEPENDENT CERTIFICATION","Independent certification attesting compliance with the ACF governance standard.",["Level 1, 2 and 3 pathway","Publicly verifiable badge","Annual renewal + continuous monitoring"])],
        "about_num": "07", "about_title": "About",
        "about_p1": "The Agentic Commerce Framework® was created by Vincent DORANGE, AI governance expert and founder of AI CONSULTING. The framework is the result of several years of research on autonomous system governance in commercial environments.",
        "about_p2": "ACF® is a registered trademark. The entire methodology and tools are legally protected.",
        "contact_label": "Contact",
        "contact_info": [("Website","www.acfstandard.com"),("Standard","ACF® — Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.",
        "back_footer2": "ACF® is a registered trademark. Methodology and tools legally protected.",
    },
    "tr": {
        "doc_title": "ACF® — Teknik Rapor",
        "cover_label": "AI CONSULTING", "cover_subtitle": "TEKNİK RAPOR",
        "cover_desc1": "Ticari ortamlarda otonom ajantik sistemler",
        "cover_desc2": "için küresel yönetişim standardı.",
        "stats": [("4","Kurucu\nİlke"),("8","Uygulama\nModülü"),("18","Egemenlik\nKPI'ları"),("17","Tescilli\nAraçlar")],
        "author_label": "Yazar", "date_label": "Tarih", "date_val": "Aralık 2025",
        "class_label": "Sınıflandırma", "class_val": "Halka Açık",
        "toc_label": "// İçindekiler", "toc_title": "İçindekiler",
        "toc": [("01","Yönetici Özeti","3"),("02","Ajantik Ticaret Zorluğu","4"),("03","ACF® Çerçevesi","5"),("04","Metodoloji — 8 Modül","7"),("05","Acil Durdurma Protokolü","8"),("06","ACF® Ürünleri","9"),("07","Hakkında","10")],
        "exec_num": "01", "exec_title": "Yönetici Özeti",
        "exec_p1": "Agentic Commerce Framework® (ACF), ticari ortamlarda otonom ajanlar konuşlandıran kuruluşlar için tasarlanmış küresel yönetişim standardıdır. Yapay zeka yönetişim uzmanı Vincent DORANGE tarafından oluşturulan ACF, 4 kurucu ilke, 4 operasyonel katman, 8 uygulama modülü ve 18 egemenlik KPI'sı içeren kapsamlı bir metodoloji tanımlar.",
        "exec_p2": "Ticaret, finans ve operasyonlarda ajantik sistemlerin çoğalmasıyla karşı karşıya kalan ACF, stratejik kararların insan kontrolünde kalmasını, her otonom eylemin izlenebilir ve denetlenebilir olmasını ve acil durdurma mekanizmalarının her zaman mevcut olmasını sağlamak için gerekli çerçeveyi sunar.",
        "exec_quote1": "«Soru artık ajanları konuşlandırıp konuşlandırmamak değil.",
        "exec_quote2": "Karar egemenliğinizi teslim etmeden",
        "exec_quote3": "onları nasıl konuşlandıracağınızdır.»",
        "key_stats_label": "TEMEL RAKAMLAR",
        "key_stats": [("4 İlke","Değişmez egemenlik aksiyomları"),("4 Katman","Hiyerarşik yönetişim mimarisi"),("8 Modül","6-18 ay içinde aşamalı dağıtım"),("18 KPI","Gerçek zamanlı egemenlik göstergeleri"),("17 Araç","Tescilli yönetişim enstrümanları"),("4 Seviye","Klasik otomasyondan denetimli özerkliğe")],
        "ch_num": "02", "ch_title": "Ajantik Ticaret Zorluğu",
        "ch_p1": "2026'da otonom ajanlar ticari ortamlarda zaten kararlar yürütüyor — fiyatlandırma, müşteri adayı nitelendirme, şikayet işleme, sözleşme yönetimi. Çoğu kuruluşun bunları yönetmek için hiçbir çerçevesi yok.",
        "ch_p2": "Yapılandırılmış yönetişim olmadan, konuşlandırılan her ajan hukuki, finansal ve itibar riski temsil eder. İnsan denetimi olmadan alınan kararlar yetkisiz sözleşme taahhütlerine, düzenleyici ihlallere veya geri dönüşü olmayan mali kayıplara yol açabilir.",
        "ch_p3": "ACF®, bir yönetişim başarısızlığı hukuki, finansal veya itibar krizine dönüşmeden önce bu boşluğu doldurmak için oluşturuldu.",
        "risks_label": "TESPİT EDİLEN RİSKLER",
        "risks": [("Hukuki risk","İnsan onayı olmadan sözleşme taahhütleri"),("Finansal risk","Denetimsiz fiyatlandırma ve yatırım kararları"),("Düzenleyici risk","EU AI Act'e uyumsuzluk"),("İtibar riski","Kontrolsüz görünür ajan eylemleri"),("Operasyonel risk","Durdurma mekanizması olmayan karar çığları")],
        "fw_num": "03", "fw_title": "ACF® Çerçevesi",
        "fw_principles_title": "4 Kurucu İlke",
        "principles": [("P1","Karar / yürütme ayrımı","Kritik stratejik kararlar asla otonom ajanlara devredilmez."),("P2","Devredilemez bölgeler","Belirli kararlar kesinlikle insana aittir."),("P3","İzlenebilirlik ve durdurabiliirlik","Her otonom eylem denetlenebilir ve sistem herhangi bir anda durdurulabilir."),("P4","Yaşayan yönetişim","Yönetişim çerçevesi ajan yetenekleriyle sürekli gelişir.")],
        "fw_layers_title": "4 Operasyonel Katman",
        "layers": [("C1","Stratejik","Egemenlik şartı, yönetişim komitesi, RACI matrisi"),("C2","Taktik","Ağırlıklı hedefler, tahkim kuralları, eskalasyon eşikleri"),("C3","Operasyonel","Ajan mandaları, etkileşim çevreleri, 5 kategori taksonomisi"),("C4","Teknik","Uyarlanabilir geçit, çok seviyeli uyarılar, 18 KPI, gerçek zamanlı panolar")],
        "mat_cont": "03 // Devam",
        "mat_title": "4 Ajantik Olgunluk Seviyesi",
        "mat_desc": "ACF, sistemleri özerklik seviyesine göre sınıflandırır. Seviye 2 önerilen hedeftir.",
        "levels": [("SEVİYE 0","Klasik otomasyon","Çok düşük","Sabit kurallar, ML yok. Her değişiklik için insan müdahalesi.",None),("SEVİYE 1","Destekli ajanlar","Düşük","Ajanlar analiz eder ve önerir. Her nihai karar insana aittir.",None),("SEVİYE 2","Yönetilen ajanlar","Orta","Ajanlar katı bir çerçevede karar verir. Devredilemez bölgeler kilitli.","★ ÖNERİLEN HEDEF"),("SEVİYE 3","Denetimli özerklik","Yüksek","Ajanlar karar verir ve öğrenir. Maksimum yönetişim gerekli.",None)],
        "risk_prefix": "Risk: ",
        "mat_progression": "Seviye 0  →  Seviye 1  →  Seviye 2 ★  →  Seviye 3",
        "mat_progression_desc": "Önerilen ilerleme — her seviye daha olgun bir yönetişim gerektirir",
        "meth_num": "04", "meth_title": "Metodoloji",
        "meth_desc1": "8 modül 6 ila 18 ay içinde aşamalı olarak dağıtılır.",
        "meth_desc2": "Her modül bir öncekinin üzerine inşa edilir.",
        "modules": [("MOD 01","Egemenlik teşhisi","Egemenlik Skoru hesaplaması. Risk bölgesi haritalama."),("MOD 02","Karar haritalama","Kritiklik matrisi. Devredilemez bölge tanımlama."),("MOD 03","Ajantik anayasa","9 madde. Yönetişim komitesi tarafından imzalanır."),("MOD 04","Ajan sistem tasarımı","Mandato kartları, etkileşim çevreleri, özerklik seviyeleri."),("MOD 05","Güvenlik ve geri dönüşebilirlik","Sandbox, geri dönüşebilirlik planı, durdurma protokolü tasarımı."),("MOD 06","Sürekli yönetişim","Aylık incelemeler. Yıllık uygunluk denetimi."),("MOD 07","Yol haritası","5 aşamada aşamalı dağıtım."),("MOD 08","Kriz yönetimi","3 seviyeli olaylar. Acil durdurma simülasyon tatbikatları.")],
        "meth_timeline": "Önerilen dağıtım: Modüller 01-03 (Ay 1-3) → Modüller 04-06 (Ay 4-9) → Modüller 07-08 (Ay 10-18)",
        "em_num": "05", "em_title": "Acil Durdurma Protokolü",
        "em_intro": "Etkili bir durdurma mekanizması basit bir düğme değildir. ACF, tanımlanmış yanıt süreleri ve net eskalasyon prosedürleri ile üç kesinti seviyesi belirler.",
        "em_levels": [("SEVİYE 1","Operasyonel duraklama","Kritik olmayan operasyonların askıya alınması. Ajanlar devam eden görevleri sürdürür ancak yeni eylemler başlatmaz.","< 30 saniye","#22c55e"),("SEVİYE 2","Karar durdurma","Tüm ajan karar verme süreçlerinin tamamen askıya alınması. Bekleyen tüm kararlar insan operatörlere yönlendirilir.","< 5 saniye","#f59e0b"),("SEVİYE 3","Toplam sistem durdurma","Tüm ajantik sistemlerin tamamen kesilmesi. Manuel yedek süreçlere geçiş.","< 1 saniye","#ef4444")],
        "em_time_prefix": "Süre: ",
        "em_note": "Her seviye üç aylık simülasyon tatbikatlarıyla test edilir (Modül 08)",
        "prod_num": "06", "prod_title": "ACF® Ürünleri",
        "prod_intro": "ACF standardını operasyonelleştiren dört tamamlayıcı ürün.",
        "products": [("ACF AI Act Checker","UYUMLULUK ARACI","EU AI Act ile uyumluluğunuzu değerlendirmek için ücretsiz teşhis aracı.",["EU AI Act uyumluluk teşhisi","Rol bazlı yükümlülük haritalama","Otomatik risk sınıflandırması"]),("ACF Score","TEŞHİS ARACI","6 yönetişim boyutunda karar bağımsızlığınızı ölçen tescilli egemenlik skoru.",["Bileşik egemenlik skoru","6 eksenli radar görselleştirme","Eksen başına kişiselleştirilmiş eylem planı"]),("ACF Control","YÖNETİŞİM PLATFORMU","Uyarlanabilir geçitleme ile 18 egemenlik KPI'nızı izleyen gerçek zamanlı yönetişim panosu.",["6 yönetişim ekseninde 18 KPI","İnsan eskalasyonlu uyarlanabilir geçitleme","Tahrif edilemez denetim günlükleri"]),("ACF Certification","BAĞIMSIZ SERTİFİKASYON","ACF yönetişim standardına uygunluğu belgeleyen bağımsız sertifikasyon.",["Seviye 1, 2 ve 3 yolu","Kamuya açık doğrulanabilir rozet","Yıllık yenileme + sürekli izleme"])],
        "about_num": "07", "about_title": "Hakkında",
        "about_p1": "Agentic Commerce Framework®, yapay zeka yönetişim uzmanı ve AI CONSULTING kurucusu Vincent DORANGE tarafından oluşturulmuştur. Çerçeve, ticari ortamlarda otonom sistem yönetişimi üzerine birkaç yıllık araştırmanın sonucudur.",
        "about_p2": "ACF® tescilli bir markadır. Tüm metodoloji ve araçlar yasal olarak korunmaktadır.",
        "contact_label": "İletişim",
        "contact_info": [("Web sitesi","www.acfstandard.com"),("Standart","ACF® — Agentic Commerce Framework")],
        "back_tagline": "Global Standard for AI Governance",
        "back_footer1": "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tüm hakları saklıdır.",
        "back_footer2": "ACF® tescilli bir markadır. Metodoloji ve araçlar yasal olarak korunmaktadır.",
    },
}

# For JA, ZH, KO — use EN content (CJK fonts not available in standard ReportLab)
for lang in ("ja", "zh", "ko"):
    LANGS[lang] = dict(LANGS["ru"])  # Copy EN-based content
    if lang == "ja":
        LANGS[lang]["doc_title"] = "ACF® — ホワイトペーパー"
    elif lang == "zh":
        LANGS[lang]["doc_title"] = "ACF® — 白皮书"
    elif lang == "ko":
        LANGS[lang]["doc_title"] = "ACF® — 백서"


# ── Drawing functions (same as FR version) ──

def draw_gold_line(c, x, y, width, thickness=1):
    c.setStrokeColor(GOLD)
    c.setLineWidth(thickness)
    c.line(x, y, x + width, y)

def draw_page_bg(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def draw_footer(c, page_num):
    draw_gold_line(c, 40, 50, W - 80, 0.5)
    c.setFillColor(GREY)
    c.setFont("Helvetica", 7)
    c.drawString(40, 35, "© 2026 Agentic Commerce Framework®")
    c.drawRightString(W - 40, 35, str(page_num))

def draw_section_header(c, number, title, y):
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, number)
    draw_gold_line(c, 40, y - 8, W - 80, 1.5)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(40, y - 38, title)
    return y - 60

def draw_body_text(c, text, x, y, max_width=None, font_size=11, color=LIGHT_GREY, line_height=16):
    if max_width is None:
        max_width = W - 80
    c.setFillColor(color)
    c.setFont("Helvetica", font_size)
    words = text.split()
    lines, current = [], ""
    for word in words:
        test = current + " " + word if current else word
        if c.stringWidth(test, "Helvetica", font_size) < max_width:
            current = test
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    for line in lines:
        c.drawString(x, y, line)
        y -= line_height
    return y


def generate_pdf(lang_code, t):
    """Generate a complete PDF for one language."""
    path = os.path.join(OUT_DIR, f"acf-whitepaper-{lang_code}.pdf")
    c = canvas.Canvas(path, pagesize=A4)
    c.setTitle(t["doc_title"])
    c.setAuthor("Vincent DORANGE")

    # ── Page 1: Cover ──
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    draw_gold_line(c, 40, H - 50, W - 80, 2)
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 10)
    c.drawString(40, H - 80, t["cover_label"])
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 36)
    c.drawString(40, H - 140, "Agentic Commerce")
    c.drawString(40, H - 185, "Framework®")
    draw_gold_line(c, 40, H - 205, 200, 2)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(40, H - 240, t["cover_subtitle"])
    c.setFillColor(LIGHT_GREY)
    c.setFont("Helvetica", 13)
    c.drawString(40, H - 270, t["cover_desc1"])
    c.drawString(40, H - 288, t["cover_desc2"])

    # Stats boxes
    box_w, box_h, start_x, start_y = 115, 80, 40, H - 410
    for i, (val, label) in enumerate(t["stats"]):
        x = start_x + i * (box_w + 12)
        c.setFillColor(DARK_CARD)
        c.roundRect(x, start_y, box_w, box_h, 6, fill=1, stroke=0)
        c.setStrokeColor(GOLD)
        c.setLineWidth(2)
        c.line(x + 10, start_y + box_h, x + box_w - 10, start_y + box_h)
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 28)
        c.drawCentredString(x + box_w / 2, start_y + 42, val)
        c.setFillColor(GREY)
        c.setFont("Helvetica", 8)
        for j, line in enumerate(label.split("\n")):
            c.drawCentredString(x + box_w / 2, start_y + 22 - j * 11, line)

    # Author info
    y_info = start_y - 60
    draw_gold_line(c, 40, y_info + 30, W - 80, 1)
    c.setFillColor(GREY); c.setFont("Helvetica", 10); c.drawString(40, y_info, t["author_label"])
    c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 12); c.drawString(40, y_info - 18, "Vincent DORANGE")
    c.setFillColor(GREY); c.setFont("Helvetica", 10); c.drawString(250, y_info, t["date_label"])
    c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 12); c.drawString(250, y_info - 18, t["date_val"])
    c.setFillColor(GREY); c.setFont("Helvetica", 10); c.drawString(400, y_info, t["class_label"])
    c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 12); c.drawString(400, y_info - 18, t["class_val"])
    draw_gold_line(c, 40, 60, W - 80, 1)
    c.setFillColor(GREY); c.setFont("Helvetica", 8); c.drawCentredString(W / 2, 42, "www.acfstandard.com")
    c.showPage()

    # ── Page 2: TOC ──
    draw_page_bg(c)
    y = H - 80
    c.setFillColor(GOLD); c.setFont("Helvetica", 10); c.drawString(40, y, t["toc_label"])
    y -= 40
    c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 28); c.drawString(40, y, t["toc_title"])
    y -= 20; draw_gold_line(c, 40, y, 120, 2)
    y -= 50
    for num, title, page in t["toc"]:
        c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 14); c.drawString(50, y, num)
        c.setFillColor(WHITE); c.setFont("Helvetica", 14); c.drawString(90, y, title)
        c.setFillColor(GREY); c.drawRightString(W - 50, y, page)
        c.setStrokeColor(HexColor("#1e293b")); c.setLineWidth(0.5); c.line(90, y - 8, W - 60, y - 8)
        y -= 40
    draw_footer(c, 2); c.showPage()

    # ── Page 3: Executive Summary ──
    draw_page_bg(c)
    y = H - 80
    y = draw_section_header(c, t["exec_num"], t["exec_title"], y)
    y -= 20; y = draw_body_text(c, t["exec_p1"], 40, y, font_size=12, line_height=18)
    y -= 18; y = draw_body_text(c, t["exec_p2"], 40, y, font_size=12, line_height=18)
    # Quote box
    y -= 30; box_y = y - 70
    c.setFillColor(DARK_CARD); c.roundRect(40, box_y, W - 80, 80, 8, fill=1, stroke=0)
    c.setFillColor(GOLD); c.rect(40, box_y, 4, 80, fill=1, stroke=0)
    c.setFillColor(LIGHT_GOLD); c.setFont("Helvetica-Oblique", 11)
    c.drawString(60, box_y + 52, t["exec_quote1"])
    c.drawString(60, box_y + 36, t["exec_quote2"])
    c.drawString(60, box_y + 20, t["exec_quote3"])
    c.setFillColor(GOLD); c.setFont("Helvetica", 9); c.drawString(60, box_y + 4, "— Agentic Commerce Framework®")
    # Key stats
    y = box_y - 50; draw_gold_line(c, 40, y + 20, W - 80, 1)
    c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 10); c.drawString(40, y, t["key_stats_label"])
    y -= 30
    for sl, sd in t["key_stats"]:
        c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 11); c.drawString(50, y, sl)
        c.setFillColor(GREY); c.setFont("Helvetica", 10); c.drawString(170, y, sd)
        y -= 22
    draw_footer(c, 3); c.showPage()

    # ── Page 4: Challenge ──
    draw_page_bg(c)
    y = H - 80; y = draw_section_header(c, t["ch_num"], t["ch_title"], y)
    y -= 20; y = draw_body_text(c, t["ch_p1"], 40, y, font_size=12, line_height=18)
    y -= 18; y = draw_body_text(c, t["ch_p2"], 40, y, font_size=12, line_height=18)
    y -= 18; y = draw_body_text(c, t["ch_p3"], 40, y, font_size=12, line_height=18)
    y -= 40; draw_gold_line(c, 40, y + 15, W - 80, 1)
    c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 10); c.drawString(40, y - 5, t["risks_label"])
    y -= 35
    for rt, rd in t["risks"]:
        c.setFillColor(DARK_CARD); c.roundRect(50, y - 10, W - 100, 38, 5, fill=1, stroke=0)
        c.setFillColor(GOLD); c.circle(68, y + 8, 4, fill=1, stroke=0)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 11); c.drawString(82, y + 12, rt)
        c.setFillColor(GREY); c.setFont("Helvetica", 9); c.drawString(82, y - 2, rd)
        y -= 52
    draw_footer(c, 4); c.showPage()

    # ── Page 5: Framework Principles & Layers ──
    draw_page_bg(c)
    y = H - 80; y = draw_section_header(c, t["fw_num"], t["fw_title"], y)
    y -= 12; c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 14); c.drawString(40, y, t["fw_principles_title"])
    y -= 8; draw_gold_line(c, 40, y, 180, 1); y -= 20
    for code, title, desc in t["principles"]:
        c.setFillColor(DARK_CARD); c.roundRect(50, y - 12, W - 100, 45, 5, fill=1, stroke=0)
        c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 12); c.drawString(62, y + 16, code)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 11); c.drawString(95, y + 16, title)
        c.setFillColor(GREY); c.setFont("Helvetica", 9); c.drawString(62, y - 2, desc)
        y -= 55
    y -= 10; c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 14); c.drawString(40, y, t["fw_layers_title"])
    y -= 8; draw_gold_line(c, 40, y, 200, 1); y -= 20
    for code, title, desc in t["layers"]:
        c.setFillColor(DARK_CARD); c.roundRect(50, y - 10, W - 100, 40, 5, fill=1, stroke=0)
        c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 11); c.drawString(62, y + 14, code)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 10); c.drawString(95, y + 14, title)
        c.setFillColor(GREY); c.setFont("Helvetica", 9); c.drawString(62, y - 2, desc)
        y -= 50
    draw_footer(c, 5); c.showPage()

    # ── Page 6: Maturity Levels ──
    draw_page_bg(c)
    y = H - 80
    c.setFillColor(GOLD); c.setFont("Helvetica", 10); c.drawString(40, y, t["mat_cont"])
    y -= 35; c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 14); c.drawString(40, y, t["mat_title"])
    y -= 8; draw_gold_line(c, 40, y, 260, 1)
    c.setFillColor(GREY); c.setFont("Helvetica", 10); y -= 20; c.drawString(40, y, t["mat_desc"])
    y -= 30
    for code, name, risk, desc, badge in t["levels"]:
        bh = 75 if badge else 65
        c.setFillColor(DARK_CARD); c.roundRect(40, y - 10, W - 80, bh, 6, fill=1, stroke=0)
        if badge:
            c.setStrokeColor(GOLD); c.setLineWidth(1.5); c.roundRect(40, y - 10, W - 80, bh, 6, fill=0, stroke=1)
        c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 13); c.drawString(55, y + bh - 30, code)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 12); c.drawString(160, y + bh - 30, name)
        c.setFillColor(MEDIUM_GREY); c.setFont("Helvetica", 9); c.drawRightString(W - 55, y + bh - 28, t["risk_prefix"] + risk)
        c.setFillColor(GREY); c.setFont("Helvetica", 10); c.drawString(55, y + bh - 50, desc)
        if badge:
            c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 9); c.drawString(55, y + bh - 66, badge)
        y -= (bh + 18)
    y -= 20; draw_gold_line(c, 40, y + 10, W - 80, 0.5)
    c.setFillColor(GREY); c.setFont("Helvetica-Oblique", 10); c.drawCentredString(W / 2, y - 10, t["mat_progression"])
    c.setFillColor(MEDIUM_GREY); c.setFont("Helvetica", 9); c.drawCentredString(W / 2, y - 28, t["mat_progression_desc"])
    draw_footer(c, 6); c.showPage()

    # ── Page 7: Methodology ──
    draw_page_bg(c)
    y = H - 80; y = draw_section_header(c, t["meth_num"], t["meth_title"], y)
    y -= 10; c.setFillColor(GREY); c.setFont("Helvetica", 11)
    c.drawString(40, y, t["meth_desc1"]); c.drawString(40, y - 16, t["meth_desc2"])
    y -= 40
    for code, name, desc in t["modules"]:
        c.setFillColor(DARK_CARD); c.roundRect(40, y - 6, W - 80, 48, 5, fill=1, stroke=0)
        c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 10); c.drawString(52, y + 24, code)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 11); c.drawString(120, y + 24, name)
        c.setFillColor(GREY); c.setFont("Helvetica", 9); c.drawString(52, y + 6, desc)
        y -= 58
    y -= 5; draw_gold_line(c, 40, y + 10, W - 80, 0.5)
    c.setFillColor(GREY); c.setFont("Helvetica-Oblique", 9); c.drawCentredString(W / 2, y - 8, t["meth_timeline"])
    draw_footer(c, 7); c.showPage()

    # ── Page 8: Emergency Stop ──
    draw_page_bg(c)
    y = H - 80; y = draw_section_header(c, t["em_num"], t["em_title"], y)
    y -= 15; y = draw_body_text(c, t["em_intro"], 40, y, font_size=12, line_height=18)
    y -= 35
    for code, name, desc, response, color_hex in t["em_levels"]:
        bh = 110
        c.setFillColor(DARK_CARD); c.roundRect(40, y - 10, W - 80, bh, 6, fill=1, stroke=0)
        c.setFillColor(HexColor(color_hex)); c.rect(40, y - 10, 5, bh, fill=1, stroke=0)
        c.setFillColor(HexColor(color_hex)); c.setFont("Helvetica-Bold", 12); c.drawString(58, y + bh - 28, code)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 13); c.drawString(150, y + bh - 28, name)
        c.setFillColor(HexColor(color_hex)); c.setFont("Helvetica-Bold", 9); c.drawRightString(W - 55, y + bh - 26, t["em_time_prefix"] + response)
        c.setFillColor(GREY); c.setFont("Helvetica", 10)
        words = desc.split(); line = ""; ly = y + bh - 48
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 10) < W - 140:
                line = test
            else:
                c.drawString(58, ly, line); ly -= 14; line = word
        if line:
            c.drawString(58, ly, line)
        y -= (bh + 20)
    y -= 10; draw_gold_line(c, 40, y + 15, W - 80, 0.5)
    c.setFillColor(GREY); c.setFont("Helvetica-Oblique", 9); c.drawCentredString(W / 2, y - 5, t["em_note"])
    draw_footer(c, 8); c.showPage()

    # ── Page 9: Products ──
    draw_page_bg(c)
    y = H - 80; y = draw_section_header(c, t["prod_num"], t["prod_title"], y)
    y -= 10; c.setFillColor(GREY); c.setFont("Helvetica", 11); c.drawString(40, y, t["prod_intro"])
    y -= 35
    for name, label, desc, features in t["products"]:
        bh = 130
        c.setFillColor(DARK_CARD); c.roundRect(40, y - 10, W - 80, bh, 6, fill=1, stroke=0)
        c.setStrokeColor(GOLD); c.setLineWidth(2); c.line(50, y + bh - 12, W - 50, y + bh - 12)
        c.setFillColor(GOLD); c.setFont("Helvetica", 8); c.drawString(55, y + bh - 28, label)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 16); c.drawString(55, y + bh - 48, name)
        c.setFillColor(GREY); c.setFont("Helvetica", 10)
        words = desc.split(); line = ""; ly = y + bh - 68
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 10) < W - 130:
                line = test
            else:
                c.drawString(55, ly, line); ly -= 14; line = word
        if line:
            c.drawString(55, ly, line); ly -= 14
        ly -= 6
        for feat in features:
            c.setFillColor(GOLD); c.setFont("Helvetica", 9); c.drawString(60, ly, "✓")
            c.setFillColor(LIGHT_GREY); c.setFont("Helvetica", 9.5); c.drawString(78, ly, feat)
            ly -= 15
        y -= (bh + 14)
    draw_footer(c, 9); c.showPage()

    # ── Page 10: About ──
    draw_page_bg(c)
    y = H - 80; y = draw_section_header(c, t["about_num"], t["about_title"], y)
    y -= 25; y = draw_body_text(c, t["about_p1"], 40, y, font_size=12, line_height=20)
    y -= 15; y = draw_body_text(c, t["about_p2"], 40, y, font_size=12, line_height=20)
    y -= 40; draw_gold_line(c, 40, y + 15, W - 80, 1)
    c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 12); c.drawString(40, y - 15, t["contact_label"])
    y -= 45
    for label, value in t["contact_info"]:
        c.setFillColor(GREY); c.setFont("Helvetica", 10); c.drawString(50, y, label)
        c.setFillColor(WHITE); c.setFont("Helvetica", 11); c.drawString(160, y, value)
        y -= 25
    draw_footer(c, 10); c.showPage()

    # ── Page 11: Back ──
    draw_page_bg(c)
    cy = H / 2 + 80
    draw_gold_line(c, W / 2 - 60, cy + 40, 120, 2)
    c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 28); c.drawCentredString(W / 2, cy, "ACF®")
    c.setFillColor(GOLD); c.setFont("Helvetica", 14); c.drawCentredString(W / 2, cy - 25, "Agentic Commerce Framework®")
    c.setFillColor(GREY); c.setFont("Helvetica", 11); c.drawCentredString(W / 2, cy - 50, t["back_tagline"])
    draw_gold_line(c, W / 2 - 60, cy - 75, 120, 1)
    c.setFillColor(WHITE); c.setFont("Helvetica", 13); c.drawCentredString(W / 2, cy - 105, "www.acfstandard.com")
    c.setFillColor(MEDIUM_GREY); c.setFont("Helvetica", 8)
    c.drawCentredString(W / 2, 60, t["back_footer1"])
    c.drawCentredString(W / 2, 45, t["back_footer2"])
    c.showPage()

    c.save()
    print(f"OK {path}")


if __name__ == "__main__":
    for lang_code, translations in LANGS.items():
        generate_pdf(lang_code, translations)
    print(f"\nDone! {len(LANGS)} PDFs generated.")
