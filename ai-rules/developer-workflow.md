# Pitlane F1 2026 — Developer Workflow

## Overview

This document outlines how to develop Pitlane using **AI code agents** (Cursor or Windsurf) as your primary development tool. The workflow emphasizes clear prompts, component-driven architecture, proper React patterns, and GSAP integration.

---

## Getting Started

### 1. Environment Setup

```bash
# Create a new Vite React project
npm create vite@latest pitlane-f1-2026 -- --template react

# Navigate to project
cd pitlane-f1-2026

# Install dependencies
npm install

# Install GSAP and plugins
npm install gsap

# Install React Router v7
npm install react-router-dom@7

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install GSAP skills for your AI agent
npx skills add https://github.com/greensock/gsap-skills
```

### 2. Verify GSAP Skills Installation

```bash
# Check that skills were added to .cursor/settings.json or similar
cat .cursor/settings.json | grep gsap

# Skills should enable useGSAP, ScrollTrigger, Flip patterns
```

### 3. Project Structure

```
pitlane-f1-2026/
├── public/
│   ├── flags/                # Country flag SVGs
│   └── circuits/             # Circuit images
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── RaceCard.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── CountdownTimer.jsx
│   │   └── EmptyState.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Calendar.jsx
│   │   ├── RaceDetail.jsx
│   │   ├── MyGarage.jsx
│   │   └── MySeason.jsx
│   ├── hooks/
│   │   ├── useRaces.js
│   │   ├── useLocalStorage.js
│   │   └── useFavorites.js
│   ├── data/
│   │   └── races.json
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .cursor/settings.json     # AI agent config
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## Prompt Structure for AI Agents

### The Three-Part Framework

Every prompt to Cursor/Windsurf follows this structure:

```
[CONTEXT]
[TASK]
[CONSTRAINTS]
```

### Part 1: CONTEXT

Provide the developer agent with background information:
- What component are we building?
- What is its role in the application?
- What data does it receive?
- What problem does it solve?

**Example Context:**

```
CONTEXT:
We're building a countdown timer component for the Pitlane home page.
The timer displays how much time remains until the next F1 race starts.
It receives the race start date via a prop.
The timer updates every second and displays in the format D:HH:MM:SS.
When the race starts (countdown reaches 0), it should display a "Race On!" message.
```

### Part 2: TASK

State exactly what code to write:
- Create this component
- Add this functionality
- Connect this state

**Example Task:**

```
TASK:
Create a CountdownTimer.jsx component that:
1. Accepts a prop `raceStartDate` (ISO string)
2. Uses useState to track remaining time
3. Uses useEffect to update time every second
4. Returns JSX with the countdown in H2 font size
5. Displays remaining as "D:HH:MM:SS" (days:hours:minutes:seconds)
6. When countdown <= 0, shows "Race On!" in Racing Red
```

### Part 3: CONSTRAINTS

List technical restrictions and patterns to follow:
- React/JSX patterns to use or avoid
- No global selectors for GSAP
- Use useRef for animations
- Specific Tailwind utilities
- Accessibility requirements

**Example Constraints:**

```
CONSTRAINTS:
- Use useState for time tracking, useEffect for the interval
- Do NOT use setInterval directly; clean up the interval on unmount
- Use IBM Plex Mono (Tailwind: font-mono) for the numbers
- Size should be 48px font (Tailwind: text-6xl)
- Color: Racing Red (#DC0000)
- Do NOT add animation yet (that comes in a separate prompt)
- Include proper TypeScript-style prop comments at the top
- Make it responsive: smaller text on mobile (text-4xl md:text-6xl)
```

### Complete Prompt Example

```
CONTEXT:
We're building the Race Calendar page. It displays 24 race cards 
in a responsive grid. Users can filter by continent or by race type 
(Sprint vs Standard). When a filter is applied, cards should animate 
out, the list updates, and cards animate back in. The page uses 
React Router to navigate to individual race detail pages.

TASK:
Build the FilterButtons.jsx component that displays two filter groups:
1. Continent filter: Australia, Europe, Americas, Asia, Africa
2. Race type filter: Sprint, Standard, All

The component should manage selected filters in useState. 
Pass the selected filters to the parent page via a callback prop (onFilterChange).
Display active filters with a Racing Red border and white background.
Inactive filters should have a transparent background with gray borders.

CONSTRAINTS:
- Use useState for filter state (one state for continent, one for type)
- Buttons should be accessible (aria-pressed, proper labels)
- Use Tailwind for styling (flex layout, gap-4 for spacing)
- Support mobile: wrap buttons on small screens
- Do NOT use Context yet
- Filter buttons should be ONLY the UI; parent page handles animation
- Include comments explaining the filter logic
```

---

## Component Development Workflow

### Step 1: Plan in Prompts, Not Code

Before writing ANY code, describe what the component needs in plain language to the AI agent.

### Step 2: Build Incrementally

Use separate prompts for:
1. **Structure:** Basic component, props, JSX skeleton
2. **State Management:** Add useState/useEffect hooks
3. **Styling:** Tailwind CSS and responsive design
4. **Interactivity:** Event handlers and callback props
5. **Animation:** GSAP integration (separate from structure)

### Step 3: Example: Building RaceCard Component

**Prompt 1: Structure**

```
CONTEXT:
RaceCard displays a single race from the 24-race calendar.
Each card shows: country flag, circuit name, dates, type badge, favorite button.

TASK:
Create RaceCard.jsx that accepts a race object as a prop.
Structure the card to show:
- Top: flag emoji (32px)
- Title: circuit name (H4, bold)
- Text: country name and dates
- Bottom: type badge (Sprint/Standard) and favorite button (heart icon)

CONSTRAINTS:
- Do NOT add animations yet
- Do NOT add favorite state management (parent handles it)
- Use Tailwind for styling
- Card should have 20px padding, 8px border radius, light gray background
- Make it a reusable component, not hardcoded styles
```

**Prompt 2: Styling & Responsiveness**

```
CONTEXT:
RaceCard needs Tailwind styling that matches the design system.

TASK:
Add responsive Tailwind classes:
- Card: light gray background (bg-gray-100), 1px gray border, rounded-lg
- Padding: 20px (p-5)
- Flag: 32px text size
- Title: H4 size (text-xl), bold (font-bold)
- Dates: smaller text (text-sm), gray color
- Type badge: inline-block, smaller font, background color based on type
  - Sprint: gold background with dark text
  - Standard: gray background with light text
- Hover state: slight shadow, scale up slightly (hover:shadow-lg hover:scale-105)

CONSTRAINTS:
- Use Tailwind utilities only, no custom CSS
- Card should be 100% width within its container
- Responsive: check that it looks good on mobile, tablet, desktop
```

**Prompt 3: Interactivity**

```
CONTEXT:
RaceCard needs to respond to user clicks: clicking the race navigates to detail page,
clicking the favorite button toggles favorite state.

TASK:
1. Add onClick to the card that navigates to /calendrier/:raceId using useNavigate()
2. Add onClick to the favorite button that calls an onToggleFavorite callback
3. Change the heart icon appearance based on whether the race is favorited (filled vs empty)
4. The favorite button should prevent default card click (e.preventDefault in onClick)

CONSTRAINTS:
- Import useNavigate from react-router-dom
- The onToggleFavorite callback is passed from parent; just call it, don't manage state
- Use conditional rendering for the heart icon state
- Keep the card clickable even on mobile (40px+ touch target for favorite button)
```

**Prompt 4: Animation**

```
CONTEXT:
Race cards animate in with a stagger effect when the page loads or filters change.
Cards also animate out and back in when filters are applied.

TASK:
Add GSAP animations:
1. On mount, card should fade in and slide up (opacity 0->1, translateY from 30px to 0)
2. Animation duration: 0.6s, ease: power2.out
3. Cards will be staggered by parent using staggerChildren
4. When card is removed from DOM (due to filter), it should fade out and slide down

CONSTRAINTS:
- Use useGSAP hook, not useEffect
- Use useRef to capture card container reference
- Do NOT use CSS selectors or class names for GSAP selection
- Animation should only run on initial mount, not on every re-render
- Parent component handles Flip animation; card just needs entrance/exit
```

---

## React Hooks Usage

### Hooks Applied in Pitlane

| Hook | Purpose | Example |
|------|---------|---------|
| **useState** | Local component state | Filter buttons, modal open state |
| **useEffect** | Side effects, data fetching | Load races on mount, cleanup intervals |
| **useRef** | DOM references for GSAP | Capture card element for animation |
| **useContext** | Global state (if needed) | Shared favorites and history |
| **useGSAP** | Safe GSAP integration in React | All animations |
| **useNavigate** | Programmatic routing | Navigate to race detail |
| **useParams** | Read URL parameters | Get :raceId from URL |

### Hooks by Page

#### Home Page (/)

```javascript
// useState for current race display
const [nextRace, setNextRace] = useState(null);

// useEffect to load next race from data
useEffect(() => {
  // Load races, find next one, set state
}, []);

// useRef for countdown timer container
const countdownRef = useRef(null);

// useGSAP for hero animations
useGSAP(() => {
  // Stagger hero elements in
}, { scope: containerRef });
```

#### Calendar Page (/calendrier)

```javascript
// useState for filters
const [continentFilter, setContinentFilter] = useState('all');
const [typeFilter, setTypeFilter] = useState('all');

// useState for filtered races
const [filteredRaces, setFilteredRaces] = useState([]);

// useEffect to apply filters whenever they change
useEffect(() => {
  // Filter races based on state
  // Update filtered list
}, [continentFilter, typeFilter]);

// useRef to capture grid for ScrollTrigger refresh
const gridRef = useRef(null);

// useGSAP for card animations on filter change
useGSAP(() => {
  // Stagger cards in
  // ScrollTrigger.refresh() to update scroll positions
}, { dependencies: [filteredRaces], scope: gridRef });
```

#### Race Detail Page (/calendrier/:raceId)

```javascript
// useParams to get race ID from URL
const { raceId } = useParams();

// useEffect to load race data
useEffect(() => {
  // Find race in data by ID
  // Set to state
}, [raceId]);

// useNavigate for back button
const navigate = useNavigate();

// useGSAP for page reveal animation
useGSAP(() => {
  // Fade and slide in content
});
```

#### My Garage Page (/mongarage)

```javascript
// useState for favorited races
const [favorites, setFavorites] = useState(() => 
  JSON.parse(localStorage.getItem('pitlane-favorites')) || []
);

// useEffect to persist favorites to localStorage
useEffect(() => {
  localStorage.setItem('pitlane-favorites', JSON.stringify(favorites));
}, [favorites]);

// useRef for grid to capture Flip state before removal
const gridRef = useRef(null);

// useGSAP for Flip animation when removing favorite
useGSAP(() => {
  // Capture state, remove card, animate with Flip
}, { dependencies: [favorites], scope: gridRef });
```

#### My Season Page (/masaison)

```javascript
// useState for watched races
const [watched, setWatched] = useState(() => 
  JSON.parse(localStorage.getItem('pitlane-watched')) || []
);

// useState for filters
const [continentFilter, setContinentFilter] = useState('all');
const [typeFilter, setTypeFilter] = useState('all');

// useEffect to filter watched races
useEffect(() => {
  // Filter based on continent and type
}, [continentFilter, typeFilter, watched]);

// useGSAP for timeline animations
```

---

## GSAP Integration Patterns

### 1. Basic useGSAP Pattern

```javascript
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function MyComponent() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // All GSAP code goes here
    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  return <div ref={containerRef} className="component">...</div>;
}
```

### 2. Stagger Pattern (Cards Entering)

```javascript
useGSAP(() => {
  gsap.from(".race-card", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,  // 100ms between each card
    ease: "power2.out"
  });
}, { scope: gridRef });
```

### 3. ScrollTrigger Pattern

```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.to(".reveal-element", {
    scrollTrigger: {
      trigger: ".reveal-element",
      start: "top 80%",
      end: "top 20%",
      scrub: false
    },
    opacity: 1,
    y: 0,
    duration: 0.8
  });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, { scope: containerRef });
