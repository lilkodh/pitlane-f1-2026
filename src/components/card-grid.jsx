import RaceCard from './race-card.jsx';

// ============================================================
// CardGrid — Modular 4D race card showcase
// Features 3 specific cards with highly relevant technical data
// ============================================================

const DUMMY_RACES = [
  {
    id: 'monaco',
    name: 'FORMULA 1 GRAND PRIX DE MONACO 2026',
    city: 'Monte Carlo',
    flag: '🇲🇨',
    round: 8,
    raceDate: '24 MAY',
    heroColor: '#FF1E00',
    circuit: 'Circuit de Monaco',
    length: '3.337 km',
    laps: 78,
    type: 'Street Circuit',
    image: 'https://images.unsplash.com/photo-1521020770248-4360e2714578?auto=format&fit=crop&w=1000&q=80' // Monaco
  },
  {
    id: 'silverstone',
    name: 'FORMULA 1 BRITISH GRAND PRIX 2026',
    city: 'Silverstone',
    flag: '🇬🇧',
    round: 12,
    raceDate: '05 JUL',
    heroColor: '#004225',
    circuit: 'Silverstone Circuit',
    length: '5.891 km',
    laps: 52,
    type: 'Permanent Circuit',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80' // Britain
  },
  {
    id: 'suzuka',
    name: 'FORMULA 1 JAPANESE GRAND PRIX 2026',
    city: 'Suzuka',
    flag: '🇯🇵',
    round: 4,
    raceDate: '05 APR',
    heroColor: '#FFFFFF',
    circuit: 'Suzuka International Racing Course',
    length: '5.807 km',
    laps: 53,
    type: 'Permanent (Figure-8)',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80' // Japan
  }
];

export default function CardGrid() {
  return (
    <section style={{
      padding: '120px 5%',
      background: '#050505',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          marginBottom: '60px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#39FF88',
            letterSpacing: '0.2em'
          }}>
            UPCOMING 2026 HIGHLIGHTS
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '3rem',
            fontWeight: 800,
            color: '#FFF',
            letterSpacing: '-0.02em'
          }}>
            The Pillars of Speed
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '40px'
        }}>
          {DUMMY_RACES.map((race, idx) => (
            <RaceCard 
              key={race.id} 
              race={race} 
              index={idx} 
              image={race.image} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
