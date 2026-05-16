import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import CustomCursor from '../components/custom-cursor.jsx';
import { useThemeStore } from '../stores/theme-store.js';

// ============================================================
// RootLayout — wraps all pages with Navbar + Footer
// Outlet renders the active child route
// ============================================================

export default function RootLayout() {
  const currentTheme = useThemeStore((s) => s.currentTheme);

  // Sync theme to CSS variables on load
  useEffect(() => {
    useThemeStore.getState().setTheme(currentTheme.id);
  }, []); // Only once on mount

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        position: 'relative',
      }}
      className="noise-overlay"
    >
      <CustomCursor />
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
