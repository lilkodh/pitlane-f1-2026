/**
 * PITLANE — Garage Page  /mygarage
 * ==================================
 * Design System 1.0
 */

import { useRef, useLayoutEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { useF1Context } from '../context/f1-context'
import { RACES } from '../data/races'
import RaceCard from '../components/race-card'

gsap.registerPlugin(Flip)

export default function GaragePage() {
  const containerRef = useRef()
  const gridRef      = useRef()

  const { favorites } = useF1Context()
  const favoriteRaces = RACES.filter(race => favorites.includes(race.id))

  useGSAP(() => {
    gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
  }, { scope: containerRef })

  useLayoutEffect(() => {
    if (!gridRef.current || favoriteRaces.length === 0) return
    const state = Flip.getState('[data-flip-id]', { props: 'opacity' })
    Flip.from(state, {
      duration: 0.6,
      ease: 'power2.inOut',
      stagger: 0.05,
      absolute: true,
      onLeave: els => gsap.to(els, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' }),
      onEnter: els => gsap.fromTo(els, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }),
    })
  }, [favorites.length])

  return (
    <div ref={containerRef} className="pt-[80px] px-4 md:px-6 pb-24 max-w-[1200px] mx-auto min-h-screen">

      <div className="mb-12">
        <div className="text-[13px] font-bold tracking-[0.5px] text-[var(--color-racing-red)] uppercase mb-2">
          PERSONAL COLLECTION
        </div>
        <h1 className="text-[36px] md:text-[48px] font-bold font-hero leading-[1.2] tracking-[-0.5px] text-[var(--text-primary)] mb-4">
          My Garage
        </h1>
        <p className="text-[18px] leading-[1.6] text-[var(--color-track-gray)] max-w-2xl font-normal">
          Your curated collection of saved circuits. Tap the heart icon on any race card to add or remove it from your garage.
        </p>
      </div>

      {favoriteRaces.length === 0 ? (
        <div className="py-24 text-center flex flex-col items-center border border-[var(--border-color)] rounded-[8px] bg-[var(--bg-secondary)] p-12">
          <h2 className="text-[28px] font-bold font-hero text-[var(--text-primary)] mb-3">Garage is Empty</h2>
          <p className="text-[16px] text-[var(--color-track-gray)] font-normal max-w-md mb-8">
            Browse the 2026 calendar and save your favorite circuits to build your personal collection.
          </p>
          <Link to="/calendar" className="btn-primary group">
            Browse Calendar <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {favoriteRaces.map((race, index) => (
            <RaceCard key={race.id} race={race} index={index} />
          ))}
        </div>
      )}

    </div>
  )
}
