# Pitlane F1 2026 — Premium design system (Stitch + implementation)

This document merges the **master build prompt** (broadcast UI, GSAP, liquid glass) with the **Stitch generation specification** (luxury palette, typography scale, motion timings, page patterns). The **source of truth for shipped code** is `tailwind.config.js` + `src/index.css` + components listed below.

---

## Brand & experience goals

- **Cinematic & immersive** — broadcast-style reveals, depth, parallax.
- **Premium & exclusive** — carbon, titanium, controlled red/cyan accents.
- **Dynamic** — motion on interaction; respect `prefers-reduced-motion`.
- **Technical** — IBM Plex Mono for data; Inter for UI copy.
- **Spatial** — glass layers over imagery/video (HLS in later steps).

Target: elite fans; WCAG AA contrast on body copy; semantic controls (`<button>`, `<nav>`, `aria-*`).

---

## Color system (Tailwind tokens)

| Role | Hex | Token |
|------|-----|--------|
| Carbon black | `#0A0A0A` | `carbon`, `carbon-DEFAULT` |
| Deep panel | `#1A1A2E` | `carbon-3` |
| F1 red (FIA) | `#DC0000` | `f1-red`, `f1red` |
| Titanium silver | `#E8E8E8` | `titanium` |
| Neon / glow accent | `#00D9FF` | `neon-blue`, `glow` |
| Danger / live | `#FF0000` | `danger` |
| Champion gold | `#FFD700` | `champion` |
| Record / “new” accent | `#00FF41` | `record` |
| Depth (Bugatti ref) | `#001A4D` | `bugatti` |
| Sprint / premium gold | `#FFB700` | `lamborghini` |

**Team accents** (badges, future car swaps): `teams.ferrari`, `teams.mercedes` (`#00D4FF`), `teams.mclaren` (`#FF6B35`), `teams.redbull` (`#1E41FF`), `teams.aston` (`#00A651`), `teams.alpine` (`#0066FF`), … see `tailwind.config.js`.

**Backgrounds:** linear carbon stack + radial Red Bull blue wash (`bg-pit-radial`), optional circuit grid (`.pit-circuit-bg`).

**Glow shadows:** `shadow-neon`, `shadow-glow`, `shadow-glow-red`, `shadow-glow-subtle`, `shadow-glow-medium`, `shadow-glow-intense`.

---

## Typography

| Level | Approx | Weight | Tracking | Use |
|-------|--------|--------|----------|-----|
| Hero title | `text-pit-hero` (~72px) | 900 | tight | Home race name |
| Page title | `text-pit-page` (~56px) | 800 | tight | H1 sections |
| Section | `text-pit-section` | 700 | tight | Groups |
| Card title | `text-pit-card` | 700 | normal | Race cards |
| Body large | `text-lg` | 400 | — | Leads |
| Overline | `font-condensed` + `text-xs` uppercase | 700 | wide | “NEXT RACE” |

**Data / countdown:** `font-mono`, bold; hero countdown up to ~`text-8xl` / `text-pit-countdown` on large screens.

Fonts loaded: **Inter**, **IBM Plex Mono**, **Roboto Condensed** (overlines / tight labels).

---

## Motion (implementation targets)

**Sport easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — `ease-pit` in Tailwind.

| Pattern | Duration | Notes |
|---------|-----------|--------|
| Route transition | 300ms exit / 600ms enter | Fade + `y` 40→0; optional blur |
| Button hover | 200ms | Scale ~1.05 + glow |
| Card enter (grid) | ~600ms stagger 0.1 | GSAP `power2.out` |
| Card filter exit | 300ms | Fade + slide |
| Ignition km/h | 2.5s | rAF 0→100, then fade overlay |
| Glow pulse (T−24h) | 2s | CSS keyframes `pit-pulse-slow` |
| Aggressive pulse (T−1h) | 1s | `pit-pulse-fast` |

**Reduced motion:** global `@media (prefers-reduced-motion: reduce)` in `index.css` collapses transitions/animations.

---

## Page patterns (Stitch → routes)

| Stitch page | Route | Status |
|-------------|-------|--------|
| Home / hero / car | `/` | Hero layout, stats row, car panel placeholder + tilt |
| Calendar + filters + grid | `/calendrier` | Sticky filter bar, 4-col desktop, glass cards |
| Race detail hero + bento | `/calendrier/:id` | Existing bento; parallax/circuit 4K later |
| My Garage | `/mongarage` | Empty state motion; list hover |
| My Season | `/masaison` | Timeline styling + filters |
| Nav | Navbar | 64px target height desktop, underline active |

**Deferred (later PRs):** Figma file, 4K/8K exports, HLS `FadingVideo`, Spline car, sound, haptics.

---

## Components (code map)

| Spec | File |
|------|------|
| Liquid glass | `.liquid-glass`, `.liquid-glass-strong` in `index.css` |
| Primary CTA | `LiquidButton` + home primary link classes |
| Countdown dock | `countdown-dock.jsx` (T−24h / T−1h pulse classes) |
| Race card | `race-card.jsx` (lift, shadow, sprint/new badges) |
| Ignition | `ignition-screen.jsx` |
| Ticker | `news-marquee.jsx` |

---

## Stitch deliverables (design ops — not in repo)

Figma library, 4K stills, icon matrix, motion JSON, a11y report — generate in **Stitch / Figma**; sync tokens here when they change.

---

## Summary

**Pitlane** is a luxury, broadcast-grade dark UI: carbon depth, **F1 red** discipline, **neon cyan** for active telemetry, **glass** surfaces, and **motion** that sells speed without sacrificing readable React + Zustand architecture.

**Doc version:** 2.0 · **Aligned with:** Stitch premium prompt + Pitlane master build.
