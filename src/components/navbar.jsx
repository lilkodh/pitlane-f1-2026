import { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router';
import { Flag, BookMarked, Calendar, Trophy, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// ============================================================
// Navbar — Floating glass navigation bar
// Fixed at top, glassmorphism panel, animated mobile menu
// ============================================================

const navLinks = [
  { to: '/',          label: 'Paddock',   icon: Flag },
  { to: '/calendar',  label: 'Calendar',  icon: Calendar },
  { to: '/mygarage',  label: 'My Garage', icon: BookMarked },
  { to: '/myseason',  label: 'My Season', icon: Trophy },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Entrance animation on mount
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, { scope: navRef });

  // Animate mobile menu open/close
  const toggleMobile = () => {
    if (!mobileOpen) {
      setMobileOpen(true);
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setMobileOpen(false),
      });
    }
  };

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 24px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(5, 5, 5, 0.7)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.4rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: '#39FF88' }}>PIT</span>
        <span style={{ color: '#F0F0F0' }}>LANE</span>
        <span
          style={{
            fontSize: '0.55rem',
            fontWeight: 500,
            color: 'rgba(240,240,240,0.4)',
            letterSpacing: '0.15em',
            marginLeft: '4px',
            alignSelf: 'flex-end',
            marginBottom: '4px',
          }}
        >
          F1 2026
        </span>
      </Link>

      {/* Desktop Nav Links */}
      <nav
        style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
        className="hidden-mobile"
        aria-label="Main navigation"
      >
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
              color: isActive ? '#39FF88' : 'rgba(240,240,240,0.6)',
              background: isActive ? 'rgba(57,255,136,0.08)' : 'transparent',
              border: isActive ? '1px solid rgba(57,255,136,0.2)' : '1px solid transparent',
            })}
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Live indicator */}
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
        }}
        className="hidden-mobile"
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#39FF88',
            display: 'inline-block',
            animation: 'sprintPulse 2s ease-in-out infinite',
          }}
        />
        2026 SEASON LIVE
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={toggleMobile}
        aria-label="Toggle mobile menu"
        aria-expanded={mobileOpen}
        style={{
          background: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          color: '#F0F0F0',
          display: 'none',
        }}
        className="mobile-menu-btn"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          style={{
            position: 'absolute',
            top: '72px',
            left: 0,
            right: 0,
            background: 'rgba(5,5,5,0.95)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1rem',
                fontWeight: 500,
                color: isActive ? '#39FF88' : 'rgba(240,240,240,0.7)',
                background: isActive ? 'rgba(57,255,136,0.08)' : 'transparent',
              })}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Inline responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
