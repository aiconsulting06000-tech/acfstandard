"use client";

import React, { useState } from "react";

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)",
};

function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}

const sections = [
  {
    id: "mentions",
    label: "Mentions Légales",
    content: [
      { title: "Éditeur du site", text: "Le site acfstandard.vercel.app est édité par AI CONSULTING, SASU au capital variable, dont le siège social est situé au 38 Bis Boulevard Victor Hugo, 06000 Nice, France. Immatriculation RCS Nice : 909116329. Numéro de TVA intracommunautaire : FR96909116329. Directeur de la publication : Vincent DORANGE." },
      { title: "Hébergement", text: "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. Site web : vercel.com." },
      { title: "Propriété intellectuelle", text: "L'ensemble des contenus présents sur ce site (textes, graphismes, logos, icônes, images, méthodologies, frameworks) sont la propriété exclusive d'AI CONSULTING ou font l'objet d'une autorisation d'utilisation. « Agentic Commerce Framework® » et « ACF® » sont des marques déposées. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable." },
      { title: "Créateur du Framework", text: "L'Agentic Commerce Framework® (ACF®) est une méthodologie propriétaire conçue et développée par Vincent DORANGE. Tous droits réservés." },
      { title: "Contact", text: "Pour toute question relative aux mentions légales, vous pouvez nous contacter via la page Contact du site ou par courrier à l'adresse du siège social." },
    ]
  },
  {
    id: "cgu",
    label: "Conditions d'Utilisation",
    content: [
      { title: "Objet", text: "Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'accès et d'utilisation du site acfstandard.vercel.app et de ses services associés, incluant notamment le diagnostic ACF Score® et les informations relatives à l'Agentic Commerce Framework®." },
      { title: "Accès au site", text: "L'accès au site est gratuit. Le diagnostic ACF Score® est accessible sans inscription et sans frais. Certains services premium (ACF Control, Certification, Accompagnement) pourront faire l'objet de conditions particulières et de tarifications spécifiques communiquées au moment de la souscription." },
      { title: "Utilisation du Score ACF®", text: "Le Score ACF® est un outil de diagnostic indicatif. Il ne constitue ni un audit réglementaire, ni une certification officielle, ni un conseil juridique. Les résultats et recommandations fournis sont à titre informatif et ne sauraient engager la responsabilité d'AI CONSULTING. L'utilisateur est seul responsable de l'interprétation et de la mise en œuvre des recommandations." },
      { title: "Propriété intellectuelle", text: "La méthodologie ACF®, les algorithmes de scoring, la structure du framework en 4 couches, et l'ensemble des livrables associés sont protégés par le droit de la propriété intellectuelle. Toute utilisation commerciale non autorisée est strictement interdite." },
      { title: "Responsabilité", text: "AI CONSULTING s'efforce de fournir des informations exactes et à jour. Toutefois, AI CONSULTING ne garantit pas l'exactitude, la complétude ou l'actualité des informations diffusées sur le site. AI CONSULTING ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder." },
      { title: "Modification des CGU", text: "AI CONSULTING se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur le site. L'utilisation continue du site après publication des modifications vaut acceptation des nouvelles CGU." },
    ]
  },
  {
    id: "confidentialite",
    label: "Politique de Confidentialité",
    content: [
      { title: "Responsable du traitement", text: "Le responsable du traitement des données personnelles est AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nice, France. Contact : via la page Contact du site." },
      { title: "Données collectées", text: "Dans le cadre du diagnostic ACF Score® : les réponses aux questions du questionnaire sont traitées en temps réel pour calculer votre score et ne sont pas stockées sans votre consentement explicite. Si vous fournissez votre adresse email : celle-ci est utilisée uniquement pour l'envoi de votre rapport PDF et, avec votre accord, pour des communications relatives à l'ACF®." },
      { title: "Formulaire de contact", text: "Les informations saisies dans le formulaire de contact (nom, email, entreprise, message) sont utilisées exclusivement pour répondre à votre demande. Elles ne sont ni revendues, ni partagées avec des tiers." },
      { title: "Cookies", text: "Le site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est utilisé. Les cookies d'analyse (si activés) sont anonymisés et utilisés uniquement pour améliorer l'expérience utilisateur." },
      { title: "Hébergement des données", text: "Les données sont hébergées par Vercel Inc. (États-Unis) dans le cadre du Data Privacy Framework UE-US. Vercel est conforme aux standards de protection des données applicables." },
      { title: "Vos droits (RGPD)", text: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous via la page Contact en précisant votre demande. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés)." },
      { title: "Conservation des données", text: "Les données personnelles sont conservées pendant la durée strictement nécessaire aux finalités pour lesquelles elles sont traitées. Les données du formulaire de contact sont conservées 12 mois maximum. Les données de diagnostic ne sont pas conservées sauf consentement explicite." },
    ]
  },
  {
    id: "cookies",
    label: "Politique Cookies",
    content: [
      { title: "Qu'est-ce qu'un cookie ?", text: "Un cookie est un petit fichier texte stocké sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur un site web. Il permet au site de mémoriser des informations sur votre visite." },
      { title: "Cookies utilisés", text: "Le site utilise exclusivement des cookies techniques essentiels au fonctionnement du site (gestion de session, préférences de langue, affichage). Ces cookies ne nécessitent pas votre consentement préalable car ils sont strictement nécessaires à la fourniture du service." },
      { title: "Cookies analytiques", text: "Si des outils d'analyse sont mis en place, ils utiliseront des données anonymisées et ne permettront pas de vous identifier personnellement. Vous serez informé et votre consentement sera recueilli avant l'activation de ces cookies." },
      { title: "Cookies tiers", text: "Le site n'utilise aucun cookie publicitaire ni aucun cookie de réseaux sociaux. Aucune donnée n'est partagée avec des plateformes publicitaires." },
      { title: "Gestion des cookies", text: "Vous pouvez à tout moment gérer vos préférences en matière de cookies via les paramètres de votre navigateur. La désactivation de certains cookies peut affecter votre expérience de navigation." },
    ]
  },
];

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("mentions");

  const activeSection = sections.find(s => s.id === activeTab)!;

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.1s}
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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>LEGAL</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/en/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>← Accueil</a>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div className="fade-up"><Badge>LEGAL</Badge></div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginTop: 24, marginBottom: 14, letterSpacing: "-1px" }}>
            Informations <span style={{ color: C.gold }}>légales</span>
          </h1>
          <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7 }}>
            Mentions légales, conditions d'utilisation, politique de confidentialité et cookies.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>

          {/* TABS */}
          <div style={{ display: "flex", gap: 0, border: `1px solid ${C.goldBorder}`, borderRadius: 10, overflow: "hidden", marginBottom: 40, background: C.navy2 }}>
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveTab(s.id)} style={{
                flex: 1, padding: "14px 16px", background: activeTab === s.id ? C.goldDim : "transparent",
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                color: activeTab === s.id ? C.gold : C.gray,
                fontFamily: "'Space Grotesk', sans-serif", letterSpacing: ".02em",
                borderRight: `1px solid rgba(201,168,76,.12)`, transition: "all .2s",
                display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
              }}
                onMouseEnter={e => { if (activeTab !== s.id) { e.currentTarget.style.color = C.gold; e.currentTarget.style.background = "rgba(201,168,76,.05)"; } }}
                onMouseLeave={e => { if (activeTab !== s.id) { e.currentTarget.style.color = C.gray; e.currentTarget.style.background = "transparent"; } }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div style={{ background: C.navy2, border: `1px solid ${C.goldBorder}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "20px 28px 18px", borderBottom: `1px solid rgba(201,168,76,.12)` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".1em", textTransform: "uppercase" }}>{activeSection.label}</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>Dernière mise à jour : Mars 2026</div>
            </div>
            <div style={{ padding: "28px 28px 36px" }}>
              {activeSection.content.map((block, i) => (
                <div key={i} style={{ marginBottom: i < activeSection.content.length - 1 ? 28 : 0 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
                    {block.title}
                  </h3>
                  <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.8, paddingLeft: 16 }}>{block.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT NOTE */}
          <div style={{ marginTop: 32, padding: 28, background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>📬</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Une question sur vos droits ou nos conditions ?</div>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>
                Contactez-nous via notre <a href="/en/contact" style={{ color: C.gold, textDecoration: "underline" }}>formulaire de contact</a> ou par courrier au siège social : 38 Bis Bd Victor Hugo, 06000 Nice.
              </p>
            </div>
          </div>
        </div>
      </section>

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
              { title: "Framework", links: [{ label: "The Standard", href: "/en/" },{ label: "Methodology", href: "/en/#methodology" },{ label: "Research", href: "/en/#research" },{ label: "ACF Certification", href: "/en/acf-certification" }] },
              { title: "Products", links: [{ label: "ACF Score®", href: "/en/acf-score" },{ label: "ACF Control", href: "/en/acf-control" },{ label: "Certification", href: "/en/acf-certification" },{ label: "Academy", href: "/en/acf-certification#academy" }] },
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
