#!/usr/bin/env python3
"""Generate ACF French Whitepaper PDF using ReportLab."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Frame, PageTemplate, BaseDocTemplate
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ── Colors ──
NAVY = HexColor("#050c1a")
DARK_BG = HexColor("#0a1628")
GOLD = HexColor("#c9a84c")
LIGHT_GOLD = HexColor("#e8d5a0")
DARK_GOLD = HexColor("#9a7a30")
WHITE = white
GREY = HexColor("#94a3b8")
LIGHT_GREY = HexColor("#e2e8f0")
MEDIUM_GREY = HexColor("#64748b")
CARD_BG = HexColor("#111827")
DARK_CARD = HexColor("#0f172a")

W, H = A4  # 595.28 x 841.89 points

OUTPUT_PATH = r"C:\Users\vdora\acfstandard\public\acf-whitepaper-fr.pdf"


def draw_gold_line(c, x, y, width, thickness=1):
    """Draw a gold horizontal line."""
    c.setStrokeColor(GOLD)
    c.setLineWidth(thickness)
    c.line(x, y, x + width, y)


def draw_cover_page(c):
    """Page 1: Cover page."""
    # Full navy background
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Gold accent line at top
    draw_gold_line(c, 40, H - 50, W - 80, 2)

    # Small label
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 10)
    c.drawString(40, H - 80, "AI CONSULTING")

    # Main title
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 36)
    c.drawString(40, H - 140, "Agentic Commerce")
    c.drawString(40, H - 185, "Framework\u00ae")

    # Gold subtitle line
    draw_gold_line(c, 40, H - 205, 200, 2)

    # Subtitle
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(40, H - 240, "LIVRE BLANC")

    c.setFillColor(LIGHT_GREY)
    c.setFont("Helvetica", 13)
    c.drawString(40, H - 270, "Le standard mondial de gouvernance pour les")
    c.drawString(40, H - 288, "syst\u00e8mes agentiques autonomes en environnement commercial.")

    # 4 Stats boxes
    stats = [
        ("4", "Principes\nFondateurs"),
        ("8", "Modules\nd'Impl\u00e9mentation"),
        ("18", "KPIs de\nSouverainet\u00e9"),
        ("17", "Outils\nPropri\u00e9taires"),
    ]
    box_w = 115
    box_h = 80
    start_x = 40
    start_y = H - 410

    for i, (val, label) in enumerate(stats):
        x = start_x + i * (box_w + 12)
        # Box background
        c.setFillColor(DARK_CARD)
        c.roundRect(x, start_y, box_w, box_h, 6, fill=1, stroke=0)
        # Gold border top
        c.setStrokeColor(GOLD)
        c.setLineWidth(2)
        c.line(x + 10, start_y + box_h, x + box_w - 10, start_y + box_h)
        # Value
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 28)
        c.drawCentredString(x + box_w / 2, start_y + 42, val)
        # Label
        c.setFillColor(GREY)
        c.setFont("Helvetica", 8)
        lines = label.split("\n")
        for j, line in enumerate(lines):
            c.drawCentredString(x + box_w / 2, start_y + 22 - j * 11, line)

    # Author & date section
    y_info = start_y - 60
    draw_gold_line(c, 40, y_info + 30, W - 80, 1)

    c.setFillColor(GREY)
    c.setFont("Helvetica", 10)
    c.drawString(40, y_info, "Auteur")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y_info - 18, "Vincent DORANGE")

    c.setFillColor(GREY)
    c.setFont("Helvetica", 10)
    c.drawString(250, y_info, "Date")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(250, y_info - 18, "Décembre 2025")

    c.setFillColor(GREY)
    c.setFont("Helvetica", 10)
    c.drawString(400, y_info, "Classification")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(400, y_info - 18, "Public")

    # Footer
    draw_gold_line(c, 40, 60, W - 80, 1)
    c.setFillColor(GREY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W / 2, 42, "www.acfstandard.com")


def draw_page_bg(c):
    """Draw navy background for content pages."""
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def draw_footer(c, page_num):
    """Draw simple footer."""
    draw_gold_line(c, 40, 50, W - 80, 0.5)
    c.setFillColor(GREY)
    c.setFont("Helvetica", 7)
    c.drawString(40, 35, "\u00a9 2026 Agentic Commerce Framework\u00ae")
    c.drawRightString(W - 40, 35, str(page_num))


def draw_section_header(c, number, title, y):
    """Draw a section header with number and title."""
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, number)
    draw_gold_line(c, 40, y - 8, W - 80, 1.5)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(40, y - 38, title)
    return y - 60


def draw_body_text(c, text, x, y, max_width=None, font_size=11, color=LIGHT_GREY, line_height=16):
    """Draw wrapped body text. Returns new y position."""
    if max_width is None:
        max_width = W - 80
    c.setFillColor(color)
    c.setFont("Helvetica", font_size)

    words = text.split()
    lines = []
    current_line = ""
    for word in words:
        test = current_line + " " + word if current_line else word
        if c.stringWidth(test, "Helvetica", font_size) < max_width:
            current_line = test
        else:
            lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)

    for line in lines:
        c.drawString(x, y, line)
        y -= line_height
    return y


def draw_toc_page(c):
    """Page 2: Table des mati\u00e8res."""
    draw_page_bg(c)

    y = H - 80
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 10)
    c.drawString(40, y, "// Sommaire")

    y -= 40
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(40, y, "Table des mati\u00e8res")

    y -= 20
    draw_gold_line(c, 40, y, 120, 2)

    toc_items = [
        ("01", "R\u00e9sum\u00e9 ex\u00e9cutif", "3"),
        ("02", "Le d\u00e9fi du commerce agentique", "4"),
        ("03", "Le framework ACF\u00ae", "5"),
        ("04", "M\u00e9thodologie \u2014 8 Modules", "7"),
        ("05", "Protocole d'arr\u00eat d'urgence", "8"),
        ("06", "Les produits ACF\u00ae", "9"),
        ("07", "\u00c0 propos", "10"),
    ]

    y -= 50
    for num, title, page in toc_items:
        # Number
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(50, y, num)
        # Title
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 14)
        c.drawString(90, y, title)
        # Dots + page
        c.setFillColor(GREY)
        c.setFont("Helvetica", 11)
        dots = "." * 40
        dot_x = W - 80 - c.stringWidth(page, "Helvetica", 11) - c.stringWidth(dots, "Helvetica", 11)
        # Page number
        c.drawRightString(W - 50, y, page)
        # Subtle line
        c.setStrokeColor(HexColor("#1e293b"))
        c.setLineWidth(0.5)
        c.line(90, y - 8, W - 60, y - 8)

        y -= 40

    draw_footer(c, 2)


def draw_executive_summary(c):
    """Page 3: R\u00e9sum\u00e9 ex\u00e9cutif."""
    draw_page_bg(c)

    y = H - 80
    y = draw_section_header(c, "01", "R\u00e9sum\u00e9 ex\u00e9cutif", y)

    y -= 20
    text1 = (
        "L'Agentic Commerce Framework\u00ae (ACF) est le standard mondial de gouvernance "
        "con\u00e7u pour les organisations d\u00e9ployant des agents autonomes dans des "
        "environnements commerciaux. Cr\u00e9\u00e9 par Vincent DORANGE, expert en gouvernance IA, "
        "l'ACF d\u00e9finit une m\u00e9thodologie compl\u00e8te articulant 4 principes fondateurs, "
        "4 couches op\u00e9rationnelles, 8 modules d'impl\u00e9mentation et 18 KPIs de souverainet\u00e9."
    )
    y = draw_body_text(c, text1, 40, y, font_size=12, line_height=18)

    y -= 18
    text2 = (
        "Face \u00e0 la multiplication des syst\u00e8mes agentiques dans le commerce, la finance "
        "et les op\u00e9rations, l'ACF fournit le cadre n\u00e9cessaire pour garantir que les "
        "d\u00e9cisions strat\u00e9giques restent sous contr\u00f4le humain, que chaque action "
        "autonome est tra\u00e7able et auditable, et que des m\u00e9canismes d'arr\u00eat d'urgence "
        "sont toujours disponibles."
    )
    y = draw_body_text(c, text2, 40, y, font_size=12, line_height=18)

    # Quote box
    y -= 30
    box_y = y - 70
    c.setFillColor(DARK_CARD)
    c.roundRect(40, box_y, W - 80, 80, 8, fill=1, stroke=0)
    # Gold left border
    c.setFillColor(GOLD)
    c.rect(40, box_y, 4, 80, fill=1, stroke=0)

    c.setFillColor(LIGHT_GOLD)
    c.setFont("Helvetica-Oblique", 11)
    c.drawString(60, box_y + 52, "\u00ab La question n'est plus de savoir s'il faut d\u00e9ployer des agents.")
    c.drawString(60, box_y + 36, "C'est de savoir comment les d\u00e9ployer sans c\u00e9der")
    c.drawString(60, box_y + 20, "votre souverainet\u00e9 d\u00e9cisionnelle. \u00bb")

    c.setFillColor(GOLD)
    c.setFont("Helvetica", 9)
    c.drawString(60, box_y + 4, "\u2014 Agentic Commerce Framework\u00ae")

    # Key numbers
    y = box_y - 50
    draw_gold_line(c, 40, y + 20, W - 80, 1)

    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(40, y, "CHIFFRES CL\u00c9S")

    y -= 30
    key_stats = [
        ("4 Principes", "Axiomes immuables de souverainet\u00e9"),
        ("4 Couches", "Architecture hi\u00e9rarchique de gouvernance"),
        ("8 Modules", "D\u00e9ploiement progressif sur 6\u201318 mois"),
        ("18 KPIs", "Indicateurs de souverainet\u00e9 en temps r\u00e9el"),
        ("17 Outils", "Instruments propri\u00e9taires de gouvernance"),
        ("4 Niveaux", "De l'automatisation classique \u00e0 l'autonomie supervis\u00e9e"),
    ]
    for stat_label, stat_desc in key_stats:
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(50, y, stat_label)
        c.setFillColor(GREY)
        c.setFont("Helvetica", 10)
        c.drawString(170, y, stat_desc)
        y -= 22

    draw_footer(c, 3)


def draw_challenge_page(c):
    """Page 4: Le d\u00e9fi du commerce agentique."""
    draw_page_bg(c)

    y = H - 80
    y = draw_section_header(c, "02", "Le d\u00e9fi du commerce agentique", y)

    y -= 20
    text1 = (
        "En 2026, les agents autonomes ex\u00e9cutent d\u00e9j\u00e0 des d\u00e9cisions dans des "
        "environnements commerciaux \u2014 fixation de prix, qualification de leads, "
        "traitement de r\u00e9clamations, gestion de contrats. La plupart des organisations "
        "n'ont aucun cadre pour les gouverner."
    )
    y = draw_body_text(c, text1, 40, y, font_size=12, line_height=18)

    y -= 18
    text2 = (
        "Sans gouvernance structur\u00e9e, chaque agent d\u00e9ploy\u00e9 repr\u00e9sente un risque "
        "juridique, financier et r\u00e9putationnel. Les d\u00e9cisions prises sans supervision "
        "humaine peuvent entra\u00eener des engagements contractuels non autoris\u00e9s, des "
        "violations r\u00e9glementaires ou des pertes financi\u00e8res irr\u00e9versibles."
    )
    y = draw_body_text(c, text2, 40, y, font_size=12, line_height=18)

    y -= 18
    text3 = (
        "L'ACF\u00ae a \u00e9t\u00e9 cr\u00e9\u00e9 pour combler ce vide \u2014 avant qu'une d\u00e9faillance "
        "de gouvernance ne devienne une crise l\u00e9gale, financi\u00e8re ou r\u00e9putationnelle. "
        "C'est le premier standard mondial \u00e0 proposer une m\u00e9thodologie compl\u00e8te et "
        "actionnable pour la gouvernance des syst\u00e8mes agentiques."
    )
    y = draw_body_text(c, text3, 40, y, font_size=12, line_height=18)

    # Risk categories
    y -= 40
    draw_gold_line(c, 40, y + 15, W - 80, 1)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(40, y - 5, "RISQUES IDENTIFI\u00c9S")

    risks = [
        ("Risque juridique", "Engagements contractuels pris sans autorisation humaine"),
        ("Risque financier", "D\u00e9cisions de pricing ou d'investissement non supervis\u00e9es"),
        ("Risque r\u00e9glementaire", "Non-conformit\u00e9 au EU AI Act et r\u00e9glementations locales"),
        ("Risque r\u00e9putationnel", "Actions d'agents visibles par les clients sans contr\u00f4le"),
        ("Risque op\u00e9rationnel", "Cascades de d\u00e9cisions autonomes sans m\u00e9canisme d'arr\u00eat"),
    ]

    y -= 35
    for title, desc in risks:
        # Card
        c.setFillColor(DARK_CARD)
        c.roundRect(50, y - 10, W - 100, 38, 5, fill=1, stroke=0)
        # Gold dot
        c.setFillColor(GOLD)
        c.circle(68, y + 8, 4, fill=1, stroke=0)
        # Title
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(82, y + 12, title)
        # Description
        c.setFillColor(GREY)
        c.setFont("Helvetica", 9)
        c.drawString(82, y - 2, desc)

        y -= 52

    draw_footer(c, 4)


def draw_framework_page1(c):
    """Page 5: Le framework ACF - Principes & Couches."""
    draw_page_bg(c)

    y = H - 80
    y = draw_section_header(c, "03", "Le framework ACF\u00ae", y)

    # 4 Principles
    y -= 15
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "Les 4 Principes Fondateurs")

    y -= 8
    draw_gold_line(c, 40, y, 180, 1)

    principles = [
        ("P1", "S\u00e9paration d\u00e9cision / ex\u00e9cution",
         "Les d\u00e9cisions strat\u00e9giques critiques ne sont jamais d\u00e9l\u00e9gu\u00e9es aux agents autonomes."),
        ("P2", "Zones non-d\u00e9l\u00e9guables",
         "Certaines d\u00e9cisions sont d\u00e9finies comme strictement r\u00e9serv\u00e9es \u00e0 l'humain."),
        ("P3", "Tra\u00e7abilit\u00e9 & interruptibilit\u00e9",
         "Chaque action autonome est auditable et le syst\u00e8me peut \u00eatre interrompu \u00e0 tout moment."),
        ("P4", "Gouvernance vivante",
         "Le cadre de gouvernance \u00e9volue continuellement avec les capacit\u00e9s des agents."),
    ]

    y -= 20
    for code, title, desc in principles:
        c.setFillColor(DARK_CARD)
        c.roundRect(50, y - 12, W - 100, 45, 5, fill=1, stroke=0)
        # Gold number
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(62, y + 16, code)
        # Title
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(95, y + 16, title)
        # Desc
        c.setFillColor(GREY)
        c.setFont("Helvetica", 9)
        c.drawString(62, y - 2, desc)
        y -= 55

    # 4 Layers
    y -= 10
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "Les 4 Couches Op\u00e9rationnelles")

    y -= 8
    draw_gold_line(c, 40, y, 200, 1)

    layers = [
        ("C1", "Strat\u00e9gique", "Charte de souverainet\u00e9, comit\u00e9 de gouvernance, matrice RACI"),
        ("C2", "Tactique", "Objectifs pond\u00e9r\u00e9s, r\u00e8gles d'arbitrage, seuils d'escalade"),
        ("C3", "Op\u00e9rationnelle", "Mandats par agent, p\u00e9rim\u00e8tres d'interaction, taxonomie 5 cat\u00e9gories"),
        ("C4", "Technique", "Gating adaptatif, alertes multi-niveaux, 18 KPIs, dashboards temps r\u00e9el"),
    ]

    y -= 20
    for code, title, desc in layers:
        c.setFillColor(DARK_CARD)
        c.roundRect(50, y - 10, W - 100, 40, 5, fill=1, stroke=0)
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(62, y + 14, code)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(95, y + 14, title)
        c.setFillColor(GREY)
        c.setFont("Helvetica", 9)
        c.drawString(62, y - 2, desc)
        y -= 50

    draw_footer(c, 5)


def draw_framework_page2(c):
    """Page 6: Niveaux de maturit\u00e9."""
    draw_page_bg(c)

    y = H - 80
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 10)
    c.drawString(40, y, "03 // Suite")

    y -= 35
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "Les 4 Niveaux de Maturit\u00e9 Agentique")

    y -= 8
    draw_gold_line(c, 40, y, 260, 1)

    c.setFillColor(GREY)
    c.setFont("Helvetica", 10)
    y -= 20
    c.drawString(40, y, "L'ACF classe les syst\u00e8mes par niveau d'autonomie. Le Niveau 2 est la cible recommand\u00e9e.")

    levels = [
        ("NIVEAU 0", "Automatisation classique", "Tr\u00e8s faible",
         "R\u00e8gles fixes, aucun ML. Intervention humaine pour toute modification.",
         None),
        ("NIVEAU 1", "Agents assist\u00e9s", "Faible",
         "Les agents analysent et recommandent. Chaque d\u00e9cision finale reste humaine.",
         None),
        ("NIVEAU 2", "Agents gouvern\u00e9s", "Mod\u00e9r\u00e9",
         "Les agents d\u00e9cident dans un cadre strict. Zones non-d\u00e9l\u00e9guables verrouill\u00e9es.",
         "\u2605 CIBLE RECOMMAND\u00c9E"),
        ("NIVEAU 3", "Autonomie supervis\u00e9e", "\u00c9lev\u00e9",
         "Les agents d\u00e9cident et apprennent. Gouvernance maximale requise.",
         None),
    ]

    y -= 30
    for code, name, risk, desc, badge in levels:
        box_h = 75 if badge else 65
        c.setFillColor(DARK_CARD)
        c.roundRect(40, y - 10, W - 80, box_h, 6, fill=1, stroke=0)

        if badge:
            # Gold border for recommended
            c.setStrokeColor(GOLD)
            c.setLineWidth(1.5)
            c.roundRect(40, y - 10, W - 80, box_h, 6, fill=0, stroke=1)

        # Level code
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(55, y + box_h - 30, code)

        # Name
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(160, y + box_h - 30, name)

        # Risk
        c.setFillColor(MEDIUM_GREY)
        c.setFont("Helvetica", 9)
        c.drawRightString(W - 55, y + box_h - 28, "Risque : " + risk)

        # Description
        c.setFillColor(GREY)
        c.setFont("Helvetica", 10)
        c.drawString(55, y + box_h - 50, desc)

        # Badge
        if badge:
            c.setFillColor(GOLD)
            c.setFont("Helvetica-Bold", 9)
            c.drawString(55, y + box_h - 66, badge)

        y -= (box_h + 18)

    # Visualization hint
    y -= 20
    draw_gold_line(c, 40, y + 10, W - 80, 0.5)
    c.setFillColor(GREY)
    c.setFont("Helvetica-Oblique", 10)
    c.drawCentredString(W / 2, y - 10, "Niveau 0  \u2192  Niveau 1  \u2192  Niveau 2 \u2605  \u2192  Niveau 3")
    c.setFillColor(MEDIUM_GREY)
    c.setFont("Helvetica", 9)
    c.drawCentredString(W / 2, y - 28, "Progression recommand\u00e9e \u2014 chaque niveau requiert une gouvernance plus mature")

    draw_footer(c, 6)


def draw_methodology_page(c):
    """Page 7: 8 Modules d'impl\u00e9mentation."""
    draw_page_bg(c)

    y = H - 80
    y = draw_section_header(c, "04", "M\u00e9thodologie", y)

    y -= 10
    c.setFillColor(GREY)
    c.setFont("Helvetica", 11)
    c.drawString(40, y, "8 modules d\u00e9ploy\u00e9s progressivement sur 6 \u00e0 18 mois.")
    c.drawString(40, y - 16, "Chaque module s'appuie sur le pr\u00e9c\u00e9dent.")

    modules = [
        ("MOD 01", "Diagnostic de souverainet\u00e9", "Calcul du Score de souverainet\u00e9. Cartographie des zones de risque."),
        ("MOD 02", "Cartographie d\u00e9cisionnelle", "Matrice de criticit\u00e9. Identification des zones non-d\u00e9l\u00e9guables."),
        ("MOD 03", "Constitution agentique", "9 articles. Sign\u00e9e par le comit\u00e9 de gouvernance."),
        ("MOD 04", "Design du syst\u00e8me agent", "Fiches mandat, p\u00e9rim\u00e8tres d'interaction, niveaux d'autonomie."),
        ("MOD 05", "S\u00e9curit\u00e9 & r\u00e9versibilit\u00e9", "Sandboxing, plan de r\u00e9versibilit\u00e9, conception du protocole d'arr\u00eat."),
        ("MOD 06", "Gouvernance continue", "Revues mensuelles. Audit de conformit\u00e9 annuel."),
        ("MOD 07", "Feuille de route", "D\u00e9ploiement progressif en 5 phases."),
        ("MOD 08", "Gestion de crise", "Incidents 3 niveaux. Exercices de simulation d'arr\u00eat d'urgence."),
    ]

    y -= 40
    for code, name, desc in modules:
        c.setFillColor(DARK_CARD)
        c.roundRect(40, y - 6, W - 80, 48, 5, fill=1, stroke=0)

        # Code
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(52, y + 24, code)

        # Name
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(120, y + 24, name)

        # Description
        c.setFillColor(GREY)
        c.setFont("Helvetica", 9)
        c.drawString(52, y + 6, desc)

        y -= 58

    # Timeline hint
    y -= 5
    draw_gold_line(c, 40, y + 10, W - 80, 0.5)
    c.setFillColor(GREY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawCentredString(W / 2, y - 8, "D\u00e9ploiement recommand\u00e9 : Modules 01\u201303 (Mois 1\u20133) \u2192 Modules 04\u201306 (Mois 4\u20139) \u2192 Modules 07\u201308 (Mois 10\u201318)")

    draw_footer(c, 7)


def draw_emergency_stop_page(c):
    """Page 8: Protocole d'arr\u00eat d'urgence."""
    draw_page_bg(c)

    y = H - 80
    y = draw_section_header(c, "05", "Protocole d'arr\u00eat d'urgence", y)

    y -= 15
    text1 = (
        "Un m\u00e9canisme d'arr\u00eat efficace n'est pas un simple bouton. "
        "L'ACF sp\u00e9cifie trois niveaux d'interruption avec des temps "
        "de r\u00e9ponse d\u00e9finis et des proc\u00e9dures d'escalade claires."
    )
    y = draw_body_text(c, text1, 40, y, font_size=12, line_height=18)

    levels = [
        ("NIVEAU 1", "Pause op\u00e9rationnelle",
         "Suspension des op\u00e9rations non critiques. Les agents continuent les t\u00e2ches en cours "
         "mais n'initient plus de nouvelles actions. D\u00e9clenchement automatique ou manuel.",
         "< 30 secondes", "#22c55e"),
        ("NIVEAU 2", "Arr\u00eat d\u00e9cisionnel",
         "Suspension compl\u00e8te de toute prise de d\u00e9cision par les agents. Toutes les "
         "d\u00e9cisions en attente sont redirig\u00e9es vers des op\u00e9rateurs humains.",
         "< 5 secondes", "#f59e0b"),
        ("NIVEAU 3", "Arr\u00eat syst\u00e8me total",
         "Interruption compl\u00e8te de tous les syst\u00e8mes agentiques. Basculement "
         "vers les processus manuels de secours. R\u00e9servation au comit\u00e9 de gouvernance.",
         "< 1 seconde", "#ef4444"),
    ]

    y -= 35
    for code, name, desc, response, color_hex in levels:
        box_h = 110
        c.setFillColor(DARK_CARD)
        c.roundRect(40, y - 10, W - 80, box_h, 6, fill=1, stroke=0)

        # Color indicator bar
        c.setFillColor(HexColor(color_hex))
        c.rect(40, y - 10, 5, box_h, fill=1, stroke=0)

        # Level code
        c.setFillColor(HexColor(color_hex))
        c.setFont("Helvetica-Bold", 12)
        c.drawString(58, y + box_h - 28, code)

        # Name
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(150, y + box_h - 28, name)

        # Response time
        c.setFillColor(HexColor(color_hex))
        c.setFont("Helvetica-Bold", 9)
        c.drawRightString(W - 55, y + box_h - 26, "Temps : " + response)

        # Description
        c.setFillColor(GREY)
        c.setFont("Helvetica", 10)
        # Word wrap
        words = desc.split()
        line = ""
        ly = y + box_h - 48
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 10) < W - 140:
                line = test
            else:
                c.drawString(58, ly, line)
                ly -= 14
                line = word
        if line:
            c.drawString(58, ly, line)

        y -= (box_h + 20)

    # Protocol note
    y -= 10
    draw_gold_line(c, 40, y + 15, W - 80, 0.5)
    c.setFillColor(GREY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawCentredString(W / 2, y - 5, "Chaque niveau est test\u00e9 via des exercices de simulation trimestriels (Module 08)")

    draw_footer(c, 8)


def draw_products_page(c):
    """Page 9: Les produits ACF."""
    draw_page_bg(c)

    y = H - 80
    y = draw_section_header(c, "06", "Les produits ACF\u00ae", y)

    y -= 10
    c.setFillColor(GREY)
    c.setFont("Helvetica", 11)
    c.drawString(40, y, "Quatre produits compl\u00e9mentaires op\u00e9rationnalisant le standard ACF.")

    products = [
        ("ACF AI Act Checker", "OUTIL DE CONFORMIT\u00c9",
         "Outil de pr\u00e9-diagnostic gratuit pour v\u00e9rifier la conformit\u00e9 de votre syst\u00e8me IA "
         "avec le EU AI Act. Identifiez vos obligations selon votre r\u00f4le et niveau de risque.",
         ["Diagnostic de conformit\u00e9 EU AI Act",
          "Cartographie des obligations par r\u00f4le",
          "Classification automatis\u00e9e des risques"]),
        ("ACF Score", "OUTIL DIAGNOSTIQUE",
         "Score de souverainet\u00e9 propri\u00e9taire mesurant votre ind\u00e9pendance d\u00e9cisionnelle "
         "sur 6 dimensions de gouvernance.",
         ["Score composite de souverainet\u00e9",
          "Visualisation radar 6 axes",
          "Plan d'action personnalis\u00e9 par axe"]),
        ("ACF Control", "PLATEFORME DE GOUVERNANCE",
         "Dashboard de gouvernance temps r\u00e9el surveillant vos 18 KPIs de souverainet\u00e9 "
         "avec gating adaptatif et escalade automatis\u00e9e.",
         ["18 KPIs sur 6 axes de gouvernance",
          "Gating adaptatif avec escalade humaine",
          "Logs d'audit infalsifiables"]),
        ("ACF Certification", "ATTESTATION IND\u00c9PENDANTE",
         "Certification ind\u00e9pendante attestant la conformit\u00e9 au standard de gouvernance ACF. "
         "Publiquement v\u00e9rifiable.",
         ["Parcours Level 1, 2 et 3",
          "Badge publiquement v\u00e9rifiable",
          "Renouvellement annuel + monitoring continu"]),
    ]

    y -= 35
    for name, label, desc, features in products:
        box_h = 130
        c.setFillColor(DARK_CARD)
        c.roundRect(40, y - 10, W - 80, box_h, 6, fill=1, stroke=0)

        # Gold top border
        c.setStrokeColor(GOLD)
        c.setLineWidth(2)
        c.line(50, y + box_h - 12, W - 50, y + box_h - 12)

        # Label
        c.setFillColor(GOLD)
        c.setFont("Helvetica", 8)
        c.drawString(55, y + box_h - 28, label)

        # Title
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(55, y + box_h - 48, name)

        # Description
        c.setFillColor(GREY)
        c.setFont("Helvetica", 10)
        words = desc.split()
        line = ""
        ly = y + box_h - 68
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 10) < W - 130:
                line = test
            else:
                c.drawString(55, ly, line)
                ly -= 14
                line = word
        if line:
            c.drawString(55, ly, line)
            ly -= 14

        # Features
        ly -= 6
        for feat in features:
            c.setFillColor(GOLD)
            c.setFont("Helvetica", 9)
            c.drawString(60, ly, "\u2713")
            c.setFillColor(LIGHT_GREY)
            c.setFont("Helvetica", 9.5)
            c.drawString(78, ly, feat)
            ly -= 15

        y -= (box_h + 14)

    draw_footer(c, 9)


