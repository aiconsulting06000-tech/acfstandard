#!/usr/bin/env python3
"""
Generate ACF White Paper PDFs (English + French) using fpdf2.
Run: pip install fpdf2  (if not installed)
Then: python generate_whitepaper.py
"""

import subprocess
import sys

# Auto-install fpdf2 if needed
try:
    from fpdf import FPDF
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2"])
    from fpdf import FPDF

import os

# --- COLORS ---
GOLD = (201, 168, 76)     # #c9a84c
DARK = (18, 18, 22)       # near-black
WHITE = (255, 255, 255)
GRAY = (120, 120, 130)
LIGHT_BG = (245, 244, 240)
DARK_TEXT = (30, 30, 35)

class ACFWhitePaper(FPDF):
    def __init__(self, lang="en"):
        super().__init__()
        self.lang = lang
        self.set_auto_page_break(auto=True, margin=25)

    def header(self):
        if self.page_no() == 1:
            return  # Cover page has custom header
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(*GRAY)
        self.cell(0, 8, "Agentic Commerce Framework(R) - White Paper v1.0" if self.lang == "en" else "Agentic Commerce Framework(R) - Livre Blanc v1.0", align="L")
        self.set_font("Helvetica", "", 8)
        self.cell(0, 8, f"Page {self.page_no()}", align="R", new_x="LMARGIN", new_y="NEXT")
        # Gold line
        self.set_draw_color(*GOLD)
        self.set_line_width(0.5)
        self.line(10, 14, 200, 14)
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "", 7)
        self.set_text_color(*GRAY)
        if self.lang == "en":
            self.cell(0, 10, "© 2026 Agentic Commerce Framework(R) - Vincent DORANGE / AI CONSULTING. All rights reserved. INPI Protected.", align="C")
        else:
            self.cell(0, 10, "© 2026 Agentic Commerce Framework(R) - Vincent DORANGE / AI CONSULTING. Tous droits réservés. Protégé INPI.", align="C")

    def cover_page(self):
        self.add_page()
        # Gold background bar at top
        self.set_fill_color(*GOLD)
        self.rect(0, 0, 210, 6, "F")

        # Title area
        self.ln(30)
        self.set_font("Helvetica", "B", 28)
        self.set_text_color(*DARK_TEXT)
        self.cell(0, 14, "Agentic Commerce", align="C", new_x="LMARGIN", new_y="NEXT")
        self.cell(0, 14, "Framework(R)", align="C", new_x="LMARGIN", new_y="NEXT")

        self.ln(5)
        self.set_draw_color(*GOLD)
        self.set_line_width(1)
        self.line(70, self.get_y(), 140, self.get_y())
        self.ln(8)

        self.set_font("Helvetica", "", 14)
        self.set_text_color(*GOLD)
        if self.lang == "en":
            self.cell(0, 8, "WHITE PAPER v1.0", align="C", new_x="LMARGIN", new_y="NEXT")
        else:
            self.cell(0, 8, "LIVRE BLANC v1.0", align="C", new_x="LMARGIN", new_y="NEXT")

        self.ln(5)
        self.set_font("Helvetica", "", 12)
        self.set_text_color(*DARK_TEXT)
        if self.lang == "en":
            self.cell(0, 8, "The Global Standard for AI Governance", align="C", new_x="LMARGIN", new_y="NEXT")
            self.cell(0, 8, "in Commercial Environments", align="C", new_x="LMARGIN", new_y="NEXT")
        else:
            self.cell(0, 8, "Le Standard Mondial de Gouvernance IA", align="C", new_x="LMARGIN", new_y="NEXT")
            self.cell(0, 8, "dans les Environnements Commerciaux", align="C", new_x="LMARGIN", new_y="NEXT")

        self.ln(15)
        # Stats boxes
        stats = [("4", "Principles" if self.lang == "en" else "Principes"),
                 ("8", "Modules"),
                 ("18", "KPIs"),
                 ("17", "Tools" if self.lang == "en" else "Outils")]
        x_start = 30
        for val, label in stats:
            self.set_xy(x_start, self.get_y())
            self.set_fill_color(*LIGHT_BG)
            self.rect(x_start, self.get_y(), 35, 22, "F")
            self.set_font("Helvetica", "B", 18)
            self.set_text_color(*GOLD)
            self.set_xy(x_start, self.get_y() + 2)
            self.cell(35, 10, val, align="C", new_x="LMARGIN", new_y="NEXT")
            self.set_font("Helvetica", "", 8)
            self.set_text_color(*GRAY)
            self.set_x(x_start)
            self.cell(35, 6, label, align="C")
            x_start += 40

        self.ln(35)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*DARK_TEXT)
        if self.lang == "en":
            self.cell(0, 6, "Author: Vincent DORANGE - AI CONSULTING", align="C", new_x="LMARGIN", new_y="NEXT")
            self.cell(0, 6, "Date: February 2026", align="C", new_x="LMARGIN", new_y="NEXT")
            self.cell(0, 6, "Classification: Public", align="C", new_x="LMARGIN", new_y="NEXT")
        else:
            self.cell(0, 6, "Auteur : Vincent DORANGE - AI CONSULTING", align="C", new_x="LMARGIN", new_y="NEXT")
            self.cell(0, 6, "Date : Février 2026", align="C", new_x="LMARGIN", new_y="NEXT")
            self.cell(0, 6, "Classification : Public", align="C", new_x="LMARGIN", new_y="NEXT")

        # Bottom bar
        self.set_fill_color(*GOLD)
        self.rect(0, 291, 210, 6, "F")

    def section_title(self, number, title):
        self.ln(6)
        self.set_font("Helvetica", "B", 7)
        self.set_text_color(*GOLD)
        self.cell(12, 8, f"0{number}" if number < 10 else str(number))
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(*DARK_TEXT)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*GOLD)
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 80, self.get_y())
        self.ln(4)

    def subsection_title(self, title):
        self.ln(3)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(*GOLD)
        self.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def body_text(self, text):
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*DARK_TEXT)
        self.multi_cell(0, 5.2, text)
        self.ln(2)

    def bullet_point(self, title, desc):
        self.set_font("Helvetica", "B", 9.5)
        self.set_text_color(*GOLD)
        self.cell(5, 5.2, "-")
        self.set_text_color(*DARK_TEXT)
        self.cell(50, 5.2, title)
        self.set_font("Helvetica", "", 9.5)
        self.cell(0, 5.2, f" - {desc}", new_x="LMARGIN", new_y="NEXT")

    def numbered_item(self, num, title, desc):
        self.set_font("Helvetica", "B", 9.5)
        self.set_text_color(*GOLD)
        self.cell(12, 5.2, num)
        self.set_text_color(*DARK_TEXT)
        self.cell(50, 5.2, title)
        self.set_font("Helvetica", "", 9)
        self.set_text_color(*GRAY)
        self.cell(0, 5.2, desc, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def toc_page(self):
        self.add_page()
        self.set_font("Helvetica", "B", 18)
        self.set_text_color(*DARK_TEXT)
        if self.lang == "en":
            self.cell(0, 12, "Table of Contents", align="L", new_x="LMARGIN", new_y="NEXT")
        else:
            self.cell(0, 12, "Table des matières", align="L", new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*GOLD)
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 60, self.get_y())
        self.ln(8)

        if self.lang == "en":
            items = [
                ("01", "Executive Summary"),
                ("02", "The Agentic Commerce Challenge"),
                ("03", "The ACF Framework"),
                ("", "    4 Founding Principles"),
                ("", "    4 Operational Layers"),
                ("", "    4 Maturity Levels"),
                ("04", "Implementation Methodology"),
                ("", "    8 Implementation Modules"),
                ("", "    The Agentic Constitution"),
                ("", "    The DDA Role"),
                ("05", "The Kill Switch Protocol"),
                ("06", "ACF Products"),
                ("", "    ACF Score - Sovereignty Metric"),
                ("", "    ACF Control - Governance Dashboard"),
                ("", "    ACF Certification"),
                ("07", "Legal Protection (INPI)"),
                ("08", "About AI CONSULTING"),
            ]
        else:
            items = [
                ("01", "Résumé exécutif"),
                ("02", "Le défi du commerce agentique"),
                ("03", "Le framework ACF"),
                ("", "    4 Principes fondateurs"),
                ("", "    4 Couches opérationnelles"),
                ("", "    4 Niveaux de maturité"),
                ("04", "Méthodologie de mise en oeuvre"),
                ("", "    8 Modules de mise en oeuvre"),
                ("", "    La Constitution agentique"),
                ("", "    Le rôle DDA"),
                ("05", "Le protocole Kill Switch"),
                ("06", "Les produits ACF"),
                ("", "    ACF Score - Métrique de souveraineté"),
                ("", "    ACF Control - Tableau de bord"),
                ("", "    ACF Certification"),
                ("07", "Protection légale (INPI)"),
                ("08", "À propos d'AI CONSULTING"),
            ]

        for num, title in items:
            if num:
                self.set_font("Helvetica", "B", 10)
                self.set_text_color(*GOLD)
                self.cell(12, 7, num)
                self.set_font("Helvetica", "B", 10)
                self.set_text_color(*DARK_TEXT)
                self.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")
            else:
                self.set_font("Helvetica", "", 9)
                self.set_text_color(*GRAY)
                self.cell(12, 6, "")
                self.cell(0, 6, title, new_x="LMARGIN", new_y="NEXT")


