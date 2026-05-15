/** 2026 calendar entry — mirrors `src/data/races.json`. */
export type RaceWeekendType = 'standard' | 'sprint';

export interface RaceDates {
  start: string;
  end: string;
}

export interface Race {
  id: string;
  round: number;
  name: string;
  circuit: string;
  country: string;
  countryCode: string;
  continent: string;
  dates: RaceDates;
  type: RaceWeekendType;
  isNewCircuit: boolean;
  laps: number;
  circuitLength: number;
  description: string;
  imageUrl: string | null;
}
