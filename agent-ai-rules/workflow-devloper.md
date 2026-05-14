# SYSTEM PROMPT: PITLANE F1 2026 EXPERT ASSISTANT

## 1. ROLE AND PERSONA
You are an expert Frontend Developer and GSAP Animation Specialist. Your task is to help build "Pitlane F1 2026," a cinematic, premium Formula 
# PITLANE F1 2026 — DEVELOPER WORKFLOW

# Project Vision

Pitlane is not just a beginner React project.

It is a cinematic, modern, premium Formula 1 experience inspired by:
- Formula 1 broadcast systems
- Motorsport telemetry dashboards
- Racing control centers
- Luxury automotive interfaces

The final application should feel:
- fast
- immersive
- smooth
- premium
- highly animated
- production-ready

IMPORTANT:

The React logic must remain beginner/intermediate friendly.

The UI and frontend experience must feel advanced.

---

# Developer Skill Philosophy

The developer is still learning React.

Because of this:

## Keep Logic Simple

Prefer:
- readable code
- simple hooks
- clear state management
- understandable component structure

Avoid:
- over-engineering
- unnecessary abstractions
- advanced architecture patterns
- complex optimization too early

---

# Core React Concepts To Prefer

The project should mainly use:

- useState
- useEffect
- previous state callback
- props
- event handling
- map()
- filter()
- find()
- some()
- spread operator
- dynamic routes
- useParams()
- localStorage
- JSON.stringify()
- JSON.parse()
- key prop

The project is educational first.

The architecture should still look professional.

---

# Core Stack

## Main Technologies

- React
- Vite
- React Router v7
- Zustand
- Tailwind CSS
- GSAP
- Lucide React

---

# IMPORTANT ROUTER RULE

Never use:

```jsx
react-router-dom
```

Always use:

```jsx
import { createBrowserRouter } from "react-router";
```

This rule is mandatory.

---

# Package Installation

# Create Project

```bash
npm create vite@latest pitlane-f1-2026
cd pitlane-f1-2026
npm install
```

---

# Install Core Dependencies

## React Router v7

```bash
npm install react-router
```

---

## Zustand

```bash
npm install zustand
```

---

## GSAP

```bash
npm install gsap @gsap/react
```

---

## Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

---

## Lucide React

```bash
npm install lucide-react
```

---

# Optional Advanced Motion

## Framer Motion

Optional for:
- page transitions
- hover effects
- micro interactions

Install:

```bash
npm install framer-motion
```

GSAP remains the primary animation engine.

---

# REQUIRED GSAP AI SETUP

Before writing animations:

```bash
npx skills add https://github.com/greensock/gsap-skills
```

This setup is REQUIRED by the brief.

---

# Folder Structure Philosophy

The structure must stay:
- scalable
- beginner-readable
- clean
- feature-based

Avoid deeply nested folders.

---

# Recommended Structure

```txt
src/
│
├── assets/
├── components/
├── pages/
├── stores/
├── hooks/
├── data/
├── layouts/
├── animations/
├── lib/
├── utils/
│
├── app.jsx
├── main.jsx
└── index.css
```

---

# File Naming Rules

Always use:
- kebab-case

Examples:

```txt
home-page.jsx
race-card.jsx
favorites-store.js
use-countdown.js
race-details-page.jsx
```

Never use:
- PascalCase file names
- camelCase file names

---

# Component Philosophy

Components should:
- stay small
- stay reusable
- stay readable
- separate logic from UI

Avoid:
- giant component files
- mixing too much logic and styling
- deeply nested JSX

---

# State Management Philosophy

Use Zustand for:
- favorites
- watched races
- filters

Keep stores:
- simple
- readable
- minimal

Avoid:
- overly complex global state
- advanced middleware unless necessary

---

# Persistence

Use localStorage for:
- favorite races
- watched races

Required methods:

```js
JSON.stringify()
JSON.parse()
```

Persistence must survive:
- refresh
- tab close
- browser restart

---

# React Router Structure

# Required Routes

```txt
/
 /calendar
 /calendar/:raceId
 /mygarage
 /myseason
```

---

# Route Responsibilities

## `/`

Home page:
- next race
- countdown
- featured race
- cinematic hero section

---

## `/calendar`

Season calendar:
- 24 races
- filters
- animated transitions

---

## `/calendar/:raceId`

Dynamic race detail page:
- circuit information
- weekend details
- race statistics

Uses:
```jsx
useParams()
```

---

## `/mygarage`

Favorites system:
- saved races
- remove actions
- animated grid reordering

---

## `/myseason`

Watched races journal:
- chronological history
- filters
- persistent data

---

# Tailwind CSS Philosophy

The UI should feel:
- premium
- modern
- dark
- cinematic
- Formula 1 inspired

Prefer:
- gradients
- glassmorphism
- motion
- responsive grids
- hover animations
- large typography
- strong spacing
- visual hierarchy

Avoid:
- plain beginner UI
- unstyled layouts
- random spacing
- excessive custom CSS

---

# Icon System

Use Lucide React icons consistently.

Use icons for:
- navigation
- buttons
- filters
- actions
- badges
- empty states

Keep icon usage:
- minimal
- clean
- modern

---

# GSAP Rules

GSAP is the MAIN animation engine.

Use:
- useGSAP
- ScrollTrigger
- Flip

---

# GSAP Constraints

## REQUIRED

- Scope animations with refs
- Register plugins once in main.jsx
- Use useGSAP()

---

## FORBIDDEN

- raw animation inside useEffect
- global selectors
- duplicated plugin registration

---

# Required GSAP Usage

GSAP should power:
- hero animations
- stagger reveals
- countdown animations
- page transitions
- scroll reveals
- card hover motion
- Flip layout transitions
- card reordering animations

---

# Animation Philosophy

Animations must feel:
- smooth
- fast
- premium
- cinematic
- motorsport-inspired

Use:
- stagger effects
- smooth easing
- layered motion
- subtle parallax
- animated hover states

Avoid:
- floaty animations
- cartoon motion
- excessive rotation
- chaotic movement

---

# UI Quality Expectations

Even if logic stays simple:

The frontend should look:
- advanced
- modern
- expensive
- production-ready

The application should visually compete with:
- premium sports apps
- Formula 1 dashboards
- automotive websites
- streaming platforms

---

# AI Prompt Workflow

Every AI prompt must include:

# 1. CONTEXT

Explain:
- current architecture
- relevant files
- existing logic

---

# 2. GOAL

Explain:
- what feature must be built
- expected UI behavior
- expected functionality

---

# 3. REQUIREMENTS

Explain:
- hooks to use
- styling expectations
- animation expectations
- responsive behavior

---

# 4. CONSTRAINTS

Explain:
- forbidden patterns
- architecture limitations
- simplicity requirements

---

# 5. RETURN

Request:
- production-ready code
- readable structure
- comments only when useful

---

# Responsive Design Requirements

The app must feel polished on:
- mobile
- tablet
- desktop
- ultrawide screens

Mobile experience is extremely important.

---

# Accessibility Requirements

Must support:
- keyboard navigation
- readable contrast
- focus states
- reduced motion support

---

# Final Experience Goal

Pitlane should feel like:
- a real modern Formula 1 companion app
- a premium sports platform
- a cinematic racing dashboard
- highly animated
- immersive
- responsive
- smooth
- visually polished

Even if the internal React logic remains simple and educational.