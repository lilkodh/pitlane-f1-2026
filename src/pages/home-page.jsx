import { Link } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRaces, getNextRace, raceWeekendStartIso } from '../hooks/use-races.js';
import { useCountdown } from '../hooks/use-countdown.js';

const primaryCtaClass =
  'group relative inline-flex overflow-hidden rounded-full border border-f1red/80 bg-f1red/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-titanium shadow-glow-red transition hover:scale-[1.04] hover:border-f1red hover:bg-f1red/25 hover:shadow-glow-red active:scale-[0.99]';

export default function HomePage() {
  const races = useRaces();
  const next = getNextRace(races);
  const target = raceWeekendStartIso(next);
  const countdown = useCountdown(target);
  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (leftRef.current) {
        tl.from(leftRef.current.children, { opacity: 0, y: 36, duration: 0.75, stagger: 0.12 }, 0);
      }
      if (rightRef.current) {
        tl.from(rightRef.current, { opacity: 0, scale: 0.88, rotateY: -12, duration: 0.9 }, 0.1);
      }
    },
    { scope: heroRef }
  );

  return (
    <div ref={heroRef} className="relative overflow-hidden pb-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(220,0,0,0.12),transparent_45%),radial-gradient(circle_at_20%_80%,rgba(0,217,255,0.08),transparent_40%)]" />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div ref={leftRef} className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-f1red">Prochaine manche</p>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-titanium md:text-6xl">
            {next?.name}
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-titanium/70 md:text-base">
            {next?.circuit} — {next?.country}. Week-end du {next?.dates.start} au {next?.dates.end}.
          </p>
          <div className="liquid-glass-strong inline-flex flex-col gap-1 rounded-2xl px-6 py-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-titanium/50">
              Compte à rebours
            </span>
            <span
              className={`font-mono text-5xl font-bold tabular-nums md:text-7xl ${
                countdown.done ? 'text-f1red' : 'text-glow'
              }`}
            >
              {countdown.done ? 'Race on!' : countdown.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/calendrier" className={primaryCtaClass}>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              Voir le calendrier
            </Link>
            <Link
              to={`/calendrier/${next?.id}`}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-widest text-titanium/80 transition hover:border-glow hover:text-glow"
            >
              Fiche GP
            </Link>
          </div>
        </div>

        <div ref={rightRef} className="relative hidden min-h-[320px] lg:block">
          <div className="liquid-glass absolute inset-0 rounded-3xl border-f1red/30 bg-gradient-to-br from-f1red/10 via-carbon-2 to-glow/5 shadow-2xl shadow-f1red/10" />
          <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-titanium/40">Concept</p>
            <p className="mt-4 text-6xl font-black text-titanium/10">F1</p>
            <p className="mt-2 max-w-xs text-sm text-titanium/55">
              Panneau hero façon mockup Stitch — carrosserie carbon, glow actif, typo mono pour la télémétrie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
