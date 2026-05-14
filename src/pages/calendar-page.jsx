/**
 * PITLANE — Calendar Page  /calendar
 * =====================================
 * Design System 1.0
 */

import { useState, useRef, useLayoutEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RACES } from '../data/races'
import { CONTINENT_MAP } from '../lib/race-assets'
import RaceCard from '../components/race-card'

gsap.registerPlugin(Flip, ScrollTrigger)

const FILTERS = [
  { id: 'all',          label: 'All Races' },
  { id: 'europe',       label: 'Europe' },
  { id: 'middle-east',  label: 'Middle East' },
  { id: 'asia-pacific', label: 'Asia Pacific' },
  { id: 'americas',     label: 'Americas' },
  { id: 'sprint',       label: 'Sprint' },
]

function filterRaces(races, filterId) {
  if (filterId === 'all')    return races
  if (filterId === 'sprint') return races.filter(r => r.isSprint)
  const ids = CONTINENT_MAP[filterId] || []
  return races.filter(r => ids.includes(r.id))
}

export default function CalendarPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const containerRef = useRef()
  const gridRef      = useRef()

  const filtered = filterRaces(RACES, activeFilter)

  useGSAP(() => {
    gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
  }, { scope: containerRef })

  useLayoutEffect(() => {
    if (!gridRef.current) return
    const state = Flip.getState('[data-flip-id]', { props: 'opacity' })
    Flip.from(state, {
      duration: 0.6,
      ease: 'power2.inOut',
      stagger: 0.05,
      absolute: true,
      onEnter: els => gsap.fromTo(els, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }),
      onLeave: els => gsap.to(els, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' }),
    })
  }, [activeFilter])

  return (
    <div ref={containerRef} className="pt-[80px] px-4 md:px-6 pb-24 max-w-[1200px] mx-auto min-h-screen">

      {/* Header */}
      <div className="mb-12">
        <div className="text-[13px] font-bold tracking-[0.5px] text-[var(--color-racing-red)] uppercase mb-2">
          2026 WORLD CHAMPIONSHIP
        </div>
        <h1 className="text-[36px] md:text-[48px] font-bold font-hero leading-[1.2] tracking-[-0.5px] text-[var(--text-primary)] mb-4">
          Race Calendar
        </h1>
        <p className="text-[18px] leading-[1.6] text-[var(--color-track-gray)] max-w-2xl font-normal">
          The complete schedule for the 2026 FIA Formula 1 World Championship. Filter by region or view only the sprint weekends.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {FILTERS.map(({ id, label }) => {
          const isActive = activeFilter === id
          return (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className="px-4 py-2 text-[13px] font-bold rounded-[4px] transition-all duration-200"
              style={{
                border: isActive ? '2px solid var(--color-racing-red)' : '1px solid var(--color-track-gray)',
                background: isActive ? 'var(--color-racing-red)' : 'transparent',
                color: isActive ? 'var(--color-platinum-silver)' : 'var(--color-track-gray)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--color-racing-red)'
                  e.currentTarget.style.color = 'var(--color-racing-red)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--color-track-gray)'
                  e.currentTarget.style.color = 'var(--color-track-gray)'
                }
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filtered.map((race, i) => (
          <RaceCard key={race.id} race={race} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-[18px] text-[var(--color-track-gray)] font-normal">No races found for this filter.</p>
        </div>
      )}

    </div>
  )
}
