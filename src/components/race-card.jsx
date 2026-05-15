import { useRef } from 'react';
import { Link } from 'react-router';
import { MapPin, Clock, Zap, Star, Eye } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useCardTilt } from '../hooks/use-card-tilt.js';
import { useFavoritesStore } from '../stores/favorites-store.js';

// ============================================================
// RaceCard — 4D physics card with tilt, glare & glow
// Props: race (object), index (number, for stagger delay)
// ============================================================

// Team/country color palette for card accent gradients
const accentColors = {
  australia:      '#FF8000',
  china:          '#EE1C25',
  japan:          '#BC002D',
  bahrain:        '#CE1126',
  'saudi-arabia': '#006C35',
  miami:          '#FF6B35',
  'emilia-romagna':'#E8002D',
  monaco:         '#CC0000',
  spain:          '#AA151B',
  canada:         '#FF0000',
  austria:        '#ED2939',
  'great-britain':'#012169',
  belgium:        '#FAE042',
  hungary:        '#CE2939',
  netherlands:    '#FF6600',
  italy:          '#E8002D',
  azerbaijan:     '#0092BC',
  singapore:      '#EF3340',
  usa:            '#B22234',
  mexico:         '#006847',
  brazil:         '#009C3B',
  madrid:         '#C7003C',
  'las-vegas':    '#A855F7',
  'abu-dhabi':    '#00A0D1',
};

export default function RaceCard({ race, index = 0 }) {
  const { cardRef, handleMouseMove, handleMouseLeave } = useCardTilt(12);
  const wrapperRef = useRef(null);
  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite);
  const isFavorite = useFavoritesStore(s => s.isFavorite(race.id));

  const accent = race.heroColor || accentColors[race.id] || '#39FF88';
  const isSprint = race.isSprint;
  const isDebut = race.isDebut;

  // Scroll-triggered entrance animation
  useGSAP(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: wrapperRef });

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(race.id);
    // Micro-animation on star
    gsap.fromTo(
      e.currentTarget,
      { scale: 1 },
      { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }
    );
  };

  return (
    <div ref={wrapperRef} style={{ perspective: '1000px' }}>
      <Link
        to={`/calendar/${race.id}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <article
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={isSprint ? 'sprint-pulse' : ''}
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'rgba(11,11,11,0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${isSprint ? 'rgba(255,214,10,0.2)' : 'rgba(255,255,255,0.07)'}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease',
          }}
          aria-label={`${race.name} — Round ${race.round}`}
        >
          {/* ── Top Image Area ── */}
          <div
            style={{
              position: 'relative',
              height: '180px',
              background: `linear-gradient(135deg, #0b0b0b 0%, ${accent}22 100%)`,
              overflow: 'hidden',
            }}
          >
            {/* Track silhouette / abstract visual */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at 30% 60%, ${accent}30 0%, transparent 70%)`,
              }}
            />

            {/* Round number — massive watermark */}
            <div
              style={{
                position: 'absolute',
                right: '-10px',
                bottom: '-20px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '7rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.04)',
                lineHeight: 1,
                userSelect: 'none',
                letterSpacing: '-0.04em',
              }}
            >
              {String(race.round).padStart(2, '0')}
            </div>

            {/* Country flag + city */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{race.flag}</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: 'rgba(240,240,240,0.5)',
                  textTransform: 'uppercase',
                }}
              >
                {race.city}
              </span>
            </div>

            {/* Sprint / Debut badges */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                alignItems: 'flex-end',
              }}
            >
              {isSprint && (
                <span
                  style={{
                    background: 'rgba(255,214,10,0.15)',
                    border: '1px solid rgba(255,214,10,0.4)',
                    color: '#FFD60A',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  ⚡ SPRINT
                </span>
              )}
              {isDebut && (
                <span
                  style={{
                    background: 'rgba(57,255,136,0.15)',
                    border: '1px solid rgba(57,255,136,0.4)',
                    color: '#39FF88',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  🆕 DEBUT
                </span>
              )}
              {race.status === 'completed' && (
                <span
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(240,240,240,0.4)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  FINISHED
                </span>
              )}
            </div>

            {/* Accent line at image bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />

            {/* Glare overlay — moved by useCardTilt */}
            <div
              className="card-glare"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                pointerEvents: 'none',
                borderRadius: 'inherit',
              }}
            />
          </div>

          {/* ── Card Body ── */}
          <div style={{ padding: '16px 18px 18px' }}>

            {/* Race name */}
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                color: '#F0F0F0',
                marginBottom: '4px',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              {race.name}
            </h3>

            {/* Circuit name */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                color: 'rgba(240,240,240,0.4)',
                marginBottom: '12px',
                letterSpacing: '0.01em',
              }}
            >
              {race.circuit}
            </p>

            {/* Info row */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '14px',
                flexWrap: 'wrap',
              }}
            >
              <InfoPill icon={<Clock size={11} />} label={race.raceDate} />
              <InfoPill icon={<MapPin size={11} />} label={`Rd. ${race.round}`} />
              <InfoPill icon={<Zap size={11} />} label={`${race.laps} laps`} />
            </div>

            {/* Winner (if completed) */}
            {race.status === 'completed' && race.winner && (
              <div
                style={{
                  background: 'rgba(57,255,136,0.06)',
                  border: '1px solid rgba(57,255,136,0.12)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '0.7rem' }}>🏆</span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#39FF88',
                  }}
                >
                  {race.winner}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.7rem',
                    color: 'rgba(240,240,240,0.4)',
                  }}
                >
                  {race.winnerTeam}
                </span>
              </div>
            )}

            {/* Footer row — favorite + CTA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button
                onClick={handleFavClick}
                aria-label={isFavorite ? 'Remove from garage' : 'Add to garage'}
                style={{
                  background: isFavorite ? 'rgba(57,255,136,0.1)' : 'transparent',
                  border: `1px solid ${isFavorite ? 'rgba(57,255,136,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '8px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease',
                }}
              >
                <Star
                  size={13}
                  fill={isFavorite ? '#39FF88' : 'none'}
                  color={isFavorite ? '#39FF88' : 'rgba(240,240,240,0.4)'}
                />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: isFavorite ? '#39FF88' : 'rgba(240,240,240,0.4)',
                  }}
                >
                  {isFavorite ? 'SAVED' : 'GARAGE'}
                </span>
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: accent,
                  letterSpacing: '0.06em',
                }}
              >
                <Eye size={12} />
                VIEW RACE
              </div>
            </div>
          </div>

          {/* Bottom accent stripe */}
          <div
            style={{
              height: '2px',
              background: `linear-gradient(90deg, ${accent}80, ${accent}20, transparent)`,
            }}
          />
        </article>
      </Link>
    </div>
  );
}

// Small info pill component
function InfoPill({ icon, label }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: 'rgba(240,240,240,0.45)',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.72rem',
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
