#!/usr/bin/env python3
"""Generate ACF Whitepaper FR v2 — professional, airy layout with ReportLab."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
import os

GOLD = HexColor("#c9a84c")
GOLD_LIGHT = HexColor("#f5ecd5")
NAVY = HexColor("#050c1a")
GRAY = HexColor("#6b7fa0")
GRAY_LIGHT = HexColor("#f0f0f0")
WHITE = white

W, H = A4  # 210mm x 297mm
OUT = r"C:\Users\vdora\acfstandard\public\acf-whitepaper-fr.pdf"

# ──────────────────────────────────────────────
# STYLES
# ──────────────────────────────────────────────
sTitle = ParagraphStyle("sTitle", fontName="Helvetica-Bold", fontSize=28,
                        leading=34, textColor=NAVY, alignment=TA_CENTER, spaceAfter=6)
sSubtitle = ParagraphStyle("sSub", fontName="Helvetica", fontSize=14,
                           leading=20, textColor=GRAY, alignment=TA_CENTER, spaceAfter=20)
sH1 = ParagraphStyle("sH1", fontName="Helvetica-Bold", fontSize=22,
                      leading=28, textColor=NAVY, spaceBefore=10, spaceAfter=14)
sH2 = ParagraphStyle("sH2", fontName="Helvetica-Bold", fontSize=16,
                      leading=22, textColor=GOLD, spaceBefore=18, spaceAfter=10)
sBody = ParagraphStyle("sBody", fontName="Helvetica", fontSize=12,
                        leading=18, textColor=HexColor("#222222"), alignment=TA_JUSTIFY,
                        spaceAfter=12)
sBodyCenter = ParagraphStyle("sBodyC", parent=sBody, alignment=TA_CENTER)
sSmall = ParagraphStyle("sSmall", fontName="Helvetica", fontSize=10,
                         leading=14, textColor=GRAY, alignment=TA_CENTER)
sTocNum = ParagraphStyle("sTocN", fontName="Helvetica-Bold", fontSize=13,
                          leading=20, textColor=GOLD)
sTocTitle = ParagraphStyle("sTocT", fontName="Helvetica-Bold", fontSize=13,
                            leading=20, textColor=NAVY)
sLabel = ParagraphStyle("sLabel", fontName="Helvetica-Bold", fontSize=11,
                         leading=15, textColor=GOLD, spaceAfter=4)


def gold_line():
    """A gold horizontal rule as a thin table."""
    t = Table([[""]], colWidths=[120*mm], rowHeights=[2])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD),
                           ("LINEBELOW", (0, 0), (-1, -1), 0, GOLD)]))
    return t


def stat_box(number, label):
    """A stat box for the cover page."""
    return [
        Paragraph(f'<font size="28" color="#c9a84c"><b>{number}</b></font>', sBodyCenter),
        Paragraph(f'<font size="10" color="#6b7fa0">{label}</font>', sBodyCenter),
    ]


def header_footer(canvas_obj, doc):
    """Draw header line + footer on every page (except cover)."""
    canvas_obj.saveState()
    if doc.page > 1:
        # Header line
        canvas_obj.setStrokeColor(GOLD)
        canvas_obj.setLineWidth(1.5)
        canvas_obj.line(30*mm, H - 18*mm, W - 30*mm, H - 18*mm)
        # Header text
        canvas_obj.setFont("Helvetica", 8)
        canvas_obj.setFillColor(GRAY)
        canvas_obj.drawString(30*mm, H - 16*mm, "Agentic Commerce Framework\u00ae \u2014 Livre Blanc")
        canvas_obj.drawRightString(W - 30*mm, H - 16*mm, f"Page {doc.page}")
        # Footer
        canvas_obj.setFont("Helvetica", 8)
        canvas_obj.setFillColor(GRAY)
        canvas_obj.drawCentredString(W / 2, 14*mm, "\u00a9 2026 Agentic Commerce Framework\u00ae")
    canvas_obj.restoreState()


def build_cover(story):
    """Cover page."""
    story.append(Spacer(1, 60))
    story.append(Paragraph("Agentic Commerce<br/>Framework\u00ae", sTitle))
    story.append(Spacer(1, 8))
    story.append(gold_line())
    story.append(Spacer(1, 16))
    story.append(Paragraph('<font color="#c9a84c" size="16"><b>LIVRE BLANC</b></font>', sBodyCenter))
    story.append(Spacer(1, 14))
    story.append(Paragraph("Le Standard Mondial de Gouvernance IA<br/>"
                            "dans les Environnements Commerciaux", sSubtitle))
    story.append(Spacer(1, 40))

    # Stats boxes — separate rows with enough height to avoid overlap
    data = [
        [Paragraph('<font size="36" color="#c9a84c"><b>4</b></font>', sBodyCenter),
         Paragraph('<font size="36" color="#c9a84c"><b>8</b></font>', sBodyCenter),
         Paragraph('<font size="36" color="#c9a84c"><b>18</b></font>', sBodyCenter),
         Paragraph('<font size="36" color="#c9a84c"><b>17</b></font>', sBodyCenter)],
        [Paragraph('<font size="11" color="#6b7fa0">Principes</font>', sBodyCenter),
         Paragraph('<font size="11" color="#6b7fa0">Modules</font>', sBodyCenter),
         Paragraph('<font size="11" color="#6b7fa0">KPIs</font>', sBodyCenter),
         Paragraph('<font size="11" color="#6b7fa0">Outils</font>', sBodyCenter)],
    ]
    t = Table(data, colWidths=[35*mm]*4, rowHeights=[50, 24])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), GRAY_LIGHT),
        ("BOX", (0, 0), (0, 1), 0.5, HexColor("#e0d5b0")),
        ("BOX", (1, 0), (1, 1), 0.5, HexColor("#e0d5b0")),
        ("BOX", (2, 0), (2, 1), 0.5, HexColor("#e0d5b0")),
        ("BOX", (3, 0), (3, 1), 0.5, HexColor("#e0d5b0")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, 0), 8),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 8),
        ("ROUNDEDCORNERS", [4, 4, 4, 4]),
    ]))
    story.append(t)

    story.append(Spacer(1, 60))
    story.append(Paragraph("Auteur : Vincent DORANGE", sSmall))
    story.append(Paragraph("Date : Mars 2026", sSmall))
    story.append(Paragraph("Classification : Public", sSmall))
    story.append(PageBreak())


def build_toc(story):
    """Table des mati\u00e8res."""
    story.append(Spacer(1, 20))
    story.append(Paragraph("Table des mati\u00e8res", sH1))
    story.append(gold_line())
    story.append(Spacer(1, 30))

    toc_items = [
        ("01", "R\u00e9sum\u00e9 ex\u00e9cutif"),
        ("02", "Le d\u00e9fi du commerce agentique"),
        ("03", "Le framework ACF"),
        ("", "     4 Principes fondateurs"),
        ("", "     4 Couches op\u00e9rationnelles"),
        ("", "     4 Niveaux de maturit\u00e9"),
        ("04", "M\u00e9thodologie de mise en \u0153uvre"),
        ("05", "Le protocole d\u2019arr\u00eat d\u2019urgence"),
        ("06", "Les produits ACF"),
        ("07", "\u00c0 propos"),
    ]

    for num, title in toc_items:
        if num:
            row = [[Paragraph(f'<b><font color="#c9a84c">{num}</font></b>', sTocNum),
                     Paragraph(f'<b>{title}</b>', sTocTitle)]]
            t = Table(row, colWidths=[18*mm, 120*mm])
            t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10)]))
        else:
            row = [[Paragraph("", sTocNum),
                     Paragraph(f'<font size="11" color="#6b7fa0">{title}</font>', sTocTitle)]]
            t = Table(row, colWidths=[18*mm, 120*mm])
            t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
        story.append(t)

    story.append(PageBreak())


def build_section_01(story):
    story.append(Spacer(1, 10))
    story.append(Paragraph('<font color="#c9a84c">01</font>  R\u00e9sum\u00e9 ex\u00e9cutif', sH1))
    story.append(gold_line())
    story.append(Spacer(1, 14))
    story.append(Paragraph(
        "L\u2019Agentic Commerce Framework\u00ae (ACF) est le standard de gouvernance de "
        "r\u00e9f\u00e9rence pour d\u00e9ployer, superviser et contr\u00f4ler les syst\u00e8mes "
        "agentiques autonomes dans les environnements commerciaux. Cr\u00e9\u00e9 par Vincent DORANGE, "
        "le framework fournit une m\u00e9thodologie compl\u00e8te construite sur 4 principes fondateurs, "
        "structur\u00e9e en 4 couches op\u00e9rationnelles, mesur\u00e9e \u00e0 travers 18 KPIs et "
        "mise en \u0153uvre via 8 modules s\u00e9quentiels.",
        sBody))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Ce n\u2019est pas un document th\u00e9orique \u2014 c\u2019est un plan op\u00e9rationnel "
        "con\u00e7u pour un d\u00e9ploiement r\u00e9el, des ETI aux multinationales. "
        "Le framework r\u00e9pond \u00e0 la question fondamentale : comment exploiter la puissance "
        "des agents autonomes sans abandonner la souverainet\u00e9 d\u00e9cisionnelle humaine ?",
        sBody))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "ACF est align\u00e9 avec le syst\u00e8me de classification de l\u2019AI Act de l\u2019UE "
        "et aide les organisations \u00e0 respecter leurs obligations r\u00e9glementaires tout en "
        "maintenant un avantage concurrentiel.",
        sBody))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "<b>Phase pr\u00e9alable obligatoire : l\u2019audit de gouvernance.</b> "
        "Avant tout d\u00e9ploiement de l\u2019ACF, un audit organisationnel complet doit \u00eatre "
        "r\u00e9alis\u00e9. Cette \u00e9tape est un pr\u00e9requis imp\u00e9ratif et ne peut en aucun cas "
        "\u00eatre contourn\u00e9e. L\u2019audit couvre quatre dimensions : l\u2019inventaire exhaustif "
        "des agents d\u00e9ploy\u00e9s ou pr\u00e9vus, la cartographie d\u00e9cisionnelle (qui d\u00e9cide quoi, "
        "avec quel niveau d\u2019autonomie), l\u2019identification des zones de risque (d\u00e9cisions "
        "critiques, donn\u00e9es sensibles, interactions client \u00e0 fort impact), et l\u2019\u00e9valuation "
        "du niveau de maturit\u00e9 actuel de l\u2019organisation en gouvernance agentique. "
        "Sans cet \u00e9tat des lieux pr\u00e9alable, aucun d\u00e9ploiement ne peut \u00eatre engag\u00e9 : "
        "il serait impossible de d\u00e9finir les mandats, les seuils d\u2019escalade ou les zones "
        "non-d\u00e9l\u00e9guables sans conna\u00eetre pr\u00e9cis\u00e9ment la situation de d\u00e9part.",
        sBody))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "L\u2019\u00e9cosyst\u00e8me ACF s\u2019appuie sur trois produits compl\u00e9mentaires : "
        "ACF Score pour le diagnostic initial, ACF Control pour la supervision en temps r\u00e9el, "
        "et ACF Certification pour attester la conformit\u00e9 au standard. "
        "Ensemble, ils couvrent l\u2019int\u00e9gralit\u00e9 du cycle de vie de la gouvernance agentique.",
        sBody))
    story.append(PageBreak())


def build_section_02(story):
    story.append(Spacer(1, 10))
    story.append(Paragraph('<font color="#c9a84c">02</font>  Le d\u00e9fi du commerce agentique', sH1))
    story.append(gold_line())
    story.append(Spacer(1, 14))
    story.append(Paragraph(
        "En 2026, les agents autonomes sont op\u00e9rationnels. Ils ajustent les prix en temps "
        "r\u00e9el, qualifient les prospects, traitent les r\u00e9clamations et n\u00e9gocient des "
        "contrats \u2014 24h/24, \u00e0 une \u00e9chelle qu\u2019aucune \u00e9quipe humaine ne peut \u00e9galer.",
        sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Mais cette acc\u00e9l\u00e9ration a d\u00e9pass\u00e9 la gouvernance. La plupart des "
        "organisations n\u2019ont aucun cadre formel pour d\u00e9finir quelles d\u00e9cisions les "
        "agents peuvent prendre seuls, lesquelles n\u00e9cessitent une approbation humaine, et "
        "lesquelles ne doivent jamais \u00eatre d\u00e9l\u00e9gu\u00e9es.",
        sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Les risques sont concrets : flash crashes de pricing, biais syst\u00e9matiques dans la "
        "qualification de prospects, refus massifs de r\u00e9clamations l\u00e9gitimes. \u00c0 chaque "
        "fois, la cause est la m\u00eame : l\u2019absence d\u2019un cadre de gouvernance.",
        sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "L\u2019AI Act de l\u2019UE impose d\u00e9sormais des obligations sp\u00e9cifiques pour les "
        "syst\u00e8mes d\u2019IA \u00e0 haut risque. Les organisations sans cadre de gouvernance "
        "risquent des sanctions r\u00e9glementaires et des dommages r\u00e9putationnels. "
        "ACF a \u00e9t\u00e9 cr\u00e9\u00e9 pour combler cette lacune.",
        sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "<b>Les risques sont d\u00e9sormais concrets et chiffrables.</b> "
        "L\u2019AI Act de l\u2019UE pr\u00e9voit des sanctions pouvant atteindre 35 millions d\u2019euros "
        "ou 7% du chiffre d\u2019affaires mondial pour les infractions les plus graves. "
        "Au-del\u00e0 du r\u00e9glementaire, les organisations font face \u00e0 des risques multiples : "
        "dommages r\u00e9putationnels irr\u00e9versibles lorsqu\u2019un agent autonome prend une d\u00e9cision "
        "discriminatoire ou aberrante, perte de confiance des clients expos\u00e9s \u00e0 des "
        "interactions non contr\u00f4l\u00e9es, responsabilit\u00e9 juridique pour les d\u00e9cisions "
        "autonomes prises sans supervision humaine ad\u00e9quate, et perturbation op\u00e9rationnelle "
        "caus\u00e9e par la d\u00e9rive non d\u00e9tect\u00e9e des comportements agentiques (agent drift). "
        "Ces risques ne sont plus hypoth\u00e9tiques : ils se mat\u00e9rialisent d\u00e9j\u00e0 dans les "
        "organisations qui ont d\u00e9ploy\u00e9 des agents sans cadre de gouvernance.",
        sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Le probl\u00e8me n\u2019est pas la technologie elle-m\u00eame, mais l\u2019absence de cadre "
        "pour la gouverner. Qui d\u00e9cide quand un agent peut ajuster un prix de plus de 10% ? "
        "Qui intervient quand un agent de scoring rejette syst\u00e9matiquement certains profils ? "
        "Qui autorise un agent \u00e0 n\u00e9gocier un contrat au-del\u00e0 d\u2019un certain seuil ?",
        sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Ces questions ne sont plus th\u00e9oriques. Elles se posent quotidiennement dans les "
        "organisations qui ont d\u00e9ploy\u00e9 des agents autonomes sans structure de gouvernance. "
        "L\u2019ACF apporte des r\u00e9ponses concr\u00e8tes, op\u00e9rationnelles et mesurables.",
        sBody))
    story.append(PageBreak())


def build_section_03(story):
    story.append(Spacer(1, 10))
    story.append(Paragraph('<font color="#c9a84c">03</font>  Le framework ACF', sH1))
    story.append(gold_line())
    story.append(Spacer(1, 10))

    # 4 Principes
    story.append(Paragraph("4 Principes fondateurs", sH2))
    story.append(Paragraph(
        "Le framework repose sur quatre axiomes immuables, non n\u00e9gociables.",
        sBody))
    story.append(Spacer(1, 6))

    principles = [
        ["01", "S\u00e9paration d\u00e9cision / ex\u00e9cution",
         "Les d\u00e9cisions strat\u00e9giques critiques ne sont jamais d\u00e9l\u00e9gu\u00e9es aux agents."],
        ["02", "Zones non-d\u00e9l\u00e9guables",
         "Certaines d\u00e9cisions restent exclusivement sous autorit\u00e9 humaine."],
        ["03", "Tra\u00e7abilit\u00e9 & interruptibilit\u00e9",
         "Chaque action autonome est journalis\u00e9e. Chaque agent peut \u00eatre interrompu."],
        ["04", "Gouvernance vivante",
         "Les structures de gouvernance \u00e9voluent avec la maturit\u00e9 des agents."],
    ]
    for p in principles:
        row = [[Paragraph(f'<b><font color="#c9a84c" size="14">{p[0]}</font></b>', sBody),
                Paragraph(f'<b>{p[1]}</b>', sBody),
                Paragraph(f'<font color="#666666">{p[2]}</font>', sBody)]]
        t = Table(row, colWidths=[14*mm, 52*mm, 80*mm])
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, HexColor("#e8e0c8")),
        ]))
        story.append(t)

    story.append(Spacer(1, 16))

    # 4 Couches
    story.append(Paragraph("4 Couches op\u00e9rationnelles", sH2))
    layers = [
        ["COUCHE 01", "Strat\u00e9gique", "Charte de souverainet\u00e9, comit\u00e9 de gouvernance"],
        ["COUCHE 02", "Tactique", "Objectifs pond\u00e9r\u00e9s, r\u00e8gles d\u2019arbitrage, seuils d\u2019escalade"],
        ["COUCHE 03", "Op\u00e9rationnelle", "Mandat par agent, p\u00e9rim\u00e8tre d\u2019interaction"],
        ["COUCHE 04", "Technique", "18 KPIs de souverainet\u00e9, tableaux de bord temps r\u00e9el"],
    ]
    data = [[Paragraph(f'<font color="#c9a84c" size="9"><b>{l[0]}</b></font>', sBody),
             Paragraph(f'<b>{l[1]}</b>', sBody),
             Paragraph(f'<font color="#666666">{l[2]}</font>', sBody)] for l in layers]
    t = Table(data, colWidths=[25*mm, 40*mm, 81*mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, HexColor("#e8e0c8")),
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#faf8f2")),
    ]))
    story.append(t)
    story.append(PageBreak())

    # 4 Niveaux de maturit\u00e9
    story.append(Spacer(1, 10))
    story.append(Paragraph("4 Niveaux de maturit\u00e9", sH2))
    story.append(Spacer(1, 6))
    levels = [
        ["NIVEAU 0", "Automation classique", "R\u00e8gles fixes, pas de ML. Risque tr\u00e8s faible."],
        ["NIVEAU 1", "Agents assist\u00e9s", "Les agents analysent et recommandent. Risque faible."],
        ["NIVEAU 2", "Agents gouvern\u00e9s", "Les agents d\u00e9cident dans une gouvernance stricte. RECOMMAND\u00c9."],
        ["NIVEAU 3", "Autonomie supervis\u00e9e", "Les agents d\u00e9cident et apprennent. Risque \u00e9lev\u00e9."],
    ]
    data = [[Paragraph(f'<font color="#c9a84c" size="9"><b>{l[0]}</b></font>', sBody),
             Paragraph(f'<b>{l[1]}</b>', sBody),
             Paragraph(f'<font color="#666666">{l[2]}</font>', sBody)] for l in levels]
    t = Table(data, colWidths=[24*mm, 40*mm, 82*mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, HexColor("#e8e0c8")),
        ("BACKGROUND", (0, 2), (-1, 2), HexColor("#f0edd8")),  # Highlight recommended
    ]))
    story.append(t)
    story.append(Spacer(1, 12))
    story.append(Paragraph(
        "Le Niveau 2 est la cible de d\u00e9ploiement recommand\u00e9e pour la plupart des organisations.",
        sBody))
    story.append(PageBreak())


def build_section_04(story):
    story.append(Spacer(1, 10))
    story.append(Paragraph('<font color="#c9a84c">04</font>  M\u00e9thodologie de mise en \u0153uvre', sH1))
    story.append(gold_line())
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "ACF est mis en \u0153uvre \u00e0 travers 8 modules s\u00e9quentiels, "
        "d\u00e9ploy\u00e9s progressivement sur 6 \u00e0 18 mois.",
        sBody))
    story.append(Spacer(1, 10))

    modules = [
        ("MOD 01", "Diagnostic de souverainet\u00e9", "Calcul du Score, cartographie des zones \u00e0 risque."),
        ("MOD 02", "Cartographie d\u00e9cisionnelle", "Matrice de criticit\u00e9, zones non-d\u00e9l\u00e9guables."),
        ("MOD 03", "Constitution agentique", "Document fondateur en 9 articles, sign\u00e9 par le comit\u00e9."),
        ("MOD 04", "Conception du syst\u00e8me d\u2019agents", "Fiches de mandat, p\u00e9rim\u00e8tres d\u2019interaction."),
        ("MOD 05", "S\u00e9curit\u00e9 & r\u00e9versibilit\u00e9", "Sandboxing, plan de r\u00e9versibilit\u00e9, protocole d\u2019arr\u00eat."),
        ("MOD 06", "Gouvernance continue", "Revues mensuelles, audits de conformit\u00e9 annuels."),
        ("MOD 07", "Feuille de route", "D\u00e9ploiement progressif en 5 phases."),
        ("MOD 08", "Gestion de crise", "Incidents \u00e0 3 niveaux, exercices d\u2019arr\u00eat d\u2019urgence."),
    ]
    for m in modules:
        row = [[Paragraph(f'<font color="#c9a84c" size="9"><b>{m[0]}</b></font>', sBody),
                Paragraph(f'<b>{m[1]}</b>', sBody),
                Paragraph(f'<font color="#666666">{m[2]}</font>', sBody)]]
        t = Table(row, colWidths=[20*mm, 52*mm, 74*mm])
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, HexColor("#e8e0c8")),
        ]))
        story.append(t)

    story.append(Spacer(1, 20))
    story.append(Paragraph("Le r\u00f4le DDA", sH2))
    story.append(Paragraph(
        "Le DDA (Delegated Decision Agent Officer) est l\u2019autorit\u00e9 humaine d\u00e9sign\u00e9e "
        "pour superviser tous les agents autonomes. Il approuve les mandats, surveille les KPIs "
        "et autorise l\u2019activation du protocole d\u2019arr\u00eat d\u2019urgence.",
        sBody))
    story.append(PageBreak())


def build_section_05(story):
    story.append(Spacer(1, 10))
    story.append(Paragraph('<font color="#c9a84c">05</font>  Le protocole d\u2019arr\u00eat d\u2019urgence', sH1))
    story.append(gold_line())
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "Le protocole d\u2019arr\u00eat d\u2019urgence est le m\u00e9canisme d\u2019intervention "
        "structur\u00e9 et multi-niveaux pour interrompre les op\u00e9rations des agents autonomes "
        "lorsque les limites de gouvernance sont franchies.",
        sBody))
    story.append(Spacer(1, 10))

    levels = [
        ["NIVEAU 1", "Pause tactique",
         "Suspension individuelle d\u2019un agent. L\u2019agent passe en mode supervis\u00e9. "
         "Temps de r\u00e9ponse : imm\u00e9diat."],
        ["NIVEAU 2", "Arr\u00eat op\u00e9rationnel",
         "Suspension de tous les agents d\u2019une cat\u00e9gorie. "
         "Double autorisation DDA + comit\u00e9. Temps de r\u00e9ponse : < 15 min."],
        ["NIVEAU 3", "Arr\u00eat total",
         "Arr\u00eat complet de toutes les op\u00e9rations agentiques. "
         "Autorisation PDG + DDA. Temps de r\u00e9ponse : < 5 min."],
    ]
    for lv in levels:
        story.append(Spacer(1, 6))
        row = [[Paragraph(f'<font color="#c9a84c" size="10"><b>{lv[0]}</b></font>', sBody),
                Paragraph(f'<b>{lv[1]}</b>', sBody)]]
        t = Table(row, colWidths=[26*mm, 120*mm])
        t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                                ("TOPPADDING", (0, 0), (-1, -1), 6)]))
        story.append(t)
        story.append(Paragraph(lv[2], sBody))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "Le protocole est int\u00e9gr\u00e9 nativement dans ACF Control, qui assure "
        "la d\u00e9tection automatique des d\u00e9rives, l\u2019envoi d\u2019alertes en temps r\u00e9el "
        "et l\u2019ex\u00e9cution des proc\u00e9dures d\u2019arr\u00eat. Des exercices r\u00e9guliers "
        "sont pr\u00e9vus dans le Module 08 (Gestion de crise) pour s\u2019assurer que "
        "les \u00e9quipes ma\u00eetrisent ces proc\u00e9dures avant qu\u2019une situation r\u00e9elle ne survienne.",
        sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Chaque activation du protocole est journalis\u00e9e avec horodatage, "
        "identit\u00e9 de l\u2019autorisant, motif de d\u00e9clenchement et agents concern\u00e9s. "
        "Cette tra\u00e7abilit\u00e9 compl\u00e8te r\u00e9pond aux exigences de l\u2019AI Act en mati\u00e8re "
        "de documentation des interventions humaines sur les syst\u00e8mes autonomes.",
        sBody))
    story.append(PageBreak())


def build_section_06(story):
    story.append(Spacer(1, 10))
    story.append(Paragraph('<font color="#c9a84c">06</font>  Les produits ACF', sH1))
    story.append(gold_line())
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "Le standard ACF est op\u00e9rationnalis\u00e9 \u00e0 travers trois produits compl\u00e9mentaires.",
        sBody))
    story.append(Spacer(1, 12))

    # ACF Score
    story.append(Paragraph("ACF Score\u00ae \u2014 Diagnostic de souverainet\u00e9", sH2))
    story.append(Paragraph(
        "Outil de diagnostic en ligne qui mesure la souverainet\u00e9 d\u00e9cisionnelle de votre "
        "organisation sur 6 dimensions cl\u00e9s. En moins de 10 minutes, le Score composite "
        "fournit une m\u00e9trique unique repr\u00e9sentant votre niveau de maturit\u00e9 en "
        "gouvernance agentique. C\u2019est le point d\u2019entr\u00e9e recommand\u00e9 pour toute "
        "organisation souhaitant \u00e9valuer sa situation actuelle. Enti\u00e8rement gratuit "
        "sur acf-score.com.",
        sBody))
    story.append(Spacer(1, 10))

    # ACF Control
    story.append(Paragraph("ACF Control \u2014 Plateforme de gouvernance", sH2))
    story.append(Paragraph(
        "Plateforme de gouvernance en temps r\u00e9el qui surveille 18 KPIs de "
        "souverainet\u00e9 sur 6 axes. ACF Control offre une visibilit\u00e9 continue sur le "
        "comportement de tous vos agents autonomes : tableaux de bord en temps r\u00e9el, "
        "syst\u00e8me d\u2019alertes param\u00e9trables, protocole d\u2019arr\u00eat d\u2019urgence \u00e0 3 niveaux, "
        "et tra\u00e7abilit\u00e9 compl\u00e8te de chaque d\u00e9cision prise par un agent.",
        sBody))
    story.append(Paragraph(
        "La plateforme permet \u00e9galement de d\u00e9finir des seuils d\u2019escalade, "
        "de g\u00e9rer les mandats par agent, et de g\u00e9n\u00e9rer des rapports de conformit\u00e9 "
        "automatiques pour les audits internes et r\u00e9glementaires.",
        sBody))
    story.append(Spacer(1, 10))

    # ACF Certification
    story.append(Paragraph("ACF Certification \u2014 Attestation ind\u00e9pendante", sH2))
    story.append(Paragraph(
        "Programme de certification v\u00e9rifiant la conformit\u00e9 de votre organisation au "
        "standard ACF. Trois niveaux progressifs sont propos\u00e9s, correspondant aux "
        "niveaux de maturit\u00e9 du framework. L\u2019audit est r\u00e9alis\u00e9 par des praticiens "
        "accr\u00e9dit\u00e9s et la certification, publiquement v\u00e9rifiable, est valide un an. "
        "Elle constitue un gage de confiance pour vos clients, partenaires et r\u00e9gulateurs.",
        sBody))
    story.append(PageBreak())


def build_section_07(story):
    story.append(Spacer(1, 10))
    story.append(Paragraph('<font color="#c9a84c">07</font>  \u00c0 propos', sH1))
    story.append(gold_line())
    story.append(Spacer(1, 14))
    story.append(Paragraph(
        "L\u2019Agentic Commerce Framework\u00ae a \u00e9t\u00e9 cr\u00e9\u00e9 par Vincent DORANGE "
        "en r\u00e9ponse \u00e0 une lacune critique : aucun standard de gouvernance complet n\u2019existait "
        "pour guider le d\u00e9ploiement responsable d\u2019agents autonomes en environnement commercial.",
        sBody))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "L\u2019\u00e9cosyst\u00e8me ACF comprend la plateforme de diagnostic ACF Score, "
        "le tableau de bord ACF Control, le programme ACF Certification et un r\u00e9seau "
        "croissant de praticiens de gouvernance accr\u00e9dit\u00e9s.",
        sBody))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "L\u2019ambition de l\u2019ACF est de devenir le standard de r\u00e9f\u00e9rence mondial "
        "pour la gouvernance des agents autonomes, \u00e0 l\u2019image de ce que l\u2019ISO a "
        "apport\u00e9 \u00e0 la qualit\u00e9 industrielle. Un cadre universel, adaptable \u00e0 chaque "
        "secteur, qui garantit que l\u2019innovation agentique se d\u00e9veloppe dans un "
        "environnement de confiance et de responsabilit\u00e9.",
        sBody))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Pour en savoir plus : www.acf-standard.com",
        sBody))
    story.append(PageBreak())


def build_back_page(story):
    story.append(Spacer(1, 100))
    story.append(Paragraph("Agentic Commerce<br/>Framework\u00ae", sTitle))
    story.append(Spacer(1, 12))
    story.append(Paragraph("Le Standard Mondial de Gouvernance IA<br/>"
                            "dans les Environnements Commerciaux", sSubtitle))
    story.append(Spacer(1, 40))
    story.append(Paragraph("www.acf-standard.com", sSmall))
    story.append(Spacer(1, 30))
    story.append(Paragraph("\u00a9 2026 Vincent DORANGE", sSmall))
    story.append(Paragraph("Tous droits r\u00e9serv\u00e9s.", sSmall))


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    doc = SimpleDocTemplate(
        OUT,
        pagesize=A4,
        leftMargin=30*mm, rightMargin=30*mm,
        topMargin=28*mm, bottomMargin=24*mm,
        title="Agentic Commerce Framework\u00ae \u2014 Livre Blanc",
        author="Vincent DORANGE",
    )

    story = []
    build_cover(story)
    build_toc(story)
    build_section_01(story)
    build_section_02(story)
    build_section_03(story)
    build_section_04(story)
    build_section_05(story)
    build_section_06(story)
    build_section_07(story)
    build_back_page(story)

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    size = os.path.getsize(OUT)
    print(f"PDF generated: {OUT} ({size:,} bytes)")


if __name__ == "__main__":
    main()
