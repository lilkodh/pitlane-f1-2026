import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePitlaneStore = create(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: 'pitlane-storage',
    }
  )
)
