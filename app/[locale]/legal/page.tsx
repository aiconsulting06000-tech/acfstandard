"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";

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

type Section = { id: string; label: string; content: { title: string; text: string }[] };

const sections_fr: Section[] = [
  {
    id: "mentions",
    label: "Mentions légales",
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
    label: "Conditions d'utilisation",
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
    label: "Politique de confidentialité",
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
    label: "Politique cookies",
    content: [
      { title: "Qu'est-ce qu'un cookie ?", text: "Un cookie est un petit fichier texte stocké sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur un site web. Il permet au site de mémoriser des informations sur votre visite." },
      { title: "Cookies utilisés", text: "Le site utilise exclusivement des cookies techniques essentiels au fonctionnement du site (gestion de session, préférences de langue, affichage). Ces cookies ne nécessitent pas votre consentement préalable car ils sont strictement nécessaires à la fourniture du service." },
      { title: "Cookies analytiques", text: "Si des outils d'analyse sont mis en place, ils utiliseront des données anonymisées et ne permettront pas de vous identifier personnellement. Vous serez informé et votre consentement sera recueilli avant l'activation de ces cookies." },
      { title: "Cookies tiers", text: "Le site n'utilise aucun cookie publicitaire ni aucun cookie de réseaux sociaux. Aucune donnée n'est partagée avec des plateformes publicitaires." },
      { title: "Gestion des cookies", text: "Vous pouvez à tout moment gérer vos préférences en matière de cookies via les paramètres de votre navigateur. La désactivation de certains cookies peut affecter votre expérience de navigation." },
    ]
  },
];

const sections_en: Section[] = [
  {
    id: "mentions",
    label: "Legal Notice",
    content: [
      { title: "Website Publisher", text: "The website acfstandard.vercel.app is published by AI CONSULTING, a simplified joint-stock company (SASU) with variable capital, headquartered at 38 Bis Boulevard Victor Hugo, 06000 Nice, France. RCS Nice registration: 909116329. Intra-community VAT number: FR96909116329. Publication Director: Vincent DORANGE." },
      { title: "Hosting", text: "The website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States. Website: vercel.com." },
      { title: "Intellectual Property", text: "All content on this website (text, graphics, logos, icons, images, methodologies, frameworks) is the exclusive property of AI CONSULTING or is used under license. 'Agentic Commerce Framework\u00ae' and 'ACF\u00ae' are registered trademarks. Any reproduction, representation, modification, publication, or adaptation of all or part of the website elements is prohibited without prior written authorization." },
      { title: "Framework Creator", text: "The Agentic Commerce Framework\u00ae (ACF\u00ae) is a proprietary methodology designed and developed by Vincent DORANGE. All rights reserved." },
      { title: "Contact", text: "For any questions regarding this legal notice, you can contact us via the Contact page or by mail to the registered office address." },
    ]
  },
  {
    id: "cgu",
    label: "Terms of Use",
    content: [
      { title: "Purpose", text: "These Terms of Use define the conditions for accessing and using the website acfstandard.vercel.app and its associated services, including the ACF Score\u00ae diagnostic and information related to the Agentic Commerce Framework\u00ae." },
      { title: "Website Access", text: "Access to the website is free. The ACF Score\u00ae diagnostic is accessible without registration and at no cost. Certain premium services (ACF Control, Certification, Support) may be subject to specific conditions and pricing communicated at the time of subscription." },
      { title: "Use of ACF Score\u00ae", text: "The ACF Score\u00ae is an indicative diagnostic tool. It does not constitute a regulatory audit, official certification, or legal advice. Results and recommendations are provided for informational purposes only and shall not engage the liability of AI CONSULTING. Users are solely responsible for interpreting and implementing the recommendations." },
      { title: "Intellectual Property", text: "The ACF\u00ae methodology, scoring algorithms, 4-layer framework structure, and all associated deliverables are protected by intellectual property law. Any unauthorized commercial use is strictly prohibited." },
      { title: "Liability", text: "AI CONSULTING endeavors to provide accurate and up-to-date information. However, AI CONSULTING does not guarantee the accuracy, completeness, or timeliness of information published on the website. AI CONSULTING shall not be liable for any direct or indirect damages resulting from the use of the website or the inability to access it." },
      { title: "Modification of Terms", text: "AI CONSULTING reserves the right to modify these Terms at any time. Modifications shall take effect upon publication on the website. Continued use of the website after publication of modifications constitutes acceptance of the new Terms." },
    ]
  },
  {
    id: "confidentialite",
    label: "Privacy Policy",
    content: [
      { title: "Data Controller", text: "The data controller for personal data is AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nice, France. Contact: via the Contact page." },
      { title: "Data Collected", text: "For the ACF Score\u00ae diagnostic: questionnaire responses are processed in real-time to calculate your score and are not stored without your explicit consent. If you provide your email address: it is used solely for sending your PDF report and, with your consent, for communications related to ACF\u00ae." },
      { title: "Contact Form", text: "Information entered in the contact form (name, email, company, message) is used exclusively to respond to your request. It is neither resold nor shared with third parties." },
      { title: "Cookies", text: "The website uses technical cookies necessary for its operation. No advertising or third-party tracking cookies are used. Analytics cookies (if enabled) are anonymized and used solely to improve user experience." },
      { title: "Data Hosting", text: "Data is hosted by Vercel Inc. (United States) under the EU-US Data Privacy Framework. Vercel complies with applicable data protection standards." },
      { title: "Your Rights (GDPR)", text: "In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify, erase, restrict processing, data portability, and object regarding your personal data. To exercise these rights, contact us via the Contact page specifying your request. You also have the right to lodge a complaint with the CNIL (French National Commission on Informatics and Liberty)." },
      { title: "Data Retention", text: "Personal data is retained for the period strictly necessary for the purposes for which it is processed. Contact form data is retained for a maximum of 12 months. Diagnostic data is not retained without explicit consent." },
    ]
  },
  {
    id: "cookies",
    label: "Cookie Policy",
    content: [
      { title: "What is a Cookie?", text: "A cookie is a small text file stored on your device (computer, tablet, smartphone) when you visit a website. It allows the website to remember information about your visit." },
      { title: "Cookies Used", text: "The website exclusively uses essential technical cookies for site operation (session management, language preferences, display). These cookies do not require your prior consent as they are strictly necessary for providing the service." },
      { title: "Analytics Cookies", text: "If analytics tools are implemented, they will use anonymized data and will not allow personal identification. You will be informed and your consent will be obtained before activating these cookies." },
      { title: "Third-Party Cookies", text: "The website does not use any advertising cookies or social media cookies. No data is shared with advertising platforms." },
      { title: "Managing Cookies", text: "You can manage your cookie preferences at any time through your browser settings. Disabling certain cookies may affect your browsing experience." },
    ]
  },
];

