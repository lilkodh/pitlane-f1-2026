/**
 * PITLANE — Race Asset Mapping Utility
 * ======================================
 * Maps every raceId to a specific local asset path inside /src/assets/races/.
 * This keeps the data layer (races.js) clean and separates visual concerns.
 *
 * HOW TO USE:
 *   import { getRaceImage } from '../lib/race-assets'
 *   const src = getRaceImage('bhr-2026')   // → '/src/assets/races/bahrain-night.jpg'
 *
 * HOW TO ADD YOUR OWN 4K IMAGES:
 *   1. Drop the file into /src/assets/races/  (any format: jpg, webp, png)
 *   2. Update the path string below to match the filename exactly.
 *   3. Vite will handle the import transformation automatically.
 *
 * FALLBACK:
 *   If a raceId is not found, returns a curated Unsplash URL so the
 *   UI never breaks while local assets are being collected.
 *
 * DOCUMENTED ASSET SLOTS — drop 4K files at these exact paths:
 * ─────────────────────────────────────────────────────────────
 *  /src/assets/races/bahrain-night.jpg          → BHR Grand Prix
 *  /src/assets/races/jeddah-street.jpg          → Saudi Arabian GP
 *  /src/assets/races/melbourne-albert-park.jpg  → Australian GP
 *  /src/assets/races/suzuka-aerial.jpg          → Japanese GP
 *  /src/assets/races/shanghai-circuit.jpg       → Chinese GP (Sprint)
 *  /src/assets/races/miami-autodrome.jpg        → Miami GP (Sprint)
 *  /src/assets/races/imola-tifosi.jpg           → Emilia Romagna GP
 *  /src/assets/races/monaco-harbour.jpg         → Monaco GP
 *  /src/assets/races/barcelona-catalunya.jpg    → Spanish GP
 *  /src/assets/races/montreal-gilles.jpg        → Canadian GP
 *  /src/assets/races/redbullring-alpine.jpg     → Austrian GP (Sprint)
 *  /src/assets/races/silverstone-wing.jpg       → British GP
 *  /src/assets/races/spa-raidillon.jpg          → Belgian GP (Sprint)
 *  /src/assets/races/hungaroring-aerial.jpg     → Hungarian GP
 *  /src/assets/races/zandvoort-dunes.jpg        → Dutch GP
 *  /src/assets/races/monza-temple.jpg           → Italian GP
 *  /src/assets/races/baku-citystreet.jpg        → Azerbaijan GP (Sprint)
 *  /src/assets/races/singapore-marinabay.jpg    → Singapore GP
 *  /src/assets/races/cota-austin.jpg            → USGP (Sprint)
 *  /src/assets/races/mexico-hermanos.jpg        → Mexico City GP
 *  /src/assets/races/interlagos-saopaulo.jpg    → São Paulo GP (Sprint)
 *  /src/assets/races/lasvegas-strip.jpg         → Las Vegas GP
 *  /src/assets/races/lusail-qatar.jpg           → Qatar GP (Sprint)
 *  /src/assets/races/yasmarina-abudhabi.jpg     → Abu Dhabi GP
 * ─────────────────────────────────────────────────────────────
 */

/* ── Unsplash fallbacks (curated motorsport shots) ────────── */
const FALLBACKS = {
  night:   'https://images.unsplash.com/photo-1541348263662-e06836264be8?auto=format&fit=crop&q=80&w=1400',
  street:  'https://images.unsplash.com/photo-1629845722107-1b2096735e5a?auto=format&fit=crop&q=80&w=1400',
  aerial:  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1400',
  circuit: 'https://images.unsplash.com/photo-1596417758778-9e198fa4c3f5?auto=format&fit=crop&q=80&w=1400',
  urban:   'https://images.unsplash.com/photo-1510006764426-8ea873db81d6?auto=format&fit=crop&q=80&w=1400',
  forest:  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1400',
}

