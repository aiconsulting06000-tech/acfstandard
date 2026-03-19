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

const ui: Record<string, any> = {
  en: { subtitle: "GLOBAL STANDARD FOR AI GOVERNANCE", description: "The governance standard for organizations deploying autonomous AI agents.", framework: "Framework", theStandard: "The Standard", methodology: "Methodology", research: "Research", products: "Products", tools: "Tools", organization: "Organization", partnerPortal: "Partner Portal", about: "About", legal: "Legal", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved." },
  fr: { subtitle: "STANDARD MONDIAL POUR LA GOUVERNANCE IA", description: "Le standard de gouvernance pour les organisations déployant des agents IA autonomes.", framework: "Framework", theStandard: "Le Standard", methodology: "Méthodologie", research: "Recherche", products: "Produits", tools: "Outils", organization: "Organisation", partnerPortal: "Portail partenaire", about: "À propos", legal: "Légal", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "Explorateur EU AI Act", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tous droits réservés." },
  es: { subtitle: "ESTÁNDAR GLOBAL PARA LA GOBERNANZA DE IA", description: "El estándar de gobernanza para organizaciones que despliegan agentes de IA autónomos.", framework: "Framework", theStandard: "El Estándar", methodology: "Metodología", research: "Investigación", products: "Productos", tools: "Herramientas", organization: "Organización", partnerPortal: "Portal de Socios", about: "Acerca de", legal: "Legal", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "Explorador EU AI Act", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Todos los derechos reservados." },
  de: { subtitle: "GLOBALER STANDARD FÜR KI-GOVERNANCE", description: "Der Governance-Standard für Organisationen, die autonome KI-Agenten einsetzen.", framework: "Framework", theStandard: "Der Standard", methodology: "Methodik", research: "Forschung", products: "Produkte", tools: "Werkzeuge", organization: "Organisation", partnerPortal: "Partnerportal", about: "Über uns", legal: "Impressum", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Alle Rechte vorbehalten." },
  pt: { subtitle: "PADRÃO GLOBAL PARA GOVERNANÇA DE IA", description: "O padrão de governança para organizações que implementam agentes de IA autônomos.", framework: "Framework", theStandard: "O Padrão", methodology: "Metodologia", research: "Pesquisa", products: "Produtos", tools: "Ferramentas", organization: "Organização", partnerPortal: "Portal de Parceiros", about: "Sobre", legal: "Legal", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "Explorador EU AI Act", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Todos os direitos reservados." },
  ja: { subtitle: "AIガバナンスのグローバルスタンダード", description: "自律型AIエージェントを展開する組織のためのガバナンス基準。", framework: "フレームワーク", theStandard: "スタンダード", methodology: "方法論", research: "リサーチ", products: "プロダクト", tools: "ツール", organization: "組織", partnerPortal: "パートナーポータル", about: "概要", legal: "法的情報", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved." },
  zh: { subtitle: "AI治理全球标准", description: "部署自主AI代理的组织的治理标准。", framework: "框架", theStandard: "标准", methodology: "方法论", research: "研究", products: "产品", tools: "工具", organization: "组织", partnerPortal: "合作伙伴门户", about: "关于", legal: "法律", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. 版权所有。" },
  ko: { subtitle: "AI 거버넌스 글로벌 표준", description: "자율 AI 에이전트를 배포하는 조직을 위한 거버넌스 표준.", framework: "프레임워크", theStandard: "표준", methodology: "방법론", research: "연구", products: "제품", tools: "도구", organization: "조직", partnerPortal: "파트너 포털", about: "소개", legal: "법적 고지", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved." },
  it: { subtitle: "STANDARD GLOBALE PER LA GOVERNANCE DELL'IA", description: "Lo standard di governance per le organizzazioni che implementano agenti IA autonomi.", framework: "Framework", theStandard: "Lo Standard", methodology: "Metodologia", research: "Ricerca", products: "Prodotti", tools: "Strumenti", organization: "Organizzazione", partnerPortal: "Portale Partner", about: "Chi siamo", legal: "Legale", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "Esploratore EU AI Act", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tutti i diritti riservati." },
  nl: { subtitle: "WERELDWIJDE STANDAARD VOOR AI-GOVERNANCE", description: "De governance-standaard voor organisaties die autonome AI-agents inzetten.", framework: "Framework", theStandard: "De Standaard", methodology: "Methodologie", research: "Onderzoek", products: "Producten", tools: "Tools", organization: "Organisatie", partnerPortal: "Partnerportaal", about: "Over ons", legal: "Juridisch", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Alle rechten voorbehouden." },
  ru: { subtitle: "ГЛОБАЛЬНЫЙ СТАНДАРТ УПРАВЛЕНИЯ ИИ", description: "Стандарт управления для организаций, развертывающих автономные ИИ-агенты.", framework: "Фреймворк", theStandard: "Стандарт", methodology: "Методология", research: "Исследования", products: "Продукты", tools: "Инструменты", organization: "Организация", partnerPortal: "Портал партнёров", about: "О нас", legal: "Правовая информация", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Все права защищены." },
  ar: { subtitle: "المعيار العالمي لحوكمة الذكاء الاصطناعي", description: "معيار الحوكمة للمؤسسات التي تنشر وكلاء الذكاء الاصطناعي المستقلين.", framework: "الإطار", theStandard: "المعيار", methodology: "المنهجية", research: "الأبحاث", products: "المنتجات", tools: "الأدوات", organization: "المؤسسة", partnerPortal: "بوابة الشركاء", about: "من نحن", legal: "قانوني", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. جميع الحقوق محفوظة." },
  tr: { subtitle: "YAPAY ZEKA YÖNETİŞİMİ İÇİN KÜRESEL STANDART", description: "Otonom yapay zeka ajanları dağıtan kuruluşlar için yönetişim standardı.", framework: "Framework", theStandard: "Standart", methodology: "Metodoloji", research: "Araştırma", products: "Ürünler", tools: "Araçlar", organization: "Organizasyon", partnerPortal: "İş Ortağı Portalı", about: "Hakkımızda", legal: "Yasal", faq: "FAQ", euAiActChecker: "ACF AI Act Checker", aiActExplorer: "EU AI Act Explorer", copyright: "© 2026 Agentic Commerce Framework® — Vincent DORANGE. Tüm hakları saklıdır." },
};

export default function Footer() {
  const locale = useLocale();
  const t = ui[locale] || ui.en;

  const columns = [
    {
      title: t.framework,
      links: [
        { label: t.theStandard, href: `/${locale}/standard` },
        { label: t.methodology, href: `/${locale}/standard#methodology` },
        { label: t.research, href: `/${locale}/blog` },
        { label: "ACF Certification", href: `/${locale}/acf-certification` },
        { label: t.faq, href: `/${locale}/#faq` },
      ],
    },
    {
      title: t.products,
      links: [
        { label: "ACF Score", href: `/${locale}/acf-score` },
        { label: "ACF Control", href: `/${locale}/acf-control` },
        { label: "Certification", href: `/${locale}/acf-certification` },
        { label: t.euAiActChecker, href: `/${locale}/compliance-checker` },
      ],
    },
    {
      title: t.organization,
      links: [
        { label: t.partnerPortal, href: `/${locale}/acf-partners` },
        { label: t.about, href: `/${locale}/about` },
        { label: "Contact", href: `/${locale}/contact` },
        { label: t.legal, href: `/${locale}/legal` },
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
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase" }}>{t.subtitle}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, maxWidth: 320 }}>{t.description}</p>
          </div>
          {columns.map((col: any) => (
            <div key={col.title}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l: any) => (<a key={l.label} href={l.href} style={{ fontSize: 14, color: C.gray2, transition: "color .2s", textDecoration: "none" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l.label}</a>))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.bd1}`, padding: "20px 0", textAlign: "center" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gray, letterSpacing: ".02em" }}>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
