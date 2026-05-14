/**
 * PITLANE — Season Journal Page  /myseason
 * Chronological log of watched races with progress stats.
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router'
import { BookOpen, CheckCircle, ArrowRight, ChevronRight, Trophy } from 'lucide-react'
import { usePitlaneStore } from '../stores/pitlane-store'
import { RACES } from '../data/races'

/* Progress bar component */
function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-[#39FF88] transition-all duration-700"
        style={{ width: `${pct}%`, boxShadow: '0 0 8px rgba(57,255,136,0.5)' }}
      />
    </div>
  )
}

export default function SeasonPage() {
  const containerRef = useRef()
  const headerRef    = useRef()
  const emptyRef     = useRef()

  const { watchedRaces } = usePitlaneStore()
  const watchedData = RACES.filter(r => watchedRaces.includes(r.id))
  const pct = Math.round((watchedData.length / RACES.length) * 100)

  useGSAP(() => {
    gsap.from(headerRef.current, { y: -40, opacity: 0, duration: 1.2, ease: 'expo.out' })
    gsap.from('.journal-row', {
      x: -50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.4
    })
    if (emptyRef.current) {
      gsap.to(emptyRef.current, { y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }
  }, { scope: containerRef, dependencies: [watchedRaces.length] })

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen pt-[72px] px-6 lg:px-12 pb-32 max-w-screen-xl mx-auto">

      {/* Header */}
      <div ref={headerRef} className="pt-16 pb-12 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen size={14} className="text-[#FFD60A]" />
          <span className="data-label text-[#FFD60A]">Personal Season Journal</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h1 className="hero-text text-5xl md:text-7xl text-white">
              Season <span className="text-[#FFD60A]">Journal</span>
            </h1>
            <p className="text-white/40 text-lg mt-4 max-w-xl font-medium">
              Your personal record of the 2026 championship season. Every race you've watched, logged.
            </p>
          </div>

          {/* Stat cards */}
          <div className="flex gap-4 shrink-0">
            <div className="px-5 py-4 rounded-2xl text-center"
              style={{ background: 'rgba(255,214,10,0.08)', border: '1px solid rgba(255,214,10,0.2)' }}>
              <div className="data-label text-[#FFD60A] mb-1">Watched</div>
              <div className="text-3xl font-hero font-black text-white">{watchedData.length}</div>
            </div>
            <div className="px-5 py-4 rounded-2xl text-center"
              style={{ background: 'rgba(57,255,136,0.08)', border: '1px solid rgba(57,255,136,0.2)' }}>
              <div className="data-label text-[#39FF88] mb-1">Completion</div>
              <div className="text-3xl font-hero font-black text-[#39FF88]">{pct}%</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="data-label">Season Progress</span>
            <span className="data-label">{watchedData.length} / {RACES.length} Races</span>
          </div>
          <ProgressBar value={watchedData.length} max={RACES.length} />
        </div>
      </div>

      {/* Empty State */}
      {watchedData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 gap-8 text-center">
          <div ref={emptyRef} className="w-28 h-28 rounded-3xl flex items-center justify-center"
            style={{ background: 'rgba(255,214,10,0.07)', border: '1px solid rgba(255,214,10,0.15)' }}>
            <Trophy size={48} className="text-[#FFD60A]/40" />
          </div>
          <div>
            <h2 className="text-3xl font-hero font-black text-white mb-3">No Races Logged</h2>
            <p className="text-white/35 text-base max-w-sm">
              Open any race detail page and mark it as watched to build your journal.
            </p>
          </div>
          <Link to="/calendar" className="btn-primary gap-2">
            View Calendar <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Timeline */}
      {watchedData.length > 0 && (
        <div className="mt-12 relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#39FF88]/40 via-[#FFD60A]/20 to-transparent hidden md:block" />

          <div className="flex flex-col gap-5">
            {watchedData.map((race, index) => (
              <Link
                key={race.id}
                to={`/calendar/${race.id}`}
                className="journal-row flex flex-col md:flex-row gap-5 md:gap-8 items-center group relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#39FF88] border-2 border-[#050505] z-10 shadow-[0_0_8px_rgba(57,255,136,0.8)]" />

                {/* Date stamp */}
                <div className="md:w-32 md:pl-14 shrink-0 text-xs font-bold uppercase tracking-widest text-white/30 text-center md:text-left">
                  {new Date(race.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>

                {/* Card row */}
                <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl transition-all duration-300 group-hover:bg-white/[0.03]"
                  style={{ background: 'rgba(11,11,11,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <img
                    src={race.image}
                    alt={race.name}
                    className="w-full sm:w-28 h-20 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <div className="data-label text-[#FFD60A] mb-1">{race.country}</div>
                    <h3 className="text-lg font-hero font-black text-white group-hover:text-[#39FF88] transition-colors">
                      {race.name}
                    </h3>
                    <p className="text-sm text-white/30 mt-0.5">{race.circuit}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#39FF88] bg-[#39FF88]/10 px-3 py-1.5 rounded-full border border-[#39FF88]/20">
                      <CheckCircle size={12} /> Watched
                    </div>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
