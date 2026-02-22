# ACF Standard — Multi-Agent Strategy for Claude Code

## INSTRUCTION TO CLAUDE CODE

You must work with multiple parallel subagents to complete this project fast.
Spawn subagents using the Task tool. Do not work sequentially — parallelize everything possible.

---

## SPAWN THESE 4 AGENTS IN PARALLEL IMMEDIATELY

### AGENT 1 — Foundation
**Task:** Project setup + global styles
- Initialize Next.js 14 with TypeScript + Tailwind + next-intl + Framer Motion
- Create `app/globals.css` with ALL CSS variables and custom styles from acfstandard-v6.html
- Create `app/[locale]/layout.tsx` with fonts (Inter, Space Grotesk, JetBrains Mono via next/font)
- Create `middleware.ts` and `i18n.ts` for locale routing (EN/FR)
- Create `messages/en.json` and `messages/fr.json` with all UI strings
- Create `next.config.ts`

### AGENT 2 — Navigation
**Task:** All navigation components
- `components/layout/Nav.tsx` — navbar with hamburger, logo, region button, partner link, CTA
- `components/layout/MegaMenu.tsx` — full drawer (5 panels, sidebar, overlay)
- `components/layout/RegionSelector.tsx` — Bain-style language/region panel sliding from top
- `components/layout/Footer.tsx` — 4-column footer + legal bar
- All nav JS logic (open/close, showPanel, escape key, scroll effect)

### AGENT 3 — Canvas + Animations
**Task:** All animated components
- `components/ui/NeuralCanvas.tsx` — fixed neural background (90 particles, gold connections)
- `components/ui/DiagramCanvas.tsx` — hero diagram with pulse animations
- `components/ui/AIWidget.tsx` — floating AI button + full modal with KB responses
- All useEffect canvas logic with cleanup (cancelAnimationFrame)
- Framer Motion variants for scroll reveal (fadeUp, staggerChildren)

### AGENT 4 — Homepage Sections
**Task:** All homepage section components
- `components/home/Hero.tsx` — hero + typing effect + satellite cards + stats grid
- `components/home/StatsBar.tsx` — 4 animated counters (4, 18, 17, 100%)
- `components/home/Principles.tsx` — 4 principle cards
- `components/home/Layers.tsx` — 4 layer cards
- `components/home/Maturity.tsx` — maturity timeline + dot/line animation
- `components/home/HexPath.tsx` — hexagon snake path (8 modules, 2 rows, flowing dot)
- `components/home/VideoSection.tsx` — founder video section with modal
- `components/home/Products.tsx` — 3 product cards
- `components/home/Blog.tsx` — 3 blog cards with next/image
- `components/home/CTA.tsx` — final CTA section

---

## AFTER ALL 4 AGENTS COMPLETE

Then a single agent assembles:
- `app/[locale]/page.tsx` — imports and assembles all section components
- Test build: `npm run build`
- Fix any TypeScript or import errors
- Create placeholder inner pages (standard, control, blog, contact, partners, about, certification)

---

## COORDINATION RULES FOR ALL AGENTS

1. **CSS classes:** Do NOT rename or change any CSS class from the HTML source. Copy them exactly.
2. **CSS variables:** Always use `var(--gold)`, `var(--navy)` etc — never hardcode hex values.
3. **Animations:** Replace `.rev` + IntersectionObserver with Framer Motion `whileInView`. Keep canvas animations in useEffect.
4. **'use client':** Add to any component using useState, useEffect, useRef, or event handlers.
5. **Images:** Use `next/image` for all `<img>` tags. Blog photos use Unsplash URLs from the HTML.
6. **Source of truth:** acfstandard-v6.html is the single source of truth. When in doubt, check it.
7. **No design changes:** Zero visual changes. Pixel perfect replication.

---

## REFERENCE FILES

- `acfstandard-v6.html` — master HTML (all CSS + JS + structure)
- `CLAUDE_CODE_BRIEF.md` — full technical specification

Start all 4 agents NOW in parallel. Report when each agent completes.
