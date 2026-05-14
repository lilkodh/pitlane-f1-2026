/**
 * PITLANE — Race Detail Page
 * ============================
 * Design System 1.0
 */

import { useParams, Link } from 'react-router'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowLeft, CheckCircle, Calendar, Flag, MapPin, Activity } from 'lucide-react'
import { RACES } from '../data/races'
import { useF1Context } from '../context/f1-context'
import { getRaceImage } from '../lib/race-assets'

export default function RaceDetailPage() {
  const { raceId } = useParams()
  const race = RACES.find(r => r.id === raceId)
  const containerRef = useRef()
  const { watchedRaces, toggleWatched } = useF1Context()
  
  if (!race) return <div className="p-12 text-center text-[var(--text-primary)]">Race not found</div>

  const isWatched = watchedRaces.includes(race.id)
  const { src } = getRaceImage(race.id)

  useGSAP(() => {
    gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="pb-24">
      
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-12 pt-[80px]">
        <div className="absolute inset-0 z-0">
          <img src={src} alt={race.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-[var(--bg-primary)]/40" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-6">
          <Link to="/calendar" className="inline-flex items-center gap-2 text-[14px] text-[var(--color-track-gray)] hover:text-[var(--text-primary)] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Calendar
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[24px] leading-none">{race.country === 'Great Britain' ? '🇬🇧' : race.country === 'Italy' ? '🇮🇹' : '🏁'}</span>
                <span className="text-[13px] font-bold tracking-[0.5px] text-[var(--color-racing-red)] uppercase">
                  Round {RACES.findIndex(r => r.id === race.id) + 1}
                </span>
              </div>
              <h1 className="text-[40px] md:text-[56px] font-bold font-hero leading-[1.1] tracking-[-0.5px] text-[var(--text-primary)] mb-2">
                {race.name}
              </h1>
              <div className="text-[20px] text-[var(--color-track-gray)]">{race.circuit}</div>
            </div>

            <button
              onClick={() => toggleWatched(race.id)}
              className="flex items-center gap-2 px-6 py-3 rounded-[4px] font-bold text-[14px] transition-all"
              style={{
                background: isWatched ? 'transparent' : 'var(--color-racing-red)',
                border: `2px solid ${isWatched ? 'var(--color-neon-green)' : 'var(--color-racing-red)'}`,
                color: isWatched ? 'var(--color-neon-green)' : 'var(--color-platinum-silver)'
              }}
            >
              <CheckCircle size={18} />
              {isWatched ? 'Race Logged' : 'Mark as Watched'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-[28px] font-bold font-hero text-[var(--text-primary)] mb-4">Circuit Overview</h2>
            <p className="text-[16px] leading-[1.6] text-[var(--color-track-gray)]">
              Welcome to the {race.name}, held at the iconic {race.circuit} in {race.country}. 
              As part of the highly anticipated 2026 World Championship, this event features the new active aerodynamics 
              and 100% sustainable fuels. 
            </p>
          </section>

          <section>
            <h2 className="text-[28px] font-bold font-hero text-[var(--text-primary)] mb-4">Weekend Schedule</h2>
            <div className="glass-card overflow-hidden">
              {[
                { s: 'Practice 1', d: 'Friday' },
                { s: race.isSprint ? 'Sprint Quali' : 'Practice 2', d: 'Friday' },
                { s: race.isSprint ? 'Sprint Race' : 'Practice 3', d: 'Saturday' },
                { s: 'Qualifying', d: 'Saturday' },
                { s: 'Grand Prix', d: 'Sunday' }
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-[var(--border-color)] last:border-0">
                  <div className="font-bold text-[var(--text-primary)]">{session.s}</div>
                  <div className="text-[var(--color-track-gray)]">{session.d}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-[20px] font-bold font-hero text-[var(--text-primary)] mb-6">Race Data</h3>
            
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Calendar className="text-[var(--color-track-gray)]" size={24} />
                <div>
                  <div className="data-label">Date</div>
                  <div className="text-[16px] font-bold text-[var(--text-primary)]">
                    {new Date(race.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Activity className="text-[var(--color-track-gray)]" size={24} />
                <div>
                  <div className="data-label">Laps</div>
                  <div className="text-[16px] font-bold text-[var(--text-primary)]">{race.laps}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-[var(--color-track-gray)]" size={24} />
                <div>
                  <div className="data-label">Circuit Length</div>
                  <div className="text-[16px] font-bold text-[var(--text-primary)]">{race.length}</div>
                </div>
              </div>

              {race.isSprint && (
                <div className="mt-4 p-3 rounded bg-[var(--color-gold)] text-[var(--color-midnight-black)] font-bold text-[14px] flex items-center justify-center gap-2">
                  <Flag size={16} /> Sprint Weekend
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
