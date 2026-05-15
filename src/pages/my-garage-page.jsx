import { useRef } from 'react';
import { Link } from 'react-router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Star, Trash2, BookMarked } from 'lucide-react';
import { useFavoritesStore } from '../stores/favorites-store.js';
import { getRaceById } from '../data/races.js';

// ============================================================
// MyGaragePage — saved (favorited) races with remove action
// ============================================================

export default function MyGaragePage() {
  const favorites = useFavoritesStore(s => s.favorites);
  const removeFavorite = useFavoritesStore(s => s.removeFavorite);
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
  }, { scope: headerRef });

  const savedRaces = favorites.map(id => getRaceById(id)).filter(Boolean);

  const handleRemove = (id, el) => {
    gsap.to(el, {
      x: 60, opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.in',
      onComplete: () => removeFavorite(id),
    });
  };

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 32px 100px' }}>

        {/* Header */}
        <div ref={headerRef}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', color: '#39FF88', display: 'block', marginBottom: '12px' }}>
            PERSONAL HQ
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F0F0F0', lineHeight: 1, marginBottom: '12px' }}>
            My Garage
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(240,240,240,0.4)', lineHeight: 1.6, marginBottom: '40px' }}>
            Your saved races. Tap the star on any race card to add it here. Data persists across sessions.
          </p>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '40px' }} />
        </div>

        {/* Empty state */}
        {savedRaces.length === 0 ? (
          <EmptyState
            icon={<BookMarked size={48} color="rgba(240,240,240,0.12)" />}
            title="Your garage is empty"
            body="Explore the race calendar and star the events you don't want to miss."
            linkTo="/calendar"
            linkLabel="Browse Calendar →"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,240,0.25)', marginBottom: '4px' }}>
              {savedRaces.length} RACE{savedRaces.length !== 1 ? 'S' : ''} SAVED
            </p>
            {savedRaces.map((race) => (
              <GarageRow
                key={race.id}
                race={race}
                onRemove={(el) => handleRemove(race.id, el)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GarageRow({ race, onRemove }) {
  const rowRef = useRef(null);
  const accent = race.heroColor || '#39FF88';

  return (
    <div
      ref={rowRef}
      style={{
        background: 'rgba(11,11,11,0.6)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px', padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: '16px',
        borderLeft: `3px solid ${accent}`,
        transition: 'border-color 0.2s ease',
      }}
    >
      <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{race.flag}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#F0F0F0', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {race.name}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(240,240,240,0.35)' }}>
          Rd. {race.round} · {race.raceDate} {race.isSprint ? '· ⚡ Sprint' : ''}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
        <Link to={`/calendar/${race.id}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '7px', padding: '7px 12px', textDecoration: 'none', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: 'rgba(240,240,240,0.5)' }}>
          Details
        </Link>
        <button
          onClick={() => onRemove(rowRef.current)}
          aria-label="Remove from garage"
          style={{ display: 'flex', alignItems: 'center', background: 'rgba(232,0,45,0.06)', border: '1px solid rgba(232,0,45,0.15)', borderRadius: '7px', padding: '7px', cursor: 'pointer', color: 'rgba(232,0,45,0.6)', transition: 'all 0.2s ease' }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, body, linkTo, linkLabel }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '80px 20px', textAlign: 'center' }}>
      {icon}
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: 'rgba(240,240,240,0.35)' }}>{title}</h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(240,240,240,0.2)', maxWidth: '360px', lineHeight: 1.6 }}>{body}</p>
      {linkTo && (
        <Link to={linkTo} style={{ marginTop: '8px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#39FF88', textDecoration: 'none' }}>{linkLabel}</Link>
      )}
    </div>
  );
}