```

### 4. Flip Pattern (Layout Reorganization)

```javascript
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

useGSAP(() => {
  // When removing a favorite:
  const state = Flip.getState(".race-card");
  
  // Remove element from DOM
  cardElement.remove();
  
  // Animate remaining cards to new positions
  Flip.from(state, {
    duration: 0.6,
    ease: "power2.inOut"
  });
}, { scope: gridRef });
```

### 5. Countdown Timer Animation

```javascript
useGSAP(() => {
  gsap.to(numRef.current, {
    innerText: targetNumber,
    duration: 1,
    snap: { innerText: 1 },  // Snap to integers
    ease: "linear"
  });
}, { scope: countdownRef });
```

---

## localStorage Patterns

### 1. Favorites Persistence

```javascript
// Hook to manage favorites
function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('pitlane-favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const addFavorite = (race) => {
    setFavorites(prev => [...prev, race.id]);
  };

  const removeFavorite = (raceId) => {
    setFavorites(prev => prev.filter(id => id !== raceId));
  };

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('pitlane-favorites', JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite };
}
```

### 2. Watch History Persistence

```javascript
function useWatchHistory() {
  const [watched, setWatched] = useState(() => {
    const stored = localStorage.getItem('pitlane-watched');
    return stored ? JSON.parse(stored) : [];
  });

  const markAsWatched = (race) => {
    setWatched(prev => [...prev, {
      raceId: race.id,
      watchedAt: new Date().toISOString()
    }]);
  };

  useEffect(() => {
    localStorage.setItem('pitlane-watched', JSON.stringify(watched));
  }, [watched]);

  return { watched, markAsWatched };
}
```

---

## React Router v7 Setup

### App.jsx Router Configuration

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import RaceDetail from './pages/RaceDetail';
import MyGarage from './pages/MyGarage';
import MySeason from './pages/MySeason';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendrier" element={<Calendar />} />
        <Route path="/calendrier/:raceId" element={<RaceDetail />} />
        <Route path="/mongarage" element={<MyGarage />} />
        <Route path="/masaison" element={<MySeason />} />
      </Routes>
    </Router>
  );
}
```

