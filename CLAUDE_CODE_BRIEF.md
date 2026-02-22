# ACF Standard — Claude Code Integration Brief
## Project: acfstandard.com → Next.js

---

## CONTEXT

**Project:** ACF — Agentic Commerce Framework® by Vincent DORANGE  
**Goal:** Convert validated HTML prototype into production Next.js website  
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Vercel deployment  
**Local path:** `C:\Users\vdora\Desktop\Claude Agent\acfstandard`  
**Deadline:** ~7 days to Vercel deploy  

The homepage HTML prototype is fully validated by the client.  
Your job is to integrate it faithfully into Next.js — **pixel perfect**, no design changes.

---

## SOURCE FILE

**Master HTML:** `acfstandard-v6.html` (in this same folder)  
This file contains everything: all CSS, all HTML structure, all JavaScript.  
It is the single source of truth. Do not invent or change anything visual.

---

## TECHNICAL REQUIREMENTS

### Stack
```
Next.js 14 — App Router (not Pages Router)
TypeScript
Tailwind CSS (for utility classes only — most styles are custom CSS)
next-intl (i18n — EN/FR minimum, structure for other languages)
Framer Motion (for scroll reveal animations — replace JS IntersectionObserver)
```

### Fonts (already in HTML, move to next/font)
```
Inter — body text
Space Grotesk — headings, numbers
JetBrains Mono — labels, code, badges
```

### Install
```bash
npm install next-intl framer-motion
npm install @next/font (if not already included)
```

---

## FILE STRUCTURE TO CREATE

```
acfstandard/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          ← root layout with fonts + i18n
│   │   ├── page.tsx            ← homepage (assembles all sections)
│   │   ├── standard/page.tsx   ← placeholder
│   │   ├── control/page.tsx    ← placeholder
│   │   ├── blog/page.tsx       ← placeholder
│   │   ├── partners/
│   │   │   ├── page.tsx        ← partner portal page
│   │   │   └── login/page.tsx  ← login form
│   │   └── contact/page.tsx    ← placeholder
│   └── globals.css             ← all custom CSS vars + base styles from HTML
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             ← navbar + hamburger
│   │   ├── MegaMenu.tsx        ← full drawer menu
│   │   ├── RegionSelector.tsx  ← Bain-style language/region panel
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx            ← hero + diagram canvas
│   │   ├── StatsBar.tsx        ← animated counters
│   │   ├── Principles.tsx      ← 4 principle cards
│   │   ├── Layers.tsx          ← 4 layer cards
│   │   ├── Maturity.tsx        ← maturity timeline + animation
│   │   ├── HexPath.tsx         ← hexagon snake modules path
│   │   ├── VideoSection.tsx    ← founder video section
│   │   ├── Products.tsx        ← 3 product cards
│   │   ├── Blog.tsx            ← 3 blog cards
│   │   └── CTA.tsx
│   ├── ui/
│   │   ├── NeuralCanvas.tsx    ← neural background (fixed, full screen)
│   │   ├── DiagramCanvas.tsx   ← hero diagram pulses
│   │   └── AIWidget.tsx        ← floating AI chat button + modal
├── messages/
│   ├── en.json                 ← English strings
│   └── fr.json                 ← French strings
├── middleware.ts               ← next-intl locale detection
├── i18n.ts
└── next.config.ts
```

---

## CSS STRATEGY

**Do NOT convert everything to Tailwind.** The design uses extensive custom CSS with CSS variables. Strategy:

1. Move all `:root` CSS variables to `globals.css`
2. Move all custom component CSS to `globals.css` (keep class names identical)
3. Use Tailwind only for layout utilities where convenient
4. Keep all animation CSS as-is

CSS variables to preserve exactly:
```css
--navy:#050c1a; --navy2:#071122; --navy3:#0d1f3c;
--gold:#c9a84c; --gold2:#e8c96a;
--gold-dim:rgba(201,168,76,.14); --gold-glow:rgba(201,168,76,.35);
--bd:rgba(201,168,76,.2); --bd2:rgba(255,255,255,.07);
--green:#22c55e; --green-glow:rgba(34,197,94,.4);
```

---

## ANIMATIONS

Replace vanilla JS IntersectionObserver scroll reveals with **Framer Motion**:

```tsx
// Pattern to use for all .rev elements
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
}

// Usage
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
>
```

Keep these JS animations as-is (move to useEffect):
- Neural canvas background (`NeuralCanvas.tsx`)
- Diagram pulse canvas (`DiagramCanvas.tsx`)
- Typing effect in hero
- Counter animation in StatsBar
- Maturity dot/line animation
- Hex path flowing dot

---

## I18N SETUP

Use `next-intl` with App Router.

**Locale detection:** auto-detect browser language, fallback to `en`  
**Supported locales:** `en`, `fr` (structure must support adding more later)  
**URL structure:** `acfstandard.com/en/...` and `acfstandard.com/fr/...`  
**Default locale redirect:** `/` → `/en/`

