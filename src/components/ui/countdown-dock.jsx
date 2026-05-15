import { Link } from 'react-router-dom';
import { useRaces, getNextRace, raceWeekendStartIso } from '../../hooks/use-races.js';
import { useCountdown } from '../../hooks/use-countdown.js';

export function CountdownDock() {
  const races = useRaces();
  const next = getNextRace(races);
  const target = raceWeekendStartIso(next);
  const { done, label } = useCountdown(target);
  const ms = next ? new Date(target).getTime() - Date.now() : 0;
  const urgent1h = !done && ms > 0 && ms < 3600000;
  const urgent24h = !done && ms > 0 && ms < 86400000 && !urgent1h;

  return (
    <aside
      className={`liquid-glass fixed bottom-16 right-4 z-40 hidden max-w-xs rounded-2xl border border-white/10 p-4 font-mono text-sm shadow-card-lift md:block ${
        urgent1h
          ? 'animate-pit-pulse-fast border-f1red/70 shadow-glow-intense'
          : urgent24h
            ? 'animate-pit-pulse-slow border-neon-blue/40 shadow-glow'
            : ''
      }`}
      aria-label="Countdown to the next Grand Prix"
    >
      <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-f1red">Next race in</p>
      <p className="mt-1 font-sans text-xs font-semibold text-titanium">{next?.name}</p>
      <p
        className={`mt-3 text-pit-countdown font-bold tabular-nums tracking-tight ${
          done ? 'text-f1red' : 'text-glow drop-shadow-[0_0_12px_rgba(0,217,255,0.35)]'
        }`}
      >
        {done ? 'Race on!' : label}
      </p>
      <Link
        to={`/calendrier/${next?.id}`}
        className="mt-3 inline-block font-sans text-xs font-semibold text-titanium/70 underline-offset-2 transition-colors duration-200 ease-pit hover:text-f1red hover:underline"
      >
        Circuit page →
      </Link>
    </aside>
  );
}
