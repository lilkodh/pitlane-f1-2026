/**
 * PITLANE — Home Page
 * ====================
 * Composes the full Phase 1 main view:
 *  1. <HeroSection /> — Full cinematic 5-layer 8D hero
 *  2. Section divider with telemetry scan aesthetic
 *  3. 4D Card Grid — 3 race cards with physics interactions
 *  4. Bottom teaser strip for the full calendar
 *
 * All heavy animation logic lives inside each component.
 * This page file stays intentionally clean and readable.
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { ArrowRight, Layers } from 'lucide-react'
import HeroSection from '../components/hero-section'
import RaceCard from '../components/race-card'
import { RACES } from '../data/races'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const sectionRef  = useRef()
  const headingRef  = useRef()
  const dividerRef  = useRef()

  // Section heading reveal
  useGSAP(() => {
    gsap.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
      },
    })

    gsap.from(dividerRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 1.6,
      ease: 'expo.out',
      transformOrigin: 'left center',
      scrollTrigger: {
        trigger: dividerRef.current,
        start: 'top 85%',
      },
    })
  }, { scope: sectionRef })

  return (
    <div className="w-full">

      {/* ── 1. Cinematic 8D Hero ───────────────────────────── */}
      <HeroSection />

      {/* ── 2. Section — Featured Circuits ─────────────────── */}
      <section ref={sectionRef} className="relative z-10 py-32 px-6 lg:px-12 max-w-screen-xl mx-auto">

        {/* Divider line (telemetry aesthetic) */}
        <div
          ref={dividerRef}
          className="w-full h-[1px] mb-16"
          style={{
            background: 'linear-gradient(90deg, #39FF88 0%, rgba(57,255,136,0.2) 40%, transparent 100%)',
          }}
        />

        {/* Heading row */}
        <div ref={headingRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Layers size={14} className="text-[#39FF88]" />
              <span className="data-label text-[#39FF88]">2026 Circuit Intelligence</span>
            </div>
            <h2 className="hero-text text-4xl md:text-6xl text-white">
              Featured<br /><span className="text-[#39FF88]">Circuits</span>
            </h2>
            <p className="text-white/40 text-lg mt-5 max-w-xl font-medium leading-relaxed">
              Experience the most technically demanding tracks on the 2026 calendar.
              Each circuit is a precision instrument engineered for speed.
            </p>
          </div>

          <Link
            to="/calendar"
            className="flex-shrink-0 flex items-center gap-3 text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-[#39FF88]/40 transition-all duration-300 hover:bg-[#39FF88]/5 group"
          >
            Full Season Calendar
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── 4D Card Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RACES.slice(0, 3).map((race, i) => (
            <RaceCard key={race.id} race={race} index={i} />
          ))}
        </div>

        {/* ── Mobile CTA ───────────────────────────────────── */}
        <div className="mt-10 lg:hidden">
          <Link to="/calendar" className="btn-primary w-full justify-center gap-2">
            View Full Calendar <ArrowRight size={16} />
          </Link>
        </div>

      </section>

    </div>
  )
}
