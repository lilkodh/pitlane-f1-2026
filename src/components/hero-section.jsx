/**
 * PITLANE — 8D Cinematic Hero Section
 * =====================================
 * The visual centrepiece of the experience.
 *
 * 5-LAYER SPATIAL ARCHITECTURE:
 *  Layer 1 — Background Atmosphere  → handled by <Background8D />
 *  Layer 2 — The Car Render         → gigantic img that parallax-scrolls
 *  Layer 3 — Motion & Energy FX     → telemetry scan lines, speed streaks
 *  Layer 4 — Spatial Typography     → letter-by-letter GSAP SplitText reveal
 *  Layer 5 — Glass UI Panels        → frosted countdown + telemetry HUD
 *
 * GSAP:
 *  - Letter-by-letter text reveal using character splitting
 *  - Car entrance: slide X + skew + scale with expo.out
 *  - ScrollTrigger parallax at different depths per layer
 *  - Telemetry scan line animation via CSS keyframe + GSAP trigger
 *
 * REACT NOTES:
 *  - All animation refs are scoped to containerRef via useGSAP
 *  - Countdown logic isolated in useCountdown hook
 */

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Activity, Zap, Radio, Cpu } from 'lucide-react'
import { useCountdown } from '../hooks/use-countdown'
import { RACES } from '../data/races'
import heroCar from '../assets/hero_f1_car.png'

gsap.registerPlugin(ScrollTrigger)

