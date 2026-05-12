import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Favorites store — persisted to localStorage via Zustand's persist middleware.
 * Tracks favorited driver IDs and team IDs.
 */
export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────────────────────
      favoriteDrivers: [],
      favoriteTeams: [],

      // ── Actions ────────────────────────────────────────────────────────────
      toggleFavoriteDriver: (driverId) => {
        const current = get().favoriteDrivers
        const exists = current.includes(driverId)
        set({
          favoriteDrivers: exists
            ? current.filter((id) => id !== driverId)
            : [...current, driverId],
        })
      },

      toggleFavoriteTeam: (teamId) => {
        const current = get().favoriteTeams
        const exists = current.includes(teamId)
        set({
          favoriteTeams: exists
            ? current.filter((id) => id !== teamId)
            : [...current, teamId],
        })
      },

      isFavoriteDriver: (driverId) => get().favoriteDrivers.includes(driverId),
      isFavoriteTeam: (teamId) => get().favoriteTeams.includes(teamId),

      clearFavorites: () => set({ favoriteDrivers: [], favoriteTeams: [] }),
    }),
    {
      name: 'pitlane-favorites', // localStorage key
    },
  ),
)
