import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Car, Heart } from 'lucide-react';
import { useRaces } from '../hooks/use-races.js';
import { usePitlaneStore } from '../store/pitlane-store.js';

const emptyVariants = {
  icon: {
    initial: { scale: 0, rotate: -20 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 260, damping: 18 },
    },
  },
  line1: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  line2: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.28, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  cta: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
};

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
        <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-f1red">My garage</p>
        <h1 className="mt-2 text-pit-page font-black tracking-tight text-titanium">Favorite races</h1>
        <p className="mt-3 max-w-xl text-base text-titanium/65">
          Your personal collection — remove a favorite from a card or the race page.
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className="liquid-glass overflow-hidden rounded-2xl border border-f1red/20 p-12 text-center shadow-card-lift md:p-16">
          <motion.div
            variants={emptyVariants.icon}
            initial="initial"
            animate="animate"
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue"
          >
            <Car className="h-10 w-10" aria-hidden />
          </motion.div>
          <motion.p
            variants={emptyVariants.line1}
            initial="initial"
            animate="animate"
            className="mt-6 text-3xl font-black tracking-tight text-titanium md:text-4xl"
          >
            Your garage is empty
          </motion.p>
          <motion.p
            variants={emptyVariants.line2}
            initial="initial"
            animate="animate"
            className="mx-auto mt-3 max-w-md text-base text-titanium/65"
          >
            Add races from the calendar — the heart icon and grid come alive.
          </motion.p>
          <motion.div variants={emptyVariants.cta} initial="initial" animate="animate" className="mt-8">
            <Link
              to="/calendrier"
              className="inline-flex min-h-[48px] items-center justify-center rounded border-2 border-f1red bg-f1red/90 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-glow-red transition duration-200 ease-pit hover:scale-105 hover:shadow-glow-intense"
            >
              Browse calendar
            </Link>
          </motion.div>
          <Heart className="mx-auto mt-8 h-6 w-6 text-f1red/20" aria-hidden />
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((race) => (
            <li key={race.id}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <Link
                  to={`/calendrier/${race.id}`}
                  className="liquid-glass group flex flex-col gap-3 rounded-xl border border-white/10 p-5 shadow-card-lift transition-shadow duration-300 hover:border-f1red/40 hover:shadow-glow"
                >
                  <p className="font-mono text-xs text-f1red">R{String(race.round).padStart(2, '0')}</p>
                  <p className="text-lg font-bold text-titanium">{race.name}</p>
                  <p className="text-sm text-titanium/55">
                    {race.circuit} — {race.dates.start}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-neon-blue opacity-0 transition group-hover:opacity-100">
                    Open →
                  </span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