const ui = {
  fr: {
    heroTitle: "Informations",
    heroHighlight: "légales",
    heroSubtitle: "Mentions légales, conditions d'utilisation, politique de confidentialité et cookies.",
    lastUpdate: "Dernière mise à jour : Mars 2026",
    contactTitle: "Une question sur vos droits ou nos conditions ?",
    contactText: "Contactez-nous via notre",
    contactLink: "formulaire de contact",
    contactAfter: "ou par courrier au siège social : 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
  en: {
    heroTitle: "Legal",
    heroHighlight: "Information",
    heroSubtitle: "Legal notice, terms of use, privacy policy, and cookies.",
    lastUpdate: "Last updated: March 2026",
    contactTitle: "Questions about your rights or our terms?",
    contactText: "Contact us via our",
    contactLink: "contact form",
    contactAfter: "or by mail to our registered office: 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
};

export default function LegalPage() {
  const locale = useLocale();
  const lang = locale === "fr" ? "fr" : "en";
  const sections = lang === "fr" ? sections_fr : sections_en;
  const t = ui[lang];
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
          <a href={`/${locale}/`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>LEGAL</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{"\u2190 Home"}</a>
            <a href="https://www.acf-score.com/" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score {"\u2192"}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div className="fade-up"><Badge>LEGAL</Badge></div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginTop: 24, marginBottom: 14, letterSpacing: "-1px" }}>
            {t.heroTitle} <span style={{ color: C.gold }}>{t.heroHighlight}</span>
          </h1>
          <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7 }}>
            {t.heroSubtitle}
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
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{t.lastUpdate}</div>
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
            <div style={{ fontSize: 28, flexShrink: 0 }}>{"\uD83D\uDCEC"}</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{t.contactTitle}</div>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>
                {t.contactText} <a href={`/${locale}/contact`} style={{ color: C.gold, textDecoration: "underline" }}>{t.contactLink}</a> {t.contactAfter}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
