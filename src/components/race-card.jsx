/**
 * PITLANE — 4D Race Card with Mouse-Tracking Tilt + Glare Physics
 * =================================================================
 * Each card is a complete interactive physics object.
 *
 * INTERACTIONS:
 *  1. Mouse-tracking 3D perspective tilt on X and Y axes
 *  2. Specular glare highlight sweeps across glass surface
 *     as a radial gradient that moves with the cursor
 *  3. Telemetry Green box-shadow glow that intensifies with
 *     cursor proximity (calculated from card center distance)
 *  4. GSAP ScrollTrigger entrance reveal
 *
 * GLASSMORPHISM SPEC:
 *  - Background: rgba(11, 11, 11, 0.4)
 *  - Backdrop blur: 24px
 *  - Border: 1px solid rgba(255, 255, 255, 0.1)
 *
 * REACT NOTES:
 *  - Mouse math done in handleMouseMove, values stored in useRef
 *    to avoid re-renders on every mouse event
 *  - GSAP handles the actual DOM transforms — no useState for physics
 */

import { useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { Heart, MapPin, ChevronRight, Activity } from 'lucide-react'
import { usePitlaneStore } from '../stores/pitlane-store'

gsap.registerPlugin(ScrollTrigger)

/* ── Config: how extreme the tilt effect feels ──────────────── */
const TILT_MAX_DEG  = 18    // maximum degrees of tilt
const GLOW_BASE     = 0     // base glow (px) when cursor is far
const GLOW_MAX      = 40    // max glow radius when cursor is near
const SCALE_HOVER   = 1.04  // card scale on hover

export default function RaceCard({ race, index = 0 }) {
  const cardRef  = useRef()   // outer wrapper (gets GSAP ScrollTrigger)
  const innerRef = useRef()   // inner card (gets 3D tilt transform)
  const glareRef = useRef()   // glare highlight element
  const imgRef   = useRef()   // photo (subtle zoom on hover)

  const { favorites, toggleFavorite } = usePitlaneStore()
  const isFavorite = favorites.includes(race.id)

  /* ── ScrollTrigger entrance reveal ─────────────────────────── */
  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 80, opacity: 0, scale: 0.94 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1,
        ease: 'power4.out',
        delay: index * 0.12,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
        },
      }
    )
  }, { scope: cardRef })

  /* ── 3D Tilt physics ────────────────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    const rect   = innerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width  / 2
    const centerY = rect.top  + rect.height / 2

    // Cursor offset from card centre, normalised to [-1, +1]
    const dx = (e.clientX - centerX) / (rect.width  / 2)
    const dy = (e.clientY - centerY) / (rect.height / 2)

    const rotateY =  dx * TILT_MAX_DEG   // left/right tilt
    const rotateX = -dy * TILT_MAX_DEG   // up/down tilt

    // Specular glare position (0–100%)
    const glareX = ((e.clientX - rect.left) / rect.width)  * 100
    const glareY = ((e.clientY - rect.top)  / rect.height) * 100

    // Proximity glow: distance from centre (0=centre, 1=corner)
    const dist   = Math.sqrt(dx * dx + dy * dy) / Math.SQRT2
    const glow   = GLOW_BASE + (1 - dist) * GLOW_MAX

    gsap.to(innerRef.current, {
      rotateX,
      rotateY,
      scale: SCALE_HOVER,
      transformPerspective: 900,
      boxShadow: `0 0 ${glow}px rgba(57,255,136,0.55), 0 30px 80px rgba(0,0,0,0.6)`,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Move specular glare radial gradient with cursor
    if (glareRef.current) {
      glareRef.current.style.background =
        `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, rgba(57,255,136,0.06) 30%, transparent 65%)`
      glareRef.current.style.opacity = '1'
    }

    // Subtle image zoom toward cursor
    gsap.to(imgRef.current, {
      scale: 1.06,
      x: dx * -6,
      y: dy * -6,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    gsap.to(innerRef.current, {
      rotateX: 0, rotateY: 0, scale: 1,
      boxShadow: '0 0 0px rgba(57,255,136,0), 0 10px 40px rgba(0,0,0,0.4)',
      duration: 0.6,
      ease: 'expo.out',
    })

    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }

    gsap.to(imgRef.current, {
      scale: 1, x: 0, y: 0,
      duration: 0.6,
      ease: 'expo.out',
    })
  }, [])

  return (
    <div ref={cardRef} style={{ perspective: '1200px' }}>
      {/* ── Inner card (receives 3D transforms) ─────────────── */}
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'rgba(11, 11, 11, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          willChange: 'transform, box-shadow',
          transformStyle: 'preserve-3d',
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
        }}
      >

        {/* ── Specular glare overlay ───────────────────────── */}
        <div
          ref={glareRef}
          className="pointer-events-none"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            borderRadius: 'inherit',
          }}
        />

        {/* ── Top 70%: Race photo ──────────────────────────── */}
        <div className="relative overflow-hidden" style={{ height: '240px' }}>
          <div
            className="absolute inset-0 z-10 transition-opacity duration-400"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 100%)' }}
          />
          <img
            ref={imgRef}
            src={race.image}
            alt={race.name}
            className="w-full h-full object-cover"
            style={{ willChange: 'transform', transformOrigin: 'center' }}
          />

          {/* Country badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 glass-card px-3 py-1.5 rounded-full">
            <MapPin size={11} className="text-[#FFD60A]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{race.country}</span>
          </div>

          {/* Sprint weekend badge */}
          {race.isSprint && (
            <div className="absolute bottom-4 left-4 z-20 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(255,214,10,0.9)', color: '#050505' }}>
              ⚡ Sprint
            </div>
          )}

          {/* Favorite toggle */}
          <button
            onClick={() => toggleFavorite(race.id)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full glass-card transition-transform hover:scale-110"
            aria-label="Toggle favourite"
          >
            <Heart
              size={16}
              className={isFavorite ? 'fill-[#39FF88] text-[#39FF88]' : 'text-white/50'}
            />
          </button>
        </div>

        {/* ── Bottom 30%: Info + CTA ───────────────────────── */}
        <div className="p-6" style={{ transformStyle: 'preserve-3d' }}>
          {/* Circuit name */}
          <div className="data-label mb-2">{race.circuit}</div>

          {/* Race name */}
          <h3 className="text-xl font-hero font-black text-white mb-1 leading-tight">
            {race.name}
          </h3>

          {/* Date */}
          <p className="text-sm text-white/40 font-medium mb-5">
            {new Date(race.date).toLocaleDateString(undefined, {
              weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
            })}
          </p>

          {/* Lap / length info */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 glass-card rounded-lg p-3 text-center" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="data-label mb-1">Laps</div>
              <div className="text-lg font-hero font-black text-white">{race.laps}</div>
            </div>
            <div className="flex-1 glass-card rounded-lg p-3 text-center" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="data-label mb-1">Circuit</div>
              <div className="text-lg font-hero font-black text-white">{race.length}</div>
            </div>
          </div>

          {/* CTA */}
          <Link
            to={`/calendar/${race.id}`}
            className="flex items-center justify-between w-full px-5 py-3 rounded-xl group transition-all duration-300"
            style={{
              background: 'rgba(57,255,136,0.08)',
              border: '1px solid rgba(57,255,136,0.2)',
            }}
          >
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#39FF88]">
              <Activity size={13} /> Race Details
            </span>
            <ChevronRight size={16} className="text-[#39FF88] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}
