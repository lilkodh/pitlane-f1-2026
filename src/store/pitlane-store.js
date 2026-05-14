import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePitlaneStore = create(
  persist(
    (set, get) => ({
      favoriteIds: [],
      watchedEntries: [],

      toggleFavorite: (raceId) =>
        set((s) => ({
          favoriteIds: s.favoriteIds.includes(raceId)
            ? s.favoriteIds.filter((id) => id !== raceId)
            : [...s.favoriteIds, raceId],
        })),

      isFavorite: (raceId) => get().favoriteIds.includes(raceId),

      markWatched: (raceId) =>
        set((s) => {
          if (s.watchedEntries.some((e) => e.raceId === raceId)) return s;
          return {
            watchedEntries: [
              ...s.watchedEntries,
              { raceId, watchedAt: new Date().toISOString() },
            ],
          };
        }),

      unmarkWatched: (raceId) =>
        set((s) => ({
          watchedEntries: s.watchedEntries.filter((e) => e.raceId !== raceId),
        })),

      isWatched: (raceId) => get().watchedEntries.some((e) => e.raceId === raceId),
    }),
    { name: 'pitlane-storage-v1' }
  )
);
