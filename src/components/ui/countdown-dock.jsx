import { Link } from 'react-router-dom';
import { useRaces, getNextRace, raceWeekendStartIso } from '../../hooks/use-races.js';
import { useCountdown } from '../../hooks/use-countdown.js';

export function CountdownDock() {
  const races = useRaces();
  const next = getNextRace(races);
  const target = raceWeekendStartIso(next);
  const { done, label } = useCountdown(target);
  const urgent = !done && next && new Date(target).getTime() - Date.now() < 3600000;

  return (
    <aside
      className={`liquid-glass fixed bottom-16 right-4 z-40 hidden max-w-xs rounded-2xl p-4 font-mono text-sm shadow-xl shadow-black/50 md:block ${
        urgent ? 'animate-pulse border-f1red/60 shadow-glow-red' : ''
      }`}
      aria-label="Compte à rebours vers le prochain Grand Prix"
    >
      <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-f1red">Next GP</p>
      <p className="mt-1 font-sans text-xs font-semibold text-titanium">{next?.name}</p>
      <p className={`mt-3 text-2xl font-bold tabular-nums tracking-tight ${done ? 'text-f1red' : 'text-glow'}`}>
        {done ? 'Race on!' : label}
      </p>
      <Link
        to={`/calendrier/${next?.id}`}
        className="mt-3 inline-block font-sans text-xs font-semibold text-titanium/70 underline-offset-2 hover:text-f1red hover:underline"
      >
        Fiche circuit →
      </Link>
    </aside>
  );
}
