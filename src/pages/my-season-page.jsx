import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Eye, Trash2, Trophy, Calendar } from 'lucide-react';
import { useFavoritesStore } from '../stores/favorites-store.js';
import { getRaceById } from '../data/races.js';

// ============================================================
// MySeasonPage — watched races journal with notes + stats
// ============================================================

export default function MySeasonPage() {
  const watched = useFavoritesStore(s => s.watched);
  const removeWatched = useFavoritesStore(s => s.removeWatched);
  const markWatched = useFavoritesStore(s => s.markWatched);
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
  }, { scope: headerRef });

  // Sort watched entries by watchedAt date desc
  const sortedWatched = [...watched].sort(
    (a, b) => new Date(b.watchedAt) - new Date(a.watchedAt)
  );

  const handleRemove = (raceId, el) => {
    gsap.to(el, {
      x: -60, opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => removeWatched(raceId),
    });
  };

  const watchedRaces = sortedWatched.map(w => ({
    ...w,
    race: getRaceById(w.raceId),
  })).filter(w => w.race);

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 32px 100px' }}>

        {/* Header */}
        <div ref={headerRef}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', color: '#FFD60A', display: 'block', marginBottom: '12px' }}>
            RACE LOG
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F0F0F0', lineHeight: 1, marginBottom: '12px' }}>
            My Season
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(240,240,240,0.4)', lineHeight: 1.6, marginBottom: '24px' }}>
            Your personal race-watching journal. Mark races as watched from the race detail page to log them here.
          </p>

          {/* Stats bar */}
          {watched.length > 0 && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <StatChip icon={<Eye size={13} />} value={watched.length} label="Races Watched" color="#39FF88" />
              <StatChip icon={<Trophy size={13} />} value={`${Math.round((watched.length / 24) * 100)}%`} label="Season Progress" color="#FFD60A" />
              <StatChip icon={<Calendar size={13} />} value={24 - watched.length} label="Remaining" color="rgba(240,240,240,0.35)" />
            </div>
          )}

          {/* Season progress bar */}
          {watched.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(watched.length / 24) * 100}%`, background: 'linear-gradient(90deg, #39FF88, #FFD60A)', borderRadius: '2px', transition: 'width 0.6s ease' }} />
              </div>
            </div>
          )}

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '40px' }} />
        </div>

        {/* Empty state */}
        {watchedRaces.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '80px 20px', textAlign: 'center' }}>
            <Eye size={48} color="rgba(240,240,240,0.12)" />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: 'rgba(240,240,240,0.35)' }}>
              No races logged yet
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(240,240,240,0.2)', maxWidth: '360px', lineHeight: 1.6 }}>
              Open any race detail page and press "Mark Watched" to start building your season journal.
            </p>
            <Link to="/calendar" style={{ marginTop: '8px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#FFD60A', textDecoration: 'none' }}>
              Go to Calendar →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,240,0.25)', marginBottom: '4px' }}>
              {watchedRaces.length} OF 24 RACES LOGGED
            </p>
            {watchedRaces.map(({ race, watchedAt, raceId }) => (
              <WatchedRow
                key={raceId}
                race={race}
                watchedAt={watchedAt}
                onRemove={(el) => handleRemove(raceId, el)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WatchedRow({ race, watchedAt, onRemove }) {
  const rowRef = useRef(null);
  const accent = race.heroColor || '#39FF88';
  const watchedDate = new Date(watchedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div
      ref={rowRef}
      style={{
        background: 'rgba(11,11,11,0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderLeft: `3px solid ${accent}`,
        borderRadius: '12px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}
    >
      <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{race.flag}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', fontWeight: 700, color: '#F0F0F0', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {race.name}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(240,240,240,0.3)' }}>
          Rd. {race.round} · Watched {watchedDate}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(57,255,136,0.08)', border: '1px solid rgba(57,255,136,0.15)', borderRadius: '6px', padding: '5px 9px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', fontWeight: 700, color: '#39FF88' }}>
          <Eye size={10} /> WATCHED
        </span>
        <Link to={`/calendar/${race.id}`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '5px 10px', textDecoration: 'none', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: 'rgba(240,240,240,0.45)' }}>
          Details
        </Link>
        <button
          onClick={() => onRemove(rowRef.current)}
          aria-label="Remove from season log"
          style={{ display: 'flex', alignItems: 'center', background: 'rgba(232,0,45,0.05)', border: '1px solid rgba(232,0,45,0.12)', borderRadius: '6px', padding: '5px 7px', cursor: 'pointer', color: 'rgba(232,0,45,0.55)', transition: 'all 0.2s ease' }}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

function StatChip({ icon, value, label, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px 14px' }}>
      <span style={{ color }}>{icon}</span>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color }}>{value}</span>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(240,240,240,0.3)' }}>{label}</span>
    </div>
  );
}
