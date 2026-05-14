/**
 * PITLANE — Race Detail Page  /calendar/:raceId
 * ===============================================
 * Dynamic race detail view using React Router's useParams().
 *
 * LAYOUT (Cinematic editorial):
 *  - Full-bleed hero image with a deep gradient crush (top layer)
 *  - Race name overlapping in massive Space Grotesk typography
 *  - Two-column editorial split below:
 *      LEFT  → Circuit telemetry stats, weekend schedule, "Mark Watched" CTA
 *      RIGHT → Cinematic race image + frosted stat cards floating on top
 *
 * GSAP:
 *  - Hero image parallax on scroll (y movement)
 *  - Each stat card staggers in from the bottom via ScrollTrigger
 *  - "Mark Watched" button emits a green pulse on toggle
 *
 * REACT NOTES:
 *  - useParams() from react-router retrieves raceId
 *  - State limited to nothing — all data from races.js array via find()
 *  - Zustand toggleWatched action for persistence
 */

import { useRef } from 'react'
import { useParams, Link } from 'react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, CheckCircle, Circle, Flag, Map, Timer,
  Zap, Wind, BarChart2, Radio,
} from 'lucide-react'
import { RACES } from '../data/races'
import { useF1Context } from '../context/f1-context'

gsap.registerPlugin(ScrollTrigger)

