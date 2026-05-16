import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { Flag, BookMarked, Calendar, Trophy, Menu, X, Palette, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, THEMES } from '../stores/theme-store.js';

// ============================================================
// Navbar — High-Fidelity Floating Magnetic Pill
// ============================================================

const navLinks = [
  { to: '/',          label: 'Paddock',   icon: Flag },
  { to: '/calendar',  label: 'Calendar',  icon: Calendar },
  { to: '/play',      label: 'Play',      icon: Zap },
  { to: '/mygarage',  label: 'My Garage', icon: BookMarked },
  { to: '/myseason',  label: 'My Season', icon: Trophy },
];

function MagneticLink({ children, to, isActive }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Move slightly towards the cursor
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        style={{
          position: 'relative',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          color: isActive ? '#050505' : 'rgba(240,240,240,0.6)',
          transition: 'color 0.3s ease',
        }}
      >
        {/* The sliding pill background */}
        {isActive && (
          <motion.div
            layoutId="nav-active-bg"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--color-accent)', // Dynamic accent pill
              borderRadius: '100px',
              zIndex: -1,
              boxShadow: '0 0 20px rgba(var(--color-accent-rgb), 0.3)',
            }}
          />
        )}
        <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {children}
        </span>
      </motion.div>
    </NavLink>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentThemeId = useThemeStore((s) => s.currentTheme.id);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: scrolled ? '16px' : '32px',
          pointerEvents: 'none',
          transition: 'padding-top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'rgba(11, 11, 11, 0.4)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid',
            borderColor: scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
            borderRadius: '100px',
            padding: '8px 12px 8px 24px',
            width: 'calc(100% - 48px)',
            maxWidth: '1000px',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ color: 'var(--color-accent)', transition: 'color 0.4s ease' }}>PIT</span>
            <span style={{ color: '#F0F0F0' }}>LANE</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
            className="hidden-mobile"
            aria-label="Main navigation"
          >
            {navLinks.map(({ to, label, icon: Icon }) => (
              <MagneticLink key={to} to={to} isActive={location.pathname === to || (to === '/' && location.pathname === '')}>
                <Icon size={14} />
                {label}
              </MagneticLink>
            ))}
          </nav>

          {/* Live indicator & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'rgba(240,240,240,0.4)',
                background: 'rgba(255,255,255,0.03)',
                padding: '10px 16px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              className="hidden-mobile"
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  display: 'inline-block',
                  animation: 'sprintPulse 2s ease-in-out infinite',
                  boxShadow: '0 0 10px var(--color-accent)',
                  transition: 'background 0.4s ease, box-shadow 0.4s ease'
                }}
              />
              LIVE
            </div>

            {/* Theme Switcher — Aesthetic Control Dropdown */}
            <div style={{ position: 'relative' }} className="hidden-mobile">
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '10px 18px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  color: '#F0F0F0',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: themeOpen ? '0 0 20px rgba(var(--color-accent-rgb), 0.2)' : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  if (!themeOpen) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }
                }}
              >
                <Palette size={14} style={{ color: 'var(--color-accent)' }} />
                AESTHETIC
              </button>

              <AnimatePresence>
                {themeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      background: 'rgba(11, 11, 11, 0.9)',
                      backdropFilter: 'blur(32px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '20px',
                      padding: '16px',
                      width: '240px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '12px',
                      zIndex: 1000,
                      boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
                    }}
                  >
                    <p style={{ gridColumn: 'span 5', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>
                      SELECT IDENTITY
                    </p>
                    {THEMES.map((t) => {
                      const isCurrent = currentThemeId === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            useThemeStore.getState().setTheme(t.id);
                            setThemeOpen(false);
                          }}
                          title={t.name}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: t.color,
                            border: isCurrent ? '2px solid #FFF' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: isCurrent ? `0 0 15px ${t.color}` : 'none',
                          }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        />
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'none', // Overridden by media query
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#F0F0F0',
                transition: 'all 0.2s ease',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '90px',
              left: '24px',
              right: '24px',
              zIndex: 99,
              background: 'rgba(10,10,10,0.95)',
              backdropFilter: 'blur(32px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
            }}
          >
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to || (to === '/' && location.pathname === '');
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: isActive ? '#050505' : '#F0F0F0',
                    background: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.03)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              );
            })}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '12px', 
              padding: '16px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.05)',
              marginTop: '12px',
              justifyContent: 'center'
            }}>
              {THEMES.map((t) => {
                const isCurrent = currentThemeId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => useThemeStore.getState().setTheme(t.id)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: t.color,
                      border: isCurrent ? '3px solid #FFF' : 'none',
                      cursor: 'pointer',
                      boxShadow: isCurrent ? `0 0 20px ${t.color}` : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @keyframes sprintPulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