def generate_en(output_path):
    pdf = ACFWhitePaper(lang="en")
    pdf.cover_page()
    pdf.toc_page()

    # --- SECTION 1: EXECUTIVE SUMMARY ---
    pdf.add_page()
    pdf.section_title(1, "Executive Summary")
    pdf.body_text(
        "The Agentic Commerce Framework(R) (ACF) is the definitive governance methodology for deploying, "
        "supervising, and controlling autonomous agentic systems in commercial environments. As organizations "
        "worldwide accelerate the adoption of AI-powered autonomous agents - systems capable of setting prices, "
        "qualifying leads, processing insurance claims, negotiating contracts, and managing supply chains - the "
        "absence of a unified governance standard poses existential risks to business sovereignty, legal compliance, "
        "and public trust."
    )
    pdf.body_text(
        "ACF was created to fill this governance vacuum. Developed by Vincent DORANGE and AI CONSULTING, the "
        "framework provides a complete, field-tested methodology built on 4 founding principles, structured across "
        "4 operational layers, measured through 18 sovereignty KPIs, and implemented via 8 sequential modules. "
        "It is not an abstract policy document - it is an operational blueprint designed for real-world deployment "
        "in organizations ranging from mid-market enterprises to multinational corporations."
    )
    pdf.body_text(
        "The framework addresses the fundamental question that every organization deploying AI agents must answer: "
        "How do you harness the speed, scale, and intelligence of autonomous agents without surrendering human "
        "decision sovereignty? ACF provides a structured answer through its unique combination of governance "
        "architecture, implementation methodology, diagnostic tools (ACF Score), real-time monitoring (ACF Control), "
        "and independent certification (ACF Certification)."
    )
    pdf.body_text(
        "ACF is legally protected under French intellectual property law (INPI registration, Loi n° 2018-670). "
        "The framework is aligned with the EU AI Act's risk-based classification system and has been designed to "
        "help organizations meet regulatory obligations while maintaining competitive advantage through responsible "
        "agentic deployment. This white paper presents the complete ACF specification - its principles, structure, "
        "methodology, products, and legal foundation."
    )

    # --- SECTION 2: THE AGENTIC COMMERCE CHALLENGE ---
    pdf.add_page()
    pdf.section_title(2, "The Agentic Commerce Challenge")
    pdf.body_text(
        "In 2026, autonomous agents are no longer experimental. They are operational. Across industries, "
        "AI-powered systems are executing commercial decisions at machine speed - adjusting pricing in real time, "
        "autonomously qualifying and routing sales leads, processing insurance claims without human review, "
        "managing procurement workflows, and even negotiating contract terms with counterparties. These agents "
        "operate 24/7, process information at scales no human team can match, and increasingly learn from their "
        "own outcomes to optimize future decisions."
    )
    pdf.body_text(
        "The commercial advantages are undeniable: faster response times, consistent execution, reduced operational "
        "costs, and the ability to personalize at scale. However, this acceleration has outpaced governance. Most "
        "organizations deploying agentic systems have no formal framework for defining which decisions agents may "
        "make autonomously, which require human approval, and which must never be delegated. The result is a "
        "governance vacuum where autonomous systems make consequential decisions - affecting revenue, customer "
        "relationships, legal obligations, and brand reputation - without adequate human oversight."
    )
    pdf.body_text(
        "The risks are not hypothetical. Agent-driven pricing errors have caused flash crashes in dynamic pricing "
        "markets. Autonomous lead qualification systems have introduced systematic bias. Claims-processing agents "
        "have denied legitimate customer claims at scale. In each case, the root cause was the same: the absence "
        "of a governance framework that defines boundaries, enforces accountability, and preserves human authority "
        "over critical decisions."
    )
    pdf.body_text(
        "Regulators are responding. The EU AI Act, effective in 2026, establishes a risk-based classification "
        "system with specific obligations for high-risk AI systems - a category that includes many commercial "
        "agentic deployments. Organizations without governance frameworks risk not only operational failures but "
        "regulatory sanctions, legal liability, and reputational damage. ACF was created to address this gap - "
        "providing a complete governance standard purpose-built for the agentic commerce era."
    )

    # --- SECTION 3: THE ACF FRAMEWORK ---
    pdf.add_page()
    pdf.section_title(3, "The ACF Framework")
    pdf.body_text(
        "The Agentic Commerce Framework(R) is structured around three architectural pillars: 4 Founding Principles "
        "that establish immutable governance axioms, 4 Operational Layers that organize governance from strategy "
        "to execution, and 4 Maturity Levels that classify agentic systems by autonomy and risk. Together, these "
        "pillars create a comprehensive governance architecture that is both rigorous and adaptable to diverse "
        "organizational contexts."
    )

    pdf.subsection_title("4 Founding Principles")
    pdf.body_text(
        "The ACF framework rests on four immutable axioms that define the boundary between human authority and "
        "autonomous agent execution. These principles are non-negotiable - they apply at every maturity level and "
        "across all operational layers."
    )
    pdf.numbered_item("01", "Decision Sovereignty", "Critical strategic decisions are never delegated to autonomous agents.")
    pdf.numbered_item("02", "Governance by Design", "Governance frameworks are defined before deployment, not after.")
    pdf.numbered_item("03", "Ultimate Human Control", "Every agentic system must preserve the ability for human intervention.")
    pdf.numbered_item("04", "Traceable Accountability", "Every autonomous action must be auditable and attributable.")
    pdf.ln(3)

    pdf.body_text(
        "Decision Sovereignty ensures that the most consequential organizational decisions - those involving "
        "strategic direction, significant financial commitments, legal obligations, and ethical considerations - "
        "remain exclusively within human authority. These are mapped as 'non-delegable zones' during implementation. "
        "Governance by Design mandates that governance structures, policies, and controls are established before "
        "any agentic system goes into production, not retrofitted after incidents occur."
    )
    pdf.body_text(
        "Ultimate Human Control requires that every deployed agent, regardless of its autonomy level, includes "
        "mechanisms for human override, intervention, and shutdown. This is operationalized through the Kill Switch "
        "Protocol (Section 5). Traceable Accountability ensures that every action taken by an autonomous agent "
        "is logged in tamper-evident audit trails, attributed to specific agent mandates, and available for "
        "review by governance committees, regulators, and auditors."
    )

    pdf.subsection_title("4 Operational Layers")
    pdf.body_text(
        "ACF organizes governance into a hierarchical four-layer architecture, from high-level strategic governance "
        "down to real-time execution supervision. Each layer has defined responsibilities, artifacts, and interfaces "
        "with adjacent layers."
    )
    pdf.numbered_item("LAYER 01", "Governance & Sovereignty", "Sovereignty charter, governance committee, RACI matrix, non-delegable zone map.")
    pdf.numbered_item("LAYER 02", "Decision Policy", "Weighted objectives, arbitration rules, escalation thresholds, regulatory constraints.")
    pdf.numbered_item("LAYER 03", "Agent System", "Explicit mandate per agent, interaction perimeter, autonomy level, 5-category taxonomy.")
    pdf.numbered_item("LAYER 04", "Execution & Supervision", "Adaptive gating matrix, multi-level alerts, 18 sovereignty KPIs, live dashboards.")
    pdf.ln(3)

    pdf.body_text(
        "Layer 1 establishes the organizational foundation: who has authority, which decisions are non-delegable, "
        "and how governance is structured. Layer 2 translates governance intent into operational policies - the "
        "specific rules, thresholds, and constraints that govern agent behavior. Layer 3 defines the agent system "
        "itself: each agent receives an explicit mandate document specifying its scope, autonomy level, interaction "
        "perimeter, and escalation triggers. Layer 4 provides real-time execution monitoring through the ACF Control "
        "dashboard, tracking 18 sovereignty KPIs across 6 governance axes."
    )

    pdf.subsection_title("4 Maturity Levels")
    pdf.body_text(
        "ACF classifies agentic systems into four maturity levels based on their degree of autonomy and "
        "corresponding governance requirements. Level 2 (Governed Agents) is the recommended deployment target "
        "for most organizations."
    )
    pdf.numbered_item("LEVEL 0", "Classical Automation", "Fixed rules, no ML. Human intervention for any modification. Very low risk.")
    pdf.numbered_item("LEVEL 1", "Assisted Agents", "Agents analyze and recommend. Every final decision remains with a human. Low risk.")
    pdf.numbered_item("LEVEL 2", "Governed Agents [RECOMMENDED]", "Agents decide within strict governance. Non-delegable zones locked. Moderate risk.")
    pdf.numbered_item("LEVEL 3", "Supervised Autonomous", "Agents decide and learn. Maximum governance required. For mature orgs only. High risk.")
    pdf.ln(3)

    pdf.body_text(
        "The maturity model serves both as a classification tool and a progression roadmap. Organizations typically "
        "begin at Level 0 or Level 1 and advance to Level 2 through the 8-module implementation methodology. "
        "Level 3 deployments are reserved for organizations with mature governance infrastructure, experienced "
        "DDA officers, and robust monitoring capabilities. Each advancement in maturity level requires corresponding "
        "increases in governance rigor, monitoring granularity, and human oversight mechanisms."
    )

    # --- SECTION 4: IMPLEMENTATION METHODOLOGY ---
    pdf.add_page()
    pdf.section_title(4, "Implementation Methodology")
    pdf.body_text(
        "ACF is implemented through a sequential 8-module methodology designed for progressive deployment over "
        "6 to 18 months. Each module builds on the previous, creating a cumulative governance infrastructure "
        "that strengthens with each phase. The methodology is designed to be practical - every module produces "
        "tangible artifacts, measurable outcomes, and clear governance deliverables."
    )

    pdf.subsection_title("8 Implementation Modules")

    pdf.numbered_item("MOD 01", "Sovereignty Diagnostic", "Sovereignty Score calculation. Risk zone mapping across 6 governance axes.")
    pdf.body_text(
        "The implementation begins with a comprehensive diagnostic of the organization's current governance "
        "posture. Using the ACF Score methodology, this module calculates a baseline Sovereignty Score and "
        "maps risk zones across six governance dimensions. The diagnostic identifies existing agentic deployments, "
        "assesses their autonomy levels, and documents governance gaps. The output is a detailed sovereignty "
        "report with prioritized recommendations."
    )

    pdf.numbered_item("MOD 02", "Decision Mapping", "Criticality Matrix. Non-delegable zones defined and documented.")
    pdf.body_text(
        "Module 2 creates a comprehensive map of organizational decisions, classifying each by criticality, "
        "reversibility, financial impact, legal implications, and ethical sensitivity. Decisions are categorized "
        "into delegable and non-delegable zones. Non-delegable zones - decisions that must always remain under "
        "human authority - are formally documented and locked. This mapping becomes the foundation for all "
        "subsequent agent mandate definitions."
    )

    pdf.numbered_item("MOD 03", "Agentic Constitution", "9 articles. Signed by governance committee.")
    pdf.body_text(
        "The Agentic Constitution is the organization's foundational governance document for agentic systems. "
        "Modeled on constitutional principles, it establishes 9 articles defining the rights, obligations, and "
        "boundaries of autonomous agents within the organization. The constitution is formally signed by the "
        "governance committee and serves as the authoritative reference for all agent deployment decisions. It "
        "defines the role of the DDA, establishes escalation protocols, and codifies the Kill Switch authority."
    )

    pdf.numbered_item("MOD 04", "Agent System Design", "Mandate sheets, interaction perimeters for each agent.")
    pdf.body_text(
        "Each agent deployed within the organization receives a formal mandate sheet specifying its operational "
        "scope, autonomy level (Level 0-3), interaction perimeter, data access rights, decision boundaries, "
        "and escalation triggers. Mandate sheets follow a standardized ACF template and must be approved by "
        "the DDA before deployment. Agent interactions are mapped to prevent conflicts and ensure coordinated "
        "behavior across multi-agent systems."
    )

    pdf.numbered_item("MOD 05", "Security & Reversibility", "Sandboxing, reversibility plan, Kill Switch design.")
    pdf.body_text(
        "Module 5 establishes the security infrastructure for agentic operations. This includes sandboxing "
        "protocols for testing agent behavior before production deployment, a comprehensive reversibility plan "
        "enabling the rollback of agent decisions, and the design and implementation of the three-level Kill "
        "Switch Protocol. Every agent deployment must demonstrate reversibility before receiving production "
        "authorization."
    )

    pdf.numbered_item("MOD 06", "Continuous Governance", "Monthly reviews. Annual compliance audit.")
    pdf.body_text(
        "Governance is not a one-time event. Module 6 establishes the cadence and structure for ongoing "
        "governance oversight: monthly governance reviews assessing agent performance against mandate parameters, "
        "quarterly sovereignty score recalculations, and annual comprehensive compliance audits. This module "
        "also defines the governance committee structure, meeting protocols, and reporting requirements."
    )

    pdf.numbered_item("MOD 07", "Implementation Roadmap", "5-phase progressive deployment plan.")
    pdf.body_text(
        "The implementation roadmap translates the governance framework into a phased deployment plan. The "
        "5-phase approach moves from pilot deployment (single agent, controlled environment) through progressive "
        "expansion to full organizational coverage. Each phase includes defined success criteria, governance "
        "checkpoints, and go/no-go decision points reviewed by the DDA and governance committee."
    )

    pdf.numbered_item("MOD 08", "Crisis Management", "3-level incidents. Kill Switch drills.")
    pdf.body_text(
        "The final module establishes crisis management protocols specifically designed for agentic incidents. "
        "Incidents are classified into three severity levels with defined response procedures, escalation paths, "
        "and communication protocols. The module mandates regular Kill Switch drills - simulated emergency "
        "shutdowns that test the organization's ability to halt agentic operations quickly and completely. "
        "Post-incident review procedures ensure continuous improvement of governance controls."
    )

    pdf.subsection_title("The Agentic Constitution")
    pdf.body_text(
        "The Agentic Constitution is the cornerstone governance document of any ACF implementation. Comprising "
        "9 articles, it establishes the legal and operational framework for autonomous agent deployment within "
        "the organization. Article 1 affirms human decision sovereignty as the supreme organizational principle. "
        "Article 2 defines the scope and limitations of agent autonomy. Article 3 establishes the DDA role and "
        "its authorities. Articles 4-6 detail operational requirements for agent mandates, monitoring, and "
        "accountability. Article 7 codifies the Kill Switch Protocol authority. Article 8 establishes the "
        "governance committee structure. Article 9 defines amendment procedures requiring supermajority approval."
    )
    pdf.body_text(
        "The constitution must be formally ratified by the organization's executive leadership and governance "
        "committee before any Level 2 or Level 3 agent deployment. It is a living document, subject to annual "
        "review, but its core principles - particularly the non-delegable zone protections and human sovereignty "
        "guarantees - are designed to be enduring."
    )

    pdf.subsection_title("The DDA Role (Delegated Decision Agent Officer)")
    pdf.body_text(
        "The DDA (Delegated Decision Agent Officer) is the designated human authority responsible for the "
        "governance of all autonomous agents within the organization. The DDA is the legal guardian of the "
        "organization's agentic systems - responsible for approving agent mandates, monitoring sovereignty KPIs, "
        "authorizing Kill Switch activation, and reporting to the governance committee."
    )
    pdf.body_text(
        "Every AI-native organization needs a DDA. The role requires a unique combination of competencies: "
        "understanding of AI capabilities and limitations, governance and compliance expertise, operational "
        "knowledge of the organization's business processes, and the authority to halt agent operations when "
        "governance thresholds are breached. The DDA is not a technical role - it is a governance role with "
        "technical fluency. ACF provides a detailed role framework including responsibilities, authorities, "
        "reporting lines, and required competencies."
    )

    # --- SECTION 5: KILL SWITCH PROTOCOL ---
    pdf.add_page()
    pdf.section_title(5, "The Kill Switch Protocol")
    pdf.body_text(
        "The Kill Switch Protocol is ACF's emergency intervention mechanism - a structured, multi-level system "
        "for interrupting or terminating autonomous agent operations when governance boundaries are breached. "
        "An effective kill switch is not a single button. ACF specifies three interrupt levels with defined "
        "scope, response times, and authorization requirements."
    )

    pdf.numbered_item("LEVEL 1", "Tactical Pause", "Individual agent suspension. Response time: immediate. Authorization: DDA or system alert.")
    pdf.body_text(
        "A Level 1 intervention suspends a specific agent's autonomous operations while preserving the broader "
        "agentic ecosystem. This is triggered when a single agent breaches its mandate parameters - for example, "
        "exceeding its authorized decision scope, generating anomalous outputs, or triggering a KPI threshold "
        "alert. The agent is placed in a supervised mode where all decisions require human approval. Level 1 "
        "activations can be triggered automatically by the ACF Control monitoring system or manually by the DDA."
    )

    pdf.numbered_item("LEVEL 2", "Operational Halt", "Category-wide suspension. Response time: <15 minutes. Authorization: DDA + governance lead.")
    pdf.body_text(
        "A Level 2 intervention halts all agents within a specific category or operational domain. This is "
        "triggered when systemic issues are detected - such as correlated anomalies across multiple agents, "
        "data integrity concerns affecting agent inputs, or regulatory events requiring immediate operational "
        "review. Level 2 requires dual authorization from the DDA and the relevant governance committee lead. "
        "All affected agents are suspended, pending investigation and remediation."
    )

    pdf.numbered_item("LEVEL 3", "Full Shutdown", "Complete agentic system shutdown. Response time: <5 minutes. Authorization: CEO + DDA.")
    pdf.body_text(
        "A Level 3 intervention is a complete shutdown of all autonomous agent operations across the organization. "
        "This is the nuclear option - reserved for catastrophic scenarios such as a detected security breach "
        "affecting agentic infrastructure, a regulatory order mandating immediate cessation of AI operations, "
        "or a systemic governance failure threatening organizational viability. Level 3 requires executive "
        "authorization (CEO or designated executive) plus the DDA. Pre-planned manual fallback procedures are "
        "activated to maintain critical business operations during the shutdown period."
    )

    pdf.body_text(
        "The Kill Switch Protocol mandates regular drills - quarterly for Level 1, semi-annually for Level 2, "
        "and annually for Level 3. Drill results are documented, analyzed, and used to improve response times "
        "and procedures. The protocol also requires that all agents are designed with 'graceful degradation' "
        "capabilities, ensuring that a kill switch activation does not cause data loss, transaction corruption, "
        "or cascading system failures."
    )

    # --- SECTION 6: ACF PRODUCTS ---
    pdf.add_page()
    pdf.section_title(6, "ACF Products")
    pdf.body_text(
        "The ACF Standard is operationalized through three complementary products that together form the "
        "ACF ecosystem: ACF Score (diagnostic), ACF Control (monitoring), and ACF Certification (attestation). "
        "Each product serves a distinct function in the governance lifecycle while sharing a common data model "
        "and governance framework."
    )

    pdf.subsection_title("ACF Score - Sovereignty Metric")
    pdf.body_text(
        "ACF Score is the proprietary diagnostic tool that measures an organization's decisional sovereignty "
        "across 6 governance dimensions. The composite Sovereignty Score provides a single, authoritative metric "
        "representing the organization's governance maturity and the degree to which human decision authority "
        "is preserved across its agentic deployments."
    )
    pdf.body_text(
        "The 6 governance axes measured by ACF Score are: Decision Authority (who decides), Policy Enforcement "
        "(how decisions are governed), Agent Mandate Clarity (how agents are scoped), Monitoring Coverage (how "
        "agents are supervised), Reversibility Readiness (how decisions are reversed), and Accountability "
        "Infrastructure (how actions are traced). Each axis is scored on a standardized scale, producing a "
        "radar visualization that immediately reveals strengths and vulnerabilities. The diagnostic generates "
        "a personalized action plan with prioritized recommendations for each axis."
    )

    pdf.subsection_title("ACF Control - Governance Dashboard")
    pdf.body_text(
        "ACF Control is the real-time governance SaaS platform that monitors 18 sovereignty KPIs across the "
        "6 governance axes. It provides continuous visibility into agent behavior, governance compliance, and "
        "sovereignty posture. The dashboard features an adaptive gating system that automatically adjusts agent "
        "autonomy levels based on real-time KPI performance - tightening controls when thresholds are approached "
        "and enabling greater autonomy when governance metrics are strong."
    )
    pdf.body_text(
        "Key capabilities include: real-time KPI tracking across all deployed agents, automated escalation when "
        "governance thresholds are breached, tamper-evident audit logs for regulatory compliance, agent mandate "
        "compliance monitoring, Kill Switch integration with one-click Level 1 activation, and governance "
        "reporting for committee reviews. ACF Control is designed to be the operational command center for "
        "the DDA and governance team."
    )

    pdf.subsection_title("ACF Certification")
    pdf.body_text(
        "ACF Certification is the independent attestation program that verifies an organization's compliance "
        "with the ACF governance standard. Certification is publicly verifiable and provides stakeholders - "
        "customers, partners, regulators, and investors - with third-party assurance that the organization "
        "governs its agentic systems according to recognized governance standards."
    )
    pdf.body_text(
        "Three certification levels correspond to ACF maturity levels: Level 1 Certification (Assisted Agents "
        "governance), Level 2 Certification (Governed Agents governance - the primary target for most organizations), "
        "and Level 3 Certification (Supervised Autonomous governance - for advanced deployments). Certification "
        "involves a comprehensive audit process conducted by accredited ACF practitioners, covering governance "
        "documentation, technical controls, operational procedures, and KPI performance. Certification is valid "
        "for one year with continuous monitoring requirements and annual renewal audits."
    )

    # --- SECTION 7: LEGAL PROTECTION ---
    pdf.add_page()
    pdf.section_title(7, "Legal Protection (INPI)")
    pdf.body_text(
        "The Agentic Commerce Framework(R) (ACF(R)) is a registered trademark protected under French intellectual "
        "property law. The registration was filed with INPI (Institut National de la Propriété Industrielle) "
        "under the provisions of Loi n° 2018-670, which provides comprehensive protection for the ACF brand, "
        "methodology, and associated tools."
    )
    pdf.body_text(
        "The legal protection covers: the ACF(R) name and brand identity, the complete governance methodology "
        "including the 4 principles, 4 layers, 4 maturity levels, and 8 implementation modules, the ACF Score(R) "
        "diagnostic methodology and scoring system, the ACF Control platform design and KPI framework, the "
        "ACF Certification program and audit methodology, and all associated documentation, templates, and "
        "practitioner materials."
    )
    pdf.body_text(
        "This legal protection serves two purposes. First, it ensures the integrity and consistency of the ACF "
        "standard - preventing unauthorized modifications or derivative works that could dilute the framework's "
        "rigor. Second, it provides assurance to organizations adopting ACF that they are implementing a "
        "legally recognized, professionally maintained governance standard with clear provenance and accountability. "
        "All ACF practitioners and partners operate under license agreements that maintain the standard's integrity "
        "while enabling broad adoption."
    )

    # --- SECTION 8: ABOUT AI CONSULTING ---
    pdf.section_title(8, "About AI CONSULTING")
    pdf.body_text(
        "AI CONSULTING is the organization founded by Vincent DORANGE that developed and maintains the Agentic "
        "Commerce Framework(R). Based in France, AI CONSULTING specializes in AI governance strategy, agentic "
        "system design, and sovereignty assessment for organizations deploying autonomous AI agents in commercial "
        "environments."
    )
    pdf.body_text(
        "Vincent DORANGE created ACF in response to a critical gap he identified in the market: while organizations "
        "were rapidly adopting autonomous agents for commercial operations, no comprehensive governance standard "
        "existed to guide responsible deployment. Drawing on expertise in AI strategy, governance frameworks, "
        "and commercial operations, he developed ACF as an end-to-end governance methodology - from diagnostic "
        "to certification - that organizations could adopt to maintain sovereignty over their agentic systems."
    )
    pdf.body_text(
        "AI CONSULTING operates the ACF ecosystem including the ACF Score diagnostic platform, ACF Control "
        "governance dashboard, and ACF Certification program. The organization also manages the ACF Practitioner "
        "Network - a growing community of accredited governance professionals trained to implement ACF across "
        "diverse organizational contexts and industries. AI CONSULTING's mission is to ensure that as autonomous "
        "agents become central to commercial operations, human sovereignty over critical decisions is preserved "
        "through rigorous, practical, and legally recognized governance standards."
    )

    # Final page
    pdf.add_page()
    pdf.ln(40)
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 12, "Agentic Commerce Framework(R)", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*DARK_TEXT)
    pdf.cell(0, 8, "The Global Standard for AI Governance", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "in Commercial Environments", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(15)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*GRAY)
    pdf.cell(0, 6, "www.acf-standard.com", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, "contact@ai-consulting.fr", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(0, 6, "© 2026 Vincent DORANGE - AI CONSULTING", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, "All rights reserved. INPI Protected.", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.output(output_path)
    print(f"Generated: {output_path}")


def generate_fr(output_path):
    pdf = ACFWhitePaper(lang="fr")
    pdf.cover_page()
    pdf.toc_page()

    # --- SECTION 1: RÉSUMÉ EXÉCUTIF ---
    pdf.add_page()
    pdf.section_title(1, "Résumé exécutif")
    pdf.body_text(
        "L'Agentic Commerce Framework(R) (ACF) est la méthodologie de gouvernance de référence pour déployer, "
        "superviser et contrôler les systèmes agentiques autonomes dans les environnements commerciaux. Alors "
        "que les organisations du monde entier accélèrent l'adoption d'agents autonomes alimentés par l'IA - "
        "des systèmes capables de fixer les prix, de qualifier les prospects, de traiter les réclamations "
        "d'assurance, de négocier des contrats et de gérer les chaînes d'approvisionnement - l'absence d'un "
        "standard de gouvernance unifié pose des risques existentiels pour la souveraineté décisionnelle, "
        "la conformité légale et la confiance publique."
    )
    pdf.body_text(
        "ACF a été créé pour combler ce vide de gouvernance. Développé par Vincent DORANGE et AI CONSULTING, "
        "le framework fournit une méthodologie complète et éprouvée sur le terrain, construite sur 4 principes "
        "fondateurs, structurée en 4 couches opérationnelles, mesurée à travers 18 KPIs de souveraineté et "
        "mise en oeuvre via 8 modules séquentiels. Ce n'est pas un document de politique abstrait - c'est un "
        "plan opérationnel conçu pour un déploiement réel dans des organisations allant des ETI aux "
        "multinationales."
    )
    pdf.body_text(
        "Le framework répond à la question fondamentale que chaque organisation déployant des agents IA doit "
        "se poser : comment exploiter la vitesse, l'échelle et l'intelligence des agents autonomes sans "
        "abandonner la souveraineté décisionnelle humaine ? ACF fournit une réponse structurée à travers "
        "sa combinaison unique d'architecture de gouvernance, de méthodologie de mise en oeuvre, d'outils "
        "de diagnostic (ACF Score), de surveillance en temps réel (ACF Control) et de certification "
        "indépendante (ACF Certification)."
    )
    pdf.body_text(
        "ACF est légalement protégé par le droit français de la propriété intellectuelle (enregistrement INPI, "
        "Loi n° 2018-670). Le framework est aligné avec le système de classification basé sur les risques de "
        "l'AI Act de l'UE et a été conçu pour aider les organisations à respecter les obligations "
        "réglementaires tout en maintenant un avantage concurrentiel grâce à un déploiement agentique "
        "responsable. Ce livre blanc présente la spécification complète de l'ACF - ses principes, sa "
        "structure, sa méthodologie, ses produits et sa base juridique."
    )

    # --- SECTION 2: LE DÉFI DU COMMERCE AGENTIQUE ---
    pdf.add_page()
    pdf.section_title(2, "Le défi du commerce agentique")
    pdf.body_text(
        "En 2026, les agents autonomes ne sont plus expérimentaux. Ils sont opérationnels. Dans tous les "
        "secteurs, des systèmes alimentés par l'IA exécutent des décisions commerciales à la vitesse de la "
        "machine - ajustant les prix en temps réel, qualifiant et routant automatiquement les prospects "
        "commerciaux, traitant les réclamations d'assurance sans examen humain, gérant les flux "
        "d'approvisionnement et négociant même les termes contractuels avec les contreparties. Ces agents "
        "fonctionnent 24h/24, traitent l'information à des échelles qu'aucune équipe humaine ne peut égaler, "
        "et apprennent de plus en plus de leurs propres résultats pour optimiser les décisions futures."
    )
    pdf.body_text(
        "Les avantages commerciaux sont indéniables : temps de réponse plus rapides, exécution cohérente, "
        "coûts opérationnels réduits et capacité de personnalisation à grande échelle. Cependant, cette "
        "accélération a dépassé la gouvernance. La plupart des organisations déployant des systèmes agentiques "
        "n'ont aucun cadre formel pour définir quelles décisions les agents peuvent prendre de manière autonome, "
        "lesquelles nécessitent une approbation humaine et lesquelles ne doivent jamais être déléguées."
    )
    pdf.body_text(
        "Les risques ne sont pas hypothétiques. Des erreurs de pricing pilotées par des agents ont provoqué "
        "des flash crashes sur les marchés de tarification dynamique. Des systèmes de qualification automatisée "
        "de prospects ont introduit des biais systématiques. Des agents de traitement de réclamations ont refusé "
        "des demandes légitimes de clients à grande échelle. Dans chaque cas, la cause racine était la même : "
        "l'absence d'un cadre de gouvernance définissant les limites, imposant la responsabilité et préservant "
        "l'autorité humaine sur les décisions critiques."
    )
    pdf.body_text(
        "Les régulateurs réagissent. L'AI Act de l'UE, en vigueur en 2026, établit un système de classification "
        "basé sur les risques avec des obligations spécifiques pour les systèmes d'IA à haut risque - une "
        "catégorie qui inclut de nombreux déploiements agentiques commerciaux. Les organisations sans cadre de "
        "gouvernance risquent non seulement des défaillances opérationnelles mais aussi des sanctions "
        "réglementaires, une responsabilité juridique et des dommages réputationnels. ACF a été créé pour "
        "combler cette lacune."
    )

    # --- SECTION 3: LE FRAMEWORK ACF ---
    pdf.add_page()
    pdf.section_title(3, "Le framework ACF")
    pdf.body_text(
        "L'Agentic Commerce Framework(R) est structuré autour de trois piliers architecturaux : 4 Principes "
        "fondateurs qui établissent des axiomes de gouvernance immuables, 4 Couches opérationnelles qui "
        "organisent la gouvernance de la stratégie à l'exécution, et 4 Niveaux de maturité qui classifient "
        "les systèmes agentiques par autonomie et risque."
    )

    pdf.subsection_title("4 Principes fondateurs")
    pdf.body_text(
        "Le framework ACF repose sur quatre axiomes immuables qui définissent la frontière entre l'autorité "
        "humaine et l'exécution autonome des agents. Ces principes sont non négociables."
    )
    pdf.numbered_item("01", "Souveraineté décisionnelle", "Les décisions stratégiques critiques ne sont jamais déléguées aux agents autonomes.")
    pdf.numbered_item("02", "Gouvernance par conception", "Les cadres de gouvernance sont définis avant le déploiement, pas après.")
    pdf.numbered_item("03", "Contrôle humain ultime", "Tout système agentique doit préserver la capacité d'intervention humaine.")
    pdf.numbered_item("04", "Responsabilité traçable", "Chaque action autonome doit pouvoir être auditée et attribuée.")
    pdf.ln(3)

    pdf.body_text(
        "La Souveraineté décisionnelle garantit que les décisions organisationnelles les plus conséquentes "
        "- direction stratégique, engagements financiers significatifs, obligations juridiques et considérations "
        "éthiques - restent exclusivement sous autorité humaine. La Gouvernance par conception impose que les "
        "structures, politiques et contrôles de gouvernance soient établis avant la mise en production de tout "
        "système agentique. Le Contrôle humain ultime exige que chaque agent déployé inclue des mécanismes "
        "de contournement, d'intervention et d'arrêt humain. La Responsabilité traçable assure que chaque "
        "action d'un agent autonome est journalisée dans des pistes d'audit inviolables."
    )

    pdf.subsection_title("4 Couches opérationnelles")
    pdf.numbered_item("COUCHE 01", "Gouvernance & souveraineté", "Charte de souveraineté, comité de gouvernance, matrice RACI.")
    pdf.numbered_item("COUCHE 02", "Politique de décision", "Objectifs pondérés, règles d'arbitrage, seuils d'escalade.")
    pdf.numbered_item("COUCHE 03", "Système d'agents", "Mandat explicite par agent, périmètre d'interaction, taxonomie à 5 catégories.")
    pdf.numbered_item("COUCHE 04", "Exécution & supervision", "Matrice de gating adaptative, 18 KPIs de souveraineté, tableaux de bord.")
    pdf.ln(3)

    pdf.body_text(
        "La Couche 1 établit la fondation organisationnelle. La Couche 2 traduit l'intention de gouvernance "
        "en politiques opérationnelles. La Couche 3 définit le système d'agents avec des mandats explicites. "
        "La Couche 4 assure la surveillance en temps réel via le tableau de bord ACF Control, suivant "
        "18 KPIs de souveraineté sur 6 axes de gouvernance."
    )

    pdf.subsection_title("4 Niveaux de maturité")
    pdf.numbered_item("NIVEAU 0", "Automation classique", "Règles fixes, pas de ML. Risque très faible.")
    pdf.numbered_item("NIVEAU 1", "Agents assistés", "Les agents analysent et recommandent. Risque faible.")
    pdf.numbered_item("NIVEAU 2", "Agents gouvernés [RECOMMANDÉ]", "Les agents décident dans une gouvernance stricte. Risque modéré.")
    pdf.numbered_item("NIVEAU 3", "Autonomie supervisée", "Les agents décident et apprennent. Gouvernance maximale. Risque élevé.")
    pdf.ln(3)

    pdf.body_text(
        "Le modèle de maturité sert à la fois d'outil de classification et de feuille de route de progression. "
        "Le Niveau 2 (Agents gouvernés) est la cible de déploiement recommandée pour la plupart des organisations. "
        "Les déploiements de Niveau 3 sont réservés aux organisations avec une infrastructure de gouvernance "
        "mature et des capacités de surveillance robustes."
    )

    # --- SECTION 4: MÉTHODOLOGIE ---
    pdf.add_page()
    pdf.section_title(4, "Méthodologie de mise en oeuvre")
    pdf.body_text(
        "ACF est mis en oeuvre à travers une méthodologie séquentielle de 8 modules conçue pour un déploiement "
        "progressif sur 6 à 18 mois. Chaque module s'appuie sur le précédent, créant une infrastructure de "
        "gouvernance cumulative qui se renforce à chaque phase."
    )

    pdf.subsection_title("8 Modules de mise en oeuvre")
    pdf.numbered_item("MOD 01", "Diagnostic de souveraineté", "Calcul du Score de souveraineté. Cartographie des zones à risque.")
    pdf.body_text(
        "La mise en oeuvre commence par un diagnostic complet de la posture de gouvernance actuelle de "
        "l'organisation. Le diagnostic identifie les déploiements agentiques existants, évalue leurs niveaux "
        "d'autonomie et documente les lacunes de gouvernance."
    )

    pdf.numbered_item("MOD 02", "Cartographie décisionnelle", "Matrice de criticité. Zones non-déléguables définies.")
    pdf.body_text(
        "Le Module 2 crée une cartographie complète des décisions organisationnelles, classifiant chacune par "
        "criticité, réversibilité, impact financier, implications juridiques et sensibilité éthique."
    )

    pdf.numbered_item("MOD 03", "Constitution agentique", "9 articles. Signé par le comité de gouvernance.")
    pdf.body_text(
        "La Constitution agentique est le document de gouvernance fondateur. Composée de 9 articles, elle "
        "établit le cadre juridique et opérationnel pour le déploiement d'agents autonomes. Elle définit le "
        "rôle du DDA, établit les protocoles d'escalade et codifie l'autorité du Kill Switch."
    )

    pdf.numbered_item("MOD 04", "Conception du système d'agents", "Fiches de mandat, périmètres d'interaction.")
    pdf.body_text(
        "Chaque agent déployé reçoit une fiche de mandat formelle spécifiant sa portée opérationnelle, son "
        "niveau d'autonomie, son périmètre d'interaction, ses droits d'accès aux données et ses déclencheurs "
        "d'escalade."
    )

    pdf.numbered_item("MOD 05", "Sécurité & réversibilité", "Sandboxing, plan de réversibilité, conception du Kill Switch.")
    pdf.body_text(
        "Le Module 5 établit l'infrastructure de sécurité pour les opérations agentiques : protocoles de "
        "sandboxing, plan de réversibilité complet et conception du protocole Kill Switch à trois niveaux."
    )

    pdf.numbered_item("MOD 06", "Gouvernance continue", "Revues mensuelles. Audit de conformité annuel.")
    pdf.body_text(
        "La gouvernance n'est pas un événement ponctuel. Ce module établit la cadence de supervision continue : "
        "revues mensuelles, recalculs trimestriels du score de souveraineté et audits de conformité annuels."
    )

    pdf.numbered_item("MOD 07", "Feuille de route", "Déploiement progressif en 5 phases.")
    pdf.body_text(
        "La feuille de route traduit le cadre de gouvernance en un plan de déploiement phasé, du pilote "
        "à la couverture organisationnelle complète."
    )

    pdf.numbered_item("MOD 08", "Gestion de crise", "Incidents à 3 niveaux. Exercices de Kill Switch.")
    pdf.body_text(
        "Le dernier module établit les protocoles de gestion de crise spécifiquement conçus pour les incidents "
        "agentiques, avec des exercices réguliers de Kill Switch."
    )

    pdf.subsection_title("Le rôle DDA (Delegated Decision Agent Officer)")
    pdf.body_text(
        "Le DDA est l'autorité humaine désignée responsable de la gouvernance de tous les agents autonomes "
        "au sein de l'organisation. Le DDA est le gardien légal des systèmes agentiques de l'organisation - "
        "responsable de l'approbation des mandats d'agents, de la surveillance des KPIs de souveraineté, "
        "de l'autorisation d'activation du Kill Switch et du reporting au comité de gouvernance."
    )
    pdf.body_text(
        "Chaque entreprise native IA a besoin d'un DDA. Le rôle exige une combinaison unique de compétences : "
        "compréhension des capacités et limites de l'IA, expertise en gouvernance et conformité, connaissance "
        "opérationnelle des processus métier, et l'autorité d'interrompre les opérations agentiques lorsque "
        "les seuils de gouvernance sont franchis."
    )

    # --- SECTION 5: KILL SWITCH ---
    pdf.add_page()
    pdf.section_title(5, "Le protocole Kill Switch")
    pdf.body_text(
        "Le protocole Kill Switch est le mécanisme d'intervention d'urgence d'ACF - un système structuré "
        "et multi-niveaux pour interrompre ou terminer les opérations des agents autonomes lorsque les limites "
        "de gouvernance sont franchies. Un kill switch efficace n'est pas un simple bouton. ACF spécifie trois "
        "niveaux d'interruption avec des portées, temps de réponse et exigences d'autorisation définis."
    )

    pdf.numbered_item("NIVEAU 1", "Pause tactique", "Suspension individuelle d'agent. Temps de réponse : immédiat.")
    pdf.body_text(
        "Une intervention de Niveau 1 suspend les opérations autonomes d'un agent spécifique tout en préservant "
        "l'écosystème agentique plus large. L'agent est placé en mode supervisé où toutes les décisions "
        "nécessitent une approbation humaine."
    )

    pdf.numbered_item("NIVEAU 2", "Arrêt opérationnel", "Suspension par catégorie. Temps de réponse : <15 minutes.")
    pdf.body_text(
        "Une intervention de Niveau 2 arrête tous les agents d'une catégorie ou d'un domaine opérationnel "
        "spécifique. Déclenchée lors de problèmes systémiques détectés. Nécessite une double autorisation "
        "du DDA et du responsable du comité de gouvernance."
    )

    pdf.numbered_item("NIVEAU 3", "Arrêt total", "Arrêt complet du système agentique. Temps de réponse : <5 minutes.")
    pdf.body_text(
        "Une intervention de Niveau 3 est un arrêt complet de toutes les opérations d'agents autonomes dans "
        "l'organisation. Réservée aux scénarios catastrophiques. Nécessite l'autorisation exécutive (PDG) "
        "plus le DDA. Des procédures de repli manuelles pré-planifiées sont activées."
    )

    # --- SECTION 6: PRODUITS ACF ---
    pdf.add_page()
    pdf.section_title(6, "Les produits ACF")
    pdf.body_text(
        "Le Standard ACF est opérationnalisé à travers trois produits complémentaires formant l'écosystème ACF."
    )

    pdf.subsection_title("ACF Score - Métrique de souveraineté")
    pdf.body_text(
        "ACF Score est l'outil de diagnostic propriétaire qui mesure la souveraineté décisionnelle d'une "
        "organisation sur 6 dimensions de gouvernance. Le Score de souveraineté composite fournit une métrique "
        "unique et autoritaire représentant la maturité de gouvernance. Les 6 axes mesurés sont : Autorité "
        "décisionnelle, Application des politiques, Clarté des mandats d'agents, Couverture de surveillance, "
        "Préparation à la réversibilité et Infrastructure de responsabilité."
    )

    pdf.subsection_title("ACF Control - Tableau de bord de gouvernance")
    pdf.body_text(
        "ACF Control est la plateforme SaaS de gouvernance en temps réel qui surveille 18 KPIs de souveraineté "
        "sur les 6 axes. Elle fournit une visibilité continue sur le comportement des agents, la conformité "
        "de gouvernance et la posture de souveraineté. Le système de gating adaptatif ajuste automatiquement "
        "les niveaux d'autonomie des agents en fonction des performances KPI en temps réel."
    )

    pdf.subsection_title("ACF Certification")
    pdf.body_text(
        "ACF Certification est le programme d'attestation indépendante qui vérifie la conformité d'une "
        "organisation au standard de gouvernance ACF. La certification est publiquement vérifiable et fournit "
        "aux parties prenantes une assurance tierce. Trois niveaux de certification correspondent aux niveaux "
        "de maturité ACF. La certification implique un audit complet par des praticiens ACF accrédités et "
        "est valide un an avec renouvellement annuel."
    )

    # --- SECTION 7: PROTECTION LÉGALE ---
    pdf.add_page()
    pdf.section_title(7, "Protection légale (INPI)")
    pdf.body_text(
        "L'Agentic Commerce Framework(R) (ACF(R)) est une marque déposée protégée par le droit français de la "
        "propriété intellectuelle. L'enregistrement a été déposé auprès de l'INPI (Institut National de la "
        "Propriété Industrielle) conformément aux dispositions de la Loi n° 2018-670, qui offre une protection "
        "complète pour la marque ACF, la méthodologie et les outils associés."
    )
    pdf.body_text(
        "La protection légale couvre : le nom et l'identité de marque ACF(R), la méthodologie de gouvernance "
        "complète incluant les 4 principes, 4 couches, 4 niveaux de maturité et 8 modules, la méthodologie "
        "de diagnostic ACF Score(R), la conception de la plateforme ACF Control, le programme ACF Certification, "
        "et toute la documentation et les supports praticiens associés."
    )

    # --- SECTION 8: À PROPOS ---
    pdf.section_title(8, "À propos d'AI CONSULTING")
    pdf.body_text(
        "AI CONSULTING est l'organisation fondée par Vincent DORANGE qui a développé et maintient l'Agentic "
        "Commerce Framework(R). Basée en France, AI CONSULTING est spécialisée dans la stratégie de gouvernance "
        "IA, la conception de systèmes agentiques et l'évaluation de souveraineté pour les organisations "
        "déployant des agents IA autonomes dans des environnements commerciaux."
    )
    pdf.body_text(
        "Vincent DORANGE a créé ACF en réponse à une lacune critique identifiée sur le marché : alors que "
        "les organisations adoptaient rapidement des agents autonomes, aucun standard de gouvernance complet "
        "n'existait pour guider un déploiement responsable. AI CONSULTING opère l'écosystème ACF incluant "
        "la plateforme de diagnostic ACF Score, le tableau de bord ACF Control et le programme ACF Certification. "
        "L'organisation gère également le réseau de praticiens ACF - une communauté croissante de professionnels "
        "de gouvernance accrédités."
    )

    # Final page
    pdf.add_page()
    pdf.ln(40)
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 12, "Agentic Commerce Framework(R)", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*DARK_TEXT)
    pdf.cell(0, 8, "Le Standard Mondial de Gouvernance IA", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "dans les Environnements Commerciaux", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(15)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*GRAY)
    pdf.cell(0, 6, "www.acf-standard.com", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, "contact@ai-consulting.fr", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(0, 6, "© 2026 Vincent DORANGE - AI CONSULTING", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, "Tous droits réservés. Protégé INPI.", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.output(output_path)
    print(f"Generated: {output_path}")


if __name__ == "__main__":
    public_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")
    os.makedirs(public_dir, exist_ok=True)

    en_path = os.path.join(public_dir, "acf-whitepaper-en.pdf")
    fr_path = os.path.join(public_dir, "acf-whitepaper-fr.pdf")

    generate_en(en_path)
    generate_fr(fr_path)
    print("Done! Both PDFs generated.")
