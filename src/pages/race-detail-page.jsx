import { useParams, Link, useNavigate } from 'react-router';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowLeft, MapPin, Clock, Zap, Star, Eye, Flag, Activity } from 'lucide-react';
import { getRaceById, races } from '../data/races.js';
import { useFavoritesStore } from '../stores/favorites-store.js';
import CountdownTimer from '../components/countdown-timer.jsx';

export default function RaceDetailPage() {
  const { raceId } = useParams();
  const navigate = useNavigate();
  const race = getRaceById(raceId);
  const pageRef = useRef(null);
  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite);
  const isFavorite = useFavoritesStore(s => s.isFavorite(raceId));
  const markWatched = useFavoritesStore(s => s.markWatched);
  const isWatched = useFavoritesStore(s => s.isWatched(raceId));

  useGSAP(() => {
    gsap.fromTo(
      pageRef.current.querySelectorAll('.detail-reveal'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: pageRef });

  if (!race) {
    return (
      <div style={{ paddingTop: '72px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <span style={{ fontSize: '3rem' }}>🏁</span>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', color: '#F0F0F0' }}>Race not found</h2>
        <Link to="/calendar" style={{ color: '#39FF88', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem' }}>← Back to Calendar</Link>
      </div>
    );
  }

  const accent = race.heroColor || '#39FF88';
  const roundIndex = races.findIndex(r => r.id === race.id);
  const prevRace = races[roundIndex - 1] || null;
  const nextRace = races[roundIndex + 1] || null;

  return (
    <div ref={pageRef} style={{ paddingTop: '72px', minHeight: '100vh' }}>

      {/* Hero banner */}
      <div style={{
        position: 'relative', padding: '60px 32px 80px',
        background: `linear-gradient(135deg, #050505 0%, ${accent}18 100%)`,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        {/* bg glow */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Back link */}
          <button onClick={() => navigate(-1)} className="detail-reveal" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(240,240,240,0.4)', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', marginBottom: '32px', padding: 0 }}>
            <ArrowLeft size={14} /> Back
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 400px' }}>
              {/* Round + badges */}
              <div className="detail-reveal" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', color: accent }}>
                  ROUND {String(race.round).padStart(2, '0')} · 2026
                </span>
                {race.isSprint && <Badge color="#FFD60A" text="⚡ SPRINT WEEKEND" />}
                {race.isDebut && <Badge color="#39FF88" text="🆕 CIRCUIT DEBUT" />}
                {race.status === 'completed' && <Badge color="rgba(240,240,240,0.3)" text="FINISHED" />}
              </div>

              {/* Race name */}
              <h1 className="detail-reveal" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F0F0F0', lineHeight: 1.05, marginBottom: '8px' }}>
                {race.flag} {race.name}
              </h1>
              <p className="detail-reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(240,240,240,0.4)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} /> {race.circuit} · {race.city}, {race.country}
              </p>

              <p className="detail-reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(240,240,240,0.55)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '32px' }}>
                {race.description}
              </p>

              {/* Action buttons */}
              <div className="detail-reveal" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <ActionBtn
                  onClick={() => toggleFavorite(race.id)}
                  active={isFavorite}
                  activeColor="#39FF88"
                  icon={<Star size={14} fill={isFavorite ? '#39FF88' : 'none'} />}
                  label={isFavorite ? 'In Garage' : 'Add to Garage'}
                />
                <ActionBtn
                  onClick={() => markWatched(race.id)}
                  active={isWatched}
                  activeColor="#FFD60A"
                  icon={<Eye size={14} />}
                  label={isWatched ? 'Watched ✓' : 'Mark Watched'}
                />
              </div>
            </div>

            {/* Countdown / winner panel */}
            <div className="detail-reveal" style={{ flex: '0 1 340px' }}>
              {race.status === 'completed' && race.winner ? (
                <div style={{ background: 'rgba(57,255,136,0.06)', border: '1px solid rgba(57,255,136,0.15)', borderRadius: '16px', padding: '28px' }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(240,240,240,0.35)', marginBottom: '16px' }}>RACE WINNER</p>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#39FF88', marginBottom: '4px' }}>{race.winner}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(240,240,240,0.45)' }}>{race.winnerTeam}</div>
                </div>
              ) : (
                <div style={{ background: 'rgba(11,11,11,0.5)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px' }}>
                  <CountdownTimer targetDate={race.date} label="RACE STARTS IN" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '60px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="detail-reveal" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#F0F0F0', marginBottom: '24px', letterSpacing: '-0.02em' }}>Circuit Data</h2>
        <div className="detail-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '60px' }}>
          {[
            { icon: <Activity size={14} />, label: 'Race Laps', value: race.laps },
            { icon: <Flag size={14} />, label: 'Race Distance', value: race.distance },
            { icon: <Clock size={14} />, label: 'Lap Record', value: race.lapRecord },
            { icon: <Zap size={14} />, label: 'Record Holder', value: race.lapRecordHolder },
            { icon: <MapPin size={14} />, label: 'Race Date', value: race.raceDate },
            { icon: <Flag size={14} />, label: 'Format', value: race.isSprint ? 'Sprint Weekend' : 'Standard Weekend' },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(57,255,136,0.7)', marginBottom: '8px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em' }}>
                {icon} {label}
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: '#F0F0F0' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Prev / Next nav */}
        <div className="detail-reveal" style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {prevRace ? (
            <Link to={`/calendar/${prevRace.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 20px', color: 'rgba(240,240,240,0.5)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem' }}>
              <ArrowLeft size={14} /> Rd.{prevRace.round} {prevRace.shortName}
            </Link>
          ) : <div />}
          {nextRace && (
            <Link to={`/calendar/${nextRace.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 20px', color: 'rgba(240,240,240,0.5)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem' }}>
              Rd.{nextRace.round} {nextRace.shortName} <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Badge({ color, text }) {
  return (
    <span style={{ background: `${color}18`, border: `1px solid ${color}40`, color, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', padding: '3px 8px', borderRadius: '4px' }}>
      {text}
    </span>
  );
}

function ActionBtn({ onClick, active, activeColor, icon, label }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: active ? `${activeColor}12` : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? `${activeColor}35` : 'rgba(255,255,255,0.08)'}`, borderRadius: '8px', padding: '10px 18px', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: active ? activeColor : 'rgba(240,240,240,0.5)', transition: 'all 0.2s ease' }}>
      {icon} {label}
    </button>
  );
}
