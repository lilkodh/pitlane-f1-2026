import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
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
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-f1red">Ma saison</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-titanium md:text-5xl">Historique de visionnage</h1>
        <p className="mt-3 max-w-xl text-sm text-titanium/65">
          Journal des Grands Prix marqués comme vus — filtrable comme le calendrier.
        </p>
      </header>

      <section className="mb-8 space-y-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-titanium/50">Continent</p>
          <div className="flex flex-wrap gap-2">
            {CONTINENTS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={continent === c}
                onClick={() => setContinent(c)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                  continent === c
                    ? 'border-f1red bg-f1red/20 text-titanium'
                    : 'border-white/15 bg-white/5 text-titanium/70 hover:border-glow/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-titanium/50">Format</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => setType(t)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                  type === t
                    ? 'border-f1red bg-f1red/20 text-titanium'
                    : 'border-white/15 bg-white/5 text-titanium/70 hover:border-glow/40'
                }`}
              >
                {t === 'all' ? 'Tous' : t === 'sprint' ? 'Sprint' : 'Standard'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {rows.length === 0 ? (
        <div className="liquid-glass rounded-3xl p-12 text-center text-sm text-titanium/65">
          {watchedEntries.length === 0
            ? 'Marquez des courses comme vues depuis une fiche GP pour alimenter votre saison.'
            : 'Aucune entrée ne correspond à ces filtres.'}
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li key={`${row.raceId}-${row.watchedAt}`}>
              <Link
                to={`/calendrier/${row.raceId}`}
                className="liquid-glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 transition hover:border-glow/40"
              >
                <div>
                  <p className="font-mono text-xs text-glow">{row.race.name}</p>
                  <p className="text-xs text-titanium/50">
                    Vu le {new Date(row.watchedAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase text-titanium/60">
                  {row.race.type === 'sprint' ? 'Sprint' : 'Standard'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
