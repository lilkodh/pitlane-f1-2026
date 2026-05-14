/**
 * PITLANE — 8D Cinematic Hero Section
 * =====================================
 * Task 2: The 2026 Hero Choreography
 * Interactive film scale.
 */

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Activity, Zap, Cpu, Radio } from 'lucide-react'
import { useCountdown } from '../hooks/use-countdown'
import { RACES } from '../data/races'

const ferrariHero = '/src/assets/cars/ferrari-2026.webp'

gsap.registerPlugin(ScrollTrigger)

function splitTextToChars(text) {
  return text.split('').map((char, i) => (
    <span key={i} className="gsap-char inline-block" style={{ willChange: 'transform, opacity' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

function CountdownDigit({ value, label }) {
  const digitRef = useRef()
  const prevValue = useRef(value)

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
      <div ref={digitRef} className="text-4xl md:text-6xl font-hero font-black text-white tabular-nums w-[2.5ch] text-center">
        {String(value).padStart(2, '0')}
      </div>
      <div className="data-label mt-1">{label}</div>
    </div>
  )
}

function Separator() {
  return <span className="text-3xl md:text-5xl font-hero font-black text-[#39FF88]/40 self-start pt-1 animate-hud-blink">:</span>
}

export default function HeroSection() {
  const containerRef   = useRef()
  const titleRef       = useRef()
  const carRef         = useRef()
  const panelsRef      = useRef()
  const scanRef        = useRef()
  const [imgError, setImgError] = useState(false)

  const nextRace = RACES.find(r => r.id === 'aus-2026') || RACES[0]
  const { days, hours, minutes, seconds } = useCountdown(nextRace.date)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    // THE FUTURE OF SPEED — flies in from deep Z-axis
    const chars = titleRef.current?.querySelectorAll('.gsap-char')
    if (chars?.length) {
      gsap.set(chars, { z: -1500, opacity: 0, scale: 2, y: 100 })
      tl.to(chars, {
        z: 0, opacity: 1, scale: 1, y: 0,
        duration: 2.5,
        stagger: 0.04,
        ease: 'power4.out',
      }, 0.2)
    }

    // Car (Subject) entrance
    gsap.set(carRef.current, { scale: 0.8, opacity: 0, filter: 'blur(20px)' })
    tl.to(carRef.current, {
      scale: 1, opacity: 1, filter: 'blur(0px)',
      duration: 2.5,
      ease: 'power3.out'
    }, 1.0)

    // HUD Panels
    gsap.set([scanRef.current, panelsRef.current], { opacity: 0, y: 40 })
    tl.to([scanRef.current, panelsRef.current], { opacity: 1, y: 0, duration: 1.5 }, 1.5)

    // Parallax Depth (ScrollTrigger)
    const pin = ScrollTrigger.create({ trigger: containerRef.current, start: 'top top', end: '+=100%', pin: false })
    
    gsap.to(titleRef.current, {
      y: -250, z: -800, opacity: 0.2,
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 }
    })
    
    gsap.to(carRef.current, {
      y: -80, scale: 1.1,
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 0.5 }
    })

    gsap.to(panelsRef.current, {
      y: -150, opacity: 0,
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
    })

    return () => pin.kill()
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-[72px]" style={{ perspective: '2000px' }}>
      
      {/* ── LAYER: SPATIAL TYPOGRAPHY ───────────────────── */}
      <div ref={titleRef} className="absolute z-[10] inset-0 flex flex-col items-center justify-center pointer-events-none select-none translate-y-[-10%]">
        <h1 className="hero-text text-[12vw] leading-[0.8] text-center whitespace-nowrap">
          <span className="text-white block drop-shadow-2xl">{splitTextToChars('THE NEW')}</span>
          <span className="text-[#39FF88] block drop-shadow-[0_0_40px_rgba(57,255,136,0.4)] mt-2">{splitTextToChars('ERA')}</span>
        </h1>
      </div>

      {/* ── LAYER: THE 2026 SUBJECT ─────────────────────── */}
      <div className="absolute z-[20] inset-0 flex items-center justify-center pointer-events-none translate-y-[5%] mix-blend-screen opacity-95">
        <div ref={carRef} className="w-[140vw] md:w-[100vw] lg:w-[85vw] max-w-none flex justify-center items-center">
          {imgError ? (
            // Cinematic Placeholder (CSS Only)
            <div className="w-[80%] aspect-[2/1] relative rounded-[3rem] overflow-hidden flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #111 0%, #050505 100%)',
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8), 0 0 80px rgba(57,255,136,0.1)',
                border: '1px solid rgba(57,255,136,0.2)'
              }}
            >
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
              }} />
              <div className="z-10 flex flex-col items-center gap-4">
                <Activity size={40} className="text-[#FFD60A] animate-pulse" />
                <span className="text-2xl font-hero font-black tracking-[0.4em] text-[#FFD60A] bg-black/50 px-8 py-3 border border-[#FFD60A]/30 rounded-xl">REDACTED 2026 DATA</span>
                <span className="text-xs font-mono text-white/40 uppercase">Waiting for /assets/cars/ferrari-2026.webp</span>
              </div>
            </div>
          ) : (
            <img 
              src={ferrariHero} 
              alt="2026 Formula 1 Car" 
              onError={() => setImgError(true)}
              className="w-full h-full object-contain filter drop-shadow-[0_0_80px_rgba(57,255,136,0.15)]"
              style={{ willChange: 'transform' }}
            />
          )}
        </div>
      </div>

      {/* ── LAYER: SCAN LINES & HUD ─────────────────────── */}
      <div ref={scanRef} className="absolute z-[25] inset-0 pointer-events-none">
        <div className="animate-scanline absolute top-0 left-[15%] w-[1px] h-screen bg-gradient-to-b from-transparent via-[#39FF88]/20 to-transparent opacity-40" />
        <div className="animate-scanline absolute top-0 right-[22%] w-[1px] h-screen bg-gradient-to-b from-transparent via-[#FFD60A]/15 to-transparent opacity-30" style={{ animationDelay: '2s' }} />
      </div>

      {/* ── LAYER: PITLANE GLASS PANELS ─────────────────── */}
      <div ref={panelsRef} className="absolute z-[30] bottom-0 left-0 right-0 pb-8 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch max-w-screen-xl mx-auto">
          
          <div className="glass-card rounded-2xl px-6 py-5 flex items-center gap-8 lg:min-w-[280px] border-[#39FF88]/15">
            <div className="flex items-center gap-2 text-[#39FF88]">
              <Activity size={16} className="animate-pulse" />
              <span className="data-label text-[#39FF88]">Active Aero</span>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="data-label mb-1">Downforce</div>
                <div className="text-2xl font-hero font-black text-white">-30<span className="text-xs text-white/30 ml-1 font-body font-medium">%</span></div>
              </div>
              <div>
                <div className="data-label mb-1">Drag</div>
                <div className="text-2xl font-hero font-black text-white">-55<span className="text-xs text-white/30 ml-1 font-body font-medium">%</span></div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl px-6 py-5 flex-1 flex flex-col items-center justify-center relative overflow-hidden group border-white/5">
            <div className="flex items-center gap-2 text-[#FFD60A] mb-4">
              <Zap size={14} />
              <span className="data-label text-[#FFD60A]">Next Engine Ignition — {nextRace.name}</span>
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

          <div className="glass-card rounded-2xl px-6 py-5 flex flex-col justify-between gap-4 lg:min-w-[260px] border-white/5">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-white/30 uppercase">
              <span className="flex items-center gap-2"><Radio size={11} className="text-[#39FF88] animate-pulse" /> 100% Bio-Fuel</span>
              <span className="flex items-center gap-2"><Cpu size={11} className="text-[#FFD60A]" /> ERS Boost</span>
            </div>
            <button className="btn-primary w-full justify-center gap-2 group">
              <span>Engage Pitlane</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
