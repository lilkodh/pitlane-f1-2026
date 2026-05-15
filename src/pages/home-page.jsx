import { useRef } from 'react';
import { Link } from 'react-router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ChevronRight, Zap, Users } from 'lucide-react';
import Hero from '../components/hero.jsx';
import RaceCard from '../components/race-card.jsx';
import { races, teams } from '../data/races.js';

// ============================================================
// HomePage — Paddock View
// Sections: Hero → Featured Races → Teams Grid → Season Stats
// ============================================================

// First 6 upcoming or recent races for the featured grid
const featuredRaces = races.slice(0, 6);

export default function HomePage() {
  const sectionsRef = useRef(null);

  useGSAP(() => {
    // Section titles scroll reveal
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.fromTo(el,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
  }, { scope: sectionsRef });

  return (
    <div ref={sectionsRef}>
      {/* ── 8D Hero ── */}
      <Hero />

      {/* ── Featured Races ── */}
      <section style={{ padding: '80px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="2026 SEASON CALENDAR"
          title="Featured Races"
          subtitle="24 circuits. 11 teams. 100% sustainable fuel. The 2026 season rewrites history."
          linkTo="/calendar"
          linkLabel="Full Calendar"
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '48px',
        }}>
          {featuredRaces.map((race, i) => (
            <RaceCard key={race.id} race={race} index={i} />
          ))}
        </div>
      </section>

      {/* ── Cadillac Spotlight ── */}
      <section style={{ padding: '60px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(200,16,46,0.06)',
          border: '1px solid rgba(200,16,46,0.2)',
          borderRadius: '20px',
          padding: '48px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(200,16,46,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ flex: '1 1 300px' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(200,16,46,0.8)', display: 'block', marginBottom: '12px' }}>
              🆕 2026 EXPANSION — 11TH TEAM
            </span>
            <h2 className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#F0F0F0', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}>
              Cadillac F1<br />
              <span style={{ color: '#C8102E' }}>Enters the Grid</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(240,240,240,0.55)', lineHeight: 1.7, maxWidth: '480px', marginBottom: '24px' }}>
              The American icon makes its Formula 1 debut in 2026, bringing General Motors power and decades of racing heritage to the most competitive grid in history. Pitlane Grid: 11 teams. 22 drivers. One championship.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <StatBadge value="11" label="Teams" />
              <StatBadge value="22" label="Drivers" />
              <StatBadge value="24" label="Grand Prix" />
              <StatBadge value="100%" label="Sustainable Fuel" color="#39FF88" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Teams Grid ── */}
      <section style={{ padding: '60px 32px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="2026 CONSTRUCTORS"
          title="All 11 Teams"
          subtitle="From Ferrari's Maranello factory to Cadillac's American ambition — the 2026 grid is set."
          linkTo="/calendar"
          linkLabel="Race Calendar"
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
          marginTop: '40px',
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

function SectionHeader({ eyebrow, title, subtitle, linkTo, linkLabel }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
      <div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(57,255,136,0.7)', display: 'block', marginBottom: '10px' }}>
          {eyebrow}
        </span>
        <h2 className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#F0F0F0', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
          {title}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(240,240,240,0.45)', maxWidth: '520px', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      </div>
      {linkTo && (
        <Link to={linkTo} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#39FF88', textDecoration: 'none', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          {linkLabel} <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}

function TeamCard({ team }) {
  return (
    <div style={{
      background: 'rgba(11,11,11,0.6)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px', padding: '16px', position: 'relative', overflow: 'hidden',
      transition: 'border-color 0.2s ease, transform 0.2s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${team.color}40`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: team.color }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>{team.name}</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {team.isNew && <span style={{ background: 'rgba(57,255,136,0.1)', border: '1px solid rgba(57,255,136,0.2)', color: '#39FF88', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.1em', padding: '2px 5px', borderRadius: '3px' }}>NEW</span>}
          {team.isChampion && <span style={{ background: 'rgba(255,214,10,0.1)', border: '1px solid rgba(255,214,10,0.2)', color: '#FFD60A', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.1em', padding: '2px 5px', borderRadius: '3px' }}>★ CHAMP</span>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {team.drivers.map((d) => (
          <span key={d} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(240,240,240,0.45)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Users size={10} /> {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatBadge({ value, label, color = '#F0F0F0' }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 16px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: 'rgba(240,240,240,0.35)', marginTop: '3px' }}>{label}</div>
    </div>
  );
}
