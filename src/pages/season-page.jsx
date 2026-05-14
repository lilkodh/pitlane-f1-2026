/**
 * PITLANE — Season Journal
 * =========================
 * Design System 1.0
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useF1Context } from '../context/f1-context'
import { RACES } from '../data/races'

export default function SeasonPage() {
  const containerRef = useRef()
  const { watchedRaces } = useF1Context()
  
  const watchedData = RACES.filter(r => watchedRaces.includes(r.id))
  const pct = Math.round((watchedData.length / RACES.length) * 100)

  useGSAP(() => {
    gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="pt-[80px] px-4 md:px-6 pb-24 max-w-[1200px] mx-auto min-h-screen">

      <div className="mb-12">
        <div className="text-[13px] font-bold tracking-[0.5px] text-[var(--color-racing-red)] uppercase mb-2">
          SEASON JOURNAL
        </div>
        <h1 className="text-[36px] md:text-[48px] font-bold font-hero leading-[1.2] tracking-[-0.5px] text-[var(--text-primary)] mb-4">
          My Season
        </h1>
        <p className="text-[18px] leading-[1.6] text-[var(--color-track-gray)] max-w-2xl font-normal mb-8">
          Track your progress through the 2026 season. Mark races as watched to fill your championship progress bar.
        </p>

        {/* Progress Bar */}
        <div className="glass-card p-6 max-w-2xl">
          <div className="flex justify-between items-end mb-4">
            <div className="data-label">Championship Completion</div>
            <div className="text-[28px] font-bold font-hero leading-none text-[var(--text-primary)]">
              {pct}%
            </div>
          </div>
          <div className="h-2 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--color-racing-red)] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3 text-[14px] text-[var(--color-track-gray)] font-normal flex justify-between">
            <span>{watchedData.length} Watched</span>
            <span>{RACES.length - watchedData.length} Remaining</span>
          </div>
        </div>
      </div>

      <h2 className="text-[28px] font-bold font-hero text-[var(--text-primary)] mb-6">Watched Races</h2>

      {watchedData.length === 0 ? (
        <div className="py-24 text-center flex flex-col items-center border border-[var(--border-color)] rounded-[8px] bg-[var(--bg-secondary)] p-12">
          <h2 className="text-[28px] font-bold font-hero text-[var(--text-primary)] mb-3">No Races Logged</h2>
          <p className="text-[16px] text-[var(--color-track-gray)] font-normal max-w-md mb-8">
            You haven't marked any 2026 races as watched yet.
          </p>
          <Link to="/calendar" className="btn-primary group">
            Browse Calendar <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchedData.map((race) => (
            <div key={race.id} className="glass-card p-5 flex items-center justify-between">
              <div>
                <h4 className="text-[18px] font-bold text-[var(--text-primary)] mb-1">{race.circuit}</h4>
                <div className="text-[14px] text-[var(--color-track-gray)]">{race.country}</div>
              </div>
              <CheckCircle size={24} className="text-[var(--color-neon-green)]" />
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
