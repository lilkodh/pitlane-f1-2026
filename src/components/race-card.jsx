import { useRef } from 'react';
import { Link } from 'react-router';
import { MapPin, Clock, Zap, Star, Eye } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useCardTilt } from '../hooks/use-card-tilt.js';
import { useFavoritesStore } from '../stores/favorites-store.js';

// ============================================================
// RaceCard — 4D physics card with tilt, glare & glow
// Props: race (object), index (number, for stagger delay), image (string)
// ============================================================

export default function RaceCard({ race, index = 0, image }) {
  // Use a slightly higher intensity for the 4D effect
  const { cardRef, handleMouseMove, handleMouseLeave } = useCardTilt(15);
  const wrapperRef = useRef(null);
  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite || (() => {}));
  const isFavorite = useFavoritesStore(s => s.isFavorite ? s.isFavorite(race.id) : false);

  const accent = race.heroColor || '#39FF88';

  // Entrance animation
  useGSAP(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 90%',
        },
      }
    );
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} style={{ perspective: '1200px' }}>
      <Link
        to={`/calendar/${race.id}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <article
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            // THE GLASS
            background: 'rgba(11, 11, 11, 0.4)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            cursor: 'pointer',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {/* THE IMAGE (Top 70%) */}
          <div
            style={{
              position: 'relative',
              height: '240px',
              overflow: 'hidden',
            }}
          >
            <img 
              src={image} 
              alt={race.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
              }}
              className="card-image"
            />
            {/* Dark Overlay (brightens on hover via CSS/GSAP) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              transition: 'background 0.4s ease',
            }} className="card-overlay" />

            {/* Badges */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 2,
            }}>
              <span style={{
                background: '#39FF88',
                color: '#050505',
                padding: '4px 10px',
                borderRadius: '6px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.6rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                {race.flag} RD. {race.round}
              </span>
            </div>
          </div>

          {/* THE CONTENT (Bottom 30%) */}
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#FFF',
                letterSpacing: '-0.01em',
                lineHeight: 1.2
              }}>
                {race.name}
              </h3>
            </div>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '16px',
              fontWeight: 500
            }}>
              {race.circuit}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em' }}>DISTANCE</span>
                <span style={{ fontSize: '0.8rem', color: '#FFF', fontWeight: 600 }}>{race.distance || race.length}</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em' }}>LAPS</span>
                <span style={{ fontSize: '0.8rem', color: '#FFF', fontWeight: 600 }}>{race.laps}</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em' }}>TYPE</span>
                <span style={{ fontSize: '0.8rem', color: '#39FF88', fontWeight: 700 }}>{race.type || 'F1 Circuit'}</span>
              </div>
            </div>
          </div>

          {/* THE GLARE EFFECT (White/Green specular sweep) */}
          <div
            className="card-glare"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 10,
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)',
            }}
          />

          {/* THE GLOW (Handled by useCardTilt and CSS transition) */}
        </article>
      </Link>

      <style>{`
        article:hover .card-image {
          transform: scale(1.1);
        }
        article:hover .card-overlay {
          background: rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
