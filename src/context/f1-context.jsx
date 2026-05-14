import { createContext, useContext, useState, useEffect } from 'react'

const F1Context = createContext()

export function F1Provider({ children }) {
  // Initialize from localStorage or empty array
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('pitlane-favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [watchedRaces, setWatchedRaces] = useState(() => {
    try {
      const stored = localStorage.getItem('pitlane-watched')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pitlane-favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('pitlane-watched', JSON.stringify(watchedRaces))
  }, [watchedRaces])

  // Actions
  const toggleFavorite = (raceId) => {
    setFavorites(prev => 
      prev.includes(raceId) 
        ? prev.filter(id => id !== raceId)
        : [...prev, raceId]
    )
  }

  const toggleWatched = (raceId) => {
    setWatchedRaces(prev => 
      prev.includes(raceId)
        ? prev.filter(id => id !== raceId)
        : [...prev, raceId]
    )
  }

  const value = {
    favorites,
    watchedRaces,
    toggleFavorite,
    toggleWatched
  }

  return (
    <F1Context.Provider value={value}>
      {children}
    </F1Context.Provider>
  )
}

export function useF1Context() {
  const context = useContext(F1Context)
  if (!context) {
    throw new Error('useF1Context must be used within an F1Provider')
  }
  return context
}
