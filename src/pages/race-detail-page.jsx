import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, Heart, CheckCircle2 } from 'lucide-react';
import { useRaces } from '../hooks/use-races.js';
import { usePitlaneStore } from '../store/pitlane-store.js';

export default function RaceDetailPage() {
  const { raceId } = useParams();
  const navigate = useNavigate();
  const races = useRaces();
  const race = useMemo(() => races.find((r) => r.id === raceId), [races, raceId]);
  const rootRef = useRef(null);

  const toggleFavorite = usePitlaneStore((s) => s.toggleFavorite);
  const isFavorite = usePitlaneStore((s) => (race ? s.isFavorite(race.id) : false));
  const markWatched = usePitlaneStore((s) => s.markWatched);
  const unmarkWatched = usePitlaneStore((s) => s.unmarkWatched);
  const isWatched = usePitlaneStore((s) => (race ? s.isWatched(race.id) : false));

  useGSAP(
    () => {
      const blocks = rootRef.current?.querySelectorAll('[data-bento]');
      if (!blocks?.length) return undefined;
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      );
    },
    { dependencies: [race?.id], scope: rootRef }
  );

  if (!race) {
    return (
      <div className="py-20 text-center">
        <p className="text-titanium/70">Grand Prix introuvable.</p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-glow underline"
          onClick={() => navigate('/calendrier')}
        >
          Retour calendrier
        </button>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="space-y-8 pb-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-carbon-2 via-carbon to-carbon-3 p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2240%22%20height=%2240%22%3E%3Cpath%20d=%22M0%2040h40M40%200v40%22%20stroke=%22%23ffffff%22%20stroke-opacity=%22.04%22/%3E%3C/svg%3E')]" />
        <nav className="relative text-xs font-semibold uppercase tracking-widest text-titanium/50">
          <Link to="/calendrier" className="hover:text-glow">
            Calendrier
          </Link>
          <span className="mx-2">/</span>
          <span className="text-titanium">{race.name}</span>
        </nav>
        <div className="relative mt-6 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-mono text-sm text-f1red">R{String(race.round).padStart(2, '0')}</p>
            <h1 className="mt-2 max-w-2xl text-4xl font-black tracking-tight text-titanium md:text-5xl">
              {race.name}
            </h1>
            <p className="mt-3 text-titanium/65">
              {race.circuit} — {race.country}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleFavorite(race.id)}
              className={`liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                isFavorite ? 'border-f1red text-f1red' : 'text-titanium'
              }`}
              aria-pressed={isFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} aria-hidden />
              Favori
            </button>
            <button
              type="button"
              onClick={() => (isWatched ? unmarkWatched(race.id) : markWatched(race.id))}
              className="liquid-glass flex items-center gap-2 rounded-full border border-glow/30 px-4 py-2 text-sm font-semibold text-glow"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              {isWatched ? 'Vu — annuler' : 'Marquer comme vu'}
            </button>
          </div>
        </div>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-titanium/75 md:text-base">{race.description}</p>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Bento title="Longueur" value={`${race.circuitLength} km`} hint="Circuit" />
        <Bento title="Tours" value={`${race.laps}`} hint="Distance de course" />
        <Bento title="Format" value={race.type === 'sprint' ? 'Sprint' : 'Standard'} hint="Week-end" />
        <Bento
          title="Continent"
          value={race.continent}
          hint={race.isNewCircuit ? 'Nouveau tracé' : 'Calendrier 2026'}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div data-bento className="liquid-glass rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-f1red">Télémétrie (mock)</h2>
          <p className="mt-3 text-sm text-titanium/65">
            Grille type Stitch / bento — vitesses de pointe, zones d’aéro active et records au tour peuvent être
            branchés sur une API plus tard.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase text-titanium/45">Vmax théorique</dt>
              <dd className="font-mono text-xl text-glow">342 km/h</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-titanium/45">Zones actives</dt>
              <dd className="font-mono text-xl text-glow">3</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-titanium/45">Tour record (mock)</dt>
              <dd className="font-mono text-xl text-glow">1:24.319</dd>
            </div>
          </dl>
        </div>
        <div data-bento className="liquid-glass rounded-2xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-f1red">Dates</h2>
          <p className="mt-4 font-mono text-lg text-titanium">
            {race.dates.start}
            <span className="text-titanium/40"> → </span>
            {race.dates.end}
          </p>
          {race.isNewCircuit && (
            <p className="mt-4 rounded-lg border border-glow/30 bg-glow/5 px-3 py-2 text-xs text-glow">
              Nouveau circuit sur le calendrier 2026.
            </p>
          )}
        </div>
      </section>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-titanium/70 hover:text-glow"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Retour
      </button>
    </div>
  );
}

function Bento({ title, value, hint }) {
  return (
    <div data-bento className="liquid-glass rounded-2xl p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-titanium/45">{title}</p>
      <p className="mt-2 font-mono text-2xl font-bold text-titanium">{value}</p>
      <p className="mt-1 text-xs text-titanium/50">{hint}</p>
    </div>
  );
}
