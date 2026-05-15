import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRaces } from '../hooks/use-races.js';
import { usePitlaneStore } from '../store/pitlane-store.js';

const CONTINENTS = ['all', 'Europe', 'Americas', 'Asia', 'Oceania', 'Africa'];
const TYPES = ['all', 'standard', 'sprint'];

export default function SeasonPage() {
  const races = useRaces();
  const watchedEntries = usePitlaneStore((s) => s.watchedEntries);
  const [continent, setContinent] = useState('all');
  const [type, setType] = useState('all');

  const rows = useMemo(() => {
    const byId = Object.fromEntries(races.map((r) => [r.id, r]));
    return [...watchedEntries]
      .map((e) => ({ ...e, race: byId[e.raceId] }))
      .filter((row) => row.race)
      .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt))
      .filter((row) => {
        const okC = continent === 'all' || row.race.continent === continent;
        const okT = type === 'all' || row.race.type === type;
        return okC && okT;
      });
  }, [watchedEntries, races, continent, type]);

  return (
    <div className="pb-12">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-f1red">My season</p>
          <h1 className="mt-2 text-pit-page font-black tracking-tight text-titanium">Watch history</h1>
          <p className="mt-3 max-w-xl text-base text-titanium/65">
            Vertical timeline — each row opens the race page.
          </p>
        </div>
        <div className="liquid-glass rounded-2xl px-5 py-4 text-right shadow-card-lift">
          <p className="font-condensed text-[10px] font-bold uppercase tracking-widest text-titanium/45">
            Races watched
          </p>
          <p className="font-mono text-3xl font-bold text-neon-blue tabular-nums">{watchedEntries.length}</p>
        </div>
      </header>

      <section className="mb-8 space-y-4">
        <div>
          <p className="mb-2 font-condensed text-[11px] font-bold uppercase tracking-widest text-titanium/50">
            Continent
          </p>
          <div className="flex flex-wrap gap-2">
            {CONTINENTS.map((c) => (
              <motion.button
                key={c}
                type="button"
                aria-pressed={continent === c}
                onClick={() => setContinent(c)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                  continent === c
                    ? 'border-f1red bg-f1red/20 text-titanium shadow-glow-red'
                    : 'border-white/15 bg-white/5 text-titanium/70 hover:border-neon-blue/35'
                }`}
              >
                {c}
              </motion.button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-condensed text-[11px] font-bold uppercase tracking-widest text-titanium/50">
            Format
          </p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <motion.button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => setType(t)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                  type === t
                    ? 'border-f1red bg-f1red/20 text-titanium shadow-glow-red'
                    : 'border-white/15 bg-white/5 text-titanium/70 hover:border-neon-blue/35'
                }`}
              >
                {t === 'all' ? 'All' : t === 'sprint' ? 'Sprint' : 'Standard'}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {rows.length === 0 ? (
        <div className="liquid-glass rounded-3xl p-12 text-center text-sm text-titanium/65">
          {watchedEntries.length === 0
            ? 'Mark races as watched from a race page to build your season log.'
            : 'No entries match these filters.'}
        </div>
      ) : (
        <div className="relative mx-auto max-w-3xl pl-2 md:pl-4">
          <div
            className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-neon-blue/50 via-f1red/40 to-transparent md:left-[15px]"
            aria-hidden
          />
          <ul className="space-y-5">
            {rows.map((row, i) => (
              <motion.li
                key={`${row.raceId}-${row.watchedAt}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.04, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative pl-10 md:pl-12"
              >
                <span className="absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-neon-blue/50 bg-carbon font-mono text-[10px] font-bold text-neon-blue shadow-glow-subtle md:top-5">
                  {row.race.round}
                </span>
                <Link
                  to={`/calendrier/${row.raceId}`}
                  className="liquid-glass group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 p-5 shadow-card-lift transition hover:border-f1red/35 hover:shadow-glow"
                >
                  <div>
                    <p className="font-mono text-sm font-semibold text-titanium">{row.race.name}</p>
                    <p className="mt-1 text-xs text-titanium/50">
                      Watched on{' '}
                      {new Date(row.watchedAt).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase ${
                      row.race.type === 'sprint'
                        ? 'border-lamborghini/50 bg-lamborghini/10 text-lamborghini'
                        : 'border-white/12 text-titanium/65'
                    }`}
                  >
                    {row.race.type === 'sprint' ? 'Sprint' : 'Standard'}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