### Link Navigation

```javascript
import { Link } from 'react-router-dom';

// In RaceCard:
<Link to={`/calendrier/${race.id}`} className="race-card">
  {/* Card content */}
</Link>

// In header:
<Link to="/" className="logo">Pitlane</Link>
<Link to="/calendrier" className="nav-link">Calendrier</Link>
<Link to="/mongarage" className="nav-link">Mon Garage</Link>
<Link to="/masaison" className="nav-link">Ma Saison</Link>
```

---

## Git Workflow & Commits

### Branch Strategy

```bash
# Main branch: production
# Develop branch: staging

# Feature branches:
git checkout -b feat/home-page
git checkout -b feat/animations-calendar
git checkout -b fix/countdown-timer

# Commit before prompting AI agent:
git add .
git commit -m "WIP: adding filter functionality"
```

### Conventional Commits

```
feat: add countdown timer animation to home page
fix: correct timestamp parsing in race detail
docs: update GSAP animation patterns in README
style: reorganize component folder structure
chore: update dependencies
```

### Commit Frequency

- Commit after each major feature completes (1 component, 1 hook, 1 animation)
- Don't commit work-in-progress code
- Always have a clean working tree before asking AI agent for changes

---

## Debugging GSAP Animations

### 1. Enable GSAP DevTools

