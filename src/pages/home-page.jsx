import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flag, Timer, CalendarDays } from 'lucide-react';
import { FadingVideo } from '../components/ui/FadingVideo.jsx';
import { useRaces, getNextRace, raceWeekendStartIso } from '../hooks/use-races.js';
import { useCountdown } from '../hooks/use-countdown.js';
import { useCarScrollInteraction } from '../hooks/useCarScrollInteraction.js';

const primaryCtaClass =
  'group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded border-2 border-f1red bg-f1red/90 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-glow-red transition duration-200 ease-pit hover:scale-105 hover:bg-f1red hover:shadow-glow-intense active:scale-[0.98]';

export default function HomePage() {
  const races = useRaces();
  const next = getNextRace(races);
  const target = raceWeekendStartIso(next);
  const countdown = useCountdown(target);
  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const carRotateRef = useRef(null);
  const carBobRef = useRef(null);
  const ms = next ? new Date(target).getTime() - Date.now() : 0;
  const pulseCountdown = !countdown.done && ms > 0 && ms < 86400000;

  const hlsHero = import.meta.env.VITE_HERO_VIDEO_HLS;
  const mp4Hero = import.meta.env.VITE_HERO_VIDEO_MP4;

  useCarScrollInteraction(heroRef, carRotateRef, carBobRef);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (leftRef.current) {
        tl.from(leftRef.current.children, { opacity: 0, y: 36, duration: 0.75, stagger: 0.1 }, 0);
      }
      if (rightRef.current) {
        tl.from(
          rightRef.current,
          { opacity: 0, scale: 0.6, rotateY: -18, duration: 0.95, ease: 'power2.out' },
          0.08
        );
      }
    },
    { scope: heroRef }
  );

  return (
    <div ref={heroRef} className="relative min-h-[100dvh] overflow-hidden pb-16">
      {(hlsHero || mp4Hero) && (
        <FadingVideo
          hlsSrc={hlsHero || undefined}
          mp4Src={hlsHero ? undefined : mp4Hero}
          className="z-0"
          overlayClassName="from-carbon/88 via-carbon/55 to-carbon/92"
        />
      )}
      <div className="pointer-events-none absolute inset-0 z-[1] pit-circuit-bg opacity-70" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_72%_18%,rgba(220,0,0,0.14),transparent_42%),radial-gradient(circle_at_18%_78%,rgba(0,217,255,0.1),transparent_38%)]" />

      <div className="relative z-[2] grid min-h-[calc(100dvh-7rem)] gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
        <div ref={leftRef} className="flex flex-col justify-center space-y-8 pt-4 lg:pt-0">
          <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.35em] text-f1red">
            Next race
          </p>
          <h1 className="pit-metallic-text max-w-4xl text-pit-hero">{next?.name}</h1>
          <p className="max-w-xl text-lg leading-relaxed text-titanium/75">
            <span className="text-titanium">{next?.circuit}</span>
            <span className="text-titanium/50"> — </span>
            {next?.country}. {next?.dates.start} → {next?.dates.end}
          </p>

          <div className="grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="liquid-glass rounded-xl px-4 py-4">
              <Flag className="h-4 w-4 text-f1red" aria-hidden />
              <p className="mt-2 font-condensed text-[11px] font-bold uppercase tracking-widest text-titanium/50">
                Round
              </p>
              <p className="font-mono text-xl font-bold text-titanium">{next?.round ?? '—'}/24</p>
            </div>
            <div className="liquid-glass rounded-xl px-4 py-4">
              <CalendarDays className="h-4 w-4 text-neon-blue" aria-hidden />
              <p className="mt-2 font-condensed text-[11px] font-bold uppercase tracking-widest text-titanium/50">
                Weekend
              </p>
              <p className="font-mono text-sm font-bold leading-snug text-titanium">
                {next?.dates.start} — {next?.dates.end}
              </p>
            </div>
            <div className="liquid-glass rounded-xl px-4 py-4">
              <Timer className="h-4 w-4 text-f1red" aria-hidden />
              <p className="mt-2 font-condensed text-[11px] font-bold uppercase tracking-widest text-titanium/50">
                Live in
              </p>
              <p
                className={`font-mono text-xl font-bold tabular-nums md:text-2xl ${
                  countdown.done ? 'text-f1red' : 'text-f1red drop-shadow-[0_0_12px_rgba(220,0,0,0.45)]'
                } ${pulseCountdown ? 'animate-pit-pulse-slow' : ''}`}
              >
                {countdown.done ? 'GO' : countdown.label}
              </p>
            </div>
          </div>

          <div className="relative flex flex-wrap gap-4 pt-2">
            <span
              className="pointer-events-none absolute -inset-1 rounded-lg bg-f1red/20 blur-xl animate-pit-cta-glow"
              aria-hidden
            />
            <Link to="/calendrier" className={primaryCtaClass}>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              View calendar
            </Link>
            <Link
              to={`/calendrier/${next?.id}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded border-2 border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-titanium/90 transition duration-200 ease-pit hover:border-f1red hover:text-f1red hover:shadow-glow-subtle"
            >
              Race page
            </Link>
          </div>
        </div>

        <motion.div
          ref={rightRef}
          className="relative hidden min-h-[360px] lg:block"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ perspective: 1200 }}
        >
          <div ref={carRotateRef} className="relative h-full min-h-[360px]" style={{ transformStyle: 'preserve-3d' }}>
            <div ref={carBobRef} className="relative h-full">
              <div className="liquid-glass absolute inset-0 rounded-2xl border-f1red/25 bg-gradient-to-br from-bugatti/80 via-carbon-2 to-f1red/10 shadow-glow-intense" />
              <div className="relative flex h-full min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-2xl p-8 text-center">
                <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.45em] text-titanium/45">
                  F2026 — hero asset
                </p>
                <p className="mt-6 select-none bg-gradient-to-b from-titanium via-f1red to-carbon bg-clip-text font-black text-[clamp(4rem,12vw,7rem)] leading-none text-transparent opacity-90">
                  {next?.round != null ? String(next.round).padStart(2, '0') : '01'}
                </p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-titanium/55">
                  Scroll to tilt the panel — background video via{' '}
                  <span className="font-mono text-neon-blue/90">VITE_HERO_VIDEO_MP4</span> or{' '}
                  <span className="font-mono text-neon-blue/90">VITE_HERO_VIDEO_HLS</span>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
