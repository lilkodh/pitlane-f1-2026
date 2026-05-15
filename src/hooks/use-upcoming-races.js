import { useMemo } from 'react';

/** Next `count` races whose weekend end is still in the future (UTC end-of-day), by calendar order. */
export function useUpcomingRaces(races, count = 3) {
  return useMemo(() => {
    const sorted = [...races].sort((a, b) => a.round - b.round);
    const now = new Date();
    const end = (r) => new Date(`${r.dates.end}T23:59:59.000Z`);
    const ix = sorted.findIndex((r) => end(r) >= now);
    const start = ix === -1 ? Math.max(0, sorted.length - count) : ix;
    return sorted.slice(start, start + count);
  }, [races, count]);
}
