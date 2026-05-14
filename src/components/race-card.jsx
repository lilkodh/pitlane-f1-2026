/**
 * PITLANE — 4D Reactive Race Card System
 * ========================================
 * Digital Artistry Level: 2026 Engineering
 *
 * Each card is a high-tech collectible, simulating real-world physics:
 *  - 3D mouse-tracking tilt via GSAP.
 *  - Specular highlight sweeps across the glass surface.
 *  - Telemetry Green glow for standard races.
 *  - Championship Yellow energy pulse for Sprint weekends.
 */

import { useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { Heart, MapPin, ChevronRight, Activity, Zap } from 'lucide-react'
import { useF1Context } from '../context/f1-context'
import { getRaceImage } from '../lib/race-assets'

gsap.registerPlugin(ScrollTrigger)

const TILT_MAX_DEG  = 16
const SCALE_HOVER   = 1.035
const GLOW_GREEN    = 'rgba(57,255,136,'
const GLOW_YELLOW   = 'rgba(255,214,10,'

export default function RaceCard({ race, index = 0 }) {
  const outerRef = useRef()
  const innerRef = useRef()
  const glareRef = useRef()
  const imgRef   = useRef()

  const { favorites, toggleFavorite } = useF1Context()
  const isFav = favorites.includes(race.id)
  const glowColor = race.isSprint ? GLOW_YELLOW : GLOW_GREEN

  // Resolve local asset or cinematic fallback
  const { src: imgSrc, fallback: imgFallback } = getRaceImage(race.id)

  useGSAP(() => {
    gsap.fromTo(
      outerRef.current,
      { y: 70, opacity: 0, scale: 0.92 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1.0,
        ease: 'power4.out',
        delay: index * 0.07,
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top 90%',
        },
      }
    )
  }, { scope: outerRef })

  const handleMouseMove = useCallback((e) => {
    const rect = innerRef.current.getBoundingClientRect()
    const cx   = rect.left + rect.width / 2
    const cy   = rect.top + rect.height / 2
    const dx   = (e.clientX - cx) / (rect.width / 2)
    const dy   = (e.clientY - cy) / (rect.height / 2)
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy) / Math.SQRT2, 1)

    // Physics tilt + breathing glow
    gsap.to(innerRef.current, {
      rotateX: -dy * TILT_MAX_DEG,
      rotateY: dx * TILT_MAX_DEG,
      scale: SCALE_HOVER,
      boxShadow: `0 0 ${20 + (1 - dist) * 35}px ${glowColor}${0.3 + (1 - dist) * 0.45}), 0 24px 60px rgba(0,0,0,0.55)`,
      transformPerspective: 1000,
      duration: 0.25,
      ease: 'power2.out',
    })

    // Specular acrylic glare
    const gx = ((e.clientX - rect.left) / rect.width) * 100
    const gy = ((e.clientY - rect.top) / rect.height) * 100
    const accentRaw = race.isSprint ? 'rgba(255,214,10,0.08)' : 'rgba(57,255,136,0.07)'
    glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15) 0%, ${accentRaw} 35%, transparent 65%)`
    glareRef.current.style.opacity = '1'

    gsap.to(imgRef.current, { x: dx * -7, y: dy * -7, scale: 1.07, duration: 0.5, ease: 'power2.out' })
  }, [glowColor, race.isSprint])

  const handleMouseLeave = useCallback(() => {
    gsap.to(innerRef.current, {
      rotateX: 0, rotateY: 0, scale: 1,
      boxShadow: '0 0 0px rgba(0,0,0,0), 0 8px 32px rgba(0,0,0,0.4)',
      duration: 0.7,
      ease: 'expo.out',
    })
    glareRef.current.style.opacity = '0'
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'expo.out' })
  }, [])

  return (
    <div ref={outerRef} data-flip-id={race.id} style={{ perspective: '1100px' }}>
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'rgba(11,11,11,0.40)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          transformStyle: 'preserve-3d',
          willChange: 'transform, box-shadow',
        }}
      >
        <div
          ref={glareRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            opacity: 0, pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
            borderRadius: 'inherit',
          }}
        />

        {/* ════ TOP 70% — The Visual ═══════════════════════════ */}
        <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'linear-gradient(175deg,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0.55) 100%)',
          }} />

          <img
            ref={imgRef}
            src={imgSrc}
            alt={race.name}
            onError={(e) => { e.currentTarget.src = imgFallback }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center' }}
          />

          <div style={{
            position: 'absolute', top: 14, left: 14, zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(11,11,11,0.55)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 9999, padding: '5px 12px',
          }}>
            <MapPin size={10} color="#FFD60A" />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
              {race.country}
            </span>
          </div>

          {race.isSprint && (
            <div style={{
              position: 'absolute', top: 14, right: 52, zIndex: 20,
              background: 'rgba(255,214,10,0.92)', color: '#050505',
              fontSize: 8, fontWeight: 900, letterSpacing: '0.2em',
              textTransform: 'uppercase', padding: '4px 8px', borderRadius: 6,
            }}>
              ⚡ Sprint
            </div>
          )}

          <button
            onClick={() => toggleFavorite(race.id)}
            style={{
              position: 'absolute', top: 12, right: 12, zIndex: 20,
              padding: 8, borderRadius: '50%',
              background: 'rgba(11,11,11,0.55)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Heart size={15} style={{ fill: isFav ? '#39FF88' : 'transparent', color: isFav ? '#39FF88' : 'rgba(255,255,255,0.4)' }} />
          </button>
        </div>

        {/* ════ BOTTOM 30% — Glassmorphic Info Panel ══════════ */}
        <div style={{ padding: '20px 22px 22px', transformStyle: 'preserve-3d', background: 'rgba(11,11,11,0.4)' }}>
          <div className="data-label" style={{ marginBottom: 6 }}>{race.circuit}</div>
          <h3 className="hero-text" style={{ fontSize: 'clamp(1rem,2.2vw,1.35rem)', color: '#fff', lineHeight: 1.1, marginBottom: 4 }}>
            {race.name}
          </h3>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginBottom: 18 }}>
            {new Date(race.date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Laps', value: race.laps },
              { label: 'Length', value: race.length },
            ].map(({ label, value }) => (
              <div key={label} style={{ flex: 1, textAlign: 'center', padding: '10px 0', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <div className="data-label" style={{ marginBottom: 4 }}>{label}</div>
                <div className="hero-text" style={{ fontSize: '1.1rem', color: '#fff' }}>{value}</div>
              </div>
            ))}
          </div>
          <Link
            to={`/calendar/${race.id}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '12px 16px', borderRadius: 12,
              background: race.isSprint ? 'rgba(255,214,10,0.08)' : 'rgba(57,255,136,0.08)',
              border: race.isSprint ? '1px solid rgba(255,214,10,0.22)' : '1px solid rgba(57,255,136,0.22)',
              textDecoration: 'none', transition: 'background 0.3s ease',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: race.isSprint ? '#FFD60A' : '#39FF88' }}>
              {race.isSprint ? <Zap size={12} /> : <Activity size={12} />} Race Details
            </span>
            <ChevronRight size={14} color={race.isSprint ? '#FFD60A' : '#39FF88'} />
          </Link>
        </div>
      </div>
    </div>
  )
}
