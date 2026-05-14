import { create } from 'zustand'

const getInitialFavorites = () => {
  try {
    const item = localStorage.getItem('pitlane_favorites')
    return item ? JSON.parse(item) : []
  } catch (error) {
    return []
  }
}

const getInitialWatched = () => {
  try {
    const item = localStorage.getItem('pitlane_watched')
    return item ? JSON.parse(item) : []
  } catch (error) {
    return []
  }
}

export const usePitlaneStore = create((set) => ({
  favorites: getInitialFavorites(),
  watchedRaces: getInitialWatched(),
  filter: 'all',

  toggleFavorite: (raceId) => set((state) => {
    const newFavorites = state.favorites.includes(raceId)
      ? state.favorites.filter(id => id !== raceId)
      : [...state.favorites, raceId];
    
    localStorage.setItem('pitlane_favorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  }),

  toggleWatched: (raceId) => set((state) => {
    const newWatched = state.watchedRaces.includes(raceId)
      ? state.watchedRaces.filter(id => id !== raceId)
      : [...state.watchedRaces, raceId];
    
    localStorage.setItem('pitlane_watched', JSON.stringify(newWatched));
    return { watchedRaces: newWatched };
  }),

  setFilter: (filter) => set({ filter })
}))
