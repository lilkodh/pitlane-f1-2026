import { Link } from 'react-router';
import { Flag, Github, Twitter } from 'lucide-react';

// ============================================================
// Footer — minimal dark footer with brand mark
// ============================================================

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--glass-border)',
        padding: '40px 40px 32px',
        background: '#050505',
        transition: 'border-top 0.4s ease',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* Brand */}
      <div>
        <Link
          to="/"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textDecoration: 'none',
          }}
        >
          <span style={{ color: 'var(--color-accent)', transition: 'color 0.4s ease' }}>PIT</span>
          <span style={{ color: '#F0F0F0' }}>LANE</span>
        </Link>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: 'rgba(240,240,240,0.25)',
            marginTop: '6px',
          }}
        >
          2026 FIA Formula 1 World Championship Fan Dashboard
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            color: 'rgba(240,240,240,0.15)',
            marginTop: '4px',
          }}
        >
          Not affiliated with Formula One Management Ltd.
        </p>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {[
          { to: '/calendar', label: 'Calendar' },
          { to: '/mygarage', label: 'My Garage' },
          { to: '/myseason', label: 'My Season' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(240,240,240,0.35)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Season tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: 'var(--color-accent)',
          opacity: 0.4,
          transition: 'color 0.4s ease'
        }}
      >
        <Flag size={12} />
        F1 2026 — 24 RACES · 11 TEAMS · 100% SUSTAINABLE FUEL
      </div>
    </footer>
  );
}
