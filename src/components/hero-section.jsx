/**
 * PITLANE — Hero Section
 * ========================
 * Design System 1.0
 */

import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { useCountdown } from '../hooks/use-countdown'
import { RACES } from '../data/races'
import { getRaceImage } from '../lib/race-assets'

export default function HeroSection() {
  const nextRace = RACES.find(r => r.id === 'aus-2026') || RACES[0]
  const { days, hours, minutes, seconds } = useCountdown(nextRace.date)
  const { src } = getRaceImage(nextRace.id)

  return (
    <section className="relative w-full h-[90vh] flex flex-col justify-center pt-[64px]">
      
      {/* Background Image + Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={src} 
          alt="Race Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Content Stack */}
        <div className="max-w-2xl">
          <div className="text-[13px] font-bold tracking-[0.5px] text-[var(--color-racing-red)] uppercase mb-4">
            NEXT RACE — {new Date(nextRace.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          
          <h1 className="text-[48px] md:text-[64px] font-bold font-hero leading-[1.2] tracking-[-0.5px] text-[var(--text-primary)] mb-6">
            {nextRace.name}
          </h1>
          
          <p className="text-[18px] leading-[1.6] text-[var(--color-track-gray)] font-normal mb-8">
            Experience the drama of the 2026 Formula 1 World Championship. Defending champion Lando Norris faces off against the grid, with Cadillac making their highly anticipated debut.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link to={`/calendar/${nextRace.id}`} className="btn-primary group">
              Race Details
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2 font-mono text-[32px] md:text-[40px] font-bold text-[var(--color-racing-red)]">
              <span>{String(days).padStart(2, '0')}</span><span className="text-[var(--color-track-gray)]">:</span>
              <span>{String(hours).padStart(2, '0')}</span><span className="text-[var(--color-track-gray)]">:</span>
              <span>{String(minutes).padStart(2, '0')}</span><span className="text-[var(--color-track-gray)]">:</span>
              <span>{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