def draw_about_page(c):
    """Page 10: \u00c0 propos."""
    draw_page_bg(c)

    y = H - 80
    y = draw_section_header(c, "07", "\u00c0 propos", y)

    y -= 25
    text = (
        "L'Agentic Commerce Framework\u00ae a \u00e9t\u00e9 cr\u00e9\u00e9 par Vincent DORANGE, "
        "expert en gouvernance IA et fondateur d'AI CONSULTING. Le framework est le "
        "r\u00e9sultat de plusieurs ann\u00e9es de recherche sur la gouvernance des syst\u00e8mes "
        "autonomes dans les environnements commerciaux."
    )
    y = draw_body_text(c, text, 40, y, font_size=12, line_height=20)

    y -= 15
    text2 = (
        "ACF\u00ae est une marque d\u00e9pos\u00e9e. L'ensemble de la m\u00e9thodologie et des "
        "outils sont juridiquement prot\u00e9g\u00e9s."
    )
    y = draw_body_text(c, text2, 40, y, font_size=12, line_height=20)

    # Contact card
    y -= 40
    draw_gold_line(c, 40, y + 15, W - 80, 1)

    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y - 15, "Contact")

    y -= 45
    info = [
        ("Site web", "www.acfstandard.com"),
        ("Standard", "ACF\u00ae \u2014 Agentic Commerce Framework"),
    ]
    for label, value in info:
        c.setFillColor(GREY)
        c.setFont("Helvetica", 10)
        c.drawString(50, y, label)
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 11)
        c.drawString(160, y, value)
        y -= 25

    draw_footer(c, 10)


