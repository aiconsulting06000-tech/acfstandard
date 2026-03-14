"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

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

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("mentions");
  const t = useTranslations();

  const sections = [
    {
      id: "mentions",
      label: t("legal.mentions.label"),
      content: [
        { title: t("legal.mentions.editeur.title"), text: t("legal.mentions.editeur.text") },
        { title: t("legal.mentions.hebergement.title"), text: t("legal.mentions.hebergement.text") },
        { title: t("legal.mentions.propriete.title"), text: t("legal.mentions.propriete.text") },
        { title: t("legal.mentions.createur.title"), text: t("legal.mentions.createur.text") },
        { title: t("legal.mentions.contact.title"), text: t("legal.mentions.contact.text") },
      ]
    },
    {
      id: "cgu",
      label: t("legal.cgu.label"),
      content: [
        { title: t("legal.cgu.objet.title"), text: t("legal.cgu.objet.text") },
        { title: t("legal.cgu.acces.title"), text: t("legal.cgu.acces.text") },
        { title: t("legal.cgu.score.title"), text: t("legal.cgu.score.text") },
        { title: t("legal.cgu.ip.title"), text: t("legal.cgu.ip.text") },
        { title: t("legal.cgu.responsabilite.title"), text: t("legal.cgu.responsabilite.text") },
        { title: t("legal.cgu.modification.title"), text: t("legal.cgu.modification.text") },
      ]
    },
    {
      id: "confidentialite",
      label: t("legal.confidentialite.label"),
      content: [
        { title: t("legal.confidentialite.responsable.title"), text: t("legal.confidentialite.responsable.text") },
        { title: t("legal.confidentialite.donnees.title"), text: t("legal.confidentialite.donnees.text") },
        { title: t("legal.confidentialite.formulaire.title"), text: t("legal.confidentialite.formulaire.text") },
        { title: t("legal.confidentialite.cookies.title"), text: t("legal.confidentialite.cookies.text") },
        { title: t("legal.confidentialite.hebergement.title"), text: t("legal.confidentialite.hebergement.text") },
        { title: t("legal.confidentialite.rgpd.title"), text: t("legal.confidentialite.rgpd.text") },
        { title: t("legal.confidentialite.conservation.title"), text: t("legal.confidentialite.conservation.text") },
      ]
    },
    {
      id: "cookies",
      label: t("legal.cookiePolicy.label"),
      content: [
        { title: t("legal.cookiePolicy.definition.title"), text: t("legal.cookiePolicy.definition.text") },
        { title: t("legal.cookiePolicy.utilises.title"), text: t("legal.cookiePolicy.utilises.text") },
        { title: t("legal.cookiePolicy.analytiques.title"), text: t("legal.cookiePolicy.analytiques.text") },
        { title: t("legal.cookiePolicy.tiers.title"), text: t("legal.cookiePolicy.tiers.text") },
        { title: t("legal.cookiePolicy.gestion.title"), text: t("legal.cookiePolicy.gestion.text") },
      ]
    },
  ];

  const activeSection = sections.find(s => s.id === activeTab)!;

  const footerColumns = [
    { title: t("footer.framework.title"), links: [{ label: t("footer.framework.theStandard"), href: "/en/" },{ label: t("footer.framework.methodology"), href: "/en/#methodology" },{ label: t("footer.framework.research"), href: "/en/#research" },{ label: t("footer.products.certification"), href: "/en/acf-certification" }] },
    { title: t("footer.products.title"), links: [{ label: t("footer.products.score"), href: "/en/acf-score" },{ label: t("footer.products.control"), href: "/en/acf-control" },{ label: t("footer.products.certification"), href: "/en/acf-certification" },{ label: t("footer.products.academy"), href: "/en/acf-certification#academy" }] },
    { title: t("footer.organization.title"), links: [{ label: t("footer.organization.partnerPortal"), href: "/en/acf-partners" },{ label: t("footer.organization.about"), href: "/en/about" },{ label: t("footer.organization.contact"), href: "/en/contact" },{ label: t("footer.organization.legal"), href: "/en/legal" }] },
  ];

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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t("legal.badge")}</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="/en/" style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t("common.backToHome")}</a>
            <a href="https://www.acf-score.com/calculator" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>{t("products.score.cta")}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div className="fade-up"><Badge>{t("legal.badge")}</Badge></div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginTop: 24, marginBottom: 14, letterSpacing: "-1px" }}>
            {t("legal.title")}
          </h1>
          <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7 }}>
            {t("legal.subtitle")}
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
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{t("legal.lastUpdated")}</div>
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
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{t("legal.contactTitle")}</div>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>
                {t("legal.contactText", { link: "" })}<a href="/en/contact" style={{ color: C.gold, textDecoration: "underline" }}>{t("legal.contactLink")}</a>
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
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{t("footer.logoText")}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase" }}>{t("footer.logoSubtext")}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 320 }}>{t("footer.description")}</p>
            </div>
            {footerColumns.map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map(l => (<a key={l.label} href={l.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.bd1}`, padding: "20px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
