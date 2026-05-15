import { Link } from 'react-router-dom';
import { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRaces } from '../hooks/use-races.js';
import { useUpcomingRaces } from '../hooks/use-upcoming-races.js';
import { RaceCard } from '../components/ui/race-card.jsx';
import { FeaturedRaceStack } from '../components/ui/featured-race-stack.jsx';

const CONTINENTS = ['all', 'Europe', 'Americas', 'Asia', 'Oceania', 'Africa'];
const TYPES = ['all', 'standard', 'sprint'];

export default function CalendarPage() {
  const races = useRaces();
  const upcoming = useUpcomingRaces(races, 3);
  const [continent, setContinent] = useState('all');
  const [type, setType] = useState('all');
  const gridRef = useRef(null);
  const showFeaturedStack = continent === 'all' && type === 'all';

  const filtered = useMemo(() => {
    return races.filter((r) => {
      const okC = continent === 'all' || r.continent === continent;
      const okT = type === 'all' || r.type === type;
      return okC && okT;
    });
  }, [races, continent, type]);

  useGSAP(
    () => {
      const root = gridRef.current;
      if (!root) return undefined;
      const cards = root.querySelectorAll('[data-race-card]');
      if (!cards.length) return undefined;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
      return undefined;
    },
    { dependencies: [filtered], scope: gridRef }
  );

  return (
    <div className="pb-8">
      <header className="mb-8 max-w-3xl">
        <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-f1red">Calendar</p>
        <h1 className="mt-2 text-pit-page font-black tracking-tight text-titanium">24 races</h1>
        <p className="mt-3 text-base text-titanium/65">
          Sticky broadcast-style filters — four-column desktop grid, glass cards, and big mono round numbers.
        </p>
      </header>

      <div className="sticky top-[4.5rem] z-20 -mx-4 mb-10 border-b border-white/5 bg-carbon/75 px-4 py-4 backdrop-blur-xl md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0">
        <section className="mx-auto max-w-pit space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-card-lift md:p-5">
          <div>
            <p className="mb-2 font-condensed text-[11px] font-bold uppercase tracking-widest text-titanium/50">
              Continent
            </p>
            <div className="flex flex-wrap gap-2">
              {CONTINENTS.map((c) => (
                <FilterChip key={c} label={c} active={continent === c} onClick={() => setContinent(c)} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-condensed text-[11px] font-bold uppercase tracking-widest text-titanium/50">
              Format
            </p>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <FilterChip
                  key={t}
                  label={t === 'all' ? 'All' : t === 'sprint' ? 'Sprint' : 'Standard'}
                  active={type === t}
                  onClick={() => setType(t)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {showFeaturedStack && <FeaturedRaceStack races={upcoming} />}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${continent}-${type}`}
          layout
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-titanium/60">No races match these filters.</p>
      )}

      <p className="mt-12 text-center text-xs text-titanium/40">
        <Link
          to="/"
          className="text-neon-blue underline-offset-2 transition hover:text-f1red hover:underline"
        >
          Back to paddock
        </Link>
      </p>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-shadow duration-200 ease-pit ${
        active
          ? 'border-f1red bg-f1red/25 text-titanium shadow-glow-red'
          : 'border-white/15 bg-white/5 text-titanium/75 hover:border-neon-blue/40 hover:shadow-glow-subtle'
      }`}
    >
      {label}
    </motion.button>
  );
}
