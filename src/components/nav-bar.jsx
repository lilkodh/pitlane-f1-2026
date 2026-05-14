/**
 * PITLANE — Cinematic NavBar
 * ============================
 * Fixed, glassmorphic floating navbar with active route highlighting.
 * Uses the `glass-nav` utility from index.css for the frosted acrylic surface.
 *
 * GSAP: Entrance animation runs once on mount via useGSAP.
 */

import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Gauge, Menu, X, Timer, Flag, Trophy, BookOpen } from 'lucide-react'

/* ── Navigation link data ───────────────────────────────────── */
const NAV_LINKS = [
  { to: '/calendar',  label: 'Calendar',  icon: Flag    },
  { to: '/mygarage',  label: 'Garage',    icon: Trophy  },
  { to: '/myseason',  label: 'Season',    icon: BookOpen },
]

export default function NavBar() {
  const navRef    = useRef()
  const location  = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Slide down + fade in on first render
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      delay: 0.3,
    })
  }, { scope: navRef })

  const isActive = (path) => location.pathname === path

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[100] glass-nav">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">

        {/* ── Logo ──────────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Telemetry indicator dot */}
          <span className="w-2 h-2 rounded-full bg-[#39FF88] animate-pulse-green" />
          <span className="text-2xl font-hero font-black tracking-tighter text-white group-hover:text-[#39FF88] transition-colors duration-300">
            PIT<span className="text-[#39FF88]">LANE</span>
          </span>
          <span className="hidden sm:block text-[10px] font-bold tracking-[0.25em] text-white/20 uppercase border border-white/10 px-2 py-0.5 rounded">
            F1 2026
          </span>
        </Link>

        {/* ── Desktop links ─────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive(to)
                  ? 'text-[#39FF88] bg-[#39FF88]/10 border border-[#39FF88]/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>

        {/* ── Right actions ─────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white/30 border border-white/10 rounded-full px-4 py-2">
            <Timer size={12} className="text-[#FFD60A]" />
            Season Active
          </div>
          <Link to="/calendar" className="hidden md:flex btn-primary gap-2 items-center">
            <Gauge size={15} /> Live Data
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden glass-card p-2 rounded-lg text-white/70 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden glass-nav border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive(to)
                  ? 'text-[#39FF88] bg-[#39FF88]/10'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
