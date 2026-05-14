/**
 * PITLANE — 4D Reactive Race Card
 * =================================
 * Visual brief: collectible, alive, cinematic.
 *
 * PHYSICS:
 *  - 3D mouse-tracking tilt via GSAP (zero re-renders)
 *  - Specular glare sweep (acrylic + carbon)
 *  - Telemetry Green glow OR Championship Yellow energy pulse
 *  - Image parallax inside card on hover
 *  - Scroll-triggered entrance via ScrollTrigger
 *
 * ASSET SYSTEM:
 *  - getRaceImage() resolves local /src/assets/races/ first
 *  - onError transparently falls back to curated Unsplash URL
 *  - Cinematic CSS placeholder for completely missing paths
 *
 * FLIP COMPATIBLE:
 *  - data-flip-id on outer wrapper for Garage / Calendar Flip animations
 */

import { useRef, useCallback, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { Heart, MapPin, ChevronRight, Activity, Zap } from 'lucide-react'
import { useF1Context } from '../context/f1-context'
import { getRaceImage } from '../lib/race-assets'

gsap.registerPlugin(ScrollTrigger)

const TILT_MAX    = 15
const SCALE_HOVER = 1.03
const GLOW_G      = 'rgba(57,255,136,'
const GLOW_Y      = 'rgba(255,214,10,'

export default function RaceCard({ race, index = 0 }) {
  const outerRef = useRef()
  const innerRef = useRef()
  const glareRef = useRef()
  const imgRef   = useRef()
  const [imgErr, setImgErr] = useState(false)

  const { favorites, toggleFavorite } = useF1Context()
  const isFav   = favorites.includes(race.id)
  const isSprint = race.isSprint
  const glowC   = isSprint ? GLOW_Y : GLOW_G

  const { src: imgSrc, fallback: imgFallback } = getRaceImage(race.id)

  /* ── ScrollTrigger entrance ─────────────────────────────── */
  useGSAP(() => {
    gsap.fromTo(outerRef.current,
      { y: 80, opacity: 0, scale: 0.91 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1.1,
        ease: 'power4.out',
        delay: index * 0.07,
        scrollTrigger: { trigger: outerRef.current, start: 'top 90%' },
      }
    )
  }, { scope: outerRef })

  /* ── Mouse physics ──────────────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    const rect = innerRef.current.getBoundingClientRect()
    const cx   = rect.left + rect.width / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) / (rect.width  / 2)
    const dy   = (e.clientY - cy) / (rect.height / 2)
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy) / Math.SQRT2, 1)

    // 3D tilt + glow
    gsap.to(innerRef.current, {
      rotateX:  -dy * TILT_MAX,
      rotateY:   dx * TILT_MAX,
      scale:     SCALE_HOVER,
      boxShadow: `0 0 ${18 + (1-dist)*38}px ${glowC}${0.25 + (1-dist)*0.5}), 0 28px 70px rgba(0,0,0,0.6)`,
      transformPerspective: 1000,
      duration: 0.22,
      ease: 'power2.out',
    })

    // Specular glare
    const gx = ((e.clientX - rect.left) / rect.width)  * 100
    const gy = ((e.clientY - rect.top)  / rect.height) * 100
    const accent = isSprint ? 'rgba(255,214,10,0.08)' : 'rgba(57,255,136,0.07)'
    glareRef.current.style.background =
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14) 0%, ${accent} 35%, transparent 65%)`
    glareRef.current.style.opacity = '1'

    // Image micro-parallax
    gsap.to(imgRef.current, { x: dx * -7, y: dy * -6, scale: 1.08, duration: 0.5, ease: 'power2.out' })
  }, [glowC, isSprint])

  const handleMouseLeave = useCallback(() => {
    gsap.to(innerRef.current, {
      rotateX: 0, rotateY: 0, scale: 1,
      boxShadow: '0 0 0px rgba(0,0,0,0), 0 10px 40px rgba(0,0,0,0.4)',
      duration: 0.65,
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
        className={isSprint ? 'animate-energy-pulse' : ''}
        style={{
          background: 'rgba(11,11,11,0.42)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${isSprint ? 'rgba(255,214,10,0.2)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          transformStyle: 'preserve-3d',
          willChange: 'transform, box-shadow',
        }}
      >
        {/* Specular glare overlay */}
        <div ref={glareRef} style={{
          position: 'absolute', inset: 0, zIndex: 10, opacity: 0,
          pointerEvents: 'none', transition: 'opacity 0.3s ease', borderRadius: 'inherit',
        }} />

        {/* ── TOP 70% — Cinematic Race Visual ─────────────── */}
        <div style={{ position: 'relative', height: '245px', overflow: 'hidden' }}>
          {/* Dark gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'linear-gradient(170deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.58) 100%)',
          }} />

          {imgErr ? (
            /* CSS Cinematic Placeholder */
            <div className="w-full h-full carbon-fiber flex flex-col items-center justify-center gap-3"
              style={{ background: 'linear-gradient(135deg,#0d0d0d 0%,#060606 100%)' }}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,136,0.05)_0%,transparent_70%)]" />
              <Zap size={28} className="text-[#FFD60A]/60 animate-glow-breathe z-10" />
              <span className="data-label text-[#FFD60A]/50 tracking-[0.3em] z-10">TRACK DATA LOADING</span>
            </div>
          ) : (
            <img
              ref={imgRef}
              src={imgSrc}
              alt={race.name}
              onError={(e) => {
                e.currentTarget.src = imgFallback
                e.currentTarget.onerror = () => setImgErr(true)
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center', willChange: 'transform' }}
            />
          )}

          {/* Country badge */}
          <div style={{
            position: 'absolute', top: 14, left: 14, zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(11,11,11,0.6)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999, padding: '5px 12px',
          }}>
            <MapPin size={10} color="#FFD60A" />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
              {race.country}
            </span>
          </div>

          {/* Sprint badge */}
          {isSprint && (
            <div style={{
              position: 'absolute', top: 14, right: 52, zIndex: 20,
              background: 'rgba(255,214,10,0.93)', color: '#050505',
              fontSize: 8, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '4px 9px', borderRadius: 6,
            }}>
              ⚡ SPRINT
            </div>
          )}

          {/* Favourite */}
          <button
            onClick={() => toggleFavorite(race.id)}
            style={{
              position: 'absolute', top: 12, right: 12, zIndex: 20, padding: 8,
              borderRadius: '50%', background: 'rgba(11,11,11,0.6)',
              backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Heart size={15} style={{
              fill: isFav ? '#39FF88' : 'transparent',
              color: isFav ? '#39FF88' : 'rgba(255,255,255,0.4)',
            }} />
          </button>
        </div>

        {/* ── BOTTOM 30% — Glassmorphic Info Panel ─────────── */}
        <div style={{ padding: '20px 22px 22px', transformStyle: 'preserve-3d' }}>
          <div className="data-label" style={{ marginBottom: 6 }}>{race.circuit}</div>
          <h3 className="hero-text" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', color: '#fff', lineHeight: 1.1, marginBottom: 4 }}>
            {race.name}
          </h3>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', fontWeight: 500, marginBottom: 18 }}>
            {new Date(race.date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {[{ l: 'Laps', v: race.laps }, { l: 'Length', v: race.length }].map(({ l, v }) => (
              <div key={l} style={{ flex: 1, textAlign: 'center', padding: '9px 0', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <div className="data-label" style={{ marginBottom: 4 }}>{l}</div>
                <div className="hero-text" style={{ fontSize: '1.1rem', color: '#fff' }}>{v}</div>
              </div>
            ))}
          </div>

          <Link
            to={`/calendar/${race.id}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '11px 16px', borderRadius: 12,
              background: isSprint ? 'rgba(255,214,10,0.08)' : 'rgba(57,255,136,0.08)',
              border: isSprint ? '1px solid rgba(255,214,10,0.22)' : '1px solid rgba(57,255,136,0.22)',
              textDecoration: 'none', transition: 'all 0.25s ease',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: isSprint ? '#FFD60A' : '#39FF88' }}>
              {isSprint ? <Zap size={12} /> : <Activity size={12} />} Race Details
            </span>
            <ChevronRight size={14} color={isSprint ? '#FFD60A' : '#39FF88'} />
          </Link>
        </div>
      </div>
    </div>
  )
}