Key strings to externalize (start with these, then expand):
```json
// en.json
{
  "nav": {
    "standard": "Standard",
    "control": "ACF Control", 
    "blog": "Blog",
    "partners": "Partners",
    "cta": "Request Assessment",
    "region": "GLOBAL | EN"
  },
  "hero": {
    "badge": "Official Standard — v1.0 — Feb 2026",
    "title1": "The Global Standard for",
    "typing": ["Governance", "Sovereignty", "Intelligence", "Commerce"],
    "desc": "The Agentic Commerce Framework® (ACF) is the definitive governance methodology...",
    "cta1": "Request a Governance Assessment →",
    "cta2": "Read the Standard"
  }
}
```

All content is in English. The 4 core principles:
- Decision / Execution Separation
- Non-Delegable Zones
- Traceability & Interruptibility
- Living Governance

---

## CANVAS COMPONENTS

Both canvases must be `'use client'` components with `useEffect` + `useRef`.

**NeuralCanvas** — fixed background, z-index 0, opacity 0.5:
- 90 particles, connection distance 160px
- rgba(201,168,76) gold color scheme
- Resize handler with `addEventListener('resize', ...)`

**DiagramCanvas** — positioned absolute within hero visual:
- Pulse animations from/to central orb
- 4 satellite nodes (top, right, bottom, left)
- Gold + blue pulse colors

Both must clean up with `return () => cancelAnimationFrame(animId)` in useEffect.

---

## SPECIAL COMPONENTS

### AIWidget.tsx
- Floating button fixed bottom-right
- Click → full-screen modal (McKinsey style)
- Static knowledge base (KB object from HTML) — no API call yet
- Future: replace KB lookup with `/api/acf-agent` endpoint

### RegionSelector.tsx  
- Slides down from top on "GLOBAL | EN" click
- 4 columns: Global, EMEA, Americas, Asia-Pacific
- Each entry: flag emoji + country + language
- Currently links to `#` (i18n routing to implement later)

### HexPath.tsx
- 2 rows of 4 hexagons
- Row 1: left→right with flowing gold dot animation
- Row 2: right→left (reversed)
- Turn connector with ↓ arrow between rows
- Labels alternate above/below for adjacent hexagons
- Hover: scale(1.1) + brightness(1.2)
- CSS clip-path hexagon shape (not SVG)

---

## VIDEO SECTION

`VideoSection.tsx` — the founder message section:
- Left: text + quote
- Right: video player with click-to-play modal
- **Video URL is a placeholder** — add YouTube embed when available
- To activate: replace modal content with:
```tsx
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
  allow="autoplay; fullscreen"
  allowFullScreen
/>
```

---

## PARTNER PORTAL PAGE

`/partners/login` needs a real login form (no backend yet):
- Same design as the v5 portal form (email + password + submit)
- Show "Coming soon — Partner portal launching Q1 2026" message for now
- Form submits → toast notification "Access request received"

---

## PAGES TO CREATE (placeholders for now)

These just need a basic layout with "Coming soon" + nav/footer:
- `/standard` — The ACF Standard
- `/control` — ACF Control SaaS
- `/blog` — Blog listing
- `/contact` — Contact form (name, company, email, message + submit)
- `/about` — About page
- `/certification` — Certification info
- `/partners` — Partner program overview

---

## PERFORMANCE REQUIREMENTS

- Lighthouse score target: 90+ performance
- Images: use `next/image` for all blog photos (Unsplash URLs in HTML)
- Fonts: `next/font/google` with `display: 'swap'`
- Canvas animations: pause when tab not visible (`document.hidden`)
- Blog images: `loading="lazy"` (already in HTML)

---

## DEPLOYMENT

**Platform:** Vercel  
**Domain:** acfstandard.com (to configure in Vercel dashboard)  
**Build command:** `npm run build`  
**Env vars needed:** none yet (AI agent uses static KB for now)

---

## WHAT NOT TO CHANGE

- No design changes whatsoever
- No color changes
- No font changes  
- No layout changes
- No copy changes
- All text is in English (principles translated)
- ACF Score formula is NOT disclosed anywhere on the site

---

## PRIORITY ORDER

1. `globals.css` — all CSS vars and custom styles
2. `Nav.tsx` + `MegaMenu.tsx` + `RegionSelector.tsx` — navigation works
3. `NeuralCanvas.tsx` + `DiagramCanvas.tsx` — canvases render
4. `Hero.tsx` — full hero section
5. `StatsBar.tsx` with counter animation
6. All remaining homepage sections (Principles → CTA)
7. `AIWidget.tsx`
8. `Footer.tsx`
9. Homepage `page.tsx` assembling everything
10. i18n setup (next-intl)
11. Placeholder inner pages
12. Vercel deploy

---

## REFERENCE

Source HTML: `acfstandard-v6.html` (in this same directory)  
Every class name, every CSS rule, every JS behavior is documented there.  
When in doubt → look at the HTML. It is the single source of truth.

Good luck. This is a tight timeline — prioritize the homepage first.
