import { create } from 'zustand';

// ============================================================
// PITLANE F1 2026 — FAVORITES STORE (Zustand)
// Persists favorite races and watched log to localStorage
// ============================================================

const FAVORITES_KEY = 'pitlane_favorites';
const WATCHED_KEY = 'pitlane_watched';

// Load from localStorage safely
function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save to localStorage safely
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Silently fail if storage is full
  }
}

// Zustand store — simple, flat, readable state
export const useFavoritesStore = create((set, get) => ({
  // ---- State ----
  favorites: loadFromStorage(FAVORITES_KEY),   // Array of race IDs
  watched: loadFromStorage(WATCHED_KEY),        // Array of { raceId, note, watchedAt }

  // ---- Favorites Actions ----

  // Add race to favorites
  addFavorite: (raceId) => {
    const current = get().favorites;
    if (current.includes(raceId)) return;
    const updated = [...current, raceId];
    saveToStorage(FAVORITES_KEY, updated);
    set({ favorites: updated });
  },

  // Remove race from favorites
  removeFavorite: (raceId) => {
    const updated = get().favorites.filter(id => id !== raceId);
    saveToStorage(FAVORITES_KEY, updated);
    set({ favorites: updated });
  },

  // Toggle favorite (add if not present, remove if present)
  toggleFavorite: (raceId) => {
    const isFav = get().favorites.includes(raceId);
    if (isFav) {
      get().removeFavorite(raceId);
    } else {
      get().addFavorite(raceId);
    }
  },

  // Check if a race is a favorite
  isFavorite: (raceId) => get().favorites.includes(raceId),

  // ---- Watched Log Actions ----

  // Mark a race as watched (with optional note)
  markWatched: (raceId, note = '') => {
    const current = get().watched;
    const alreadyWatched = current.some(w => w.raceId === raceId);
    if (alreadyWatched) return;
    const entry = { raceId, note, watchedAt: new Date().toISOString() };
    const updated = [...current, entry];
    saveToStorage(WATCHED_KEY, updated);
    set({ watched: updated });
  },

  // Remove watched entry
  removeWatched: (raceId) => {
    const updated = get().watched.filter(w => w.raceId !== raceId);
    saveToStorage(WATCHED_KEY, updated);
    set({ watched: updated });
  },

  // Check if a race has been watched
  isWatched: (raceId) => get().watched.some(w => w.raceId === raceId),

  // Clear all data (reset)
  clearAll: () => {
    saveToStorage(FAVORITES_KEY, []);
    saveToStorage(WATCHED_KEY, []);
    set({ favorites: [], watched: [] });
  },
}));
