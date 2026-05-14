import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin } from 'lucide-react';
import { usePitlaneStore } from '../../store/pitlane-store.js';

export function RaceCard({ race }) {
  const toggleFavorite = usePitlaneStore((s) => s.toggleFavorite);
  const isFavorite = usePitlaneStore((s) => s.isFavorite(race.id));

  return (
    <motion.article
      layout
      data-race-card
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-f1red/25 bg-white/[0.04] shadow-inner transition hover:border-glow/50 hover:shadow-glow"
    >
      <Link to={`/calendrier/${race.id}`} className="flex flex-1 flex-col p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-glow">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-4xl font-black leading-none text-f1red/90 md:text-5xl">
            {String(race.round).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="relative z-10 rounded-full border border-white/10 bg-carbon/60 p-2 text-titanium transition hover:border-f1red hover:text-f1red"
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(race.id);
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-f1red text-f1red' : ''}`} aria-hidden />
          </button>
        </div>
        <h2 className="mt-4 font-black leading-tight tracking-tight text-titanium md:text-xl">{race.name}</h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-titanium/60">
          <MapPin className="h-4 w-4 shrink-0 text-glow/80" aria-hidden />
          {race.circuit}
        </p>
        <p className="mt-1 text-xs uppercase tracking-widest text-titanium/45">
          {race.dates.start} → {race.dates.end}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-carbon/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-titanium/80">
            {race.continent}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
              race.type === 'sprint'
                ? 'border border-amber-400/50 bg-amber-500/15 text-amber-200'
                : 'border border-white/10 bg-white/5 text-titanium/75'
            }`}
          >
            {race.type === 'sprint' ? 'Sprint' : 'Standard'}
          </span>
          {race.isNewCircuit && (
            <span className="rounded-full border border-glow/40 bg-glow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-glow">
              Nouveau tracé
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
