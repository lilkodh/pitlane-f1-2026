/**
 * PITLANE — Calendar Page  /calendar
 * Full 2026 season race grid.
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flag } from 'lucide-react'
import { RACES } from '../data/races'
import RaceCard from '../components/race-card'

export default function CalendarPage() {
  const containerRef = useRef()
  const headerRef    = useRef()

  useGSAP(() => {
    gsap.from(headerRef.current, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out' })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen pt-[72px] px-6 lg:px-12 pb-32 max-w-screen-xl mx-auto">

      {/* Header */}
      <div ref={headerRef} className="pt-16 pb-16 border-b border-white/5 mb-14">
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

        {/* Stats row */}
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
            <span className="text-5xl font-hero font-black text-[#FFD60A]">{RACES.filter(r => r.isSprint).length}</span>
            <div>
              <div className="text-sm font-bold text-[#FFD60A]/60">Sprint</div>
              <div className="data-label">Weekends</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {RACES.map((race, index) => (
          <RaceCard key={race.id} race={race} index={index} />
        ))}
      </div>
    </div>
  )
}
