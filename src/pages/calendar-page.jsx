import { Link } from 'react-router-dom';
import { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRaces } from '../hooks/use-races.js';
import { RaceCard } from '../components/ui/race-card.jsx';

const CONTINENTS = ['all', 'Europe', 'Americas', 'Asia', 'Oceania', 'Africa'];
const TYPES = ['all', 'standard', 'sprint'];

export default function CalendarPage() {
  const races = useRaces();
  const [continent, setContinent] = useState('all');
  const [type, setType] = useState('all');
  const gridRef = useRef(null);

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
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
      return undefined;
    },
    { dependencies: [filtered], scope: gridRef }
  );

  return (
    <div className="pb-8">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-f1red">Calendrier</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-titanium md:text-5xl">24 Grands Prix</h1>
        <p className="mt-3 text-sm text-titanium/65">
          Filtrez par continent ou format week-end. Cartes empilées façon paddock — inspiration broadcast premium.
        </p>
      </header>

      <section className="mb-8 space-y-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-titanium/50">Continent</p>
          <div className="flex flex-wrap gap-2">
            {CONTINENTS.map((c) => (
              <FilterChip key={c} label={c} active={continent === c} onClick={() => setContinent(c)} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-titanium/50">Format</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <FilterChip
                key={t}
                label={t === 'all' ? 'Tous' : t === 'sprint' ? 'Sprint' : 'Standard'}
                active={type === t}
                onClick={() => setType(t)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${continent}-${type}`}
          layout
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-titanium/60">Aucune course pour ces filtres.</p>
      )}

      <p className="mt-12 text-center text-xs text-titanium/40">
        <Link to="/" className="text-glow underline-offset-2 hover:underline">
          Retour au paddock
        </Link>
      </p>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
        active
          ? 'border-f1red bg-f1red/20 text-titanium shadow-glow-red'
          : 'border-white/15 bg-white/5 text-titanium/70 hover:border-glow/40 hover:text-titanium'
      }`}
    >
      {label}
    </button>
  );
}
