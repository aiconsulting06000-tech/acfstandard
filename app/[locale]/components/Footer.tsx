"use client";
import React from "react";
import { useLocale } from "next-intl";

const C = {
  navy1: "#050c1a", navy2: "#071122",
  gold: "#c9a84c", gold2: "#e8c96a",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)",
  goldBorder: "rgba(201,168,76,.2)",
};

export default function Footer() {
  const locale = useLocale();
  const fr = locale === "fr";

  const subtitle = fr
    ? "STANDARD MONDIAL POUR LA GOUVERNANCE IA"
    : "GLOBAL STANDARD FOR AI GOVERNANCE";

  const description = fr
    ? "Le standard de gouvernance pour les organisations déployant des agents IA autonomes."
    : "The governance standard for organizations deploying autonomous AI agents.";

  const columns = [
    {
      title: fr ? "Framework" : "Framework",
      links: [
        { label: fr ? "Le Standard" : "The Standard", href: `/${locale}/standard` },
        { label: fr ? "Méthodologie" : "Methodology", href: `/${locale}/standard#methodology` },
        { label: fr ? "Recherche" : "Research", href: `/${locale}/blog` },
        { label: "ACF Certification", href: `/${locale}/acf-certification` },
      ],
    },
    {
      title: fr ? "Produits" : "Products",
      links: [
        { label: "ACF Score", href: `/${locale}/acf-score` },
        { label: "ACF Control", href: `/${locale}/acf-control` },
        { label: "Certification", href: `/${locale}/acf-certification` },
        { label: "Academy", href: `/${locale}/acf-certification#academy` },
      ],
    },
    {
      title: fr ? "Organisation" : "Organization",
      links: [
        { label: fr ? "Portail partenaire" : "Partner Portal", href: `/${locale}/acf-partners` },
        { label: fr ? "À propos" : "About", href: `/${locale}/about` },
        { label: "Contact", href: `/${locale}/contact` },
        { label: fr ? "Légal" : "Legal", href: `/${locale}/legal` },
      ],
    },
  ];

  return (
    <footer style={{ padding: "48px 0 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, paddingBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 13, color: C.navy1, letterSpacing: 1 }}>ACF</div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>Agentic Commerce Framework®</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase" }}>{subtitle}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 320 }}>{description}</p>
          </div>
          {columns.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => (<a key={l.label} href={l.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s", textDecoration: "none" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.bd1}`, padding: "20px 0", textAlign: "center" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
