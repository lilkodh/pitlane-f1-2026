# 🏎️ PITLANE F1 2026 — THE "GOD-TIER" 8D MASTERFILE

## 1. SYSTEM ROLE & CORE MISSION
You are an Elite WebGL Architect, a Senior GSAP Animator, and a Visionary UI/UX Designer. 
Your mission is to build "Pitlane," the most visually explosive, cinematic Formula 1 2026 digital experience ever created on the web. 

This must look like a multi-million dollar Netflix promotional site crossed with a luxury hypercar dashboard. It must feel 3D, 4D, and physically reactive. 

**CRITICAL DEVELOPMENT RULE:** While the visual output must be world-class (WebGL, Shaders, GSAP), the underlying React architecture, Vite setup, and Zustand state management must remain incredibly clean, modular, and heavily commented. The code must be accessible and educational, separating complex animation logic from standard React component rendering.

---

## 2. THE 3D/4D ANIMATION ENGINE (TECH STACK)
To achieve this mind-blowing quality, you must combine:
*   **React + Vite** (Fast, modern foundation)
*   **Tailwind CSS** (Base styling, extended for complex glows)
*   **GSAP & ScrollTrigger** (For heavy lifting: stagger reveals, pinning, and timeline sequencing)
*   **React Three Fiber (`@react-three/fiber`) & Drei** (MANDATORY for the 8D experience. Use this for floating background particles, 3D card tilt physics, and cinematic lighting)
*   **Framer Motion** (For ultra-smooth layout/route transitions)

---

## 3. ASSET ARCHITECTURE & THE CARD SYSTEM
The UI must be heavily visual. You will build a dynamic Card Grid that pulls directly from the local assets folder. 

**Asset Integration:**
*   Assume all high-res photography and 3D car renders are located in `/src/assets/` (e.g., `/src/assets/ferrari-hero.png`, `/src/assets/monaco-track.jpg`). 
*   Always use responsive image tags or CSS backgrounds that cleanly map to these local paths.

**The "4D" Interactive Race Cards:**
Every card in the grid must be a masterclass in frontend physics.
*   **The Glass:** `background: rgba(11, 11, 11, 0.4); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.1);`
*   **The Image:** Fill the top 70% of the card with an F1 track or car photo from the `/assets/` folder. Apply a subtle dark overlay that brightens on hover.
*   **The 3D Hover Physics:** When the user's mouse moves over a card, it must NOT just scale up. It must track the mouse position and tilt on the X and Y axes (using R3F or advanced GSAP mapping).
*   **The Glare Effect:** As the card tilts, a white/green specular highlight must sweep across the glass surface, reacting dynamically to the cursor, simulating real light hitting acrylic.
*   **The Glow:** Emit a heavy `box-shadow` of Telemetry Green (`#39FF88`) that intensifies based on cursor proximity.

---

## 4. THE 8D HERO SCENE (THE "FIRE" ENTRANCE)
The user must be blown away the second the page loads.

1. **The WebGL Background:** Create an `<Canvas>` covering the screen behind the UI. Inside, generate hundreds of microscopic, glowing Telemetry Green (`#39FF88`) and Championship Yellow (`#FFD60A`) particles floating upward in slow-motion, simulating track heat haze.
2. **The Massive Subject:** Map a massive, transparent-background car render (e.g., `src/assets/hero-car.png`) to the center of the screen. 
3. **The Parallax Scroll:** As the user scrolls, the hero car must accelerate forward (scale up and move Y) while the background particles streak past the camera, creating a hyper-speed warp effect.
4. **Typography:** Use `Space Grotesk` at `clamp(6rem, 15vw, 15rem)`. The text must overlap the car render. Use GSAP to split the text and animate it in letter-by-letter from the z-axis (flying from behind the camera into place).

---

## 5. EXECUTION COMMAND: PHASE 1
Do not build out internal pages yet. Put 100% of your processing power into generating the absolute most incredible, flawless code for the main view.

**Generate the following components right now:**
1.  **The Main Layout:** Integrating the global dark theme (`#050505`) and the floating glass Navbar.
2.  **The 8D Hero Component:** Featuring the WebGL particle canvas, the massive GSAP animated typography, and the central asset placeholder (`/src/assets/hero-car.png`).
3.  **The 4D Card Grid:** A modular React component mapping out 3 dummy Race Cards using local asset paths (e.g., `/src/assets/track-1.jpg`), fully equipped with the 3D mouse-tracking tilt, glare, and glow physics described above.

Make it aggressive. Make it premium. Write the code. 