```javascript
// In main.jsx or App.jsx
import gsap from 'gsap';

// Enable during development
if (import.meta.env.DEV) {
  window.gsap = gsap;
  console.log('GSAP available on window.gsap');
}
```

### 2. ScrollTrigger Markers

```javascript
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    markers: true  // Shows start/end visual markers
  },
  opacity: 1,
  duration: 0.8
});
```

### 3. Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Animations not running | useGSAP not used, useEffect used instead | Move code into useGSAP callback |
| Multiple animations on same element | Timeline not properly scoped | Use containerRef and scope option |
| ScrollTrigger not updating | Need refresh after DOM changes | Call ScrollTrigger.refresh() after filter changes |
| useRef undefined | Ref not attached to JSX element | Verify `ref={containerRef}` is on correct element |

---

## Performance Optimization

### 1. Avoid Unnecessary Re-renders

```javascript
// DON'T: This re-renders the entire grid on every keystroke
const [searchTerm, setSearchTerm] = useState('');
const filteredRaces = races.filter(r => r.name.includes(searchTerm));

// DO: Debounce the filter
import { useCallback } from 'react';

const handleFilterChange = useCallback((newFilter) => {
  // Debounced filter logic
}, []);
```

### 2. Lazy Load Race Data

```javascript
// Load races.json on first use, cache in state
const [races, setRaces] = useState(null);

useEffect(() => {
  if (!races) {
    fetch('./data/races.json')
      .then(r => r.json())
      .then(setRaces);
  }
}, []);
```

