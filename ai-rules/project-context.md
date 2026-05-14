# Pitlane F1 2026 — Project Context

## Overview

**Pitlane** is a multi-page React application designed for fans of the 2026 FIA Formula 1 World Championship season. It transforms the complexity of tracking 24 races, 22 drivers, 11 teams, and an entirely new technical era into a structured, performant, and beautifully animated companion app.

**Project Name:** Pitlane  
**Client:** Formula 1 2026 Season  
**Duration:** 5 days (11/05/2026 – 15/05/2026)  
**Deployment Target:** Vercel or Netlify  

---

## The 2026 F1 Season: A Historic Context

The 2026 F1 World Championship is a watershed moment for the sport.

### Key Season Details

| Detail | Value |
|--------|-------|
| **Opening Race** | Australian Grand Prix, Melbourne (6–8 March 2026) |
| **Final Race** | Abu Dhabi Grand Prix, Yas Marina (4–6 December 2026) |
| **Total Races** | 24 Grands Prix across 5 continents |
| **Sprint Weekends** | 6 events (China, Miami, Canada, UK, Netherlands, Singapore) |
| **New Circuit** | Madrid Urban Circuit (debuts September 2026) |
| **Teams** | 11 (adding Cadillac for 2026) |
| **Drivers** | 22 |
| **Reigning Champion** | Lando Norris |

### Technical Revolution

- **Redesigned Vehicles:** Completely new chassis and aerodynamic package
- **Hybrid Power Units:** Next-generation hybrid power plants
- **100% Sustainable Fuels:** All cars run on sustainable fuels
- **Active Aerodynamics:** Replaces the traditional DRS system for overtaking

---

## The Problem Pitlane Solves

With 24 races, a new technical regulation, 11 teams, and 22 drivers, following F1 in 2026 is thrilling but dense. Essential information is scattered:

- **When is the next race?** (date, location, countdown)
- **What happened this season?** (personal race history)
- **Which races matter to me?** (favorites and personal tracking)
- **How do I navigate all 24 races?** (clear calendar view)

**Pitlane transforms this fragmentation into:**
- A single, animated hub for all season information
- Real-time race countdowns and upcoming race highlights
- Personal race favorites and watched-race history
- A responsive, beautifully animated interface powered by GSAP

---

## Tech Stack

### Core Framework

- **React 18+** with functional components and hooks
- **React Router v7** for multi-page navigation
- **Vite** for fast bundling and hot module replacement

### State & Data Management

- **React Hooks** (useState, useEffect, useRef, useContext)
- **localStorage** for persistent favorites and watch history
- **JSON data file** (races.json) for season and race details

### Animation & Motion

- **GSAP 3** with official skills (greensock/gsap-skills)
- **ScrollTrigger** for scroll-triggered animations
- **Flip** for layout reorganization animations
- **useGSAP** React hook for safe, scoped animation logic

### Design & Styling

- **Tailwind CSS** for utility-first styling
- **Google Stitch** for Figma mockup generation from plain text
- **Figma** for design system specifications

### Development Tools

- **Cursor** or **Windsurf** as primary AI code agents
- **GitHub** for version control and project management
- **GitHub Projects** for task tracking

### Deployment

- **Vercel** or **Netlify** for production hosting

---

## Application Architecture

### Page Structure (React Router v7)

Pitlane consists of **5 main pages**, each with its own route, role, and logic:

```
/                      → Accueil (The Paddock) — Season showcase
/calendrier            → Race Calendar — All 24 races with filters
/calendrier/:raceId    → Race Detail — Complete race information
/mongarage             → My Garage — Favorited races
/masaison              → My Season — Race watch history log
```

### Data Model

#### races.json Structure

Each race object contains:

```json
{
  "id": "unique-race-id",
  "round": 1,
  "name": "Australian Grand Prix",
  "circuit": "Albert Park Circuit",
  "country": "Australia",
  "countryCode": "AU",
  "continent": "Oceania",
  "dates": {
    "start": "2026-03-06",
    "end": "2026-03-08"
  },
  "type": "standard" | "sprint",
  "isNewCircuit": false,
  "laps": 58,
  "circuitLength": 5.278,
  "description": "Editorial description of the race...",
  "imageUrl": "path/to/circuit-image.jpg"
}
```

---

## Core Features

### 1. The Paddock (Home Page)

- **Next Race Showcase:** Displays the upcoming weekend with circuit name, country flag, dates
- **Live Countdown:** Real-time countdown timer to race start
- **Featured Race Card:** Visual highlight of the featured race
- **Visual Language:** Clean, dramatic, immediately informative

### 2. Race Calendar

- **All 24 Races:** Complete season schedule
- **Filter System:**
  - By continent (Europe, Americas, Asia, Africa, Oceania)
  - By type (Sprint, Standard)
