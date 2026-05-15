import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight, Heart, CheckCircle2, Gauge, Mountain, Cloud } from 'lucide-react';
import { useRaces } from '../hooks/use-races.js';
import { usePitlaneStore } from '../store/pitlane-store.js';

const ACCENTS = [
  'border-l-4 border-l-neon-blue',
  'border-l-4 border-l-f1red',
  'border-l-4 border-l-teams-mercedes',
  'border-l-4 border-l-teams-mclaren',
];

export default function RaceDetailPage() {
  const { raceId } = useParams();
  const navigate = useNavigate();
  const races = useRaces();
  const race = useMemo(() => races.find((r) => r.id === raceId), [races, raceId]);
  const rootRef = useRef(null);
  const heroScopeRef = useRef(null);
  const heroBgRef = useRef(null);

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
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' }
      );
    },
    { dependencies: [race?.id], scope: rootRef }
  );

  useGSAP(
    () => {
      const bg = heroBgRef.current;
      const scope = heroScopeRef.current;
      if (!bg || !scope) return undefined;
      const tween = gsap.fromTo(
        bg,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
      return () => tween.scrollTrigger?.kill();
    },
    { dependencies: [race?.id], scope: heroScopeRef }
  );

  if (!race) {
    return (
      <div className="py-20 text-center">
        <p className="text-titanium/70">Grand Prix not found.</p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-neon-blue underline"
          onClick={() => navigate('/calendrier')}
        >
          Back to calendar
        </button>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="space-y-10 pb-16">
      <section
        ref={heroScopeRef}
        className="relative -mx-4 min-h-[48vh] overflow-hidden rounded-2xl border border-white/10 md:-mx-0 md:min-h-[52vh]"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-0 scale-110 bg-[length:120%_auto] bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(10,10,10,0.5) 0%, rgba(30,65,255,0.15) 40%, rgba(220,0,0,0.12) 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath d='M20 100 Q100 20 180 100 T20 100' fill='none' stroke='%23ffffff' stroke-opacity='0.07' stroke-width='2'/%3E%3Cpath d='M40 140 Q100 60 160 140' fill='none' stroke='%2300d9ff' stroke-opacity='0.12' stroke-width='1.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/20 via-carbon/75 to-carbon" />
        <div className="relative z-10 flex min-h-[48vh] flex-col justify-end px-6 pb-10 pt-16 md:min-h-[52vh] md:px-10 md:pb-12 md:pt-20">
          <nav
            className="mb-6 flex flex-wrap items-center gap-1 font-condensed text-[11px] font-semibold uppercase tracking-[0.2em] text-titanium/50"
            aria-label="Breadcrumb"
          >
            <Link to="/calendrier" className="transition-colors hover:text-neon-blue">
              Calendar
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-titanium/35" aria-hidden />
            <span className="text-titanium/90">{race.name}</span>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.35em] text-f1red">
                Round {String(race.round).padStart(2, '0')} of 24
              </p>
              <h1 className="pit-metallic-text mt-2 max-w-3xl text-pit-page">{race.name}</h1>
              <p className="mt-3 text-lg text-titanium/70">
                {race.circuit}
                <span className="text-titanium/45"> — </span>
                {race.country}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => toggleFavorite(race.id)}
                className={`liquid-glass flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:shadow-glow-subtle ${
                  isFavorite ? 'border-f1red text-f1red shadow-glow-red' : 'text-titanium'
                }`}
                aria-pressed={isFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} aria-hidden />
                Favorite
              </button>
              <button
                type="button"
                onClick={() => (isWatched ? unmarkWatched(race.id) : markWatched(race.id))}
                className="liquid-glass flex min-h-[44px] items-center gap-2 rounded-full border border-neon-blue/35 px-4 py-2 text-sm font-semibold text-neon-blue transition hover:shadow-glow"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                {isWatched ? 'Watched — undo' : 'Mark as watched'}
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatPill icon={Gauge} label="Laps" value={String(race.laps)} accent={ACCENTS[0]} />
            <StatPill
              icon={Mountain}
              label="Length"
              value={`${race.circuitLength} km`}
              accent={ACCENTS[1]}
            />
            <StatPill
              icon={Cloud}
              label="Format"
              value={race.type === 'sprint' ? 'Sprint' : 'Standard'}
              accent={ACCENTS[2]}
            />
            <StatPill
              icon={CheckCircle2}
              label="New circuit"
              value={race.isNewCircuit ? 'Yes' : 'No'}
              accent={ACCENTS[3]}
            />
          </div>
        </div>
      </section>

      <p className="mx-auto max-w-3xl text-lg leading-relaxed text-titanium/75">{race.description}</p>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Bento
          title="Continent"
          value={race.continent}
          hint="Calendar filter"
          accent="border-l-4 border-l-teams-redbull"
        />
        <Bento
          title="Weekend format"
          value={race.type === 'sprint' ? 'Sprint' : 'Standard'}
          hint={race.type === 'sprint' ? 'Sprint format' : 'Classic race'}
          accent="border-l-4 border-l-lamborghini"
        />
        <Bento title="Country code" value={race.countryCode} hint="ISO" accent="border-l-4 border-l-neon-blue" />
        <Bento
          title="Status"
          value={race.isNewCircuit ? 'New for 2026' : 'Established'}
          hint="FIA calendar"
          accent="border-l-4 border-l-record"
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article
          data-bento
          className="liquid-glass rounded-2xl border-l-4 border-l-f1red p-6 shadow-card-lift"
        >
          <h2 className="font-condensed text-[11px] font-bold uppercase tracking-[0.25em] text-f1red">
            Circuit history
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-titanium/65">
            The track by the numbers: years on the calendar, layout evolutions, and standout moments — hook up
            editorial content here later.
          </p>
          <ul className="mt-4 space-y-2 font-mono text-xs text-titanium/55">
            <li>• Lap record (mock) — 1:20.235</li>
            <li>• Last constructor win — TBD</li>
          </ul>
        </article>
        <article
          data-bento
          className="liquid-glass rounded-2xl border-l-4 border-l-neon-blue p-6 shadow-card-lift"
        >
          <h2 className="font-condensed text-[11px] font-bold uppercase tracking-[0.25em] text-neon-blue">
            Telemetry
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-titanium/65">
            Theoretical top speed, DRS zones, and braking behaviour — same scaffold as the Stitch mock-up.
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-[10px] uppercase text-titanium/45">Vmax</dt>
              <dd className="font-mono text-lg text-glow">318 km/h</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-titanium/45">Active zones</dt>
              <dd className="font-mono text-lg text-glow">3</dd>
            </div>
          </dl>
        </article>
        <article
          data-bento
          className="liquid-glass rounded-2xl border-l-4 border-l-teams-mclaren p-6 shadow-card-lift"
        >
          <h2 className="font-condensed text-[11px] font-bold uppercase tracking-[0.25em] text-teams-mclaren">
            Forecast (mock)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-titanium/65">
            Weather, tyre trends, and fan picks — ideal for an API-backed card or generated copy.
          </p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div data-bento className="liquid-glass rounded-2xl p-6 lg:col-span-2">
          <h2 className="font-condensed text-[11px] font-bold uppercase tracking-[0.25em] text-f1red">
            Live data (placeholder)
          </h2>
          <p className="mt-3 text-sm text-titanium/65">
            Wire in charts, sectors, and driver comparisons — same scaffold as the Figma / Stitch mock-up.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {['S1', 'S2', 'S3'].map((s, i) => (
              <div key={s} className="rounded-xl border border-white/10 bg-carbon/40 p-4 text-center">
                <p className="font-mono text-xs text-titanium/45">{s}</p>
                <p className="mt-2 font-mono text-xl text-neon-blue">{['24.1', '31.0', '26.8'][i]}s</p>
              </div>
            ))}
          </div>
        </div>
        <div data-bento className="liquid-glass rounded-2xl p-6">
          <h2 className="font-condensed text-[11px] font-bold uppercase tracking-[0.25em] text-f1red">Dates</h2>
          <p className="mt-4 font-mono text-lg text-titanium">
            {race.dates.start}
            <span className="text-titanium/40"> → </span>
            {race.dates.end}
          </p>
          {race.isNewCircuit && (
            <p className="mt-4 rounded-lg border border-record/40 bg-record/10 px-3 py-2 text-xs text-record">
              New circuit — FIA homologation tracked in Pitlane.
            </p>
          )}
        </div>
      </section>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-titanium/70 transition hover:text-neon-blue"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Back
      </button>
    </div>
  );
}

function StatPill({ icon: Icon, label, value, accent }) {
  return (
    <div
      className={`liquid-glass flex items-center gap-3 rounded-xl border border-white/10 bg-carbon/30 px-4 py-3 ${accent}`}
    >
      <Icon className="h-5 w-5 shrink-0 text-neon-blue/80" aria-hidden />
      <div>
        <p className="font-condensed text-[10px] font-bold uppercase tracking-widest text-titanium/45">
          {label}
        </p>
        <p className="font-mono text-lg font-bold text-titanium">{value}</p>
      </div>
    </div>
  );
}

function Bento({ title, value, hint, accent }) {
  return (
    <div
      data-bento
      className={`liquid-glass rounded-2xl border bg-white/[0.03] p-5 shadow-card-lift ${accent} border-l-4`}
    >
      <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.2em] text-titanium/45">
        {title}
      </p>
      <p className="mt-2 font-mono text-2xl font-bold text-titanium">{value}</p>
      <p className="mt-1 text-xs text-titanium/50">{hint}</p>
    </div>
  );
}