### 3. Memoize Components

```javascript
import { memo } from 'react';

// Prevent RaceCard from re-rendering unless its props change
export default memo(RaceCard);
```

---

## Testing & QA

### Manual Testing Checklist

- [ ] All 5 routes navigate without errors
- [ ] Race detail page loads correct race by ID
- [ ] Favorite button toggles and persists
- [ ] Watch history logs race and persists
- [ ] Filters work and animations play
- [ ] Countdown timer updates every second
- [ ] Scroll animations trigger at correct scroll positions
- [ ] Mobile responsive on 320px, 768px, 1024px+ widths
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] localStorage survives browser close/reopen

### Browser DevTools Checks

```javascript
// In browser console:
localStorage.getItem('pitlane-favorites')  // Check favorites
localStorage.getItem('pitlane-watched')    // Check history

// Check for memory leaks
// DevTools > Performance > Record > Interact > Stop > Look for memory spikes
```

---

## Deployment Checklist

### Before Final Submission

- [ ] GitHub repo created: `pitlane-f1-2026`
- [ ] All code pushed to main branch
- [ ] GitHub Projects board 100% complete (all tasks → Done)
- [ ] README.md written with setup and launch instructions
- [ ] races.json populated with all 24 races
- [ ] Figma mockups created via Stitch
- [ ] GSAP skills installed (`npx skills add ...`)
- [ ] No console errors or warnings
- [ ] Lighthouse score > 80 (Performance, Accessibility)
- [ ] Deployed to Vercel or Netlify
- [ ] Live URL accessible and tested

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Set environment variables if needed
vercel env add REACT_APP_API_URL

# Redeploy
vercel --prod
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Or connect GitHub repo in Netlify UI for auto-deploy
```

---

## Quick Reference: AI Prompt Checklist

Before sending a prompt to Cursor/Windsurf:

- [ ] I have described the CONTEXT clearly (what component, its role, data flow)
- [ ] I have stated the TASK precisely (what to build, what functions to add)
- [ ] I have listed CONSTRAINTS (hooks to use, patterns to follow, what not to do)
- [ ] I have committed recent changes to git
- [ ] I understand what the agent will produce before it starts
- [ ] I'm ready to test and potentially debug the output

---

**Last Updated:** 11 May 2026  
**Version:** 1.0
