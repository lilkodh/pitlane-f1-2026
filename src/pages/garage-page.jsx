/**
 * PITLANE — Garage Page  /mygarage
 * ==================================
 * Personal collection of favorited races.
 *
 * GSAP FLIP:
 *  When the user removes a card (un-hearts it), GSAP Flip captures
 *  the grid state, React removes the card, then Flip animates the
 *  remaining cards smoothly sliding into the vacated position.
 *  The exiting card scales down and fades — no jarring jump.
 *
 * STATE:
 *  - favorites array from Zustand (persisted in localStorage)
 *  - No local state needed — Zustand is the single source of truth
 */

import { useRef, useLayoutEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { Link } from 'react-router'
import { Trophy, ArrowRight, Heart } from 'lucide-react'
import { usePitlaneStore } from '../stores/pitlane-store'
import { RACES } from '../data/races'
import RaceCard from '../components/race-card'

gsap.registerPlugin(Flip)

export default function GaragePage() {
  const containerRef = useRef()
  const headerRef    = useRef()
  const emptyRef     = useRef()
  const gridRef      = useRef()

  const { favorites } = usePitlaneStore()
  const favoriteRaces = RACES.filter(race => favorites.includes(race.id))

  /* ── Header entrance ────────────────────────────────────── */
  useGSAP(() => {
    gsap.from(headerRef.current, { x: -60, opacity: 0, duration: 1.2, ease: 'expo.out' })
    if (emptyRef.current) {
      gsap.to(emptyRef.current, { y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }
  }, { scope: containerRef, dependencies: [favorites.length] })

  /* ── Flip: animate grid when a card is removed ──────────── */
  useLayoutEffect(() => {
    if (!gridRef.current || favoriteRaces.length === 0) return
    const state = Flip.getState('[data-flip-id]', { props: 'opacity' })
    Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: 0.05,
      absolute: true,
      onLeave: els => gsap.to(els, {
        opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in'
      }),
      onEnter: els => gsap.fromTo(els,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
      ),
    })
  }, [favorites.length])

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen pt-[72px] px-6 lg:px-12 pb-32 max-w-screen-xl mx-auto">

      {/* ── Page Header ───────────────────────────────────── */}
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

        {/* Saved count badge */}
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

      {/* ── Empty State ───────────────────────────────────── */}
      {favoriteRaces.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 gap-8 text-center">
          <div ref={emptyRef} className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl"
            style={{ background: 'rgba(57,255,136,0.07)', border: '1px solid rgba(57,255,136,0.15)' }}>
            🏎️
          </div>
          <div>
            <h2 className="text-3xl font-hero font-black text-white mb-3">Garage is Empty</h2>
            <p className="text-white/35 text-base max-w-sm">
              Browse the 2026 calendar and tap the ♡ on any circuit card to save it here.
            </p>
          </div>
          <Link to="/calendar" className="btn-primary gap-2">
            Browse Calendar <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* ── Flip-animated Card Grid ───────────────────────── */}
      {favoriteRaces.length > 0 && (
        <>
          <p className="text-white/30 text-sm mt-8 mb-10">
            Tap the ♡ on any card to remove it from your garage. The grid will reflow smoothly.
          </p>
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {favoriteRaces.map((race, index) => (
              <RaceCard key={race.id} race={race} index={index} />
            ))}
          </div>
        </>
      )}

    </div>
  )
}