- **Animated Cards:** Smooth entrance/exit animations as filters change
- **Clickable Navigation:** Each race card links to its detail page

### 3. Race Detail Page

- **Complete Information:** Circuit name, country, round number, dates, lap count, circuit length, weekend type
- **New Circuit Badge:** Visual indicator for new circuits
- **Editorial Description:** Context and background about the race
- **Dynamic Route:** Loads race data from URL parameter (`:raceId`)

### 4. My Garage (Favorites)

- **Personal Collection:** User-favorited races
- **Chronological Order:** Races sorted by season order
- **Smooth Removal:** Remove favorite without page jump or flicker
- **Empty State:** Clear message when no favorites exist
- **Persistent Storage:** Favorites saved to localStorage

### 5. My Season (Watch History)

- **Personal Log:** Journal of races marked as "I watched this ✓"
- **Chronological Timeline:** Races displayed in order watched
- **Filter Capabilities:** Filter by continent or weekend type
- **Season Memory:** Complete record of what the fan has followed

---

## Animation System (GSAP)

GSAP is the animation engine for the entire application. All animations follow strict patterns:

### Key Principles

1. **useGSAP Hook:** All animations use the `useGSAP` React hook
2. **Scoped to containerRef:** Each animation is scoped to a specific element reference
3. **No Global Selectors:** Never use CSS class selectors for animations
4. **useRef for DOM:** `useRef` maintains references to DOM elements GSAP animates
5. **Plugin Registration:** ScrollTrigger and Flip registered once at app entry point

### Animation Patterns

| Animation Type | Plugin | Use Case |
|---|---|---|
| **Stagger Entrance** | Core GSAP | Hero elements, card lists |
| **Scroll Reveal** | ScrollTrigger | Content appearing as user scrolls |
| **Layout Reorganization** | Flip | Cards reordering when favorites removed |
| **Number Counter** | Core GSAP | Countdown timer digits |
| **Page Transitions** | Core GSAP | Smooth route changes |

### Setup Command

Before writing any animation code:

```bash
npx skills add https://github.com/greensock/gsap-skills
```

This loads GSAP best practices and patterns directly into Cursor/Windsurf's knowledge base.

---

## Development Methodology

### Working with AI Code Agents

All development uses **Cursor** or **Windsurf** as the primary tool. Prompts follow a strict three-part structure:

#### Prompt Template

```
[CONTEXT]
[TASK]
[CONSTRAINTS]
```

**Example:**

```
CONTEXT: We're building the Race Calendar page with filters. 
The page displays 24 race cards. When the user selects a 
continent filter, only races from that continent should display.

TASK: Build the filter buttons component and the filtered 
race list. Filter buttons should be toggleable and persist 
the selected filter to component state.

CONSTRAINTS:
- Use useState for filter state
- Pass filter state to the race list via props
- Use Tailwind for styling
- Make filter buttons accessible (aria-labels, keyboard nav)
- Do not use Context for this feature yet
```

### Source of Truth

- **Figma mockups** (generated via Stitch) are the design authority
- **races.json** is the single source of race data
- **GitHub Projects** tracks all feature tasks
- **Commit messages** follow conventional commits (feat, fix, docs, style)

---

## Deliverables Checklist

- [ ] GitHub repository: `pitlane-f1-2026`
- [ ] Figma file with 5-page mockups (palette, typography, grid, components)
- [ ] React app deployed on Vercel or Netlify
- [ ] README.md with setup and launch instructions
- [ ] races.json with all 24 races fully structured
- [ ] GitHub Projects board with all tasks marked Complete
- [ ] All GSAP skills installed and verified
- [ ] localStorage persistence working for favorites and watch history
- [ ] All React Router v7 routes navigable without errors
- [ ] All animations functioning per performance criteria

---

## Success Criteria

✅ **Functional:** All 5 routes work without errors  
✅ **Animated:** GSAP animations on every page, zero React antipatterns  
✅ **Persistent:** Favorites and history survive browser close/reopen  
✅ **Responsive:** Works on desktop and mobile  
✅ **Performant:** No unnecessary re-renders, smooth 60fps animations  
✅ **Accessible:** Semantic HTML, ARIA labels, keyboard navigation  
✅ **Deployed:** Live URL stable and publicly accessible  

---

## Timeline

| Date | Milestone |
|------|-----------|
| 11/05/2026 | Project kickoff, environment setup |
| 12/05/2026 | Mockups + data model complete |
| 13/05/2026 | Core pages and routing complete |
| 14/05/2026 | Animations and polish |
| 15/05/2026 @ 17:00 | **Final submission deadline** |

---

## Questions?

For clarifications on requirements, refer to the evaluation criteria in this document or reach out to the project lead.

---

**Last Updated:** 11 May 2026  
**Status:** Active