/* ── Asset map: raceId → { localPath, fallback } ─────────── */
const ASSET_MAP = {
  'bhr-2026': { local: '/src/assets/races/bahrain-night.jpg',         fallback: FALLBACKS.night   },
  'sau-2026': { local: '/src/assets/races/jeddah-street.jpg',         fallback: FALLBACKS.street  },
  'aus-2026': { local: '/src/assets/races/melbourne-albert-park.jpg', fallback: FALLBACKS.circuit },
  'jpn-2026': { local: '/src/assets/races/suzuka-aerial.jpg',         fallback: FALLBACKS.aerial  },
  'chn-2026': { local: '/src/assets/races/shanghai-circuit.jpg',      fallback: FALLBACKS.circuit },
  'mia-2026': { local: '/src/assets/races/miami-autodrome.jpg',       fallback: FALLBACKS.urban   },
  'emi-2026': { local: '/src/assets/races/imola-tifosi.jpg',          fallback: FALLBACKS.aerial  },
  'mon-2026': { local: '/src/assets/races/monaco-harbour.jpg',        fallback: FALLBACKS.street  },
  'esp-2026': { local: '/src/assets/races/barcelona-catalunya.jpg',   fallback: FALLBACKS.circuit },
  'can-2026': { local: '/src/assets/races/montreal-gilles.jpg',       fallback: FALLBACKS.aerial  },
  'aut-2026': { local: '/src/assets/races/redbullring-alpine.jpg',    fallback: FALLBACKS.aerial  },
  'gbr-2026': { local: '/src/assets/races/silverstone-wing.jpg',      fallback: FALLBACKS.aerial  },
  'bel-2026': { local: '/src/assets/races/spa-raidillon.jpg',         fallback: FALLBACKS.forest  },
  'hun-2026': { local: '/src/assets/races/hungaroring-aerial.jpg',    fallback: FALLBACKS.aerial  },
  'nld-2026': { local: '/src/assets/races/zandvoort-dunes.jpg',       fallback: FALLBACKS.aerial  },
  'ita-2026': { local: '/src/assets/races/monza-temple.jpg',          fallback: FALLBACKS.aerial  },
  'aze-2026': { local: '/src/assets/races/baku-citystreet.jpg',       fallback: FALLBACKS.street  },
  'sgp-2026': { local: '/src/assets/races/singapore-marinabay.jpg',   fallback: FALLBACKS.night   },
  'usa-2026': { local: '/src/assets/races/cota-austin.jpg',           fallback: FALLBACKS.circuit },
  'mex-2026': { local: '/src/assets/races/mexico-hermanos.jpg',       fallback: FALLBACKS.aerial  },
  'bra-2026': { local: '/src/assets/races/interlagos-saopaulo.jpg',   fallback: FALLBACKS.aerial  },
  'lv-2026':  { local: '/src/assets/races/lasvegas-strip.jpg',        fallback: FALLBACKS.night   },
  'qat-2026': { local: '/src/assets/races/lusail-qatar.jpg',          fallback: FALLBACKS.night   },
  'abu-2026': { local: '/src/assets/races/yasmarina-abudhabi.jpg',    fallback: FALLBACKS.night   },
}

/**
 * getRaceImage(raceId)
 * Returns the image src for a given race.
 * Tries the local asset first; if the file doesn't exist at runtime,
 * the <img> onerror handler in RaceCard will swap to the fallback URL.
 *
 * @param {string} raceId
 * @returns {{ src: string, fallback: string }}
 */
export function getRaceImage(raceId) {
  const entry = ASSET_MAP[raceId]
  if (!entry) return { src: FALLBACKS.circuit, fallback: FALLBACKS.circuit }
  return { src: entry.local, fallback: entry.fallback }
}

/**
 * Continent grouping — used for the Calendar filter tabs.
 * Keys match the filter IDs in calendar-page.jsx.
 */
export const CONTINENT_MAP = {
  'europe':       ['emi-2026','mon-2026','esp-2026','aut-2026','gbr-2026','bel-2026','hun-2026','nld-2026','ita-2026','aze-2026'],
  'middle-east':  ['bhr-2026','sau-2026','qat-2026','abu-2026'],
  'asia-pacific': ['jpn-2026','chn-2026','aus-2026','sgp-2026'],
  'americas':     ['mia-2026','can-2026','usa-2026','mex-2026','bra-2026','lv-2026'],
}
