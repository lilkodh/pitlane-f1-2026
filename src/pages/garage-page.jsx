/**
 * PITLANE — Garage Page  /mygarage
 * User's personal collection of saved/favorited races.
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router'
import { Trophy, ArrowRight, Heart } from 'lucide-react'
import { usePitlaneStore } from '../stores/pitlane-store'
import { RACES } from '../data/races'
import RaceCard from '../components/race-card'

export default function GaragePage() {
  const containerRef = useRef()
  const headerRef    = useRef()
  const emptyRef     = useRef()

  const { favorites } = usePitlaneStore()
  const favoriteRaces = RACES.filter(race => favorites.includes(race.id))

  useGSAP(() => {
    gsap.from(headerRef.current, { x: -60, opacity: 0, duration: 1.2, ease: 'expo.out' })
    if (emptyRef.current) {
      gsap.to(emptyRef.current, { y: -12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }
  }, { scope: containerRef, dependencies: [favorites.length] })

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen pt-[72px] px-6 lg:px-12 pb-32 max-w-screen-xl mx-auto">

      {/* Header */}
      <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-16 pb-12 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Trophy size={14} className="text-[#39FF88]" />
            <span className="data-label text-[#39FF88]">Personal Collection</span>
          </div>
          <h1 className="hero-text text-5xl md:text-7xl text-white">
            My <span className="text-[#39FF88]">Garage</span>
          </h1>
          <p className="text-white/40 text-lg mt-4 max-w-xl font-medium">
            Your curated collection of must-watch race weekends for the 2026 season.
          </p>
        </div>

        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl"
          style={{ background: 'rgba(57,255,136,0.08)', border: '1px solid rgba(57,255,136,0.2)' }}>
          <div className="w-10 h-10 rounded-xl bg-[#39FF88]/15 flex items-center justify-center">
            <Heart size={18} className="text-[#39FF88]" />
          </div>
          <div>
            <div className="data-label mb-0.5">Saved Circuits</div>
            <div className="text-3xl font-hero font-black text-white">
              {favoriteRaces.length}
              <span className="text-base font-body font-medium text-white/25 ml-2">/ {RACES.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {favoriteRaces.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 gap-8 text-center">
          <div ref={emptyRef} className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl"
            style={{ background: 'rgba(57,255,136,0.07)', border: '1px solid rgba(57,255,136,0.15)' }}>
            🏎️
          </div>
          <div>
            <h2 className="text-3xl font-hero font-black text-white mb-3">Garage is Empty</h2>
            <p className="text-white/35 text-base max-w-sm">
              Browse the 2026 calendar and tap the heart on any circuit to add it here.
            </p>
          </div>
          <Link to="/calendar" className="btn-primary gap-2">
            Browse Calendar <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Card Grid */}
      {favoriteRaces.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteRaces.map((race, index) => (
            <RaceCard key={race.id} race={race} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
