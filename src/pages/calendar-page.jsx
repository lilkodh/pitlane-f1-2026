import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Search, Zap, Flag, Filter } from 'lucide-react';
import RaceCard from '../components/race-card.jsx';
import { races } from '../data/races.js';

// ============================================================
// CalendarPage — Full 24-race grid with filters + search
// ============================================================

const FILTERS = [
  { id: 'all', label: 'All Races' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'sprint', label: '⚡ Sprint' },
];

export default function CalendarPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const headerRef = useRef(null);

  useGSAP(() => {
    if (!headerRef.current) return;
    
    gsap.fromTo(
      headerRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: headerRef });

  // Filter + search logic
  const filtered = races.filter((r) => {
    const matchFilter =
      activeFilter === 'all' ||
      (activeFilter === 'sprint' && r.isSprint) ||
      r.status === activeFilter;
    const matchSearch =
      search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase()) ||
      r.country.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const sprintCount = races.filter(r => r.isSprint).length;
  const completedCount = races.filter(r => r.status === 'completed').length;

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>

      {/* Page header */}
      <div
        ref={headerRef}
        style={{ padding: '60px 32px 40px', maxWidth: '1200px', margin: '0 auto' }}
      >
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', color: '#39FF88', display: 'block', marginBottom: '12px' }}>
          2026 SEASON
        </span>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F0F0F0', lineHeight: 1, marginBottom: '16px' }}>
          Race Calendar
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'rgba(240,240,240,0.45)', maxWidth: '560px', lineHeight: 1.6, marginBottom: '32px' }}>
          24 Grand Prix across 5 continents. Track every race, mark your favourites, and log your watched history.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { icon: <Flag size={14} />, value: '24', label: 'Races' },
            { icon: <Zap size={14} />, value: sprintCount.toString(), label: 'Sprint Weekends' },
            { icon: <Filter size={14} />, value: completedCount.toString(), label: 'Completed' },
          ].map(({ icon, value, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px 16px' }}>
              <span style={{ color: '#39FF88' }}>{icon}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#F0F0F0' }}>{value}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(240,240,240,0.35)' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600,
                  letterSpacing: '0.04em', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                  border: activeFilter === id ? '1px solid rgba(57,255,136,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  background: activeFilter === id ? 'rgba(57,255,136,0.1)' : 'rgba(255,255,255,0.03)',
                  color: activeFilter === id ? '#39FF88' : 'rgba(240,240,240,0.5)',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: '320px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,240,240,0.3)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search race, city, country…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '9px 12px 9px 34px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px', color: '#F0F0F0', outline: 'none',
                fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
              }}
            />
          </div>
        </div>
      </div>

      {/* Race grid */}
      <div style={{ padding: '0 32px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(240,240,240,0.25)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem' }}>
            No races match your filter.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filtered.map((race, i) => (
              <RaceCard key={race.id} race={race} index={i} image={race.cityImage} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
