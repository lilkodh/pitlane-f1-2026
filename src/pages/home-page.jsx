import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Hero from '../components/hero.jsx';
import CardGrid from '../components/card-grid.jsx';
import { teams } from '../data/races.js';
import { Users } from 'lucide-react';

// ============================================================
// HomePage — The 8D Pitlane Experience
// ============================================================

export default function HomePage() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} style={{ background: '#050505', minHeight: '100vh' }}>
      {/* 🏎️ PHASE 1: THE 8D HERO */}
      <Hero />

      {/* 🏁 PHASE 2: THE 4D CARD GRID */}
      <CardGrid />

      {/* 🏢 PHASE 3: GRID DETAILS (Teams Spotlight) */}
      <section style={{ padding: '120px 5%', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: '#39FF88', letterSpacing: '0.2em' }}>
            CONSTRUCTORS
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '3rem', fontWeight: 800, color: '#FFF', letterSpacing: '-0.02em' }}>
            2026 Grid Entrants
          </h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────

function TeamCard({ team }) {
  return (
    <div style={{
      background: 'rgba(11,11,11,0.6)', 
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '20px', 
      padding: '32px', 
      position: 'relative', 
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={e => { 
        e.currentTarget.style.borderColor = `${team.color}60`; 
        e.currentTarget.style.transform = 'translateY(-5px)'; 
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; 
        e.currentTarget.style.transform = 'translateY(0)'; 
        e.currentTarget.style.background = 'rgba(11,11,11,0.6)';
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: team.color }} />
      <h4 style={{ 
        fontFamily: "'Space Grotesk', sans-serif", 
        fontSize: '1.4rem', 
        fontWeight: 800, 
        color: '#F0F0F0', 
        marginBottom: '16px' 
      }}>
        {team.name}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {team.drivers.map((d) => (
          <div key={d} style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontSize: '0.85rem', 
            color: 'rgba(240,240,240,0.4)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}>
            <Users size={14} color={team.color} /> {d}
          </div>
        ))}
      </div>
    </div>
  );
}
