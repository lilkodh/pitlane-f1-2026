import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { useRaces } from '../hooks/use-races.js';
import { usePitlaneStore } from '../store/pitlane-store.js';

export default function GaragePage() {
  const races = useRaces();
  const favoriteIds = usePitlaneStore((s) => s.favoriteIds);

  const favorites = useMemo(() => {
    return races
      .filter((r) => favoriteIds.includes(r.id))
      .sort((a, b) => a.round - b.round);
  }, [races, favoriteIds]);

  return (
    <div className="pb-12">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-f1red">Mon garage</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-titanium md:text-5xl">Courses favorites</h1>
        <p className="mt-3 max-w-xl text-sm text-titanium/65">
          Votre sélection persistante (stockage local). Retirez un favori depuis une carte ou la fiche GP.
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className="liquid-glass rounded-3xl p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-titanium/25" aria-hidden />
          <p className="mt-4 text-titanium/70">Aucun Grand Prix dans votre garage.</p>
          <Link
            to="/calendrier"
            className="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-glow hover:underline"
          >
            Explorer le calendrier
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {favorites.map((race) => (
            <li key={race.id}>
              <Link
                to={`/calendrier/${race.id}`}
                className="liquid-glass group flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 transition hover:border-f1red/50"
              >
                <div>
                  <p className="font-mono text-xs text-f1red">R{String(race.round).padStart(2, '0')}</p>
                  <p className="mt-1 text-lg font-bold text-titanium">{race.name}</p>
                  <p className="text-sm text-titanium/55">
                    {race.circuit} — {race.dates.start}
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-glow opacity-0 transition group-hover:opacity-100">
                  Ouvrir →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