/* ── Small stat tile component ──────────────────────────────── */
function StatTile({ label, value, unit = '', accent = false }) {
  return (
    <div
      className="flex flex-col p-5 rounded-2xl"
      style={{
        background: accent ? 'rgba(57,255,136,0.07)' : 'rgba(11,11,11,0.45)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${accent ? 'rgba(57,255,136,0.25)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      <span className="data-label mb-2">{label}</span>
      <span className={`text-3xl font-hero font-black ${accent ? 'text-[#39FF88]' : 'text-white'}`}>
        {value}
        {unit && <span className="text-sm font-body font-medium text-white/30 ml-1">{unit}</span>}
      </span>
    </div>
  )
}

/* ── Main Page ──────────────────────────────────────────────── */
export default function RaceDetailPage() {
  const { raceId } = useParams()
  const race = RACES.find(r => r.id === raceId)
  const containerRef = useRef()
  const heroImgRef   = useRef()
  const titleRef     = useRef()
  const watchBtnRef  = useRef()

  const { watchedRaces, toggleWatched } = useF1Context()
  const isWatched = watchedRaces.includes(race?.id)

  useGSAP(() => {
    if (!race) return

    // Hero image parallax depth
    gsap.to(heroImgRef.current, {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    // Title character entrance
    const chars = titleRef.current?.querySelectorAll('.gsap-char')
    if (chars?.length) {
      gsap.from(chars, {
        y: 80,
        opacity: 0,
        rotationX: -60,
        duration: 1.4,
        stagger: 0.03,
        ease: 'expo.out',
        delay: 0.2,
      })
    }

    // Stat tiles stagger up
    gsap.from('.stat-tile', {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stat-tile',
        start: 'top 88%',
      },
    })
  }, { scope: containerRef, dependencies: [raceId] })

  // Pulse the watch button on toggle
  const handleWatchToggle = () => {
    toggleWatched(race.id)
    gsap.fromTo(
      watchBtnRef.current,
      { scale: 0.94, boxShadow: '0 0 0px rgba(57,255,136,0)' },
      { scale: 1, boxShadow: '0 0 30px rgba(57,255,136,0)', duration: 0.6, ease: 'expo.out' }
    )
  }

  // 404 state
  if (!race) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-6">
        <Flag size={48} className="text-[#39FF88] opacity-40" />
        <h1 className="text-5xl font-hero font-black">Race Not Found</h1>
        <p className="text-white/40">This circuit doesn't exist in the 2026 calendar.</p>
        <Link to="/calendar" className="btn-primary">← Back to Calendar</Link>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen">

      {/* ══════════════════════════════════════════════════════
          HERO BLOCK — Full-bleed race image + overlapping title
      ══════════════════════════════════════════════════════ */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Parallax image */}
        <div ref={heroImgRef} className="absolute inset-0 scale-110" style={{ willChange: 'transform' }}>
          <img
            src={race.image}
            alt={race.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Deep gradient crushes the bottom of the photo into #050505 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 to-transparent" />

        {/* Back link */}
        <div className="absolute top-24 left-6 lg:left-12 z-10">
          <Link
            to="/calendar"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors glass-card px-4 py-2 rounded-full"
          >
            <ArrowLeft size={14} /> Calendar
          </Link>
        </div>

        {/* Floating country badge */}
        <div className="absolute top-24 right-6 lg:right-12 z-10 flex items-center gap-2 glass-card px-4 py-2 rounded-full">
          <Map size={12} className="text-[#FFD60A]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{race.country}</span>
        </div>

        {/* Massive race name — overlapping the gradient crush */}
        <div
          ref={titleRef}
          className="absolute bottom-0 left-6 lg:left-12 right-6 z-10 pb-10"
          style={{ perspective: '1000px' }}
        >
          <div className="data-label text-[#39FF88] mb-3 flex items-center gap-2">
            <Radio size={11} className="animate-pulse" /> Live Timing — 2026 Season
          </div>
          <h1 className="hero-text text-[clamp(2.5rem,6vw,7rem)] text-white leading-none">
            {race.name.split('').map((char, i) => (
              <span key={i} className="gsap-char inline-block" style={{ willChange: 'transform, opacity' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          CONTENT — Editorial two-column split
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 px-6 lg:px-12 max-w-screen-xl mx-auto pb-32 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── LEFT COLUMN: Stats + actions ─────────────────── */}
          <div className="flex flex-col gap-8">

            {/* Circuit identity */}
            <div>
              <p className="text-lg text-white/40 font-medium">{race.circuit}</p>
              <p className="text-sm text-white/25 mt-1">
                {new Date(race.date).toLocaleDateString(undefined, {
                  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                })}
              </p>
            </div>

            {/* Primary telemetry stat grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-tile"><StatTile label="Total Laps"    value={race.laps}   accent /></div>
              <div className="stat-tile"><StatTile label="Circuit Length" value={race.length} /></div>
              <div className="stat-tile"><StatTile label="Top Speed Apex" value="352" unit="km/h" /></div>
              <div className="stat-tile"><StatTile label="Max G-Force"   value="4.3" unit="G" accent /></div>
            </div>

            {/* Weekend schedule */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(11,11,11,0.45)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Timer size={14} className="text-[#FFD60A]" />
                <span className="data-label text-[#FFD60A]">Weekend Schedule</span>
              </div>
              {[
                { day: 'Friday',   session: 'Practice 1 & 2',     time: '11:30 / 15:00' },
                { day: 'Saturday', session: 'Qualifying',          time: '14:00' },
                { day: 'Sunday',   session: 'Race Day — Full GP',  time: '14:00', highlight: true },
              ].map(({ day, session, time, highlight }) => (
                <div key={day} className={`flex items-center justify-between py-4 border-b border-white/5 last:border-0 ${highlight ? 'text-[#39FF88]' : 'text-white/60'}`}>
                  <div className="flex items-center gap-3">
                    {highlight ? <Zap size={13} /> : <Circle size={7} className="opacity-30" />}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest">{day}</div>
                      <div className="text-sm font-medium mt-0.5">{session}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold">{time}</span>
                </div>
              ))}
            </div>

            {/* Mark as Watched CTA */}
            <button
              ref={watchBtnRef}
              onClick={handleWatchToggle}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-400"
              style={{
                background: isWatched ? 'rgba(57,255,136,0.12)' : 'rgba(255,255,255,0.04)',
                border: isWatched ? '1px solid rgba(57,255,136,0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: isWatched ? '#39FF88' : 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {isWatched
                ? <><CheckCircle size={20} /> Watched — Logged to Season Journal</>
                : <><Circle size={20} /> Mark as Watched</>
              }
            </button>

          </div>

          {/* ── RIGHT COLUMN: Visual + extra data ─────────────── */}
          <div className="flex flex-col gap-6">

            {/* Cinematic circuit image card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <img
                src={race.image}
                alt={race.circuit}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />

              {/* Floating stat in corner */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="data-label text-[#39FF88] mb-1">Circuit Classification</div>
                  <div className="text-xl font-hero font-black text-white">High-Downforce</div>
                </div>
                <div
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{ background: 'rgba(57,255,136,0.15)', border: '1px solid rgba(57,255,136,0.3)', color: '#39FF88' }}
                >
                  2026 Calendar
                </div>
              </div>
            </div>

            {/* ERS + DRS + Overtake data strip */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Zap,      label: 'ERS Zones',     value: '5',   col: '#39FF88' },
                { icon: Wind,     label: 'DRS Zones',     value: '3',   col: '#FFD60A' },
                { icon: BarChart2, label: 'Overtake Score', value: '7.4', col: '#fff'   },
              ].map(({ icon: Icon, label, value, col }) => (
                <div
                  key={label}
                  className="stat-tile flex flex-col items-center p-4 rounded-2xl text-center"
                  style={{ background: 'rgba(11,11,11,0.45)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon size={18} style={{ color: col }} className="mb-2" />
                  <div className="data-label mb-1">{label}</div>
                  <div className="text-2xl font-hero font-black" style={{ color: col }}>{value}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
