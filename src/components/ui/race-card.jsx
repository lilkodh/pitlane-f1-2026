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
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-white/12 bg-pit-card shadow-card-lift transition-shadow duration-300 ease-pit hover:border-neon-blue/35 hover:shadow-glow"
    >
      <div className="pointer-events-none absolute inset-0 bg-pit-sheen opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <Link
        to={`/calendrier/${race.id}`}
        className="relative flex flex-1 flex-col p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-4xl font-black leading-none text-f1red/95 md:text-5xl">
            {String(race.round).padStart(2, '0')}
          </span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            className="relative z-10 min-h-[40px] min-w-[40px] rounded-full border border-white/15 bg-carbon/70 p-2 text-titanium transition-colors duration-200 ease-pit hover:border-f1red hover:text-f1red hover:shadow-glow-subtle"
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(race.id);
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-f1red text-f1red' : ''}`} aria-hidden />
          </motion.button>
        </div>
        <h2 className="mt-4 text-xl font-black leading-tight tracking-tight text-titanium md:text-pit-card">
          {race.name}
        </h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-titanium/65">
          <MapPin className="h-4 w-4 shrink-0 text-neon-blue/85" aria-hidden />
          {race.circuit}
        </p>
        <p className="mt-1 text-xs uppercase tracking-widest text-titanium/45">
          {race.dates.start} → {race.dates.end}
        </p>
        <div className="mt-4 h-1 w-full max-w-[120px] rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-f1red to-neon-blue/80"
            style={{ width: `${Math.min(100, race.round * 4)}%` }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded border border-white/10 bg-carbon/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-titanium/80">
            {race.continent}
          </span>
          <span
            className={`rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
              race.type === 'sprint'
                ? 'border border-lamborghini/60 bg-lamborghini/15 text-lamborghini'
                : 'border border-white/12 bg-white/5 text-titanium/80'
            }`}
          >
            {race.type === 'sprint' ? 'Sprint' : 'Standard'}
          </span>
          {race.isNewCircuit && (
            <span className="rounded border border-record/50 bg-record/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-record">
              New circuit
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
