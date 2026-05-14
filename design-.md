You are an elite, world-class Creative Frontend Developer. Your task is to build "Pitlane," a cinematic Formula 1 2026 digital experience. 

This is NOT a standard React project. It must look and feel like a mix of Formula 1 broadcast graphics, a luxury hypercar dashboard, Apple Vision Pro spatial UI, and a futuristic race control center. 

EXECUTION RULES:
1. DO NOT build a flat, boring grid layout. You must simulate an "8D" immersive experience using heavy layering, glassmorphism, depth-of-field blur, and dynamic glowing effects.
2. Motion is the interface. Nothing should snap into place; everything must have smooth, mechanical, F1-inspired transitions.
3. Dark, premium, and aggressive styling is mandatory. 

REQUIRED LIBRARIES TO INSTALL:
Before writing the UI, ensure these dependencies are installed and utilized:
- `gsap` & `@gsap/react` (Mandatory for ALL heavy animations, scroll triggers, and complex timelines. Do not use standard CSS transitions for hero elements).
- `three` & `@react-three/fiber` & `@react-three/drei` (To create the "8D" depth, floating particles, and cinematic background noise).
- `framer-motion` (For complex page-routing transitions and micro-interactions on cards).
- `lucide-react` (For sleek, modern icons).
- `tailwindcss` (Use for layout, but extend it with custom utilities for complex gradients and glassmorphism).

DESIGN SYSTEM & TOKENS:
- Core Background: #050505 (Racing Black)
- Surface/Glass: #0B0B0B (Carbon Black)
- Primary Accent (Glows/Active): #39FF88 (Telemetry Green)
- Secondary Accent (Warnings/Sprint): #FFD60A (Championship Yellow)
- Text: #FFFFFF (Pure White)

TYPOGRAPHY:
- Hero/Numbers/Countdowns: 'Space Grotesk' (Weight 800, compressed tracking, uppercase, massive scale clamp(5rem, 12vw, 12rem)).
- Body/Metadata: 'Inter'

UI COMPONENTS TO BUILD:
1. "8D" Background: Implement a fixed, layered background using React Three Fiber or layered CSS. Include dark noise textures, a subtle radial glow in the center, and ultra-slow moving green/yellow motion streaks or particles.
2. Glassmorphism Cards: Background rgba(255,255,255,0.04), backdrop-filter blur 20px, 1px border rgba(255,255,255,0.08).
3. Hover States: On hover, cards must scale up slightly, elevate, and emit a telemetry green drop-shadow/glow (e.g., box-shadow: 0 0 20px rgba(57,255,136,0.25)). Use magnetic hover effects if possible.
4. Primary Buttons: Pill-shaped, glowing green linear gradients (#39FF88 to #2cff74) with a motion blur effect on hover.

ANIMATION SPECS (GSAP):
- Easings to use exclusively: `power4.out`, `expo.out`, `circ.out`.
- Durations: 0.4s (micro), 0.8s (standard), 1.2s to 1.6s (cinematic hero reveals).
- Hero Entrance: Implement a staggered split-text animation for the Space Grotesk typography, scaling backgrounds, and glowing transitions.
- Scrolling: Implement `ScrollTrigger` for parallax card movement and cinematic section reveals. 

Generate the absolute best, most premium React code you are capable of. Start by setting up the hero layout with the background effects, the massive typography, and a glassmorphic floating navigation bar.