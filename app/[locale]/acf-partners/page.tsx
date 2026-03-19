"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF PARTNERS
   Deploy the Standard. Scale the Trust.
   Design: ACF Standard navy/gold palette
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldGlow: "rgba(201,168,76,.35)", goldBorder: "rgba(201,168,76,.2)",
  white: "#ffffff", gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", bd2: "rgba(201,168,76,.2)",
  green: "#22c55e", red: "#ef4444", amber: "#f59e0b",
  blue: "#3b82f6", purple: "#8b5cf6",
};

/* ── Helpers ───────────────────────────────────── */
function AnimatedCounter({ end, duration = 1600, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let s = 0; const step = end / (duration / 16);
    const t = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [started, end, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function GoldBar() {
  return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, marginBottom: 16 }} />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
      color: C.gold, letterSpacing: ".14em", textTransform: "uppercase",
      background: C.goldDim, border: `1px solid ${C.goldBorder}`,
      padding: "5px 14px", borderRadius: 100, display: "inline-block",
    }}>{children}</span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
      color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12,
    }}>// {children}</div>
  );
}

/* ── Hero Animated Handshake ──────────────────── */
function HeroHandshake() {
  return (
    <svg width="180" height="200" viewBox="0 0 180 200" fill="none">
      <defs>
        <linearGradient id="hh-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" stopOpacity="0.9" /><stop offset="50%" stopColor="#c9a84c" stopOpacity="0.3" /><stop offset="100%" stopColor="#e8c96a" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="hh-fill" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
        </linearGradient>
        <filter id="hh-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="hh-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* Shield outline */}
      <path d="M90 8 L168 32 L168 112 Q168 158 90 196 Q12 158 12 112 L12 32 Z" fill="none" stroke="url(#hh-stroke)" strokeWidth="2.5" filter="url(#hh-glow)" />
      <path d="M90 14 L162 36 L162 110 Q162 153 90 190 Q18 153 18 110 L18 36 Z" fill="url(#hh-fill)" opacity="0.92" />
      <path d="M90 22 L152 42 L152 106 Q152 144 90 180 Q28 144 28 106 L28 42 Z" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.15" />
      {/* Glowing dot */}
      <circle cx="90" cy="48" r="10" fill="#e8c96a" filter="url(#hh-dot)" opacity="0.8" />
      <circle cx="90" cy="48" r="5" fill="#fff" opacity="0.4" />
      {/* Handshake icon */}
      <g transform="translate(52, 70)" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7">
        {/* Left hand */}
        <path d="M4 30 L4 16 Q4 10 10 10 L24 10" />
        {/* Right hand */}
        <path d="M72 30 L72 16 Q72 10 66 10 L52 10" />
        {/* Clasped middle */}
        <path d="M24 10 L32 4 Q38 0 44 4 L52 10" />
        <path d="M24 10 Q30 16 38 14 Q46 12 52 10" />
        {/* Wrists */}
        <line x1="4" y1="30" x2="20" y2="30" />
        <line x1="56" y1="30" x2="72" y2="30" />
        {/* Trust symbol - small star */}
        <circle cx="38" cy="22" r="3" fill="#e8c96a" stroke="none" opacity="0.5" />
      </g>
      {/* Label */}
      <text x="90" y="76" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" opacity="0.6" letterSpacing="0.5">ACF</text>
      <text x="90" y="140" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">PARTNER</text>
    </svg>
  );
}

/* ── Hero Animated Network Globe ──────────────── */
function HeroNetwork() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      <defs>
        <linearGradient id="net-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" stopOpacity="0.8" /><stop offset="100%" stopColor="#c9a84c" stopOpacity="0.5" />
        </linearGradient>
        <filter id="net-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="net-dot"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* Outer ring */}
      <circle cx="90" cy="90" r="80" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.15" />
      <circle cx="90" cy="90" r="68" fill="#071122" opacity="0.6" />
      <circle cx="90" cy="90" r="68" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" />
      {/* Globe grid lines */}
      <ellipse cx="90" cy="90" rx="45" ry="60" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.15" />
      <ellipse cx="90" cy="90" rx="20" ry="60" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.12" />
      <line x1="30" y1="70" x2="150" y2="70" stroke="#c9a84c" strokeWidth="0.8" opacity="0.1" />
      <line x1="25" y1="90" x2="155" y2="90" stroke="#c9a84c" strokeWidth="0.8" opacity="0.15" />
      <line x1="30" y1="110" x2="150" y2="110" stroke="#c9a84c" strokeWidth="0.8" opacity="0.1" />
      {/* Network nodes with connections */}
      <g filter="url(#net-glow)" opacity="0.7">
        {/* Central node */}
        <circle cx="90" cy="90" r="6" fill="#e8c96a" />
        <circle cx="90" cy="90" r="3" fill="#fff" opacity="0.5" />
        {/* Satellite nodes */}
        <circle cx="55" cy="60" r="4" fill="#c9a84c" />
        <circle cx="125" cy="65" r="4" fill="#c9a84c" />
        <circle cx="60" cy="120" r="4" fill="#c9a84c" />
        <circle cx="130" cy="115" r="4" fill="#c9a84c" />
        <circle cx="90" cy="42" r="3.5" fill="#e8c96a" />
        <circle cx="90" cy="138" r="3.5" fill="#e8c96a" />
        {/* Connections */}
        <line x1="90" y1="90" x2="55" y2="60" stroke="#e8c96a" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="90" x2="125" y2="65" stroke="#e8c96a" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="90" x2="60" y2="120" stroke="#e8c96a" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="90" x2="130" y2="115" stroke="#e8c96a" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="90" x2="90" y2="42" stroke="#e8c96a" strokeWidth="1" opacity="0.3" />
        <line x1="90" y1="90" x2="90" y2="138" stroke="#e8c96a" strokeWidth="1" opacity="0.3" />
        {/* Cross connections */}
        <line x1="55" y1="60" x2="125" y2="65" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" strokeDasharray="4 3" />
        <line x1="60" y1="120" x2="130" y2="115" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" strokeDasharray="4 3" />
      </g>
      {/* Pulsing outer dot */}
      <circle cx="55" cy="60" r="2" fill="#fff" opacity="0.3" />
      <circle cx="125" cy="65" r="2" fill="#fff" opacity="0.3" />
      {/* Label */}
      <text x="90" y="148" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" fill="#c9a84c" opacity="0.5" letterSpacing="1">NETWORK</text>
    </svg>
  );
}

/* ── Partner Tier Shield ─────────────────────── */
function PartnerShield({ name, color, colorLight, stars }: { name: string; color: string; colorLight: string; stars: number }) {
  const id = `partner-${name.toLowerCase().replace(/\s/g, "")}`;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <svg width="160" height="182" viewBox="0 0 140 160" fill="none" style={{ filter: `drop-shadow(0 4px 14px ${color}30)`, transition: "all .4s" }}>
        <defs>
          <linearGradient id={`sg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorLight} stopOpacity={0.9} /><stop offset="50%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={colorLight} stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id={`sb-${id}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0d1f3c" /><stop offset="100%" stopColor="#071122" />
          </linearGradient>
          <filter id={`gl-${id}`}><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id={`dgl-${id}`}><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M70 5 L130 24 L130 86 Q130 120 70 150 Q10 120 10 86 L10 24 Z" fill="none" stroke={`url(#sg-${id})`} strokeWidth="2.5" filter={`url(#gl-${id})`} />
        <path d="M70 10 L126 28 L126 85 Q126 117 70 146 Q14 117 14 85 L14 28 Z" fill={`url(#sb-${id})`} opacity="0.95" />
        <path d="M70 18 L118 34 L118 82 Q118 110 70 138 Q22 110 22 82 L22 34 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
        {/* Dot */}
        <circle cx="70" cy="40" r="8" fill={colorLight} filter={`url(#dgl-${id})`} opacity="0.8" />
        <circle cx="70" cy="40" r="4" fill="#fff" opacity="0.4" />
        {/* ACF PARTNER™ */}
        <text x="70" y="68" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="10.5" fontWeight="700" fill="#ffffff" letterSpacing="0.5">ACF PARTNER™</text>
        <line x1="30" y1="76" x2="110" y2="76" stroke={color} strokeWidth="0.5" opacity="0.25" />
        {/* Stars */}
        <g transform={`translate(${70 - (stars * 8)}, 85)`}>
          {Array.from({ length: stars }).map((_: any, i: number) => (
            <text key={i} x={i * 16} y="10" fontFamily="'Space Grotesk'" fontSize="14" fill={color} textAnchor="middle">★</text>
          ))}
        </g>
        {/* Name */}
        <text x="70" y="112" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="12" fontWeight="800" fill={color} letterSpacing="1">{name.toUpperCase()}</text>
        <line x1="30" y1="120" x2="110" y2="120" stroke={color} strokeWidth="0.5" opacity="0.25" />
      </svg>
    </div>
  );
}