def draw_back_page(c):
    """Page 11: Back page."""
    draw_page_bg(c)

    # Centered content
    cy = H / 2 + 80

    # Gold line
    draw_gold_line(c, W / 2 - 60, cy + 40, 120, 2)

    # Logo text
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(W / 2, cy, "ACF\u00ae")

    c.setFillColor(GOLD)
    c.setFont("Helvetica", 14)
    c.drawCentredString(W / 2, cy - 25, "Agentic Commerce Framework\u00ae")

    c.setFillColor(GREY)
    c.setFont("Helvetica", 11)
    c.drawCentredString(W / 2, cy - 50, "Global Standard for AI Governance")

    # Gold separator
    draw_gold_line(c, W / 2 - 60, cy - 75, 120, 1)

    # Website
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 13)
    c.drawCentredString(W / 2, cy - 105, "www.acfstandard.com")

    # Footer
    c.setFillColor(MEDIUM_GREY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W / 2, 60, "\u00a9 2026 Agentic Commerce Framework\u00ae \u2014 Vincent DORANGE. Tous droits r\u00e9serv\u00e9s.")
    c.drawCentredString(W / 2, 45, "ACF\u00ae est une marque d\u00e9pos\u00e9e. M\u00e9thodologie et outils juridiquement prot\u00e9g\u00e9s.")


def main():
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)
    c.setTitle("ACF\u00ae \u2014 Livre Blanc")
    c.setAuthor("Vincent DORANGE")
    c.setSubject("Agentic Commerce Framework \u2014 Standard de gouvernance pour syst\u00e8mes agentiques")

    # Page 1: Cover
    draw_cover_page(c)
    c.showPage()

    # Page 2: TOC
    draw_toc_page(c)
    c.showPage()

    # Page 3: Executive Summary
    draw_executive_summary(c)
    c.showPage()

    # Page 4: Challenge
    draw_challenge_page(c)
    c.showPage()

    # Page 5: Framework - Principles & Layers
    draw_framework_page1(c)
    c.showPage()

    # Page 6: Framework - Maturity Levels
    draw_framework_page2(c)
    c.showPage()

    # Page 7: Methodology
    draw_methodology_page(c)
    c.showPage()

    # Page 8: Emergency Stop Protocol
    draw_emergency_stop_page(c)
    c.showPage()

    # Page 9: Products
    draw_products_page(c)
    c.showPage()

    # Page 10: About
    draw_about_page(c)
    c.showPage()

    # Page 11: Back page
    draw_back_page(c)
    c.showPage()

    c.save()
    print(f"PDF generated: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
