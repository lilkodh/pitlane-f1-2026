import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================================
// Theme Store — Manages global accent colors for the F1 experience
// ============================================================

export const THEMES = [
  { id: 'green', name: 'Petronas Green', color: '#39FF88' },
  { id: 'red', name: 'Ferrari Red', color: '#E8002D' },
  { id: 'yellow', name: 'Sprint Yellow', color: '#FFD60A' },
  { id: 'blue', name: 'Oracle Blue', color: '#3671C6' },
  { id: 'orange', name: 'McLaren Orange', color: '#FF8000' },
  { id: 'cyan', name: 'Electric Cyan', color: '#00F5FF' },
  { id: 'pink', name: 'Alpine Pink', color: '#FF66B2' },
  { id: 'gold', name: 'Championship Gold', color: '#D4AF37' },
  { id: 'ice', name: 'Arctic Ice', color: '#E0F2FE' },
  { id: 'neon', name: 'Cyber Neon', color: '#CCFF00' },
];

export const useThemeStore = create(
  persist(
    (set) => ({
      currentTheme: THEMES[0],
      setTheme: (themeId) => {
        const theme = THEMES.find((t) => t.id === themeId);
        if (theme) {
          set({ currentTheme: theme });
          // Also update CSS variable directly for instant feedback
          document.documentElement.style.setProperty('--color-accent', theme.color);
          document.documentElement.style.setProperty('--color-accent-rgb', hexToRgb(theme.color));
        }
      },
    }),
    { name: 'pitlane-theme-storage' }
  )
);

// Helper to convert hex to RGB for CSS rgba() usage
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '57, 255, 136';
}
