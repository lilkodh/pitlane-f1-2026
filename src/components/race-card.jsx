/**
 * PITLANE — Race Card Component
 * =================================
 * Design System 1.0
 */

import { useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { Heart } from 'lucide-react'
import { useF1Context } from '../context/f1-context'
import { getRaceImage } from '../lib/race-assets'

gsap.registerPlugin(ScrollTrigger)

// Fallback flag mapping based on country
const FLAGS = {
  'Bahrain': '🇧🇭', 'Saudi Arabia': '🇸🇦', 'Australia': '🇦🇺', 'Japan': '🇯🇵',
  'China': '🇨🇳', 'USA': '🇺🇸', 'Italy': '🇮🇹', 'Monaco': '🇲🇨', 'Spain': '🇪🇸',
  'Canada': '🇨🇦', 'Austria': '🇦🇹', 'Great Britain': '🇬🇧', 'Belgium': '🇧🇪',
  'Hungary': '🇭🇺', 'Netherlands': '🇳🇱', 'Azerbaijan': '🇦🇿', 'Singapore': '🇸🇬',
  'Mexico': '🇲🇽', 'Brazil': '🇧🇷', 'Qatar': '🇶🇦', 'UAE': '🇦🇪'
}

export default function RaceCard({ race, index = 0 }) {
  const cardRef = useRef()
  const { favorites, toggleFavorite } = useF1Context()
  
  const isFav = favorites.includes(race.id)
  const isSprint = race.isSprint
  const flag = FLAGS[race.country] || '🏁'

  const { src: imgSrc, fallback: imgFallback } = getRaceImage(race.id)

  /* ── ScrollTrigger entrance (600ms ease-out) ────────────── */
  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: index * 0.05,
        scrollTrigger: { trigger: cardRef.current, start: 'top 90%' },
      }
    )
  }, { scope: cardRef })

  return (
    <div ref={cardRef} data-flip-id={race.id}>
      <div
        className="group relative flex flex-col transition-all duration-200"
        style={{
          background: 'var(--bg-secondary)',
          border: `1px solid ${isFav ? 'var(--color-gold)' : 'var(--border-color)'}`,
          borderRadius: '8px',
          padding: '20px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Header: Flag & Favorite */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-[32px] leading-none">{flag}</div>
          <button
            onClick={() => toggleFavorite(race.id)}
            className="p-2 transition-transform duration-200 hover:scale-110"
            aria-label="Add race to favorites"
          >
            <Heart
              size={24}
              style={{
                fill: isFav ? 'var(--color-gold)' : 'transparent',
                color: isFav ? 'var(--color-gold)' : 'var(--color-track-gray)',
              }}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <h4 className="text-[20px] leading-[1.5] font-bold text-[var(--text-primary)] mb-1">
            {race.circuit}
          </h4>
          <div className="text-[14px] leading-[1.5] text-[var(--color-track-gray)] font-normal mb-2">
            {race.country}
          </div>
          
          <div className="text-[12px] leading-[1.4] tracking-[0.5px] text-[var(--color-track-gray)] mb-6">
            {new Date(race.date).toLocaleDateString(undefined, { 
              weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
            })}
          </div>

          <div className="mt-auto flex items-center justify-between">
            {/* Badge */}
            <div
              className="px-3 py-1.5 rounded-[4px] text-[12px] font-bold"
              style={{
                background: isSprint ? 'var(--color-gold)' : 'var(--color-track-gray)',
                color: isSprint ? 'var(--color-midnight-black)' : 'var(--color-platinum-silver)'
              }}
            >
              {isSprint ? 'SPRINT' : 'STANDARD'}
            </div>
            
            <Link
              to={`/calendar/${race.id}`}
              className="text-[13px] font-bold text-[var(--color-electric-blue)] hover:underline"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