/* ── Utility: Split text into per-character spans ───────────── */
function splitTextToChars(text) {
  return text.split('').map((char, i) => (
    <span
      key={i}
      className="gsap-char inline-block"
      style={{ willChange: 'transform, opacity' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

/* ── Countdown digit component ──────────────────────────────── */
function CountdownDigit({ value, label }) {
  const digitRef = useRef()
  const prevValue = useRef(value)

  // Flash glow on digit change
  useEffect(() => {
    if (prevValue.current !== value && digitRef.current) {
      gsap.fromTo(
        digitRef.current,
        { textShadow: '0 0 30px #39FF88', scale: 1.1 },
        { textShadow: '0 0 0px transparent', scale: 1, duration: 0.5, ease: 'power3.out' }
      )
      prevValue.current = value
    }
  }, [value])

  return (
    <div className="flex flex-col items-center">
      <div
        ref={digitRef}
        className="text-4xl md:text-6xl font-hero font-black text-white tabular-nums w-[2.5ch] text-center"
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="data-label mt-1">{label}</div>
    </div>
  )
}

/* ── Separator ──────────────────────────────────────────────── */
function Separator() {
  return (
    <span className="text-3xl md:text-5xl font-hero font-black text-[#39FF88]/40 self-start pt-1 animate-hud-blink">:</span>
  )
}

/* ── Main Hero Section ──────────────────────────────────────── */
export default function HeroSection() {
  const containerRef   = useRef()
  const carRef         = useRef()
  const line1Ref       = useRef()
  const line2Ref       = useRef()
  const scanRef        = useRef()
  const panelsRef      = useRef()
  const badgeRef       = useRef()
  const streakRef      = useRef()

  const nextRace = RACES[0]
  const { days, hours, minutes, seconds } = useCountdown(nextRace.date)

  useGSAP(() => {
    /* ── Master entrance timeline ─────────────────────────── */
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    // Layer 2 — Car: slide in from right with aggressive skew
    gsap.set(carRef.current, { x: '60vw', scale: 0.75, skewX: 8, opacity: 0 })
    tl.to(carRef.current, {
      x: 0,
      scale: 1,
      skewX: 0,
      opacity: 1,
      duration: 2,
      ease: 'power4.out',
    }, 0.2)

    // Layer 4 — Background ghost text
    if (line1Ref.current) {
      const chars1 = line1Ref.current.querySelectorAll('.gsap-char')
      gsap.set(chars1, { y: 120, opacity: 0, rotationX: -80 })
      tl.to(chars1, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.4,
        stagger: 0.025,
        ease: 'expo.out',
      }, 0.1)
    }

    if (line2Ref.current) {
      const chars2 = line2Ref.current.querySelectorAll('.gsap-char')
      gsap.set(chars2, { y: 120, opacity: 0, rotationX: -80 })
      tl.to(chars2, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.4,
        stagger: 0.025,
        ease: 'expo.out',
      }, 0.25)
    }

    // Badge + scan line + panels fade in
    gsap.set([badgeRef.current, scanRef.current, panelsRef.current], { opacity: 0, y: 30 })
    tl.to([badgeRef.current, scanRef.current], { opacity: 1, y: 0, duration: 1 }, 0.8)
    tl.to(panelsRef.current, { opacity: 1, y: 0, duration: 1 }, 1.0)

    // Streak line animation
    gsap.set(streakRef.current, { scaleX: 0, transformOrigin: 'left center' })
    tl.to(streakRef.current, { scaleX: 1, duration: 1.5, ease: 'expo.out' }, 0.6)

    /* ── ScrollTrigger parallax (8D depth) ─────────────────── */
    const pin = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100%',
      pin: false,
    })

    // Background text moves fastest (furthest layer)
    gsap.to(line1Ref.current, {
      y: -280,
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 0.4 },
    })

    // Car moves at medium speed
    gsap.to(carRef.current, {
      y: -160,
      scale: 1.15,
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
    })

    // Foreground text (slowest)
    gsap.to(line2Ref.current, {
      y: -80,
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 0.2 },
    })

    // Glass panels float up on scroll
    gsap.to(panelsRef.current, {
      y: -200,
      opacity: 0.6,
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
    })

    return () => pin.kill()
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-[72px]">

      {/* ══════════════════════════════════════════════════════
          LAYER 4a — Ghost Background Typography
          Sits far behind the car via z-index + massive size
      ══════════════════════════════════════════════════════ */}
      <div ref={line1Ref} className="absolute z-[5] inset-0 flex items-center justify-center pointer-events-none select-none" style={{ perspective: '800px' }}>
        <h2
          className="hero-text whitespace-nowrap text-[clamp(6rem,15vw,15rem)] text-transparent"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.06)' }}
        >
          {splitTextToChars('WORLD CHAMPIONSHIP')}
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 2 — The Car Render
          Massive, bleeding off-screen, mix-blend-screen so it
          sits naturally against the dark background glow
      ══════════════════════════════════════════════════════ */}
      <div className="absolute z-[15] inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: 'translateY(8%)' }}
      >
        <img
          ref={carRef}
          src={heroCar}
          alt="Formula 1 2026 Car"
          className="w-[160vw] md:w-[130vw] lg:w-[95vw] max-w-none object-contain"
          style={{
            mixBlendMode: 'screen',
            filter: 'drop-shadow(0 0 60px rgba(57,255,136,0.18)) drop-shadow(0 0 120px rgba(57,255,136,0.08))',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 3 — Motion & Energy FX
          Telemetry scan line + horizontal speed streak
      ══════════════════════════════════════════════════════ */}
      <div ref={scanRef} className="absolute z-[20] inset-0 pointer-events-none">
        {/* Horizontal telemetry laser line */}
        <div
          ref={streakRef}
          className="absolute top-[52%] left-0 w-full"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #39FF88 30%, #39FF88 70%, transparent 100%)',
            boxShadow: '0 0 12px 2px rgba(57,255,136,0.5)',
            opacity: 0.6,
          }}
        />
        {/* Vertical HUD scan line (CSS animation) */}
        <div className="animate-scanline absolute top-0 left-[15%] w-[1px] h-screen bg-gradient-to-b from-transparent via-[#39FF88]/20 to-transparent opacity-40" />
        <div className="animate-scanline absolute top-0 right-[22%] w-[1px] h-screen bg-gradient-to-b from-transparent via-[#FFD60A]/15 to-transparent opacity-30" style={{ animationDelay: '2s' }} />
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 4b — Foreground Spatial Typography
          Text overlaps / goes in front of the car (higher z)
      ══════════════════════════════════════════════════════ */}
      <div
        ref={line2Ref}
        className="absolute z-[25] pointer-events-none select-none"
        style={{ top: '14%', left: '50%', transform: 'translateX(-50%)', perspective: '1200px' }}
      >
        <h1 className="hero-text text-[clamp(5rem,11vw,11rem)] whitespace-nowrap text-center">
          <span className="text-white">{splitTextToChars('Formula')}&nbsp;</span>
          <span className="text-[#FFD60A]">{splitTextToChars('2026')}</span>
        </h1>
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 5 — Glass UI Panels
          Bottom HUD strip: telemetry + countdown + CTA
      ══════════════════════════════════════════════════════ */}
      <div
        ref={panelsRef}
        className="absolute z-[30] bottom-0 left-0 right-0 pb-8 px-6 lg:px-12"
      >
        {/* Top badge */}
        <div ref={badgeRef} className="flex justify-center mb-6">
          <div className="glass-card inline-flex items-center gap-3 px-5 py-2.5 rounded-full border-[#39FF88]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/70">2026 Season — Inaugural World Championship</span>
          </div>
        </div>

        {/* Panel row */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch max-w-screen-xl mx-auto">

          {/* Left: Live Telemetry */}
          <div className="glass-card rounded-2xl px-6 py-5 flex items-center gap-8 lg:min-w-[280px] border-[#39FF88]/15">
            <div className="flex items-center gap-2 text-[#39FF88]">
              <Activity size={16} className="animate-pulse" />
              <span className="data-label text-[#39FF88]">Telemetry</span>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="data-label mb-1">V-Max</div>
                <div className="text-2xl font-hero font-black text-white">352<span className="text-xs text-white/30 ml-1 font-body font-medium">KM/H</span></div>
              </div>
              <div>
                <div className="data-label mb-1">G-Force</div>
                <div className="text-2xl font-hero font-black text-white">4.3<span className="text-xs text-white/30 ml-1 font-body font-medium">G</span></div>
              </div>
              <div>
                <div className="data-label mb-1">ERS</div>
                <div className="text-2xl font-hero font-black text-[#39FF88]">ON</div>
              </div>
            </div>
          </div>

          {/* Centre: Countdown */}
          <div className="glass-card rounded-2xl px-6 py-5 flex-1 flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Hover light sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex items-center gap-2 text-[#FFD60A] mb-4">
              <Zap size={14} />
              <span className="data-label text-[#FFD60A]">Next GP — {nextRace.name}</span>
              <Zap size={14} />
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <CountdownDigit value={days}    label="Days"    />
              <Separator />
              <CountdownDigit value={hours}   label="Hours"   />
              <Separator />
              <CountdownDigit value={minutes} label="Min"     />
              <Separator />
              <CountdownDigit value={seconds} label="Sec"     />
            </div>
          </div>

          {/* Right: System status + CTA */}
          <div className="glass-card rounded-2xl px-6 py-5 flex flex-col justify-between gap-4 lg:min-w-[260px]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/30 uppercase">
                <Radio size={11} className="text-[#39FF88] animate-pulse" /> Systems Nominal
              </div>
              <div className="ml-auto flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/30 uppercase">
                <Cpu size={11} className="text-[#FFD60A]" /> 2026 Calendar Ready
              </div>
            </div>
            <button className="btn-primary w-full justify-center gap-2 group">
              <span>Enter Control Center</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

    </section>
  )
}
