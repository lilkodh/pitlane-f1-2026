# pitlane-f1-2026# 🏎️ Pitlane — AI Agent Context & Developer Workflow

> **Official project rules for the AI agent integration.**
> Every feature generated for Pitlane must follow this document exactly.

---

## 📌 Project Context

**Pitlane** is a professional multi-page Formula 1 React application focused on the **2026 FIA Formula 1 World Championship** season.

The application must feel:

- 🎬 Cinematic
- ✨ Modern
- ⚡ Fast
- 🌍 Immersive
- 🎯 Highly animated
- 💎 Visually premium

> The UI quality should look **advanced and professional** even if the internal logic stays beginner-friendly and educational.

---

## 👨‍💻 Developer Skill Level

The developer is still **beginner / intermediate** in React logic.

The project should therefore:

- Keep logic **simple**
- Keep state **understandable**
- Avoid unnecessary complexity
- Prioritize **readability**
- Avoid over-engineering

However — the **visual design, UI polish, animations, responsiveness, and user experience** should feel **ADVANCED and professional**.

> ✅ Beginner-friendly logic
> ✅ Advanced frontend presentation

---

## ⚛️ React Concepts Preferred

Prefer solutions using:

- `useState`
- State updating with previous state callback
- Spread operator
- `map()`
- `filter()`
- `find()`
- `some()`
- Props
- Event handling
- Dynamic routes
- `useParams()`
- `localStorage`
- `JSON.stringify()` / `JSON.parse()`
- `useEffect()`
- `key` prop

> ❌ Avoid advanced architectural complexity unless absolutely necessary.

---

## 🧱 Core Stack

| Tool | Purpose |
|---|---|
| **React + Vite** | Core framework & build tool |
| **React Router v7** | Routing (only) |
| **Zustand** | Global state management |
| **Tailwind CSS** | Styling |
| **GSAP** | Primary animation engine |
| **Lucide React** | Icons |

---

## 🔀 React Router — IMPORTANT

**Always use React Router v7 only.**

```js
// ✅ Correct
import { createBrowserRouter } from "react-router";

// ❌ Never use this
import { createBrowserRouter } from "react-router-dom";
```

> `react-router-dom` is **banned** from this project.

---

## 🎨 Tailwind CSS

Use Tailwind CSS for all styling.

The UI should feel:

- 💎 Premium
- 🖤 Dark themed
- 🏎️ Formula 1 inspired
- 🎬 Cinematic
- 📱 Responsive on all devices

**Prefer:**

- Gradients
- Glassmorphism
- Motion-based hover states
- Consistent spacing
- Responsive grids
- Large typography
- Strong visual hierarchy

**Avoid:**

- ❌ Plain beginner UI
- ❌ Unstyled layouts
- ❌ Excessive custom CSS outside Tailwind

---

## 🔷 Icons

Use **Lucide React** for all icons.

```bash
npm install lucide-react
```

Use icons consistently across:

- Navigation
- Buttons
- Filters
- Badges
- Action elements

---

## 🟢 GSAP — Animation System

GSAP is the **primary animation engine** of the entire project.

### Setup

Before writing animations, install the official GSAP skills:

```bash
npx skills add https://github.com/greensock/gsap-skills
```

> ⚠️ This setup is **required** by the project brief.

### Rules

- ✅ Use `useGSAP`
- ✅ Use `ScrollTrigger`
- ✅ Use `Flip`
- ✅ Always scope animations with `refs`
- ✅ Register GSAP plugins **once** in `main.jsx`
- ❌ Never animate inside raw `useEffect`
- ❌ Avoid global selectors

### Use GSAP for

- Hero entrance animations
- Stagger animations
- Countdown number animations
- Page reveals
- Scroll-triggered animations
- Layout transitions
- Card reordering animations

---

## 🎞️ Animation Philosophy

Animations should feel:

- 🏎️ Motorsport-inspired
- 🌊 Smooth and fluid
- ⚡ Fast and dynamic
- 💫 Premium and cinematic

Apply:

- Stagger effects
- Motion transitions
- Hover interactions
- Animated cards
- Subtle parallax
- Responsive motion

---

## 🌀 Optional — Framer Motion

For extra UI polish, **Framer Motion** can also be used for:

- Page transitions
- Hover micro-interactions
- Element entrance effects

```bash
npm install framer-motion
```

> Use GSAP as the primary engine. Framer Motion is supplemental only.

---

## 📁 Folder Structure Philosophy

Folders must remain:

- 🗂️ Clean
- 📖 Understandable
- 📦 Scalable
- 🧩 Feature-based

> ❌ Avoid deeply nested architecture.

---

## 🏷️ File Naming Rules

**Use kebab-case everywhere.**

```
✅ home-page.jsx
✅ race-card.jsx
✅ favorites-store.js
✅ use-countdown.js
```

```
❌ HomePage.jsx
❌ raceCard.jsx
❌ FavoritesStore.js
```

---

## 🧩 Component Philosophy

Components should:

- Remain **small**
- Remain **reusable**
- Stay **readable**
- Separate **logic from UI**

> ❌ Avoid giant monolithic files.

---

## 🤖 AI Agent Workflow

Every generated feature must follow this structure:

1. **Context** — What part of the app does this belong to?
2. **Goal** — What does this feature need to accomplish?
3. **Requirements** — What must be included?
4. **Constraints** — What rules must be respected?
5. **Return** — What is the expected output?

The generated code must:

- Stay **clean**
- Stay **scalable**
- Remain **beginner-readable**
- Feel **production-ready visually**

---

## 🏆 Expected Final Experience

Pitlane should feel like:

- A real, modern **Formula 1 companion app**
- A **premium sports platform**
- Highly animated and visually immersive
- Responsive on all devices
- Smooth, polished, and cinematic

> Even if the internal React logic remains simple and educational — the **experience** must feel world-class.

---

*Pitlane — 2026 FIA Formula 1 World Championship* 🏁