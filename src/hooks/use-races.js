import { useMemo } from 'react';
import racesData from '../data/races.json';

export function useRaces() {
  return useMemo(() => racesData, []);
}

/** Sunday GP session anchor for countdown (approximate). */
export function raceWeekendStartIso(race) {
  return `${race.dates.end}T14:00:00.000Z`;
}

export function getNextRace(races, now = new Date()) {
  const sorted = [...races].sort((a, b) => a.round - b.round);
  const endOfWeekend = (r) => new Date(`${r.dates.end}T23:59:59.000Z`);
  return sorted.find((r) => endOfWeekend(r) >= now) ?? sorted[sorted.length - 1];
}
