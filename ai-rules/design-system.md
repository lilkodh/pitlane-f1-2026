You are completely right, and I apologize for missing the core Pitlane F1 context in that first synthesis. Let’s merge your highly detailed Pitlane F1 2026 design system with the advanced cinematic architectures (HLS looping, GSAP animations, liquid-glass overlays, and sticky-stacking cards) from your secondary examples.

Here is the exact, master build prompt. You can copy and paste this directly into your AI coding agent (like Cursor, v0, or Bolt) to generate the full application.

---

# 🏎️ MASTER BUILD PROMPT: Pitlane F1 2026 — Premium App

**Context:** Build a single-page, ultra-premium digital companion for the 2026 Formula 1 World Championship. This application must feel like watching a luxury race broadcast—cinematic, immersive, and engineered with mathematical precision. The aesthetic merges carbon-fiber dark modes, high-intensity F1 colors, and "liquid-glass" spatial interfaces.

**Logic Constraint:** While the UI, 3D elements, and animations must be broadcast-quality and visually premium, the internal React logic must remain clear, educational, and beginner-to-intermediate friendly. Avoid overly complex abstractions; prioritize clean standard hooks, readable state management using Zustand, and clear component boundaries.

## 🛠 TECH STACK

- **Core:** React 18, TypeScript, Vite
- **Routing:** React Router v7
- **State Management:** Zustand
- **Styling:** Tailwind CSS (Custom config for tokens)
- **Animation & Motion:** GSAP (Timelines, ScrollTrigger), Framer Motion
- **Media Delivery:** `hls.js` (for background streams)
- **Icons:** `lucide-react` & Heroicons

## 🎨 GLOBAL DESIGN SYSTEM

**Forced Dark Theme:** No light mode. The entire app is dark, sleek, and premium.

- **Colors:**
  - *Backgrounds:* Carbon Black `#0A0A0A` to `#1A1A2E` gradients.
  - *Primary:* F1 Red `#DC0000`, Titanium Silver `#E8E8E8`.
  - *Accents/Glows:* Glow Accent `#00D9FF` (active states), Danger Red `#FF0000`, Team Colors (e.g., Papaya `#FF6B35`).
- **Typography:**
  - *Headings:* `Inter Black` (900) or `Clash Display` — athletic, sharp (-2px tracking).
  - *Numbers/Data/Countdowns:* `IBM Plex Mono` (700) — strict technical precision.
  - *Body:* `Inter Regular`.
- **Liquid Glass & Materials:**
  - `.liquid-glass`: `bg-white/5`, `backdrop-blur-md`, 1px F1 Red or subtle neon blue border, subtle inner shadow.
  - *Hover states:* Elements cast a 20px blur, 15% opacity neon glow shadow on hover (`box-shadow: 0 0 20px rgba(0, 212, 255, 0.3)`).

## ✨ ANIMATION & TRANSITION SYSTEM

- **Cinematic Page Transitions:** Every route change fades current content (300ms) → Micro-scales background (1 → 0.98) → Reveals new page with backdrop blur fade (500ms) and elements sliding up into place. Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- **GSAP Scroll Reveal:** Elements appear as the user scrolls, fading and sliding up 30px.
- **Number Rolling:** Countdowns and statistics use smooth, monospaced linear rolling animations.

## 🧱 ARCHITECTURE & VIEWS

### 0. Ignition Loading Screen

- **Overlay:** Fixed full-screen (`z-[9999]`), background `#0A0A0A`.
- **Animation:** rAF counter from `000` → `100` km/h.
- **Content:**
  - Center: Rotating monospaced text `["SYSTEMS CHECK", "TYRE WARM-UP", "LIGHTS OUT"]` cycling every 900ms.
  - Bottom: Progress bar scaling horizontally with F1 Red and a glowing edge.

### 1. Home / Hero Section (The Paddock)

- **Layout:** 100vh split layout (60% Content left, 40% 3D Car right).
- **Background:** Absolute full-viewport HLS video looping smoothly via a custom `requestAnimationFrame` fade hook (use placeholder racing tarmac/circuit footage). Dark gradient overlay.
- **Navbar:** Horizontal `.liquid-glass` pill. Nav links hover text to F1 Red with an animated underline. Profile avatar on the right.
- **Content (Left):**
  - *Overline:* "NEXT RACE" (Red, uppercase, slides in).
  - *Headline:* Massive "Australian Grand Prix".
  - *Details:* 3-column grid featuring a live, red-pulsing countdown (`IBM Plex Mono`, 84px).
  - *CTA:* Liquid-glass button with Racing Red border and continuous glowing pulse effect.
- **3D Car rendering (Right):** Render a high-fidelity Ferrari F2026 image or spline model.
  - *Load:* Scales in 60% -> 100%, rotates into isometric view.
  - *Scroll:* GSAP ScrollTrigger rotates the car slightly (`rotateY`) and adds a subtle bobbing motion.

### 2. Live News Marquee

- **Layout:** Horizontal scrolling ticker anchored to the bottom of the hero.
- **Content:** Live F1 race updates separated by red glowing dots.
- **Motion:** Infinite 30s GSAP scroll.

### 3. Calendar (Sticky Stacking Race Cards)

- **Layout:** Filter buttons at the top (Continent, Sprint/Standard) that trigger Framer Motion layout animations.
- **Mechanism:** As the user scrolls, 3-4 upcoming "Featured Race Cards" stack and scale down behind each other (like the 3D creator cards).
  - *Card Style:* Premium glassmorphism, 1px Racing Red border.
  - *Content:* Massive Mono round numbers (`01`, `02`), Circuit layout image, Fav heart button, and Team-colored type badges.

### 4. Circuit Detail (Bento Grid Analytics)

- **Header:** Circuit image parallax background. Breadcrumbs, track length, and lap count stats that animate sequentially.
- **Bento Grid (The Telemetry):**
  - Use an asymmetrical bento grid for circuit data.
  - *Cards:* Semi-dark with subtle metallic borders.
  - *Data points:* Top speed, DRS zones, Lap records. Include high-contrast charts or mono-spaced data tables.

## 🧩 CRITICAL COMPONENTS

1. `FadingVideo`**:** Wraps an `<video autoPlay muted playsInline>` handling manual opacity crossfading via `requestAnimationFrame` for seamless background loops.
2. `CountdownWidget`**:** A sticky bottom-right widget. Rolling digit animation. At T-1h, pulse animation becomes aggressive (1s cycle).
3. `LiquidButton`**:** Primary CTA utilizing the `#DC0000` red, scaling to 1.05 on hover with a glow intensity boost. Semantic `<button>` tags with correct ARIA labels.

**Export Requirements:** Ensure Tailwind token compatibility for the custom color palette and typography sizing, and prioritize a layout that achieves a 85+ Lighthouse score.