/* ── Form Input ────────────────────────────────── */
function FormField({ label, type = "text", placeholder, required = true, options }: { label: string; type?: string; placeholder?: string; required?: boolean; options?: string[] }) {
  const baseStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif",
    background: C.navy3, border: `1px solid ${C.bd1}`, color: "#fff", outline: "none", transition: "border-color .3s",
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>
        {label} {required && <span style={{ color: C.red }}>*</span>}
      </label>
      {type === "select" && options ? (
        <select style={{ ...baseStyle, appearance: "none", cursor: "pointer" }}
          onFocus={e => e.target.style.borderColor = C.goldBorder}
          onBlur={e => e.target.style.borderColor = C.bd1}>
          <option value="" style={{ background: C.navy1 }}>{placeholder || "Select..."}</option>
          {options.map((o: any) => <option key={o} value={o} style={{ background: C.navy1 }}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea rows={4} placeholder={placeholder} style={{ ...baseStyle, resize: "vertical" }}
          onFocus={e => e.target.style.borderColor = C.goldBorder}
          onBlur={e => e.target.style.borderColor = C.bd1} />
      ) : (
        <input type={type} placeholder={placeholder} style={baseStyle}
          onFocus={e => e.target.style.borderColor = C.goldBorder}
          onBlur={e => e.target.style.borderColor = C.bd1} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════ */
const ui = {
  en: {
    navTitle: "ACF PARTNERS",
    navSubtext: "PARTNER NETWORK",
    navHome: "← Home",
    navLogin: "Partner Login",
    partnershipLabel: "PARTNERSHIP",
    partnershipSubLabel: "Deploy the standard",
    networkLabel: "NETWORK",
    networkSubLabel: "Scale worldwide",
    heroBadge: "PARTNER NETWORK",
    heroTitle1: "Deploy the Standard.",
    heroTitle2: "Scale the Trust.",
    heroDesc1: "Agentic governance needs trusted relays.",
    heroDesc2: "Not resellers. Not affiliates.",
    heroDesc3: "Strategic partners who share the mission.",
    heroSubDesc: "ACF Partners deploy, audit, train, and certify organizations worldwide.",
    heroBtn1: "Become a Partner →",
    heroBtn2: "Partner Portal Login",
    advantagesLabel: "Strategic Advantages",
    advantagesTitle1: "Why become an ACF ",
    advantagesTitle2: "Partner",
    advantagesDesc: "You don't just distribute a product. You ",
    advantagesDescStrong: "deploy a governance standard",
    advantagesDesc2: ". That comes with territory, tools, revenue, and authority.",
    advantages: [
      { icon: "🌍", title: "Territory Exclusivity", desc: "Secure your geographical zone. One region, one partner. No competition — only collaboration." },
      { icon: "💰", title: "Revenue Share", desc: "Commission on every ACF Score, Control license, and certification deployed through your network." },
      { icon: "🎓", title: "Academy Access", desc: "Full access to ACF Academy training modules. Train your team, then train your clients." },
      { icon: "🏷️", title: "Co-Branding", desc: "Use the ACF Partner badge. Your brand, backed by the global governance standard." },
      { icon: "📊", title: "Partner Dashboard", desc: "Real-time data on deployments, certifications, revenue. Full visibility on your portfolio." },
      { icon: "🛡️", title: "Priority Support", desc: "Direct access to ACF team. Dedicated onboarding, quarterly reviews, and escalation path." },
    ],
    tiersLabel: "Partnership Levels",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Three levels of partnership. Each unlocks deeper access, more territory, and greater authority.",
    tierAffiliate: { name: "Affiliate", desc: "Entry-level partnership. You recommend and refer.", items: ["Referral commission", "Partner badge usage", "Marketing materials", "Quarterly training webinars", "Partner directory listing"], tagline: "You recommend trust.", applyText: "Apply for Affiliate →" },
    tierCertified: { name: "Certified", desc: "You deploy, train, and audit ACF governance.", items: ["Revenue share", "Territory exclusivity", "Full Academy access", "ACF Control deployment rights", "Co-branded audit reports", "Dedicated account manager"], tagline: "You deploy governance.", applyText: "Apply for Certified →" },
    tierStrategic: { name: "Strategic", desc: "Enterprise-level alliance. Shape the standard.", items: ["Premium revenue share", "Multi-territory exclusivity", "Executive program delivery", "Advisory board seat", "White-label options", "Custom integrations", "Joint go-to-market"], tagline: "You shape the future.", applyText: "Apply for Strategic →" },
    mostPopular: "MOST POPULAR",
    portalLabel: "Existing Partners",
    portalTitle1: "Partner ",
    portalTitle2: "Portal",
    portalDesc: "Access your dashboard, training materials, deployment data, certifications, and revenue reports.",
    portalAccessTitle: "Partner Access",
    portalAccessDesc: "Sign in with your partner credentials",
    portalEmail: "Email",
    portalPassword: "Password",
    portalRemember: "Remember me",
    portalForgot: "Forgot password?",
    portalSignIn: "Sign In →",
    portalNotPartner: "Not a partner yet? ",
    portalApplyNow: "Apply now →",
    insidePortal: "Inside the Portal",
    portalFeatures: [
      { icon: "📊", label: "Deployment Dashboard", desc: "Track all ACF deployments" },
      { icon: "🎓", label: "Training Hub", desc: "Academy modules & certifications" },
      { icon: "💰", label: "Revenue Center", desc: "Commissions & invoicing" },
      { icon: "📋", label: "Audit Reports", desc: "Generate co-branded reports" },
      { icon: "👥", label: "Client Portfolio", desc: "Manage your certified clients" },
      { icon: "🔔", label: "Updates & News", desc: "Latest from ACF Standard" },
    ],
    applyLabel: "Join the Network",
    applyTitle1: "Apply to become an ACF ",
    applyTitle2: "Partner",
    applyDesc: "We select partners carefully. We're looking for organizations that share our vision: ",
    applyDescStrong: "accountable autonomy",
    formFirstName: "First Name",
    formLastName: "Last Name",
    formEmail: "Email",
    formPhone: "Phone",
    formCompany: "Company Name",
    formCountry: "Country / Territory",
    formTier: "Partnership Tier",
    formIndustry: "Industry",
    formTeamSize: "Team Size",
    formWhy: "Why do you want to become an ACF Partner?",
    formWhyPlaceholder: "Tell us about your organization, your experience with AI governance, and what motivates you to deploy the ACF standard in your territory...",
    formWebsite: "Website",
    formTerms: "I agree to the ACF Partner Program Terms & Conditions and acknowledge that my application will be reviewed within 5 business days.",
    formSubmit: "Submit Application →",
    formSuccessTitle: "Application Received!",
    formSuccessDesc1: "Thank you for your interest in the ACF Partner Network. Our team will review your application and get back to you within ",
    formSuccessDesc2: "5 business days",
    formSuccessSteps: ["Application confirmation sent to your email", "Review by ACF partner team", "Interview & alignment call", "Onboarding & territory assignment"],
    tierOptions: ["Affiliate — Referral partner", "Certified — Deploy & train", "Strategic — Enterprise alliance"],
    journeyLabel: "Partner Journey",
    journeyTitle1: "From application to ",
    journeyTitle2: "deployment",
    journeySteps: [
      { step: "01", label: "Apply", desc: "Submit your partner application" },
      { step: "02", label: "Interview", desc: "Alignment call with ACF team" },
      { step: "03", label: "Onboarding", desc: "Academy training & certification" },
      { step: "04", label: "Territory", desc: "Exclusive zone assignment" },
      { step: "05", label: "Deploy", desc: "Audit, train, and certify clients" },
      { step: "06", label: "Grow", desc: "Revenue share, co-branding, scale" },
    ],
    statsLabels: ["Partnership tiers", "Countries covered", "Portal features", "Application review"],
    statsSuffixes: ["", "+", "", " days"],
    finalTitle1: "The standard is global.",
    finalTitle2: "The network is yours.",
    finalDesc: "Whether you're a consultancy, a tech firm, or an enterprise — if you believe in accountable autonomy, there's a place for you.",
    finalBtn1: "Become a Partner →",
    finalBtn2: "Partner Portal Login",
    finalBtn3: "View Certification",
  },
  fr: {
    navTitle: "ACF PARTENAIRES",
    navSubtext: "RÉSEAU PARTENAIRE",
    navHome: "← Accueil",
    navLogin: "Connexion partenaire",
    partnershipLabel: "PARTENARIAT",
    partnershipSubLabel: "Déployez le standard",
    networkLabel: "RÉSEAU",
    networkSubLabel: "Passez à l'échelle mondiale",
    heroBadge: "RÉSEAU PARTENAIRE",
    heroTitle1: "Déployez le Standard.",
    heroTitle2: "Passez la confiance à l'échelle.",
    heroDesc1: "La gouvernance agentique a besoin de relais de confiance.",
    heroDesc2: "Pas de revendeurs. Pas d'affiliés.",
    heroDesc3: "Des partenaires stratégiques qui partagent la mission.",
    heroSubDesc: "Les Partenaires ACF déploient, auditent, forment et certifient les organisations dans le monde entier.",
    heroBtn1: "Devenir Partenaire →",
    heroBtn2: "Connexion portail partenaire",
    advantagesLabel: "Avantages stratégiques",
    advantagesTitle1: "Pourquoi devenir ",
    advantagesTitle2: "Partenaire ACF",
    advantagesDesc: "Vous ne distribuez pas simplement un produit. Vous ",
    advantagesDescStrong: "déployez un standard de gouvernance",
    advantagesDesc2: ". Cela inclut un territoire, des outils, du revenu et de l'autorité.",
    advantages: [
      { icon: "🌍", title: "Exclusivité territoriale", desc: "Sécurisez votre zone géographique. Une région, un partenaire. Pas de concurrence — uniquement de la collaboration." },
      { icon: "💰", title: "Partage de revenus", desc: "Commission sur chaque ACF Score, licence Control et certification déployés via votre réseau." },
      { icon: "🎓", title: "Accès Academy", desc: "Accès complet aux modules de formation ACF Academy. Formez votre équipe, puis formez vos clients." },
      { icon: "🏷️", title: "Co-branding", desc: "Utilisez le badge ACF Partner. Votre marque, adossée au standard de gouvernance mondial." },
      { icon: "📊", title: "Tableau de bord partenaire", desc: "Données en temps réel sur les déploiements, certifications, revenus. Visibilité totale sur votre portefeuille." },
      { icon: "🛡️", title: "Support prioritaire", desc: "Accès direct à l'équipe ACF. Onboarding dédié, revues trimestrielles et chemin d'escalade." },
    ],
    tiersLabel: "Niveaux de partenariat",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Trois niveaux de partenariat. Chacun débloque un accès plus profond, plus de territoire et plus d'autorité.",
    tierAffiliate: { name: "Affilié", desc: "Partenariat d'entrée. Vous recommandez et référez.", items: ["Commission de référencement", "Utilisation du badge partenaire", "Supports marketing", "Webinaires de formation trimestriels", "Inscription annuaire partenaire"], tagline: "Vous recommandez la confiance.", applyText: "Candidater affilié →" },
    tierCertified: { name: "Certifié", desc: "Vous déployez, formez et auditez la gouvernance ACF.", items: ["Partage de revenus", "Exclusivité territoriale", "Accès complet Academy", "Droits de déploiement ACF Control", "Rapports d'audit co-brandés", "Account manager dédié"], tagline: "Vous déployez la gouvernance.", applyText: "Candidater certifié →" },
    tierStrategic: { name: "Stratégique", desc: "Alliance de niveau entreprise. Façonnez le standard.", items: ["Partage de revenus premium", "Exclusivité multi-territoire", "Livraison programme exécutif", "Siège au conseil consultatif", "Options marque blanche", "Intégrations personnalisées", "Go-to-market conjoint"], tagline: "Vous façonnez l'avenir.", applyText: "Candidater stratégique →" },
    mostPopular: "LE PLUS POPULAIRE",
    portalLabel: "Partenaires existants",
    portalTitle1: "Portail ",
    portalTitle2: "Partenaire",
    portalDesc: "Accédez à votre tableau de bord, supports de formation, données de déploiement, certifications et rapports de revenus.",
    portalAccessTitle: "Accès partenaire",
    portalAccessDesc: "Connectez-vous avec vos identifiants partenaire",
    portalEmail: "Email",
    portalPassword: "Mot de passe",
    portalRemember: "Se souvenir de moi",
    portalForgot: "Mot de passe oublié ?",
    portalSignIn: "Se connecter →",
    portalNotPartner: "Pas encore partenaire ? ",
    portalApplyNow: "Candidater maintenant →",
    insidePortal: "À l'intérieur du Portail",
    portalFeatures: [
      { icon: "📊", label: "Tableau de bord déploiements", desc: "Suivez tous les déploiements ACF" },
      { icon: "🎓", label: "Hub formation", desc: "Modules Academy & certifications" },
      { icon: "💰", label: "Centre revenus", desc: "Commissions & facturation" },
      { icon: "📋", label: "Rapports d'audit", desc: "Générez des rapports co-brandés" },
      { icon: "👥", label: "Portefeuille clients", desc: "Gérez vos clients certifiés" },
      { icon: "🔔", label: "Actualités & mises à jour", desc: "Dernières nouvelles d'ACF Standard" },
    ],
    applyLabel: "Rejoindre le réseau",
    applyTitle1: "Candidater pour devenir ",
    applyTitle2: "Partenaire ACF",
    applyDesc: "Nous sélectionnons nos partenaires avec soin. Nous recherchons des organisations qui partagent notre vision : ",
    applyDescStrong: "une autonomie responsable",
    formFirstName: "Prénom",
    formLastName: "Nom",
    formEmail: "Email",
    formPhone: "Téléphone",
    formCompany: "Nom de l'entreprise",
    formCountry: "Pays / Territoire",
    formTier: "Niveau de partenariat",
    formIndustry: "Secteur d'activité",
    formTeamSize: "Taille de l'équipe",
    formWhy: "Pourquoi souhaitez-vous devenir partenaire ACF ?",
    formWhyPlaceholder: "Parlez-nous de votre organisation, votre expérience en gouvernance IA et ce qui vous motive à déployer le standard ACF sur votre territoire...",
    formWebsite: "Site Web",
    formTerms: "J'accepte les conditions générales du programme partenaire ACF et reconnais que ma candidature sera examinée sous 5 jours ouvrés.",
    formSubmit: "Soumettre la candidature →",
    formSuccessTitle: "Candidature reçue !",
    formSuccessDesc1: "Merci de votre intérêt pour le Réseau Partenaire ACF. Notre équipe examinera votre candidature et vous recontactera sous ",
    formSuccessDesc2: "5 jours ouvrés",
    formSuccessSteps: ["Confirmation de candidature envoyée à votre email", "Examen par l'équipe partenaire ACF", "Entretien & appel d'alignement", "Onboarding & attribution de territoire"],
    tierOptions: ["Affilié — Partenaire de référencement", "Certifié — Déployer & former", "Stratégique — Alliance entreprise"],
    journeyLabel: "Parcours partenaire",
    journeyTitle1: "De la candidature au ",
    journeyTitle2: "déploiement",
    journeySteps: [
      { step: "01", label: "Candidater", desc: "Soumettez votre candidature partenaire" },
      { step: "02", label: "Entretien", desc: "Appel d'alignement avec l'équipe ACF" },
      { step: "03", label: "Onboarding", desc: "Formation Academy & certification" },
      { step: "04", label: "Territoire", desc: "Attribution de zone exclusive" },
      { step: "05", label: "Déployer", desc: "Auditer, former et certifier les clients" },
      { step: "06", label: "Croître", desc: "Partage de revenus, co-branding, passage à l'échelle" },
    ],
    statsLabels: ["Niveaux de partenariat", "Pays couverts", "Fonctionnalités portail", "Examen candidature"],
    statsSuffixes: ["", "+", "", " jours"],
    finalTitle1: "Le standard est mondial.",
    finalTitle2: "Le réseau est le vôtre.",
    finalDesc: "Que vous soyez un cabinet de conseil, une entreprise tech ou une grande entreprise — si vous croyez en l'autonomie responsable, il y a une place pour vous.",
    finalBtn1: "Devenir Partenaire →",
    finalBtn2: "Connexion portail partenaire",
    finalBtn3: "Voir la certification",
  },
  es: {
    navTitle: "ACF SOCIOS",
    navSubtext: "RED DE SOCIOS",
    navHome: "← Inicio",
    navLogin: "Acceso socios",
    partnershipLabel: "ALIANZA",
    partnershipSubLabel: "Despliegue el estándar",
    networkLabel: "RED",
    networkSubLabel: "Escale a nivel mundial",
    heroBadge: "RED DE SOCIOS",
    heroTitle1: "Despliegue el Estándar.",
    heroTitle2: "Escale la Confianza.",
    heroDesc1: "La gobernanza agéntica necesita transmisores de confianza.",
    heroDesc2: "No revendedores. No afiliados.",
    heroDesc3: "Socios estratégicos que comparten la misión.",
    heroSubDesc: "Los Socios ACF despliegan, auditan, forman y certifican organizaciones en todo el mundo.",
    heroBtn1: "Convertirse en Socio →",
    heroBtn2: "Acceso portal de socios",
    advantagesLabel: "Ventajas estratégicas",
    advantagesTitle1: "Por qué convertirse en ",
    advantagesTitle2: "Socio ACF",
    advantagesDesc: "No distribuye simplemente un producto. Usted ",
    advantagesDescStrong: "despliega un estándar de gobernanza",
    advantagesDesc2: ". Eso incluye territorio, herramientas, ingresos y autoridad.",
    advantages: [
      { icon: "🌍", title: "Exclusividad territorial", desc: "Asegure su zona geográfica. Una región, un socio. Sin competencia — solo colaboración." },
      { icon: "💰", title: "Reparto de ingresos", desc: "Comisión por cada ACF Score, licencia Control y certificación desplegada a través de su red." },
      { icon: "🎓", title: "Acceso Academy", desc: "Acceso completo a los módulos de formación ACF Academy. Forme a su equipo y luego a sus clientes." },
      { icon: "🏷️", title: "Co-branding", desc: "Use la insignia ACF Partner. Su marca, respaldada por el estándar de gobernanza global." },
      { icon: "📊", title: "Panel de socios", desc: "Datos en tiempo real sobre despliegues, certificaciones e ingresos. Visibilidad total de su cartera." },
      { icon: "🛡️", title: "Soporte prioritario", desc: "Acceso directo al equipo ACF. Onboarding dedicado, revisiones trimestrales y ruta de escalamiento." },
    ],
    tiersLabel: "Niveles de alianza",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Tres niveles de alianza. Cada uno desbloquea mayor acceso, más territorio y mayor autoridad.",
    tierAffiliate: { name: "Afiliado", desc: "Alianza de nivel inicial. Usted recomienda y refiere.", items: ["Comisión por referencia", "Uso de insignia de socio", "Materiales de marketing", "Webinarios de formación trimestrales", "Listado en directorio de socios"], tagline: "Usted recomienda confianza.", applyText: "Solicitar Afiliado →" },
    tierCertified: { name: "Certificado", desc: "Usted despliega, forma y audita la gobernanza ACF.", items: ["Reparto de ingresos", "Exclusividad territorial", "Acceso completo a Academy", "Derechos de despliegue ACF Control", "Informes de auditoría co-branded", "Gestor de cuenta dedicado"], tagline: "Usted despliega gobernanza.", applyText: "Solicitar Certificado →" },
    tierStrategic: { name: "Estratégico", desc: "Alianza de nivel empresarial. Dé forma al estándar.", items: ["Reparto de ingresos premium", "Exclusividad multi-territorial", "Entrega de programa ejecutivo", "Asiento en consejo asesor", "Opciones de marca blanca", "Integraciones personalizadas", "Go-to-market conjunto"], tagline: "Usted da forma al futuro.", applyText: "Solicitar Estratégico →" },
    mostPopular: "MÁS POPULAR",
    portalLabel: "Socios existentes",
    portalTitle1: "Portal de ",
    portalTitle2: "Socios",
    portalDesc: "Acceda a su panel, materiales de formación, datos de despliegue, certificaciones e informes de ingresos.",
    portalAccessTitle: "Acceso de socios",
    portalAccessDesc: "Inicie sesión con sus credenciales de socio",
    portalEmail: "Correo electrónico",
    portalPassword: "Contraseña",
    portalRemember: "Recordarme",
    portalForgot: "¿Olvidó su contraseña?",
    portalSignIn: "Iniciar sesión →",
    portalNotPartner: "¿Aún no es socio? ",
    portalApplyNow: "Solicitar ahora →",
    insidePortal: "Dentro del Portal",
    portalFeatures: [
      { icon: "📊", label: "Panel de despliegues", desc: "Rastree todos los despliegues ACF" },
      { icon: "🎓", label: "Hub de formación", desc: "Módulos Academy y certificaciones" },
      { icon: "💰", label: "Centro de ingresos", desc: "Comisiones y facturación" },
      { icon: "📋", label: "Informes de auditoría", desc: "Genere informes co-branded" },
      { icon: "👥", label: "Cartera de clientes", desc: "Gestione sus clientes certificados" },
      { icon: "🔔", label: "Actualizaciones y noticias", desc: "Lo último de ACF Standard" },
    ],
    applyLabel: "Unirse a la red",
    applyTitle1: "Solicitar para ser ",
    applyTitle2: "Socio ACF",
    applyDesc: "Seleccionamos socios cuidadosamente. Buscamos organizaciones que compartan nuestra visión: ",
    applyDescStrong: "autonomía responsable",
    formFirstName: "Nombre",
    formLastName: "Apellido",
    formEmail: "Correo electrónico",
    formPhone: "Teléfono",
    formCompany: "Nombre de la empresa",
    formCountry: "País / Territorio",
    formTier: "Nivel de alianza",
    formIndustry: "Industria",
    formTeamSize: "Tamaño del equipo",
    formWhy: "¿Por qué desea convertirse en socio ACF?",
    formWhyPlaceholder: "Cuéntenos sobre su organización, su experiencia en gobernanza de IA y qué le motiva a desplegar el estándar ACF en su territorio...",
    formWebsite: "Sitio web",
    formTerms: "Acepto los Términos y Condiciones del Programa de Socios ACF y reconozco que mi solicitud será revisada en un plazo de 5 días hábiles.",
    formSubmit: "Enviar solicitud →",
    formSuccessTitle: "¡Solicitud recibida!",
    formSuccessDesc1: "Gracias por su interés en la Red de Socios ACF. Nuestro equipo revisará su solicitud y se pondrá en contacto en un plazo de ",
    formSuccessDesc2: "5 días hábiles",
    formSuccessSteps: ["Confirmación de solicitud enviada a su correo", "Revisión por el equipo de socios ACF", "Entrevista y llamada de alineación", "Onboarding y asignación de territorio"],
    tierOptions: ["Afiliado — Socio de referencia", "Certificado — Desplegar y formar", "Estratégico — Alianza empresarial"],
    journeyLabel: "Recorrido del socio",
    journeyTitle1: "De la solicitud al ",
    journeyTitle2: "despliegue",
    journeySteps: [
      { step: "01", label: "Solicitar", desc: "Envíe su solicitud de socio" },
      { step: "02", label: "Entrevista", desc: "Llamada de alineación con el equipo ACF" },
      { step: "03", label: "Onboarding", desc: "Formación Academy y certificación" },
      { step: "04", label: "Territorio", desc: "Asignación de zona exclusiva" },
      { step: "05", label: "Desplegar", desc: "Auditar, formar y certificar clientes" },
      { step: "06", label: "Crecer", desc: "Reparto de ingresos, co-branding, escala" },
    ],
    statsLabels: ["Niveles de alianza", "Países cubiertos", "Funciones del portal", "Revisión de solicitud"],
    statsSuffixes: ["", "+", "", " días"],
    finalTitle1: "El estándar es global.",
    finalTitle2: "La red es suya.",
    finalDesc: "Ya sea una consultora, una empresa tecnológica o una gran empresa — si cree en la autonomía responsable, hay un lugar para usted.",
    finalBtn1: "Convertirse en Socio →",
    finalBtn2: "Acceso portal de socios",
    finalBtn3: "Ver certificación",
  },
  de: {
    navTitle: "ACF PARTNER",
    navSubtext: "PARTNERNETZWERK",
    navHome: "← Startseite",
    navLogin: "Partner-Login",
    partnershipLabel: "PARTNERSCHAFT",
    partnershipSubLabel: "Den Standard einsetzen",
    networkLabel: "NETZWERK",
    networkSubLabel: "Weltweit skalieren",
    heroBadge: "PARTNERNETZWERK",
    heroTitle1: "Den Standard einsetzen.",
    heroTitle2: "Vertrauen skalieren.",
    heroDesc1: "Agentische Governance braucht vertrauenswürdige Vermittler.",
    heroDesc2: "Keine Wiederverkäufer. Keine Affiliates.",
    heroDesc3: "Strategische Partner, die die Mission teilen.",
    heroSubDesc: "ACF Partner setzen ein, prüfen, schulen und zertifizieren Organisationen weltweit.",
    heroBtn1: "Partner werden →",
    heroBtn2: "Partner-Portal-Login",
    advantagesLabel: "Strategische Vorteile",
    advantagesTitle1: "Warum ACF ",
    advantagesTitle2: "Partner werden",
    advantagesDesc: "Sie vertreiben nicht einfach ein Produkt. Sie ",
    advantagesDescStrong: "setzen einen Governance-Standard ein",
    advantagesDesc2: ". Das bringt Territorium, Werkzeuge, Umsatz und Autorität mit sich.",
    advantages: [
      { icon: "🌍", title: "Gebietsexklusivität", desc: "Sichern Sie Ihre geografische Zone. Eine Region, ein Partner. Kein Wettbewerb — nur Zusammenarbeit." },
      { icon: "💰", title: "Umsatzbeteiligung", desc: "Provision für jeden ACF Score, jede Control-Lizenz und jede Zertifizierung, die über Ihr Netzwerk eingesetzt wird." },
      { icon: "🎓", title: "Academy-Zugang", desc: "Voller Zugang zu ACF Academy-Schulungsmodulen. Schulen Sie Ihr Team, dann Ihre Kunden." },
      { icon: "🏷️", title: "Co-Branding", desc: "Nutzen Sie das ACF Partner-Abzeichen. Ihre Marke, unterstützt durch den globalen Governance-Standard." },
      { icon: "📊", title: "Partner-Dashboard", desc: "Echtzeitdaten zu Einsätzen, Zertifizierungen und Umsatz. Volle Transparenz über Ihr Portfolio." },
      { icon: "🛡️", title: "Prioritäts-Support", desc: "Direkter Zugang zum ACF-Team. Dediziertes Onboarding, vierteljährliche Reviews und Eskalationspfad." },
    ],
    tiersLabel: "Partnerschaftsstufen",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Drei Partnerschaftsstufen. Jede erschließt tieferen Zugang, mehr Territorium und größere Autorität.",
    tierAffiliate: { name: "Affiliate", desc: "Einstiegspartnerschaft. Sie empfehlen und vermitteln.", items: ["Vermittlungsprovision", "Nutzung des Partner-Abzeichens", "Marketingmaterialien", "Vierteljährliche Schulungswebinare", "Eintrag im Partnerverzeichnis"], tagline: "Sie empfehlen Vertrauen.", applyText: "Als Affiliate bewerben →" },
    tierCertified: { name: "Zertifiziert", desc: "Sie setzen ein, schulen und prüfen ACF-Governance.", items: ["Umsatzbeteiligung", "Gebietsexklusivität", "Voller Academy-Zugang", "ACF Control-Einsatzrechte", "Co-branded Auditberichte", "Dedizierter Account Manager"], tagline: "Sie setzen Governance ein.", applyText: "Als Zertifiziert bewerben →" },
    tierStrategic: { name: "Strategisch", desc: "Unternehmensallianz. Gestalten Sie den Standard.", items: ["Premium-Umsatzbeteiligung", "Multi-Gebietsexklusivität", "Executive-Programmlieferung", "Sitz im Beirat", "White-Label-Optionen", "Individuelle Integrationen", "Gemeinsames Go-to-Market"], tagline: "Sie gestalten die Zukunft.", applyText: "Als Strategisch bewerben →" },
    mostPopular: "AM BELIEBTESTEN",
    portalLabel: "Bestehende Partner",
    portalTitle1: "Partner-",
    portalTitle2: "Portal",
    portalDesc: "Greifen Sie auf Ihr Dashboard, Schulungsmaterialien, Einsatzdaten, Zertifizierungen und Umsatzberichte zu.",
    portalAccessTitle: "Partner-Zugang",
    portalAccessDesc: "Melden Sie sich mit Ihren Partner-Zugangsdaten an",
    portalEmail: "E-Mail",
    portalPassword: "Passwort",
    portalRemember: "Angemeldet bleiben",
    portalForgot: "Passwort vergessen?",
    portalSignIn: "Anmelden →",
    portalNotPartner: "Noch kein Partner? ",
    portalApplyNow: "Jetzt bewerben →",
    insidePortal: "Im Portal",
    portalFeatures: [
      { icon: "📊", label: "Einsatz-Dashboard", desc: "Alle ACF-Einsätze verfolgen" },
      { icon: "🎓", label: "Schulungs-Hub", desc: "Academy-Module & Zertifizierungen" },
      { icon: "💰", label: "Umsatzzentrale", desc: "Provisionen & Rechnungsstellung" },
      { icon: "📋", label: "Auditberichte", desc: "Co-branded Berichte erstellen" },
      { icon: "👥", label: "Kundenportfolio", desc: "Ihre zertifizierten Kunden verwalten" },
      { icon: "🔔", label: "Updates & Neuigkeiten", desc: "Aktuelles von ACF Standard" },
    ],
    applyLabel: "Dem Netzwerk beitreten",
    applyTitle1: "Als ACF ",
    applyTitle2: "Partner bewerben",
    applyDesc: "Wir wählen Partner sorgfältig aus. Wir suchen Organisationen, die unsere Vision teilen: ",
    applyDescStrong: "verantwortungsvolle Autonomie",
    formFirstName: "Vorname",
    formLastName: "Nachname",
    formEmail: "E-Mail",
    formPhone: "Telefon",
    formCompany: "Firmenname",
    formCountry: "Land / Gebiet",
    formTier: "Partnerschaftsstufe",
    formIndustry: "Branche",
    formTeamSize: "Teamgröße",
    formWhy: "Warum möchten Sie ACF Partner werden?",
    formWhyPlaceholder: "Erzählen Sie uns von Ihrer Organisation, Ihrer Erfahrung mit KI-Governance und was Sie motiviert, den ACF-Standard in Ihrem Gebiet einzusetzen...",
    formWebsite: "Webseite",
    formTerms: "Ich stimme den Allgemeinen Geschäftsbedingungen des ACF-Partnerprogramms zu und bestätige, dass meine Bewerbung innerhalb von 5 Werktagen geprüft wird.",
    formSubmit: "Bewerbung einreichen →",
    formSuccessTitle: "Bewerbung eingegangen!",
    formSuccessDesc1: "Vielen Dank für Ihr Interesse am ACF-Partnernetzwerk. Unser Team wird Ihre Bewerbung prüfen und sich innerhalb von ",
    formSuccessDesc2: "5 Werktagen",
    formSuccessSteps: ["Bewerbungsbestätigung an Ihre E-Mail gesendet", "Prüfung durch das ACF-Partnerteam", "Interview & Abstimmungsgespräch", "Onboarding & Gebietszuweisung"],
    tierOptions: ["Affiliate — Vermittlungspartner", "Zertifiziert — Einsetzen & schulen", "Strategisch — Unternehmensallianz"],
    journeyLabel: "Partner-Reise",
    journeyTitle1: "Von der Bewerbung zum ",
    journeyTitle2: "Einsatz",
    journeySteps: [
      { step: "01", label: "Bewerben", desc: "Reichen Sie Ihre Partnerbewerbung ein" },
      { step: "02", label: "Interview", desc: "Abstimmungsgespräch mit dem ACF-Team" },
      { step: "03", label: "Onboarding", desc: "Academy-Schulung & Zertifizierung" },
      { step: "04", label: "Gebiet", desc: "Exklusive Gebietszuweisung" },
      { step: "05", label: "Einsetzen", desc: "Prüfen, schulen und Kunden zertifizieren" },
      { step: "06", label: "Wachsen", desc: "Umsatzbeteiligung, Co-Branding, Skalierung" },
    ],
    statsLabels: ["Partnerschaftsstufen", "Abgedeckte Länder", "Portal-Funktionen", "Bewerbungsprüfung"],
    statsSuffixes: ["", "+", "", " Tage"],
    finalTitle1: "Der Standard ist global.",
    finalTitle2: "Das Netzwerk gehört Ihnen.",
    finalDesc: "Ob Beratungsunternehmen, Technologiefirma oder Großunternehmen — wenn Sie an verantwortungsvolle Autonomie glauben, gibt es einen Platz für Sie.",
    finalBtn1: "Partner werden →",
    finalBtn2: "Partner-Portal-Login",
    finalBtn3: "Zertifizierung ansehen",
  },
  pt: {
    navTitle: "ACF PARCEIROS",
    navSubtext: "REDE DE PARCEIROS",
    navHome: "← Início",
    navLogin: "Login parceiro",
    partnershipLabel: "PARCERIA",
    partnershipSubLabel: "Implante o padrão",
    networkLabel: "REDE",
    networkSubLabel: "Escale mundialmente",
    heroBadge: "REDE DE PARCEIROS",
    heroTitle1: "Implante o Padrão.",
    heroTitle2: "Escale a Confiança.",
    heroDesc1: "A governança agêntica precisa de transmissores confiáveis.",
    heroDesc2: "Não revendedores. Não afiliados.",
    heroDesc3: "Parceiros estratégicos que compartilham a missão.",
    heroSubDesc: "Os Parceiros ACF implantam, auditam, treinam e certificam organizações em todo o mundo.",
    heroBtn1: "Tornar-se Parceiro →",
    heroBtn2: "Login portal de parceiros",
    advantagesLabel: "Vantagens estratégicas",
    advantagesTitle1: "Por que se tornar ",
    advantagesTitle2: "Parceiro ACF",
    advantagesDesc: "Você não distribui apenas um produto. Você ",
    advantagesDescStrong: "implanta um padrão de governança",
    advantagesDesc2: ". Isso inclui território, ferramentas, receita e autoridade.",
    advantages: [
      { icon: "🌍", title: "Exclusividade territorial", desc: "Garanta sua zona geográfica. Uma região, um parceiro. Sem concorrência — apenas colaboração." },
      { icon: "💰", title: "Partilha de receita", desc: "Comissão por cada ACF Score, licença Control e certificação implantada pela sua rede." },
      { icon: "🎓", title: "Acesso Academy", desc: "Acesso completo aos módulos de formação ACF Academy. Treine sua equipe, depois treine seus clientes." },
      { icon: "🏷️", title: "Co-branding", desc: "Use o emblema ACF Partner. Sua marca, apoiada pelo padrão global de governança." },
      { icon: "📊", title: "Painel de parceiros", desc: "Dados em tempo real sobre implantações, certificações e receita. Visibilidade total do seu portfólio." },
      { icon: "🛡️", title: "Suporte prioritário", desc: "Acesso direto à equipe ACF. Onboarding dedicado, revisões trimestrais e caminho de escalamento." },
    ],
    tiersLabel: "Níveis de parceria",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Três níveis de parceria. Cada um desbloqueia acesso mais profundo, mais território e maior autoridade.",
    tierAffiliate: { name: "Afiliado", desc: "Parceria de nível inicial. Você recomenda e indica.", items: ["Comissão por indicação", "Uso do emblema de parceiro", "Materiais de marketing", "Webinários de formação trimestrais", "Listagem no diretório de parceiros"], tagline: "Você recomenda confiança.", applyText: "Candidatar-se Afiliado →" },
    tierCertified: { name: "Certificado", desc: "Você implanta, treina e audita a governança ACF.", items: ["Partilha de receita", "Exclusividade territorial", "Acesso completo à Academy", "Direitos de implantação ACF Control", "Relatórios de auditoria co-branded", "Gestor de conta dedicado"], tagline: "Você implanta governança.", applyText: "Candidatar-se Certificado →" },
    tierStrategic: { name: "Estratégico", desc: "Aliança de nível empresarial. Molde o padrão.", items: ["Partilha de receita premium", "Exclusividade multi-territorial", "Entrega de programa executivo", "Assento no conselho consultivo", "Opções de marca branca", "Integrações personalizadas", "Go-to-market conjunto"], tagline: "Você molda o futuro.", applyText: "Candidatar-se Estratégico →" },
    mostPopular: "MAIS POPULAR",
    portalLabel: "Parceiros existentes",
    portalTitle1: "Portal de ",
    portalTitle2: "Parceiros",
    portalDesc: "Acesse seu painel, materiais de formação, dados de implantação, certificações e relatórios de receita.",
    portalAccessTitle: "Acesso de parceiros",
    portalAccessDesc: "Entre com suas credenciais de parceiro",
    portalEmail: "E-mail",
    portalPassword: "Senha",
    portalRemember: "Lembrar-me",
    portalForgot: "Esqueceu a senha?",
    portalSignIn: "Entrar →",
    portalNotPartner: "Ainda não é parceiro? ",
    portalApplyNow: "Candidatar-se agora →",
    insidePortal: "Dentro do Portal",
    portalFeatures: [
      { icon: "📊", label: "Painel de implantações", desc: "Acompanhe todas as implantações ACF" },
      { icon: "🎓", label: "Hub de formação", desc: "Módulos Academy e certificações" },
      { icon: "💰", label: "Centro de receita", desc: "Comissões e faturamento" },
      { icon: "📋", label: "Relatórios de auditoria", desc: "Gere relatórios co-branded" },
      { icon: "👥", label: "Portfólio de clientes", desc: "Gerencie seus clientes certificados" },
      { icon: "🔔", label: "Atualizações e notícias", desc: "Últimas novidades do ACF Standard" },
    ],
    applyLabel: "Juntar-se à rede",
    applyTitle1: "Candidatar-se para ser ",
    applyTitle2: "Parceiro ACF",
    applyDesc: "Selecionamos parceiros com cuidado. Procuramos organizações que compartilhem nossa visão: ",
    applyDescStrong: "autonomia responsável",
    formFirstName: "Nome",
    formLastName: "Sobrenome",
    formEmail: "E-mail",
    formPhone: "Telefone",
    formCompany: "Nome da empresa",
    formCountry: "País / Território",
    formTier: "Nível de parceria",
    formIndustry: "Setor",
    formTeamSize: "Tamanho da equipe",
    formWhy: "Por que deseja se tornar parceiro ACF?",
    formWhyPlaceholder: "Conte-nos sobre sua organização, sua experiência com governança de IA e o que o motiva a implantar o padrão ACF em seu território...",
    formWebsite: "Website",
    formTerms: "Concordo com os Termos e Condições do Programa de Parceiros ACF e reconheço que minha candidatura será analisada em até 5 dias úteis.",
    formSubmit: "Enviar candidatura →",
    formSuccessTitle: "Candidatura recebida!",
    formSuccessDesc1: "Obrigado pelo seu interesse na Rede de Parceiros ACF. Nossa equipe analisará sua candidatura e entrará em contato em até ",
    formSuccessDesc2: "5 dias úteis",
    formSuccessSteps: ["Confirmação de candidatura enviada ao seu e-mail", "Análise pela equipe de parceiros ACF", "Entrevista e chamada de alinhamento", "Onboarding e atribuição de território"],
    tierOptions: ["Afiliado — Parceiro de indicação", "Certificado — Implantar e treinar", "Estratégico — Aliança empresarial"],
    journeyLabel: "Jornada do parceiro",
    journeyTitle1: "Da candidatura à ",
    journeyTitle2: "implantação",
    journeySteps: [
      { step: "01", label: "Candidatar", desc: "Envie sua candidatura de parceiro" },
      { step: "02", label: "Entrevista", desc: "Chamada de alinhamento com a equipe ACF" },
      { step: "03", label: "Onboarding", desc: "Formação Academy e certificação" },
      { step: "04", label: "Território", desc: "Atribuição de zona exclusiva" },
      { step: "05", label: "Implantar", desc: "Auditar, treinar e certificar clientes" },
      { step: "06", label: "Crescer", desc: "Partilha de receita, co-branding, escala" },
    ],
    statsLabels: ["Níveis de parceria", "Países cobertos", "Funcionalidades do portal", "Análise de candidatura"],
    statsSuffixes: ["", "+", "", " dias"],
    finalTitle1: "O padrão é global.",
    finalTitle2: "A rede é sua.",
    finalDesc: "Seja uma consultoria, uma empresa de tecnologia ou uma grande empresa — se acredita em autonomia responsável, há um lugar para si.",
    finalBtn1: "Tornar-se Parceiro →",
    finalBtn2: "Login portal de parceiros",
    finalBtn3: "Ver certificação",
  },
  ja: {
    navTitle: "ACF パートナー",
    navSubtext: "パートナーネットワーク",
    navHome: "← ホーム",
    navLogin: "パートナーログイン",
    partnershipLabel: "パートナーシップ",
    partnershipSubLabel: "スタンダードを展開",
    networkLabel: "ネットワーク",
    networkSubLabel: "世界規模で拡大",
    heroBadge: "パートナーネットワーク",
    heroTitle1: "スタンダードを展開する。",
    heroTitle2: "信頼を拡大する。",
    heroDesc1: "エージェンティックガバナンスには信頼できる仲介者が必要です。",
    heroDesc2: "再販業者ではなく。アフィリエイトでもなく。",
    heroDesc3: "ミッションを共有する戦略的パートナー。",
    heroSubDesc: "ACF パートナーは世界中の組織を展開、監査、トレーニング、認証します。",
    heroBtn1: "パートナーになる →",
    heroBtn2: "パートナーポータルログイン",
    advantagesLabel: "戦略的メリット",
    advantagesTitle1: "ACF ",
    advantagesTitle2: "パートナーになる理由",
    advantagesDesc: "単に製品を配布するのではありません。あなたは",
    advantagesDescStrong: "ガバナンススタンダードを展開",
    advantagesDesc2: "します。それにはテリトリー、ツール、収益、権限が伴います。",
    advantages: [
      { icon: "🌍", title: "テリトリー独占権", desc: "地理的ゾーンを確保。一つの地域に一つのパートナー。競争なし — コラボレーションのみ。" },
      { icon: "💰", title: "収益分配", desc: "ネットワークを通じて展開されるすべてのACF Score、Controlライセンス、認証に対するコミッション。" },
      { icon: "🎓", title: "Academy アクセス", desc: "ACF Academyトレーニングモジュールへの完全アクセス。チームをトレーニングし、次にクライアントをトレーニング。" },
      { icon: "🏷️", title: "コブランディング", desc: "ACF Partnerバッジを使用。あなたのブランドを、グローバルガバナンススタンダードが支援。" },
      { icon: "📊", title: "パートナーダッシュボード", desc: "展開、認証、収益のリアルタイムデータ。ポートフォリオの完全な可視性。" },
      { icon: "🛡️", title: "優先サポート", desc: "ACFチームへの直接アクセス。専任オンボーディング、四半期レビュー、エスカレーションパス。" },
    ],
    tiersLabel: "パートナーシップレベル",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "3つのパートナーシップレベル。それぞれがより深いアクセス、より多くのテリトリー、より大きな権限を解放します。",
    tierAffiliate: { name: "アフィリエイト", desc: "エントリーレベルのパートナーシップ。推薦と紹介。", items: ["紹介コミッション", "パートナーバッジ使用権", "マーケティング資料", "四半期トレーニングウェビナー", "パートナーディレクトリ掲載"], tagline: "信頼を推薦する。", applyText: "アフィリエイト申請 →" },
    tierCertified: { name: "認定", desc: "ACFガバナンスを展開、トレーニング、監査。", items: ["収益分配", "テリトリー独占権", "Academy完全アクセス", "ACF Control展開権", "コブランド監査レポート", "専任アカウントマネージャー"], tagline: "ガバナンスを展開する。", applyText: "認定パートナー申請 →" },
    tierStrategic: { name: "戦略的", desc: "エンタープライズレベルのアライアンス。スタンダードを形作る。", items: ["プレミアム収益分配", "マルチテリトリー独占権", "エグゼクティブプログラム提供", "アドバイザリーボード席", "ホワイトラベルオプション", "カスタムインテグレーション", "共同Go-to-Market"], tagline: "未来を形作る。", applyText: "戦略パートナー申請 →" },
    mostPopular: "最も人気",
    portalLabel: "既存パートナー",
    portalTitle1: "パートナー",
    portalTitle2: "ポータル",
    portalDesc: "ダッシュボード、トレーニング資料、展開データ、認証、収益レポートにアクセス。",
    portalAccessTitle: "パートナーアクセス",
    portalAccessDesc: "パートナー認証情報でサインイン",
    portalEmail: "メールアドレス",
    portalPassword: "パスワード",
    portalRemember: "ログイン状態を保持",
    portalForgot: "パスワードを忘れた？",
    portalSignIn: "サインイン →",
    portalNotPartner: "まだパートナーではありませんか？",
    portalApplyNow: "今すぐ申請 →",
    insidePortal: "ポータル内部",
    portalFeatures: [
      { icon: "📊", label: "展開ダッシュボード", desc: "すべてのACF展開を追跡" },
      { icon: "🎓", label: "トレーニングハブ", desc: "Academyモジュール＆認証" },
      { icon: "💰", label: "収益センター", desc: "コミッション＆請求" },
      { icon: "📋", label: "監査レポート", desc: "コブランドレポートを生成" },
      { icon: "👥", label: "クライアントポートフォリオ", desc: "認証済みクライアントを管理" },
      { icon: "🔔", label: "更新＆ニュース", desc: "ACF Standardの最新情報" },
    ],
    applyLabel: "ネットワークに参加",
    applyTitle1: "ACF ",
    applyTitle2: "パートナーに申請",
    applyDesc: "パートナーは慎重に選定します。私たちのビジョンを共有する組織を求めています：",
    applyDescStrong: "責任ある自律性",
    formFirstName: "名",
    formLastName: "姓",
    formEmail: "メールアドレス",
    formPhone: "電話番号",
    formCompany: "会社名",
    formCountry: "国 / テリトリー",
    formTier: "パートナーシップレベル",
    formIndustry: "業種",
    formTeamSize: "チーム規模",
    formWhy: "なぜACFパートナーになりたいですか？",
    formWhyPlaceholder: "組織について、AIガバナンスの経験について、テリトリーでACFスタンダードを展開する動機についてお聞かせください...",
    formWebsite: "ウェブサイト",
    formTerms: "ACFパートナープログラムの利用規約に同意し、申請が5営業日以内に審査されることを了承します。",
    formSubmit: "申請を送信 →",
    formSuccessTitle: "申請を受領しました！",
    formSuccessDesc1: "ACFパートナーネットワークにご関心をお寄せいただきありがとうございます。チームが申請を審査し、",
    formSuccessDesc2: "5営業日以内",
    formSuccessSteps: ["申請確認メールを送信", "ACFパートナーチームによる審査", "面談＆アラインメントコール", "オンボーディング＆テリトリー割当"],
    tierOptions: ["アフィリエイト — 紹介パートナー", "認定 — 展開＆トレーニング", "戦略的 — エンタープライズアライアンス"],
    journeyLabel: "パートナージャーニー",
    journeyTitle1: "申請から",
    journeyTitle2: "展開まで",
    journeySteps: [
      { step: "01", label: "申請", desc: "パートナー申請を送信" },
      { step: "02", label: "面談", desc: "ACFチームとのアラインメントコール" },
      { step: "03", label: "オンボーディング", desc: "Academyトレーニング＆認証" },
      { step: "04", label: "テリトリー", desc: "独占ゾーン割当" },
      { step: "05", label: "展開", desc: "クライアントを監査、トレーニング、認証" },
      { step: "06", label: "成長", desc: "収益分配、コブランディング、スケール" },
    ],
    statsLabels: ["パートナーシップレベル", "対象国数", "ポータル機能", "申請審査"],
    statsSuffixes: ["", "+", "", "日"],
    finalTitle1: "スタンダードはグローバル。",
    finalTitle2: "ネットワークはあなたのもの。",
    finalDesc: "コンサルティング会社、テクノロジー企業、大企業のいずれであっても — 責任ある自律性を信じるなら、あなたの場所があります。",
    finalBtn1: "パートナーになる →",
    finalBtn2: "パートナーポータルログイン",
    finalBtn3: "認証を見る",
  },
  zh: {
    navTitle: "ACF 合作伙伴",
    navSubtext: "合作伙伴网络",
    navHome: "← 首页",
    navLogin: "合作伙伴登录",
    partnershipLabel: "合作关系",
    partnershipSubLabel: "部署标准",
    networkLabel: "网络",
    networkSubLabel: "全球扩展",
    heroBadge: "合作伙伴网络",
    heroTitle1: "部署标准。",
    heroTitle2: "扩展信任。",
    heroDesc1: "智能体治理需要可信赖的中继者。",
    heroDesc2: "不是经销商。不是附属机构。",
    heroDesc3: "共享使命的战略合作伙伴。",
    heroSubDesc: "ACF 合作伙伴在全球范围内部署、审计、培训和认证组织。",
    heroBtn1: "成为合作伙伴 →",
    heroBtn2: "合作伙伴门户登录",
    advantagesLabel: "战略优势",
    advantagesTitle1: "为什么成为 ACF ",
    advantagesTitle2: "合作伙伴",
    advantagesDesc: "您不仅仅是分销产品。您在",
    advantagesDescStrong: "部署治理标准",
    advantagesDesc2: "。这包括区域、工具、收入和权限。",
    advantages: [
      { icon: "🌍", title: "区域独占权", desc: "确保您的地理区域。一个区域，一个合作伙伴。无竞争 — 仅有协作。" },
      { icon: "💰", title: "收入分成", desc: "通过您的网络部署的每个 ACF Score、Control 许可证和认证均可获得佣金。" },
      { icon: "🎓", title: "Academy 访问权", desc: "完全访问 ACF Academy 培训模块。培训您的团队，然后培训您的客户。" },
      { icon: "🏷️", title: "联合品牌", desc: "使用 ACF Partner 徽章。您的品牌，由全球治理标准支持。" },
      { icon: "📊", title: "合作伙伴仪表板", desc: "部署、认证、收入的实时数据。完全了解您的组合。" },
      { icon: "🛡️", title: "优先支持", desc: "直接联系 ACF 团队。专属入职培训、季度审查和升级路径。" },
    ],
    tiersLabel: "合作伙伴级别",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "三个合作伙伴级别。每个级别解锁更深入的访问、更多区域和更大的权限。",
    tierAffiliate: { name: "附属", desc: "入门级合作关系。您推荐和转介。", items: ["推荐佣金", "合作伙伴徽章使用权", "营销材料", "季度培训网络研讨会", "合作伙伴目录列表"], tagline: "您推荐信任。", applyText: "申请附属合作伙伴 →" },
    tierCertified: { name: "认证", desc: "您部署、培训和审计 ACF 治理。", items: ["收入分成", "区域独占权", "Academy 完全访问", "ACF Control 部署权", "联合品牌审计报告", "专属客户经理"], tagline: "您部署治理。", applyText: "申请认证合作伙伴 →" },
    tierStrategic: { name: "战略", desc: "企业级联盟。塑造标准。", items: ["高级收入分成", "多区域独占权", "高管项目交付", "顾问委员会席位", "白标选项", "定制集成", "联合市场推广"], tagline: "您塑造未来。", applyText: "申请战略合作伙伴 →" },
    mostPopular: "最受欢迎",
    portalLabel: "现有合作伙伴",
    portalTitle1: "合作伙伴",
    portalTitle2: "门户",
    portalDesc: "访问您的仪表板、培训材料、部署数据、认证和收入报告。",
    portalAccessTitle: "合作伙伴访问",
    portalAccessDesc: "使用您的合作伙伴凭证登录",
    portalEmail: "电子邮件",
    portalPassword: "密码",
    portalRemember: "记住我",
    portalForgot: "忘记密码？",
    portalSignIn: "登录 →",
    portalNotPartner: "还不是合作伙伴？",
    portalApplyNow: "立即申请 →",
    insidePortal: "门户内部",
    portalFeatures: [
      { icon: "📊", label: "部署仪表板", desc: "跟踪所有 ACF 部署" },
      { icon: "🎓", label: "培训中心", desc: "Academy 模块和认证" },
      { icon: "💰", label: "收入中心", desc: "佣金和开票" },
      { icon: "📋", label: "审计报告", desc: "生成联合品牌报告" },
      { icon: "👥", label: "客户组合", desc: "管理您的认证客户" },
      { icon: "🔔", label: "更新与新闻", desc: "ACF Standard 最新动态" },
    ],
    applyLabel: "加入网络",
    applyTitle1: "申请成为 ACF ",
    applyTitle2: "合作伙伴",
    applyDesc: "我们谨慎选择合作伙伴。我们寻找与我们共享愿景的组织：",
    applyDescStrong: "负责任的自主性",
    formFirstName: "名",
    formLastName: "姓",
    formEmail: "电子邮件",
    formPhone: "电话",
    formCompany: "公司名称",
    formCountry: "国家 / 区域",
    formTier: "合作伙伴级别",
    formIndustry: "行业",
    formTeamSize: "团队规模",
    formWhy: "您为什么想成为 ACF 合作伙伴？",
    formWhyPlaceholder: "请告诉我们您的组织、您在 AI 治理方面的经验以及是什么激励您在您的区域部署 ACF 标准...",
    formWebsite: "网站",
    formTerms: "我同意 ACF 合作伙伴计划的条款和条件，并确认我的申请将在 5 个工作日内审核。",
    formSubmit: "提交申请 →",
    formSuccessTitle: "申请已收到！",
    formSuccessDesc1: "感谢您对 ACF 合作伙伴网络的关注。我们的团队将审核您的申请并在",
    formSuccessDesc2: "5 个工作日内",
    formSuccessSteps: ["申请确认已发送至您的邮箱", "ACF 合作伙伴团队审核", "面试和对齐电话", "入职培训和区域分配"],
    tierOptions: ["附属 — 推荐合作伙伴", "认证 — 部署和培训", "战略 — 企业联盟"],
    journeyLabel: "合作伙伴旅程",
    journeyTitle1: "从申请到",
    journeyTitle2: "部署",
    journeySteps: [
      { step: "01", label: "申请", desc: "提交合作伙伴申请" },
      { step: "02", label: "面试", desc: "与 ACF 团队的对齐电话" },
      { step: "03", label: "入职", desc: "Academy 培训和认证" },
      { step: "04", label: "区域", desc: "独占区域分配" },
      { step: "05", label: "部署", desc: "审计、培训和认证客户" },
      { step: "06", label: "增长", desc: "收入分成、联合品牌、扩展" },
    ],
    statsLabels: ["合作伙伴级别", "覆盖国家", "门户功能", "申请审核"],
    statsSuffixes: ["", "+", "", "天"],
    finalTitle1: "标准是全球的。",
    finalTitle2: "网络是您的。",
    finalDesc: "无论您是咨询公司、科技企业还是大型企业 — 如果您相信负责任的自主性，这里有您的一席之地。",
    finalBtn1: "成为合作伙伴 →",
    finalBtn2: "合作伙伴门户登录",
    finalBtn3: "查看认证",
  },
  ko: {
    navTitle: "ACF 파트너",
    navSubtext: "파트너 네트워크",
    navHome: "← 홈",
    navLogin: "파트너 로그인",
    partnershipLabel: "파트너십",
    partnershipSubLabel: "표준을 배포하세요",
    networkLabel: "네트워크",
    networkSubLabel: "전 세계로 확장",
    heroBadge: "파트너 네트워크",
    heroTitle1: "표준을 배포하세요.",
    heroTitle2: "신뢰를 확장하세요.",
    heroDesc1: "에이전틱 거버넌스에는 신뢰할 수 있는 중계자가 필요합니다.",
    heroDesc2: "리셀러가 아닙니다. 제휴사가 아닙니다.",
    heroDesc3: "미션을 공유하는 전략적 파트너.",
    heroSubDesc: "ACF 파트너는 전 세계 조직을 배포, 감사, 교육 및 인증합니다.",
    heroBtn1: "파트너 되기 →",
    heroBtn2: "파트너 포털 로그인",
    advantagesLabel: "전략적 장점",
    advantagesTitle1: "ACF ",
    advantagesTitle2: "파트너가 되는 이유",
    advantagesDesc: "단순히 제품을 유통하는 것이 아닙니다. 당신은 ",
    advantagesDescStrong: "거버넌스 표준을 배포",
    advantagesDesc2: "합니다. 여기에는 영역, 도구, 수익 및 권한이 포함됩니다.",
    advantages: [
      { icon: "🌍", title: "영역 독점권", desc: "지리적 영역을 확보하세요. 하나의 지역, 하나의 파트너. 경쟁 없이 — 오직 협력만." },
      { icon: "💰", title: "수익 공유", desc: "네트워크를 통해 배포되는 모든 ACF Score, Control 라이선스 및 인증에 대한 수수료." },
      { icon: "🎓", title: "Academy 액세스", desc: "ACF Academy 교육 모듈에 대한 완전한 액세스. 팀을 교육하고, 그 다음 고객을 교육하세요." },
      { icon: "🏷️", title: "공동 브랜딩", desc: "ACF Partner 배지를 사용하세요. 글로벌 거버넌스 표준이 뒷받침하는 당신의 브랜드." },
      { icon: "📊", title: "파트너 대시보드", desc: "배포, 인증, 수익에 대한 실시간 데이터. 포트폴리오에 대한 완전한 가시성." },
      { icon: "🛡️", title: "우선 지원", desc: "ACF 팀에 대한 직접 액세스. 전담 온보딩, 분기별 리뷰 및 에스컬레이션 경로." },
    ],
    tiersLabel: "파트너십 등급",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "세 가지 파트너십 등급. 각 등급은 더 깊은 액세스, 더 많은 영역, 더 큰 권한을 제공합니다.",
    tierAffiliate: { name: "제휴", desc: "입문 단계 파트너십. 추천하고 소개합니다.", items: ["추천 수수료", "파트너 배지 사용권", "마케팅 자료", "분기별 교육 웨비나", "파트너 디렉토리 등재"], tagline: "신뢰를 추천합니다.", applyText: "제휴 파트너 신청 →" },
    tierCertified: { name: "인증", desc: "ACF 거버넌스를 배포, 교육 및 감사합니다.", items: ["수익 공유", "영역 독점권", "Academy 완전 액세스", "ACF Control 배포 권한", "공동 브랜드 감사 보고서", "전담 어카운트 매니저"], tagline: "거버넌스를 배포합니다.", applyText: "인증 파트너 신청 →" },
    tierStrategic: { name: "전략", desc: "기업 수준 동맹. 표준을 형성합니다.", items: ["프리미엄 수익 공유", "다중 영역 독점권", "임원 프로그램 제공", "자문위원회 석", "화이트 라벨 옵션", "맞춤형 통합", "공동 시장 진출"], tagline: "미래를 형성합니다.", applyText: "전략 파트너 신청 →" },
    mostPopular: "가장 인기",
    portalLabel: "기존 파트너",
    portalTitle1: "파트너 ",
    portalTitle2: "포털",
    portalDesc: "대시보드, 교육 자료, 배포 데이터, 인증 및 수익 보고서에 액세스하세요.",
    portalAccessTitle: "파트너 액세스",
    portalAccessDesc: "파트너 자격 증명으로 로그인",
    portalEmail: "이메일",
    portalPassword: "비밀번호",
    portalRemember: "로그인 유지",
    portalForgot: "비밀번호를 잊으셨나요?",
    portalSignIn: "로그인 →",
    portalNotPartner: "아직 파트너가 아니신가요? ",
    portalApplyNow: "지금 신청 →",
    insidePortal: "포털 내부",
    portalFeatures: [
      { icon: "📊", label: "배포 대시보드", desc: "모든 ACF 배포 추적" },
      { icon: "🎓", label: "교육 허브", desc: "Academy 모듈 및 인증" },
      { icon: "💰", label: "수익 센터", desc: "수수료 및 청구" },
      { icon: "📋", label: "감사 보고서", desc: "공동 브랜드 보고서 생성" },
      { icon: "👥", label: "고객 포트폴리오", desc: "인증된 고객 관리" },
      { icon: "🔔", label: "업데이트 및 뉴스", desc: "ACF Standard 최신 소식" },
    ],
    applyLabel: "네트워크 가입",
    applyTitle1: "ACF ",
    applyTitle2: "파트너 신청",
    applyDesc: "파트너를 신중하게 선정합니다. 우리의 비전을 공유하는 조직을 찾고 있습니다: ",
    applyDescStrong: "책임 있는 자율성",
    formFirstName: "이름",
    formLastName: "성",
    formEmail: "이메일",
    formPhone: "전화번호",
    formCompany: "회사명",
    formCountry: "국가 / 영역",
    formTier: "파트너십 등급",
    formIndustry: "산업",
    formTeamSize: "팀 규모",
    formWhy: "왜 ACF 파트너가 되고 싶으신가요?",
    formWhyPlaceholder: "조직, AI 거버넌스 경험, 영역에서 ACF 표준을 배포하려는 동기에 대해 알려주세요...",
    formWebsite: "웹사이트",
    formTerms: "ACF 파트너 프로그램 약관에 동의하며, 신청서가 5영업일 이내에 검토될 것임을 인정합니다.",
    formSubmit: "신청서 제출 →",
    formSuccessTitle: "신청이 접수되었습니다!",
    formSuccessDesc1: "ACF 파트너 네트워크에 관심을 가져주셔서 감사합니다. 팀이 신청서를 검토하고 ",
    formSuccessDesc2: "5영업일 이내에",
    formSuccessSteps: ["신청 확인 이메일 발송", "ACF 파트너 팀의 검토", "인터뷰 및 정렬 전화", "온보딩 및 영역 배정"],
    tierOptions: ["제휴 — 추천 파트너", "인증 — 배포 및 교육", "전략 — 기업 동맹"],
    journeyLabel: "파트너 여정",
    journeyTitle1: "신청에서 ",
    journeyTitle2: "배포까지",
    journeySteps: [
      { step: "01", label: "신청", desc: "파트너 신청서 제출" },
      { step: "02", label: "인터뷰", desc: "ACF 팀과의 정렬 전화" },
      { step: "03", label: "온보딩", desc: "Academy 교육 및 인증" },
      { step: "04", label: "영역", desc: "독점 영역 배정" },
      { step: "05", label: "배포", desc: "고객 감사, 교육 및 인증" },
      { step: "06", label: "성장", desc: "수익 공유, 공동 브랜딩, 확장" },
    ],
    statsLabels: ["파트너십 등급", "커버 국가", "포털 기능", "신청 검토"],
    statsSuffixes: ["", "+", "", "일"],
    finalTitle1: "표준은 글로벌입니다.",
    finalTitle2: "네트워크는 당신의 것입니다.",
    finalDesc: "컨설팅 회사든, 기술 기업이든, 대기업이든 — 책임 있는 자율성을 믿는다면, 당신을 위한 자리가 있습니다.",
    finalBtn1: "파트너 되기 →",
    finalBtn2: "파트너 포털 로그인",
    finalBtn3: "인증 보기",
  },
  it: {
    navTitle: "ACF PARTNER",
    navSubtext: "RETE PARTNER",
    navHome: "← Home",
    navLogin: "Login partner",
    partnershipLabel: "PARTNERSHIP",
    partnershipSubLabel: "Implementa lo standard",
    networkLabel: "RETE",
    networkSubLabel: "Scala a livello mondiale",
    heroBadge: "RETE PARTNER",
    heroTitle1: "Implementa lo Standard.",
    heroTitle2: "Scala la Fiducia.",
    heroDesc1: "La governance agentica ha bisogno di intermediari fidati.",
    heroDesc2: "Non rivenditori. Non affiliati.",
    heroDesc3: "Partner strategici che condividono la missione.",
    heroSubDesc: "I Partner ACF implementano, verificano, formano e certificano organizzazioni in tutto il mondo.",
    heroBtn1: "Diventa Partner →",
    heroBtn2: "Login portale partner",
    advantagesLabel: "Vantaggi strategici",
    advantagesTitle1: "Perché diventare ",
    advantagesTitle2: "Partner ACF",
    advantagesDesc: "Non distribuite semplicemente un prodotto. Voi ",
    advantagesDescStrong: "implementate uno standard di governance",
    advantagesDesc2: ". Questo include territorio, strumenti, ricavi e autorità.",
    advantages: [
      { icon: "🌍", title: "Esclusiva territoriale", desc: "Assicuratevi la vostra zona geografica. Una regione, un partner. Nessuna concorrenza — solo collaborazione." },
      { icon: "💰", title: "Condivisione ricavi", desc: "Commissione su ogni ACF Score, licenza Control e certificazione implementata tramite la vostra rete." },
      { icon: "🎓", title: "Accesso Academy", desc: "Accesso completo ai moduli di formazione ACF Academy. Formate il vostro team, poi i vostri clienti." },
      { icon: "🏷️", title: "Co-branding", desc: "Utilizzate il badge ACF Partner. Il vostro marchio, supportato dallo standard di governance globale." },
      { icon: "📊", title: "Dashboard partner", desc: "Dati in tempo reale su implementazioni, certificazioni e ricavi. Piena visibilità sul vostro portfolio." },
      { icon: "🛡️", title: "Supporto prioritario", desc: "Accesso diretto al team ACF. Onboarding dedicato, revisioni trimestrali e percorso di escalation." },
    ],
    tiersLabel: "Livelli di partnership",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Tre livelli di partnership. Ciascuno sblocca un accesso più profondo, più territorio e maggiore autorità.",
    tierAffiliate: { name: "Affiliato", desc: "Partnership di livello base. Raccomandate e segnalate.", items: ["Commissione di segnalazione", "Utilizzo del badge partner", "Materiali di marketing", "Webinar di formazione trimestrali", "Inserimento nella directory partner"], tagline: "Raccomandate la fiducia.", applyText: "Candidatura Affiliato →" },
    tierCertified: { name: "Certificato", desc: "Implementate, formate e verificate la governance ACF.", items: ["Condivisione ricavi", "Esclusiva territoriale", "Accesso completo Academy", "Diritti di implementazione ACF Control", "Report di audit co-branded", "Account manager dedicato"], tagline: "Implementate la governance.", applyText: "Candidatura Certificato →" },
    tierStrategic: { name: "Strategico", desc: "Alleanza di livello enterprise. Plasmate lo standard.", items: ["Condivisione ricavi premium", "Esclusiva multi-territoriale", "Erogazione programma executive", "Seggio nel consiglio consultivo", "Opzioni white-label", "Integrazioni personalizzate", "Go-to-market congiunto"], tagline: "Plasmate il futuro.", applyText: "Candidatura Strategico →" },
    mostPopular: "PIÙ POPOLARE",
    portalLabel: "Partner esistenti",
    portalTitle1: "Portale ",
    portalTitle2: "Partner",
    portalDesc: "Accedete alla vostra dashboard, materiali formativi, dati di implementazione, certificazioni e report sui ricavi.",
    portalAccessTitle: "Accesso partner",
    portalAccessDesc: "Accedete con le vostre credenziali partner",
    portalEmail: "Email",
    portalPassword: "Password",
    portalRemember: "Ricordami",
    portalForgot: "Password dimenticata?",
    portalSignIn: "Accedi →",
    portalNotPartner: "Non sei ancora partner? ",
    portalApplyNow: "Candidati ora →",
    insidePortal: "All'interno del Portale",
    portalFeatures: [
      { icon: "📊", label: "Dashboard implementazioni", desc: "Monitorate tutte le implementazioni ACF" },
      { icon: "🎓", label: "Hub formazione", desc: "Moduli Academy e certificazioni" },
      { icon: "💰", label: "Centro ricavi", desc: "Commissioni e fatturazione" },
      { icon: "📋", label: "Report di audit", desc: "Generate report co-branded" },
      { icon: "👥", label: "Portfolio clienti", desc: "Gestite i vostri clienti certificati" },
      { icon: "🔔", label: "Aggiornamenti e novità", desc: "Ultime notizie da ACF Standard" },
    ],
    applyLabel: "Unisciti alla rete",
    applyTitle1: "Candidati per diventare ",
    applyTitle2: "Partner ACF",
    applyDesc: "Selezioniamo i partner con attenzione. Cerchiamo organizzazioni che condividano la nostra visione: ",
    applyDescStrong: "autonomia responsabile",
    formFirstName: "Nome",
    formLastName: "Cognome",
    formEmail: "Email",
    formPhone: "Telefono",
    formCompany: "Nome azienda",
    formCountry: "Paese / Territorio",
    formTier: "Livello di partnership",
    formIndustry: "Settore",
    formTeamSize: "Dimensione del team",
    formWhy: "Perché volete diventare Partner ACF?",
    formWhyPlaceholder: "Parlateci della vostra organizzazione, della vostra esperienza nella governance dell'IA e di cosa vi motiva a implementare lo standard ACF nel vostro territorio...",
    formWebsite: "Sito web",
    formTerms: "Accetto i Termini e Condizioni del Programma Partner ACF e riconosco che la mia candidatura sarà esaminata entro 5 giorni lavorativi.",
    formSubmit: "Invia candidatura →",
    formSuccessTitle: "Candidatura ricevuta!",
    formSuccessDesc1: "Grazie per il vostro interesse nella Rete Partner ACF. Il nostro team esaminerà la vostra candidatura e vi ricontatterà entro ",
    formSuccessDesc2: "5 giorni lavorativi",
    formSuccessSteps: ["Conferma candidatura inviata alla vostra email", "Esame da parte del team partner ACF", "Colloquio e call di allineamento", "Onboarding e assegnazione territorio"],
    tierOptions: ["Affiliato — Partner di segnalazione", "Certificato — Implementare e formare", "Strategico — Alleanza enterprise"],
    journeyLabel: "Percorso partner",
    journeyTitle1: "Dalla candidatura ",
    journeyTitle2: "all'implementazione",
    journeySteps: [
      { step: "01", label: "Candidatura", desc: "Inviate la vostra candidatura partner" },
      { step: "02", label: "Colloquio", desc: "Call di allineamento con il team ACF" },
      { step: "03", label: "Onboarding", desc: "Formazione Academy e certificazione" },
      { step: "04", label: "Territorio", desc: "Assegnazione zona esclusiva" },
      { step: "05", label: "Implementare", desc: "Verificare, formare e certificare i clienti" },
      { step: "06", label: "Crescere", desc: "Condivisione ricavi, co-branding, scala" },
    ],
    statsLabels: ["Livelli di partnership", "Paesi coperti", "Funzionalità portale", "Esame candidatura"],
    statsSuffixes: ["", "+", "", " giorni"],
    finalTitle1: "Lo standard è globale.",
    finalTitle2: "La rete è vostra.",
    finalDesc: "Che siate una società di consulenza, un'azienda tech o un'impresa — se credete nell'autonomia responsabile, c'è un posto per voi.",
    finalBtn1: "Diventa Partner →",
    finalBtn2: "Login portale partner",
    finalBtn3: "Vedi certificazione",
  },
  nl: {
    navTitle: "ACF PARTNERS",
    navSubtext: "PARTNERNETWERK",
    navHome: "← Home",
    navLogin: "Partner login",
    partnershipLabel: "PARTNERSCHAP",
    partnershipSubLabel: "De standaard implementeren",
    networkLabel: "NETWERK",
    networkSubLabel: "Wereldwijd opschalen",
    heroBadge: "PARTNERNETWERK",
    heroTitle1: "Implementeer de Standaard.",
    heroTitle2: "Schaal het Vertrouwen.",
    heroDesc1: "Agentisch bestuur heeft betrouwbare tussenpersonen nodig.",
    heroDesc2: "Geen wederverkopers. Geen affiliates.",
    heroDesc3: "Strategische partners die de missie delen.",
    heroSubDesc: "ACF Partners implementeren, auditen, trainen en certificeren organisaties wereldwijd.",
    heroBtn1: "Word Partner →",
    heroBtn2: "Partner portaal login",
    advantagesLabel: "Strategische voordelen",
    advantagesTitle1: "Waarom ACF ",
    advantagesTitle2: "Partner worden",
    advantagesDesc: "U distribueert niet zomaar een product. U ",
    advantagesDescStrong: "implementeert een bestuursstandaard",
    advantagesDesc2: ". Dat brengt territorium, tools, omzet en autoriteit met zich mee.",
    advantages: [
      { icon: "🌍", title: "Territoriale exclusiviteit", desc: "Beveilig uw geografische zone. Eén regio, één partner. Geen concurrentie — alleen samenwerking." },
      { icon: "💰", title: "Omzetdeling", desc: "Commissie op elke ACF Score, Control-licentie en certificering via uw netwerk." },
      { icon: "🎓", title: "Academy-toegang", desc: "Volledige toegang tot ACF Academy-trainingsmodules. Train uw team, dan uw klanten." },
      { icon: "🏷️", title: "Co-branding", desc: "Gebruik het ACF Partner-badge. Uw merk, ondersteund door de wereldwijde bestuursstandaard." },
      { icon: "📊", title: "Partner dashboard", desc: "Real-time data over implementaties, certificeringen en omzet. Volledig zicht op uw portfolio." },
      { icon: "🛡️", title: "Prioriteitsondersteuning", desc: "Directe toegang tot het ACF-team. Dedicated onboarding, kwartaalreviews en escalatiepad." },
    ],
    tiersLabel: "Partnerschapsniveaus",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Drie partnerschapsniveaus. Elk ontsluit diepere toegang, meer territorium en grotere autoriteit.",
    tierAffiliate: { name: "Affiliate", desc: "Instapniveau partnerschap. U beveelt aan en verwijst door.", items: ["Verwijzingscommissie", "Gebruik partnerbadge", "Marketingmaterialen", "Kwartaal trainingswebinars", "Vermelding in partnerlijst"], tagline: "U beveelt vertrouwen aan.", applyText: "Aanvragen als Affiliate →" },
    tierCertified: { name: "Gecertificeerd", desc: "U implementeert, traint en auditeert ACF-bestuur.", items: ["Omzetdeling", "Territoriale exclusiviteit", "Volledige Academy-toegang", "ACF Control implementatierechten", "Co-branded auditrapporten", "Dedicated accountmanager"], tagline: "U implementeert bestuur.", applyText: "Aanvragen als Gecertificeerd →" },
    tierStrategic: { name: "Strategisch", desc: "Enterprise-alliantie. Vorm de standaard.", items: ["Premium omzetdeling", "Multi-territoriale exclusiviteit", "Executive programma-levering", "Zetel in adviesraad", "White-label opties", "Maatwerkintegraties", "Gezamenlijke go-to-market"], tagline: "U vormt de toekomst.", applyText: "Aanvragen als Strategisch →" },
    mostPopular: "MEEST POPULAIR",
    portalLabel: "Bestaande partners",
    portalTitle1: "Partner ",
    portalTitle2: "Portaal",
    portalDesc: "Toegang tot uw dashboard, trainingsmaterialen, implementatiedata, certificeringen en omzetrapporten.",
    portalAccessTitle: "Partnertoegang",
    portalAccessDesc: "Log in met uw partnergegevens",
    portalEmail: "E-mail",
    portalPassword: "Wachtwoord",
    portalRemember: "Onthoud mij",
    portalForgot: "Wachtwoord vergeten?",
    portalSignIn: "Inloggen →",
    portalNotPartner: "Nog geen partner? ",
    portalApplyNow: "Nu aanvragen →",
    insidePortal: "In het Portaal",
    portalFeatures: [
      { icon: "📊", label: "Implementatie dashboard", desc: "Volg alle ACF-implementaties" },
      { icon: "🎓", label: "Trainingshub", desc: "Academy-modules & certificeringen" },
      { icon: "💰", label: "Omzetcentrum", desc: "Commissies & facturering" },
      { icon: "📋", label: "Auditrapporten", desc: "Genereer co-branded rapporten" },
      { icon: "👥", label: "Klantenportfolio", desc: "Beheer uw gecertificeerde klanten" },
      { icon: "🔔", label: "Updates & nieuws", desc: "Laatste nieuws van ACF Standard" },
    ],
    applyLabel: "Sluit u aan bij het netwerk",
    applyTitle1: "Aanvragen om ACF ",
    applyTitle2: "Partner te worden",
    applyDesc: "We selecteren partners zorgvuldig. We zoeken organisaties die onze visie delen: ",
    applyDescStrong: "verantwoorde autonomie",
    formFirstName: "Voornaam",
    formLastName: "Achternaam",
    formEmail: "E-mail",
    formPhone: "Telefoon",
    formCompany: "Bedrijfsnaam",
    formCountry: "Land / Territorium",
    formTier: "Partnerschapsniveau",
    formIndustry: "Sector",
    formTeamSize: "Teamgrootte",
    formWhy: "Waarom wilt u ACF Partner worden?",
    formWhyPlaceholder: "Vertel ons over uw organisatie, uw ervaring met AI-bestuur en wat u motiveert om de ACF-standaard in uw territorium te implementeren...",
    formWebsite: "Website",
    formTerms: "Ik ga akkoord met de Algemene Voorwaarden van het ACF-partnerprogramma en erken dat mijn aanvraag binnen 5 werkdagen wordt beoordeeld.",
    formSubmit: "Aanvraag indienen →",
    formSuccessTitle: "Aanvraag ontvangen!",
    formSuccessDesc1: "Bedankt voor uw interesse in het ACF Partnernetwerk. Ons team zal uw aanvraag beoordelen en binnen ",
    formSuccessDesc2: "5 werkdagen",
    formSuccessSteps: ["Aanvraagbevestiging naar uw e-mail gestuurd", "Beoordeling door het ACF-partnerteam", "Interview & afstemmingsgesprek", "Onboarding & territoriumtoewijzing"],
    tierOptions: ["Affiliate — Verwijzingspartner", "Gecertificeerd — Implementeren & trainen", "Strategisch — Enterprise-alliantie"],
    journeyLabel: "Partner reis",
    journeyTitle1: "Van aanvraag tot ",
    journeyTitle2: "implementatie",
    journeySteps: [
      { step: "01", label: "Aanvragen", desc: "Dien uw partneraanvraag in" },
      { step: "02", label: "Interview", desc: "Afstemmingsgesprek met het ACF-team" },
      { step: "03", label: "Onboarding", desc: "Academy-training & certificering" },
      { step: "04", label: "Territorium", desc: "Exclusieve zonetoewijzing" },
      { step: "05", label: "Implementeren", desc: "Auditeren, trainen en klanten certificeren" },
      { step: "06", label: "Groeien", desc: "Omzetdeling, co-branding, opschaling" },
    ],
    statsLabels: ["Partnerschapsniveaus", "Gedekte landen", "Portaalfuncties", "Aanvraagbeoordeling"],
    statsSuffixes: ["", "+", "", " dagen"],
    finalTitle1: "De standaard is mondiaal.",
    finalTitle2: "Het netwerk is van u.",
    finalDesc: "Of u nu een adviesbureau, een techbedrijf of een onderneming bent — als u gelooft in verantwoorde autonomie, is er een plek voor u.",
    finalBtn1: "Word Partner →",
    finalBtn2: "Partner portaal login",
    finalBtn3: "Bekijk certificering",
  },
  ru: {
    navTitle: "ACF ПАРТНЁРЫ",
    navSubtext: "ПАРТНЁРСКАЯ СЕТЬ",
    navHome: "← Главная",
    navLogin: "Вход для партнёров",
    partnershipLabel: "ПАРТНЁРСТВО",
    partnershipSubLabel: "Внедрите стандарт",
    networkLabel: "СЕТЬ",
    networkSubLabel: "Масштабируйтесь глобально",
    heroBadge: "ПАРТНЁРСКАЯ СЕТЬ",
    heroTitle1: "Внедрите Стандарт.",
    heroTitle2: "Масштабируйте Доверие.",
    heroDesc1: "Агентному управлению нужны доверенные посредники.",
    heroDesc2: "Не реселлеры. Не аффилиаты.",
    heroDesc3: "Стратегические партнёры, разделяющие миссию.",
    heroSubDesc: "Партнёры ACF внедряют, проводят аудит, обучают и сертифицируют организации по всему миру.",
    heroBtn1: "Стать партнёром →",
    heroBtn2: "Вход в портал партнёров",
    advantagesLabel: "Стратегические преимущества",
    advantagesTitle1: "Почему стать ",
    advantagesTitle2: "партнёром ACF",
    advantagesDesc: "Вы не просто распространяете продукт. Вы ",
    advantagesDescStrong: "внедряете стандарт управления",
    advantagesDesc2: ". Это включает территорию, инструменты, доход и полномочия.",
    advantages: [
      { icon: "🌍", title: "Территориальная эксклюзивность", desc: "Закрепите свою географическую зону. Один регион — один партнёр. Без конкуренции — только сотрудничество." },
      { icon: "💰", title: "Распределение доходов", desc: "Комиссия за каждый ACF Score, лицензию Control и сертификацию, развёрнутую через вашу сеть." },
      { icon: "🎓", title: "Доступ к Academy", desc: "Полный доступ к учебным модулям ACF Academy. Обучите свою команду, затем — клиентов." },
      { icon: "🏷️", title: "Ко-брендинг", desc: "Используйте значок ACF Partner. Ваш бренд, подкреплённый глобальным стандартом управления." },
      { icon: "📊", title: "Панель партнёра", desc: "Данные в реальном времени о внедрениях, сертификациях и доходах. Полная прозрачность по вашему портфелю." },
      { icon: "🛡️", title: "Приоритетная поддержка", desc: "Прямой доступ к команде ACF. Выделенный онбординг, квартальные обзоры и путь эскалации." },
    ],
    tiersLabel: "Уровни партнёрства",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Три уровня партнёрства. Каждый открывает более глубокий доступ, больше территории и больше полномочий.",
    tierAffiliate: { name: "Аффилиат", desc: "Партнёрство начального уровня. Вы рекомендуете и направляете.", items: ["Реферальная комиссия", "Использование значка партнёра", "Маркетинговые материалы", "Ежеквартальные обучающие вебинары", "Размещение в каталоге партнёров"], tagline: "Вы рекомендуете доверие.", applyText: "Подать заявку на Аффилиат →" },
    tierCertified: { name: "Сертифицированный", desc: "Вы внедряете, обучаете и проводите аудит ACF.", items: ["Распределение доходов", "Территориальная эксклюзивность", "Полный доступ к Academy", "Права на внедрение ACF Control", "Ко-брендовые аудиторские отчёты", "Выделенный менеджер по работе с клиентами"], tagline: "Вы внедряете управление.", applyText: "Подать заявку на Сертифицированный →" },
    tierStrategic: { name: "Стратегический", desc: "Альянс корпоративного уровня. Формируйте стандарт.", items: ["Премиальное распределение доходов", "Мультитерриториальная эксклюзивность", "Доставка программы для руководителей", "Место в консультативном совете", "Варианты white-label", "Пользовательские интеграции", "Совместный выход на рынок"], tagline: "Вы формируете будущее.", applyText: "Подать заявку на Стратегический →" },
    mostPopular: "САМЫЙ ПОПУЛЯРНЫЙ",
    portalLabel: "Действующие партнёры",
    portalTitle1: "Портал ",
    portalTitle2: "партнёров",
    portalDesc: "Доступ к панели управления, учебным материалам, данным о внедрениях, сертификациям и отчётам о доходах.",
    portalAccessTitle: "Доступ для партнёров",
    portalAccessDesc: "Войдите с учётными данными партнёра",
    portalEmail: "Электронная почта",
    portalPassword: "Пароль",
    portalRemember: "Запомнить меня",
    portalForgot: "Забыли пароль?",
    portalSignIn: "Войти →",
    portalNotPartner: "Ещё не партнёр? ",
    portalApplyNow: "Подать заявку →",
    insidePortal: "Внутри портала",
    portalFeatures: [
      { icon: "📊", label: "Панель внедрений", desc: "Отслеживайте все внедрения ACF" },
      { icon: "🎓", label: "Учебный центр", desc: "Модули Academy и сертификации" },
      { icon: "💰", label: "Центр доходов", desc: "Комиссии и выставление счетов" },
      { icon: "📋", label: "Аудиторские отчёты", desc: "Генерация ко-брендовых отчётов" },
      { icon: "👥", label: "Портфель клиентов", desc: "Управление сертифицированными клиентами" },
      { icon: "🔔", label: "Обновления и новости", desc: "Последние новости от ACF Standard" },
    ],
    applyLabel: "Присоединиться к сети",
    applyTitle1: "Подать заявку на статус ",
    applyTitle2: "партнёра ACF",
    applyDesc: "Мы тщательно отбираем партнёров. Мы ищем организации, разделяющие наше видение: ",
    applyDescStrong: "ответственная автономия",
    formFirstName: "Имя",
    formLastName: "Фамилия",
    formEmail: "Электронная почта",
    formPhone: "Телефон",
    formCompany: "Название компании",
    formCountry: "Страна / Территория",
    formTier: "Уровень партнёрства",
    formIndustry: "Отрасль",
    formTeamSize: "Размер команды",
    formWhy: "Почему вы хотите стать партнёром ACF?",
    formWhyPlaceholder: "Расскажите о своей организации, опыте в области ИИ-управления и о том, что мотивирует вас внедрять стандарт ACF на вашей территории...",
    formWebsite: "Веб-сайт",
    formTerms: "Я принимаю Условия партнёрской программы ACF и подтверждаю, что моя заявка будет рассмотрена в течение 5 рабочих дней.",
    formSubmit: "Отправить заявку →",
    formSuccessTitle: "Заявка получена!",
    formSuccessDesc1: "Благодарим за интерес к партнёрской сети ACF. Наша команда рассмотрит вашу заявку и свяжется с вами в течение ",
    formSuccessDesc2: "5 рабочих дней",
    formSuccessSteps: ["Подтверждение заявки отправлено на вашу почту", "Рассмотрение командой партнёров ACF", "Собеседование и согласовательный звонок", "Онбординг и назначение территории"],
    tierOptions: ["Аффилиат — Реферальный партнёр", "Сертифицированный — Внедрение и обучение", "Стратегический — Корпоративный альянс"],
    journeyLabel: "Путь партнёра",
    journeyTitle1: "От заявки до ",
    journeyTitle2: "внедрения",
    journeySteps: [
      { step: "01", label: "Заявка", desc: "Подайте партнёрскую заявку" },
      { step: "02", label: "Собеседование", desc: "Согласовательный звонок с командой ACF" },
      { step: "03", label: "Онбординг", desc: "Обучение в Academy и сертификация" },
      { step: "04", label: "Территория", desc: "Назначение эксклюзивной зоны" },
      { step: "05", label: "Внедрение", desc: "Аудит, обучение и сертификация клиентов" },
      { step: "06", label: "Рост", desc: "Распределение доходов, ко-брендинг, масштабирование" },
    ],
    statsLabels: ["Уровни партнёрства", "Охваченные страны", "Функции портала", "Рассмотрение заявки"],
    statsSuffixes: ["", "+", "", " дней"],
    finalTitle1: "Стандарт глобален.",
    finalTitle2: "Сеть — ваша.",
    finalDesc: "Будь вы консалтинговой компанией, технологической фирмой или предприятием — если вы верите в ответственную автономию, для вас есть место.",
    finalBtn1: "Стать партнёром →",
    finalBtn2: "Вход в портал партнёров",
    finalBtn3: "Посмотреть сертификацию",
  },
  ar: {
    navTitle: "شركاء ACF",
    navSubtext: "شبكة الشركاء",
    navHome: "← الرئيسية",
    navLogin: "تسجيل دخول الشركاء",
    partnershipLabel: "الشراكة",
    partnershipSubLabel: "انشر المعيار",
    networkLabel: "الشبكة",
    networkSubLabel: "توسّع عالمياً",
    heroBadge: "شبكة الشركاء",
    heroTitle1: "انشر المعيار.",
    heroTitle2: "وسّع نطاق الثقة.",
    heroDesc1: "الحوكمة الوكيلية تحتاج إلى وسطاء موثوقين.",
    heroDesc2: "ليس موزعين. ليس منتسبين.",
    heroDesc3: "شركاء استراتيجيون يتشاركون المهمة.",
    heroSubDesc: "شركاء ACF ينشرون ويدققون ويدربون ويعتمدون المؤسسات حول العالم.",
    heroBtn1: "كن شريكاً →",
    heroBtn2: "تسجيل دخول بوابة الشركاء",
    advantagesLabel: "المزايا الاستراتيجية",
    advantagesTitle1: "لماذا تصبح ",
    advantagesTitle2: "شريك ACF",
    advantagesDesc: "أنت لا توزع منتجاً فحسب. أنت ",
    advantagesDescStrong: "تنشر معيار حوكمة",
    advantagesDesc2: ". يشمل ذلك المنطقة والأدوات والإيرادات والصلاحيات.",
    advantages: [
      { icon: "🌍", title: "حصرية إقليمية", desc: "أمّن منطقتك الجغرافية. منطقة واحدة، شريك واحد. بلا منافسة — تعاون فقط." },
      { icon: "💰", title: "مشاركة الإيرادات", desc: "عمولة على كل ACF Score وترخيص Control وشهادة يتم نشرها عبر شبكتك." },
      { icon: "🎓", title: "الوصول إلى Academy", desc: "وصول كامل إلى وحدات تدريب ACF Academy. درّب فريقك، ثم درّب عملاءك." },
      { icon: "🏷️", title: "العلامة المشتركة", desc: "استخدم شارة ACF Partner. علامتك التجارية، مدعومة بمعيار الحوكمة العالمي." },
      { icon: "📊", title: "لوحة تحكم الشركاء", desc: "بيانات فورية عن عمليات النشر والشهادات والإيرادات. رؤية كاملة لمحفظتك." },
      { icon: "🛡️", title: "دعم ذو أولوية", desc: "وصول مباشر إلى فريق ACF. إعداد مخصص ومراجعات ربع سنوية ومسار تصعيد." },
    ],
    tiersLabel: "مستويات الشراكة",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "ثلاثة مستويات من الشراكة. كل مستوى يفتح وصولاً أعمق ومنطقة أكبر وصلاحيات أوسع.",
    tierAffiliate: { name: "منتسب", desc: "شراكة مستوى الدخول. تُوصي وتُحيل.", items: ["عمولة الإحالة", "استخدام شارة الشريك", "مواد تسويقية", "ندوات تدريبية ربع سنوية", "الإدراج في دليل الشركاء"], tagline: "أنت توصي بالثقة.", applyText: "التقديم كمنتسب →" },
    tierCertified: { name: "معتمد", desc: "تنشر وتدرب وتدقق حوكمة ACF.", items: ["مشاركة الإيرادات", "حصرية إقليمية", "وصول كامل إلى Academy", "حقوق نشر ACF Control", "تقارير تدقيق بعلامة مشتركة", "مدير حساب مخصص"], tagline: "أنت تنشر الحوكمة.", applyText: "التقديم كمعتمد →" },
    tierStrategic: { name: "استراتيجي", desc: "تحالف على مستوى المؤسسة. شكّل المعيار.", items: ["مشاركة إيرادات متميزة", "حصرية متعددة المناطق", "تقديم البرنامج التنفيذي", "مقعد في المجلس الاستشاري", "خيارات العلامة البيضاء", "تكاملات مخصصة", "دخول مشترك إلى السوق"], tagline: "أنت تشكّل المستقبل.", applyText: "التقديم كاستراتيجي →" },
    mostPopular: "الأكثر شعبية",
    portalLabel: "الشركاء الحاليون",
    portalTitle1: "بوابة ",
    portalTitle2: "الشركاء",
    portalDesc: "الوصول إلى لوحة التحكم ومواد التدريب وبيانات النشر والشهادات وتقارير الإيرادات.",
    portalAccessTitle: "وصول الشركاء",
    portalAccessDesc: "سجّل الدخول ببيانات اعتماد الشريك",
    portalEmail: "البريد الإلكتروني",
    portalPassword: "كلمة المرور",
    portalRemember: "تذكرني",
    portalForgot: "نسيت كلمة المرور؟",
    portalSignIn: "تسجيل الدخول →",
    portalNotPartner: "لست شريكاً بعد؟ ",
    portalApplyNow: "قدّم الآن →",
    insidePortal: "داخل البوابة",
    portalFeatures: [
      { icon: "📊", label: "لوحة تحكم النشر", desc: "تتبع جميع عمليات نشر ACF" },
      { icon: "🎓", label: "مركز التدريب", desc: "وحدات Academy والشهادات" },
      { icon: "💰", label: "مركز الإيرادات", desc: "العمولات والفوترة" },
      { icon: "📋", label: "تقارير التدقيق", desc: "إنشاء تقارير بعلامة مشتركة" },
      { icon: "👥", label: "محفظة العملاء", desc: "إدارة عملائك المعتمدين" },
      { icon: "🔔", label: "التحديثات والأخبار", desc: "آخر الأخبار من ACF Standard" },
    ],
    applyLabel: "انضم إلى الشبكة",
    applyTitle1: "تقدّم لتصبح ",
    applyTitle2: "شريك ACF",
    applyDesc: "نختار شركاءنا بعناية. نبحث عن مؤسسات تشاركنا رؤيتنا: ",
    applyDescStrong: "الاستقلالية المسؤولة",
    formFirstName: "الاسم الأول",
    formLastName: "اسم العائلة",
    formEmail: "البريد الإلكتروني",
    formPhone: "الهاتف",
    formCompany: "اسم الشركة",
    formCountry: "البلد / المنطقة",
    formTier: "مستوى الشراكة",
    formIndustry: "القطاع",
    formTeamSize: "حجم الفريق",
    formWhy: "لماذا تريد أن تصبح شريك ACF؟",
    formWhyPlaceholder: "أخبرنا عن مؤسستك وخبرتك في حوكمة الذكاء الاصطناعي وما يحفزك لنشر معيار ACF في منطقتك...",
    formWebsite: "الموقع الإلكتروني",
    formTerms: "أوافق على شروط وأحكام برنامج شركاء ACF وأقر بأن طلبي سيُراجع خلال 5 أيام عمل.",
    formSubmit: "إرسال الطلب →",
    formSuccessTitle: "تم استلام الطلب!",
    formSuccessDesc1: "شكراً لاهتمامك بشبكة شركاء ACF. سيراجع فريقنا طلبك ويتواصل معك خلال ",
    formSuccessDesc2: "5 أيام عمل",
    formSuccessSteps: ["تأكيد الطلب أُرسل إلى بريدك الإلكتروني", "مراجعة من قبل فريق شركاء ACF", "مقابلة ومكالمة مواءمة", "الإعداد وتعيين المنطقة"],
    tierOptions: ["منتسب — شريك إحالة", "معتمد — النشر والتدريب", "استراتيجي — تحالف مؤسسي"],
    journeyLabel: "رحلة الشريك",
    journeyTitle1: "من التقديم إلى ",
    journeyTitle2: "النشر",
    journeySteps: [
      { step: "01", label: "التقديم", desc: "أرسل طلب الشراكة" },
      { step: "02", label: "المقابلة", desc: "مكالمة مواءمة مع فريق ACF" },
      { step: "03", label: "الإعداد", desc: "تدريب Academy والشهادة" },
      { step: "04", label: "المنطقة", desc: "تعيين منطقة حصرية" },
      { step: "05", label: "النشر", desc: "تدقيق وتدريب واعتماد العملاء" },
      { step: "06", label: "النمو", desc: "مشاركة الإيرادات والعلامة المشتركة والتوسع" },
    ],
    statsLabels: ["مستويات الشراكة", "الدول المشمولة", "ميزات البوابة", "مراجعة الطلب"],
    statsSuffixes: ["", "+", "", " أيام"],
    finalTitle1: "المعيار عالمي.",
    finalTitle2: "الشبكة لك.",
    finalDesc: "سواء كنت شركة استشارات أو شركة تقنية أو مؤسسة — إذا كنت تؤمن بالاستقلالية المسؤولة، فهناك مكان لك.",
    finalBtn1: "كن شريكاً →",
    finalBtn2: "تسجيل دخول بوابة الشركاء",
    finalBtn3: "عرض الشهادة",
  },
  tr: {
    navTitle: "ACF ORTAKLAR",
    navSubtext: "ORTAK AĞI",
    navHome: "← Ana Sayfa",
    navLogin: "Ortak girişi",
    partnershipLabel: "ORTAKLIK",
    partnershipSubLabel: "Standardı dağıtın",
    networkLabel: "AĞ",
    networkSubLabel: "Küresel ölçekte büyüyün",
    heroBadge: "ORTAK AĞI",
    heroTitle1: "Standardı Dağıtın.",
    heroTitle2: "Güveni Ölçeklendirin.",
    heroDesc1: "Ajansal yönetişim güvenilir aracılara ihtiyaç duyar.",
    heroDesc2: "Bayiler değil. Bağlı kuruluşlar değil.",
    heroDesc3: "Misyonu paylaşan stratejik ortaklar.",
    heroSubDesc: "ACF Ortakları dünya genelinde kuruluşları dağıtır, denetler, eğitir ve sertifikalandırır.",
    heroBtn1: "Ortak Olun →",
    heroBtn2: "Ortak portalı girişi",
    advantagesLabel: "Stratejik avantajlar",
    advantagesTitle1: "Neden ACF ",
    advantagesTitle2: "Ortağı olmalı",
    advantagesDesc: "Sadece bir ürün dağıtmıyorsunuz. Siz ",
    advantagesDescStrong: "bir yönetişim standardı dağıtıyorsunuz",
    advantagesDesc2: ". Bu bölge, araçlar, gelir ve yetki içerir.",
    advantages: [
      { icon: "🌍", title: "Bölge münhasırlığı", desc: "Coğrafi bölgenizi güvence altına alın. Bir bölge, bir ortak. Rekabet yok — yalnızca işbirliği." },
      { icon: "💰", title: "Gelir paylaşımı", desc: "Ağınız aracılığıyla dağıtılan her ACF Score, Control lisansı ve sertifikasyon için komisyon." },
      { icon: "🎓", title: "Academy erişimi", desc: "ACF Academy eğitim modüllerine tam erişim. Ekibinizi eğitin, sonra müşterilerinizi." },
      { icon: "🏷️", title: "Ortak markalaşma", desc: "ACF Partner rozetini kullanın. Markanız, küresel yönetişim standardıyla desteklenen." },
      { icon: "📊", title: "Ortak paneli", desc: "Dağıtımlar, sertifikasyonlar ve gelirler hakkında gerçek zamanlı veriler. Portföyünüz üzerinde tam görünürlük." },
      { icon: "🛡️", title: "Öncelikli destek", desc: "ACF ekibine doğrudan erişim. Özel katılım, üç aylık değerlendirmeler ve eskalasyon yolu." },
    ],
    tiersLabel: "Ortaklık seviyeleri",
    tiersTitle: "ACF PARTNER",
    tiersDesc: "Üç ortaklık seviyesi. Her biri daha derin erişim, daha fazla bölge ve daha büyük yetki sunar.",
    tierAffiliate: { name: "Bağlı", desc: "Giriş seviyesi ortaklık. Tavsiye ve yönlendirme yaparsınız.", items: ["Yönlendirme komisyonu", "Ortak rozeti kullanımı", "Pazarlama materyalleri", "Üç aylık eğitim web seminerleri", "Ortak dizininde listeleme"], tagline: "Güveni tavsiye edersiniz.", applyText: "Bağlı ortak başvurusu →" },
    tierCertified: { name: "Sertifikalı", desc: "ACF yönetişimini dağıtır, eğitir ve denetlersiniz.", items: ["Gelir paylaşımı", "Bölge münhasırlığı", "Tam Academy erişimi", "ACF Control dağıtım hakları", "Ortak markalı denetim raporları", "Özel hesap yöneticisi"], tagline: "Yönetişimi dağıtırsınız.", applyText: "Sertifikalı ortak başvurusu →" },
    tierStrategic: { name: "Stratejik", desc: "Kurumsal düzeyde ittifak. Standardı şekillendirin.", items: ["Premium gelir paylaşımı", "Çoklu bölge münhasırlığı", "Yönetici programı sunumu", "Danışma kurulu koltuğu", "Beyaz etiket seçenekleri", "Özel entegrasyonlar", "Ortak pazara giriş"], tagline: "Geleceği şekillendirirsiniz.", applyText: "Stratejik ortak başvurusu →" },
    mostPopular: "EN POPÜLER",
    portalLabel: "Mevcut ortaklar",
    portalTitle1: "Ortak ",
    portalTitle2: "Portalı",
    portalDesc: "Panelinize, eğitim materyallerinize, dağıtım verilerinize, sertifikasyonlarınıza ve gelir raporlarınıza erişin.",
    portalAccessTitle: "Ortak erişimi",
    portalAccessDesc: "Ortak kimlik bilgilerinizle giriş yapın",
    portalEmail: "E-posta",
    portalPassword: "Şifre",
    portalRemember: "Beni hatırla",
    portalForgot: "Şifrenizi mi unuttunuz?",
    portalSignIn: "Giriş yap →",
    portalNotPartner: "Henüz ortak değil misiniz? ",
    portalApplyNow: "Şimdi başvurun →",
    insidePortal: "Portal içinde",
    portalFeatures: [
      { icon: "📊", label: "Dağıtım paneli", desc: "Tüm ACF dağıtımlarını takip edin" },
      { icon: "🎓", label: "Eğitim merkezi", desc: "Academy modülleri ve sertifikasyonlar" },
      { icon: "💰", label: "Gelir merkezi", desc: "Komisyonlar ve faturalandırma" },
      { icon: "📋", label: "Denetim raporları", desc: "Ortak markalı raporlar oluşturun" },
      { icon: "👥", label: "Müşteri portföyü", desc: "Sertifikalı müşterilerinizi yönetin" },
      { icon: "🔔", label: "Güncellemeler ve haberler", desc: "ACF Standard'dan son haberler" },
    ],
    applyLabel: "Ağa katılın",
    applyTitle1: "ACF ",
    applyTitle2: "Ortağı olmak için başvurun",
    applyDesc: "Ortakları dikkatle seçiyoruz. Vizyonumuzu paylaşan kuruluşlar arıyoruz: ",
    applyDescStrong: "sorumlu özerklik",
    formFirstName: "Ad",
    formLastName: "Soyad",
    formEmail: "E-posta",
    formPhone: "Telefon",
    formCompany: "Şirket adı",
    formCountry: "Ülke / Bölge",
    formTier: "Ortaklık seviyesi",
    formIndustry: "Sektör",
    formTeamSize: "Ekip büyüklüğü",
    formWhy: "Neden ACF Ortağı olmak istiyorsunuz?",
    formWhyPlaceholder: "Kuruluşunuz, yapay zeka yönetişimi deneyiminiz ve bölgenizde ACF standardını dağıtma motivasyonunuz hakkında bilgi verin...",
    formWebsite: "Web sitesi",
    formTerms: "ACF Ortak Programı Hüküm ve Koşullarını kabul ediyorum ve başvurumun 5 iş günü içinde inceleneceğini onaylıyorum.",
    formSubmit: "Başvuruyu gönder →",
    formSuccessTitle: "Başvuru alındı!",
    formSuccessDesc1: "ACF Ortak Ağına ilginiz için teşekkür ederiz. Ekibimiz başvurunuzu inceleyecek ve ",
    formSuccessDesc2: "5 iş günü içinde",
    formSuccessSteps: ["Başvuru onayı e-postanıza gönderildi", "ACF ortak ekibi tarafından inceleme", "Mülakat ve uyum görüşmesi", "Katılım ve bölge ataması"],
    tierOptions: ["Bağlı — Yönlendirme ortağı", "Sertifikalı — Dağıtım ve eğitim", "Stratejik — Kurumsal ittifak"],
    journeyLabel: "Ortak yolculuğu",
    journeyTitle1: "Başvurudan ",
    journeyTitle2: "dağıtıma",
    journeySteps: [
      { step: "01", label: "Başvuru", desc: "Ortak başvurunuzu gönderin" },
      { step: "02", label: "Mülakat", desc: "ACF ekibiyle uyum görüşmesi" },
      { step: "03", label: "Katılım", desc: "Academy eğitimi ve sertifikasyon" },
      { step: "04", label: "Bölge", desc: "Münhasır bölge ataması" },
      { step: "05", label: "Dağıtım", desc: "Müşterileri denetleyin, eğitin ve sertifikalandırın" },
      { step: "06", label: "Büyüme", desc: "Gelir paylaşımı, ortak markalaşma, ölçeklendirme" },
    ],
    statsLabels: ["Ortaklık seviyeleri", "Kapsanan ülkeler", "Portal özellikleri", "Başvuru incelemesi"],
    statsSuffixes: ["", "+", "", " gün"],
    finalTitle1: "Standart küreseldir.",
    finalTitle2: "Ağ sizindir.",
    finalDesc: "İster bir danışmanlık firması, ister bir teknoloji şirketi, ister bir kuruluş olun — sorumlu özerkliğe inanıyorsanız, sizin için bir yer var.",
    finalBtn1: "Ortak Olun →",
    finalBtn2: "Ortak portalı girişi",
    finalBtn3: "Sertifikasyonu görüntüle",
  },
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ACFPartnersPage() {
  const locale = useLocale();
  const lang = (ui as any)[locale] ? locale : "en";
  const t = (ui as any)[lang];
  const [activeSection, setActiveSection] = useState<"advantages" | "portal" | "apply">("advantages");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navLinksMap: Record<string, string[]> = {
    en: ["Advantages", "Tiers", "Portal", "Apply"],
    fr: ["Avantages", "Niveaux", "Portail", "Candidater"],
    es: ["Ventajas", "Niveles", "Portal", "Solicitar"],
    de: ["Vorteile", "Stufen", "Portal", "Bewerben"],
    pt: ["Vantagens", "Níveis", "Portal", "Candidatar"],
    ja: ["メリット", "レベル", "ポータル", "応募"],
    zh: ["优势", "层级", "门户", "申请"],
    ko: ["장점", "등급", "포털", "신청"],
    it: ["Vantaggi", "Livelli", "Portale", "Candidatura"],
    nl: ["Voordelen", "Niveaus", "Portaal", "Aanvragen"],
    ru: ["Преимущества", "Уровни", "Портал", "Заявка"],
    ar: ["المزايا", "المستويات", "البوابة", "التقديم"],
    tr: ["Avantajlar", "Seviyeler", "Portal", "Başvuru"],
  };
  const navLinks = navLinksMap[lang] || navLinksMap.en;

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heroFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes heroFloatSlow { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes heroPulse { 0%,100% { filter:drop-shadow(0 0 12px rgba(201,168,76,.15)); } 50% { filter:drop-shadow(0 0 36px rgba(201,168,76,.45)); } }
        @keyframes heroOrbitCW { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes heroOrbitCCW { from { transform:rotate(0deg); } to { transform:rotate(-360deg); } }
        @keyframes sparkle { 0%,100% { opacity:0; transform:scale(0); } 50% { opacity:1; transform:scale(1); } }
        @keyframes pulse { 0%,100% { opacity:.6; } 50% { opacity:1; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        .fade-up { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.1s; }
        .fade-up-d2 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.3s; }
        .fade-up-d3 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.55s; }
        .gold-glow:hover { box-shadow:0 0 20px rgba(201,168,76,.2); }
        .hero-left { animation:heroFloat 4s ease-in-out infinite, heroPulse 4s ease-in-out infinite; }
        .hero-right { animation:heroFloatSlow 5s ease-in-out infinite, heroPulse 5s ease-in-out infinite .5s; }
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        ::placeholder { color: ${C.gray}; opacity: 0.6; }
        select option { background: ${C.navy1}; }
      `}</style>

      {/* ━━━ NAV ━━━ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72,
        background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1,
            }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>{t.navTitle}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t.navSubtext}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t.navHome}</a>
            {navLinks.map((l: any) => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{l}</a>
            ))}
            <a href="#portal" className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s",
              display: "inline-block",
            }}>{t.navLogin}</a>
          </div>
        </div>
      </nav>

      {/* ━━━ HERO with animated icons ━━━ */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        {/* Gold grid bg */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(201,168,76,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
        }} />

        {/* Orbiting rings */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 700, height: 700, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(201,168,76,.06)", animation: "heroOrbitCW 60s linear infinite" }} />
          <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(201,168,76,.04)", animation: "heroOrbitCCW 45s linear infinite" }} />
          <div style={{ position: "absolute", inset: 140, borderRadius: "50%", border: "1px dashed rgba(201,168,76,.06)", animation: "heroOrbitCW 80s linear infinite" }} />
          {[0,1,2,3,4,5].map((i: any) => (
            <div key={i} style={{
              position: "absolute",
              top: `${50 + 42 * Math.sin((i / 6) * Math.PI * 2)}%`,
              left: `${50 + 42 * Math.cos((i / 6) * Math.PI * 2)}%`,
              width: 4, height: 4, borderRadius: "50%", background: C.gold, opacity: 0,
              animation: `sparkle ${2 + i * 0.3}s ease-in-out infinite ${i * 0.8}s`,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 40, alignItems: "center" }}>

            {/* LEFT — Animated Handshake Shield */}
            <div className="fade-up" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-left" style={{ position: "relative" }}>
                <HeroHandshake />
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: 0.6 }}>{t.partnershipLabel}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>{t.partnershipSubLabel}</div>
                </div>
              </div>
            </div>

            {/* CENTER — Text */}
            <div style={{ textAlign: "center" }} className="fade-up-d2">
              <Badge>{t.heroBadge}</Badge>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1.08, marginTop: 24, marginBottom: 24, letterSpacing: "-1px" }}>
                <span style={{ color: "#fff" }}>{t.heroTitle1}</span><br />
                <span style={{ color: C.gold }}>{t.heroTitle2}</span>
              </h1>
              <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 28px" }}>
                {t.heroDesc1}<br />
                {t.heroDesc2}<br />
                <strong style={{ color: "#fff" }}>{t.heroDesc3}</strong>
              </p>
              <p style={{ fontSize: 14, color: C.gray, maxWidth: 420, margin: "0 auto 32px" }}>
                {t.heroSubDesc}
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <a href="#apply" className="gold-glow" style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                  border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                  display: "inline-block",
                }}>{t.heroBtn1}</a>
                <a href="#portal" style={{
                  background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
                  padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all .3s",
                  display: "inline-block",
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}
                >{t.heroBtn2}</a>
              </div>
            </div>

            {/* RIGHT — Animated Network Globe */}
            <div className="fade-up-d3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="hero-right" style={{ position: "relative" }}>
                <HeroNetwork />
                <div style={{ textAlign: "center", marginTop: 4 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gold, letterSpacing: ".14em", opacity: 0.6 }}>{t.networkLabel}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gray2, marginTop: 2 }}>{t.networkSubLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ WHY PARTNER ━━━ */}
      <section id="advantages" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>{t.advantagesLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              {t.advantagesTitle1}<span style={{ color: C.gold }}>{t.advantagesTitle2}</span>
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              {t.advantagesDesc}<strong style={{ color: "#fff" }}>{t.advantagesDescStrong}</strong>{t.advantagesDesc2}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { icon: t.advantages[0].icon, title: t.advantages[0].title, desc: t.advantages[0].desc, color: C.green },
              { icon: t.advantages[1].icon, title: t.advantages[1].title, desc: t.advantages[1].desc, color: C.gold },
              { icon: t.advantages[2].icon, title: t.advantages[2].title, desc: t.advantages[2].desc, color: C.blue },
              { icon: t.advantages[3].icon, title: t.advantages[3].title, desc: t.advantages[3].desc, color: C.amber },
              { icon: t.advantages[4].icon, title: t.advantages[4].title, desc: t.advantages[4].desc, color: C.purple },
              { icon: t.advantages[5].icon, title: t.advantages[5].title, desc: t.advantages[5].desc, color: C.green },
            ].map((a: any) => (
              <div key={a.title} style={{
                background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: "28px 24px",
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${a.color}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{a.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PARTNER TIERS ━━━ */}
      <section id="tiers" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>{t.tiersLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              {t.tiersTitle}<span style={{ color: C.gold }}>™</span> Tiers
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              {t.tiersDesc}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              {
                stars: 1, name: t.tierAffiliate.name, color: "#22c55e", colorLight: "#4ade80", glowColor: "rgba(34,197,94,.15)",
                desc: t.tierAffiliate.desc, items: t.tierAffiliate.items, tagline: t.tierAffiliate.tagline,
                badge: null, applyText: t.tierAffiliate.applyText,
              },
              {
                stars: 2, name: t.tierCertified.name, color: "#c9a84c", colorLight: "#e8c96a", glowColor: "rgba(201,168,76,.15)",
                desc: t.tierCertified.desc, items: t.tierCertified.items, tagline: t.tierCertified.tagline,
                badge: t.mostPopular, applyText: t.tierCertified.applyText,
              },
              {
                stars: 3, name: t.tierStrategic.name, color: "#3b82f6", colorLight: "#60a5fa", glowColor: "rgba(59,130,246,.15)",
                desc: t.tierStrategic.desc, items: t.tierStrategic.items, tagline: t.tierStrategic.tagline,
                badge: null, applyText: t.tierStrategic.applyText,
              },
            ].map((tr: any) => (
              <div key={tr.name} style={{
                background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: "32px 28px 28px",
                position: "relative", transition: "all .3s", textAlign: "center",
                display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${tr.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${tr.glowColor}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {tr.badge && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                    fontSize: 10, fontWeight: 800, letterSpacing: ".1em", padding: "5px 16px", borderRadius: 100,
                    fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap",
                  }}>{tr.badge}</div>
                )}

                <PartnerShield name={tr.name} color={tr.color} colorLight={tr.colorLight} stars={tr.stars} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: tr.color, letterSpacing: ".14em" }}>
                    {"★".repeat(tr.stars)} TIER {tr.stars}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{tr.name}</h3>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>{tr.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, textAlign: "left", flex: 1 }}>
                  {tr.items.map((item: any) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2 }}>
                      <span style={{ color: tr.color, fontSize: 11 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <div style={{
                    borderTop: `1px solid ${C.bd1}`, paddingTop: 12, marginBottom: 16,
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: tr.color,
                    fontStyle: "italic",
                  }}>{tr.tagline}</div>
                  <a href="#apply" className="gold-glow" style={{
                    display: "block", padding: "12px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
                    transition: "all .3s", textAlign: "center",
                    background: tr.badge ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : "transparent",
                    color: tr.badge ? C.navy1 : tr.color,
                    border: tr.badge ? "none" : `1px solid ${tr.color}40`,
                  }}>{tr.applyText}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PARTNER PORTAL (LOGIN) ━━━ */}
      <section id="portal" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.portalLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              {t.portalTitle1}<span style={{ color: C.gold }}>{t.portalTitle2}</span>
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              {t.portalDesc}
            </p>
          </div>

          <div style={{
            background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: 40,
            position: "relative", overflow: "hidden",
          }}>
            {/* Subtle decorative element */}
            <div style={{
              position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%",
              background: `radial-gradient(circle, ${C.goldDim} 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
                  background: C.goldDim, border: `1px solid ${C.goldBorder}`, margin: "0 auto 16px",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{t.portalAccessTitle}</h3>
                <p style={{ fontSize: 13, color: C.gray }}>{t.portalAccessDesc}</p>
              </div>

              <FormField label={t.portalEmail} type="email" placeholder="partner@company.com" />
              <FormField label={t.portalPassword} type="password" placeholder="••••••••" />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.gray2, cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: C.gold }} /> {t.portalRemember}
                </label>
                <a href="#" style={{ fontSize: 13, color: C.gold, transition: "opacity .2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.7"} onMouseLeave={e => (e.target as HTMLElement).style.opacity = "1"}>
                  {t.portalForgot}
                </a>
              </div>

              <button className="gold-glow" style={{
                width: "100%", padding: 14, borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700,
                cursor: "pointer", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                transition: "all .3s",
              }}>{t.portalSignIn}</button>

              <div style={{ textAlign: "center", marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.bd1}` }}>
                <p style={{ fontSize: 13, color: C.gray }}>{t.portalNotPartner}<a href="#apply" style={{ color: C.gold, fontWeight: 600 }}>{t.portalApplyNow}</a></p>
              </div>
            </div>
          </div>

          {/* Portal features preview */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
              {t.insidePortal}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {t.portalFeatures.map((f: any) => (
                <div key={f.label} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                  background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 10,
                  transition: "all .2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.goldBorder}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.bd1}
                >
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{f.label}</div>
                    <div style={{ fontSize: 11, color: C.gray }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ APPLICATION FORM ━━━ */}
      <section id="apply" style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}`, background: C.navy2 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.applyLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              {t.applyTitle1}<span style={{ color: C.gold }}>{t.applyTitle2}</span>
            </h2>
            <GoldBar />
            <p style={{ fontSize: 15, color: C.gray2, maxWidth: 550, margin: "0 auto", lineHeight: 1.7 }}>
              {t.applyDesc}<strong style={{ color: "#fff" }}>{t.applyDescStrong}</strong>.
            </p>
          </div>

          {!formSubmitted ? (
            <div style={{
              background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 20, padding: 40,
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <FormField label={t.formFirstName} placeholder="Vincent" />
                <FormField label={t.formLastName} placeholder="DORANGE" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <FormField label={t.formEmail} type="email" placeholder="partner@company.com" />
                <FormField label={t.formPhone} type="tel" placeholder="+33 6 00 00 00 00" required={false} />
              </div>
              <FormField label={t.formCompany} placeholder={t.formCompany} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <FormField label={t.formCountry} type="select" options={[
                  "France", "United Kingdom", "Germany", "United States", "Canada",
                  "Japan", "Australia", "United Arab Emirates", "Switzerland", "Netherlands",
                  "Singapore", "India", "Brazil", "Other"
                ]} />
                <FormField label={t.formTier} type="select" options={t.tierOptions} />
              </div>
              <FormField label={t.formIndustry} type="select" options={[
                "Consulting / Advisory", "Technology / SaaS", "Financial Services",
                "Legal / Compliance", "Healthcare", "Retail / E-Commerce",
                "Manufacturing / Industry", "Education / Training", "Other"
              ]} />
              <FormField label={t.formTeamSize} type="select" options={[
                "1-5", "6-20", "21-50", "51-200", "200+"
              ]} />
              <FormField label={t.formWhy} type="textarea"
                placeholder={t.formWhyPlaceholder} />
              <FormField label={t.formWebsite} type="url" placeholder="https://yourcompany.com" required={false} />

              <div style={{ marginTop: 8 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: C.gray2, cursor: "pointer", lineHeight: 1.5 }}>
                  <input type="checkbox" style={{ accentColor: C.gold, marginTop: 3, flexShrink: 0 }} />
                  {t.formTerms}
                </label>
              </div>

              <button
                className="gold-glow"
                onClick={() => setFormSubmitted(true)}
                style={{
                  width: "100%", padding: 16, borderRadius: 12, border: "none", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
                  transition: "all .3s", marginTop: 28,
                }}>{t.formSubmit}</button>
            </div>
          ) : (
            <div style={{
              background: C.navy3, border: `1px solid ${C.green}40`, borderRadius: 20, padding: 60, textAlign: "center",
            }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>🎉</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
                {t.formSuccessTitle}
              </h3>
              <p style={{ fontSize: 15, color: C.gray2, maxWidth: 400, margin: "0 auto 24px", lineHeight: 1.7 }}>
                {t.formSuccessDesc1}<strong style={{ color: "#fff" }}>{t.formSuccessDesc2}</strong>.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320, margin: "0 auto" }}>
                {t.formSuccessSteps.map((step: any, i: number) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                      background: i === 0 ? `${C.green}20` : C.goldDim,
                      border: `1px solid ${i === 0 ? `${C.green}40` : C.goldBorder}`,
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
                      color: i === 0 ? C.green : C.gold, flexShrink: 0,
                    }}>{i === 0 ? "✓" : (i + 1)}</div>
                    <span style={{ fontSize: 13, color: i === 0 ? C.green : C.gray2 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>{t.journeyLabel}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
              {t.journeyTitle1}<span style={{ color: C.gold }}>{t.journeyTitle2}</span>
            </h2>
            <GoldBar />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600, margin: "0 auto" }}>
            {[
              { step: t.journeySteps[0].step, label: t.journeySteps[0].label, desc: t.journeySteps[0].desc, color: C.green },
              { step: t.journeySteps[1].step, label: t.journeySteps[1].label, desc: t.journeySteps[1].desc, color: C.gold },
              { step: t.journeySteps[2].step, label: t.journeySteps[2].label, desc: t.journeySteps[2].desc, color: C.amber },
              { step: t.journeySteps[3].step, label: t.journeySteps[3].label, desc: t.journeySteps[3].desc, color: C.blue },
              { step: t.journeySteps[4].step, label: t.journeySteps[4].label, desc: t.journeySteps[4].desc, color: C.gold },
              { step: t.journeySteps[5].step, label: t.journeySteps[5].label, desc: t.journeySteps[5].desc, color: C.green },
            ].map((s: any, i: number) => (
              <div key={s.step}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}15`, border: `1px solid ${s.color}40`, flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: s.color }}>{s.step}</span>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{s.desc}</div>
                  </div>
                </div>
                {i < 5 && (<div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><span style={{ color: C.gray, fontSize: 14 }}>↓</span></div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ STATS BAR ━━━ */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
          {[
            { val: 3, suf: t.statsSuffixes[0], label: t.statsLabels[0] },
            { val: 14, suf: t.statsSuffixes[1], label: t.statsLabels[1] },
            { val: 6, suf: t.statsSuffixes[2], label: t.statsLabels[2] },
            { val: 5, suf: t.statsSuffixes[3], label: t.statsLabels[3] },
          ].map((s: any) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: C.gold }}><AnimatedCounter end={s.val} suffix={s.suf} /></div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━ */}
      <section style={{ padding: "60px 0", borderTop: `1px solid ${C.bd1}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
            {t.finalTitle1}<br /><span style={{ color: C.gold }}>{t.finalTitle2}</span>
          </h2>
          <p style={{ fontSize: 15, color: C.gray2, maxWidth: 500, margin: "0 auto 32px" }}>
            {t.finalDesc}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="#apply" className="gold-glow" style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1,
              border: "none", padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
              display: "inline-block",
            }}>{t.finalBtn1}</a>
            <a href="#portal" style={{
              background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
              padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer",
              display: "inline-block",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>
              {t.finalBtn2}
            </a>
            <a href={`/${locale}/acf-certification`} style={{
              background: "transparent", color: C.gray2, border: `1px solid ${C.bd1}`,
              padding: "16px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer",
              display: "inline-block",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.goldBorder; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.bd1; (e.target as HTMLElement).style.color = C.gray2; }}>
              {t.finalBtn3}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <AIAgent />
    </div>
  );
}
