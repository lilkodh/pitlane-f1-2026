/**
 * PITLANE — Calendar Page  /calendar
 * =====================================
 * Full 24-race 2026 season grid with continent filter tabs.
 *
 * GSAP FLIP INTEGRATION:
 *  When the user changes the active filter, we:
 *   1. Capture the current DOM positions with Flip.getState()
 *   2. Update React state (filter changes which cards render)
 *   3. Call Flip.from(state) — GSAP animates each card from
 *      its old position to its new one. No jumping, no blinking.
 *
 * FILTER LOGIC:
 *  - "All" shows every race
 *  - Continent tabs use CONTINENT_MAP from race-assets.js
 *  - Sprint tab shows only sprint weekends
 *  - Counts update reactively in each tab badge
 *
 * REACT NOTES:
 *  - useState for activeFilter — simple, readable
 *  - gridRef scopes the Flip query to just this grid
 *  - useLayoutEffect ensures the DOM is settled before Flip reads positions
 */

import { useState, useRef, useLayoutEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flag, Zap, Globe } from 'lucide-react'
import { RACES } from '../data/races'
import { CONTINENT_MAP } from '../lib/race-assets'
import RaceCard from '../components/race-card'

gsap.registerPlugin(Flip, ScrollTrigger)

/* ── Filter tab definitions ─────────────────────────────────── */
const FILTERS = [
  { id: 'all',          label: 'All Races',    icon: Globe },
  { id: 'europe',       label: 'Europe',       icon: Flag  },
  { id: 'middle-east',  label: 'Middle East',  icon: Flag  },
  { id: 'asia-pacific', label: 'Asia Pacific', icon: Flag  },
  { id: 'americas',     label: 'Americas',     icon: Flag  },
  { id: 'sprint',       label: 'Sprint',       icon: Zap   },
]

/* ── Filter logic ───────────────────────────────────────────── */
function filterRaces(races, filterId) {
  if (filterId === 'all')    return races
  if (filterId === 'sprint') return races.filter(r => r.isSprint)
  const ids = CONTINENT_MAP[filterId] || []
  return races.filter(r => ids.includes(r.id))
}

export default function CalendarPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const containerRef = useRef()
  const headerRef    = useRef()
  const gridRef      = useRef()

  const filtered = filterRaces(RACES, activeFilter)

  /* ── Header entrance ────────────────────────────────────── */
  useGSAP(() => {
    gsap.from(headerRef.current, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out' })
  }, { scope: containerRef })

  /* ── GSAP Flip: animate grid reorder on filter change ───── */
  useLayoutEffect(() => {
    if (!gridRef.current) return

    // 1. Snapshot positions BEFORE React updates the DOM
    const state = Flip.getState('[data-flip-id]', { props: 'opacity' })

    // 2. React has already updated the DOM at this point (useLayoutEffect)
    // 3. Animate from old → new positions
    Flip.from(state, {
      duration: 0.65,
      ease: 'power3.inOut',
      stagger: 0.04,
      absolute: true,       // keeps removed cards in flow briefly
      onEnter: els => gsap.fromTo(els, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }),
      onLeave: els => gsap.to(els, { opacity: 0, scale: 0.88, duration: 0.35, ease: 'power2.in' }),
    })
  }, [activeFilter])

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen pt-[72px] px-6 lg:px-12 pb-32 max-w-screen-xl mx-auto">

      {/* ── Page Header ───────────────────────────────────── */}
      <div ref={headerRef} className="pt-16 pb-12 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <Flag size={14} className="text-[#FFD60A]" />
          <span className="data-label text-[#FFD60A]">2026 FIA Formula 1 World Championship</span>
        </div>
        <h1 className="hero-text text-5xl md:text-7xl text-white">
          Season <span className="text-[#FFD60A]">Calendar</span>
        </h1>
        <p className="text-white/40 text-xl mt-5 max-w-2xl font-medium">
          The most technically extreme calendar in Formula 1 history.
          Save circuits to your garage and log every race you watch.
        </p>

        {/* Stat row */}
        <div className="flex flex-wrap items-center gap-8 mt-8">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-hero font-black text-white">{RACES.length}</span>
            <div>
              <div className="text-sm font-bold text-white/50">Races</div>
              <div className="data-label">6 Continents</div>
            </div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="text-5xl font-hero font-black text-[#FFD60A]">
              {RACES.filter(r => r.isSprint).length}
            </span>
            <div>
              <div className="text-sm font-bold text-[#FFD60A]/60">Sprint</div>
              <div className="data-label">Weekends</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Tabs ───────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mt-10 mb-12">
        {FILTERS.map(({ id, label, icon: Icon }) => {
          const count = filterRaces(RACES, id).length
          const isActive = activeFilter === id
          return (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 18px',
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: isActive
                  ? (id === 'sprint' ? 'rgba(255,214,10,0.15)' : 'rgba(57,255,136,0.15)')
                  : 'rgba(255,255,255,0.04)',
                border: isActive
                  ? (id === 'sprint' ? '1px solid rgba(255,214,10,0.45)' : '1px solid rgba(57,255,136,0.45)')
                  : '1px solid rgba(255,255,255,0.08)',
                color: isActive
                  ? (id === 'sprint' ? '#FFD60A' : '#39FF88')
                  : 'rgba(255,255,255,0.45)',
                boxShadow: isActive
                  ? (id === 'sprint' ? '0 0 16px rgba(255,214,10,0.2)' : '0 0 16px rgba(57,255,136,0.2)')
                  : 'none',
              }}
            >
              <Icon size={12} />
              {label}
              {/* Count badge */}
              <span style={{
                fontSize: 9,
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: 9999,
                background: isActive ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.06)',
                color: 'inherit',
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Card Grid (Flip-animated) ──────────────────────── */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {filtered.map((race, i) => (
          <RaceCard key={race.id} race={race} index={i} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
          <Globe size={40} className="text-white/15" />
          <p className="text-white/30 font-medium">No races in this filter.</p>
        </div>
      )}

    </div>
  )
}
