import { create } from 'zustand';
import racesJson from '../data/races.json';
import type { Race } from '../types/race';

const races: Race[] = racesJson as Race[];

function endOfWeekend(race: Race): Date {
  return new Date(`${race.dates.end}T23:59:59.000Z`);
}

export interface RaceStore {
  /** Full 2026 calendar (seed data — replace with API later if needed). */
  races: Race[];
  getRaceById: (id: string) => Race | undefined;
  /** Next race whose weekend has not fully ended (by UTC end-of-day). */
  getNextRace: (now?: Date) => Race | undefined;
}

export const useRaceStore = create<RaceStore>((_set, get) => ({
  races,
  getRaceById: (id) => get().races.find((r) => r.id === id),
  getNextRace: (now = new Date()) => {
    const list = get().races;
    const sorted = [...list].sort((a, b) => a.round - b.round);
    return sorted.find((r) => endOfWeekend(r) >= now) ?? sorted[sorted.length - 1];
  },
}));
