/**
 * PITLANE — Cinematic Hero Section (5-Layer 8D System)
 * ======================================================
 * The emotional center of the entire experience.
 *
 * LAYER ARCHITECTURE (z-index hierarchy):
 *  L1 z[5]  — Background atmosphere (Background8D handles this)
 *  L2 z[15] — The 2026 F1 Car: massive, partially cropped, glowing
 *  L3 z[20] — Motion effects: speed lines, HUD scan, energy streaks
 *  L4 z[25] — Typography: "THE NEW ERA" flying in from Z-axis per-char
 *  L5 z[30] — Glass UI panels: countdown, telemetry, CTA
 *
 * CAR VISUAL PHILOSOPHY:
 *  - Oversized — bleeds off-screen edges
 *  - mix-blend-screen — composites naturally against dark background
 *  - Subtle floating animation (CSS animate-float-car)
 *  - Parallax depth on scroll (GSAP ScrollTrigger)
 *  - Mouse-reactive perspective shift (clientX/Y tracking)
 *
 * GSAP ORCHESTRATION:
 *  - Characters animate from z: -1800 with stagger (z-axis fly-in)
 *  - Car: skewX + scale + opacity with power4.out deceleration
 *  - 3-speed parallax: typography fastest, car medium, panels slowest
 *  - Mouse parallax: lightweight mousemove → gsap.to with lag
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Activity, Zap, Cpu, Radio, ChevronRight } from 'lucide-react'
import { useCountdown } from '../hooks/use-countdown'
import { RACES } from '../data/races'

gsap.registerPlugin(ScrollTrigger)

/* ── Character split helper ─────────────────────────────────── */
function SplitChars({ text, className = '' }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="gsap-char inline-block"
          style={{ willChange: 'transform, opacity' }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

/* ── Rolling countdown digit ────────────────────────────────── */
function CountdownUnit({ value, label }) {
  const ref = useRef()
  const prev = useRef(value)

  useEffect(() => {
    if (prev.current !== value && ref.current) {
      gsap.fromTo(ref.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      )
      prev.current = value
    }
  }, [value])

  return (
    <div className="flex flex-col items-center min-w-[3rem]">
      <div
        ref={ref}
        className="text-4xl md:text-6xl font-hero font-black text-white tabular-nums"
        style={{ textShadow: '0 0 20px rgba(57,255,136,0.3)', willChange: 'transform, opacity' }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="data-label mt-1.5">{label}</div>
    </div>
  )
}

function Sep() {
  return <span className="text-3xl md:text-5xl font-hero font-black text-[#39FF88]/30 self-start mt-1 animate-hud-blink select-none">:</span>
}

/* ════════════════════════════════════════════════════════════
   MAIN HERO SECTION
════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef   = useRef()
  const carRef       = useRef()
  const line1Ref     = useRef()
  const line2Ref     = useRef()
  const panelsRef    = useRef()
  const motionRef    = useRef()
  const [carError, setCarError] = useState(false)

  // Point countdown to Melbourne GP
  const melb = RACES.find(r => r.id === 'aus-2026') || RACES[0]
  const { days, hours, minutes, seconds } = useCountdown(melb.date)

  /* ── Mouse parallax (lightweight, no re-renders) ──────────── */
  const handleMouseMove = useCallback((e) => {
    const { innerWidth, innerHeight } = window
    const dx = (e.clientX / innerWidth  - 0.5) * 2   // -1 to +1
    const dy = (e.clientY / innerHeight - 0.5) * 2

    gsap.to(carRef.current, {
      x: dx * 18,
      y: dy * 10,
      duration: 1.8,
      ease: 'power1.out',
    })
    gsap.to(line1Ref.current, {
      x: dx * -8,
      y: dy * -5,
      duration: 2.2,
      ease: 'power1.out',
    })
  }, [])

  /* ── GSAP Choreography ────────────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    /* --- Car: dramatic slide-in from right with skew deceleration --- */
    gsap.set(carRef.current, { x: '80vw', skewX: 12, scale: 0.82, opacity: 0, filter: 'blur(12px)' })
    tl.to(carRef.current, {
      x: 0, skewX: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
      duration: 2.2,
      ease: 'power4.out',
    }, 0)

    /* --- Layer 4 Typography: Z-axis fly-in per character --- */
    const chars1 = line1Ref.current?.querySelectorAll('.gsap-char')
    const chars2 = line2Ref.current?.querySelectorAll('.gsap-char')

    if (chars1?.length) {
      gsap.set(chars1, { z: -2000, opacity: 0, y: 60, scale: 1.8, rotationX: -40 })
      tl.to(chars1, {
        z: 0, opacity: 1, y: 0, scale: 1, rotationX: 0,
        duration: 2.0,
        stagger: 0.045,
        ease: 'power4.out',
      }, 0.15)
    }
    if (chars2?.length) {
      gsap.set(chars2, { z: -2000, opacity: 0, y: 80, scale: 2, rotationX: -50 })
      tl.to(chars2, {
        z: 0, opacity: 1, y: 0, scale: 1, rotationX: 0,
        duration: 2.2,
        stagger: 0.055,
        ease: 'power4.out',
      }, 0.3)
    }

    /* --- Motion FX + Panels --- */
    gsap.set([motionRef.current, panelsRef.current], { opacity: 0, y: 30 })
    tl.to([motionRef.current, panelsRef.current], {
      opacity: 1, y: 0, duration: 1.4, stagger: 0.2,
    }, 1.2)

    /* --- 3-speed parallax (background L4 fastest) --- */
    gsap.to(line1Ref.current, {
      y: -300, opacity: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 0.5 },
    })
    gsap.to(line2Ref.current, {
      y: -180,
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 0.7 },
    })
    gsap.to(carRef.current, {
      y: -90, scale: 1.08,
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.0 },
    })
    gsap.to(panelsRef.current, {
      y: -220, opacity: 0,
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.4 },
    })

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-[72px]"
      style={{ perspective: '1800px' }}
    >

      {/* ══════════════════════════════════════════════════════
          LAYER 4a — BACKGROUND GHOST TYPOGRAPHY
          Sits behind car; largest, most ghostly
      ══════════════════════════════════════════════════════ */}
      <div
        ref={line1Ref}
        className="absolute z-[8] inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ perspective: '1200px', top: '-5%' }}
      >
        <span
          className="hero-text whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 18vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.05)',
          }}
        >
          <SplitChars text="2026 WORLD" />
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 2 — THE F1 CAR SUBJECT
          Massive, oversized, bleeds off-screen, mix-blend-screen
      ══════════════════════════════════════════════════════ */}
      <div
        className="absolute z-[15] inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: 'translateY(6%)', transformStyle: 'preserve-3d' }}
      >
        {carError ? (
          /* ── Cinematic Placeholder — glowing carbon fiber ───── */
          <div
            className="w-[80vw] max-w-5xl carbon-fiber animate-float-car flex flex-col items-center justify-center gap-6 rounded-[3rem] relative overflow-hidden"
            style={{
              aspectRatio: '21/9',
              background: 'linear-gradient(135deg,#0a0a0a 0%,#050505 100%)',
              border: '1px solid rgba(57,255,136,0.15)',
              boxShadow: '0 0 120px rgba(57,255,136,0.06), inset 0 0 80px rgba(0,0,0,0.8)',
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,136,0.06)_0%,transparent_70%)]" />
            <Activity size={48} className="text-[#FFD60A] animate-glow-breathe z-10" />
            <div className="z-10 flex flex-col items-center gap-3">
              <span className="font-hero font-black text-3xl md:text-5xl tracking-[0.3em] text-[#FFD60A]">REDACTED</span>
              <span className="data-label text-[#39FF88] tracking-[0.4em]">2026 ACTIVE AERO DATA — DROP /src/assets/cars/ferrari-2026.webp</span>
            </div>
          </div>
        ) : (
          <div ref={carRef} className="w-[160vw] md:w-[130vw] lg:w-[100vw] max-w-none animate-float-car">
            <img
              src="/src/assets/cars/ferrari-2026.webp"
              alt="2026 Formula 1 Car"
              onError={() => setCarError(true)}
              className="w-full h-full object-contain"
              style={{
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 80px rgba(57,255,136,0.18)) drop-shadow(0 0 200px rgba(57,255,136,0.06))',
                willChange: 'transform',
              }}
            />
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 3 — MOTION & ENERGY EFFECTS
      ══════════════════════════════════════════════════════ */}
      <div ref={motionRef} className="absolute z-[20] inset-0 pointer-events-none">
        {/* Telemetry scan lines */}
        <div className="animate-hud-scan absolute top-0 left-[18%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#39FF88]/25 to-transparent" />
        <div className="animate-hud-scan absolute top-0 right-[24%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#FFD60A]/15 to-transparent" style={{ animationDelay: '2.5s' }} />
        {/* Horizontal energy streak across car mid-point */}
        <div
          className="absolute top-[52%] left-0 w-full pointer-events-none"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #39FF88 20%, rgba(57,255,136,0.8) 50%, #39FF88 80%, transparent 100%)',
            boxShadow: '0 0 15px 3px rgba(57,255,136,0.4)',
            opacity: 0.5,
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 4b — FOREGROUND TYPOGRAPHY (overlaps car)
          Sits IN FRONT of the car for 8D depth
      ══════════════════════════════════════════════════════ */}
      <div
        ref={line2Ref}
        className="absolute z-[25] pointer-events-none select-none"
        style={{ top: '12%', left: '50%', transform: 'translateX(-50%)', perspective: '1200px' }}
      >
        <h1 className="hero-text text-center" style={{ fontSize: 'clamp(4.5rem, 12vw, 14rem)' }}>
          <SplitChars text="THE NEW" className="block text-white drop-shadow-2xl" />
          <SplitChars
            text="ERA"
            className="block"
            style={{
              color: '#39FF88',
              textShadow: '0 0 60px rgba(57,255,136,0.5)',
            }}
          />
        </h1>
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 5 — GLASS UI PANELS (bottom strip)
      ══════════════════════════════════════════════════════ */}
      <div
        ref={panelsRef}
        className="absolute z-[30] bottom-0 left-0 right-0 pb-10 px-6 lg:px-12"
      >
        {/* Season context badge */}
        <div className="flex justify-center mb-5">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card"
            style={{ borderColor: 'rgba(57,255,136,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-telemetry" />
            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/60">
              2026 Season — Norris Defends · Cadillac Joins · 100% Bio-Fuel Era
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 max-w-screen-xl mx-auto">

          {/* Left — Active Aero Telemetry */}
          <div className="glass-card rounded-2xl px-6 py-5 lg:min-w-[260px]" style={{ borderColor: 'rgba(57,255,136,0.15)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Activity size={13} className="text-[#39FF88] animate-glow-breathe" />
              <span className="data-label text-[#39FF88]">Active Aerodynamics — 2026 Reg</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Downforce', value: '-30%', accent: true },
                { label: 'Drag',      value: '-55%', accent: false },
                { label: 'ERS',       value: 'ON',   accent: true },
              ].map(({ label, value, accent }) => (
                <div key={label} className="text-center">
                  <div className="data-label mb-1">{label}</div>
                  <div className={`text-xl font-hero font-black ${accent ? 'text-[#39FF88]' : 'text-white'}`}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Centre — Melbourne Countdown */}
          <div className="glass-card rounded-2xl px-6 py-5 flex-1 flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Hover sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.018] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-in-out" />
            <div className="flex items-center gap-2 mb-4 text-[#FFD60A]">
              <Zap size={13} />
              <span className="data-label text-[#FFD60A]">Ignition Sequence — {melb.name}</span>
              <Zap size={13} />
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <CountdownUnit value={days}    label="Days"  />
              <Sep />
              <CountdownUnit value={hours}   label="Hours" />
              <Sep />
              <CountdownUnit value={minutes} label="Min"   />
              <Sep />
              <CountdownUnit value={seconds} label="Sec"   />
            </div>
          </div>

          {/* Right — System status + CTA */}
          <div className="glass-card rounded-2xl px-6 py-5 flex flex-col justify-between gap-5 lg:min-w-[240px]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">
                <Radio size={10} className="text-[#39FF88] animate-glow-breathe" />
                Systems Nominal — 2026 Regs Active
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">
                <Cpu size={10} className="text-[#FFD60A]" />
                24 Circuits · 6 Sprint Weekends
              </div>
            </div>
            <button className="btn-primary w-full justify-center gap-2 group">
              <span>Engage Control Center</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

    </section>
  )
}
