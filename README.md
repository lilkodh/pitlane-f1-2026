# Pitlane — F1 2026

Compagnon web **React + Vite** pour le calendrier 2026 : paddock, calendrier filtré, fiches GP, favoris et historique « vu » (stockage local via Zustand `persist`).

## Prérequis

- Node.js 20+

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## Variables optionnelles (`.env`)

Copiez `.env.example` vers `.env` et renseignez une URL **MP4** et/ou **HLS** (`m3u8`) pour le fond vidéo du paddock (`FadingVideo` sur la home).

En **développement**, l’écran d’**ignition** est désactivé par défaut pour que vous voyiez tout de suite l’interface (et le hot-reload). Pour le réactiver : `VITE_DEV_IGNITION=1` dans `.env`, puis redémarrer `npm run dev`.

## Stack

React 18, React Router 7, Tailwind CSS, GSAP + `@gsap/react`, Framer Motion, Zustand, Lucide.

Les maquettes de référence sont décrites dans `ai-rules/` (dont l’esthétique type **Stitch** dans `ai-rules/design-system.md`).
